import { z } from "zod"
import { randomUUID } from "node:crypto"
import { readFile } from "node:fs/promises"
import {
  createAzureBlobCredentials,
  readAzureConfig,
  resolveContainer,
} from "../client.js"
import { createBlobSasUrl } from "../sas.js"

/** Upload capability input. @category Azure */
export const uploadInputSchema = z
  .object({
    container: z.string().min(1).optional(),
    blobName: z.string().min(1).optional(),
    contentType: z.string().min(1).optional(),
    contentBase64: z.string().min(1).optional(),
    sourceUrl: z.string().url().optional(),
    filePath: z.string().min(1).optional(),
    createReadSas: z.boolean().optional(),
    sasExpiresInSeconds: z.number().int().positive().optional(),
  })
  .superRefine((val, ctx) => {
    const sources = [val.contentBase64, val.sourceUrl, val.filePath].filter(Boolean)
    if (sources.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Provide exactly one of contentBase64, sourceUrl, or filePath",
      })
    }
  })

/** Upload capability output. @category Azure */
export const uploadOutputSchema = z.object({
  container: z.string(),
  blobName: z.string(),
  blobUrl: z.string(),
  contentType: z.string(),
  etag: z.string().optional(),
  sasUrl: z.string().optional(),
})

/**
 * Resolve upload bytes from input.
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
    const buffer = await readFile(input.filePath)
    return { buffer, contentType: input.contentType ?? "application/octet-stream" }
  }
  throw new Error("No upload source provided")
}

/**
 * Upload a blob to Azure Blob Storage.
 * @category Azure
 */
export async function handleUpload(input: unknown, ctx: unknown) {
  const parsed = uploadInputSchema.parse(input)
  const credentials = createAzureBlobCredentials(readAzureConfig(ctx))
  const container = resolveContainer(credentials, parsed.container)
  const blobName = parsed.blobName ?? `${randomUUID()}`
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
