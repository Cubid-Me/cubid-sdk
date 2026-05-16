import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultBitcoinStampData,
  getCubidBitcoinCapabilities
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidBitcoinAdapter,
  CubidBitcoinClient,
  CubidBitcoinClientOptions,
  CubidBitcoinConnection,
  CubidBitcoinStampType,
  CubidBitcoinVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidBitcoinVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidBitcoinStampType | undefined,
  fallback: CubidBitcoinStampType
): CubidBitcoinStampType {
  return stampType ?? fallback;
}

export function createCubidBitcoinClient(
  apiClient: CubidApiClient,
  options: CubidBitcoinClientOptions = {}
): CubidBitcoinClient {
  const defaultStampType = options.defaultStampType ?? "bitcoin";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidBitcoinConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidBitcoinConnection>(
      adapter: CubidBitcoinAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidBitcoinConnection>({
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
      const capabilities = getCubidBitcoinCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultBitcoinStampData(resolvedStampType, connection, verification);

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
