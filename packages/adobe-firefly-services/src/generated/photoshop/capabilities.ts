/* eslint-disable */
/** Generated Adobe photoshop capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"
import { photoshopManifestDocumentSchema } from "../../runtime/photoshop-manifest.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"

/** Auto crop */
export const photoshop_auto_crop = capabilityFor(EXT_ID, "photoshop-auto-crop")
  .withInput(z.object({
  body: schemas.Schema_AutoCropRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/auto-crop",
      baseUrl: "https://photoshop-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobStatusResponse,
      asyncMode: "submit",
    })
  })

/** Create an artboard */
export const photoshop_create_artboard = capabilityFor(EXT_ID, "photoshop-create-artboard")
  .withInput(z.object({
  body: schemas.Schema_CreateArtboardRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/create-artboard",
      baseUrl: "https://photoshop-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobStatusResponse,
      asyncMode: "submit",
    })
  })

/** Create or edit a composite */
export const photoshop_create_composite = capabilityFor(EXT_ID, "photoshop-create-composite")
  .withInput(z.object({
  body: schemas.Schema_CreateCompositeRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/create-composite",
      baseUrl: "https://photoshop-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobStatusResponse,
      asyncMode: "submit",
    })
  })

/** Edit an image with various adjustments */
export const photoshop_edit = capabilityFor(EXT_ID, "photoshop-edit")
  .withInput(z.object({
  body: schemas.Schema_EditRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/edit",
      baseUrl: "https://photoshop-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobStatusResponse,
      asyncMode: "submit",
    })
  })

/** Execute Photoshop actions, scripts, and transformations */
export const photoshop_execute_actions = capabilityFor(EXT_ID, "photoshop-execute-actions")
  .withInput(z.object({
  body: schemas.Schema_ActionsRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/execute-actions",
      baseUrl: "https://photoshop-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobStatusResponse,
      asyncMode: "submit",
    })
  })

/** Generate a manifest for given input image */
export const photoshop_generate_manifest = capabilityFor(EXT_ID, "photoshop-generate-manifest")
  .withInput(z.object({
  body: schemas.Schema_GenerateManifestRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(photoshopManifestDocumentSchema)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/generate-manifest",
      baseUrl: "https://photoshop-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: photoshopManifestDocumentSchema,
      asyncMode: "submit",
      materialize: "photoshop-manifest",
    })
  })

/** Get Job Status */
export const photoshop_get_job_status = capabilityFor(EXT_ID, "photoshop-get-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v2/status/{jobId}",
      baseUrl: "https://photoshop-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: schemas.Schema_JobStatusResponse,
      asyncMode: "none",
    })
  })
