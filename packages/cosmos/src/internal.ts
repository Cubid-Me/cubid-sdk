import type {
  CubidCosmosCapabilities,
  CubidCosmosConnection,
  CubidCosmosStampType,
  CubidCosmosVerification
} from "./types";

export function buildDefaultCosmosStampData(
  stampType: CubidCosmosStampType,
  connection: CubidCosmosConnection,
  verification: CubidCosmosVerification
): Record<string, unknown> {
  const identity = connection.address;

  return {
    address: connection.address,
    bech32Prefix: connection.bech32Prefix,
    chainId: connection.chainId,
    chainType: connection.chainType,
    identity,
    publicKey: connection.publicKey,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidCosmosCapabilities(
  connection: CubidCosmosConnection
): CubidCosmosCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidCosmosCapability(
  connection: CubidCosmosConnection,
  capabilityName: keyof CubidCosmosCapabilities & string
): boolean {
  return Boolean(getCubidCosmosCapabilities(connection)[capabilityName]?.available);
}
