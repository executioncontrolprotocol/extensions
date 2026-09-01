#!/usr/bin/env node
/**
 * Junction-link @executioncontrolprotocol/core and types from the sibling core monorepo.
 *
 * Usage:
 *   pnpm link:ecp
 *   ECP_ROOT=../executioncontrolprotocol pnpm link:ecp
 */
import { existsSync, mkdirSync, rmSync, symlinkSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const extensionsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const ecpRoot = path.resolve(process.env.ECP_ROOT ?? path.join(extensionsRoot, "..", "executioncontrolprotocol"))
const linkType = process.platform === "win32" ? "junction" : "dir"

const packages = [
  "@executioncontrolprotocol/types",
  "@executioncontrolprotocol/core",
]

function ensureSymlink(linkPath, targetPath) {
  rmSync(linkPath, { recursive: true, force: true })
  mkdirSync(path.dirname(linkPath), { recursive: true })
  symlinkSync(targetPath, linkPath, linkType)
}

function main() {
  if (!existsSync(path.join(ecpRoot, "package.json"))) {
    console.error(`ECP monorepo not found at ${ecpRoot}. Set ECP_ROOT.`)
    process.exit(1)
  }

  console.log(`Linking core/types from ${ecpRoot}`)
  for (const name of packages) {
    const segment = name.split("/")[1]
    const src = path.join(ecpRoot, "packages", segment)
    if (!existsSync(path.join(src, "dist"))) {
      console.error(`Missing dist/ for ${name} — run pnpm build in the core monorepo first`)
      process.exit(1)
    }
    const dest = path.join(extensionsRoot, "node_modules", ...name.split("/"))
    ensureSymlink(dest, src)
    console.log(`Linked ${name}`)
  }
}

main()
