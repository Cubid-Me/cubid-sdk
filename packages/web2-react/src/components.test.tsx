import fs from "node:fs";
import path from "node:path";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CubidWeb2Provider } from "./context";
import { EmailOtpForm } from "./EmailOtpForm";
import { ProviderConnectButton } from "./ProviderConnectButton";

function createClient() {
  return {
    apiClient: {
      config: {
        apiKey: "api-key",
        baseUrl: "https://passport.cubid.me/api/v2",
        dappId: "dapp-id",
        fetch
      }
    },
    email: {
      startOtp: vi.fn(async () => ({ raw: { sent: true }, sent: true })),
      verifyOtp: vi.fn(async () => ({ isVerified: true }))
    },
    oauth: {
      buildAllowFlowUrl: vi.fn(),
      buildAuthorizationUrl: vi.fn(() => "https://accounts.example/authorize?client_id=abc"),
      createCallbackState: vi.fn(),
      parseAllowFlowUrl: vi.fn(),
      parseCallbackState: vi.fn(),
      providers: ["google", "github", "discord", "twitter", "instagram", "linkedin", "worldcoin"]
    },
    options: {
      allowPath: "/allow",
      passportOrigin: "https://passport.cubid.me"
    },
    phone: {
      startOtp: vi.fn(async () => ({ raw: { status: "pending" }, status: "pending" })),
      verifyOtp: vi.fn(async () => ({ isVerified: true, raw: { status: "approved" }, status: "approved" }))
    },
    sync: {
      createProviderStampData: vi.fn(),
      verifiedStamp: vi.fn()
    }
  };
}

describe("@cubid/web2-react", () => {
  it("submits the email otp form and surfaces callback results", async () => {
    const client = createClient();
    const user = userEvent.setup();
    const onStarted = vi.fn();
    const onVerified = vi.fn();

    render(
      <CubidWeb2Provider client={client as never}>
        <EmailOtpForm onStarted={onStarted} onVerified={onVerified} />
      </CubidWeb2Provider>
    );

    await user.type(screen.getByLabelText("Email"), "hello@cubid.me");
    await user.click(screen.getByRole("button", { name: "Send email code" }));

    expect(client.email.startOtp).toHaveBeenCalledWith({
      email: "hello@cubid.me",
      onStarted
    });
    expect(screen.getByText("Code sent. Enter the OTP to finish verification.")).toBeTruthy();

    await user.type(screen.getByLabelText("OTP"), "1234");
    await user.click(screen.getByRole("button", { name: "Verify email code" }));

    expect(client.email.verifyOtp).toHaveBeenCalledWith({
      email: "hello@cubid.me",
      onVerified,
      otp: "1234",
      persistStamp: undefined
    });
    expect(screen.getByText("Email verified.")).toBeTruthy();
  });

  it("fires provider connect callbacks with the built authorization url", async () => {
    const client = createClient();
    const user = userEvent.setup();
    const onConnect = vi.fn();

    render(
      <CubidWeb2Provider client={client as never}>
        <ProviderConnectButton
          authorizationRequest={{
            authorizationUrl: "https://accounts.example/authorize",
            clientId: "abc",
            redirectUri: "https://app.example/callback",
            state: "state-1"
          }}
          onConnect={onConnect}
          provider="google"
        />
      </CubidWeb2Provider>
    );

    await user.click(screen.getByRole("button", { name: "Connect Google" }));

    expect(client.oauth.buildAuthorizationUrl).toHaveBeenCalledWith({
      authorizationUrl: "https://accounts.example/authorize",
      clientId: "abc",
      redirectUri: "https://app.example/callback",
      state: "state-1"
    });
    expect(onConnect).toHaveBeenCalledWith({
      provider: "google",
      state: "state-1",
      url: "https://accounts.example/authorize?client_id=abc"
    });
  });

  it("does not pull wallet or web3 dependencies into the react package", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "packages/web2-react/package.json"), "utf8")
    ) as {
      dependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@cubid/web3"]).toBeUndefined();
    expect(packageJson.dependencies?.["wagmi"]).toBeUndefined();
    expect(packageJson.dependencies?.["@rainbow-me/rainbowkit"]).toBeUndefined();
    expect(packageJson.peerDependencies?.react).toBeDefined();
    expect(packageJson.peerDependencies?.["react-dom"]).toBeDefined();
  });
});
