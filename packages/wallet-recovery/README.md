# @cubid/wallet-recovery

Browser-safe helpers for Cubid Passport recoverable wallet flows.

Use this package when a host app creates and signs with its own wallet or
specialist signing provider, but uses Cubid as the user-authorized recovery
provider. This package does not create wallets, sign transactions, broadcast
transactions, or accept Cubid dapp API keys.

```sh
pnpm add @cubid/wallet-recovery
```

```ts
import { createCubidWalletRecoveryClient } from "@cubid/wallet-recovery"

const recovery = createCubidWalletRecoveryClient({
  baseUrl: "https://passport.cubid.me",
  getAccessToken: () => firebaseUser.getIdToken(),
})

const recoveryUrl = recovery.buildHostedRecoveryUrl({
  recoverySessionId: "rw_release_123",
})

const released = await recovery.completeRelease({
  recoverySessionId: "rw_release_123",
})
```

`bundleMaterial` is returned only from `completeRelease(...)`, which calls the
Passport user-authenticated recovery completion route. Backend dapp credentials
must use `@cubid/core` for metadata-only enroll/status/release-start/rotate and
revoke helpers.
