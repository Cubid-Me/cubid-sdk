# SDK Starter device readiness

## 2026-10-17T01:26:46.084002+00:00 - Prepare selected web client acceptance

- agent: Codex SDK stream
- branch: codex/sdk-starter-device-readiness-20261017-sol
- head: 861d423bed5ff6fe872f03f76b94727419d7e9c0
- summary: Inspect migrated canonical Starter and current GitHub history/issues; preserve all unique dirty Starter work. Add SDK-owned explicit-target discovery/PKCE/passkey/cookie preflight, synthetic regression tests and physical-browser acceptance runbook. Record existing web-only architecture, SDK source-pin divergence, historical production evidence and isolated-dev/operator gates. Link from existing scope/status docs.
- validation: 22 focused acceptance tests passed against the SDK authorization builder; initial focused ESLint passed. Final lint/typecheck and read-only Starter tests with an external SDK-source alias are still loading from Iomega; no green claim for those pending processes. Diff whitespace check passed. No hosted request, install, build, registration, deployment, credentials or Starter source edit.
- follow-ups: Parent to identify approved isolated HTTPS app/issuer/client/exact callback and reviewed source pins; operator to supply fixture/device and perform ceremonies. SDK47 native acceptance and Identity optional consent/Google gates remain separate. Retain worktree, caches and all branches.
