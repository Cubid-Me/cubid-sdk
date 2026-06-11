# Recoverable Wallet Hosted Smoke Strategy

This repo owns the public SDK pieces for app-mediated recoverable wallets. A
complete production validation still needs a hosted Cubid recovery smoke path
that spans the SDK, the relying app, and Cubid-hosted recovery surfaces.

## Current SDK Coverage

The local SDK harness covers the consumer contract without live Cubid services:

- `@cubid/core` can enroll app-owned recovery material and start a release
  session from a trusted backend or Edge Function.
- `@cubid/wallet-recovery` can build a hosted recovery URL and complete a
  user-authorized release with an explicit bearer token or token provider.
- `@cubid/wallet-recovery-react` can launch the hosted recovery flow from a
  React UI without receiving dapp API keys.
- The acceptance harness verifies the stitched flow with mocked network calls
  and public package entrypoints.

This local harness is not a substitute for hosted Identity/Passport smoke. It
does not prove WebAuthn, account recovery policy, provider credentials, hosted
cookies, or real release authorization.

## Hosted Smoke Path To Prove

A real app-recoverable-wallet smoke should use a marked throwaway relying app,
test user, and app-created wallet/recovery bundle material.

1. The app backend creates or receives app-owned encrypted recovery material.
2. The backend calls `@cubid/core` `enrollRecoveryBundle(...)` with a stable
   app-scoped `recoveryBundleId` or recovery reference.
3. The backend calls `startRecoveryBundleRelease(...)` for that exact bundle.
4. The app launches the returned hosted recovery session through
   `@cubid/wallet-recovery` or `@cubid/wallet-recovery-react`.
5. The user completes Cubid-hosted recovery and passkey-backed authorization.
6. The browser/client calls `completeRelease(...)` with a user-authenticated
   token and receives opaque app-owned `bundleMaterial`.
7. The app verifies that the recovered material can restore the app wallet path
   without Cubid signing transactions or exposing recovery material to backend
   metadata helpers.

## Boundary Requirements

- Dapp API keys stay on trusted app servers or Edge Functions.
- `@cubid/core` recovery helpers expose metadata only and must never return
  recovery material, ciphertext, Vault metadata, raw Cubid user ids, private
  keys, seed phrases, signing shares, or service-role fields.
- `bundleMaterial` may appear only in the signed-in browser/client completion
  response after user authorization.
- Public app SDKs must not expose a user-wide recovery-bundle list. Apps should
  store and recover exact app-owned bundle identifiers.
- Cubid remains the identity-bound recovery provider. The host app or selected
  wallet infrastructure owns wallet creation, normal signing policy, and
  transaction broadcast.

## Open Hosted Gate

Before calling app-recoverable wallets production-ready, run and record a
hosted smoke against the current public Cubid recovery host. The smoke should
include:

- app-owned bundle enrollment through the server-safe SDK;
- hosted recovery launch from the relying app;
- passkey-backed user authorization;
- release completion through the browser/client SDK;
- confirmation that `bundleMaterial` is available only on completion and is
  absent from all backend metadata responses;
- downstream app restoration evidence using the released opaque material.
