/* eslint-disable */
/** Generated Adobe indesign browser catalog — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { HOST_HOP_MESSAGE } from "../../shared.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"
async function hostHop(): Promise<never> {
  throw new Error(HOST_HOP_MESSAGE)
}

/** Perform a data merge */
export const indesign_data_merge = capabilityFor(EXT_ID, "indesign-data-merge")
  .withInput(z.object({
  body: schemas.Schema_MergeDataRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string().optional(),
  "statusUrl": z.string().optional()
}))
  .withHandler(hostHop)

/** Get data merge tags */
export const indesign_data_merge_tags = capabilityFor(EXT_ID, "indesign-data-merge-tags")
  .withInput(z.object({
  body: schemas.Schema_MergeDataTagsRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string().optional(),
  "statusUrl": z.string().optional()
}))
  .withHandler(hostHop)

/** Remap links */
export const indesign_remap_links = capabilityFor(EXT_ID, "indesign-remap-links")
  .withInput(z.object({
  headers: z.object({
  "x-aem-token": z.string()
}).optional(),
  body: schemas.Schema_RemapLinksRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string().optional(),
  "statusUrl": z.string().optional()
}))
  .withHandler(hostHop)

/** Create JPEG, PNG, or PDF renditions */
export const indesign_rendition_job = capabilityFor(EXT_ID, "indesign-rendition-job")
  .withInput(z.object({
  body: schemas.Schema_CreateRenditionRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string().optional(),
  "statusUrl": z.string().optional()
}))
  .withHandler(hostHop)

/** List custom scripts API */
export const indesign_list_custom_scripts = capabilityFor(EXT_ID, "indesign-list-custom-scripts")
  .withInput(z.object({
  query: z.object({
  "page": z.number().int().optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_CustomScriptsListResponse)
  .withHandler(hostHop)

/** Submit a Custom Script */
export const indesign_submit_custom_script = capabilityFor(EXT_ID, "indesign-submit-custom-script")
  .withInput(z.object({
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "capability": z.string().optional(),
  "version": z.string().optional(),
  "url": z.string().optional()
}))
  .withHandler(hostHop)

/** Submit a custom script execution request */
export const indesign_execute_custom_script = capabilityFor(EXT_ID, "indesign-execute-custom-script")
  .withInput(z.object({
  path: z.object({
  "script_id": z.string(),
  "script_name": z.string()
}),
  body: schemas.Schema_BaseJobRequestWithOutput,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string().optional(),
  "statusUrl": z.string().optional()
}))
  .withHandler(hostHop)

/** Get Custom Script details */
export const indesign_get_custom_script_details = capabilityFor(EXT_ID, "indesign-get-custom-script-details")
  .withInput(z.object({
  path: z.object({
  "script_name": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_CustomScriptDetails)
  .withHandler(hostHop)

/** Delete a Custom Script */
export const indesign_delete_custom_script = capabilityFor(EXT_ID, "indesign-delete-custom-script")
  .withInput(z.object({
  path: z.object({
  "script_name": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({}))
  .withHandler(hostHop)

/** Update Custom Script App Version */
export const indesign_update_script_app_version = capabilityFor(EXT_ID, "indesign-update-script-app-version")
  .withInput(z.object({
  path: z.object({
  "script_name": z.string()
}),
  body: schemas.Schema_AppVersionUpdateRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "message": z.string().optional()
}))
  .withHandler(hostHop)

/** Get Current App Versions */
export const indesign_list_app_versions = capabilityFor(EXT_ID, "indesign-list-app-versions")
  .withInput(z.object({
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.array(schemas.Schema_AppVersionInfo))
  .withHandler(hostHop)

/** Get document information */
export const indesign_get_document_info = capabilityFor(EXT_ID, "indesign-get-document-info")
  .withInput(z.object({
  body: schemas.Schema_DocumentInfoRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string().optional(),
  "statusUrl": z.string().optional()
}))
  .withHandler(hostHop)

/** Get status - Document Info API */
export const indesign_get_document_info_job_status = capabilityFor(EXT_ID, "indesign-get-document-info-job-status")
  .withInput(z.object({
  path: z.object({
  "document-info_job_id": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.union([schemas.Schema_notstartedEvent, schemas.Schema_runningEvent, schemas.Schema_succeededEvent, schemas.Schema_failedEvent, schemas.Schema_partialSuccessEvent]))
  .withHandler(hostHop)

/** Convert PDF to InDesign document */
export const indesign_convert_pdfto_in_design = capabilityFor(EXT_ID, "indesign-convert-pdfto-in-design")
  .withInput(z.object({
  body: schemas.Schema_ConvertToInDesignRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string().optional(),
  "statusUrl": z.string().optional()
}))
  .withHandler(hostHop)

/** Get status - Convert PDF to InDesign API */
export const indesign_get_convert_pdfto_in_design_job_status = capabilityFor(EXT_ID, "indesign-get-convert-pdfto-in-design-job-status")
  .withInput(z.object({
  path: z.object({
  "convert-pdf-to-indesign_job_id": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.union([schemas.Schema_notstartedEvent, schemas.Schema_runningEvent, schemas.Schema_succeededEvent, schemas.Schema_failedEvent, schemas.Schema_partialSuccessEvent]))
  .withHandler(hostHop)

/** Get the status of a job */
export const indesign_get_job_status = capabilityFor(EXT_ID, "indesign-get-job-status")
  .withInput(z.object({
  path: z.object({
  "id": z.string()
}),
  query: z.object({
  "size": z.number().int().min(1).optional(),
  "page": z.number().int().min(0).optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.union([schemas.Schema_notstartedEvent, schemas.Schema_runningEvent, schemas.Schema_succeededEvent, schemas.Schema_failedEvent, schemas.Schema_partialSuccessEvent]))
  .withHandler(hostHop)
