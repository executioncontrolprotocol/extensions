import { workflow, step } from "@executioncontrolprotocol/core"

/**
 * Smoke workflow: submit Firefly async image generate, then poll Photoshop job status.
 * Replace jobId with a real id from a prior Photoshop submit when exercising live APIs.
 */
export default workflow("Adobe Firefly smoke")
  .run([
    step("@executioncontrolprotocol/adobe.firefly.generate-images-v3-async", "Generate images")
      .with({
        body: { prompt: "a quiet desert at dusk" },
      })
      .as("generate"),

    step("@executioncontrolprotocol/adobe.photoshop.get-job-status", "Photoshop job status")
      .with({
        path: { jobId: "replace-with-job-id" },
      })
      .as("psStatus"),
  ])
