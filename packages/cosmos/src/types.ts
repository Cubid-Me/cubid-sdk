import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidCosmosStampType = "cosmos";

export interface CubidCosmosCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidCosmosCapabilities {
  gasSponsorship?: CubidCosmosCapabilityDescriptor;
  paymaster?: CubidCosmosCapabilityDescriptor;
  sessionKeys?: CubidCosmosCapabilityDescriptor;
  smartAccount?: CubidCosmosCapabilityDescriptor;
  [capabilityName: string]: CubidCosmosCapabilityDescriptor | undefined;
}

export interface CubidCosmosConnection {
  address: string;
  bech32Prefix?: string;
  capabilities?: CubidCosmosCapabilities;
  chainId?: string;
  chainType?: string;
  publicKey?: string;
  [key: string]: unknown;
}

export interface CubidCosmosVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidCosmosAdapter<
  TConnection extends CubidCosmosConnection = CubidCosmosConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidCosmosVerification
  ): Record<string, unknown>;
  verify?(
    connection: TConnection
  ): Promise<CubidCosmosVerification> | CubidCosmosVerification;
}

export interface CubidCosmosClientOptions {
  defaultStampType?: CubidCosmosStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidCosmosConnection = CubidCosmosConnection
> {
  adapter: CubidCosmosAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidCosmosConnection = CubidCosmosConnection
> {
  adapter: CubidCosmosAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidCosmosStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidCosmosConnection = CubidCosmosConnection
> {
  capabilities: CubidCosmosCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidCosmosStampType;
  verification: CubidCosmosVerification;
}

export interface CubidCosmosClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidCosmosConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidCosmosConnection>(
    adapter: CubidCosmosAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidCosmosConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
