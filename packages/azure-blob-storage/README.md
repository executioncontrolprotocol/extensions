# `@executioncontrolprotocol/azure-blob-storage`

Upload, SAS minting, and download for Azure Blob Storage.

- `upload` is **mixed**: the browser handler reads a stashed `File` (`ecp://browser/<id>`), hops `create-sas-url` to `ecp up`, then `PUT`s from the tab. Node `filePath` / `sourceUrl` / `contentBase64` is unchanged.
- `create-sas-url` and `download` are **host** (account key stays on the local daemon).

Browser PUT requires container CORS for the demo origin (`PUT`, expose `ETag`, allow `x-ms-blob-type` and `Content-Type`).
