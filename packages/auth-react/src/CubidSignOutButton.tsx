"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

import { useCubidAuth, type CubidAuthLogoutOptions } from "./context";

export interface CubidSignOutButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "onClick" | "onError"
  > {
  children?: ReactNode;
  logoutOptions?: CubidAuthLogoutOptions;
  onError?: (error: Error) => void;
  onLoggedOut?: (logoutUrl: string | null) => void;
}

export function CubidSignOutButton({
  children = "Sign out",
  disabled,
  logoutOptions,
  onError,
  onLoggedOut,
  type = "button",
  ...buttonProps
}: CubidSignOutButtonProps) {
  const auth = useCubidAuth();

  return (
    <button
      {...buttonProps}
      disabled={disabled || auth.status === "loading"}
      onClick={async () => {
        try {
          const logoutUrl = await auth.logout(logoutOptions);
          onLoggedOut?.(logoutUrl);
        } catch (error) {
          onError?.(
            error instanceof Error ? error : new Error("Cubid sign-out failed.")
          );
        }
      }}
      type={type}
    >
      {children}
    </button>
  );
}
