# Cubid SDK MyPayTag MVP Gap Review

Date: 2026-06-28
Repo: `cubid-sdk-v2`
Branch reviewed: `codex/mypaytag-mvp-realignment-20260628`
Status: implementation gap note

## Review Baseline

This review evaluates the Cubid SDK implementation against the revised MyPayTag MVP boundary:

- Cubid owns identity, consent, verified stamps, opaque aliases, explicit raw-stamp exposure, grants, hosted Cubid actions, and paytag lifecycle signals.
- MyPayTag owns wallet routing, PayToDapp route registration, route priority, provider callbacks, payment instructions, NEAR Intents / 1Click execution, and PayingDapp-facing payment resolution.
- MyPayTag should be the primary caller of Cubid paytag validation. PayingDapps should integrate with MyPayTag rather than probing Cubid directly.
- Cubid SDK browser helpers must not accept dapp API keys or expose wallet/payment details.

Focused validation passed on the reviewed branch:

```sh
pnpm --filter @cubid/core test
pnpm --filter @cubid/browser build
pnpm api:validate
pnpm docs:api:check
```

## What Is Aligned

- Public helper names are Paytag-oriented rather than Pay-To-oriented.
- `checkPayToEligibility`, `resolvePayToAliases`, `startPayToAction`, and `sendPaymentIntentCreatedNotification` are absent from the public client surface.
- `@cubid/core` exposes server/Edge helpers for submitted paytag authorization, opaque alias validation, grant status, lifecycle event polling, and hosted Cubid paytag action start.
- `@cubid/browser` exposes a browser-safe hosted paytag action opener that rejects dapp API keys in hosted action URLs.
- Paytag documentation correctly says Cubid does not own wallets, routes, payment instructions, settlement, solvers, bridges, swaps, or execution.
- The test suite includes anti-enumeration checks and verifies old Pay-To helper names are not exported.

## Gaps

1. User paytag action helpers are too generic.
   - `startHostedPaytagAction` accepts an `actionType` string rather than exposing typed helper methods for `paytag_enable`, `paytag_alias_create`, `paytag_alias_select`, `paytag_grant`, and `paytag_revoke`.
   - The SDK does not clearly model default opaque paytag creation versus explicit raw-stamp exposure as separate user choices.
   - Browser/session owner-management wrappers are documented as deferred, so integrators have only a generic opener after server-side action creation.

2. OpenAPI is incomplete compared with implemented SDK helpers.
   - OpenAPI documents submitted paytag authorization and hosted action start.
   - It does not document `validatePaytagAliases`, `getPaytagGrantStatus`, or `listPaytagLifecycleEvents`, even though those helpers exist in `@cubid/core`.
   - This creates drift for generated docs, Postman artifacts, and consumers who treat OpenAPI as the source of truth.

3. Route-oriented compatibility action strings still leak into the public type surface.
   - `route_registration`, `route_authorization`, `route_selection`, and `grant_revocation` remain accepted by `CubidPaytagActionType`.
   - Tests normalize a hosted action response with `route_authorization`.
   - These strings blur the Cubid/MyPayTag boundary because MyPayTag, not Cubid, owns route registration, route authorization, and route selection.

4. Raw-stamp exposure lacks an explicit contract.
   - Docs say raw stamp paytags require explicit user choice.
   - The SDK does not expose a specific action helper, option, metadata convention, or typed request/response shape that proves the raw-stamp exposure choice was explicit.
   - Without that, opaque-by-default behavior is policy documentation rather than an enforceable SDK contract.

5. Hosted action URL validation is narrow but still tied to `/pay-to`.
   - The browser helper intentionally allows `/pay-to/actions/complete` for backend wire compatibility.
   - The public OpenAPI also exposes `/api/v3/pay-to/...` paths.
   - This is acceptable short term, but public docs and generated references should continue to make clear that `/pay-to` is a compatibility path, not a Cubid-owned payment route surface.

6. Staged smoke guidance does not prove each paytag lifecycle action.
   - Current guidance covers hosted action start/open and MyPayTag validation.
   - It does not require smoke evidence for opaque alias creation, explicit raw-stamp exposure, grant creation, grant revocation, lifecycle event polling, and MyPayTag validation after each state transition.

## Required Changes

1. Add typed hosted paytag action helpers.
   - Add `startPaytagEnableAction`, `startPaytagAliasCreateAction`, `startPaytagAliasSelectAction`, `startPaytagGrantAction`, and `startPaytagRevokeAction` wrappers around `startHostedPaytagAction`.
   - Preserve the generic helper as a lower-level primitive if needed.
   - Ensure wrappers keep dapp API keys server-side and return only the hosted action URL, action token, status, expiry, and idempotency metadata already safe for callers.

2. Model opaque default and raw-explicit exposure.
   - Add explicit types or helper options that separate opaque alias creation from raw-stamp paytag exposure.
   - Require action metadata or typed input to represent the user's explicit raw-stamp choice without exposing raw stamp values back to dapps unnecessarily.
   - Add docs and tests proving opaque paytags are the default.

3. Complete OpenAPI coverage.
   - Add paths/components/examples for alias validation, grant status, and lifecycle event polling.
   - Regenerate Postman and TypeDoc artifacts through repo scripts.
   - Add a check that implemented Paytag helpers and OpenAPI operation ids stay in sync.

4. Remove or quarantine route-oriented compatibility action strings.
   - Prefer only `paytag_*` action strings in public types, docs, tests, and examples.
   - If backend compatibility still requires route-oriented strings, keep them internal, deprecated, or explicitly marked as wire compatibility.
   - Remove route-oriented examples from Paytag acceptance tests.

5. Expand browser helper coverage.
   - Keep `openHostedPaytagAction` browser-safe.
   - Add focused browser tests for each safe hosted action URL shape.
   - Continue rejecting dapp API keys, foreign origins, non-action paths, and list/enumeration URLs.

6. Expand staged smoke guidance.
   - Require smoke coverage for paytag enable, opaque alias create/select, explicit raw-stamp exposure, grant, revoke, lifecycle polling, and MyPayTag validation after each state transition.
   - Keep payment routes, wallets, provider callbacks, NEAR 1Click, and quote selection out of Cubid SDK smoke except as MyPayTag-owned downstream integrations.

## Validation Target

This SDK slice is MVP-ready when:

- `pnpm --filter @cubid/core test`, `pnpm --filter @cubid/browser build`, `pnpm api:validate`, `pnpm api:postman`, `pnpm docs:api:build`, and `pnpm docs:api:check` pass.
- Public Paytag helper names, OpenAPI operation ids, README examples, Postman examples, and generated TypeDoc references agree.
- Browser helpers cannot accept dapp API keys or open non-Cubid hosted action URLs.
- SDK examples show MyPayTag as the primary caller of Cubid validation.
- Cubid SDK still exposes no wallet routing, PayToDapp route priority, provider callback, payment instruction, settlement, solver, bridge, swap, or execution adapter surface for Paytag operations.
