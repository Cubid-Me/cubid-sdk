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
