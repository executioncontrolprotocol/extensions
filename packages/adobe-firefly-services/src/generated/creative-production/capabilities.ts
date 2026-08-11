/* eslint-disable */
/** Generated Adobe creative-production capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"

/** Execute a batch of assets through a workflow */
export const creative_production_batch_execute = capabilityFor(EXT_ID, "creative-production.batch-execute")
  .withInput(z.object({
  headers: z.object({
  "api-version": z.enum(["1.0"]).optional()
}).optional(),
  body: schemas.Schema_BatchExecuteRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_BatchExecuteAcceptedResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/batch/execute",
      baseUrl: "https://run-workflow.adobe.io/",
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
      outputSchema: schemas.Schema_BatchExecuteAcceptedResponse,
    })
  })

/** List batches */
export const creative_production_list_batches = capabilityFor(EXT_ID, "creative-production.list-batches")
  .withInput(z.object({
  query: z.object({
  "status": z.enum(["pending", "running", "completed", "failed", "cancelled"]).optional(),
  "workflowId": z.string().optional(),
  "createdAfter": z.string().optional(),
  "createdBefore": z.string().optional(),
  "limit": z.number().int().min(1).max(100).optional(),
  "offset": z.number().int().min(0).optional()
}).optional(),
  headers: z.object({
  "api-version": z.enum(["1.0"]).optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_ListBatchesResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/batches",
      baseUrl: "https://run-workflow.adobe.io/",
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
      outputSchema: schemas.Schema_ListBatchesResponse,
    })
  })

/** Get batch status */
export const creative_production_get_batch_status = capabilityFor(EXT_ID, "creative-production.get-batch-status")
  .withInput(z.object({
  path: z.object({
  "batchId": z.string()
}),
  headers: z.object({
  "api-version": z.enum(["1.0"]).optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_BatchStatusResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/batch/{batchId}/status",
      baseUrl: "https://run-workflow.adobe.io/",
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
      outputSchema: schemas.Schema_BatchStatusResponse,
    })
  })

/** Cancel a batch */
export const creative_production_cancel_batch = capabilityFor(EXT_ID, "creative-production.cancel-batch")
  .withInput(z.object({
  path: z.object({
  "batchId": z.string()
}),
  headers: z.object({
  "api-version": z.enum(["1.0"]).optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "batchId": z.string().optional(),
  "status": z.enum(["cancelled"]).optional(),
  "message": z.string().optional(),
  "previousStatus": z.string().optional(),
  "assets": schemas.Schema_BatchAssetCounts.optional()
}))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/batch/{batchId}/cancel",
      baseUrl: "https://run-workflow.adobe.io/",
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
      outputSchema: z.object({
  "batchId": z.string().optional(),
  "status": z.enum(["cancelled"]).optional(),
  "message": z.string().optional(),
  "previousStatus": z.string().optional(),
  "assets": schemas.Schema_BatchAssetCounts.optional()
}),
    })
  })

/** List individual execution results */
export const creative_production_list_batch_executions = capabilityFor(EXT_ID, "creative-production.list-batch-executions")
  .withInput(z.object({
  path: z.object({
  "batchId": z.string()
}),
  query: z.object({
  "status": z.enum(["pending", "running", "success", "failed"]).optional(),
  "limit": z.number().int().min(1).max(500).optional(),
  "offset": z.number().int().min(0).optional()
}).optional(),
  headers: z.object({
  "api-version": z.enum(["1.0"]).optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "batchId": z.string().optional(),
  "total": z.number().int().optional(),
  "executions": z.array(schemas.Schema_BatchExecutionResult).optional(),
  "pagination": z.object({
  "limit": z.number().int().optional(),
  "offset": z.number().int().optional(),
  "count": z.number().int().optional(),
  "hasMore": z.boolean().optional()
}).optional()
}))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/batch/{batchId}/executions",
      baseUrl: "https://run-workflow.adobe.io/",
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
      outputSchema: z.object({
  "batchId": z.string().optional(),
  "total": z.number().int().optional(),
  "executions": z.array(schemas.Schema_BatchExecutionResult).optional(),
  "pagination": z.object({
  "limit": z.number().int().optional(),
  "offset": z.number().int().optional(),
  "count": z.number().int().optional(),
  "hasMore": z.boolean().optional()
}).optional()
}),
    })
  })
