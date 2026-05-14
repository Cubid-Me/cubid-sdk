// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import type { CubidAuthStorageLike } from "@cubid/auth";
import { CubidAuthProvider, CubidSignInButton } from "@cubid/auth-react";

class MemoryStorage implements CubidAuthStorageLike {
  private readonly map = new Map<string, string>();

  getItem(key: string) {
    return this.map.get(key) ?? null;
  }

  removeItem(key: string) {
    this.map.delete(key);
  }

  setItem(key: string, value: string) {
    this.map.set(key, value);
  }
}

describe("@cubid/acceptance auth-react consumer flow", () => {
  it("launches Sign in with Cubid from the public React package entrypoint", async () => {
    const storage = new MemoryStorage();
    const navigate = vi.fn();
    const user = userEvent.setup();

    render(
      <CubidAuthProvider
        clientId="clearpass-dashboard"
        discoveryDocument={{
          authorization_endpoint: "https://id.cubid.me/oauth2/authorize",
          issuer: "https://id.cubid.me",
          token_endpoint: "https://id.cubid.me/oauth2/token",
        }}
        issuer="https://id.cubid.me"
        redirectUri="https://dashboard.clearpass.app/auth/callback"
        storage={storage}
      >
        <CubidSignInButton
          onLaunched={navigate}
          signInOptions={{ nonce: "nonce-123", performRedirect: false }}
        />
      </CubidAuthProvider>
    );

    await user.click(screen.getByRole("button", { name: "Sign in with Cubid" }));

    const launchedUrl = String(navigate.mock.calls[0]?.[0] ?? "");
    expect(launchedUrl).toContain("client_id=clearpass-dashboard");
    expect(launchedUrl).toContain("code_challenge_method=S256");
  });
});
