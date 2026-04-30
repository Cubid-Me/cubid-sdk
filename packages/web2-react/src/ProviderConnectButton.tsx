import type {
  CubidOAuthCallbackState,
  CubidOAuthProvider,
  CubidWeb2Client,
  OAuthAuthorizationUrlRequest
} from "@cubid/web2";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { useOptionalCubidWeb2Client } from "./context";

function labelForProvider(provider: CubidOAuthProvider) {
  return `Connect ${provider.charAt(0).toUpperCase()}${provider.slice(1)}`;
}

export interface ProviderConnectButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onClick"> {
  authorizationRequest?: OAuthAuthorizationUrlRequest;
  authorizationUrl?: string;
  client?: CubidWeb2Client;
  navigate?: boolean;
  onError?: (error: unknown) => void;
  onConnect?: (details: {
    provider: CubidOAuthProvider;
    state?: CubidOAuthCallbackState | string;
    url?: string;
  }) => Promise<void> | void;
  provider: CubidOAuthProvider;
}

export function ProviderConnectButton({
  authorizationRequest,
  authorizationUrl,
  children,
  client,
  navigate = false,
  onError,
  onConnect,
  provider,
  type = "button",
  ...buttonProps
}: ProviderConnectButtonProps) {
  const contextualClient = useOptionalCubidWeb2Client();
  const resolvedClient = client ?? contextualClient ?? undefined;

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    void (async () => {
      try {
        if (!resolvedClient && !authorizationUrl) {
          throw new Error(
            "ProviderConnectButton requires a CubidWeb2Client prop or provider when no authorizationUrl is supplied."
          );
        }

        const url =
          authorizationUrl ??
          (authorizationRequest && resolvedClient
            ? resolvedClient.oauth.buildAuthorizationUrl(authorizationRequest)
            : undefined);

        await onConnect?.({
          provider,
          state: authorizationRequest?.state,
          url
        });

        if (navigate && url && typeof window !== "undefined") {
          window.location.assign(url);
        }
      } catch (error) {
        event.preventDefault();
        onError?.(error);
      }
    })();
  }

  return (
    <button {...buttonProps} onClick={handleClick} type={type}>
      {children ?? labelForProvider(provider)}
    </button>
  );
}
