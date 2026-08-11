/* eslint-disable */
/** Generated Adobe illustrator capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe"

/** Submit a Custom Script */
export const illustrator_register_custom_script_capability = capabilityFor(EXT_ID, "illustrator.register-custom-script-capability")
  .withInput(z.object({
  poll: z.boolean().optional(),
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_CapabilityRegistrationResponse,
    })
  })

/** Submit a custom script execution request */
export const illustrator_execute_custom_script_capability = capabilityFor(EXT_ID, "illustrator.execute-custom-script-capability")
  .withInput(z.object({
  path: z.object({
  "orgId": z.string(),
  "capabilityName": z.string()
}),
  body: schemas.Schema_CustomScriptExecuteRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_CustomScriptExecuteResponse)
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_CustomScriptExecuteResponse,
    })
  })

/** Retrieve job status */
export const illustrator_custom_scripts_job_status = capabilityFor(EXT_ID, "illustrator.custom-scripts-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: z.union([schemas.Schema_CustomScriptJobSucceededResponse, schemas.Schema_CustomScriptJobRunningResponse, schemas.Schema_CustomScriptJobFailedResponse]),
    })
  })

/** Data merge */
export const illustrator_data_merge = capabilityFor(EXT_ID, "illustrator.data-merge")
  .withInput(z.object({
  body: schemas.Schema_DataMergeRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobLinkResponse)
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobLinkResponse,
    })
  })

/** Create rendition */
export const illustrator_create_rendition = capabilityFor(EXT_ID, "illustrator.create-rendition")
  .withInput(z.object({
  body: schemas.Schema_CreateRenditionRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobLinkResponse)
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobLinkResponse,
    })
  })

/** Submit a job */
export const illustrator_trace_image = capabilityFor(EXT_ID, "illustrator.trace-image")
  .withInput(z.object({
  body: schemas.Schema_VectorizeRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobLinkResponse)
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_JobLinkResponse,
    })
  })

/** Retrieve job status */
export const illustrator_image_trace_job_status = capabilityFor(EXT_ID, "illustrator.image-trace-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: z.union([schemas.Schema_ImageTraceJobApiResponse, schemas.Schema_JobStatusPollPayload, schemas.Schema_ImageTraceJobFailedResponse]),
    })
  })

/** Retrieve job status */
export const illustrator_facade_job_status = capabilityFor(EXT_ID, "illustrator.facade-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: z.union([schemas.Schema_DataMergeJobApiResponse, schemas.Schema_CreateRenditionJobApiResponse, schemas.Schema_JobStatusPollPayload, schemas.Schema_DataMergeJobFailedResponse, schemas.Schema_DataMergeJobPartiallySucceededResponse]),
    })
  })
