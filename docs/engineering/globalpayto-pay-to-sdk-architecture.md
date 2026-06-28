# GlobalPayTo Pay-To SDK Architecture

This document translates the GlobalPayTo Pay-To handoff notes into SDK package
ownership and implementation sequencing. It is an architecture and roadmap
baseline for the SDK implementation now that Cubid monorepo PR22 has merged to
`dev` and handed off the backend contract.

Sources:

- `agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md`
- `agent-context/cross-repo-comms/2026-06-24-globalpayto-pay-to-sdk-handoff.md`

The PR22 handoff is the authoritative contract where the two notes differ.
Merged review fixes included in that contract require `pay_to` as an accepted
selective-disclosure source, passkey-assurance enforcement during hosted
action completion when requested, lifecycle polling that filters before
limits, and reachable hosted action completion URLs.

## Package Ownership

`@cubid/core` owns server and Edge helpers for dapp-authenticated API v3 Pay-To
routes. These helpers may send dapp API keys and idempotency headers because
they are runtime-agnostic backend calls.

`@cubid/browser` owns browser-safe hosted-action helpers such as opening a
Cubid-hosted Pay-To action URL. It must not accept dapp API keys.

`@cubid/react` may add optional UI ergonomics on top of `@cubid/browser`, but
must not duplicate protocol logic or accept server credentials.

`@cubid/auth` and `@cubid/auth-react` remain the OIDC, PKCE, session, and
passkey-assurance foundation. They are not Pay-To resolver packages.

`@cubid/comms` remains the signed-in messaging profile package. Dapp
notification send and status helpers belong in `@cubid/core`; signed-in
channel, preference, and profile management belongs in `@cubid/comms`.

Do not create a new `@cubid/payto` package for the first implementation pass.
Revisit that only if Pay-To-specific composition grows beyond `@cubid/core`
plus hosted browser helpers.

## Server Helper Group

The initial `@cubid/core` server helper surface should mirror the PR22 handoff
as methods on the initialized Cubid API client, following the existing
`createCubidApiClient(...)` and client configuration pattern. They should not
be standalone free functions that hide base URL, fetch, credential, or auth
behavior:

- `checkPayToEligibility(candidates, dappUserUuid)`
- `resolvePayToAliases(aliases, dappUserUuid, resolverKey?)`
- `getPayToGrantStatus(dappUserUuid)`
- `listPayToEvents(dappUserUuid, since?, limit?)`
- `startPayToAction(actionType, dappUserUuid, options?)`
- `sendPaymentIntentCreatedNotification(dappUserUuid, payload)`

Route mapping:

| Helper | Route | Notes |
| --- | --- | --- |
| `checkPayToEligibility` | `POST /api/v3/pay-to/stamps/eligibility/check` | Submitted candidates only; never list payment-enabled stamps. |
| `resolvePayToAliases` | `POST /api/v3/pay-to/aliases/resolve` | Opaque aliases only; no raw identifiers in responses. |
| `getPayToGrantStatus` | `POST /api/v3/pay-to/grants/status` | Dapp-scoped grant status for one dapp user. |
| `listPayToEvents` | `POST /api/v3/pay-to/events/list` | Redacted lifecycle polling. |
| `startPayToAction` | `POST /api/v3/pay-to/actions/start` | Write route; requires `Idempotency-Key`. |
| `sendPaymentIntentCreatedNotification` | `POST /api/v3/notifications/send` | Must force the GlobalPayTo MVP event shape. |

Supported submitted-candidate stamp types are `email`, `phone`, `github`,
`google`, and `evm`.

Supported hosted action types are `setup`, `route_registration`,
`route_authorization`, `route_selection`, and `grant_revocation`.

Supported lifecycle event types are `pay_to.stamp.disabled`,
`pay_to.grant.revoked`, `pay_to.grant.expired`, and
`pay_to.identity_state.changed`.

## Browser And User-Session Surfaces

The browser layer should start with `openPayToHostedAction(hostedUrl)`, which
opens a server-created hosted Pay-To action URL without exposing the dapp API
key.

Signed-in user-session wrappers are deferred unless the SDK already has a
Cubid-authenticated user-session pattern ready to carry bearer-token calls
safely. If that boundary is ready later, wrappers may cover owner-management
routes such as:

- `POST /api/pay-to/actions/complete`
- `POST /api/pay-to/stamps/list`
- `POST /api/pay-to/stamps/update`
- `POST /api/pay-to/grants/list`
- `POST /api/pay-to/grants/revoke`

These routes are signed-in user management surfaces. They must not be presented
as resolver APIs, and they must not allow a dapp to enumerate a user's payment
enabled stamps by default.

## Privacy And Error Boundaries

Resolver helpers must stay submitted-candidate or opaque-alias based. The SDK
must not expose a list-all-payment-stamps helper for dapps.

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

`sendPaymentIntentCreatedNotification(...)` must support only
`payment_event_type: "payment_intent_created"` with
`category: "TRANSACTIONAL"`. It must not add `payment_received`, settlement,
marketing, inbox, activity-feed, or generic payment-status helpers.

## Example Shapes

Server-side candidate eligibility:

```ts
const result = await client.checkPayToEligibility(
  [{ candidateRef: "payee-1", stampType: "email", value: "user@example.com" }],
  dappUserUuid
)
```

Server-side hosted action start:

```ts
const action = await client.startPayToAction("setup", dappUserUuid, {
  idempotencyKey,
  returnUrl: "https://example.com/pay-to/callback",
  requiredPasskeyAssurance: true,
})
```

Browser-safe launch:

```ts
openPayToHostedAction(action.hostedUrl)
```

Notification helper:

```ts
await client.sendPaymentIntentCreatedNotification(dappUserUuid, {
  idempotencyKey,
  title: "Payment intent created",
  body: "Review the pending payment intent.",
  metadata: { intentId },
})
```

## Validation Expectations

Future implementation should add tests that prove:

- approved payment routers with active grants receive boolean eligibility only;
- non-router, missing grant, revoked grant, wrong dapp user, disabled stamp,
  and unknown candidate cases return generic negative responses;
- alias resolution never returns raw identifiers;
- lifecycle polling returns redacted event refs only;
- hosted action start attaches `Idempotency-Key`;
- unsupported payment notification events are denied or unrepresentable through
  the typed helper before event creation;
- browser and React Pay-To helpers cannot accept dapp API keys.
