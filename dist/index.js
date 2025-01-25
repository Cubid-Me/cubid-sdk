// src/index.ts
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
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
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
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
import axios from 'axios';
import { split, combine } from 'shamir-secret-sharing';
import { ethers } from 'ethers';
import { generateNEARWallet } from './src/lib/generateNearWallet';
export { CubidWidget } from './src/component/cubidWidget';
export { Provider } from './src/component/providers';
export var CubidSDK = /*#__PURE__*/ function() {
    "use strict";
    function CubidSDK(dapp_id, api_key) {
        _class_call_check(this, CubidSDK);
        _define_property(this, "dapp_id", void 0);
        _define_property(this, "api_key", void 0);
        _define_property(this, "baseUrl", void 0);
        _define_property(this, "TOTAL_SHARES", 3) // Always create 3 shares
        ;
        _define_property(this, "THRESHOLD", 2) // Need 2 shares to reconstruct
        ;
        this.dapp_id = dapp_id;
        this.api_key = api_key;
        this.baseUrl = 'https://passport.cubid.me/api/v2';
    }
    _create_class(CubidSDK, [
        {
            key: "hexToBytes",
            value: /**
     * Converts a hex string to Uint8Array
     */ function hexToBytes(hex) {
                hex = hex.replace('0x', '');
                var bytes = new Uint8Array(hex.length / 2);
                for(var i = 0; i < hex.length; i += 2){
                    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
                }
                return bytes;
            }
        },
        {
            key: "bytesToHex",
            value: /**
     * Converts Uint8Array to hex string
     */ function bytesToHex(bytes) {
                return '0x' + Array.from(bytes).map(function(b) {
                    return b.toString(16).padStart(2, '0');
                }).join('');
            }
        },
        {
            key: "makePostRequest",
            value: /**
     * Helper function to make POST HTTP requests
     */ function makePostRequest(endpoint) {
                var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var response, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    axios({
                                        url: "".concat(_this.baseUrl, "/").concat(endpoint),
                                        method: 'POST',
                                        headers: {
                                            'dapp-id': _this.dapp_id,
                                            'api-key': _this.api_key,
                                            'Content-Type': 'application/json'
                                        },
                                        data: data
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("API request to ".concat(endpoint, " failed: ").concat(_instanceof(error, Error) ? error.message : 'Unknown error'));
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "generateEthereumKey",
            value: function generateEthereumKey() {
                return _async_to_generator(function() {
                    var wallet;
                    return _ts_generator(this, function(_state) {
                        wallet = ethers.Wallet.createRandom();
                        return [
                            2,
                            {
                                privateKey: wallet.privateKey,
                                address: wallet.address
                            }
                        ];
                    });
                })();
            }
        },
        {
            key: "generateNearKey",
            value: function generateNearKey() {
                return _async_to_generator(function() {
                    var wallet;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    generateNEARWallet()
                                ];
                            case 1:
                                wallet = _state.sent();
                                return [
                                    2,
                                    {
                                        privateKey: wallet.privateKey,
                                        address: wallet.publicKey
                                    }
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "encryptPrivateKey",
            value: /**
     * Generates and encrypts an Ethereum private key using Shamir's Secret Sharing
     */ function encryptPrivateKey(param) {
                var user_id = param.user_id, wallet_type = param.wallet_type;
                var _this = this;
                return _async_to_generator(function() {
                    var walletInfo, _tmp, secretBytes, shares, hexShares, _hexShares, userShare1, userShare2, apiShare, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    7,
                                    ,
                                    8
                                ]);
                                console.log('Starting private key encryption process for user:', user_id);
                                if (!user_id) {
                                    throw new Error('User ID is required');
                                }
                                if (!(wallet_type === "near")) return [
                                    3,
                                    2
                                ];
                                return [
                                    4,
                                    _this.generateNearKey()
                                ];
                            case 1:
                                _tmp = _state.sent();
                                return [
                                    3,
                                    4
                                ];
                            case 2:
                                return [
                                    4,
                                    _this.generateEthereumKey()
                                ];
                            case 3:
                                _tmp = _state.sent();
                                _state.label = 4;
                            case 4:
                                walletInfo = _tmp;
                                secretBytes = _this.hexToBytes(walletInfo.privateKey);
                                return [
                                    4,
                                    split(secretBytes, _this.TOTAL_SHARES, _this.THRESHOLD)
                                ];
                            case 5:
                                shares = _state.sent();
                                hexShares = shares.map(function(share) {
                                    return _this.bytesToHex(share);
                                });
                                _hexShares = _sliced_to_array(hexShares, 3), userShare1 = _hexShares[0], userShare2 = _hexShares[1], apiShare = _hexShares[2];
                                return [
                                    4,
                                    _this.saveSecret({
                                        user_id: user_id,
                                        secret: apiShare
                                    })
                                ];
                            case 6:
                                _state.sent();
                                return [
                                    2,
                                    {
                                        user_shares: [
                                            userShare1,
                                            userShare2
                                        ],
                                        public_address: walletInfo.address
                                    }
                                ];
                            case 7:
                                error = _state.sent();
                                console.error('Encryption process failed:', {
                                    error: _instanceof(error, Error) ? error.message : 'Unknown error',
                                    stack: _instanceof(error, Error) ? error.stack : '',
                                    userId: user_id,
                                    timestamp: new Date().toISOString()
                                });
                                throw new Error("Encryption failed: ".concat(_instanceof(error, Error) ? error.message : 'Unknown error'));
                            case 8:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "decryptPrivateKey",
            value: /**
     * Decrypts a private key using user shares and retrieving API share
     */ function decryptPrivateKey(param) {
                var userShares = param.userShares, user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    var apiShareResponse, shareBytes, recoveredBytes, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    3,
                                    ,
                                    4
                                ]);
                                if (!Array.isArray(userShares) || userShares.length !== 2) {
                                    throw new Error('Exactly two user shares are required');
                                }
                                if (!user_id) {
                                    throw new Error('User ID is required');
                                }
                                return [
                                    4,
                                    _this.fetchUserData({
                                        user_id: user_id
                                    })
                                ];
                            case 1:
                                apiShareResponse = _state.sent();
                                if (!(apiShareResponse === null || apiShareResponse === void 0 ? void 0 : apiShareResponse.secret)) {
                                    throw new Error('Failed to retrieve share from API');
                                }
                                shareBytes = _to_consumable_array(userShares).concat([
                                    apiShareResponse.secret
                                ]).map(function(share) {
                                    return _this.hexToBytes(share);
                                });
                                return [
                                    4,
                                    combine(shareBytes.slice(0, _this.THRESHOLD))
                                ];
                            case 2:
                                recoveredBytes = _state.sent();
                                return [
                                    2,
                                    _this.bytesToHex(recoveredBytes)
                                ];
                            case 3:
                                error = _state.sent();
                                throw new Error("Decryption failed: ".concat(_instanceof(error, Error) ? error.message : 'Unknown error'));
                            case 4:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "fetchApproxLocation",
            value: // API Methods
            function fetchApproxLocation(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_approx_location', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchExactLocation",
            value: function fetchExactLocation(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_exact_location', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchIdentity",
            value: function fetchIdentity(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_identity', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchRoughLocation",
            value: function fetchRoughLocation(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_rough_location', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchUserData",
            value: function fetchUserData(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_user_data', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchScore",
            value: function fetchScore(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('score/fetch_score', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "createUser",
            value: function createUser(param) {
                var email = param.email, phone = param.phone, evm = param.evm;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('create_user', {
                                dapp_id: _this.dapp_id,
                                apikey: _this.api_key,
                                email: email,
                                phone: phone,
                                evm: evm
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "saveSecret",
            value: function saveSecret(param) {
                var user_id = param.user_id, secret = param.secret;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('save_secret', {
                                user_id: user_id,
                                api_key: _this.api_key,
                                secret: secret
                            })
                        ];
                    });
                })();
            }
        }
    ]);
    return CubidSDK;
}();
