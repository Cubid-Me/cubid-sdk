export const CUBID_PRODUCTION_ISSUER = "https://id.cubid.me";
export const CUBID_STAGING_ISSUER = "https://staging-id.cubid.me";
export const CUBID_DEFAULT_OIDC_SCOPES = ["openid", "email", "profile"] as const;
export const CUBID_AUTH_SESSION_STORAGE_KEY = "cubid.auth.session";

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

export interface CubidPkcePair {
  codeChallenge: string;
  codeChallengeMethod: "S256";
  codeVerifier: string;
}

export interface CreateCubidPkcePairOptions {
  verifierByteLength?: number;
}

export interface BuildCubidAuthorizationUrlInput {
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
  name?: string;
  preferred_username?: string;
  sub: string;
  [key: string]: unknown;
}

export interface CubidIdTokenClaims extends Record<string, unknown> {
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
    signedData: textEncoder.encode(`${encodedHeader}.${encodedPayload}`),
  };
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

  appendExtraParams(url.searchParams, input.extraParams);

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
