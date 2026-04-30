import type { HostedVerificationUrlRequest } from "./types";

const DEFAULT_PASSPORT_ORIGIN = "https://passport.cubid.me";

function normalizePassportOrigin(passportOrigin?: string): string {
  return (passportOrigin ?? DEFAULT_PASSPORT_ORIGIN).replace(/\/+$/, "");
}

function assertNonEmpty(value: number | string | undefined, fieldName: string): string {
  if (value === undefined || value === null || String(value).trim().length === 0) {
    throw new Error(`Cubid hosted verification requires ${fieldName}.`);
  }

  return String(value);
}

export function buildHostedVerificationUrl(request: HostedVerificationUrlRequest): string {
  const passportOrigin = normalizePassportOrigin(request.passportOrigin);
  const userId = assertNonEmpty(request.userId, "userId");

  if (request.stampToRender === "address") {
    const dappId = assertNonEmpty(request.dappId, "dappId");
    const url = new URL("/verify", passportOrigin);

    url.searchParams.set("dapp_id", dappId);
    url.searchParams.set("user_id", userId);
    url.searchParams.set("stamp_type", "address");

    return url.toString();
  }

  const pageId = assertNonEmpty(request.pageId, "pageId");
  const url = new URL("/allow", passportOrigin);

  url.searchParams.set("uid", userId);
  url.searchParams.set("page_id", pageId);
  url.searchParams.set("stamp_type", "phone");

  return url.toString();
}
