import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultCosmosStampData,
  getCubidCosmosCapabilities
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidCosmosAdapter,
  CubidCosmosClient,
  CubidCosmosClientOptions,
  CubidCosmosConnection,
  CubidCosmosStampType,
  CubidCosmosVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidCosmosVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidCosmosStampType | undefined,
  fallback: CubidCosmosStampType
): CubidCosmosStampType {
  return stampType ?? fallback;
}

export function createCubidCosmosClient(
  apiClient: CubidApiClient,
  options: CubidCosmosClientOptions = {}
): CubidCosmosClient {
  const defaultStampType = options.defaultStampType ?? "cosmos";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidCosmosConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidCosmosConnection>(
      adapter: CubidCosmosAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidCosmosConnection>({
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
      const capabilities = getCubidCosmosCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultCosmosStampData(resolvedStampType, connection, verification);

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
