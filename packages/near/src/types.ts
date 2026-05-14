import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidNearStampType = "near" | "near-wallet";

export interface CubidNearCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidNearCapabilities {
  gasSponsorship?: CubidNearCapabilityDescriptor;
  paymaster?: CubidNearCapabilityDescriptor;
  sessionKeys?: CubidNearCapabilityDescriptor;
  smartAccount?: CubidNearCapabilityDescriptor;
  [capabilityName: string]: CubidNearCapabilityDescriptor | undefined;
}

export interface CubidNearConnection {
  accountId: string;
  address?: string;
  capabilities?: CubidNearCapabilities;
  chainType?: string;
  networkId?: string;
  [key: string]: unknown;
}

export interface CubidNearVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidNearAdapter<TConnection extends CubidNearConnection = CubidNearConnection> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(connection: TConnection, verification: CubidNearVerification): Record<string, unknown>;
  verify?(connection: TConnection): Promise<CubidNearVerification> | CubidNearVerification;
}

export interface CubidNearClientOptions {
  defaultStampType?: CubidNearStampType;
}

export interface ConnectWalletRequest<TConnection extends CubidNearConnection = CubidNearConnection> {
  adapter: CubidNearAdapter<TConnection>;
}

export interface VerifyWalletRequest<TConnection extends CubidNearConnection = CubidNearConnection> {
  adapter: CubidNearAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidNearStampType;
  userId?: string;
}

export interface VerifyWalletResult<TConnection extends CubidNearConnection = CubidNearConnection> {
  capabilities: CubidNearCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidNearStampType;
  verification: CubidNearVerification;
}

export interface CubidNearClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidNearConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidNearConnection>(
    adapter: CubidNearAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidNearConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
