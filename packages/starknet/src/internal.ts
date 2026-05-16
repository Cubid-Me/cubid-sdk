import type {
  CubidStarknetCapabilities,
  CubidStarknetConnection,
  CubidStarknetStampType,
  CubidStarknetVerification
} from "./types";

export function buildDefaultStarknetStampData(
  stampType: CubidStarknetStampType,
  connection: CubidStarknetConnection,
  verification: CubidStarknetVerification
): Record<string, unknown> {
  const identity = connection.address;

  return {
    address: connection.address,
    chainId: connection.chainId,
    chainType: connection.chainType,
    classHash: connection.classHash,
    identity,
    publicKey: connection.publicKey,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidStarknetCapabilities(
  connection: CubidStarknetConnection
): CubidStarknetCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidStarknetCapability(
  connection: CubidStarknetConnection,
  capabilityName: keyof CubidStarknetCapabilities & string
): boolean {
  return Boolean(getCubidStarknetCapabilities(connection)[capabilityName]?.available);
}
