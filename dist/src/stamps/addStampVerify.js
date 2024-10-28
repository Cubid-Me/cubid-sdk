'use client';
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
exports.AdvancedCredentialCollection = AdvancedCredentialCollection;
const react_1 = require("react");
const button_1 = require("../component/button");
const input_1 = require("../component/input");
const label_1 = require("../component/label");
const card_1 = require("../component/card");
const dialog_1 = require("../component/dialog");
const radio_group_1 = require("../component/radio-group");
const use_toast_1 = require("../component/use-toast");
const lucide_react_1 = require("lucide-react");
const react_2 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const DAPP_NAME = "YourDAppName";
const USER_EMAIL = "user@example.com";
function AdvancedCredentialCollection({ email, apikey, refresh, uuid, allStampIds }) {
    const [passcodeRequested, setPasscodeRequested] = (0, react_1.useState)(false);
    const [passcode, setPasscode] = (0, react_1.useState)('');
    const [resendCountdown, setResendCountdown] = (0, react_1.useState)(60);
    const [cubidAuthenticated, setCubidAuthenticated] = (0, react_1.useState)(false);
    const [credentialShared, setCredentialShared] = (0, react_1.useState)(false);
    const [showAddCredentialModal, setShowAddCredentialModal] = (0, react_1.useState)(false);
    const [twitterHandles, setTwitterHandles] = (0, react_1.useState)(['@twitterUser123', '@anotherUser456']);
    const [selectedTwitterHandle, setSelectedTwitterHandle] = (0, react_1.useState)('@twitterUser123');
    const [showTwitterHandles, setShowTwitterHandles] = (0, react_1.useState)(false);
    const { toast } = (0, use_toast_1.useToast)();
    (0, react_1.useEffect)(() => {
        let timer;
        if (passcodeRequested && resendCountdown > 0) {
            timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [passcodeRequested, resendCountdown]);
    const handlePasscodeRequest = () => __awaiter(this, void 0, void 0, function* () {
        setPasscodeRequested(true);
        setResendCountdown(60);
        yield axios_1.default.post("https://passport.cubid.me/api/verify/send-dapp-email", {
            email: email,
            apikey
        });
        toast({
            title: "Passcode Sent",
            description: "Check your email for the passcode we just sent.",
        });
    });
    const handlePasscodeVerify = () => __awaiter(this, void 0, void 0, function* () {
        const { data } = yield axios_1.default.post("https://passport.cubid.me/api/verify/verify-email", {
            email: email,
            apikey,
            otp: passcode
        });
        if (data.success) {
            setCubidAuthenticated(true);
            toast({
                title: "Authentication Successful",
                description: "You have successfully authenticated with CUBID.",
            });
        }
        else {
            toast({
                title: "Authentication Failed",
                description: "The passcode you entered is incorrect. Please try again.",
                variant: "destructive",
            });
        }
    });
    const handleCloseAddCredentialModal = () => {
        setShowAddCredentialModal(false);
        setShowTwitterHandles(true);
    };
    const handleAuthorize = () => __awaiter(this, void 0, void 0, function* () {
        yield axios_1.default.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
            apikey,
            user_id: uuid,
            stamp_id_array: allStampIds
        });
        refresh();
        setCredentialShared(true);
        toast({
            title: "Credential Shared",
            description: `Your credentials have been shared.`,
        });
    });
    return (react_2.default.createElement("div", { className: "w-full p-3 mx-auto space-y-6" },
        react_2.default.createElement(card_1.Card, { className: credentialShared ? "bg-green-50 rounded-xl border-green-200" : (cubidAuthenticated ? "bg-yellow-50 rounded-xl border-yellow-200" : "bg-red-50 rounded-xl border-red-200") },
            react_2.default.createElement(card_1.CardHeader, null,
                react_2.default.createElement(card_1.CardTitle, { className: "flex items-center text-red-600" },
                    credentialShared ? react_2.default.createElement(lucide_react_1.Check, { className: "mr-2" }) : react_2.default.createElement(lucide_react_1.AlertCircle, { className: "mr-2" }),
                    credentialShared ? "Credential Shared" : (cubidAuthenticated ? "Credential Available" : "Unauthenticated Credential detected"))),
            react_2.default.createElement(card_1.CardContent, null, !cubidAuthenticated ? (react_2.default.createElement(react_2.default.Fragment, null,
                react_2.default.createElement("p", { className: "mb-4 text-red-600" }, "We found a credential on Cubid account for a different app. Get a one-time passcode to access it."),
                !passcodeRequested ? (react_2.default.createElement(button_1.Button, { className: "!bg-red-600 !text-white rounded-xl", onClick: handlePasscodeRequest }, "Send me a passcode")) : (react_2.default.createElement("div", { className: "space-y-4" },
                    react_2.default.createElement("p", null, "Check your email for the passcode we just sent"),
                    react_2.default.createElement("div", { className: "flex space-x-2" },
                        react_2.default.createElement(input_1.Input, { placeholder: "Enter passcode here", value: passcode, className: 'rounded-xl', onChange: (e) => setPasscode(e.target.value) }),
                        react_2.default.createElement(button_1.Button, { onClick: handlePasscodeVerify }, "OK")),
                    react_2.default.createElement(button_1.Button, { disabled: resendCountdown > 0, onClick: handlePasscodeRequest },
                        "Resend ",
                        resendCountdown > 0 ? `(${resendCountdown}s)` : ''))))) : credentialShared ? (react_2.default.createElement("p", { className: "mb-4 text-green-700" },
                "Twitter Credential data: ",
                react_2.default.createElement("strong", null, selectedTwitterHandle))) : (react_2.default.createElement(react_2.default.Fragment, null,
                react_2.default.createElement("p", { className: "mb-4 text-yellow-700" },
                    "Nice, you've authenticated with Cubid.",
                    react_2.default.createElement("br", null),
                    react_2.default.createElement("br", null),
                    "Twitter Credential available: ",
                    react_2.default.createElement("strong", null, selectedTwitterHandle)),
                showTwitterHandles ? (react_2.default.createElement(react_2.default.Fragment, null,
                    react_2.default.createElement(radio_group_1.RadioGroup, { value: selectedTwitterHandle, onValueChange: setSelectedTwitterHandle, className: "mb-4" }, twitterHandles.map((handle) => (react_2.default.createElement("div", { key: handle, className: "flex items-center space-x-2" },
                        react_2.default.createElement(radio_group_1.RadioGroupItem, { value: handle, id: handle }),
                        react_2.default.createElement(label_1.Label, { htmlFor: handle }, handle))))),
                    react_2.default.createElement(button_1.Button, { onClick: handleAuthorize, className: "w-full" },
                        "Authorize ",
                        DAPP_NAME,
                        " to see this credential"))) : (react_2.default.createElement(react_2.default.Fragment, null,
                    react_2.default.createElement(button_1.Button, { onClick: handleAuthorize, className: "w-full mb-4" },
                        "Authorize ",
                        DAPP_NAME,
                        " to see this credential"))))))),
        react_2.default.createElement(dialog_1.Dialog, { open: showAddCredentialModal, onOpenChange: setShowAddCredentialModal },
            react_2.default.createElement(dialog_1.DialogContent, null,
                react_2.default.createElement(dialog_1.DialogHeader, null,
                    react_2.default.createElement(dialog_1.DialogTitle, null, "Add Twitter Credential"),
                    react_2.default.createElement(dialog_1.DialogDescription, null, "OAuth process would happen here")),
                react_2.default.createElement(dialog_1.DialogFooter, null,
                    react_2.default.createElement(button_1.Button, { onClick: handleCloseAddCredentialModal }, "OK"))))));
}
