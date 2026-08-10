import {
  defineExtension,
  capabilityFor,
  globalRegistry,
  catalogExtension,
  type Registry,
} from "@executioncontrolprotocol/core"
import { z } from "zod"

const EXT_ID = "@executioncontrolprotocol/adobe"

/**
 * Adobe / Firefly extension scaffold.
 *
 * Stub `generateImage` proves third-party authoring from outside the core monorepo.
 * Replace the handler with a real Adobe Firefly API client when integrating.
 *
 * @category Extensions
 */
export const adobeExtension = defineExtension("@executioncontrolprotocol", "adobe")
  .withConfig({
    /** Adobe API client id (optional until real integration). */
    clientId: z.string().optional(),
    /** Adobe API client secret (optional until real integration). */
    clientSecret: z.string().optional(),
  })
  .withCapabilities([
    capabilityFor(EXT_ID, "generateImage")
      .withInput(
        z.object({
          /** Text prompt for image generation. */
          prompt: z.string().min(1),
          /** Optional model or Firefly endpoint id. */
          model: z.string().optional(),
        }),
      )
      .withOutput(
        z.object({
          /** Whether the stub accepted the request. */
          ok: z.boolean(),
          /** Placeholder image URL or asset id. */
          imageUrl: z.string().optional(),
          /** Echo of the prompt for debugging. */
          prompt: z.string(),
        }),
      )
      .withHandler(async (input) => {
        const parsed = input as { prompt: string; model?: string }
        return {
          ok: true,
          prompt: parsed.prompt,
          imageUrl: `stub://adobe/firefly?prompt=${encodeURIComponent(parsed.prompt)}`,
        }
      }),
  ])
  .build()

catalogExtension(adobeExtension)

/**
 * Register `@executioncontrolprotocol/adobe` on a registry.
 *
 * @category Extensions
 */
export async function registerAdobeExtension(registry: Registry = globalRegistry): Promise<void> {
  if (!registry.getExtension(EXT_ID)) {
    await registry.registerExtension(adobeExtension)
  }
}

export default adobeExtension
