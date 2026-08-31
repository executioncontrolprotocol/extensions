# ECP vendor extensions

First-party **vendor** extensions for [Execution Control Protocol](https://github.com/executioncontrolprotocol/executioncontrolprotocol), published from this repo so they exercise the same package boundary as third-party authors.

Protocol/platform extensions (formats, secrets, memory, model providers such as Ollama) remain in the core monorepo.

This README’s **Packages** table is the canonical vendor inventory. Core docs should link here instead of listing packages.

## Packages

| Package | Extension id |
| ------- | ------------ |
| `@executioncontrolprotocol/fal` | `@executioncontrolprotocol/fal` |
| `@executioncontrolprotocol/slack` | `@executioncontrolprotocol/slack` |
| `@executioncontrolprotocol/image-sharp` | `@executioncontrolprotocol/image-sharp` |
| `@executioncontrolprotocol/adobe-firefly-services` | `@executioncontrolprotocol/adobe-firefly-services` |
| `@executioncontrolprotocol/azure-blob-storage` | `@executioncontrolprotocol/azure-blob-storage` |

npm package names match extension ids. Import and bind with the same identifier:

```ts
import "@executioncontrolprotocol/fal"
import { environment, extension } from "@executioncontrolprotocol/node"

const env = await environment("demo").withExtensions([
  extension("@executioncontrolprotocol/fal").with({ apiKey: "…" }),
])
```

## Dependencies

Extensions peer on `@executioncontrolprotocol/core`, `@executioncontrolprotocol/types`, and `zod` only. They must not import `@executioncontrolprotocol/node`, `browser`, `cli`, or `mcp`.

Packages with native or Node-only SDKs (`image-sharp`, `azure-blob-storage`) publish `exports["."].browser` so Vite never loads `sharp` / `@azure/storage-blob`. Import the package root; do not import `index.browser` by path.

**Local / CI dogfood:** do not use `"file:..."` in `package.json`. Vendor packages declare `@executioncontrolprotocol/core` / `types` as **peerDependencies** only (not devDependencies), so `npm ci` does not require an unpublished registry version. CI and local builds run `npm run link:ecp` after building the sibling core monorepo (junction-links `core` and `types` into `node_modules`).

Published packages still declare `peerDependencies` on the npm range (`^0.13.0`) so consumers install peers from the registry.

## Examples

Vendor workflow examples live in this repo (see `examples/README.md`):

- `examples/03-fal-chain` — FAL generate chain
- `examples/04-image-prep` — Sharp image prep
- `examples/02-weekly-brief-with-slack` — memory + OpenAI + Slack
- `examples/adobe-firefly-smoke` — Adobe Firefly Services auth smoke
- `examples/azure-adobe-assets` — Azure Blob upload + Firefly Image5 recolor

They require a core monorepo checkout (or published `@executioncontrolprotocol/node`) plus these packages.

## Agent skill

```bash
npx skills add executioncontrolprotocol/extensions --skill ecp-extensions -y
```

## Publish

On push to `main`, CI runs `npm run publish:workspaces` (requires `NPM_TOKEN`). Versions in this repo are independent of the core monorepo.
