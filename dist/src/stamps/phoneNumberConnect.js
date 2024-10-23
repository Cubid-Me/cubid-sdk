"use strict";
// @ts-nocheck
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
exports.PhoneNumberConnect = void 0;
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
const react_phone_input_2_1 = __importDefault(require("react-phone-input-2"));
const useAuth_1 = __importDefault(require("@/hooks/useAuth"));
const useCreatedByApp_1 = require("@/hooks/useCreatedByApp");
const button_1 = require("@/components/ui/button");
const input_1 = require("@/components/ui/input");
const sheet_1 = require("@/components/ui/sheet");
const _1 = require(".");
const stampInsertion_1 = require("@/lib/stampInsertion");
const PhoneNumberConnect = ({ open, fetchStamps, onClose, appId, }) => {
    const [phoneInput, setPhoneInput] = react_1.default.useState("");
    const [otpSent, setOtpSent] = react_1.default.useState(false);
    const [otpCode, setOtpCode] = react_1.default.useState("");
    const sendOtp = () => __awaiter(void 0, void 0, void 0, function* () {
        yield axios_1.default.post("/api/twillio/send-otp", {
            phone: `+${phoneInput}`,
        });
        setOtpSent(true);
    });
    const { user, getUser } = (0, useAuth_1.default)({ appId });
    console.log({ appId }, "phone");
    const { email = "" } = user !== null && user !== void 0 ? user : {};
    const { getIdForApp } = (0, useCreatedByApp_1.useCreatedByAppId)();
    const verifyOtp = () => __awaiter(void 0, void 0, void 0, function* () {
        const { data: verify_data } = yield axios_1.default.post("/api/twillio/verify-otp", {
            phone: `+${phoneInput}`,
            otpCode,
        });
        if (verify_data.status === "approved") {
            react_toastify_1.toast.success("Otp Verified");
            setOtpSent(true);
            onClose();
            const stampId = _1.stampsWithId.phone;
            const dbUser = yield getUser();
            console.log(dbUser);
            yield (0, stampInsertion_1.insertStamp)({
                stamp_type: 'phone',
                user_data: { user_id: dbUser === null || dbUser === void 0 ? void 0 : dbUser.id, uuid: "" },
                stampData: {
                    identity: phoneInput,
                    uniquevalue: phoneInput
                },
                app_id: yield getIdForApp()
            });
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
                    react_1.default.createElement(sheet_1.SheetTitle, null, "Phone Number Connect"),
                    react_1.default.createElement("div", null, otpSent ? (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(input_1.Input, { placeholder: "OTP", value: otpCode, type: "number", onChange: (e) => {
                                setOtpCode(e.target.value);
                            } }),
                        react_1.default.createElement(button_1.Button, { onClick: () => {
                                verifyOtp();
                            }, className: "mt-3" }, "Verify OTP"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                        react_1.default.createElement(react_phone_input_2_1.default, { placeholder: "Phone Number", value: phoneInput, inputClass: "!text-black dark:!text-black", dropdownClass: "", country: "us", onChange: (e) => {
                                console.log(e);
                                setPhoneInput(e);
                            } }),
                        react_1.default.createElement(button_1.Button, { onClick: () => {
                                sendOtp();
                            }, className: "mt-3" }, "Send Passcode")))))))));
};
exports.PhoneNumberConnect = PhoneNumberConnect;
