# Authoring vendor extensions

1. `defineExtension("@executioncontrolprotocol", "name").withCapabilities([...]).build()`
2. **Required:** `catalogExtension(def)` at module load in `src/index.ts`
3. Export idempotent `register*Extension(registry?)`
4. Align **npm package name** with **extension id**
5. When adding/removing a package, update [README.md Packages](../../README.md#packages)

Prefer consumer bind via catalog import:

```ts
import "@executioncontrolprotocol/fal"
import { environment, extension, secrets } from "@executioncontrolprotocol/node"

extension("@executioncontrolprotocol/fal").with({
  apiKey: secrets("fal/api-key"),
})
```

Test handlers with fixtures and `environment()` from **core** — not host runtimes.

See `.cursor/rules/extensions.mdc` for the full recipe.
