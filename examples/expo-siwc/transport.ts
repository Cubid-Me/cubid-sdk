import type { createReferenceBackend } from "./backend";

export type ReferenceClient = Awaited<ReturnType<typeof createReferenceBackend>>;
/** Adapter must enforce redirect:error/credentials:omit and supply a bounded-readable stream (Expo fetch on native). */
export type ReferenceFetch = (url: string, init: RequestInit) => Promise<Pick<Response, "ok" | "headers" | "body">>;
type Operation = keyof ReferenceClient;
type Reply<K extends Operation> = Awaited<ReturnType<ReferenceClient[K]>>;
const operations = ["startLogin", "completeLogin", "cancelLogin", "session", "logout", "startDemoAction", "completeDemoAction", "cancelDemoAction"] as const;
const errorCodes = ["invalid_request", "invalid_transaction", "unauthorized", "authentication_failed", "capacity", "unavailable"] as const;
export type ClientErrorCode = typeof errorCodes[number];
export class ReferenceClientError extends Error {
  constructor(readonly code: ClientErrorCode) { super(code); this.name = "ReferenceClientError"; }
}
const invalid = () => new ReferenceClientError("invalid_request");
function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw invalid();
  return value as Record<string, unknown>;
}
function exact(value: Record<string, unknown>, keys: string[]) {
  if (Object.keys(value).length !== keys.length || keys.some((key) => !Object.hasOwn(value, key))) throw invalid();
}
function strings(value: Record<string, unknown>, keys: string[]) {
  exact(value, keys);
  if (keys.some((key) => typeof value[key] !== "string" || !(value[key] as string).length)) throw invalid();
}
const expiry = (value: unknown) => Number.isSafeInteger(value) && (value as number) > 0;
const credentialPattern = /^[A-Za-z0-9_-]{43}$/u;
const authenticated = (operation: Operation) => !["startLogin", "completeLogin", "cancelLogin"].includes(operation);
function baseOrigin(input: string) {
  const url = new URL(input);
  const loopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if ((url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) ||
      url.pathname !== "/" || url.search || url.hash || url.username || url.password) throw invalid();
  return url.origin;
}
async function readJson(body: ReadableStream<Uint8Array> | null) {
  if (!body || typeof body.getReader !== "function") throw invalid();
  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) { await reader.cancel(); throw invalid(); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return record(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
}
function decodeReply<K extends Operation>(operation: K, payload: unknown): Reply<K> {
  const value = record(payload);
  if (operation === "startLogin" || operation === "startDemoAction") {
    exact(value, ["transactionId", "authorizationUrl", "expiresAt"]);
    if (typeof value.transactionId !== "string" || !credentialPattern.test(value.transactionId) || typeof value.authorizationUrl !== "string" || value.authorizationUrl.length > 8192 || !expiry(value.expiresAt)) throw invalid();
  } else if (operation === "completeLogin" && value.status === "authenticated") {
    exact(value, ["status", "credential", "expiresAt"]);
    if (typeof value.credential !== "string" || !credentialPattern.test(value.credential) || !expiry(value.expiresAt)) throw invalid();
  } else if (operation === "session") {
    exact(value, ["status", "expiresAt"]);
    if (value.status !== "authenticated" || !expiry(value.expiresAt)) throw invalid();
  } else if (operation === "completeDemoAction" && value.status === "confirmed") {
    exact(value, ["status", "action"]);
    if (value.action !== "no_op") throw invalid();
  } else if (operation === "completeDemoAction" || operation === "completeLogin") {
    exact(value, ["status"]);
    if (value.status !== "denied") throw invalid();
  } else {
    exact(value, ["ok"]);
    if (value.ok !== true) throw invalid();
    return undefined as Reply<K>;
  }
  return value as Reply<K>;
}

/** Native-safe RPC client. No cookie jar, query credentials, redirects or response passthrough. */
export function createHttpReferenceClient(origin: string, fetchImpl: ReferenceFetch): ReferenceClient {
  const base = baseOrigin(origin);
  async function call<K extends Operation>(operation: K, body: object, credential?: string): Promise<Reply<K>> {
    try {
      if (credential !== undefined && !credentialPattern.test(credential)) throw invalid();
      const response = await fetchImpl(`${base}/reference/${operation}`, {
        method: "POST", redirect: "error", credentials: "omit", cache: "no-store",
        headers: { "content-type": "application/json", "cache-control": "no-store", ...(credential ? { authorization: `Bearer ${credential}` } : {}) }, body: JSON.stringify(body),
      });
      if (response.headers.get("content-type")?.split(";")[0] !== "application/json") throw invalid();
      const payload = await readJson(response.body);
      if (!response.ok) {
        exact(payload, ["error"]);
        if (!errorCodes.includes(payload.error as ClientErrorCode)) throw invalid();
        throw new ReferenceClientError(payload.error as ClientErrorCode);
      }
      return decodeReply(operation, payload);
    } catch (error) {
      if (error instanceof ReferenceClientError) throw error;
      throw new ReferenceClientError("unavailable");
    }
  }
  return {
    startLogin: (deviceChallenge) => call("startLogin", { deviceChallenge }),
    completeLogin: (input) => call("completeLogin", input),
    cancelLogin: (transactionId, deviceVerifier) => call("cancelLogin", { transactionId, deviceVerifier }),
    session: (credential) => call("session", {}, credential),
    logout: (credential) => call("logout", {}, credential),
    startDemoAction: (credential, deviceChallenge) => call("startDemoAction", { deviceChallenge }, credential),
    completeDemoAction: (credential, input) => call("completeDemoAction", input, credential),
    cancelDemoAction: (credential, transactionId, deviceVerifier) => call("cancelDemoAction", { transactionId, deviceVerifier }, credential),
  };
}

/** In-process development adapter only. Does not bind/listen on a network interface. */
export function createReferenceHandler(backend: ReferenceClient, origin: string) {
  const base = baseOrigin(origin);
  const json = (body: object, status = 200) => Response.json(body, { status, headers: { "cache-control": "no-store" } });
  return async (request: Request): Promise<Response> => {
    try {
      const url = new URL(request.url);
      const operation = url.pathname.replace(/^\/reference\//u, "") as Operation;
      if (url.origin !== base || url.pathname !== `/reference/${operation}` || url.search || url.hash ||
          !operations.includes(operation) || request.method !== "POST" || request.headers.get("content-type")?.split(";")[0] !== "application/json" ||
          (request.headers.has("origin") && request.headers.get("origin") !== base) || request.headers.get("sec-fetch-site") === "cross-site") throw invalid();
      const payload = await readJson(request.body);
      const authorization = request.headers.get("authorization");
      const credential = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
      if (authenticated(operation) && !credentialPattern.test(credential)) throw new ReferenceClientError("unauthorized");
      let result: unknown;
      if (operation === "startLogin" || operation === "startDemoAction") {
        strings(payload, ["deviceChallenge"]);
        result = operation === "startLogin" ? await backend.startLogin(payload.deviceChallenge as string) : await backend.startDemoAction(credential, payload.deviceChallenge as string);
      } else if (operation === "completeLogin" || operation === "completeDemoAction") {
        strings(payload, ["transactionId", "deviceVerifier", "callbackUrl"]);
        const input = payload as { transactionId: string; deviceVerifier: string; callbackUrl: string };
        result = operation === "completeLogin" ? await backend.completeLogin(input) : await backend.completeDemoAction(credential, input);
      } else if (operation === "cancelLogin" || operation === "cancelDemoAction") {
        strings(payload, ["transactionId", "deviceVerifier"]);
        if (operation === "cancelLogin") await backend.cancelLogin(payload.transactionId as string, payload.deviceVerifier as string);
        else await backend.cancelDemoAction(credential, payload.transactionId as string, payload.deviceVerifier as string);
      } else {
        exact(payload, []);
        if (operation === "session") result = await backend.session(credential);
        else await backend.logout(credential);
      }
      // Validate/whitelist success output too; never forward an accidental private field.
      const output = result === undefined ? { ok: true } : decodeReply(operation, result);
      return json(output as object);
    } catch (error) {
      const rawCode = error && typeof error === "object" && "code" in error ? error.code : null;
      const code = errorCodes.includes(rawCode as ClientErrorCode) ? rawCode as ClientErrorCode : "authentication_failed";
      return json({ error: code }, code === "unauthorized" ? 401 : code === "capacity" ? 429 : 400);
    }
  };
}
