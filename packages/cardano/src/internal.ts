import type {
  CubidCardanoCapabilities,
  CubidCardanoConnection,
  CubidCardanoStampType,
  CubidCardanoVerification
} from "./types";

export function buildDefaultCardanoStampData(
  stampType: CubidCardanoStampType,
  connection: CubidCardanoConnection,
  verification: CubidCardanoVerification
): Record<string, unknown> {
  const identity = connection.address;

  return {
    address: connection.address,
    chainType: connection.chainType,
    identity,
    networkId: connection.networkId,
    stakeAddress: connection.stakeAddress,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidCardanoCapabilities(
  connection: CubidCardanoConnection
): CubidCardanoCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidCardanoCapability(
  connection: CubidCardanoConnection,
  capabilityName: keyof CubidCardanoCapabilities & string
): boolean {
  return Boolean(getCubidCardanoCapabilities(connection)[capabilityName]?.available);
}
