# 2026-05-28 Passkey First SIWC SDK

## 2026-05-28T06:10:13Z

- Agent: Codex
- Branch: codex/passkey-first-siwc-sdk
- Head: 670a8a20
- Summary:
  - Added first-class `acr_values` and `requirePasskey` support to `@cubid/auth`.
  - Made `@cubid/auth-react` request Cubid passkey assurance by default for Sign in with Cubid launches, with an explicit compatibility opt-out.
  - Updated auth package docs and tests so consuming apps can see that SIWC should request `urn:cubid:acr:passkey`.
- Validation:
  - `pnpm exec vitest run packages/auth/src/index.test.ts packages/auth-react/src/index.test.tsx` partially passed: `packages/auth/src/index.test.ts` passed, while `packages/auth-react/src/index.test.tsx` failed with the existing duplicate-React invalid-hook-call error in this checkout.
  - `pnpm --filter @cubid/auth typecheck && pnpm --filter @cubid/auth-react typecheck`
  - `pnpm --filter @cubid/auth build && pnpm --filter @cubid/auth-react build`
- Follow-ups:
  - Continue wiring the consuming app repos to the SDK auth contract and run app-level SIWC smoke tests.

## 2026-05-28T06:24:28Z

- Agent: Codex
- Branch: `codex/passkey-first-siwc-sdk`
- Head: `355aae4a`
- Summary:
  - Fixed PR validation lint by applying Node globals to `.mjs` scripts in ESLint config.
  - Left the passkey-first SIWC SDK API unchanged.
- Validation:
  - `pnpm lint` passed.
- Follow-ups:
  - Re-check GitHub PR validation after pushing this CI hygiene fix.

## 2026-05-28T06:34:42Z

- Agent: Codex
- Branch: `codex/passkey-first-siwc-sdk`
- Head: `bfc255a2`
- Summary:
  - Regenerated API reference artifacts for the passkey-first SIWC auth contract.
  - Updated generated `@cubid/auth` and `@cubid/auth-react` docs after CI reported stale API reference output.
- Validation:
  - `pnpm docs:api:build`
  - `pnpm docs:api:check` passed.
  - `pnpm lint` passed.
- Follow-ups:
  - Push the docs refresh so PR validation can rerun.

## 2026-05-28T06:39:14Z

- Agent: Codex
- Branch: `codex/passkey-first-siwc-sdk`
- Head: `cfe2db6b`
- Summary:
  - Corrected the low-level auth README/API example to use the Cubid issuer `/authorize` endpoint shape.
  - Regenerated generated API reference output after the example correction.
- Validation:
  - `pnpm docs:api:build`
  - `pnpm docs:api:check` passed.
  - `pnpm lint` passed.
- Follow-ups:
  - Push the documentation correction so PR validation reruns against the actual issuer endpoint example.
