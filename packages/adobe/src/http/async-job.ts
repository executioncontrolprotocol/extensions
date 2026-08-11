import type { AdobeHttpClient } from "./client.js"

/**
 * Options for polling an async Adobe job status URL.
 * @category Http
 */
export interface PollAdobeJobOptions {
  /** Absolute status URL returned by a 202-style submit call. */
  statusUrl: string
  /** HTTP client. */
  client: AdobeHttpClient
  /** Poll interval ms. */
  intervalMs?: number
  /** Max wait ms. */
  timeoutMs?: number
  /** Status field name on JSON body (default \`status\`). */
  statusField?: string
  /** Status values treated as success. */
  successStatuses?: string[]
  /** Status values treated as failure. */
  failureStatuses?: string[]
}

/**
 * Poll an Adobe async job until success, failure, or timeout.
 * @category Http
 */
export async function pollAdobeJob(options: PollAdobeJobOptions): Promise<unknown> {
  const intervalMs = options.intervalMs ?? 2000
  const timeoutMs = options.timeoutMs ?? 120_000
  const statusField = options.statusField ?? "status"
  const success = new Set(
    (options.successStatuses ?? ["succeeded", "success", "completed", "done"]).map((s) =>
      s.toLowerCase(),
    ),
  )
  const failure = new Set(
    (options.failureStatuses ?? ["failed", "error", "cancelled", "canceled"]).map((s) =>
      s.toLowerCase(),
    ),
  )

  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    const body = (await options.client.request({
      method: "GET",
      url: options.statusUrl,
    })) as Record<string, unknown>

    const raw = body[statusField]
    const status = typeof raw === "string" ? raw.toLowerCase() : ""
    if (success.has(status)) return body
    if (failure.has(status)) {
      throw new Error(`Adobe async job failed with status=${String(raw)}`)
    }
    await new Promise((r) => setTimeout(r, intervalMs))
  }
  throw new Error(`Adobe async job timed out after ${timeoutMs}ms: ${options.statusUrl}`)
}
