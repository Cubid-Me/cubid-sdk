import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useCubidWagmiAdapter } from "./hook";

const connectAsync = vi.fn(async () => ({
  accounts: ["0xabc"],
  chainId: 1,
  connector: { id: "injected", name: "Injected" }
}));
const disconnectAsync = vi.fn(async () => undefined);
const signMessageAsync = vi.fn(async ({ message }: { message: string }) => `signed:${message}`);

vi.mock("wagmi", () => ({
  useConnect: () => ({ mutateAsync: connectAsync }),
  useConnectors: () => [{ id: "injected", name: "Injected" }],
  useConnection: () => ({
    accounts: ["0xabc"],
    chainId: 1,
    connector: { id: "injected", name: "Injected" }
  }),
  useDisconnect: () => ({ mutateAsync: disconnectAsync }),
  useSignMessage: () => ({ mutateAsync: signMessageAsync })
}));

describe("@cubid/wagmi hook", () => {
  it("derives current wagmi state into a Cubid-compatible EVM adapter", async () => {
    const { result } = renderHook(() => useCubidWagmiAdapter());

    expect(result.current.isConnected).toBe(true);
    expect(result.current.address).toBe("0xabc");
    expect(result.current.currentConnector).toEqual({ id: "injected", name: "Injected" });
    expect(result.current.connectors).toEqual([{ id: "injected", name: "Injected" }]);

    const connection = await result.current.adapter.connect();
    const verification = await result.current.adapter.verify?.(connection);

    expect(connection).toMatchObject({
      address: "0xabc",
      chainType: "evm",
      connectorId: "injected"
    });
    expect(verification).toMatchObject({
      isVerified: true,
      metadata: {
        connectorId: "injected",
        message: "Verify wallet ownership for Cubid: 0xabc",
        signature: "signed:Verify wallet ownership for Cubid: 0xabc"
      }
    });
  });
});
