export type CubidCommsFetch = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

export type CubidCommsErrorCategory =
  | "auth"
  | "config"
  | "network"
  | "parse"
  | "unknown"
  | "upstream"
  | "validation";

export interface CubidCommsErrorInput {
  category: CubidCommsErrorCategory;
  code?: string | null;
  cause?: unknown;
  message: string;
  raw?: unknown;
  requestId?: string | null;
  status?: number | null;
}

export class CubidCommsError extends Error {
  readonly category: CubidCommsErrorCategory;
  readonly code: string | null;
  readonly raw: unknown;
  readonly requestId: string | null;
  readonly status: number | null;

  constructor(input: CubidCommsErrorInput) {
    super(input.message, input.cause ? { cause: input.cause } : undefined);
    this.name = "CubidCommsError";
    this.category = input.category;
    this.code = input.code ?? null;
    this.raw = input.raw ?? null;
    this.requestId = input.requestId ?? null;
    this.status = input.status ?? null;
  }
}

export interface CubidCommsClientOptions {
  /**
   * Passport origin, for example `https://id.cubid.me`.
   */
  baseUrl: string | URL;
  /**
   * Passport-user bearer token. This is a signed-in user credential, not a
   * Cubid dapp API key.
   */
  accessToken: string;
  /**
   * Optional fetch implementation for tests or custom runtimes.
   */
  fetch?: CubidCommsFetch;
  /**
   * Optional caller-owned headers for tracing or instrumentation.
   */
  headers?: HeadersInit;
}

export interface ResolvedCubidCommsClientOptions {
  accessToken: string;
  baseUrl: string;
  headers: Headers;
}

export type CubidNotificationChannelType = "email" | "telegram" | string;
export type CubidNotificationSetupChannelType = "email" | "telegram";
export const CUBID_NOTIFICATION_CATEGORIES = [
  "SECURITY",
  "TRANSACTIONAL",
  "WORKFLOW",
] as const;

export type CubidNotificationChannelStatus =
  | "active"
  | "muted"
  | "paused"
  | "revoked"
  | string;

export type CubidNotificationVerificationStatus =
  | "pending"
  | "verified"
  | "revoked"
  | string;

export interface CubidNotificationChannelSummary {
  channelId: string;
  channelType: CubidNotificationChannelType;
  createdAt: string | null;
  displayHint: string | null;
  isDefault: boolean;
  label: string | null;
  providerKey: string | null;
  raw: Record<string, unknown>;
  status: CubidNotificationChannelStatus | null;
  updatedAt: string | null;
  verificationStatus: CubidNotificationVerificationStatus | null;
  verifiedAt: string | null;
}

export interface CubidListNotificationChannelsInput {
  signal?: AbortSignal;
}

export interface CubidListNotificationChannelsResponse {
  channels: CubidNotificationChannelSummary[];
  raw: Record<string, unknown>;
  requestId: string | null;
}

export interface CubidUpdateNotificationChannelInput {
  channelId: string;
  isDefault?: boolean;
  label?: string | null;
  signal?: AbortSignal;
  status?: CubidNotificationChannelStatus;
}

export interface CubidUpdateNotificationChannelResponse {
  channel: CubidNotificationChannelSummary;
  raw: Record<string, unknown>;
  requestId: string | null;
}

export interface CubidStartNotificationChannelVerificationInput {
  channelType: CubidNotificationSetupChannelType;
  destination: string;
  isDefault?: boolean;
  label?: string | null;
  signal?: AbortSignal;
}

export interface CubidNotificationVerificationChallenge {
  challengeId: string;
  expiresAt: string | null;
  maxAttempts: number | null;
  providerKey: string | null;
  setupCode: string | null;
  setupInstructions: string | null;
}

export interface CubidStartNotificationChannelVerificationResponse {
  challenge: CubidNotificationVerificationChallenge;
  channel: CubidNotificationChannelSummary;
  raw: Record<string, unknown>;
  requestId: string | null;
}

export interface CubidCompleteNotificationChannelVerificationInput {
  challengeId: string;
  code: string;
  signal?: AbortSignal;
}

export interface CubidCompleteNotificationChannelVerificationResponse {
  channel: CubidNotificationChannelSummary;
  raw: Record<string, unknown>;
  requestId: string | null;
}

export type CubidNotificationCategoryKey =
  (typeof CUBID_NOTIFICATION_CATEGORIES)[number];

export type CubidNotificationPriorityFloor =
  | "LOW"
  | "NORMAL"
  | "HIGH"
  | "CRITICAL";

export interface CubidNotificationPreferenceSummary {
  categoryKey: CubidNotificationCategoryKey | string;
  channelId: string | null;
  createdAt: string | null;
  dappId: string | null;
  mutedUntil: string | null;
  pausedUntil: string | null;
  preferenceId: string;
  priorityFloor: CubidNotificationPriorityFloor | string | null;
  raw: Record<string, unknown>;
  status: CubidNotificationChannelStatus | null;
  updatedAt: string | null;
}

export type CubidNotificationGrantStatus = "active" | "revoked" | "expired" | string;

export interface CubidNotificationAllowPageGrantSummary {
  categoryKey: CubidNotificationCategoryKey | string;
  dappId: string | null;
  dappName: string | null;
  dappUserUuid: string | null;
  expiresAt: string | null;
  grantId: string;
  grantedAt: string | null;
  raw: Record<string, unknown>;
  revokedAt: string | null;
  status: CubidNotificationGrantStatus | null;
  updatedAt: string | null;
}

export interface CubidListNotificationPreferencesInput {
  signal?: AbortSignal;
}

export interface CubidListNotificationPreferencesResponse {
  preferences: CubidNotificationPreferenceSummary[];
  raw: Record<string, unknown>;
  requestId: string | null;
}

export interface CubidUpdateNotificationPreferenceInput {
  categoryKey: CubidNotificationCategoryKey;
  channelId?: string | null;
  mutedUntil?: string | null;
  pausedUntil?: string | null;
  priorityFloor?: CubidNotificationPriorityFloor;
  signal?: AbortSignal;
  status?: CubidNotificationChannelStatus;
}

export interface CubidUpdateNotificationPreferenceResponse {
  preference: CubidNotificationPreferenceSummary;
  raw: Record<string, unknown>;
  requestId: string | null;
}

export interface CubidCommsClient {
  readonly config: Readonly<ResolvedCubidCommsClientOptions>;
  readonly channels: {
    completeVerification(
      input: CubidCompleteNotificationChannelVerificationInput
    ): Promise<CubidCompleteNotificationChannelVerificationResponse>;
    list(
      input?: CubidListNotificationChannelsInput
    ): Promise<CubidListNotificationChannelsResponse>;
    startVerification(
      input: CubidStartNotificationChannelVerificationInput
    ): Promise<CubidStartNotificationChannelVerificationResponse>;
    update(
      input: CubidUpdateNotificationChannelInput
    ): Promise<CubidUpdateNotificationChannelResponse>;
  };
  readonly preferences: {
    list(
      input?: CubidListNotificationPreferencesInput
    ): Promise<CubidListNotificationPreferencesResponse>;
    update(
      input: CubidUpdateNotificationPreferenceInput
    ): Promise<CubidUpdateNotificationPreferenceResponse>;
  };
}

function assertNonEmptyString(
  value: string,
  fieldName: string,
  endpoint: string
): string {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    throw new CubidCommsError({
      category: "validation",
      code: "INVALID_ARGUMENT",
      message: `Cubid comms requires ${fieldName} for ${endpoint}.`,
    });
  }

  return trimmed;
}

function normalizeBaseUrl(baseUrl: string | URL): string {
  const resolved = typeof baseUrl === "string" ? baseUrl : baseUrl.toString();
  const trimmed = assertNonEmptyString(resolved, "baseUrl", "comms-client");

  try {
    const parsed = new URL(trimmed);
    parsed.pathname = parsed.pathname.replace(/\/+$/u, "");
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/+$/u, "");
  } catch (error) {
    throw new CubidCommsError({
      category: "config",
      code: "INVALID_BASE_URL",
      cause: error,
      message: "Cubid comms requires a valid Passport baseUrl.",
      raw: trimmed,
    });
  }
}

function getOptionalString(
  value: unknown,
  fieldName: string,
  endpoint: string
): string | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== "string") {
    throw new CubidCommsError({
      category: "parse",
      code: "MALFORMED_RESPONSE",
      message: `Cubid comms expected ${fieldName} to be a string in ${endpoint}.`,
      raw: value,
    });
  }

  return value;
}

function getOptionalBoolean(
  value: unknown,
  fieldName: string,
  endpoint: string
): boolean | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== "boolean") {
    throw new CubidCommsError({
      category: "parse",
      code: "MALFORMED_RESPONSE",
      message: `Cubid comms expected ${fieldName} to be a boolean in ${endpoint}.`,
      raw: value,
    });
  }

  return value;
}

function getOptionalNumber(
  value: unknown,
  fieldName: string,
  endpoint: string
): number | null {
  if (value === undefined || value === null) {
    return null;
  }

  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new CubidCommsError({
      category: "parse",
      code: "MALFORMED_RESPONSE",
      message: `Cubid comms expected ${fieldName} to be a number in ${endpoint}.`,
      raw: value,
    });
  }

  return value;
}

function assertRecord(
  value: unknown,
  fieldName: string,
  endpoint: string
): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new CubidCommsError({
      category: "parse",
      code: "MALFORMED_RESPONSE",
      message: `Cubid comms expected ${fieldName} to be an object in ${endpoint}.`,
      raw: value,
    });
  }

  return value as Record<string, unknown>;
}

async function readJsonResponse(
  response: Response,
  endpoint: string
): Promise<Record<string, unknown>> {
  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch (error) {
    throw new CubidCommsError({
      category: "parse",
      code: "INVALID_JSON",
      cause: error,
      message: `Cubid comms returned invalid JSON for ${endpoint}.`,
      status: response.status,
    });
  }

  return assertRecord(payload, "response", endpoint);
}

function getRequestId(response: Response, payload: Record<string, unknown>): string | null {
  const headerRequestId = response.headers.get("x-request-id");

  if (headerRequestId) {
    return headerRequestId;
  }

  const errorPayload = payload.error;

  if (
    errorPayload &&
    typeof errorPayload === "object" &&
    !Array.isArray(errorPayload) &&
    "requestId" in errorPayload &&
    typeof errorPayload.requestId === "string"
  ) {
    return errorPayload.requestId;
  }

  return null;
}

function normalizeChannelSummary(
  payload: Record<string, unknown>,
  endpoint: string
): CubidNotificationChannelSummary {
  const channelId = assertNonEmptyString(
    getOptionalString(payload.channelId, "channelId", endpoint) ?? "",
    "channelId",
    endpoint
  );
  const channelType = assertNonEmptyString(
    getOptionalString(payload.channelType, "channelType", endpoint) ?? "",
    "channelType",
    endpoint
  );

  return {
    channelId,
    channelType,
    createdAt: getOptionalString(payload.createdAt, "createdAt", endpoint),
    displayHint: getOptionalString(payload.displayHint, "displayHint", endpoint),
    isDefault:
      getOptionalBoolean(payload.isDefault, "isDefault", endpoint) ?? false,
    label: getOptionalString(payload.label, "label", endpoint),
    providerKey: getOptionalString(payload.providerKey, "providerKey", endpoint),
    raw: payload,
    status: getOptionalString(payload.status, "status", endpoint),
    updatedAt: getOptionalString(payload.updatedAt, "updatedAt", endpoint),
    verificationStatus: getOptionalString(
      payload.verificationStatus,
      "verificationStatus",
      endpoint
    ),
    verifiedAt: getOptionalString(payload.verifiedAt, "verifiedAt", endpoint),
  };
}

function normalizeVerificationChallenge(
  payload: Record<string, unknown>,
  endpoint: string
): CubidNotificationVerificationChallenge {
  return {
    challengeId: assertNonEmptyString(
      getOptionalString(payload.challengeId, "challengeId", endpoint) ?? "",
      "challengeId",
      endpoint
    ),
    expiresAt: getOptionalString(payload.expiresAt, "expiresAt", endpoint),
    maxAttempts: getOptionalNumber(payload.maxAttempts, "maxAttempts", endpoint),
    providerKey: getOptionalString(payload.providerKey, "providerKey", endpoint),
    setupCode: getOptionalString(payload.setupCode, "setupCode", endpoint),
    setupInstructions: getOptionalString(
      payload.setupInstructions,
      "setupInstructions",
      endpoint
    ),
  };
}

function normalizePreferenceSummary(
  payload: Record<string, unknown>,
  endpoint: string
): CubidNotificationPreferenceSummary {
  return {
    categoryKey: assertNonEmptyString(
      getOptionalString(payload.categoryKey, "categoryKey", endpoint) ?? "",
      "categoryKey",
      endpoint
    ),
    channelId: getOptionalString(payload.channelId, "channelId", endpoint),
    createdAt: getOptionalString(payload.createdAt, "createdAt", endpoint),
    dappId: getOptionalString(payload.dappId, "dappId", endpoint),
    mutedUntil: getOptionalString(payload.mutedUntil, "mutedUntil", endpoint),
    pausedUntil: getOptionalString(payload.pausedUntil, "pausedUntil", endpoint),
    preferenceId: assertNonEmptyString(
      getOptionalString(payload.preferenceId, "preferenceId", endpoint) ?? "",
      "preferenceId",
      endpoint
    ),
    priorityFloor: getOptionalString(
      payload.priorityFloor,
      "priorityFloor",
      endpoint
    ),
    raw: payload,
    status: getOptionalString(payload.status, "status", endpoint),
    updatedAt: getOptionalString(payload.updatedAt, "updatedAt", endpoint),
  };
}

export function getActiveNotificationCategoryGrants(
  grants: readonly CubidNotificationAllowPageGrantSummary[]
): CubidNotificationCategoryKey[] {
  return grants
    .filter((grant) => grant.status === "active")
    .map((grant) => grant.categoryKey)
    .filter((category): category is CubidNotificationCategoryKey =>
      CUBID_NOTIFICATION_CATEGORIES.includes(
        category as CubidNotificationCategoryKey
      )
    );
}

export function hasNotificationCategoryGrant(
  grants: readonly CubidNotificationAllowPageGrantSummary[],
  categoryKey: CubidNotificationCategoryKey
): boolean {
  return grants.some(
    (grant) => grant.categoryKey === categoryKey && grant.status === "active"
  );
}

async function requestPassportUserRoute(
  fetchImpl: CubidCommsFetch,
  config: ResolvedCubidCommsClientOptions,
  endpointPath: string,
  endpointName: string,
  input: {
    body: Record<string, unknown>;
    signal?: AbortSignal;
  }
): Promise<{
  payload: Record<string, unknown>;
  requestId: string | null;
}> {
  const url = `${config.baseUrl}${endpointPath}`;
  const headers = new Headers(config.headers);
  headers.set("authorization", `Bearer ${config.accessToken}`);
  headers.set("content-type", "application/json");

  let response: Response;

  try {
    response = await fetchImpl(url, {
      body: JSON.stringify(input.body),
      headers,
      method: "POST",
      signal: input.signal,
    });
  } catch (error) {
    throw new CubidCommsError({
      category: "network",
      code: "REQUEST_FAILED",
      cause: error,
      message: `Cubid comms request failed before a response was received for ${endpointName}.`,
    });
  }

  const payload = await readJsonResponse(response, endpointName);
  const requestId = getRequestId(response, payload);

  if (!response.ok) {
    const errorPayload = assertRecord(payload.error, "error", endpointName);
    throw new CubidCommsError({
      category: response.status === 401 ? "auth" : "upstream",
      code: getOptionalString(errorPayload.code, "error.code", endpointName),
      message:
        getOptionalString(errorPayload.message, "error.message", endpointName) ??
        `Cubid comms request failed for ${endpointName}.`,
      raw: payload,
      requestId,
      status: response.status,
    });
  }

  return {
    payload,
    requestId,
  };
}

export function createCubidCommsClient(
  options: CubidCommsClientOptions
): CubidCommsClient {
  const accessToken = assertNonEmptyString(
    options.accessToken,
    "accessToken",
    "comms-client"
  );
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const headers = new Headers(options.headers);
  const fetchImpl = options.fetch ?? fetch;

  return {
    channels: {
      async completeVerification(input) {
        const challengeId = assertNonEmptyString(
          input.challengeId,
          "challengeId",
          "notifications/channels/complete-verification"
        );
        const code = assertNonEmptyString(
          input.code,
          "code",
          "notifications/channels/complete-verification"
        );

        const { payload, requestId } = await requestPassportUserRoute(
          fetchImpl,
          {
            accessToken,
            baseUrl,
            headers,
          },
          "/api/notifications/channels/complete-verification",
          "notifications/channels/complete-verification",
          {
            body: {
              challengeId,
              code,
            },
            signal: input.signal,
          }
        );

        return {
          channel: normalizeChannelSummary(
            assertRecord(
              payload.data,
              "data",
              "notifications/channels/complete-verification"
            ),
            "notifications/channels/complete-verification"
          ),
          raw: payload,
          requestId,
        };
      },

      async list(input = {}) {
        const { payload, requestId } = await requestPassportUserRoute(
          fetchImpl,
          {
            accessToken,
            baseUrl,
            headers,
          },
          "/api/notifications/channels/list",
          "notifications/channels/list",
          {
            body: {},
            signal: input.signal,
          }
        );
        const data = payload.data;

        if (!Array.isArray(data)) {
          throw new CubidCommsError({
            category: "parse",
            code: "MALFORMED_RESPONSE",
            message:
              "Cubid comms expected an array of channels from notifications/channels/list.",
            raw: payload,
            requestId,
          });
        }

        return {
          channels: data.map((item, index) =>
            normalizeChannelSummary(
              assertRecord(
                item,
                `data[${String(index)}]`,
                "notifications/channels/list"
              ),
              "notifications/channels/list"
            )
          ),
          raw: payload,
          requestId,
        };
      },

      async startVerification(input) {
        const channelType = assertNonEmptyString(
          input.channelType,
          "channelType",
          "notifications/channels/start-verification"
        ) as CubidNotificationSetupChannelType;
        const destination = assertNonEmptyString(
          input.destination,
          "destination",
          "notifications/channels/start-verification"
        );
        const label =
          input.label === undefined ? undefined : input.label?.trim() ?? null;

        const { payload, requestId } = await requestPassportUserRoute(
          fetchImpl,
          {
            accessToken,
            baseUrl,
            headers,
          },
          "/api/notifications/channels/start-verification",
          "notifications/channels/start-verification",
          {
            body: {
              channelType,
              destination,
              isDefault: input.isDefault,
              label,
            },
            signal: input.signal,
          }
        );
        const data = assertRecord(
          payload.data,
          "data",
          "notifications/channels/start-verification"
        );

        return {
          challenge: normalizeVerificationChallenge(
            assertRecord(
              data.challenge,
              "data.challenge",
              "notifications/channels/start-verification"
            ),
            "notifications/channels/start-verification"
          ),
          channel: normalizeChannelSummary(
            assertRecord(
              data.channel,
              "data.channel",
              "notifications/channels/start-verification"
            ),
            "notifications/channels/start-verification"
          ),
          raw: payload,
          requestId,
        };
      },

      async update(input) {
        const channelId = assertNonEmptyString(
          input.channelId,
          "channelId",
          "notifications/channels/update"
        );
        const nextLabel =
          input.label === undefined ? undefined : input.label?.trim() ?? null;

        if (
          input.isDefault === undefined &&
          nextLabel === undefined &&
          input.status === undefined
        ) {
          throw new CubidCommsError({
            category: "validation",
            code: "INVALID_ARGUMENT",
            message:
              "Cubid comms requires at least one channel update field for notifications/channels/update.",
          });
        }

        const body: Record<string, unknown> = {
          channelId,
        };

        if (input.isDefault !== undefined) {
          body.isDefault = input.isDefault;
        }
        if (nextLabel !== undefined) {
          body.label = nextLabel;
        }
        if (input.status !== undefined) {
          body.status = assertNonEmptyString(
            input.status,
            "status",
            "notifications/channels/update"
          );
        }

        const { payload, requestId } = await requestPassportUserRoute(
          fetchImpl,
          {
            accessToken,
            baseUrl,
            headers,
          },
          "/api/notifications/channels/update",
          "notifications/channels/update",
          {
            body,
            signal: input.signal,
          }
        );

        return {
          channel: normalizeChannelSummary(
            assertRecord(payload.data, "data", "notifications/channels/update"),
            "notifications/channels/update"
          ),
          raw: payload,
          requestId,
        };
      },
    },
    preferences: {
      async list(input = {}) {
        const { payload, requestId } = await requestPassportUserRoute(
          fetchImpl,
          {
            accessToken,
            baseUrl,
            headers,
          },
          "/api/notifications/preferences/list",
          "notifications/preferences/list",
          {
            body: {},
            signal: input.signal,
          }
        );
        const data = payload.data;

        if (!Array.isArray(data)) {
          throw new CubidCommsError({
            category: "parse",
            code: "MALFORMED_RESPONSE",
            message:
              "Cubid comms expected an array of preferences from notifications/preferences/list.",
            raw: payload,
            requestId,
          });
        }

        return {
          preferences: data.map((item, index) =>
            normalizePreferenceSummary(
              assertRecord(
                item,
                `data[${String(index)}]`,
                "notifications/preferences/list"
              ),
              "notifications/preferences/list"
            )
          ),
          raw: payload,
          requestId,
        };
      },

      async update(input) {
        const categoryKey = assertNonEmptyString(
          input.categoryKey,
          "categoryKey",
          "notifications/preferences/update"
        ) as CubidNotificationCategoryKey;

        if (
          input.channelId === undefined &&
          input.priorityFloor === undefined &&
          input.status === undefined &&
          input.mutedUntil === undefined &&
          input.pausedUntil === undefined
        ) {
          throw new CubidCommsError({
            category: "validation",
            code: "INVALID_ARGUMENT",
            message:
              "Cubid comms requires at least one preference update field for notifications/preferences/update.",
          });
        }

        const body: Record<string, unknown> = {
          categoryKey,
        };

        if (input.channelId !== undefined) {
          body.channelId = input.channelId?.trim() ?? null;
        }
        if (input.priorityFloor !== undefined) {
          body.priorityFloor = assertNonEmptyString(
            input.priorityFloor,
            "priorityFloor",
            "notifications/preferences/update"
          );
        }
        if (input.status !== undefined) {
          body.status = assertNonEmptyString(
            input.status,
            "status",
            "notifications/preferences/update"
          );
        }
        if (input.mutedUntil !== undefined) {
          body.mutedUntil = input.mutedUntil;
        }
        if (input.pausedUntil !== undefined) {
          body.pausedUntil = input.pausedUntil;
        }

        const { payload, requestId } = await requestPassportUserRoute(
          fetchImpl,
          {
            accessToken,
            baseUrl,
            headers,
          },
          "/api/notifications/preferences/update",
          "notifications/preferences/update",
          {
            body,
            signal: input.signal,
          }
        );

        return {
          preference: normalizePreferenceSummary(
            assertRecord(
              payload.data,
              "data",
              "notifications/preferences/update"
            ),
            "notifications/preferences/update"
          ),
          raw: payload,
          requestId,
        };
      },
    },
    config: Object.freeze({
      accessToken,
      baseUrl,
      headers,
    }),
  };
}
