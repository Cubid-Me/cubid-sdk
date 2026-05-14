"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
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
  const cancelledRef = useRef(false);

  const resolveCallback = useEffectEvent(async () => {
    try {
      const session = await auth.handleCallback({
        autoUserInfo,
        callbackUrl,
      });

      if (cancelledRef.current) {
        return;
      }

      setPhase("success");
      onResolved?.(session);
    } catch (error) {
      const normalizedError =
        error instanceof Error ? error : new Error("Cubid auth callback failed.");

      if (cancelledRef.current) {
        return;
      }

      setPhase("error");
      onError?.(normalizedError);
    }
  });

  useEffect(() => {
    cancelledRef.current = false;

    setPhase("loading");

    void resolveCallback();

    return () => {
      cancelledRef.current = true;
    };
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
