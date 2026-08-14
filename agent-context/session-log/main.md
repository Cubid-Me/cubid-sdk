# Session Log - main

## 2026-05-25T16:49:36.722Z - Branch-scoped session-log migration

- agent: Codex
- branch: main
- head: 08313a4a
- summary: Migrated this repo to branch-scoped session logs, archived the legacy monolithic log when present, documented the new workflow, and added PR version-bump automation.
- validation: Generated migration artifacts were inspected by script; run `node .github/scripts/pr-version-bump.mjs --base dev --dry-run` and `node .github/scripts/pr-version-bump.mjs --base main --dry-run` after migration.
- follow-ups: Future agents should append new entries to this branch log before each commit and keep completed work out of archived legacy logs.

## 2026-08-14T13:11:05Z - Changesets release prep

- agent: Codex
- branch: main
- head: 58609ac9
- summary: Applied pending Changesets release versions after the dev-to-main promotion, aligning `@cubid/core` to `0.3.0`, `@cubid/auth` to `0.2.0`, dependency-linked public packages to patch releases, generated API reference manifest versions, and `packages/core/jsr.json`.
- validation: `pnpm audit --json`; `pnpm install --frozen-lockfile`; `pnpm api:postman`; `pnpm api:validate`; `pnpm lint`; `pnpm typecheck`; `pnpm test:unit`; `pnpm build`; `pnpm test:acceptance`; `pnpm docs:api:check`; `pnpm check:core-package`; `git diff --check`.
- follow-ups: Commit and push the release version bump to `main`, then publish active public packages through the trusted-publishing workflow with JSR enabled only for `@cubid/core`.
