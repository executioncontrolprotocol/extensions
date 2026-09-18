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
  .withMetadata({"summary":"Auto crop","description":"Generates smart crops, subject bounding boxes, and detects objects for an input image. The request is processed asynchronously. Poll GET /v2/status/{jobId} with the returned jobId for completion.","useCases":["Photoshop Photoshop APIs tasks that need this operation","When the workflow goal is to auto crop"],"samplePrompts":["Auto crop","Auto crop with Adobe Photoshop"]})
  .withHandler(hostHop)

/** Create an artboard */
export const photoshop_create_artboard = capabilityFor(EXT_ID, "photoshop-create-artboard")
  .withInput(z.object({
  body: schemas.Schema_CreateArtboardRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withMetadata({"summary":"Create an artboard","description":"Create an artboard","useCases":["Photoshop Photoshop APIs tasks that need this operation","When the workflow goal is to create an artboard"],"samplePrompts":["Create an artboard","Create an artboard with Adobe Photoshop"]})
  .withHandler(hostHop)

/** Create or edit a composite */
export const photoshop_create_composite = capabilityFor(EXT_ID, "photoshop-create-composite")
  .withInput(z.object({
  body: schemas.Schema_CreateCompositeRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withMetadata({"summary":"Create or edit a composite","description":"Create or edit a composite","useCases":["Photoshop Photoshop APIs tasks that need this operation","When the workflow goal is to create or edit a composite"],"samplePrompts":["Create or edit a composite","Create or edit a composite with Adobe Photoshop"]})
  .withHandler(hostHop)

/** Edit an image with various adjustments */
export const photoshop_edit = capabilityFor(EXT_ID, "photoshop-edit")
  .withInput(z.object({
  body: schemas.Schema_EditRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withMetadata({"summary":"Edit an image with various adjustments","description":"Edit an image with various adjustments","useCases":["Photoshop Photoshop APIs tasks that need this operation","When the workflow goal is to edit an image with various adjustments"],"samplePrompts":["Edit an image with various adjustments","Edit an image with various adjustments with Adobe Photoshop"]})
  .withHandler(hostHop)

/** Execute Photoshop actions, scripts, and transformations */
export const photoshop_execute_actions = capabilityFor(EXT_ID, "photoshop-execute-actions")
  .withInput(z.object({
  body: schemas.Schema_ActionsRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withMetadata({"summary":"Execute Photoshop actions, scripts, and transformations","description":"Execute Photoshop actions, scripts, and transformations","useCases":["Photoshop Photoshop APIs tasks that need this operation","When the workflow goal is to execute Photoshop actions, scripts, and transformations"],"samplePrompts":["Execute Photoshop actions, scripts, and transformations","Execute Photoshop actions, scripts, and transformations with Adobe Photoshop"]})
  .withHandler(hostHop)

/** Generate a manifest for given input image */
export const photoshop_generate_manifest = capabilityFor(EXT_ID, "photoshop-generate-manifest")
  .withInput(z.object({
  body: schemas.Schema_GenerateManifestRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(photoshopManifestDocumentSchema)
  .withMetadata({"summary":"Generate a manifest for given input image","description":"Generate a manifest for given input image","useCases":["Photoshop Photoshop APIs tasks that need this operation","When the workflow goal is to generate a manifest for given input image"],"samplePrompts":["Generate a manifest for given input image","Generate a manifest for given input image with Adobe Photoshop"]})
  .withHandler(hostHop)

/** Get Job Status */
export const photoshop_get_job_status = capabilityFor(EXT_ID, "photoshop-get-job-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(schemas.Schema_JobStatusResponse)
  .withMetadata({"summary":"Get Job Status","description":"Retrieves the current status and details of a specific job including metadata, outputs, and processing information. Use this endpoint to poll jobs submitted to Photoshop v2 operations and POST /v1/auto-crop.","useCases":["Photoshop Job Status tasks that need this operation","When the workflow goal is to get Job Status"],"samplePrompts":["Get Job Status","Get Job Status with Adobe Photoshop"]})
  .withHandler(hostHop)
