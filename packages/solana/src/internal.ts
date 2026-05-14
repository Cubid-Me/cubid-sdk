import type {
  CubidSolanaCapabilities,
  CubidSolanaConnection,
  CubidSolanaStampType,
  CubidSolanaVerification
} from "./types";

export function buildDefaultSolanaStampData(
  stampType: CubidSolanaStampType,
  connection: CubidSolanaConnection,
  verification: CubidSolanaVerification
): Record<string, unknown> {
  const identity = connection.publicKey;

  return {
    address: connection.address ?? connection.publicKey,
    chainType: connection.chainType,
    cluster: connection.cluster,
    identity,
    publicKey: connection.publicKey,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidSolanaCapabilities(
  connection: CubidSolanaConnection
): CubidSolanaCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidSolanaCapability(
  connection: CubidSolanaConnection,
  capabilityName: keyof CubidSolanaCapabilities & string
): boolean {
  return Boolean(getCubidSolanaCapabilities(connection)[capabilityName]?.available);
}
