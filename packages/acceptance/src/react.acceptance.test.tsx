// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { createCubidApiClient } from "@cubid/core";
import { createCubidWeb2Client } from "@cubid/browser";
import { CubidWeb2Provider, ProviderConnectButton } from "@cubid/react";

describe("@cubid/acceptance react consumer flow", () => {
  it("renders a public react component against a real browser client surface", async () => {
    const apiClient = createCubidApiClient({
      apiKey: "acceptance-api-key",
      baseUrl: "https://passport.cubid.me",
      dappId: "dapp-123",
      fetch: vi.fn(async () => {
        throw new Error("Acceptance flow should not call fetch.");
      })
    });
    const browserClient = createCubidWeb2Client(apiClient);
    const onConnect = vi.fn();
    const user = userEvent.setup();

    render(
      <CubidWeb2Provider client={browserClient}>
        <ProviderConnectButton
          authorizationRequest={{
            authorizationUrl: "https://accounts.example/authorize",
            clientId: "client-123",
            redirectUri: "https://app.example/callback",
            scope: ["openid", "email"],
            state: "state-123"
          }}
          onConnect={onConnect}
          provider="google"
        />
      </CubidWeb2Provider>
    );

    await user.click(screen.getByRole("button", { name: "Connect Google" }));

    expect(onConnect).toHaveBeenCalledWith({
      provider: "google",
      state: "state-123",
      url: "https://accounts.example/authorize?client_id=client-123&redirect_uri=https%3A%2F%2Fapp.example%2Fcallback&response_type=code&scope=openid+email&state=state-123"
    });
  });
});
