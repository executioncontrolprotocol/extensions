#!/usr/bin/env node
/** Update vendor package peers to catalog:ecp and tooling to catalog: */
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const packagesDir = join(root, "packages")

for (const dirName of readdirSync(packagesDir)) {
  const file = join(packagesDir, dirName, "package.json")
  const json = JSON.parse(readFileSync(file, "utf8"))
  json.version = "0.13.1"
  if (json.peerDependencies) {
    for (const name of Object.keys(json.peerDependencies)) {
      if (name.startsWith("@executioncontrolprotocol/")) {
        json.peerDependencies[name] = "catalog:ecp"
      }
      if (name === "zod") json.peerDependencies[name] = "catalog:"
    }
  }
  if (json.devDependencies) {
    if (json.devDependencies.typescript) json.devDependencies.typescript = "catalog:"
    if (json.devDependencies.zod) json.devDependencies.zod = "catalog:"
  }
  writeFileSync(file, `${JSON.stringify(json, null, 2)}\n`, "utf8")
  console.log(`updated ${file}`)
}
