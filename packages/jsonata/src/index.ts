import {
  defineExtension,
  capabilityFor,
  globalRegistry,
  catalogExtension,
  type Registry,
} from "@executioncontrolprotocol/core"
import {
  jsonataTransformInputSchema,
  jsonataTransformOutputSchema,
  type JsonataTransformInput,
} from "./schemas.js"
import { runJsonataTransform } from "./transform.js"

/** @executioncontrolprotocol/jsonata extension. @category Extensions */
export const jsonataExtension = defineExtension("@executioncontrolprotocol", "jsonata")
  .withCapabilities([
    capabilityFor("@executioncontrolprotocol/jsonata", "transform")
      .withInput(jsonataTransformInputSchema)
      .withOutput(jsonataTransformOutputSchema)
      .withExecution("local")
      .withHandler(async (input) => {
        const parsed = input as JsonataTransformInput
        return runJsonataTransform(parsed)
      }),
  ])
  .build()

catalogExtension(jsonataExtension)

/** Register @executioncontrolprotocol/jsonata. */
export async function registerJsonataExtension(
  registry: Registry = globalRegistry
): Promise<void> {
  if (!registry.getExtension("@executioncontrolprotocol/jsonata")) {
    await registry.registerExtension(jsonataExtension)
  }
}

export {
  jsonataTransformInputSchema,
  jsonataTransformOutputSchema,
  type JsonataTransformInput,
  type JsonataTransformOutput,
} from "./schemas.js"
export { runJsonataTransform } from "./transform.js"

export default jsonataExtension
