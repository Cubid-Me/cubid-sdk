import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultStarknetStampData,
  getCubidStarknetCapabilities
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidStarknetAdapter,
  CubidStarknetClient,
  CubidStarknetClientOptions,
  CubidStarknetConnection,
  CubidStarknetStampType,
  CubidStarknetVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidStarknetVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidStarknetStampType | undefined,
  fallback: CubidStarknetStampType
): CubidStarknetStampType {
  return stampType ?? fallback;
}

export function createCubidStarknetClient(
  apiClient: CubidApiClient,
  options: CubidStarknetClientOptions = {}
): CubidStarknetClient {
  const defaultStampType = options.defaultStampType ?? "starknet";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidStarknetConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidStarknetConnection>(
      adapter: CubidStarknetAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidStarknetConnection>({
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
      const capabilities = getCubidStarknetCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultStarknetStampData(resolvedStampType, connection, verification);

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
