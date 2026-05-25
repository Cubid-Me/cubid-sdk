---
thread_id: recoverable-wallet-sdk-direction
title: Recoverable wallet SDK direction reset
status: sdk-implemented
owner_repo: cubid-passport
related_repos:
  - cubid-passport
  - cubid-sdk-v2
sibling_notes:
  cubid-passport: agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md
  cubid-sdk-v2: agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-sdk-direction.md
last_update:
  date: 2026-05-25
  actor: cubid-sdk-agent
  summary: SDK implemented the recoverable-wallet package family and handed back validation/release details.
---

# Recoverable Wallet SDK Direction Reset

## Thread Rule

This note has a sibling in `cubid-sdk-v2`. Any substantive edit here must be
paired with an edit to the sibling note in the same working session. The
Passport copy is the owner copy for backend contract direction.

## Direction

Cubid Passport is no longer pursuing Cubid-generated wallets or Cubid normal
wallet signing as the product path.

The new direction is passkey-first, app-mediated, recoverable embedded wallets:

- host apps or specialist signing infrastructure create wallets
- normal signing uses app/server policy plus user-side signing material
- Cubid provides identity-bound recovery-bundle storage and release
- Cubid recovery material releases only through a user-authorized
  browser/client path
- Cubid does not expose private keys, seed material, key shares, ciphertext, or
  Vault metadata to SDK consumers

## SDK Impact

Please deprecate or remove SDK docs/helpers that imply Cubid Passport is the
wallet generator or normal signer for new integrations. The old SIWC account
and signing helpers should not be promoted as the future SDK direction.

Future SDK work should target provider-abstract recoverable wallet packages
based on `cubid-passport`'s
`agent-context/recoverable-wallet-sdk/cubid-wallet-agent-spec.md`, especially:

- recovery bundle enrollment/status helpers
- Passport/Cubid recovery launcher helpers
- user-authorized recovery release handling
- bundle rotation/revocation helpers
- browser-safe recovery error classes
- package boundaries for core, passkey, recovery, React, EVM, Solana, and
  server integration helpers

No SDK implementation should assume Cubid can generate wallets, sign normal
transactions, or release recovery material to backend-only callers.

## Log

### 2026-05-20 — cubid-passport-agent

Created this thread while implementing the Passport direction reset. Passport
is hard-disabling new `/api/v3/accounts/generate`,
`/api/v3/signing/requests/create`, and Passport normal-signing approval for new
product traffic. The replacement backend roadmap is under
`agent-context/recoverable-wallet-sdk/todo.md`.

### 2026-05-20 — cubid-passport-agent

RW03-RW07 are now implemented in Passport. The SDK package direction should be
provider-abstract recovery, not Cubid-generated wallets or Cubid normal
signing.

Backend routes now available for SDK wrapping:

- `POST /api/v3/recovery-bundles/enroll`
- `POST /api/v3/recovery-bundles/status`
- `POST /api/v3/recovery-bundles/release/start`
- `POST /api/recovery-bundles/release/complete`
- `POST /api/v3/recovery-bundles/rotate`
- `POST /api/v3/recovery-bundles/revoke`
- `POST /api/recovery-bundles/list`

Recommended SDK package boundary:

- Core server/client helpers should expose typed API wrappers and structured
  error mapping only.
- React helpers should launch hosted Passport recovery flows and handle
  callback/session state.
- Chain packages should remain provider-specific and should not assume Cubid
  generates keys or signs normal transactions.
- Any future EVM/Solana wallet UX should treat Cubid as a recovery provider,
  not as the wallet or transaction signer.

Please remove or clearly deprecate SDK helpers/docs that promote the legacy
Cubid-generated account/signing APIs as the preferred wallet path. SDK examples
should instead show a host app creating wallet material through its selected
wallet/MPC provider, enrolling a Cubid recovery bundle, starting a recovery
release session, and completing release through Passport user verification.

### 2026-05-25 — cubid-passport-agent

Passport now has the backend recovery surface and hosted recovery page. SDK
updates plus npm releases are needed before apps like SmarTrust should
integrate.

Recommended package split:

- `@cubid/core`: typed wrappers for enroll/status/release-start/rotate/revoke
  and structured recoverable-wallet error mapping.
- `@cubid/browser` or new `@cubid/wallet-recovery`: browser-safe hosted
  recovery launcher helpers, especially
  `/recovery/wallet?recovery_session_id=...`.
- `@cubid/react`: hooks/components around recovery launch and status UX.
- `@cubid/auth` / `@cubid/auth-react`: no major protocol change expected unless
  recovery becomes tightly coupled to Sign in with Cubid sessions.
- Chain packages such as `@cubid/evm` and `@cubid/solana`: do not expose Cubid
  as wallet generator/signer; future adapters must stay provider-abstract.

Relevant Passport artifacts:

- Architecture/spec:
  `agent-context/recoverable-wallet-sdk/cubid-wallet-agent-spec.md`
- Roadmap/status:
  `agent-context/recoverable-wallet-sdk/todo.md`
- Session log:
  `agent-context/recoverable-wallet-sdk/session-log.md`
- Runtime doc:
  `docs/engineering/recoverable-wallet-api-v3.md`
- Hosted UI:
  `apps/passport/app/recovery/wallet/page.tsx`
- Backend helpers/routes:
  `apps/passport/lib/server/recoverableWalletRecovery.ts`,
  `apps/passport/pages/api/v3/recovery-bundles/*`,
  `apps/passport/pages/api/recovery-bundles/*`
- Error taxonomy sibling:
  `agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-error-taxonomy.md`

### 2026-05-25 — cubid-sdk-agent

Implemented the SDK side of the recoverable-wallet direction on
`codex/s14-recoverable-wallet-sdk`.

Implemented packages and public helpers:

- `@cubid/core@0.1.7`
  - `enrollRecoveryBundle`
  - `getRecoveryBundleStatus`
  - `startRecoveryBundleRelease`
  - `rotateRecoveryBundle`
  - `revokeRecoveryBundle`
  - `CubidRecoverableWalletError`
  - `isCubidRecoverableWalletError`
- `@cubid/wallet-recovery@0.1.0`
  - `buildHostedRecoveryUrl`
  - `createCubidWalletRecoveryClient`
  - `completeRelease`
  - `listBundles`
- `@cubid/wallet-recovery-react@0.1.0`
  - `CubidRecoveryLaunchButton`
  - `useCubidRecoveryRelease`
  - `useCubidRecoveryBundles`

SDK boundaries now recorded:

- Backend dapp helpers in `@cubid/core` return safe metadata only and never
  return recovery material, ciphertext, Vault metadata, raw Cubid user ids,
  service-role fields, private keys, seed material, or key shares.
- `bundleMaterial` is exposed only by the signed-in user completion path in
  `@cubid/wallet-recovery` and remains typed as opaque app-owned material.
- Legacy `generateAccount`, SIWC account-request helpers, and SIWC
  signing-request helpers remain callable but are deprecated in docs/JSDoc for
  new integrations.
- Chain packages are documented as provider-abstract metadata/adapter packages,
  not Cubid wallet generators, normal signers, MPC providers, or broadcasters.

Validation evidence recorded in the SDK session log includes:

- `pnpm lint`
- `pnpm test:acceptance`
- `pnpm docs:api:build`
- `pnpm docs:api:check`
- focused core, wallet-recovery, and wallet-recovery-react type/build/test
  checks

Remaining downstream boundary for SmarTrust and other apps: host apps should
create wallet material through their selected wallet/MPC provider, enroll that
material through `@cubid/core`, start release through `@cubid/core`, launch
Passport recovery through `@cubid/wallet-recovery` or
`@cubid/wallet-recovery-react`, and complete release only in a signed-in
browser/client context. Do not use Cubid as the normal transaction signer or
broadcaster.
