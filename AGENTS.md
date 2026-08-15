# AGENTS.md — vendor extensions monorepo

Sibling of the [core ECP monorepo](https://github.com/GuillaumeCleme/executioncontrolprotocol). This repo holds **vendor** extensions only.

## Agent skill

```bash
npx skills add executioncontrolprotocol/extensions --skill ecp-extensions -y
```

Consumer Fluent / CLI: docs skill via `npx skills add https://executioncontrolprotocol.io`. Core monorepo: `ecp-core` from the core repo.

## Boundaries

| May depend on | Must not depend on |
| ------------- | ------------------ |
| `@executioncontrolprotocol/types` | `@executioncontrolprotocol/node` |
| `@executioncontrolprotocol/core` | `@executioncontrolprotocol/browser` |
| `zod` (peer) | `@executioncontrolprotocol/cli` |
| Focused vendor SDKs (`@fal-ai/client`, `sharp`, …) | `@executioncontrolprotocol/mcp` |

## Authoring

1. `defineExtension("@executioncontrolprotocol", "name").withCapabilities([...]).build()`
2. **Required:** `catalogExtension(def)` at module load in `src/index.ts`
3. Export idempotent `register*Extension(registry?)`
4. Align **npm package name** with **extension id** (`@executioncontrolprotocol/fal` → id `@executioncontrolprotocol/fal`)

See `.cursor/rules/extensions.mdc`.

## Commands

```sh
npm install
npm run build
npm run check
npm run secrets:scan
```
