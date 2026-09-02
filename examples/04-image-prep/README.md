# Image prep (image-sharp)

Sharp steps are **host** capabilities: they run on Node via `@executioncontrolprotocol/node`, not in the browser bundle.

## Prerequisites

Build the extensions monorepo first. Do **not** use `file:` deps — link peers from the sibling core checkout.

```sh
# core monorepo (sibling checkout)
cd ../../../executioncontrolprotocol
pnpm install && pnpm run build

# extensions monorepo
cd ../extensions
pnpm install
pnpm run link:ecp
pnpm run build

# this example
cd examples/04-image-prep
pnpm install
```

`@executioncontrolprotocol/node` and `@executioncontrolprotocol/policies` resolve from npm at `^0.13.2`. For unpublished CLI builds, link the CLI from the core checkout (`pnpm link --global` in `packages/cli` after `pnpm run build`).

## 1. CLI smoke test

From `examples/04-image-prep` (after setup above):

```sh
ecp validate workflow.ts --env environment.ts
ecp run workflow.ts --env environment.ts
```

Expect `imageInfo` metadata and a `thumb` WebP artifact in the run output.

## 2. Browser + local host (full E2E)

The workflow graph stays in the browser; each `@executioncontrolprotocol/image-sharp.*` step **hops** to `ecp up` (`POST /v1/invoke`).

```sh
cd examples/04-image-prep
npx ecp up --env environment.ts --open-url http://localhost:5173/
```

`ecp up` prints a pairing token and opens the demo with `?token=…`.

### Browser demo

1. Run the demo: `pnpm run dev` in [browser-demo](https://github.com/executioncontrolprotocol/browser-demo).
2. Confirm pairing (Settings, or URL query params from `ecp up`).
3. Paste the Fluent workflow from `workflow.ts` into the Code panel.
4. Run the workflow.

**What to look for**

| Signal | Meaning |
| ------ | ------- |
| Step badge **Runs on local host** | `describe()` resolved execution as `host` |
| Unpaired → run fails | Fail-closed when `ecp up` is down |
| Paired → run succeeds | Browser hopped each Sharp step to the daemon |

### Optional: invoke one step

```sh
ecp invoke @executioncontrolprotocol/image-sharp.inspect \
  --env environment.ts \
  --input '{"image":{"kind":"buffer","data":"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==","mediaType":"image/png"},"include":["metadata"]}'
```

## Capabilities used

| Step | Id | Execution |
| ---- | -- | --------- |
| Inspect | `@executioncontrolprotocol/image-sharp.inspect` | host |
| Resize | `@executioncontrolprotocol/image-sharp.resize` | host |

See [`packages/image-sharp/README.md`](../../packages/image-sharp/README.md) for the full capability list.
