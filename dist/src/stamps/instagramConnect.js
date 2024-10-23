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
exports.InstagramConnect = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const navigation_1 = require("next/navigation");
const axios_1 = __importDefault(require("axios"));
const useAuth_1 = __importDefault(require("@/hooks/useAuth"));
const useCreatedByApp_1 = require("@/hooks/useCreatedByApp");
const sheet_1 = require("@/components/ui/sheet");
const button_1 = require("../ui/button");
const stampInsertion_1 = require("@/lib/stampInsertion");
const redirectUri = "https://passport.cubid.me/app/";
const InstagramAuth = ({ allowPage }) => {
    const handleLogin = () => {
        const clientId = "328555189879651";
        if (allowPage) {
            localStorage.setItem("allow_url", window.location.href.replace(`${window.location.origin}/allow?`, ""));
        }
        window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile&response_type=code`;
    };
    return (react_1.default.createElement("div", { className: "py-2" },
        react_1.default.createElement(button_1.Button, { variant: "default", onClick: handleLogin }, "Login with Instagram")));
};
const InstagramConnect = ({ open, onClose, onOpen, fetchStamps, appId, allowPage, }) => {
    const searchParams = (0, navigation_1.useSearchParams)();
    const authData = (0, useAuth_1.default)({ appId });
    const router = (0, navigation_1.useRouter)();
    const { getIdForApp } = (0, useCreatedByApp_1.useCreatedByAppId)();
    const fetchData = (0, react_1.useCallback)((code_fixes) => __awaiter(void 0, void 0, void 0, function* () {
        const { email } = yield authData.getUser();
        console.log(email);
        if (typeof email === "string") {
            const { data: { user_id, data }, } = yield axios_1.default.post("/api/insta-data-fetch", {
                code: code_fixes,
                redirectUri: redirectUri,
                email: email,
            });
            const allData = data;
            if (user_id) {
                const dbUser = yield authData.getUser();
                yield (0, stampInsertion_1.insertStamp)({
                    stamp_type: 'instagram',
                    user_data: { user_id: dbUser === null || dbUser === void 0 ? void 0 : dbUser.id, uuid: "" },
                    stampData: {
                        identity: allData.username,
                        uniquevalue: allData.id,
                    },
                    app_id: yield getIdForApp()
                });
                fetchStamps();
            }
        }
    }), [authData, fetchStamps, getIdForApp]);
    (0, react_1.useEffect)(() => {
        ;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const code = searchParams === null || searchParams === void 0 ? void 0 : searchParams.get("code");
            if (code) {
                yield fetchData(code);
            }
        }))();
    }, [onOpen, searchParams, fetchData]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(sheet_1.Sheet, { open: open, onOpenChange: (value) => {
                if (value === false) {
                    onClose();
                }
            } },
            react_1.default.createElement(sheet_1.SheetContent, null,
                react_1.default.createElement(sheet_1.SheetHeader, null,
                    react_1.default.createElement(sheet_1.SheetTitle, null, "Connect Instagram"),
                    react_1.default.createElement("div", null,
                        react_1.default.createElement(InstagramAuth, { allowPage: allowPage })))))));
};
exports.InstagramConnect = InstagramConnect;
