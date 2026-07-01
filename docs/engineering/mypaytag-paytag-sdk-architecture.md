# MyPayTag Paytag SDK Architecture

This document records the SDK-side realignment from the earlier route/payment
helper framing to the MyPayTag paytag identity and consent model.
Backend wire routes may still use `/pay-to` paths for compatibility, but the
public SDK surface is Paytag-only.

Sources:

- `agent-context/2026-06-28-mypaytag-mvp-realignment.md`
- `agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md`
- `agent-context/cross-repo-comms/2026-06-24-globalpayto-pay-to-sdk-handoff.md`

## Package Ownership

`@cubid/core` owns server and Edge helpers for dapp-authenticated paytag
identity, opaque alias, grant, hosted-action, and lifecycle checks. These
helpers may send dapp API keys and idempotency headers because they are trusted
server calls.

`@cubid/browser` owns browser-safe hosted paytag action launch. It must not
accept dapp API keys.

`@cubid/react` may add optional UI ergonomics on top of `@cubid/browser`, but
must not duplicate protocol logic or accept server credentials.

`@cubid/auth` and `@cubid/auth-react` remain the OIDC, PKCE, session, and
passkey-assurance foundation. They are not paytag resolver packages.

`@cubid/comms` remains the signed-in messaging profile package. Notification
send/status helpers are generic communications concerns, not part of the
paytag identity surface.

Do not create a new `@cubid/paytag` package for this implementation pass.
Revisit that only if paytag-specific composition grows beyond `@cubid/core`
plus hosted browser helpers.

## Server Helper Group

The public `@cubid/core` server helper surface is exposed as methods on the
initialized Cubid API client, following the existing `createCubidApiClient(...)`
configuration pattern:

- `checkPaytagAuthorization({ dappUserUuid, candidates })`
- `validatePaytagAliases({ dappUserUuid, aliases, resolverKey? })`
- `getPaytagGrantStatus({ dappUserUuid })`
- `listPaytagLifecycleEvents({ dappUserUuid, since?, limit? })`
- `startHostedPaytagAction({ dappUserUuid, actionType, options? })`

Route mapping remains wire-compatible:

| Helper | Wire route | Notes |
| --- | --- | --- |
| `checkPaytagAuthorization` | `POST /api/v3/pay-to/stamps/eligibility/check` | Submitted candidates only; never list user paytags. |
| `validatePaytagAliases` | `POST /api/v3/pay-to/aliases/resolve` | Opaque aliases only; no raw identifiers in responses. |
| `getPaytagGrantStatus` | `POST /api/v3/pay-to/grants/status` | Dapp-scoped grant status for one dapp user. |
| `listPaytagLifecycleEvents` | `POST /api/v3/pay-to/events/list` | Redacted lifecycle polling. |
| `startHostedPaytagAction` | `POST /api/v3/pay-to/actions/start` | Write route; requires `Idempotency-Key`. |

Supported submitted-candidate stamp types are `email`, `phone`, `github`,
`google`, and `evm`.

Supported SDK action types are `paytag_enable`, `paytag_alias_create`,
`paytag_alias_select`, `paytag_grant`, and `paytag_revoke`. Route-oriented
strings such as `route_registration`, `route_authorization`,
`route_selection`, and `grant_revocation` are not public Paytag SDK actions.
MyPayTag, not Cubid, owns PayToDapp route registration, route authorization,
and route selection.

`startPaytagAliasCreateAction` is explicitly opaque by default and only accepts
`aliasExposure: "opaque"` in the current SDK contract. Raw stamp-based paytags
such as `+1234569999@phone.cubid.mypaytag` require a separate Passport-hosted
action contract before the SDK should expose a typed helper. Do not route raw
stamp exposure through the generic alias-create helper.

Supported lifecycle event types remain identity/consent events:
`pay_to.stamp.disabled`, `pay_to.grant.revoked`, `pay_to.grant.expired`, and
`pay_to.identity_state.changed`.

## Browser And User-Session Surfaces

The browser layer exposes `openHostedPaytagAction(hostedUrl)`, which opens a
server-created hosted paytag action URL without exposing the dapp API key.

Signed-in user-session wrappers are deferred unless the SDK has a
Cubid-authenticated user-session pattern ready to carry bearer-token calls
safely. Those routes are signed-in user management surfaces. They must not be
presented as dapp resolver APIs, and they must not allow a dapp to enumerate a
user's paytags by default.

## Privacy And Error Boundaries

Paytag helpers must stay submitted-candidate or opaque-alias based. The SDK
must not expose a list-all-user-paytags helper for dapps.

SDK defaults must not expose universal Cubid IDs, raw stamp identifiers, raw
payment identifiers, raw provider subjects, private resolver diagnostics,
route counts, route preferences, wallet graphs, provider internals, or
cross-app grants.

Generic negative statuses are part of the public contract. The SDK should
preserve them rather than expanding them into probing-friendly detail:

- `resolution_unavailable`
- `no_events`
- `expired`
- `wrong_user`
- `unsupported_app_context`
- `rate_limited`
- `replay`
- `mismatch`

Cubid paytag operations must not include payment intent ids, payment deep
links, settlement copy, provider callbacks, PayToDapp route priority, wallets,
solvers, bridges, swaps, or execution as Cubid-owned primitives.

## Example Shapes

Server-side submitted paytag authorization:

```ts
const authorization = await client.checkPaytagAuthorization({
  dappUserUuid,
  candidates: [
    { candidateRef: "paytag-1", stampType: "email", value: "abd123@cubid.mypaytag" },
  ],
})
```

Server-side hosted paytag action start:

```ts
const action = await client.startHostedPaytagAction({
  actionType: "paytag_enable",
  dappUserUuid,
  idempotencyKey,
  returnUrl: "https://mypaytag.example/paytag/callback",
  requiredPasskeyAssurance: true,
})
```

Browser-safe launch:

```ts
openHostedPaytagAction(action.hostedUrl)
```

## Validation Expectations

Implementation should keep tests proving:

- authorized submitted candidates receive boolean eligibility only;
- missing grant, revoked grant, wrong dapp user, disabled stamp, and unknown
  candidate cases return generic negative responses;
- alias validation never returns raw identifiers;
- lifecycle polling returns redacted event refs only;
- hosted action start attaches `Idempotency-Key`;
- browser and React paytag helpers cannot accept dapp API keys;
- SDK examples and normalized paytag responses do not expose wallet, route,
  provider, asset, payment intent, settlement, solver, bridge, swap, or
  execution fields.

## Staged Smoke Checklist

Treat hosted staging smoke as launch-readiness evidence only after local SDK
validation passes.

Local SDK baseline:

- `pnpm --filter @cubid/core test`
- `pnpm exec vitest run --config vitest.config.ts packages/browser/src/client.test.ts`
- `pnpm --filter @cubid/core build`
- `pnpm --filter @cubid/browser build`
- `pnpm test:acceptance`
- `pnpm api:validate`
- `pnpm api:postman`
- `pnpm paytag:check`
- `pnpm docs:api:build`
- `pnpm docs:api:check`

Hosted staging baseline:

- Cubid hosted action start returns a hosted paytag action URL for each
  canonical Cubid-owned action: `paytag_enable`, `paytag_alias_create`,
  `paytag_alias_select`, `paytag_grant`, and `paytag_revoke`.
- `@cubid/browser` opens only the Cubid-hosted paytag action URL and rejects
  dapp API keys in the URL.
- Paytag enable smoke proves a verified Cubid stamp can become paytag-capable
  identity state without returning raw stamp values to the dapp.
- Opaque alias creation smoke proves `abd123@cubid.mypaytag`-style aliases are
  the default and that MyPayTag validates availability before issuance.
- Opaque alias selection smoke proves the user can select among existing
  opaque aliases without exposing raw stamp identifiers or cross-app state.
- Explicit raw-stamp exposure smoke is blocked until Passport exposes a stable
  separate hosted action contract. When that exists, smoke must prove the user
  made the explicit choice and that Cubid SDK normalized responses remain
  redacted unless Passport documents a safe public raw-stamp response field.
- Grant smoke proves MyPayTag can obtain dapp-scoped consent to validate a
  submitted paytag through Cubid.
- Revoke smoke proves the grant can be revoked and subsequent MyPayTag
  validation receives a generic negative status rather than probing-friendly
  detail.
- Lifecycle polling smoke proves `listPaytagLifecycleEvents` returns redacted
  identity, alias, and consent events after enable, alias create/select, grant,
  and revoke transitions.
- MyPayTag backend validates a submitted opaque paytag such as
  `abd123@cubid.mypaytag` through the Cubid SDK after each state transition
  without sending wallet, route, provider, asset, payment instruction, quote,
  settlement, solver, bridge, swap, or execution fields to Cubid.
- MyPayTag site can send the user to the Cubid hosted paytag action and return
  to its own Paytag UX without exposing raw stamp values by default.
- One test PayingDapp calls MyPayTag, not Cubid directly, for paytag payment
  resolution.
- One test PayToDapp route flow proves MyPayTag owns route selection and
  provider intent creation while Cubid remains limited to identity, consent,
  aliases, and lifecycle state. Wallets, routes, route priority, provider
  callbacks, payment instructions, NEAR 1Click, quotes, settlement, solvers,
  bridges, swaps, and execution stay outside Cubid SDK ownership.
