import { describe, expect, it, beforeEach } from "vitest"
import { globalRegistry } from "@executioncontrolprotocol/core"
import { registerAdobeExtension, adobeExtension } from "../src/index.js"

describe("@executioncontrolprotocol/adobe", () => {
  beforeEach(async () => {
    await registerAdobeExtension()
  })

  it("registers the extension and exposes generateImage", () => {
    const ext = globalRegistry.getExtension("@executioncontrolprotocol/adobe")
    expect(ext).toBe(adobeExtension)
    expect(ext?.capabilities.map((c) => c.id)).toContain(
      "@executioncontrolprotocol/adobe.generateImage",
    )
  })

  it("generateImage returns a stub acknowledgement", async () => {
    const cap = adobeExtension.capabilities.find(
      (c) => c.id === "@executioncontrolprotocol/adobe.generateImage",
    )
    const ctx = { extensionConfig: {}, usage: { increment: () => undefined } }
    const out = (await cap?.handler({ prompt: "sunset over dunes" }, ctx as never)) as {
      ok: boolean
      prompt: string
      imageUrl?: string
    }
    expect(out.ok).toBe(true)
    expect(out.prompt).toBe("sunset over dunes")
    expect(out.imageUrl).toContain("stub://adobe/firefly")
  })

  it("validates generateImage input", () => {
    const cap = adobeExtension.capabilities.find(
      (c) => c.id === "@executioncontrolprotocol/adobe.generateImage",
    )
    expect(cap?.inputSchema?.safeParse({ prompt: "hi" }).success).toBe(true)
    expect(cap?.inputSchema?.safeParse({}).success).toBe(false)
  })
})
