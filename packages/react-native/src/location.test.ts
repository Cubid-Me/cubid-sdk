import { describe, expect, it, vi } from "vitest";

import { coarsen, collectLocation } from "./location";

describe("location granularity", () => {
  it("rounds to the granularity asked for, never finer", () => {
    const exact = { lat: 59.334591, lng: 18.06324 };
    expect(coarsen(exact, "rough")).toEqual({ granularity: "rough", lat: 59.3, lng: 18.1, precisionMetres: 11_000 });
    expect(coarsen(exact, "approximate")).toEqual({ granularity: "approximate", lat: 59.33, lng: 18.06, precisionMetres: 1_100 });
    expect(coarsen(exact, "exact")).toMatchObject({ granularity: "exact", lat: 59.334591, lng: 18.06324 });
    expect(() => coarsen({ lat: Number.NaN, lng: 0 }, "rough")).toThrow(/finite/);
  });

  it("asks the app for the granularity chosen and coarsens what comes back", async () => {
    const read = vi.fn(async () => ({ lat: 51.507351, lng: -0.127758 }));
    expect(await collectLocation(read, "rough")).toEqual({ granularity: "rough", lat: 51.5, lng: -0.1, precisionMetres: 11_000 });
    expect(read).toHaveBeenCalledWith("rough");
    expect(await collectLocation(async () => null, "exact")).toBeNull();
  });
});
