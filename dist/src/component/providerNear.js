/* A helper file that simplifies using the wallet selector */ //@ts-nocheck
// near api js
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import { providers } from 'near-api-js';
// wallet selector UI
import { setupModal } from '@near-wallet-selector/modal-ui';
// wallet selector options
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupLedger } from '@near-wallet-selector/ledger';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
// import { setupMeteorWallet } from '@near-wallet-selector/meteor-wallet';
import { setupSender } from '@near-wallet-selector/sender';
import { setupHereWallet } from '@near-wallet-selector/here-wallet';
var sender = setupSender();
var hereWallet = setupHereWallet();
var nearWallet = setupNearWallet();
// const meteorWallet = setupMeteorWallet();
var THIRTY_TGAS = '30000000000000';
var NO_DEPOSIT = '0';
// Wallet that simplifies using the wallet selector
export var Wallet = /*#__PURE__*/ function() {
    "use strict";
    function Wallet(param) {
        var _param_createAccessKeyFor = param.createAccessKeyFor, createAccessKeyFor = _param_createAccessKeyFor === void 0 ? undefined : _param_createAccessKeyFor, _param_network = param.network, network = _param_network === void 0 ? 'testnet' : _param_network;
        _class_call_check(this, Wallet);
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
    _create_class(Wallet, [
        {
            key: "startUp",
            value: // To be called when the website loads
            function startUp() {
                var _this = this;
                return _async_to_generator(function() {
                    var isSignedIn;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    setupWalletSelector({
                                        network: _this.network,
                                        modules: [
                                            nearWallet,
                                            // meteorWallet,
                                            setupMyNearWallet(),
                                            setupLedger(),
                                            sender,
                                            hereWallet
                                        ]
                                    })
                                ];
                            case 1:
                                _this.walletSelector = _state.sent();
                                isSignedIn = _this.walletSelector.isSignedIn();
                                if (!isSignedIn) return [
                                    3,
                                    3
                                ];
                                return [
                                    4,
                                    _this.walletSelector.wallet()
                                ];
                            case 2:
                                _this.wallet = _state.sent();
                                _this.accountId = _this.walletSelector.store.getState().accounts[0].accountId;
                                _state.label = 3;
                            case 3:
                                return [
                                    2,
                                    isSignedIn
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "account",
            value: function account() {
                var _this = this;
                return _async_to_generator(function() {
                    var _ref, acc;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.wallet.getAccounts()
                                ];
                            case 1:
                                _ref = _sliced_to_array.apply(void 0, [
                                    _state.sent(),
                                    1
                                ]), acc = _ref[0];
                                return [
                                    2,
                                    acc
                                ];
                        }
                    });
                // return this.wallet;
                })();
            }
        },
        {
            // Sign-in method
            key: "signIn",
            value: function signIn() {
                var description = 'Please select a wallet to sign in.';
                var modal = setupModal(this.walletSelector, {
                    contractId: this.createAccessKeyFor,
                    description: description
                });
                modal.show();
            }
        },
        {
            // Sign-out method
            key: "signOut",
            value: function signOut() {
                this.wallet.signOut();
                this.wallet = this.accountId = this.createAccessKeyFor = null;
                window.location.replace(window.location.origin + window.location.pathname);
            }
        },
        {
            key: "viewMethod",
            value: // Make a read-only call to retrieve information from the network
            function viewMethod(param) {
                var contractId = param.contractId, method = param.method, _param_args = param.args, args = _param_args === void 0 ? {} : _param_args;
                var _this = this;
                return _async_to_generator(function() {
                    var network, provider, res;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                network = _this.walletSelector.options.network;
                                provider = new providers.JsonRpcProvider({
                                    url: network.nodeUrl
                                });
                                return [
                                    4,
                                    provider.query({
                                        request_type: 'call_function',
                                        account_id: contractId,
                                        method_name: method,
                                        args_base64: Buffer.from(JSON.stringify(args)).toString('base64'),
                                        finality: 'optimistic'
                                    })
                                ];
                            case 1:
                                res = _state.sent();
                                return [
                                    2,
                                    JSON.parse(Buffer.from(res.result).toString())
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "callMethod",
            value: // Call a method that changes the contract's state
            function callMethod(param) {
                var contractId = param.contractId, method = param.method, _param_args = param.args, args = _param_args === void 0 ? {} : _param_args, _param_gas = param.gas, gas = _param_gas === void 0 ? THIRTY_TGAS : _param_gas, _param_deposit = param.deposit, deposit = _param_deposit === void 0 ? NO_DEPOSIT : _param_deposit;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    _this.wallet.signAndSendTransaction({
                                        signerId: _this.accountId,
                                        receiverId: contractId,
                                        actions: [
                                            {
                                                type: 'FunctionCall',
                                                params: {
                                                    methodName: method,
                                                    args: args,
                                                    gas: gas,
                                                    deposit: deposit
                                                }
                                            }
                                        ]
                                    })
                                ];
                            case 1:
                                // Sign a transaction with the "FunctionCall" action
                                return [
                                    2,
                                    _state.sent()
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "getTransactionResult",
            value: // Get transaction result from the network
            function getTransactionResult(txhash) {
                var _this = this;
                return _async_to_generator(function() {
                    var network, provider, transaction;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                network = _this.walletSelector.options.network;
                                provider = new providers.JsonRpcProvider({
                                    url: network.nodeUrl
                                });
                                return [
                                    4,
                                    provider.txStatus(txhash, 'unnused')
                                ];
                            case 1:
                                transaction = _state.sent();
                                return [
                                    2,
                                    providers.getTransactionLastResult(transaction)
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return Wallet;
}();
