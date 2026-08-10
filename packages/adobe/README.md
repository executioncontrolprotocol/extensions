# @executioncontrolprotocol/adobe

Adobe / Firefly extension scaffold for ECP. The `generateImage` capability is a stub for dogfooding third-party authoring from this external monorepo — not a production Adobe SDK integration.

## Binding

```ts
import "@executioncontrolprotocol/adobe"
import { environment, extension } from "@executioncontrolprotocol/node"

export default environment("adobe-demo").withExtensions([
  extension("@executioncontrolprotocol/adobe").with({
    clientId: "…",
  }),
])
```

## Capability: `@executioncontrolprotocol/adobe.generateImage`

**Input:** `{ prompt, model? }`

**Output:** `{ ok, prompt, imageUrl? }` (stub URL until a real Firefly client is wired)
