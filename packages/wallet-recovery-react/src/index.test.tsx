import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  CubidRecoveryLaunchButton,
  useCubidRecoveryBundles,
  useCubidRecoveryRelease,
} from "./index";

const createJsonResponse = (payload: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json",
      "x-request-id": "request_123",
      ...(init.headers ?? {}),
    },
    status: init.status ?? 200,
  });

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("@cubid/wallet-recovery-react", () => {
  it("launches the hosted Passport recovery flow", async () => {
    const user = userEvent.setup();
    const onLaunched = vi.fn();
    const openWindow = vi.fn();

    render(
      <CubidRecoveryLaunchButton
        onLaunched={onLaunched}
        openWindow={openWindow}
        passportOrigin="https://passport.cubid.me"
        recoverySessionId="rw_release_123"
      />
    );

    await user.click(screen.getByRole("button", { name: "Recover wallet with Cubid" }));

    const expectedUrl =
      "https://passport.cubid.me/recovery/wallet?recovery_session_id=rw_release_123";
    expect(openWindow).toHaveBeenCalledWith(expectedUrl);
    expect(onLaunched).toHaveBeenCalledWith(expectedUrl);
  });

  it("opens hosted recovery without granting opener access", async () => {
    const user = userEvent.setup();
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(
      <CubidRecoveryLaunchButton
        passportOrigin="https://passport.cubid.me"
        recoverySessionId="rw_release_123"
      />
    );

    await user.click(screen.getByRole("button", { name: "Recover wallet with Cubid" }));

    expect(openSpy).toHaveBeenCalledWith(
      "https://passport.cubid.me/recovery/wallet?recovery_session_id=rw_release_123",
      "cubid-wallet-recovery",
      "width=600,height=800,noopener,noreferrer"
    );
  });

  it("completes release through the hook with loading and success states", async () => {
    const user = userEvent.setup();
    const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      expect(String(input)).toBe(
        "https://passport.cubid.me/api/recovery-bundles/release/complete"
      );
      expect(new Headers(init?.headers).get("authorization")).toBe(
        "Bearer user_token_123"
      );

      return createJsonResponse({
        data: {
          bundleMaterial: "opaque-app-owned-material",
          recoveryBundleId: "rw_bundle_123",
          recoverySessionId: "rw_release_123",
          status: "released",
        },
      });
    });

    function Harness() {
      const release = useCubidRecoveryRelease({
        baseUrl: "https://passport.cubid.me",
        fetch: fetchImpl,
        getAccessToken: () => "user_token_123",
        recoverySessionId: "rw_release_123",
      });

      return (
        <div>
          <span data-testid="status">{release.status}</span>
          <span data-testid="material">
            {release.data?.bundleMaterial ?? "none"}
          </span>
          <button onClick={() => void release.completeRelease()} type="button">
            Complete recovery
          </button>
        </div>
      );
    }

    render(<Harness />);
    expect(screen.getByTestId("status").textContent).toBe("idle");

    await user.click(screen.getByRole("button", { name: "Complete recovery" }));

    expect(screen.getByTestId("status").textContent).toBe("success");
    expect(screen.getByTestId("material").textContent).toBe(
      "opaque-app-owned-material"
    );
  });

  it("loads user-visible recovery bundles through the hook", async () => {
    const fetchImpl = vi.fn(async () =>
      createJsonResponse({
        data: [
          {
            recoveryBundleId: "rw_bundle_123",
            status: "active",
          },
        ],
      })
    );

    function Harness() {
      const bundles = useCubidRecoveryBundles({
        autoLoad: true,
        baseUrl: "https://passport.cubid.me",
        fetch: fetchImpl,
        accessToken: "user_token_123",
      });

      return (
        <div>
          <span data-testid="status">{bundles.status}</span>
          <span data-testid="count">{String(bundles.bundles.length)}</span>
        </div>
      );
    }

    render(<Harness />);

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("success");
    });
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("reloads user-visible recovery bundles when auth-scoped inputs change", async () => {
    const fetchImpl = vi.fn(async (_input: string | URL | Request, init?: RequestInit) =>
      createJsonResponse({
        data: [
          {
            recoveryBundleId:
              new Headers(init?.headers).get("authorization") ===
              "Bearer user_token_456"
                ? "rw_bundle_456"
                : "rw_bundle_123",
            status: "active",
          },
        ],
      })
    );

    function Harness({ accessToken }: { accessToken: string }) {
      const bundles = useCubidRecoveryBundles({
        autoLoad: true,
        baseUrl: "https://passport.cubid.me",
        fetch: fetchImpl,
        accessToken,
      });

      return (
        <div>
          <span data-testid="status">{bundles.status}</span>
          <span data-testid="bundle">
            {bundles.bundles[0]?.recoveryBundleId ?? "none"}
          </span>
        </div>
      );
    }

    const { rerender } = render(<Harness accessToken="user_token_123" />);

    await waitFor(() => {
      expect(screen.getByTestId("bundle").textContent).toBe("rw_bundle_123");
    });

    rerender(<Harness accessToken="user_token_456" />);

    await waitFor(() => {
      expect(screen.getByTestId("bundle").textContent).toBe("rw_bundle_456");
    });
    expect(fetchImpl).toHaveBeenCalledTimes(2);
  });

  it("surfaces recovery errors through the release hook", async () => {
    const user = userEvent.setup();
    const fetchImpl = vi.fn(async () =>
      createJsonResponse(
        {
          error: {
            code: "recovery_session_expired",
            message: "Recovery session expired.",
          },
        },
        { status: 410 }
      )
    );

    function Harness() {
      const release = useCubidRecoveryRelease({
        accessToken: "user_token_123",
        baseUrl: "https://passport.cubid.me",
        fetch: fetchImpl,
        recoverySessionId: "rw_release_123",
      });

      return (
        <div>
          <span data-testid="status">{release.status}</span>
          <span data-testid="error">{release.error?.message ?? "none"}</span>
          <button
            onClick={() => {
              void release.completeRelease().catch(() => undefined);
            }}
            type="button"
          >
            Complete recovery
          </button>
        </div>
      );
    }

    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Complete recovery" }));

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("error");
    });
    expect(screen.getByTestId("error").textContent).toBe(
      "Recovery session expired."
    );
  });
});
