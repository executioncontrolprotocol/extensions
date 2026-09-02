#!/usr/bin/env node
/**
 * Publish all non-private workspace packages in dependency order.
 * Usage: node scripts/publish-workspaces.mjs
 */
import { readFileSync, readdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { execSync } from "node:child_process"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const packagesDir = join(root, "packages")

function readPkg(dir) {
  const path = join(dir, "package.json")
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, "utf8"))
}

const packages = []
for (const name of readdirSync(packagesDir)) {
  const dir = join(packagesDir, name)
  const pkg = readPkg(dir)
  if (!pkg || pkg.private) continue
  packages.push({ dir, name: pkg.name, version: pkg.version, deps: pkg.dependencies ?? {} })
}

function topoSort(list) {
  const byName = new Map(list.map((p) => [p.name, p]))
  const sorted = []
  const visiting = new Set()
  const visited = new Set()

  function visit(p) {
    if (visited.has(p.name)) return
    if (visiting.has(p.name)) throw new Error(`cycle involving ${p.name}`)
    visiting.add(p.name)
    for (const dep of Object.keys(p.deps)) {
      if (byName.has(dep)) visit(byName.get(dep))
    }
    visiting.delete(p.name)
    visited.add(p.name)
    sorted.push(p)
  }

  for (const p of list) visit(p)
  return sorted
}

for (const p of topoSort(packages)) {
  console.log(`Publishing ${p.name}@${p.version}…`)
  execSync(`pnpm publish --filter ${p.name} --access public --no-git-checks`, {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  })
}
