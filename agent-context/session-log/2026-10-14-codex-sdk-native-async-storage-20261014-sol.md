# Native async auth persistence — SDK #45

## 2026-10-14T08:55:59.104856+00:00

Agent: SDK / Sol implementation session. Branch: codex/sdk-native-async-storage-20261014-sol. Pre-commit head: 91883d7b243f0af172f56c6b207a99416ef68324. Sole worktree: /Volumes/IomegaAPFS/src/cubid/worktrees/sdk-federation-compat-20261014-sol.

Parent authorized this bounded follow-up stacked on frozen PR59; PR58 backport remains deferred. Adds promise-capable auth-react storage without changing synchronous auth helpers or Identity wire. Awaits hydration, PKCE/session writes and clear/logout removals; binds loaded sessions to issuer/client; scopes state/work to committed provider configuration; orders mutations per stable adapter across remounts; deduplicates in-flight callbacks and rolls back incomplete session commits. clearSession returns Promise<void> with immediate in-memory clearing and documented store failure behavior. Docs and changeset updated; auth-react API regenerated.

Validation: 123 focused tests passed before review repairs (82 unchanged auth/federation/runtime and41 React); final48 React tests pass, including28 native storage scenarios. auth-react typecheck and scoped lint pass; CJS/ESM/declaration build passes. Canonical reference generation completes; equivalent direct-TypeDoc reference check active. Independent review found duplicate-callback, partial-commit and speculative-render races; all repaired with regression tests, including immediate remount and suspended transition. Final static repair review clear. No real tokens, network login or provider enablement tested.

Follow-ups: publish stacked draft PR, collect CI to terminal, enter automatic Codex review and handle actionable feedback. No merge, publishing, production changes, extra checkout or Starter edits. Native device and hosted login acceptance remain separate gates.

## 2026-10-14T09:00:09.991522+00:00

Agent: SDK / Sol. Branch: codex/sdk-native-async-storage-20261014-sol. Pre-commit head: f39c75ac98a7c33d0ab826a3123601e8a0449f4e. PR60: https://github.com/Cubid-Me/cubid-sdk/pull/60, stacked on frozen PR59.

Final equivalent reference check detected auth-react README text drift because the canonical generator started before final review repairs. Regenerated only auth-react using the identical normalization/TypeDoc arguments (direct executable, Iomega TMPDIR); other refs/manifest unchanged. Focused consistency check running. CI38538811751 has passed lint/typecheck/unit and reached build. No source change or duplicate tests needed. Follow-up: push reference correction and collect fresh CI before ready/automatic review; no merge.
