# MyPayTag MVP Realignment Instruction

Date: 2026-06-28
Repo: `cubid-sdk-v2`
Status: implementation instruction

## Cross-Repo Instruction Set

This is one of five coordinated instruction docs:

- `mypaytag-backend`: `/Users/botmaster/src/myPayTag/mypaytag-backend/agent-context/2026-06-28-mypaytag-mvp-realignment.md`
- `mypaytag-sdk`: `/Users/botmaster/src/myPayTag/mypaytag-sdk/agent-context/2026-06-28-mypaytag-mvp-realignment.md`
- `mypaytag-site`: `/Users/botmaster/src/myPayTag/mypaytag-site/agent-context/2026-06-28-mypaytag-mvp-realignment.md`
- `cubid-monorepo`: `/Users/botmaster/src/cubid/cubid-monorepo/agent-context/2026-06-28-mypaytag-mvp-realignment.md`
- `cubid-sdk-v2`: `/Users/botmaster/src/cubid/cubid-sdk-v2/agent-context/2026-06-28-mypaytag-mvp-realignment.md`

When touching this repo, read the other four docs first and preserve the ownership split.

## Naming Requirement

Request and implement the rename from `GlobalPayTo` / `globalpayto` references to `MyPayTag` / `mypaytag` in docs, OpenAPI descriptions, package examples, generated docs, Postman artifacts, tests, fixture names, and cross-repo comms. Public SDK function names should prefer `Paytag` / `paytag` over `PayTo` where the operation is Cubid-owned identity/consent. Keep compatibility aliases only when needed and mark them as deprecated.

## Product Boundary

This SDK must expose Cubid as the paytag identity and consent layer, not as a wallet/payment/resolver layer.

Cubid SDK should help:

- open user-hosted Cubid actions to elevate a verified stamp into a paytag;
- let a user create/select/revoke an opaque paytag;
- let a trusted server check whether a submitted paytag/opaque paytag is valid and consented for that dapp context;
- let a trusted server check grant/lifecycle status for identity/consent validity.

Cubid SDK must not expose or describe:

- wallet addresses, wallet inventory, or wallet route data;
- PayToDapp route registration or priority;
- MyPayTag provider callbacks;
- payment intents, payment instructions, settlement, solvers, swaps, bridges, or execution.

## Product Decisions To Preserve

- A paytag is a MyPayTag-branded payment identity powered by Cubid identity and consent primitives.
- User-facing "Paytag" branding should live primarily in MyPayTag. Cubid SDK should describe Cubid as identity, consent, verified stamps, and aliases.
- Paytags are universal global identifiers for PayingDapps at the product layer, while Cubid implementation may default to PayToDapp-scoped aliases/references behind the scenes.
- Opaque paytags such as `abd123@cubid.mypaytag` are the default.
- Raw stamp-based paytags such as `+1234569999@phone.cubid.mypaytag` require explicit user choice.
- MyPayTag should be the primary caller of Cubid validation. PayingDapps integrate with MyPayTag and should not directly probe Cubid.
- Cubid grants primarily authorize MyPayTag to validate identity/paytag state. MyPayTag manages PayingDapp and PayToDapp route authorization separately.
- MyPayTag validates paytag uniqueness and availability before issuance so future identity providers beyond Cubid can fit the model.
- Launch readiness requires local tests first, then hosted staging smoke across Cubid, MyPayTag, one test PayingDapp, and one test PayToDapp.

## SDK Refactor Required

1. Replace resolver/payment helper framing with paytag identity helper framing.
   - Rename or wrap `checkPayToEligibility` as a submitted paytag authorization check.
   - Rename or wrap `resolvePayToAliases` as opaque paytag validation.
   - Rename or wrap `startPayToAction` as a hosted Cubid paytag action starter.
   - Deprecate route/payment-oriented names after compatibility coverage exists.
   - Present direct dapp validation helpers as MyPayTag/server-only integration tools, not as ordinary PayingDapp APIs.

2. Add user-facing browser/session helpers once `cubid-monorepo` exposes the routes.
   - Open a hosted action for `paytag_enable`.
   - Open a hosted action for `paytag_alias_create` or equivalent.
   - Support explicit raw-stamp exposure actions separately from default opaque paytag creation.
   - Open a hosted action for paytag grant/revoke.
   - Keep dapp API keys out of browser helpers.

3. Remove payment-intent semantics from the Cubid SDK surface.
   - `sendPaymentIntentCreatedNotification` should be removed, moved to a generic comms helper, or deprecated as MyPayTag-specific compatibility.
   - OpenAPI examples should not include payment intent ids, payment deep links, settlement language, or "pending payment" copy as a Cubid-owned primitive.

4. Update OpenAPI.
   - Reframe the documented routes around paytag identity and consent.
   - Add user-owned hosted paytag action documentation when backend support exists.
   - Keep server-only dapp API key boundaries.
   - Do not document list-all paytags for dapps unless it is an explicit user-authorized disclosure path.
   - Use opaque and raw-explicit paytag examples consistently, including `abd123@cubid.mypaytag` and `+1234569999@phone.cubid.mypaytag`.

5. Update tests.
   - Assert that browser helpers reject dapp API keys and only open Cubid-hosted paytag actions.
   - Assert that server helpers send only paytag candidate/alias/grant/lifecycle fields.
   - Assert that SDK examples and normalized responses contain no wallet, route, provider, asset, payment intent, settlement, solver, bridge, or swap fields for Cubid paytag operations.
   - Assert that PayingDapp examples call MyPayTag rather than Cubid directly.

6. Preserve package compatibility deliberately.
   - If current `PayTo` names are already consumed, keep deprecated aliases that call the new `Paytag` helpers.
   - Mark compatibility names clearly in README and generated docs.
   - Prefer new examples with `MyPayTag` and Cubid paytag terminology.

## Done Means

This repo is realigned when app developers can integrate Cubid as the paytag identity/consent provider for MyPayTag without seeing Cubid as a payment router, wallet resolver, or payment-intent notification system.
