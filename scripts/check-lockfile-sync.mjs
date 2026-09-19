#!/usr/bin/env node
/**
 * Structural lockfile sync for extensions workspace.
 * ECP peers (core/types) are outside the lockfile by design.
 */
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"))
const lockPath = path.join(root, "pnpm-lock.yaml")
if (!existsSync(lockPath)) {
  console.error("Missing pnpm-lock.yaml")
  process.exit(1)
}

const lockText = readFileSync(lockPath, "utf8")
const names = new Set()
const start = lockText.search(/^importers:\s*$/m)
if (start >= 0) {
  const rest = lockText.slice(start)
  const rootImporter = rest.match(
    /^ {2}\.:\r?\n([\s\S]*?)(?=\r?\n {2}[^.\s]|\r?\npackages:|\r?\nsnapshots:|(?![\s\S]))/m
  )
  if (rootImporter) {
    for (const line of rootImporter[1].split(/\r?\n/)) {
      const m = line.match(/^\s{6}('([^']+)'|(@?[^\s:]+)):/)
      if (m) names.add(m[2] ?? m[3])
    }
  }
}

/** @type {string[]} */
const missing = []
for (const section of ["dependencies", "devDependencies"]) {
  const block = pkg[section]
  if (!block || typeof block !== "object") continue
  for (const name of Object.keys(block)) {
    if (name.startsWith("@executioncontrolprotocol/")) continue
    if (!names.has(name)) missing.push(`${section}: ${name}`)
  }
}

if (missing.length > 0) {
  console.error("Lockfile out of sync with package.json:\n")
  for (const line of missing) console.error(`  ${line}`)
  console.error("\nRun pnpm install and commit pnpm-lock.yaml.")
  process.exit(1)
}

console.log("OK: lockfile importers cover non-ECP package.json dependencies.")
