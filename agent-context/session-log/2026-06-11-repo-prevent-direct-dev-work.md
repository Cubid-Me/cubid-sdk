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
