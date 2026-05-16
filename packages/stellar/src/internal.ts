import type {
  CubidStellarCapabilities,
  CubidStellarConnection,
  CubidStellarStampType,
  CubidStellarVerification
} from "./types";

export function buildDefaultStellarStampData(
  stampType: CubidStellarStampType,
  connection: CubidStellarConnection,
  verification: CubidStellarVerification
): Record<string, unknown> {
  const identity = connection.address;

  return {
    address: connection.address,
    chainType: connection.chainType,
    federationAddress: connection.federationAddress,
    identity,
    networkPassphrase: connection.networkPassphrase,
    publicKey: connection.publicKey,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidStellarCapabilities(
  connection: CubidStellarConnection
): CubidStellarCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidStellarCapability(
  connection: CubidStellarConnection,
  capabilityName: keyof CubidStellarCapabilities & string
): boolean {
  return Boolean(getCubidStellarCapabilities(connection)[capabilityName]?.available);
}
