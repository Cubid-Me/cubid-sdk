"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import type { CubidAuthSession } from "@cubid/auth";

import { useCubidAuth, type CubidAuthHandleCallbackOptions } from "./context";

export interface CubidAuthCallbackProps extends CubidAuthHandleCallbackOptions {
  errorFallback?: ReactNode | ((error: Error | null) => ReactNode);
  loadingFallback?: ReactNode;
  onError?: (error: Error) => void;
  onResolved?: (session: CubidAuthSession) => void;
  successFallback?: ReactNode;
}

export function CubidAuthCallback({
  autoUserInfo,
  callbackUrl,
  errorFallback = null,
  loadingFallback = null,
  onError,
  onResolved,
  successFallback = null,
}: CubidAuthCallbackProps) {
  const auth = useCubidAuth();
  const [phase, setPhase] = useState<"error" | "loading" | "success">("loading");
  const authRef = useRef(auth);
  const isMountedRef = useRef(true);
  const lastRequestKeyRef = useRef<string | null>(null);
  const onErrorRef = useRef(onError);
  const onResolvedRef = useRef(onResolved);

  authRef.current = auth;
  onErrorRef.current = onError;
  onResolvedRef.current = onResolved;

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const requestKey = JSON.stringify({
      autoUserInfo: autoUserInfo ?? null,
      callbackUrl:
        callbackUrl instanceof URL ? callbackUrl.toString() : callbackUrl ?? null,
    });

    if (lastRequestKeyRef.current === requestKey) {
      return;
    }

    lastRequestKeyRef.current = requestKey;

    setPhase("loading");

    void (async () => {
      try {
        const session = await authRef.current.handleCallback({
          autoUserInfo,
          callbackUrl,
        });

        if (!isMountedRef.current || lastRequestKeyRef.current !== requestKey) {
          return;
        }

        setPhase("success");
        onResolvedRef.current?.(session);
      } catch (error) {
        const normalizedError =
          error instanceof Error ? error : new Error("Cubid auth callback failed.");

        if (!isMountedRef.current || lastRequestKeyRef.current !== requestKey) {
          return;
        }

        setPhase("error");
        onErrorRef.current?.(normalizedError);
      }
    })();
  }, [autoUserInfo, callbackUrl]);

  if (phase === "loading") {
    return <>{loadingFallback}</>;
  }

  if (phase === "error") {
    return (
      <>
        {typeof errorFallback === "function" ? errorFallback(auth.error) : errorFallback}
      </>
    );
  }

  return <>{successFallback}</>;
}
