/* eslint-disable */
/** Generated Adobe express browser catalog — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { HOST_HOP_MESSAGE } from "../../shared.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"
async function hostHop(): Promise<never> {
  throw new Error(HOST_HOP_MESSAGE)
}

/** Tagged documents */
export const express_tagged_documents = capabilityFor(EXT_ID, "express-tagged-documents")
  .withInput(z.object({
  query: z.object({
  "start": z.number().int().optional(),
  "limit": z.number().int().optional(),
  "sortBy": schemas.Schema_TaggedDocumentsSortBy.optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_TaggedDocumentsResponse)
  .withHandler(hostHop)

/** Tagged document details */
export const express_tagged_document_details = capabilityFor(EXT_ID, "express-tagged-document-details")
  .withInput(z.object({
  path: z.object({
  "documentId": z.string()
}),
  query: z.object({
  "start": z.number().int().optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_TaggedDocumentDetailsResponse)
  .withHandler(hostHop)

/** Generate variation */
export const express_generate_variation = capabilityFor(EXT_ID, "express-generate-variation")
  .withInput(z.object({
  body: schemas.Schema_GenerateVariationRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobResponse)
  .withHandler(hostHop)

/** Export rendition */
export const express_export_rendition = capabilityFor(EXT_ID, "express-export-rendition")
  .withInput(z.object({
  body: schemas.Schema_ExportRenditionRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobResponse)
  .withHandler(hostHop)

/** Job status */
export const express_get_job_status = capabilityFor(EXT_ID, "express-get-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.union([schemas.Schema_JobStatusResponse, schemas.Schema_ExportRenditionResponse, schemas.Schema_GenerateVariationResponse]))
  .withHandler(hostHop)
