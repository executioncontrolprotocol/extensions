#!/usr/bin/env node
/**
 * Development-track install for unpublished @executioncontrolprotocol/core|types peers.
 *
 * Keep in sync with browser-demo/scripts/install-ecp-from-siblings.mjs (consumer variant).
 *
 * Usage (from extensions root, after core is built):
 *   node scripts/install-ecp-from-siblings.mjs
 *   node scripts/install-ecp-from-siblings.mjs --non-ecp-only
 */
import { execFileSync, spawnSync } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
} from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const consumerRoot = path.resolve(process.env.CI_CONSUMER_ROOT ?? path.join(scriptDir, ".."))
const ecpRoot = path.resolve(process.env.ECP_ROOT ?? path.join(consumerRoot, "..", "executioncontrolprotocol"))
const linkType = process.platform === "win32" ? "junction" : "dir"

const DEFAULT_PEERS = ["@executioncontrolprotocol/core", "@executioncontrolprotocol/types"]

function run(command, args, cwd = consumerRoot) {
  console.log(`\n> ${command} ${args.join(" ")}  (${cwd})`)
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function ensureSymlink(linkPath, targetPath) {
  rmSync(linkPath, { recursive: true, force: true })
  mkdirSync(path.dirname(linkPath), { recursive: true })
  symlinkSync(targetPath, linkPath, linkType)
}

function isAbsolutePackPath(filename) {
  return path.isAbsolute(filename) || /^[A-Za-z]:[\\/]/.test(filename)
}

function parsePackTarballLine(packOutput) {
  const lines = packOutput
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
  const tgzLine = lines.findLast((line) => line.endsWith(".tgz"))
  return tgzLine ?? lines.at(-1)
}

function resolvePackTarballPath(packsDir, packOutputLine) {
  const filename = packOutputLine.trim()
  if (!filename) throw new Error("pnpm pack produced no tarball path")
  if (isAbsolutePackPath(filename)) return filename
  return path.join(packsDir, path.basename(filename))
}

function readPackageName(dir) {
  const pkgPath = path.join(dir, "package.json")
  if (!existsSync(pkgPath)) return undefined
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"))
    return typeof pkg.name === "string" ? pkg.name : undefined
  } catch {
    return undefined
  }
}

function discoverCorePackages(root) {
  const out = new Map()
  const roots = [
    path.join(root, "packages", "types"),
    path.join(root, "packages", "core"),
  ]
  for (const group of ["harnesses", "extensions", "runtimes"]) {
    const base = path.join(root, "packages", group)
    if (!existsSync(base)) continue
    for (const entry of readdirSync(base, { withFileTypes: true })) {
      if (entry.isDirectory()) roots.push(path.join(base, entry.name))
    }
  }
  for (const dir of roots) {
    const name = readPackageName(dir)
    if (name?.startsWith("@executioncontrolprotocol/")) out.set(name, dir)
  }
  return out
}

function corePackageDir(pkgName, catalog) {
  const fromCatalog = catalog.get(pkgName)
  if (fromCatalog) return fromCatalog
  const segment = pkgName.split("/")[1]
  const direct = path.join(ecpRoot, "packages", segment)
  if (existsSync(path.join(direct, "package.json"))) return direct
  throw new Error(`Cannot resolve ${pkgName} under ${ecpRoot}`)
}

/**
 * Install workspace deps (extensions lockfile has no core/types peers).
 */
export function installNonEcpDependencies() {
  run("pnpm", ["install", "--no-frozen-lockfile"])
}

/**
 * Pack + junction-link core/types into root and each packages/* node_modules.
 */
export function linkEcpFromSiblingPacks() {
  if (!existsSync(path.join(ecpRoot, "package.json"))) {
    console.error(`Core monorepo not found at ${ecpRoot}. Set ECP_ROOT.`)
    process.exit(1)
  }

  const raw = process.env.CI_LINK_PACKAGES ?? ""
  const wanted =
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean).length > 0
      ? raw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : DEFAULT_PEERS

  const catalog = discoverCorePackages(ecpRoot)
  const packsDir = mkdtempSync(path.join(tmpdir(), "ecp-ext-packs-"))
  /** @type {Array<{ name: string, dir: string }>} */
  const resolved = []

  for (const name of wanted) {
    const dir = corePackageDir(name, catalog)
    if (!existsSync(path.join(dir, "dist"))) {
      console.error(`Missing dist/ for ${name} at ${dir} — build core first`)
      process.exit(1)
    }
    resolved.push({ name, dir })
  }

  console.log(`\nPacking ${resolved.length} core peer(s) into ${packsDir}`)
  for (const { name, dir } of resolved) {
    const out = execFileSync("pnpm", ["pack", "--pack-destination", packsDir], {
      cwd: dir,
      encoding: "utf8",
      env: process.env,
      shell: process.platform === "win32",
    }).trim()
    const line = parsePackTarballLine(out)
    if (!line) throw new Error(`pnpm pack produced no tarball for ${name}`)
    const tarball = resolvePackTarballPath(packsDir, line)
    if (!existsSync(tarball)) throw new Error(`Missing tarball for ${name}: ${tarball}`)
    console.log(`Packed ${name} -> ${path.basename(tarball)}`)
  }

  const packageDirs = existsSync(path.join(consumerRoot, "packages"))
    ? readdirSync(path.join(consumerRoot, "packages"), { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => path.join(consumerRoot, "packages", e.name))
    : []

  for (const { name, dir } of resolved) {
    const rootDest = path.join(consumerRoot, "node_modules", ...name.split("/"))
    ensureSymlink(rootDest, dir)
    console.log(`Linked ${name} -> ${dir}`)
    for (const pkgDir of packageDirs) {
      ensureSymlink(path.join(pkgDir, "node_modules", ...name.split("/")), dir)
    }
  }

  rmSync(packsDir, { recursive: true, force: true })
}

export function installEcpFromSiblings() {
  console.log("Development install: workspace deps + core/types from sibling packs/links")
  installNonEcpDependencies()
  linkEcpFromSiblingPacks()
}

function main() {
  const nonEcpOnly = process.argv.includes("--non-ecp-only")
  if (nonEcpOnly) {
    installNonEcpDependencies()
    return
  }
  installEcpFromSiblings()
}

const isMain =
  process.argv[1] != null && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
if (isMain) {
  main()
}
