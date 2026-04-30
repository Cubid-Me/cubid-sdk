# Cubid SDK Monorepo

This repo is the canonical public SDK home for Cubid.

Private backend concerns stay in `cubid-passport`: hosted login, Passport UI,
Admin, OIDC issuer runtime, signing keys, provider secrets, passkey
verification, migrations, and service-role access.

Workspace packages:

- `@cubid/core`: runtime-agnostic Cubid foundation client
- `@cubid/web2`: headless browser helpers for OTP, allow-flow, and OAuth stamp sync
- `@cubid/web2-react`: React provider and focused web2 flow components
- `@cubid/web3`: wallet-oriented helpers built on top of `@cubid/core`

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

Use the published package through JSR when you want a first-class Deno import:

```ts
import { createCubidApiClient } from "jsr:@cubid/core"
```

If your Deno environment prefers npm specifiers, the same package can be consumed through npm:

```ts
import { createCubidApiClient } from "npm:@cubid/core"
```

Node, Next.js, and other standard JS runtimes should continue to import the npm package directly:

```ts
import { createCubidApiClient } from "@cubid/core"
```

`@cubid/web2`, `@cubid/web2-react`, and `@cubid/web3` remain higher-level
helpers built on top of `@cubid/core`; they are not required for Supabase Edge
usage.
