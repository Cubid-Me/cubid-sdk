import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultStellarStampData,
  getCubidStellarCapabilities
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidStellarAdapter,
  CubidStellarClient,
  CubidStellarClientOptions,
  CubidStellarConnection,
  CubidStellarStampType,
  CubidStellarVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidStellarVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidStellarStampType | undefined,
  fallback: CubidStellarStampType
): CubidStellarStampType {
  return stampType ?? fallback;
}

export function createCubidStellarClient(
  apiClient: CubidApiClient,
  options: CubidStellarClientOptions = {}
): CubidStellarClient {
  const defaultStampType = options.defaultStampType ?? "stellar";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidStellarConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidStellarConnection>(
      adapter: CubidStellarAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidStellarConnection>({
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
      const capabilities = getCubidStellarCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultStellarStampData(resolvedStampType, connection, verification);

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
