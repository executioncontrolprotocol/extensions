import { z } from "zod"

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
