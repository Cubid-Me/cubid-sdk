import fs from "node:fs";
import path from "node:path";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CubidWidget } from "./CubidWidget";
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

describe("@cubid/react", () => {
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

  it("keeps the email otp form in collect mode when sending the code fails", async () => {
    const client = createClient();
    client.email.startOtp = vi.fn(async () => ({ raw: { sent: false }, sent: false }));
    const user = userEvent.setup();

    const view = render(
      <CubidWeb2Provider client={client as never}>
        <EmailOtpForm />
      </CubidWeb2Provider>
    );
    const form = within(view.container);

    await user.type(form.getByLabelText("Email"), "hello@cubid.me");
    await user.click(form.getByRole("button", { name: "Send email code" }));

    expect(form.getByText("Unable to send code.")).toBeTruthy();
    expect(form.queryByLabelText("OTP")).toBeNull();
    expect(form.getByRole("button", { name: "Send email code" })).toBeTruthy();
  });

  it("forwards provider button errors instead of leaving an unhandled async rejection", async () => {
    const user = userEvent.setup();
    const onError = vi.fn();

    render(<ProviderConnectButton onError={onError} provider="google" />);

    const buttons = screen.getAllByRole("button", { name: "Connect Google" });
    await user.click(buttons[buttons.length - 1]!);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0]?.[0]).toBeInstanceOf(Error);
  });

  it("does not pull wallet or web3 dependencies into the react package", () => {
    const packageJson = JSON.parse(
      fs.readFileSync(path.resolve(process.cwd(), "packages/react/package.json"), "utf8")
    ) as {
      dependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };

    expect(packageJson.dependencies?.["@cubid/evm"]).toBeUndefined();
    expect(packageJson.dependencies?.["@cubid/web3"]).toBeUndefined();
    expect(packageJson.dependencies?.["wagmi"]).toBeUndefined();
    expect(packageJson.dependencies?.["@rainbow-me/rainbowkit"]).toBeUndefined();
    expect(packageJson.peerDependencies?.react).toBeDefined();
    expect(packageJson.peerDependencies?.["react-dom"]).toBeDefined();
  });

  it("opens the hosted Cubid verification flow and fires onStampChange after the popup closes", async () => {
    const user = userEvent.setup();
    const onStampChange = vi.fn();
    const popup = {
      closed: false,
      close: vi.fn(),
      focus: vi.fn()
    };
    const openSpy = vi.spyOn(window, "open").mockReturnValue(popup as unknown as Window);

    render(<CubidWidget dapp_id="33" onStampChange={onStampChange} stampToRender="address" uuid="user-42" />);

    await user.click(screen.getByRole("button", { name: "Verify address with Cubid" }));

    expect(openSpy).toHaveBeenCalledWith(
      "https://passport.cubid.me/verify?dapp_id=33&user_id=user-42&stamp_type=address",
      "cubid-verification",
      "width=600,height=800"
    );

    popup.closed = true;
    await vi.waitFor(() => {
      expect(onStampChange).toHaveBeenCalledTimes(1);
    });

    openSpy.mockRestore();
  });

  it("disables the hosted phone widget when the required page id is missing", () => {
    render(<CubidWidget stampToRender="phone" uuid="user-42" />);

    expect(screen.getByText("Cubid phone verification is not configured for this environment.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Verify phone with Cubid" }).getAttribute("disabled")).not.toBeNull();
  });
});
