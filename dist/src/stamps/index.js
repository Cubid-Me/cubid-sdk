/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
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
exports.Stamps = exports.stampsWithId = void 0;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const phoneNumberConnect_1 = require("./phoneNumberConnect");
const setLocationPanel_1 = require("./setLocationPanel");
const addStampVerify_1 = require("./addStampVerify");
const infoTooltip_1 = require("../component/infoTooltip");
const button_1 = require("../component/button");
const loginOptions_1 = require("../component/loginOptions");
const wagmi_1 = require("wagmi");
const providers_1 = require("../component/providers");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
let useFarcasterProfile, SignInButton;
(() => __awaiter(void 0, void 0, void 0, function* () {
    const authKit = yield Promise.resolve().then(() => __importStar(require("@farcaster/auth-kit")));
    useFarcasterProfile = authKit.useProfile;
    SignInButton = authKit.SignInButton;
}))();
exports.stampsWithId = {
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
const socialDataToMap = [
    {
        local_key: "facebook_data",
        supabase_key: "facebook",
        stampTypeId: 1,
        title: "Facebook",
        image: "https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg",
        color: "info",
    },
    {
        local_key: "github_data",
        supabase_key: "github",
        stampTypeId: 2,
        title: "Github",
        image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhITERIWFRAVFRUWFxYRFhUYFRAYFREaFxcSFhMYHCghGR4lGxYVITEiJSkrLi4uFx8zODMtNygtLi0BCgoKDQ0ODw8PDysZFRkrKysrKy0rKys3KystKy0tLSsrKystKys3KystKysrKystKysrKysrKysrKy0rKystK//AABEIAOAA4AMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABwgBBQYEAgP/xABJEAABAwICBwQECQkGBwAAAAABAAIDBBEFIQYHEjFBUXETImGBQnKRoQgUIzJic4KisSQzNVJTsrPBwkOSk6PD4RUlVGN0g4T/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwCcUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBF8yPABJIAGZJyA81yuK6yMLp7h9ZG5w3thvK4HlaMHNB1iKLKzXnQN/NwVEnjsxsHvdf3LUS6/Bfu4cSObqkA+wRH8VcE1IoVj1+Z97DiBzbUgn2GIfittR686B352Coj8bMePc6/uTBKiLk8J1j4XUWDKyNrjkGzXiJO61pAM7rqo3ggEEEHcRmD0Kg+kREBERAREQEREBERAREQEREBERARYJUfaw9Z8FBtQw2mrbfNv3IMsjKRx47Az6b0HaYvjEFLGZamVsUY9J5tc8gN5PgFEGlOu83LMOhFv21QDn4thH4uPkopx7HKisl7WqldJJwvk2MfqsaMmjotctSJraY5pDV1jtqqqJJc7hrz3G+rGLNHsWrCIqgiIgIiIoVs8D0hq6M3paiSLO5aw9x3rRm7T7FrEREz6La8DcMxGEW/bU43eLoT+LT5KX8IxiCqjEtNK2WM+kw3seRHA+BzVOVssBx2oo5RLSyujfle2bZAPRew5OHVTF1cJFHurvWhBX7MM9oa3g2/cn8YieP0Tn1Ug3WVZREQEREBERAREQEREBYKyo01w6fGij+K0zvyyVty4HOmjOW165ztysTyuGs1r6zzAX0dC75cZSzg/mOcbPp8z6Pid0FON7km5OZJzJJNySeJWEW8QReqmw6eQF0UMsjRkXRxveAeRLRYLy3zI4jeOI6hEEREBERAREQEREBEvw48ua9VThk8bQ+SCVjDYB0kb2tJO4bTgAg8zTYgjIg3BGRBG4g8FOuqjWgZ3Mo653y5sIpifz5/Zv5P3WPpeB3wSiYq6YWVGmp7T41sfxWpd+WRNuHE51MYy2vXGW1zuDztJawoiIgIiICIiAiIg0ul+kEdDSS1MmewO629jK85MjHU+654Kp+J4hJUTSTzO2pZHFzjzJ4DkALADkApE17aS9vVtpGH5Kl+dydM8C/91th1c5RitSIIi+ZNx6H8FUWn1T4WKfCqRtrOkYJneLpu/n0BaPJbrHNHKSrbs1VPHKOBe0bTfVeO83yK/fAmgU1OBu7GK3TsxZe5YaQZphqUezakw2Tbbv+LzEB/wD65tzuGTgOqikYZP2roRBKZ2mzoxG8yN6sAuP91clYAV0VXodXGLS5topGjnKWR+5zgfctrHqcxY72QjrMP5AqyiJpitj9TeLDcyE9Jh/NoWqrdWuLRXJonuHOJzH+5rr+5WoRNTFNZ8NnZIInwStmcbNjdG8Peb2s1lru8lKeh2pWWS0mIvMTDY9jEQZD68m5nQXPiFOxCymq0+A6MUdG0NpaeOPKxcG3e71pD3neZXk1h4V8Zw6ritdxic5nrxjbZ72hdGvyqQNhwO7ZdfpZQUwBRfMe4dB+C+ltl6sMxCSnmjnhdsyxODmnxHAjiDuI5Eq2GiGkEddSRVMeW2LObe/ZPGT4z0PtFjxVRVJuorSb4vVupHu+Rqvm33NmaO7bltNu3xIapViw6IiyoiIgIiIC1ukeKtpaWepdmIY3Pt+sQO63zNh5rZKLvhBYr2dDFAD3qiYXHEsiG2773Z+1BX+ad73OfIdqR7i9zj6TnHacfMkr4RFtkSyLsdVmigxCtDZBemhAkm+kL2ZF9o7/AAa5FT7q1q3S4XQve0h3YMb3hYu2Bsh48HAA38V0y+WMAFgLAZADcAOFl9LCiIiAiIgIiICIiAtLppWPhoauSNpc9sEhaGi5J2CAbDgL3PgCt0sEIKVtGQWV3et/RJtBWB0LbUtQHPYBujeD8pEPAbTSPB1uC4RbZF9wTPY5r43bMjHBzXDe1zTdrh0IC+EQXC0cxZtXSwVLcmyxtfb9Ukd5vkbjyWyUW/B9xXtKGWnJ71PMbDkyXvt+8JPYpSWGhERAREQFAPwh6zarKWHhHAX+cshH+kFPyrVrykvi0g/VhhH3S7+pWDgERFpkVidQuEiLDjNbv1ErnE8SyM9mwdMnH7SrsrVarG2wmgt+xafaSVKsdUiIsqIiICIiAiIgIiICIiDgdduFCbC5X278DmTDoDsv+65yrSra6wGg4ZiF/wDpKg+yFxHvCqUtRBERVErfB4rNmsqov2kAf/hSgf6p96n4KtOo2S2LRD9aGYfdB/krLLNWCIiiiIiAqza7W2xefxjhP+WrMquev2m2cTa/hJTRnza97SPYG+1WCN0RFpkVpNUU4fhFFb0WOYerJHNP4Kran/4PmKh9FNTk96CYuA5MmG0PvNkUqxKqIiyoiIgIiICIiAiIgIiIOa1lT7GFV5500rf77dj+pVQVitfWKCPDeyv3qiVjAOOyw9o4/daPtKuq1EoiIqju9STb4vB4RzH/AC/91ZlVz1B0+1ibncI6aU+bnsaB7z7FYxZqwREUUREQFC3wjcPNqGoG4GWF3Vwa9n7j/cppXH62MGNVhlSxovJG0TMA37UXeIHiW7Q80gq2iAotsi7LVTpMKGvY6Q2p5h2MpO5gJuyQ+q4exzlxqFFXTBWVC+qTWY3ZZQ1zw0tAbDO82DhuEMhO4jKzuIyOYuZnCwrKIiAiIgIiICIiAsXS6iXWxrMZEx9HQv2qh12yysOVONzmNcN7+GXzeqDg9cukwrK4sjdeCmBiaRmHPJvK8HlcNb9hcEgRbZERCUE1/Bzw42rqgjImKJv2Q57/AN6P3qaVx+qfBviuGUzHC0kje2eDvDpe8AejdkeS7BYaEREBERAWHC+/csogqXp5o+aGunp7fJg7cXjE/Nnszb9lc+rE679EjVUoqYheopQ4kDfJCc3t8S220OjuarstxKl7Q/VJSVtHDUCtkL5GAuEbY9mJ9u9EQQTdpy3i/muY041ZVeHt7XaFRS8ZY2lpi+sjudkeNyOdloNFtJqmgmEtM+2Y22Ens5gPRe3jxsd44K0WjONwYhSMnjAMcjSHsdY7DrWfE8cbZ9Qb8VngqKu10P1nV1CBHtCenFgI5ybsA4RyDNvQ3HgvnWloYcOqvkwfic13RHgw+lCTzHDmCORXGLXRYzA9c+HTACftKZ/HtGlzPKRl/aQF2OH6UUM+cNXA/wAGysuOrb3CqEpA1MaKsrax0kzQ6Cla15a4XD5HkiNpHEd1xt9EKWCyYKysALKyoiIg1OIaTUUAvNVwR+vKwE9Be5XIY3rlw2EEQufUv4CJpDfOR9h7LqOdd+ijKSqZUQMDYana2mtFmslbbatbdtAg25tco2VxHeaXa1a6tBjZamgNwWQuJe8EbnzWBI6ALgwiLQIiIgug0C0fNdXQU9rxk7cvhEzN9+uTftLn1YnUhomaWkNTKLT1Qa4AjOOIZsb4E3Lj1byUqpKAtuWURZUREQEREBERBghVp1taEf8AD6jtYW/kU7iWWGUD95hPhvLfC44Ky68GN4RDVQSQTsDopBYjiOTmng4GxB4EIKdKStRekhp600rz8jVZAHc2ZoJaRy2hdvjZq5rTrQ6bDZ+zku6F1zFLawkA4Hk4cR5hc2x5BBaSHAggtNi0g3BBG4g2N1vqLh45g0FXC6CpjEkTt4O8Hg5pGbSOBChfHtRtQ1xNFURyR8G1F2PaOW20EO62aui0D1wQTMbFiLhDUAAdqfzM30if7N3MHLkeAk+kq45W7UT2vbzjcHD2hZ4qvlHqTxJxAkfTxt4kvc89Q1rM/aFL+rvQtuGQPiEvavkftvfs7Avshoa1tzkAOJ4ldU4gZnIeK+IJ2PF2Oa4XtdpBAPK4TR+iIigIiII21+0odhYfxjqInD7V2H95V0VlNen6Jl+tg/jBVrWolERFUERdJoLodNiU/Zx3bC2xlltcRA8BzceA80G51TaEGvqO1mb+RQOG3cZTvGYhHhxd4WHFWWaF4cDwiGkgjp4GBkUYsAN55uceLicyeJK96zrQiIoCIiAiIgIiICIiDX47gsFXC+CoYHxPG472ng5p9Fw4EKtun+r2ow1xfnLRk2bMB8y5yZKPRPC+4+G5WiXxLEHAtcAWkEEEAhwO8EHerKKXI0WNxkeY3qddNdTEchdLhzhE85mCS/ZOP/beM4+liOihnGcHqKSTs6qF8UnAPGTrcWu3OHQlXqPDIS75xJ9Y3/FWL1A/or/6Jv6VXNWL1Afos/8Akzfg1KJJREWVEREEfa9Xf8pk+tg/igqtisjr3/RL/roP4irctRKIvbhGEVFVJ2VNC+WTlGL7Pi525o8SQpl0J1MMjLZcSc2V28U8d+zb9Y/+04ZAAesrpiP9X+r2oxJwfnFRg96Yj59jmyIekeF9w8dysjgOCwUcLIKdgZG0buLjxe4+k48SvdDE1oDWgNaAAGtAAaBuAA3L7WNUREQEREBERAREQEREBERAREQF5cQw+KdhjnjZJGd7ZGhzT5FepEEaYtqUw6V+1E6an5tjcHM8hICR7bLttGcBhoadlNTgiNl83G7nuJu57jxJK2qICIiAiIg1ukeCQ1tPJTTgmKQC+ybOaQbtc08CCAVwmFak8PjftSvmnF7hj3BrPMRgE+1SaiDyYbhsNOwRwRMijG5sbQ0dbDefFetEQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/Z",
        color: "secondary",
    },
    {
        local_key: "google_data",
        supabase_key: "google",
        stampTypeId: 3,
        title: "Google",
        image: "https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw",
        color: "primary",
    },
    {
        local_key: "twitter_data",
        supabase_key: "twitter",
        stampTypeId: 4,
        title: "Twitter",
        image: "data:image/png;base64,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",
        color: "error",
    },
    {
        local_key: "discord_data",
        supabase_key: "discord",
        stampTypeId: 5,
        title: "Discord",
        image: "data:image/png;base64,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",
        color: "error",
    },
];
const Stamps = ({ stampToRender, uuid, page_id, api_key, isGrid, onStampChange, showAllowCreds, email, allStampIds, refresh }) => {
    var _a;
    const [allStamps, setAllStamps] = (0, react_1.useState)([]);
    const [stampLoading, setStampLoading] = (0, react_1.useState)(true);
    const [phoneOpen, setPhoneOpen] = (0, react_1.useState)(false);
    const [addressOpen, setAddressOpen] = (0, react_1.useState)(false);
    const [verifyStampFlow, setVerifyStampFlow] = (0, react_1.useState)(false);
    const { address } = (0, wagmi_1.useAccount)();
    const { connectors, connect } = (0, wagmi_1.useConnect)({});
    const { disconnect } = (0, wagmi_1.useDisconnect)();
    const [lensModalOpen, setLensModalOpen] = (0, react_1.useState)(false);
    const fetchStampData = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        setStampLoading(true);
        try {
            onStampChange === null || onStampChange === void 0 ? void 0 : onStampChange();
            const response = yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/fetch_stamps", {
                user_id: uuid,
                apikey: api_key,
                page_id: page_id,
            });
            setAllStamps(response.data.all_stamps);
        }
        catch (error) {
            console.error("Error fetching stamps:", error);
        }
        finally {
            setStampLoading(false);
        }
    }), [uuid, api_key, page_id, onStampChange]);
    const connectToWeb3Node = () => __awaiter(void 0, void 0, void 0, function* () {
        if (address) {
            const { data: { stamps, scores }, } = yield axios_1.default.post("/api/gitcoin-passport-data", { address });
            const stampId = exports.stampsWithId.gitcoin;
            if (scores.score !== "0E-9") {
                yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                    stamp_type: 'gitcoin',
                    user_data: { user_id: uuid, uuid: "" },
                    stampData: {
                        identity: address,
                        uniquevalue: address,
                        stamps,
                        scores
                    },
                    page_id
                });
            }
            yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                stamp_type: 'evm',
                user_data: { user_id: uuid, uuid: "" },
                stampData: {
                    identity: address,
                    uniquevalue: address,
                },
                page_id
            });
            fetchStampData();
            disconnect();
        }
    });
    (0, react_1.useEffect)(() => {
        if (address && !localStorage.getItem("lens-loggin")) {
            connectToWeb3Node(address);
        }
    }, [connectToWeb3Node, address]);
    const { isAuthenticated: isFarcasterAuthenticated, profile } = (_a = useFarcasterProfile === null || useFarcasterProfile === void 0 ? void 0 : useFarcasterProfile()) !== null && _a !== void 0 ? _a : {};
    (0, react_1.useEffect)(() => {
        fetchStampData();
    }, [fetchStampData]);
    (0, react_1.useEffect)(() => {
        if (isFarcasterAuthenticated && (profile === null || profile === void 0 ? void 0 : profile.fid) && (profile === null || profile === void 0 ? void 0 : profile.username)) {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                    page_id,
                    stamp_type: "farcaster",
                    stampData: { uniquevalue: profile.fid, identity: profile.username },
                    user_data: { uuid },
                });
                fetchStampData();
            }))();
        }
    }, [isFarcasterAuthenticated, profile, uuid, fetchStampData, page_id]);
    const doesStampExist = (stamp_id) => {
        return allStamps.some(({ stamptype }) => stamptype === stamp_id);
    };
    const handleSocialConnect = (supabase_key) => {
        window.location.href = `https://allow.cubid.me/widget-allow?uid=${uuid}&social_provider=${supabase_key}&page_id=${page_id}`;
    };
    (0, react_1.useEffect)(() => {
        const interval = setInterval(() => {
            if (localStorage.getItem("logged_in") == uuid && Boolean(showAllowCreds)) {
                setVerifyStampFlow(true);
            }
            else if (!Boolean(showAllowCreds)) {
                setVerifyStampFlow(false);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [uuid, showAllowCreds, refresh]);
    const fetchNearWallet = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (providers_1.wallet === null || providers_1.wallet === void 0 ? void 0 : providers_1.wallet.accountId) {
            const dataCategory = yield providers_1.wallet.viewMethod({
                contractId: "registry.i-am-human.near",
                method: "sbt_tokens_by_owner",
                args: {
                    account: `${providers_1.wallet.accountId}`,
                    issuer: "fractal.i-am-human.near",
                },
            });
            if (uuid) {
                yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                    stamp_type: 'iah',
                    user_data: { uuid },
                    stampData: {
                        identity: providers_1.wallet.accountId,
                        uniquevalue: providers_1.wallet.accountId,
                    },
                    page_id
                });
                yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                    stamp_type: 'near-wallet',
                    user_data: { uuid },
                    stampData: {
                        identity: providers_1.wallet.accountId,
                        uniquevalue: providers_1.wallet.accountId,
                    },
                    page_id
                });
                providers_1.wallet.signOut();
            }
        }
    }), []);
    const [gitcoinModalOpen, setGitcoinModalOpen] = (0, react_1.useState)(false);
    const { publicKey, connected: solConnected } = (0, wallet_adapter_react_1.useWallet)();
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            if (!doesStampExist(exports.stampsWithId["solana"]) && solConnected) {
                const string_publicKey = publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString();
                yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                    stamp_type: 'solana',
                    user_data: { uuid },
                    stampData: {
                        identity: publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString(),
                        uniquevalue: publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString(),
                    },
                    app_id: yield getIdForApp()
                });
                fetchStampData();
            }
        }))();
    }, [publicKey, solConnected]);
    const [showTelegramScript, setShowTelegramScript] = (0, react_1.useState)(false);
    return (react_1.default.createElement("div", { style: {
            display: "grid",
            gridTemplateColumns: "1fr",
            pointerEvents: stampLoading ? "none" : "auto"
        } },
        socialDataToMap
            .filter((item) => item.supabase_key === stampToRender)
            .map((item) => (react_1.default.createElement("div", { style: {
                border: "1px solid #ccc",
                width: isGrid ? "100%" : "300px",
                height: "190px",
                borderRadius: "12px",
                padding: "16px 24px",
                marginBottom: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }, key: item.supabase_key },
            react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start" } },
                react_1.default.createElement("img", { src: item.image, alt: `${item.title} logo`, style: { marginBottom: "8px", width: "40px", height: "40px", borderRadius: "8px" } }),
                react_1.default.createElement("h2", { style: { fontSize: "20px", fontWeight: "bold" } }, item.title),
                react_1.default.createElement("p", { style: { fontSize: "14px", color: "#666", marginTop: "4px" } }, showAllowCreds ? react_1.default.createElement("span", { className: "font-bold" }, "You need to verify your stamp") : doesStampExist(item.stampTypeId)
                    ? `Your ${item.supabase_key} account is verified`
                    : `Connect your ${item.supabase_key} to verify`)),
            verifyStampFlow ? react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(addStampVerify_1.AdvancedCredentialCollection, { uuid: uuid, refresh: () => {
                        setVerifyStampFlow(false);
                        refresh();
                    }, allStampIds: allStampIds, email: email, apikey: api_key })) : react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "16px" } }, showAllowCreds ?
                react_1.default.createElement("div", null,
                    react_1.default.createElement("button", { style: {
                            backgroundColor: "#FFBF00",
                            color: "#fff",
                            padding: "8px 16px",
                            borderRadius: "12px",
                            border: "none"
                        }, onClick: () => {
                            setVerifyStampFlow(true);
                        } }, "Verify Stamp"),
                    react_1.default.createElement("span", { style: { paddingLeft: 10 } },
                        react_1.default.createElement(infoTooltip_1.InfoTooltip, { content: react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement("p", { style: { fontSize: 14, color: "red" } },
                                    "We found a cubid credential for a different app.",
                                    react_1.default.createElement("br", null),
                                    " Send a one time passcode to verify it")) })))
                : doesStampExist(item.stampTypeId) ? (react_1.default.createElement("button", { style: {
                        backgroundColor: "#28a745",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "12px",
                        border: "none"
                    } }, "Verified Stamp")) : (react_1.default.createElement("button", { onClick: () => handleSocialConnect(item.supabase_key), style: {
                        backgroundColor: "#007bff",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "12px",
                        border: "none"
                    } }, "Connect Account")))))),
        stampToRender === "iah" &&
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        border: "1px solid #ccc",
                        width: isGrid ? "100%" : "300px",
                        height: "190px",
                        borderRadius: "12px",
                        padding: "16px 24px",
                        marginBottom: "16px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    } },
                    react_1.default.createElement("div", { className: "flex items-center space-x-4" },
                        react_1.default.createElement("img", { src: "data:image/png;base64,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", alt: "Image", className: "mb-1 size-10 rounded-md" }),
                        react_1.default.createElement("h2", { className: "font-bold" }, "I-Am-Human")),
                    react_1.default.createElement("div", null, doesStampExist(exports.stampsWithId["iah"]) ? (react_1.default.createElement("p", { className: "text-green-600" }, "Your NEAR account is verified")) : (react_1.default.createElement("p", null, "Use a NEAR wallet to connect your IAH-verified account"))),
                    react_1.default.createElement("div", { className: "mt-4" }, false ? (react_1.default.createElement("div", { className: "flex justify-between" },
                        react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                            react_1.default.createElement("button", { style: {
                                    borderRadius: 10
                                }, className: "bg-green-500 text-white px-4 py-2 rounded" }, "Verified Stamp")),
                        react_1.default.createElement("div", { className: "relative" }))) : (react_1.default.createElement("button", { onClick: () => {
                            providers_1.wallet.signIn();
                        }, style: {
                            borderRadius: 10
                        }, className: "bg-blue-500 text-white px-4 py-2" }, "Connect Wallet"))))),
        stampToRender === "brightid" && react_1.default.createElement("p", null, "brightid"),
        stampToRender === "gitcoin" &&
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        border: "1px solid #ccc",
                        width: isGrid ? "100%" : "300px",
                        height: "190px",
                        borderRadius: "12px",
                        padding: "16px 24px",
                        marginBottom: "16px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    } },
                    react_1.default.createElement("div", { className: "items-center" },
                        react_1.default.createElement("img", { src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAP1BMVEUAQzsAQzsAQzsAPTQAQDgANy2WpaM/Yl0ALiP///+otbMACAAAJxpSb2rd4uJogXzK0dCBlZIjUUq7xcTz9fUp8LglAAAAAnRSTlMm5BIqaH0AAADfSURBVHgBfNKBCsMgDEXRzSQ2z0a12v//1tUyoM61FxTgYCDg6/V2N71nG9Q9dEFiJ3yD5BfxC/9HRVgRjO4wIvmsMiMZvnnlH2RJSFFNY0ESHlETEPSckJF0QPHICHLkRBI2uqIiWa7ii7cNaHJ9SRGZSBN2AGUvOuCGyseV14ywNgwoHtQvI4O3ABtww8IU0ZaGJGUfXnKFF6ceQAMQ5Ip9TXVOaq7qyu+eFFGMHdNxrMEG7CMLK/U0jNi1L7/lo1gmdFIbvs3oWLTGs4Un7NFZtxHnnvH5U3+GLzsAAOyFDgN+WSNyAAAAAElFTkSuQmCC", alt: "Image", className: "mb-1 size-10 rounded-md" }),
                        react_1.default.createElement("div", null,
                            react_1.default.createElement("h2", { className: "font-bold" }, "Gitcoin Passport"),
                            react_1.default.createElement("p", { className: "text-gray-600" }, "Connect to import your existing Gitcoin Passport"))),
                    react_1.default.createElement("div", { className: "mt-2" }, doesStampExist(exports.stampsWithId.gitcoin) ? (react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                        react_1.default.createElement("button", { style: { borderRadius: 10 }, className: "bg-green-500 text-white px-4 py-2 rounded" }, "Verified Stamp"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                        lensModalOpen && (react_1.default.createElement("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50" },
                            react_1.default.createElement("div", { className: "bg-white rounded-lg p-6 w-96" },
                                react_1.default.createElement("p", { className: "text-xl font-bold mb-2" }, "Connect Web3 Wallet for Gitcoin Passport"),
                                connectors.map((connector) => (react_1.default.createElement("button", { key: connector.uid, className: "bg-blue-500 text-white px-4 py-2 rounded w-full mb-4", onClick: () => connect({ connector }) }, connector.name))),
                                react_1.default.createElement("button", { className: "mt-4 text-red-500", style: { borderRadius: 10 }, onClick: () => setGitcoinModalOpen(false) }, "Close")))),
                        react_1.default.createElement("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", onClick: () => setGitcoinModalOpen(true) }, "Connect Gitcoin")))))),
        stampToRender === "instagram" && react_1.default.createElement("p", null, "instagram"),
        stampToRender === "gooddollar" && react_1.default.createElement("p", null, "gooddollar"),
        stampToRender === "near-wallet" &&
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        border: "1px solid #ccc",
                        width: isGrid ? "100%" : "300px",
                        height: "190px",
                        borderRadius: "12px",
                        padding: "16px 24px",
                        marginBottom: "16px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    } },
                    react_1.default.createElement("div", { className: "flex items-center space-x-4" },
                        react_1.default.createElement("img", { src: "data:image/png;base64,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", alt: "Image", className: "mb-1 size-10 rounded-md" }),
                        react_1.default.createElement("h2", { className: "font-bold" }, "Near")),
                    react_1.default.createElement("div", null, doesStampExist(exports.stampsWithId["iah"]) ? (react_1.default.createElement("p", { className: "text-green-600" }, "Your NEAR account is verified")) : (react_1.default.createElement("p", null, "Use a NEAR wallet"))),
                    react_1.default.createElement("div", { className: "mt-4" }, false ? (react_1.default.createElement("div", { className: "flex justify-between" },
                        react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                            react_1.default.createElement("button", { style: {
                                    borderRadius: 10
                                }, className: "bg-green-500 text-white px-4 py-2 rounded" }, "Verified Stamp")),
                        react_1.default.createElement("div", { className: "relative" }))) : (react_1.default.createElement("button", { onClick: () => {
                            providers_1.wallet.signIn();
                        }, style: {
                            borderRadius: 10
                        }, className: "bg-blue-500 text-white px-4 py-2" }, "Connect Wallet"))))),
        stampToRender === "fractal" && react_1.default.createElement("p", null, "fractal"),
        stampToRender === "solana" && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: {
                    border: "1px solid #ccc",
                    width: isGrid ? "100%" : "300px",
                    height: "190px",
                    borderRadius: "12px",
                    padding: "16px 24px",
                    marginBottom: "16px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                } },
                react_1.default.createElement("div", { className: "items-center" },
                    react_1.default.createElement("img", { src: "data:image/webp;base64,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", alt: "Image", className: "mb-1 object-cover rounded-md", style: {
                            width: 40,
                            height: 40
                        } }),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", { className: "font-bold" }, "Solana"),
                        doesStampExist(exports.stampsWithId["solana"]) ? (react_1.default.createElement("div", { className: "flex items-center space-x-1" },
                            react_1.default.createElement("p", { className: "text-gray-600" }, "Your Solana address is verified"),
                            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "#00e64d", className: "size-6" },
                                react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })))) : (react_1.default.createElement("p", { className: "text-gray-600" }, "Connect to Solana")))),
                react_1.default.createElement("div", { className: "mt-4" }, doesStampExist(exports.stampsWithId["solana"]) ? (react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                    react_1.default.createElement("button", { onClick: () => {
                            // connect worldcoin wallet
                        }, style: {
                            borderRadius: 10
                        }, className: "bg-green-500 text-white px-4 py-2 rounded" }, "Solana Connected"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(wallet_adapter_react_ui_1.WalletMultiButton, null)))))),
        stampToRender === "telegram" && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: {
                    border: "1px solid #ccc",
                    width: isGrid ? "100%" : "300px",
                    height: "190px",
                    borderRadius: "12px",
                    padding: "16px 24px",
                    marginBottom: "16px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                } },
                react_1.default.createElement("div", { className: "items-center" },
                    react_1.default.createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png", alt: "Image", className: "mb-1 size-10 rounded-md object-cover" }),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement("h2", { className: "font-bold" }, "Telegram"),
                        doesStampExist(exports.stampsWithId.telegram) ? (react_1.default.createElement("div", { className: "flex items-center space-x-1" },
                            react_1.default.createElement("p", { className: "text-gray-600" }, "Your telegram is verified"),
                            react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "#00e64d", className: "size-6" },
                                react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })))) : (react_1.default.createElement("p", { className: "text-gray-600" }, "Verify your telegram")))),
                react_1.default.createElement("div", { className: "mt-4" }, doesStampExist(exports.stampsWithId.telegram) ? (react_1.default.createElement("div", { style: { display: "flex", justifyContent: "space-between" } },
                    react_1.default.createElement("button", { className: "bg-green-500 text-white px-4 py-2 rounded" }, "Verified Stamp"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement("button", { onClick: () => {
                            setShowTelegramScript(true);
                        }, className: "bg-blue-500 text-white px-4 py-2 rounded" }, "Connect Telegram"),
                    showTelegramScript && (react_1.default.createElement("div", { className: "p-3" },
                        react_1.default.createElement("script", { async: true, src: "https://telegram.org/js/telegram-widget.js?22", "data-telegram-login": "cubid_bot", "data-size": "medium", "data-auth-url": "https://passport.cubid.me/telegram", "data-request-access": "write" })))))))),
        stampToRender === "worldcoin" && react_1.default.createElement("p", null, "worldcoin"),
        stampToRender === "near" &&
            react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("div", { style: {
                        border: "1px solid #ccc",
                        width: isGrid ? "100%" : "300px",
                        height: "190px",
                        borderRadius: "12px",
                        padding: "16px 24px",
                        marginBottom: "16px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    } },
                    react_1.default.createElement("div", { className: "flex items-center space-x-4" },
                        react_1.default.createElement("img", { src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMkAAAD7CAMAAAD3qkCRAAAAflBMVEX///8AAABQUFBLS0u1tbXW1tZAQECjo6Pq6urz8/NXV1eSkpIxMTHPz89GRkagoKCCgoJxcXHk5OTGxsYICAh3d3eIiIjc3Nzw8PCvr68bGxs2Nja5ubn5+flUVFTMzMxlZWUkJCTBwcFpaWmOjo4gICB8fHwWFhZeXl4rKyth+mX/AAAI/klEQVR4nO2d22LaMAyGE6ABeuKwUiiUtazbur7/C47ITuKD5DiJU/tC/9VGEpUPHEWWJZNlLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxousw2zwWpabPP8Yw//Jxtf24mR1GMK5qsclVrQKb3340tjeLwMY1rXJTbyHN/9Zth/6cFG0skDx/CWf+1rS9CWdb1w4ByfNZKPM/bdu7ULZ1zVGQPH8IY/4Zsz0PY1vXggDJ8yBuZo/bHuO2x8dWqVMI8/e47RHG15kEyfPb4ebXlO3zcNuGXh0k+Xqo9QfS9GuIN6+JHlylhvriT9Jy+OGF+EhVwxwYObby/Geg999o4iYZ5GTeHHYnwQgqtZFc+ps+/0mKZIADc96CEUh6OzDX2IpD0tOBnY/pkfRzYFiAHZ0k33a3+6vFZCSSr86xhSsIiknS/TnWMrbikXQNLpzRXFySbnOjZbu9eCSdchTvSZN0cGDtYysuydHXgR3MKwskJv4Okj9bO/0F8nVg/4zr/mXZYxSSCRn7/fWyODOuer6+No1CMkVfBflkD82xBVFbPBJqauGR/DYyjr+yuCRkFqzVgb3o5++z2CTU7OK4dJvTP4Gv6uyYJOaHaxylpCU4bmu/HZUk+4ujOCMwDV9Jyccl6eHAtLF1pxyITHL+wlF+kcbUNzyjDkQgybY4CenA1PULfcYcm4RK6z7hEZgCfjQSftFJqFWiR9RU0Rw3UeOTUJldzIE1cec/61gCJPZyp5DtwJqxhaT6UiDJCAdmRWD12MLmyUmQUBHYXj+tHltokJkECeXA9ClkvTBqACZFQkVghXqOzG+diPXiREjwJXW91EEUpkyoqX4qJNQSnhJZwfdGB5fJkGQnHEVZwJ2fvhyrE+mQeDowUumQZDc4yVPLFLJSQiRW7keqQE+2lBKJWW5W6d3rryRFYqUWpbwq6NIiyS44ik8FSmIkVuZa6qb9ryRGQlYGtTuw1EiohZH2krbkSHo7sPRIqHW3O9c1WZIkHhEYphRJqGVddwSWIgkZgTlrcpMkoSIwpwNLkyS7w1FcJW2JklAO7Dd9RaokVGE23VSQLMnhCUchI7BkSai6f7KpIF2SrhFYwiSUA7PT9KCUSaiqumf05KRJlIUfTagDS4/koEyqqAgMc2DJkWy0ZDDlwJCmgsRIzlClpeRSCAf2lTrJQrTFfCgveTuwpEiqdIS2ikg4MGulMSWSOpbXH+N2WSDITNsnRFIvIxrT3CURgRlNBemQ1KPowzxCVYToDiwVknNzkp2kI5oa7rWFukRIDs10BEuhEDW52hQyDRLlAWiNLRDhwNSa3CRIlNHzSSztEg5MKZZIgURdjKdK1JZEK2nTVJAAiboUT2810OrA4pNo61iODoEfOEldERKbZKndAM767ZamgsgkW60kvaW/yR2BxSXRV7CO3Q2B5vFJjPRva3MT1VTwFpvEmHp4tJ64HFhEEmPYe/WWO5oKopGczTIov85foiZ3GoukyA5mFadvYznVVPBqz2K+pXfOCqP89y2wP3tKcboAPYogpM6XpEnwBCkuyoElQXLfyR69V0x8Et8KQSlq66n4JG3lD5YIBxadpNvYArVsqxOLpOPYKkV1RcUl6Ty2StGbm8Uj8Sw9NeXeNCYKSd/9lYimgngk/XdudOx3FYOk59hqtfv9JD22vmlEVISMR0J0lJUatmljiwMLsBugIXpADxlbpdwR2ODNAC0RObc8wOaTTgc2wta/1J8KsCEo0RUFGm7dElECHGRvQKKpIO8ZO7SI2J8qzN7MF4ok/BadGXGnBNpemCppG2OD7AzNTgfzLLgDG23XZwuly8y9RVh58YjbVz9o4/mT3l6hhw7mxOsSaAtmQvOa5bgKfTe+qVmwyyjbPWvaz9dXrfxzWx20mD2vQfMeU1AWi8VisVgsFovFYrFYlbY3VxmvLcvXmgr6G1tI0mIBB+wll4V24X68352DwqE/euLmTktKYV3kSIOc/EEKi9G8tAj462ma5JqW9lkCSZ3NwXJvdqdAlZO1GO1S9eM4CS9JorW56iTYAp5NUqXlrfUjLO0c7JfgEBItw2mQLG0U6600++NYdwpWkjNGVq1+l8oSlkFyHWAzQ1ZDTZNatvv9D6/VZfPVlPjmQpIoSz8WSbtgpRc2h39yn7g9jfWlNCOn8SndScArnEQVUUt+XPzqjmOnhr4qSdaiGbkeMt1JduJWA4dNNJbXmvuc1EMlybtoYHqvXutMIlb4DvLh0bJoDKWSSEftUE3gFhGrtNW46EwC69VlrcDOdIOIwM0N+MExSiXJvXxCVzsJdiYpqs8BFuNa2iLgHHyv5UGaiK9aVGTJ/qWuJGJwwj+h3M79DH9W/lJITeSbEC0BYk12pZEgbfDG0w/e27q51Pk2HwxHGUwVyRnWm0Vj1YtGgkSQxocOr4nVKlF3Q6/vHeQj1HNHzD4ksm9x3YMErqye2rfmJ76a3Daq9p4Yo0SiJpG7DZVv8q0bifbmX1WsUvbVY5REVSQwGsRD4UKQTB8bnbT7xBhQylCjSMb54WIgEc8yUcX0W96UOomjaAI83Xv9XygYU5qhLI5p0N/cbqSQyOLrPUbiqJqAR1FTiCImZs1h+O9mt9uJ6r6PEe51IZVEjJNC+F1fEhiKagAMYXEzFYPDMPbEBzXKgn8plUTOMlaLLiQfckjWggixKdgEEvgiRKPz51hfikYi90hE7niSRPgJ1QWI6WNtsiGRD8XwValCOolo6Sme/EngG9Ab0cGd108MhUROhMMXc4J0EqUh05MEnnV67AFPyjrYVUlk3iL8L0mXMkiagmU/EhGUGdFJrnozjSS7WIMxmEySPU6S36tqMn3QAGQ+6aBItJoV6iRi+F7GKIM0SepSaFe0UmeJxP1uRvF79Z7XSaS19+8gyZ48SF7VY5+W0ZNiwCCR04cRCginFokcX155Ybjf7cAW4p5jQ6IF8VPtNgqn3akoTvqwXWyKorivkz376xmG7qvQqTx0sjMQSzhJWL29/lP/5YpVeVHAolEWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVhd9R+9z2XKxbECfgAAAABJRU5ErkJggg==", alt: "Image", className: "mb-1 size-10 rounded-md" }),
                        react_1.default.createElement("h2", { className: "font-bold" }, "Near")),
                    react_1.default.createElement("div", null, doesStampExist(exports.stampsWithId["iah"]) ? (react_1.default.createElement("p", { className: "text-green-600" }, "Your NEAR account is verified")) : (react_1.default.createElement("p", null, "Use a NEAR wallet"))),
                    react_1.default.createElement("div", { className: "mt-4" }, false ? (react_1.default.createElement("div", { className: "flex justify-between" },
                        react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                            react_1.default.createElement("button", { style: {
                                    borderRadius: 10
                                }, className: "bg-green-500 text-white px-4 py-2 rounded" }, "Verified Stamp")),
                        react_1.default.createElement("div", { className: "relative" }))) : (react_1.default.createElement("button", { onClick: () => {
                            providers_1.wallet.signIn();
                        }, style: {
                            borderRadius: 10
                        }, className: "bg-blue-500 text-white px-4 py-2" }, "Connect Wallet"))))),
        stampToRender === "lens-protocol" && (react_1.default.createElement("div", { style: {
                border: "1px solid #ccc",
                borderRadius: "12px",
                marginBottom: "16px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                height: "auto",
            } },
            react_1.default.createElement("div", { className: "mb-3" },
                react_1.default.createElement("img", { src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAZlBMVEX////r6+uDg4VMTU9TVFaYmJn6+vrCw8MAAAAfICQlJioaGx/k5eXy8vIpKi4sLTCwsLFub3FcXV4XGB0VFxvc3N3Ozs55enshIyZDREcJDBKAgYK6urs1Njk8PD+bm53V1danqKn7JVr2AAAAm0lEQVR4AdXOxQGAIABAUZVuu3P/Ie2WBfwXhUc5v831AETYboQyzoWQNlNMmzkOnGd+EHrSj8xanKRZmJHDYJxzlhd6Qw2inOdltZm3bVnt+inr9Y3zyBKHCyalsaUbNaMUdmzV+h5uQ7a9iJS2jZG7Pbcr9cfK1Nmrc/Y00fTOmazKi7UQSF22cRkLxkRc8ouuEtIhNBDX+WkTbzIRXoEbjE4AAAAASUVORK5CYII=', alt: "Image", className: "mb-1 w-10 h-10 rounded-md" }),
                react_1.default.createElement("h3", { className: "text-xl font-bold" }, "Lens Protocol"),
                doesStampExist(exports.stampsWithId["lens-protocol"]) ? (react_1.default.createElement("div", { className: "flex items-center space-x-1 text-sm text-gray-600 mt-1" },
                    react_1.default.createElement("p", null, "Your Lens Protocol is verified"),
                    react_1.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "#00e64d", className: "w-6 h-6" },
                        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 \n               9 0 11-18 0 9 9 0 0118 0z" })))) : (react_1.default.createElement("p", { className: "text-sm texAccountt-gray-600 mt-1" }, "Use a Lens Protocol"))),
            react_1.default.createElement("div", null, doesStampExist(exports.stampsWithId["lens-protocol"]) ? (react_1.default.createElement("div", { className: "flex items-center justify-between" },
                react_1.default.createElement("div", { className: "flex items-center space-x-2" },
                    react_1.default.createElement(button_1.Button, null, "Verified Stamp")))) : (react_1.default.createElement(react_1.default.Fragment, null, address ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(loginOptions_1.LoginOptions, { wallet: address !== null && address !== void 0 ? address : "", onSuccess: (args) => __awaiter(void 0, void 0, void 0, function* () {
                        var _a, _b, _c;
                        yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                            page_id,
                            stamp_type: "lens-protocol",
                            stampData: Object.assign(Object.assign({ uniquevalue: (_b = (_a = args === null || args === void 0 ? void 0 : args.handle) === null || _a === void 0 ? void 0 : _a.linkedTo) === null || _b === void 0 ? void 0 : _b.nftTokenId, identity: (_c = args.handle) === null || _c === void 0 ? void 0 : _c.fullHandle }, args), { metdata: Object.assign(Object.assign({}, args === null || args === void 0 ? void 0 : args.metadata), { picture: null }) }),
                            user_data: { uuid },
                        });
                        disconnect();
                        fetchStampData();
                        // window.location.reload()
                    }) }))) : (react_1.default.createElement(react_1.default.Fragment, null,
                lensModalOpen && (react_1.default.createElement("div", { style: {
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "16px",
                        marginTop: "8px",
                    } },
                    react_1.default.createElement("p", { className: "text-lg font-semibold mb-2" }, "Connect Web3 Wallet for Lens"),
                    connectors.map((connector) => (react_1.default.createElement(button_1.Button, { key: connector.uid, variant: "secondary", className: "bg-blue-500 mb-4 text-white", style: { width: "200px" }, onClick: () => {
                            localStorage === null || localStorage === void 0 ? void 0 : localStorage.setItem("lens-loggin", "true");
                            connect({ connector });
                        } }, connector.name))))),
                react_1.default.createElement(button_1.Button, { variant: "outline", className: "bg-blue-500 text-white", style: { marginTop: "8px", borderRadius: 10 }, onClick: () => {
                        setLensModalOpen(true);
                    } }, "Connect Lens Wallet")))))))),
        stampToRender === "phone" && (react_1.default.createElement("div", { style: {
                border: "1px solid #ccc",
                width: isGrid ? "100%" : "300px",
                borderRadius: "12px",
                padding: "16px 24px",
                marginBottom: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            } },
            react_1.default.createElement("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start" } },
                react_1.default.createElement("img", { src: "https://i.pinimg.com/736x/84/4e/8c/844e8cd4ab26c82286238471f0e5a901.jpg", alt: "Farcaster logo", style: { marginBottom: "8px", width: "40px", height: "40px", borderRadius: "8px" } }),
                react_1.default.createElement("h2", { style: { fontSize: "20px", fontWeight: "bold" } }, "Phone"),
                doesStampExist(exports.stampsWithId.phone) ? (react_1.default.createElement("button", { style: {
                        backgroundColor: "#28a745",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "12px",
                        border: "none"
                    } }, "Verified Stamp")) : (react_1.default.createElement("div", { style: { borderRadius: "8px", padding: "8px 12px" } },
                    react_1.default.createElement("p", { style: { fontSize: "14px", color: "#666" } }, "Connect your phone"),
                    react_1.default.createElement("button", { onClick: () => {
                            setPhoneOpen(true);
                        }, style: {
                            backgroundColor: "#007bff",
                            color: "#fff",
                            padding: "8px 16px",
                            borderRadius: "12px",
                            border: "none",
                            marginTop: "8px"
                        } }, "Connect Phone")))))),
        stampToRender === "farcaster" && (react_1.default.createElement("div", { className: `border ${isGrid ? "w-full" : "w-[300px]"} rounded-xl p-4 px-6 mb-4 shadow-md` },
            react_1.default.createElement("div", { className: "flex flex-col items-start" },
                react_1.default.createElement("img", { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0LwYIlZ9aYglKkSRuhEH0TM6VkCmqRqXpQ&s", alt: "Farcaster logo", className: "mb-1 size-10 rounded-md" }),
                react_1.default.createElement("h2", { className: "text-xl font-bold" }, "Farcaster"),
                doesStampExist(4) ? (react_1.default.createElement("p", { className: "text-sm text-gray-600 mt-1" }, "Your Farcaster is verified")) : (react_1.default.createElement("div", { className: "bg-white w-[fit-content] rounded-lg mt-2" },
                    react_1.default.createElement(SignInButton, null)))))),
        stampToRender === "address" && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { style: {
                    border: "1px solid #e5e7eb",
                    width: isGrid ? "100%" : "300px",
                    borderRadius: "0.75rem", // Tailwind: rounded-xl
                    padding: "1rem 1.5rem", // p-4 & px-6
                    marginBottom: "1rem", // mb-4
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)" // shadow-md
                } },
                react_1.default.createElement("div", { style: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    } },
                    react_1.default.createElement("img", { src: "https://thumbs.dreamstime.com/b/destination-place-pin-red-pointer-map-position-mark-125211341.jpg", alt: "Farcaster logo", style: {
                            marginBottom: "0.25rem", // mb-1
                            width: "2.5rem", // w-10
                            height: "2.5rem", // h-10
                            borderRadius: "0.375rem" // rounded-md
                        } }),
                    react_1.default.createElement("h2", { style: {
                            fontSize: "1.25rem", // text-xl
                            fontWeight: 700 // font-bold
                        } }, "Address"),
                    doesStampExist(exports.stampsWithId.address) ? (react_1.default.createElement("p", { style: {
                            fontSize: "0.875rem", // text-sm
                            color: "#4b5563", // text-gray-600
                            marginTop: "0.25rem" // mt-1
                        } }, "Your Address is added")) : (react_1.default.createElement("div", { style: {
                            width: "fit-content",
                            borderRadius: "0.5rem" // rounded-lg
                        } },
                        react_1.default.createElement("p", { style: {
                                fontSize: "0.875rem", // text-sm
                                color: "#4b5563" // text-gray-600
                            } }, "Add your address"),
                        react_1.default.createElement("button", { onClick: () => setAddressOpen(true), style: {
                                backgroundColor: "#3b82f6", // bg-blue-500
                                color: "#fff", // text-white
                                padding: "0.5rem 1rem", // py-2 px-4
                                borderRadius: "0.25rem", // rounded
                                marginTop: "0.5rem", // mt-2
                                cursor: "pointer",
                                border: "none"
                            } }, "Add Address"))))))),
        react_1.default.createElement(phoneNumberConnect_1.PhoneNumberConnect, { apikey: api_key, open: phoneOpen, onClose: () => setPhoneOpen(false), fetchStamps: fetchStampData, page_id: page_id, uuid: uuid }),
        react_1.default.createElement(setLocationPanel_1.LocationSearchPanel, { fetchStamps: fetchStampData, apikey: api_key, open: addressOpen, onClose: () => setAddressOpen(false), page_id: page_id, uuid: uuid })));
};
exports.Stamps = Stamps;
