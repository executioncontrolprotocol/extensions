import { z } from "zod"
import { createImsTokenProvider } from "../auth/ims.js"
import { buildUrl, createAdobeHttpClient } from "../http/client.js"
import { pollAdobeJob } from "../http/async-job.js"

/**
 * Capability handler context fields used by Adobe invoke.
 * Core handlers receive `CapabilityContext`; hosts may attach `extensionConfig`.
 * @category Runtime
 */
export interface AdobeInvokeContext {
  /** Bound extension config (from capability runtime). */
  extensionConfig?: {
    clientId?: string
    clientSecret?: string
    scopes?: string
    imsEndpoint?: string
  }
}

/**
 * Structured capability input produced by codegen.
 * @category Runtime
 */
export interface AdobeOperationInput {
  /** Path template params. */
  path?: Record<string, string | number | boolean>
  /** Query string params. */
  query?: Record<string, string | number | boolean | undefined>
  /** Extra headers (non-auth). */
  headers?: Record<string, string>
  /** JSON body. */
  body?: unknown
  /** When true, poll status URL if response includes one. */
  poll?: boolean
  /** Poll interval. */
  pollIntervalMs?: number
  /** Poll timeout. */
  pollTimeoutMs?: number
}

/**
 * Read optional extension config bag from a capability handler context.
 * @category Runtime
 */
export function readExtensionConfig(ctx: unknown): Record<string, unknown> {
  if (!ctx || typeof ctx !== "object") return {}
  const cfg = (ctx as AdobeInvokeContext).extensionConfig
  if (!cfg || typeof cfg !== "object") return {}
  return cfg as Record<string, unknown>
}

/**
 * Invoke a generated Adobe OpenAPI operation.
 * @category Runtime
 */
export async function invokeAdobeOperation(options: {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS"
  pathTemplate: string
  baseUrl: string
  input: AdobeOperationInput
  /** Capability handler context (`CapabilityContext` + optional `extensionConfig`). */
  ctx: unknown
  outputSchema: z.ZodType
}): Promise<unknown> {
  const rawCfg = readExtensionConfig(options.ctx)
  const clientId = typeof rawCfg.clientId === "string" ? rawCfg.clientId : undefined
  const clientSecret = typeof rawCfg.clientSecret === "string" ? rawCfg.clientSecret : undefined
  if (!clientId || !clientSecret) {
    throw new Error("Adobe clientId and clientSecret are required in extension config")
  }

  const getAccessToken = createImsTokenProvider({
    clientId,
    clientSecret,
    scopes: typeof rawCfg.scopes === "string" ? rawCfg.scopes : undefined,
    imsEndpoint: typeof rawCfg.imsEndpoint === "string" ? rawCfg.imsEndpoint : undefined,
  })
  const client = createAdobeHttpClient({ clientId, getAccessToken })

  const url = buildUrl(
    options.baseUrl,
    options.pathTemplate,
    options.input.path ?? {},
    options.input.query,
  )

  const raw = await client.request({
    method: options.method,
    url,
    body: options.input.body,
    headers: options.input.headers,
  })

  let result: unknown = raw
  if (options.input.poll && raw && typeof raw === "object") {
    const record = raw as Record<string, unknown>
    const statusUrl =
      (typeof record.statusUrl === "string" && record.statusUrl) ||
      (typeof record.status === "string" && record.status.startsWith("http") && record.status) ||
      (typeof (record._links as { self?: { href?: string } } | undefined)?.self?.href === "string" &&
        (record._links as { self: { href: string } }).self.href) ||
      undefined
    if (statusUrl) {
      result = await pollAdobeJob({
        statusUrl,
        client,
        intervalMs: options.input.pollIntervalMs,
        timeoutMs: options.input.pollTimeoutMs,
      })
    }
  }

  const parsed = options.outputSchema.safeParse(result)
  if (!parsed.success) {
    throw new Error(`Adobe response failed output schema: ${parsed.error.message}`)
  }
  return parsed.data
}
