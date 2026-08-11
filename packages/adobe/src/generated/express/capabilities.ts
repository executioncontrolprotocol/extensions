/* eslint-disable */
/** Generated Adobe express capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe"

/** Tagged documents */
export const express_tagged_documents = capabilityFor(EXT_ID, "express.tagged-documents")
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
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/beta/tagged-documents",
      baseUrl: "https://express-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_TaggedDocumentsResponse,
    })
  })

/** Tagged document details */
export const express_tagged_document_details = capabilityFor(EXT_ID, "express.tagged-document-details")
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
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/beta/tagged-documents/{documentId}",
      baseUrl: "https://express-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_TaggedDocumentDetailsResponse,
    })
  })

/** Generate variation */
export const express_generate_variation = capabilityFor(EXT_ID, "express.generate-variation")
  .withInput(z.object({
  body: schemas.Schema_GenerateVariationRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/beta/generate-variation",
      baseUrl: "https://express-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobResponse,
    })
  })

/** Export rendition */
export const express_export_rendition = capabilityFor(EXT_ID, "express.export-rendition")
  .withInput(z.object({
  body: schemas.Schema_ExportRenditionRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/beta/export-rendition",
      baseUrl: "https://express-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobResponse,
    })
  })

/** Job status */
export const express_get_job_status = capabilityFor(EXT_ID, "express.get-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.union([schemas.Schema_JobStatusResponse, schemas.Schema_ExportRenditionResponse, schemas.Schema_GenerateVariationResponse]))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/status/{jobId}",
      baseUrl: "https://express-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: z.union([schemas.Schema_JobStatusResponse, schemas.Schema_ExportRenditionResponse, schemas.Schema_GenerateVariationResponse]),
    })
  })
