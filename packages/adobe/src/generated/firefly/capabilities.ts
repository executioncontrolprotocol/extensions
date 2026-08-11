/* eslint-disable */
/** Generated Adobe firefly capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe"

/** Generate images */
export const firefly_generate_images_v3_async = capabilityFor(EXT_ID, "firefly.generate-images-v3-async")
  .withInput(z.object({
  headers: z.object({
  "x-model-version": z.enum(["image3", "image3_custom", "image4_standard", "image4_ultra", "image4_custom"]).optional()
}).optional(),
  body: schemas.Schema_GenerateImagesRequestV3,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncAcceptResponseV3)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/images/generate-async",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncAcceptResponseV3,
    })
  })

/** Generate images with Image5 */
export const firefly_firefly_image_v5_generate_async_v4 = capabilityFor(EXT_ID, "firefly.firefly-image-v5-generate-async-v4")
  .withInput(z.object({
  headers: z.object({
  "x-model-version": z.enum(["image5"])
}).optional(),
  body: schemas.Schema_ImageGenerateRequestV3,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncTaskResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v4/images/generate-async",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncTaskResponse,
    })
  })

/** Generate similar images */
export const firefly_generate_similar_images_v3_async = capabilityFor(EXT_ID, "firefly.generate-similar-images-v3-async")
  .withInput(z.object({
  headers: z.object({
  "x-model-version": z.enum(["image3", "image4_standard", "image4_ultra"]).optional()
}).optional(),
  body: schemas.Schema_GenerateSimilarImagesRequestV3,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncAcceptResponseV3)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/images/generate-similar-async",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncAcceptResponseV3,
    })
  })

/** Expand image */
export const firefly_expand_images_v3_async = capabilityFor(EXT_ID, "firefly.expand-images-v3-async")
  .withInput(z.object({
  body: schemas.Schema_ExpandImageRequestV3,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncAcceptResponseV3)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/images/expand-async",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncAcceptResponseV3,
    })
  })

/** Fill image */
export const firefly_fill_images_v3_async = capabilityFor(EXT_ID, "firefly.fill-images-v3-async")
  .withInput(z.object({
  body: schemas.Schema_FillImageRequestV3,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncAcceptResponseV3)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/images/fill-async",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncAcceptResponseV3,
    })
  })

/** Generate object composite */
export const firefly_generate_object_composite_v3_async = capabilityFor(EXT_ID, "firefly.generate-object-composite-v3-async")
  .withInput(z.object({
  body: schemas.Schema_GenerateObjectCompositeRequestV3,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncAcceptResponseV3)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/images/generate-object-composite-async",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncAcceptResponseV3,
    })
  })

/** Generate precise composite */
export const firefly_precise_composite = capabilityFor(EXT_ID, "firefly.precise-composite")
  .withInput(z.object({
  headers: z.object({
  "content-type": z.enum(["application/json"])
}).optional(),
  body: schemas.Schema_PreciseCompositeRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncJobResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/images/precise-composite",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncJobResponse,
    })
  })

/** Generate adaptive composite */
export const firefly_adaptive_composite = capabilityFor(EXT_ID, "firefly.adaptive-composite")
  .withInput(z.object({
  headers: z.object({
  "content-type": z.enum(["application/json"])
}).optional(),
  body: schemas.Schema_AdaptiveCompositeRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncJobResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/images/adaptive-composite",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncJobResponse,
    })
  })

/** Upscale image */
export const firefly_precise_upsampler_v3_async = capabilityFor(EXT_ID, "firefly.precise-upsampler-v3-async")
  .withInput(z.object({
  headers: z.object({
  "x-model-version": z.enum(["precise_upsampler_v1"]).optional()
}).optional(),
  body: schemas.Schema_PreciseUpsamplerRequestV3,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_PreciseUpscaleAcceptResponseV3)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/images/upscale",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_PreciseUpscaleAcceptResponseV3,
    })
  })

/** Generate video */
export const firefly_generate_video_v3 = capabilityFor(EXT_ID, "firefly.generate-video-v3")
  .withInput(z.object({
  headers: z.object({
  "x-model-version": z.enum(["video1_standard"])
}).optional(),
  body: schemas.Schema_GenerateVideoRequestV3,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_AsyncAcceptResponseV3)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v3/videos/generate",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_AsyncAcceptResponseV3,
    })
  })

/** Retrieve custom models */
export const firefly_get_custom_models = capabilityFor(EXT_ID, "firefly.get-custom-models")
  .withInput(z.object({
  query: z.object({
  "sortBy": z.enum(["assetName", "createdDate", "modifiedDate"]).optional(),
  "start": z.string().optional(),
  "limit": z.string().optional(),
  "publishedState": z.enum(["all", "ready", "published", "unpublished", "queued", "training", "failed", "cancelled"]).optional()
}).optional(),
  headers: z.object({
  "x-user-token": z.string().optional(),
  "x-request-id": z.string()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_CustomModelsFF3pInfo)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v3/custom-models",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_CustomModelsFF3pInfo,
    })
  })

/** Upload image */
export const firefly_storage_image_v2 = capabilityFor(EXT_ID, "firefly.storage-image-v2")
  .withInput(z.object({
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_StorageImageResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/storage/image",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_StorageImageResponse,
    })
  })

/** Get job status */
export const firefly_job_result_v3 = capabilityFor(EXT_ID, "firefly.job-result-v3")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v3/status/{jobId}",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: schemas.Schema_JobResponse,
    })
  })

/** Cancel job */
export const firefly_cancel_job_v4 = capabilityFor(EXT_ID, "firefly.cancel-job-v4")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({}))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "PUT",
      pathTemplate: "/v3/cancel/{jobId}",
      baseUrl: "https://firefly-api.adobe.io/",
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
      outputSchema: z.object({}),
    })
  })
