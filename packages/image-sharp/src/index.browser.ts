import {
  capabilityFor,
  catalogExtension,
  globalRegistry,
  type Registry,
} from "@executioncontrolprotocol/core"
import { z } from "zod"
import {
  transformInputSchema,
  transformOutputSchema,
  inspectInputSchema,
  inspectOutputSchema,
  deriveInputSchema,
  deriveOutputSchema,
  resizeInputSchema,
  cropInputSchema,
  thumbnailInputSchema,
  compositeInputSchema,
  convertInputSchema,
  normalizeInputSchema,
} from "./schemas.js"
import { buildImageSharpExtension, EXT_ID, HOST_HOP_MESSAGE } from "./shared.js"

async function hostHop(): Promise<never> {
  throw new Error(HOST_HOP_MESSAGE)
}

function caps() {
  return [
    capabilityFor(EXT_ID, "inspect")
      .withInput(inspectInputSchema)
      .withOutput(inspectOutputSchema)
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "metadata")
      .withInput(z.object({ image: inspectInputSchema.shape.image }))
      .withOutput(z.object({ metadata: z.record(z.string(), z.unknown()) }))
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "stats")
      .withInput(z.object({ image: inspectInputSchema.shape.image }))
      .withOutput(z.object({ stats: z.unknown() }))
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "transform")
      .withInput(transformInputSchema)
      .withOutput(transformOutputSchema)
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "resize")
      .withInput(resizeInputSchema)
      .withOutput(transformOutputSchema)
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "crop")
      .withInput(cropInputSchema)
      .withOutput(transformOutputSchema)
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "thumbnail")
      .withInput(thumbnailInputSchema)
      .withOutput(z.object({ thumbnails: z.record(z.string(), transformOutputSchema) }))
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "convert")
      .withInput(convertInputSchema)
      .withOutput(transformOutputSchema)
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "composite")
      .withInput(compositeInputSchema)
      .withOutput(transformOutputSchema)
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "normalize")
      .withInput(normalizeInputSchema)
      .withOutput(transformOutputSchema)
      .withHandler(hostHop),
    capabilityFor(EXT_ID, "derive")
      .withInput(deriveInputSchema)
      .withOutput(deriveOutputSchema)
      .withHandler(hostHop),
  ]
}

/** Browser catalog for `@executioncontrolprotocol/image-sharp` (no native `sharp`). @category Extensions */
export const imageSharpExtension = buildImageSharpExtension(caps())

catalogExtension(imageSharpExtension)

/** Register `@executioncontrolprotocol/image-sharp` (catalog only in the browser). */
export async function registerImageSharpExtension(registry: Registry = globalRegistry): Promise<void> {
  if (!registry.getExtension(EXT_ID)) {
    await registry.registerExtension(imageSharpExtension)
  }
}

export default imageSharpExtension
