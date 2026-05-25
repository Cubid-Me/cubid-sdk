"use client";

import { useEffect, useState } from "react";

import {
  createCubidWalletRecoveryClient,
  type CubidCompleteRecoveryBundleReleaseInput,
  type CubidCompleteRecoveryBundleReleaseResponse,
  type CubidListRecoveryBundlesInput,
  type CubidListRecoveryBundlesResponse,
  type CubidWalletRecoveryClientOptions,
} from "@cubid/wallet-recovery";

export type CubidWalletRecoveryReactStatus =
  | "error"
  | "idle"
  | "loading"
  | "success";

interface CubidWalletRecoveryHookOptions
  extends CubidWalletRecoveryClientOptions {}

export interface CubidRecoveryReleaseHookOptions
  extends CubidWalletRecoveryHookOptions {
  recoverySessionId?: string;
}

export interface CubidRecoveryReleaseState {
  completeRelease: (
    input?: Partial<CubidCompleteRecoveryBundleReleaseInput>
  ) => Promise<CubidCompleteRecoveryBundleReleaseResponse>;
  data: CubidCompleteRecoveryBundleReleaseResponse | null;
  error: Error | null;
  reset: () => void;
  status: CubidWalletRecoveryReactStatus;
}

export interface CubidRecoveryBundlesHookOptions
  extends CubidWalletRecoveryHookOptions {
  autoLoad?: boolean;
}

export interface CubidRecoveryBundlesState {
  bundles: CubidListRecoveryBundlesResponse["bundles"];
  data: CubidListRecoveryBundlesResponse | null;
  error: Error | null;
  reload: (
    input?: CubidListRecoveryBundlesInput
  ) => Promise<CubidListRecoveryBundlesResponse>;
  reset: () => void;
  status: CubidWalletRecoveryReactStatus;
}

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error("Cubid wallet recovery failed with a non-Error value.");
}

function createClient(options: CubidWalletRecoveryClientOptions) {
  return createCubidWalletRecoveryClient(options);
}

export function useCubidRecoveryRelease(
  options: CubidRecoveryReleaseHookOptions
): CubidRecoveryReleaseState {
  const [data, setData] =
    useState<CubidCompleteRecoveryBundleReleaseResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] =
    useState<CubidWalletRecoveryReactStatus>("idle");

  async function completeRelease(
    input: Partial<CubidCompleteRecoveryBundleReleaseInput> = {}
  ) {
    setStatus("loading");
    setError(null);

    try {
      const client = createClient(options);
      const result = await client.completeRelease({
        ...input,
        recoverySessionId:
          input.recoverySessionId ?? options.recoverySessionId ?? "",
      });
      setData(result);
      setStatus("success");
      return result;
    } catch (caught) {
      const normalized = normalizeError(caught);
      setError(normalized);
      setStatus("error");
      throw normalized;
    }
  }

  return {
    completeRelease,
    data,
    error,
    reset() {
      setData(null);
      setError(null);
      setStatus("idle");
    },
    status,
  };
}

export function useCubidRecoveryBundles(
  options: CubidRecoveryBundlesHookOptions
): CubidRecoveryBundlesState {
  const [data, setData] =
    useState<CubidListRecoveryBundlesResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] =
    useState<CubidWalletRecoveryReactStatus>("idle");

  async function reload(input: CubidListRecoveryBundlesInput = {}) {
    setStatus("loading");
    setError(null);

    try {
      const client = createClient(options);
      const result = await client.listBundles(input);
      setData(result);
      setStatus("success");
      return result;
    } catch (caught) {
      const normalized = normalizeError(caught);
      setError(normalized);
      setStatus("error");
      throw normalized;
    }
  }

  useEffect(() => {
    if (options.autoLoad === false) {
      return;
    }

    void reload();
  }, []);

  return {
    bundles: data?.bundles ?? [],
    data,
    error,
    reload,
    reset() {
      setData(null);
      setError(null);
      setStatus("idle");
    },
    status,
  };
}
