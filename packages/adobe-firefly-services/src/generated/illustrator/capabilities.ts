/* eslint-disable */
/** Generated Adobe illustrator capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"

/** Submit a Custom Script */
export const illustrator_register_custom_script_capability = capabilityFor(EXT_ID, "illustrator-register-custom-script-capability")
  .withInput(z.object({
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_CapabilityRegistrationResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/run-scripts",
      baseUrl: "https://illustrator.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_CapabilityRegistrationResponse,
      asyncMode: "submit",
    })
  })

/** Submit a custom script execution request */
export const illustrator_execute_custom_script_capability = capabilityFor(EXT_ID, "illustrator-execute-custom-script-capability")
  .withInput(z.object({
  path: z.object({
  "orgId": z.string(),
  "capabilityName": z.string()
}),
  body: schemas.Schema_CustomScriptExecuteRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_CustomScriptJobSucceededResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/{orgId}/{capabilityName}",
      baseUrl: "https://illustrator.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_CustomScriptJobSucceededResponse,
      asyncMode: "submit",
    })
  })

/** Retrieve job status */
export const illustrator_custom_scripts_job_status = capabilityFor(EXT_ID, "illustrator-custom-scripts-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(z.union([schemas.Schema_CustomScriptJobSucceededResponse, schemas.Schema_CustomScriptJobRunningResponse, schemas.Schema_CustomScriptJobFailedResponse]))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v3/status/{jobId}",
      baseUrl: "https://illustrator.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: z.union([schemas.Schema_CustomScriptJobSucceededResponse, schemas.Schema_CustomScriptJobRunningResponse, schemas.Schema_CustomScriptJobFailedResponse]),
      asyncMode: "none",
    })
  })

/** Data merge */
export const illustrator_data_merge = capabilityFor(EXT_ID, "illustrator-data-merge")
  .withInput(z.object({
  body: schemas.Schema_DataMergeRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_DataMergeJobApiResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/merge-data",
      baseUrl: "https://illustrator-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_DataMergeJobApiResponse,
      asyncMode: "submit",
    })
  })

/** Create rendition */
export const illustrator_create_rendition = capabilityFor(EXT_ID, "illustrator-create-rendition")
  .withInput(z.object({
  body: schemas.Schema_CreateRenditionRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_CreateRenditionJobApiResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/create-rendition",
      baseUrl: "https://illustrator-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_CreateRenditionJobApiResponse,
      asyncMode: "submit",
    })
  })

/** Submit a job */
export const illustrator_trace_image = capabilityFor(EXT_ID, "illustrator-trace-image")
  .withInput(z.object({
  body: schemas.Schema_VectorizeRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_ImageTraceJobApiResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/trace-image",
      baseUrl: "https://illustrator-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_ImageTraceJobApiResponse,
      asyncMode: "submit",
    })
  })

/** Retrieve job status */
export const illustrator_image_trace_job_status = capabilityFor(EXT_ID, "illustrator-image-trace-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(z.union([schemas.Schema_ImageTraceJobApiResponse, schemas.Schema_JobStatusPollPayload, schemas.Schema_ImageTraceJobFailedResponse]))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v1/status/{jobId}/image-trace",
      baseUrl: "https://illustrator-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: z.union([schemas.Schema_ImageTraceJobApiResponse, schemas.Schema_JobStatusPollPayload, schemas.Schema_ImageTraceJobFailedResponse]),
      asyncMode: "none",
    })
  })

/** Retrieve job status */
export const illustrator_facade_job_status = capabilityFor(EXT_ID, "illustrator-facade-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(z.union([schemas.Schema_DataMergeJobApiResponse, schemas.Schema_CreateRenditionJobApiResponse, schemas.Schema_JobStatusPollPayload, schemas.Schema_DataMergeJobFailedResponse, schemas.Schema_DataMergeJobPartiallySucceededResponse]))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v1/status/{jobId}",
      baseUrl: "https://illustrator-api.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: z.union([schemas.Schema_DataMergeJobApiResponse, schemas.Schema_CreateRenditionJobApiResponse, schemas.Schema_JobStatusPollPayload, schemas.Schema_DataMergeJobFailedResponse, schemas.Schema_DataMergeJobPartiallySucceededResponse]),
      asyncMode: "none",
    })
  })
