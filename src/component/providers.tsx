import React, { useEffect, useState } from "react";

let AuthKitProvider: any = ({ children }) => <>{children}</>;
import { WagmiProvider, createConfig, http } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { createWeb3Modal } from "@web3modal/wagmi/react"
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Wallet } from './providerNear'
import { SolanaAppWalletProvider } from './providerSolana'

(async () => {
    const authKit = await import("@farcaster/auth-kit");
    AuthKitProvider = authKit.AuthKitProvider;
})


const config = {
    rpcUrl: 'https://mainnet.optimism.io',
    domain: 'example.com',
    siweUri: 'https://example.com/login',
};


export const wallet = new Wallet({
    createAccessKeyFor: "registry.i-am-human.near",
})

wallet.startUp()

const queryClient = new QueryClient()


export const Provider = (props:any) => {
    const [wagmiConfig, setWagmiConfig] = useState(
        createConfig({
            chains: [mainnet, sepolia],
            transports: {
                [mainnet.id]: http(),
                [sepolia.id]: http(),
            },
        })
    )
    const [configSet, setConfigSet] = useState(false)

    useEffect(() => {
        // 1. Get projectId
        const projectId = "6833ed2c1539b9d27e8840c51f53bd0c"

        const metadata = {
            name: "Web3Modal",
            description: "Web3Modal Example",
            url: "https://web3modal.com",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
        }
        const chains: any = [mainnet]

        const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
        createWeb3Modal({ wagmiConfig, projectId, chains } as any)
        setConfigSet(true)
    }, [])

    if (!wagmiConfig) {
        return <></>
    }

    if (!configSet) {
        return <></>
    }


    return <AuthKitProvider config={config}>
        <SolanaAppWalletProvider>
            <WagmiProvider config={wagmiConfig as any}>
                <QueryClientProvider client={queryClient}>
                    {props?.children}
                </QueryClientProvider>
            </WagmiProvider>
        </SolanaAppWalletProvider>
    </AuthKitProvider>
}