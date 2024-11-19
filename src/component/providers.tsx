import React from "react";

let AuthKitProvider: any = ({ children }) => <>{children}</>;

(async () => {
    const authKit = await import("@farcaster/auth-kit");
    AuthKitProvider = authKit.AuthKitProvider;
})

const config = {
    rpcUrl: 'https://mainnet.optimism.io',
    domain: 'example.com',
    siweUri: 'https://example.com/login',
};

export const Provider = ({ children }) => {
    return <AuthKitProvider config={config}>{children}</AuthKitProvider>
}