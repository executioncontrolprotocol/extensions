# @executioncontrolprotocol/azure-blob-storage

Azure Blob Storage extension for ECP. Upload binaries, mint HTTPS SAS URLs, and download blobs — designed to feed allow-listed asset URLs into [`@executioncontrolprotocol/adobe-firefly-services`](../adobe-firefly-services/) (Firefly `referenceBlobs`, Photoshop `source.url` / write destinations).

## Binding

```ts
import "@executioncontrolprotocol/azure-blob-storage"
import { environment, extension, secrets } from "@executioncontrolprotocol/node"

export default environment("azure-demo")
  .withExtensions([
    extension("@executioncontrolprotocol/secrets").with({}),
    extension("@executioncontrolprotocol/azure-blob-storage").with({
      connectionString: secrets("azure-blob-storage/connection-string"),
      // or:
      // accountName: secrets("azure-blob-storage/account-name"),
      // accountKey: secrets("azure-blob-storage/account-key"),
      defaultContainer: "artifacts",
      defaultSasExpiresInSeconds: 3600,
    }),
  ])
```

## Capabilities

| Id | Purpose |
| -- | ------- |
| `@executioncontrolprotocol/azure-blob-storage.upload` | Put bytes (`contentBase64` \| `sourceUrl` \| `filePath`); optional `createReadSas` |
| `@executioncontrolprotocol/azure-blob-storage.create-sas-url` | Mint read/write SAS (`permissions: ["r"]` or `["r","c","w"]` for Photoshop destinations) |
| `@executioncontrolprotocol/azure-blob-storage.download` | Fetch blob as `contentBase64` |

## Adobe Firefly

See [`examples/azure-adobe-assets/`](../../examples/azure-adobe-assets/) — upload a reference image, then call Image5 generate with `referenceBlobs[0].source.url: ref("upload.sasUrl")`.
