import type { CubidEvmAdapter } from "@cubid/evm";

import type {
  CubidWagmiAdapterOptions,
  CubidWagmiConnectResult,
  CubidWagmiConnection,
  CubidWagmiConnectorLike,
  CubidWagmiVerification
} from "./types";

function resolveConnector(
  connectors: readonly CubidWagmiConnectorLike[] | undefined,
  connectorId: string | undefined
): CubidWagmiConnectorLike {
  if (!connectors?.length) {
    throw new Error("No wagmi connectors are available. Configure WagmiProvider with at least one connector.");
  }

  if (!connectorId) {
    return connectors[0]!;
  }

  const connector = connectors.find((candidate) => candidate.id === connectorId);
  if (!connector) {
    throw new Error(`No wagmi connector matched connectorId "${connectorId}".`);
  }

  return connector;
}

export function buildDefaultWagmiConnection(result: CubidWagmiConnectResult): CubidWagmiConnection {
  const address = result.accounts?.[0];
  if (!address) {
    throw new Error("wagmi connect did not return an account address.");
  }

  return {
    address,
    chainId: result.chainId,
    chainType: "evm",
    connectorId: result.connector?.id,
    connectorName: result.connector?.name
  };
}

function buildDefaultMessage(connection: CubidWagmiConnection): string {
  return `Verify wallet ownership for Cubid: ${connection.address}`;
}

function buildDefaultStampData(
  connection: CubidWagmiConnection,
  verification: CubidWagmiVerification
): Record<string, unknown> {
  return {
    address: connection.address,
    chainId: connection.chainId,
    chainType: connection.chainType,
    connectorId: connection.connectorId,
    connectorName: connection.connectorName,
    identity: connection.address,
    uniquevalue: connection.address,
    verification: verification.metadata,
    walletType: "evm"
  };
}

export function createCubidWagmiAdapter<
  TConnection extends CubidWagmiConnection = CubidWagmiConnection
>(options: CubidWagmiAdapterOptions<TConnection>): CubidEvmAdapter<TConnection> {
  return {
    id: options.adapterId ?? "wagmi",
    connect: async () => {
      const connector = resolveConnector(options.connectors, options.connectorId);
      const result = await options.connectAsync({ chainId: options.chainId, connector });
      return options.toConnection?.(result) ?? (buildDefaultWagmiConnection(result) as TConnection);
    },
    disconnect: async () => {
      await options.disconnectAsync?.();
    },
    toStampData: (connection, verification) =>
      options.toStampData?.(connection, verification as CubidWagmiVerification) ??
      buildDefaultStampData(connection, verification as CubidWagmiVerification),
    verify: async (connection) => {
      const message = options.getMessage?.(connection) ?? buildDefaultMessage(connection);
      const signature = await options.signMessageAsync({ message });

      return {
        isVerified: true,
        metadata: {
          connectorId: connection.connectorId,
          connectorName: connection.connectorName,
          message,
          signature
        }
      };
    }
  };
}
