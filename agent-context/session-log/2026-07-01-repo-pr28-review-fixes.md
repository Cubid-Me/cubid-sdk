# 2026-07-01 PR28 Review Fixes

## 2026-07-01T19:00:38Z - PR28 Copilot review fixes

- agent: Codex
- branch: codex/pr28-review-fixes
- head: e72a4414
- summary: Addressed the three PR #28 review comments by broadening Paytag hosted URL dapp API-key query rejection to any normalized key containing `apikey`, adding the Paytag surface guardrail to CI, and replacing auth-specific reusable OpenAPI error examples with generic request-failure examples. Regenerated the Postman collection after the OpenAPI source change.
- validation: `corepack pnpm api:postman`; `corepack pnpm api:validate`; `corepack pnpm paytag:check`; `corepack pnpm exec vitest run --config vitest.config.ts packages/browser/src/client.test.ts`; `corepack pnpm --filter @cubid/browser build`.
- follow-ups: Open an expedited PR into `dev`, then reply to PR #28 review threads after the fixes land back on `dev`.
