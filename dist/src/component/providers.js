"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = exports.wallet = void 0;
const react_1 = __importStar(require("react"));
let AuthKitProvider = ({ children }) => react_1.default.createElement(react_1.default.Fragment, null, children);
const wagmi_1 = require("wagmi");
const chains_1 = require("wagmi/chains");
const react_2 = require("@web3modal/wagmi/react");
const config_1 = require("@web3modal/wagmi/react/config");
const react_query_1 = require("@tanstack/react-query");
const providerNear_1 = require("./providerNear");
const providerSolana_1 = require("./providerSolana");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const authKit = yield Promise.resolve().then(() => __importStar(require("@farcaster/auth-kit")));
    AuthKitProvider = authKit.AuthKitProvider;
}));
const config = {
    rpcUrl: 'https://mainnet.optimism.io',
    domain: 'example.com',
    siweUri: 'https://example.com/login',
};
exports.wallet = new providerNear_1.Wallet({
    createAccessKeyFor: "registry.i-am-human.near",
});
exports.wallet.startUp();
const queryClient = new react_query_1.QueryClient();
const Provider = (props) => {
    const [wagmiConfig, setWagmiConfig] = (0, react_1.useState)((0, wagmi_1.createConfig)({
        chains: [chains_1.mainnet, chains_1.sepolia],
        transports: {
            [chains_1.mainnet.id]: (0, wagmi_1.http)(),
            [chains_1.sepolia.id]: (0, wagmi_1.http)(),
        },
    }));
    const [configSet, setConfigSet] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        // 1. Get projectId
        const projectId = "6833ed2c1539b9d27e8840c51f53bd0c";
        const metadata = {
            name: "Web3Modal",
            description: "Web3Modal Example",
            url: "https://web3modal.com",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
        };
        const chains = [chains_1.mainnet];
        const wagmiConfig = (0, config_1.defaultWagmiConfig)({ chains, projectId, metadata });
        (0, react_2.createWeb3Modal)({ wagmiConfig, projectId, chains });
        setConfigSet(true);
    }, []);
    if (!wagmiConfig) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    if (!configSet) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return react_1.default.createElement(AuthKitProvider, { config: config },
        react_1.default.createElement(providerSolana_1.SolanaAppWalletProvider, null,
            react_1.default.createElement(wagmi_1.WagmiProvider, { config: wagmiConfig },
                react_1.default.createElement(react_query_1.QueryClientProvider, { client: queryClient }, props === null || props === void 0 ? void 0 : props.children))));
};
exports.Provider = Provider;
