## 2026-06-28T11:20:45Z - S18 core Paytag-only helper surface

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: e9754430
- summary: Replaced the public `@cubid/core` Pay-To helper/type surface with Paytag-only exports, removed the payment-intent-specific notification helper from the core client, updated focused core coverage to the new Paytag methods, and bumped `@cubid/core`/JSR metadata to 0.2.0 for the breaking API realignment.
- validation: `pnpm --filter @cubid/core test`
- follow-ups: Replace the browser hosted-action opener with Paytag-only exports, then update docs, API artifacts, acceptance tests, and S18 roadmap state.

## 2026-06-28T11:22:05Z - S18 browser Paytag-only hosted action opener

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: 054dde3b
- summary: Replaced the public `@cubid/browser` Pay-To hosted action opener and option types with Paytag-only exports, updated hosted action validation errors to Paytag terminology, and bumped `@cubid/browser` to 0.2.0 for the breaking API realignment.
- validation: `pnpm --filter @cubid/browser build`; `pnpm exec vitest run --config vitest.config.ts packages/browser/src/client.test.ts`
- follow-ups: Remove payment-intent framing from docs/API artifacts, update acceptance tests, and mark S18 roadmap state.

## 2026-06-28T11:25:54Z - S18 remove payment-intent framing from Paytag docs

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: 51442999
- summary: Reframed the core/browser READMEs, package target-state docs, architecture doc, and OpenAPI source around MyPayTag paytag identity and consent; removed the payment-intent notification endpoint from the documented Paytag API surface.
- validation: `pnpm api:validate`
- follow-ups: Regenerate deterministic Postman and TypeDoc API artifacts, then update acceptance tests and S18 roadmap state.

## 2026-06-28T11:27:28Z - S18 regenerated Paytag API artifacts

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: a5d1155b
- summary: Regenerated the committed Postman collection and TypeDoc JSON references after the Paytag-only API source and package version changes, removing the generated payment-intent notification examples and old Pay-To SDK symbols from machine-ingestible artifacts.
- validation: `pnpm api:postman`; `pnpm docs:api:build`; `pnpm docs:api:check`; targeted `rg` over generated API artifacts for old Pay-To/payment-intent public terms.
- follow-ups: Update consumer acceptance tests and roadmap metadata for the completed S18 realignment.

## 2026-06-28T11:28:38Z - S18 Paytag-only acceptance boundary

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: 1c03fb11
- summary: Updated consumer-style acceptance tests to import and call only Paytag public exports, assert old Pay-To and payment-intent exports are absent, and verify Paytag request bodies avoid payment, wallet, provider, and route fields.
- validation: `pnpm --filter @cubid/core build`; `pnpm --filter @cubid/browser build`; `pnpm test:acceptance`
- follow-ups: Complete S18 roadmap/session metadata and add staged MyPayTag smoke guidance.

## 2026-06-28T11:31:00Z - S18 roadmap closeout and staged smoke guidance

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: b73d3860
- summary: Marked S18 and S18.1 through S18.6 complete, updated repo-status and backgrounder with the Paytag-only SDK direction, and added local plus hosted staging smoke guidance for Cubid/MyPayTag integration readiness.
- validation: `pnpm api:validate`; `pnpm docs:api:check`; `git diff --check`; targeted `rg` confirming old Pay-To public names only remain in negative tests.
- follow-ups: Run full repo validation before yeeting the branch.

## 2026-06-28T22:46:54Z - S19.1 typed Paytag action starters

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: 123d86e2
- summary: Added typed @cubid/core hosted Paytag action starter methods for enable, opaque alias create/select, grant, and revoke while keeping startHostedPaytagAction as the lower-level wire-compatibility primitive. Updated core README guidance and focused tests so ordinary MVP callers no longer pass raw action strings.
- validation: Pending; will run focused @cubid/core tests before commit.
- follow-ups: Model opaque default versus explicit raw-stamp exposure in S19.2.

## 2026-06-28T22:50:34Z - S19.2 opaque default Paytag alias contract

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: a27aa81a
- summary: Made Paytag alias creation explicitly opaque by default via the `aliasExposure: "opaque"` input contract, added runtime rejection for attempted raw-stamp exposure through the generic alias-create helper, and documented that raw-stamp paytags require a separate Passport-hosted action contract before SDK exposure.
- validation: Pending; will run focused @cubid/core tests before commit.
- follow-ups: Complete OpenAPI coverage for the remaining Paytag helper routes in S19.3.

## 2026-06-28T22:52:52Z - S19.3 Paytag OpenAPI route coverage

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: a977c773
- summary: Added OpenAPI paths, request schemas, response schemas, and opaque-default examples for Paytag alias validation, dapp-scoped grant status, and redacted lifecycle event listing. Regenerated the deterministic Postman collection from the updated OpenAPI source.
- validation: `corepack pnpm api:validate`; `corepack pnpm api:postman`.
- follow-ups: Add guardrails so Paytag public helpers, OpenAPI operation IDs, and generated artifacts stay in sync in S19.4.

## 2026-06-28T22:54:45Z - S19.4 Paytag surface guardrail

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: c279297b
- summary: Added a Paytag surface guardrail script that checks @cubid/core public Paytag helpers against OpenAPI operation IDs, scans generated artifacts for removed Pay-To public helper names, and blocks forbidden Paytag-owned payment/routing/provider field keys in OpenAPI. Wired the guardrail into `paytag:check` and the yeet validation bundle.
- validation: `corepack pnpm paytag:check`; `corepack pnpm api:validate`.
- follow-ups: Quarantine route-oriented compatibility action strings from the public action type surface in S19.5.

## 2026-06-28T22:57:15Z - S19.5 canonical Paytag action strings

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: 3682b355
- summary: Removed old setup and route-oriented compatibility strings from the public Paytag action type, added runtime validation for the generic hosted-action primitive, replaced the positive hosted-action test response with a canonical paytag action, and documented that MyPayTag owns route registration, authorization, and selection.
- validation: `corepack pnpm --filter @cubid/core test`; `corepack pnpm paytag:check`.
- follow-ups: Expand @cubid/browser hosted Paytag action URL tests in S19.6.

## 2026-06-28T22:59:28Z - S19.6 browser Paytag hosted action hardening

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: 173621e5
- summary: Expanded @cubid/browser hosted Paytag action coverage across canonical action-token URLs, dapp API key query variants, foreign origins, non-action/list paths, and malformed URL inputs. Tightened the opener to require a server-created action token and documented that browser helpers never mint action tokens or accept dapp API keys.
- validation: `corepack pnpm exec vitest run --config vitest.config.ts packages/browser/src/client.test.ts`; `corepack pnpm --filter @cubid/browser build`.
- follow-ups: Update staged Cubid/MyPayTag smoke guidance in S19.7.

## 2026-06-28T23:00:57Z - S19.7 Paytag staged smoke checklist

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: 8b4bc701
- summary: Expanded the MyPayTag Paytag staged smoke checklist to cover local SDK checks, paytag enable, opaque alias create/select, raw-stamp exposure dependency, grant, revoke, lifecycle polling, MyPayTag validation after state transitions, and the explicit boundary that payment routing/execution remains outside Cubid SDK ownership.
- validation: `git diff --check`.
- follow-ups: Regenerate API references and run the final targeted S19 validation bundle in S19.8.
