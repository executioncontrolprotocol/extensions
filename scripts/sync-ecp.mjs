#!/usr/bin/env node
/**
 * Build core (if needed) and install peers from sibling packs/links.
 */
import { existsSync } from "node:fs"
import { spawnSync } from "node:child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { installEcpFromSiblings } from "./install-ecp-from-siblings.mjs"

const consumerRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const ecpRoot = path.resolve(process.env.ECP_ROOT ?? path.join(consumerRoot, "..", "executioncontrolprotocol"))

function run(command, args, cwd) {
  console.log(`\n> ${command} ${args.join(" ")}  (${cwd})`)
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: process.env,
  })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

if (!existsSync(path.join(ecpRoot, "package.json"))) {
  console.error(`Core monorepo not found at ${ecpRoot}. Clone it next to this repo or set ECP_ROOT.`)
  process.exit(1)
}

if (!existsSync(path.join(ecpRoot, "packages", "core", "dist", "index.js"))) {
  run("pnpm", ["install", "--frozen-lockfile"], ecpRoot)
  run("pnpm", ["run", "build"], ecpRoot)
  run("pnpm", ["run", "generate:schema"], ecpRoot)
}

installEcpFromSiblings()
console.log("\nsync:ecp complete")
