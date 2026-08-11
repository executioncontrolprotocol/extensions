import {
  defineExtension,
  capabilityFor,
  globalRegistry,
  catalogExtension,
  type Registry,
} from "@executioncontrolprotocol/core"
import { z } from "zod"
import { handleUpload, uploadInputSchema, uploadOutputSchema } from "./capabilities/upload.js"
import {
  handleCreateSasUrl,
  createSasUrlInputSchema,
  createSasUrlOutputSchema,
} from "./capabilities/create-sas-url.js"
import {
  handleDownload,
  downloadInputSchema,
  downloadOutputSchema,
} from "./capabilities/download.js"

const EXT_ID = "@executioncontrolprotocol/azure-blob-storage"

/**
 * `@executioncontrolprotocol/azure-blob-storage` — Azure Blob upload, SAS, and download.
 *
 * Bind credentials via `secrets("azure-blob-storage/connection-string")` or
 * `accountName` + `accountKey`. Mint read SAS URLs for Adobe Firefly
 * `referenceBlobs` / Photoshop `source.url`.
 *
 * @category Extensions
 */
export const azureBlobStorageExtension = defineExtension(
  "@executioncontrolprotocol",
  "azure-blob-storage",
)
  .withConfig({
    /** Full Azure Storage connection string. */
    connectionString: z.string().optional(),
    /** Storage account name (with accountKey). */
    accountName: z.string().optional(),
    /** Storage account key (with accountName). */
    accountKey: z.string().optional(),
    /** Default container when capability input omits container. */
    defaultContainer: z.string().optional(),
    /** Default SAS lifetime in seconds (default 3600). */
    defaultSasExpiresInSeconds: z.number().int().positive().optional(),
  })
  .withCapabilities([
    capabilityFor(EXT_ID, "upload")
      .withInput(uploadInputSchema)
      .withOutput(uploadOutputSchema)
      .withHandler(async (input, ctx) => handleUpload(input, ctx)),
    capabilityFor(EXT_ID, "create-sas-url")
      .withInput(createSasUrlInputSchema)
      .withOutput(createSasUrlOutputSchema)
      .withHandler(async (input, ctx) => handleCreateSasUrl(input, ctx)),
    capabilityFor(EXT_ID, "download")
      .withInput(downloadInputSchema)
      .withOutput(downloadOutputSchema)
      .withHandler(async (input, ctx) => handleDownload(input, ctx)),
  ])
  .build()

catalogExtension(azureBlobStorageExtension)

/**
 * Register `@executioncontrolprotocol/azure-blob-storage` on a registry.
 *
 * @category Extensions
 */
export async function registerAzureBlobStorageExtension(
  registry: Registry = globalRegistry,
): Promise<void> {
  if (!registry.getExtension(EXT_ID)) {
    await registry.registerExtension(azureBlobStorageExtension)
  }
}

export {
  createAzureBlobCredentials,
  readAzureConfig,
  resolveContainer,
} from "./client.js"
export type { AzureBlobStorageConfig, AzureBlobCredentials } from "./client.js"
export { createBlobSasUrl, SAS_PERMISSION_CHARS } from "./sas.js"
export type { SasPermissionChar, CreateBlobSasOptions } from "./sas.js"
export { uploadInputSchema, uploadOutputSchema, handleUpload } from "./capabilities/upload.js"
export {
  createSasUrlInputSchema,
  createSasUrlOutputSchema,
  handleCreateSasUrl,
} from "./capabilities/create-sas-url.js"
export {
  downloadInputSchema,
  downloadOutputSchema,
  handleDownload,
} from "./capabilities/download.js"

export default azureBlobStorageExtension
