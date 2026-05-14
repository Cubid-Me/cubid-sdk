import type {
  CubidPolkadotCapabilities,
  CubidPolkadotConnection,
  CubidPolkadotStampType,
  CubidPolkadotVerification
} from "./types";

export function buildDefaultPolkadotStampData(
  stampType: CubidPolkadotStampType,
  connection: CubidPolkadotConnection,
  verification: CubidPolkadotVerification
): Record<string, unknown> {
  const identity = connection.address;

  return {
    address: connection.address,
    chainType: connection.chainType,
    genesisHash: connection.genesisHash,
    identity,
    publicKey: connection.publicKey,
    ss58Format: connection.ss58Format,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidPolkadotCapabilities(
  connection: CubidPolkadotConnection
): CubidPolkadotCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidPolkadotCapability(
  connection: CubidPolkadotConnection,
  capabilityName: keyof CubidPolkadotCapabilities & string
): boolean {
  return Boolean(getCubidPolkadotCapabilities(connection)[capabilityName]?.available);
}
