import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidWeb3StampType = "evm" | "near" | "near-wallet" | "solana";

export interface CubidWalletConnection {
  address: string;
  chainId?: number | string;
  chainType?: string;
  [key: string]: unknown;
}

export interface CubidWalletVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidWeb3Adapter<TConnection extends CubidWalletConnection = CubidWalletConnection> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(connection: TConnection, verification: CubidWalletVerification): Record<string, unknown>;
  verify?(connection: TConnection): Promise<CubidWalletVerification> | CubidWalletVerification;
}

export interface CubidWeb3ClientOptions {
  defaultStampType?: CubidWeb3StampType;
}

export interface ConnectWalletRequest<TConnection extends CubidWalletConnection = CubidWalletConnection> {
  adapter: CubidWeb3Adapter<TConnection>;
}

export interface VerifyWalletRequest<TConnection extends CubidWalletConnection = CubidWalletConnection> {
  adapter: CubidWeb3Adapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidWeb3StampType;
  userId?: string;
}

export interface VerifyWalletResult<TConnection extends CubidWalletConnection = CubidWalletConnection> {
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidWeb3StampType;
  verification: CubidWalletVerification;
}

export interface CubidWeb3Client {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidWalletConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidWalletConnection>(
    adapter: CubidWeb3Adapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidWalletConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
