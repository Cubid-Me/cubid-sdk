import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidBitcoinStampType = "bitcoin";

export interface CubidBitcoinCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidBitcoinCapabilities {
  gasSponsorship?: CubidBitcoinCapabilityDescriptor;
  paymaster?: CubidBitcoinCapabilityDescriptor;
  sessionKeys?: CubidBitcoinCapabilityDescriptor;
  smartAccount?: CubidBitcoinCapabilityDescriptor;
  [capabilityName: string]: CubidBitcoinCapabilityDescriptor | undefined;
}

export interface CubidBitcoinConnection {
  address: string;
  capabilities?: CubidBitcoinCapabilities;
  chainType?: string;
  networkId?: string;
  publicKey?: string;
  scriptType?: string;
  [key: string]: unknown;
}

export interface CubidBitcoinVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidBitcoinAdapter<
  TConnection extends CubidBitcoinConnection = CubidBitcoinConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidBitcoinVerification
  ): Record<string, unknown>;
  verify?(
    connection: TConnection
  ): Promise<CubidBitcoinVerification> | CubidBitcoinVerification;
}

export interface CubidBitcoinClientOptions {
  defaultStampType?: CubidBitcoinStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidBitcoinConnection = CubidBitcoinConnection
> {
  adapter: CubidBitcoinAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidBitcoinConnection = CubidBitcoinConnection
> {
  adapter: CubidBitcoinAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidBitcoinStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidBitcoinConnection = CubidBitcoinConnection
> {
  capabilities: CubidBitcoinCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidBitcoinStampType;
  verification: CubidBitcoinVerification;
}

export interface CubidBitcoinClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidBitcoinConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidBitcoinConnection>(
    adapter: CubidBitcoinAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidBitcoinConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
