import { buildHostedVerificationUrl } from "@cubid/web2";
import type { CubidHostedVerificationStampType, HostedVerificationUrlRequest } from "@cubid/web2";
import { startTransition, useEffect, useRef, useState } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function toFriendlyStampName(stampToRender: CubidHostedVerificationStampType): string {
  return stampToRender === "address" ? "address" : "phone";
}

function getDefaultDescription(stampToRender: CubidHostedVerificationStampType): string {
  if (stampToRender === "address") {
    return "Continue in Cubid to complete address verification.";
  }

  return "Continue in Cubid to complete phone verification.";
}

function getDefaultButtonLabel(stampToRender: CubidHostedVerificationStampType): string {
  if (stampToRender === "address") {
    return "Verify address with Cubid";
  }

  return "Verify phone with Cubid";
}

function getConfigurationErrorMessage(props: HostedVerificationUrlRequest): string | undefined {
  if (!props.userId.trim()) {
    return "Cubid verification becomes available after the user record is created.";
  }

  if (props.stampToRender === "address" && (props.dappId === undefined || String(props.dappId).trim().length === 0)) {
    return "Cubid address verification is not configured for this environment.";
  }

  if (props.stampToRender === "phone" && (props.pageId === undefined || String(props.pageId).trim().length === 0)) {
    return "Cubid phone verification is not configured for this environment.";
  }

  return undefined;
}

export interface CubidHostedVerificationWidgetProps extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
  buttonLabel?: string;
  description?: string;
  dappId?: number | string;
  onError?: (error: unknown) => void;
  onStampChange?: () => Promise<void> | void;
  pageId?: number | string;
  passportOrigin?: string;
  popupFeatures?: string;
  popupName?: string;
  stampToRender: CubidHostedVerificationStampType;
  title?: string;
  userId?: string | null;
}

export interface CubidWidgetProps
  extends Omit<CubidHostedVerificationWidgetProps, "dappId" | "pageId" | "userId"> {
  api_key?: string;
  dapp_id?: number | string;
  page_id?: number | string;
  uuid?: string | null;
}

export interface ProviderProps {
  children?: ReactNode;
}

export function Provider({ children }: ProviderProps) {
  return <>{children}</>;
}

export function CubidHostedVerificationWidget({
  buttonLabel,
  className,
  description,
  dappId,
  onError,
  onStampChange,
  pageId,
  passportOrigin,
  popupFeatures = "width=600,height=800",
  popupName = "cubid-verification",
  stampToRender,
  title,
  userId,
  ...sectionProps
}: CubidHostedVerificationWidgetProps) {
  const popupRef = useRef<Window | null>(null);
  const handledCloseRef = useRef(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [status, setStatus] = useState<string>();

  const request = {
    dappId,
    pageId,
    passportOrigin,
    stampToRender,
    userId: userId?.trim() ?? ""
  } satisfies HostedVerificationUrlRequest;

  const configurationError = getConfigurationErrorMessage(request);

  useEffect(() => {
    return () => {
      if (popupRef.current && !popupRef.current.closed) {
        popupRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isLaunching || !popupRef.current) {
      return;
    }

    const interval = window.setInterval(() => {
      const popup = popupRef.current;

      if (!popup || popup.closed) {
        if (handledCloseRef.current) {
          return;
        }

        handledCloseRef.current = true;
        popupRef.current = null;

        startTransition(() => {
          setIsLaunching(false);
          setStatus("The Cubid window closed. Refreshing verification status may take a moment.");
        });

        void Promise.resolve(onStampChange?.()).catch((error) => {
          onError?.(error);
        });
      }
    }, 500);

    return () => {
      window.clearInterval(interval);
    };
  }, [isLaunching, onError, onStampChange]);

  async function handleLaunch() {
    if (configurationError) {
      return;
    }

    try {
      setIsLaunching(true);
      handledCloseRef.current = false;
      const url = buildHostedVerificationUrl(request);
      const popup = window.open(url, popupName, popupFeatures);

      if (!popup) {
        throw new Error("Unable to open the Cubid verification window. Check your popup settings and try again.");
      }

      popupRef.current = popup;
      popup.focus();
      startTransition(() => {
        setStatus(getDefaultDescription(stampToRender));
      });
    } catch (error) {
      popupRef.current = null;
      handledCloseRef.current = true;
      startTransition(() => {
        setIsLaunching(false);
        setStatus("We could not open the Cubid verification flow right now.");
      });
      onError?.(error);
    }
  }

  return (
    <section
      {...sectionProps}
      className={className}
      data-cubid-stamp={stampToRender}
      data-cubid-widget="hosted-verification"
    >
      <div>
        <p>{title ?? `Cubid ${toFriendlyStampName(stampToRender)} verification`}</p>
        <p>{description ?? getDefaultDescription(stampToRender)}</p>
      </div>
      {configurationError ? <p aria-live="polite">{configurationError}</p> : null}
      {status ? <p aria-live="polite">{status}</p> : null}
      <button disabled={Boolean(configurationError) || isLaunching} onClick={handleLaunch} type="button">
        {isLaunching ? "Waiting for Cubid" : buttonLabel ?? getDefaultButtonLabel(stampToRender)}
      </button>
    </section>
  );
}

export function CubidWidget({
  api_key,
  dapp_id,
  page_id,
  uuid,
  ...props
}: CubidWidgetProps) {
  void api_key;
  return <CubidHostedVerificationWidget {...props} dappId={dapp_id} pageId={page_id} userId={uuid} />;
}
