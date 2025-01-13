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
const button_1 = require("../component/button");
const input_1 = require("../component/input");
const PhoneNumberConnect = ({ open, fetchStamps, onClose, page_id, uuid, apikey, }) => {
    const [phoneInput, setPhoneInput] = react_1.default.useState("");
    const [otpSent, setOtpSent] = react_1.default.useState(false);
    const [otpCode, setOtpCode] = react_1.default.useState("");
    const sendOtp = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios_1.default.post("https://passport.cubid.me/api/v2/twillio/send-otp", {
                phone: `+${phoneInput}`,
                apikey,
            });
            setOtpSent(true);
            react_toastify_1.toast.success("OTP sent!");
        }
        catch (error) {
            react_toastify_1.toast.error("Failed to send OTP.");
        }
    });
    const verifyOtp = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { data: verify_data } = yield axios_1.default.post("https://passport.cubid.me/api/v2/twillio/verify-otp", {
                phone: `+${phoneInput}`,
                otpCode,
                apikey,
            });
            if (verify_data.status === "approved") {
                react_toastify_1.toast.success("OTP Verified");
                onClose();
                yield axios_1.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                    page_id,
                    stamp_type: "phone",
                    stampData: { uniquevalue: phoneInput, identity: phoneInput },
                    user_data: { uuid },
                });
                fetchStamps();
            }
        }
        catch (error) {
            react_toastify_1.toast.error("OTP verification failed.");
        }
    });
    if (!open)
        return null;
    return (react_1.default.createElement("div", { style: { backgroundColor: "#000000AB", zIndex: 1000 }, className: "fixed inset-0 flex items-center justify-center z-50" },
        react_1.default.createElement("div", { style: { height: 400 }, className: "bg-white rounded-xl shadow-lg overflow-hidden max-w-sm w-full p-6" },
            react_1.default.createElement("h2", { className: "text-2xl font-bold text-gray-800 mb-4" }, "Phone Number Connect"),
            react_1.default.createElement("div", { className: "mt-2 text-gray-600" }, otpSent ? (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(input_1.Input, { placeholder: "Enter OTP", value: otpCode, type: "number", onChange: (e) => setOtpCode(e.target.value), className: "mt-4 w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring focus:ring-green-400" }),
                react_1.default.createElement(button_1.Button, { onClick: verifyOtp, style: { borderRadius: 10 }, className: "mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2" }, "Verify OTP"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(react_phone_input_2_1.default, { country: "us", value: phoneInput, onChange: (phone) => setPhoneInput(phone) }),
                react_1.default.createElement(button_1.Button, { onClick: sendOtp, style: { borderRadius: 10 }, className: "mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2" }, "Send Passcode")))),
            react_1.default.createElement("div", { className: "mt-6 flex justify-end space-x-2" },
                react_1.default.createElement(button_1.Button, { onClick: onClose, style: { borderRadius: 10 }, className: "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4" }, "Cancel")))));
};
exports.PhoneNumberConnect = PhoneNumberConnect;
