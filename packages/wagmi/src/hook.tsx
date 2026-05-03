import { createCubidWagmiAdapter, buildDefaultWagmiConnection } from "./adapter";
import type {
  CubidWagmiConnectResult,
  CubidWagmiConnection,
  CubidWagmiConnectorLike,
  UseCubidWagmiAdapterOptions,
  UseCubidWagmiAdapterResult
} from "./types";
import { useConnect, useConnectors, useConnection, useDisconnect, useSignMessage } from "wagmi";

function toConnectorLike(connector: { id: string; name?: string } | null | undefined): CubidWagmiConnectorLike | undefined {
  if (!connector) {
    return undefined;
  }

  return {
    id: connector.id,
    name: connector.name
  };
}

function toConnectResult(connection: {
  accounts?: readonly string[];
  chainId?: number;
  connector?: { id: string; name?: string } | null;
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
    connectors: connectors.map((connector) => ({
      id: connector.id,
      name: connector.name
    })),
    disconnectAsync: async () => {
      await disconnectAsync();
    },
    signMessageAsync: async ({ message }) => signMessageAsync({ message })
  });

  const currentConnectionResult = toConnectResult({
    accounts: connectionState.addresses,
    chainId: typeof connectionState.chainId === "number" ? connectionState.chainId : undefined,
    connector: connectionState.connector
      ? { id: connectionState.connector.id, name: connectionState.connector.name }
      : undefined
  });

  const connection = currentConnectionResult.accounts?.[0]
    ? options.toConnection?.(currentConnectionResult) ?? (buildDefaultWagmiConnection(currentConnectionResult) as TConnection)
    : undefined;
  const currentConnector = toConnectorLike(connectionState.connector);

  return {
    adapter,
    address: connection?.address,
    chainId: connection?.chainId,
    connection,
    connectors: connectors.map((connector) => ({
      id: connector.id,
      name: connector.name
    })),
    currentConnector,
    isConnected: Boolean(connection)
  };
}
