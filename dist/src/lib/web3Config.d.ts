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
}>;
