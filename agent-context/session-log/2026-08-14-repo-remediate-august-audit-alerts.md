# 2026-08-14 August Dependency Audit Remediation

## 2026-08-14T12:28:46Z

- Agent: Codex
- Branch: `codex/remediate-august-audit-alerts`
- Head: `589c0bd2`
- Summary: Remediated the fresh August dependency audit findings by updating pnpm override policy for vulnerable transitive docs/tooling dependencies: `brace-expansion`, `fast-uri`, `js-yaml`, `linkify-it`, `nanoid`, and `postcss`.
- Validation:
  - `pnpm install`
  - `pnpm audit --json`
  - `pnpm why brace-expansion fast-uri js-yaml linkify-it nanoid postcss`
  - `pnpm install --frozen-lockfile`
  - `pnpm api:postman`
  - `pnpm api:validate`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
  - `pnpm lint`
  - `pnpm build`
- Follow-ups: Open a PR to `dev`, merge after CI/review, then promote `dev` to `main` so the default branch receives the audit remediation.
