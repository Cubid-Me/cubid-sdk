import { ReferenceClientError } from "../transport";
import type { ReferenceClient } from "../transport";

export interface SecureStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}
export interface NativePorts {
  storage: SecureStorage;
  client: ReferenceClient;
  randomVerifier(): Promise<string>;
  challenge(verifier: string): Promise<string>;
  openBrowser(url: string, callback: string): Promise<{ type: "success"; url: string } | { type: "cancel" | "dismiss" }>;
  dismissBrowser(): Promise<void>;
}
interface Configuration { issuer: string; clientId: string; callback: string; storagePrefix: string }
interface Pending { version: 1; kind: "login" | "step_up"; transactionId: string; verifier: string; expiresAt: number }
interface SavedSession { version: 1; credential: string; expiresAt: number }
export type Message = "signed_out" | "signed_in" | "restored" | "working" | "awaiting_callback" | "cancelled" | "denied" | "confirmed" | "unavailable" | "storage_error";
export interface NativeSnapshot { signedIn: boolean; busy: boolean; pending: boolean; message: Message }
const opaque = (value: unknown): value is string => typeof value === "string" && /^[A-Za-z0-9_-]{43}$/u.test(value);
const now = () => Math.floor(Date.now() / 1000);
// A new React mount can use a new storage-adapter object for the same native keys.
// Keep ordering/ownership by profile namespace, including writes already in flight.
const storageProfiles = new Map<string, { tail: Promise<void>; owner: symbol }>();
function parseSaved<T>(text: string | null, keys: string[], validate: (value: Record<string, unknown>) => boolean): T | null {
  if (text === null) return null;
  if (text.length > 1024) throw new Error("storage_error");
  let value: unknown;
  try { value = JSON.parse(text); } catch { throw new Error("storage_error"); }
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("storage_error");
  const row = value as Record<string, unknown>;
  if (Object.keys(row).length !== keys.length || keys.some((key) => !Object.hasOwn(row, key)) || row.version !== 1 || !validate(row)) throw new Error("storage_error");
  return row as T;
}

/** Native lifecycle coordinator. Observable state contains no credential, callback, nonce or token. */
export function createNativeController(ports: NativePorts, config: Configuration) {
  const owner = Symbol("native-reference-owner");
  const profile = storageProfiles.get(config.storagePrefix) ?? { tail: Promise.resolve(), owner };
  profile.owner = owner;
  storageProfiles.set(config.storagePrefix, profile);
  const credentialKey = `${config.storagePrefix}.session`;
  const pendingKey = `${config.storagePrefix}.pending`;
  const callbackBase = new URL(config.callback);
  const issuer = new URL(config.issuer);
  if (issuer.protocol !== "https:" || issuer.username || issuer.password || issuer.search || issuer.hash || config.callback.includes("#") || callbackBase.search || callbackBase.hash || callbackBase.username || callbackBase.password ||
      ["https:", "http:", "javascript:", "data:"].includes(callbackBase.protocol)) throw new Error("invalid_configuration");
  let credential: string | null = null;
  let verified = false;
  let acceptedExpiry = 0;
  let expiryTimer: ReturnType<typeof setTimeout> | null = null;
  let pending: Pending | null = null;
  let active = false;
  let disposed = false;
  let generation = 0;
  const queuedUrls: string[] = [];
  let cancellation: Promise<void> | null = null;
  let snapshot: NativeSnapshot = { signedIn: false, busy: false, pending: false, message: "signed_out" };
  const listeners = new Set<() => void>();
  const enqueue = <T>(run: () => Promise<T>): Promise<T> => {
    const work = profile.tail.then(async () => { try { return await run(); } catch { throw new Error("storage_error"); } });
    profile.tail = work.then(() => {}, () => {});
    return work;
  };
  const current = (own: number) => !disposed && profile.owner === owner && own === generation;
  const clearExpiry = () => { if (expiryTimer !== null) clearTimeout(expiryTimer); expiryTimer = null; acceptedExpiry = 0; };
  const checkExpiry = () => {
    if (disposed || profile.owner !== owner || !verified || acceptedExpiry > now()) return false;
    const expired = credential; credential = null; verified = false; clearExpiry();
    if (expired) void removeMatching(credentialKey, "credential", expired).catch(() => {});
    return true;
  };
  const publish = (message: Message) => {
    if (disposed || profile.owner !== owner) return;
    if (checkExpiry()) message = "signed_out";
    snapshot = Object.freeze({ signedIn: verified, busy: active, pending: pending !== null, message });
    for (const listener of listeners) listener();
  };
  const acceptExpiry = (expiresAt: number) => {
    clearExpiry(); acceptedExpiry = expiresAt; verified = true;
    const schedule = () => {
      expiryTimer = setTimeout(() => {
        if (disposed || profile.owner !== owner || !verified || acceptedExpiry !== expiresAt) return;
        if (checkExpiry()) publish("signed_out"); else schedule();
      }, Math.max(1, Math.min(2147483647, acceptedExpiry * 1000 - Date.now())));
      // Native timers are numbers; Node's source-test timer should not keep a worker alive.
      (expiryTimer as ReturnType<typeof setTimeout> & { unref?: () => void }).unref?.();
    };
    schedule();
  };
  const removeMatching = (key: string, field: "credential" | "transactionId", expected: string) => enqueue(async () => {
    const text = await ports.storage.getItem(key);
    if (text !== null) {
      let value: Record<string, unknown>;
      try { value = JSON.parse(text); } catch { return; }
      if (value?.[field] === expected) await ports.storage.removeItem(key);
    }
  });
  const forget = async (ceremony: Pending) => {
    if (pending?.transactionId === ceremony.transactionId) pending = null;
    await removeMatching(pendingKey, "transactionId", ceremony.transactionId);
  };
  const cancelServer = async (ceremony: Pending, ownerCredential: string | null) => {
    try {
      if (ceremony.kind === "login") await ports.client.cancelLogin(ceremony.transactionId, ceremony.verifier);
      else if (ownerCredential) await ports.client.cancelDemoAction(ownerCredential, ceremony.transactionId, ceremony.verifier);
    } catch { /* Local cancellation remains effective; server transaction expires. */ }
  };
  const revoke = async (value: string) => { try { await ports.client.logout(value); } catch { /* bounded backend session expires */ } };
  const callbackState = (url: string): string | null => {
    try {
      if (url.length > 8192 || url.includes("#")) return null;
      const actual = new URL(url);
      if (actual.hash || actual.protocol !== callbackBase.protocol || actual.host !== callbackBase.host || actual.pathname !== callbackBase.pathname || actual.username || actual.password) return null;
      for (const key of ["state", "code", "error", "iss"]) if (actual.searchParams.getAll(key).length > 1) return null;
      return opaque(actual.searchParams.get("state")) &&
        (actual.searchParams.has("code") !== actual.searchParams.has("error")) &&
        Boolean(actual.searchParams.get("code") || actual.searchParams.get("error")) &&
        (!actual.searchParams.has("iss") || actual.searchParams.get("iss") === config.issuer) ? actual.searchParams.get("state") : null;
    } catch { return null; }
  };
  const matches = (url: string, ceremony: Pending) => callbackState(url) === ceremony.transactionId;
  const validRequest = (request: Awaited<ReturnType<ReferenceClient["startLogin"]>>) => {
    const url = new URL(request.authorizationUrl);
    for (const key of ["state", "redirect_uri", "client_id", "response_type", "scope", "code_challenge", "code_challenge_method", "nonce", "acr_values"]) {
      if (url.searchParams.getAll(key).length !== 1) throw new ReferenceClientError("invalid_request");
    }
    if (!opaque(request.transactionId) || request.expiresAt <= now() || url.origin !== issuer.origin || url.username || url.password || url.hash ||
        url.searchParams.get("state") !== request.transactionId || url.searchParams.get("client_id") !== config.clientId ||
        url.searchParams.get("response_type") !== "code" || url.searchParams.get("scope") !== "openid" || url.searchParams.get("acr_values") !== "urn:cubid:acr:passkey" ||
        url.searchParams.get("redirect_uri") !== config.callback || url.searchParams.get("code_challenge_method") !== "S256" || !opaque(url.searchParams.get("code_challenge")) || !url.searchParams.get("nonce")) throw new ReferenceClientError("invalid_request");
  };
  const storeCredential = async (saved: SavedSession, own: number) => {
    await enqueue(async () => {
      const rollback = async () => {
        try {
          const text = await ports.storage.getItem(credentialKey);
          if (text && JSON.parse(text)?.credential === saved.credential) await ports.storage.removeItem(credentialKey);
        } finally { await revoke(saved.credential); }
      };
      if (!current(own)) { await revoke(saved.credential); return; }
      const displaced = credential !== saved.credential ? credential : null;
      try { await ports.storage.setItem(credentialKey, JSON.stringify(saved)); }
      catch { await rollback(); throw new Error("storage_error"); }
      if (!current(own)) { await rollback(); return; }
      if (displaced) await revoke(displaced);
      if (!current(own)) { await rollback(); return; }
      if (saved.expiresAt <= now()) { await rollback(); throw new ReferenceClientError("unauthorized"); }
      // Commit while the same owner still holds the barrier. A new mount can restore it afterwards.
      credential = saved.credential;
      acceptExpiry(saved.expiresAt);
    });
  };
  const finish = async (ceremony: Pending, callbackUrl: string, own: number) => {
    if (!matches(callbackUrl, ceremony) || !current(own)) return false;
    let issuedCredential: string | null = null;
    let cleared = false;
    try {
      const input = { transactionId: ceremony.transactionId, deviceVerifier: ceremony.verifier, callbackUrl };
      if (ceremony.kind === "login") {
        const result = await ports.client.completeLogin(input);
        if (result.status === "authenticated") {
          if (!opaque(result.credential) || result.expiresAt <= now()) throw new ReferenceClientError("invalid_request");
          issuedCredential = result.credential;
          await forget(ceremony); cleared = true;
          issuedCredential = null; // storeCredential owns stale/failure revocation from here.
          await storeCredential({ version: 1, credential: result.credential, expiresAt: result.expiresAt }, own);
          if (current(own)) publish("signed_in");
        } else if (current(own)) publish("denied");
      } else {
        checkExpiry();
        if (!credential || !verified) throw new ReferenceClientError("unauthorized");
        const ownerCredential = credential;
        const result = await ports.client.completeDemoAction(ownerCredential, input);
        if (current(own)) {
          checkExpiry();
          if (!verified || credential !== ownerCredential) throw new ReferenceClientError("unauthorized");
          publish(result.status === "confirmed" ? "confirmed" : "denied");
        }
      }
    } catch (error) {
      if (issuedCredential) await revoke(issuedCredential);
      throw error;
    } finally { if (!cleared) await forget(ceremony); }
    return true;
  };
  const errorMessage = (error: unknown): Message => error instanceof Error && error.message === "storage_error" ? "storage_error" : "unavailable";
  const reportFailure = async (error: unknown, own: number) => {
    if (!current(own)) return;
    if (error instanceof ReferenceClientError && error.code === "unauthorized") {
      const old = credential; credential = null; verified = false; clearExpiry();
      try { if (old) await removeMatching(credentialKey, "credential", old); }
      catch { if (current(own)) publish("storage_error"); return; }
      if (current(own)) publish("signed_out");
    } else publish(errorMessage(error));
  };
  const drain = () => {
    if (!active && !disposed) {
      const url = pending ? queuedUrls.find((candidate) => matches(candidate, pending!)) : undefined;
      queuedUrls.length = 0;
      if (url) void handleIncoming(url);
    }
  };
  async function handleIncoming(url: string) {
    if (disposed) return false;
    if (active) {
      // Bound untrusted arrivals, retain earlier candidates, and select by restored state.
      if (callbackState(url) && (!pending || matches(url, pending)) && queuedUrls.length < 16 && !queuedUrls.includes(url)) queuedUrls.push(url);
      return false;
    }
    const ceremony = pending;
    if (!ceremony || !matches(url, ceremony)) return false;
    const own = ++generation;
    active = true; publish("working");
    try { return await finish(ceremony, url, own); }
    catch (error) { await reportFailure(error, own); return false; }
    finally { if (current(own)) { active = false; publish(snapshot.message); drain(); } }
  }
  function cancel(): Promise<void> {
    if (disposed || profile.owner !== owner) return Promise.resolve();
    if (cancellation) return cancellation;
    const ceremony = pending; const ownerCredential = credential; const own = ++generation;
    active = true; pending = null; queuedUrls.length = 0; publish("working");
    const cleanup = enqueue(async () => {
      let recovered = ceremony; let storageFailed = false;
      try {
        const text = await ports.storage.getItem(pendingKey);
        let stored: Pending | null = null;
        try { stored = parseSaved<Pending>(text, ["version", "kind", "transactionId", "verifier", "expiresAt"], (v) => (v.kind === "login" || v.kind === "step_up") && opaque(v.transactionId) && opaque(v.verifier) && Number.isSafeInteger(v.expiresAt)); } catch { /* Clear corrupt proof without forwarding it. */ }
        recovered ??= stored;
        if (!ceremony || stored?.transactionId === ceremony.transactionId) await ports.storage.removeItem(pendingKey);
      } catch { storageFailed = true; }
      // Keep cancellation ahead of a replacement mount, independently of storage failure.
      let cancellationCredential = ownerCredential;
      if (recovered?.kind === "step_up" && !cancellationCredential) {
        try {
          cancellationCredential = parseSaved<SavedSession>(await ports.storage.getItem(credentialKey), ["version", "credential", "expiresAt"], (v) => opaque(v.credential) && Number.isSafeInteger(v.expiresAt))?.credential ?? null;
        } catch { storageFailed = true; }
      }
      if (recovered) await cancelServer(recovered, cancellationCredential);
      return storageFailed;
    });
    cancellation = (async () => {
      let message: Message = "cancelled";
      const dismissal = ports.dismissBrowser().catch(() => {});
      try {
        const storageFailed = await cleanup.finally(() => dismissal);
        if (storageFailed) message = "storage_error";
      } catch { message = "storage_error"; }
      finally { if (current(own)) { active = false; publish(message); } cancellation = null; }
    })();
    return cancellation;
  }
  async function start(kind: Pending["kind"]) {
    if (checkExpiry()) publish("signed_out");
    if (disposed || active) return;
    if (pending) await cancel();
    if (disposed || active || (kind === "step_up" && (!verified || !credential)) || (kind === "login" && verified)) return;
    const own = ++generation;
    const ownerCredential = credential;
    active = true; publish("working");
    let ceremony: Pending | null = null;
    try {
      const verifier = await ports.randomVerifier();
      if (!opaque(verifier)) throw new ReferenceClientError("invalid_request");
      const challenge = await ports.challenge(verifier);
      if (!current(own)) return;
      const request = kind === "login" ? await ports.client.startLogin(challenge) : await ports.client.startDemoAction(ownerCredential!, challenge);
      ceremony = { version: 1, kind, transactionId: request.transactionId, verifier, expiresAt: request.expiresAt };
      validRequest(request);
      if (!current(own)) { await cancelServer(ceremony, ownerCredential); return; }
      pending = ceremony;
      await enqueue(async () => { if (current(own)) await ports.storage.setItem(pendingKey, JSON.stringify(ceremony)); });
      if (!current(own)) return;
      const result = await ports.openBrowser(request.authorizationUrl, config.callback);
      if (!current(own)) return;
      if (result.type !== "success") { await cancel(); return; }
      if (!await finish(ceremony, result.url, own)) publish("awaiting_callback");
    } catch (error) {
      if (ceremony) { await cancelServer(ceremony, ownerCredential); await forget(ceremony).catch(() => {}); }
      await reportFailure(error, own);
    } finally { if (current(own)) { active = false; publish(snapshot.message); drain(); } }
  }
  return {
    getSnapshot: () => { if (checkExpiry()) publish("signed_out"); return snapshot; },
    checkExpiry: () => { if (checkExpiry()) publish("signed_out"); },
    subscribe(listener: () => void) { listeners.add(listener); return () => { listeners.delete(listener); }; },
    signIn: () => start("login"),
    confirmDemoAction: () => start("step_up"),
    handleIncoming, cancel,
    async initialize(initialUrl: string | null = null) {
      if (disposed || active) return;
      const own = ++generation;
      active = true; publish("working");
      try {
        const saved = parseSaved<SavedSession>(await enqueue(() => ports.storage.getItem(credentialKey)), ["version", "credential", "expiresAt"], (v) => opaque(v.credential) && Number.isSafeInteger(v.expiresAt));
        if (!current(own)) return;
        credential = saved?.credential ?? null;
        verified = false; clearExpiry();
        if (saved) {
          try {
            if (saved.expiresAt <= now()) throw new ReferenceClientError("unauthorized");
            const response = await ports.client.session(saved.credential);
            if (response.expiresAt <= now()) throw new ReferenceClientError("unauthorized");
            if (!current(own)) return;
            acceptExpiry(Math.min(saved.expiresAt, response.expiresAt));
          } catch (error) {
            if (!(error instanceof ReferenceClientError) || error.code !== "unauthorized") throw error;
            await removeMatching(credentialKey, "credential", saved.credential);
            if (!current(own)) return;
            credential = null;
          }
        }
        pending = parseSaved<Pending>(await enqueue(() => ports.storage.getItem(pendingKey)), ["version", "kind", "transactionId", "verifier", "expiresAt"], (v) => (v.kind === "login" || v.kind === "step_up") && opaque(v.transactionId) && opaque(v.verifier) && Number.isSafeInteger(v.expiresAt));
        if (!current(own)) return;
        if (pending && (pending.expiresAt <= now() || (pending.kind === "step_up" && !verified))) {
          const stale = pending; await forget(stale); await cancelServer(stale, credential);
        }
        if (pending && initialUrl && matches(initialUrl, pending)) await finish(pending, initialUrl, own);
        else publish(pending ? "awaiting_callback" : verified ? "restored" : "signed_out");
      } catch (error) { if (current(own)) publish(errorMessage(error)); }
      finally { if (current(own)) { active = false; publish(snapshot.message); drain(); } }
    },
    async logout() {
      if (disposed || profile.owner !== owner) return;
      let oldCredential = credential;
      await cancel();
      if (disposed || profile.owner !== owner) return;
      const own = ++generation;
      credential = null; verified = false; clearExpiry(); active = true; publish("working");
      try {
        const outcome = await enqueue(async () => {
          let storageFailed = false; let revocationFailed = false;
          try {
            const text = await ports.storage.getItem(credentialKey);
            if (!oldCredential) {
              try { oldCredential = parseSaved<SavedSession>(text, ["version", "credential", "expiresAt"], (v) => opaque(v.credential) && Number.isSafeInteger(v.expiresAt))?.credential ?? null; } catch { /* Never trust corrupt storage as proof. */ }
            }
            await ports.storage.removeItem(credentialKey);
          } catch { storageFailed = true; }
          // Independent of local storage success; hold the barrier through the revocation attempt.
          if (oldCredential) { try { await ports.client.logout(oldCredential); } catch { revocationFailed = true; } }
          return { storageFailed, revocationFailed };
        });
        if (current(own)) publish(outcome.storageFailed ? "storage_error" : outcome.revocationFailed ? "unavailable" : "signed_out");
      } catch { if (current(own)) publish("unavailable"); }
      finally { if (current(own)) { active = false; publish(snapshot.message); } }
    },
    dispose() { disposed = true; ++generation; clearExpiry(); queuedUrls.length = 0; listeners.clear(); }, // Preserve pending proof for a real cold-launch callback.
  };
}
