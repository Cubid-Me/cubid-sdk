import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidEvmStampType = "evm";

export interface CubidEvmConnection {
  address: string;
  chainId?: number | string;
  chainType?: string;
  [key: string]: unknown;
}

export interface CubidEvmVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidEvmAdapter<TConnection extends CubidEvmConnection = CubidEvmConnection> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(connection: TConnection, verification: CubidEvmVerification): Record<string, unknown>;
  verify?(connection: TConnection): Promise<CubidEvmVerification> | CubidEvmVerification;
}

export interface CubidEvmClientOptions {
  defaultStampType?: CubidEvmStampType;
}

export interface ConnectWalletRequest<TConnection extends CubidEvmConnection = CubidEvmConnection> {
  adapter: CubidEvmAdapter<TConnection>;
}

export interface VerifyWalletRequest<TConnection extends CubidEvmConnection = CubidEvmConnection> {
  adapter: CubidEvmAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidEvmStampType;
  userId?: string;
}

export interface VerifyWalletResult<TConnection extends CubidEvmConnection = CubidEvmConnection> {
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidEvmStampType;
  verification: CubidEvmVerification;
}

export interface CubidEvmClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidEvmConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidEvmConnection>(
    adapter: CubidEvmAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidEvmConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
