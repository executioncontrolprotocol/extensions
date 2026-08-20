import { z } from "zod"
import { isBrowserFileLocator } from "@executioncontrolprotocol/core"
import {
  createAzureBlobCredentials,
  readAzureConfig,
  resolveContainer,
} from "../client.js"
import { createBlobSasUrl } from "../sas.js"
import { handleMixedUpload } from "./upload-mixed.js"
import { uploadInputSchema, uploadOutputSchema } from "./upload-schema.js"

export { uploadInputSchema, uploadOutputSchema }

function locatorFromInput(input: z.infer<typeof uploadInputSchema>): string | undefined {
  if (typeof input.source === "string" && input.source.length > 0) return input.source
  if (typeof input.filePath === "string" && input.filePath.length > 0) return input.filePath
  return undefined
}

/**
 * Resolve upload bytes from Node inputs (path, URL, or base64).
 * @category Azure
 */
export async function resolveUploadBytes(input: z.infer<typeof uploadInputSchema>): Promise<{
  buffer: Buffer
  contentType: string
}> {
  if (input.contentBase64) {
    const buffer = Buffer.from(input.contentBase64, "base64")
    return { buffer, contentType: input.contentType ?? "application/octet-stream" }
  }
  if (input.sourceUrl) {
    const res = await fetch(input.sourceUrl)
    if (!res.ok) throw new Error(`Failed to fetch sourceUrl (${res.status})`)
    const buffer = Buffer.from(await res.arrayBuffer())
    const contentType =
      input.contentType ?? res.headers.get("content-type") ?? "application/octet-stream"
    return { buffer, contentType }
  }
  if (input.filePath) {
    const { readFile } = await import("node:fs/promises")
    const buffer = await readFile(input.filePath)
    return { buffer, contentType: input.contentType ?? "application/octet-stream" }
  }
  throw new Error("No upload source provided")
}

async function handleNodeUpload(
  parsed: z.infer<typeof uploadInputSchema>,
  ctx: unknown,
): Promise<z.infer<typeof uploadOutputSchema>> {
  const { randomUUID } = await import("node:crypto")
  const credentials = createAzureBlobCredentials(readAzureConfig(ctx))
  const container = resolveContainer(credentials, parsed.container)
  const blobName = parsed.blobName ?? randomUUID()
  const { buffer, contentType } = await resolveUploadBytes(parsed)

  const blockBlob = credentials.client
    .getContainerClient(container)
    .getBlockBlobClient(blobName)

  const result = await blockBlob.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: contentType },
  })

  const blobUrl = blockBlob.url
  let sasUrl: string | undefined
  if (parsed.createReadSas) {
    const expiresInSeconds =
      parsed.sasExpiresInSeconds ?? credentials.defaultSasExpiresInSeconds
    sasUrl = createBlobSasUrl({
      credentials,
      container,
      blobName,
      permissions: ["r"],
      expiresInSeconds,
    }).sasUrl
  }

  return uploadOutputSchema.parse({
    container,
    blobName,
    blobUrl,
    contentType,
    etag: result.etag,
    sasUrl,
  })
}

/**
 * Upload a blob to Azure Blob Storage.
 * Browser locators (`ecp://browser/<id>`) run mixed: hop create-sas-url, PUT from the tab.
 * Container CORS must allow the demo origin for that PUT.
 * Node `filePath` / `sourceUrl` / `contentBase64` is unchanged.
 * @category Azure
 */
export async function handleUpload(
  input: unknown,
  ctx: unknown,
): Promise<z.infer<typeof uploadOutputSchema>> {
  const parsed = uploadInputSchema.parse(input)
  const locator = locatorFromInput(parsed)
  if (locator && isBrowserFileLocator(locator)) {
    return handleMixedUpload(input, ctx)
  }
  const nodeInput =
    parsed.source && !parsed.filePath
      ? { ...parsed, filePath: parsed.source, source: undefined }
      : parsed
  return handleNodeUpload(nodeInput, ctx)
}
