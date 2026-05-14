import type {
  ClearPassVerifyUrlRequest,
  HostedSiwcAccountRequestActionRequest,
  HostedSiwcRequestDescriptor,
  HostedSiwcSigningRequestActionRequest,
  HostedVerificationUrlRequest
} from "./types";

const DEFAULT_PASSPORT_ORIGIN = "https://passport.cubid.me";
const HOSTED_SIWC_DECISIONS = new Set(["approve", "reject"]);

function normalizePassportOrigin(passportOrigin?: string): string {
  return (passportOrigin ?? DEFAULT_PASSPORT_ORIGIN).replace(/\/+$/, "");
}

function assertNonEmpty(value: number | string | undefined, fieldName: string): string {
  if (value === undefined || value === null || String(value).trim().length === 0) {
    throw new Error(`Cubid hosted verification requires ${fieldName}.`);
  }

  return String(value);
}

function assertHostedSiwcDecision(value: string): "approve" | "reject" {
  if (!HOSTED_SIWC_DECISIONS.has(value)) {
    throw new Error('Hosted SIWC actions require decision to be "approve" or "reject".');
  }

  return value as "approve" | "reject";
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

  if (request.stampToRender === "clearpass_verify") {
    const url = new URL("/verify/clearpass", passportOrigin);

    url.searchParams.set("uid", userId);
    url.searchParams.set("page_id", pageId);

    return url.toString();
  }

  const url = new URL("/allow", passportOrigin);

  url.searchParams.set("uid", userId);
  url.searchParams.set("page_id", pageId);
  url.searchParams.set("stamp_type", "phone");

  return url.toString();
}

export function buildClearPassVerifyUrl(request: ClearPassVerifyUrlRequest): string {
  const pageId = assertNonEmpty(request.pageId, "pageId");

  return buildHostedVerificationUrl({
    pageId,
    passportOrigin: request.passportOrigin,
    stampToRender: "clearpass_verify",
    userId: request.userId
  });
}

function buildHostedSiwcRequestDescriptor(
  passportOrigin: string,
  pathname: string,
  body: Record<string, string>
): HostedSiwcRequestDescriptor {
  return {
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "content-type": "application/json"
    },
    method: "POST",
    url: new URL(pathname, passportOrigin).toString()
  };
}

export function buildHostedSiwcAccountRequestAction(
  request: HostedSiwcAccountRequestActionRequest
): HostedSiwcRequestDescriptor {
  const passportOrigin = normalizePassportOrigin(request.passportOrigin);
  const accountRequestId = assertNonEmpty(request.accountRequestId, "accountRequestId");
  const decision = assertHostedSiwcDecision(request.decision);

  return buildHostedSiwcRequestDescriptor(
    passportOrigin,
    `/api/siwc/accounts/requests/${decision}`,
    { accountRequestId }
  );
}

export function buildHostedSiwcSigningRequestAction(
  request: HostedSiwcSigningRequestActionRequest
): HostedSiwcRequestDescriptor {
  const passportOrigin = normalizePassportOrigin(request.passportOrigin);
  const signingRequestId = assertNonEmpty(request.signingRequestId, "signingRequestId");
  const decision = assertHostedSiwcDecision(request.decision);

  return buildHostedSiwcRequestDescriptor(
    passportOrigin,
    `/api/siwc/signing/requests/${decision}`,
    { signingRequestId }
  );
}
