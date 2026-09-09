/* eslint-disable */
/** Generated Adobe photoshop browser catalog — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { photoshopManifestDocumentSchema } from "../../runtime/photoshop-manifest.js"
import { HOST_HOP_MESSAGE } from "../../shared.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"
async function hostHop(): Promise<never> {
  throw new Error(HOST_HOP_MESSAGE)
}

/** Auto crop */
export const photoshop_auto_crop = capabilityFor(EXT_ID, "photoshop-auto-crop")
  .withInput(z.object({
  body: schemas.Schema_AutoCropRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(hostHop)

/** Create an artboard */
export const photoshop_create_artboard = capabilityFor(EXT_ID, "photoshop-create-artboard")
  .withInput(z.object({
  body: schemas.Schema_CreateArtboardRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(hostHop)

/** Create or edit a composite */
export const photoshop_create_composite = capabilityFor(EXT_ID, "photoshop-create-composite")
  .withInput(z.object({
  body: schemas.Schema_CreateCompositeRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(hostHop)

/** Edit an image with various adjustments */
export const photoshop_edit = capabilityFor(EXT_ID, "photoshop-edit")
  .withInput(z.object({
  body: schemas.Schema_EditRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(hostHop)

/** Execute Photoshop actions, scripts, and transformations */
export const photoshop_execute_actions = capabilityFor(EXT_ID, "photoshop-execute-actions")
  .withInput(z.object({
  body: schemas.Schema_ActionsRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(hostHop)

/** Generate a manifest for given input image */
export const photoshop_generate_manifest = capabilityFor(EXT_ID, "photoshop-generate-manifest")
  .withInput(z.object({
  body: schemas.Schema_GenerateManifestRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(photoshopManifestDocumentSchema)
  .withHandler(hostHop)

/** Get Job Status */
export const photoshop_get_job_status = capabilityFor(EXT_ID, "photoshop-get-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withHandler(hostHop)
