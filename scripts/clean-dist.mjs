import { rmSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { readdirSync } from "node:fs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const packagesDir = join(root, "packages")

for (const name of readdirSync(packagesDir)) {
  const dist = join(packagesDir, name, "dist")
  try {
    rmSync(dist, { recursive: true, force: true })
  } catch {
    // ignore
  }
}
