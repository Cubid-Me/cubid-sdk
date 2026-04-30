import type {
  CubidOAuthProvider,
  CubidWeb2Client,
  OAuthAuthorizationUrlRequest,
  StampPersistenceRequest
} from "@cubid/web2";
import type { ComponentPropsWithoutRef } from "react";

import { EmailOtpForm } from "./EmailOtpForm";
import { PhoneOtpForm } from "./PhoneOtpForm";
import { ProviderConnectButton } from "./ProviderConnectButton";
import { useOptionalCubidWeb2Client } from "./context";

export interface Web2ConnectPanelEmailConfig {
  defaultEmail?: string;
  persistStamp?: StampPersistenceRequest;
}

export interface Web2ConnectPanelPhoneConfig {
  defaultPhone?: string;
  persistStamp?: StampPersistenceRequest;
}

export interface Web2ConnectPanelProviderConfig {
  authorizationRequest?: OAuthAuthorizationUrlRequest;
  authorizationUrl?: string;
  provider: CubidOAuthProvider;
}

export interface Web2ConnectPanelProps extends ComponentPropsWithoutRef<"section"> {
  client?: CubidWeb2Client;
  email?: false | Web2ConnectPanelEmailConfig;
  phone?: false | Web2ConnectPanelPhoneConfig;
  providers?: Web2ConnectPanelProviderConfig[];
}

export function Web2ConnectPanel({
  client,
  email = {},
  phone = {},
  providers = [],
  ...sectionProps
}: Web2ConnectPanelProps) {
  const contextualClient = useOptionalCubidWeb2Client();
  const resolvedClient = client ?? contextualClient ?? undefined;

  return (
    <section {...sectionProps}>
      {email !== false ? <EmailOtpForm client={resolvedClient} defaultEmail={email.defaultEmail} persistStamp={email.persistStamp} /> : null}
      {phone !== false ? <PhoneOtpForm client={resolvedClient} defaultPhone={phone.defaultPhone} persistStamp={phone.persistStamp} /> : null}
      {providers.length > 0 ? (
        <div>
          {providers.map((providerConfig) => (
            <ProviderConnectButton
              authorizationRequest={providerConfig.authorizationRequest}
              authorizationUrl={providerConfig.authorizationUrl}
              client={resolvedClient}
              key={providerConfig.provider}
              provider={providerConfig.provider}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
