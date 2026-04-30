import type { CubidWalletConnection, CubidWalletVerification, CubidWeb3StampType } from "./types";

export function buildDefaultWalletStampData(
  stampType: CubidWeb3StampType,
  connection: CubidWalletConnection,
  verification: CubidWalletVerification
): Record<string, unknown> {
  return {
    address: connection.address,
    chainId: connection.chainId,
    chainType: connection.chainType,
    identity: connection.address,
    uniquevalue: connection.address,
    verification: verification.metadata,
    walletType: stampType
  };
}
