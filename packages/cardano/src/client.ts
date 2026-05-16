import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultCardanoStampData,
  getCubidCardanoCapabilities
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidCardanoAdapter,
  CubidCardanoClient,
  CubidCardanoClientOptions,
  CubidCardanoConnection,
  CubidCardanoStampType,
  CubidCardanoVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidCardanoVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidCardanoStampType | undefined,
  fallback: CubidCardanoStampType
): CubidCardanoStampType {
  return stampType ?? fallback;
}

export function createCubidCardanoClient(
  apiClient: CubidApiClient,
  options: CubidCardanoClientOptions = {}
): CubidCardanoClient {
  const defaultStampType = options.defaultStampType ?? "cardano";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidCardanoConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidCardanoConnection>(
      adapter: CubidCardanoAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidCardanoConnection>({
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

      const verification =
        (await adapter.verify?.(connection)) ?? createDefaultVerification();
      const resolvedStampType = resolveStampType(stampType, defaultStampType);
      const capabilities = getCubidCardanoCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultCardanoStampData(resolvedStampType, connection, verification);

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
