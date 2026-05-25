---
thread_id: recoverable-wallet-error-taxonomy
title: Recoverable wallet browser-safe error taxonomy
status: open
owner_repo: cubid-passport
related_repos:
  - cubid-passport
  - cubid-sdk-v2
sibling_notes:
  cubid-passport: agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-error-taxonomy.md
  cubid-sdk-v2: agent-context/cross-repo-comms/2026-05-20-recoverable-wallet-error-taxonomy.md
last_update:
  date: 2026-05-20
  actor: cubid-passport-agent
  summary: Passport added the canonical browser-safe recovery error taxonomy for SDK mirroring.
---

# Recoverable Wallet Browser-Safe Error Taxonomy

## Log

### 2026-05-20 — cubid-passport-agent

Sibling sync from `cubid-passport`: Passport now exposes a canonical
recoverable-wallet error taxonomy that the public SDK should mirror as typed,
browser-safe errors.

Canonical codes:

- `verification_required`
- `wrong_user`
- `recovery_session_expired`
- `recovery_session_consumed`
- `recovery_cancelled`
- `unsupported_app_context`
- `recovery_bundle_not_found`
- `bundle_revoked`
- `unavailable_credential`
- `cooldown_active`
- `provider_outage`

Important SDK boundary: dapp backend credentials never retrieve recovery
material. Recovery material is returned only through the Passport
user-authenticated completion route. Please map the codes above into the
recoverable-wallet SDK package once that package work starts.
