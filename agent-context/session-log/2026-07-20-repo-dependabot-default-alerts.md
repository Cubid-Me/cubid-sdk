# 2026-07-20 Dependabot Default-Branch Alert Review

## 2026-07-20T20:31:22Z

- Agent: Codex
- Branch: `codex/dependabot-default-alerts`
- Head: `f4da8984`
- Summary: Revisited the default-branch Dependabot alerts GitHub has been surfacing and traced the local audit findings to the OpenAPI-to-Postman documentation toolchain. Updated `openapi-to-postmanv2` and tightened pnpm overrides so vulnerable transitive `js-yaml`, `yaml`, `lodash`, and `uuid` versions resolve to patched releases.
- Validation:
  - `pnpm install --frozen-lockfile`
  - `pnpm audit --json`
  - `pnpm api:postman`
  - `pnpm api:validate`
  - `pnpm docs:api:check`
  - `pnpm lint`
  - `pnpm build`
  - `git diff --check`
- Follow-ups: GitHub's Dependabot alerts API returned 404 for this token, so alert identification used `pnpm audit` and lockfile dependency paths. Re-check GitHub Dependabot UI after merge to the default branch, because the UI alerts may not close until default-branch dependency graph refreshes.
