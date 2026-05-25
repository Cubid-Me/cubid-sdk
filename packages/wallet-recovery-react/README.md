# @cubid/wallet-recovery-react

React helpers for Cubid Passport recoverable wallet flows.

Use this package when a React app needs hosted recovery launch or signed-in
release completion. It builds on
`@cubid/wallet-recovery`, accepts an explicit bearer token or async token
provider, and does not depend on `@cubid/auth-react`.

```sh
pnpm add @cubid/wallet-recovery-react
```

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/wallet-recovery-react.json`
- Package matrix: `../../README.md`

```tsx
import {
  CubidRecoveryLaunchButton,
  useCubidRecoveryRelease,
} from "@cubid/wallet-recovery-react"

function Recovery({ recoverySessionId }: { recoverySessionId: string }) {
  const release = useCubidRecoveryRelease({
    baseUrl: "https://passport.cubid.me",
    getAccessToken: () => firebaseUser.getIdToken(),
    recoverySessionId,
  })

  return (
    <>
      <CubidRecoveryLaunchButton recoverySessionId={recoverySessionId} />
      <button onClick={() => void release.completeRelease()}>
        Complete recovery
      </button>
    </>
  )
}
```

`bundleMaterial` is only returned by the signed-in completion hook. Backend
dapp credentials should use metadata-only helpers from `@cubid/core`.

This React package intentionally does not expose a recovery-bundle list hook.
Public app code must not receive recovery bundles or dapp-user ids that belong
to other dapps. Apps should use their own app-scoped recovery metadata and
launch Passport recovery for an exact `recoveryBundleId`.
