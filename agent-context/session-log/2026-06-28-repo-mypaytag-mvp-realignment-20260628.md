## 2026-06-28T11:20:45Z - S18 core Paytag-only helper surface

- agent: Codex
- branch: codex/mypaytag-mvp-realignment-20260628
- head: e9754430
- summary: Replaced the public `@cubid/core` Pay-To helper/type surface with Paytag-only exports, removed the payment-intent-specific notification helper from the core client, updated focused core coverage to the new Paytag methods, and bumped `@cubid/core`/JSR metadata to 0.2.0 for the breaking API realignment.
- validation: `pnpm --filter @cubid/core test`
- follow-ups: Replace the browser hosted-action opener with Paytag-only exports, then update docs, API artifacts, acceptance tests, and S18 roadmap state.
