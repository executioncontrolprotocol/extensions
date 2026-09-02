# AGENTS.md — vendor extensions monorepo

Sibling of the [core ECP monorepo](https://github.com/executioncontrolprotocol/executioncontrolprotocol). This repo holds **vendor** extensions only.

**Canonical package inventory:** [README Packages](./README.md#packages). Core monorepo docs must link here instead of duplicating vendor lists.

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
5. When adding/removing a package, update [README.md Packages](./README.md#packages) (this is the inventory core docs link to)
6. Native/SDK Node graphs: ship `exports["."].browser` catalog (`index.browser.ts`). `catalogExtension` on both entries. No `sharp`, `@azure/storage-blob`, or `node:fs` on the browser graph. Execution stays `local` | `host` | `mixed`; bundler conditions stay `browser` | `node`. Consumers import the package root only.
7. **Media I/O:** use `resolveFile` / `writeMediaArtifact` from `@executioncontrolprotocol/core` for buffers, paths, URLs, artifacts, and `ecp://browser/…` locators. Do not reimplement fs/fetch/artifact maps in the extension.

Vendor packages declare `core` / `types` as **peerDependencies only** (not devDependencies). Local builds and CI use `pnpm run link:ecp` after building the sibling core monorepo.

See `.cursor/rules/extensions.mdc`.

**No `file:` package links.** Never put `"file:..."` in `package.json` dependency fields. For local unpublished `@executioncontrolprotocol/core` / `types`, use `pnpm run link:ecp` after building the core monorepo.

## Commands

```sh
pnpm install
pnpm run build
pnpm run lint
pnpm run check
pnpm run secrets:scan
```

Husky pre-commit runs `lint-staged` (secretlint), `pnpm run lint`, `pnpm run build`, and `pnpm run test`.

## CI (two-track)

- **`main`:** `pnpm install --frozen-lockfile` and CI (`build`, `lint`, `test`) against **published** `@executioncontrolprotocol/core` / `types` from the npm registry.
- **`development` (and PRs not targeting `main`):** CI checks out the sibling [core monorepo](https://github.com/executioncontrolprotocol/executioncontrolprotocol) at `development`, runs `pnpm run ci:setup` (build + `link:ecp`), then `pnpm run build`, `pnpm run lint`, and `pnpm run test`.
