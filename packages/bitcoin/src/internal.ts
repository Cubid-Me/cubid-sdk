import type {
  CubidBitcoinCapabilities,
  CubidBitcoinConnection,
  CubidBitcoinStampType,
  CubidBitcoinVerification
} from "./types";

export function buildDefaultBitcoinStampData(
  stampType: CubidBitcoinStampType,
  connection: CubidBitcoinConnection,
  verification: CubidBitcoinVerification
): Record<string, unknown> {
  const identity = connection.address;

  return {
    address: connection.address,
    chainType: connection.chainType,
    identity,
    networkId: connection.networkId,
    publicKey: connection.publicKey,
    scriptType: connection.scriptType,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidBitcoinCapabilities(
  connection: CubidBitcoinConnection
): CubidBitcoinCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidBitcoinCapability(
  connection: CubidBitcoinConnection,
  capabilityName: keyof CubidBitcoinCapabilities & string
): boolean {
  return Boolean(getCubidBitcoinCapabilities(connection)[capabilityName]?.available);
}
