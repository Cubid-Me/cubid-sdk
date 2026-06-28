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
