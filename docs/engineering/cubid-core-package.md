# Cubid Core Package

`Cubid-Me/cubid-sdk` is the canonical public SDK home for `@cubid/core`.
`cubid-passport` remains the private identity-provider/backend repo and should
not be used as the package publication source.

`@cubid/core` is the foundation package for external Cubid integrations. It is
runtime-agnostic by design: no React, Next.js, Firebase, Supabase, Node-only
APIs, or browser-only helpers. The package uses standard `fetch` and plain JSON
contracts so it can run in Node, Deno, Supabase Edge Functions, workers, and
tests.

## Current Contract

- Package name: `@cubid/core`
- Initial version: `0.1.0`
- License: Apache-2.0
- Runtime target: ESM, standards-only
- Surface: normalized wrappers for current Passport v2 routes plus
  server-facing identity sync helpers and the first API v3 write helpers
- Identity helpers: `ensureUserByEmail`, `fetchIdentity`, `fetchScore`,
  `fetchStamps`, and `syncIdentitySnapshot`
- Additional wrappers: `addStamp`, location fetches, user-data fetch, location
  search, email/phone OTP send/verify helpers, `saveSecret`,
  `generateAccount`, and `listAccounts`
- Response model: SDK-friendly camelCase fields with the original server
  payload retained in `raw` for migration and debugging
- Error model: `CubidApiError` includes category, optional code, optional
  endpoint, request ID, status, and parsed details

Malformed successful responses must throw `CubidApiError` with
`code: "MALFORMED_RESPONSE"` so integrators do not accidentally depend on
partial or unsafe response shapes.

OTP helpers must not expose raw OTP values. They normalize only delivery and
verification metadata even if a legacy server payload contains a code.

The API v3 write helpers must treat idempotency as part of the public
contract. `saveSecret` and `generateAccount` should accept a caller-supplied
idempotency key but also auto-generate one safely for high-level usage.
Structured errors should preserve backend conflict codes such as
`idempotency_conflict` and `request_in_progress`.

Legacy `POST /api/v2/save_secret` is now removed on the backend and must not be
exposed or documented as a supported SDK path. The public SDK secret-write
surface should point only at the v3 contract and should keep documenting that
there is no public decrypt/read helper for stored secrets.

The current custody-chain surface includes `evm`, `near`, `solana`, and `sui`.
These helpers must return public account metadata only. They must never expose
raw private keys, wrapped keys, ciphertext, IVs, auth tags, or Vault-backed
custody material. Sui public addresses should stay normalized to lowercase
`0x...` strings on the SDK surface.

Webhook verification helpers should stay runtime-agnostic too. They should
verify Passport's current v1 HMAC over the exact `eventId.timestamp.rawBody`
input, preserve canonical `eventType` names, and continue exposing
`legacyEventType` for transition-period consumers.

Identity and score helpers must also tolerate disclosure-limited success
responses. Empty stamp arrays, omitted identity items, missing stamp helper
fields, or lower/zero scores may reflect the absence of an active
`selective_disclosure_grant` for the target app rather than transport failure
or user absence. Legacy `stamp_dappuser_permissions` rows are no longer a live
authorization fallback for these app-facing routes.

Profile and location helpers should follow the same model. The public response
types now carry typed disclosure metadata for:

- profile name claims: `profile:name`, `profile:*`, `profile`, `cubid:profile`
- location claims: `location:rough`, `location:approximate`, `location:exact`, `location:*`

Consumers should treat `disclosure.state === "notGranted"` as a valid
privacy-limited outcome for app-scoped routes.

The current v2 score, identity, and stamp payloads still do not provide a
universal route-level signal that distinguishes "no active disclosure grant"
from genuinely empty data, so `@cubid/core` should only expose typed
`notGranted` states where the backend payload shape reliably supports it.

## Publishing

Use trusted publishing only. Do not publish this package with a local npm user
or a long-lived npm token.

The operator checklist lives in
`docs/engineering/core-publishing-runbook.md`. Use that runbook for the first
registry setup, first-version bootstrap decision, and manual GitHub Actions
release flow.

npm Trusted Publisher setup:

- Provider: GitHub Actions
- Organization/user: `Cubid-Me`
- Repository: `cubid-sdk`
- Workflow filename: `publish.yml`
- Environment: blank unless release approvals are added intentionally

JSR setup:

- Scope/package: `@cubid/core`
- Linked GitHub repository: `Cubid-Me/cubid-sdk`
- Workflow: `.github/workflows/publish.yml`

The publish workflow is manual (`workflow_dispatch`) so maintainers choose when
to release. Normal CI performs npm pack and JSR dry-runs to catch packaging
regressions before release.

## Deno And Edge Validation

The package includes a Deno smoke check at
`packages/core/deno/supabase-edge-smoke.ts`. It imports the TypeScript source
directly and models a Supabase Edge Function using `Deno.env`, injected `fetch`,
`ensureUserByEmail`, and `syncIdentitySnapshot`.

Run:

```sh
pnpm --filter @cubid/core deno:check
```

This validates Deno/Supabase Edge importability before publication. The
published JSR import path remains `jsr:@cubid/core` and is documented in
`docs/engineering/next-supabase-edge-integration-guide.md`.
