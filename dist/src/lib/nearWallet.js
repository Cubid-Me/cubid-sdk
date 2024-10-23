"use strict";
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
exports.Wallet = void 0;
/* A helper file that simplifies using the wallet selector */
//@ts-nocheck
// near api js
const near_api_js_1 = require("near-api-js");
// wallet selector UI
require("@near-wallet-selector/modal-ui/styles.css");
const modal_ui_1 = require("@near-wallet-selector/modal-ui");
// wallet selector options
const core_1 = require("@near-wallet-selector/core");
const ledger_1 = require("@near-wallet-selector/ledger");
const my_near_wallet_1 = require("@near-wallet-selector/my-near-wallet");
const near_wallet_1 = require("@near-wallet-selector/near-wallet");
// import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
const sender_1 = require("@near-wallet-selector/sender");
const here_wallet_1 = require("@near-wallet-selector/here-wallet");
const sender = (0, sender_1.setupSender)();
const hereWallet = (0, here_wallet_1.setupHereWallet)();
const nearWallet = (0, near_wallet_1.setupNearWallet)();
// const meteorWallet = setupMeteorWallet();
const THIRTY_TGAS = '30000000000000';
const NO_DEPOSIT = '0';
// Wallet that simplifies using the wallet selector
class Wallet {
    constructor({ createAccessKeyFor = undefined, network = 'testnet' }) {
        this.walletSelector = null;
        this.wallet = null;
        this.network = null;
        this.createAccessKeyFor = null;
        // Login to a wallet passing a contractId will create a local
        // key, so the user skips signing non-payable transactions.
        // Omitting the accountId will result in the user being
        // asked to sign all transactions.
        this.createAccessKeyFor = createAccessKeyFor;
        this.network = 'mainnet';
    }
    // To be called when the website loads
    startUp() {
        return __awaiter(this, void 0, void 0, function* () {
            this.walletSelector = yield (0, core_1.setupWalletSelector)({
                network: this.network,
                modules: [
                    nearWallet,
                    // meteorWallet,
                    (0, my_near_wallet_1.setupMyNearWallet)(),
                    (0, ledger_1.setupLedger)(),
                    sender,
                    hereWallet,
                ],
            });
            const isSignedIn = this.walletSelector.isSignedIn();
            if (isSignedIn) {
                this.wallet = yield this.walletSelector.wallet();
                this.accountId =
                    this.walletSelector.store.getState().accounts[0].accountId;
            }
            return isSignedIn;
        });
    }
    account() {
        return __awaiter(this, void 0, void 0, function* () {
            const [acc] = yield this.wallet.getAccounts();
            return acc;
            // return this.wallet;
        });
    }
    // Sign-in method
    signIn() {
        const description = 'Please select a wallet to sign in.';
        const modal = (0, modal_ui_1.setupModal)(this.walletSelector, {
            contractId: this.createAccessKeyFor,
            description,
        });
        modal.show();
    }
    // Sign-out method
    signOut() {
        this.wallet.signOut();
        this.wallet = this.accountId = this.createAccessKeyFor = null;
        window.location.replace(window.location.origin + window.location.pathname);
    }
    // Make a read-only call to retrieve information from the network
    viewMethod(_a) {
        return __awaiter(this, arguments, void 0, function* ({ contractId, method, args = {} }) {
            const { network } = this.walletSelector.options;
            const provider = new near_api_js_1.providers.JsonRpcProvider({ url: network.nodeUrl });
            let res = yield provider.query({
                request_type: 'call_function',
                account_id: contractId,
                method_name: method,
                args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
                finality: 'optimistic',
            });
            return JSON.parse(Buffer.from(res.result).toString());
        });
    }
    // Call a method that changes the contract's state
    callMethod(_a) {
        return __awaiter(this, arguments, void 0, function* ({ contractId, method, args = {}, gas = THIRTY_TGAS, deposit = NO_DEPOSIT, }) {
            // Sign a transaction with the "FunctionCall" action
            return yield this.wallet.signAndSendTransaction({
                signerId: this.accountId,
                receiverId: contractId,
                actions: [
                    {
                        type: 'FunctionCall',
                        params: {
                            methodName: method,
                            args,
                            gas,
                            deposit,
                        },
                    },
                ],
            });
        });
    }
    // Get transaction result from the network
    getTransactionResult(txhash) {
        return __awaiter(this, void 0, void 0, function* () {
            const { network } = this.walletSelector.options;
            const provider = new near_api_js_1.providers.JsonRpcProvider({ url: network.nodeUrl });
            // Retrieve transaction result from the network
            const transaction = yield provider.txStatus(txhash, 'unnused');
            return near_api_js_1.providers.getTransactionLastResult(transaction);
        });
    }
}
exports.Wallet = Wallet;
