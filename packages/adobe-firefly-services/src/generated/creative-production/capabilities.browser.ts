/* eslint-disable */
/** Generated Adobe creative-production browser catalog — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { HOST_HOP_MESSAGE } from "../../shared.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"
async function hostHop(): Promise<never> {
  throw new Error(HOST_HOP_MESSAGE)
}

/** Execute a batch of assets through a workflow */
export const creative_production_batch_execute = capabilityFor(EXT_ID, "creative-production-batch-execute")
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
  .withHandler(hostHop)

/** List batches */
export const creative_production_list_batches = capabilityFor(EXT_ID, "creative-production-list-batches")
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
  .withHandler(hostHop)

/** Get batch status */
export const creative_production_get_batch_status = capabilityFor(EXT_ID, "creative-production-get-batch-status")
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
  .withHandler(hostHop)

/** Cancel a batch */
export const creative_production_cancel_batch = capabilityFor(EXT_ID, "creative-production-cancel-batch")
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
  .withHandler(hostHop)

/** List individual execution results */
export const creative_production_list_batch_executions = capabilityFor(EXT_ID, "creative-production-list-batch-executions")
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
  .withHandler(hostHop)
