import type { CubidApiClient } from "@cubid/core";

import { buildDefaultWalletStampData } from "./internal";
import type {
  ConnectWalletRequest,
  CubidWalletConnection,
  CubidWalletVerification,
  CubidWeb3Adapter,
  CubidWeb3Client,
  CubidWeb3ClientOptions,
  CubidWeb3StampType,
  VerifyWalletRequest,
  VerifyWalletResult
} from "./types";

function createDefaultVerification(): CubidWalletVerification {
  return { isVerified: false };
}

function resolveStampType(stampType: CubidWeb3StampType | undefined, fallback: CubidWeb3StampType): CubidWeb3StampType {
  return stampType ?? fallback;
}

export function createCubidWeb3Client(
  apiClient: CubidApiClient,
  options: CubidWeb3ClientOptions = {}
): CubidWeb3Client {
  const defaultStampType = options.defaultStampType ?? "evm";

  return {
    apiClient,
    connectWallet: async <TConnection extends CubidWalletConnection>({
      adapter
    }: ConnectWalletRequest<TConnection>) => adapter.connect(),
    disconnectWallet: async <TConnection extends CubidWalletConnection>(
      adapter: CubidWeb3Adapter<TConnection>,
      connection: TConnection
    ) => {
      await adapter.disconnect?.(connection);
    },
    verifyWallet: async <TConnection extends CubidWalletConnection>({
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

      const verification = (await adapter.verify?.(connection)) ?? createDefaultVerification();
      const resolvedStampType = resolveStampType(stampType, defaultStampType);
      const stampData =
        adapter.toStampData?.(connection, verification) ??
        buildDefaultWalletStampData(resolvedStampType, connection, verification);

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
        connection,
        persistedStamp,
        stampData,
        stampType: resolvedStampType,
        verification
      };
    }
  };
}
