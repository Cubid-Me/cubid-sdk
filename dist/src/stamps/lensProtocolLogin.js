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
exports.LoginOptions = LoginOptions;
// @ts-nocheck
const react_web_1 = require("@lens-protocol/react-web");
const react_web_2 = require("@lens-protocol/react-web");
const react_1 = require("react");
const react_toastify_1 = require("react-toastify");
const wagmi_1 = require("wagmi");
function LoginAs({ profile, wallet, onSuccess }) {
    var _a, _b;
    const { execute, loading } = (0, react_web_1.useLogin)();
    const login = () => __awaiter(this, void 0, void 0, function* () {
        const result = yield execute({
            address: wallet,
            profileId: profile.id,
        });
        if (result.isSuccess()) {
            return onSuccess(profile);
        }
        localStorage.removeItem("lens-loggin");
        window.alert(result.error.message);
    });
    return (React.createElement("button", { disabled: loading, onClick: login }, (_b = (_a = profile.handle) === null || _a === void 0 ? void 0 : _a.fullHandle) !== null && _b !== void 0 ? _b : profile.id));
}
function LoginOptions({ wallet, onSuccess }) {
    console.log({ wallet, onSuccess });
    const { data: profiles, error, loading } = (0, react_web_2.useProfilesManaged)({
        for: wallet,
        includeOwned: true
    });
    const { disconnect } = (0, wagmi_1.useDisconnect)();
    console.log({ profiles });
    (0, react_1.useEffect)(() => {
        if (!loading && profiles.length === 0) {
            localStorage.removeItem("lens-loggin");
            disconnect();
            react_toastify_1.toast.error("No profiles managed by this wallet.");
        }
        if ((profiles === null || profiles === void 0 ? void 0 : profiles.length) !== 0) {
            onSuccess(profiles === null || profiles === void 0 ? void 0 : profiles[0]);
        }
    }, [loading, profiles, onSuccess]);
    if (loading) {
        return React.createElement("p", null, "Loading...");
    }
    if (error) {
        return React.createElement("p", null, error);
    }
    if (profiles.length === 0) {
        return React.createElement("p", null, "No profiles managed by this wallet.");
    }
    return (React.createElement("div", null, profiles.map((profile) => (React.createElement(LoginAs, { key: profile.id, wallet: wallet, profile: profile, onSuccess: onSuccess })))));
}
