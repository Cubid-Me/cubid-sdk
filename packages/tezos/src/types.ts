import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidTezosStampType = "tezos";

export interface CubidTezosCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidTezosCapabilities {
  gasSponsorship?: CubidTezosCapabilityDescriptor;
  paymaster?: CubidTezosCapabilityDescriptor;
  sessionKeys?: CubidTezosCapabilityDescriptor;
  smartAccount?: CubidTezosCapabilityDescriptor;
  [capabilityName: string]: CubidTezosCapabilityDescriptor | undefined;
}

export interface CubidTezosConnection {
  address: string;
  capabilities?: CubidTezosCapabilities;
  chainType?: string;
  curve?: string;
  networkId?: string;
  publicKey?: string;
  [key: string]: unknown;
}

export interface CubidTezosVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidTezosAdapter<
  TConnection extends CubidTezosConnection = CubidTezosConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidTezosVerification
  ): Record<string, unknown>;
  verify?(
    connection: TConnection
  ): Promise<CubidTezosVerification> | CubidTezosVerification;
}

export interface CubidTezosClientOptions {
  defaultStampType?: CubidTezosStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidTezosConnection = CubidTezosConnection
> {
  adapter: CubidTezosAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidTezosConnection = CubidTezosConnection
> {
  adapter: CubidTezosAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidTezosStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidTezosConnection = CubidTezosConnection
> {
  capabilities: CubidTezosCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidTezosStampType;
  verification: CubidTezosVerification;
}

export interface CubidTezosClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidTezosConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidTezosConnection>(
    adapter: CubidTezosAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidTezosConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
