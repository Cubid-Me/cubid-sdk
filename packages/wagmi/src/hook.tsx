import {
  createCubidWagmiAdapter,
  buildDefaultWagmiConnection
} from "./adapter";
import { getCubidEvmCapabilities } from "@cubid/evm";
import type {
  CubidWagmiConnectResult,
  CubidWagmiConnection,
  CubidWagmiConnectorLike,
  UseCubidWagmiAdapterOptions,
  UseCubidWagmiAdapterResult
} from "./types";
import { useConnect, useConnectors, useConnection, useDisconnect, useSignMessage } from "wagmi";

function toConnectorLike(
  connector:
    | { capabilities?: CubidWagmiConnectorLike["capabilities"]; id: string; name?: string }
    | null
    | undefined
): CubidWagmiConnectorLike | undefined {
  if (!connector) {
    return undefined;
  }

  return {
    capabilities: connector.capabilities,
    id: connector.id,
    name: connector.name
  };
}

function toConnectResult(connection: {
  accounts?: readonly string[];
  chainId?: number;
  connector?: {
    capabilities?: CubidWagmiConnectorLike["capabilities"];
    id: string;
    name?: string;
  } | null;
}): CubidWagmiConnectResult {
  return {
    accounts: connection.accounts ? [...connection.accounts] : undefined,
    chainId: connection.chainId,
    connector: toConnectorLike(connection.connector)
  };
}

export function useCubidWagmiAdapter<
  TConnection extends CubidWagmiConnection = CubidWagmiConnection
>(options: UseCubidWagmiAdapterOptions<TConnection> = {}): UseCubidWagmiAdapterResult<TConnection> {
  const connectionState = useConnection();
  const connectors = useConnectors();
  const { mutateAsync: connectAsync } = useConnect();
  const { mutateAsync: disconnectAsync } = useDisconnect();
  const { mutateAsync: signMessageAsync } = useSignMessage();

  const adapter = createCubidWagmiAdapter<TConnection>({
    ...options,
    connectAsync: async ({ chainId, connector }) => {
      const result = await (connectAsync as (request: {
        chainId?: number;
        connector: unknown;
      }) => Promise<{
        accounts?: readonly string[];
        chainId?: number;
      }>)({
        chainId,
        connector
      });

      return {
        accounts: result.accounts ? [...result.accounts] : undefined,
        chainId: result.chainId,
        connector
      };
    },
    connectors,
    disconnectAsync: async () => {
      await disconnectAsync();
    },
    signMessageAsync: async ({ message }) => signMessageAsync({ message })
  });

  const currentAccounts =
    "addresses" in connectionState &&
    Array.isArray(connectionState.addresses)
      ? connectionState.addresses
      : "accounts" in connectionState && Array.isArray(connectionState.accounts)
        ? connectionState.accounts
        : undefined;

  const currentConnectionResult = toConnectResult({
    accounts: currentAccounts,
    chainId: typeof connectionState.chainId === "number" ? connectionState.chainId : undefined,
    connector: connectionState.connector
      ? connectors.find((candidate) => candidate.id === connectionState.connector?.id) ?? {
          capabilities: "capabilities" in connectionState.connector
            ? (connectionState.connector.capabilities as
                | CubidWagmiConnectorLike["capabilities"]
                | undefined)
            : undefined,
          id: connectionState.connector.id,
          name: connectionState.connector.name
        }
      : undefined
  });

  const connection = currentConnectionResult.accounts?.[0]
    ? options.toConnection?.(currentConnectionResult) ?? (buildDefaultWagmiConnection(currentConnectionResult) as TConnection)
    : undefined;
  const currentConnector = toConnectorLike(connectionState.connector);

  return {
    adapter,
    address: connection?.address,
    capabilities: connection ? getCubidEvmCapabilities(connection) : {},
    chainId: connection?.chainId,
    connection,
    connectors: connectors
      .map((connector) => toConnectorLike(connector))
      .filter((connector): connector is CubidWagmiConnectorLike => Boolean(connector)),
    currentConnector,
    isConnected: Boolean(connection)
  };
}
