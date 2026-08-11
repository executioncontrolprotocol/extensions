/* eslint-disable */
/** Generated Adobe substance3d capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"

/** Generate 3D object composite */
export const substance3d_v1_composites_compose = capabilityFor(EXT_ID, "substance3d.v1/composites/compose")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  headers: z.object({
  "X-User-Token": z.string().optional()
}).optional(),
  body: schemas.Schema_restv1_ComposeSceneRequest,
  poll: z.boolean().optional(),
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_ComposeSceneResponse,
    })
  })

/** Create 3D scene */
export const substance3d_v1_scenes_assemble = capabilityFor(EXT_ID, "substance3d.v1/scenes/assemble")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_CreateSceneRequest,
  poll: z.boolean().optional(),
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_CreateSceneResponse,
    })
  })

/** Convert 3D files */
export const substance3d_v1_scenes_convert = capabilityFor(EXT_ID, "substance3d.v1/scenes/convert")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_ModelConvertRequest,
  poll: z.boolean().optional(),
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_ModelConvertResponse,
    })
  })

/** Describe 3D scene */
export const substance3d_v1_scenes_describe = capabilityFor(EXT_ID, "substance3d.v1/scenes/describe")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_SceneDescRequest,
  poll: z.boolean().optional(),
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_SceneDescResponse,
    })
  })

/** Render 3D object */
export const substance3d_v1_scenes_render = capabilityFor(EXT_ID, "substance3d.v1/scenes/render")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_RenderSceneRequest,
  poll: z.boolean().optional(),
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_RenderSceneResponse,
    })
  })

/** Render 3D object (basic version) */
export const substance3d_v1_scenes_render_basic = capabilityFor(EXT_ID, "substance3d.v1/scenes/render-basic")
  .withInput(z.object({
  query: z.object({
  "wait": z.boolean().optional()
}).optional(),
  body: schemas.Schema_restv1beta_RenderModelRequest,
  poll: z.boolean().optional(),
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_restv1beta_RenderModelResponse,
    })
  })

/** Create Space */
export const substance3d_create_space_v1 = capabilityFor(EXT_ID, "substance3d.create-space-v1")
  .withInput(z.object({
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
    })
  })

/** Create Space API */
export const substance3d_create_space_v2 = capabilityFor(EXT_ID, "substance3d.create-space-v2")
  .withInput(z.object({
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
    })
  })

/** Create Space From Frame IO API */
export const substance3d_create_space_from_frame_io_v2 = capabilityFor(EXT_ID, "substance3d.create-space-from-frame-io-v2")
  .withInput(z.object({
  body: schemas.Schema_rest_base_FileFrameIO,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
    })
  })

/** Create Space From Next Frame IO API */
export const substance3d_create_space_from_next_frame_io_v2 = capabilityFor(EXT_ID, "substance3d.create-space-from-next-frame-io-v2")
  .withInput(z.object({
  body: schemas.Schema_rest_base_FileNextFrameIO,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
    })
  })

/** Create Space from URL API */
export const substance3d_create_space_url_v2 = capabilityFor(EXT_ID, "substance3d.create-space-url-v2")
  .withInput(z.object({
  body: z.array(schemas.Schema_rest_base_FileURL).nullable(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
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
        poll?: boolean
        pollIntervalMs?: number
        pollTimeoutMs?: number
      },
      ctx,
      outputSchema: schemas.Schema_rest_base_Space,
    })
  })
