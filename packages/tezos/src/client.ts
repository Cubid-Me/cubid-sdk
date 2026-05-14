import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultTezosStampData,
  getCubidTezosCapabilities
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidTezosAdapter,
  CubidTezosClient,
  CubidTezosClientOptions,
  CubidTezosConnection,
  CubidTezosStampType,
  CubidTezosVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidTezosVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidTezosStampType | undefined,
  fallback: CubidTezosStampType
): CubidTezosStampType {
  return stampType ?? fallback;
}

export function createCubidTezosClient(
  apiClient: CubidApiClient,
  options: CubidTezosClientOptions = {}
): CubidTezosClient {
  const defaultStampType = options.defaultStampType ?? "tezos";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidTezosConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidTezosConnection>(
      adapter: CubidTezosAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidTezosConnection>({
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
      const capabilities = getCubidTezosCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultTezosStampData(resolvedStampType, connection, verification);

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
