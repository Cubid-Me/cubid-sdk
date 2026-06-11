# Prevent Direct Dev Work Session Log

## 2026-06-11T20:25:37.534Z - Require feature branches for dev integration

- agent: Codex
- branch: codex/prevent-direct-dev-work
- head: 88f371bf
- summary: Updated AGENTS guidance so ordinary SDK implementation work happens on feature branches and is PR'd into `dev`, reserving direct `dev` commits or pushes for explicitly authorized shared-branch exceptions.
- validation: `git diff --check`
- follow-ups: Open this branch as a PR into `dev` so the guardrail change itself uses the intended review path.
