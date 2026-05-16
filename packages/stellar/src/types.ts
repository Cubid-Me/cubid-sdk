import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidStellarStampType = "stellar";

export interface CubidStellarCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidStellarCapabilities {
  gasSponsorship?: CubidStellarCapabilityDescriptor;
  paymaster?: CubidStellarCapabilityDescriptor;
  sessionKeys?: CubidStellarCapabilityDescriptor;
  smartAccount?: CubidStellarCapabilityDescriptor;
  [capabilityName: string]: CubidStellarCapabilityDescriptor | undefined;
}

export interface CubidStellarConnection {
  address: string;
  capabilities?: CubidStellarCapabilities;
  chainType?: string;
  federationAddress?: string;
  networkPassphrase?: string;
  publicKey?: string;
  [key: string]: unknown;
}

export interface CubidStellarVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidStellarAdapter<
  TConnection extends CubidStellarConnection = CubidStellarConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidStellarVerification
  ): Record<string, unknown>;
  verify?(
    connection: TConnection
  ): Promise<CubidStellarVerification> | CubidStellarVerification;
}

export interface CubidStellarClientOptions {
  defaultStampType?: CubidStellarStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidStellarConnection = CubidStellarConnection
> {
  adapter: CubidStellarAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidStellarConnection = CubidStellarConnection
> {
  adapter: CubidStellarAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidStellarStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidStellarConnection = CubidStellarConnection
> {
  capabilities: CubidStellarCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidStellarStampType;
  verification: CubidStellarVerification;
}

export interface CubidStellarClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidStellarConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidStellarConnection>(
    adapter: CubidStellarAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidStellarConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
