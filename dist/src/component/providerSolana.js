// @ts-nocheck
"use client";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaAppWalletProvider = SolanaAppWalletProvider;
const react_1 = __importStar(require("react"));
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const web3_js_1 = require("@solana/web3.js");
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
// Default styles that can be overridden by your app
// imports here
function SolanaAppWalletProvider({ children, }) {
    const network = wallet_adapter_base_1.WalletAdapterNetwork.Devnet;
    const endpoint = (0, react_1.useMemo)(() => (0, web3_js_1.clusterApiUrl)(network), [network]);
    const wallets = (0, react_1.useMemo)(() => [
    // manually add any legacy wallet adapters here
    // new UnsafeBurnerWalletAdapter(),
    ], [network]);
    return (react_1.default.createElement(wallet_adapter_react_1.ConnectionProvider, { endpoint: endpoint },
        react_1.default.createElement(wallet_adapter_react_1.WalletProvider, { wallets: wallets, autoConnect: true },
            react_1.default.createElement(wallet_adapter_react_ui_1.WalletModalProvider, null, children))));
}
