# Consumer identity boundaries

This guide covers existing public SDK behavior while the Identity owner finalizes
[event ordering #218](https://github.com/Cubid-Me/cubid-monorepo/issues/218),
[hosted verified-email collection #219](https://github.com/Cubid-Me/cubid-monorepo/issues/219)
and the [private allocator mapping #220](https://github.com/Cubid-Me/cubid-monorepo/issues/220).
It does not introduce a resolver endpoint, response schema, email profile or SET
claim. Those versioned contracts and hosted acceptance remain owner decisions.

## Keep identifier namespaces separate

| Identifier | Authority and use |
| --- | --- |
| OIDC pairwise `sub` | Validated issuer/client authentication subject; keep it scoped to that relying party. |
| Existing dapp user UUID | The existing app integration's identifier, returned by public `create_user` as `user_id` and normalized by `@cubid/core` as `userId`. It is distinct from OIDC `sub`. |
| Project-scoped participant UUID | Input correlation in the authorized project's allocator contract; it is not automatically the target app's dapp user UUID. |
| Internal Cubid user key | Server-owned join authority; never derive, request or expose it as a public OIDC subject or allocator response field. |

All three external identifiers can look like UUIDs. String format, matching
email or successful sign-in cannot establish the mapping between namespaces.
Keep a pre-existing app dapp UUID and OIDC subject in separate application fields.
Only a trusted server mapping under the correct project/app authority can connect
them. Do not hash, decode, cast or copy `sub` into the dapp UUID field.

The ordinary public `fetchScore({ userId })` reader expects its caller to supply
the existing app integration identifier. The SDK does not infer its namespace
from syntax or automatically look up an OIDC session. The regression fixtures
deliberately use three different UUID-shaped values to make this boundary visible.

## Read-only resolution cannot provision missing people

The allocator contract must resolve to the target app's **existing** dapp-user
mapping. A missing source or target mapping must not trigger `createUser`,
`ensureUserByEmail`, stamp persistence or any other provision/link operation.
`ensureUserByEmail` is explicitly a resolve-or-create convenience for separate
onboarding work; it is unsuitable as a missing-mapping fallback.

Preserve these distinctions when adapting a finalized resolver response:

- A real numeric zero score is a resolved value, not an absent mapping.
- Missing mapping, contradictory mapping, stale evidence and transport/auth
  errors have different meanings. Do not turn timeout, rate limiting or a
  datastore failure into `not_found` or zero.
- Correlate every result to the requested project participant. Validate batch
  completeness, duplicate/missing items, status and the owner-defined version
  before joining target app accounts or using score evidence.
- Consume only a complete authorized score/evidence snapshot. The ordinary
  public score reader has no allocator evidence hash or private contract version;
  it is not a replacement for that private protocol. Its legacy missing-score
  normalization must not become an allocator DTO validation rule.
- Preserve owner-defined evidence bytes, score model and freshness semantics.
  Do not regenerate evidence from browser values, reveal internal join keys or
  treat a score as permission to create accounts or move money.

The private allocator is a separate server workload boundary, not a new browser
or public dapp-key SDK method. Its final response spelling/version and lifecycle
guarantees must come from Identity before an adapter is published. No private
request signer, credentials, endpoint implementation or transport DTO is copied
into this guide or the public SDK.

## Cubid owns hosted email verification

Request only the approved scopes needed by the app, including `email` when it
needs a consented email. The #219 work is for Cubid's hosted authorize flow to
collect and verify a passkey-only person's email, with Cubid sending the OTP.
The public SDK's existing `EmailOtpForm` UI and its boolean result are not a
portable, server-verifiable OIDC proof. Do not persist an unverified address or
pass pairwise `sub` as a Cubid internal `userId` to bridge that gap.

After signature, issuer, audience, expiry, transaction state and nonce validation,
keep authentication anchored to the same OIDC subject. Collecting or disclosing
email must not change that identity or auto-link another account by email.
`createCubidAuthSession` assembles a session; it does not replace ID-token
validation. Its UserInfo subject must match the validated ID-token subject even
when both payloads contain the same email.

The SDK already supports a discovered `userinfo_endpoint` and
`fetchCubidUserInfo`. Use the endpoint from the configured issuer's validated
discovery document and the server-held access token. That helper alone does not
implement missing hosted collection, a new issuer profile or proof delivery.
Missing optional email remains a valid subject-only authentication result;
application contact/onboarding policy is a separate decision.

The [current Cubid verified-email profile](./federated-siwc.md#cubid-verified-email-profile-migration)
returns a verified, consented email string when available and omits
`email_verified`. Older Cubid and other OIDC issuers can return the optional
boolean. Generic SDK types preserve `true`, `false` and absence separately;
never reinterpret `false` as verified or assume an omission profile for an
unconfirmed issuer/runtime. Issue #219's requested boolean must be reconciled by
Identity in its versioned contract before this guidance or a consumer changes
verification policy. No new profile is asserted here.

## Order verified events by the agreed event clock

A later delivery or signing time does not mean the underlying event happened
later. [RFC 8417 section 2.2](https://www.rfc-editor.org/rfc/rfc8417.html#section-2.2)
defines optional `toe` as event time; its omission does not convey that time.
Cubid #218 must specify its stable event-time or stable-issuance profile before
receivers select a field or legacy fallback.

For example, withdrawal at T100 retried at T300 must not revoke a grant that
was re-consented at T200. The consumer needs an issuer-defined event clock and
a trusted cursor for that newer grant. Arrival order, freshly re-signed `iat`,
an opaque event ID's lexical order or an arbitrary local wall-clock timestamp
cannot establish that causality. Equal-time conflicts, precision, clock skew,
legacy messages and recovery/reconciliation need explicit contract rules.

Validate the SET signature, issuer, audience, token type and subject before
ordering. Deduplicate within the issuer/audience/event scope and commit the
ordering cursor and state change atomically. Do not use decoded JWT fields or
the ordinary OIDC authentication subject as authority to mutate another app's
account. This guide supplies no new event parser or assumed normalized field.

At this SDK baseline (`dev` at `ae896ce4`), the SET helpers from main-only
[PR58](https://github.com/Cubid-Me/cubid-sdk/pull/58) are not on `dev`. Their
integration remains a parent-owned decision. Do not merge `main` or replace
auth files wholesale to obtain them; preserve the existing crypto injection,
nonce/subject checks, native consumers and federation hints in any approved
scoped integration.

## Evidence and remaining acceptance

`packages/acceptance/src/consumer-identity-boundaries.acceptance.test.ts` uses
synthetic hosts and existing public SDK entrypoints to verify identifier
separation, exact known-ID score requests, real zero scores, read failures with
no create fallback, subject-only sessions, optional verification booleans and
UserInfo binding. It neither mocks an undecided allocator response nor proves
an issuer deployment, database uniqueness, hosted OTP or cross-project wiring.

Run after installing dependencies from the SDK root:

```sh
pnpm --filter @cubid/auth build
pnpm --filter @cubid/core build
cd packages/acceptance
node ../../node_modules/vitest/vitest.mjs run --config vitest.config.ts src/consumer-identity-boundaries.acceptance.test.ts
```

Identity owns the backend, migrations and final contracts. FundLoop owns its
consumer wiring and allocation policy; those applications are not modified in
this SDK slice. Cubid #218/#219/#220 and mirrors #334/#335/#336 stay open until
Noak alone closes them after cross-project verification. The conditional Starter
Preview approval remains held on isolated-backend readiness; these issue
assignments authorize no credentials, initialization or deployment release.
