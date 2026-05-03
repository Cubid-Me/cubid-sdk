# Cubid SDK Monorepo

This repo is the canonical public SDK home for Cubid.

Private backend concerns stay in `cubid-passport`: hosted login, Passport UI,
Admin, OIDC issuer runtime, signing keys, provider secrets, passkey
verification, migrations, and service-role access.

Workspace packages:

- `@cubid/core`: runtime-agnostic Cubid foundation client
- `@cubid/browser`: headless browser helpers for OTP, hosted verification, allow-flow, and OAuth stamp sync
- `@cubid/react`: React provider and focused browser-flow components built on `@cubid/browser`
- `@cubid/evm`: first chain-specific wallet helper package built on top of `@cubid/core`
- `@cubid/wagmi`: wagmi-based React integration helpers built on top of `@cubid/evm`
- `@cubid/web2`: compatibility wrapper around `@cubid/browser`
- `@cubid/web2-react`: compatibility wrapper around `@cubid/react`
- `@cubid/web3`: interim wallet-oriented helper package pending further chain-package splits

Target package direction:

- `@cubid/core`: stable runtime-agnostic API foundation
- `@cubid/browser`: the headless browser integration layer, with `@cubid/web2` retained temporarily as a compatibility package
- `@cubid/react`: the React layer, with `@cubid/web2-react` retained temporarily as a compatibility package
- chain-specific packages such as `@cubid/evm`, `@cubid/wagmi`, `@cubid/solana`, `@cubid/cardano`, `@cubid/sui`, and `@cubid/near` as the long-term replacement for the interim `@cubid/web3`
- dedicated auth packages such as `@cubid/auth` and `@cubid/auth-react` when the hosted OIDC surface is ready for public SDK support

## Commands

- `pnpm install`
- `pnpm build`
- `pnpm test`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm deno:check:core`
- `pnpm check:core-package`

## Supabase Edge / Deno

`@cubid/core` is the runtime-agnostic package in this workspace. It is the only
Cubid package intended for direct use inside Deno and Supabase Edge Functions.

`@cubid/core@0.1.0` is now live on JSR. Use that package for a first-class
Deno import:

```ts
import { createCubidApiClient } from "jsr:@cubid/core"
```

If a Deno environment cannot use JSR directly for some reason, it can still
consume the same package through npm specifiers:

```ts
import { createCubidApiClient } from "npm:@cubid/core"
```

Node, Next.js, and other standard JS runtimes should continue to import the npm package directly:

```ts
import { createCubidApiClient } from "@cubid/core"
```

`@cubid/browser`, `@cubid/react`, `@cubid/evm`, and `@cubid/wagmi` remain
higher-level helpers built on top of `@cubid/core`; they are not required for
Supabase Edge usage.
`@cubid/web2` and `@cubid/web2-react` remain available as compatibility package
names during the rename window, and `@cubid/web3` remains the interim umbrella
package while the chain-specific split continues.
