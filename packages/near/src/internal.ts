import type {
  CubidNearCapabilities,
  CubidNearConnection,
  CubidNearStampType,
  CubidNearVerification
} from "./types";

export function buildDefaultNearStampData(
  stampType: CubidNearStampType,
  connection: CubidNearConnection,
  verification: CubidNearVerification
): Record<string, unknown> {
  const identity = connection.accountId;

  return {
    accountId: connection.accountId,
    address: connection.address ?? connection.accountId,
    chainType: connection.chainType,
    identity,
    networkId: connection.networkId,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidNearCapabilities(
  connection: CubidNearConnection
): CubidNearCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidNearCapability(
  connection: CubidNearConnection,
  capabilityName: keyof CubidNearCapabilities & string
): boolean {
  return Boolean(getCubidNearCapabilities(connection)[capabilityName]?.available);
}
