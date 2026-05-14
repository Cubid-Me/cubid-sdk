# Cubid SDK Monorepo

This repo is the canonical public SDK home for Cubid.

Private backend concerns stay in `cubid-passport`: hosted login, Passport UI,
Admin, OIDC issuer runtime, signing keys, provider secrets, passkey
verification, migrations, and service-role access.

## Package Matrix

| Package | Purpose | Registry availability |
| --- | --- | --- |
| `@cubid/core` | Runtime-agnostic Cubid foundation client for servers, workers, Deno, and Supabase Edge Functions. | npm + JSR |
| `@cubid/auth` | Runtime-agnostic OIDC and PKCE helpers for browser-safe Sign in with Cubid. | npm-only |
| `@cubid/browser` | Headless browser helpers for hosted verification, OTP, Allow Page, and provider handoff flows. | npm-only |
| `@cubid/react` | React components and hooks built on `@cubid/browser`. | npm-only |
| `@cubid/evm` | EVM-specific wallet and custody helpers built on `@cubid/core`. | npm-only |
| `@cubid/wagmi` | wagmi-specific React integration helpers built on `@cubid/evm`. | npm-only |
| `@cubid/web3` | Interim wallet-oriented package while the chain-specific split continues. | npm-only |
| `@cubid/web2` | Frozen compatibility wrapper around `@cubid/browser`. | npm-only, deprecated |
| `@cubid/web2-react` | Frozen compatibility wrapper around `@cubid/react`. | npm-only, deprecated |
| `@cubid/acceptance` | Private local consumer-style acceptance harness. | Private, never published |

`@cubid/core` is the only JSR package today because it is the only package with
an explicit runtime-agnostic Deno and Supabase Edge contract. The auth,
browser, React, wagmi, and interim compatibility packages remain npm-only by
design.

`@cubid/web2` and `@cubid/web2-react` remain installable for older imports, but
they are compatibility names only. New integrations should use
`@cubid/browser` and `@cubid/react`.

## API Reference

Machine-readable package reference artifacts live in `docs/reference/`.

- Human index: `docs/reference/README.md`
- JSON manifest: `docs/reference/api/manifest.json`
- Package JSON references:
  - `docs/reference/api/core.json`
  - `docs/reference/api/auth.json`
  - `docs/reference/api/browser.json`
  - `docs/reference/api/react.json`
  - `docs/reference/api/evm.json`
  - `docs/reference/api/wagmi.json`
  - `docs/reference/api/web3.json`

## Commands

- `pnpm install`
- `pnpm build`
- `pnpm test`
- `pnpm test:unit`
- `pnpm test:acceptance`
- `pnpm test:coverage`
- `pnpm docs:api:build`
- `pnpm docs:api:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm deno:check:core`
- `pnpm check:core-package`

## Workflow

- `dev` is the main integration branch for ongoing SDK work.
- `main` is the release branch used for trusted npm and JSR publishing.
- Feature work should generally land on a feature branch, merge into `dev`,
  and then move to `main` when it is ready to publish.

Repo-health snapshots live in `agent-context/repo-status.md`.
Deferred ideas that are not part of the active roadmap live in
`agent-context/future-ideas.md`.
The testing baseline and coverage policy live in
`docs/engineering/testing-strategy.md`.

## Supabase Edge / Deno

`@cubid/core` is the runtime-agnostic package in this workspace. It is the only
Cubid package intended for direct use inside Deno and Supabase Edge Functions.

Use that package for first-class Deno imports:

```ts
import { createCubidApiClient } from "jsr:@cubid/core"
```

If a Deno environment cannot use JSR directly for some reason, it can still
consume the same package through npm specifiers:

```ts
import { createCubidApiClient } from "npm:@cubid/core"
```

Node, Next.js, and other standard JS runtimes should continue to import the npm
package directly:

```ts
import { createCubidApiClient } from "@cubid/core"
```

`@cubid/auth`, `@cubid/browser`, `@cubid/react`, `@cubid/evm`,
`@cubid/wagmi`, and `@cubid/web3` remain npm packages; they are not part of
the JSR publication policy.
