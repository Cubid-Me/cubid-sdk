import type { CubidEvmAdapter, CubidEvmConnection, CubidEvmVerification } from "@cubid/evm";

export interface CubidWagmiConnectorLike {
  id: string;
  name?: string;
}

export interface CubidWagmiConnectResult {
  accounts?: readonly string[];
  chainId?: number;
  connector?: CubidWagmiConnectorLike | null;
}

export interface CubidWagmiConnection extends CubidEvmConnection {
  chainType: "evm";
  connectorId?: string;
  connectorName?: string;
}

export interface CubidWagmiVerification extends CubidEvmVerification {
  metadata?: Record<string, unknown> & {
    connectorId?: string;
    connectorName?: string;
    message?: string;
    signature?: string;
  };
}

export interface CubidWagmiAdapterOptions<
  TConnection extends CubidWagmiConnection = CubidWagmiConnection
> {
  adapterId?: string;
  chainId?: number;
  connectorId?: string;
  connectors?: readonly CubidWagmiConnectorLike[];
  connectAsync: (request: {
    chainId?: number;
    connector: CubidWagmiConnectorLike;
  }) => Promise<CubidWagmiConnectResult>;
  disconnectAsync?: () => Promise<void> | void;
  getMessage?: (connection: TConnection) => string;
  signMessageAsync: (request: { message: string }) => Promise<string>;
  toConnection?: (result: CubidWagmiConnectResult) => TConnection;
  toStampData?: (connection: TConnection, verification: CubidWagmiVerification) => Record<string, unknown>;
}

export interface UseCubidWagmiAdapterOptions<
  TConnection extends CubidWagmiConnection = CubidWagmiConnection
> extends Omit<
    CubidWagmiAdapterOptions<TConnection>,
    "connectAsync" | "connectors" | "disconnectAsync" | "signMessageAsync"
  > {}

export interface UseCubidWagmiAdapterResult<
  TConnection extends CubidWagmiConnection = CubidWagmiConnection
> {
  adapter: CubidEvmAdapter<TConnection>;
  address?: string;
  chainId?: number | string;
  connection?: TConnection;
  connectors: readonly CubidWagmiConnectorLike[];
  currentConnector?: CubidWagmiConnectorLike;
  isConnected: boolean;
}
