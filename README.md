# ECP vendor extensions

First-party **vendor** extensions for [Execution Control Protocol](https://github.com/GuillaumeCleme/executioncontrolprotocol), published from this repo so they exercise the same package boundary as third-party authors.

Protocol/platform extensions (formats, secrets, memory, model providers such as Ollama) remain in the core monorepo.

## Packages

| Package | Extension id |
| ------- | ------------ |
| `@executioncontrolprotocol/fal` | `@executioncontrolprotocol/fal` |
| `@executioncontrolprotocol/slack` | `@executioncontrolprotocol/slack` |
| `@executioncontrolprotocol/image-sharp` | `@executioncontrolprotocol/image-sharp` |
| `@executioncontrolprotocol/azure-blob-storage` | `@executioncontrolprotocol/azure-blob-storage` |
| `@executioncontrolprotocol/adobe` | `@executioncontrolprotocol/adobe` (scaffold) |

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

**Local / CI dogfood:** do not use `"file:..."` in `package.json`. For a sibling core checkout, `npm link` `@executioncontrolprotocol/core` and `@executioncontrolprotocol/types` after `npm run build` in the core monorepo so one `globalRegistry` is shared with apps (e.g. browser-demo).

Published packages still declare `peerDependencies` on the npm range (`^0.12.0`) so consumers install peers from the registry.

## Examples

Vendor workflow examples live in this repo (see `examples/README.md`):

- `examples/03-fal-chain` — FAL generate chain
- `examples/04-image-prep` — Sharp image prep
- `examples/02-weekly-brief-with-slack` — memory + OpenAI + Slack

They require a core monorepo checkout (or published `@executioncontrolprotocol/node`) plus these packages.

## Agent skill

```bash
npx skills add executioncontrolprotocol/extensions --skill ecp-extensions -y
```

## Publish

On push to `main`, CI runs `npm run publish:workspaces` (requires `NPM_TOKEN`). Versions in this repo are independent of the core monorepo.
