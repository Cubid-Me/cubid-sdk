"use client";

import {
  assertCubidAuthorizationState,
  buildCubidAuthorizationUrl,
  buildCubidLogoutUrl,
  CUBID_DEFAULT_OIDC_SCOPES,
  clearCubidAuthSession,
  createCubidAuthNonce,
  createCubidAuthSession,
  createCubidAuthState,
  createCubidPkcePair,
  decodeCubidIdTokenClaims,
  exchangeCubidAuthorizationCode,
  fetchCubidOidcDiscoveryDocument,
  fetchCubidUserInfo,
  isCubidAuthSessionExpired,
  loadCubidAuthSession,
  persistCubidAuthSession,
  parseCubidAuthorizationCallback,
  CubidAuthError,
  type BuildCubidAuthorizationUrlInput,
  type CubidAuthFetch,
  type CubidAuthSession,
  type CubidAuthStorageLike,
  type CubidIdTokenClaims,
  type CubidOidcDiscoveryDocument,
  type CubidUserInfo,
} from "@cubid/auth";
import { createContext, useContext, useEffect, useState } from "react";
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
  extraParams?: BuildCubidAuthorizationUrlInput["extraParams"];
  loginHint?: string;
  maxAge?: number;
  navigate?: (url: string) => void;
  nonceByteLength?: number;
  nonce?: string;
  performRedirect?: boolean;
  prompt?: string;
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

export interface CubidAuthProviderProps {
  autoUserInfo?: boolean;
  children: ReactNode;
  clientId: string;
  discoveryDocument?: CubidOidcDiscoveryDocument | null;
  fetch?: CubidAuthFetch;
  issuer: string;
  postLogoutRedirectUri?: string;
  redirectUri: string;
  scope?: readonly string[] | string;
  storage?: CubidAuthStorageLike | null;
}

export interface CubidAuthContextValue {
  clearError: () => void;
  clearSession: () => void;
  discovery: CubidOidcDiscoveryDocument | null;
  error: Error | null;
  handleCallback: (options?: CubidAuthHandleCallbackOptions) => Promise<CubidAuthSession>;
  isAuthenticated: boolean;
  logout: (options?: CubidAuthLogoutOptions) => Promise<string | null>;
  refreshUserInfo: () => Promise<CubidUserInfo | null>;
  session: CubidAuthSession | null;
  signIn: (options?: CubidAuthSignInOptions) => Promise<string>;
  status: CubidAuthStatus;
}

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

function readTransaction(storage: CubidAuthStorageLike | null): CubidAuthTransaction | null {
  if (!storage) {
    return null;
  }

  const raw = storage.getItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY);

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
    storage.removeItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY);
  }

  return null;
}

function writeTransaction(storage: CubidAuthStorageLike | null, transaction: CubidAuthTransaction) {
  if (!storage) {
    throw new CubidAuthError(
      "Cubid auth requires a storage backend to persist the PKCE transaction.",
      {
        category: "config",
        code: "missing_storage",
      }
    );
  }

  storage.setItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY, JSON.stringify(transaction));
}

function clearTransaction(storage: CubidAuthStorageLike | null) {
  storage?.removeItem(CUBID_AUTH_TRANSACTION_STORAGE_KEY);
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

function resolveStorage(storage: CubidAuthStorageLike | null | undefined) {
  return storage ?? getWindowStorage();
}

function loadPersistedSession(storage: CubidAuthStorageLike | null): CubidAuthSession | null {
  if (!storage) {
    return null;
  }

  const session = loadCubidAuthSession(storage);

  if (!session) {
    return null;
  }

  if (isCubidAuthSessionExpired(session)) {
    clearCubidAuthSession(storage);
    return null;
  }

  return session;
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
  discoveryDocument = null,
  fetch,
  issuer,
  postLogoutRedirectUri,
  redirectUri,
  scope,
  storage: providedStorage,
}: CubidAuthProviderProps) {
  const storage = resolveStorage(providedStorage);
  const [discovery, setDiscovery] = useState<CubidOidcDiscoveryDocument | null>(discoveryDocument);
  const [error, setError] = useState<Error | null>(null);
  const [session, setSession] = useState<CubidAuthSession | null>(null);
  const [status, setStatus] = useState<CubidAuthStatus>("idle");

  useEffect(() => {
    const nextSession = loadPersistedSession(storage);

    setSession(nextSession);
    setStatus(nextSession ? "authenticated" : "signed_out");
  }, [storage]);

  async function ensureDiscoveryDocument() {
    if (discovery) {
      return discovery;
    }

    const nextDiscovery = await fetchCubidOidcDiscoveryDocument({
      fetch,
      issuer,
    });

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

  function clearSession() {
    if (storage) {
      clearCubidAuthSession(storage);
    }
    clearTransaction(storage);
    setError(null);
    setSession(null);
    setStatus("signed_out");
  }

  async function signIn(options: CubidAuthSignInOptions = {}) {
    setError(null);
    setStatus("loading");

    try {
      const nextDiscovery = await ensureDiscoveryDocument();
      const nextScope = normalizeScope(options.scope ?? scope);
      const pkce = await createCubidPkcePair({
        verifierByteLength: options.verifierByteLength,
      });
      const state = createCubidAuthState(options.stateByteLength);
      const nonce = options.nonce ?? createCubidAuthNonce(options.nonceByteLength);

      writeTransaction(storage, {
        clientId,
        codeVerifier: pkce.codeVerifier,
        issuer,
        nonce,
        redirectUri,
        scope: nextScope,
        state,
      });

      const url = buildCubidAuthorizationUrl({
        authorizationEndpoint: nextDiscovery.authorization_endpoint,
        clientId,
        codeChallenge: pkce.codeChallenge,
        codeChallengeMethod: pkce.codeChallengeMethod,
        extraParams: options.extraParams,
        loginHint: options.loginHint,
        maxAge: options.maxAge,
        nonce,
        prompt: options.prompt,
        redirectUri,
        scope: nextScope,
        state,
      });

      if (options.performRedirect !== false) {
        navigateTo(url, options.navigate);
      }

      setStatus(session ? "authenticated" : "signed_out");
      return url;
    } catch (nextError) {
      const normalizedError = normalizeError(nextError);
      setError(normalizedError);
      setStatus("error");
      throw normalizedError;
    }
  }

  async function handleCallback(options: CubidAuthHandleCallbackOptions = {}) {
    setError(null);
    setStatus("loading");

    try {
      const transaction = readTransaction(storage);

      if (!transaction) {
        throw new CubidAuthError("No Cubid auth transaction was found for this callback.", {
          category: "validation",
          code: "missing_transaction",
        });
      }

      const callback = parseCubidAuthorizationCallback(getCurrentUrl(options.callbackUrl));

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

      assertCubidAuthorizationState(transaction.state, callback.state);

      const nextDiscovery = await ensureDiscoveryDocument();
      const tokenResponse = await exchangeCubidAuthorizationCode({
        clientId: transaction.clientId,
        code: callback.code,
        codeVerifier: transaction.codeVerifier,
        fetch,
        redirectUri: transaction.redirectUri,
        tokenEndpoint: nextDiscovery.token_endpoint,
      });

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

      const idTokenClaims = tokenResponse.idToken
        ? decodeCubidIdTokenClaims(tokenResponse.idToken)
        : null;

      if (tokenResponse.idToken) {
        if (typeof idTokenClaims?.nonce !== "string") {
          throw new CubidAuthError(
            "The Cubid ID token nonce was missing from the token response.",
            {
              category: "validation",
              code: "missing_nonce",
              raw: idTokenClaims,
            }
          );
        }

        if (idTokenClaims.nonce !== transaction.nonce) {
          throw new CubidAuthError(
            "The Cubid ID token nonce did not match the stored transaction.",
            {
              category: "validation",
              code: "invalid_nonce",
              raw: idTokenClaims,
            }
          );
        }
      }

      const nextSession = createCubidAuthSession({
        clientId: transaction.clientId,
        idTokenClaims,
        issuer: transaction.issuer,
        tokenResponse,
        userInfo,
      });

      if (storage) {
        persistCubidAuthSession(storage, nextSession);
      }
      clearTransaction(storage);
      setSession(nextSession);
      setStatus("authenticated");
      return nextSession;
    } catch (nextError) {
      const normalizedError = normalizeError(nextError);
      setError(normalizedError);
      setStatus("error");
      throw normalizedError;
    }
  }

  async function refreshUserInfo() {
    const activeSession = assertActiveSession(session);
    const nextDiscovery = await ensureDiscoveryDocument();

    if (!nextDiscovery.userinfo_endpoint) {
      return null;
    }

    setError(null);
    setStatus("loading");

    try {
      const userInfo = await fetchCubidUserInfo({
        accessToken: activeSession.accessToken,
        fetch,
        userInfoEndpoint: nextDiscovery.userinfo_endpoint,
      });
      const idTokenClaims = activeSession.idToken
        ? decodeCubidIdTokenClaims(activeSession.idToken)
        : activeSession.idTokenClaims;
      const nextSession = mergeSession(activeSession, idTokenClaims, userInfo);

      if (storage) {
        persistCubidAuthSession(storage, nextSession);
      }
      setSession(nextSession);
      setStatus("authenticated");
      return userInfo;
    } catch (nextError) {
      const normalizedError = normalizeError(nextError);
      setError(normalizedError);
      setStatus("error");
      throw normalizedError;
    }
  }

  async function logout(options: CubidAuthLogoutOptions = {}) {
    const activeSession = session;

    if (storage) {
      clearCubidAuthSession(storage);
    }
    clearTransaction(storage);
    setError(null);
    setSession(null);
    setStatus("signed_out");

    if (!activeSession) {
      return null;
    }

    const nextDiscovery = await ensureDiscoveryDocument();

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
  }

  const value: CubidAuthContextValue = {
    clearError,
    clearSession,
    discovery,
    error,
    handleCallback,
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
