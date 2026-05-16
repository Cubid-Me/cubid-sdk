import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidPolkadotStampType = "polkadot";

export interface CubidPolkadotCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidPolkadotCapabilities {
  gasSponsorship?: CubidPolkadotCapabilityDescriptor;
  paymaster?: CubidPolkadotCapabilityDescriptor;
  sessionKeys?: CubidPolkadotCapabilityDescriptor;
  smartAccount?: CubidPolkadotCapabilityDescriptor;
  [capabilityName: string]: CubidPolkadotCapabilityDescriptor | undefined;
}

export interface CubidPolkadotConnection {
  address: string;
  capabilities?: CubidPolkadotCapabilities;
  chainType?: string;
  genesisHash?: string;
  publicKey?: string;
  ss58Format?: number;
  [key: string]: unknown;
}

export interface CubidPolkadotVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidPolkadotAdapter<
  TConnection extends CubidPolkadotConnection = CubidPolkadotConnection
> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(
    connection: TConnection,
    verification: CubidPolkadotVerification
  ): Record<string, unknown>;
  verify?(
    connection: TConnection
  ): Promise<CubidPolkadotVerification> | CubidPolkadotVerification;
}

export interface CubidPolkadotClientOptions {
  defaultStampType?: CubidPolkadotStampType;
}

export interface ConnectWalletRequest<
  TConnection extends CubidPolkadotConnection = CubidPolkadotConnection
> {
  adapter: CubidPolkadotAdapter<TConnection>;
}

export interface VerifyWalletRequest<
  TConnection extends CubidPolkadotConnection = CubidPolkadotConnection
> {
  adapter: CubidPolkadotAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidPolkadotStampType;
  userId?: string;
}

export interface VerifyWalletResult<
  TConnection extends CubidPolkadotConnection = CubidPolkadotConnection
> {
  capabilities: CubidPolkadotCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidPolkadotStampType;
  verification: CubidPolkadotVerification;
}

export interface CubidPolkadotClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidPolkadotConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidPolkadotConnection>(
    adapter: CubidPolkadotAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidPolkadotConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
