# Dev Session Log

## 2026-06-11T19:27:19.000Z - Roadmap intake for Identity boundary and assurance ergonomics

- agent: Codex
- branch: dev
- head: 8ca64752
- summary: Ingested the new Identity protocol boundary cross-repo handoff and added roadmap items for passkey-first auth assurance ergonomics, app-recoverable-wallet hosted smoke gaps, SIWC guide refresh, and Identity issuer documentation alignment.
- validation: `git diff --check`
- follow-ups: Implement S16 before S15.5 so the SIWC guide refresh treats `https://id.cubid.me` as the long-term issuer boundary rather than preserving `https://login.cubid.me` as the default.

## 2026-06-11T19:29:30.000Z - S16 Identity protocol boundary docs

- agent: Codex
- branch: dev
- head: 02d5393a
- summary: Completed S16 by updating public SDK docs, examples, agent guidance, and generated API reference text so `https://id.cubid.me` is the stable SIWC/OIDC issuer boundary, while `https://login.cubid.me` is documented only as a temporary compatibility host.
- validation: `pnpm docs:api:build`; `pnpm docs:api:check`; `git diff --check`
- follow-ups: Implement S15 assurance ergonomics and then refresh the SIWC guide with the now-proven hosted QR handoff and lost-passkey recovery behavior.
