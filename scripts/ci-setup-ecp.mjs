#!/usr/bin/env node
/**
 * Two-track CI setup for ECP consumer repos (extensions, browser-demo).
 *
 * development track: build sibling core, pack/link core+types via install-ecp-from-siblings
 *   (unpublished catalog ranges OK).
 * main track: install consumer from registry, then install published core/types peers
 *   (skipped by auto-install-peers=false) into node_modules for the build.
 *
 * Usage (from consumer repo root):
 *   node scripts/ci-setup-ecp.mjs
 *
 * Environment:
 *   ECP_ROOT           — core monorepo path (default: ../executioncontrolprotocol)
 *   EXTENSIONS_ROOT    — extensions monorepo (demo only; default: ../extensions)
 *   GITHUB_REF         — set by Actions
 *   GITHUB_BASE_REF    — set by Actions on pull_request
 *   CI_CONSUMER_ROOT   — consumer repo root (default: cwd)
 *   CI_LINK_PACKAGES   — comma-separated @scope/pkg names to link (required for demo)
 */
import { spawnSync } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
import { installEcpFromSiblings } from "./install-ecp-from-siblings.mjs"

const consumerRoot = path.resolve(process.env.CI_CONSUMER_ROOT ?? process.cwd())
const ecpRoot = path.resolve(process.env.ECP_ROOT ?? path.join(consumerRoot, "..", "executioncontrolprotocol"))
const linkType = process.platform === "win32" ? "junction" : "dir"

/** Peers declared on vendor packages but skipped by auto-install-peers=false. */
const MAIN_TRACK_ECP_PEERS = [
  "@executioncontrolprotocol/core",
  "@executioncontrolprotocol/types",
]

function run(command, args, cwd = consumerRoot, env = process.env) {
  console.log(`\n> ${command} ${args.join(" ")}  (${cwd})`)
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
    env,
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function detectTrack() {
  const ref = process.env.GITHUB_REF ?? ""
  const baseRef = process.env.GITHUB_BASE_REF ?? ""
  return ref === "refs/heads/main" || baseRef === "main" ? "main" : "development"
}

function ensureSymlink(linkPath, targetPath) {
  rmSync(linkPath, { recursive: true, force: true })
  mkdirSync(path.dirname(linkPath), { recursive: true })
  symlinkSync(targetPath, linkPath, linkType)
}

/** @returns {"pnpm" | "npm"} */
function detectPackageManager(repoRoot) {
  if (existsSync(path.join(repoRoot, "pnpm-lock.yaml"))) return "pnpm"
  if (existsSync(path.join(repoRoot, "package-lock.json"))) return "npm"
  const pkgPath = path.join(repoRoot, "package.json")
  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf8"))
    if (typeof pkg.packageManager === "string" && pkg.packageManager.startsWith("pnpm")) {
      return "pnpm"
    }
  }
  return "npm"
}

function installDependencies(repoRoot) {
  const pm = detectPackageManager(repoRoot)
  if (pm === "pnpm") {
    run("pnpm", ["install", "--frozen-lockfile"], repoRoot)
    return
  }
  run("npm", ["ci"], repoRoot)
}

function runPackageScript(repoRoot, scriptName) {
  const pm = detectPackageManager(repoRoot)
  if (pm === "pnpm") {
    run("pnpm", ["run", scriptName], repoRoot)
    return
  }
  run("npm", ["run", scriptName], repoRoot)
}

/** Read `catalogs.ecp` range for a package from pnpm-workspace.yaml. */
function readEcpCatalogSpec(pkgName) {
  const yamlPath = path.join(consumerRoot, "pnpm-workspace.yaml")
  if (!existsSync(yamlPath)) {
    throw new Error(`Missing pnpm-workspace.yaml at ${yamlPath}`)
  }
  const text = readFileSync(yamlPath, "utf8")
  const escaped = pkgName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = text.match(new RegExp(`['"]${escaped}['"]\\s*:\\s*([^\\s#]+)`))
  if (!match) {
    throw new Error(`No catalogs.ecp entry for ${pkgName} in pnpm-workspace.yaml`)
  }
  return match[1].replace(/['"]/g, "")
}

/**
 * Main track: vendor packages declare core/types as peers only, and
 * auto-install-peers=false keeps them out of the lockfile. Install published
 * peers from the catalog into node_modules so tsc can resolve them.
 */
function installPublishedEcpPeers() {
  const deps = Object.fromEntries(
    MAIN_TRACK_ECP_PEERS.map((name) => [name, readEcpCatalogSpec(name)])
  )
  // Outside the consumer workspace so pnpm does not hoist into the monorepo.
  const peerRoot = mkdtempSync(path.join(tmpdir(), "ecp-peers-"))
  writeFileSync(
    path.join(peerRoot, "package.json"),
    `${JSON.stringify({ name: "ci-ecp-peers", private: true, dependencies: deps }, null, 2)}\n`
  )
  console.log("\nMain track: installing published ECP peers from registry…")
  run("pnpm", ["install", "--ignore-workspace"], peerRoot)

  const packagesDir = path.join(consumerRoot, "packages")
  const packageDirs = existsSync(packagesDir)
    ? readdirSync(packagesDir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => path.join(packagesDir, e.name))
    : []

  for (const name of MAIN_TRACK_ECP_PEERS) {
    const src = path.join(peerRoot, "node_modules", ...name.split("/"))
    if (!existsSync(path.join(src, "package.json"))) {
      console.error(`Failed to install ${name} from registry at ${src}`)
      process.exit(1)
    }
    const rootDest = path.join(consumerRoot, "node_modules", ...name.split("/"))
    ensureSymlink(rootDest, src)
    console.log(`Linked peer ${name} -> ${src}`)
    for (const pkgDir of packageDirs) {
      ensureSymlink(path.join(pkgDir, "node_modules", ...name.split("/")), src)
    }
  }
}

const track = detectTrack()
console.log(`CI track: ${track}`)

if (track === "main") {
  console.log("Main track: install consumer from registry (no sibling link).")
  run("pnpm", ["install", "--frozen-lockfile"])
  installPublishedEcpPeers()
  console.log("\nCI main setup complete.")
  process.exit(0)
}

console.log("Development track: build core, then pack/link peers into extensions.")

if (!existsSync(path.join(ecpRoot, "package.json"))) {
  console.error(`Core monorepo not found at ${ecpRoot}. Set ECP_ROOT.`)
  process.exit(1)
}

installDependencies(ecpRoot)
runPackageScript(ecpRoot, "build")
runPackageScript(ecpRoot, "generate:schema")

installEcpFromSiblings()

console.log("\nCI development setup complete.")
