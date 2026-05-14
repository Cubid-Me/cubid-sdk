import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidSolanaStampType = "solana";

export interface CubidSolanaCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidSolanaCapabilities {
  gasSponsorship?: CubidSolanaCapabilityDescriptor;
  paymaster?: CubidSolanaCapabilityDescriptor;
  sessionKeys?: CubidSolanaCapabilityDescriptor;
  smartAccount?: CubidSolanaCapabilityDescriptor;
  [capabilityName: string]: CubidSolanaCapabilityDescriptor | undefined;
}

export interface CubidSolanaConnection {
  publicKey: string;
  address?: string;
  capabilities?: CubidSolanaCapabilities;
  chainType?: string;
  cluster?: string;
  [key: string]: unknown;
}

export interface CubidSolanaVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidSolanaAdapter<
  TConnection extends CubidSolanaConnection = CubidSolanaConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidSolanaVerification
  ): Record<string, unknown>;
  verify?(connection: TConnection): Promise<CubidSolanaVerification> | CubidSolanaVerification;
}

export interface CubidSolanaClientOptions {
  defaultStampType?: CubidSolanaStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidSolanaConnection = CubidSolanaConnection
> {
  adapter: CubidSolanaAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidSolanaConnection = CubidSolanaConnection
> {
  adapter: CubidSolanaAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidSolanaStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidSolanaConnection = CubidSolanaConnection
> {
  capabilities: CubidSolanaCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidSolanaStampType;
  verification: CubidSolanaVerification;
}

export interface CubidSolanaClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidSolanaConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidSolanaConnection>(
    adapter: CubidSolanaAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidSolanaConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
