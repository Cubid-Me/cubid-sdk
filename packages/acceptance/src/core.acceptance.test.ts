import { describe, expect, it, vi } from "vitest";

import { createCubidApiClient } from "@cubid/core";

describe("@cubid/acceptance core consumer flow", () => {
  it("uses the published core entrypoint for a normalized score lookup", async () => {
    const fetchImpl = vi.fn(async (input: string | URL | Request) => {
      expect(new URL(String(input)).pathname).toBe("/api/v2/score/fetch_score");

      return new Response(
        JSON.stringify({
          cubid_score: 12,
          error: null,
          scoring_schema: 2
        }),
        {
          headers: {
            "content-type": "application/json",
            "x-request-id": "acceptance-score-1"
          },
          status: 200
        }
      );
    });

    const client = createCubidApiClient({
      apiKey: "acceptance-api-key",
      baseUrl: "https://passport.cubid.me",
      fetch: fetchImpl
    });

    const response = await client.fetchScore({ userId: "app-user-123" });

    expect(response.cubidScore).toBe(12);
    expect(response.scoringSchema).toBe(2);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
  });

  it("uses the published core entrypoint for Pay-To server helper flows", async () => {
    const calls: Array<{ body: Record<string, unknown>; headers: Headers; path: string }> = [];
    const fetchImpl = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const path = new URL(String(input)).pathname;
      calls.push({
        body: JSON.parse(String(init?.body)) as Record<string, unknown>,
        headers: new Headers(init?.headers),
        path
      });

      if (path.endsWith("/pay-to/stamps/eligibility/check")) {
        return new Response(
          JSON.stringify({
            data: {
              results: [{ candidateRef: "payee-1", eligible: false }],
              status: "resolution_unavailable"
            }
          }),
          { headers: { "content-type": "application/json" }, status: 200 }
        );
      }

      return new Response(
        JSON.stringify({
          data: {
            actionToken: "pta_act_123",
            actionType: "setup",
            hostedUrl: "/pay-to/actions/complete?action_token=pta_act_123",
            status: "pending"
          }
        }),
        { headers: { "content-type": "application/json" }, status: 200 }
      );
    });

    const client = createCubidApiClient({
      apiKey: "acceptance-api-key",
      baseUrl: "https://passport.cubid.me",
      dappId: "acceptance-dapp",
      fetch: fetchImpl
    });

    const eligibility = await client.checkPayToEligibility({
      candidates: [{ candidateRef: "payee-1", stampType: "email", value: "payee@example.com" }],
      dappUserUuid: "app-user-123"
    });
    const action = await client.startPayToAction({
      actionType: "setup",
      dappUserUuid: "app-user-123",
      idempotencyKey: "acceptance-pay-to-action"
    });

    expect(eligibility.status).toBe("resolution_unavailable");
    expect(eligibility.results[0]?.eligible).toBe(false);
    expect(action.hostedUrl).toBe("/pay-to/actions/complete?action_token=pta_act_123");
    expect(calls.map((call) => call.path)).toEqual([
      "/api/v3/pay-to/stamps/eligibility/check",
      "/api/v3/pay-to/actions/start"
    ]);
    expect(calls[0]?.body).toMatchObject({
      api_key: "acceptance-api-key",
      dapp_id: "acceptance-dapp",
      dapp_user_uuid: "app-user-123"
    });
    expect(calls[1]?.headers.get("Idempotency-Key")).toBe("acceptance-pay-to-action");
  });
});
