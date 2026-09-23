// Location at a chosen granularity, decided before anything is asked of the
// device. The app hands the kit a way to read the device's position (it owns
// the permission prompt and the library: expo-location, the Geolocation API,
// whatever it uses); the kit only ever asks for the coarseness the app chose,
// and rounds what comes back so nothing finer leaves the device.

export type CubidLocationRequest = "none" | "rough" | "approximate" | "exact";
export type CubidLocationGranularity = Exclude<CubidLocationRequest, "none">;

export interface CubidCoordinates {
  lat: number;
  lng: number;
}

export interface CubidCollectedLocation extends CubidCoordinates {
  granularity: CubidLocationGranularity;
  /** How coarse the reading is, in metres, after rounding. */
  precisionMetres: number;
}

/**
 * What the app is asked to provide. `granularity` says how coarse a reading is
 * enough: "rough" needs no precise-location permission on either platform
 * (iOS "reduced accuracy", Android "coarse"), and the kit rounds the answer
 * anyway.
 */
export type CubidPositionReader = (granularity: CubidLocationGranularity) => Promise<CubidCoordinates | null>;

/** Decimal places kept per granularity: ~11 km, ~1.1 km, and as read. */
const DECIMALS: Record<CubidLocationGranularity, number | null> = { approximate: 2, exact: null, rough: 1 };
const METRES: Record<CubidLocationGranularity, number> = { approximate: 1_100, exact: 10, rough: 11_000 };

function round(value: number, decimals: number | null): number {
  if (decimals === null) {
    return value;
  }
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/** Coarsen a reading to the granularity asked for; never finer than the request. */
export function coarsen(coordinates: CubidCoordinates, granularity: CubidLocationGranularity): CubidCollectedLocation {
  if (!Number.isFinite(coordinates.lat) || !Number.isFinite(coordinates.lng)) {
    throw new Error("A location needs finite lat and lng.");
  }
  const decimals = DECIMALS[granularity];
  return {
    granularity,
    lat: round(coordinates.lat, decimals),
    lng: round(coordinates.lng, decimals),
    precisionMetres: METRES[granularity]
  };
}

/** Read the device at the requested granularity and coarsen it; null when the app could not or would not provide one. */
export async function collectLocation(read: CubidPositionReader, granularity: CubidLocationGranularity): Promise<CubidCollectedLocation | null> {
  const position = await read(granularity);
  return position ? coarsen(position, granularity) : null;
}
