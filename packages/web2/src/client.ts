import type { CubidApiClient } from "@cubid/core";

import { WEB2_OAUTH_PROVIDERS } from "./types";
import type {
  CubidAllowFlowParams,
  CubidOAuthCallbackState,
  CubidWeb2Client,
  CubidWeb2ClientOptions,
  CubidWeb2StampType,
  EmailOtpStartRequest,
  EmailOtpVerifyRequest,
  EmailOtpVerifyResult,
  OAuthAuthorizationUrlRequest,
  ParsedCubidAllowFlowParams,
  PhoneOtpStartRequest,
  PhoneOtpVerifyRequest,
  PhoneOtpVerifyResult,
  ProviderIdentityInput,
  ResolvedCubidWeb2ClientOptions,
  SyncVerifiedStampRequest,
  SyncVerifiedStampResult
} from "./types";

function toPassportOrigin(apiClient: CubidApiClient, override?: string): string {
  if (override) {
    return override.replace(/\/+$/, "");
  }

  return new URL(apiClient.config.baseUrl).origin;
}

function encodeBase64Url(value: string): string {
  if (typeof globalThis.btoa === "function") {
    const bytes = new TextEncoder().encode(value);
    let binary = "";

    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }

    return globalThis
      .btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/g, "");
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "utf8").toString("base64url");
  }

  throw new Error("No base64 encoder is available in this environment.");
}

function decodeBase64Url(value: string): string {
  if (typeof globalThis.atob === "function") {
    const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
    const padded = `${base64}${"=".repeat((4 - (base64.length % 4 || 4)) % 4)}`;
    const binary = globalThis.atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

    return new TextDecoder().decode(bytes);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(value, "base64url").toString("utf8");
  }

  throw new Error("No base64 decoder is available in this environment.");
}

function readString(input: ProviderIdentityInput, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = input[key];

    if (typeof value === "string" && value.length > 0) {
      return value;
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return undefined;
}

function buildProviderStampData(
  stampType: CubidWeb2StampType,
  verifiedData: ProviderIdentityInput,
  overrides?: Record<string, unknown>
): Record<string, unknown> {
  if (stampType === "email") {
    const email = readString(verifiedData, ["email", "identity", "uniquevalue"]);

    return {
      ...verifiedData,
      email,
      identity: email,
      uniquevalue: email,
      ...overrides
    };
  }

  if (stampType === "phone") {
    const phone = readString(verifiedData, ["phone", "identity", "uniquevalue"]);

    return {
      ...verifiedData,
      identity: phone,
      phone,
      uniquevalue: phone,
      ...overrides
    };
  }

  const subject =
    readString(verifiedData, ["uniquevalue", "sub", "id", "userId", "login", "username", "userName"]) ??
    "";

  const identity =
    readString(
      verifiedData,
      stampType === "discord"
        ? ["identity", "name", "username", "userName", "sub"]
        : stampType === "twitter"
          ? ["identity", "userName", "username", "login", "sub"]
          : ["identity", "sub", "id", "login", "username", "userName", "name"]
    ) ?? subject;

  return {
    ...verifiedData,
    identity,
    uniquevalue: subject,
    ...overrides
  };
}

async function invokeCallback<T>(callback: ((value: T) => Promise<void> | void) | undefined, value: T) {
  if (callback) {
    await callback(value);
  }
}

function resolveOptions(apiClient: CubidApiClient, options: CubidWeb2ClientOptions): ResolvedCubidWeb2ClientOptions {
  return {
    allowPath: options.allowPath ?? "/allow",
    passportOrigin: toPassportOrigin(apiClient, options.passportOrigin)
  };
}

function buildAllowFlowUrlFromOptions(options: ResolvedCubidWeb2ClientOptions, params: CubidAllowFlowParams): string {
  const url = new URL(params.path ?? options.allowPath, options.passportOrigin);

  if (params.userId) {
    url.searchParams.set("uid", params.userId);
  }

  if (params.pageId !== undefined) {
    url.searchParams.set("page_id", String(params.pageId));
  }

  if (params.colorMode) {
    url.searchParams.set("colormode", params.colorMode);
  }

  if (params.socialProvider) {
    url.searchParams.set("social_provider", params.socialProvider);
  }

  if (params.success !== undefined) {
    url.searchParams.set("success", String(params.success));
  }

  for (const [key, value] of Object.entries(params.extras ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function parseAllowFlowUrl(input: string | URL): ParsedCubidAllowFlowParams {
  const url = input instanceof URL ? input : new URL(input, "https://passport.cubid.me");
  const extras: Record<string, string> = {};

  for (const [key, value] of url.searchParams.entries()) {
    if (!["uid", "page_id", "colormode", "social_provider", "success"].includes(key)) {
      extras[key] = value;
    }
  }

  return {
    colorMode: url.searchParams.get("colormode") ?? undefined,
    extras,
    pageId: url.searchParams.get("page_id") ?? undefined,
    path: url.pathname,
    socialProvider: url.searchParams.get("social_provider") ?? undefined,
    success: url.searchParams.get("success") === "true",
    userId: url.searchParams.get("uid") ?? undefined
  };
}

function createCallbackState(state: CubidOAuthCallbackState): string {
  return encodeBase64Url(JSON.stringify(state));
}

function parseCallbackState(encodedState: string): CubidOAuthCallbackState {
  const parsed = JSON.parse(decodeBase64Url(encodedState)) as unknown;

  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("Malformed Cubid OAuth callback state.");
  }

  const state = parsed as Record<string, unknown>;

  if (typeof state.provider !== "string") {
    throw new Error("Cubid OAuth callback state is missing the provider.");
  }

  return {
    colorMode: typeof state.colorMode === "string" ? state.colorMode : undefined,
    metadata:
      typeof state.metadata === "object" && state.metadata !== null && !Array.isArray(state.metadata)
        ? Object.fromEntries(
            Object.entries(state.metadata).filter((entry): entry is [string, string] => typeof entry[1] === "string")
          )
        : undefined,
    nonce: typeof state.nonce === "string" ? state.nonce : undefined,
    pageId: typeof state.pageId === "string" ? state.pageId : undefined,
    provider: state.provider as CubidOAuthCallbackState["provider"],
    returnTo: typeof state.returnTo === "string" ? state.returnTo : undefined,
    userId: typeof state.userId === "string" ? state.userId : undefined
  };
}

function buildAuthorizationUrl(request: OAuthAuthorizationUrlRequest): string {
  const url = new URL(request.authorizationUrl);

  url.searchParams.set("client_id", request.clientId);
  url.searchParams.set("redirect_uri", request.redirectUri);
  url.searchParams.set("response_type", request.responseType ?? "code");

  if (request.scope) {
    url.searchParams.set("scope", Array.isArray(request.scope) ? request.scope.join(" ") : request.scope);
  }

  if (request.state) {
    url.searchParams.set(
      "state",
      typeof request.state === "string" ? request.state : createCallbackState(request.state)
    );
  }

  for (const [key, value] of Object.entries(request.extraParams ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

async function syncVerifiedStamp(apiClient: CubidApiClient, request: SyncVerifiedStampRequest): Promise<SyncVerifiedStampResult> {
  const stampData = buildProviderStampData(request.stampType, request.verifiedData, request.stampData);
  const response = await apiClient.addStamp({
    pageId: request.pageId,
    stampData,
    stampType: request.stampType,
    userId: request.userId
  });

  return {
    ...response,
    stampData,
    stampType: request.stampType
  };
}

export function createCubidWeb2Client(
  apiClient: CubidApiClient,
  options: CubidWeb2ClientOptions = {}
): CubidWeb2Client {
  const resolvedOptions = resolveOptions(apiClient, options);

  return {
    apiClient,
    email: {
      startOtp: async ({ email, onStarted }: EmailOtpStartRequest) => {
        const result = await apiClient.sendEmailOtp({ email });
        await invokeCallback(onStarted, result);
        return result;
      },
      verifyOtp: async ({ email, onPersisted, onVerified, otp, persistStamp }: EmailOtpVerifyRequest) => {
        const verification = await apiClient.verifyEmailOtp({ email, otp });
        let persistedStamp: SyncVerifiedStampResult | undefined;

        if (verification.isVerified && persistStamp) {
          persistedStamp = await syncVerifiedStamp(apiClient, {
            pageId: persistStamp.pageId,
            stampData: persistStamp.stampData,
            stampType: "email",
            userId: persistStamp.userId,
            verifiedData: { email }
          });
          await invokeCallback(onPersisted, persistedStamp);
        }

        const result: EmailOtpVerifyResult = { ...verification, persistedStamp };
        await invokeCallback(onVerified, result);
        return result;
      }
    },
    oauth: {
      buildAllowFlowUrl: (params: CubidAllowFlowParams) => buildAllowFlowUrlFromOptions(resolvedOptions, params),
      buildAuthorizationUrl,
      createCallbackState,
      parseAllowFlowUrl,
      parseCallbackState,
      providers: WEB2_OAUTH_PROVIDERS
    },
    options: resolvedOptions,
    phone: {
      startOtp: async ({ onStarted, phone }: PhoneOtpStartRequest) => {
        const result = await apiClient.sendPhoneOtp({ phone });
        await invokeCallback(onStarted, result);
        return result;
      },
      verifyOtp: async ({ onPersisted, onVerified, otp, persistStamp, phone }: PhoneOtpVerifyRequest) => {
        const verification = await apiClient.verifyPhoneOtp({ otp, phone });
        let persistedStamp: SyncVerifiedStampResult | undefined;

        if (verification.isVerified && persistStamp) {
          persistedStamp = await syncVerifiedStamp(apiClient, {
            pageId: persistStamp.pageId,
            stampData: persistStamp.stampData,
            stampType: "phone",
            userId: persistStamp.userId,
            verifiedData: { phone }
          });
          await invokeCallback(onPersisted, persistedStamp);
        }

        const result: PhoneOtpVerifyResult = { ...verification, persistedStamp };
        await invokeCallback(onVerified, result);
        return result;
      }
    },
    sync: {
      createProviderStampData: buildProviderStampData,
      verifiedStamp: (request: SyncVerifiedStampRequest) => syncVerifiedStamp(apiClient, request)
    }
  };
}
