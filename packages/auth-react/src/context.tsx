"use client";

import {
  assertCubidAuthorizationState,
  buildCubidAuthorizationUrl,
  buildCubidLogoutUrl,
  CUBID_DEFAULT_OIDC_SCOPES,
  CUBID_AUTH_SESSION_STORAGE_KEY,
  createCubidAuthNonce,
  createCubidAuthSession,
  createCubidAuthState,
  createCubidPkcePair,
  decodeCubidIdTokenClaims,
  exchangeCubidAuthorizationCode,
  fetchCubidOidcDiscoveryDocument,
  fetchCubidUserInfo,
  getCubidAuthAssurance,
  isCubidAuthSessionExpired,
  parseCubidAuthSession,
  serializeCubidAuthSession,
  parseCubidAuthorizationCallback,
  CubidAuthError,
  validateCubidIdToken,
  type BuildCubidAuthorizationUrlInput,
  type CubidAuthAssurance,
  type CubidAuthFetch,
  type CubidAuthCrypto,
  type CubidAuthSession,
  type CubidAuthStorageLike,
  type CubidIdTokenClaims,
  type CubidOidcDiscoveryDocument,
  type CubidUserInfo,
} from "@cubid/auth";
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

export const CUBID_AUTH_TRANSACTION_STORAGE_KEY = "cubid.auth.transaction";

export type CubidAuthStatus =
  | "authenticated"
  | "error"
  | "idle"
  | "loading"
  | "signed_out";

interface CubidAuthTransaction {
  clientId: string;
  codeVerifier: string;
  issuer: string;
  nonce: string;
  redirectUri: string;
  scope: string[];
  state: string;
}

export interface CubidAuthSignInOptions {
  acrValues?: BuildCubidAuthorizationUrlInput["acrValues"];
  extraParams?: BuildCubidAuthorizationUrlInput["extraParams"];
  loginHint?: string;
  maxAge?: number;
  navigate?: (url: string) => void;
  nonceByteLength?: number;
  nonce?: string;
  performRedirect?: boolean;
  prompt?: string;
  provider?: BuildCubidAuthorizationUrlInput["provider"];
  requirePasskey?: boolean;
  scope?: readonly string[] | string;
  stateByteLength?: number;
  verifierByteLength?: number;
}

export interface CubidAuthHandleCallbackOptions {
  autoUserInfo?: boolean;
  callbackUrl?: string | URL;
}

export interface CubidAuthLogoutOptions {
  extraParams?: Record<string, boolean | number | string | undefined>;
  navigate?: (url: string) => void;
  performRedirect?: boolean;
  postLogoutRedirectUri?: string;
  state?: string;
}

/** Provider storage accepts synchronous browser stores and asynchronous native adapters.
 * Core @cubid/auth storage helpers remain synchronous.
 */
export interface CubidAuthProviderStorage {
  getItem: (key: string) => string | null | Promise<string | null>;
  setItem: (key: string, value: string) => void | Promise<void>;
  removeItem: (key: string) => void | Promise<void>;
}

export interface CubidAuthProviderProps {
  crypto?: CubidAuthCrypto;
  autoUserInfo?: boolean;
  children: ReactNode;
  clientId: string;
  discoveryDocument?: CubidOidcDiscoveryDocument | null;
  fetch?: CubidAuthFetch;
  issuer: string;
  postLogoutRedirectUri?: string;
  redirectUri: string;
  requirePasskey?: boolean;
  scope?: readonly string[] | string;
  storage?: CubidAuthProviderStorage | null;
}

export interface CubidAuthContextValue {
  assurance: CubidAuthAssurance;
  clearError: () => void;
  /** Clears memory immediately; await persistence completion and handle storage errors. */
  clearSession: () => Promise<void>;
  discovery: CubidOidcDiscoveryDocument | null;
  error: Error | null;
  handleCallback: (options?: CubidAuthHandleCallbackOptions) => Promise<CubidAuthSession>;
  hasPasskeyAssurance: boolean;
  isAuthenticated: boolean;
  logout: (options?: CubidAuthLogoutOptions) => Promise<string | null>;
  refreshUserInfo: () => Promise<CubidUserInfo | null>;
  session: CubidAuthSession | null;
  signIn: (options?: CubidAuthSignInOptions) => Promise<string>;
  status: CubidAuthStatus;
}

interface OwnedState<T> {
  owner: object;
  value: T;
}

// Stable adapters share transient serialization even across provider remounts.
const storageMutations = new WeakMap<CubidAuthProviderStorage, Promise<void>>();
const CubidAuthContext = createContext<CubidAuthContextValue | null>(null);

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error("Cubid auth failed with a non-Error value.");
}

function normalizeScope(scope: readonly string[] | string | undefined): string[] {
  if (typeof scope === "undefined") {
    return [...CUBID_DEFAULT_OIDC_SCOPES];
  }

  if (Array.isArray(scope)) {
    return scope.map((value) => value.trim()).filter((value) => value.length > 0);
  }

  if (typeof scope === "string") {
    return scope
      .split(/\s+/u)
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
  }

  return [...CUBID_DEFAULT_OIDC_SCOPES];
}

async function readTransaction(storage: CubidAuthProviderStorage | null): Promise<CubidAuthTransaction | null> {
  if (!storage) {
    return null;
  }

  const raw = await storage.getItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<CubidAuthTransaction>;

    if (
      typeof parsed.clientId === "string" &&
      typeof parsed.codeVerifier === "string" &&
      typeof parsed.issuer === "string" &&
      typeof parsed.nonce === "string" &&
      typeof parsed.redirectUri === "string" &&
      Array.isArray(parsed.scope) &&
      typeof parsed.state === "string"
    ) {
      return {
        clientId: parsed.clientId,
        codeVerifier: parsed.codeVerifier,
        issuer: parsed.issuer,
        nonce: parsed.nonce,
        redirectUri: parsed.redirectUri,
        scope: parsed.scope.filter((value): value is string => typeof value === "string"),
        state: parsed.state,
      };
    }
  } catch {
    // Invalid transactions are rejected without mutating storage during a read.
  }

  return null;
}

async function writeTransaction(storage: CubidAuthProviderStorage | null, transaction: CubidAuthTransaction) {
  if (!storage) {
    throw new CubidAuthError(
      "Cubid auth requires a storage backend to persist the PKCE transaction.",
      {
        category: "config",
        code: "missing_storage",
      }
    );
  }

  await storage.setItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY, JSON.stringify(transaction));
}

async function clearTransaction(storage: CubidAuthProviderStorage | null) {
  await storage?.removeItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY);
}

function getWindowStorage(): CubidAuthStorageLike | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function resolveStorage(storage: CubidAuthProviderStorage | null | undefined) {
  return storage ?? getWindowStorage();
}

function getCurrentUrl(input: string | URL | undefined) {
  if (input instanceof URL) {
    return input.toString();
  }

  if (typeof input === "string") {
    return input;
  }

  if (typeof window !== "undefined") {
    return window.location.href;
  }

  throw new CubidAuthError("Cubid auth callback handling requires a callback URL.", {
    category: "validation",
    code: "missing_callback_url",
  });
}

function assertCallbackDestination(callbackUrl: string, redirectUri: string) {
  let callback: URL;
  let registered: URL;
  try {
    callback = new URL(callbackUrl);
    registered = new URL(redirectUri);
  } catch {
    throw new CubidAuthError("Cubid callback requires the registered absolute redirect destination.", {
      category: "validation", code: "invalid_callback_destination",
    });
  }
  const destinationKeys = ["protocol", "username", "password", "host", "pathname"] as const;
  const hasRegisteredQuery = Array.from(new Set(registered.searchParams.keys())).every((key) => {
    const actual = callback.searchParams.getAll(key);
    const expected = registered.searchParams.getAll(key);
    return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
  });
  if (callbackUrl.includes("#") || redirectUri.includes("#") ||
      destinationKeys.some((key) => callback[key] !== registered[key]) || !hasRegisteredQuery) {
    throw new CubidAuthError("Cubid callback does not match the registered redirect destination.", {
      category: "validation", code: "invalid_callback_destination",
    });
  }
}

function navigateTo(url: string, navigate?: (url: string) => void) {
  if (navigate) {
    navigate(url);
    return;
  }

  if (typeof window !== "undefined") {
    window.location.assign(url);
  }
}

function assertActiveSession(session: CubidAuthSession | null): CubidAuthSession {
  if (!session) {
    throw new CubidAuthError("A Cubid auth session is required for this action.", {
      category: "validation",
      code: "missing_session",
    });
  }

  if (isCubidAuthSessionExpired(session)) {
    throw new CubidAuthError("The Cubid auth session has expired.", {
      category: "validation",
      code: "expired_session",
    });
  }

  return session;
}

function mergeSession(
  session: CubidAuthSession,
  idTokenClaims: CubidIdTokenClaims | null,
  userInfo: CubidUserInfo | null
): CubidAuthSession {
  if (userInfo && session.subject && userInfo.sub !== session.subject) {
    throw new CubidAuthError("Cubid UserInfo subject does not match the active session.", {
      category: "validation", code: "invalid_userinfo_subject",
    });
  }
  return {
    ...session,
    idTokenClaims,
    subject:
      userInfo?.sub ??
      (typeof idTokenClaims?.sub === "string" ? idTokenClaims.sub : session.subject),
    userInfo,
  };
}

export function CubidAuthProvider({
  autoUserInfo = true,
  children,
  clientId,
  crypto,
  discoveryDocument = null,
  fetch,
  issuer,
  postLogoutRedirectUri,
  redirectUri,
  requirePasskey = true,
  scope,
  storage: providedStorage,
}: CubidAuthProviderProps) {
  const storage = resolveStorage(providedStorage);
  // A context change invalidates pending work without changing the core storage API.
  const owner = useMemo(() => ({ revision: 0 }), [storage, clientId, issuer, redirectUri]);
  const currentOwner = useRef(owner);
  const mounted = useRef(true);
  const callbackRequest = useRef<{
    owner: object; revision: number; url: string; promise: Promise<CubidAuthSession>;
  } | null>(null);
  const [discoveryState, setDiscoveryState] = useState<OwnedState<CubidOidcDiscoveryDocument | null>>({ owner, value: discoveryDocument });
  const discovery = discoveryDocument ?? (discoveryState.owner === owner ? discoveryState.value : null);
  const [errorState, setErrorState] = useState<OwnedState<Error | null>>({ owner, value: null });
  const error = errorState.owner === owner ? errorState.value : null;
  const [sessionState, setSessionState] = useState<OwnedState<CubidAuthSession | null>>({ owner, value: null });
  const session = sessionState.owner === owner ? sessionState.value : null;
  const [statusState, setStatusState] = useState<OwnedState<CubidAuthStatus>>({ owner, value: "idle" });
  const status = statusState.owner === owner ? statusState.value : "idle";
  const setDiscovery = (value: CubidOidcDiscoveryDocument) => setDiscoveryState({ owner, value });
  const setError = (value: Error | null) => setErrorState({ owner, value });
  const setSession = (value: CubidAuthSession | null) => setSessionState({ owner, value });
  const setStatus = (value: CubidAuthStatus) => setStatusState({ owner, value });

  function isCurrent(revision: number) {
    return mounted.current && currentOwner.current === owner && owner.revision === revision;
  }

  function assertCurrent(revision: number) {
    if (!isCurrent(revision)) {
      throw new CubidAuthError("A newer auth action or provider configuration superseded this operation.", {
        category: "validation", code: "operation_superseded",
      });
    }
  }

  // Serialize writes/removals so a logout queued during a session write removes it last.
  function mutateStorage(task: () => Promise<void>) {
    if (!storage) return task();
    const result = (storageMutations.get(storage) ?? Promise.resolve()).then(task);
    const settled = result.catch(() => undefined);
    storageMutations.set(storage, settled);
    void settled.then(() => {
      if (storageMutations.get(storage) === settled) storageMutations.delete(storage);
    });
    return result;
  }

  useLayoutEffect(() => {
    currentOwner.current = owner;
  }, [owner]);

  useLayoutEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const revision = owner.revision;
    // A callback child may start before this parent effect on initial mount.
    if (revision !== 0) return;
    const active = () => !cancelled && isCurrent(revision);
    setStatus("loading");
    void (async () => {
      try {
        // A new committed context must not observe a pending callback's partial write.
        if (storage) await storageMutations.get(storage);
        if (!active()) return;
        const raw = await storage?.getItem(CUBID_AUTH_SESSION_STORAGE_KEY);
        if (!active()) return;
        const restored = raw ? parseCubidAuthSession(raw) : null;
        const nextSession = restored && restored.clientId === clientId && restored.issuer === issuer
          ? restored : null;
        if (nextSession && isCubidAuthSessionExpired(nextSession)) {
          await mutateStorage(async () => {
            if (active()) await storage?.removeItem(CUBID_AUTH_SESSION_STORAGE_KEY);
          });
          if (!active()) return;
          setSession(null);
          setStatus("signed_out");
          return;
        }
        setSession(nextSession);
        setStatus(nextSession ? "authenticated" : "signed_out");
      } catch (nextError) {
        if (active()) {
          setError(normalizeError(nextError));
          setStatus("error");
        }
      }
    })();
    return () => { cancelled = true; };
    // These values identify the storage/client lifetime; state updates do not rehydrate.
  }, [owner]);

  async function ensureDiscoveryDocument(revision: number) {
    assertCurrent(revision);
    if (discovery) {
      return discovery;
    }

    const nextDiscovery = await fetchCubidOidcDiscoveryDocument({
      fetch,
      issuer,
    });

    assertCurrent(revision);
    setDiscovery(nextDiscovery);
    return nextDiscovery;
  }

  function clearError() {
    setError(null);

    if (session) {
      setStatus("authenticated");
      return;
    }

    setStatus("signed_out");
  }

  async function removeStoredAuth(revision: number) {
    await mutateStorage(async () => {
      assertCurrent(revision);
      // Attempt both removals even when one fails, and propagate the failure.
      const results = await Promise.allSettled([
        Promise.resolve().then(() => storage?.removeItem(CUBID_AUTH_SESSION_STORAGE_KEY)),
        Promise.resolve().then(() => clearTransaction(storage)),
      ]);
      const failure = results.find((result) => result.status === "rejected");
      if (failure?.status === "rejected") throw failure.reason;
    });
    assertCurrent(revision);
  }

  async function clearSession() {
    const revision = ++owner.revision;
    assertCurrent(revision);
    setError(null);
    setSession(null);
    setStatus("signed_out");
    try {
      await removeStoredAuth(revision);
    } catch (nextError) {
      const normalizedError = normalizeError(nextError);
      if (isCurrent(revision)) {
        setError(normalizedError);
        setStatus("error");
      }
      throw normalizedError;
    }
  }

  async function signIn(options: CubidAuthSignInOptions = {}) {
    const revision = ++owner.revision;
    assertCurrent(revision);
    setError(null);
    setStatus("loading");

    try {
      const nextDiscovery = await ensureDiscoveryDocument(revision);
      const nextScope = normalizeScope(options.scope ?? scope);
      const pkce = await createCubidPkcePair({
        crypto,
        verifierByteLength: options.verifierByteLength,
      });
      const state = createCubidAuthState(options.stateByteLength, crypto);
      const nonce = options.nonce ?? createCubidAuthNonce(options.nonceByteLength, crypto);

      const url = buildCubidAuthorizationUrl({
        authorizationEndpoint: nextDiscovery.authorization_endpoint,
        acrValues: options.acrValues,
        clientId,
        codeChallenge: pkce.codeChallenge,
        codeChallengeMethod: pkce.codeChallengeMethod,
        extraParams: options.extraParams,
        loginHint: options.loginHint,
        maxAge: options.maxAge,
        nonce,
        prompt: options.prompt,
        provider: options.provider,
        redirectUri,
        requirePasskey: options.requirePasskey ?? requirePasskey,
        scope: nextScope,
        state,
      });

      await mutateStorage(async () => {
        assertCurrent(revision);
        await writeTransaction(storage, {
          clientId,
          codeVerifier: pkce.codeVerifier,
          issuer,
          nonce,
          redirectUri,
          scope: nextScope,
          state,
        });
      });
      assertCurrent(revision);

      if (options.performRedirect !== false) {
        navigateTo(url, options.navigate);
      }

      setStatus(session ? "authenticated" : "signed_out");
      return url;
    } catch (nextError) {
      const normalizedError = normalizeError(nextError);
      if (isCurrent(revision)) {
        setError(normalizedError);
        setStatus("error");
      }
      throw normalizedError;
    }
  }

  async function handleCallback(options: CubidAuthHandleCallbackOptions = {}) {
    const url = options.callbackUrl instanceof URL ? options.callbackUrl.toString()
      : options.callbackUrl ?? (typeof window === "undefined" ? "" : window.location.href);
    const existing = callbackRequest.current;
    if (existing?.owner === owner && existing.url === url && isCurrent(existing.revision)) {
      return existing.promise;
    }
    const promise = performCallback(options);
    const request = { owner, revision: owner.revision, url, promise };
    callbackRequest.current = request;
    try {
      return await promise;
    } finally {
      if (callbackRequest.current === request) callbackRequest.current = null;
    }
  }

  async function performCallback(options: CubidAuthHandleCallbackOptions) {
    const revision = ++owner.revision;
    assertCurrent(revision);
    setError(null);
    setStatus("loading");

    try {
      const transaction = await readTransaction(storage);
      assertCurrent(revision);

      if (!transaction) {
        throw new CubidAuthError("No Cubid auth transaction was found for this callback.", {
          category: "validation",
          code: "missing_transaction",
        });
      }

      const callbackUrl = getCurrentUrl(options.callbackUrl);
      assertCallbackDestination(callbackUrl, transaction.redirectUri);
      const callback = parseCubidAuthorizationCallback(callbackUrl);

      assertCubidAuthorizationState(transaction.state, callback.state);
      if (transaction.clientId !== clientId || transaction.issuer !== issuer || transaction.redirectUri !== redirectUri) {
        throw new CubidAuthError("Cubid callback does not match this client transaction.", {
          category: "validation", code: "invalid_transaction",
        });
      }
      const callbackIssuer = callback.raw.iss?.[0];
      if (typeof callbackIssuer !== "undefined" && callbackIssuer !== transaction.issuer) {
        throw new CubidAuthError("Cubid callback issuer does not match the stored transaction.", {
          category: "validation", code: "invalid_issuer",
        });
      }

      if (callback.kind === "error") {
        throw new CubidAuthError(
          callback.errorDescription
            ? `Cubid sign-in was denied: ${callback.errorDescription}`
            : `Cubid sign-in was denied: ${callback.error}`,
          {
            category: "protocol",
            code: callback.error,
            raw: callback,
          }
        );
      }

      const nextDiscovery = await ensureDiscoveryDocument(revision);
      if (nextDiscovery.issuer !== transaction.issuer) {
        throw new CubidAuthError("Cubid discovery issuer does not match the stored transaction.", {
          category: "validation", code: "invalid_issuer",
        });
      }
      const tokenResponse = await exchangeCubidAuthorizationCode({
        clientId: transaction.clientId,
        code: callback.code,
        codeVerifier: transaction.codeVerifier,
        fetch,
        redirectUri: transaction.redirectUri,
        tokenEndpoint: nextDiscovery.token_endpoint,
      });

      assertCurrent(revision);
      const expectsIdToken = transaction.scope.includes("openid");

      if (expectsIdToken && !tokenResponse.idToken) {
        throw new CubidAuthError(
          "The Cubid token response did not include the expected ID token.",
          {
            category: "validation",
            code: "missing_id_token",
            raw: tokenResponse.raw,
          }
        );
      }

      let userInfo: CubidUserInfo | null = null;

      if ((options.autoUserInfo ?? autoUserInfo) && nextDiscovery.userinfo_endpoint) {
        userInfo = await fetchCubidUserInfo({
          accessToken: tokenResponse.accessToken,
          fetch,
          userInfoEndpoint: nextDiscovery.userinfo_endpoint,
        });
      }

      assertCurrent(revision);
      const idTokenClaims = tokenResponse.idToken
        ? await validateCubidIdToken({
            clientId: transaction.clientId,
            crypto,
            expectedNonce: transaction.nonce,
            discoveryDocument: nextDiscovery,
            fetch,
            idToken: tokenResponse.idToken,
          })
        : null;


      const nextSession = createCubidAuthSession({
        clientId: transaction.clientId,
        idTokenClaims,
        issuer: transaction.issuer,
        tokenResponse,
        userInfo,
      });

      await mutateStorage(async () => {
        assertCurrent(revision);
        const previous = await storage?.getItem(CUBID_AUTH_SESSION_STORAGE_KEY);
        assertCurrent(revision);
        try {
          await storage?.setItem(CUBID_AUTH_SESSION_STORAGE_KEY, serializeCubidAuthSession(nextSession));
          assertCurrent(revision);
          await clearTransaction(storage);
          assertCurrent(revision);
        } catch (cause) {
          // Do not restore a callback session on cold start if completion failed.
          try {
            if (typeof previous === "string") {
              await storage?.setItem(CUBID_AUTH_SESSION_STORAGE_KEY, previous);
            } else {
              await storage?.removeItem(CUBID_AUTH_SESSION_STORAGE_KEY);
            }
          } catch (rollbackError) {
            throw new CubidAuthError("Session persistence rollback failed; repair or clear the store before restarting auth.", {
              category: "config", code: "session_rollback_failed", cause: rollbackError,
            });
          }
          throw cause;
        }
      });
      assertCurrent(revision);
      setSession(nextSession);
      setStatus("authenticated");
      return nextSession;
    } catch (nextError) {
      const normalizedError = normalizeError(nextError);
      if (isCurrent(revision)) {
        setError(normalizedError);
        setStatus("error");
      }
      throw normalizedError;
    }
  }

  async function refreshUserInfo() {
    const revision = ++owner.revision;
    assertCurrent(revision);
    setError(null);
    setStatus("loading");

    try {
      const activeSession = assertActiveSession(session);
      const nextDiscovery = await ensureDiscoveryDocument(revision);
      if (!nextDiscovery.userinfo_endpoint) {
        setStatus("authenticated");
        return null;
      }
      const userInfo = await fetchCubidUserInfo({
        accessToken: activeSession.accessToken,
        fetch,
        userInfoEndpoint: nextDiscovery.userinfo_endpoint,
      });
      assertCurrent(revision);
      const idTokenClaims = activeSession.idToken
        ? decodeCubidIdTokenClaims(activeSession.idToken)
        : activeSession.idTokenClaims;
      const nextSession = mergeSession(activeSession, idTokenClaims, userInfo);

      await mutateStorage(async () => {
        assertCurrent(revision);
        await storage?.setItem(CUBID_AUTH_SESSION_STORAGE_KEY, serializeCubidAuthSession(nextSession));
      });
      assertCurrent(revision);
      setSession(nextSession);
      setStatus("authenticated");
      return userInfo;
    } catch (nextError) {
      const normalizedError = normalizeError(nextError);
      if (isCurrent(revision)) {
        setError(normalizedError);
        setStatus("error");
      }
      throw normalizedError;
    }
  }

  async function logout(options: CubidAuthLogoutOptions = {}) {
    const revision = ++owner.revision;
    assertCurrent(revision);
    const activeSession = session;

    setError(null);
    setSession(null);
    setStatus("signed_out");

    try {
      await removeStoredAuth(revision);
      if (!activeSession) return null;
      const nextDiscovery = await ensureDiscoveryDocument(revision);

      if (!nextDiscovery.end_session_endpoint) {
        return null;
      }

      const logoutUrl = buildCubidLogoutUrl({
        endSessionEndpoint: nextDiscovery.end_session_endpoint,
        extraParams: options.extraParams,
        idTokenHint: activeSession.idToken ?? undefined,
        postLogoutRedirectUri: options.postLogoutRedirectUri ?? postLogoutRedirectUri,
        state: options.state,
      });

      if (options.performRedirect !== false) {
        navigateTo(logoutUrl, options.navigate);
      }

      return logoutUrl;
    } catch (nextError) {
      const normalizedError = normalizeError(nextError);
      if (isCurrent(revision)) {
        setError(normalizedError);
        setStatus("error");
      }
      throw normalizedError;
    }
  }

  const assurance = getCubidAuthAssurance(session);

  const value: CubidAuthContextValue = {
    assurance,
    clearError,
    clearSession,
    discovery,
    error,
    handleCallback,
    hasPasskeyAssurance: assurance.hasPasskeyAssurance,
    isAuthenticated: session !== null && !isCubidAuthSessionExpired(session),
    logout,
    refreshUserInfo,
    session,
    signIn,
    status,
  };

  return <CubidAuthContext.Provider value={value}>{children}</CubidAuthContext.Provider>;
}

export function useCubidAuth() {
  const context = useContext(CubidAuthContext);

  if (!context) {
    throw new Error("A CubidAuthProvider was not found in context.");
  }

  return context;
}

export function useOptionalCubidAuth() {
  return useContext(CubidAuthContext);
}
