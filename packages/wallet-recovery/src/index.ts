import {
  CubidApiError,
  CubidRecoverableWalletError,
  type CubidRecoverableWalletErrorCode,
} from "@cubid/core";

export type CubidWalletRecoveryFetch = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

export type CubidWalletRecoveryTokenProvider = () => Promise<string> | string;

export interface CubidWalletRecoveryClientOptions {
  accessToken?: string;
  baseUrl: string | URL;
  fetch?: CubidWalletRecoveryFetch;
  getAccessToken?: CubidWalletRecoveryTokenProvider;
  headers?: HeadersInit;
}

export interface CubidBuildHostedRecoveryUrlInput {
  passportOrigin?: string | URL;
  recoverySessionId: string;
}

export interface CubidCompleteRecoveryBundleReleaseInput {
  accessToken?: string;
  recoverySessionId: string;
  signal?: AbortSignal;
}

export interface CubidRecoveryReleaseSummary {
  dappUserUuid: string | null;
  providerKey: string | null;
  raw: Record<string, unknown>;
  recoveryBundleId: string | null;
  recoverySessionId: string | null;
  releasedAt: string | null;
  status: string | null;
}

export interface CubidCompleteRecoveryBundleReleaseResponse {
  bundleMaterial: string;
  raw: Record<string, unknown>;
  release: CubidRecoveryReleaseSummary;
  requestId: string | null;
}

export interface CubidWalletRecoveryClient {
  readonly config: Readonly<{
    baseUrl: string;
    headers: Headers;
  }>;
  buildHostedRecoveryUrl(input: CubidBuildHostedRecoveryUrlInput): string;
  completeRelease(
    input: CubidCompleteRecoveryBundleReleaseInput
  ): Promise<CubidCompleteRecoveryBundleReleaseResponse>;
}

const RECOVERY_FORBIDDEN_RAW_KEYS = new Set([
  "auth_tag",
  "bundle_auth_tag",
  "bundle_ciphertext",
  "bundle_iv",
  "bundle_material",
  "bundleMaterial",
  "ciphertext",
  "encrypted_bundle_material",
  "encryptedBundleMaterial",
  "encrypted_recovery_material",
  "encryptedRecoveryMaterial",
  "encryption_context",
  "encryption_key_id",
  "iv",
  "raw_cubid_user_id",
  "rawCubidUserId",
  "service_role",
  "vault_metadata",
  "vaultMetadata",
  "wrapped_data_key",
  "wrappedDataKey",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function sanitizeRaw(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeRaw(item));
  }

  if (!isRecord(value)) {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key]) => !RECOVERY_FORBIDDEN_RAW_KEYS.has(key))
      .map(([key, child]) => [key, sanitizeRaw(child)])
  );
}

function sanitizeRecord(record: Record<string, unknown>): Record<string, unknown> {
  return sanitizeRaw(record) as Record<string, unknown>;
}

function assertNonEmptyString(
  value: string | URL | undefined,
  fieldName: string,
  endpoint: string
): string {
  const resolved = value instanceof URL ? value.toString() : value;
  const trimmed = typeof resolved === "string" ? resolved.trim() : "";

  if (trimmed.length === 0) {
    throw new CubidApiError({
      category: "validation",
      code: "INVALID_ARGUMENT",
      endpoint,
      message: `Cubid wallet recovery requires ${fieldName} for ${endpoint}.`,
    });
  }

  return trimmed;
}

function normalizeBaseUrl(baseUrl: string | URL): string {
  const value = assertNonEmptyString(baseUrl, "baseUrl", "wallet-recovery");

  try {
    const parsed = new URL(value);
    const isLoopbackHost =
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "[::1]";

    if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && isLoopbackHost)) {
      throw new CubidApiError({
        category: "config",
        code: "INVALID_BASE_URL",
        endpoint: "wallet-recovery",
        message:
          "Cubid wallet recovery requires an https Passport URL, with http allowed only for localhost development.",
      });
    }

    parsed.pathname = parsed.pathname.replace(/\/+$/u, "");
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/+$/u, "");
  } catch (error) {
    if (error instanceof CubidApiError) {
      throw error;
    }

    throw new CubidApiError({
      category: "config",
      code: "INVALID_BASE_URL",
      details: error,
      endpoint: "wallet-recovery",
      message: "Cubid wallet recovery requires a valid Passport baseUrl.",
    });
  }
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function assertRecord(
  value: unknown,
  fieldName: string,
  endpoint: string
): Record<string, unknown> {
  if (!isRecord(value)) {
    throw new CubidApiError({
      category: "upstream",
      code: "MALFORMED_RESPONSE",
      endpoint,
      message: `Cubid wallet recovery expected ${fieldName} to be an object.`,
    });
  }

  return value;
}

function getRequestId(response: Response, payload: Record<string, unknown>): string | null {
  const headerRequestId = response.headers.get("x-request-id");
  if (headerRequestId) {
    return headerRequestId;
  }

  const error = isRecord(payload.error) ? payload.error : null;
  return asString(error?.requestId);
}

function normalizeReleaseSummary(
  payload: Record<string, unknown>
): CubidRecoveryReleaseSummary {
  return {
    dappUserUuid:
      asString(payload.dappUserUuid) ?? asString(payload.dapp_user_uuid),
    providerKey:
      asString(payload.providerKey) ?? asString(payload.provider_key),
    raw: sanitizeRecord(payload),
    recoveryBundleId:
      asString(payload.recoveryBundleId) ??
      asString(payload.recovery_bundle_id),
    recoverySessionId:
      asString(payload.recoverySessionId) ??
      asString(payload.recovery_session_id),
    releasedAt: asString(payload.releasedAt) ?? asString(payload.released_at),
    status: asString(payload.status),
  };
}

async function readJson(response: Response, endpoint: string): Promise<Record<string, unknown>> {
  try {
    return assertRecord(await response.json(), "response", endpoint);
  } catch (error) {
    if (error instanceof CubidApiError) {
      throw error;
    }

    throw new CubidApiError({
      category: "upstream",
      code: "INVALID_JSON",
      details: error,
      endpoint,
      message: `Cubid wallet recovery returned invalid JSON for ${endpoint}.`,
      status: response.status,
    });
  }
}

function createRecoveryError(
  response: Response,
  payload: Record<string, unknown>,
  endpoint: string,
  requestId: string | null
): CubidRecoverableWalletError {
  const errorPayload = isRecord(payload.error) ? payload.error : {};
  const code = asString(errorPayload.code);
  const message =
    asString(errorPayload.message) ??
    code ??
    `Cubid wallet recovery request failed for ${endpoint}.`;
  const category =
    response.status === 401 || response.status === 403 ? "auth" : "upstream";

  return new CubidRecoverableWalletError({
    category,
    code: code ?? undefined,
    details: sanitizeRecord(payload),
    endpoint,
    message,
    recoveryCode: code as CubidRecoverableWalletErrorCode | null,
    requestId,
    status: response.status,
  });
}

async function resolveAccessToken(
  options: CubidWalletRecoveryClientOptions,
  override: string | undefined,
  endpoint: string
): Promise<string> {
  if (override !== undefined) {
    return assertNonEmptyString(override, "accessToken", endpoint);
  }

  if (options.accessToken !== undefined) {
    return assertNonEmptyString(options.accessToken, "accessToken", endpoint);
  }

  if (options.getAccessToken) {
    return assertNonEmptyString(
      await options.getAccessToken(),
      "accessToken",
      endpoint
    );
  }

  throw new CubidApiError({
    category: "config",
    code: "MISSING_ACCESS_TOKEN",
    endpoint,
    message:
      "Cubid wallet recovery requires accessToken or getAccessToken for user-authenticated recovery routes.",
  });
}

async function requestUserRoute(
  fetchImpl: CubidWalletRecoveryFetch,
  options: CubidWalletRecoveryClientOptions,
  config: { baseUrl: string; headers: Headers },
  endpointPath: string,
  endpoint: string,
  input: {
    accessToken?: string;
    body: Record<string, unknown>;
    signal?: AbortSignal;
  }
): Promise<{ payload: Record<string, unknown>; requestId: string | null }> {
  const accessToken = await resolveAccessToken(options, input.accessToken, endpoint);
  const headers = new Headers(config.headers);
  headers.set("authorization", `Bearer ${accessToken}`);
  headers.set("content-type", "application/json");

  let response: Response;
  try {
    response = await fetchImpl(`${config.baseUrl}${endpointPath}`, {
      body: JSON.stringify(input.body),
      headers,
      method: "POST",
      signal: input.signal,
    });
  } catch (error) {
    throw new CubidApiError({
      category: "upstream",
      code: "REQUEST_FAILED",
      details: error,
      endpoint,
      message:
        "Cubid wallet recovery request failed before receiving a response.",
    });
  }

  const payload = await readJson(response, endpoint);
  const requestId = getRequestId(response, payload);

  if (!response.ok) {
    throw createRecoveryError(response, payload, endpoint, requestId);
  }

  return { payload, requestId };
}

export function buildHostedRecoveryUrl(
  input: CubidBuildHostedRecoveryUrlInput
): string {
  const recoverySessionId = assertNonEmptyString(
    input.recoverySessionId,
    "recoverySessionId",
    "recovery/wallet"
  );
  const origin = normalizeBaseUrl(input.passportOrigin ?? "https://passport.cubid.me");
  const url = new URL("/recovery/wallet", origin);
  url.searchParams.set("recovery_session_id", recoverySessionId);
  return url.toString();
}

export function createCubidWalletRecoveryClient(
  options: CubidWalletRecoveryClientOptions
): CubidWalletRecoveryClient {
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const headers = new Headers(options.headers);
  const fetchImpl = options.fetch ?? globalThis.fetch;

  if (!fetchImpl) {
    throw new CubidApiError({
      category: "config",
      code: "MISSING_FETCH",
      endpoint: "wallet-recovery",
      message:
        "Cubid wallet recovery requires fetch support or an explicit fetch implementation.",
    });
  }

  return {
    buildHostedRecoveryUrl(input) {
      return buildHostedRecoveryUrl({
        passportOrigin: input.passportOrigin ?? baseUrl,
        recoverySessionId: input.recoverySessionId,
      });
    },
    async completeRelease(input) {
      const recoverySessionId = assertNonEmptyString(
        input.recoverySessionId,
        "recoverySessionId",
        "recovery-bundles/release/complete"
      );
      const { payload, requestId } = await requestUserRoute(
        fetchImpl,
        options,
        { baseUrl, headers },
        "/api/recovery-bundles/release/complete",
        "recovery-bundles/release/complete",
        {
          accessToken: input.accessToken,
          body: { recovery_session_id: recoverySessionId },
          signal: input.signal,
        }
      );
      const data = assertRecord(
        payload.data,
        "data",
        "recovery-bundles/release/complete"
      );
      const bundleMaterial = assertNonEmptyString(
        asString(data.bundleMaterial) ?? asString(data.bundle_material) ?? "",
        "bundleMaterial",
        "recovery-bundles/release/complete"
      );

      return {
        bundleMaterial,
        raw: sanitizeRecord(payload),
        release: normalizeReleaseSummary(data),
        requestId,
      };
    },
    config: Object.freeze({
      baseUrl,
      headers,
    }),
  };
}
