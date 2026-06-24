---
thread_id: globalpayto-cubid-mvp-dependencies
title: GlobalPayTo MVP Cubid dependency feature request
status: open
owner_repo: globalpayto
related_repos:
  - globalpayto
  - cubid-monorepo
  - cubid-sdk-v2
sibling_notes:
  globalpayto: agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md
  cubid-monorepo: agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md
  cubid-sdk-v2: agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md
last_update:
  date: 2026-06-24
  actor: globalpayto-agent
  summary: Requested SDK support for GlobalPayTo MVP identity, consent, opaque alias, grant management, lifecycle, and payment-intent-created notification flows once Cubid platform contracts are confirmed.
---

# GlobalPayTo MVP Cubid SDK Feature Request

## Thread Rule

This is the Cubid SDK sibling of the GlobalPayTo-owned note at:

`globalpayto/agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md`

Please mirror substantive updates across the sibling notes. The Cubid monorepo
copy should define platform/API ownership; this SDK copy should track package
surface, versions, helper names, examples, and typed error readiness.

## SDK Request

Once the Cubid platform contracts are confirmed, GlobalPayTo needs public SDK
support for:

- Login with Cubid / OIDC PKCE hosted action entry for setup, consent, route
  selection, and grant revocation flows.
- Verified stamp eligibility and validation helpers.
- Pay-to stamp enable/disable/inspect helpers or hosted launcher helpers.
- Opaque resolver-scoped or dapp-scoped alias helpers for payment-visible
  stamps.
- App-scoped user mapping helpers that do not expose or require universal
  CubidID values.
- Consent token helpers for short-lived, single-use, scope-bound route
  registration, authorization, setup, and route-selection actions.
- Grant list/revoke helpers or hosted grant-management launcher helpers.
- Lifecycle event or polling helpers for stamp disabled, grant revoked, grant
  expired, and identity-state changes that affect payment resolution.
- Cubid comms helpers for the MVP `payment_intent_created` event only.
- Browser-safe typed errors for cancellation, expiry, wrong user, unsupported
  app context, unavailable credential, cooldown/rate limit, provider outage,
  replay, and mismatch cases.

## Boundary Requirements

- Do not promote raw email, phone, domain, or social-handle-like stamps as the
  preferred payment-visible identifier. Prefer opaque alias flows when possible.
- Do not expose universal CubidID values as GlobalPayTo pay-to identifiers.
- Do not expose private resolver diagnostics, wallet graphs, route counts,
  route preferences, provider internals, or raw identifiers through SDK helper
  defaults.
- Do not add `payment_received` or settlement-oriented notification helpers for
  GlobalPayTo MVP. The only MVP event is `payment_intent_created`.

## Requested SDK Reply

Please reply with:

- package names and versions;
- exact exported helper names;
- browser vs server/Edge ownership for each helper;
- required environment/config names and where they belong;
- typed error names/codes;
- minimal usage snippets for GlobalPayTo resolver backend and hosted site;
- any dependency on Cubid monorepo platform work that must land first.

## References

- Owner request:
  `globalpayto/agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md`
- Platform sibling:
  `cubid-monorepo/agent-context/cross-repo-comms/2026-06-24-globalpayto-cubid-mvp-dependencies.md`
- GlobalPayTo public SDK contracts:
  `globalpayto-sdk/docs/engineering/mvp-api-contracts.md`
- GlobalPayTo hosted action docs:
  `globalpayto-site/docs/engineering/hosted-action-contract.md`
  and `globalpayto-site/docs/engineering/hosted-action-flow-design.md`

## Log

### 2026-06-24 — globalpayto-agent

Created this SDK-scoped sibling so Cubid SDK agents can track the package
surface needed by GlobalPayTo after Cubid monorepo confirms the platform API,
hosted-flow, event, and grant-management contracts.
