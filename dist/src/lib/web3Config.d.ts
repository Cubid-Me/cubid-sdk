export declare const config: import("wagmi").Config<readonly [{
    blockExplorers: {
        readonly default: {
            readonly name: "Etherscan";
            readonly url: "https://etherscan.io";
            readonly apiUrl: "https://api.etherscan.io/api";
        };
    };
    contracts: {
        readonly ensRegistry: {
            readonly address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e";
        };
        readonly ensUniversalResolver: {
            readonly address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67";
            readonly blockCreated: 19258213;
        };
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 14353601;
        };
    };
    id: 1;
    name: "Ethereum";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://cloudflare-eth.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
}, {
    blockExplorers: {
        readonly default: {
            readonly name: "PolygonScan";
            readonly url: "https://polygonscan.com";
            readonly apiUrl: "https://api.polygonscan.com/api";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 25770160;
        };
    };
    id: 137;
    name: "Polygon";
    nativeCurrency: {
        readonly name: "POL";
        readonly symbol: "POL";
        readonly decimals: 18;
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://polygon-rpc.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable> | undefined;
}], {
    137: import("viem").HttpTransport;
    1: import("viem").HttpTransport;
}, readonly [import("wagmi").CreateConnectorFn<{
    on: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
    removeListener: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
    request: import("viem").EIP1193RequestFn<import("viem").EIP1474Methods>;
    isApexWallet?: true | undefined;
    isAvalanche?: true | undefined;
    isBackpack?: true | undefined;
    isBifrost?: true | undefined;
    isBitKeep?: true | undefined;
    isBitski?: true | undefined;
    isBlockWallet?: true | undefined;
    isBraveWallet?: true | undefined;
    isCoinbaseWallet?: true | undefined;
    isDawn?: true | undefined;
    isEnkrypt?: true | undefined;
    isExodus?: true | undefined;
    isFrame?: true | undefined;
    isFrontier?: true | undefined;
    isGamestop?: true | undefined;
    isHyperPay?: true | undefined;
    isImToken?: true | undefined;
    isKuCoinWallet?: true | undefined;
    isMathWallet?: true | undefined;
    isMetaMask?: true | undefined;
    isOkxWallet?: true | undefined;
    isOKExWallet?: true | undefined;
    isOneInchAndroidWallet?: true | undefined;
    isOneInchIOSWallet?: true | undefined;
    isOpera?: true | undefined;
    isPhantom?: true | undefined;
    isPortal?: true | undefined;
    isRabby?: true | undefined;
    isRainbow?: true | undefined;
    isStatus?: true | undefined;
    isTally?: true | undefined;
    isTokenPocket?: true | undefined;
    isTokenary?: true | undefined;
    isTrust?: true | undefined;
    isTrustWallet?: true | undefined;
    isUniswapWallet?: true | undefined;
    isXDEFI?: true | undefined;
    isZerion?: true | undefined;
    providers?: {
        on: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
        removeListener: <event extends keyof import("viem").EIP1193EventMap>(event: event, listener: import("viem").EIP1193EventMap[event]) => void;
        request: import("viem").EIP1193RequestFn<import("viem").EIP1474Methods>;
        isApexWallet?: true;
        isAvalanche?: true;
        isBackpack?: true;
        isBifrost?: true;
        isBitKeep?: true;
        isBitski?: true;
        isBlockWallet?: true;
        isBraveWallet?: true;
        isCoinbaseWallet?: true;
        isDawn?: true;
        isEnkrypt?: true;
        isExodus?: true;
        isFrame?: true;
        isFrontier?: true;
        isGamestop?: true;
        isHyperPay?: true;
        isImToken?: true;
        isKuCoinWallet?: true;
        isMathWallet?: true;
        isMetaMask?: true;
        isOkxWallet?: true;
        isOKExWallet?: true;
        isOneInchAndroidWallet?: true;
        isOneInchIOSWallet?: true;
        isOpera?: true;
        isPhantom?: true;
        isPortal?: true;
        isRabby?: true;
        isRainbow?: true;
        isStatus?: true;
        isTally?: true;
        isTokenPocket?: true;
        isTokenary?: true;
        isTrust?: true;
        isTrustWallet?: true;
        isUniswapWallet?: true;
        isXDEFI?: true;
        isZerion?: true;
        providers?: /*elided*/ any[] | undefined;
        _events?: {
            connect?: (() => void) | undefined;
        } | undefined;
        _state?: {
            accounts?: string[];
            initialized?: boolean;
            isConnected?: boolean;
            isPermanentlyDisconnected?: boolean;
            isUnlocked?: boolean;
        } | undefined;
    }[] | undefined;
    _events?: {
        connect?: (() => void) | undefined;
    } | undefined;
    _state?: {
        accounts?: string[];
        initialized?: boolean;
        isConnected?: boolean;
        isPermanentlyDisconnected?: boolean;
        isUnlocked?: boolean;
    } | undefined;
}, {
    onConnect(connectInfo: import("viem").ProviderConnectInfo): void;
}, {
    [x: `${string}.disconnected`]: true;
    "injected.connected": true;
}>, import("wagmi").CreateConnectorFn<import("@walletconnect/ethereum-provider").default, {
    connect(parameters?: {
        chainId?: number | undefined;
        isReconnecting?: boolean | undefined;
        pairingTopic?: string | undefined;
    }): Promise<{
        accounts: readonly import("abitype").Address[];
        chainId: number;
    }>;
    getNamespaceChainsIds(): number[];
    getRequestedChainsIds(): Promise<number[]>;
    isChainsStale(): Promise<boolean>;
    onConnect(connectInfo: import("viem").ProviderConnectInfo): void;
    onDisplayUri(uri: string): void;
    onSessionDelete(data: {
        topic: string;
    }): void;
    setRequestedChainsIds(chains: number[]): void;
    requestedChainsStorageKey: `${string}.requestedChains`;
}, {
    [x: `${string}.requestedChains`]: number[];
}>, import("wagmi").CreateConnectorFn<import("@metamask/sdk").SDKProvider, {
    onConnect(connectInfo: import("viem").ProviderConnectInfo): void;
    onDisplayUri(uri: string): void;
}, Record<string, unknown>>, import("wagmi").CreateConnectorFn<import("@safe-global/safe-apps-provider").SafeAppProvider, Record<string, unknown>, {
    'safe.disconnected': true;
}>]>;
