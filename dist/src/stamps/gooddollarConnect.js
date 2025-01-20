// @ts-nocheck
/* eslint-disable jsx-a11y/alt-text */ /* eslint-disable @next/next/no-img-element */ "use client";
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
import { newKitFromWeb3 } from "@celo/contractkit";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import Web3 from "web3";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCreatedByAppId } from "@/hooks/useCreatedByApp";
import { insertStamp } from "../lib/insertStamp";
var nodeUrl = "https://forno.celo.org";
var goodDollarAddress = "0xC361A6E67822a0EDc17D899227dd9FC50BD62F42" // replace with GoodDollar contract address
;
var web3 = new Web3(nodeUrl);
var kit = newKitFromWeb3(web3);
// Load the GoodDollar contract
var goodDollarContract = new web3.eth.Contract(require("@gooddollar/goodcontracts/build/contracts/Identity.json").abi, goodDollarAddress);
export var GooddollarConnect = function(param) {
    var isExistingStamp = param.isExistingStamp, fetchStamps = param.fetchStamps, deleteStamp = param.deleteStamp;
    var _authData_user, _authData_user1, _gooddollarConnect_wallet_data_fullName, _gooddollarConnect_wallet_data, _gooddollarConnect_wallet_data_location, _gooddollarConnect_wallet_data1, _gooddollarConnect_wallet_data_isAddressWhitelisted, _gooddollarConnect_wallet_data2;
    var _useState = _sliced_to_array(useState(false), 2), gooddollarConnect = _useState[0], setGooddollarConnect = _useState[1];
    var _useState1 = _sliced_to_array(useState(false), 2), gooddolarOpen = _useState1[0], setGooddollarOpen = _useState1[1];
    var _useState2 = _sliced_to_array(useState(0), 2), stepState = _useState2[0], setStepState = _useState2[1];
    var _useState3 = _sliced_to_array(useState(false), 2), whitelisted = _useState3[0], setWhitelisted = _useState3[1];
    var open = useWeb3Modal().open;
    var address = useAccount().address;
    var authData = useAuth({});
    var getUser = authData.getUser;
    useEffect(function() {
        if (address) {
            ;
            _async_to_generator(function() {
                var isWhitelisted, _authData_user, _authData_user1, _ref, _ref_data, supabaseData, _authData_user2, _supabaseData_, _authData_user3, _authData_user4, err;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                9,
                                ,
                                10
                            ]);
                            return [
                                4,
                                goodDollarContract.methods.isWhitelisted(address).call()
                            ];
                        case 1:
                            isWhitelisted = _state.sent();
                            setWhitelisted(isWhitelisted);
                            if (!isWhitelisted) return [
                                3,
                                8
                            ];
                            return [
                                4,
                                axios.post("/api/supabase/insert", {
                                    body: {
                                        email: authData === null || authData === void 0 ? void 0 : (_authData_user = authData.user) === null || _authData_user === void 0 ? void 0 : _authData_user.email,
                                        "wallet-address": address,
                                        wallet_data: {}
                                    },
                                    table: "wallet_details"
                                })
                            ];
                        case 2:
                            _state.sent();
                            return [
                                4,
                                axios.post("/api/supabase/select", {
                                    match: {
                                        email: authData === null || authData === void 0 ? void 0 : (_authData_user1 = authData.user) === null || _authData_user1 === void 0 ? void 0 : _authData_user1.email,
                                        identifier: address
                                    },
                                    table: "whitelist"
                                })
                            ];
                        case 3:
                            _ref = _state.sent(), _ref_data = _ref.data, supabaseData = _ref_data.data;
                            if (!!supabaseData[0]) return [
                                3,
                                5
                            ];
                            return [
                                4,
                                axios.post("/api/supabase/insert", {
                                    table: "whitelist",
                                    body: {
                                        email: authData === null || authData === void 0 ? void 0 : (_authData_user2 = authData.user) === null || _authData_user2 === void 0 ? void 0 : _authData_user2.email,
                                        identifier: address
                                    }
                                })
                            ];
                        case 4:
                            _state.sent();
                            return [
                                3,
                                7
                            ];
                        case 5:
                            if (!((supabaseData === null || supabaseData === void 0 ? void 0 : (_supabaseData_ = supabaseData[0]) === null || _supabaseData_ === void 0 ? void 0 : _supabaseData_.email) !== (authData === null || authData === void 0 ? void 0 : (_authData_user3 = authData.user) === null || _authData_user3 === void 0 ? void 0 : _authData_user3.email))) return [
                                3,
                                7
                            ];
                            return [
                                4,
                                axios.post("/api/supabase/insert", {
                                    table: "blacklist",
                                    body: {
                                        email: authData === null || authData === void 0 ? void 0 : (_authData_user4 = authData.user) === null || _authData_user4 === void 0 ? void 0 : _authData_user4.email,
                                        identifier: address
                                    }
                                })
                            ];
                        case 6:
                            _state.sent();
                            _state.label = 7;
                        case 7:
                            localStorage.deleteItem("connectGooddollar");
                            _state.label = 8;
                        case 8:
                            return [
                                3,
                                10
                            ];
                        case 9:
                            err = _state.sent();
                            console.log(err);
                            return [
                                3,
                                10
                            ];
                        case 10:
                            return [
                                2
                            ];
                    }
                });
            })();
        }
    }, [
        address,
        authData === null || authData === void 0 ? void 0 : (_authData_user = authData.user) === null || _authData_user === void 0 ? void 0 : _authData_user.email
    ]);
    var _useState4 = _sliced_to_array(useState(false), 2), showGooddollarDetails = _useState4[0], setShowGooddollarDetails = _useState4[1];
    var getIdForApp = useCreatedByAppId().getIdForApp;
    useEffect(function() {
        if (!localStorage.getItem("gooddollar_connect_flow")) {
            ;
            _async_to_generator(function() {
                var _window_location_href, _params_, params, userData, _params_1, _data_walletAddress, jsonData, data, gooddollar_data, dbUser, _tmp;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            params = (_window_location_href = window.location.href) === null || _window_location_href === void 0 ? void 0 : _window_location_href.split("?");
                            return [
                                4,
                                getUser()
                            ];
                        case 1:
                            userData = _state.sent();
                            if (!(((_params_ = params[1]) === null || _params_ === void 0 ? void 0 : _params_.includes("gooddollardata")) && (userData === null || userData === void 0 ? void 0 : userData.email))) return [
                                3,
                                5
                            ];
                            localStorage.setItem("gooddollar_connect_flow", "true");
                            jsonData = (_params_1 = params[1]) === null || _params_1 === void 0 ? void 0 : _params_1.replace("gooddollardata=", "");
                            data = JSON.parse(decodeURIComponent(jsonData).replace("/", ""));
                            gooddollar_data = {
                                email: userData === null || userData === void 0 ? void 0 : userData.email,
                                "wallet-address": data === null || data === void 0 ? void 0 : (_data_walletAddress = data.walletAddress) === null || _data_walletAddress === void 0 ? void 0 : _data_walletAddress.value,
                                wallet_data: data
                            };
                            return [
                                4,
                                getUser()
                            ];
                        case 2:
                            dbUser = _state.sent();
                            _tmp = {
                                stamp_type: 'gooddollar',
                                user_data: {
                                    user_id: dbUser === null || dbUser === void 0 ? void 0 : dbUser.id,
                                    uuid: ""
                                },
                                stampData: _object_spread({
                                    identity: gooddollar_data["wallet-address"],
                                    uniquevalue: gooddollar_data["wallet-address"]
                                }, gooddollar_data)
                            };
                            return [
                                4,
                                getIdForApp()
                            ];
                        case 3:
                            return [
                                4,
                                insertStamp.apply(void 0, [
                                    (_tmp.app_id = _state.sent(), _tmp)
                                ])
                            ];
                        case 4:
                            _state.sent();
                            toast.success("Successfully authenticated with gooddollar data");
                            fetchStamps();
                            setTimeout(function() {
                                window.history.replaceState(null, "", "/app");
                            }, 1500);
                            _state.label = 5;
                        case 5:
                            return [
                                2
                            ];
                    }
                });
            })();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var fetchWalletDetails = useCallback(/*#__PURE__*/ function() {
        var _ref = _async_to_generator(function(email) {
            var _ref, _ref_data, wallet_details;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            axios.post("/api/supabase/select", {
                                match: {
                                    email: email
                                },
                                table: "wallet_details"
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), _ref_data = _ref.data, wallet_details = _ref_data.data;
                        if (wallet_details === null || wallet_details === void 0 ? void 0 : wallet_details[0]) {
                            setGooddollarConnect(wallet_details === null || wallet_details === void 0 ? void 0 : wallet_details[0]);
                        } else {
                            setGooddollarConnect(null);
                        }
                        return [
                            2
                        ];
                }
            });
        });
        return function(email) {
            return _ref.apply(this, arguments);
        };
    }(), []);
    useEffect(function() {
        var _authData_user, _authData_user1;
        if (authData === null || authData === void 0 ? void 0 : (_authData_user = authData.user) === null || _authData_user === void 0 ? void 0 : _authData_user.email) fetchWalletDetails(authData === null || authData === void 0 ? void 0 : (_authData_user1 = authData.user) === null || _authData_user1 === void 0 ? void 0 : _authData_user1.email);
    }, [
        fetchWalletDetails,
        authData === null || authData === void 0 ? void 0 : (_authData_user1 = authData.user) === null || _authData_user1 === void 0 ? void 0 : _authData_user1.email
    ]);
    useEffect(function() {
        if (localStorage.getItem("connectGooddollar") === "true") {
            setGooddollarOpen(true);
            setStepState(1);
            localStorage.removeItem("connectGooddollar");
        }
    }, []);
    var steps = {
        0: /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("p", null, "Which app do you use ?"), /*#__PURE__*/ React.createElement("div", {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: 15
            }
        }, /*#__PURE__*/ React.createElement(Button, {
            onClick: function() {
                setStepState(1);
                if (address) {
                    localStorage.setItem("connectGooddollar", "true");
                }
            }
        }, "Gooddapp"), /*#__PURE__*/ React.createElement(Button, {
            onClick: function() {
                setStepState(2);
            }
        }, "Gooddollar Wallet"))),
        1: /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center space-x-2"
        }, /*#__PURE__*/ React.createElement(Button, {
            onClick: function() {
                setStepState(0);
            },
            variant: "ghost"
        }, /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "22px",
            id: "Layer_1",
            fill: "#fff",
            version: "1.1",
            viewBox: "0 0 512 512",
            width: "22px"
        }, /*#__PURE__*/ React.createElement("polygon", {
            points: "352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "
        }))), /*#__PURE__*/ React.createElement("p", null, "Login with Gooddapp")), /*#__PURE__*/ React.createElement("div", {
            className: "mx-auto w-[fit-content]"
        }, Boolean(address) ? /*#__PURE__*/ React.createElement("div", {
            className: "text-left"
        }, /*#__PURE__*/ React.createElement("p", null, "Account Connected"), /*#__PURE__*/ React.createElement("p", null, "Wallet Address: ", address), /*#__PURE__*/ React.createElement("p", null, "Is Whitelisted : ", whitelisted ? "Yes" : "No")) : /*#__PURE__*/ React.createElement("button", {
            onClick: function() {
                open();
            },
            className: "m-2 rounded bg-blue-500 p-2 text-white"
        }, " ", "Connect Gooddollar"))),
        2: /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
            className: "flex items-center space-x-2"
        }, /*#__PURE__*/ React.createElement(Button, {
            onClick: function() {
                setStepState(0);
            },
            variant: "ghost"
        }, /*#__PURE__*/ React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            height: "22px",
            id: "Layer_1",
            fill: "#fff",
            version: "1.1",
            viewBox: "0 0 512 512",
            width: "22px"
        }, /*#__PURE__*/ React.createElement("polygon", {
            points: "352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "
        }))), /*#__PURE__*/ React.createElement("p", null, "Login with Gooddollar Wallet")), /*#__PURE__*/ React.createElement("div", {
            className: "mx-auto w-[fit-content]"
        }, /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("button", {
            onClick: function() {
                window.open("https://gooddollar-connect.netlify.app?website=".concat(window.location.href), "_self");
            },
            className: "m-2 rounded bg-blue-500 p-2 text-white"
        }, " ", "Authorize Gooddollar"))))
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Card, null, /*#__PURE__*/ React.createElement(CardHeader, null, /*#__PURE__*/ React.createElement("img", {
        src: "https://pbs.twimg.com/profile_images/1468937571954737157/Mi7uJpGm_400x400.jpg",
        alt: "Image",
        className: "mb-1 h-10 w-10 rounded-md"
    }), /*#__PURE__*/ React.createElement(CardTitle, null, "Gooddollar"), /*#__PURE__*/ React.createElement(CardDescription, null, "Connect your web3 gooddollar")), /*#__PURE__*/ React.createElement(CardContent, null, isExistingStamp ? /*#__PURE__*/ React.createElement("div", {
        style: {
            display: "flex",
            justifyContent: "space-between"
        }
    }, /*#__PURE__*/ React.createElement(Button, null, "Verified Stamp"), /*#__PURE__*/ React.createElement(DropdownMenu, null, /*#__PURE__*/ React.createElement(DropdownMenuTrigger, null, /*#__PURE__*/ React.createElement("svg", {
        width: "20",
        height: "20",
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/ React.createElement("path", {
        d: "M2 5H13C13.5523 5 14 5.44772 14 6V9C14 9.55228 13.5523 10 13 10H2C1.44772 10 1 9.55228 1 9V6C1 5.44772 1.44772 5 2 5ZM0 6C0 4.89543 0.895431 4 2 4H13C14.1046 4 15 4.89543 15 6V9C15 10.1046 14.1046 11 13 11H2C0.89543 11 0 10.1046 0 9V6ZM4.5 6.75C4.08579 6.75 3.75 7.08579 3.75 7.5C3.75 7.91421 4.08579 8.25 4.5 8.25C4.91421 8.25 5.25 7.91421 5.25 7.5C5.25 7.08579 4.91421 6.75 4.5 6.75ZM6.75 7.5C6.75 7.08579 7.08579 6.75 7.5 6.75C7.91421 6.75 8.25 7.08579 8.25 7.5C8.25 7.91421 7.91421 8.25 7.5 8.25C7.08579 8.25 6.75 7.91421 6.75 7.5ZM10.5 6.75C10.0858 6.75 9.75 7.08579 9.75 7.5C9.75 7.91421 10.0858 8.25 10.5 8.25C10.9142 8.25 11.25 7.91421 11.25 7.5C11.25 7.08579 10.9142 6.75 10.5 6.75Z",
        fill: "currentColor",
        "fill-rule": "evenodd",
        "clip-rule": "evenodd"
    }))), /*#__PURE__*/ React.createElement(DropdownMenuContent, null, /*#__PURE__*/ React.createElement(DropdownMenuItem, {
        onClick: function() {
            setShowGooddollarDetails(true);
        }
    }, "View Stamp"), /*#__PURE__*/ React.createElement(DropdownMenuSeparator, null), /*#__PURE__*/ React.createElement(DropdownMenuItem, {
        onClick: function() {
            deleteStamp();
        },
        style: {
            color: "red"
        }
    }, "Remove Stamp")))) : /*#__PURE__*/ React.createElement(Button, {
        onClick: function() {
            localStorage.removeItem("gooddollar_connect_flow");
            setGooddollarOpen(true);
        },
        variant: "secondary",
        className: "bg-blue-500 text-white",
        style: {
            width: "250px"
        }
    }, "Connect Gooddollar Wallet"))), /*#__PURE__*/ React.createElement(Sheet, {
        open: gooddolarOpen,
        onOpenChange: function(value) {
            if (value === false) {
                setGooddollarOpen(false);
            }
        }
    }, /*#__PURE__*/ React.createElement(SheetContent, null, /*#__PURE__*/ React.createElement(SheetHeader, null, /*#__PURE__*/ React.createElement(SheetTitle, {
        className: "text-3xl"
    }, "Gooddollar Wallet Connect"), isExistingStamp ? /*#__PURE__*/ React.createElement(React.Fragment, null) : /*#__PURE__*/ React.createElement("div", null, steps[stepState])))), /*#__PURE__*/ React.createElement(Sheet, {
        open: showGooddollarDetails,
        onOpenChange: function(value) {
            if (value === false) {
                setShowGooddollarDetails(false);
            }
        }
    }, /*#__PURE__*/ React.createElement(SheetContent, null, /*#__PURE__*/ React.createElement(SheetHeader, null, /*#__PURE__*/ React.createElement(SheetTitle, null, "Gooddollar Wallet Details"), gooddollarConnect ? /*#__PURE__*/ React.createElement("div", {
        className: "break-all"
    }, /*#__PURE__*/ React.createElement("p", {
        className: "text-xl font-bold"
    }, "Wallet Details"), /*#__PURE__*/ React.createElement("p", null, /*#__PURE__*/ React.createElement("span", {
        className: "font-bold"
    }, "Wallet Address :"), " ", gooddollarConnect === null || gooddollarConnect === void 0 ? void 0 : gooddollarConnect["wallet-address"]), /*#__PURE__*/ React.createElement("p", null, /*#__PURE__*/ React.createElement("span", {
        className: "font-bold"
    }, "Name :"), " ", gooddollarConnect === null || gooddollarConnect === void 0 ? void 0 : (_gooddollarConnect_wallet_data = gooddollarConnect["wallet_data"]) === null || _gooddollarConnect_wallet_data === void 0 ? void 0 : (_gooddollarConnect_wallet_data_fullName = _gooddollarConnect_wallet_data.fullName) === null || _gooddollarConnect_wallet_data_fullName === void 0 ? void 0 : _gooddollarConnect_wallet_data_fullName.value), /*#__PURE__*/ React.createElement("p", null, /*#__PURE__*/ React.createElement("span", {
        className: "font-bold"
    }, "Location :"), " ", gooddollarConnect === null || gooddollarConnect === void 0 ? void 0 : (_gooddollarConnect_wallet_data1 = gooddollarConnect["wallet_data"]) === null || _gooddollarConnect_wallet_data1 === void 0 ? void 0 : (_gooddollarConnect_wallet_data_location = _gooddollarConnect_wallet_data1.location) === null || _gooddollarConnect_wallet_data_location === void 0 ? void 0 : _gooddollarConnect_wallet_data_location.value), /*#__PURE__*/ React.createElement("p", null, /*#__PURE__*/ React.createElement("span", {
        className: "font-bold"
    }, "Is Whitelisted :"), " ", (gooddollarConnect === null || gooddollarConnect === void 0 ? void 0 : (_gooddollarConnect_wallet_data2 = gooddollarConnect["wallet_data"]) === null || _gooddollarConnect_wallet_data2 === void 0 ? void 0 : (_gooddollarConnect_wallet_data_isAddressWhitelisted = _gooddollarConnect_wallet_data2.isAddressWhitelisted) === null || _gooddollarConnect_wallet_data_isAddressWhitelisted === void 0 ? void 0 : _gooddollarConnect_wallet_data_isAddressWhitelisted.isVerified) ? "Yes" : "No")) : /*#__PURE__*/ React.createElement(React.Fragment, null)))));
};
