/**
 * Generate family-prefixed Adobe capabilities + Zod schemas from vendored OpenAPI.
 * Usage: node packages/adobe/scripts/generate-capabilities.mjs
 */
import { mkdirSync, readFileSync, readdirSync, statSync, writeFileSync, rmSync } from "node:fs"
import { dirname, join, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { parse as parseYaml } from "yaml"
import { SPEC_SOURCES, familyForSpec } from "./fetch-specs.mjs"
import { ZodEmitter, toKebab, toSafeIdent } from "./lib/zod-emitter.mjs"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const openapiDir = join(root, "openapi")
const generatedDir = join(root, "src", "generated")

const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "head", "options"]

/**
 * @param {string} dir
 * @param {string[]} acc
 */
function walkFiles(dir, acc = []) {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return acc
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walkFiles(p, acc)
    else if (/\.(json|ya?ml)$/i.test(name)) acc.push(p)
  }
  return acc
}

/**
 * @param {string} path
 */
function loadSpec(path) {
  const text = readFileSync(path, "utf8")
  return /\.ya?ml$/i.test(path) ? parseYaml(text) : JSON.parse(text)
}

/**
 * Apply path-array overlays onto a document.
 * @param {object} doc
 * @param {{ path: string[], value: object }[]} patches
 */
function applyOverlays(doc, patches) {
  for (const patch of patches) {
    let cur = doc
    const parts = patch.path
    for (let i = 0; i < parts.length - 1; i++) {
      const key = parts[i]
      if (cur[key] == null || typeof cur[key] !== "object") {
        cur[key] = {}
      }
      cur = cur[key]
    }
    cur[parts[parts.length - 1]] = patch.value
  }
}

function loadOverlays() {
  const overlayPath = join(openapiDir, "overlays", "schema-fixes.json")
  try {
    return JSON.parse(readFileSync(overlayPath, "utf8"))
  } catch {
    return {}
  }
}

/**
 * Resolve $ref relative to document components.
 * @param {object} doc
 * @param {string} ref
 */
function resolveRef(doc, ref) {
  if (!ref.startsWith("#/")) throw new Error(`External $ref not supported: ${ref}`)
  const parts = ref.slice(2).split("/")
  let cur = doc
  for (const p of parts) {
    cur = cur?.[p]
  }
  return cur
}

/**
 * Pick primary 2xx application/json response schema.
 * @param {object} operation
 * @param {object} doc
 */
function successResponseSchema(operation, doc) {
  const responses = operation.responses ?? {}
  const codes = Object.keys(responses).sort()
  const successCodes = codes.filter((c) => c.startsWith("2") || c === "default")
  for (const code of successCodes) {
    const resp = responses[code]
    const resolved = resp?.$ref ? resolveRef(doc, resp.$ref) : resp
    const content = resolved?.content ?? {}
    const json =
      content["application/json"] ??
      content["application/problem+json"] ??
      content["*/*"]
    if (json?.schema) return json.schema
  }
  // 204 / empty success
  return { type: "object", properties: {}, additionalProperties: false }
}

/**
 * @param {object} operation
 * @param {object} doc
 * @param {ZodEmitter} emitter
 * @param {string} context
 */
function buildInputZod(operation, doc, emitter, context) {
  const pathProps = {}
  const queryProps = {}
  const headerProps = {}
  const pathReq = []
  const queryReq = []
  const headerReq = []

  for (const param of operation.parameters ?? []) {
    const p = param.$ref ? resolveRef(doc, param.$ref) : param
    if (!p?.name || !p.in) continue
    const schema = p.schema ?? { type: "string" }
    if (p.in === "path") {
      pathProps[p.name] = schema
      pathReq.push(p.name)
    } else if (p.in === "query") {
      queryProps[p.name] = schema
      if (p.required) queryReq.push(p.name)
    } else if (p.in === "header") {
      // skip auth headers — client injects them
      const lower = p.name.toLowerCase()
      if (lower === "authorization" || lower === "x-api-key") continue
      headerProps[p.name] = schema
      if (p.required) headerReq.push(p.name)
    }
  }

  let bodySchema
  if (operation.requestBody) {
    const rb = operation.requestBody.$ref
      ? resolveRef(doc, operation.requestBody.$ref)
      : operation.requestBody
    const content = rb?.content ?? {}
    const json = content["application/json"] ?? content["application/octet-stream"]
    if (json?.schema) bodySchema = json.schema
  }

  const groups = []
  if (Object.keys(pathProps).length) {
    groups.push(
      `  path: ${emitter.schemaToZod({ type: "object", properties: pathProps, required: pathReq, additionalProperties: false }, `${context}.path`)}`,
    )
  }
  if (Object.keys(queryProps).length) {
    groups.push(
      `  query: ${emitter.schemaToZod({ type: "object", properties: queryProps, required: queryReq, additionalProperties: false }, `${context}.query`)}.optional()`,
    )
  }
  if (Object.keys(headerProps).length) {
    groups.push(
      `  headers: ${emitter.schemaToZod({ type: "object", properties: headerProps, required: headerReq, additionalProperties: false }, `${context}.headers`)}.optional()`,
    )
  }
  if (bodySchema) {
    const requiredBody = operation.requestBody?.required !== false
    const bodyExpr = emitter.schemaToZod(bodySchema, `${context}.body`)
    groups.push(`  body: ${requiredBody ? bodyExpr : `${bodyExpr}.optional()`}`)
  }

  // Always allow optional poll/wait for async ops without breaking schema
  groups.push(`  poll: z.boolean().optional()`)
  groups.push(`  pollIntervalMs: z.number().int().positive().optional()`)
  groups.push(`  pollTimeoutMs: z.number().int().positive().optional()`)

  if (!groups.length) return "z.object({})"
  return `z.object({\n${groups.join(",\n")}\n})`
}

/**
 * @param {string} family
 * @param {string} operationId
 * @param {string} method
 * @param {string} path
 */
function capabilityOpName(family, operationId, method, path) {
  if (operationId) return `${family}.${toKebab(operationId)}`
  const fromPath = path
    .replace(/^\//, "")
    .replace(/\{([^}]+)\}/g, "by-$1")
    .replace(/\//g, "-")
  return `${family}.${toKebab(`${method}-${fromPath}`)}`
}

/**
 * @param {object} doc
 */
function baseUrl(doc) {
  const server = doc.servers?.[0]?.url
  if (!server) return ""
  return server.endsWith("/") ? server : `${server}/`
}

function main() {
  rmSync(generatedDir, { recursive: true, force: true })
  mkdirSync(generatedDir, { recursive: true })

  /** @type {string[]} */
  const allErrors = []
  /** @type {{ family: string, opName: string, exportName: string, importPath: string }[]} */
  const registry = []
  /** @type {Map<string, object[]>} */
  const byFamily = new Map()

  const overlays = loadOverlays()
  const files = walkFiles(openapiDir).filter((f) => !f.includes("overlays"))

  /** @type {Map<string, { rels: string[], docs: object[] }>} */
  const familyDocs = new Map()
  for (const file of files) {
    const rel = relative(openapiDir, file).replace(/\\/g, "/")
    const family = familyForSpec(rel)
    if (family === "content-tagging") continue
    const doc = loadSpec(file)
    if (overlays[rel]) applyOverlays(doc, overlays[rel])
    if (!familyDocs.has(family)) familyDocs.set(family, { rels: [], docs: [] })
    const entry = familyDocs.get(family)
    entry.rels.push(rel)
    entry.docs.push(doc)
  }

  for (const [family, { rels, docs }] of [...familyDocs.entries()].sort()) {
    /** @type {Map<string, object>} */
    const componentMap = new Map()
    for (const doc of docs) {
      for (const [name, schema] of Object.entries(doc.components?.schemas ?? {})) {
        componentMap.set(name, schema)
      }
    }

    const emitter = new ZodEmitter(componentMap)
    for (const name of componentMap.keys()) {
      emitter.ensureComponent(name)
    }

    const familyOps = []
    for (let di = 0; di < docs.length; di++) {
      const doc = docs[di]
      const rel = rels[di]
      const base = baseUrl(doc)

      for (const [path, item] of Object.entries(doc.paths ?? {})) {
        for (const method of HTTP_METHODS) {
          const operation = item[method]
          if (!operation) continue

          const opId = operation.operationId || ""
          const opName = capabilityOpName(family, opId, method, path)
          const exportName = toSafeIdent(opName.replace(/\./g, "_"))
          const context = `${rel}:${method.toUpperCase()} ${path}`

          const inputZod = buildInputZod(operation, doc, emitter, `${context}.input`)
          const outputSchema = successResponseSchema(operation, doc)
          const outputZod = emitter.schemaToZod(outputSchema, `${context}.output`)

          familyOps.push({
            family,
            opName,
            exportName,
            method: method.toUpperCase(),
            path,
            baseUrl: base,
            inputZod,
            outputZod,
            operationId: opId,
            summary: operation.summary ?? "",
            rel,
          })
        }
      }
    }

    allErrors.push(...emitter.errors.map((e) => `[${family}] ${e}`))

    const familyDir = join(generatedDir, family)
    mkdirSync(familyDir, { recursive: true })

    const schemasSrc = `/* eslint-disable */\n/** Generated from ${rels.join(", ")} — do not edit. */\nimport { z } from "zod"\n\n${emitter.componentSource}\n`
    writeFileSync(join(familyDir, "schemas.ts"), schemasSrc, "utf8")

    const seen = new Set()
    const uniqueOps = []
    for (const op of familyOps) {
      if (seen.has(op.exportName)) {
        op.exportName = `${op.exportName}_${toSafeIdent(op.path)}`
        op.opName = `${op.opName}-${toKebab(op.path.split("/").filter(Boolean).pop() || "x")}`
      }
      if (seen.has(op.exportName)) continue
      seen.add(op.exportName)
      uniqueOps.push(op)
    }
    byFamily.set(family, uniqueOps)
  }

  for (const [family, ops] of [...byFamily.entries()].sort()) {
    const familyDir = join(generatedDir, family)
    const capLines = []
    capLines.push(`/* eslint-disable */`)
    capLines.push(`/** Generated Adobe ${family} capabilities — do not edit. */`)
    capLines.push(`import { capabilityFor } from "@executioncontrolprotocol/core"`)
    capLines.push(`import { z } from "zod"`)
    capLines.push(`import * as schemas from "./schemas.js"`)
    capLines.push(`import { invokeAdobeOperation } from "../../runtime/invoke.js"`)
    capLines.push(``)
    capLines.push(`const EXT_ID = "@executioncontrolprotocol/adobe"`)
    capLines.push(``)

    for (const op of ops) {
      const qualify = (expr) =>
        expr.replace(/\bSchema_([A-Za-z0-9_]+)\b/g, "schemas.Schema_$1")

      const inputZod = qualify(op.inputZod)
      const outputZod = qualify(op.outputZod)

      capLines.push(`/** ${op.summary || op.opName} */`)
      capLines.push(
        `export const ${op.exportName} = capabilityFor(EXT_ID, ${JSON.stringify(op.opName)})`,
      )
      capLines.push(`  .withInput(${inputZod})`)
      capLines.push(`  .withOutput(${outputZod})`)
      capLines.push(`  .withHandler(async (input, ctx) => {`)
      capLines.push(`    return invokeAdobeOperation({`)
      capLines.push(`      method: ${JSON.stringify(op.method)},`)
      capLines.push(`      pathTemplate: ${JSON.stringify(op.path)},`)
      capLines.push(`      baseUrl: ${JSON.stringify(op.baseUrl)},`)
      capLines.push(`      input: input as {`)
      capLines.push(`        path?: Record<string, string | number | boolean>`)
      capLines.push(`        query?: Record<string, string | number | boolean | undefined>`)
      capLines.push(`        headers?: Record<string, string>`)
      capLines.push(`        body?: unknown`)
      capLines.push(`        poll?: boolean`)
      capLines.push(`        pollIntervalMs?: number`)
      capLines.push(`        pollTimeoutMs?: number`)
      capLines.push(`      },`)
      capLines.push(`      ctx,`)
      capLines.push(`      outputSchema: ${outputZod},`)
      capLines.push(`    })`)
      capLines.push(`  })`)
      capLines.push(``)

      registry.push({
        family,
        opName: op.opName,
        exportName: op.exportName,
        importPath: `./${family}/capabilities.js`,
      })
    }

    writeFileSync(join(familyDir, "capabilities.ts"), capLines.join("\n"), "utf8")

    const exportsList = ops.map((o) => o.exportName).join(", ")
    writeFileSync(
      join(familyDir, "index.ts"),
      `/** Generated — do not edit. */\nexport { ${exportsList} } from "./capabilities.js"\n`,
      "utf8",
    )
  }

  const importLines = []
  const arrayItems = []
  const seenImport = new Map()
  for (const r of registry) {
    if (!seenImport.has(r.importPath)) {
      seenImport.set(r.importPath, [])
    }
    seenImport.get(r.importPath).push(r.exportName)
  }
  let i = 0
  for (const [path, names] of seenImport) {
    const alias = `fam${i++}`
    importLines.push(`import * as ${alias} from "${path}"`)
    for (const name of names) {
      arrayItems.push(`${alias}.${name}`)
    }
  }

  const meta = {
    generatedAt: new Date().toISOString(),
    operationCount: registry.length,
    families: [...byFamily.keys()].sort(),
    operations: registry.map((r) => `@executioncontrolprotocol/adobe.${r.opName}`),
    specFiles: Object.keys(SPEC_SOURCES),
  }

  writeFileSync(join(generatedDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8")

  writeFileSync(
    join(generatedDir, "index.ts"),
    `/** Generated Adobe capability registry — do not edit. */\n${importLines.join("\n")}\n\n/** All generated Adobe capability builders. */\nexport const adobeGeneratedCapabilities = [\n  ${arrayItems.join(",\n  ")},\n] as const\n\nexport const ADOBE_GENERATED_OPERATION_COUNT = ${registry.length} as const\n`,
    "utf8",
  )

  if (allErrors.length) {
    console.error(`Codegen completed with ${allErrors.length} schema error(s):`)
    for (const e of allErrors.slice(0, 50)) console.error(" -", e)
    if (allErrors.length > 50) console.error(` ... and ${allErrors.length - 50} more`)
    writeFileSync(join(generatedDir, "codegen-errors.json"), JSON.stringify(allErrors, null, 2))
    process.exitCode = 1
  } else {
    console.log(`Generated ${registry.length} capabilities across ${byFamily.size} families`)
  }
}

main()
