import { readdirSync, readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..")

const read = (path) => readFileSync(join(repoRoot, path), "utf8")

const coreSource = read("packages/core/src/index.ts")
const openApi = read("api/openapi.yaml")
const postman = read("api/postman_collection.json")

const referenceDir = join(repoRoot, "docs/reference/api")
const referenceArtifacts = readdirSync(referenceDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => [file, read(join("docs/reference/api", file))])

const operationIds = new Set(
  [...openApi.matchAll(/^\s+operationId:\s+([A-Za-z0-9_]+)/gm)].map(
    (match) => match[1]
  )
)

const documentedOperations = new Set([
  "checkPaytagAuthorization",
  "validatePaytagAliases",
  "getPaytagGrantStatus",
  "listPaytagLifecycleEvents",
  "startHostedPaytagAction",
])

const publicPaytagHelpers = new Map([
  ["checkPaytagAuthorization", "checkPaytagAuthorization"],
  ["validatePaytagAliases", "validatePaytagAliases"],
  ["getPaytagGrantStatus", "getPaytagGrantStatus"],
  ["listPaytagLifecycleEvents", "listPaytagLifecycleEvents"],
  ["startHostedPaytagAction", "startHostedPaytagAction"],
  ["startPaytagEnableAction", "startHostedPaytagAction"],
  ["startPaytagRawExposureAction", "startHostedPaytagAction"],
  ["startPaytagAliasCreateAction", "startHostedPaytagAction"],
  ["startPaytagAliasSelectAction", "startHostedPaytagAction"],
  ["startPaytagGrantAction", "startHostedPaytagAction"],
  ["startPaytagRevokeAction", "startHostedPaytagAction"],
])

const failures = []

for (const operationId of documentedOperations) {
  if (!operationIds.has(operationId)) {
    failures.push(`OpenAPI is missing Paytag operationId ${operationId}.`)
  }
}

for (const operationId of operationIds) {
  if (operationId.includes("Paytag") && !documentedOperations.has(operationId)) {
    failures.push(`OpenAPI has unexpected Paytag operationId ${operationId}.`)
  }
}

for (const [helper, operationId] of publicPaytagHelpers) {
  if (!coreSource.includes(`${helper}(`)) {
    failures.push(`@cubid/core is missing expected public helper ${helper}.`)
  }
  if (!documentedOperations.has(operationId)) {
    failures.push(
      `Public helper ${helper} maps to undocumented operation ${operationId}.`
    )
  }
}

const legacyPublicNames = [
  "checkPayToEligibility",
  "resolvePayToAliases",
  "startPayToAction",
  "openPayToHostedAction",
  "sendPaymentIntentCreatedNotification",
]

const generatedArtifacts = [
  ["api/postman_collection.json", postman],
  ...referenceArtifacts.map(([file, content]) => [
    `docs/reference/api/${file}`,
    content,
  ]),
]

for (const [path, content] of generatedArtifacts) {
  for (const legacyName of legacyPublicNames) {
    if (content.includes(legacyName)) {
      failures.push(`${path} contains removed public helper ${legacyName}.`)
    }
  }
}

const forbiddenOpenApiFieldPatterns = [
  /^\s+(wallet_routes?|wallet_route_graph):/gim,
  /^\s+(route_priority|route_preference|route_count|pay_to_dapp_priority):/gim,
  /^\s+(provider_callback|provider_payload|provider_subject):/gim,
  /^\s+(payment_instruction|payment_instructions|payment_intent):/gim,
  /^\s+(settlement|settlement_status):/gim,
  /^\s+(solver|bridge|swap|execution|execution_adapter):/gim,
]

for (const pattern of forbiddenOpenApiFieldPatterns) {
  const match = pattern.exec(openApi)
  if (match) {
    failures.push(
      `OpenAPI appears to document forbidden Paytag-owned field ${match[1]}.`
    )
  }
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"))
  process.exit(1)
}

console.log("Paytag SDK/OpenAPI surface guardrail passed.")
