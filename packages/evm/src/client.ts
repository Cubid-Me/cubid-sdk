import type { CubidApiClient } from "@cubid/core";

import { buildDefaultEvmStampData } from "./internal";
import type {
  ConnectWalletRequest,
  CubidEvmAdapter,
  CubidEvmClient,
  CubidEvmClientOptions,
  CubidEvmConnection,
  CubidEvmStampType,
  CubidEvmVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidEvmVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidEvmStampType | undefined,
  fallback: CubidEvmStampType
): CubidEvmStampType {
  return stampType ?? fallback;
}

export function createCubidEvmClient(
  apiClient: CubidApiClient,
  options: CubidEvmClientOptions = {}
): CubidEvmClient {
  const defaultStampType = options.defaultStampType ?? "evm";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidEvmConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidEvmConnection>(
      adapter: CubidEvmAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidEvmConnection>({
      adapter,
      connection,
      pageId,
      persistStamp = false,
      stampType,
      userId
    }: VerifyWalletRequest<TConnection>): Promise<VerifyWalletResult<TConnection>> => {
      if (persistStamp && (!userId || pageId === undefined)) {
        throw new Error("Persisting a wallet stamp requires both userId and pageId.");
      }

      if (persistStamp && !adapter.verify) {
        throw new Error("Persisting a wallet stamp requires an adapter.verify implementation.");
      }

      const verification = (await adapter.verify?.(connection)) ?? createDefaultVerification();
      const resolvedStampType = resolveStampType(stampType, defaultStampType);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultEvmStampData(resolvedStampType, connection, verification);

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
        connection,
        persistedStamp,
        stampData,
        stampType: resolvedStampType,
        verification
      };
    }
  };
}
