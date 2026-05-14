# Message From `cubid-passport`: SIWC07 Smart-Account Roadmap

Date: 2026-05-06
Source repo: `Cubid-Me/cubid-passport`
Source branch: `codex/siwc-roadmap-cleanup`

## Summary

`cubid-passport` completed the SIWC07 roadmap evaluation for smart accounts,
scoped session keys, and paymaster/gas sponsorship. This is a design-only
decision pass. No API routes, webhook events, migrations, or runtime response
shapes changed.

## SDK Impact

Future public SDK work should not assume every Cubid account is a smart
account, has a paymaster, or supports session keys. The current default remains
app-scoped generated custody accounts with Passport-hosted approval. If smart
accounts, session keys, or paymasters are added later, SDK APIs should be
capability-driven.

## Locked Direction

- App-scoped generated custody accounts remain the default near-term account
  mode.
- Smart accounts are a future optional EVM-first custody mode, gated by Admin
  policy and explicit capability fields.
- Session keys are future scoped, revocable child capabilities of an app-scoped
  account, not cross-app portable credentials.
- Paymasters are a future app policy and billing product, blocked until
  transaction signing, risk evidence, budgets, monitoring, and abuse controls
  are production-ready.

## Follow-Up For SDK Agents

When this becomes SDK implementation work, prefer capability discovery and
feature flags over hardcoded assumptions. Do not expose SDK helpers that imply
transaction signing, session keys, smart accounts, or gas sponsorship are
universally available.
