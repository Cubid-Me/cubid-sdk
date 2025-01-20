// @ts-nocheck
"use client";
import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
// import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";
// Default styles that can be overridden by your app
// imports here
export function SolanaAppWalletProvider(param) {
    var children = param.children;
    var network = WalletAdapterNetwork.Devnet;
    var endpoint = useMemo(function() {
        return clusterApiUrl(network);
    }, [
        network
    ]);
    var wallets = useMemo(function() {
        return [];
    }, [
        network
    ]);
    return /*#__PURE__*/ React.createElement(ConnectionProvider, {
        endpoint: endpoint
    }, /*#__PURE__*/ React.createElement(WalletProvider, {
        wallets: wallets,
        autoConnect: true
    }, /*#__PURE__*/ React.createElement(WalletModalProvider, null, children)));
}
