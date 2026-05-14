import type { CubidApiClient } from "@cubid/core";

import { buildDefaultSolanaStampData, getCubidSolanaCapabilities } from "./internal";
import type {
  ConnectWalletRequest,
  CubidSolanaAdapter,
  CubidSolanaClient,
  CubidSolanaClientOptions,
  CubidSolanaConnection,
  CubidSolanaStampType,
  CubidSolanaVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidSolanaVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidSolanaStampType | undefined,
  fallback: CubidSolanaStampType
): CubidSolanaStampType {
  return stampType ?? fallback;
}

export function createCubidSolanaClient(
  apiClient: CubidApiClient,
  options: CubidSolanaClientOptions = {}
): CubidSolanaClient {
  const defaultStampType = options.defaultStampType ?? "solana";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidSolanaConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidSolanaConnection>(
      adapter: CubidSolanaAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidSolanaConnection>({
      adapter,
      connection,
      pageId,
      persistStamp = false,
      stampType,
      userId
    }: VerifyWalletRequest<TConnection>): Promise<VerifyWalletResult<TConnection>> => {
      if (persistStamp && !adapter.verify) {
        throw new Error("Persisting a wallet stamp requires an adapter.verify implementation.");
      }

      const verification = (await adapter.verify?.(connection)) ?? createDefaultVerification();
      const resolvedStampType = resolveStampType(stampType, defaultStampType);
      const capabilities = getCubidSolanaCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultSolanaStampData(resolvedStampType, connection, verification);

      let persistedStamp: VerifyWalletResult<TConnection>["persistedStamp"];

      if (persistStamp && verification.isVerified) {
        const resolvedPageId = pageId;
        const resolvedUserId = userId;

        if (resolvedPageId === undefined || !resolvedUserId) {
          throw new Error("Persisting a wallet stamp requires both userId and pageId.");
        }

        persistedStamp = await apiClient.addStamp({
          pageId: resolvedPageId,
          stampData,
          stampType: resolvedStampType,
          userId: resolvedUserId
        });
      }

      return {
        capabilities,
        connection,
        persistedStamp,
        stampData,
        stampType: resolvedStampType,
        verification
      };
    }
  };
}
