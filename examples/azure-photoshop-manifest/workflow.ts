import { workflow, step, ref } from "@executioncontrolprotocol/core"

/**
 * Minimal 1x1 RGB PSD (`sample.psd`) — enough for upload + generate-manifest smoke.
 * Replace with a real layered PSD via contentBase64 / sourceUrl / filePath for live runs.
 */
const FIXTURE_PSD_BASE64 =
  "OEJQUwABAAAAAAAAAAMAAAABAAAAAQAIAAMAAAAAAAAAAAAAAAAAAP8AAA=="

/**
 * Upload a PSD to Azure, mint a write SAS for the manifest JSON, call Photoshop
 * generate-manifest (poll), then download the manifest blob.
 */
export default workflow("Azure Blob + Photoshop generate-manifest")
  .run([
    step("@executioncontrolprotocol/azure-blob-storage.upload", "Upload PSD")
      .with({
        contentBase64: FIXTURE_PSD_BASE64,
        contentType: "image/vnd.adobe.photoshop",
        blobName: "sample.psd",
        createReadSas: true,
      })
      .as("upload"),

    step("@executioncontrolprotocol/azure-blob-storage.create-sas-url", "Write SAS for manifest")
      .with({
        blobName: "sample-manifest.json",
        permissions: ["r", "c", "w"],
      })
      .as("dest"),

    step(
      "@executioncontrolprotocol/adobe-firefly-services.photoshop-generate-manifest",
      "Generate PSD manifest",
    )
      .with({
        poll: true,
        body: {
          image: { source: { url: ref("upload.sasUrl") } },
          outputs: [
            {
              mediaType: "application/json",
              destination: {
                storageType: "azure",
                url: ref("dest.sasUrl"),
              },
            },
          ],
        },
      })
      .as("manifest"),

    step("@executioncontrolprotocol/azure-blob-storage.download", "Download manifest JSON")
      .with({
        blobName: "sample-manifest.json",
      })
      .as("downloaded"),
  ])
