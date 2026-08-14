---
thread_id: friendr-unique-human-confidence-sdk-handoff
title: FriendR Unique Human Confidence SDK Handoff
status: open
owner_repo: cubid-monorepo
related_repos:
  - cubid-monorepo
  - cubid-sdk
sibling_notes:
  cubid-monorepo: agent-context/cross-repo-comms/2026-07-14-friendr-unique-human-confidence-sdk-handoff.md
  cubid-sdk: agent-context/cross-repo-comms/2026-07-14-friendr-unique-human-confidence-sdk-handoff.md
last_update:
  date: 2026-07-14
  actor: cubid-monorepo-agent
  summary: Documented FriendR public SDK contracts after Cubid-side claim, stamp, scoring, and disclosure implementation.
---

# FriendR Unique Human Confidence SDK Handoff

## Log

### 2026-07-14 — cubid-monorepo-agent

Cubid-side FriendR unique-human-confidence support now has implemented public
contract surfaces that the public SDK should ingest as types/helpers/docs. SDK
implementation still belongs in `Cubid-Me/cubid-sdk`; no public SDK code should
be added to `cubid-monorepo`.

Implemented Cubid-side contracts:

- Actor self-claim remains Cubid-owned as `cubid_actor_type`.
- `self_account_type_claim_v1` is a FriendR compatibility alias over
  `cubid_actor_type`, not a second mutable source of truth.
- `cubid_kyc_presence_v1` is a coarse boolean only. It is UserInfo/disclosure
  eligible and not ID-token eligible by default.
- FriendR aggregate import payload stamp type is
  `friendr_unique_human_confidence_v1`.
- Redacted FriendR stamp-summary claim name is
  `friendr_unique_human_confidence`.
- The redacted summary is scoped to `cubid:stamps`, is UserInfo/disclosure
  eligible only, and is not ID-token eligible.
- FriendR aggregate score effects require active `cubid:score` disclosure
  consent and flow through existing score claims such as `cubid_score`,
  `cubid_score_band`, and `cubid_personhood_level`.
- Redirect parameters must never carry FriendR-derived score, actor type,
  KYC-presence, stamp summary, or raw aggregate payload details.
- FriendR aggregate score contribution is human-actor-only by default. Agent
  and organization aggregate evidence may exist for display/audit, but must not
  be presented by SDK helpers as human personhood score evidence.

Raw data that SDKs must not model or expose:

- FriendR graph data;
- relationship labels;
- classifier identities;
- target identities;
- individual attestations;
- duplicate reports;
- contacts;
- XP;
- raw aggregate payloads;
- KYC provider details or internal Cubid identifiers.

Requested SDK follow-up:

1. Add exported types for the FriendR claim alias and redacted summary contract.
2. Add claim/scope helpers that classify `friendr_unique_human_confidence` as
   `cubid:stamps` and UserInfo-only.
3. Ensure SDK OIDC helpers do not look for FriendR-derived data in redirect
   parameters or ID tokens.
4. Document that FriendR score effects are visible only through existing
   consented `cubid:score` outputs.
5. Preserve the actor self-claim boundary: SDKs should not let apps or FriendR
   mutate Cubid actor type through the FriendR compatibility alias.

Cubid-side source references:

- `docs/engineering/sdk-package-target-state.md`
- `docs/engineering/app-scoped-identity-selective-disclosure.md`
- `docs/engineering/login-with-cubid-oidc-architecture.md`
- `packages/claims/src/index.ts`
- `apps/passport/lib/server/friendrAggregateStamps.ts`
- `apps/passport/pages/api/dapp/fetch_score.ts`
- `apps/passport/pages/api/dapp/get_score_details.ts`
