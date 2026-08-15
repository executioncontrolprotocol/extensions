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

**Local / CI dogfood:** `devDependencies` use `file:../executioncontrolprotocol/packages/{core,types}` so a sibling checkout of the core monorepo shares one `globalRegistry` with apps (e.g. browser-demo). CI checks out both repos side by side for the same reason.

Published packages still declare `peerDependencies` on the npm range (`^0.10.0`) so consumers install peers from the registry.

## Examples

Vendor workflow examples live in this repo:

- `examples/03-fal-chain` — FAL generate chain
- `examples/04-image-prep` — Sharp image prep
- `examples/02-weekly-brief-with-slack` — memory + OpenAI + Slack
- `examples/adobe-firefly-smoke` — Adobe Firefly Services auth smoke
- `examples/azure-adobe-assets` — Azure Blob upload + Firefly Image5 recolor

They require a core monorepo checkout (or published `@executioncontrolprotocol/node`) plus these packages.

## Publish

On push to `main`, CI runs `npm run publish:workspaces` (requires `NPM_TOKEN`). Versions in this repo are independent of the core monorepo.
