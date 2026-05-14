import type {
  CubidSuiCapabilities,
  CubidSuiConnection,
  CubidSuiStampType,
  CubidSuiVerification
} from "./types";

export function normalizeSuiAddress(address: string): string {
  return address.toLowerCase();
}

export function normalizeSuiConnection<TConnection extends CubidSuiConnection>(
  connection: TConnection
): TConnection {
  return {
    ...connection,
    address: normalizeSuiAddress(connection.address)
  };
}

export function buildDefaultSuiStampData(
  stampType: CubidSuiStampType,
  connection: CubidSuiConnection,
  verification: CubidSuiVerification
): Record<string, unknown> {
  const address = normalizeSuiAddress(connection.address);

  return {
    address,
    chainType: connection.chainType,
    identity: address,
    networkId: connection.networkId,
    publicKey: connection.publicKey,
    uniquevalue: address,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidSuiCapabilities(
  connection: CubidSuiConnection
): CubidSuiCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidSuiCapability(
  connection: CubidSuiConnection,
  capabilityName: keyof CubidSuiCapabilities & string
): boolean {
  return Boolean(getCubidSuiCapabilities(connection)[capabilityName]?.available);
}
