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

## 2026-05-29T08:54:44Z

- Agent: Codex
- Branch: `codex/passkey-first-siwc-sdk`
- Head: `e5def98c`
- Summary:
  - Added a generic passkey-first SIWC integration guide for SmarTrust, i-am-human, ChainCrew, and starter/demo apps.
  - Clarified that consuming apps start OIDC, handle callback/session state, and must not implement Cubid passkeys or recovery locally.
  - Linked the guide from the root README and the `@cubid/auth` / `@cubid/auth-react` package READMEs.
- Validation:
  - `git diff --check`
  - `pnpm docs:api:build`
  - `pnpm docs:api:check`
- Follow-ups:
  - Use the guide while wiring and validating each consuming app's returning-user and lost-passkey SIWC flows.

## 2026-05-29T11:23:20Z

- Agent: Codex
- Branch: `codex/passkey-first-siwc-sdk`
- Head: `5a5dbed9`
- Summary:
  - Rebuilt the SDK PR branch on current `origin/dev`, which already contains the passkey-assurance SDK implementation and endpoint-example correction.
  - Replayed only the passkey-first SIWC integration guide commit so the PR diff is now focused on the consuming-app setup notes and generated API-reference links.
  - Preserved the old local branch as `codex/passkey-first-siwc-sdk-preclean` for archive context.
- Validation:
  - `pnpm docs:api:check` passed.
  - `pnpm lint` passed.
  - `pnpm --filter @cubid/auth typecheck && pnpm --filter @cubid/auth-react typecheck` passed.
  - `pnpm --filter @cubid/auth build && pnpm --filter @cubid/auth-react build` passed.
  - `pnpm exec vitest run packages/auth/src/index.test.ts packages/auth-react/src/index.test.tsx` partially passed: `packages/auth/src/index.test.ts` passed, while `packages/auth-react/src/index.test.tsx` still fails in this checkout with the existing duplicate-React invalid-hook-call issue.
  - `git diff --check` passed.
- Follow-ups:
  - Force-push the cleaned branch over the existing PR branch and let PR state refresh.
  - Keep the passkey-first SIWC guide aligned with Login-hosted recovery behaviour as consuming-app smoke evidence evolves.
