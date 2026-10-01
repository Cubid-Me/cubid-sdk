# feature/cross-app-access

## 2026-10-01T04:50:00Z - Cross-app access helpers for @cubid/auth (cubid-sdk#57)

- agent: Claude Fable 5.1
- branch: feature/cross-app-access
- head: (see commits)
- summary: Implements Cubid-Me/cubid-sdk#57, the SDK half of Cubid-Me/cubid-monorepo#176 (identity-assertion authorization grant). `@cubid/auth` gains: `resources` on `buildCubidAuthorizationUrl` plus `buildCubidCrossAppResource` (RFC 8707 `resource` naming a paired app) and `supportsCubidCrossAppAccess` (discovery); the server-side token exchange `buildCubidIdentityAssertionRequest`/`requestCubidIdentityAssertion` (client-authenticated, `requested_token_type` ID-JAG, ID token or access token as `subject_token`) with `isCubidCrossAppConsentRequired` and `getCubidCrossAppConsentResource` for the `consent_required` answer; `buildCubidJwtBearerGrantRequest` for redemption at the resource app; `decodeCubidIdentityAssertionClaims`/`validateCubidIdentityAssertion` (`oauth-id-jag+jwt` type, issuer, audience, expiry, subject, accepted requesting clients, RS256 signature via JWKS); and Security Event Token helpers `decodeCubidSecurityEventToken`/`validateCubidSecurityEventToken` with `CUBID_SECURITY_EVENT_TYPES`. Signature verification is now shared by ID token, assertion and SET validation (`verifyCubidJwtSignature`); `validateCubidIdToken` behaviour and error codes are unchanged. Discovery typing gains `grant_types_supported` and the `cross_app_access_*` fields. Docs: `docs/examples/cross-app-access.md`, README sections, regenerated `docs/reference/api/auth.json`, changeset (minor).
- validation: `pnpm lint`; `pnpm typecheck`; `pnpm --filter @cubid/auth build`; `pnpm exec vitest run --config vitest.config.ts packages/auth/src/index.test.ts` (33 pass, 6 new); `pnpm build`; `pnpm test:acceptance` (13 pass, 1 new); `pnpm docs:api:build`; `pnpm docs:api:check`; `git diff --check`. Not run: `pnpm auth:issuer:check` (network), hosted smoke against a staging issuer with a pairing.
- follow-ups: Coordination recorded on Cubid-Me/cubid-monorepo#182 and #176 (GitHub issues, per the monorepo's current cross-repo policy; no new `agent-context/cross-repo-comms/` note). Once the monorepo's staging acceptance (cubid-monorepo#179) passes, run the requesting and resource flows from this package against staging and add a hosted smoke note. `@cubid/auth-react` needs no change.

## 2026-10-01T05:10:00Z - Pairing listing helper for the #181 decision

- agent: Claude Fable 5.1
- branch: feature/cross-app-access
- head: (this commit)
- summary: Decision on Cubid-Me/cubid-monorepo#181 is "keep Cubid-hosted consent; pre-approve at first sign-in". Added `listCubidCrossAppPairings` (server-side, client-authenticated call to the issuer's `cross_app_access_pairings_endpoint`, now typed on the discovery document) so a requesting app can put every paired app in its first `resources` request; the guide shows that pattern first.
- validation: `pnpm lint`; `pnpm typecheck`; `pnpm --filter @cubid/auth build`; auth unit suite 34 pass (1 new); `pnpm docs:api:build`; `pnpm docs:api:check`; `git diff --check`.
- follow-ups: None beyond X01.1 (staging smoke).
