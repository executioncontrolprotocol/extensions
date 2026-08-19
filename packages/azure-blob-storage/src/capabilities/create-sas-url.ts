import { z } from "zod"
import {
  createAzureBlobCredentials,
  readAzureConfig,
  resolveContainer,
} from "../client.js"
import { createBlobSasUrl, SAS_PERMISSION_CHARS } from "../sas.js"

/** Create-SAS capability input. @category Azure */
export const createSasUrlInputSchema = z.object({
  container: z.string().min(1).optional(),
  blobName: z.string().min(1),
  permissions: z.array(z.enum(SAS_PERMISSION_CHARS)).min(1),
  expiresInSeconds: z.number().int().positive().optional(),
})

/** Create-SAS capability output. @category Azure */
export const createSasUrlOutputSchema = z.object({
  sasUrl: z.string(),
  expiresAt: z.string(),
  permissions: z.string(),
})

/**
 * Mint a blob SAS URL.
 * @category Azure
 */
export async function handleCreateSasUrl(
  input: unknown,
  ctx: unknown,
): Promise<z.infer<typeof createSasUrlOutputSchema>> {
  const parsed = createSasUrlInputSchema.parse(input)
  const credentials = createAzureBlobCredentials(readAzureConfig(ctx))
  const container = resolveContainer(credentials, parsed.container)
  const expiresInSeconds =
    parsed.expiresInSeconds ?? credentials.defaultSasExpiresInSeconds

  return createSasUrlOutputSchema.parse(
    createBlobSasUrl({
      credentials,
      container,
      blobName: parsed.blobName,
      permissions: parsed.permissions,
      expiresInSeconds,
    }),
  )
}
