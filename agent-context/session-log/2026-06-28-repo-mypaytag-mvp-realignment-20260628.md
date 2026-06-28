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
