import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultAptosStampData,
  getCubidAptosCapabilities
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidAptosAdapter,
  CubidAptosClient,
  CubidAptosClientOptions,
  CubidAptosConnection,
  CubidAptosStampType,
  CubidAptosVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidAptosVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidAptosStampType | undefined,
  fallback: CubidAptosStampType
): CubidAptosStampType {
  return stampType ?? fallback;
}

export function createCubidAptosClient(
  apiClient: CubidApiClient,
  options: CubidAptosClientOptions = {}
): CubidAptosClient {
  const defaultStampType = options.defaultStampType ?? "aptos";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidAptosConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidAptosConnection>(
      adapter: CubidAptosAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidAptosConnection>({
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
      const capabilities = getCubidAptosCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultAptosStampData(resolvedStampType, connection, verification);

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
