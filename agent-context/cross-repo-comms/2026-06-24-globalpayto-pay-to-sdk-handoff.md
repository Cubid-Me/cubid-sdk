---
from: cubid-monorepo
to: cubid-sdk
created: 2026-06-24
status: ready-for-sdk-implementation
topic: GlobalPayTo Pay-To SDK helper handoff
source_pr: https://github.com/Cubid-Me/cubid-monorepo/pull/22
source_pr_status: merged-to-dev
source_dev_head: 1745f89
review_fix_commit: ba2dea6
---

# GlobalPayTo Pay-To SDK Helper Handoff

Cubid monorepo PR22 has merged to `dev` and implements the GlobalPayTo MVP
backend contract through the Passport/API v3 surfaces below. Please finish the
SDK S17 handoff/architecture ingestion and implement the first `@cubid/core`
Pay-To types and helpers against this merged contract; do not add public SDK
implementation to `cubid-monorepo`.

PR22 scope summary:

- user-owned Pay-To stamp inspection and enable/disable routes;
- Admin-policy-gated submitted-candidate eligibility checks;
- opaque dapp-scoped and resolver-scoped alias resolution;
- short-lived hosted Pay-To action tokens;
- Pay-To grant list/revoke/status routes;
- redacted lifecycle event polling;
- `payment_intent_created`-only notification support;
- Pay-To-specific throttling and generic negative responses.

Merged review-fix details included in the contract:

- `selective_disclosure_grants.source` accepts `pay_to`.
- hosted Pay-To action completion enforces stored
  `required_passkey_assurance` when requested.
- lifecycle polling filters by user and lifecycle event type before applying
  limits.
- `hostedUrl` points to a reachable `/pay-to/actions/complete` page.

Server-only helper surfaces:

- `POST /api/v3/pay-to/stamps/eligibility/check`
  - body: `{ dapp_user_uuid, candidates: [{ candidateRef?, stampType, value }] }`
  - response: `{ data: { results: [{ candidateRef, eligible }], status } }`
  - `status` is `checked` or generic `resolution_unavailable`.
- `POST /api/v3/pay-to/aliases/resolve`
  - body: `{ dapp_user_uuid, resolver_key?, aliases: [{ aliasRef?, alias }] }`
  - response: `{ data: { results: [{ aliasRef, eligible }], status } }`
  - no raw identifiers, stamp ids, or owner ids are returned.
- `POST /api/v3/pay-to/grants/status`
  - body: `{ dapp_user_uuid }`
  - response: `{ data: { dappUserUuid, grantStatus, grantedAt, revokedAt } }`
  - `grantStatus` is `active`, `revoked`, or `missing`.
- `POST /api/v3/pay-to/events/list`
  - body: `{ dapp_user_uuid, since?, limit? }`
  - response: `{ data: { events, status } }`
  - events include only redacted event refs, event types, timestamps, outcomes,
    and generic reasons.
- `POST /api/v3/pay-to/actions/start`
  - body: `{ action_type, dapp_user_uuid, return_url?, metadata?, required_passkey_assurance? }`
  - response: `{ data: { actionToken, actionType, expiresAt, hostedUrl, status } }`
  - write route; requires `Idempotency-Key`.
- `POST /api/v3/notifications/send`
  - GlobalPayTo MVP support is only
    `{ category: "TRANSACTIONAL", payment_event_type: "payment_intent_created" }`.

User/browser Cubid-hosted or Cubid-session surfaces:

- `POST /api/pay-to/actions/complete`
  - user-authenticated Cubid-hosted completion for action tokens.
- `POST /api/pay-to/stamps/list`
  - signed-in user owner-management route, not a dapp resolver route.
- `POST /api/pay-to/stamps/update`
  - signed-in user enables/disables one eligible Pay-To stamp.
- `POST /api/pay-to/grants/list`
  - signed-in user sees redacted Pay-To grants.
- `POST /api/pay-to/grants/revoke`
  - signed-in user revokes their own Pay-To grant.

Important SDK boundaries:

- Dapp API keys must stay server-only.
- Resolver helpers must be submitted-candidate or opaque-alias based. Do not
  expose or document any default list-all-payment-stamps resolver helper.
- `POST /api/pay-to/stamps/list` is a signed-in user owner-management route,
  not a dapp resolver route.
- Hosted action helpers may create action tokens server-side and open Cubid
  hosted URLs in the browser.
- GlobalPayTo Comms support is limited to
  `payment_event_type = "payment_intent_created"` with
  `category = "TRANSACTIONAL"`.
- Public negative statuses are generic, including `resolution_unavailable`,
  `no_events`, `expired`, `wrong_user`, `unsupported_app_context`,
  `rate_limited`, `replay`, and `mismatch`.

Expected helper groups:

- Server helpers:
  - `checkPayToEligibility(candidates, dappUserUuid)`
  - `resolvePayToAliases(aliases, dappUserUuid, resolverKey?)`
  - `getPayToGrantStatus(dappUserUuid)`
  - `listPayToEvents(dappUserUuid, since?, limit?)`
  - `startPayToAction(actionType, dappUserUuid, options?)`
  - `sendPaymentIntentCreatedNotification(dappUserUuid, payload)`
- Browser helpers:
  - `openPayToHostedAction(hostedUrl)`
  - optional user-session wrappers for stamp/grant owner-management routes,
    only when the user is already in a Cubid-authenticated context.

Action types:

- `setup`
- `route_registration`
- `route_authorization`
- `route_selection`
- `grant_revocation`

Supported submitted-candidate stamp types:

- `email`
- `phone`
- `github`
- `google`
- `evm`

Lifecycle event types:

- `pay_to.stamp.disabled`
- `pay_to.grant.revoked`
- `pay_to.grant.expired`
- `pay_to.identity_state.changed`

Smoke expectations for SDK examples:

- approved payment router with active grant returns boolean eligibility only;
- non-router, missing grant, revoked grant, wrong dapp user, disabled stamp, or
  unknown candidate all produce generic negative responses;
- alias resolution never returns raw identifiers;
- lifecycle polling returns redacted event refs only;
- unsupported payment notification events are denied before event creation.

Implementation sequencing suggestion:

1. Finish S17.1 by marking this handoff and
   `docs/engineering/globalpayto-pay-to-sdk-architecture.md` as ingested now
   that PR22 is merged to Cubid `dev`.
2. Implement S17.2 with typed request/response models in `@cubid/core`.
3. Implement S17.3 with server-only client methods on the existing initialized
   `@cubid/core` client/config pattern.
4. Add hosted-action URL helper that does not expose server credentials.
5. Add examples showing submitted-candidate checks and alias resolution.
6. Add smoke tests that assert generic negative responses and no list-style
   resolver helper.
7. Update package docs to say PR22 backend support is required.

Immediate SDK request:

- Prioritize S17.1, S17.2, and S17.3 before browser/React ergonomics.
- Keep dapp API keys out of `@cubid/browser`, `@cubid/react`, examples, and any
  hosted action opener.
- Do not expose a dapp resolver helper for `POST /api/pay-to/stamps/list`; it
  remains a signed-in user owner-management route only.
