# `@cubid/core`

Runtime-agnostic Cubid foundation client for server-side integrations.

Licensed under Apache-2.0.

This package is intentionally small and standards-only. It does not import
React, Next.js, Firebase, Supabase, Node built-ins, or browser-only helpers.
All requests use `fetch`, `RequestInit`, `Headers`, and plain JSON so the same
client can run in Node, Deno, Supabase Edge Functions, workers, and tests.

## When To Choose This Package

Use `@cubid/core` when you need Cubid's runtime-agnostic foundation client for
servers, workers, Deno, or Supabase Edge Functions. Choose `@cubid/browser`,
`@cubid/react`, `@cubid/evm`, or `@cubid/wagmi` only when you specifically need
their higher-level integration surfaces.

## Install

```sh
npm install @cubid/core
```

## Registry Availability

- npm: supported
- JSR: supported

## API Reference

- JSON reference: `../../docs/reference/api/core.json`
- Package matrix: `../../README.md`

`@cubid/core` is live on npm and JSR.

```ts
// Deno / Supabase Edge
import { createCubidApiClient } from "jsr:@cubid/core"
```

## Basic Usage

```ts
import { createCubidApiClient } from "@cubid/core"

const cubid = createCubidApiClient({
  baseUrl: "https://passport.cubid.me",
  apiKey: process.env.CUBID_API_KEY!,
  dappId: process.env.CUBID_DAPP_ID!,
})

const created = await cubid.createUser({
  email: "person@example.com",
})

const score = await cubid.fetchScore({
  userId: created.userId!,
})
```

For server-side "resolve or create by email" flows, prefer
`ensureUserByEmail` so callers always receive a canonical app-scoped Cubid user
identifier or a structured error.

```ts
const user = await cubid.ensureUserByEmail({
  email: "person@example.com",
})

const snapshot = await cubid.syncIdentitySnapshot({
  userId: user.userId,
})
```

Treat that `userId` as an app-scoped integration identifier, not as a raw
cross-app Cubid handle. When OIDC is in use, the pairwise `sub` should be
treated the same way: stable for the relying party, but not reusable as a
global identifier across apps.

## Supabase Edge / Deno

Pass `fetch` explicitly when a runtime or test harness provides its own
instrumented fetch implementation.

```ts
import { createCubidApiClient } from "jsr:@cubid/core"

const cubid = createCubidApiClient({
  baseUrl: Deno.env.get("CUBID_API_BASE_URL") ?? "https://passport.cubid.me",
  apiKey: Deno.env.get("CUBID_API_KEY")!,
  dappId: Deno.env.get("CUBID_DAPP_ID")!,
  fetch,
})
```

Keep `apiKey` server-side. Do not expose dapp API keys to browsers or public
client bundles.

## Foundation Surface

The foundation client provides normalized wrappers around current Passport v2
endpoints plus the first server-facing API v3 write helpers:

- `createUser`
- `ensureUserByEmail`
- `addStamp`
- `fetchIdentity`
- `fetchScore`
- `fetchStamps`
- `fetchApproxLocation`
- `fetchExactLocation`
- `fetchRoughLocation`
- `fetchUserData`
- `searchLocation`
- `sendEmailOtp`
- `verifyEmailOtp`
- `sendPhoneOtp`
- `verifyPhoneOtp`
- `syncIdentitySnapshot`
- `saveSecret`
- `sendNotification`
- `getNotificationStatus`
- `checkPaytagAuthorization`
- `validatePaytagAliases`
- `getPaytagGrantStatus`
- `listPaytagLifecycleEvents`
- `startHostedPaytagAction`
- `startPaytagEnableAction`
- `startPaytagAliasCreateAction`
- `startPaytagAliasSelectAction`
- `startPaytagGrantAction`
- `startPaytagRevokeAction`
- `enrollRecoveryBundle`
- `getRecoveryBundleStatus`
- `startRecoveryBundleRelease`
- `rotateRecoveryBundle`
- `revokeRecoveryBundle`
- `generateAccount`
- `listAccounts`
- `fetchWalletCapabilities`
- `createAccountRequest`
- `getAccountRequest`
- `createSigningRequest`
- `getSigningRequest`
- `listSigningRequests`
- `cancelSigningRequest`

The legacy Cubid-generated wallet and normal Cubid-signing direction is now
deprecated for new integrations. These exports remain callable as compatibility
surfaces, but new wallet work should create wallet material in the host app or
specialist signing provider and use Cubid only as the identity-bound recovery
bundle provider.

Responses use SDK-friendly camelCase fields while retaining the original
server payload in `raw` for migration/debugging. Malformed successful responses
throw `CubidApiError` with `code: "MALFORMED_RESPONSE"` instead of returning an
unsafe partial shape.

Integration code should also assume identity and stamp payloads may be filtered
by persisted selective-disclosure grants. Passport now treats those grants as
the runtime source of truth for app-facing disclosure, with grants persisted
from at least `allow_page` and `oidc`; legacy
`stamp_dappuser_permissions` rows are migration input only.
Missing stamps, omitted identity entries, redacted email helper fields, or
lower/zero score values can be valid privacy outcomes when a user has not
granted disclosure for a stamp to a given app. Treat those responses as
app-scoped disclosure limits first, not automatically as transport errors or a
missing Cubid user.

Profile and location routes are now consent-gated too. `@cubid/core` exposes
typed disclosure metadata so apps can distinguish privacy-limited success
responses from transport failures:

- `profileNameDisclosure.claims`: `profile:name`, `profile:*`, `profile`, `cubid:profile`
- location disclosure claims:
  - rough: `location:rough`, `location:approximate`, `location:exact`, `location:*`
  - approximate: `location:approximate`, `location:exact`, `location:*`
  - exact: `location:exact`, `location:*`

When these helpers return `disclosure.state === "notGranted"`, treat null or
missing profile/location fields as consent-gated for that app unless your app
has stronger local knowledge about the user's granted claims.

`@cubid/core` does not yet auto-label empty identity, stamp, or score responses
as `notGranted` because the current v2 payloads do not reliably distinguish
"no active disclosure grant" from "no data" for every route. Where the backend
does provide enough signal today, such as the profile and location helpers
above, the SDK exposes typed disclosure metadata directly.

OTP helpers intentionally return delivery or verification metadata only. They
never expose raw OTP values, even if a legacy server payload includes one.

The current API v3 helpers stay server-side as well:

- `saveSecret({ userId, secret, idempotencyKey? })`
- `sendNotification({ userId, category, priority, title, body, deepLink?, metadata?, idempotencyKey? })`
- `getNotificationStatus({ userId, eventId })`
- `checkPaytagAuthorization({ dappUserUuid, candidates })`
- `validatePaytagAliases({ dappUserUuid, aliases, resolverKey? })`
- `getPaytagGrantStatus({ dappUserUuid })`
- `listPaytagLifecycleEvents({ dappUserUuid, since?, limit? })`
- `startHostedPaytagAction({ dappUserUuid, actionType, returnUrl?, metadata?, requiredPasskeyAssurance?, idempotencyKey? })`
- `startPaytagEnableAction({ dappUserUuid, returnUrl?, metadata?, requiredPasskeyAssurance?, idempotencyKey? })`
- `startPaytagAliasCreateAction({ dappUserUuid, aliasExposure?: "opaque", returnUrl?, metadata?, requiredPasskeyAssurance?, idempotencyKey? })`
- `startPaytagAliasSelectAction({ dappUserUuid, returnUrl?, metadata?, requiredPasskeyAssurance?, idempotencyKey? })`
- `startPaytagGrantAction({ dappUserUuid, returnUrl?, metadata?, requiredPasskeyAssurance?, idempotencyKey? })`
- `startPaytagRevokeAction({ dappUserUuid, returnUrl?, metadata?, requiredPasskeyAssurance?, idempotencyKey? })`
- `enrollRecoveryBundle({ userId, bundleMaterial, providerKey?, recoveryBundleId?, idempotencyKey? })`
- `getRecoveryBundleStatus({ userId, providerKey?, recoveryBundleId? })`
- `startRecoveryBundleRelease({ userId, providerKey?, recoveryBundleId?, idempotencyKey? })`
- `rotateRecoveryBundle({ userId, recoveryBundleId, bundleMaterial, providerKey?, idempotencyKey? })`
- `revokeRecoveryBundle({ userId, recoveryBundleId, providerKey? })`
- `generateAccount({ userId, chain, label?, idempotencyKey? })`
- `listAccounts({ userId, chain? })`
- `fetchWalletCapabilities({ userId? })`
- `createAccountRequest({ userId, chain, label?, idempotencyKey? })`
- `getAccountRequest({ accountRequestId })`
- `createSigningRequest({ userId, userAccountId, requestType, payload, payloadSummary, chain?, idempotencyKey? })`
- `getSigningRequest({ signingRequestId })`
- `listSigningRequests({ userId, userAccountId?, limit? })`
- `cancelSigningRequest({ signingRequestId })`

`enrollRecoveryBundle`, `getRecoveryBundleStatus`,
`startRecoveryBundleRelease`, `rotateRecoveryBundle`, and
`revokeRecoveryBundle` are the server-safe recovery bundle helpers. They expose
only safe metadata and never return recovery material, ciphertext, Vault
metadata, raw Cubid user ids, service-role fields, private keys, seed material,
or key shares.

`generateAccount`, `fetchWalletCapabilities`, `createAccountRequest`,
`getAccountRequest`, `createSigningRequest`, `getSigningRequest`,
`listSigningRequests`, and `cancelSigningRequest` are deprecated compatibility
helpers for the older SIWC wallet-generation and normal-signing direction. New
integrations should use host-created wallet material, host-selected signing
infrastructure, and Cubid recovery bundle helpers instead.

Legacy `POST /api/v2/save_secret` is retired and should not be used or
reintroduced in the public SDK surface. `saveSecret` now targets the v3 write
contract only.

## MyPayTag Paytag Identity Helpers

`@cubid/core` exposes the server/Edge side of Cubid's MyPayTag identity and
consent contract. These helpers use the initialized client configuration,
including `baseUrl`, injected `fetch`, dapp API key, and optional `dappId`.
They answer paytag identity, alias, grant, and lifecycle questions only; Cubid
does not own wallets, routes, payment instructions, settlement, solvers,
bridges, swaps, or execution.

```ts
const authorization = await cubid.checkPaytagAuthorization({
  dappUserUuid: "app-user-123",
  candidates: [
    { candidateRef: "paytag-1", stampType: "email", value: "abd123@cubid.mypaytag" },
  ],
})

const aliases = await cubid.validatePaytagAliases({
  dappUserUuid: "app-user-123",
  aliases: [{ aliasRef: "alias-1", alias: "abd123@cubid.mypaytag" }],
})

const action = await cubid.startPaytagEnableAction({
  dappUserUuid: "app-user-123",
  idempotencyKey: crypto.randomUUID(),
  returnUrl: "https://mypaytag.example/paytag/callback",
  requiredPasskeyAssurance: true,
})

const aliasAction = await cubid.startPaytagAliasCreateAction({
  dappUserUuid: "app-user-123",
  aliasExposure: "opaque",
  idempotencyKey: crypto.randomUUID(),
})
```

Prefer the typed action helpers for ordinary MVP flows:
`startPaytagEnableAction`, `startPaytagAliasCreateAction`,
`startPaytagAliasSelectAction`, `startPaytagGrantAction`, and
`startPaytagRevokeAction`. `startHostedPaytagAction` remains available as a
lower-level primitive for canonical Paytag action strings only, but app code
should not need to pass raw action strings for common Paytag flows. Route
registration, route authorization, and route selection belong to MyPayTag, not
to Cubid Paytag SDK helpers.

Paytag helpers are deliberately submitted-candidate or opaque-alias based.
There is no dapp helper for listing all user paytags or payment-enabled
stamps. Negative responses such as `resolution_unavailable` and `no_events`
are generic by design and should not be expanded into probing-friendly detail.
Opaque paytags such as `abd123@cubid.mypaytag` are the default. Raw
stamp-based paytags such as `+1234569999@phone.cubid.mypaytag` require
explicit user choice outside ordinary dapp validation. The SDK does not expose
a raw-stamp action helper yet because Passport has not promoted a stable
separate raw-stamp exposure action contract. Passing `aliasExposure:
"raw_stamp"` to `startPaytagAliasCreateAction` is rejected; when raw exposure
is added later it should be a separate, explicitly named helper and must not
return raw stamp values to dapps unless Passport documents a safe redacted
response shape.

Dapp API keys must stay server-side. Browser launch of a hosted Cubid paytag
action belongs in `@cubid/browser` via
`openHostedPaytagAction(action.hostedUrl)`.

`saveSecret`, `sendNotification`, `enrollRecoveryBundle`,
`startRecoveryBundleRelease`, `rotateRecoveryBundle`,
`startHostedPaytagAction`, the typed Paytag action helpers,
`generateAccount`, `createAccountRequest`, and
`createSigningRequest` automatically generate an idempotency key when callers
omit one, and they return the resolved `idempotencyKey` alongside the
normalized response so callers can log or reconcile retries safely.

`sendNotification` is the first dapp-authenticated flexible-messaging helper.
It stays server-side, requires the Cubid dapp API key, and normalizes only
safe routing metadata such as `eventId`, `status`, `selectedChannelType`,
`category`, `priority`, and `createdAt`. It does not expose raw destinations,
provider secrets, ciphertext, or hosted Allow Page grant state.

When `sendNotification` rejects, prefer handling `CubidNotificationSendError`
instead of treating every failure as a generic transport outage. Stable send
error codes currently include:

- `notification_grant_required`
- `notification_muted`
- `notification_provider_disabled`
- `notification_quota_exceeded`
- `request_in_progress`
- `rate_limit_exceeded`

These are structured send outcomes, not raw provider responses. `status:
"accepted"` still only means Cubid accepted and routed the event; it does not
mean email or Telegram delivery has already succeeded.

After a send is accepted, use `getNotificationStatus` for redacted follow-up
status. It returns app-scoped event metadata such as event status, selected
channel type, latest delivery status, and redacted delivery attempts without
exposing raw destinations, ciphertext, provider secrets, or cross-app event
visibility.

`@cubid/core` intentionally does not wrap Passport-user
`POST /api/notifications/history/list`. That route remains a signed-in profile
surface rather than a normal dapp server SDK helper.

Supported custody chains on the deprecated public v3 account compatibility
helpers are:

- `evm`
- `near`
- `solana`
- `sui`

`fetchWalletCapabilities` remains the deprecated fail-closed discovery surface
for older SIWC wallet UX. It can return:

- dapp-scoped policy state
- per-chain capability flags such as `passkeyApprovedCreation`,
  `messageSigning`, `typedDataSigning`, and `transactionSigning`
- optional account lookup for one app-scoped `userId`

This route is app-scoped only. Do not build flows that expect lookup by raw
Cubid identity, global wallet inventory, or cross-app account visibility.

`createAccountRequest` and `getAccountRequest` remain deprecated compatibility
helpers for passkey-approved Cubid wallet creation. They expose stable public
statuses such as:

- `pending_user_approval`
- `policy_denied`
- `approved`
- `rejected`
- `expired`
- `failed`

`policyVersion` on the normalized account-request and signing-request summaries
now reflects Passport's numeric policy contract and is exposed as
`number | null` on the SDK surface rather than the older string-shaped fixture
examples from earlier drafts.

These helpers return public account metadata only after approval. They never
return private keys, wrapped keys, ciphertext, seed phrases, Vault material,
or raw Cubid internal identifiers.

The SDK surface continues to normalize app-scoped identifiers to `userId`
while translating to Passport's current wire keys such as `user_id` and
`dapp_user_uuid` internally.

`@cubid/core` now also exports small helpers for this model directly:

- `createCubidAppScopedSubject(userId)`
- `CUBID_STAMP_TYPE_IDS`
- `getCubidStampTypeId(stampType)`
- `getCubidStampTypeName(stampTypeId)`
- `getCubidStampTypeNamesById()`
- `summarizeCubidDisclosedStamp(record)`

Custody helpers only return public account metadata such as chain, address,
label, and custody status. They never return raw private keys, wrapped keys,
ciphertext, IVs, auth tags, or Vault material. Sui public addresses are
normalized to lowercase `0x...` strings on the SDK surface.

`saveSecret` is also write-only from the public SDK point of view. Passport's
v3 contract does not expose a public decrypt/read endpoint for these secrets,
so do not build app flows that assume the SDK can read plaintext secret values
back out later.

The deprecated signing-request compatibility helpers also stay redacted by
default. They normalize only safe summary metadata such as:

- `signingRequestId`
- `status`
- `chain`
- `requestType`
- `payloadHash`
- `payloadSummary`
- `policyVersion`
- `requiredAcr`
- timestamps
- optional `result` metadata only after completion

They also preserve additive SIWC05 policy and risk metadata when present:

- `riskLevel`
- `riskReasons`
- `policyDecision`
- `stepUpRequired`
- `transactionOperationType`
- `transactionRecipient`
- `transactionContractAddress`
- `transactionDeclaredValueUsd`

Completed signing requests now normalize typed public result shapes when
Passport returns them:

- message and typed-data signatures return `type: "signature"` with
  `algorithm`, `publicAddress`, and `signature`
- the limited EVM Admin-policy pilot returns
  `type: "signed_transaction"` with `algorithm`, `chainId`, `publicAddress`,
  `signedTransaction`, and `transactionHash`

Unknown future result types stay redacted and surface as an `unknown`-style
result object with the raw safe metadata preserved.

Use the exported guards when you need result-type-specific handling:

- `isCubidSigningSignatureResult(result)`
- `isCubidSignedTransactionResult(result)`

The SDK intentionally does not expose raw signing payloads, raw Cubid internal
user ids, private keys, encrypted key material, or other private custody
details through those normalized responses.

Passport-hosted approval and rejection flows are out of scope for
`@cubid/core`. The public core client only wraps the dapp-facing API v3
signing-request and wallet-request routes.

Transaction-signing flows remain capability-gated and conservative on the SDK
surface. The current public stance is:

- EVM transaction signing is a limited Admin-policy pilot, not arbitrary wallet
  signing
- Cubid does not broadcast signed EVM pilot transactions
- Solana transaction signing remains disabled even if readiness summaries are
  present

If Passport returns transaction-oriented request summaries or policy metadata,
do not render them as a blanket "transaction signing is enabled" signal
without first checking `fetchWalletCapabilities`.

## SIWC Errors

Wallet and signing routes may promote Passport's browser-safe SIWC error
metadata into `CubidSiwcError`, which extends `CubidApiError` with:

- `siwcCode`
- `retryable`
- `userAction`

Use `isCubidSiwcError(error)` when you need UI or retry behavior keyed to
stable SIWC error semantics such as `step_up_required`, `wrong_user`,
`user_cancelled`, `policy_denied`, or `transaction_chain_risk_unsupported`.

## Webhook Verification

`@cubid/core` also exposes runtime-agnostic webhook helpers:

- `verifyCubidWebhookSignature(...)`
- `parseCubidWebhookEvent(...)`

These helpers follow Passport's current v3 delivery contract:

- signature version header: `X-Cubid-Signature-Version: v1`
- signature header: `X-Cubid-Signature: v1=<hex hmac sha256>`
- replay inputs: `X-Cubid-Event-Id`, `X-Cubid-Timestamp`
- signed payload input: `eventId.timestamp.rawBody`

Use the exact raw request body string or bytes when verifying a webhook
signature. Do not parse and re-serialize JSON before verification.

Canonical public event names currently include:

- `stamp.created`
- `stamp.removed`
- `credential.expired`
- `credential.blacklisted`
- `credential.whitelisted`
- `score.increased`
- `score.decreased`
- `wallet.created`
- `wallet.signing_request.created`
- `wallet.policy.denied`
- `wallet.signing_request.approved`
- `wallet.signing_request.rejected`
- `wallet.signing_request.cancelled`
- `wallet.signing_request.step_up_failed`
- `wallet.signature.completed`
- `wallet.signature.failed`

`parseCubidWebhookEvent` also preserves `legacyEventType` so transition-period
consumers can keep bridging from older backend names such as
`credential_added` and `score_increase` while migrating toward the canonical
`eventType`.

Transaction webhook events are still intentionally excluded here. Do not build
against transaction-submission or transaction-failure webhook names until
Passport explicitly enables transaction signing and publishes those events as
live public contract.

## App-Scoped Identity And Stamp Metadata

The public SDK now ships the canonical stamp-id map currently shared with
Passport's internal stamp registry, including aliases such as
`"near-wallet" -> 15`. Use those helpers when apps need a stable mapping
between app-visible stamp names and backend `stamptype` ids.

`createCubidAppScopedSubject` is intentionally small: it validates and wraps the
app-scoped `userId` that your integration stores locally. It does not expose or
derive raw cross-app identifiers.

Profile-completion flows and React components are intentionally deferred to
later SDK tasks.

## Deno Validation

The package includes a Supabase-Edge-style Deno smoke check that imports the
TypeScript source directly before publish:

```sh
pnpm --filter @cubid/core deno:check
```

Edge Functions should import from `jsr:@cubid/core`.

See `docs/engineering/next-supabase-edge-integration-guide.md` for Next.js and
Supabase Edge examples.

## Errors

Failed requests throw `CubidApiError` with:

- `category`: `config`, `auth`, `validation`, `rate_limit`, `not_found`,
  `conflict`, `upstream`, or `unknown`
- `code`: machine-readable detail such as `NETWORK_ERROR` or
  `MALFORMED_RESPONSE` when available
- `endpoint`: Cubid endpoint associated with the failure when available
- `status`: HTTP status when available
- `requestId`: Cubid `X-Request-Id` when returned by the API
- `details`: parsed error payload when available

Error messages never include API key material.

For API v3 idempotent write helpers, expect Passport conflict codes such as:

- `idempotency_conflict`
- `request_in_progress`

## Publishing

This package is designed for npm Trusted Publishing and JSR trusted publishing
through GitHub Actions. Do not publish with a local npm user token.

The npm Trusted Publisher should be configured as:

- Provider: GitHub Actions
- Organization/user: `Cubid-Me`
- Repository: `cubid-sdk`
- Workflow filename: `publish.yml`
- Environment: blank unless a protected release environment is intentionally
  added

The JSR package should be linked to:

- Package: `@cubid/core`
- Repository: `Cubid-Me/cubid-sdk`
- Workflow: `.github/workflows/publish.yml`

See `docs/engineering/core-publishing-runbook.md` in the repository for the
full npm/JSR setup checklist and first-version bootstrap notes.
