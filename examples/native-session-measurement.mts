/** Offline observational tooling for SDK49. This module never authenticates or authorizes an action. */
export interface NativeSessionRequestMetadata {
  promptMode: "omitted" | "none" | "login" | "other";
  maxAgeRequested: boolean;
  passkeyRequested: boolean;
  providerHintPresent: boolean;
}

type UiObservation = "observed" | "not_observed" | "unknown";
export interface NativeSessionObservation extends NativeSessionRequestMetadata {
  schemaVersion: 1;
  environment: "synthetic" | "staging" | "production";
  platform: "ios" | "android";
  build: "development" | "standalone";
  scenario: "initial_login" | "warm_session" | "app_restart" | "browser_restart" | "issuer_session_expired";
  delivery: "browser_result" | "cold_start";
  cookiePreference: "platform_default" | "ephemeral_requested";
  browserOutcome: "success" | "cancel" | "dismiss" | "error";
  /** Reported by the host's backend after normal validation and comparison with its existing app identity. */
  backendOutcome: "same_subject" | "initial_subject" | "subject_mismatch" | "denied" | "validation_failed" | "not_attempted";
  browserUi: UiObservation;
  authenticationUi: UiObservation;
  consentUi: UiObservation;
  elapsed: "under_5s" | "5_to_30s" | "over_30s" | "unknown";
  /** Optional metadata from this trial's backend token response, never a guessed lifetime or token. */
  accessTokenExpiresInSeconds?: number;
  refreshTokenReturned?: boolean;
}

const enums = {
  environment: ["synthetic", "staging", "production"],
  platform: ["ios", "android"], build: ["development", "standalone"],
  scenario: ["initial_login", "warm_session", "app_restart", "browser_restart", "issuer_session_expired"],
  delivery: ["browser_result", "cold_start"],
  cookiePreference: ["platform_default", "ephemeral_requested"],
  promptMode: ["omitted", "none", "login", "other"],
  browserOutcome: ["success", "cancel", "dismiss", "error"],
  backendOutcome: ["same_subject", "initial_subject", "subject_mismatch", "denied", "validation_failed", "not_attempted"],
  browserUi: ["observed", "not_observed", "unknown"],
  authenticationUi: ["observed", "not_observed", "unknown"],
  consentUi: ["observed", "not_observed", "unknown"],
  elapsed: ["under_5s", "5_to_30s", "over_30s", "unknown"],
} as const;
const booleans = ["maxAgeRequested", "passkeyRequested", "providerHintPresent"] as const;
const keys = new Set(["schemaVersion", ...Object.keys(enums), ...booleans, "accessTokenExpiresInSeconds", "refreshTokenReturned"]);
const invalid = () => new Error("Invalid native session measurement; no raw input is included in this error.");

/** Extract only coarse request settings. This is NOT authorization-URL validation or issuer discovery. */
export function describeNativeSessionRequest(authorizationUrl: string): NativeSessionRequestMetadata {
  let url: URL;
  try { url = new URL(authorizationUrl); } catch { throw invalid(); }
  if (url.protocol !== "https:" || url.username || url.password || url.hash) throw invalid();
  for (const name of ["prompt", "max_age", "acr_values", "cubid_provider"]) {
    if (url.searchParams.getAll(name).length > 1) throw invalid();
  }
  const prompt = url.searchParams.get("prompt");
  return {
    promptMode: prompt === null ? "omitted" : prompt === "none" || prompt === "login" ? prompt : "other",
    maxAgeRequested: url.searchParams.has("max_age"),
    passkeyRequested: (url.searchParams.get("acr_values") ?? "").split(/\s+/).includes("urn:cubid:acr:passkey"),
    providerHintPresent: url.searchParams.has("cubid_provider"),
  };
}

/** Closed schema: reject arbitrary identifiers, tokens, callback URLs, notes and error descriptions. */
export function collectNativeSessionObservation(input: unknown): NativeSessionObservation {
  if (!input || typeof input !== "object" || Array.isArray(input) ||
      ![Object.prototype, null].includes(Object.getPrototypeOf(input))) throw invalid();
  const descriptors = Object.getOwnPropertyDescriptors(input);
  if (Reflect.ownKeys(descriptors).some((key) => typeof key !== "string" || !keys.has(key)) ||
      Object.values(descriptors).some((descriptor) => !Object.hasOwn(descriptor, "value"))) throw invalid();
  // Snapshot data properties once; accessors must never swap private values in after validation.
  const value = Object.fromEntries(Object.entries(descriptors).map(([key, descriptor]) => [key, descriptor.value])) as Record<string, unknown>;
  if (value.schemaVersion !== 1) throw invalid();
  for (const [key, options] of Object.entries(enums)) {
    if (typeof value[key] !== "string" || !(options as readonly string[]).includes(value[key] as string)) throw invalid();
  }
  for (const key of booleans) if (typeof value[key] !== "boolean") throw invalid();
  const accepted = value.backendOutcome === "same_subject" || value.backendOutcome === "initial_subject";
  if (value.browserOutcome !== "success" && value.backendOutcome !== "not_attempted") throw invalid();
  if (Object.hasOwn(value, "accessTokenExpiresInSeconds") &&
      (!accepted || !Number.isSafeInteger(value.accessTokenExpiresInSeconds) || (value.accessTokenExpiresInSeconds as number) < 0)) throw invalid();
  if (Object.hasOwn(value, "refreshTokenReturned") && (!accepted || typeof value.refreshTokenReturned !== "boolean")) throw invalid();
  // Copy only the validated schema; never spread a host response into exported evidence.
  return Object.fromEntries([...keys].filter((key) => Object.hasOwn(value, key)).map((key) => [key, value[key]])) as unknown as NativeSessionObservation;
}

export function classifyNativeSessionObservation(input: unknown): string {
  const row = collectNativeSessionObservation(input);
  if (row.browserOutcome === "cancel" || row.browserOutcome === "dismiss") return "cancelled";
  if (row.browserOutcome === "error") return "handoff_failed";
  if (row.backendOutcome === "not_attempted") return "completion_not_observed";
  if (row.backendOutcome === "subject_mismatch") return "identity_mismatch";
  if (row.backendOutcome === "validation_failed") return "validation_failed";
  if (row.backendOutcome === "denied") return "authorization_denied";
  if (row.backendOutcome === "initial_subject" || row.scenario === "initial_login") return "initial_sign_in";
  if (row.promptMode !== "omitted" || row.maxAgeRequested) return "control_or_diagnostic";
  const ui = [row.browserUi, row.authenticationUi, row.consentUi];
  if (ui.includes("observed")) return "same_subject_interaction_observed";
  if (ui.every((item) => item === "not_observed")) return "same_subject_no_interaction_observed";
  return "same_subject_observation_incomplete";
}

/** Counts are self-reported observations, not proof of hosted acceptance or a refresh-policy decision. */
export function summarizeNativeSessionMeasurements(input: unknown) {
  if (!Array.isArray(input) || input.length === 0 || input.length > 500) throw invalid();
  const rows = input.map((row) => {
    const observation = collectNativeSessionObservation(row);
    return { ...observation, classification: classifyNativeSessionObservation(observation) };
  });
  const groups: Record<string, Record<string, number>> = Object.create(null);
  for (const row of rows) {
    const key = [row.environment, row.platform, row.build, row.cookiePreference].join("/");
    const counts = groups[key] ?? (groups[key] = Object.create(null));
    counts[row.classification] = (counts[row.classification] ?? 0) + 1;
  }
  return {
    schemaVersion: 1, assessment: "observations_only", hostedAcceptance: "not_proven_by_this_report",
    totalRows: rows.length, syntheticRows: rows.filter((row) => row.environment === "synthetic").length,
    nonSyntheticRows: rows.filter((row) => row.environment !== "synthetic").length,
    groups, rows,
  };
}
