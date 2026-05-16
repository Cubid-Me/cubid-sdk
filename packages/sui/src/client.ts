import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultSuiStampData,
  getCubidSuiCapabilities,
  normalizeSuiConnection
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidSuiAdapter,
  CubidSuiClient,
  CubidSuiClientOptions,
  CubidSuiConnection,
  CubidSuiStampType,
  CubidSuiVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidSuiVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidSuiStampType | undefined,
  fallback: CubidSuiStampType
): CubidSuiStampType {
  return stampType ?? fallback;
}

export function createCubidSuiClient(
  apiClient: CubidApiClient,
  options: CubidSuiClientOptions = {}
): CubidSuiClient {
  const defaultStampType = options.defaultStampType ?? "sui";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidSuiConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => normalizeSuiConnection(await adapter.connect()),
    disconnectWallet: async <TConnection extends CubidSuiConnection>(
      adapter: CubidSuiAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidSuiConnection>({
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

      const normalizedConnection = normalizeSuiConnection(connection);
      const verification =
        (await adapter.verify?.(normalizedConnection)) ?? createDefaultVerification();
      const resolvedStampType = resolveStampType(stampType, defaultStampType);
      const capabilities = getCubidSuiCapabilities(normalizedConnection);
      const stampData =
        adapter.toStampData?.(normalizedConnection, verification) ??
        buildDefaultSuiStampData(resolvedStampType, normalizedConnection, verification);

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
        connection: normalizedConnection,
        persistedStamp,
        stampData,
        stampType: resolvedStampType,
        verification
      };
    }
  };
}
