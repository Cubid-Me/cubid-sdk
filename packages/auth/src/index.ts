export const CUBID_PRODUCTION_ISSUER = "https://id.cubid.me";
export const CUBID_STAGING_ISSUER = "https://staging-id.cubid.me";
export const CUBID_DEFAULT_OIDC_SCOPES = ["openid", "email", "profile"] as const;
export const CUBID_PASSKEY_ACR_VALUE = "urn:cubid:acr:passkey";
export const CUBID_AUTH_SESSION_STORAGE_KEY = "cubid.auth.session";
export const CUBID_FRIENDR_OIDC_CLAIM_NAMES = [
  "self_account_type_claim_v1",
  "cubid_kyc_presence_v1",
  "friendr_unique_human_confidence",
] as const;

/** Hosted UI preferences only; they never establish authentication assurance. */
export const CUBID_AUTH_PROVIDERS = ["google", "github", "apple", "passkey"] as const;
export type CubidAuthProviderHint = (typeof CUBID_AUTH_PROVIDERS)[number];

/** A scoped Web Crypto adapter. Implementations must use secure native primitives. */
export type CubidAuthCrypto = Pick<Crypto, "getRandomValues"> & {
  subtle: Pick<SubtleCrypto, "digest" | "importKey" | "verify">;
};

const DISCOVERY_PATH = "/.well-known/openid-configuration";
function encodeUtf8(value: string): Uint8Array {
  if (typeof globalThis.TextEncoder === "function") return new TextEncoder().encode(value);
  const encoded = encodeURIComponent(value);
  const bytes: number[] = [];
  for (let index = 0; index < encoded.length; index += 1) {
    if (encoded[index] === "%") {
      bytes.push(Number.parseInt(encoded.slice(index + 1, index + 3), 16));
      index += 2;
    } else bytes.push(encoded.charCodeAt(index));
  }
  return new Uint8Array(bytes);
}

function decodeUtf8(bytes: Uint8Array): string {
  if (typeof globalThis.TextDecoder === "function") return new TextDecoder().decode(bytes);
  return decodeURIComponent(Array.from(bytes, (byte) => `%${byte.toString(16).padStart(2, "0")}`).join(""));
}

export type CubidAuthFetch = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

export type CubidAuthErrorCategory =
  | "config"
  | "network"
  | "parse"
  | "protocol"
  | "validation";

export class CubidAuthError extends Error {
  readonly category: CubidAuthErrorCategory;
  readonly code: string | null;
  readonly status: number | null;
  readonly raw: unknown;

  constructor(
    message: string,
    options: {
      category: CubidAuthErrorCategory;
      code?: string | null;
      cause?: unknown;
      raw?: unknown;
      status?: number | null;
    }
  ) {
    super(message, { cause: options.cause });
    this.name = "CubidAuthError";
    this.category = options.category;
    this.code = options.code ?? null;
    this.status = options.status ?? null;
    this.raw = options.raw ?? null;
  }
}

export interface CubidOidcDiscoveryDocument {
  /** Selection syntax version, not proof that any provider is enabled. */
  cubid_federation_contract_version?: string;
  cubid_provider_hint_parameter?: string;
  cubid_provider_hint_values_supported?: string[];
  authorization_endpoint: string;
  code_challenge_methods_supported?: string[];
  end_session_endpoint?: string;
  issuer: string;
  jwks_uri?: string;
  response_types_supported?: string[];
  scopes_supported?: string[];
  subject_types_supported?: string[];
  token_endpoint: string;
  token_endpoint_auth_methods_supported?: string[];
  userinfo_endpoint?: string;
  [key: string]: unknown;
}

export interface CubidJwksDocument {
  keys: CubidJsonWebKey[];
}

export interface CubidJsonWebKey extends JsonWebKey {
  alg?: string;
  kid?: string;
  kty?: string;
  use?: string;
}

export interface FetchCubidOidcDiscoveryDocumentInput {
  fetch?: CubidAuthFetch;
  issuer: string | URL;
  signal?: AbortSignal;
}

export type CubidIdentityIssuerEnvironment = "production" | "staging";

export interface CheckCubidIdentityIssuerReadinessInput {
  environment?: CubidIdentityIssuerEnvironment;
  fetch?: CubidAuthFetch;
  issuer?: string | URL;
  signal?: AbortSignal;
}

export interface CubidIdentityIssuerReadinessReport {
  authorizationEndpoint: string;
  environment: CubidIdentityIssuerEnvironment;
  expectedIssuer: string;
  issuer: string;
  jwksKeyCount: number;
  jwksUri: string;
  supportsAuthorizationCode: boolean;
  supportsPairwiseSubjects: boolean;
  supportsPkceS256: boolean;
  tokenEndpoint: string;
  userInfoEndpoint: string | null;
}

export interface CubidPkcePair {
  codeChallenge: string;
  codeChallengeMethod: "S256";
  codeVerifier: string;
}

export interface CreateCubidPkcePairOptions {
  crypto?: CubidAuthCrypto;
  verifierByteLength?: number;
}

export interface BuildCubidAuthorizationUrlInput {
  acrValues?: readonly string[] | string;
  authorizationEndpoint: string | URL;
  clientId: string;
  codeChallenge: string;
  codeChallengeMethod?: "S256";
  extraParams?: Record<string, boolean | number | string | undefined>;
  loginHint?: string;
  maxAge?: number;
  nonce?: string;
  prompt?: string;
  /** Prefer a Cubid-hosted choice without bypassing consent or required assurance. */
  provider?: CubidAuthProviderHint;
  redirectUri: string;
  requirePasskey?: boolean;
  scope?: readonly string[] | string;
  state: string;
}

export interface CubidAuthorizationSuccess {
  code: string;
  iss: string | null;
  kind: "success";
  raw: Record<string, string[]>;
  sessionState: string | null;
  state: string;
}

export interface CubidAuthorizationFailure {
  error: string;
  errorDescription: string | null;
  errorUri: string | null;
  kind: "error";
  raw: Record<string, string[]>;
  state: string | null;
}

export type CubidAuthorizationCallbackResult =
  | CubidAuthorizationFailure
  | CubidAuthorizationSuccess;

export interface BuildCubidTokenExchangeRequestInput {
  clientId: string;
  code: string;
  codeVerifier: string;
  extraParams?: Record<string, boolean | number | string | undefined>;
  redirectUri: string;
  signal?: AbortSignal;
  tokenEndpoint: string | URL;
}

export interface CubidPreparedRequest {
  body: string | null;
  init: RequestInit;
  url: string;
}

export interface ExchangeCubidAuthorizationCodeInput
  extends BuildCubidTokenExchangeRequestInput {
  fetch?: CubidAuthFetch;
}

export interface CubidTokenResponse {
  accessToken: string;
  expiresAt: number | null;
  expiresIn: number | null;
  idToken: string | null;
  issuedAt: number;
  raw: Record<string, unknown>;
  refreshToken: string | null;
  scope: string[];
  tokenType: string;
}

export interface BuildCubidUserInfoRequestInput {
  accessToken: string;
  signal?: AbortSignal;
  userInfoEndpoint: string | URL;
}

export interface FetchCubidUserInfoInput
  extends BuildCubidUserInfoRequestInput {
  fetch?: CubidAuthFetch;
}

export interface CubidUserInfo {
  email?: string;
  /** @deprecated Cubid verified-email profile omits this boolean. Older/other OIDC issuers may include it. */
  email_verified?: boolean;
  cubid_kyc_presence_v1?: boolean;
  friendr_unique_human_confidence?: Record<string, unknown>;
  name?: string;
  preferred_username?: string;
  self_account_type_claim_v1?: "human" | "agent" | "organization" | string;
  sub: string;
  [key: string]: unknown;
}

export type CubidFriendrOidcClaimName =
  (typeof CUBID_FRIENDR_OIDC_CLAIM_NAMES)[number];

export interface CubidFriendrOidcClaimSummary {
  canonicalName: string;
  claimName: CubidFriendrOidcClaimName;
  idTokenEligible: false;
  redirectParameterEligible: false;
  scope: "cubid:profile" | "cubid:stamps";
  userInfoEligible: true;
}

export interface CubidIdTokenClaims extends Record<string, unknown> {
  auth_time?: number;
  acr?: string;
  amr?: string[];
  aud?: string | string[];
  email?: string;
  /** @deprecated Cubid verified-email profile omits this boolean. Older/other OIDC issuers may include it. */
  email_verified?: boolean;
  exp?: number;
  iat?: number;
  iss?: string;
  name?: string;
  nonce?: string;
  preferred_username?: string;
  sub?: string;
}

export interface ValidateCubidIdTokenInput {
  /** Bind the ID token to the nonce stored for this authorization transaction. */
  expectedNonce?: string;
  crypto?: CubidAuthCrypto;
  clientId: string;
  discoveryDocument: CubidOidcDiscoveryDocument;
  fetch?: CubidAuthFetch;
  idToken: string;
  nowSeconds?: number;
}

export interface BuildCubidLogoutUrlInput {
  endSessionEndpoint: string | URL;
  extraParams?: Record<string, boolean | number | string | undefined>;
  idTokenHint?: string;
  postLogoutRedirectUri?: string;
  state?: string;
}

export interface CreateCubidAuthSessionInput {
  clientId: string;
  idTokenClaims?: CubidIdTokenClaims | null;
  issuer: string;
  tokenResponse: CubidTokenResponse;
  userInfo?: CubidUserInfo | null;
}

export interface CubidAuthSession {
  accessToken: string;
  clientId: string;
  expiresAt: number | null;
  idToken: string | null;
  idTokenClaims: CubidIdTokenClaims | null;
  issuedAt: number;
  issuer: string;
  refreshToken: string | null;
  scope: string[];
  subject: string | null;
  tokenType: string;
  userInfo: CubidUserInfo | null;
}

export type CubidAuthAssuranceInput =
  | CubidAuthSession
  | CubidIdTokenClaims
  | string
  | null
  | undefined;

export interface CubidAuthAssurance {
  acr: string | null;
  amr: string[];
  hasPasskeyAssurance: boolean;
}

export interface CubidAuthStorageLike {
  getItem(key: string): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
}

function assertNonEmptyString(value: string, fieldName: string): string {
  if (value.trim().length === 0) {
    throw new CubidAuthError(`Cubid auth requires ${fieldName}.`, {
      category: "validation",
      code: "missing_field",
    });
  }

  return value;
}

function asUrlString(input: string | URL, fieldName: string): string {
  const raw = input instanceof URL ? input.toString() : input;

  if (typeof raw !== "string") {
    throw new CubidAuthError(`Cubid auth requires ${fieldName}.`, {
      category: "validation",
      code: "missing_field",
    });
  }

  const trimmed = assertNonEmptyString(raw, fieldName);

  try {
    return new URL(trimmed).toString();
  } catch (cause) {
    throw new CubidAuthError(`Cubid auth requires a valid ${fieldName}.`, {
      category: "validation",
      code: "invalid_url",
      cause,
    });
  }
}

function assertByteLength(value: number, fieldName: string): number {
  if (!Number.isInteger(value) || value < 16 || value > 96) {
    throw new CubidAuthError(
      `Cubid auth requires ${fieldName} to be an integer between 16 and 96.`,
      {
        category: "validation",
        code: "invalid_length",
      }
    );
  }

  return value;
}

function toRecord(value: unknown, context: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new CubidAuthError(`Cubid auth expected ${context} to be a JSON object.`, {
      category: "parse",
      code: "invalid_json",
      raw: value,
    });
  }

  return value as Record<string, unknown>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function getRequiredString(
  record: Record<string, unknown>,
  fieldName: string,
  context: string
): string {
  const value = record[fieldName];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new CubidAuthError(`Cubid auth expected ${context}.${fieldName} to be a non-empty string.`, {
      category: "parse",
      code: "invalid_field",
      raw: record,
    });
  }

  return value;
}

function getOptionalString(
  record: Record<string, unknown>,
  fieldName: string
): string | null {
  const value = record[fieldName];
  return typeof value === "string" && value.length > 0 ? value : null;
}

function getOptionalStringArray(
  record: Record<string, unknown>,
  fieldName: string
): string[] | undefined {
  const value = record[fieldName];

  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new CubidAuthError(`Cubid auth expected ${fieldName} to be a string array.`, {
      category: "parse",
      code: "invalid_field",
      raw: record,
    });
  }

  return value;
}

function getOptionalNumber(
  record: Record<string, unknown>,
  fieldName: string,
  context: string
): number | null {
  const value = record[fieldName];

  if (typeof value === "undefined" || value === null) {
    return null;
  }

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new CubidAuthError(`Cubid auth expected ${context}.${fieldName} to be finite.`, {
      category: "parse",
      code: "invalid_field",
      raw: record,
    });
  }

  return value;
}

function getOptionalRecord(
  record: Record<string, unknown>,
  fieldName: string,
  context: string
): Record<string, unknown> | null {
  const value = record[fieldName];

  if (typeof value === "undefined" || value === null) {
    return null;
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    throw new CubidAuthError(`Cubid auth expected ${context}.${fieldName} to be an object.`, {
      category: "parse",
      code: "invalid_field",
      raw: record,
    });
  }

  return value as Record<string, unknown>;
}

function normalizeAmr(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((entry): entry is string => typeof entry === "string");
}

function resolveAssuranceClaims(
  input: CubidAuthAssuranceInput
): CubidIdTokenClaims | null {
  if (!input) {
    return null;
  }

  if (typeof input === "string") {
    return decodeCubidIdTokenClaims(input);
  }

  const record = input as Record<string, unknown>;

  if (isRecord(record.idTokenClaims)) {
    return record.idTokenClaims as CubidIdTokenClaims;
  }

  if (typeof record.idToken === "string") {
    return decodeCubidIdTokenClaims(record.idToken);
  }

  return input as CubidIdTokenClaims;
}

function getFetch(fetchImpl?: CubidAuthFetch): CubidAuthFetch {
  if (fetchImpl) {
    return fetchImpl;
  }

  if (typeof globalThis.fetch !== "function") {
    throw new CubidAuthError("Cubid auth requires fetch to be provided in this runtime.", {
      category: "config",
      code: "missing_fetch",
    });
  }

  return globalThis.fetch.bind(globalThis);
}

function getCrypto(provider?: CubidAuthCrypto): CubidAuthCrypto {
  const crypto = provider ?? globalThis.crypto;
  if (!crypto?.subtle || typeof crypto.getRandomValues !== "function") {
    throw new CubidAuthError("Cubid auth requires Web Crypto support in this runtime.", {
      category: "config",
      code: "missing_crypto",
    });
  }

  return crypto;
}

function encodeBinaryToBase64(binary: string): string {
  if (typeof globalThis.btoa === "function") {
    return globalThis.btoa(binary);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(binary, "binary").toString("base64");
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let encoded = "";
  for (let index = 0; index < binary.length; index += 3) {
    const first = binary.charCodeAt(index);
    const second = binary.charCodeAt(index + 1);
    const third = binary.charCodeAt(index + 2);
    encoded += alphabet[first >> 2];
    encoded += alphabet[((first & 3) << 4) | ((second || 0) >> 4)];
    encoded += index + 1 < binary.length ? alphabet[((second & 15) << 2) | ((third || 0) >> 6)] : "=";
    encoded += index + 2 < binary.length ? alphabet[third & 63] : "=";
  }
  return encoded;
}

function decodeBase64ToBinary(base64: string): string {
  if (typeof globalThis.atob === "function") {
    return globalThis.atob(base64);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64").toString("binary");
  }

  if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(base64)) {
    throw new CubidAuthError("Cubid auth received invalid base64 data.", {
      category: "parse", code: "invalid_base64",
    });
  }
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let binary = "";
  for (let index = 0; index < base64.length; index += 4) {
    const a = alphabet.indexOf(base64[index]!);
    const b = alphabet.indexOf(base64[index + 1]!);
    const c = alphabet.indexOf(base64[index + 2]!);
    const d = alphabet.indexOf(base64[index + 3]!);
    binary += String.fromCharCode((a << 2) | (b >> 4));
    if (c >= 0) binary += String.fromCharCode(((b & 15) << 4) | (c >> 2));
    if (d >= 0) binary += String.fromCharCode(((c & 3) << 6) | d);
  }
  return binary;
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";

  for (const value of bytes) {
    binary += String.fromCharCode(value);
  }

  return encodeBinaryToBase64(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/u, "");
}

function base64UrlToBytes(input: string): Uint8Array {
  const normalized = input.replaceAll("-", "+").replaceAll("_", "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const binary = decodeBase64ToBinary(`${normalized}${padding}`);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function decodeBase64UrlJson(input: string, context: string): Record<string, unknown> {
  try {
    const decoded = decodeUtf8(base64UrlToBytes(input));
    return toRecord(JSON.parse(decoded), context);
  } catch (cause) {
    if (cause instanceof CubidAuthError) {
      throw cause;
    }

    throw new CubidAuthError(`Cubid auth could not decode ${context}.`, {
      category: "parse",
      code: "invalid_jwt",
      cause,
    });
  }
}

function decodeCompactJwt(idToken: string) {
  const token = assertNonEmptyString(idToken, "idToken");
  const segments = token.split(".");

  if (segments.length !== 3 || segments.some((segment) => segment.length === 0)) {
    throw new CubidAuthError("Cubid auth expected an ID token with three JWT segments.", {
      category: "parse",
      code: "invalid_id_token",
    });
  }

  const [encodedHeader, encodedPayload, encodedSignature] = segments as [string, string, string];

  return {
    encodedHeader,
    encodedPayload,
    encodedSignature,
    header: decodeBase64UrlJson(encodedHeader, "id token header"),
    payload: decodeBase64UrlJson(encodedPayload, "id token claims") as CubidIdTokenClaims,
    signedData: encodeUtf8(`${encodedHeader}.${encodedPayload}`),
  };
}

function createRandomString(byteLength: number, provider?: CubidAuthCrypto): string {
  const crypto = getCrypto(provider);
  const bytes = new Uint8Array(assertByteLength(byteLength, "byteLength"));
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}

function toQueryRecord(params: URLSearchParams): Record<string, string[]> {
  const record: Record<string, string[]> = {};

  for (const [key, value] of params.entries()) {
    if (!record[key]) {
      record[key] = [];
    }

    record[key].push(value);
  }

  return record;
}

function normalizeScopes(scope?: readonly string[] | string): string[] {
  if (!scope) {
    return [...CUBID_DEFAULT_OIDC_SCOPES];
  }

  const values =
    typeof scope === "string"
      ? scope
          .split(/\s+/u)
          .map((value: string) => value.trim())
          .filter(Boolean)
      : [...scope];

  if (values.length === 0) {
    throw new CubidAuthError("Cubid auth requires at least one scope value.", {
      category: "validation",
      code: "invalid_scope",
    });
  }

  return values;
}

function normalizeAcrValues(acrValues?: readonly string[] | string): string[] {
  if (!acrValues) {
    return [];
  }

  const values =
    typeof acrValues === "string"
      ? acrValues.split(/\s+/u)
      : [...acrValues];
  const normalized = values
    .map((value) => value.trim())
    .filter((value) => value.length > 0);

  if (normalized.length === 0) {
    throw new CubidAuthError("Cubid auth requires at least one ACR value.", {
      category: "validation",
      code: "invalid_acr_values",
    });
  }

  return [...new Set(normalized)];
}

const FRIENDR_OIDC_CLAIMS = {
  self_account_type_claim_v1: {
    canonicalName: "cubid_actor_type",
    claimName: "self_account_type_claim_v1",
    idTokenEligible: false,
    redirectParameterEligible: false,
    scope: "cubid:profile",
    userInfoEligible: true,
  },
  cubid_kyc_presence_v1: {
    canonicalName: "cubid_kyc_presence_v1",
    claimName: "cubid_kyc_presence_v1",
    idTokenEligible: false,
    redirectParameterEligible: false,
    scope: "cubid:profile",
    userInfoEligible: true,
  },
  friendr_unique_human_confidence: {
    canonicalName: "friendr_unique_human_confidence",
    claimName: "friendr_unique_human_confidence",
    idTokenEligible: false,
    redirectParameterEligible: false,
    scope: "cubid:stamps",
    userInfoEligible: true,
  },
} as const satisfies Record<CubidFriendrOidcClaimName, CubidFriendrOidcClaimSummary>;

export function isCubidFriendrOidcClaimName(
  claimName: string
): claimName is CubidFriendrOidcClaimName {
  return CUBID_FRIENDR_OIDC_CLAIM_NAMES.includes(
    claimName as CubidFriendrOidcClaimName
  );
}

export function getCubidFriendrOidcClaim(
  claimName: string
): CubidFriendrOidcClaimSummary | null {
  return isCubidFriendrOidcClaimName(claimName)
    ? { ...FRIENDR_OIDC_CLAIMS[claimName] }
    : null;
}

export function isCubidFriendrIdTokenClaim(claimName: string): boolean {
  return getCubidFriendrOidcClaim(claimName)?.idTokenEligible ?? false;
}

export function isCubidFriendrRedirectParameter(claimName: string): boolean {
  return getCubidFriendrOidcClaim(claimName)?.redirectParameterEligible ?? false;
}

function appendExtraParams(
  params: URLSearchParams,
  extraParams?: Record<string, boolean | number | string | undefined>
) {
  if (!extraParams) {
    return;
  }

  for (const [key, value] of Object.entries(extraParams)) {
    if (value === undefined) {
      continue;
    }

    params.set(key, String(value));
  }
}

function normalizeIssuer(input: string | URL): string {
  const issuerUrl = new URL(asUrlString(input, "issuer"));
  const isDiscoveryUrl = issuerUrl.pathname.endsWith(DISCOVERY_PATH);

  if (isDiscoveryUrl) {
    issuerUrl.pathname = issuerUrl.pathname.slice(0, -DISCOVERY_PATH.length) || "/";
    issuerUrl.search = "";
  }

  return issuerUrl.toString().replace(/\/+$/u, "");
}

function resolveDiscoveryUrl(input: string | URL): string {
  const raw = new URL(asUrlString(input, "issuer"));

  if (raw.pathname.endsWith(DISCOVERY_PATH)) {
    raw.search = "";
    return raw.toString();
  }

  return new URL(DISCOVERY_PATH, `${normalizeIssuer(input)}/`).toString();
}

function resolveIdentityIssuerEnvironment(environment?: string): CubidIdentityIssuerEnvironment {
  if (typeof environment === "undefined") {
    return "production";
  }

  if (environment === "production" || environment === "staging") {
    return environment;
  }

  throw new CubidAuthError("Cubid identity readiness received an unknown environment.", {
    category: "validation",
    code: "invalid_environment",
    raw: {
      environment,
      supportedEnvironments: ["production", "staging"],
    },
  });
}

function getExpectedIdentityIssuer(
  environment: CubidIdentityIssuerEnvironment
): string {
  return environment === "production"
    ? CUBID_PRODUCTION_ISSUER
    : CUBID_STAGING_ISSUER;
}

function normalizeTokenResponse(payload: Record<string, unknown>): CubidTokenResponse {
  const accessToken = getRequiredString(payload, "access_token", "token response");
  const tokenType = getRequiredString(payload, "token_type", "token response");
  const expiresRaw = payload.expires_in;
  const expiresIn =
    typeof expiresRaw === "number"
      ? expiresRaw
      : typeof expiresRaw === "string" && expiresRaw.trim().length > 0
        ? Number(expiresRaw)
        : null;

  if (expiresIn !== null && !Number.isFinite(expiresIn)) {
    throw new CubidAuthError("Cubid auth expected token response.expires_in to be numeric.", {
      category: "parse",
      code: "invalid_field",
      raw: payload,
    });
  }

  const issuedAt = Date.now();
  const expiresAt = expiresIn === null ? null : issuedAt + expiresIn * 1000;
  const scope = normalizeScopes(getOptionalString(payload, "scope") ?? undefined);

  return {
    accessToken,
    expiresAt,
    expiresIn,
    idToken: getOptionalString(payload, "id_token"),
    issuedAt,
    raw: payload,
    refreshToken: getOptionalString(payload, "refresh_token"),
    scope,
    tokenType,
  };
}

async function readJsonResponse(response: Response, context: string): Promise<Record<string, unknown>> {
  let payload: unknown;

  try {
    payload = await response.json();
  } catch (cause) {
    throw new CubidAuthError(`Cubid auth could not parse ${context} JSON.`, {
      category: "parse",
      code: "invalid_json",
      cause,
      status: response.status,
    });
  }

  return toRecord(payload, context);
}

async function fetchCubidJwks(
  jwksUri: string | URL,
  fetchImpl?: CubidAuthFetch
): Promise<CubidJwksDocument> {
  const fetcher = getFetch(fetchImpl);
  let response: Response;

  try {
    response = await fetcher(asUrlString(jwksUri, "jwksUri"), {
      headers: {
        accept: "application/json",
      },
      method: "GET",
    });
  } catch (cause) {
    throw new CubidAuthError("Cubid auth could not fetch OIDC signing keys.", {
      category: "network",
      code: "jwks_fetch_failed",
      cause,
    });
  }

  const payload = await readJsonResponse(response, "JWKS document");

  if (!response.ok) {
    throw new CubidAuthError("Cubid auth JWKS request failed.", {
      category: "protocol",
      code: "jwks_request_failed",
      raw: payload,
      status: response.status,
    });
  }

  if (!Array.isArray(payload.keys)) {
    throw new CubidAuthError("Cubid auth expected JWKS document.keys to be an array.", {
      category: "parse",
      code: "invalid_jwks",
      raw: payload,
    });
  }

  return {
    keys: payload.keys.filter((key): key is CubidJsonWebKey => {
      return Boolean(key) && typeof key === "object" && !Array.isArray(key);
    }),
  };
}

interface CubidIdTokenCryptoAlgorithm {
  importAlgorithm: EcKeyImportParams | RsaHashedImportParams;
  verifyAlgorithm: AlgorithmIdentifier | EcdsaParams;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function resolveIdTokenCryptoAlgorithm(alg: string): CubidIdTokenCryptoAlgorithm | null {
  if (alg === "RS256") {
    return {
      importAlgorithm: {
        hash: "SHA-256",
        name: "RSASSA-PKCS1-v1_5",
      },
      verifyAlgorithm: "RSASSA-PKCS1-v1_5",
    };
  }

  if (alg === "ES256") {
    return {
      importAlgorithm: {
        name: "ECDSA",
        namedCurve: "P-256",
      },
      verifyAlgorithm: {
        hash: "SHA-256",
        name: "ECDSA",
      },
    };
  }

  return null;
}

function findJwksKey(
  keys: CubidJsonWebKey[],
  header: Record<string, unknown>
): CubidJsonWebKey | null {
  const alg = typeof header.alg === "string" ? header.alg : null;
  const kid = typeof header.kid === "string" ? header.kid : null;

  return keys.find((key) => {
    if (key.use && key.use !== "sig") {
      return false;
    }

    if (alg && key.alg && key.alg !== alg) {
      return false;
    }

    if (kid && key.kid && key.kid !== kid) {
      return false;
    }

    if (kid && !key.kid) {
      return false;
    }

    return true;
  }) ?? null;
}

function isUsableJwksSigningKey(key: CubidJsonWebKey): boolean {
  if (key.use && key.use !== "sig") {
    return false;
  }

  if (Array.isArray(key.key_ops) && !key.key_ops.includes("verify")) {
    return false;
  }

  if (key.alg && !resolveIdTokenCryptoAlgorithm(key.alg)) {
    return false;
  }

  if (key.kty === "RSA") {
    return !key.alg || key.alg === "RS256";
  }

  if (key.kty === "EC") {
    return (!key.alg || key.alg === "ES256") && (!key.crv || key.crv === "P-256");
  }

  return false;
}

function assertIdTokenClaims(
  claims: CubidIdTokenClaims,
  input: ValidateCubidIdTokenInput
): void {
  const nowSeconds = input.nowSeconds ?? Math.floor(Date.now() / 1000);
  const expectedIssuer = normalizeIssuer(input.discoveryDocument.issuer);

  if (typeof claims.iss !== "string" || normalizeIssuer(claims.iss) !== expectedIssuer) {
    throw new CubidAuthError("The Cubid ID token issuer did not match discovery metadata.", {
      category: "validation",
      code: "invalid_issuer",
      raw: claims,
    });
  }

  if (typeof claims.sub !== "string" || claims.sub.trim().length === 0) {
    throw new CubidAuthError("The Cubid ID token subject was missing or invalid.", {
      category: "validation", code: "invalid_subject",
    });
  }
  if (typeof input.expectedNonce !== "undefined") {
    if (typeof claims.nonce !== "string") {
      throw new CubidAuthError("The Cubid ID token nonce was missing.", {
        category: "validation", code: "missing_nonce",
      });
    }
    if (claims.nonce !== assertNonEmptyString(input.expectedNonce, "expectedNonce")) {
      throw new CubidAuthError("The Cubid ID token nonce did not match the authorization transaction.", {
        category: "validation", code: "invalid_nonce",
      });
    }
  }

  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];

  if (!audience.includes(input.clientId)) {
    throw new CubidAuthError("The Cubid ID token audience did not include the client ID.", {
      category: "validation",
      code: "invalid_audience",
      raw: claims,
    });
  }

  if (typeof claims.exp !== "number" || !Number.isFinite(claims.exp)) {
    throw new CubidAuthError("The Cubid ID token expiration claim was missing or invalid.", {
      category: "validation",
      code: "invalid_expiration",
      raw: claims,
    });
  }

  if (claims.exp <= nowSeconds) {
    throw new CubidAuthError("The Cubid ID token has expired.", {
      category: "validation",
      code: "expired_id_token",
      raw: claims,
    });
  }

  if (typeof claims.iat !== "undefined" && !Number.isFinite(claims.iat)) {
    throw new CubidAuthError("The Cubid ID token issued-at claim was invalid.", {
      category: "validation",
      code: "invalid_issued_at",
      raw: claims,
    });
  }
}

export function createCubidPkceCodeVerifier(byteLength = 64, crypto?: CubidAuthCrypto): string {
  return createRandomString(byteLength, crypto);
}

export async function createCubidPkceCodeChallenge(codeVerifier: string, crypto?: CubidAuthCrypto): Promise<string> {
  const verifier = assertNonEmptyString(codeVerifier, "codeVerifier");
  const digest = await getCrypto(crypto).subtle.digest("SHA-256", toArrayBuffer(encodeUtf8(verifier)));
  return bytesToBase64Url(new Uint8Array(digest));
}

export async function createCubidPkcePair(
  options: CreateCubidPkcePairOptions = {}
): Promise<CubidPkcePair> {
  const codeVerifier = createCubidPkceCodeVerifier(options.verifierByteLength ?? 64, options.crypto);

  return {
    codeChallenge: await createCubidPkceCodeChallenge(codeVerifier, options.crypto),
    codeChallengeMethod: "S256",
    codeVerifier,
  };
}

export function createCubidAuthState(byteLength = 32, crypto?: CubidAuthCrypto): string {
  return createRandomString(byteLength, crypto);
}

export function createCubidAuthNonce(byteLength = 32, crypto?: CubidAuthCrypto): string {
  return createRandomString(byteLength, crypto);
}

export async function fetchCubidOidcDiscoveryDocument(
  input: FetchCubidOidcDiscoveryDocumentInput
): Promise<CubidOidcDiscoveryDocument> {
  const fetchImpl = getFetch(input.fetch);
  const discoveryUrl = resolveDiscoveryUrl(input.issuer);
  let response: Response;

  try {
    response = await fetchImpl(discoveryUrl, {
      headers: {
        accept: "application/json",
      },
      method: "GET",
      signal: input.signal,
    });
  } catch (cause) {
    throw new CubidAuthError("Cubid auth could not fetch OIDC discovery metadata.", {
      category: "network",
      code: "discovery_fetch_failed",
      cause,
    });
  }

  const payload = await readJsonResponse(response, "discovery document");

  if (!response.ok) {
    throw new CubidAuthError("Cubid auth discovery request failed.", {
      category: "protocol",
      code: "discovery_request_failed",
      raw: payload,
      status: response.status,
    });
  }

  return {
    ...payload,
    cubid_federation_contract_version: getOptionalString(payload, "cubid_federation_contract_version") ?? undefined,
    cubid_provider_hint_parameter: getOptionalString(payload, "cubid_provider_hint_parameter") ?? undefined,
    cubid_provider_hint_values_supported: getOptionalStringArray(payload, "cubid_provider_hint_values_supported"),
    authorization_endpoint: getRequiredString(payload, "authorization_endpoint", "discovery document"),
    code_challenge_methods_supported: getOptionalStringArray(
      payload,
      "code_challenge_methods_supported"
    ),
    end_session_endpoint: getOptionalString(payload, "end_session_endpoint") ?? undefined,
    issuer: getRequiredString(payload, "issuer", "discovery document"),
    jwks_uri: getOptionalString(payload, "jwks_uri") ?? undefined,
    response_types_supported: getOptionalStringArray(payload, "response_types_supported"),
    scopes_supported: getOptionalStringArray(payload, "scopes_supported"),
    subject_types_supported: getOptionalStringArray(payload, "subject_types_supported"),
    token_endpoint: getRequiredString(payload, "token_endpoint", "discovery document"),
    token_endpoint_auth_methods_supported: getOptionalStringArray(
      payload,
      "token_endpoint_auth_methods_supported"
    ),
    userinfo_endpoint: getOptionalString(payload, "userinfo_endpoint") ?? undefined,
  };
}

export async function checkCubidIdentityIssuerReadiness(
  input: CheckCubidIdentityIssuerReadinessInput = {}
): Promise<CubidIdentityIssuerReadinessReport> {
  const environment = resolveIdentityIssuerEnvironment(input.environment);
  const expectedIssuer = getExpectedIdentityIssuer(environment);
  const requestedIssuer = input.issuer ?? expectedIssuer;

  if (normalizeIssuer(requestedIssuer) !== expectedIssuer) {
    throw new CubidAuthError(
      "Cubid identity readiness requires an explicit issuer for the selected environment.",
      {
        category: "validation",
        code: "issuer_environment_mismatch",
        raw: {
          environment,
          expectedIssuer,
          issuer: normalizeIssuer(requestedIssuer),
        },
      }
    );
  }

  const discovery = await fetchCubidOidcDiscoveryDocument({
    fetch: input.fetch,
    issuer: requestedIssuer,
    signal: input.signal,
  });

  if (normalizeIssuer(discovery.issuer) !== expectedIssuer) {
    throw new CubidAuthError(
      "Cubid identity discovery issuer did not match the selected environment.",
      {
        category: "validation",
        code: "discovery_issuer_mismatch",
        raw: {
          discoveryIssuer: discovery.issuer,
          environment,
          expectedIssuer,
        },
      }
    );
  }

  if (!discovery.jwks_uri) {
    throw new CubidAuthError("Cubid identity discovery metadata did not include a JWKS URI.", {
      category: "validation",
      code: "missing_jwks_uri",
      raw: discovery,
    });
  }

  const responseTypes = discovery.response_types_supported ?? [];
  if (!responseTypes.includes("code")) {
    throw new CubidAuthError("Cubid identity issuer does not advertise authorization-code flow.", {
      category: "validation",
      code: "missing_authorization_code_flow",
      raw: discovery,
    });
  }

  const codeChallengeMethods = discovery.code_challenge_methods_supported ?? [];
  if (!codeChallengeMethods.includes("S256")) {
    throw new CubidAuthError("Cubid identity issuer does not advertise PKCE S256.", {
      category: "validation",
      code: "missing_pkce_s256",
      raw: discovery,
    });
  }

  const subjectTypes = discovery.subject_types_supported ?? [];
  if (!subjectTypes.includes("pairwise")) {
    throw new CubidAuthError("Cubid identity issuer does not advertise pairwise subjects.", {
      category: "validation",
      code: "missing_pairwise_subjects",
      raw: discovery,
    });
  }

  const jwks = await fetchCubidJwks(discovery.jwks_uri, input.fetch);
  const usableSigningKeyCount = jwks.keys.filter(isUsableJwksSigningKey).length;

  if (usableSigningKeyCount === 0) {
    throw new CubidAuthError("Cubid identity JWKS did not include any usable signing keys.", {
      category: "validation",
      code: "empty_jwks",
      raw: jwks,
    });
  }

  return {
    authorizationEndpoint: discovery.authorization_endpoint,
    environment,
    expectedIssuer,
    issuer: discovery.issuer,
    jwksKeyCount: usableSigningKeyCount,
    jwksUri: discovery.jwks_uri,
    supportsAuthorizationCode: true,
    supportsPairwiseSubjects: true,
    supportsPkceS256: true,
    tokenEndpoint: discovery.token_endpoint,
    userInfoEndpoint: discovery.userinfo_endpoint ?? null,
  };
}

export function buildCubidAuthorizationUrl(
  input: BuildCubidAuthorizationUrlInput
): string {
  const url = new URL(asUrlString(input.authorizationEndpoint, "authorizationEndpoint"));
  const scopes = normalizeScopes(input.scope);
  const providerHints: unknown[] = url.searchParams.getAll("cubid_provider");
  if (typeof input.provider !== "undefined") providerHints.push(input.provider);
  if (typeof input.extraParams?.cubid_provider !== "undefined") providerHints.push(input.extraParams.cubid_provider);
  if (providerHints.length > 1 || (providerHints.length === 1 &&
    !CUBID_AUTH_PROVIDERS.includes(providerHints[0] as CubidAuthProviderHint))) {
    throw new CubidAuthError("Cubid provider must be one supported, unambiguous hosted UI choice.", {
      category: "validation", code: "invalid_provider",
    });
  }

  url.searchParams.set("client_id", assertNonEmptyString(input.clientId, "clientId"));
  url.searchParams.set("redirect_uri", assertNonEmptyString(input.redirectUri, "redirectUri"));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", scopes.join(" "));
  url.searchParams.set("state", assertNonEmptyString(input.state, "state"));
  url.searchParams.set(
    "code_challenge",
    assertNonEmptyString(input.codeChallenge, "codeChallenge")
  );
  url.searchParams.set("code_challenge_method", input.codeChallengeMethod ?? "S256");

  if (input.nonce) {
    url.searchParams.set("nonce", assertNonEmptyString(input.nonce, "nonce"));
  }

  if (input.prompt) {
    url.searchParams.set("prompt", input.prompt);
  }

  if (input.loginHint) {
    url.searchParams.set("login_hint", input.loginHint);
  }

  if (typeof input.maxAge === "number") {
    url.searchParams.set("max_age", String(input.maxAge));
  }

  appendExtraParams(url.searchParams, input.extraParams);
  if (providerHints.length === 1) url.searchParams.set("cubid_provider", providerHints[0] as string);

  const acrValues = normalizeAcrValues(input.acrValues);
  if (input.requirePasskey && !acrValues.includes(CUBID_PASSKEY_ACR_VALUE)) {
    acrValues.unshift(CUBID_PASSKEY_ACR_VALUE);
  }

  if (acrValues.length > 0) {
    url.searchParams.set("acr_values", acrValues.join(" "));
  }

  return url.toString();
}

export function parseCubidAuthorizationCallback(
  input: string | URL | URLSearchParams
): CubidAuthorizationCallbackResult {
  const params =
    input instanceof URLSearchParams
      ? input
      : new URL(
          typeof input === "string" && !/^[A-Za-z][A-Za-z0-9+.-]*:/u.test(input)
            ? `https://callback.invalid/?${input.replace(/^\?/u, "")}`
            : String(input)
        ).searchParams;

  const raw = toQueryRecord(params);
  const singleValueKeys = ["code", "state", "iss", "error", "error_description", "error_uri", "session_state"];
  if (singleValueKeys.some((key) => params.getAll(key).length > 1) ||
    (params.has("error") && params.has("code")) ||
    (params.has("error") && !params.get("error"))) {
    throw new CubidAuthError("Cubid auth callback contains ambiguous protocol parameters.", {
      category: "parse", code: "invalid_callback",
    });
  }
  const error = params.get("error");

  if (error) {
    return {
      error,
      errorDescription: params.get("error_description"),
      errorUri: params.get("error_uri"),
      kind: "error",
      raw,
      state: params.get("state"),
    };
  }

  const code = params.get("code");
  const state = params.get("state");

  if (!code || !state) {
    throw new CubidAuthError(
      "Cubid auth callback must include either error details or both code and state.",
      {
        category: "parse",
        code: "invalid_callback",
        raw,
      }
    );
  }

  return {
    code,
    iss: params.get("iss"),
    kind: "success",
    raw,
    sessionState: params.get("session_state"),
    state,
  };
}

export function assertCubidAuthorizationState(
  expectedState: string,
  actualState: CubidAuthorizationCallbackResult | string | null | undefined
): void {
  const expected = assertNonEmptyString(expectedState, "expectedState");
  const actual =
    typeof actualState === "string"
      ? actualState
      : actualState?.kind === "success"
        ? actualState.state
        : actualState?.state ?? null;

  if (!actual || actual !== expected) {
    throw new CubidAuthError("Cubid auth callback state did not match the original request.", {
      category: "validation",
      code: "state_mismatch",
    });
  }
}

export function buildCubidTokenExchangeRequest(
  input: BuildCubidTokenExchangeRequestInput
): CubidPreparedRequest {
  const url = asUrlString(input.tokenEndpoint, "tokenEndpoint");
  const body = new URLSearchParams({
    client_id: assertNonEmptyString(input.clientId, "clientId"),
    code: assertNonEmptyString(input.code, "code"),
    code_verifier: assertNonEmptyString(input.codeVerifier, "codeVerifier"),
    grant_type: "authorization_code",
    redirect_uri: assertNonEmptyString(input.redirectUri, "redirectUri"),
  });

  appendExtraParams(body, input.extraParams);

  return {
    body: body.toString(),
    init: {
      body: body.toString(),
      headers: {
        accept: "application/json",
        "content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      signal: input.signal,
    },
    url,
  };
}

export async function exchangeCubidAuthorizationCode(
  input: ExchangeCubidAuthorizationCodeInput
): Promise<CubidTokenResponse> {
  const prepared = buildCubidTokenExchangeRequest(input);
  const fetchImpl = getFetch(input.fetch);
  let response: Response;

  try {
    response = await fetchImpl(prepared.url, prepared.init);
  } catch (cause) {
    throw new CubidAuthError("Cubid auth token exchange failed before a response was received.", {
      category: "network",
      code: "token_exchange_failed",
      cause,
    });
  }

  const payload = await readJsonResponse(response, "token response");

  if (!response.ok || typeof payload.error === "string") {
    throw new CubidAuthError(
      getOptionalString(payload, "error_description") ?? "Cubid auth token exchange failed.",
      {
        category: "protocol",
        code: getOptionalString(payload, "error") ?? "token_exchange_failed",
        raw: payload,
        status: response.status,
      }
    );
  }

  return normalizeTokenResponse(payload);
}

export function buildCubidUserInfoRequest(
  input: BuildCubidUserInfoRequestInput
): CubidPreparedRequest {
  return {
    body: null,
    init: {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${assertNonEmptyString(input.accessToken, "accessToken")}`,
      },
      method: "GET",
      signal: input.signal,
    },
    url: asUrlString(input.userInfoEndpoint, "userInfoEndpoint"),
  };
}

export async function fetchCubidUserInfo(
  input: FetchCubidUserInfoInput
): Promise<CubidUserInfo> {
  const prepared = buildCubidUserInfoRequest(input);
  const fetchImpl = getFetch(input.fetch);
  let response: Response;

  try {
    response = await fetchImpl(prepared.url, prepared.init);
  } catch (cause) {
    throw new CubidAuthError("Cubid auth userinfo request failed before a response was received.", {
      category: "network",
      code: "userinfo_fetch_failed",
      cause,
    });
  }

  const payload = await readJsonResponse(response, "userinfo response");

  if (!response.ok || typeof payload.error === "string") {
    throw new CubidAuthError(
      getOptionalString(payload, "error_description") ?? "Cubid auth userinfo request failed.",
      {
        category: "protocol",
        code: getOptionalString(payload, "error") ?? "userinfo_request_failed",
        raw: payload,
        status: response.status,
      }
    );
  }

  const sub = getRequiredString(payload, "sub", "userinfo response");

  return {
    ...payload,
    sub,
  } as CubidUserInfo;
}

export function decodeCubidIdTokenClaims(idToken: string): CubidIdTokenClaims {
  return decodeCompactJwt(idToken).payload;
}

export function getCubidAuthAssurance(
  input: CubidAuthAssuranceInput
): CubidAuthAssurance {
  const claims = resolveAssuranceClaims(input);
  const acr = typeof claims?.acr === "string" && claims.acr.length > 0 ? claims.acr : null;
  const amr = normalizeAmr(claims?.amr);

  return {
    acr,
    amr,
    hasPasskeyAssurance:
      acr === CUBID_PASSKEY_ACR_VALUE || amr.includes("passkey"),
  };
}

export function hasCubidPasskeyAssurance(input: CubidAuthAssuranceInput): boolean {
  return getCubidAuthAssurance(input).hasPasskeyAssurance;
}

export async function validateCubidIdToken(
  input: ValidateCubidIdTokenInput
): Promise<CubidIdTokenClaims> {
  const decoded = decodeCompactJwt(input.idToken);
  const alg = typeof decoded.header.alg === "string" ? decoded.header.alg : null;
  const cryptoAlgorithm = alg ? resolveIdTokenCryptoAlgorithm(alg) : null;

  if (!alg || !cryptoAlgorithm) {
    throw new CubidAuthError("Cubid auth does not support this ID token signing algorithm.", {
      category: "validation",
      code: "unsupported_id_token_alg",
      raw: decoded.header,
    });
  }

  if (!input.discoveryDocument.jwks_uri) {
    throw new CubidAuthError("Cubid auth discovery metadata did not include a JWKS URI.", {
      category: "validation",
      code: "missing_jwks_uri",
      raw: input.discoveryDocument,
    });
  }

  assertIdTokenClaims(decoded.payload, input);

  const jwks = await fetchCubidJwks(input.discoveryDocument.jwks_uri, input.fetch);
  const jwk = findJwksKey(jwks.keys, decoded.header);

  if (!jwk) {
    throw new CubidAuthError("Cubid auth could not find a matching ID token signing key.", {
      category: "validation",
      code: "missing_signing_key",
      raw: decoded.header,
    });
  }

  const key = await getCrypto(input.crypto).subtle.importKey(
    "jwk",
    jwk,
    cryptoAlgorithm.importAlgorithm,
    false,
    ["verify"]
  );
  const verified = await getCrypto(input.crypto).subtle.verify(
    cryptoAlgorithm.verifyAlgorithm,
    key,
    toArrayBuffer(base64UrlToBytes(decoded.encodedSignature)),
    toArrayBuffer(decoded.signedData)
  );

  if (!verified) {
    throw new CubidAuthError("Cubid auth could not verify the ID token signature.", {
      category: "validation",
      code: "invalid_id_token_signature",
      raw: decoded.header,
    });
  }

  return decoded.payload;
}

export function isCubidIdTokenExpired(
  idTokenOrClaims: CubidIdTokenClaims | string,
  nowSeconds = Math.floor(Date.now() / 1000)
): boolean {
  const claims =
    typeof idTokenOrClaims === "string"
      ? decodeCubidIdTokenClaims(idTokenOrClaims)
      : idTokenOrClaims;

  return typeof claims.exp === "number" ? claims.exp <= nowSeconds : false;
}

export function buildCubidLogoutUrl(input: BuildCubidLogoutUrlInput): string {
  const url = new URL(asUrlString(input.endSessionEndpoint, "endSessionEndpoint"));

  if (input.idTokenHint) {
    url.searchParams.set("id_token_hint", assertNonEmptyString(input.idTokenHint, "idTokenHint"));
  }

  if (input.postLogoutRedirectUri) {
    url.searchParams.set(
      "post_logout_redirect_uri",
      assertNonEmptyString(input.postLogoutRedirectUri, "postLogoutRedirectUri")
    );
  }

  if (input.state) {
    url.searchParams.set("state", assertNonEmptyString(input.state, "state"));
  }

  appendExtraParams(url.searchParams, input.extraParams);

  return url.toString();
}

export function createCubidAuthSession(
  input: CreateCubidAuthSessionInput
): CubidAuthSession {
  const idTokenClaims =
    input.idTokenClaims ?? (input.tokenResponse.idToken ? decodeCubidIdTokenClaims(input.tokenResponse.idToken) : null);
  if (input.userInfo && typeof idTokenClaims?.sub === "string" && input.userInfo.sub !== idTokenClaims.sub) {
    throw new CubidAuthError("Cubid UserInfo subject does not match the ID token subject.", {
      category: "validation", code: "invalid_userinfo_subject",
    });
  }
  const subject = input.userInfo?.sub ?? (typeof idTokenClaims?.sub === "string" ? idTokenClaims.sub : null);

  return {
    accessToken: input.tokenResponse.accessToken,
    clientId: assertNonEmptyString(input.clientId, "clientId"),
    expiresAt: input.tokenResponse.expiresAt,
    idToken: input.tokenResponse.idToken,
    idTokenClaims,
    issuedAt: input.tokenResponse.issuedAt,
    issuer: normalizeIssuer(input.issuer),
    refreshToken: input.tokenResponse.refreshToken,
    scope: [...input.tokenResponse.scope],
    subject,
    tokenType: input.tokenResponse.tokenType,
    userInfo: input.userInfo ?? null,
  };
}

export function serializeCubidAuthSession(session: CubidAuthSession): string {
  return JSON.stringify(session);
}

export function parseCubidAuthSession(serialized: string): CubidAuthSession {
  const value = assertNonEmptyString(serialized, "serialized session");

  try {
    const payload = toRecord(JSON.parse(value), "stored auth session");

    return {
      accessToken: getRequiredString(payload, "accessToken", "stored auth session"),
      clientId: getRequiredString(payload, "clientId", "stored auth session"),
      expiresAt: getOptionalNumber(payload, "expiresAt", "stored auth session"),
      idToken: getOptionalString(payload, "idToken"),
      idTokenClaims: getOptionalRecord(
        payload,
        "idTokenClaims",
        "stored auth session"
      ) as CubidIdTokenClaims | null,
      issuedAt:
        getOptionalNumber(payload, "issuedAt", "stored auth session") ?? Date.now(),
      issuer: getRequiredString(payload, "issuer", "stored auth session"),
      refreshToken: getOptionalString(payload, "refreshToken"),
      scope: normalizeScopes(
        Array.isArray(payload.scope) && payload.scope.every((item) => typeof item === "string")
          ? (payload.scope as string[])
          : undefined
      ),
      subject: getOptionalString(payload, "subject"),
      tokenType: getRequiredString(payload, "tokenType", "stored auth session"),
      userInfo: getOptionalRecord(
        payload,
        "userInfo",
        "stored auth session"
      ) as CubidUserInfo | null,
    };
  } catch (cause) {
    if (cause instanceof CubidAuthError) {
      throw cause;
    }

    throw new CubidAuthError("Cubid auth could not parse the stored session payload.", {
      category: "parse",
      code: "invalid_session",
      cause,
    });
  }
}

export function persistCubidAuthSession(
  storage: CubidAuthStorageLike,
  session: CubidAuthSession,
  storageKey = CUBID_AUTH_SESSION_STORAGE_KEY
): string {
  const key = assertNonEmptyString(storageKey, "storageKey");
  const serialized = serializeCubidAuthSession(session);
  storage.setItem(key, serialized);
  return serialized;
}

export function loadCubidAuthSession(
  storage: CubidAuthStorageLike,
  storageKey = CUBID_AUTH_SESSION_STORAGE_KEY
): CubidAuthSession | null {
  const key = assertNonEmptyString(storageKey, "storageKey");
  const stored = storage.getItem(key);
  return stored ? parseCubidAuthSession(stored) : null;
}

export function clearCubidAuthSession(
  storage: CubidAuthStorageLike,
  storageKey = CUBID_AUTH_SESSION_STORAGE_KEY
): void {
  storage.removeItem(assertNonEmptyString(storageKey, "storageKey"));
}

export function isCubidAuthSessionExpired(
  session: CubidAuthSession,
  now = Date.now()
): boolean {
  return session.expiresAt !== null ? session.expiresAt <= now : false;
}

export function assertCubidAuthorizationCallbackDestination(callbackUrl: string, redirectUri: string) {
  let callback: URL;
  let registered: URL;
  try {
    callback = new URL(callbackUrl);
    registered = new URL(redirectUri);
  } catch {
    throw new CubidAuthError("Cubid callback requires the registered absolute redirect destination.", {
      category: "validation", code: "invalid_callback_destination",
    });
  }
  const destinationKeys = ["protocol", "username", "password", "host", "pathname"] as const;
  const hasRegisteredQuery = Array.from(new Set(registered.searchParams.keys())).every((key) => {
    const actual = callback.searchParams.getAll(key);
    const expected = registered.searchParams.getAll(key);
    return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
  });
  if (callbackUrl.includes("#") || redirectUri.includes("#") ||
      destinationKeys.some((key) => callback[key] !== registered[key]) || !hasRegisteredQuery) {
    throw new CubidAuthError("Cubid callback does not match the registered redirect destination.", {
      category: "validation", code: "invalid_callback_destination",
    });
  }
}


/** Existing app identity; tokens and the app session itself are never replaced by step-up. */
export type CubidReauthenticationSession = Pick<CubidAuthSession, "clientId" | "issuer" | "subject">;

/** Private one-use transaction. Store server-side; never return this object to an app/device. */
export interface CubidReauthenticationTransaction {
  clientId: string;
  issuer: string;
  redirectUri: string;
  subject: string;
  state: string;
  nonce: string;
  codeVerifier: string;
  requestedAtSeconds: number;
  expiresAtSeconds: number;
  maxAge: number;
  requirePasskey: boolean;
}

export interface CreateCubidReauthenticationRequestInput {
  session: CubidReauthenticationSession;
  discoveryDocument: CubidOidcDiscoveryDocument;
  redirectUri: string;
  /** Default 60 seconds. The signed authentication time must also be no earlier than this request (within clock tolerance). */
  maxAge?: number;
  /** Default true; a provider hint is never assurance. */
  requirePasskey?: boolean;
  provider?: CubidAuthProviderHint;
  crypto?: CubidAuthCrypto;
  /** Trusted host clock, in whole Unix seconds; normally omitted. */
  nowSeconds?: number;
}

export interface CubidReauthenticationRequest {
  authorizationUrl: string;
  transaction: CubidReauthenticationTransaction;
}

export type CubidReauthenticationResult =
  | { status: "authenticated"; subject: string; authTime: number; assurance: CubidAuthAssurance }
  | { status: "cancelled" }
  | { status: "denied"; reason: "access_denied" | "login_required" | "interaction_required" | "consent_required" };

export interface CompleteCubidReauthenticationInput {
  callbackUrl: string | URL;
  session: CubidReauthenticationSession;
  discoveryDocument: CubidOidcDiscoveryDocument;
  redirectUri: string;
  /** Atomically claim AND remove the private transaction by state; return null on replay/absence. */
  consumeTransaction: (state: string) => CubidReauthenticationTransaction | null | Promise<CubidReauthenticationTransaction | null>;
  fetch?: CubidAuthFetch;
  crypto?: CubidAuthCrypto;
  nowSeconds?: number;
  /** Default 5 seconds, bounded to 0–60; does not extend transaction or ID-token expiry. */
  clockToleranceSeconds?: number;
}

export interface ReauthenticateCubidSessionInput extends CreateCubidReauthenticationRequestInput {
  /** Host-owned system browser/popup handoff. Return null for user dismissal; never use an embedded WebView. */
  openAuthorizationSession: (authorizationUrl: string) => Promise<string | URL | null>;
  fetch?: CubidAuthFetch;
  clockToleranceSeconds?: number;
}

const REAUTHENTICATION_TRANSACTION_SECONDS = 300;

function stepUpError(code: string, message: string): CubidAuthError {
  return new CubidAuthError(message, { category: "validation", code });
}

function stepUpInteger(value: number, name: string, maximum = Number.MAX_SAFE_INTEGER): number {
  if (!Number.isSafeInteger(value) || value < 0 || value > maximum) {
    throw stepUpError("invalid_reauthentication_options", `Cubid step-up requires a bounded nonnegative integer ${name}.`);
  }
  return value;
}

function stepUpNow(nowSeconds?: number): number {
  return stepUpInteger(nowSeconds ?? Math.floor(Date.now() / 1000), "nowSeconds", Number.MAX_SAFE_INTEGER - REAUTHENTICATION_TRANSACTION_SECONDS);
}

function assertStepUpSession(session: CubidReauthenticationSession, discovery: CubidOidcDiscoveryDocument) {
  if (typeof session.subject !== "string" || !session.subject.trim() ||
      typeof session.clientId !== "string" || !session.clientId.trim() || session.issuer !== discovery.issuer) {
    throw stepUpError("invalid_reauthentication_session", "Cubid step-up requires the existing app subject/client and exact issuer.");
  }
  if (discovery.token_endpoint_auth_methods_supported && !discovery.token_endpoint_auth_methods_supported.includes("none")) {
    throw stepUpError("unsupported_client_authentication", "This step-up helper requires a registered public PKCE client.");
  }
}

/** Prepare a fresh, minimal-scope Cubid ceremony without changing the existing app session. */
export async function createCubidReauthenticationRequest(
  input: CreateCubidReauthenticationRequestInput
): Promise<CubidReauthenticationRequest> {
  assertStepUpSession(input.session, input.discoveryDocument);
  const requestedAtSeconds = stepUpNow(input.nowSeconds);
  const maxAge = stepUpInteger(input.maxAge ?? 60, "maxAge");
  if (typeof input.requirePasskey !== "undefined" && typeof input.requirePasskey !== "boolean") {
    throw stepUpError("invalid_reauthentication_options", "requirePasskey must be a boolean.");
  }
  // Check a registered absolute destination before creating any private material.
  assertCubidAuthorizationCallbackDestination(input.redirectUri, input.redirectUri);
  const pkce = await createCubidPkcePair({ crypto: input.crypto });
  const transaction: CubidReauthenticationTransaction = {
    clientId: input.session.clientId, issuer: input.session.issuer,
    subject: input.session.subject as string, redirectUri: input.redirectUri,
    state: createCubidAuthState(32, input.crypto), nonce: createCubidAuthNonce(32, input.crypto),
    codeVerifier: pkce.codeVerifier, requestedAtSeconds,
    expiresAtSeconds: requestedAtSeconds + REAUTHENTICATION_TRANSACTION_SECONDS,
    maxAge, requirePasskey: input.requirePasskey ?? true,
  };
  const authorizationUrl = buildCubidAuthorizationUrl({
    authorizationEndpoint: input.discoveryDocument.authorization_endpoint,
    clientId: transaction.clientId, redirectUri: transaction.redirectUri,
    state: transaction.state, nonce: transaction.nonce,
    codeChallenge: pkce.codeChallenge, codeChallengeMethod: "S256",
    prompt: "login", maxAge, requirePasskey: transaction.requirePasskey,
    provider: input.provider, scope: ["openid"],
  });
  return { authorizationUrl, transaction };
}

/** Complete exactly one private step-up. A plain returned object is not a portable bearer credential. */
export async function completeCubidReauthentication(
  input: CompleteCubidReauthenticationInput
): Promise<CubidReauthenticationResult> {
  assertStepUpSession(input.session, input.discoveryDocument);
  const tolerance = stepUpInteger(input.clockToleranceSeconds ?? 5, "clockToleranceSeconds", 60);
  assertCubidAuthorizationCallbackDestination(String(input.callbackUrl), input.redirectUri);
  const callback = parseCubidAuthorizationCallback(input.callbackUrl);
  if (!callback.state) throw stepUpError("state_mismatch", "Step-up callback requires the original state.");
  const callbackIssuer = callback.raw.iss?.[0];
  if (typeof callbackIssuer !== "undefined" && callbackIssuer !== input.session.issuer) {
    throw stepUpError("invalid_issuer", "Step-up callback issuer does not match the app session.");
  }
  const transaction = await input.consumeTransaction(callback.state);
  if (!transaction) throw stepUpError("missing_transaction", "No unconsumed step-up transaction was found.");
  assertCubidAuthorizationState(transaction.state, callback.state);
  if (transaction.clientId !== input.session.clientId || transaction.issuer !== input.session.issuer ||
      transaction.redirectUri !== input.redirectUri || transaction.subject !== input.session.subject ||
      typeof transaction.nonce !== "string" || !transaction.nonce.trim() ||
      typeof transaction.codeVerifier !== "string" || !transaction.codeVerifier.trim() ||
      typeof transaction.requirePasskey !== "boolean") {
    throw stepUpError("invalid_transaction", "Step-up transaction does not match the current app binding.");
  }
  stepUpInteger(transaction.maxAge, "stored maxAge");
  stepUpInteger(transaction.requestedAtSeconds, "stored requestedAtSeconds");
  if (transaction.expiresAtSeconds !== transaction.requestedAtSeconds + REAUTHENTICATION_TRANSACTION_SECONDS) {
    throw stepUpError("invalid_transaction", "Step-up transaction lifetime is invalid.");
  }
  const assertWindow = () => {
    const now = stepUpNow(input.nowSeconds);
    if (now < transaction.requestedAtSeconds - tolerance || now >= transaction.expiresAtSeconds) {
      throw stepUpError("expired_transaction", "Step-up transaction is outside its allowed lifetime.");
    }
    return now;
  };
  assertWindow();
  if (callback.kind === "error") {
    const reason = callback.error;
    if (reason === "access_denied" || reason === "login_required" || reason === "interaction_required" || reason === "consent_required") {
      return { status: "denied", reason };
    }
    throw stepUpError("reauthentication_failed", "Cubid rejected the step-up request.");
  }
  const response = await exchangeCubidAuthorizationCode({
    clientId: transaction.clientId, code: callback.code, codeVerifier: transaction.codeVerifier,
    redirectUri: transaction.redirectUri, tokenEndpoint: input.discoveryDocument.token_endpoint, fetch: input.fetch,
  });
  if (!response.idToken) throw stepUpError("missing_id_token", "Step-up requires a signed Cubid ID token.");
  const claims = await validateCubidIdToken({
    clientId: transaction.clientId, discoveryDocument: input.discoveryDocument,
    idToken: response.idToken, expectedNonce: transaction.nonce,
    fetch: input.fetch, crypto: input.crypto, nowSeconds: stepUpNow(input.nowSeconds),
  });
  const now = assertWindow();
  if (claims.iss !== transaction.issuer) {
    throw stepUpError("invalid_issuer", "Step-up ID token must use the exact registered issuer.");
  }
  if (claims.sub !== transaction.subject) {
    throw stepUpError("reauthentication_subject_mismatch", "Step-up must prove the existing app identity.");
  }
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (audiences.length !== 1 || audiences[0] !== transaction.clientId) {
    throw stepUpError("invalid_audience", "Step-up ID token must target only this app client.");
  }
  if (typeof claims.azp !== "undefined" && claims.azp !== transaction.clientId) {
    throw stepUpError("invalid_authorized_party", "Step-up ID token names another authorized party.");
  }
  if (typeof claims.iat !== "number" || !Number.isSafeInteger(claims.iat) ||
      claims.iat < transaction.requestedAtSeconds - tolerance || claims.iat > now + tolerance) {
    throw stepUpError("invalid_issued_at", "Step-up ID token requires a valid recent issued-at time.");
  }
  if (typeof claims.exp !== "number" || claims.exp <= now) {
    throw stepUpError("expired_id_token", "Step-up ID token expired during verification.");
  }
  const authTime = claims.auth_time;
  if (typeof authTime !== "number" || !Number.isSafeInteger(authTime) || authTime < 0 || authTime > now + tolerance || authTime > claims.iat + tolerance) {
    throw stepUpError("invalid_auth_time", "Step-up ID token requires a valid signed authentication time.");
  }
  if (authTime < transaction.requestedAtSeconds - tolerance || authTime < now - transaction.maxAge - tolerance) {
    throw stepUpError("stale_auth_time", "Cubid authentication is too old for this step-up.");
  }
  const assurance = getCubidAuthAssurance(claims);
  if (transaction.requirePasskey && !assurance.hasPasskeyAssurance) {
    throw stepUpError("insufficient_assurance", "Step-up did not prove the requested Cubid passkey assurance.");
  }
  return { status: "authenticated", subject: transaction.subject, authTime, assurance };
}

/** Same-process convenience for a host-controlled system browser; never mutates/persists the app session. */
export async function reauthenticateCubidSession(
  input: ReauthenticateCubidSessionInput
): Promise<CubidReauthenticationResult> {
  // Validate tolerance before opening any UI.
  stepUpInteger(input.clockToleranceSeconds ?? 5, "clockToleranceSeconds", 60);
  const request = await createCubidReauthenticationRequest(input);
  const callbackUrl = await input.openAuthorizationSession(request.authorizationUrl);
  if (callbackUrl === null) return { status: "cancelled" };
  let consumed = false;
  return completeCubidReauthentication({
    ...input, callbackUrl,
    consumeTransaction: (state) => {
      if (consumed || state !== request.transaction.state) return null;
      consumed = true;
      return request.transaction;
    },
  });
}
