#!/usr/bin/env node
/**
 * Bump version in all workspace package.json files.
 * Usage: node scripts/bump-all-ecp-versions.mjs <semver>
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, "..")
const newVersion = process.argv[2]
if (!newVersion || !/^\d+\.\d+\.\d+(-[a-zA-Z0-9.-]+)?$/.test(newVersion)) {
  console.error("Usage: node scripts/bump-all-ecp-versions.mjs <semver>")
  process.exit(1)
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "dist") continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (entry.name === "package.json") out.push(full)
  }
  return out
}

const workspaceYaml = join(root, "pnpm-workspace.yaml")
let yamlText = readFileSync(workspaceYaml, "utf8")
yamlText = yamlText.replace(
  /("@executioncontrolprotocol\/core": )\^[\d.]+/,
  `$1^${newVersion}`,
)
yamlText = yamlText.replace(
  /("@executioncontrolprotocol\/types": )\^[\d.]+/,
  `$1^${newVersion}`,
)
writeFileSync(workspaceYaml, yamlText, "utf8")

for (const file of walk(root)) {
  const json = JSON.parse(readFileSync(file, "utf8"))
  if (typeof json.version !== "string") continue
  json.version = newVersion
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`, "utf8")
}

console.log(`Bumped workspace to ${newVersion}`)
