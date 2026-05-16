import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidStarknetStampType = "starknet";

export interface CubidStarknetCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidStarknetCapabilities {
  gasSponsorship?: CubidStarknetCapabilityDescriptor;
  paymaster?: CubidStarknetCapabilityDescriptor;
  sessionKeys?: CubidStarknetCapabilityDescriptor;
  smartAccount?: CubidStarknetCapabilityDescriptor;
  [capabilityName: string]: CubidStarknetCapabilityDescriptor | undefined;
}

export interface CubidStarknetConnection {
  address: string;
  capabilities?: CubidStarknetCapabilities;
  chainId?: string;
  chainType?: string;
  classHash?: string;
  publicKey?: string;
  [key: string]: unknown;
}

export interface CubidStarknetVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidStarknetAdapter<
  TConnection extends CubidStarknetConnection = CubidStarknetConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidStarknetVerification
  ): Record<string, unknown>;
  verify?(
    connection: TConnection
  ): Promise<CubidStarknetVerification> | CubidStarknetVerification;
}

export interface CubidStarknetClientOptions {
  defaultStampType?: CubidStarknetStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidStarknetConnection = CubidStarknetConnection
> {
  adapter: CubidStarknetAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidStarknetConnection = CubidStarknetConnection
> {
  adapter: CubidStarknetAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidStarknetStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidStarknetConnection = CubidStarknetConnection
> {
  capabilities: CubidStarknetCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidStarknetStampType;
  verification: CubidStarknetVerification;
}

export interface CubidStarknetClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidStarknetConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidStarknetConnection>(
    adapter: CubidStarknetAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidStarknetConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
