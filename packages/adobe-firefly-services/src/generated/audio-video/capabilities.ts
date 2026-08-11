/* eslint-disable */
/** Generated Adobe audio-video capabilities — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { invokeAdobeOperation } from "../../runtime/invoke.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"

/** Get available voices */
export const audio_video_voices = capabilityFor(EXT_ID, "audio-video.voices")
  .withInput(z.object({
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_SuccessfulVoicesResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v1/voices",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_SuccessfulVoicesResponse,
    })
  })

/** Generate speech from text */
export const audio_video_generate_speech = capabilityFor(EXT_ID, "audio-video.generate-speech")
  .withInput(z.object({
  body: schemas.Schema_TTSRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_SubmitAPIResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/generate-speech",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_SubmitAPIResponse,
    })
  })

/** Get job status */
export const audio_video_status = capabilityFor(EXT_ID, "audio-video.status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_StatusAPIResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v1/status/{jobId}",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_StatusAPIResponse,
    })
  })

/** Describe template */
export const audio_video_template_describe = capabilityFor(EXT_ID, "audio-video.template-describe")
  .withInput(z.object({
  body: schemas.Schema_TemplateDescribeRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_TemplateDescribeResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/templates/describe",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_TemplateDescribeResponse,
    })
  })

/** Fetch video rendering presets */
export const audio_video_get_presets = capabilityFor(EXT_ID, "audio-video.get-presets")
  .withInput(z.object({
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_PresetsResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v1/presets",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_PresetsResponse,
    })
  })

/** Render template */
export const audio_video_template_render = capabilityFor(EXT_ID, "audio-video.template-render")
  .withInput(z.object({
  body: schemas.Schema_TemplateRenderRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_TemplateRenderResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/templates/render",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_TemplateRenderResponse,
    })
  })

/** Cancel a render job */
export const audio_video_cancel_render_job = capabilityFor(EXT_ID, "audio-video.cancel-render-job")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  headers: z.object({
  "x-request-id": z.string().optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_CancelAcceptedResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "PUT",
      pathTemplate: "/v1/cancel/{jobId}",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_CancelAcceptedResponse,
    })
  })

/** List render jobs */
export const audio_video_list_render_jobs = capabilityFor(EXT_ID, "audio-video.list-render-jobs")
  .withInput(z.object({
  query: z.object({
  "filter": z.string().optional(),
  "limit": z.number().int().min(1).max(100).optional(),
  "cursor": z.string().optional()
}).optional(),
  headers: z.object({
  "x-request-id": z.string().optional()
}).optional(),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_RenderJobListResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v1/templates/render-jobs",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_RenderJobListResponse,
    })
  })

/** Reframe video */
export const audio_video_generate_reframed_video = capabilityFor(EXT_ID, "audio-video.generate-reframed-video")
  .withInput(z.object({
  body: z.object({
  "video": z.object({
  "source": z.object({
  "url": z.string()
}),
  "mediaType": z.enum(["video/mp4", "video/quicktime"])
}),
  "sceneEditDetection": z.boolean().optional(),
  "overlays": z.array(schemas.Schema_Overlay).optional(),
  "outputConfig": z.object({
  "aspectRatios": z.array(z.string())
})
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string(),
  "statusUrl": z.string()
}))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/reframe",
      baseUrl: "https://audio-video-api.adobe.io/",
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
  "jobId": z.string(),
  "statusUrl": z.string()
}),
    })
  })

/** Transcribe media */
export const audio_video_transcribe = capabilityFor(EXT_ID, "audio-video.transcribe")
  .withInput(z.object({
  body: schemas.Schema_TranscribeRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusLinkResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/transcribe",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_JobStatusLinkResponse,
    })
  })

/** Dub audio or video */
export const audio_video_dub = capabilityFor(EXT_ID, "audio-video.dub")
  .withInput(z.object({
  body: schemas.Schema_DubRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusLinkResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/dub",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_JobStatusLinkResponse,
    })
  })

/** Get available avatars */
export const audio_video_avatars = capabilityFor(EXT_ID, "audio-video.avatars")
  .withInput(z.object({
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_SuccessfulAvatarsResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v1/avatars",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_SuccessfulAvatarsResponse,
    })
  })

/** Reframe video v2 */
export const audio_video_generate_reframed_video_v2 = capabilityFor(EXT_ID, "audio-video.generate-reframed-video-v2")
  .withInput(z.object({
  body: z.object({
  "video": schemas.Schema_VideoInputV2,
  "analysis": schemas.Schema_AnalysisV2.optional(),
  "composition": schemas.Schema_CompositionV2.optional(),
  "output": z.object({
  "format": schemas.Schema_OutputFormatV2.optional(),
  "renditions": z.array(z.union([z.object({
  "aspectRatio": schemas.Schema_AspectRatioV2,
  "mediaDestination": schemas.Schema_Destination.optional(),
  "sidecarDestination": schemas.Schema_Destination.optional()
}), z.object({
  "resolution": z.object({
  "width": z.number().int(),
  "height": z.number().int()
}),
  "mediaDestination": schemas.Schema_Destination.optional(),
  "sidecarDestination": schemas.Schema_Destination.optional()
})]))
})
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.object({
  "jobId": z.string(),
  "statusUrl": z.string()
}))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v2/reframe",
      baseUrl: "https://audio-video-api.adobe.io/",
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
  "jobId": z.string(),
  "statusUrl": z.string()
}),
    })
  })

/** Get job result */
export const audio_video_job_result_v2 = capabilityFor(EXT_ID, "audio-video.job-result-v2")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(z.union([z.object({
  "status": z.enum(["not_started", "running", "failed", "succeeded", "partially_succeeded"]),
  "jobId": z.string()
}), z.object({
  "status": z.enum(["not_started", "running", "failed", "succeeded", "partially_succeeded"]),
  "jobId": z.string(),
  "outputs": z.array(z.union([z.object({
  "destination": z.object({
  "url": z.string()
})
}), z.object({
  "error": z.object({
  "error_code": z.string(),
  "message": z.string()
})
})]))
}), z.object({
  "status": z.enum(["not_started", "running", "failed", "succeeded", "partially_succeeded"]),
  "jobId": z.string(),
  "outputs": z.array(z.union([z.object({
  "destination": z.object({
  "url": z.string()
})
}), z.object({
  "error": z.object({
  "error_code": z.string(),
  "message": z.string()
})
})]))
}), z.object({
  "status": z.enum(["not_started", "running", "failed", "succeeded", "partially_succeeded"]),
  "jobId": z.string(),
  "outputs": z.object({
  "renditions": z.array(z.object({
  "error": z.object({
  "error_code": z.string(),
  "message": z.string()
})
}))
})
})]))
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v2/status/{jobId}",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: z.union([z.object({
  "status": z.enum(["not_started", "running", "failed", "succeeded", "partially_succeeded"]),
  "jobId": z.string()
}), z.object({
  "status": z.enum(["not_started", "running", "failed", "succeeded", "partially_succeeded"]),
  "jobId": z.string(),
  "outputs": z.array(z.union([z.object({
  "destination": z.object({
  "url": z.string()
})
}), z.object({
  "error": z.object({
  "error_code": z.string(),
  "message": z.string()
})
})]))
}), z.object({
  "status": z.enum(["not_started", "running", "failed", "succeeded", "partially_succeeded"]),
  "jobId": z.string(),
  "outputs": z.array(z.union([z.object({
  "destination": z.object({
  "url": z.string()
})
}), z.object({
  "error": z.object({
  "error_code": z.string(),
  "message": z.string()
})
})]))
}), z.object({
  "status": z.enum(["not_started", "running", "failed", "succeeded", "partially_succeeded"]),
  "jobId": z.string(),
  "outputs": z.object({
  "renditions": z.array(z.object({
  "error": z.object({
  "error_code": z.string(),
  "message": z.string()
})
}))
})
})]),
    })
  })

/** Generate avatar video from text */
export const audio_video_generate_avatar = capabilityFor(EXT_ID, "audio-video.generate-avatar")
  .withInput(z.object({
  body: schemas.Schema_AvatarRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_SubmitAPIResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/generate-avatar",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_SubmitAPIResponse,
    })
  })

/** Transcribe media */
export const audio_video_transcribe__v1_transcribe = capabilityFor(EXT_ID, "audio-video.transcribe-transcribe")
  .withInput(z.object({
  body: schemas.Schema_TranscribeRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusLinkResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/transcribe",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_JobStatusLinkResponse,
    })
  })

/** Dub audio or video */
export const audio_video_dub__v1_dub = capabilityFor(EXT_ID, "audio-video.dub-dub")
  .withInput(z.object({
  body: schemas.Schema_DubRequest,
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatusLinkResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "POST",
      pathTemplate: "/v1/dub",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_JobStatusLinkResponse,
    })
  })

/** Get the result for a job */
export const audio_video_job_result = capabilityFor(EXT_ID, "audio-video.job-result")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  poll: z.boolean().optional(),
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_FireflyJobResponse)
  .withHandler(async (input, ctx) => {
    return invokeAdobeOperation({
      method: "GET",
      pathTemplate: "/v1/status/{jobId}",
      baseUrl: "https://audio-video-api.adobe.io/",
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
      outputSchema: schemas.Schema_FireflyJobResponse,
    })
  })
