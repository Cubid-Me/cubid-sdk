import type { CubidApiClient } from "@cubid/core";

import {
  buildDefaultPolkadotStampData,
  getCubidPolkadotCapabilities
} from "./internal";
import type {
  ConnectWalletRequest,
  CubidPolkadotAdapter,
  CubidPolkadotClient,
  CubidPolkadotClientOptions,
  CubidPolkadotConnection,
  CubidPolkadotStampType,
  CubidPolkadotVerification,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidPolkadotVerification {
  return { isVerified: false };
}

function resolveStampType(
  stampType: CubidPolkadotStampType | undefined,
  fallback: CubidPolkadotStampType
): CubidPolkadotStampType {
  return stampType ?? fallback;
}

export function createCubidPolkadotClient(
  apiClient: CubidApiClient,
  options: CubidPolkadotClientOptions = {}
): CubidPolkadotClient {
  const defaultStampType = options.defaultStampType ?? "polkadot";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidPolkadotConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidPolkadotConnection>(
      adapter: CubidPolkadotAdapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidPolkadotConnection>({
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
      const capabilities = getCubidPolkadotCapabilities(connection);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultPolkadotStampData(resolvedStampType, connection, verification);

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
