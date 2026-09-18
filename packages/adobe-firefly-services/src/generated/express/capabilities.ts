/* eslint-disable */
/** Generated Adobe express capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"

/** Tagged documents */
export const express_tagged_documents = capabilityFor(EXT_ID, "express-tagged-documents")
  .withInput(z.object({
  query: z.object({
  "start": z.number().int().optional(),
  "limit": z.number().int().optional(),
  "sortBy": schemas.Schema_TaggedDocumentsSortBy.optional()
}).optional()
}))
  .withOutput(schemas.Schema_TaggedDocumentsResponse)
  .withMetadata({"summary":"Tagged documents","description":"This API retrieves a list of tagged documents that users can access, including those they own or those shared with them, along with relevant metadata. It supports pagination and sorting, allowing users to specify the starting point, define the number of documents to return, and choose the order in which to list them. The response includes the requested documents and their metadata.","useCases":["When the workflow goal is to tagged documents"],"samplePrompts":["Tagged documents","Tagged documents with Adobe Express"]})
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
      },
      ctx,
      outputSchema: schemas.Schema_TaggedDocumentsResponse,
      asyncMode: "none",
    })
  })

/** Tagged document details */
export const express_tagged_document_details = capabilityFor(EXT_ID, "express-tagged-document-details")
  .withInput(z.object({
  path: z.object({
  "documentId": z.string()
}),
  query: z.object({
  "start": z.number().int().optional()
}).optional()
}))
  .withOutput(schemas.Schema_TaggedDocumentDetailsResponse)
  .withMetadata({"summary":"Tagged document details","description":"This API retrieves details of the pages and tagged elements within a specified document. It returns a paginated list of the document's pages and metadata about each page. If the document has tagged elements, the API includes their respective details, such as size and position. If the document does not have tagged elements, it returns an empty array. The response includes pagination information to help users navigate the document’s pages. A maximum of 10 pages can be returned in 1 API call.","useCases":["When the workflow goal is to tagged document details"],"samplePrompts":["Tagged document details","Tagged document details with Adobe Express"]})
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
      },
      ctx,
      outputSchema: schemas.Schema_TaggedDocumentDetailsResponse,
      asyncMode: "none",
    })
  })

/** Generate variation */
export const express_generate_variation = capabilityFor(EXT_ID, "express-generate-variation")
  .withInput(z.object({
  body: schemas.Schema_GenerateVariationRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_GenerateVariationResponse)
  .withMetadata({"summary":"Generate variation","description":"This API creates a document variation based on provided input parameters. After processing, it temporarily stores the generated document and makes it available to the user within a designated folder. The document remains accessible for 30 days, after which the system automatically removes it.","useCases":["When the workflow goal is to generate variation"],"samplePrompts":["Generate variation","Generate variation with Adobe Express"]})
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
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_GenerateVariationResponse,
      asyncMode: "submit",
    })
  })

/** Export rendition */
export const express_export_rendition = capabilityFor(EXT_ID, "express-export-rendition")
  .withInput(z.object({
  body: schemas.Schema_ExportRenditionRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_ExportRenditionResponse)
  .withMetadata({"summary":"Export rendition","description":"Export one or more pages from an Adobe Express document in supported formats. This endpoint accepts an export request and returns pre-signed URLs for accessing the rendered files. **Supported formats:** - Image formats: `image/jpeg` (JPG), `image/png` (PNG) - Video format: `video/mp4` (MP4) - Document format: `application/pdf` (PDF) **Rendition availability:** - Image renditions: Valid for 4 hours, maximum size 8192px on the longest side - Video and PDF renditions: Valid for 24 hours, maximum size 4096px on the longest side **Asynchronous processing:** Export requests are processed asynchronously. The response includes a `jobId` and `statusUrl` that you can use to track the export progress and retrieve the final rendition URLs. **Restrictions:** | Condition | Behavior | Error | | --- | --- | --- | | Public templates (Adobe-owned documents not copied to the user account) | Export is not allowed | `400 bad_request` | | Document contains Adobe Stock–licensed assets | Export fails | `422 stock_content_detected` |","useCases":["When the workflow goal is to export rendition"],"samplePrompts":["Export rendition","Export rendition with Adobe Express"]})
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
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_ExportRenditionResponse,
      asyncMode: "submit",
    })
  })

/** Job status */
export const express_get_job_status = capabilityFor(EXT_ID, "express-get-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(z.union([schemas.Schema_JobStatusResponse, schemas.Schema_ExportRenditionResponse, schemas.Schema_GenerateVariationResponse]))
  .withMetadata({"summary":"Job status","description":"Retrieve a job's status by its `jobId`. Depending on the job type, the response may include job-specific details.","useCases":["When the workflow goal is to job status"],"samplePrompts":["Job status","Job status with Adobe Express"]})
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
      },
      ctx,
      outputSchema: z.union([schemas.Schema_JobStatusResponse, schemas.Schema_ExportRenditionResponse, schemas.Schema_GenerateVariationResponse]),
      asyncMode: "none",
    })
  })
