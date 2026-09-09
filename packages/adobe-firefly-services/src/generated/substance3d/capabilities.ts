/* eslint-disable */
/** Generated Adobe substance3d capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"

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
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/composites/compose",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_ComposeSceneResponse,
      asyncMode: "submit",
    })
  })

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
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/scenes/assemble",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_CreateSceneResponse,
      asyncMode: "submit",
    })
  })

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
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/scenes/convert",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_ModelConvertResponse,
      asyncMode: "submit",
    })
  })

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
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/scenes/describe",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_SceneDescResponse,
      asyncMode: "submit",
    })
  })

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
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/scenes/render",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_RenderSceneResponse,
      asyncMode: "submit",
    })
  })

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
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/scenes/render-basic",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_RenderModelResponse,
      asyncMode: "submit",
    })
  })

/** Create Space */
export const substance3d_create_space_v1 = capabilityFor(EXT_ID, "substance3d-create-space-v1")
  .withInput(z.object({}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/spaces",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
      asyncMode: "none",
    })
  })

/** Create Space API */
export const substance3d_create_space_v2 = capabilityFor(EXT_ID, "substance3d-create-space-v2")
  .withInput(z.object({}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/spaces",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
      asyncMode: "none",
    })
  })

/** Create Space From Frame IO API */
export const substance3d_create_space_from_frame_io_v2 = capabilityFor(EXT_ID, "substance3d-create-space-from-frame-io-v2")
  .withInput(z.object({
  body: schemas.Schema_rest_base_FileFrameIO
}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/spacesFrameIO",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
      asyncMode: "none",
    })
  })

/** Create Space From Next Frame IO API */
export const substance3d_create_space_from_next_frame_io_v2 = capabilityFor(EXT_ID, "substance3d-create-space-from-next-frame-io-v2")
  .withInput(z.object({
  body: schemas.Schema_rest_base_FileNextFrameIO
}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/spacesNextFrameIO",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
      asyncMode: "none",
    })
  })

/** Create Space from URL API */
export const substance3d_create_space_url_v2 = capabilityFor(EXT_ID, "substance3d-create-space-url-v2")
  .withInput(z.object({
  body: z.array(schemas.Schema_rest_base_FileURL).nullable()
}))
  .withOutput(schemas.Schema_rest_base_Space)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/spacesURL",
      baseUrl: "https://s3d.adobe.io/",
      input: input as {
        path?: Record<string, string | number | boolean>
        query?: Record<string, string | number | boolean | undefined>
        headers?: Record<string, string>
        body?: unknown
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
      asyncMode: "none",
    })
  })
