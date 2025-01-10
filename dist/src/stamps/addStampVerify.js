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
exports.AdvancedCredentialCollection = AdvancedCredentialCollection;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const DAPP_NAME = "YourDAppName";
function AdvancedCredentialCollection({ email, apikey, refresh, uuid, allStampIds }) {
    const [passcodeRequested, setPasscodeRequested] = (0, react_1.useState)(true);
    const [passcode, setPasscode] = (0, react_1.useState)('');
    const [resendCountdown, setResendCountdown] = (0, react_1.useState)(60);
    const [cubidAuthenticated, setCubidAuthenticated] = (0, react_1.useState)(false);
    const [credentialShared, setCredentialShared] = (0, react_1.useState)(false);
    const [showTwitterHandles, setShowTwitterHandles] = (0, react_1.useState)(false);
    const [twitterHandles, setTwitterHandles] = (0, react_1.useState)(['@twitterUser123', '@anotherUser456']);
    const [selectedTwitterHandle, setSelectedTwitterHandle] = (0, react_1.useState)('@twitterUser123');
    const [grantPerm, setGrantPerm] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        let timer;
        if (passcodeRequested && resendCountdown > 0) {
            timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [passcodeRequested, resendCountdown]);
    const handlePasscodeRequest = () => __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.post("https://passport.cubid.me/api/verify/send-dapp-email", {
            email,
            apikey,
        });
        setPasscode(60);
        alert("Passcode Sent. Check your email for the passcode we just sent.");
    });
    const handlePasscodeVerify = () => __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios_1.default.post("https://passport.cubid.me/api/verify/verify-email", {
            email,
            apikey,
            otp: passcode,
            dappuser_id: uuid,
        });
        if (data.success) {
            yield axios_1.default.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
                apikey,
                user_id: uuid,
                stamp_id_array: allStampIds,
            });
            yield refresh();
            yield refresh();
            yield axios_1.default.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
                apikey,
                user_id: uuid,
                stamp_id_array: allStampIds,
            });
            yield refresh();
            yield refresh();
            setCredentialShared(true);
            localStorage.setItem("logged_in", uuid);
        }
        else {
            alert("Authentication Failed. The passcode you entered is incorrect. Please try again.");
        }
    });
    const handleAuthorize = () => __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
            apikey,
            user_id: uuid,
            stamp_id_array: allStampIds,
        });
        yield refresh();
        yield refresh();
        yield refresh();
        setCredentialShared(true);
    });
    (0, react_1.useEffect)(() => {
        if (localStorage.getItem("logged_in") === uuid) {
            setGrantPerm(true);
        }
        setInterval(() => {
            if (localStorage.getItem("logged_in") === uuid) {
                setGrantPerm(true);
            }
            else {
                setGrantPerm(false);
            }
        }, 1000);
    }, [uuid]);
    (0, react_1.useEffect)(() => {
        if (localStorage.getItem("logged_in") != uuid) {
            handlePasscodeRequest();
        }
    }, []);
    console.log({ email });
    if (grantPerm) {
        return (react_1.default.createElement("button", { onClick: handleAuthorize, style: {
                width: '100%',
                padding: '8px 16px',
                backgroundColor: '#007AFF',
                color: '#FFF',
                borderRadius: '8px',
                marginTop: '8px',
            } }, "Grant Permission"));
    }
    return (react_1.default.createElement("div", { style: { width: '100%', marginBottom: '16px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' } },
        react_1.default.createElement("div", { style: {
                padding: '16px',
                borderRadius: '8px',
                border: `2px solid ${credentialShared ? '#38A169' : cubidAuthenticated ? '#D69E2E' : '#E53E3E'}`,
                backgroundColor: credentialShared ? '#F0FFF4' : cubidAuthenticated ? '#FEFCBF' : '#FFF5F5',
            } },
            react_1.default.createElement("div", { style: { marginTop: '' } }, !cubidAuthenticated ? (react_1.default.createElement(react_1.default.Fragment, null, !passcodeRequested ? (react_1.default.createElement(react_1.default.Fragment, null)) : (react_1.default.createElement("div", null,
                react_1.default.createElement("p", null,
                    "Check your email - ",
                    email && email,
                    " for the passcode we just sent."),
                react_1.default.createElement("div", { style: { alignItems: 'center', gap: '8px' } },
                    react_1.default.createElement("input", { type: "text", placeholder: "Enter passcode here", value: passcode, style: { padding: '8px', borderRadius: '8px', border: '1px solid #DDD' }, onChange: (e) => setPasscode(e.target.value) }),
                    react_1.default.createElement("div", { style: { marginTop: 10 } },
                        react_1.default.createElement("button", { onClick: handlePasscodeVerify, style: { padding: '8px 16px', backgroundColor: '#3182CE', color: '#FFF', borderRadius: '8px' } }, "OK"))),
                react_1.default.createElement("button", { onClick: handlePasscodeRequest, disabled: resendCountdown > 0, style: {
                        marginTop: '8px',
                        padding: '8px 16px',
                        backgroundColor: '#E2E8F0',
                        color: '#4A5568',
                        borderRadius: '8px',
                        cursor: resendCountdown > 0 ? 'not-allowed' : 'pointer',
                    } },
                    "Resend ",
                    resendCountdown > 0 ? `(${resendCountdown}s)` : ''))))) : credentialShared ? (react_1.default.createElement("p", { style: { color: '#38A169' } },
                "Twitter Credential data: ",
                react_1.default.createElement("strong", null, selectedTwitterHandle))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement("p", { style: { color: '#D69E2E' } }, "Nice, you've authenticated with Cubid."),
                showTwitterHandles ? (react_1.default.createElement("div", null,
                    twitterHandles.map((handle) => (react_1.default.createElement("div", { key: handle, style: { display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' } },
                        react_1.default.createElement("input", { type: "radio", id: handle, value: handle, checked: selectedTwitterHandle === handle, onChange: () => setSelectedTwitterHandle(handle) }),
                        react_1.default.createElement("label", { htmlFor: handle }, handle)))),
                    react_1.default.createElement("button", { onClick: handleAuthorize, style: {
                            width: '100%',
                            padding: '8px 16px',
                            backgroundColor: '#007AFF',
                            color: '#FFF',
                            borderRadius: '8px',
                            marginTop: '8px',
                        } }, "Authorize App to see this credential"))) : (react_1.default.createElement("button", { onClick: handleAuthorize, style: {
                        width: '100%',
                        padding: '8px 16px',
                        backgroundColor: '#007AFF',
                        color: '#FFF',
                        borderRadius: '8px',
                        marginTop: '8px',
                    } }, "Authorize App to see this credential"))))))));
}
