export type CubidCommsFetch = (
  input: string | URL | Request,
  init?: RequestInit
) => Promise<Response>;

export type CubidCommsErrorCategory =
  | "auth"
  | "config"
  | "network"
  | "parse"
  | "unknown"
  | "upstream"
  | "validation";

export interface CubidCommsErrorInput {
  category: CubidCommsErrorCategory;
  code?: string | null;
  cause?: unknown;
  message: string;
  raw?: unknown;
  requestId?: string | null;
  status?: number | null;
}

export class CubidCommsError extends Error {
  readonly category: CubidCommsErrorCategory;
  readonly code: string | null;
  readonly raw: unknown;
  readonly requestId: string | null;
  readonly status: number | null;

  constructor(input: CubidCommsErrorInput) {
    super(input.message, input.cause ? { cause: input.cause } : undefined);
    this.name = "CubidCommsError";
    this.category = input.category;
    this.code = input.code ?? null;
    this.raw = input.raw ?? null;
    this.requestId = input.requestId ?? null;
    this.status = input.status ?? null;
  }
}

export interface CubidCommsClientOptions {
  /**
   * Passport origin, for example `https://id.cubid.me`.
   */
  baseUrl: string | URL;
  /**
   * Passport-user bearer token. This is a signed-in user credential, not a
   * Cubid dapp API key.
   */
  accessToken: string;
  /**
   * Optional fetch implementation for tests or custom runtimes.
   */
  fetch?: CubidCommsFetch;
  /**
   * Optional caller-owned headers for tracing or instrumentation.
   */
  headers?: HeadersInit;
}

export interface ResolvedCubidCommsClientOptions {
  accessToken: string;
  baseUrl: string;
  headers: Headers;
}

export interface CubidCommsClient {
  readonly config: Readonly<ResolvedCubidCommsClientOptions>;
}

function assertNonEmptyString(
  value: string,
  fieldName: string,
  endpoint: string
): string {
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    throw new CubidCommsError({
      category: "validation",
      code: "INVALID_ARGUMENT",
      message: `Cubid comms requires ${fieldName} for ${endpoint}.`,
    });
  }

  return trimmed;
}

function normalizeBaseUrl(baseUrl: string | URL): string {
  const resolved = typeof baseUrl === "string" ? baseUrl : baseUrl.toString();
  const trimmed = assertNonEmptyString(resolved, "baseUrl", "comms-client");

  try {
    const parsed = new URL(trimmed);
    parsed.pathname = parsed.pathname.replace(/\/+$/u, "");
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString().replace(/\/+$/u, "");
  } catch (error) {
    throw new CubidCommsError({
      category: "config",
      code: "INVALID_BASE_URL",
      cause: error,
      message: "Cubid comms requires a valid Passport baseUrl.",
      raw: trimmed,
    });
  }
}

export function createCubidCommsClient(
  options: CubidCommsClientOptions
): CubidCommsClient {
  const accessToken = assertNonEmptyString(
    options.accessToken,
    "accessToken",
    "comms-client"
  );
  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const headers = new Headers(options.headers);

  return {
    config: Object.freeze({
      accessToken,
      baseUrl,
      headers,
    }),
  };
}
