import type { CapabilityMetadata, ExtensionMetadata } from "@executioncontrolprotocol/types"

/** Extension-level agent docs for `@executioncontrolprotocol/azure-blob-storage`. @category Azure */
export const AZURE_BLOB_STORAGE_EXTENSION_METADATA: ExtensionMetadata = {
  summary: "Upload, download, and mint SAS URLs for Azure Blob Storage",
  description:
    "Host-backed blob storage for workflows that persist media, share time-limited read links, or fetch objects into artifacts. Supports connection-string or account key credentials and mixed browser upload via SAS.",
  useCases: [
    "Store generated media in Azure for later workflow steps",
    "Mint read-only SAS URLs for external services that fetch by URL",
    "Download blobs into local artifacts for processing",
  ],
  samplePrompts: [
    "Upload this file to Azure Blob Storage",
    "Create a read-only SAS URL for the uploaded blob",
  ],
}

/** Agent docs keyed by capability name. @category Azure */
export const AZURE_BLOB_STORAGE_CAPABILITY_METADATA = {
  upload: {
    summary: "Upload bytes or a file reference to a blob",
    description:
      "Writes content to a named blob in a container from a base64 payload, local path, artifact locator, or browser file reference. Returns the blob location and optional SAS URL.",
    useCases: [
      "Persist workflow output to durable cloud storage",
      "Stage user uploads before downstream processing",
    ],
    samplePrompts: [
      "Upload this image to Azure blobs in the media container",
      "Store the generated file as uploads/report.pdf",
    ],
  },
  "create-sas-url": {
    summary: "Mint a time-limited SAS URL for a blob",
    description:
      "Generates a shared-access signature URL with chosen read, write, or delete permissions and expiry for an existing blob in a container.",
    useCases: [
      "Share a temporary read link with an external API",
      "Authorize a browser PUT for mixed upload flows",
    ],
    samplePrompts: [
      "Create a read-only SAS URL valid for one hour",
      "Generate a write SAS so the browser can upload the blob",
    ],
  },
  download: {
    summary: "Download a blob into a workflow artifact",
    description:
      "Fetches blob bytes from Azure Storage and stores them as a media artifact with content type and name for local processing.",
    useCases: [
      "Pull stored assets back into a workflow for editing",
      "Retrieve remote blobs for inspection or transformation",
    ],
    samplePrompts: [
      "Download the blob exports/data.json from Azure",
      "Fetch the stored image so we can resize it",
    ],
  },
} as const satisfies Record<string, CapabilityMetadata>
