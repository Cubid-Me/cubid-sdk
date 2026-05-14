import type { CubidApiClient } from "@cubid/core";

import { buildDefaultNearStampData, getCubidNearCapabilities } from "./internal";
import type {
  ConnectWalletRequest,
  CubidNearAdapter,
  CubidNearClient,
  CubidNearClientOptions,
  CubidNearConnection,
  CubidNearStampType,
  CubidNearVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidNearVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidNearStampType | undefined,
  fallback: CubidNearStampType
): CubidNearStampType {
  return stampType ?? fallback;
}

export function createCubidNearClient(
  apiClient: CubidApiClient,
  options: CubidNearClientOptions = {}
): CubidNearClient {
  const defaultStampType = options.defaultStampType ?? "near";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidNearConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidNearConnection>(
      adapter: CubidNearAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidNearConnection>({
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
      const capabilities = getCubidNearCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultNearStampData(resolvedStampType, connection, verification);

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
