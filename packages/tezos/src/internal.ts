import type {
  CubidTezosCapabilities,
  CubidTezosConnection,
  CubidTezosStampType,
  CubidTezosVerification
} from "./types";

export function buildDefaultTezosStampData(
  stampType: CubidTezosStampType,
  connection: CubidTezosConnection,
  verification: CubidTezosVerification
): Record<string, unknown> {
  const identity = connection.address;

  return {
    address: connection.address,
    chainType: connection.chainType,
    curve: connection.curve,
    identity,
    networkId: connection.networkId,
    publicKey: connection.publicKey,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidTezosCapabilities(
  connection: CubidTezosConnection
): CubidTezosCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidTezosCapability(
  connection: CubidTezosConnection,
  capabilityName: keyof CubidTezosCapabilities & string
): boolean {
  return Boolean(getCubidTezosCapabilities(connection)[capabilityName]?.available);
}
