"use strict";
// @ts-nocheck
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
exports.BrightIdConnectSheet = void 0;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const useAuth_1 = __importDefault(require("@/hooks/useAuth"));
const sheet_1 = require("@/components/ui/sheet");
const BrightIdConnectSheet = ({ modalOpen, closeModal, email, }) => {
    const [brightIdData, setBrightIdData] = (0, react_1.useState)();
    const { getUser } = (0, useAuth_1.default)({});
    const fetchUserData = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        if (email) {
            const user = yield getUser();
            if (user === null || user === void 0 ? void 0 : user.id) {
                const { data: { data }, } = yield axios_1.default.post("/api/supabase/select", {
                    match: { created_by_user_id: user.id, stamptype: 8 },
                    table: "stamps",
                });
                if (data === null || data === void 0 ? void 0 : data[0]) {
                    setBrightIdData === null || setBrightIdData === void 0 ? void 0 : setBrightIdData(data[0]);
                }
                return data === null || data === void 0 ? void 0 : data[0];
            }
        }
    }), [email, getUser]);
    (0, react_1.useEffect)(() => {
        fetchUserData();
    }, [fetchUserData]);
    (0, react_1.useEffect)(() => {
        let interval;
        if (modalOpen) {
            interval = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
                const allUserData = yield fetchUserData();
                if (allUserData) {
                    closeModal();
                    window.location.reload();
                }
            }), 1000);
        }
        else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [modalOpen, fetchUserData, closeModal]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(sheet_1.Sheet, { open: modalOpen, onOpenChange: (value) => {
                if (value === false) {
                    closeModal();
                }
            } },
            react_1.default.createElement(sheet_1.SheetContent, null,
                react_1.default.createElement(sheet_1.SheetHeader, null,
                    react_1.default.createElement(sheet_1.SheetTitle, null, "Connect to BrightId"),
                    react_1.default.createElement("div", null, modalOpen && (react_1.default.createElement("iframe", { style: {
                            width: "100%",
                            height: 1000,
                            borderRadius: 10,
                            marginTop: 10,
                        }, src: `https://aura-new-beta.vercel.app/?email=${email}` }))))))));
};
exports.BrightIdConnectSheet = BrightIdConnectSheet;
