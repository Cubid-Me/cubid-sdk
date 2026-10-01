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

/**
 * Cross-app access (identity-assertion authorization grant). A paired,
 * confidential client exchanges the ID token Cubid issued to it for a
 * short-lived assertion addressed to a sibling app, carrying the pairwise
 * subject that app already knows; the sibling app redeems it at its own token
 * endpoint with the JWT bearer grant. Cubid issues the assertion only while
 * the person's own consent for that pair stands.
 */
export const CUBID_TOKEN_EXCHANGE_GRANT_TYPE =
  "urn:ietf:params:oauth:grant-type:token-exchange";
export const CUBID_JWT_BEARER_GRANT_TYPE =
  "urn:ietf:params:oauth:grant-type:jwt-bearer";
export const CUBID_ID_JAG_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:id-jag";
export const CUBID_ID_TOKEN_TOKEN_TYPE = "urn:ietf:params:oauth:token-type:id_token";
export const CUBID_ACCESS_TOKEN_TOKEN_TYPE =
  "urn:ietf:params:oauth:token-type:access_token";
export const CUBID_ID_JAG_JWT_TYPE = "oauth-id-jag+jwt";
export const CUBID_CROSS_APP_RESOURCE_URN_PREFIX = "urn:cubid:client:";
export const CUBID_CROSS_APP_CONSENT_REQUIRED_ERROR = "consent_required";

/** Security Event Tokens (RFC 8417) Cubid pushes to a client's `security_events_uri`. */
export const CUBID_SECURITY_EVENT_JWT_TYPE = "secevent+jwt";
export const CUBID_SECURITY_EVENT_CONTENT_TYPE = "application/secevent+jwt";
export const CUBID_SECURITY_EVENT_TYPES = {
  accountPurged: "https://schemas.openid.net/secevent/risc/event-type/account-purged",
  consentRevoked: "https://schemas.cubid.me/secevent/consent-revoked",
  crossAppConsentRevoked: "https://schemas.cubid.me/secevent/cross-app-consent-revoked",
} as const;

const DISCOVERY_PATH = "/.well-known/openid-configuration";
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

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
  authorization_endpoint: string;
  code_challenge_methods_supported?: string[];
  cross_app_access_consent_parameter?: string;
  cross_app_access_issued_token_types_supported?: string[];
  cross_app_access_pairings_endpoint?: string;
  cross_app_access_supported?: boolean;
  end_session_endpoint?: string;
  grant_types_supported?: string[];
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
  redirectUri: string;
  requirePasskey?: boolean;
  /**
   * RFC 8707 `resource` values naming paired apps this client wants to act
   * in for the person (cross-app access). Use `buildCubidCrossAppResource`
   * to name an app by its Cubid client id. Each value becomes its own
   * `resource` parameter and the person approves them on Cubid's consent page.
   */
  resources?: readonly string[] | string;
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
  acr?: string;
  amr?: string[];
  aud?: string | string[];
  email?: string;
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

export type CubidClientAuthenticationMethod =
  | "client_secret_basic"
  | "client_secret_post";

export type CubidSubjectTokenType =
  | typeof CUBID_ACCESS_TOKEN_TOKEN_TYPE
  | typeof CUBID_ID_TOKEN_TOKEN_TYPE;

export interface BuildCubidIdentityAssertionRequestInput {
  /**
   * The paired app the assertion is for: its Cubid client id, the
   * `urn:cubid:client:{client_id}` form, or the audience the operator
   * configured for the pairing.
   */
  audience: string;
  /** How the confidential client authenticates; defaults to HTTP Basic. */
  clientAuthenticationMethod?: CubidClientAuthenticationMethod;
  clientId: string;
  /** Server-side only. Never ship this helper's inputs to a browser. */
  clientSecret: string;
  extraParams?: Record<string, boolean | number | string | undefined>;
  /** Resource-app scopes to carry; must be within what the pairing allows. */
  scope?: readonly string[] | string;
  signal?: AbortSignal;
  /** The ID token (default) or Cubid access token this client holds for the person. */
  subjectToken: string;
  subjectTokenType?: CubidSubjectTokenType;
  tokenEndpoint: string | URL;
}

export interface RequestCubidIdentityAssertionInput
  extends BuildCubidIdentityAssertionRequestInput {
  fetch?: CubidAuthFetch;
}

export interface CubidIdentityAssertionResponse {
  /** The signed ID-JAG, redeemed at the resource app with the JWT bearer grant. */
  assertion: string;
  expiresAt: number | null;
  expiresIn: number | null;
  issuedAt: number;
  issuedTokenType: string;
  raw: Record<string, unknown>;
  scope: string[];
  tokenType: string;
}

export interface ListCubidCrossAppPairingsInput {
  clientAuthenticationMethod?: CubidClientAuthenticationMethod;
  clientId: string;
  /** Server-side only. */
  clientSecret: string;
  fetch?: CubidAuthFetch;
  /** `cross_app_access_pairings_endpoint` from discovery. */
  pairingsEndpoint: string | URL;
  signal?: AbortSignal;
}

export interface CubidCrossAppPairing {
  allowedScopes: string[];
  audience: string;
  pairingId: string;
  /** The value to pass in `resources` when asking the person for consent. */
  resource: string;
  resourceClientId: string;
  resourceClientName: string;
}

export interface BuildCubidJwtBearerGrantRequestInput {
  /** The ID-JAG received from Cubid. */
  assertion: string;
  /** Client credentials as registered at the resource app, when it requires them. */
  clientAuthenticationMethod?: CubidClientAuthenticationMethod;
  clientId?: string;
  clientSecret?: string;
  extraParams?: Record<string, boolean | number | string | undefined>;
  scope?: readonly string[] | string;
  signal?: AbortSignal;
  /** The resource app's own token endpoint, not Cubid's. */
  tokenEndpoint: string | URL;
}

export interface CubidIdentityAssertionClaims extends Record<string, unknown> {
  acr?: string;
  amr?: string[];
  aud?: string | string[];
  auth_time?: number;
  client_id?: string;
  exp?: number;
  iat?: number;
  iss?: string;
  jti?: string;
  scope?: string;
  sub?: string;
}

export interface ValidateCubidIdentityAssertionInput {
  /** Requesting client ids this app accepts assertions from; any when omitted. */
  acceptedClientIds?: readonly string[];
  assertion: string;
  /** The audience this app expects, as configured in the Cubid pairing. */
  audience: string;
  /** Cubid's discovery document, for the issuer and JWKS. */
  discoveryDocument: CubidOidcDiscoveryDocument;
  fetch?: CubidAuthFetch;
  nowSeconds?: number;
}

export type CubidSecurityEventType =
  (typeof CUBID_SECURITY_EVENT_TYPES)[keyof typeof CUBID_SECURITY_EVENT_TYPES];

export interface CubidSecurityEventSubject {
  format: "iss_sub";
  iss: string;
  sub: string;
}

export interface CubidSecurityEvent {
  /** The client the event was addressed to. */
  audience: string;
  eventType: CubidSecurityEventType | string;
  issuedAt: number | null;
  issuer: string;
  jti: string | null;
  /** Event-specific fields; never carries internal Cubid identifiers. */
  payload: Record<string, unknown>;
  raw: Record<string, unknown>;
  /** The person, named by this client's own pairwise subject. */
  subject: CubidSecurityEventSubject;
}

export interface ValidateCubidSecurityEventTokenInput {
  clientId: string;
  discoveryDocument: CubidOidcDiscoveryDocument;
  fetch?: CubidAuthFetch;
  /** Reject events issued more than this many seconds ago; off when omitted. */
  maxAgeSeconds?: number;
  nowSeconds?: number;
  token: string;
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

function getCrypto(): Crypto {
  if (!globalThis.crypto?.subtle || typeof globalThis.crypto.getRandomValues !== "function") {
    throw new CubidAuthError("Cubid auth requires Web Crypto support in this runtime.", {
      category: "config",
      code: "missing_crypto",
    });
  }

  return globalThis.crypto;
}

function encodeBinaryToBase64(binary: string): string {
  if (typeof globalThis.btoa === "function") {
    return globalThis.btoa(binary);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(binary, "binary").toString("base64");
  }

  throw new CubidAuthError("Cubid auth requires base64 encoding support in this runtime.", {
    category: "config",
    code: "missing_base64",
  });
}

function decodeBase64ToBinary(base64: string): string {
  if (typeof globalThis.atob === "function") {
    return globalThis.atob(base64);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(base64, "base64").toString("binary");
  }

  throw new CubidAuthError("Cubid auth requires base64 decoding support in this runtime.", {
    category: "config",
    code: "missing_base64",
  });
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
    const decoded = textDecoder.decode(base64UrlToBytes(input));
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

function decodeCompactJwt(
  idToken: string,
  label: { code: string; fieldName: string; name: string } = {
    code: "invalid_id_token",
    fieldName: "idToken",
    name: "ID token",
  }
) {
  const token = assertNonEmptyString(idToken, label.fieldName);
  const segments = token.split(".");

  if (segments.length !== 3 || segments.some((segment) => segment.length === 0)) {
    throw new CubidAuthError(`Cubid auth expected an ${label.name} with three JWT segments.`, {
      category: "parse",
      code: label.code,
    });
  }

  const [encodedHeader, encodedPayload, encodedSignature] = segments as [string, string, string];

  return {
    encodedHeader,
    encodedPayload,
    encodedSignature,
    header: decodeBase64UrlJson(encodedHeader, `${label.name} header`),
    payload: decodeBase64UrlJson(encodedPayload, `${label.name} claims`) as CubidIdTokenClaims,
    signedData: textEncoder.encode(`${encodedHeader}.${encodedPayload}`),
  };
}

type DecodedCompactJwt = ReturnType<typeof decodeCompactJwt>;

/**
 * Verifies a Cubid-signed JWT against the issuer's JWKS. Shared by ID token,
 * identity assertion, and Security Event Token validation.
 */
async function verifyCubidJwtSignature(
  decoded: DecodedCompactJwt,
  discoveryDocument: CubidOidcDiscoveryDocument,
  fetchImpl: CubidAuthFetch | undefined,
  label: { name: string; unsupportedAlgCode: string; invalidSignatureCode: string }
): Promise<void> {
  const alg = typeof decoded.header.alg === "string" ? decoded.header.alg : null;
  const cryptoAlgorithm = alg ? resolveIdTokenCryptoAlgorithm(alg) : null;

  if (!alg || !cryptoAlgorithm) {
    throw new CubidAuthError(`Cubid auth does not support this ${label.name} signing algorithm.`, {
      category: "validation",
      code: label.unsupportedAlgCode,
      raw: decoded.header,
    });
  }

  if (!discoveryDocument.jwks_uri) {
    throw new CubidAuthError("Cubid auth discovery metadata did not include a JWKS URI.", {
      category: "validation",
      code: "missing_jwks_uri",
      raw: discoveryDocument,
    });
  }

  const jwks = await fetchCubidJwks(discoveryDocument.jwks_uri, fetchImpl);
  const jwk = findJwksKey(jwks.keys, decoded.header);

  if (!jwk) {
    throw new CubidAuthError(`Cubid auth could not find a matching ${label.name} signing key.`, {
      category: "validation",
      code: "missing_signing_key",
      raw: decoded.header,
    });
  }

  const key = await getCrypto().subtle.importKey(
    "jwk",
    jwk,
    cryptoAlgorithm.importAlgorithm,
    false,
    ["verify"]
  );
  const verified = await getCrypto().subtle.verify(
    cryptoAlgorithm.verifyAlgorithm,
    key,
    toArrayBuffer(base64UrlToBytes(decoded.encodedSignature)),
    toArrayBuffer(decoded.signedData)
  );

  if (!verified) {
    throw new CubidAuthError(`Cubid auth could not verify the ${label.name} signature.`, {
      category: "validation",
      code: label.invalidSignatureCode,
      raw: decoded.header,
    });
  }
}

function createRandomString(byteLength: number): string {
  const crypto = getCrypto();
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

function normalizeResources(resources?: readonly string[] | string): string[] {
  if (!resources) {
    return [];
  }

  const values = typeof resources === "string" ? resources.split(/\s+/u) : [...resources];
  const normalized = values.map((value) => value.trim()).filter((value) => value.length > 0);

  for (const value of normalized) {
    if (/[\s#]/u.test(value)) {
      throw new CubidAuthError("Cubid auth resource values cannot contain whitespace or fragments.", {
        category: "validation",
        code: "invalid_resource",
        raw: value,
      });
    }
  }

  return [...new Set(normalized)];
}

function normalizeOptionalScopes(scope?: readonly string[] | string): string[] {
  if (!scope) {
    return [];
  }

  const values =
    typeof scope === "string"
      ? scope.split(/\s+/u)
      : [...scope];

  return [...new Set(values.map((value) => value.trim()).filter((value) => value.length > 0))];
}

function encodeBasicCredentials(clientId: string, clientSecret: string): string {
  const credentials = `${encodeURIComponent(clientId)}:${encodeURIComponent(clientSecret)}`;
  return encodeBinaryToBase64(credentials);
}

function applyClientAuthentication(
  body: URLSearchParams,
  headers: Record<string, string>,
  input: {
    clientAuthenticationMethod?: CubidClientAuthenticationMethod;
    clientId?: string;
    clientSecret?: string;
  }
): void {
  if (!input.clientId && !input.clientSecret) {
    return;
  }

  const clientId = assertNonEmptyString(input.clientId ?? "", "clientId");

  if (!input.clientSecret) {
    body.set("client_id", clientId);
    return;
  }

  const clientSecret = assertNonEmptyString(input.clientSecret, "clientSecret");

  if ((input.clientAuthenticationMethod ?? "client_secret_basic") === "client_secret_post") {
    body.set("client_id", clientId);
    body.set("client_secret", clientSecret);
    return;
  }

  body.set("client_id", clientId);
  headers.authorization = `Basic ${encodeBasicCredentials(clientId, clientSecret)}`;
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

export function createCubidPkceCodeVerifier(byteLength = 64): string {
  return createRandomString(byteLength);
}

export async function createCubidPkceCodeChallenge(codeVerifier: string): Promise<string> {
  const verifier = assertNonEmptyString(codeVerifier, "codeVerifier");
  const digest = await getCrypto().subtle.digest("SHA-256", textEncoder.encode(verifier));
  return bytesToBase64Url(new Uint8Array(digest));
}

export async function createCubidPkcePair(
  options: CreateCubidPkcePairOptions = {}
): Promise<CubidPkcePair> {
  const codeVerifier = createCubidPkceCodeVerifier(options.verifierByteLength ?? 64);

  return {
    codeChallenge: await createCubidPkceCodeChallenge(codeVerifier),
    codeChallengeMethod: "S256",
    codeVerifier,
  };
}

export function createCubidAuthState(byteLength = 32): string {
  return createRandomString(byteLength);
}

export function createCubidAuthNonce(byteLength = 32): string {
  return createRandomString(byteLength);
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

  for (const resource of normalizeResources(input.resources)) {
    url.searchParams.append("resource", resource);
  }

  appendExtraParams(url.searchParams, input.extraParams);

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
          typeof input === "string" && !input.startsWith("http")
            ? `https://callback.invalid/?${input.replace(/^\?/u, "")}`
            : String(input)
        ).searchParams;

  const raw = toQueryRecord(params);
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

  if (!alg || !resolveIdTokenCryptoAlgorithm(alg)) {
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
  await verifyCubidJwtSignature(decoded, input.discoveryDocument, input.fetch, {
    invalidSignatureCode: "invalid_id_token_signature",
    name: "ID token",
    unsupportedAlgCode: "unsupported_id_token_alg",
  });

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

// ---------------------------------------------------------------------------
// Cross-app access (identity-assertion authorization grant)
// ---------------------------------------------------------------------------

/** Names a paired app for the `resource` parameter by its Cubid client id. */
export function buildCubidCrossAppResource(resourceClientId: string): string {
  const clientId = assertNonEmptyString(resourceClientId, "resourceClientId");

  if (/[\s#]/u.test(clientId)) {
    throw new CubidAuthError("Cubid auth resource client ids cannot contain whitespace or fragments.", {
      category: "validation",
      code: "invalid_resource",
      raw: clientId,
    });
  }

  return clientId.startsWith(CUBID_CROSS_APP_RESOURCE_URN_PREFIX)
    ? clientId
    : `${CUBID_CROSS_APP_RESOURCE_URN_PREFIX}${clientId}`;
}

/** True when discovery advertises token exchange for cross-app access. */
export function supportsCubidCrossAppAccess(
  discoveryDocument: CubidOidcDiscoveryDocument
): boolean {
  const grants = Array.isArray(discoveryDocument.grant_types_supported)
    ? discoveryDocument.grant_types_supported
    : [];

  return (
    discoveryDocument.cross_app_access_supported === true ||
    grants.includes(CUBID_TOKEN_EXCHANGE_GRANT_TYPE)
  );
}

/**
 * Prepares the RFC 8693 token exchange that asks Cubid for an identity
 * assertion addressed to a paired app. Server-side only: it carries the
 * requesting client's secret.
 */
export function buildCubidIdentityAssertionRequest(
  input: BuildCubidIdentityAssertionRequestInput
): CubidPreparedRequest {
  const url = asUrlString(input.tokenEndpoint, "tokenEndpoint");
  const subjectTokenType = input.subjectTokenType ?? CUBID_ID_TOKEN_TOKEN_TYPE;

  if (
    subjectTokenType !== CUBID_ID_TOKEN_TOKEN_TYPE &&
    subjectTokenType !== CUBID_ACCESS_TOKEN_TOKEN_TYPE
  ) {
    throw new CubidAuthError("Cubid auth subject tokens must be a Cubid ID token or access token.", {
      category: "validation",
      code: "invalid_subject_token_type",
      raw: subjectTokenType,
    });
  }

  const audience = assertNonEmptyString(input.audience, "audience");
  if (/[\s#]/u.test(audience)) {
    throw new CubidAuthError("Cubid auth audience values cannot contain whitespace or fragments.", {
      category: "validation",
      code: "invalid_audience",
      raw: audience,
    });
  }

  const body = new URLSearchParams({
    audience,
    grant_type: CUBID_TOKEN_EXCHANGE_GRANT_TYPE,
    requested_token_type: CUBID_ID_JAG_TOKEN_TYPE,
    subject_token: assertNonEmptyString(input.subjectToken, "subjectToken"),
    subject_token_type: subjectTokenType,
  });

  const scopes = normalizeOptionalScopes(input.scope);
  if (scopes.length > 0) {
    body.set("scope", scopes.join(" "));
  }

  const headers: Record<string, string> = {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
  };
  applyClientAuthentication(body, headers, {
    clientAuthenticationMethod: input.clientAuthenticationMethod,
    clientId: assertNonEmptyString(input.clientId, "clientId"),
    clientSecret: assertNonEmptyString(input.clientSecret, "clientSecret"),
  });
  appendExtraParams(body, input.extraParams);

  return {
    body: body.toString(),
    init: {
      body: body.toString(),
      headers,
      method: "POST",
      signal: input.signal,
    },
    url,
  };
}

/**
 * Asks Cubid for an identity assertion. A `CubidAuthError` with code
 * `consent_required` means the person has not yet allowed this client to act
 * in that app; `getCubidCrossAppConsentResource` reads the `resource` value to
 * send through `buildCubidAuthorizationUrl` so they can.
 */
export async function requestCubidIdentityAssertion(
  input: RequestCubidIdentityAssertionInput
): Promise<CubidIdentityAssertionResponse> {
  const prepared = buildCubidIdentityAssertionRequest(input);
  const fetchImpl = getFetch(input.fetch);
  let response: Response;

  try {
    response = await fetchImpl(prepared.url, prepared.init);
  } catch (cause) {
    throw new CubidAuthError(
      "Cubid auth identity assertion request failed before a response was received.",
      {
        category: "network",
        code: "identity_assertion_request_failed",
        cause,
      }
    );
  }

  const payload = await readJsonResponse(response, "identity assertion response");

  if (!response.ok || typeof payload.error === "string") {
    throw new CubidAuthError(
      getOptionalString(payload, "error_description") ??
        "Cubid auth identity assertion request failed.",
      {
        category: "protocol",
        code: getOptionalString(payload, "error") ?? "identity_assertion_request_failed",
        raw: payload,
        status: response.status,
      }
    );
  }

  const issuedTokenType = getRequiredString(
    payload,
    "issued_token_type",
    "identity assertion response"
  );

  if (issuedTokenType !== CUBID_ID_JAG_TOKEN_TYPE) {
    throw new CubidAuthError("Cubid auth expected an identity assertion token type.", {
      category: "protocol",
      code: "unexpected_issued_token_type",
      raw: payload,
      status: response.status,
    });
  }

  const expiresIn = getOptionalNumber(payload, "expires_in", "identity assertion response");
  const issuedAt = Date.now();

  return {
    assertion: getRequiredString(payload, "access_token", "identity assertion response"),
    expiresAt: expiresIn === null ? null : issuedAt + expiresIn * 1000,
    expiresIn,
    issuedAt,
    issuedTokenType,
    raw: payload,
    scope: normalizeOptionalScopes(getOptionalString(payload, "scope") ?? undefined),
    tokenType: getOptionalString(payload, "token_type") ?? "N_A",
  };
}

/**
 * Lists the apps this confidential client is paired with, so its first Sign
 * in with Cubid request can name every one of them in `resources` and the
 * person approves them once. Server-side only: it carries the client secret.
 */
export async function listCubidCrossAppPairings(
  input: ListCubidCrossAppPairingsInput
): Promise<CubidCrossAppPairing[]> {
  const url = asUrlString(input.pairingsEndpoint, "pairingsEndpoint");
  const body = new URLSearchParams();
  const headers: Record<string, string> = {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
  };
  applyClientAuthentication(body, headers, {
    clientAuthenticationMethod: input.clientAuthenticationMethod,
    clientId: assertNonEmptyString(input.clientId, "clientId"),
    clientSecret: assertNonEmptyString(input.clientSecret, "clientSecret"),
  });

  const fetchImpl = getFetch(input.fetch);
  let response: Response;

  try {
    response = await fetchImpl(url, {
      body: body.toString(),
      headers,
      method: "POST",
      signal: input.signal,
    });
  } catch (cause) {
    throw new CubidAuthError("Cubid auth pairing listing failed before a response was received.", {
      category: "network",
      code: "pairing_listing_failed",
      cause,
    });
  }

  const payload = await readJsonResponse(response, "pairing listing response");

  if (!response.ok || typeof payload.error === "string") {
    throw new CubidAuthError(
      getOptionalString(payload, "error_description") ?? "Cubid auth pairing listing failed.",
      {
        category: "protocol",
        code: getOptionalString(payload, "error") ?? "pairing_listing_failed",
        raw: payload,
        status: response.status,
      }
    );
  }

  if (!Array.isArray(payload.pairings)) {
    throw new CubidAuthError("Cubid auth expected pairing listing response.pairings to be an array.", {
      category: "parse",
      code: "invalid_field",
      raw: payload,
    });
  }

  return payload.pairings.map((entry) => {
    const record = toRecord(entry, "pairing");
    return {
      allowedScopes: getOptionalStringArray(record, "allowed_scopes") ?? [],
      audience: getRequiredString(record, "audience", "pairing"),
      pairingId: getRequiredString(record, "pairing_id", "pairing"),
      resource: getRequiredString(record, "resource", "pairing"),
      resourceClientId: getRequiredString(record, "resource_client_id", "pairing"),
      resourceClientName: getOptionalString(record, "resource_client_name") ?? getRequiredString(record, "resource_client_id", "pairing"),
    };
  });
}

/** True when the error says the person has not consented to this cross-app access yet. */
export function isCubidCrossAppConsentRequired(error: unknown): error is CubidAuthError {
  return (
    error instanceof CubidAuthError &&
    error.code === CUBID_CROSS_APP_CONSENT_REQUIRED_ERROR
  );
}

/**
 * Reads the `resource` value named in a `consent_required` error description,
 * ready for `buildCubidAuthorizationUrl({ resources: [value] })`.
 */
export function getCubidCrossAppConsentResource(error: unknown): string | null {
  if (!isCubidCrossAppConsentRequired(error)) {
    return null;
  }

  const match = /resource=(\S+?)(?:[.,;]?\s|[.,;]?$)/u.exec(error.message);
  return match?.[1] ?? null;
}

/**
 * Prepares the RFC 7523 JWT bearer grant that redeems an identity assertion
 * at the resource app's own token endpoint. Client credentials are the ones
 * the requesting client holds at that app, when it requires them.
 */
export function buildCubidJwtBearerGrantRequest(
  input: BuildCubidJwtBearerGrantRequestInput
): CubidPreparedRequest {
  const url = asUrlString(input.tokenEndpoint, "tokenEndpoint");
  const body = new URLSearchParams({
    assertion: assertNonEmptyString(input.assertion, "assertion"),
    grant_type: CUBID_JWT_BEARER_GRANT_TYPE,
  });

  const scopes = normalizeOptionalScopes(input.scope);
  if (scopes.length > 0) {
    body.set("scope", scopes.join(" "));
  }

  const headers: Record<string, string> = {
    accept: "application/json",
    "content-type": "application/x-www-form-urlencoded",
  };
  applyClientAuthentication(body, headers, input);
  appendExtraParams(body, input.extraParams);

  return {
    body: body.toString(),
    init: {
      body: body.toString(),
      headers,
      method: "POST",
      signal: input.signal,
    },
    url,
  };
}

const IDENTITY_ASSERTION_LABEL = {
  code: "invalid_identity_assertion",
  fieldName: "assertion",
  name: "identity assertion",
};

export function decodeCubidIdentityAssertionClaims(
  assertion: string
): CubidIdentityAssertionClaims {
  return decodeCompactJwt(assertion, IDENTITY_ASSERTION_LABEL).payload as CubidIdentityAssertionClaims;
}

/**
 * Validates an identity assertion received at a resource app's token
 * endpoint: `typ`, issuer, audience, expiry, requesting client, and the
 * signature against Cubid's JWKS. The returned `sub` is this app's own
 * pairwise subject for the person. Replay protection on `jti` is the app's.
 */
export async function validateCubidIdentityAssertion(
  input: ValidateCubidIdentityAssertionInput
): Promise<CubidIdentityAssertionClaims> {
  const decoded = decodeCompactJwt(input.assertion, IDENTITY_ASSERTION_LABEL);
  const claims = decoded.payload as CubidIdentityAssertionClaims;
  const nowSeconds = input.nowSeconds ?? Math.floor(Date.now() / 1000);

  if (decoded.header.typ !== CUBID_ID_JAG_JWT_TYPE) {
    throw new CubidAuthError("The Cubid identity assertion did not carry the ID-JAG token type.", {
      category: "validation",
      code: "invalid_identity_assertion_type",
      raw: decoded.header,
    });
  }

  const expectedIssuer = normalizeIssuer(input.discoveryDocument.issuer);
  if (typeof claims.iss !== "string" || normalizeIssuer(claims.iss) !== expectedIssuer) {
    throw new CubidAuthError("The Cubid identity assertion issuer did not match discovery metadata.", {
      category: "validation",
      code: "invalid_issuer",
      raw: claims,
    });
  }

  const expectedAudience = assertNonEmptyString(input.audience, "audience");
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!audience.includes(expectedAudience)) {
    throw new CubidAuthError("The Cubid identity assertion audience did not match this app.", {
      category: "validation",
      code: "invalid_audience",
      raw: claims,
    });
  }

  if (typeof claims.exp !== "number" || !Number.isFinite(claims.exp)) {
    throw new CubidAuthError("The Cubid identity assertion expiration claim was missing or invalid.", {
      category: "validation",
      code: "invalid_expiration",
      raw: claims,
    });
  }

  if (claims.exp <= nowSeconds) {
    throw new CubidAuthError("The Cubid identity assertion has expired.", {
      category: "validation",
      code: "expired_identity_assertion",
      raw: claims,
    });
  }

  if (typeof claims.sub !== "string" || claims.sub.length === 0) {
    throw new CubidAuthError("The Cubid identity assertion did not name a subject.", {
      category: "validation",
      code: "missing_subject",
      raw: claims,
    });
  }

  if (typeof claims.client_id !== "string" || claims.client_id.length === 0) {
    throw new CubidAuthError("The Cubid identity assertion did not name the requesting client.", {
      category: "validation",
      code: "missing_client_id",
      raw: claims,
    });
  }

  if (input.acceptedClientIds && !input.acceptedClientIds.includes(claims.client_id)) {
    throw new CubidAuthError("The Cubid identity assertion came from a client this app does not accept.", {
      category: "validation",
      code: "unaccepted_client_id",
      raw: claims,
    });
  }

  if (typeof claims.jti !== "string" || claims.jti.length === 0) {
    throw new CubidAuthError("The Cubid identity assertion did not carry a JWT id.", {
      category: "validation",
      code: "missing_jti",
      raw: claims,
    });
  }

  await verifyCubidJwtSignature(decoded, input.discoveryDocument, input.fetch, {
    invalidSignatureCode: "invalid_identity_assertion_signature",
    name: "identity assertion",
    unsupportedAlgCode: "unsupported_identity_assertion_alg",
  });

  return claims;
}

const SECURITY_EVENT_LABEL = {
  code: "invalid_security_event_token",
  fieldName: "token",
  name: "Security Event Token",
};

function parseSecurityEvent(
  claims: Record<string, unknown>,
  clientId: string
): CubidSecurityEvent {
  const subject = claims.sub_id;
  if (
    !isRecord(subject) ||
    subject.format !== "iss_sub" ||
    typeof subject.iss !== "string" ||
    typeof subject.sub !== "string" ||
    subject.sub.length === 0
  ) {
    throw new CubidAuthError("The Cubid Security Event Token did not carry an iss_sub subject.", {
      category: "validation",
      code: "invalid_security_event_subject",
      raw: claims,
    });
  }

  const events = claims.events;
  if (!isRecord(events) || Object.keys(events).length !== 1) {
    throw new CubidAuthError("The Cubid Security Event Token must carry exactly one event.", {
      category: "validation",
      code: "invalid_security_event",
      raw: claims,
    });
  }

  const eventType = Object.keys(events)[0] as string;
  const eventPayload = events[eventType];
  const payload: Record<string, unknown> = isRecord(eventPayload) ? { ...eventPayload } : {};
  delete payload.subject;

  return {
    audience: clientId,
    eventType,
    issuedAt: typeof claims.iat === "number" && Number.isFinite(claims.iat) ? claims.iat : null,
    issuer: typeof claims.iss === "string" ? claims.iss : "",
    jti: typeof claims.jti === "string" && claims.jti.length > 0 ? claims.jti : null,
    payload,
    raw: claims,
    subject: { format: "iss_sub", iss: subject.iss, sub: subject.sub },
  };
}

export function isCubidSecurityEventType(value: unknown): value is CubidSecurityEventType {
  return (
    typeof value === "string" &&
    (Object.values(CUBID_SECURITY_EVENT_TYPES) as string[]).includes(value)
  );
}

/** Decodes a Security Event Token without verifying it. */
export function decodeCubidSecurityEventToken(token: string): CubidSecurityEvent {
  const decoded = decodeCompactJwt(token, SECURITY_EVENT_LABEL);
  const audience = Array.isArray(decoded.payload.aud) ? decoded.payload.aud[0] : decoded.payload.aud;
  return parseSecurityEvent(decoded.payload, typeof audience === "string" ? audience : "");
}

/**
 * Validates a Security Event Token Cubid pushed to this client's
 * `security_events_uri`: `typ`, issuer, audience, issued-at, subject shape,
 * and the signature against Cubid's JWKS. Answer any 2xx to acknowledge.
 */
export async function validateCubidSecurityEventToken(
  input: ValidateCubidSecurityEventTokenInput
): Promise<CubidSecurityEvent> {
  const decoded = decodeCompactJwt(input.token, SECURITY_EVENT_LABEL);
  const claims = decoded.payload as Record<string, unknown>;
  const nowSeconds = input.nowSeconds ?? Math.floor(Date.now() / 1000);

  if (decoded.header.typ !== CUBID_SECURITY_EVENT_JWT_TYPE) {
    throw new CubidAuthError("The Cubid Security Event Token did not carry the secevent token type.", {
      category: "validation",
      code: "invalid_security_event_token_type",
      raw: decoded.header,
    });
  }

  const expectedIssuer = normalizeIssuer(input.discoveryDocument.issuer);
  if (typeof claims.iss !== "string" || normalizeIssuer(claims.iss) !== expectedIssuer) {
    throw new CubidAuthError("The Cubid Security Event Token issuer did not match discovery metadata.", {
      category: "validation",
      code: "invalid_issuer",
      raw: claims,
    });
  }

  const clientId = assertNonEmptyString(input.clientId, "clientId");
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!audience.includes(clientId)) {
    throw new CubidAuthError("The Cubid Security Event Token audience did not include the client ID.", {
      category: "validation",
      code: "invalid_audience",
      raw: claims,
    });
  }

  if (typeof claims.iat !== "number" || !Number.isFinite(claims.iat)) {
    throw new CubidAuthError("The Cubid Security Event Token issued-at claim was missing or invalid.", {
      category: "validation",
      code: "invalid_issued_at",
      raw: claims,
    });
  }

  if (typeof input.maxAgeSeconds === "number" && nowSeconds - claims.iat > input.maxAgeSeconds) {
    throw new CubidAuthError("The Cubid Security Event Token is older than this app accepts.", {
      category: "validation",
      code: "stale_security_event_token",
      raw: claims,
    });
  }

  if (typeof claims.jti !== "string" || claims.jti.length === 0) {
    throw new CubidAuthError("The Cubid Security Event Token did not carry a JWT id.", {
      category: "validation",
      code: "missing_jti",
      raw: claims,
    });
  }

  const event = parseSecurityEvent(claims, clientId);

  if (normalizeIssuer(event.subject.iss) !== expectedIssuer) {
    throw new CubidAuthError("The Cubid Security Event Token subject issuer did not match the issuer.", {
      category: "validation",
      code: "invalid_security_event_subject",
      raw: claims,
    });
  }

  await verifyCubidJwtSignature(decoded, input.discoveryDocument, input.fetch, {
    invalidSignatureCode: "invalid_security_event_token_signature",
    name: "Security Event Token",
    unsupportedAlgCode: "unsupported_security_event_token_alg",
  });

  return event;
}
