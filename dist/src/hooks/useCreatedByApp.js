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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreatedByAppId = void 0;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const useCreatedByAppId = () => {
    const cubidAppId = 22;
    const adminuid = 'uuid';
    const fetchValidId = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (adminuid) {
            const { data } = yield axios_1.default.post("/api/allow/fetch_allow_uid", {
                uid: adminuid,
            });
            return (_c = (_b = (_a = data === null || data === void 0 ? void 0 : data.dapp_users) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.dapps) === null || _c === void 0 ? void 0 : _c.id;
        }
    }), [adminuid]);
    const getIdForApp = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        return window.location.href.includes("/allow") ? yield fetchValidId() : cubidAppId;
    }), [fetchValidId]);
    return { getIdForApp };
};
exports.useCreatedByAppId = useCreatedByAppId;
