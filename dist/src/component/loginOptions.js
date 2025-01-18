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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginOptions = LoginOptions;
// @ts-nocheck
// loginOptions.js
const react_1 = require("react");
const react_web_1 = require("@lens-protocol/react-web");
const react_web_2 = require("@lens-protocol/react-web");
const react_toastify_1 = require("react-toastify");
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
        localStorage.removeItem('lens-loggin');
        window.alert(result.error.message);
    });
    return (React.createElement("button", { disabled: loading, onClick: login }, (_b = (_a = profile.handle) === null || _a === void 0 ? void 0 : _a.fullHandle) !== null && _b !== void 0 ? _b : profile.id));
}
function LoginOptions({ wallet, onSuccess }) {
    const { data: profiles, error, loading } = (0, react_web_2.useProfilesManaged)({
        for: wallet,
        includeOwned: true,
    });
    // We'll conditionally load the useDisconnect hook on the client.
    // Initialize disconnect as a no-op.
    const [disconnect, setDisconnect] = (0, react_1.useState)(() => () => { });
    (0, react_1.useEffect)(() => {
        // Only run in the browser
        if (typeof window !== 'undefined') {
            Promise.resolve().then(() => __importStar(require('wagmi'))).then((module) => {
                // Depending on how 'wagmi' exports useDisconnect, you might access it as a named export.
                // This example assumes it is exported named.
                const { useDisconnect } = module;
                // Now that we have the hook, we call it.
                // IMPORTANT: Since hooks must be called unconditionally, this still isn’t ideal.
                // One workaround is to force a re-render by storing the disconnect function.
                const { disconnect: disconnectFn } = useDisconnect();
                setDisconnect(() => disconnectFn);
            });
        }
    }, []);
    (0, react_1.useEffect)(() => {
        if (!loading && profiles.length === 0) {
            localStorage.removeItem('lens-loggin');
            disconnect();
            react_toastify_1.toast.error('No profiles managed by this wallet.');
        }
        if (profiles === null || profiles === void 0 ? void 0 : profiles.length) {
            onSuccess(profiles[0]);
        }
    }, [loading, profiles, onSuccess, disconnect]);
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
