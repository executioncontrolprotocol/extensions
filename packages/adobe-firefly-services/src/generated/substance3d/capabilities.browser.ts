/* eslint-disable */
/** Generated Adobe substance3d browser catalog — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { HOST_HOP_MESSAGE } from "../../shared.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"
async function hostHop(): Promise<never> {
  throw new Error(HOST_HOP_MESSAGE)
}

/** Generate 3D object composite */
export const substance3d_v1_composites_compose = capabilityFor(EXT_ID, "substance3d-v1-composites-compose")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  headers: z.object({
  "X-User-Token": z.string().optional()
}).optional(),
  body: schemas.Schema_restv1_ComposeSceneRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_restv1beta_ComposeSceneResponse)
  .withHandler(hostHop)

/** Create 3D scene */
export const substance3d_v1_scenes_assemble = capabilityFor(EXT_ID, "substance3d-v1-scenes-assemble")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_CreateSceneRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_restv1beta_CreateSceneResponse)
  .withHandler(hostHop)

/** Convert 3D files */
export const substance3d_v1_scenes_convert = capabilityFor(EXT_ID, "substance3d-v1-scenes-convert")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_ModelConvertRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_restv1beta_ModelConvertResponse)
  .withHandler(hostHop)

/** Describe 3D scene */
export const substance3d_v1_scenes_describe = capabilityFor(EXT_ID, "substance3d-v1-scenes-describe")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_SceneDescRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_restv1beta_SceneDescResponse)
  .withHandler(hostHop)

/** Render 3D object */
export const substance3d_v1_scenes_render = capabilityFor(EXT_ID, "substance3d-v1-scenes-render")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_RenderSceneRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_restv1beta_RenderSceneResponse)
  .withHandler(hostHop)

/** Render 3D object (basic version) */
export const substance3d_v1_scenes_render_basic = capabilityFor(EXT_ID, "substance3d-v1-scenes-render-basic")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_RenderModelRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_restv1beta_RenderModelResponse)
  .withHandler(hostHop)

/** Create Space */
export const substance3d_create_space_v1 = capabilityFor(EXT_ID, "substance3d-create-space-v1")
  .withInput(z.object({}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(hostHop)

/** Create Space API */
export const substance3d_create_space_v2 = capabilityFor(EXT_ID, "substance3d-create-space-v2")
  .withInput(z.object({}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(hostHop)

/** Create Space From Frame IO API */
export const substance3d_create_space_from_frame_io_v2 = capabilityFor(EXT_ID, "substance3d-create-space-from-frame-io-v2")
  .withInput(z.object({
  body: schemas.Schema_rest_base_FileFrameIO
}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(hostHop)

/** Create Space From Next Frame IO API */
export const substance3d_create_space_from_next_frame_io_v2 = capabilityFor(EXT_ID, "substance3d-create-space-from-next-frame-io-v2")
  .withInput(z.object({
  body: schemas.Schema_rest_base_FileNextFrameIO
}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(hostHop)

/** Create Space from URL API */
export const substance3d_create_space_url_v2 = capabilityFor(EXT_ID, "substance3d-create-space-url-v2")
  .withInput(z.object({
  body: z.array(schemas.Schema_rest_base_FileURL).nullable()
}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(hostHop)
