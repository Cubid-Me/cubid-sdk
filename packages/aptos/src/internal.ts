import type {
  CubidAptosCapabilities,
  CubidAptosConnection,
  CubidAptosStampType,
  CubidAptosVerification
} from "./types";

export function buildDefaultAptosStampData(
  stampType: CubidAptosStampType,
  connection: CubidAptosConnection,
  verification: CubidAptosVerification
): Record<string, unknown> {
  const identity = connection.address;

  return {
    address: connection.address,
    authenticationKey: connection.authenticationKey,
    chainId: connection.chainId,
    chainType: connection.chainType,
    identity,
    networkId: connection.networkId,
    publicKey: connection.publicKey,
    uniquevalue: identity,
    verification: verification.metadata,
    walletType: stampType
  };
}

export function getCubidAptosCapabilities(
  connection: CubidAptosConnection
): CubidAptosCapabilities {
  return connection.capabilities ?? {};
}

export function hasCubidAptosCapability(
  connection: CubidAptosConnection,
  capabilityName: keyof CubidAptosCapabilities & string
): boolean {
  return Boolean(getCubidAptosCapabilities(connection)[capabilityName]?.available);
}
