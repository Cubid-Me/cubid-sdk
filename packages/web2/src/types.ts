import type {
  CubidApiClient,
  CubidAddStampResponse,
  CubidSendEmailOtpResponse,
  CubidSendPhoneOtpResponse,
  CubidVerifyEmailOtpResponse,
  CubidVerifyPhoneOtpResponse
} from "@cubid/core";
export const WEB2_OAUTH_PROVIDERS = ["discord", "github", "google", "instagram", "linkedin", "twitter", "worldcoin"] as const;

export type CubidOAuthProvider = (typeof WEB2_OAUTH_PROVIDERS)[number];
export type CubidWeb2StampType = CubidOAuthProvider | "email" | "phone";

export interface CubidWeb2ClientOptions {
  allowPath?: "/allow" | "/widget-allow";
  passportOrigin?: string;
}

export interface ResolvedCubidWeb2ClientOptions {
  allowPath: "/allow" | "/widget-allow";
  passportOrigin: string;
}

export interface CubidAllowFlowParams {
  colorMode?: string;
  extras?: Record<string, boolean | number | string | undefined>;
  pageId?: number | string;
  path?: "/allow" | "/widget-allow";
  socialProvider?: CubidOAuthProvider;
  success?: boolean;
  userId?: string;
}

export interface ParsedCubidAllowFlowParams {
  colorMode?: string;
  extras: Record<string, string>;
  pageId?: string;
  path: string;
  socialProvider?: string;
  success?: boolean;
  userId?: string;
}

export interface CubidOAuthCallbackState {
  colorMode?: string;
  metadata?: Record<string, string>;
  nonce?: string;
  pageId?: string;
  provider: CubidOAuthProvider;
  returnTo?: string;
  userId?: string;
}

export interface OAuthAuthorizationUrlRequest {
  authorizationUrl: string;
  clientId: string;
  extraParams?: Record<string, boolean | number | string | undefined>;
  redirectUri: string;
  responseType?: string;
  scope?: string | string[];
  state?: CubidOAuthCallbackState | string;
}

export interface ProviderIdentityInput {
  email?: string;
  id?: number | string;
  identity?: string;
  login?: string;
  name?: string;
  phone?: string;
  sub?: string;
  uniquevalue?: string;
  userId?: number | string;
  userName?: string;
  username?: string;
  [key: string]: unknown;
}

export interface StampPersistenceRequest {
  pageId: number | string;
  stampData?: Record<string, unknown>;
  userId: string;
}

export interface SyncVerifiedStampRequest extends StampPersistenceRequest {
  stampType: CubidWeb2StampType;
  verifiedData: ProviderIdentityInput;
}

export interface SyncVerifiedStampResult extends CubidAddStampResponse {
  stampData: Record<string, unknown>;
  stampType: CubidWeb2StampType;
}

export interface EmailOtpStartRequest {
  email: string;
  onStarted?: (result: CubidSendEmailOtpResponse) => Promise<void> | void;
}

export interface EmailOtpVerifyRequest {
  email: string;
  onPersisted?: (result: SyncVerifiedStampResult) => Promise<void> | void;
  onVerified?: (result: EmailOtpVerifyResult) => Promise<void> | void;
  otp: number | string;
  persistStamp?: StampPersistenceRequest;
}

export interface EmailOtpVerifyResult extends CubidVerifyEmailOtpResponse {
  persistedStamp?: SyncVerifiedStampResult;
}

export interface PhoneOtpStartRequest {
  onStarted?: (result: CubidSendPhoneOtpResponse) => Promise<void> | void;
  phone: string;
}

export interface PhoneOtpVerifyRequest {
  onPersisted?: (result: SyncVerifiedStampResult) => Promise<void> | void;
  onVerified?: (result: PhoneOtpVerifyResult) => Promise<void> | void;
  otp: number | string;
  persistStamp?: StampPersistenceRequest;
  phone: string;
}

export interface PhoneOtpVerifyResult extends CubidVerifyPhoneOtpResponse {
  persistedStamp?: SyncVerifiedStampResult;
}

export interface CubidWeb2Client {
  readonly apiClient: CubidApiClient;
  readonly options: Readonly<ResolvedCubidWeb2ClientOptions>;
  readonly oauth: {
    buildAllowFlowUrl(params: CubidAllowFlowParams): string;
    buildAuthorizationUrl(request: OAuthAuthorizationUrlRequest): string;
    createCallbackState(state: CubidOAuthCallbackState): string;
    parseAllowFlowUrl(input: string | URL): ParsedCubidAllowFlowParams;
    parseCallbackState(encodedState: string): CubidOAuthCallbackState;
    providers: readonly CubidOAuthProvider[];
  };
  readonly email: {
    startOtp(request: EmailOtpStartRequest): Promise<CubidSendEmailOtpResponse>;
    verifyOtp(request: EmailOtpVerifyRequest): Promise<EmailOtpVerifyResult>;
  };
  readonly phone: {
    startOtp(request: PhoneOtpStartRequest): Promise<CubidSendPhoneOtpResponse>;
    verifyOtp(request: PhoneOtpVerifyRequest): Promise<PhoneOtpVerifyResult>;
  };
  readonly sync: {
    createProviderStampData(
      stampType: CubidWeb2StampType,
      verifiedData: ProviderIdentityInput,
      overrides?: Record<string, unknown>
    ): Record<string, unknown>;
    verifiedStamp(request: SyncVerifiedStampRequest): Promise<SyncVerifiedStampResult>;
  };
}
