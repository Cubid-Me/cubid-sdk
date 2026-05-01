import type {
  CubidEvmConnection,
  CubidEvmStampType,
  CubidEvmVerification
} from "./types";

export function buildDefaultEvmStampData(
  stampType: CubidEvmStampType,
  connection: CubidEvmConnection,
  verification: CubidEvmVerification
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
