import { createRequire } from "node:module"
import { writeFile } from "node:fs/promises"

const require = createRequire(import.meta.url)
const { convert } = require("openapi-to-postmanv2")

const INPUT = "api/openapi.yaml"
const OUTPUT = "api/postman_collection.json"

const conversionOptions = {
  alwaysInheritAuthentication: true,
  folderStrategy: "Tags",
  includeAuthInfoInExample: true,
  indentCharacter: "Space",
  parametersResolution: "Example",
  preferredRequestBodyType: "raw",
  requestNameSource: "Fallback",
  schemaFaker: false,
}

function convertOpenApi() {
  return new Promise((resolve, reject) => {
    convert({ data: INPUT, type: "file" }, conversionOptions, (error, result) => {
      if (error) {
        reject(error)
        return
      }

      if (!result?.result || !Array.isArray(result.output)) {
        reject(new Error("OpenAPI to Postman conversion failed."))
        return
      }

      const collection = result.output.find((entry) => entry.type === "collection")?.data

      if (!collection) {
        reject(new Error("OpenAPI to Postman conversion did not return a collection."))
        return
      }

      resolve(collection)
    })
  })
}

function stripGeneratedFields(value) {
  if (Array.isArray(value)) {
    return value.map(stripGeneratedFields)
  }

  if (value && typeof value === "object") {
    const next = {}

    for (const [key, child] of Object.entries(value)) {
      if (key === "id" || key === "_postman_id") {
        continue
      }

      if (key === "body" || key === "raw") {
        next[key] = normalizeJsonString(child)
        continue
      }

      if (key === "value" && value.key === "Retry-After") {
        next[key] = "<integer>"
        continue
      }

      next[key] = stripGeneratedFields(child)
    }

    return next
  }

  return value
}

function normalizeJsonString(value) {
  if (typeof value !== "string") {
    return stripGeneratedFields(value)
  }

  const trimmed = value.trim()

  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) {
    return value
  }

  try {
    return JSON.stringify(stripPlaceholderProperties(JSON.parse(value)), null, 2)
  } catch {
    return value
  }
}

function stripPlaceholderProperties(value) {
  if (Array.isArray(value)) {
    return value.map(stripPlaceholderProperties)
  }

  if (value && typeof value === "object") {
    const next = {}

    for (const [key, child] of Object.entries(value)) {
      if (/^key_\d+$/.test(key)) {
        continue
      }

      next[key] = stripPlaceholderProperties(child)
    }

    return next
  }

  return value
}

const collection = stripGeneratedFields(await convertOpenApi())

await writeFile(OUTPUT, `${JSON.stringify(collection, null, 2)}\n`)
