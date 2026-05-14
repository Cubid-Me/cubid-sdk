import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidCardanoStampType = "cardano";

export interface CubidCardanoCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidCardanoCapabilities {
  gasSponsorship?: CubidCardanoCapabilityDescriptor;
  paymaster?: CubidCardanoCapabilityDescriptor;
  sessionKeys?: CubidCardanoCapabilityDescriptor;
  smartAccount?: CubidCardanoCapabilityDescriptor;
  [capabilityName: string]: CubidCardanoCapabilityDescriptor | undefined;
}

export interface CubidCardanoConnection {
  address: string;
  capabilities?: CubidCardanoCapabilities;
  chainType?: string;
  networkId?: string;
  stakeAddress?: string;
  [key: string]: unknown;
}

export interface CubidCardanoVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidCardanoAdapter<
  TConnection extends CubidCardanoConnection = CubidCardanoConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidCardanoVerification
  ): Record<string, unknown>;
  verify?(
    connection: TConnection
  ): Promise<CubidCardanoVerification> | CubidCardanoVerification;
}

export interface CubidCardanoClientOptions {
  defaultStampType?: CubidCardanoStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidCardanoConnection = CubidCardanoConnection
> {
  adapter: CubidCardanoAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidCardanoConnection = CubidCardanoConnection
> {
  adapter: CubidCardanoAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidCardanoStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidCardanoConnection = CubidCardanoConnection
> {
  capabilities: CubidCardanoCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidCardanoStampType;
  verification: CubidCardanoVerification;
}

export interface CubidCardanoClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidCardanoConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidCardanoConnection>(
    adapter: CubidCardanoAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidCardanoConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
