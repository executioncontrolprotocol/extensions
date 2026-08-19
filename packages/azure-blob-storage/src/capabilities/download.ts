import { z } from "zod"
import {
  createAzureBlobCredentials,
  readAzureConfig,
  resolveContainer,
} from "../client.js"

/** Download capability input. @category Azure */
export const downloadInputSchema = z.object({
  container: z.string().min(1).optional(),
  blobName: z.string().min(1),
})

/** Download capability output. @category Azure */
export const downloadOutputSchema = z.object({
  contentBase64: z.string(),
  contentType: z.string(),
  blobName: z.string(),
})

/**
 * Download a blob as base64.
 * @category Azure
 */
export async function handleDownload(
  input: unknown,
  ctx: unknown,
): Promise<z.infer<typeof downloadOutputSchema>> {
  const parsed = downloadInputSchema.parse(input)
  const credentials = createAzureBlobCredentials(readAzureConfig(ctx))
  const container = resolveContainer(credentials, parsed.container)
  const blob = credentials.client.getContainerClient(container).getBlobClient(parsed.blobName)
  const download = await blob.download()
  const chunks: Buffer[] = []
  if (!download.readableStreamBody) {
    throw new Error(`Azure blob download returned no body for ${parsed.blobName}`)
  }
  for await (const chunk of download.readableStreamBody) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  const buffer = Buffer.concat(chunks)
  return downloadOutputSchema.parse({
    contentBase64: buffer.toString("base64"),
    contentType: download.contentType ?? "application/octet-stream",
    blobName: parsed.blobName,
  })
}
