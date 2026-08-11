import {
  defineExtension,
  globalRegistry,
  catalogExtension,
  type Registry,
} from "@executioncontrolprotocol/core"
import { z } from "zod"
import {
  adobeGeneratedCapabilities,
  ADOBE_GENERATED_OPERATION_COUNT,
} from "./generated/index.js"

const EXT_ID = "@executioncontrolprotocol/adobe"

/**
 * `@executioncontrolprotocol/adobe` — Adobe Firefly Services extension.
 *
 * One capability per OpenAPI operation across Firefly Services families
 * (`firefly`, `photoshop` v2, `express`, `indesign`, `substance3d`, `illustrator`,
 * `creative-production`, `audio-video`). Capability ids are family-prefixed, e.g.
 * `@executioncontrolprotocol/adobe.firefly.generate-images`.
 *
 * Auth uses OAuth Server-to-Server (`client_credentials`). Bind secrets via
 * `secrets("adobe/client-id")` / `secrets("adobe/client-secret")` or `env(...)`.
 *
 * @category Extensions
 */
export const adobeExtension = defineExtension("@executioncontrolprotocol", "adobe")
  .withConfig({
    /** Adobe Developer Console client id (x-api-key). */
    clientId: z.string().min(1),
    /** Adobe Developer Console client secret. */
    clientSecret: z.string().min(1),
    /** IMS scopes (comma- or space-separated). */
    scopes: z.string().optional(),
    /** Override IMS token URL. */
    imsEndpoint: z.string().optional(),
  })
  .withCapabilities([...adobeGeneratedCapabilities])
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

export { ADOBE_GENERATED_OPERATION_COUNT, adobeGeneratedCapabilities }
export {
  createImsTokenProvider,
  DEFAULT_FIREFLY_SCOPES,
  DEFAULT_IMS_TOKEN_URL,
} from "./auth/ims.js"
export type { AdobeImsConfig, AdobeAccessToken } from "./auth/ims.js"
export { AdobeHttpError, buildUrl, createAdobeHttpClient } from "./http/client.js"
export type { AdobeHttpClient, AdobeRequestOptions } from "./http/client.js"
export { pollAdobeJob } from "./http/async-job.js"
export type { PollAdobeJobOptions } from "./http/async-job.js"

export default adobeExtension
