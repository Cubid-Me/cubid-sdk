import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidAptosStampType = "aptos";

export interface CubidAptosCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidAptosCapabilities {
  gasSponsorship?: CubidAptosCapabilityDescriptor;
  paymaster?: CubidAptosCapabilityDescriptor;
  sessionKeys?: CubidAptosCapabilityDescriptor;
  smartAccount?: CubidAptosCapabilityDescriptor;
  [capabilityName: string]: CubidAptosCapabilityDescriptor | undefined;
}

export interface CubidAptosConnection {
  address: string;
  authenticationKey?: string;
  capabilities?: CubidAptosCapabilities;
  chainId?: string;
  chainType?: string;
  networkId?: string;
  publicKey?: string;
  [key: string]: unknown;
}

export interface CubidAptosVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidAptosAdapter<
  TConnection extends CubidAptosConnection = CubidAptosConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidAptosVerification
  ): Record<string, unknown>;
  verify?(
    connection: TConnection
  ): Promise<CubidAptosVerification> | CubidAptosVerification;
}

export interface CubidAptosClientOptions {
  defaultStampType?: CubidAptosStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidAptosConnection = CubidAptosConnection
> {
  adapter: CubidAptosAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidAptosConnection = CubidAptosConnection
> {
  adapter: CubidAptosAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidAptosStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidAptosConnection = CubidAptosConnection
> {
  capabilities: CubidAptosCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidAptosStampType;
  verification: CubidAptosVerification;
}

export interface CubidAptosClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidAptosConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidAptosConnection>(
    adapter: CubidAptosAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidAptosConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
