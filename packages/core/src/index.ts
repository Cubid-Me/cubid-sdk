/**
 * Runtime-agnostic Cubid API client.
 *
 * This package intentionally depends only on standard Web APIs so it can run in
 * Node, Deno, Supabase Edge Functions, workers, and browser-capable runtimes.
 */

export type CubidFetch = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>

export type CubidApiErrorCategory =
  | "auth"
  | "conflict"
  | "config"
  | "not_found"
  | "rate_limit"
  | "unknown"
  | "upstream"
  | "validation"

export type CubidApiErrorInput = {
  category: CubidApiErrorCategory
  code?: string
  details?: unknown
  endpoint?: string
  message: string
  requestId?: string | null
  status?: number
}

export class CubidApiError extends Error {
  readonly category: CubidApiErrorCategory
  readonly code?: string
  readonly details?: unknown
  readonly endpoint?: string
  readonly requestId?: string | null
  readonly status?: number

  constructor(input: CubidApiErrorInput) {
    super(input.message)
    this.name = "CubidApiError"
    this.category = input.category
    this.code = input.code
    this.details = input.details
    this.endpoint = input.endpoint
    this.requestId = input.requestId
    this.status = input.status
  }
}

export const CUBID_SIWC_USER_ACTIONS = [
  "contact_support",
  "none",
  "refresh",
  "retry",
  "switch_user",
  "use_passkey",
] as const

export const CUBID_SIWC_ERROR_CODES = [
  "contract_allowlist_missing",
  "contract_not_allowlisted",
  "invalid_state",
  "not_found",
  "passkey_unavailable",
  "policy_denied",
  "provider_unavailable",
  "rate_limit_exceeded",
  "request_expired",
  "step_up_required",
  "step_up_stale",
  "transaction_chain_risk_unsupported",
  "transaction_contract_call_required",
  "transaction_evm_chain_id_missing",
  "transaction_evm_chain_id_not_pilot_enabled",
  "transaction_signing_disabled",
  "transaction_value_limit_exceeded",
  "transaction_value_usd_not_declared",
  "unsupported_action",
  "unsupported_chain",
  "user_cancelled",
  "wrong_user",
] as const

export type CubidSiwcUserAction = (typeof CUBID_SIWC_USER_ACTIONS)[number] | string

export type CubidSiwcErrorCode = (typeof CUBID_SIWC_ERROR_CODES)[number] | string

export type CubidSiwcErrorInput = CubidApiErrorInput & {
  retryable: boolean | null
  siwcCode: CubidSiwcErrorCode | null
  userAction: CubidSiwcUserAction | null
}

export class CubidSiwcError extends CubidApiError {
  readonly retryable: boolean | null
  readonly siwcCode: CubidSiwcErrorCode | null
  readonly userAction: CubidSiwcUserAction | null

  constructor(input: CubidSiwcErrorInput) {
    super(input)
    this.name = "CubidSiwcError"
    this.retryable = input.retryable
    this.siwcCode = input.siwcCode
    this.userAction = input.userAction
  }
}

export const isCubidSiwcError = (error: unknown): error is CubidSiwcError =>
  error instanceof CubidSiwcError

export type CubidApiClientOptions = {
  /**
   * Passport/Cubid API origin, for example `https://passport.cubid.me`.
   */
  baseUrl: string | URL
  /**
   * Dapp API key. Keep this value server-side.
   */
  apiKey: string
  /**
   * Optional dapp id included on endpoints that currently require it.
   */
  dappId?: number | string
  /**
   * Optional fetch implementation for Deno, Edge Functions, tests, or custom
   * instrumentation. Defaults to globalThis.fetch.
   */
  fetch?: CubidFetch
  /**
   * Optional headers for tracing or caller-owned instrumentation. Do not pass
   * browser-visible secrets here.
   */
  headers?: HeadersInit
}

export type CubidCreateUserInput = {
  dappId?: number | string
  email?: string
  evm?: string
  githubSub?: string
  googleSub?: string
  linkedinSub?: string
  phone?: string
  twitterSub?: string
}

export type CubidCreateUserResponse = {
  error: unknown
  isBlacklisted: boolean
  isNewAppUser: boolean
  isSybilAttack: boolean
  raw: Record<string, unknown>
  userId: string | null
}

export type CubidEnsureUserByEmailInput = {
  dappId?: number | string
  email: string
}

export type CubidEnsureUserByEmailResponse = CubidCreateUserResponse & {
  email: string
  userId: string
}

export type CubidFetchIdentityInput = {
  userId: string
}

export type CubidStampDetail = {
  raw: Record<string, unknown>
  stampType: string
  status: "Verified" | "Unverified" | string | null
  value: unknown
}

export type CubidFetchIdentityResponse = {
  error: unknown
  raw: Record<string, unknown>
  stampDetails: CubidStampDetail[]
}

export type CubidFetchScoreInput = {
  userId: string
}

export type CubidFetchScoreResponse = {
  cubidScore: number
  error: unknown
  raw: Record<string, unknown>
  scoringSchema: number | string | null
}

export type CubidDisclosureAvailability = "available" | "notGranted"

export type CubidProfileDisclosureClaim =
  | "profile:name"
  | "profile:*"
  | "profile"
  | "cubid:profile"

export type CubidLocationDisclosureClaim =
  | "location:rough"
  | "location:approximate"
  | "location:exact"
  | "location:*"

export type CubidLocationGranularity = "rough" | "approximate" | "exact"

export type CubidDisclosureState<TClaim extends string> = {
  claims: readonly TClaim[]
  state: CubidDisclosureAvailability
}

export type CubidFetchStampsInput = {
  userId: string
}

export const CUBID_STAMP_TYPE_IDS = {
  address: 70,
  brightid: 8,
  discord: 5,
  email: 13,
  evm: 14,
  facebook: 1,
  farcaster: 68,
  fractal: 17,
  github: 2,
  gitcoin: 9,
  gooddollar: 12,
  google: 3,
  iah: 7,
  instagram: 10,
  "lens-protocol": 66,
  linkedin: 22,
  near: 15,
  "near-wallet": 15,
  phone: 11,
  poh: 6,
  solana: 53,
  telegram: 27,
  twitter: 4,
  worldcoin: 26,
} as const

export type CubidStampType = keyof typeof CUBID_STAMP_TYPE_IDS

export type CubidRawStamp = Record<string, unknown> & {
  emailForVerification?: string | null
  permAvailable?: boolean
  stamptype_string?: string
}

export type CubidStampRecord = {
  emailForVerification?: string | null
  id?: number
  identity?: string | null
  isValid?: boolean | null
  permAvailable?: boolean
  raw: Record<string, unknown>
  stampType?: string | null
  stampTypeId?: number
  uniqueValue?: string | null
}

export type CubidDisclosedStampSummary = {
  stampType: CubidStampType | string
  stampTypeId: number
  status: "Verified" | "Unverified"
  value: string | null
}

export type CubidAppScopedSubject = {
  userId: string
}

export type CubidFetchStampsResponse = {
  allStamps: CubidStampRecord[]
  email?: string | null
  error?: unknown
  raw: Record<string, unknown>
}

export type CubidCoordinates = {
  lat: number
  lng: number
}

export type CubidFetchApproxLocationResponse = {
  coordinates?: CubidCoordinates
  country?: string | null
  disclosure: CubidDisclosureState<CubidLocationDisclosureClaim>
  error: unknown
  granularity: "approximate"
  placeName?: string | null
  plusCode?: string | null
  postalCode?: string | null
  raw: Record<string, unknown>
}

export type CubidFetchExactLocationResponse = {
  coordinates?: CubidCoordinates
  country?: string | null
  disclosure: CubidDisclosureState<CubidLocationDisclosureClaim>
  error: unknown
  granularity: "exact"
  place?: unknown
  raw: Record<string, unknown>
}

export type CubidFetchRoughLocationResponse = {
  coordinates?: CubidCoordinates
  country?: unknown
  disclosure: CubidDisclosureState<CubidLocationDisclosureClaim>
  error: unknown
  granularity: "rough"
  plusCode?: string | null
  raw: Record<string, unknown>
}

export type CubidFetchUserDataResponse = {
  coordinates?: CubidCoordinates
  country?: string | null
  error: unknown
  locationDisclosure: CubidDisclosureState<CubidLocationDisclosureClaim> & {
    granularity: "approximate"
  }
  name?: string | null
  placeName?: string | null
  profileNameDisclosure: CubidDisclosureState<CubidProfileDisclosureClaim>
  raw: Record<string, unknown>
}

export type CubidSearchLocationInput = {
  locationInput: string
}

export type CubidSearchLocationResponse = Array<Record<string, unknown>>

export type CubidAddStampInput = {
  pageId: number | string
  stampData: Record<string, unknown>
  stampType: string
  userId: string
}

export type CubidAddStampResponse = {
  raw: Record<string, unknown>
  success: boolean
}

export type CubidSendEmailOtpInput = {
  email: string
}

export type CubidSendEmailOtpResponse = {
  dappId?: number | string
  email?: string | null
  raw: Record<string, unknown>
  sent: boolean
}

export type CubidVerifyEmailOtpInput = {
  email: string
  otp: number | string
}

export type CubidVerifyEmailOtpResponse = {
  dappId?: number | string
  email?: string | null
  isVerified: boolean
  raw: Record<string, unknown>
}

export type CubidSendPhoneOtpInput = {
  phone: string
}

export type CubidSendPhoneOtpResponse = {
  raw: Record<string, unknown>
  status?: string | null
}

export type CubidVerifyPhoneOtpInput = {
  otp: number | string
  phone: string
}

export type CubidVerifyPhoneOtpResponse = {
  isVerified: boolean
  raw: Record<string, unknown>
  status?: string | null
}

export type CubidIdentitySnapshotInput = {
  userId: string
}

export type CubidIdentitySnapshot = {
  identity: CubidFetchIdentityResponse
  score: CubidFetchScoreResponse
  stamps: CubidFetchStampsResponse
  syncedAt: string
  userId: string
}

export type CubidIdempotentRequestOptions = {
  /**
   * Optional caller-owned idempotency key. When omitted on write helpers that
   * require idempotency, `@cubid/core` will generate a random key.
   */
  idempotencyKey?: string
}

export const CUBID_NOTIFICATION_CATEGORIES = [
  "SECURITY",
  "TRANSACTIONAL",
  "WORKFLOW",
] as const

export const CUBID_NOTIFICATION_PRIORITIES = [
  "LOW",
  "NORMAL",
  "HIGH",
  "CRITICAL",
] as const

export const CUBID_NOTIFICATION_SEND_ERROR_CODES = [
  "unauthorized",
  "invalid_request",
  "idempotency_conflict",
  "request_in_progress",
  "not_found",
  "notification_policy_disabled",
  "notification_category_denied",
  "notification_priority_denied",
  "notification_grant_required",
  "notification_muted",
  "no_eligible_notification_channel",
  "rate_limit_exceeded",
  "notification_provider_disabled",
  "notification_quota_exceeded",
] as const

export type CubidNotificationCategory =
  (typeof CUBID_NOTIFICATION_CATEGORIES)[number]

export type CubidNotificationPriority =
  (typeof CUBID_NOTIFICATION_PRIORITIES)[number]

export type CubidNotificationSendStatus = "accepted" | string

export type CubidNotificationSendErrorCode =
  (typeof CUBID_NOTIFICATION_SEND_ERROR_CODES)[number] | string

export type CubidNotificationSendErrorInput = CubidApiErrorInput & {
  notificationCode: CubidNotificationSendErrorCode | null
  retryable: boolean | null
  sendAccepted: false
}

export class CubidNotificationSendError extends CubidApiError {
  readonly notificationCode: CubidNotificationSendErrorCode | null
  readonly retryable: boolean | null
  readonly sendAccepted: false

  constructor(input: CubidNotificationSendErrorInput) {
    super(input)
    this.name = "CubidNotificationSendError"
    this.notificationCode = input.notificationCode
    this.retryable = input.retryable
    this.sendAccepted = false
  }
}

export const isCubidNotificationSendError = (
  error: unknown
): error is CubidNotificationSendError =>
  error instanceof CubidNotificationSendError

export type CubidSendNotificationInput = CubidIdempotentRequestOptions & {
  body: string
  category: CubidNotificationCategory
  deepLink?: string
  metadata?: Record<string, unknown>
  priority: CubidNotificationPriority
  title: string
  userId: string
}

export type CubidSendNotificationResponse = {
  category: CubidNotificationCategory | string | null
  createdAt: string | null
  eventId: string | null
  idempotencyKey: string
  priority: CubidNotificationPriority | string | null
  raw: Record<string, unknown>
  selectedChannelType: string | null
  status: CubidNotificationSendStatus | null
}

export type CubidNotificationEventStatus = "accepted" | "sent" | "failed" | string

export type CubidNotificationDeliveryStatus =
  | "queued"
  | "sent"
  | "failed"
  | string

export type CubidNotificationDeliveryAttempt = {
  attemptId: string | null
  channelType: string | null
  createdAt: string | null
  failureCode: string | null
  failureMessage: string | null
  providerKey: string | null
  raw: Record<string, unknown>
  status: CubidNotificationDeliveryStatus | null
  updatedAt: string | null
}

export type CubidNotificationStatusSummary = {
  category: CubidNotificationCategory | string | null
  createdAt: string | null
  deliveryAttempts: CubidNotificationDeliveryAttempt[]
  eventId: string | null
  latestDeliveryAttemptAt: string | null
  latestDeliveryStatus: CubidNotificationDeliveryStatus | null
  priority: CubidNotificationPriority | string | null
  raw: Record<string, unknown>
  selectedChannelType: string | null
  status: CubidNotificationEventStatus | null
  updatedAt: string | null
}

export type CubidGetNotificationStatusInput = {
  eventId: string
  userId: string
}

export type CubidGetNotificationStatusResponse = {
  notification: CubidNotificationStatusSummary
  raw: Record<string, unknown>
}

export type CubidSaveSecretInput = CubidIdempotentRequestOptions & {
  secret: string
  userId: string
}

export type CubidSaveSecretResponse = {
  idempotencyKey: string
  raw: Record<string, unknown>
  success: boolean
}

export type CubidCustodyChain = "evm" | "near" | "solana" | "sui"

export type CubidAccountCustodyStatus = string | null

export type CubidAccountLinkStatus = string | null

export type CubidCustodyAccount = {
  accountId: string | null
  chain: CubidCustodyChain | string
  createdAt: string | null
  custodyStatus: CubidAccountCustodyStatus
  dappUserAccountId: string | null
  label: string | null
  linkStatus?: CubidAccountLinkStatus
  publicAddress: string | null
  raw: Record<string, unknown>
  updatedAt?: string | null
  userId: string | null
}

export type CubidGenerateAccountInput = CubidIdempotentRequestOptions & {
  chain: CubidCustodyChain
  label?: string
  userId: string
}

export type CubidGenerateAccountResponse = {
  account: CubidCustodyAccount
  idempotencyKey: string
  raw: Record<string, unknown>
}

export type CubidListAccountsInput = {
  chain?: CubidCustodyChain
  userId: string
}

export type CubidListAccountsResponse = {
  accounts: CubidCustodyAccount[]
  raw: Record<string, unknown>
}

export type CubidWalletPolicyStatus = "enabled" | "disabled" | "missing" | string

export type CubidWalletAccountCreationModes = {
  directGenerateEnabled: boolean
  passkeyApprovedRequestEnabled: boolean
}

export type CubidWalletPolicy = {
  allowedChains: Array<CubidCustodyChain | string>
  allowedRequestTypes: CubidSigningRequestType[]
  custodyEnabled: boolean
  policyStatus: CubidWalletPolicyStatus | null
  policyVersion: number
  raw: Record<string, unknown> | null
  requiredAcr: string | null
  sandboxMode: boolean
  signingEnabled: boolean
}

export type CubidWalletChainActions = {
  accountLookup: boolean
  directGeneration: boolean
  messageSigning: boolean
  passkeyApprovedCreation: boolean
  raw: Record<string, unknown>
  transactionSigning: boolean
  transactionSigningStatus: string | null
  typedDataSigning: boolean
}

export type CubidWalletCapabilities = {
  accountCreationModes: CubidWalletAccountCreationModes
  accounts: CubidCustodyAccount[]
  dappId: string | null
  dappUserUuid: string | null
  policy: CubidWalletPolicy
  raw: Record<string, unknown>
  supportedChains: Array<CubidCustodyChain | string>
  walletActionsByChain: Record<string, CubidWalletChainActions>
}

export type CubidFetchWalletCapabilitiesInput = {
  userId?: string
}

export type CubidFetchWalletCapabilitiesResponse = {
  capabilities: CubidWalletCapabilities
  raw: Record<string, unknown>
}

export type CubidAccountRequestStatus =
  | "approved"
  | "expired"
  | "failed"
  | "pending_user_approval"
  | "policy_denied"
  | "rejected"
  | string

export type CubidAccountRequestSummary = {
  accountId: string | null
  accountRequestId: string | null
  approvedAt: string | null
  chain: CubidCustodyChain | string | null
  createdAt: string | null
  dappId: string | null
  dappUserAccountId: string | null
  dappUserUuid: string | null
  errorCode: string | null
  errorMessage: string | null
  expiresAt: string | null
  label: string | null
  policyVersion: number | null
  publicAddress: string | null
  raw: Record<string, unknown>
  rejectedAt: string | null
  requiredAcr: string | null
  status: CubidAccountRequestStatus | null
  updatedAt: string | null
}

export type CubidCreateAccountRequestInput = CubidIdempotentRequestOptions & {
  chain: CubidCustodyChain
  label?: string
  userId: string
}

export type CubidCreateAccountRequestResponse = {
  accountRequest: CubidAccountRequestSummary
  idempotencyKey: string
  raw: Record<string, unknown>
}

export type CubidGetAccountRequestInput = {
  accountRequestId: string
}

export type CubidGetAccountRequestResponse = {
  accountRequest: CubidAccountRequestSummary
  raw: Record<string, unknown>
}

export const createNotificationIdempotencyKey = (): string =>
  resolveIdempotencyKey(undefined, "v3/notifications/send")

export type CubidSigningRequestType =
  | "message"
  | "typed_data"
  | "transaction"
  | string

export type CubidSigningRequestStatus =
  | "pending_user_approval"
  | "pending"
  | "approved"
  | "rejected"
  | "cancelled"
  | "completed"
  | "expired"
  | "failed"
  | "policy_denied"
  | "step_up_failed"
  | "transaction_signing_deferred"
  | string

export type CubidSigningRequestRiskLevel = "low" | "medium" | "high" | null

export type CubidSigningRequestPolicyDecision = "allowed" | "denied" | null

export type CubidSigningSignatureResult = {
  algorithm: string | null
  publicAddress: string | null
  raw: Record<string, unknown>
  signature: string
  type: "signature"
}

export type CubidSignedTransactionResult = {
  algorithm: string | null
  chainId: number | null
  publicAddress: string | null
  raw: Record<string, unknown>
  signedTransaction: string
  transactionHash: string | null
  type: "signed_transaction"
}

export type CubidUnknownSigningResult = {
  raw: Record<string, unknown>
  type: string | null
}

export type CubidSigningRequestResult =
  | CubidSigningSignatureResult
  | CubidSignedTransactionResult
  | CubidUnknownSigningResult

export const isCubidSigningSignatureResult = (
  value: CubidSigningRequestResult | null | undefined
): value is CubidSigningSignatureResult =>
  value !== null &&
  value !== undefined &&
  value.type === "signature" &&
  "signature" in value

export const isCubidSignedTransactionResult = (
  value: CubidSigningRequestResult | null | undefined
): value is CubidSignedTransactionResult =>
  value !== null &&
  value !== undefined &&
  value.type === "signed_transaction" &&
  "signedTransaction" in value

/**
 * Public signing-request summaries stay redacted by design. They must not
 * expose raw payloads, raw Cubid internal user ids, private keys, encrypted
 * key material, or any transaction-signing enablement signal.
 */
export type CubidSigningRequestSummary = {
  approvedAt?: string | null
  cancelledAt?: string | null
  chain: CubidCustodyChain | string | null
  completedAt?: string | null
  createdAt: string | null
  errorCode: string | null
  errorMessage: string | null
  expiresAt?: string | null
  payloadHash: string | null
  payloadSummary: Record<string, unknown> | null
  policyDecision: CubidSigningRequestPolicyDecision
  policyVersion: number | null
  raw: Record<string, unknown>
  rejectedAt?: string | null
  requiredAcr: string | null
  result: CubidSigningRequestResult | null
  riskLevel: CubidSigningRequestRiskLevel
  riskReasons: string[]
  signingRequestId: string | null
  status: CubidSigningRequestStatus | null
  stepUpRequired: boolean
  transactionContractAddress: string | null
  transactionDeclaredValueUsd: number | null
  transactionOperationType: string | null
  transactionRecipient: string | null
  requestType: CubidSigningRequestType | null
  updatedAt: string | null
}

export type CubidCreateSigningRequestInput = CubidIdempotentRequestOptions & {
  chain?: CubidCustodyChain
  payload: Record<string, unknown>
  payloadSummary: Record<string, unknown>
  requestType: CubidSigningRequestType
  userAccountId: string
  userId: string
}

export type CubidCreateSigningRequestResponse = {
  idempotencyKey: string
  raw: Record<string, unknown>
  signingRequest: CubidSigningRequestSummary
}

export type CubidGetSigningRequestInput = {
  signingRequestId: string
}

export type CubidGetSigningRequestResponse = {
  raw: Record<string, unknown>
  signingRequest: CubidSigningRequestSummary
}

export type CubidListSigningRequestsInput = {
  limit?: number
  userAccountId?: string
  userId: string
}

export type CubidListSigningRequestsResponse = {
  raw: Record<string, unknown>
  signingRequests: CubidSigningRequestSummary[]
}

export type CubidCancelSigningRequestInput = {
  signingRequestId: string
}

export type CubidCancelSigningRequestResponse = {
  raw: Record<string, unknown>
  signingRequest: CubidSigningRequestSummary
}

export type CubidWebhookEventType =
  | "stamp.created"
  | "stamp.removed"
  | "credential.expired"
  | "credential.blacklisted"
  | "credential.whitelisted"
  | "score.increased"
  | "score.decreased"
  | "wallet.created"
  | "wallet.signing_request.created"
  | "wallet.policy.denied"
  | "wallet.signing_request.approved"
  | "wallet.signing_request.rejected"
  | "wallet.signing_request.cancelled"
  | "wallet.signing_request.step_up_failed"
  | "wallet.signature.completed"
  | "wallet.signature.failed"

export type CubidWebhookLegacyEventType =
  | "credential_added"
  | "credential_removed"
  | "credential_expired"
  | "credential_blacklisted"
  | "credential_whitelisted"
  | "score_increase"
  | "score_decrease"

export type CubidWebhookEvent<TData = unknown> = {
  apiVersion: string | null
  createdAt: string | null
  dapp: Record<string, unknown> | null
  data: TData | null
  eventId: string | null
  eventType: CubidWebhookEventType | string | null
  legacyEventType: CubidWebhookLegacyEventType | string | null
  payloadVersion: string | null
  raw: Record<string, unknown>
  requestId: string | null
  subject: Record<string, unknown> | null
}

export type CubidVerifyWebhookSignatureInput = {
  eventId: string
  payload: string | Uint8Array
  secret: string
  signature: string
  signatureVersion?: string
  timestamp: string
  toleranceSeconds?: number
  now?: Date | number
}

export type CubidWebhookVerificationResult = {
  eventId: string
  signatureVersion: "v1"
  timestamp: string
  verified: true
}

export type CubidClientConfig = {
  baseUrl: string
  dappId?: number | string
  headers?: HeadersInit
}

/**
 * Compatibility aliases retained while older `@cubid/api` consumers move to
 * the canonical `@cubid/core` package.
 */
export type ApiClientConfig = CubidApiClientOptions
export type ClientConfig = CubidClientConfig
export type CreateUserInput = CubidCreateUserInput
export type CreateUserResponse = CubidCreateUserResponse
export type EnsureUserByEmailInput = CubidEnsureUserByEmailInput
export type EnsureUserByEmailResponse = CubidEnsureUserByEmailResponse
export type FetchIdentityInput = CubidFetchIdentityInput
export type FetchIdentityResponse = CubidFetchIdentityResponse
export type FetchScoreInput = CubidFetchScoreInput
export type FetchScoreResponse = CubidFetchScoreResponse
export type FetchStampsInput = CubidFetchStampsInput
export type FetchStampsResponse = CubidFetchStampsResponse
export type StampType = CubidStampType
export type DisclosedStampSummary = CubidDisclosedStampSummary
export type AppScopedSubject = CubidAppScopedSubject
export type FetchApproxLocationResponse = CubidFetchApproxLocationResponse
export type FetchExactLocationResponse = CubidFetchExactLocationResponse
export type FetchRoughLocationResponse = CubidFetchRoughLocationResponse
export type FetchUserDataResponse = CubidFetchUserDataResponse
export type SearchLocationInput = CubidSearchLocationInput
export type SearchLocationResponse = CubidSearchLocationResponse
export type AddStampInput = CubidAddStampInput
export type AddStampResponse = CubidAddStampResponse
export type SendEmailOtpInput = CubidSendEmailOtpInput
export type SendEmailOtpResponse = CubidSendEmailOtpResponse
export type VerifyEmailOtpInput = CubidVerifyEmailOtpInput
export type VerifyEmailOtpResponse = CubidVerifyEmailOtpResponse
export type SendPhoneOtpInput = CubidSendPhoneOtpInput
export type SendPhoneOtpResponse = CubidSendPhoneOtpResponse
export type VerifyPhoneOtpInput = CubidVerifyPhoneOtpInput
export type VerifyPhoneOtpResponse = CubidVerifyPhoneOtpResponse
export type IdentitySnapshotInput = CubidIdentitySnapshotInput
export type IdentitySnapshot = CubidIdentitySnapshot
export type IdempotentRequestOptions = CubidIdempotentRequestOptions
export type NotificationCategory = CubidNotificationCategory
export type NotificationPriority = CubidNotificationPriority
export type NotificationEventStatus = CubidNotificationEventStatus
export type NotificationDeliveryStatus = CubidNotificationDeliveryStatus
export type NotificationDeliveryAttempt = CubidNotificationDeliveryAttempt
export type NotificationStatusSummary = CubidNotificationStatusSummary
export type NotificationSendStatus = CubidNotificationSendStatus
export type NotificationSendErrorCode = CubidNotificationSendErrorCode
export type NotificationSendErrorInput = CubidNotificationSendErrorInput
export type GetNotificationStatusInput = CubidGetNotificationStatusInput
export type GetNotificationStatusResponse = CubidGetNotificationStatusResponse
export type SaveSecretInput = CubidSaveSecretInput
export type SaveSecretResponse = CubidSaveSecretResponse
export type SendNotificationInput = CubidSendNotificationInput
export type SendNotificationResponse = CubidSendNotificationResponse
export type CustodyChain = CubidCustodyChain
export type CustodyAccount = CubidCustodyAccount
export type GenerateAccountInput = CubidGenerateAccountInput
export type GenerateAccountResponse = CubidGenerateAccountResponse
export type ListAccountsInput = CubidListAccountsInput
export type ListAccountsResponse = CubidListAccountsResponse
export type WalletPolicyStatus = CubidWalletPolicyStatus
export type WalletAccountCreationModes = CubidWalletAccountCreationModes
export type WalletPolicy = CubidWalletPolicy
export type WalletChainActions = CubidWalletChainActions
export type WalletCapabilities = CubidWalletCapabilities
export type FetchWalletCapabilitiesInput = CubidFetchWalletCapabilitiesInput
export type FetchWalletCapabilitiesResponse = CubidFetchWalletCapabilitiesResponse
export type AccountRequestStatus = CubidAccountRequestStatus
export type AccountRequestSummary = CubidAccountRequestSummary
export type CreateAccountRequestInput = CubidCreateAccountRequestInput
export type CreateAccountRequestResponse = CubidCreateAccountRequestResponse
export type GetAccountRequestInput = CubidGetAccountRequestInput
export type GetAccountRequestResponse = CubidGetAccountRequestResponse
export type SigningRequestType = CubidSigningRequestType
export type SigningRequestStatus = CubidSigningRequestStatus
export type SigningSignatureResult = CubidSigningSignatureResult
export type SignedTransactionResult = CubidSignedTransactionResult
export type UnknownSigningResult = CubidUnknownSigningResult
export type SigningRequestResult = CubidSigningRequestResult
export type SigningRequestSummary = CubidSigningRequestSummary
export type CreateSigningRequestInput = CubidCreateSigningRequestInput
export type CreateSigningRequestResponse = CubidCreateSigningRequestResponse
export type GetSigningRequestInput = CubidGetSigningRequestInput
export type GetSigningRequestResponse = CubidGetSigningRequestResponse
export type ListSigningRequestsInput = CubidListSigningRequestsInput
export type ListSigningRequestsResponse = CubidListSigningRequestsResponse
export type CancelSigningRequestInput = CubidCancelSigningRequestInput
export type CancelSigningRequestResponse = CubidCancelSigningRequestResponse
export type WebhookEventType = CubidWebhookEventType
export type WebhookLegacyEventType = CubidWebhookLegacyEventType
export type WebhookEvent<TData = unknown> = CubidWebhookEvent<TData>
export type VerifyWebhookSignatureInput = CubidVerifyWebhookSignatureInput
export type WebhookVerificationResult = CubidWebhookVerificationResult
export type SiwcUserAction = CubidSiwcUserAction
export type SiwcErrorCode = CubidSiwcErrorCode
export type SiwcErrorInput = CubidSiwcErrorInput

export type CubidApiClient = {
  addStamp(input: CubidAddStampInput): Promise<CubidAddStampResponse>
  config: Readonly<CubidClientConfig>
  createUser(input: CubidCreateUserInput): Promise<CubidCreateUserResponse>
  createAccountRequest(
    input: CubidCreateAccountRequestInput
  ): Promise<CubidCreateAccountRequestResponse>
  getNotificationStatus(
    input: CubidGetNotificationStatusInput
  ): Promise<CubidGetNotificationStatusResponse>
  sendNotification(
    input: CubidSendNotificationInput
  ): Promise<CubidSendNotificationResponse>
  ensureUserByEmail(
    input: CubidEnsureUserByEmailInput
  ): Promise<CubidEnsureUserByEmailResponse>
  fetchWalletCapabilities(
    input?: CubidFetchWalletCapabilitiesInput
  ): Promise<CubidFetchWalletCapabilitiesResponse>
  fetchApproxLocation(
    input: CubidFetchIdentityInput
  ): Promise<CubidFetchApproxLocationResponse>
  fetchExactLocation(
    input: CubidFetchIdentityInput
  ): Promise<CubidFetchExactLocationResponse>
  fetchIdentity(
    input: CubidFetchIdentityInput
  ): Promise<CubidFetchIdentityResponse>
  fetchRoughLocation(
    input: CubidFetchIdentityInput
  ): Promise<CubidFetchRoughLocationResponse>
  fetchScore(input: CubidFetchScoreInput): Promise<CubidFetchScoreResponse>
  fetchStamps(input: CubidFetchStampsInput): Promise<CubidFetchStampsResponse>
  fetchUserData(
    input: CubidFetchIdentityInput
  ): Promise<CubidFetchUserDataResponse>
  createSigningRequest(
    input: CubidCreateSigningRequestInput
  ): Promise<CubidCreateSigningRequestResponse>
  getAccountRequest(
    input: CubidGetAccountRequestInput
  ): Promise<CubidGetAccountRequestResponse>
  getSigningRequest(
    input: CubidGetSigningRequestInput
  ): Promise<CubidGetSigningRequestResponse>
  generateAccount(
    input: CubidGenerateAccountInput
  ): Promise<CubidGenerateAccountResponse>
  listAccounts(input: CubidListAccountsInput): Promise<CubidListAccountsResponse>
  listSigningRequests(
    input: CubidListSigningRequestsInput
  ): Promise<CubidListSigningRequestsResponse>
  cancelSigningRequest(
    input: CubidCancelSigningRequestInput
  ): Promise<CubidCancelSigningRequestResponse>
  saveSecret(input: CubidSaveSecretInput): Promise<CubidSaveSecretResponse>
  searchLocation(
    input: CubidSearchLocationInput
  ): Promise<CubidSearchLocationResponse>
  sendEmailOtp(
    input: CubidSendEmailOtpInput
  ): Promise<CubidSendEmailOtpResponse>
  sendPhoneOtp(
    input: CubidSendPhoneOtpInput
  ): Promise<CubidSendPhoneOtpResponse>
  syncIdentitySnapshot(
    input: CubidIdentitySnapshotInput
  ): Promise<CubidIdentitySnapshot>
  verifyEmailOtp(
    input: CubidVerifyEmailOtpInput
  ): Promise<CubidVerifyEmailOtpResponse>
  verifyPhoneOtp(
    input: CubidVerifyPhoneOtpInput
  ): Promise<CubidVerifyPhoneOtpResponse>
}

type CubidRequestBody = Record<string, unknown>

const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, "")

const normalizeBaseUrl = (baseUrl: string | URL): string => {
  const raw = String(baseUrl).trim()

  if (!raw) {
    throw new CubidApiError({
      category: "config",
      message: "Cubid API baseUrl is required.",
    })
  }

  let parsed: URL
  try {
    parsed = new URL(raw)
  } catch {
    throw new CubidApiError({
      category: "config",
      message: "Cubid API baseUrl must be an absolute URL.",
    })
  }

  const isLoopbackHost =
    parsed.hostname === "localhost" ||
    parsed.hostname === "127.0.0.1" ||
    parsed.hostname === "[::1]"
  const isAllowedProtocol =
    parsed.protocol === "https:" || (parsed.protocol === "http:" && isLoopbackHost)

  if (!isAllowedProtocol) {
    throw new CubidApiError({
      category: "config",
      message:
        "Cubid API baseUrl must use HTTPS, except for loopback development hosts over HTTP.",
    })
  }

  return trimTrailingSlashes(parsed.toString())
}

const resolveFetch = (fetchImpl?: CubidFetch): CubidFetch => {
  if (fetchImpl) {
    return fetchImpl
  }

  if (typeof globalThis.fetch === "function") {
    return globalThis.fetch.bind(globalThis) as CubidFetch
  }

  throw new CubidApiError({
    category: "config",
    message:
      "No fetch implementation is available. Pass fetch when creating the Cubid API client.",
  })
}

const assertApiKey = (apiKey: string): string => {
  const normalized = apiKey.trim()
  if (!normalized) {
    throw new CubidApiError({
      category: "config",
      message: "Cubid API key is required.",
    })
  }
  return normalized
}

const assertNonEmptyString = (
  value: string,
  field: string,
  endpoint: string
): string => {
  const normalized = value.trim()
  if (!normalized) {
    throw new CubidApiError({
      category: "validation",
      code: "INVALID_INPUT",
      endpoint,
      message: `${field} is required.`,
    })
  }
  return normalized
}

const assertPositiveInteger = (
  value: number,
  field: string,
  endpoint: string
): number => {
  if (!Number.isInteger(value) || value <= 0) {
    throw new CubidApiError({
      category: "validation",
      code: "INVALID_INPUT",
      endpoint,
      message: `${field} must be a positive integer.`,
    })
  }

  return value
}

const categoryForStatus = (status: number): CubidApiErrorCategory => {
  if (status === 401 || status === 403) {
    return "auth"
  }
  if (status === 409) {
    return "conflict"
  }
  if (status === 404) {
    return "not_found"
  }
  if (status === 408 || status === 429) {
    return "rate_limit"
  }
  if (status >= 400 && status < 500) {
    return "validation"
  }
  if (status >= 500) {
    return "upstream"
  }
  return "unknown"
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const asString = (value: unknown): string | null =>
  typeof value === "string" ? value : null

const asNumber = (value: unknown): number | undefined =>
  typeof value === "number" ? value : undefined

const asNumberLike = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

const asBoolean = (value: unknown): boolean | undefined =>
  typeof value === "boolean" ? value : undefined

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : []

const asCoordinates = (value: unknown): CubidCoordinates | undefined => {
  if (!isRecord(value)) {
    return undefined
  }

  const lat = value.lat
  const lng = value.lng

  if (typeof lat !== "number" || typeof lng !== "number") {
    return undefined
  }

  return { lat, lng }
}

const codeFromPayload = (payload: unknown): string | undefined => {
  if (!payload || typeof payload !== "object") {
    return undefined
  }

  const record = payload as Record<string, unknown>
  const error = record.error

  if (typeof error === "string" && error.trim()) {
    return error
  }

  if (error && typeof error === "object") {
    const nested = error as Record<string, unknown>
    if (typeof nested.code === "string" && nested.code.trim()) {
      return nested.code
    }
  }

  if (typeof record.code === "string" && record.code.trim()) {
    return record.code
  }

  return undefined
}

const assertRecord = (
  value: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): Record<string, unknown> => {
  if (isRecord(value)) {
    return value
  }

  throw new CubidApiError({
    category: "upstream",
    code: "MALFORMED_RESPONSE",
    details: value,
    endpoint,
    message: `Malformed response from ${endpoint}.`,
    requestId,
    status,
  })
}

const messageFromPayload = (payload: unknown, fallback: string): string => {
  if (!payload || typeof payload !== "object") {
    return fallback
  }

  const record = payload as Record<string, unknown>
  const error = record.error

  if (typeof error === "string" && error.trim()) {
    return error
  }

  if (error && typeof error === "object") {
    const nested = error as Record<string, unknown>
    if (typeof nested.message === "string" && nested.message.trim()) {
      return nested.message
    }
    if (typeof nested.code === "string" && nested.code.trim()) {
      return nested.code
    }
  }

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message
  }

  return fallback
}

const asSiwcUserAction = (value: unknown): CubidSiwcUserAction | null =>
  typeof value === "string" && value.trim().length > 0 ? value : null

const asSiwcCode = (value: unknown): CubidSiwcErrorCode | null =>
  typeof value === "string" && value.trim().length > 0 ? value : null

const asNotificationSendErrorCode = (
  value: unknown
): CubidNotificationSendErrorCode | null =>
  typeof value === "string" && value.trim().length > 0 ? value : null

const extractSiwcErrorMetadata = (
  payload: unknown
):
  | {
      retryable: boolean | null
      siwcCode: CubidSiwcErrorCode | null
      userAction: CubidSiwcUserAction | null
    }
  | null => {
  if (!isRecord(payload)) {
    return null
  }

  const error = isRecord(payload.error) ? payload.error : null
  const details = error && isRecord(error.details)
    ? error.details
    : isRecord(payload.details)
      ? payload.details
      : null

  if (!details) {
    return null
  }

  const siwcCode = asSiwcCode(details.siwcCode)
  const retryable = asBoolean(details.retryable) ?? null
  const userAction = asSiwcUserAction(details.userAction)

  if (siwcCode === null && retryable === null && userAction === null) {
    return null
  }

  return {
    retryable,
    siwcCode,
    userAction,
  }
}

const notificationSendRetryability = (
  code: CubidNotificationSendErrorCode | null
): boolean | null => {
  switch (code) {
    case "request_in_progress":
    case "rate_limit_exceeded":
      return true
    case "unauthorized":
    case "invalid_request":
    case "idempotency_conflict":
    case "not_found":
    case "notification_policy_disabled":
    case "notification_category_denied":
    case "notification_priority_denied":
    case "notification_grant_required":
    case "notification_muted":
    case "no_eligible_notification_channel":
    case "notification_provider_disabled":
    case "notification_quota_exceeded":
      return false
    default:
      return null
  }
}

const createApiError = (input: CubidApiErrorInput): CubidApiError => {
  if (input.endpoint === "v3/notifications/send") {
    const notificationCode = asNotificationSendErrorCode(input.code)
    return new CubidNotificationSendError({
      ...input,
      notificationCode,
      retryable: notificationSendRetryability(notificationCode),
      sendAccepted: false,
    })
  }

  const siwc = extractSiwcErrorMetadata(input.details)

  if (siwc) {
    return new CubidSiwcError({
      ...input,
      retryable: siwc.retryable,
      siwcCode: siwc.siwcCode,
      userAction: siwc.userAction,
    })
  }

  return new CubidApiError(input)
}

const safeJson = async (response: Response): Promise<unknown> => {
  const text = await response.text()
  if (!text) {
    return null
  }

  try {
    return JSON.parse(text) as unknown
  } catch {
    return text
  }
}

const makeRequest = async <Result>(
  fetchImpl: CubidFetch,
  baseUrl: string,
  path: string,
  body: CubidRequestBody,
  endpoint: string,
  normalize: (
    payload: unknown,
    requestId?: string | null,
    status?: number
  ) => Result,
  headers?: HeadersInit,
  requestHeaders?: HeadersInit
): Promise<Result> => {
  let response: Response
  try {
    const resolvedHeaders = new Headers(headers)
    for (const [key, value] of new Headers(requestHeaders)) {
      resolvedHeaders.set(key, value)
    }
    if (!resolvedHeaders.has("content-type")) {
      resolvedHeaders.set("content-type", "application/json")
    }

    response = await fetchImpl(`${baseUrl}${path}`, {
      body: JSON.stringify(body),
      headers: resolvedHeaders,
      method: "POST",
    })
  } catch (error) {
    throw createApiError({
      category: "upstream",
      code: "NETWORK_ERROR",
      details: error,
      endpoint,
      message: "Cubid API request failed before receiving a response.",
    })
  }

  const requestId = response.headers.get("x-request-id")
  const payload = await safeJson(response)

  if (!response.ok) {
    throw createApiError({
      category: categoryForStatus(response.status),
      code: codeFromPayload(payload),
      details: payload,
      endpoint,
      message: messageFromPayload(
        payload,
        `Cubid API request failed with status ${response.status}.`
      ),
      requestId,
      status: response.status,
    })
  }

  return normalize(payload, requestId, response.status)
}

const normalizeCreateUser = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidCreateUserResponse => {
  const record = assertRecord(payload, "create_user", requestId, status)

  return {
    error: record.error ?? null,
    isBlacklisted: Boolean(record.is_blacklisted),
    isNewAppUser: Boolean(record.is_new_app_user),
    isSybilAttack: Boolean(record.is_sybil_attack),
    raw: record,
    userId: asString(record.user_id),
  }
}

const normalizeIdentity = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidFetchIdentityResponse => {
  const record = assertRecord(payload, "identity/fetch_identity", requestId, status)
  const stampDetails = Array.isArray(record.stamp_details)
    ? record.stamp_details
    : []

  return {
    error: record.error ?? null,
    raw: record,
    stampDetails: stampDetails.map((item) => {
      const detail = assertRecord(
        item,
        "identity/fetch_identity.stamp_details",
        requestId,
        status
      )

      return {
        raw: detail,
        stampType: asString(detail.stamp_type) ?? "unknown",
        status: asString(detail.status),
        value: detail.value,
      }
    }),
  }
}

const normalizeScore = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidFetchScoreResponse => {
  const record = assertRecord(payload, "score/fetch_score", requestId, status)

  return {
    cubidScore: typeof record.cubid_score === "number" ? record.cubid_score : 0,
    error: record.error ?? null,
    raw: record,
    scoringSchema:
      typeof record.scoring_schema === "number" ||
      typeof record.scoring_schema === "string"
        ? record.scoring_schema
        : null,
  }
}

const STAMP_TYPE_NAMES_BY_ID = Object.entries(CUBID_STAMP_TYPE_IDS).reduce<
  Record<number, CubidStampType>
>((accumulator, [stampType, stampTypeId]) => {
  if (accumulator[stampTypeId] === undefined || stampType !== "near-wallet") {
    accumulator[stampTypeId] = stampType as CubidStampType
  }
  return accumulator
}, {})

export const getCubidStampTypeId = (stampType: string): number | null => {
  const normalized = stampType.trim() as CubidStampType
  return CUBID_STAMP_TYPE_IDS[normalized] ?? null
}

export const getCubidStampTypeName = (stampTypeId: number): CubidStampType | string =>
  STAMP_TYPE_NAMES_BY_ID[stampTypeId] ?? String(stampTypeId)

export const getCubidStampTypeNamesById = (): Record<number, string> => ({
  ...STAMP_TYPE_NAMES_BY_ID,
})

export const createCubidAppScopedSubject = (
  userId: string
): CubidAppScopedSubject => ({
  userId: assertNonEmptyString(userId, "userId", "app_scoped_subject"),
})

export const summarizeCubidDisclosedStamp = (
  record: Pick<
    CubidStampRecord,
    "identity" | "isValid" | "stampType" | "stampTypeId" | "uniqueValue"
  >
): CubidDisclosedStampSummary => {
  const rawStampTypeId = record.stampTypeId

  if (
    typeof rawStampTypeId !== "number" ||
    !Number.isInteger(rawStampTypeId) ||
    rawStampTypeId <= 0
  ) {
    throw new CubidApiError({
      category: "validation",
      code: "INVALID_STAMP_TYPE",
      endpoint: "stamps/summarize",
      message: "Stamp record is missing a valid stampTypeId.",
    })
  }
  const stampTypeId = rawStampTypeId

  const value =
    typeof record.identity === "string"
      ? record.identity
      : typeof record.uniqueValue === "string"
        ? record.uniqueValue
        : null

  return {
    stampType: record.stampType ?? getCubidStampTypeName(stampTypeId),
    stampTypeId,
    status: record.isValid ? "Verified" : "Unverified",
    value,
  }
}

const normalizeStampRecord = (
  raw: unknown,
  requestId?: string | null,
  status?: number
): CubidStampRecord => {
  const record = assertRecord(
    raw,
    "identity/fetch_stamps.all_stamps",
    requestId,
    status
  )
  const stampTypeId = asNumber(record.stamptype)

  return {
    emailForVerification: asString(record.emailForVerification),
    id: asNumber(record.id),
    identity: asString(record.identity),
    isValid: asBoolean(record.is_valid),
    permAvailable: asBoolean(record.permAvailable),
    raw: record,
    stampType:
      asString(record.stamptype_string) ??
      (typeof stampTypeId === "number"
        ? getCubidStampTypeName(stampTypeId)
        : null),
    stampTypeId,
    uniqueValue: asString(record.uniquevalue),
  }
}

const normalizeStamps = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidFetchStampsResponse => {
  const record = assertRecord(payload, "identity/fetch_stamps", requestId, status)
  const allStamps = Array.isArray(record.all_stamps) ? record.all_stamps : []

  return {
    allStamps: allStamps.map((stamp) =>
      normalizeStampRecord(stamp, requestId, status)
    ),
    email: asString(record.email),
    error: record.error ?? null,
    raw: record,
  }
}

const PROFILE_NAME_DISCLOSURE_CLAIMS: readonly CubidProfileDisclosureClaim[] = [
  "profile:name",
  "profile:*",
  "profile",
  "cubid:profile",
] as const

const ROUGH_LOCATION_DISCLOSURE_CLAIMS: readonly CubidLocationDisclosureClaim[] =
  ["location:rough", "location:approximate", "location:exact", "location:*"] as const

const APPROX_LOCATION_DISCLOSURE_CLAIMS: readonly CubidLocationDisclosureClaim[] =
  ["location:approximate", "location:exact", "location:*"] as const

const EXACT_LOCATION_DISCLOSURE_CLAIMS: readonly CubidLocationDisclosureClaim[] =
  ["location:exact", "location:*"] as const

const disclosureState = <TClaim extends string>(
  claims: readonly TClaim[],
  isAvailable: boolean
): CubidDisclosureState<TClaim> => ({
  claims,
  state: isAvailable ? "available" : "notGranted",
})

const normalizeApproxLocation = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidFetchApproxLocationResponse => {
  const record = assertRecord(
    payload,
    "identity/fetch_approx_location",
    requestId,
    status
  )
  const coordinates = asCoordinates(record.coordinates)
  const country = asString(record.country)
  const placeName = asString(record.placename)
  const plusCode = asString(record.pluscode)
  const postalCode = asString(record.postalcode)
  const hasApproxLocation =
    Boolean(coordinates) ||
    country !== null ||
    placeName !== null ||
    plusCode !== null ||
    postalCode !== null

  return {
    coordinates,
    country,
    disclosure: disclosureState(
      APPROX_LOCATION_DISCLOSURE_CLAIMS,
      hasApproxLocation
    ),
    error: record.error ?? null,
    granularity: "approximate",
    placeName,
    plusCode,
    postalCode,
    raw: record,
  }
}

const normalizeExactLocation = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidFetchExactLocationResponse => {
  const record = assertRecord(
    payload,
    "identity/fetch_exact_location",
    requestId,
    status
  )
  const coordinates = asCoordinates(record.coordinates)
  const country = asString(record.country)
  const place = record.place
  const hasExactLocation =
    Boolean(coordinates) || country !== null || place !== null && place !== undefined

  return {
    coordinates,
    country,
    disclosure: disclosureState(EXACT_LOCATION_DISCLOSURE_CLAIMS, hasExactLocation),
    error: record.error ?? null,
    granularity: "exact",
    place,
    raw: record,
  }
}

const normalizeRoughLocation = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidFetchRoughLocationResponse => {
  const record = assertRecord(
    payload,
    "identity/fetch_rough_location",
    requestId,
    status
  )
  const coordinates = asCoordinates(record.coordinates)
  const country = record.country ?? record.cubid_country ?? null
  const plusCode = asString(record.pluscode)
  const hasRoughLocation =
    Boolean(coordinates) || country !== null || plusCode !== null

  return {
    coordinates,
    country,
    disclosure: disclosureState(
      ROUGH_LOCATION_DISCLOSURE_CLAIMS,
      hasRoughLocation
    ),
    error: record.error ?? null,
    granularity: "rough",
    plusCode,
    raw: record,
  }
}

const normalizeUserData = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidFetchUserDataResponse => {
  const record = assertRecord(payload, "identity/fetch_user_data", requestId, status)
  const coordinates = asCoordinates(record.coordinates)
  const country = asString(record.country)
  const name = asString(record.name)
  const placeName = asString(record.placename)
  const hasApproxLocation =
    Boolean(coordinates) || country !== null || placeName !== null

  return {
    coordinates,
    country,
    error: record.error ?? null,
    locationDisclosure: {
      ...disclosureState(APPROX_LOCATION_DISCLOSURE_CLAIMS, hasApproxLocation),
      granularity: "approximate",
    },
    name,
    placeName,
    profileNameDisclosure: disclosureState(
      PROFILE_NAME_DISCLOSURE_CLAIMS,
      name !== null
    ),
    raw: record,
  }
}

const normalizeSearchLocation = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidSearchLocationResponse => {
  if (!Array.isArray(payload)) {
    throw new CubidApiError({
      category: "upstream",
      code: "MALFORMED_RESPONSE",
      details: payload,
      endpoint: "search-location",
      message: "Malformed response from search-location.",
      requestId,
      status,
    })
  }

  return payload.map((item) => (isRecord(item) ? item : { value: item }))
}

const normalizeAddStamp = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidAddStampResponse => {
  const record = assertRecord(payload, "identity/add_stamp", requestId, status)

  return {
    raw: record,
    success: Boolean(record.success),
  }
}

const normalizeEmailOtpSent = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidSendEmailOtpResponse => {
  const record = assertRecord(payload, "email/send_otp", requestId, status)
  const data = isRecord(record.data) ? record.data : record

  return {
    dappId:
      typeof data.dappId === "number" || typeof data.dappId === "string"
        ? data.dappId
        : undefined,
    email: asString(data.email),
    raw: record,
    sent: data.sent === undefined ? true : Boolean(data.sent),
  }
}

const normalizeEmailOtpVerified = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidVerifyEmailOtpResponse => {
  const record = assertRecord(payload, "email/verify_otp", requestId, status)
  const data = isRecord(record.data) ? record.data : record

  return {
    dappId:
      typeof data.dappId === "number" || typeof data.dappId === "string"
        ? data.dappId
        : undefined,
    email: asString(data.email),
    isVerified: Boolean(data.is_verified),
    raw: record,
  }
}

const normalizePhoneOtpSent = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidSendPhoneOtpResponse => {
  if (typeof payload === "string") {
    return {
      raw: { message: payload },
      status: payload,
    }
  }

  const record = assertRecord(payload, "twillio/send-otp", requestId, status)
  const data = isRecord(record.data) ? record.data : record

  return {
    raw: record,
    status: asString(data.status) ?? asString(data.message),
  }
}

const normalizePhoneOtpVerified = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidVerifyPhoneOtpResponse => {
  const record = assertRecord(payload, "twillio/verify-otp", requestId, status)
  const data = isRecord(record.data) ? record.data : record
  const verificationStatus = asString(data.status)

  return {
    isVerified:
      Boolean(data.is_verified) ||
      verificationStatus === "approved" ||
      verificationStatus === "verified",
    raw: record,
    status: verificationStatus,
  }
}

const normalizeCustodyChain = (value: unknown): CubidCustodyChain | string =>
  asString(value) ?? "unknown"

const normalizePublicAddress = (chain: CubidCustodyChain | string, value: unknown) => {
  const address = asString(value)
  if (address === null) {
    return null
  }
  return chain === "sui" ? address.toLowerCase() : address
}

const normalizeCustodyAccount = (
  payload: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): CubidCustodyAccount => {
  const record = assertRecord(payload, endpoint, requestId, status)
  const chain = normalizeCustodyChain(record.chain)

  return {
    accountId: asString(record.accountId),
    chain,
    createdAt: asString(record.createdAt),
    custodyStatus: asString(record.custodyStatus),
    dappUserAccountId: asString(record.dappUserAccountId),
    label: asString(record.label),
    linkStatus: asString(record.linkStatus) ?? undefined,
    publicAddress: normalizePublicAddress(chain, record.publicAddress),
    raw: record,
    updatedAt: asString(record.updatedAt) ?? undefined,
    userId: asString(record.dappUserUuid),
  }
}

const normalizeSaveSecret = (
  payload: unknown,
  requestId: string | null | undefined,
  status: number | undefined,
  idempotencyKey: string
): CubidSaveSecretResponse => {
  const record = assertRecord(payload, "v3/save_secret", requestId, status)

  return {
    idempotencyKey,
    raw: record,
    success: Boolean(record.success),
  }
}

const normalizeGenerateAccount = (
  payload: unknown,
  requestId: string | null | undefined,
  status: number | undefined,
  idempotencyKey: string
): CubidGenerateAccountResponse => {
  const record = assertRecord(payload, "v3/accounts/generate", requestId, status)

  return {
    account: normalizeCustodyAccount(
      record.data ?? record,
      "v3/accounts/generate.data",
      requestId,
      status
    ),
    idempotencyKey,
    raw: record,
  }
}

const normalizeListAccounts = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidListAccountsResponse => {
  const record = assertRecord(payload, "v3/accounts/list", requestId, status)
  const items = Array.isArray(record.data) ? record.data : []

  return {
    accounts: items.map((item) =>
      normalizeCustodyAccount(item, "v3/accounts/list.data", requestId, status)
    ),
    raw: record,
  }
}

const normalizeWalletChainActions = (
  payload: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): CubidWalletChainActions => {
  const record = assertRecord(payload, endpoint, requestId, status)

  return {
    accountLookup: asBoolean(record.accountLookup) ?? false,
    directGeneration: asBoolean(record.directGeneration) ?? false,
    messageSigning: asBoolean(record.messageSigning) ?? false,
    passkeyApprovedCreation: asBoolean(record.passkeyApprovedCreation) ?? false,
    raw: record,
    transactionSigning: asBoolean(record.transactionSigning) ?? false,
    transactionSigningStatus:
      asString(record.transactionSigningStatus) ??
      asString(record.transaction_signing_status),
    typedDataSigning: asBoolean(record.typedDataSigning) ?? false,
  }
}

const normalizeWalletPolicy = (
  payload: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): CubidWalletPolicy => {
  if (!isRecord(payload)) {
    return {
      allowedChains: [],
      allowedRequestTypes: [],
      custodyEnabled: false,
      policyStatus: "missing",
      policyVersion: 0,
      raw: null,
      requiredAcr: null,
      sandboxMode: true,
      signingEnabled: false,
    }
  }

  const record = assertRecord(payload, endpoint, requestId, status)

  return {
    allowedChains: asStringArray(record.allowedChains ?? record.allowed_chains),
    allowedRequestTypes: asStringArray(
      record.allowedRequestTypes ?? record.allowed_request_types
    ),
    custodyEnabled: asBoolean(record.custodyEnabled ?? record.custody_enabled) ?? false,
    policyStatus:
      asString(record.policyStatus ?? record.policy_status) ?? "missing",
    policyVersion:
      asNumberLike(record.policyVersion ?? record.policy_version) ?? 0,
    raw: record,
    requiredAcr: asString(record.requiredAcr ?? record.required_acr),
    sandboxMode: asBoolean(record.sandboxMode ?? record.sandbox_mode) ?? true,
    signingEnabled: asBoolean(record.signingEnabled ?? record.signing_enabled) ?? false,
  }
}

const normalizeWalletCapabilities = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidFetchWalletCapabilitiesResponse => {
  const record = assertRecord(payload, "v3/accounts/capabilities", requestId, status)
  const data = assertRecord(
    record.data ?? record,
    "v3/accounts/capabilities.data",
    requestId,
    status
  )
  const walletActionsByChainRecord =
    isRecord(data.walletActionsByChain) ? data.walletActionsByChain : {}
  const accounts = Array.isArray(data.accounts) ? data.accounts : []

  return {
    capabilities: {
      accountCreationModes: {
        directGenerateEnabled:
          asBoolean(
            isRecord(data.accountCreationModes)
              ? data.accountCreationModes.directGenerateEnabled
              : undefined
          ) ?? false,
        passkeyApprovedRequestEnabled:
          asBoolean(
            isRecord(data.accountCreationModes)
              ? data.accountCreationModes.passkeyApprovedRequestEnabled
              : undefined
          ) ?? false,
      },
      accounts: accounts.map((item) =>
        normalizeCustodyAccount(item, "v3/accounts/capabilities.data.accounts", requestId, status)
      ),
      dappId: asString(data.dappId) ?? asString(data.dapp_id),
      dappUserUuid: asString(data.dappUserUuid) ?? asString(data.dapp_user_uuid),
      policy: normalizeWalletPolicy(
        data.policy,
        "v3/accounts/capabilities.data.policy",
        requestId,
        status
      ),
      raw: data,
      supportedChains: asStringArray(data.supportedChains ?? data.supported_chains),
      walletActionsByChain: Object.fromEntries(
        Object.entries(walletActionsByChainRecord).map(([chainKey, chainValue]) => [
          chainKey,
          normalizeWalletChainActions(
            chainValue,
            `v3/accounts/capabilities.data.walletActionsByChain.${chainKey}`,
            requestId,
            status
          ),
        ])
      ),
    },
    raw: record,
  }
}

const normalizeAccountRequestStatus = (
  value: unknown
): CubidAccountRequestStatus | null => asString(value)

const normalizeAccountRequestSummary = (
  payload: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): CubidAccountRequestSummary => {
  const record = assertRecord(payload, endpoint, requestId, status)

  return {
    accountId: asString(record.accountId) ?? asString(record.account_id),
    accountRequestId:
      asString(record.accountRequestId) ?? asString(record.account_request_id),
    approvedAt: asString(record.approvedAt) ?? asString(record.approved_at),
    chain: asString(record.chain) ?? asString(record.chain_key),
    createdAt: asString(record.createdAt) ?? asString(record.created_at),
    dappId: asString(record.dappId) ?? asString(record.dapp_id),
    dappUserAccountId:
      asString(record.dappUserAccountId) ?? asString(record.dapp_user_account_id),
    dappUserUuid:
      asString(record.dappUserUuid) ?? asString(record.dapp_user_uuid),
    errorCode: asString(record.errorCode) ?? asString(record.error_code),
    errorMessage: asString(record.errorMessage) ?? asString(record.error_message),
    expiresAt: asString(record.expiresAt) ?? asString(record.expires_at),
    label: asString(record.label),
    policyVersion:
      asNumberLike(record.policyVersion ?? record.policy_version) ?? null,
    publicAddress:
      asString(record.publicAddress) ?? asString(record.public_address),
    raw: record,
    rejectedAt: asString(record.rejectedAt) ?? asString(record.rejected_at),
    requiredAcr: asString(record.requiredAcr) ?? asString(record.required_acr),
    status: normalizeAccountRequestStatus(record.status),
    updatedAt: asString(record.updatedAt) ?? asString(record.updated_at),
  }
}

const normalizeCreateAccountRequest = (
  payload: unknown,
  requestId: string | null | undefined,
  status: number | undefined,
  idempotencyKey: string
): CubidCreateAccountRequestResponse => {
  const record = assertRecord(payload, "v3/accounts/requests/create", requestId, status)

  return {
    accountRequest: normalizeAccountRequestSummary(
      record.data ?? record,
      "v3/accounts/requests/create.data",
      requestId,
      status
    ),
    idempotencyKey,
    raw: record,
  }
}

const normalizeGetAccountRequest = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidGetAccountRequestResponse => {
  const record = assertRecord(payload, "v3/accounts/requests/get", requestId, status)

  return {
    accountRequest: normalizeAccountRequestSummary(
      record.data ?? record,
      "v3/accounts/requests/get.data",
      requestId,
      status
    ),
    raw: record,
  }
}

const normalizeSigningRequestType = (
  value: unknown
): CubidSigningRequestType | null => asString(value)

const normalizeSigningRequestStatus = (
  value: unknown
): CubidSigningRequestStatus | null => asString(value)

const normalizeSigningRequestRiskLevel = (
  value: unknown
): CubidSigningRequestRiskLevel => {
  const normalized = asString(value)
  return normalized === "low" || normalized === "medium" || normalized === "high"
    ? normalized
    : null
}

const normalizeSigningRequestPolicyDecision = (
  value: unknown
): CubidSigningRequestPolicyDecision => {
  const normalized = asString(value)
  return normalized === "allowed" || normalized === "denied" ? normalized : null
}

const normalizeSigningRequestResult = (
  value: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): CubidSigningRequestResult | null => {
  if (!isRecord(value)) {
    return null
  }

  const record = assertRecord(value, endpoint, requestId, status)
  const type = asString(record.type)

  if (type === "signature" && typeof record.signature === "string") {
    return {
      algorithm: asString(record.algorithm),
      publicAddress:
        asString(record.publicAddress) ?? asString(record.public_address),
      raw: record,
      signature: record.signature,
      type,
    }
  }

  if (
    type === "signed_transaction" &&
    typeof record.signedTransaction === "string"
  ) {
    return {
      algorithm: asString(record.algorithm),
      chainId: asNumberLike(record.chainId ?? record.chain_id),
      publicAddress:
        asString(record.publicAddress) ?? asString(record.public_address),
      raw: record,
      signedTransaction: record.signedTransaction,
      transactionHash:
        asString(record.transactionHash) ?? asString(record.transaction_hash),
      type,
    }
  }

  return {
    raw: record,
    type,
  }
}

const normalizeSigningRequestSummary = (
  payload: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): CubidSigningRequestSummary => {
  const record = assertRecord(payload, endpoint, requestId, status)
  const chain = asString(record.chain)

  return {
    approvedAt: asString(record.approvedAt) ?? asString(record.approved_at) ?? undefined,
    cancelledAt: asString(record.cancelledAt) ?? asString(record.cancelled_at) ?? undefined,
    chain: chain ?? null,
    completedAt: asString(record.completedAt) ?? asString(record.completed_at) ?? undefined,
    createdAt: asString(record.createdAt) ?? asString(record.created_at),
    errorCode: asString(record.errorCode) ?? asString(record.error_code),
    errorMessage: asString(record.errorMessage) ?? asString(record.error_message),
    expiresAt: asString(record.expiresAt) ?? asString(record.expires_at) ?? undefined,
    payloadHash: asString(record.payloadHash) ?? asString(record.payload_hash),
    payloadSummary: isRecord(record.payloadSummary)
      ? record.payloadSummary
      : isRecord(record.payload_summary)
        ? record.payload_summary
        : null,
    policyDecision: normalizeSigningRequestPolicyDecision(
      record.policyDecision ?? record.policy_decision
    ),
    policyVersion:
      asNumberLike(record.policyVersion ?? record.policy_version) ?? null,
    raw: record,
    rejectedAt: asString(record.rejectedAt) ?? asString(record.rejected_at) ?? undefined,
    requiredAcr: asString(record.requiredAcr) ?? asString(record.required_acr),
    result: normalizeSigningRequestResult(
      record.result,
      `${endpoint}.result`,
      requestId,
      status
    ),
    riskLevel: normalizeSigningRequestRiskLevel(
      record.riskLevel ?? record.risk_level
    ),
    riskReasons: asStringArray(record.riskReasons ?? record.risk_reasons),
    signingRequestId:
      asString(record.signingRequestId) ?? asString(record.signing_request_id),
    status: normalizeSigningRequestStatus(record.status),
    stepUpRequired:
      asBoolean(record.stepUpRequired ?? record.step_up_required) ?? false,
    transactionContractAddress:
      asString(record.transactionContractAddress) ??
      asString(record.transaction_contract_address),
    transactionDeclaredValueUsd:
      asNumber(record.transactionDeclaredValueUsd) ??
      asNumber(record.transaction_declared_value_usd) ??
      null,
    transactionOperationType:
      asString(record.transactionOperationType) ??
      asString(record.transaction_operation_type),
    transactionRecipient:
      asString(record.transactionRecipient) ??
      asString(record.transaction_recipient),
    requestType: normalizeSigningRequestType(
      record.requestType ?? record.request_type
    ),
    updatedAt: asString(record.updatedAt) ?? asString(record.updated_at),
  }
}

const normalizeCreateSigningRequest = (
  payload: unknown,
  requestId: string | null | undefined,
  status: number | undefined,
  idempotencyKey: string
): CubidCreateSigningRequestResponse => {
  const record = assertRecord(payload, "v3/signing/requests/create", requestId, status)

  return {
    idempotencyKey,
    raw: record,
    signingRequest: normalizeSigningRequestSummary(
      record.data ?? record,
      "v3/signing/requests/create.data",
      requestId,
      status
    ),
  }
}

const normalizeGetSigningRequest = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidGetSigningRequestResponse => {
  const record = assertRecord(payload, "v3/signing/requests/get", requestId, status)

  return {
    raw: record,
    signingRequest: normalizeSigningRequestSummary(
      record.data ?? record,
      "v3/signing/requests/get.data",
      requestId,
      status
    ),
  }
}

const normalizeListSigningRequests = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidListSigningRequestsResponse => {
  const record = assertRecord(payload, "v3/signing/requests/list", requestId, status)
  const data = record.data
  const items = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray(data.items)
      ? data.items
      : data === undefined
        ? []
        : null

  if (items === null) {
    throw new CubidApiError({
      category: "upstream",
      code: "MALFORMED_RESPONSE",
      details: payload,
      endpoint: "v3/signing/requests/list.data",
      message: "Malformed response from v3/signing/requests/list.data.",
      requestId,
      status,
    })
  }

  return {
    raw: record,
    signingRequests: items.map((item) =>
      normalizeSigningRequestSummary(
        item,
        "v3/signing/requests/list.data",
        requestId,
        status
      )
    ),
  }
}

const normalizeCancelSigningRequest = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidCancelSigningRequestResponse => {
  const record = assertRecord(payload, "v3/signing/requests/cancel", requestId, status)

  return {
    raw: record,
    signingRequest: normalizeSigningRequestSummary(
      record.data ?? record,
      "v3/signing/requests/cancel.data",
      requestId,
      status
    ),
  }
}

const normalizeSendNotification = (
  payload: unknown,
  requestId: string | null | undefined,
  status: number | undefined,
  idempotencyKey: string
): CubidSendNotificationResponse => {
  const record = assertRecord(payload, "v3/notifications/send", requestId, status)
  const data = assertRecord(
    record.data ?? record,
    "v3/notifications/send.data",
    requestId,
    status
  )

  return {
    category:
      asString(data.category) ??
      asString(record.category),
    createdAt:
      asString(data.createdAt) ??
      asString(data.created_at) ??
      asString(record.createdAt) ??
      asString(record.created_at),
    eventId:
      asString(data.eventId) ??
      asString(data.event_id) ??
      asString(record.eventId) ??
      asString(record.event_id),
    idempotencyKey,
    priority:
      asString(data.priority) ??
      asString(record.priority),
    raw: record,
    selectedChannelType:
      asString(data.selectedChannelType) ??
      asString(data.selected_channel_type) ??
      asString(record.selectedChannelType) ??
      asString(record.selected_channel_type),
    status:
      asString(data.status) ??
      asString(record.status),
  }
}

const normalizeNotificationDeliveryAttempt = (
  payload: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): CubidNotificationDeliveryAttempt => {
  const record = assertRecord(payload, endpoint, requestId, status)

  return {
    attemptId: asString(record.attemptId) ?? asString(record.attempt_id),
    channelType: asString(record.channelType) ?? asString(record.channel_type),
    createdAt: asString(record.createdAt) ?? asString(record.created_at),
    failureCode: asString(record.failureCode) ?? asString(record.failure_code),
    failureMessage:
      asString(record.failureMessage) ?? asString(record.failure_message),
    providerKey: asString(record.providerKey) ?? asString(record.provider_key),
    raw: record,
    status: asString(record.status),
    updatedAt: asString(record.updatedAt) ?? asString(record.updated_at),
  }
}

const normalizeNotificationStatusSummary = (
  payload: unknown,
  endpoint: string,
  requestId?: string | null,
  status?: number
): CubidNotificationStatusSummary => {
  const record = assertRecord(payload, endpoint, requestId, status)
  const attempts = Array.isArray(record.deliveryAttempts)
    ? record.deliveryAttempts
    : Array.isArray(record.delivery_attempts)
      ? record.delivery_attempts
      : []

  return {
    category: asString(record.category),
    createdAt: asString(record.createdAt) ?? asString(record.created_at),
    deliveryAttempts: attempts.map((attempt) =>
      normalizeNotificationDeliveryAttempt(
        attempt,
        `${endpoint}.deliveryAttempts`,
        requestId,
        status
      )
    ),
    eventId: asString(record.eventId) ?? asString(record.event_id),
    latestDeliveryAttemptAt:
      asString(record.latestDeliveryAttemptAt) ??
      asString(record.latest_delivery_attempt_at),
    latestDeliveryStatus:
      asString(record.latestDeliveryStatus) ??
      asString(record.latest_delivery_status),
    priority: asString(record.priority),
    raw: record,
    selectedChannelType:
      asString(record.selectedChannelType) ??
      asString(record.selected_channel_type),
    status: asString(record.status),
    updatedAt: asString(record.updatedAt) ?? asString(record.updated_at),
  }
}

const normalizeGetNotificationStatus = (
  payload: unknown,
  requestId?: string | null,
  status?: number
): CubidGetNotificationStatusResponse => {
  const record = assertRecord(payload, "v3/notifications/status", requestId, status)

  return {
    notification: normalizeNotificationStatusSummary(
      record.data ?? record,
      "v3/notifications/status.data",
      requestId,
      status
    ),
    raw: record,
  }
}

const resolveCrypto = (): Crypto => {
  if (typeof globalThis.crypto === "object" && globalThis.crypto !== null) {
    return globalThis.crypto
  }

  throw new CubidApiError({
    category: "config",
    message:
      "No Web Crypto implementation is available. Pass an explicit idempotency key or run in a runtime that provides globalThis.crypto.",
  })
}

const bytesToUuid = (bytes: Uint8Array): string => {
  const normalized = bytes.slice(0, 16)
  normalized[6] = ((normalized[6] ?? 0) & 0x0f) | 0x40
  normalized[8] = ((normalized[8] ?? 0) & 0x3f) | 0x80
  const hex = Array.from(normalized, (value) => value.toString(16).padStart(2, "0"))

  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-")
}

const resolveIdempotencyKey = (
  input: CubidIdempotentRequestOptions | undefined,
  endpoint: string
): string => {
  if (input?.idempotencyKey !== undefined) {
    return assertNonEmptyString(input.idempotencyKey, "idempotencyKey", endpoint)
  }

  const cryptoImpl = resolveCrypto()
  if (typeof cryptoImpl.randomUUID === "function") {
    return cryptoImpl.randomUUID()
  }

  if (typeof cryptoImpl.getRandomValues === "function") {
    return bytesToUuid(cryptoImpl.getRandomValues(new Uint8Array(16)))
  }

  throw new CubidApiError({
    category: "config",
    endpoint,
    message:
      "No secure random UUID generator is available. Pass an explicit idempotency key for this request.",
  })
}

const assertSecret = (value: string, field: string, endpoint: string): string =>
  assertNonEmptyString(value, field, endpoint)

const assertTimestampMs = (value: string, endpoint: string): number => {
  const normalized = assertNonEmptyString(value, "timestamp", endpoint)
  const parsed = Number(normalized)

  if (
    !/^\d+$/.test(normalized) ||
    !Number.isFinite(parsed) ||
    !Number.isSafeInteger(parsed)
  ) {
    throw new CubidApiError({
      category: "validation",
      code: "INVALID_WEBHOOK_TIMESTAMP",
      endpoint,
      message: "Webhook timestamp must be a Unix epoch string.",
    })
  }

  return parsed * 1000
}

const assertWebhookToleranceSeconds = (value: number, endpoint: string): number => {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0) {
    throw new CubidApiError({
      category: "validation",
      code: "INVALID_WEBHOOK_TOLERANCE",
      endpoint,
      message: "Webhook toleranceSeconds must be a non-negative integer.",
    })
  }

  return value
}

const normalizeNowMs = (value: Date | number | undefined): number => {
  const normalized =
    value instanceof Date ? value.getTime() : typeof value === "number" ? value : Date.now()

  if (!Number.isFinite(normalized) || normalized < 0) {
    throw new CubidApiError({
      category: "validation",
      code: "INVALID_WEBHOOK_NOW",
      endpoint: "webhooks/verify_signature",
      message: "Webhook now override must be a finite non-negative epoch in milliseconds.",
    })
  }

  return normalized
}

const textEncoder = new TextEncoder()

const toBytes = (value: string | Uint8Array): Uint8Array =>
  typeof value === "string" ? textEncoder.encode(value) : value

const concatBytes = (...chunks: Uint8Array[]): Uint8Array => {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0)
  const result = new Uint8Array(totalLength)
  let offset = 0

  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }

  return result
}

const bytesToHex = (bytes: Uint8Array): string =>
  Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("")

const toArrayBuffer = (bytes: Uint8Array): ArrayBuffer => {
  if (
    bytes.byteOffset === 0 &&
    bytes.byteLength === bytes.buffer.byteLength &&
    bytes.buffer instanceof ArrayBuffer
  ) {
    return bytes.buffer
  }

  return bytes.slice().buffer
}

const hexToBytes = (value: string, endpoint: string): Uint8Array => {
  const normalized = value.trim().toLowerCase()
  if (!/^[0-9a-f]+$/.test(normalized) || normalized.length % 2 !== 0) {
    throw new CubidApiError({
      category: "validation",
      code: "INVALID_WEBHOOK_SIGNATURE",
      endpoint,
      message: "Webhook signature must be a hex string.",
    })
  }

  const bytes = new Uint8Array(normalized.length / 2)
  for (let index = 0; index < normalized.length; index += 2) {
    bytes[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16)
  }

  return bytes
}

const timingSafeBytesEqual = (left: Uint8Array, right: Uint8Array): boolean => {
  if (left.length !== right.length) {
    return false
  }

  let diff = 0
  for (let index = 0; index < left.length; index += 1) {
    diff |= left[index]! ^ right[index]!
  }

  return diff === 0
}

const extractSignatureValue = (signature: string, endpoint: string): string => {
  const normalized = assertNonEmptyString(signature, "signature", endpoint)
  const parts = normalized.split(",").map((part) => part.trim())

  for (const part of parts) {
    if (part.startsWith("v1=")) {
      return part.slice(3)
    }
  }

  if (normalized.startsWith("v1=")) {
    return normalized.slice(3)
  }

  throw new CubidApiError({
    category: "validation",
    code: "INVALID_WEBHOOK_SIGNATURE",
    endpoint,
    message: "Webhook signature header must include a v1 signature.",
  })
}

const signWebhookPayload = async (
  secret: string,
  eventId: string,
  timestamp: string,
  payload: string | Uint8Array
): Promise<string> => {
  const cryptoImpl = resolveCrypto()
  const key = await cryptoImpl.subtle.importKey(
    "raw",
    toArrayBuffer(textEncoder.encode(secret)),
    { hash: "SHA-256", name: "HMAC" },
    false,
    ["sign"]
  )

  const signatureInput = concatBytes(
    textEncoder.encode(eventId),
    textEncoder.encode("."),
    textEncoder.encode(timestamp),
    textEncoder.encode("."),
    toBytes(payload)
  )

  const signature = await cryptoImpl.subtle.sign(
    "HMAC",
    key,
    toArrayBuffer(signatureInput)
  )
  return bytesToHex(new Uint8Array(signature))
}

export const verifyCubidWebhookSignature = async (
  input: CubidVerifyWebhookSignatureInput
): Promise<CubidWebhookVerificationResult> => {
  const endpoint = "webhooks/verify_signature"
  const secret = assertSecret(input.secret, "secret", endpoint)
  const eventId = assertNonEmptyString(input.eventId, "eventId", endpoint)
  const timestamp = assertNonEmptyString(input.timestamp, "timestamp", endpoint)
  const signatureVersion = input.signatureVersion?.trim() || "v1"

  if (signatureVersion !== "v1") {
    throw new CubidApiError({
      category: "validation",
      code: "UNSUPPORTED_WEBHOOK_SIGNATURE_VERSION",
      endpoint,
      message: `Unsupported webhook signature version: ${signatureVersion}.`,
    })
  }

  const toleranceSeconds =
    input.toleranceSeconds === undefined
      ? 300
      : assertWebhookToleranceSeconds(input.toleranceSeconds, endpoint)
  const timestampMs = assertTimestampMs(timestamp, endpoint)
  const nowMs = normalizeNowMs(input.now)

  if (Math.abs(nowMs - timestampMs) > toleranceSeconds * 1000) {
    throw new CubidApiError({
      category: "validation",
      code: "WEBHOOK_TIMESTAMP_EXPIRED",
      endpoint,
      message: "Webhook timestamp is outside the allowed tolerance window.",
    })
  }

  const expectedHex = await signWebhookPayload(
    secret,
    eventId,
    timestamp,
    input.payload
  )
  const actualBytes = hexToBytes(extractSignatureValue(input.signature, endpoint), endpoint)
  const expectedBytes = hexToBytes(expectedHex, endpoint)

  if (!timingSafeBytesEqual(actualBytes, expectedBytes)) {
    throw new CubidApiError({
      category: "auth",
      code: "INVALID_WEBHOOK_SIGNATURE",
      endpoint,
      message: "Webhook signature verification failed.",
    })
  }

  return {
    eventId,
    signatureVersion: "v1",
    timestamp,
    verified: true,
  }
}

export const parseCubidWebhookEvent = <TData = unknown>(
  payload: unknown
): CubidWebhookEvent<TData> => {
  const record = assertRecord(payload, "webhooks/parse_event")

  return {
    apiVersion: asString(record.apiVersion),
    createdAt: asString(record.createdAt),
    dapp: isRecord(record.dapp) ? record.dapp : null,
    data: (record.data as TData | null | undefined) ?? null,
    eventId: asString(record.eventId),
    eventType: asString(record.eventType),
    legacyEventType: asString(record.legacyEventType),
    payloadVersion: asString(record.payloadVersion),
    raw: record,
    requestId: asString(record.requestId),
    subject: isRecord(record.subject) ? record.subject : null,
  }
}

export const createCubidApiClient = (
  options: CubidApiClientOptions
): CubidApiClient => {
  const baseUrl = normalizeBaseUrl(options.baseUrl)
  const apiKey = assertApiKey(options.apiKey)
  const fetchImpl = resolveFetch(options.fetch)
  const headers = options.headers

  const withCredentials = (body: CubidRequestBody): CubidRequestBody => {
    const withApiKey = {
      ...body,
      apikey: apiKey,
    }

    if (options.dappId === undefined || "dapp_id" in withApiKey) {
      return withApiKey
    }

    return {
      ...withApiKey,
      dapp_id: options.dappId,
    }
  }

  const withV3Credentials = (body: CubidRequestBody): CubidRequestBody => {
    const withApiKey = {
      ...body,
      api_key: apiKey,
    }

    if (options.dappId === undefined || "dapp_id" in withApiKey) {
      return withApiKey
    }

    return {
      ...withApiKey,
      dapp_id: options.dappId,
    }
  }

  const client: CubidApiClient = {
    addStamp(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "identity/add_stamp"
      )
      const stampType = assertNonEmptyString(
        input.stampType,
        "stampType",
        "identity/add_stamp"
      )

      return makeRequest<CubidAddStampResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/identity/add_stamp",
        {
          page_id:
            typeof input.pageId === "string"
              ? Number(input.pageId) || input.pageId
              : input.pageId,
          stamp_type: stampType,
          stampData: input.stampData,
          user_data: { uuid: userId },
        },
        "identity/add_stamp",
        normalizeAddStamp,
        headers
      )
    },

    config: {
      baseUrl,
      dappId: options.dappId,
      headers,
    },

    createUser(input) {
      const dappId = input.dappId ?? options.dappId
      if (dappId === undefined) {
        throw new CubidApiError({
          category: "config",
          message: "dappId is required for createUser.",
        })
      }

      return makeRequest<CubidCreateUserResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/create_user",
        withCredentials({
          dapp_id: dappId,
          email: input.email,
          evm: input.evm,
          github_sub: input.githubSub,
          google_sub: input.googleSub,
          linkedin_sub: input.linkedinSub,
          phone: input.phone,
          twitter_sub: input.twitterSub,
        }),
        "create_user",
        normalizeCreateUser,
        headers
      )
    },

    async ensureUserByEmail(input) {
      const email = assertNonEmptyString(
        input.email,
        "email",
        "ensure_user_by_email"
      )
      const created = await client.createUser({
        dappId: input.dappId,
        email,
      })

      if (!created.userId) {
        throw new CubidApiError({
          category: "upstream",
          code: "MALFORMED_RESPONSE",
          details: created.raw,
          endpoint: "create_user",
          message:
            "Cubid create_user did not return a canonical user identifier.",
        })
      }

      return {
        ...created,
        email,
        userId: created.userId,
      }
    },

    fetchWalletCapabilities(input = {}) {
      const userId =
        input.userId === undefined
          ? undefined
          : assertNonEmptyString(
              input.userId,
              "userId",
              "v3/accounts/capabilities"
            )

      return makeRequest<CubidFetchWalletCapabilitiesResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/accounts/capabilities",
        withV3Credentials({
          dapp_user_uuid: userId,
        }),
        "v3/accounts/capabilities",
        normalizeWalletCapabilities,
        headers
      )
    },

    fetchApproxLocation(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "identity/fetch_approx_location"
      )

      return makeRequest<CubidFetchApproxLocationResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/identity/fetch_approx_location",
        withCredentials({ user_id: userId }),
        "identity/fetch_approx_location",
        normalizeApproxLocation,
        headers
      )
    },

    fetchExactLocation(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "identity/fetch_exact_location"
      )

      return makeRequest<CubidFetchExactLocationResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/identity/fetch_exact_location",
        withCredentials({ user_id: userId }),
        "identity/fetch_exact_location",
        normalizeExactLocation,
        headers
      )
    },

    fetchIdentity(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "identity/fetch_identity"
      )

      return makeRequest<CubidFetchIdentityResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/identity/fetch_identity",
        withCredentials({
          user_id: userId,
        }),
        "identity/fetch_identity",
        normalizeIdentity,
        headers
      )
    },

    fetchRoughLocation(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "identity/fetch_rough_location"
      )

      return makeRequest<CubidFetchRoughLocationResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/identity/fetch_rough_location",
        withCredentials({ user_id: userId }),
        "identity/fetch_rough_location",
        normalizeRoughLocation,
        headers
      )
    },

    fetchScore(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "score/fetch_score"
      )

      return makeRequest<CubidFetchScoreResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/score/fetch_score",
        withCredentials({
          user_id: userId,
        }),
        "score/fetch_score",
        normalizeScore,
        headers
      )
    },

    fetchStamps(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "identity/fetch_stamps"
      )

      return makeRequest<CubidFetchStampsResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/identity/fetch_stamps",
        withCredentials({
          user_id: userId,
        }),
        "identity/fetch_stamps",
        normalizeStamps,
        headers
      )
    },

    fetchUserData(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "identity/fetch_user_data"
      )

      return makeRequest<CubidFetchUserDataResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/identity/fetch_user_data",
        withCredentials({ user_id: userId }),
        "identity/fetch_user_data",
        normalizeUserData,
        headers
      )
    },

    createAccountRequest(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "v3/accounts/requests/create"
      )
      const chain = assertNonEmptyString(
        input.chain,
        "chain",
        "v3/accounts/requests/create"
      )
      const idempotencyKey = resolveIdempotencyKey(
        input,
        "v3/accounts/requests/create"
      )

      return makeRequest<CubidCreateAccountRequestResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/accounts/requests/create",
        withV3Credentials({
          chain,
          dapp_user_uuid: userId,
          label: input.label?.trim() ? input.label.trim() : undefined,
        }),
        "v3/accounts/requests/create",
        (payload, requestId, responseStatus) =>
          normalizeCreateAccountRequest(
            payload,
            requestId,
            responseStatus,
            idempotencyKey
          ),
        headers,
        {
          "Idempotency-Key": idempotencyKey,
        }
      )
    },

    getNotificationStatus(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "v3/notifications/status"
      )
      const eventId = assertNonEmptyString(
        input.eventId,
        "eventId",
        "v3/notifications/status"
      )

      return makeRequest<CubidGetNotificationStatusResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/notifications/status",
        withCredentials({
          dapp_user_uuid: userId,
          event_id: eventId,
        }),
        "v3/notifications/status",
        normalizeGetNotificationStatus,
        headers
      )
    },

    sendNotification(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "v3/notifications/send"
      )
      const category = assertNonEmptyString(
        input.category,
        "category",
        "v3/notifications/send"
      )
      const priority = assertNonEmptyString(
        input.priority,
        "priority",
        "v3/notifications/send"
      )
      const title = assertNonEmptyString(
        input.title,
        "title",
        "v3/notifications/send"
      )
      const body = assertNonEmptyString(
        input.body,
        "body",
        "v3/notifications/send"
      )
      const deepLink =
        input.deepLink === undefined
          ? undefined
          : assertNonEmptyString(
              input.deepLink,
              "deepLink",
              "v3/notifications/send"
            )
      let metadata: Record<string, unknown> | undefined
      if (input.metadata !== undefined) {
        if (!isRecord(input.metadata)) {
          throw new CubidApiError({
            category: "validation",
            code: "INVALID_INPUT",
            endpoint: "v3/notifications/send",
            message: "metadata must be an object when provided.",
          })
        }
        metadata = input.metadata
      }
      const idempotencyKey = resolveIdempotencyKey(
        input,
        "v3/notifications/send"
      )

      return makeRequest<CubidSendNotificationResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/notifications/send",
        withCredentials({
          body,
          category,
          dapp_user_uuid: userId,
          deep_link: deepLink,
          metadata,
          priority,
          title,
        }),
        "v3/notifications/send",
        (payload, requestId, responseStatus) =>
          normalizeSendNotification(
            payload,
            requestId,
            responseStatus,
            idempotencyKey
          ),
        headers,
        {
          "Idempotency-Key": idempotencyKey,
        }
      )
    },

    createSigningRequest(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "v3/signing/requests/create"
      )
      const userAccountId = assertNonEmptyString(
        input.userAccountId,
        "userAccountId",
        "v3/signing/requests/create"
      )
      const requestType = assertNonEmptyString(
        input.requestType,
        "requestType",
        "v3/signing/requests/create"
      )
      const payload = assertRecord(
        input.payload,
        "v3/signing/requests/create.payload"
      )
      const payloadSummary = assertRecord(
        input.payloadSummary,
        "v3/signing/requests/create.payload_summary"
      )
      const idempotencyKey = resolveIdempotencyKey(
        input,
        "v3/signing/requests/create"
      )

      return makeRequest<CubidCreateSigningRequestResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/signing/requests/create",
        withV3Credentials({
          chain: input.chain,
          dapp_user_uuid: userId,
          payload,
          payload_summary: payloadSummary,
          request_type: requestType,
          user_account_id: userAccountId,
        }),
        "v3/signing/requests/create",
        (responsePayload, requestId, responseStatus) =>
          normalizeCreateSigningRequest(
            responsePayload,
            requestId,
            responseStatus,
            idempotencyKey
          ),
        headers,
        {
          "Idempotency-Key": idempotencyKey,
        }
      )
    },

    getAccountRequest(input) {
      const accountRequestId = assertNonEmptyString(
        input.accountRequestId,
        "accountRequestId",
        "v3/accounts/requests/get"
      )

      return makeRequest<CubidGetAccountRequestResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/accounts/requests/get",
        withV3Credentials({
          account_request_id: accountRequestId,
        }),
        "v3/accounts/requests/get",
        normalizeGetAccountRequest,
        headers
      )
    },

    getSigningRequest(input) {
      const signingRequestId = assertNonEmptyString(
        input.signingRequestId,
        "signingRequestId",
        "v3/signing/requests/get"
      )

      return makeRequest<CubidGetSigningRequestResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/signing/requests/get",
        withV3Credentials({
          signing_request_id: signingRequestId,
        }),
        "v3/signing/requests/get",
        normalizeGetSigningRequest,
        headers
      )
    },

    generateAccount(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "v3/accounts/generate"
      )
      const chain = assertNonEmptyString(input.chain, "chain", "v3/accounts/generate")
      const idempotencyKey = resolveIdempotencyKey(input, "v3/accounts/generate")

      return makeRequest<CubidGenerateAccountResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/accounts/generate",
        withV3Credentials({
          chain,
          dapp_user_uuid: userId,
          label: input.label?.trim() ? input.label.trim() : undefined,
        }),
        "v3/accounts/generate",
        (payload, requestId, status) =>
          normalizeGenerateAccount(payload, requestId, status, idempotencyKey),
        headers,
        {
          "Idempotency-Key": idempotencyKey,
        }
      )
    },

    listAccounts(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "v3/accounts/list"
      )

      return makeRequest<CubidListAccountsResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/accounts/list",
        withV3Credentials({
          chain: input.chain,
          dapp_user_uuid: userId,
        }),
        "v3/accounts/list",
        normalizeListAccounts,
        headers
      )
    },

    listSigningRequests(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "v3/signing/requests/list"
      )
      const limit =
        input.limit === undefined
          ? undefined
          : assertPositiveInteger(input.limit, "limit", "v3/signing/requests/list")

      return makeRequest<CubidListSigningRequestsResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/signing/requests/list",
        withV3Credentials({
          dapp_user_uuid: userId,
          limit,
          user_account_id: input.userAccountId,
        }),
        "v3/signing/requests/list",
        normalizeListSigningRequests,
        headers
      )
    },

    cancelSigningRequest(input) {
      const signingRequestId = assertNonEmptyString(
        input.signingRequestId,
        "signingRequestId",
        "v3/signing/requests/cancel"
      )

      return makeRequest<CubidCancelSigningRequestResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/signing/requests/cancel",
        withV3Credentials({
          signing_request_id: signingRequestId,
        }),
        "v3/signing/requests/cancel",
        normalizeCancelSigningRequest,
        headers
      )
    },

    saveSecret(input) {
      const userId = assertNonEmptyString(input.userId, "userId", "v3/save_secret")
      const secret = assertNonEmptyString(input.secret, "secret", "v3/save_secret")
      const idempotencyKey = resolveIdempotencyKey(input, "v3/save_secret")

      return makeRequest<CubidSaveSecretResponse>(
        fetchImpl,
        baseUrl,
        "/api/v3/save_secret",
        withV3Credentials({
          secret,
          user_id: userId,
        }),
        "v3/save_secret",
        (payload, requestId, status) =>
          normalizeSaveSecret(payload, requestId, status, idempotencyKey),
        headers,
        {
          "Idempotency-Key": idempotencyKey,
        }
      )
    },

    searchLocation(input) {
      const locationInput = assertNonEmptyString(
        input.locationInput,
        "locationInput",
        "search-location"
      )

      return makeRequest<CubidSearchLocationResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/search-location",
        withCredentials({ location_input: locationInput }),
        "search-location",
        normalizeSearchLocation,
        headers
      )
    },

    sendEmailOtp(input) {
      const email = assertNonEmptyString(input.email, "email", "email/send_otp")

      return makeRequest<CubidSendEmailOtpResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/email/send_otp",
        withCredentials({ email }),
        "email/send_otp",
        normalizeEmailOtpSent,
        headers
      )
    },

    sendPhoneOtp(input) {
      const phone = assertNonEmptyString(input.phone, "phone", "twillio/send-otp")

      return makeRequest<CubidSendPhoneOtpResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/twillio/send-otp",
        withCredentials({ phone }),
        "twillio/send-otp",
        normalizePhoneOtpSent,
        headers
      )
    },

    async syncIdentitySnapshot(input) {
      const userId = assertNonEmptyString(
        input.userId,
        "userId",
        "sync_identity_snapshot"
      )
      const [identity, score, stamps] = await Promise.all([
        client.fetchIdentity({ userId }),
        client.fetchScore({ userId }),
        client.fetchStamps({ userId }),
      ])

      return {
        identity,
        score,
        stamps,
        syncedAt: new Date().toISOString(),
        userId,
      }
    },

    verifyEmailOtp(input) {
      const email = assertNonEmptyString(
        input.email,
        "email",
        "email/verify_otp"
      )
      const otp = String(input.otp).trim()
      if (!otp) {
        throw new CubidApiError({
          category: "validation",
          code: "INVALID_INPUT",
          endpoint: "email/verify_otp",
          message: "otp is required.",
        })
      }

      return makeRequest<CubidVerifyEmailOtpResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/email/verify_otp",
        withCredentials({ email, otp }),
        "email/verify_otp",
        normalizeEmailOtpVerified,
        headers
      )
    },

    verifyPhoneOtp(input) {
      const phone = assertNonEmptyString(
        input.phone,
        "phone",
        "twillio/verify-otp"
      )
      const otpCode = String(input.otp).trim()
      if (!otpCode) {
        throw new CubidApiError({
          category: "validation",
          code: "INVALID_INPUT",
          endpoint: "twillio/verify-otp",
          message: "otp is required.",
        })
      }

      return makeRequest<CubidVerifyPhoneOtpResponse>(
        fetchImpl,
        baseUrl,
        "/api/v2/twillio/verify-otp",
        withCredentials({ otpCode, phone }),
        "twillio/verify-otp",
        normalizePhoneOtpVerified,
        headers
      )
    },
  }

  return client
}
