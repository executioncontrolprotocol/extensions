/* eslint-disable */
/** Generated Adobe audio-video browser catalog — do not edit. */
import { capabilityFor } from "@executioncontrolprotocol/core"
import { z } from "zod"
import * as schemas from "./schemas.js"
import { HOST_HOP_MESSAGE } from "../../shared.js"

const EXT_ID = "@executioncontrolprotocol/adobe-firefly-services"
async function hostHop(): Promise<never> {
  throw new Error(HOST_HOP_MESSAGE)
}

/** Get available voices */
export const audio_video_voices = capabilityFor(EXT_ID, "audio-video-voices")
  .withInput(z.object({}))
  .withOutput(schemas.Schema_SuccessfulVoicesResponse)
  .withHandler(hostHop)

/** Generate speech from text */
export const audio_video_generate_speech = capabilityFor(EXT_ID, "audio-video-generate-speech")
  .withInput(z.object({
  body: schemas.Schema_TTSRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_StatusAPIResponse)
  .withHandler(hostHop)

/** Get job status */
export const audio_video_status = capabilityFor(EXT_ID, "audio-video-status")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(schemas.Schema_StatusAPIResponse)
  .withHandler(hostHop)

/** Describe template */
export const audio_video_template_describe = capabilityFor(EXT_ID, "audio-video-template-describe")
  .withInput(z.object({
  body: schemas.Schema_TemplateDescribeRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_StatusAPIResponse)
  .withHandler(hostHop)

/** Fetch video rendering presets */
export const audio_video_get_presets = capabilityFor(EXT_ID, "audio-video-get-presets")
  .withInput(z.object({}))
  .withOutput(schemas.Schema_PresetsResponse)
  .withHandler(hostHop)

/** Render template */
export const audio_video_template_render = capabilityFor(EXT_ID, "audio-video-template-render")
  .withInput(z.object({
  body: schemas.Schema_TemplateRenderRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_JobStatus)
  .withHandler(hostHop)

/** Cancel a render job */
export const audio_video_cancel_render_job = capabilityFor(EXT_ID, "audio-video-cancel-render-job")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
}),
  headers: z.object({
  "x-request-id": z.string().optional()
}).optional()
}))
  .withOutput(schemas.Schema_CancelAcceptedResponse)
  .withHandler(hostHop)

/** List render jobs */
export const audio_video_list_render_jobs = capabilityFor(EXT_ID, "audio-video-list-render-jobs")
  .withInput(z.object({
  query: z.object({
  "filter": z.string().optional(),
  "limit": z.number().int().min(1).max(100).optional(),
  "cursor": z.string().optional()
}).optional(),
  headers: z.object({
  "x-request-id": z.string().optional()
}).optional()
}))
  .withOutput(schemas.Schema_RenderJobListResponse)
  .withHandler(hostHop)

/** Reframe video */
export const audio_video_generate_reframed_video = capabilityFor(EXT_ID, "audio-video-generate-reframed-video")
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
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_StatusAPIResponse)
  .withHandler(hostHop)

/** Transcribe media */
export const audio_video_transcribe = capabilityFor(EXT_ID, "audio-video-transcribe")
  .withInput(z.object({
  body: schemas.Schema_TranscribeRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_FireflyJobResponse)
  .withHandler(hostHop)

/** Dub audio or video */
export const audio_video_dub = capabilityFor(EXT_ID, "audio-video-dub")
  .withInput(z.object({
  body: schemas.Schema_DubRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_FireflyJobResponse)
  .withHandler(hostHop)

/** Get available avatars */
export const audio_video_avatars = capabilityFor(EXT_ID, "audio-video-avatars")
  .withInput(z.object({}))
  .withOutput(schemas.Schema_SuccessfulAvatarsResponse)
  .withHandler(hostHop)

/** Reframe video v2 */
export const audio_video_generate_reframed_video_v2 = capabilityFor(EXT_ID, "audio-video-generate-reframed-video-v2")
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
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_StatusAPIResponse)
  .withHandler(hostHop)

/** Get job result */
export const audio_video_job_result_v2 = capabilityFor(EXT_ID, "audio-video-job-result-v2")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
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
  .withHandler(hostHop)

/** Generate avatar video from text */
export const audio_video_generate_avatar = capabilityFor(EXT_ID, "audio-video-generate-avatar")
  .withInput(z.object({
  body: schemas.Schema_AvatarRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_StatusAPIResponse)
  .withHandler(hostHop)

/** Transcribe media */
export const audio_video_transcribe__v1_transcribe = capabilityFor(EXT_ID, "audio-video-transcribe-transcribe")
  .withInput(z.object({
  body: schemas.Schema_TranscribeRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_FireflyJobResponse)
  .withHandler(hostHop)

/** Dub audio or video */
export const audio_video_dub__v1_dub = capabilityFor(EXT_ID, "audio-video-dub-dub")
  .withInput(z.object({
  body: schemas.Schema_DubRequest,
  pollIntervalMs: z.number().int().positive().optional(),
  pollTimeoutMs: z.number().int().positive().optional()
}))
  .withOutput(schemas.Schema_FireflyJobResponse)
  .withHandler(hostHop)

/** Get the result for a job */
export const audio_video_job_result = capabilityFor(EXT_ID, "audio-video-job-result")
  .withInput(z.object({
  path: z.object({
  "jobId": z.string()
})
}))
  .withOutput(schemas.Schema_FireflyJobResponse)
  .withHandler(hostHop)
