# `@cubid/wagmi`

wagmi-based React helpers that adapt host wallet-provider flows onto
`@cubid/evm`.

## When To Choose This Package

Use `@cubid/wagmi` when your app already uses wagmi and you want Cubid's
React-friendly provider adapters on top of the EVM package. Choose
`@cubid/evm` instead for non-wagmi or framework-neutral EVM flows.

## Install

```sh
npm install @cubid/wagmi @cubid/evm wagmi viem @tanstack/react-query
```

This package expects the host app to already provide its normal wagmi setup,
including `WagmiProvider` and the TanStack Query client.

## Registry Availability

- npm: supported
- JSR: not published by policy

## API Reference

- JSON reference: `../../docs/reference/api/wagmi.json`
- Package matrix: `../../README.md`

## Basic Usage

```tsx
import { createCubidEvmClient } from "@cubid/evm"
import { useCubidWagmiAdapter } from "@cubid/wagmi"

function WalletVerifier({
  apiClient,
}: {
  apiClient: Parameters<typeof createCubidEvmClient>[0]
}) {
  const evmClient = createCubidEvmClient(apiClient)
  const { adapter, isConnected } = useCubidWagmiAdapter()

  return (
    <button disabled={!isConnected} onClick={() => evmClient.connectWallet({ adapter })}>
      Verify
    </button>
  )
}
```

The package also exports `createCubidWagmiAdapter` for apps that want to wire
their own wagmi actions into the Cubid EVM adapter surface without using the
provided hook.

This package does not create wallet keys, perform normal transaction signing,
operate an MPC provider, or broadcast transactions. Host apps and their wagmi
connectors own those responsibilities.
