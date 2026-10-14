# Cross-Repo Agent Comms Archive

This folder preserves historical notes spanning Cubid SDK, Cubid Passport,
SmarTrust, and related repos. It is no longer a live mailbox. Current coordination
uses linked GitHub Issues/PRs and the owner-level Cubid Project as described in
[AGENTS.md](../../AGENTS.md#cross-repo-coordination). Do not create new live sibling
files or leave another checkout dirty as a notification mechanism; the runtime
monorepo explicitly prohibits that legacy protocol. Preserve the existing notes.

## Historical Protocol (Reference Only)

The following rules and examples document the archived format, not instructions
for new work.

- Use one thematic Markdown file per conversation thread.
- Every live note must have a sibling file in each corresponding repo named
  with the same date and slug.
- Each sibling must share the same `thread_id` in frontmatter.
- Frontmatter must name the related repos, sibling paths, owner repo, status,
  and last update.
- When one agent adds substantive prose to a note, that same change set must
  also edit each sibling. The sibling edit may be a short sync/reference entry
  instead of duplicating all prose.
- Do not delete or rewrite old messages. Add new dated entries under `## Log`.
- Keep old `agent-context/inbox/` or `messages-from-*` folders as legacy
  archives unless a user explicitly asks to remove them.

## Frontmatter Shape

```yaml
---
thread_id: stable-kebab-case-id
title: Human-readable thread title
status: open | waiting | resolved | archived
owner_repo: cubid-sdk-v2
related_repos:
  - cubid-sdk-v2
  - cubid-passport
sibling_notes:
  cubid-sdk-v2: agent-context/cross-repo-comms/YYYY-MM-DD-slug.md
  cubid-passport: agent-context/cross-repo-comms/YYYY-MM-DD-slug.md
last_update:
  date: YYYY-MM-DD
  actor: cubid-sdk-agent
  summary: Short summary of the latest substantive change.
---
```

## Log Entry Shape

Each update should append a dated section:

```md
## Log

### YYYY-MM-DD — repo-or-agent-name

Full prose in the owner repo, or a sibling sync note that points to the owner
entry and summarizes what changed.
```

## Archived Threads

- [`2026-05-13-dashboard-sign-in-with-cubid-blocker.md`](./2026-05-13-dashboard-sign-in-with-cubid-blocker.md):
  ClearPass dashboard browser-safe Sign in with Cubid blocker for a Vite/React
  developer auth gate.
- [`2026-05-14-sdk-wallet-release-handoff.md`](./2026-05-14-sdk-wallet-release-handoff.md):
  Passport-to-SDK wallet helper and release handoff for SIWC account/signing
  APIs.
- [`2026-05-14-clearpass-dashboard-oidc-sdk-ready.md`](./2026-05-14-clearpass-dashboard-oidc-sdk-ready.md):
  SDK-to-Passport readiness note for ClearPass Dashboard Login with Cubid.
