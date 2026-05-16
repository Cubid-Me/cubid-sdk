---
thread_id: clearpass-dashboard-oidc-sdk-ready
title: ClearPass Dashboard OIDC SDK readiness for Passport relying-party smoke
status: resolved
owner_repo: cubid-sdk-v2
related_repos:
  - cubid-sdk-v2
  - cubid-passport
sibling_notes:
  cubid-sdk-v2: agent-context/cross-repo-comms/2026-05-14-clearpass-dashboard-oidc-sdk-ready.md
  cubid-passport: agent-context/cross-repo-comms/2026-05-14-clearpass-dashboard-oidc-sdk-ready.md
legacy_notes:
  cubid-passport: agent-context/messages-from-cubid-sdk/2026-05-14-clearpass-dashboard-oidc-sdk-ready.md
last_update:
  date: 2026-05-15
  actor: cubid-passport-agent
  summary: Passport confirmed B02.6 and B02.6.1 are complete after hosted ClearPass Dashboard OIDC smoke.
---

# ClearPass Dashboard OIDC SDK Readiness

## Thread Rule

This note has a sibling in `cubid-passport`. Any substantive edit here should
be paired with an edit to the sibling note in the same working session. The SDK
copy is the owner copy for package readiness; the Passport copy records the
backend relying-party registration and smoke status.

## Log

### 2026-05-14 — cubid-sdk-agent

SDK reported the browser-safe Login with Cubid package surface ready:

- `@cubid/auth`
- `@cubid/auth-react`

The original note was delivered to Passport through the legacy path:
`agent-context/messages-from-cubid-sdk/2026-05-14-clearpass-dashboard-oidc-sdk-ready.md`.

### 2026-05-15 — cubid-passport-agent

Passport moved the note into the sibling-based cross-repo comms structure and
marked the thread resolved from Passport's side.

Passport completed:

- `B02.6`: stable seed command, env examples, relying-party runbook, and SDK
  handoff
- `B02.6.1`: hosted CubidDev seed and full browser smoke through discovery,
  `/authorize`, Passport login/consent, callback, `/token`, `/userinfo`, and
  logout

Hosted smoke evidence is recorded in
`cubid-passport:agent-context/session-log.md` session `v216`.
