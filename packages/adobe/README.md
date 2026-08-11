# @executioncontrolprotocol/adobe

Adobe Firefly Services extension for ECP. One package exposes **family-prefixed** capabilities generated from vendored OpenAPI specs (Photoshop **v2** only).

Auth uses current [OAuth Server-to-Server](https://developer.adobe.com/developer-console/docs/guides/authentication/ServerToServerAuthentication/) (`client_credentials`). Bind credentials with `secrets()` / `env()` — not deprecated JWT technical accounts.

Guide index: [Firefly Services docs](https://developer.adobe.com/firefly-services/docs/guides/).

## Binding

```ts
import "@executioncontrolprotocol/adobe"
import { environment, extension, secrets } from "@executioncontrolprotocol/node"

export default environment("adobe-demo")
  .withExtensions([
    extension("@executioncontrolprotocol/secrets").with({}),
    extension("@executioncontrolprotocol/adobe").with({
      clientId: secrets("adobe/client-id"),
      clientSecret: secrets("adobe/client-secret"),
      // scopes: optional; defaults to Firefly Services S2S scopes
    }),
  ])
```

## Families

| Prefix | Spec (under `openapi/`) | Notes |
| ------ | ----------------------- | ----- |
| `firefly` | `firefly/firefly-api.json` | Generative image/video/etc. |
| `photoshop` | `photoshop/photoshopv2-api.json` | v2 only; absorbs Lightroom-style workflows |
| `express` | `express/ffs-express-api.json` | Express (beta) |
| `indesign` | `indesign/indesignapi.json` | InDesign |
| `substance3d` | `substance3d/openapi.yaml` | Substance 3D |
| `illustrator` | `illustrator/*.json` | GA + beta merged |
| `creative-production` | `creative-production/workflow-builder-api.yaml` | Workflow Builder |
| `audio-video` | `audio-video/*.json` | Audio/Video + translate/lipsync |

Capability ids: `@executioncontrolprotocol/adobe.<family>.<kebab-operationId>`  
Example: `@executioncontrolprotocol/adobe.firefly.generate-images-v3-async`.

Photoshop v1 and standalone Lightroom OpenAPI are **out of scope** (v2 supersedes them).

**Content Tagging:** no Firefly Services OpenAPI is published under AdobeDocs `ffs-*` yet — see `openapi/content-tagging/SOURCE.md`. Express tagged-document endpoints live under the `express` family.

## Capability input shape

Generated handlers merge OpenAPI path/query/header/body into:

```ts
{
  path?: { ... },
  query?: { ... },
  headers?: { ... },
  body?: { ... },
  poll?: boolean,
  pollIntervalMs?: number,
  pollTimeoutMs?: number,
}
```

When `poll: true` and the response includes a status URL, the runtime polls until success/failure/timeout.

## Codegen

```sh
npm run fetch:specs -w @executioncontrolprotocol/adobe   # network
npm run generate -w @executioncontrolprotocol/adobe      # offline from openapi/
```

Generated sources under `src/generated/` are committed. Empty free-form OpenAPI objects fail the generator (use `openapi/overlays/`); `z.unknown` / `z.any` / untyped `z.record` are forbidden.

## Example

See [`examples/adobe-firefly-smoke/`](../../examples/adobe-firefly-smoke/) for a thin env + workflow (Firefly generate + Photoshop status).
