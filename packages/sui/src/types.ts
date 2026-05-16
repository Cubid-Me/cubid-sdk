import type { CubidAddStampResponse, CubidApiClient } from "@cubid/core";

export type CubidSuiStampType = "sui";

export interface CubidSuiCapabilityDescriptor {
  available: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidSuiCapabilities {
  gasSponsorship?: CubidSuiCapabilityDescriptor;
  paymaster?: CubidSuiCapabilityDescriptor;
  sessionKeys?: CubidSuiCapabilityDescriptor;
  smartAccount?: CubidSuiCapabilityDescriptor;
  [capabilityName: string]: CubidSuiCapabilityDescriptor | undefined;
}

export interface CubidSuiConnection {
  address: string;
  capabilities?: CubidSuiCapabilities;
  chainType?: string;
  networkId?: string;
  publicKey?: string;
  [key: string]: unknown;
}

export interface CubidSuiVerification {
  isVerified: boolean;
  metadata?: Record<string, unknown>;
}

export interface CubidSuiAdapter<TConnection extends CubidSuiConnection = CubidSuiConnection> {
  connect(): Promise<TConnection>;
  disconnect?(connection: TConnection): Promise<void> | void;
  id: string;
  toStampData?(connection: TConnection, verification: CubidSuiVerification): Record<string, unknown>;
  verify?(connection: TConnection): Promise<CubidSuiVerification> | CubidSuiVerification;
}

export interface CubidSuiClientOptions {
  defaultStampType?: CubidSuiStampType;
}

export interface ConnectWalletRequest<TConnection extends CubidSuiConnection = CubidSuiConnection> {
  adapter: CubidSuiAdapter<TConnection>;
}

export interface VerifyWalletRequest<TConnection extends CubidSuiConnection = CubidSuiConnection> {
  adapter: CubidSuiAdapter<TConnection>;
  connection: TConnection;
  pageId?: number | string;
  persistStamp?: boolean;
  stampType?: CubidSuiStampType;
  userId?: string;
}

export interface VerifyWalletResult<TConnection extends CubidSuiConnection = CubidSuiConnection> {
  capabilities: CubidSuiCapabilities;
  connection: TConnection;
  persistedStamp?: CubidAddStampResponse;
  stampData?: Record<string, unknown>;
  stampType: CubidSuiStampType;
  verification: CubidSuiVerification;
}

export interface CubidSuiClient {
  readonly apiClient: CubidApiClient;
  connectWallet<TConnection extends CubidSuiConnection>(
    request: ConnectWalletRequest<TConnection>
  ): Promise<TConnection>;
  disconnectWallet<TConnection extends CubidSuiConnection>(
    adapter: CubidSuiAdapter<TConnection>,
    connection: TConnection
  ): Promise<void>;
  verifyWallet<TConnection extends CubidSuiConnection>(
    request: VerifyWalletRequest<TConnection>
  ): Promise<VerifyWalletResult<TConnection>>;
}
