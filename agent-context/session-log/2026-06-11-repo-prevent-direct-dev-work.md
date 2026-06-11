# Prevent Direct Dev Work Session Log

## 2026-06-11T20:25:37.534Z - Require feature branches for dev integration

- agent: Codex
- branch: codex/prevent-direct-dev-work
- head: 88f371bf
- summary: Updated AGENTS guidance so ordinary SDK implementation work happens on feature branches and is PR'd into `dev`, reserving direct `dev` commits or pushes for explicitly authorized shared-branch exceptions.
- validation: `git diff --check`
- follow-ups: Open this branch as a PR into `dev` so the guardrail change itself uses the intended review path.

## 2026-06-11T20:32:58.623Z - Extend shared-branch guardrail to main

- agent: Codex
- branch: codex/prevent-direct-dev-work
- head: 0ab17cc1
- summary: Expanded AGENTS guidance so direct implementation or commits are discouraged on both `dev` and `main`, with PRs expected for feature integration and release promotion unless the user explicitly authorizes a shared-branch exception.
- validation: `git diff --check`
- follow-ups: Cherry-pick the branch-scoped session-log migration commit onto this feature branch, then reset local `main` to `origin/main` after the commit is preserved here.

## 2026-06-11T21:00:46.557Z - Dependabot alert dependency updates

- agent: Codex
- branch: codex/prevent-direct-dev-work
- head: d426a630
- summary: Investigated GitHub Dependabot alerts and updated the dev/test dependency graph so Vitest resolves to `3.2.6`, PostCSS resolves to `8.5.15`, and transitive `ws` and `brace-expansion` vulnerabilities are forced to patched versions through pnpm overrides.
- validation: `pnpm audit --audit-level moderate`; `pnpm lint`; `pnpm test:auth-react`; `pnpm test:unit`; `pnpm test:acceptance`; `git diff --check`
- follow-ups: None.
