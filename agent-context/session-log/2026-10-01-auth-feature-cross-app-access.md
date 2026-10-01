# feature/cross-app-access

## 2026-10-01T04:50:00Z - Cross-app access helpers for @cubid/auth (cubid-sdk#57)

- agent: Claude Fable 5.1
- branch: feature/cross-app-access
- head: 5441175
- summary: Implements Cubid-Me/cubid-sdk#57, the SDK half of Cubid-Me/cubid-monorepo#176 (identity-assertion authorization grant). `@cubid/auth` gains: `resources` on `buildCubidAuthorizationUrl` plus `buildCubidCrossAppResource` (RFC 8707 `resource` naming a paired app) and `supportsCubidCrossAppAccess` (discovery); the server-side token exchange `buildCubidIdentityAssertionRequest`/`requestCubidIdentityAssertion` (client-authenticated, `requested_token_type` ID-JAG, ID token or access token as `subject_token`) with `isCubidCrossAppConsentRequired` and `getCubidCrossAppConsentResource` for the `consent_required` answer; `buildCubidJwtBearerGrantRequest` for redemption at the resource app; `decodeCubidIdentityAssertionClaims`/`validateCubidIdentityAssertion` (`oauth-id-jag+jwt` type, issuer, audience, expiry, subject, accepted requesting clients, RS256 signature via JWKS); and Security Event Token helpers `decodeCubidSecurityEventToken`/`validateCubidSecurityEventToken` with `CUBID_SECURITY_EVENT_TYPES`. Signature verification is now shared by ID token, assertion and SET validation (`verifyCubidJwtSignature`); `validateCubidIdToken` behaviour and error codes are unchanged. Discovery typing gains `grant_types_supported` and the `cross_app_access_*` fields. Docs: `docs/examples/cross-app-access.md`, README sections, regenerated `docs/reference/api/auth.json`, changeset (minor).
- validation: `pnpm lint`; `pnpm typecheck`; `pnpm --filter @cubid/auth build`; `pnpm exec vitest run --config vitest.config.ts packages/auth/src/index.test.ts` (33 pass, 6 new); `pnpm build`; `pnpm test:acceptance` (13 pass, 1 new); `pnpm docs:api:build`; `pnpm docs:api:check`; `git diff --check`. Not run: `pnpm auth:issuer:check` (network), hosted smoke against a staging issuer with a pairing.
- follow-ups: Coordination recorded on Cubid-Me/cubid-monorepo#182 and #176 (GitHub issues, per the monorepo's current cross-repo policy; no new `agent-context/cross-repo-comms/` note). Once the monorepo's staging acceptance (cubid-monorepo#179) passes, run the requesting and resource flows from this package against staging and add a hosted smoke note. `@cubid/auth-react` needs no change.

## 2026-10-01T05:10:00Z - Pairing listing helper for the #181 decision

- agent: Claude Fable 5.1
- branch: feature/cross-app-access
- head: 36d59d2
- summary: Decision on Cubid-Me/cubid-monorepo#181 is "keep Cubid-hosted consent; pre-approve at first sign-in". Added `listCubidCrossAppPairings` (server-side, client-authenticated call to the issuer's `cross_app_access_pairings_endpoint`, now typed on the discovery document) so a requesting app can put every paired app in its first `resources` request; the guide shows that pattern first.
- validation: `pnpm lint`; `pnpm typecheck`; `pnpm --filter @cubid/auth build`; auth unit suite 34 pass (1 new); `pnpm docs:api:build`; `pnpm docs:api:check`; `git diff --check`.
- follow-ups: None beyond X01.1 (staging smoke).

## 2026-10-01T15:55:00Z - PR #58 review fixes (Copilot)

- agent: Claude Fable 5.1
- branch: feature/cross-app-access
- head: 92ee0f0
- summary: `buildCubidCrossAppResource` strips the URN prefix before validating, so `urn:cubid:client:` is refused. `validateCubidIdentityAssertion` and `validateCubidSecurityEventToken` refuse any `alg` other than RS256 before the JWKS is fetched (the Cubid profile), and a Security Event Token with an empty event type is refused. Session-log heads now record concrete commits and the completed X01 block left `todo.md` (branch log keeps the history; X01 is now the staging smoke follow-up). The cross-repo note convention conflict is answered on the review thread rather than by a new `cross-repo-comms` file, because the monorepo forbids new live notes there.
- validation: `pnpm lint`; `pnpm --filter @cubid/auth typecheck`; `pnpm --filter @cubid/auth build`; auth unit suite 34 pass (ES256 rejection for assertions and SETs, empty URN suffix, empty event type); `pnpm docs:api:build`; `pnpm docs:api:check`; `git diff --check`.
- follow-ups: Align `AGENTS.md` with the monorepo's issue-based coordination policy, or reinstate sibling notes in both repos; owner decision.

## 2026-10-01T16:10:00Z - PR #58 review fixes (Codex)

- agent: Claude Fable 5.1
- branch: feature/cross-app-access
- head: e5b0288
- summary: `supportsCubidCrossAppAccess` treats an explicit `cross_app_access_supported` boolean from discovery as authoritative and only falls back to the token-exchange grant type when the flag is absent, so an issuer that has switched cross-app access off is honoured. `parseSecurityEvent` now requires an event-payload `subject` to agree with the top-level `sub_id` (format, iss, sub) before dropping the duplicate, and rejects a mismatch with `invalid_security_event_subject`. The branch log was renamed to carry the package segment (`2026-10-01-auth-feature-cross-app-access.md`) and the `todo.md` reference updated.
- validation: `pnpm lint`; `pnpm --filter @cubid/auth typecheck`; `pnpm --filter @cubid/auth build`; auth unit suite 34 pass (explicit `false` flag, grant-type fallback, mismatched SET subject); `pnpm docs:api:build`; `pnpm docs:api:check`; `git diff --check`.
- follow-ups: None new; X01 (staging smoke) and the `AGENTS.md` coordination-policy alignment remain.
