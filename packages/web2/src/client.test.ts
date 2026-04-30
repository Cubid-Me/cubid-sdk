import { describe, expect, it, vi } from "vitest";

import { createCubidWeb2Client } from "./client";

function createApiClientStub() {
  return {
    addStamp: vi.fn(async () => ({ success: true })),
    config: {
      apiKey: "api-key",
      baseUrl: "https://passport.cubid.me/api/v2",
      dappId: "dapp-id",
      fetch
    },
    sendEmailOtp: vi.fn(async () => ({ otp: 1234 })),
    sendPhoneOtp: vi.fn(async () => ({ message: "otp sent", raw: "otp sent" })),
    verifyEmailOtp: vi.fn(async () => ({ isVerified: true })),
    verifyPhoneOtp: vi.fn(async () => ({ isVerified: true, raw: { status: "approved" }, status: "approved" }))
  } as const;
}

describe("@cubid/web2", () => {
  it("runs the email OTP flow and persists the verified stamp when requested", async () => {
    const apiClient = createApiClientStub();
    const client = createCubidWeb2Client(apiClient as never);

    const started = vi.fn();
    const verified = vi.fn();
    const persisted = vi.fn();

    await client.email.startOtp({ email: "hello@cubid.me", onStarted: started });
    const result = await client.email.verifyOtp({
      email: "hello@cubid.me",
      onPersisted: persisted,
      onVerified: verified,
      otp: "1234",
      persistStamp: { pageId: 7, userId: "user-1" }
    });

    expect(apiClient.sendEmailOtp).toHaveBeenCalledWith({ email: "hello@cubid.me" });
    expect(apiClient.verifyEmailOtp).toHaveBeenCalledWith({ email: "hello@cubid.me", otp: "1234" });
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 7,
      stampData: {
        email: "hello@cubid.me",
        identity: "hello@cubid.me",
        uniquevalue: "hello@cubid.me"
      },
      stampType: "email",
      userId: "user-1"
    });
    expect(started).toHaveBeenCalledWith({ otp: 1234 });
    expect(persisted).toHaveBeenCalledWith({
      stampData: {
        email: "hello@cubid.me",
        identity: "hello@cubid.me",
        uniquevalue: "hello@cubid.me"
      },
      stampType: "email",
      success: true
    });
    expect(verified).toHaveBeenCalled();
    expect(result.persistedStamp?.success).toBe(true);
  });

  it("runs the phone OTP flow and persists the verified phone stamp", async () => {
    const apiClient = createApiClientStub();
    const client = createCubidWeb2Client(apiClient as never);

    const result = await client.phone.verifyOtp({
      otp: "654321",
      persistStamp: { pageId: 12, userId: "user-2" },
      phone: "+15555550123"
    });

    expect(apiClient.verifyPhoneOtp).toHaveBeenCalledWith({ otp: "654321", phone: "+15555550123" });
    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 12,
      stampData: {
        identity: "+15555550123",
        phone: "+15555550123",
        uniquevalue: "+15555550123"
      },
      stampType: "phone",
      userId: "user-2"
    });
    expect(result.persistedStamp?.stampType).toBe("phone");
  });

  it("builds and parses allow urls and callback state", () => {
    const apiClient = createApiClientStub();
    const client = createCubidWeb2Client(apiClient as never, { allowPath: "/widget-allow" });
    const state = client.oauth.createCallbackState({
      metadata: { view: "compact" },
      pageId: "9",
      provider: "google",
      returnTo: "https://app.example/callback",
      userId: "user-7"
    });

    const authorizationUrl = client.oauth.buildAuthorizationUrl({
      authorizationUrl: "https://accounts.example/authorize",
      clientId: "client-1",
      redirectUri: "https://app.example/callback",
      scope: ["openid", "email"],
      state
    });
    const allowUrl = client.oauth.buildAllowFlowUrl({
      colorMode: "dark",
      extras: { code: "123" },
      pageId: 42,
      socialProvider: "google",
      success: true,
      userId: "user-7"
    });

    expect(authorizationUrl).toContain("client_id=client-1");
    expect(authorizationUrl).toContain("scope=openid+email");
    expect(client.oauth.parseCallbackState(state)).toEqual({
      metadata: { view: "compact" },
      pageId: "9",
      provider: "google",
      returnTo: "https://app.example/callback",
      userId: "user-7"
    });
    expect(allowUrl).toBe(
      "https://passport.cubid.me/widget-allow?uid=user-7&page_id=42&colormode=dark&social_provider=google&success=true&code=123"
    );
    expect(client.oauth.parseAllowFlowUrl(allowUrl)).toEqual({
      colorMode: "dark",
      extras: { code: "123" },
      pageId: "42",
      path: "/widget-allow",
      socialProvider: "google",
      success: true,
      userId: "user-7"
    });
  });

  it("turns verified provider data into the addStamp payload Cubid expects", async () => {
    const apiClient = createApiClientStub();
    const client = createCubidWeb2Client(apiClient as never);

    const stampData = client.sync.createProviderStampData("twitter", {
      email: "hello@cubid.me",
      sub: "twitter-sub",
      userName: "cubid_user"
    });

    expect(stampData).toEqual({
      email: "hello@cubid.me",
      identity: "cubid_user",
      sub: "twitter-sub",
      uniquevalue: "twitter-sub",
      userName: "cubid_user"
    });

    const persisted = await client.sync.verifiedStamp({
      pageId: 8,
      stampType: "twitter",
      userId: "user-3",
      verifiedData: {
        email: "hello@cubid.me",
        sub: "twitter-sub",
        userName: "cubid_user"
      }
    });

    expect(apiClient.addStamp).toHaveBeenCalledWith({
      pageId: 8,
      stampData,
      stampType: "twitter",
      userId: "user-3"
    });
    expect(persisted.stampData).toEqual(stampData);
  });
});
