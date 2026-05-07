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
});
