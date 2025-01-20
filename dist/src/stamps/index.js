/* eslint-disable jsx-a11y/alt-text */ /* eslint-disable @next/next/no-img-element */ // @ts-nocheck
"use client";
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
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
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { PhoneNumberConnect } from './phoneNumberConnect';
import { LocationSearchPanel } from './setLocationPanel';
import { AdvancedCredentialCollection } from "./addStampVerify";
import { InfoTooltip } from '../component/infoTooltip';
import { Button } from "../component/button";
import { LoginOptions } from '../component/loginOptions';
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { wallet } from '../component/providers';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet as useSolanaWallet } from "@solana/wallet-adapter-react";
import { VerificationModal } from '../component/blackListing/index';
var useFarcasterProfile, SignInButton;
_async_to_generator(function() {
    var authKit;
    return _ts_generator(this, function(_state) {
        switch(_state.label){
            case 0:
                return [
                    4,
                    import("@farcaster/auth-kit")
                ];
            case 1:
                authKit = _state.sent();
                useFarcasterProfile = authKit.useProfile;
                SignInButton = authKit.SignInButton;
                return [
                    2
                ];
        }
    });
})();
export var stampsWithId = {
    facebook: 1,
    github: 2,
    google: 3,
    twitter: 4,
    discord: 5,
    poh: 6,
    iah: 7,
    brightid: 8,
    gitcoin: 9,
    instagram: 10,
    phone: 11,
    gooddollar: 12,
    "near-wallet": 15,
    fractal: 17,
    evm: 14,
    email: 13,
    solana: 53,
    telegram: 27,
    worldcoin: 26,
    near: 15,
    "lens-protocol": 66,
    farcaster: 68,
    address: 70
};
var socialDataToMap = [
    {
        local_key: "facebook_data",
        supabase_key: "facebook",
        stampTypeId: 1,
        title: "Facebook",
        image: "https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg",
        color: "info"
    },
    {
        local_key: "github_data",
        supabase_key: "github",
        stampTypeId: 2,
        title: "Github",
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhITERIWFRAVFRUWFxYRFhUYFRAYFREaFxcSFhMYHCghGR4lGxYVITEiJSkrLi4uFx8zODMtNygtLi0BCgoKDQ0ODw8PDysZFRkrKysrKy0rKys3KystKy0tLSsrKystKys3KystKysrKystKysrKysrKysrKy0rKystK//AABEIAOAA4AMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABwgBBQYEAgP/xABJEAABAwICBwQECQkGBwAAAAABAAIDBBEFIQYHEjFBUXETImGBQnKRoQgUIzJic4KisSQzNVJTsrPBwkOSk6PD4RUlVGN0g4T/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwCcUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBF8yPABJIAGZJyA81yuK6yMLp7h9ZG5w3thvK4HlaMHNB1iKLKzXnQN/NwVEnjsxsHvdf3LUS6/Bfu4cSObqkA+wRH8VcE1IoVj1+Z97DiBzbUgn2GIfittR686B352Coj8bMePc6/uTBKiLk8J1j4XUWDKyNrjkGzXiJO61pAM7rqo3ggEEEHcRmD0Kg+kREBERAREQEREBERAREQEREBERARYJUfaw9Z8FBtQw2mrbfNv3IMsjKRx47Az6b0HaYvjEFLGZamVsUY9J5tc8gN5PgFEGlOu83LMOhFv21QDn4thH4uPkopx7HKisl7WqldJJwvk2MfqsaMmjotctSJraY5pDV1jtqqqJJc7hrz3G+rGLNHsWrCIqgiIgIiIoVs8D0hq6M3paiSLO5aw9x3rRm7T7FrEREz6La8DcMxGEW/bU43eLoT+LT5KX8IxiCqjEtNK2WM+kw3seRHA+BzVOVssBx2oo5RLSyujfle2bZAPRew5OHVTF1cJFHurvWhBX7MM9oa3g2/cn8YieP0Tn1Ug3WVZREQEREBERAREQEREBYKyo01w6fGij+K0zvyyVty4HOmjOW165ztysTyuGs1r6zzAX0dC75cZSzg/mOcbPp8z6Pid0FON7km5OZJzJJNySeJWEW8QReqmw6eQF0UMsjRkXRxveAeRLR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",
        color: "secondary"
    },
    {
        local_key: "google_data",
        supabase_key: "google",
        stampTypeId: 3,
        title: "Google",
        image: "https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw",
        color: "primary"
    },
    {
        local_key: "twitter_data",
        supabase_key: "twitter",
        stampTypeId: 4,
        title: "Twitter",
        image: "data:image/png;base64,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",
        color: "error"
    },
    {
        local_key: "discord_data",
        supabase_key: "discord",
        stampTypeId: 5,
        title: "Discord",
        image: "data:image/png;base64,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",
        color: "error"
    }
];
export var Stamps = function(param) {
    var stampToRender = param.stampToRender, uuid = param.uuid, page_id = param.page_id, api_key = param.api_key, isGrid = param.isGrid, onStampChange = param.onStampChange, showAllowCreds = param.showAllowCreds, email = param.email, allStampIds = param.allStampIds, refresh = param.refresh, onBlacklistVerify = param.onBlacklistVerify;
    var detectInputFormat = function detectInputFormat(input) {
        if (typeof input !== 'string') {
            return 'invalid';
        }
        // Email regex pattern
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        // Phone regex pattern - supports multiple formats:
        // +1234567890, 123-456-7890, (123) 456-7890, 123.456.7890
        var phonePattern = /^(\+\d{1,3}[ -]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        // Ethereum wallet address pattern (starts with 0x followed by 40 hexadecimal characters)
        var walletPattern = /^0x[a-fA-F0-9]{40}$/;
        // Test the input against each pattern
        if (emailPattern.test(input)) {
            return 'email';
        } else if (phonePattern.test(input)) {
            return 'phone';
        } else if (walletPattern.test(input)) {
            return 'wallet';
        }
        return 'unknown';
    };
    var _useState = _sliced_to_array(useState([]), 2), allStamps = _useState[0], setAllStamps = _useState[1];
    var _useState1 = _sliced_to_array(useState(true), 2), stampLoading = _useState1[0], setStampLoading = _useState1[1];
    var _useState2 = _sliced_to_array(useState(false), 2), phoneOpen = _useState2[0], setPhoneOpen = _useState2[1];
    var _useState3 = _sliced_to_array(useState(false), 2), addressOpen = _useState3[0], setAddressOpen = _useState3[1];
    var _useState4 = _sliced_to_array(useState(false), 2), verifyStampFlow = _useState4[0], setVerifyStampFlow = _useState4[1];
    var address = useAccount().address;
    var _useConnect = useConnect({}), connectors = _useConnect.connectors, connect = _useConnect.connect;
    var disconnect = useDisconnect().disconnect;
    var _useState5 = _sliced_to_array(useState(false), 2), lensModalOpen = _useState5[0], setLensModalOpen = _useState5[1];
    var _useState6 = _sliced_to_array(useState(false), 2), blacklist = _useState6[0], setBlacklist = _useState6[1];
    var _useState7 = _sliced_to_array(useState({
        "type": "",
        "value": "",
        "actual": ""
    }), 2), blacklistCred = _useState7[0], setBlacklistCred = _useState7[1];
    var fetchStampData = useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var response, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    setStampLoading(true);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        4,
                        5
                    ]);
                    onStampChange === null || onStampChange === void 0 ? void 0 : onStampChange();
                    return [
                        4,
                        axios.post("https://passport.cubid.me/api/v2/identity/fetch_stamps", {
                            user_id: uuid,
                            apikey: api_key,
                            page_id: page_id
                        })
                    ];
                case 2:
                    response = _state.sent();
                    setAllStamps(response.data.all_stamps);
                    return [
                        3,
                        5
                    ];
                case 3:
                    error = _state.sent();
                    console.error("Error fetching stamps:", error);
                    return [
                        3,
                        5
                    ];
                case 4:
                    setStampLoading(false);
                    return [
                        7
                    ];
                case 5:
                    return [
                        2
                    ];
            }
        });
    }), [
        uuid,
        api_key,
        page_id,
        onStampChange
    ]);
    var connectToWeb3Node = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var _ref, _ref_data, stamps, scores, stampId;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!address) return [
                            3,
                            5
                        ];
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/gitcoin-passport-data", {
                                address: address
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), _ref_data = _ref.data, stamps = _ref_data.stamps, scores = _ref_data.scores;
                        stampId = stampsWithId.gitcoin;
                        if (!(scores.score !== "0E-9")) return [
                            3,
                            3
                        ];
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                                stamp_type: 'gitcoin',
                                user_data: {
                                    user_id: uuid,
                                    uuid: ""
                                },
                                stampData: {
                                    identity: address,
                                    uniquevalue: address,
                                    stamps: stamps,
                                    scores: scores
                                },
                                page_id: page_id
                            })
                        ];
                    case 2:
                        _state.sent();
                        _state.label = 3;
                    case 3:
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                                stamp_type: 'evm',
                                user_data: {
                                    user_id: uuid,
                                    uuid: ""
                                },
                                stampData: {
                                    identity: address,
                                    uniquevalue: address
                                },
                                page_id: page_id
                            })
                        ];
                    case 4:
                        _state.sent();
                        fetchStampData();
                        disconnect();
                        _state.label = 5;
                    case 5:
                        return [
                            2
                        ];
                }
            });
        });
        return function connectToWeb3Node() {
            return _ref.apply(this, arguments);
        };
    }();
    useEffect(function() {
        if (address && !localStorage.getItem("lens-loggin")) {
            connectToWeb3Node(address);
        }
    }, [
        connectToWeb3Node,
        address
    ]);
    var _useFarcasterProfile;
    var _ref = (_useFarcasterProfile = useFarcasterProfile === null || useFarcasterProfile === void 0 ? void 0 : useFarcasterProfile()) !== null && _useFarcasterProfile !== void 0 ? _useFarcasterProfile : {}, isFarcasterAuthenticated = _ref.isAuthenticated, profile = _ref.profile;
    useEffect(function() {
        fetchStampData();
    }, [
        fetchStampData
    ]);
    useEffect(function() {
        if (isFarcasterAuthenticated && (profile === null || profile === void 0 ? void 0 : profile.fid) && (profile === null || profile === void 0 ? void 0 : profile.username)) {
            _async_to_generator(function() {
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            return [
                                4,
                                axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                                    page_id: page_id,
                                    stamp_type: "farcaster",
                                    stampData: {
                                        uniquevalue: profile.fid,
                                        identity: profile.username
                                    },
                                    user_data: {
                                        uuid: uuid
                                    }
                                })
                            ];
                        case 1:
                            _state.sent();
                            fetchStampData();
                            return [
                                2
                            ];
                    }
                });
            })();
        }
    }, [
        isFarcasterAuthenticated,
        profile,
        uuid,
        fetchStampData,
        page_id
    ]);
    var doesStampExist = function(stamp_id) {
        return allStamps.some(function(param) {
            var stamptype = param.stamptype;
            return stamptype === stamp_id;
        });
    };
    var handleSocialConnect = function(supabase_key) {
        window.location.href = "https://allow.cubid.me/widget-allow?uid=".concat(uuid, "&social_provider=").concat(supabase_key, "&page_id=").concat(page_id);
    };
    useEffect(function() {
        var interval = setInterval(function() {
            if (localStorage.getItem("logged_in") == uuid && Boolean(showAllowCreds)) {
                setVerifyStampFlow(true);
            } else if (!Boolean(showAllowCreds)) {
                setVerifyStampFlow(false);
            }
        }, 1000);
        return function() {
            clearInterval(interval);
        };
    }, [
        uuid,
        showAllowCreds,
        refresh
    ]);
    var fetchNearWallet = useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var dataCategory;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!(wallet === null || wallet === void 0 ? void 0 : wallet.accountId)) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        wallet.viewMethod({
                            contractId: "registry.i-am-human.near",
                            method: "sbt_tokens_by_owner",
                            args: {
                                account: "".concat(wallet.accountId),
                                issuer: "fractal.i-am-human.near"
                            }
                        })
                    ];
                case 1:
                    dataCategory = _state.sent();
                    if (!uuid) return [
                        3,
                        4
                    ];
                    return [
                        4,
                        axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                            stamp_type: 'iah',
                            user_data: {
                                uuid: uuid
                            },
                            stampData: {
                                identity: wallet.accountId,
                                uniquevalue: wallet.accountId
                            },
                            page_id: page_id
                        })
                    ];
                case 2:
                    _state.sent();
                    return [
                        4,
                        axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                            stamp_type: 'near-wallet',
                            user_data: {
                                uuid: uuid
                            },
                            stampData: {
                                identity: wallet.accountId,
                                uniquevalue: wallet.accountId
                            },
                            page_id: page_id
                        })
                    ];
                case 3:
                    _state.sent();
                    wallet.signOut();
                    _state.label = 4;
                case 4:
                    return [
                        2
                    ];
            }
        });
    }), []);
    var _useState8 = _sliced_to_array(useState(false), 2), gitcoinModalOpen = _useState8[0], setGitcoinModalOpen = _useState8[1];
    var _useSolanaWallet = useSolanaWallet(), publicKey = _useSolanaWallet.publicKey, solConnected = _useSolanaWallet.connected;
    useEffect(function() {
        _async_to_generator(function() {
            var string_publicKey, _, _tmp, _tmp1;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!(!doesStampExist(stampsWithId["solana"]) && solConnected)) return [
                            3,
                            3
                        ];
                        string_publicKey = publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString();
                        _ = axios.post;
                        _tmp = [
                            "https://passport.cubid.me/api/v2/identity/add_stamp"
                        ];
                        _tmp1 = {
                            stamp_type: 'solana',
                            user_data: {
                                uuid: uuid
                            },
                            stampData: {
                                identity: publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString(),
                                uniquevalue: publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString()
                            }
                        };
                        return [
                            4,
                            getIdForApp()
                        ];
                    case 1:
                        return [
                            4,
                            _.apply(axios, _tmp.concat([
                                (_tmp1.app_id = _state.sent(), _tmp1)
                            ]))
                        ];
                    case 2:
                        _state.sent();
                        fetchStampData();
                        _state.label = 3;
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    }, [
        publicKey,
        solConnected
    ]);
    var _useState9 = _sliced_to_array(useState(false), 2), showTelegramScript = _useState9[0], setShowTelegramScript = _useState9[1];
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(VerificationModal, {
        type: blacklistCred.type,
        credType: detectInputFormat(blacklistCred.value),
        isOpen: blacklist,
        onClose: function() {
            setBlacklist(false);
        },
        onSuccess: function() {
            setBlacklist(false);
            onBlacklistVerify({
                secondaryAcc: blacklistCred.value
            });
        },
        onError: function() {},
        duplicateInfo: {
            maskedEmail: blacklistCred === null || blacklistCred === void 0 ? void 0 : blacklistCred.value
        },
        realInfo: {
            email: blacklistCred.value
        }
    }), console.log({
        blacklistCred: blacklistCred
    }), /*#__PURE__*/ React.createElement("div", {
        style: {
            display: "grid",
            gridTemplateColumns: "1fr",
            pointerEvents: stampLoading ? "none" : "auto"
        }
    }, socialDataToMap.filter(function(item) {
        return item.supabase_key === stampToRender;
    }).map(function(item) {
        return /*#__PURE__*/ React.createElement("div", {
            style: {
                border: "1px solid #ccc",
                width: isGrid ? "100%" : "300px",
                height: "190px",
                borderRadius: "12px",
                padding: "16px 24px",
                marginBottom: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            },
            key: item.supabase_key
        }, /*#__PURE__*/ React.createElement("div", {
            style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
            }
        }, /*#__PURE__*/ React.createElement("img", {
            src: item.image,
            alt: "".concat(item.title, " logo"),
            style: {
                marginBottom: "8px",
                width: "40px",
                height: "40px",
                borderRadius: "8px"
            }
        }), /*#__PURE__*/ React.createElement("h2", {
            style: {
                fontSize: "20px",
                fontWeight: "bold"
            }
        }, item.title), /*#__PURE__*/ React.createElement("p", {
            style: {
                fontSize: "14px",
                color: "#666",
                marginTop: "4px"
            }
        }, showAllowCreds ? /*#__PURE__*/ React.createElement("span", {
            className: "font-bold"
        }, "You need to verify your stamp") : doesStampExist(item.stampTypeId) ? "Your ".concat(item.supabase_key, " account is verified") : "Connect your ".concat(item.supabase_key, " to verify"))), verifyStampFlow ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(AdvancedCredentialCollection, {
            uuid: uuid,
            refresh: function() {
                setVerifyStampFlow(false);
                refresh();
            },
            allStampIds: allStampIds,
            email: email,
            apikey: api_key
        })) : /*#__PURE__*/ React.createElement("div", {
            style: {
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px"
            }
        }, showAllowCreds ? /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("button", {
            style: {
                backgroundColor: "#FFBF00",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "12px",
                border: "none"
            },
            onClick: function() {
                setVerifyStampFlow(true);
            }
        }, "Verify Stamp"), /*#__PURE__*/ React.createElement("span", {
            style: {
                paddingLeft: 10
            }
        }, /*#__PURE__*/ React.createElement(InfoTooltip, {
            content: /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("p", {
                style: {
                    fontSize: 14,
                    color: "red"
                }
            }, "We found a cubid credential for a different app.", /*#__PURE__*/ React.createElement("br", null), " Send a one time passcode to verify it"))
        }))) : doesStampExist(item.stampTypeId) ? /*#__PURE__*/ React.createElement("button", {
            style: {
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "12px",
                border: "none"
            }
        }, "Verified Stamp") : /*#__PURE__*/ React.createElement("button", {
            onClick: function() {
                return handleSocialConnect(item.supabase_key);
            },
            style: {
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "8px 16px",
                borderRadius: "12px",
                border: "none"
            }
        }, "Connect Account")));
    }), stampToRender === "iah" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-4"
    }, /*#__PURE__*/ React.createElement("img", {
        src: "data:image/png;base64,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",
        alt: "Image",
        className: "mb-1 size-10 rounded-md"
    }), /*#__PURE__*/ React.createElement("h2", {
        className: "font-bold"
    }, "I-Am-Human")), /*#__PURE__*/ React.createElement("div", null, doesStampExist(stampsWithId["iah"]) ? /*#__PURE__*/ React.createElement("p", {
        className: "text-green-600"
    }, "Your NEAR account is verified") : /*#__PURE__*/ React.createElement("p", null, "Use a NEAR wallet to connect your IAH-verified account")), /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, false ? /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("button", {
        style: {
            borderRadius: 10
        },
        className: "bg-green-500 text-white px-4 py-2 rounded"
    }, "Verified Stamp")), /*#__PURE__*/ React.createElement("div", {
        className: "relative"
    })) : /*#__PURE__*/ React.createElement("button", {
        onClick: function() {
            wallet.signIn();
        },
        style: {
            borderRadius: 10
        },
        className: "bg-blue-500 text-white px-4 py-2"
    }, "Connect Wallet")))), stampToRender === "brightid" && /*#__PURE__*/ React.createElement("p", null, "brightid"), stampToRender === "gitcoin" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "items-center"
    }, /*#__PURE__*/ React.createElement("img", {
        src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAP1BMVEUAQzsAQzsAQzsAPTQAQDgANy2WpaM/Yl0ALiP///+otbMACAAAJxpSb2rd4uJogXzK0dCBlZIjUUq7xcTz9fUp8LglAAAAAnRSTlMm5BIqaH0AAADfSURBVHgBfNKBCsMgDEXRzSQ2z0a12v//1tUyoM61FxTgYCDg6/V2N71nG9Q9dEFiJ3yD5BfxC/9HRVgRjO4wIvmsMiMZvnnlH2RJSFFNY0ESHlETEPSckJF0QPHICHLkRBI2uqIiWa7ii7cNaHJ9SRGZSBN2AGUvOuCGyseV14ywNgwoHtQvI4O3ABtww8IU0ZaGJGUfXnKFF6ceQAMQ5Ip9TXVOaq7qyu+eFFGMHdNxrMEG7CMLK/U0jNi1L7/lo1gmdFIbvs3oWLTGs4Un7NFZtxHnnvH5U3+GLzsAAOyFDgN+WSNyAAAAAElFTkSuQmCC",
        alt: "Image",
        className: "mb-1 size-10 rounded-md"
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h2", {
        className: "font-bold"
    }, "Gitcoin Passport"), /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-600"
    }, "Connect to import your existing Gitcoin Passport"))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-2"
    }, doesStampExist(stampsWithId.gitcoin) ? /*#__PURE__*/ React.createElement("div", {
        style: {
            display: "flex",
            justifyContent: "space-between"
        }
    }, /*#__PURE__*/ React.createElement("button", {
        style: {
            borderRadius: 10
        },
        className: "bg-green-500 text-white px-4 py-2 rounded"
    }, "Verified Stamp")) : /*#__PURE__*/ React.createElement(React.Fragment, null, gitcoinModalOpen && /*#__PURE__*/ React.createElement("div", {
        className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "bg-white rounded-lg p-6 w-96"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-xl font-bold mb-2"
    }, "Connect Web3 Wallet for Gitcoin Passport"), connectors.map(function(connector) {
        return /*#__PURE__*/ React.createElement("button", {
            key: connector.uid,
            className: "bg-blue-500 text-white px-4 py-2 rounded w-full mb-4",
            onClick: function() {
                return connect({
                    connector: connector
                });
            }
        }, connector.name);
    }), /*#__PURE__*/ React.createElement("button", {
        className: "mt-4 text-red-500",
        style: {
            borderRadius: 10
        },
        onClick: function() {
            return setGitcoinModalOpen(false);
        }
    }, "Close"))), /*#__PURE__*/ React.createElement("button", {
        className: "bg-blue-500 text-white px-4 py-2 rounded",
        onClick: function() {
            return setGitcoinModalOpen(true);
        }
    }, "Connect Gitcoin"))))), stampToRender === "instagram" && /*#__PURE__*/ React.createElement("p", null, "instagram"), stampToRender === "gooddollar" && /*#__PURE__*/ React.createElement("p", null, "gooddollar"), stampToRender === "near-wallet" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-4"
    }, /*#__PURE__*/ React.createElement("img", {
        src: "data:image/png;base64,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",
        alt: "Image",
        className: "mb-1 size-10 rounded-md"
    }), /*#__PURE__*/ React.createElement("h2", {
        className: "font-bold"
    }, "Near")), /*#__PURE__*/ React.createElement("div", null, doesStampExist(stampsWithId["iah"]) ? /*#__PURE__*/ React.createElement("p", {
        className: "text-green-600"
    }, "Your NEAR account is verified") : /*#__PURE__*/ React.createElement("p", null, "Use a NEAR wallet")), /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, false ? /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("button", {
        style: {
            borderRadius: 10
        },
        className: "bg-green-500 text-white px-4 py-2 rounded"
    }, "Verified Stamp")), /*#__PURE__*/ React.createElement("div", {
        className: "relative"
    })) : /*#__PURE__*/ React.createElement("button", {
        onClick: function() {
            wallet.signIn();
        },
        style: {
            borderRadius: 10
        },
        className: "bg-blue-500 text-white px-4 py-2"
    }, "Connect Wallet")))), stampToRender === "fractal" && /*#__PURE__*/ React.createElement("p", null, "fractal"), stampToRender === "solana" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "items-center"
    }, /*#__PURE__*/ React.createElement("img", {
        src: "data:image/webp;base64,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",
        alt: "Image",
        className: "mb-1 object-cover rounded-md",
        style: {
            width: 40,
            height: 40
        }
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h2", {
        className: "font-bold"
    }, "Solana"), doesStampExist(stampsWithId["solana"]) ? /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-1"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-600"
    }, "Your Solana address is verified"), /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "#00e64d",
        className: "size-6"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }))) : /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-600"
    }, "Connect to Solana"))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, doesStampExist(stampsWithId["solana"]) ? /*#__PURE__*/ React.createElement("div", {
        style: {
            display: "flex",
            justifyContent: "space-between"
        }
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: function() {
        // connect worldcoin wallet
        },
        style: {
            borderRadius: 10
        },
        className: "bg-green-500 text-white px-4 py-2 rounded"
    }, "Solana Connected")) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(WalletMultiButton, null))))), stampToRender === "telegram" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "items-center"
    }, /*#__PURE__*/ React.createElement("img", {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png",
        alt: "Image",
        className: "mb-1 size-10 rounded-md object-cover"
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h2", {
        className: "font-bold"
    }, "Telegram"), doesStampExist(stampsWithId.telegram) ? /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-1"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-600"
    }, "Your telegram is verified"), /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "#00e64d",
        className: "size-6"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }))) : /*#__PURE__*/ React.createElement("p", {
        className: "text-gray-600"
    }, "Verify your telegram"))), /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, doesStampExist(stampsWithId.telegram) ? /*#__PURE__*/ React.createElement("div", {
        style: {
            display: "flex",
            justifyContent: "space-between"
        }
    }, /*#__PURE__*/ React.createElement("button", {
        className: "bg-green-500 text-white px-4 py-2 rounded"
    }, "Verified Stamp")) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("button", {
        onClick: function() {
            setShowTelegramScript(true);
        },
        className: "bg-blue-500 text-white px-4 py-2 rounded"
    }, "Connect Telegram"), showTelegramScript && /*#__PURE__*/ React.createElement("div", {
        className: "p-3"
    }, /*#__PURE__*/ React.createElement("script", {
        async: true,
        src: "https://telegram.org/js/telegram-widget.js?22",
        "data-telegram-login": "cubid_bot",
        "data-size": "medium",
        "data-auth-url": "https://passport.cubid.me/telegram",
        "data-request-access": "write"
    })))))), stampToRender === "worldcoin" && /*#__PURE__*/ React.createElement("p", null, "worldcoin"), stampToRender === "near" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-4"
    }, /*#__PURE__*/ React.createElement("img", {
        src: "data:image/png;base64,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",
        alt: "Image",
        className: "mb-1 size-10 rounded-md"
    }), /*#__PURE__*/ React.createElement("h2", {
        className: "font-bold"
    }, "Near")), /*#__PURE__*/ React.createElement("div", null, doesStampExist(stampsWithId["iah"]) ? /*#__PURE__*/ React.createElement("p", {
        className: "text-green-600"
    }, "Your NEAR account is verified") : /*#__PURE__*/ React.createElement("p", null, "Use a NEAR wallet")), /*#__PURE__*/ React.createElement("div", {
        className: "mt-4"
    }, false ? /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement("button", {
        style: {
            borderRadius: 10
        },
        className: "bg-green-500 text-white px-4 py-2 rounded"
    }, "Verified Stamp")), /*#__PURE__*/ React.createElement("div", {
        className: "relative"
    })) : /*#__PURE__*/ React.createElement("button", {
        onClick: function() {
            wallet.signIn();
        },
        style: {
            borderRadius: 10
        },
        className: "bg-blue-500 text-white px-4 py-2"
    }, "Connect Wallet")))), stampToRender === "lens-protocol" && /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            borderRadius: "12px",
            marginBottom: "16px",
            padding: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            height: "auto"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: "mb-3"
    }, /*#__PURE__*/ React.createElement("img", {
        src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAZlBMVEX////r6+uDg4VMTU9TVFaYmJn6+vrCw8MAAAAfICQlJioaGx/k5eXy8vIpKi4sLTCwsLFub3FcXV4XGB0VFxvc3N3Ozs55enshIyZDREcJDBKAgYK6urs1Njk8PD+bm53V1danqKn7JVr2AAAAm0lEQVR4AdXOxQGAIABAUZVuu3P/Ie2WBfwXhUc5v831AETYboQyzoWQNlNMmzkOnGd+EHrSj8xanKRZmJHDYJxzlhd6Qw2inOdltZm3bVnt+inr9Y3zyBKHCyalsaUbNaMUdmzV+h5uQ7a9iJS2jZG7Pbcr9cfK1Nmrc/Y00fTOmazKi7UQSF22cRkLxkRc8ouuEtIhNBDX+WkTbzIRXoEbjE4AAAAASUVORK5CYII=',
        alt: "Image",
        className: "mb-1 w-10 h-10 rounded-md"
    }), /*#__PURE__*/ React.createElement("h3", {
        className: "text-xl font-bold"
    }, "Lens Protocol"), doesStampExist(stampsWithId["lens-protocol"]) ? /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-1 text-sm text-gray-600 mt-1"
    }, /*#__PURE__*/ React.createElement("p", null, "Your Lens Protocol is verified"), /*#__PURE__*/ React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "#00e64d",
        className: "w-6 h-6"
    }, /*#__PURE__*/ React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M9 12.75L11.25 15 15 9.75M21 12a9  9 0 11-18 0 9 9 0 0118 0z"
    }))) : /*#__PURE__*/ React.createElement("p", {
        className: "text-sm texAccountt-gray-600 mt-1"
    }, "Use a Lens Protocol")), /*#__PURE__*/ React.createElement("div", null, doesStampExist(stampsWithId["lens-protocol"]) ? /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center justify-between"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex items-center space-x-2"
    }, /*#__PURE__*/ React.createElement(Button, null, "Verified Stamp"))) : /*#__PURE__*/ React.createElement(React.Fragment, null, address ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(LoginOptions, {
        wallet: address !== null && address !== void 0 ? address : "",
        onSuccess: /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function(args) {
                var _args_handle_linkedTo, _args_handle, _args_handle1;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            return [
                                4,
                                axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                                    page_id: page_id,
                                    stamp_type: "lens-protocol",
                                    stampData: _object_spread_props(_object_spread({
                                        uniquevalue: args === null || args === void 0 ? void 0 : (_args_handle = args.handle) === null || _args_handle === void 0 ? void 0 : (_args_handle_linkedTo = _args_handle.linkedTo) === null || _args_handle_linkedTo === void 0 ? void 0 : _args_handle_linkedTo.nftTokenId,
                                        identity: (_args_handle1 = args.handle) === null || _args_handle1 === void 0 ? void 0 : _args_handle1.fullHandle
                                    }, args), {
                                        metdata: _object_spread_props(_object_spread({}, args === null || args === void 0 ? void 0 : args.metadata), {
                                            picture: null
                                        })
                                    }),
                                    user_data: {
                                        uuid: uuid
                                    }
                                })
                            ];
                        case 1:
                            _state.sent();
                            disconnect();
                            fetchStampData();
                            return [
                                2
                            ];
                    }
                });
            // window.location.reload()
            });
            return function(args) {
                return _ref.apply(this, arguments);
            };
        }()
    })) : /*#__PURE__*/ React.createElement(React.Fragment, null, lensModalOpen && /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #eee",
            borderRadius: "8px",
            padding: "16px",
            marginTop: "8px"
        }
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-lg font-semibold mb-2"
    }, "Connect Web3 Wallet for Lens"), connectors.map(function(connector) {
        return /*#__PURE__*/ React.createElement(Button, {
            key: connector.uid,
            variant: "secondary",
            className: "bg-blue-500 mb-4 text-white",
            style: {
                width: "200px"
            },
            onClick: function() {
                var _localStorage;
                (_localStorage = localStorage) === null || _localStorage === void 0 ? void 0 : _localStorage.setItem("lens-loggin", "true");
                connect({
                    connector: connector
                });
            }
        }, connector.name);
    })), /*#__PURE__*/ React.createElement(Button, {
        variant: "outline",
        className: "bg-blue-500 text-white",
        style: {
            marginTop: "8px",
            borderRadius: 10
        },
        onClick: function() {
            setLensModalOpen(true);
        }
    }, "Connect Lens Wallet"))))), stampToRender === "phone" && /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }
    }, /*#__PURE__*/ React.createElement("img", {
        src: "https://i.pinimg.com/736x/84/4e/8c/844e8cd4ab26c82286238471f0e5a901.jpg",
        alt: "Farcaster logo",
        style: {
            marginBottom: "8px",
            width: "40px",
            height: "40px",
            borderRadius: "8px"
        }
    }), /*#__PURE__*/ React.createElement("h2", {
        style: {
            fontSize: "20px",
            fontWeight: "bold"
        }
    }, "Phone"), doesStampExist(stampsWithId.phone) ? /*#__PURE__*/ React.createElement("button", {
        style: {
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "12px",
            border: "none"
        }
    }, "Verified Stamp") : /*#__PURE__*/ React.createElement("div", {
        style: {
            borderRadius: "8px",
            padding: "8px 12px"
        }
    }, /*#__PURE__*/ React.createElement("p", {
        style: {
            fontSize: "14px",
            color: "#666"
        }
    }, "Connect your phone"), /*#__PURE__*/ React.createElement("button", {
        onClick: function() {
            setPhoneOpen(true);
        },
        style: {
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: "12px",
            border: "none",
            marginTop: "8px"
        }
    }, "Connect Phone")))), stampToRender === "farcaster" && /*#__PURE__*/ React.createElement("div", {
        className: "border ".concat(isGrid ? "w-full" : "w-[300px]", " rounded-xl p-4 px-6 mb-4 shadow-md")
    }, /*#__PURE__*/ React.createElement("div", {
        className: "flex flex-col items-start"
    }, /*#__PURE__*/ React.createElement("img", {
        src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0LwYIlZ9aYglKkSRuhEH0TM6VkCmqRqXpQ&s",
        alt: "Farcaster logo",
        className: "mb-1 size-10 rounded-md"
    }), /*#__PURE__*/ React.createElement("h2", {
        className: "text-xl font-bold"
    }, "Farcaster"), doesStampExist(4) ? /*#__PURE__*/ React.createElement("p", {
        className: "text-sm text-gray-600 mt-1"
    }, "Your Farcaster is verified") : /*#__PURE__*/ React.createElement("div", {
        className: "bg-white w-[fit-content] rounded-lg mt-2"
    }, /*#__PURE__*/ React.createElement(SignInButton, null)))), stampToRender === "address" && /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #e5e7eb",
            width: isGrid ? "100%" : "300px",
            borderRadius: "0.75rem",
            padding: "1rem 1.5rem",
            marginBottom: "1rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)" // shadow-md
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start"
        }
    }, /*#__PURE__*/ React.createElement("img", {
        src: "https://thumbs.dreamstime.com/b/destination-place-pin-red-pointer-map-position-mark-125211341.jpg",
        alt: "Farcaster logo",
        style: {
            marginBottom: "0.25rem",
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "0.375rem" // rounded-md
        }
    }), /*#__PURE__*/ React.createElement("h2", {
        style: {
            fontSize: "1.25rem",
            fontWeight: 700 // font-bold
        }
    }, "Address"), doesStampExist(stampsWithId.address) ? /*#__PURE__*/ React.createElement("p", {
        style: {
            fontSize: "0.875rem",
            color: "#4b5563",
            marginTop: "0.25rem" // mt-1
        }
    }, "Your Address is added") : /*#__PURE__*/ React.createElement("div", {
        style: {
            width: "fit-content",
            borderRadius: "0.5rem" // rounded-lg
        }
    }, /*#__PURE__*/ React.createElement("p", {
        style: {
            fontSize: "0.875rem",
            color: "#4b5563" // text-gray-600
        }
    }, "Add your address"), /*#__PURE__*/ React.createElement("button", {
        onClick: function() {
            return setAddressOpen(true);
        },
        style: {
            backgroundColor: "#3b82f6",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.25rem",
            marginTop: "0.5rem",
            cursor: "pointer",
            border: "none"
        }
    }, "Add Address"))))), stampToRender === "evm" && /*#__PURE__*/ React.createElement("div", {
        style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: {
            alignItems: "center"
        }
    }, /*#__PURE__*/ React.createElement("img", {
        src: "data:image/png;base64,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",
        alt: "Image",
        style: {
            marginBottom: "4px",
            borderRadius: "50%",
            height: "40px",
            width: "40px"
        }
    }), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("h2", {
        style: {
            fontWeight: "bold",
            fontSize: "16px"
        }
    }, "EVM Wallet"), /*#__PURE__*/ React.createElement("p", {
        style: {
            color: "#757575",
            fontSize: "14px"
        }
    }, "Connect to evm wallet"))), /*#__PURE__*/ React.createElement("div", {
        style: {
            marginTop: "8px"
        }
    }, doesStampExist(stampsWithId.evm) ? /*#__PURE__*/ React.createElement("div", {
        style: {
            display: "flex",
            justifyContent: "space-between"
        }
    }, /*#__PURE__*/ React.createElement("button", {
        style: {
            borderRadius: "10px",
            backgroundColor: "#4caf50",
            color: "white",
            padding: "8px 16px",
            border: "none"
        }
    }, "Verified Stamp")) : /*#__PURE__*/ React.createElement(React.Fragment, null, gitcoinModalOpen && /*#__PURE__*/ React.createElement("div", {
        style: {
            position: "fixed",
            inset: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 50
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: {
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            width: "24rem"
        }
    }, /*#__PURE__*/ React.createElement("p", {
        style: {
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "12px"
        }
    }, "Connect Web3 Wallet"), connectors.map(function(connector) {
        return /*#__PURE__*/ React.createElement("button", {
            key: connector.uid,
            style: {
                backgroundColor: "#007bff",
                color: "white",
                padding: "8px 16px",
                borderRadius: "8px",
                width: "100%",
                marginBottom: "8px",
                border: "none"
            },
            onClick: function() {
                return connect({
                    connector: connector
                });
            }
        }, connector.name);
    }), /*#__PURE__*/ React.createElement("button", {
        style: {
            marginTop: "16px",
            color: "#ff0000",
            borderRadius: "10px",
            background: "none",
            border: "none"
        },
        onClick: function() {
            return setGitcoinModalOpen(false);
        }
    }, "Close"))), /*#__PURE__*/ React.createElement("button", {
        style: {
            backgroundColor: "#007bff",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none"
        },
        onClick: function() {
            return setGitcoinModalOpen(true);
        }
    }, "Connect Evm Wallet")))), /*#__PURE__*/ React.createElement(PhoneNumberConnect, {
        apikey: api_key,
        open: phoneOpen,
        onClose: function() {
            return setPhoneOpen(false);
        },
        fetchStamps: fetchStampData,
        page_id: page_id,
        uuid: uuid,
        setBlacklist: setBlacklist,
        setBlacklistCred: setBlacklistCred
    }), /*#__PURE__*/ React.createElement(LocationSearchPanel, {
        fetchStamps: fetchStampData,
        apikey: api_key,
        open: addressOpen,
        onClose: function() {
            return setAddressOpen(false);
        },
        page_id: page_id,
        uuid: uuid
    })));
};
