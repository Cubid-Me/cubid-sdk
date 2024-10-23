// @ts-nocheck
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooddollarConnect = void 0;
const react_1 = __importStar(require("react"));
const contractkit_1 = require("@celo/contractkit");
const react_2 = require("@web3modal/wagmi/react");
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
const wagmi_1 = require("wagmi");
const web3_1 = __importDefault(require("web3"));
require("@near-wallet-selector/modal-ui/styles.css");
const useAuth_1 = __importDefault(require("@/hooks/useAuth"));
const button_1 = require("@/components/ui/button");
const card_1 = require("@/components/ui/card");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const sheet_1 = require("@/components/ui/sheet");
const useCreatedByApp_1 = require("@/hooks/useCreatedByApp");
const insertStamp_1 = require("../lib/insertStamp");
const nodeUrl = "https://forno.celo.org";
const goodDollarAddress = "0xC361A6E67822a0EDc17D899227dd9FC50BD62F42"; // replace with GoodDollar contract address
const web3 = new web3_1.default(nodeUrl);
const kit = (0, contractkit_1.newKitFromWeb3)(web3);
// Load the GoodDollar contract
const goodDollarContract = new web3.eth.Contract(require("@gooddollar/goodcontracts/build/contracts/Identity.json").abi, goodDollarAddress);
const GooddollarConnect = ({ isExistingStamp, fetchStamps, deleteStamp, }) => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const [gooddollarConnect, setGooddollarConnect] = (0, react_1.useState)(false);
    const [gooddolarOpen, setGooddollarOpen] = (0, react_1.useState)(false);
    const [stepState, setStepState] = (0, react_1.useState)(0);
    const [whitelisted, setWhitelisted] = (0, react_1.useState)(false);
    const { open } = (0, react_2.useWeb3Modal)();
    const { address } = (0, wagmi_1.useAccount)();
    const authData = (0, useAuth_1.default)({});
    const { getUser } = authData;
    (0, react_1.useEffect)(() => {
        if (address) {
            ;
            (() => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f;
                try {
                    const isWhitelisted = yield goodDollarContract.methods
                        .isWhitelisted(address)
                        .call();
                    setWhitelisted(isWhitelisted);
                    if (isWhitelisted) {
                        yield axios_1.default.post("/api/supabase/insert", {
                            body: {
                                email: (_a = authData === null || authData === void 0 ? void 0 : authData.user) === null || _a === void 0 ? void 0 : _a.email,
                                "wallet-address": address,
                                wallet_data: {},
                            },
                            table: "wallet_details",
                        });
                        const { data: { data: supabaseData }, } = yield axios_1.default.post("/api/supabase/select", {
                            match: { email: (_b = authData === null || authData === void 0 ? void 0 : authData.user) === null || _b === void 0 ? void 0 : _b.email, identifier: address },
                            table: "whitelist",
                        });
                        if (!supabaseData[0]) {
                            yield axios_1.default.post("/api/supabase/insert", {
                                table: "whitelist",
                                body: {
                                    email: (_c = authData === null || authData === void 0 ? void 0 : authData.user) === null || _c === void 0 ? void 0 : _c.email,
                                    identifier: address,
                                },
                            });
                        }
                        else {
                            if (((_d = supabaseData === null || supabaseData === void 0 ? void 0 : supabaseData[0]) === null || _d === void 0 ? void 0 : _d.email) !== ((_e = authData === null || authData === void 0 ? void 0 : authData.user) === null || _e === void 0 ? void 0 : _e.email)) {
                                yield axios_1.default.post("/api/supabase/insert", {
                                    table: "blacklist",
                                    body: {
                                        email: (_f = authData === null || authData === void 0 ? void 0 : authData.user) === null || _f === void 0 ? void 0 : _f.email,
                                        identifier: address,
                                    },
                                });
                            }
                        }
                        localStorage.deleteItem("connectGooddollar");
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }))();
        }
    }, [address, (_a = authData === null || authData === void 0 ? void 0 : authData.user) === null || _a === void 0 ? void 0 : _a.email]);
    const [showGooddollarDetails, setShowGooddollarDetails] = (0, react_1.useState)(false);
    const { getIdForApp } = (0, useCreatedByApp_1.useCreatedByAppId)();
    (0, react_1.useEffect)(() => {
        if (!localStorage.getItem("gooddollar_connect_flow")) {
            ;
            (() => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                const params = (_a = window.location.href) === null || _a === void 0 ? void 0 : _a.split("?");
                const userData = yield getUser();
                if (((_b = params[1]) === null || _b === void 0 ? void 0 : _b.includes("gooddollardata")) && (userData === null || userData === void 0 ? void 0 : userData.email)) {
                    localStorage.setItem("gooddollar_connect_flow", "true");
                    const jsonData = (_c = params[1]) === null || _c === void 0 ? void 0 : _c.replace("gooddollardata=", "");
                    const data = JSON.parse(decodeURIComponent(jsonData).replace("/", ""));
                    const gooddollar_data = {
                        email: userData === null || userData === void 0 ? void 0 : userData.email,
                        "wallet-address": (_d = data === null || data === void 0 ? void 0 : data.walletAddress) === null || _d === void 0 ? void 0 : _d.value,
                        wallet_data: data,
                    };
                    const dbUser = yield getUser();
                    yield (0, insertStamp_1.insertStamp)({
                        stamp_type: 'gooddollar',
                        user_data: { user_id: dbUser === null || dbUser === void 0 ? void 0 : dbUser.id, uuid: "" },
                        stampData: Object.assign({ identity: gooddollar_data["wallet-address"], uniquevalue: gooddollar_data["wallet-address"] }, gooddollar_data),
                        app_id: yield getIdForApp()
                    });
                    react_toastify_1.toast.success("Successfully authenticated with gooddollar data");
                    fetchStamps();
                    setTimeout(() => {
                        window.history.replaceState(null, "", "/app");
                    }, 1500);
                }
            }))();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const fetchWalletDetails = (0, react_1.useCallback)((email) => __awaiter(void 0, void 0, void 0, function* () {
        const { data: { data: wallet_details }, } = yield axios_1.default.post(`/api/supabase/select`, {
            match: {
                email,
            },
            table: "wallet_details",
        });
        if (wallet_details === null || wallet_details === void 0 ? void 0 : wallet_details[0]) {
            setGooddollarConnect(wallet_details === null || wallet_details === void 0 ? void 0 : wallet_details[0]);
        }
        else {
            setGooddollarConnect(null);
        }
    }), []);
    (0, react_1.useEffect)(() => {
        var _a, _b;
        if ((_a = authData === null || authData === void 0 ? void 0 : authData.user) === null || _a === void 0 ? void 0 : _a.email)
            fetchWalletDetails((_b = authData === null || authData === void 0 ? void 0 : authData.user) === null || _b === void 0 ? void 0 : _b.email);
    }, [fetchWalletDetails, (_b = authData === null || authData === void 0 ? void 0 : authData.user) === null || _b === void 0 ? void 0 : _b.email]);
    (0, react_1.useEffect)(() => {
        if (localStorage.getItem("connectGooddollar") === "true") {
            setGooddollarOpen(true);
            setStepState(1);
            localStorage.removeItem("connectGooddollar");
        }
    }, []);
    const steps = {
        0: (react_1.default.createElement("div", null,
            react_1.default.createElement("p", null, "Which app do you use ?"),
            react_1.default.createElement("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    marginTop: 15,
                } },
                react_1.default.createElement(button_1.Button, { onClick: () => {
                        setStepState(1);
                        if (address) {
                            localStorage.setItem("connectGooddollar", "true");
                        }
                    } }, "Gooddapp"),
                react_1.default.createElement(button_1.Button, { onClick: () => {
                        setStepState(2);
                    } }, "Gooddollar Wallet")))),
        1: (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                react_1.default.createElement(button_1.Button, { onClick: () => {
                        setStepState(0);
                    }, variant: "ghost" },
                    react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "22px", id: "Layer_1", fill: "#fff", version: "1.1", viewBox: "0 0 512 512", width: "22px" },
                        react_1.default.createElement("polygon", { points: "352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " }))),
                react_1.default.createElement("p", null, "Login with Gooddapp")),
            react_1.default.createElement("div", { className: "mx-auto w-[fit-content]" }, Boolean(address) ? (react_1.default.createElement("div", { className: "text-left" },
                react_1.default.createElement("p", null, "Account Connected"),
                react_1.default.createElement("p", null,
                    "Wallet Address: ",
                    address),
                react_1.default.createElement("p", null,
                    "Is Whitelisted : ",
                    whitelisted ? "Yes" : "No"))) : (react_1.default.createElement("button", { onClick: () => {
                    open();
                }, className: "m-2 rounded bg-blue-500 p-2 text-white" },
                " ",
                "Connect Gooddollar"))))),
        2: (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                react_1.default.createElement(button_1.Button, { onClick: () => {
                        setStepState(0);
                    }, variant: "ghost" },
                    react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", height: "22px", id: "Layer_1", fill: "#fff", version: "1.1", viewBox: "0 0 512 512", width: "22px" },
                        react_1.default.createElement("polygon", { points: "352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 " }))),
                react_1.default.createElement("p", null, "Login with Gooddollar Wallet")),
            react_1.default.createElement("div", { className: "mx-auto w-[fit-content]" },
                react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("button", { onClick: () => {
                            window.open(`https://gooddollar-connect.netlify.app?website=${window.location.href}`, "_self");
                        }, className: "m-2 rounded bg-blue-500 p-2 text-white" },
                        " ",
                        "Authorize Gooddollar"))))),
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(card_1.Card, null,
            react_1.default.createElement(card_1.CardHeader, null,
                react_1.default.createElement("img", { src: "https://pbs.twimg.com/profile_images/1468937571954737157/Mi7uJpGm_400x400.jpg", alt: "Image", className: "mb-1 h-10 w-10 rounded-md" }),
                react_1.default.createElement(card_1.CardTitle, null, "Gooddollar"),
                react_1.default.createElement(card_1.CardDescription, null, "Connect your web3 gooddollar")),
            react_1.default.createElement(card_1.CardContent, null, isExistingStamp ? (react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                react_1.default.createElement(button_1.Button, null, "Verified Stamp"),
                react_1.default.createElement(dropdown_menu_1.DropdownMenu, null,
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuTrigger, null,
                        react_1.default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                            react_1.default.createElement("path", { d: "M2 5H13C13.5523 5 14 5.44772 14 6V9C14 9.55228 13.5523 10 13 10H2C1.44772 10 1 9.55228 1 9V6C1 5.44772 1.44772 5 2 5ZM0 6C0 4.89543 0.895431 4 2 4H13C14.1046 4 15 4.89543 15 6V9C15 10.1046 14.1046 11 13 11H2C0.89543 11 0 10.1046 0 9V6ZM4.5 6.75C4.08579 6.75 3.75 7.08579 3.75 7.5C3.75 7.91421 4.08579 8.25 4.5 8.25C4.91421 8.25 5.25 7.91421 5.25 7.5C5.25 7.08579 4.91421 6.75 4.5 6.75ZM6.75 7.5C6.75 7.08579 7.08579 6.75 7.5 6.75C7.91421 6.75 8.25 7.08579 8.25 7.5C8.25 7.91421 7.91421 8.25 7.5 8.25C7.08579 8.25 6.75 7.91421 6.75 7.5ZM10.5 6.75C10.0858 6.75 9.75 7.08579 9.75 7.5C9.75 7.91421 10.0858 8.25 10.5 8.25C10.9142 8.25 11.25 7.91421 11.25 7.5C11.25 7.08579 10.9142 6.75 10.5 6.75Z", fill: "currentColor", "fill-rule": "evenodd", "clip-rule": "evenodd" }))),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuContent, null,
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: () => {
                                setShowGooddollarDetails(true);
                            } }, "View Stamp"),
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: () => {
                                deleteStamp();
                            }, style: { color: "red" } }, "Remove Stamp"))))) : (react_1.default.createElement(button_1.Button, { onClick: () => {
                    localStorage.removeItem("gooddollar_connect_flow");
                    setGooddollarOpen(true);
                }, variant: "secondary", className: "bg-blue-500 text-white", style: { width: "250px" } }, "Connect Gooddollar Wallet")))),
        react_1.default.createElement(sheet_1.Sheet, { open: gooddolarOpen, onOpenChange: (value) => {
                if (value === false) {
                    setGooddollarOpen(false);
                }
            } },
            react_1.default.createElement(sheet_1.SheetContent, null,
                react_1.default.createElement(sheet_1.SheetHeader, null,
                    react_1.default.createElement(sheet_1.SheetTitle, { className: "text-3xl" }, "Gooddollar Wallet Connect"),
                    isExistingStamp ? react_1.default.createElement(react_1.default.Fragment, null) : react_1.default.createElement("div", null, steps[stepState])))),
        react_1.default.createElement(sheet_1.Sheet, { open: showGooddollarDetails, onOpenChange: (value) => {
                if (value === false) {
                    setShowGooddollarDetails(false);
                }
            } },
            react_1.default.createElement(sheet_1.SheetContent, null,
                react_1.default.createElement(sheet_1.SheetHeader, null,
                    react_1.default.createElement(sheet_1.SheetTitle, null, "Gooddollar Wallet Details"),
                    gooddollarConnect ? (react_1.default.createElement("div", { className: "break-all" },
                        react_1.default.createElement("p", { className: "text-xl font-bold" }, "Wallet Details"),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("span", { className: "font-bold" }, "Wallet Address :"),
                            " ", gooddollarConnect === null || gooddollarConnect === void 0 ? void 0 :
                            gooddollarConnect["wallet-address"]),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("span", { className: "font-bold" }, "Name :"),
                            " ", (_d = (_c = gooddollarConnect === null || gooddollarConnect === void 0 ? void 0 : gooddollarConnect["wallet_data"]) === null || _c === void 0 ? void 0 : _c.fullName) === null || _d === void 0 ? void 0 :
                            _d.value),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("span", { className: "font-bold" }, "Location :"),
                            " ", (_f = (_e = gooddollarConnect === null || gooddollarConnect === void 0 ? void 0 : gooddollarConnect["wallet_data"]) === null || _e === void 0 ? void 0 : _e.location) === null || _f === void 0 ? void 0 :
                            _f.value),
                        react_1.default.createElement("p", null,
                            react_1.default.createElement("span", { className: "font-bold" }, "Is Whitelisted :"),
                            " ",
                            ((_h = (_g = gooddollarConnect === null || gooddollarConnect === void 0 ? void 0 : gooddollarConnect["wallet_data"]) === null || _g === void 0 ? void 0 : _g.isAddressWhitelisted) === null || _h === void 0 ? void 0 : _h.isVerified)
                                ? "Yes"
                                : "No"))) : (react_1.default.createElement(react_1.default.Fragment, null)))))));
};
exports.GooddollarConnect = GooddollarConnect;
