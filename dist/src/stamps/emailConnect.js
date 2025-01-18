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
exports.EmailConnect = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const react_toastify_1 = require("react-toastify");
const supabase_1 = require("@/lib/supabase");
const useCreatedByApp_1 = require("@/hooks/useCreatedByApp");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const sheet_1 = require("@/components/ui/sheet");
const insertStamp_1 = require("../lib/insertStamp");
const EmailConnect = ({ open, fetchStamps, onClose, appId, dbUser, uid, }) => {
    const [emailInput, setEmailInput] = react_1.default.useState("");
    const [otpSent, setOtpSent] = react_1.default.useState(false);
    const [otpCode, setOtpCode] = react_1.default.useState("");
    const sendOtp = () => __awaiter(void 0, void 0, void 0, function* () {
        yield supabase_1.supabase.auth.signInWithOtp({
            email: emailInput,
        });
        setOtpSent(true);
    });
    console.log({ appId }, "email");
    const { getIdForApp } = (0, useCreatedByApp_1.useCreatedByAppId)();
    const verifyOtp = () => __awaiter(void 0, void 0, void 0, function* () {
        const { error } = yield supabase_1.supabase.auth.verifyOtp({
            email: emailInput,
            token: otpCode,
            type: "email",
        });
        if (!error) {
            react_toastify_1.toast.success("Otp Verified");
            setOtpSent(true);
            yield (0, insertStamp_1.insertStamp)({
                stamp_type: 'email',
                user_data: { user_id: dbUser === null || dbUser === void 0 ? void 0 : dbUser.id, uuid: uid },
                stampData: {
                    identity: emailInput,
                    uniquevalue: emailInput
                },
                app_id: yield getIdForApp()
            });
            onClose();
            fetchStamps();
            // fetchSocial()
        }
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(sheet_1.Sheet, { open: open, onOpenChange: (value) => {
                if (value === false) {
                    onClose();
                }
            } },
            react_1.default.createElement(sheet_1.SheetContent, null,
                react_1.default.createElement(sheet_1.SheetHeader, null,
                    react_1.default.createElement(sheet_1.SheetTitle, null, "Email Connect"),
                    react_1.default.createElement("form", { onSubmit: (e) => {
                            e.preventDefault();
                            if (otpSent) {
                                verifyOtp();
                            }
                            else {
                                sendOtp();
                            }
                        } }, otpSent ? (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(input_1.Input, { placeholder: "OTP", value: otpCode, type: "number", onChange: (e) => {
                                setOtpCode(e.target.value);
                            } }),
                        react_1.default.createElement(button_1.Button, { type: "submit", className: "mt-3" }, "Verify OTP"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(input_1.Input, { placeholder: "Email", value: emailInput, type: "email", onChange: (e) => {
                                setEmailInput(e.target.value);
                            } }),
                        react_1.default.createElement(button_1.Button, { type: "submit", className: "mt-3" }, "Send Passcode")))))))));
};
exports.EmailConnect = EmailConnect;
