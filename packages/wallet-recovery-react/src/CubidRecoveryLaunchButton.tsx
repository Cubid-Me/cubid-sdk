"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { buildHostedRecoveryUrl } from "@cubid/wallet-recovery";

export interface CubidRecoveryLaunchButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "onClick" | "onError"
  > {
  children?: ReactNode;
  onError?: (error: Error) => void;
  onLaunched?: (url: string) => void;
  openWindow?: (url: string) => void;
  passportOrigin?: string | URL;
  recoverySessionId: string;
}

function defaultOpenWindow(url: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.open(
    url,
    "cubid-wallet-recovery",
    "width=600,height=800,noopener,noreferrer"
  );
}

function normalizeError(error: unknown): Error {
  if (error instanceof Error) {
    return error;
  }

  return new Error("Cubid wallet recovery launch failed.");
}

export function CubidRecoveryLaunchButton({
  children = "Recover wallet with Cubid",
  disabled,
  onError,
  onLaunched,
  openWindow = defaultOpenWindow,
  passportOrigin,
  recoverySessionId,
  type = "button",
  ...buttonProps
}: CubidRecoveryLaunchButtonProps) {
  return (
    <button
      {...buttonProps}
      disabled={disabled}
      onClick={() => {
        try {
          const url = buildHostedRecoveryUrl({
            passportOrigin,
            recoverySessionId,
          });
          openWindow(url);
          onLaunched?.(url);
        } catch (error) {
          onError?.(normalizeError(error));
        }
      }}
      type={type}
    >
      {children}
    </button>
  );
}
