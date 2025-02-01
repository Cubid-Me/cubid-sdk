var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.tsx
var index_exports = {};
__export(index_exports, {
  CubidSDK: () => CubidSDK,
  CubidWidget: () => CubidWidget,
  Provider: () => Provider,
  generateNEARWallet: () => generateNEARWallet
});
module.exports = __toCommonJS(index_exports);

// polyfills.js
var import_buffer = require("buffer");
var import_process = __toESM(require("process"));
var import_crypto_browserify = __toESM(require("crypto-browserify"));
var import_stream_browserify = __toESM(require("stream-browserify"));
var import_path_browserify = __toESM(require("path-browserify"));
if (globalThis?.window !== "undefined") {
  window.Buffer = import_buffer.Buffer;
  window.process = import_process.default;
  window.crypto = import_crypto_browserify.default;
  window.stream = import_stream_browserify.default;
  window.path = import_path_browserify.default;
}

// index.tsx
var import_axios8 = __toESM(require("axios"));
var import_shamir_secret_sharing = require("shamir-secret-sharing");
var import_ethers = require("ethers");
var import_near_api_js2 = require("near-api-js");
var import_js_sha256 = require("js-sha256");

// src/component/cubidWidget.tsx
var import_react14 = __toESM(require("react"));

// src/stamps/index.tsx
var import_react13 = require("react");
var import_axios6 = __toESM(require("axios"));

// src/stamps/phoneNumberConnect.tsx
var import_react = require("react");
var import_axios = __toESM(require("axios"));
var import_react_toastify = require("react-toastify");
var import_react_phone_input_2 = __toESM(require("react-phone-input-2"));
var import_jsx_runtime = require("react/jsx-runtime");
var OTPInput = ({ length = 6, value, onChange }) => {
  const [otp, setOtp] = (0, import_react.useState)(new Array(length).fill(""));
  const inputRefs = (0, import_react.useRef)([]);
  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
    const otpString = newOtp.join("");
    onChange(otpString);
    if (val && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      if (isNaN(pasteData[i])) continue;
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    onChange(newOtp.join(""));
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };
  const containerStyle = {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    margin: "16px 0"
  };
  const inputStyle = {
    width: "48px",
    height: "48px",
    textAlign: "center",
    border: "2px solid #E2E8F0",
    borderRadius: "8px",
    fontSize: "20px",
    outline: "none"
  };
  const focusedInputStyle = {
    ...inputStyle,
    borderColor: "#22C55E",
    boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.2)"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: containerStyle, children: otp.map((digit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "input",
    {
      ref: (el) => inputRefs.current[index] = el,
      type: "text",
      inputMode: "numeric",
      maxLength: 1,
      value: digit,
      onChange: (e) => handleChange(e, index),
      onKeyDown: (e) => handleKeyDown(e, index),
      onPaste: handlePaste,
      style: inputStyle,
      onFocus: (e) => e.target.style.borderColor = "#22C55E",
      onBlur: (e) => e.target.style.borderColor = "#E2E8F0"
    },
    index
  )) });
};
var PhoneNumberConnect = ({
  open,
  fetchStamps,
  onClose,
  page_id,
  uuid,
  apikey,
  setBlacklist,
  setBlacklistCred
}) => {
  const [phoneInput, setPhoneInput] = (0, import_react.useState)("");
  const [otpSent, setOtpSent] = (0, import_react.useState)(false);
  const [otpCode, setOtpCode] = (0, import_react.useState)("");
  const [resendCooldown, setResendCooldown] = (0, import_react.useState)(0);
  const resendTimerRef = (0, import_react.useRef)(null);
  const sendOtp = async () => {
    if (!phoneInput) {
      import_react_toastify.toast.error("Please enter a valid phone number.");
      return;
    }
    try {
      await import_axios.default.post("https://passport.cubid.me/api/v2/twillio/send-otp", {
        phone: `+${phoneInput}`,
        apikey
      });
      setOtpSent(true);
      import_react_toastify.toast.success("OTP sent!");
      setResendCooldown(60);
    } catch (error) {
      import_react_toastify.toast.error("Failed to send OTP.");
    }
  };
  const verifyOtp = async () => {
    if (otpCode.length !== 6) {
      import_react_toastify.toast.error("Please enter the complete OTP.");
      return;
    }
    try {
      const { data: verify_data } = await import_axios.default.post("https://passport.cubid.me/api/v2/twillio/verify-otp", {
        phone: `+${phoneInput}`,
        otpCode,
        apikey
      });
      if (verify_data.status === "approved") {
        import_react_toastify.toast.success("OTP Verified");
        handleClose();
        await import_axios.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
          page_id,
          stamp_type: "phone",
          stampData: { uniquevalue: phoneInput, identity: phoneInput },
          user_data: { uuid }
        });
        const { data: blacklist_creds } = await import_axios.default.post("https://passport-backend-p49d.onrender.com/api/v2/fetch_blacklisted_creds", {
          apikey,
          cred: phoneInput
        });
        await fetchStamps();
        if (blacklist_creds?.is_blacklisted) {
          const { data: { all_email } } = await import_axios.default.post("https://passport-backend-p49d.onrender.com/api/v2/find_users_with_blacklist", {
            cred: phoneInput,
            apikey
          });
          setBlacklist(true);
          setBlacklistCred({
            type: "phone",
            value: all_email?.email1,
            actual: phoneInput
          });
        }
      } else {
        import_react_toastify.toast.error("Incorrect OTP");
      }
    } catch (error) {
      import_react_toastify.toast.error("OTP verification failed.");
    }
  };
  const handleClose = () => {
    setPhoneInput("");
    setOtpSent(false);
    setOtpCode("");
    setResendCooldown(0);
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
      resendTimerRef.current = null;
    }
    onClose();
  };
  (0, import_react.useEffect)(() => {
    if (resendCooldown > 0) {
      resendTimerRef.current = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(resendTimerRef.current);
            resendTimerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    }
    return () => {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }
    };
  }, [resendCooldown]);
  if (!open) return null;
  const overlayStyle = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0, 0, 0, 0.67)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50
  };
  const modalStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    maxWidth: "400px",
    width: "100%",
    padding: "24px"
  };
  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: "16px"
  };
  const contentStyle = {
    marginTop: "8px",
    color: "#4B5563"
  };
  const buttonContainerStyle = {
    marginTop: "24px",
    display: "flex",
    justifyContent: "flex-end"
  };
  const primaryButtonStyle = {
    backgroundColor: "#22C55E",
    color: "white",
    padding: "8px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    width: "100%",
    marginTop: "16px"
  };
  const secondaryButtonStyle = {
    backgroundColor: "#E5E7EB",
    color: "#1F2937",
    padding: "8px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  };
  const resendButtonStyle = {
    backgroundColor: "#3B82F6",
    color: "white",
    padding: "6px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: resendCooldown === 0 ? "pointer" : "not-allowed",
    marginTop: "12px"
  };
  const messageStyle = {
    fontSize: "14px",
    color: "#4B5563",
    textAlign: "center",
    marginBottom: "16px"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: overlayStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: modalStyle, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: titleStyle, children: "Phone Number Connect" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: contentStyle, children: otpSent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: messageStyle, children: "Enter the verification code sent to your phone" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        OTPInput,
        {
          length: 6,
          value: otpCode,
          onChange: setOtpCode
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          onClick: verifyOtp,
          style: primaryButtonStyle,
          children: "Verify OTP"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { textAlign: "center", marginTop: "12px" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          onClick: sendOtp,
          style: resendButtonStyle,
          disabled: resendCooldown !== 0,
          children: resendCooldown === 0 ? "Resend OTP" : `Resend in ${resendCooldown}s`
        }
      ) })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_react_phone_input_2.default,
        {
          country: "us",
          value: phoneInput,
          onChange: (phone) => setPhoneInput(phone),
          containerStyle: { marginBottom: "16px" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          onClick: sendOtp,
          style: primaryButtonStyle,
          children: "Send Passcode"
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: buttonContainerStyle, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        onClick: handleClose,
        style: secondaryButtonStyle,
        children: "Cancel"
      }
    ) })
  ] }) });
};

// src/stamps/setLocationPanel.tsx
var import_react2 = __toESM(require("react"));
var import_axios2 = __toESM(require("axios"));
var import_lodash = __toESM(require("lodash.debounce"));
var import_react_toastify2 = require("react-toastify");

// src/component/button.tsx
var React2 = __toESM(require("react"));
var import_react_slot = require("@radix-ui/react-slot");
var import_class_variance_authority = require("class-variance-authority");

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/component/button.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React2.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? import_react_slot.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/component/input.tsx
var React3 = __toESM(require("react"));
var import_jsx_runtime3 = require("react/jsx-runtime");
var Input = React3.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/stamps/setLocationPanel.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var LocationSearchPanel = ({
  open,
  onClose,
  apikey,
  page_id,
  uuid,
  fetchStamps
}) => {
  const [locationInput, setLocationInput] = import_react2.default.useState("");
  const [allLocations, setAllLocations] = import_react2.default.useState([]);
  const [selectedLocation, setSelectedLocation] = import_react2.default.useState(null);
  const handleLocationSearch = (0, import_lodash.default)(async (input) => {
    setSelectedLocation(null);
    if (input.length >= 2) {
      try {
        const response = await import_axios2.default.post(`https://passport.cubid.me/api/v2/search-location`, { location_input: input, apikey });
        setAllLocations(response.data);
      } catch (error) {
        import_react_toastify2.toast.error("Error fetching locations.");
      }
    }
  }, 500);
  const handleLocationChange = (e) => {
    setLocationInput(e.target.value);
    handleLocationSearch(e.target.value);
  };
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { backgroundColor: "#000000AB", zIndex: 1e3 }, className: "fixed inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-xl shadow-lg overflow-hidden max-w-sm w-full p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-2xl font-bold text-gray-800 mb-4", children: "Location Search" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "mt-2 text-gray-600", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      Input,
      {
        placeholder: "Search and select home or work address",
        value: locationInput,
        style: { backgroundColor: "white", color: "black" },
        onChange: handleLocationChange,
        className: "mt-4 w-full border border-gray-300 rounded-lg p-2 shadow focus:outline-none focus:shadow-outline"
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs font-bold text-gray-800 mb-4", children: "We use www.cubid.me to verify residency anonymously. This app will only have access to your approximate location, not your address details. You are allowed max one adress update per year" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "h-[200px] overflow-y-auto mt-3", children: allLocations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        onClick: () => {
          setLocationInput(item.formatted_address);
          setSelectedLocation(item);
        },
        style: { color: "black" },
        className: `cursor-pointer pb-2 ${selectedLocation?.formatted_address === item.formatted_address ? "font-bold" : ""}`,
        children: item.formatted_address
      },
      item.name
    )) }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex justify-between space-x-4 mt-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Button, { onClick: onClose, style: { borderRadius: 10 }, className: "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md", children: "Cancel" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        Button,
        {
          onClick: async () => {
            await import_axios2.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
              page_id,
              stamp_type: "address",
              stampData: { uniquevalue: `${uuid}-${selectedLocation?.formatted_address}`, identity: selectedLocation?.formatted_address, ...selectedLocation },
              user_data: { uuid }
            });
            await fetchStamps();
            onClose();
          },
          style: { borderRadius: 10 },
          disabled: !Boolean(selectedLocation),
          className: "bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md",
          children: "Save Location"
        }
      )
    ] })
  ] }) });
};

// src/stamps/addStampVerify.tsx
var import_react3 = require("react");
var import_axios3 = __toESM(require("axios"));
var import_jsx_runtime5 = require("react/jsx-runtime");
function AdvancedCredentialCollection({ email, apikey, refresh, uuid, allStampIds, onClose }) {
  const [isOpen, setIsOpen] = (0, import_react3.useState)(true);
  const [currentStep, setCurrentStep] = (0, import_react3.useState)("confirmation");
  const [passcode, setPasscode] = (0, import_react3.useState)("");
  const [resendCountdown, setResendCountdown] = (0, import_react3.useState)(60);
  const [isLoading, setIsLoading] = (0, import_react3.useState)(false);
  const [error, setError] = (0, import_react3.useState)("");
  (0, import_react3.useEffect)(() => {
    let timer;
    if (currentStep === "passcode" && resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1e3);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown, currentStep]);
  (0, import_react3.useEffect)(() => {
    if (localStorage.getItem("logged_in") === uuid) {
      setCurrentStep("authorized");
    }
  }, [uuid]);
  const handlePasscodeRequest = async () => {
    try {
      setIsLoading(true);
      setError("");
      await import_axios3.default.post("https://passport.cubid.me/api/verify/send-dapp-email", {
        email,
        apikey
      });
      setCurrentStep("passcode");
      setResendCountdown(60);
    } catch (err) {
      setError("Failed to send passcode. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handlePasscodeVerify = async () => {
    try {
      setIsLoading(true);
      setError("");
      const { data } = await import_axios3.default.post("https://passport.cubid.me/api/verify/verify-email", {
        email,
        apikey,
        otp: passcode,
        dappuser_id: uuid
      });
      if (data.success) {
        await import_axios3.default.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
          apikey,
          user_id: uuid,
          stamp_id_array: allStampIds
        });
        await refresh();
        localStorage.setItem("logged_in", uuid);
        setCurrentStep("authorized");
      } else {
        setError("Invalid passcode. Please try again.");
      }
    } catch (err) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleAuthorize = async () => {
    try {
      setIsLoading(true);
      setError("");
      await import_axios3.default.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
        apikey,
        user_id: uuid,
        stamp_id_array: allStampIds
      });
      await refresh();
      setIsOpen(false);
      onClose?.();
    } catch (err) {
      setError("Authorization failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e3
    },
    modalContent: {
      backgroundColor: "#ffffff",
      borderRadius: "8px",
      padding: "24px",
      width: "90%",
      maxWidth: "440px",
      position: "relative",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    header: {
      marginBottom: "20px"
    },
    title: {
      fontSize: "20px",
      fontWeight: "600",
      color: "#1a1a1a",
      marginBottom: "8px"
    },
    description: {
      fontSize: "16px",
      color: "#4a5568",
      lineHeight: "1.5"
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #e2e8f0",
      borderRadius: "6px",
      fontSize: "16px",
      marginBottom: "16px"
    },
    error: {
      backgroundColor: "#FEE2E2",
      color: "#DC2626",
      padding: "12px",
      borderRadius: "6px",
      marginBottom: "16px"
    },
    buttonContainer: {
      display: "flex",
      gap: "12px",
      justifyContent: "flex-end",
      marginTop: "24px"
    },
    button: {
      padding: "10px 16px",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      border: "none",
      transition: "background-color 0.2s"
    },
    primaryButton: {
      backgroundColor: "#2563EB",
      color: "#ffffff"
    },
    secondaryButton: {
      backgroundColor: "#E5E7EB",
      color: "#374151"
    },
    disabledButton: {
      opacity: 0.5,
      cursor: "not-allowed"
    }
  };
  const renderContent = () => {
    switch (currentStep) {
      case "confirmation":
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: styles.header, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { style: styles.title, children: "Credential Authorization Required" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { style: styles.description, children: "It looks like this credential has already been registered for a different app in the Cubid ecosystem. Get a passcode to approve using it in this app too." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: styles.buttonContainer, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                style: { ...styles.button, ...styles.secondaryButton },
                onClick: () => setIsOpen(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                style: {
                  ...styles.button,
                  ...styles.primaryButton,
                  ...isLoading ? styles.disabledButton : {}
                },
                onClick: handlePasscodeRequest,
                disabled: isLoading,
                children: isLoading ? "Sending..." : "Send Passcode"
              }
            )
          ] })
        ] });
      case "passcode":
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: styles.header, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { style: styles.title, children: "Enter Verification Code" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { style: styles.description, children: [
              "Please check your email (",
              email,
              ") for the verification code we just sent."
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "input",
            {
              type: "text",
              placeholder: "Enter passcode",
              value: passcode,
              onChange: (e) => setPasscode(e.target.value),
              style: styles.input,
              maxLength: 6
            }
          ),
          error && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: styles.error, children: error }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "button",
            {
              style: {
                ...styles.button,
                ...styles.secondaryButton,
                width: "100%",
                marginBottom: "16px",
                ...resendCountdown > 0 || isLoading ? styles.disabledButton : {}
              },
              disabled: resendCountdown > 0 || isLoading,
              onClick: handlePasscodeRequest,
              children: [
                "Resend Code ",
                resendCountdown > 0 ? `(${resendCountdown}s)` : ""
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: styles.buttonContainer, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                style: { ...styles.button, ...styles.secondaryButton },
                onClick: () => setIsOpen(false),
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                style: {
                  ...styles.button,
                  ...styles.primaryButton,
                  ...isLoading || !passcode ? styles.disabledButton : {}
                },
                onClick: handlePasscodeVerify,
                disabled: isLoading || !passcode,
                children: isLoading ? "Verifying..." : "Verify"
              }
            )
          ] })
        ] });
      case "authorized":
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: styles.header, children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h2", { style: styles.title, children: "Authorization Successful" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { style: styles.description, children: "You've successfully authenticated with Cubid. Click below to complete the authorization process." })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: styles.buttonContainer, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              style: {
                ...styles.button,
                ...styles.primaryButton,
                ...isLoading ? styles.disabledButton : {}
              },
              onClick: handleAuthorize,
              disabled: isLoading,
              children: isLoading ? "Processing..." : "Complete Authorization"
            }
          ) })
        ] });
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: styles.modalOverlay, onClick: () => setIsOpen(false), children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "div",
    {
      style: styles.modalContent,
      onClick: (e) => e.stopPropagation(),
      children: renderContent()
    }
  ) });
}

// src/component/infoTooltip.tsx
var import_react4 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var InfoTooltip = ({ content }) => {
  const [visible, setVisible] = (0, import_react4.useState)(false);
  const styles = {
    container: {
      position: "relative",
      display: "inline-block",
      cursor: "pointer"
    },
    icon: {
      fontSize: "20px",
      color: "red",
      border: "1px solid red",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none"
    },
    tooltip: {
      position: "absolute",
      top: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "10px",
      whiteSpace: "nowrap",
      zIndex: 10,
      display: visible ? "block" : "none"
    },
    tooltipArrow: {
      position: "absolute",
      top: "-6px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "10px",
      height: "10px",
      backgroundColor: "#fff",
      borderLeft: "1px solid #ddd",
      borderTop: "1px solid #ddd",
      transformOrigin: "center",
      transform: "translateX(-50%) rotate(45deg)"
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      style: styles.container,
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
      onClick: () => setVisible(!visible),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: styles.icon, children: "i" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: styles.tooltip, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: styles.tooltipArrow }),
          content
        ] })
      ]
    }
  );
};

// src/component/loginOptions.tsx
var import_react5 = require("react");
var import_react_web = require("@lens-protocol/react-web");
var import_react_web2 = require("@lens-protocol/react-web");
var import_react_toastify3 = require("react-toastify");
var import_jsx_runtime7 = require("react/jsx-runtime");
function LoginAs({ profile, wallet: wallet2, onSuccess }) {
  const { execute, loading } = (0, import_react_web.useLogin)();
  const login = async () => {
    const result = await execute({
      address: wallet2,
      profileId: profile.id
    });
    if (result.isSuccess()) {
      return onSuccess(profile);
    }
    localStorage.removeItem("lens-loggin");
    window.alert(result.error.message);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { disabled: loading, onClick: login, children: profile.handle?.fullHandle ?? profile.id });
}
function LoginOptions({ wallet: wallet2, onSuccess }) {
  const { data: profiles, error, loading } = (0, import_react_web2.useProfilesManaged)({
    for: wallet2,
    includeOwned: true
  });
  const [disconnect, setDisconnect] = (0, import_react5.useState)(() => () => {
  });
  (0, import_react5.useEffect)(() => {
    if (typeof window !== "undefined") {
      import("wagmi").then((module2) => {
        const { useDisconnect: useDisconnect3 } = module2;
        const { disconnect: disconnectFn } = useDisconnect3();
        setDisconnect(() => disconnectFn);
      });
    }
  }, []);
  (0, import_react5.useEffect)(() => {
    if (!loading && profiles.length === 0) {
      localStorage.removeItem("lens-loggin");
      disconnect();
      import_react_toastify3.toast.error("No profiles managed by this wallet.");
    }
    if (profiles?.length) {
      onSuccess(profiles[0]);
    }
  }, [loading, profiles, onSuccess, disconnect]);
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: "Loading..." });
  }
  if (error) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: error });
  }
  if (profiles.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: "No profiles managed by this wallet." });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { children: profiles.map((profile) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    LoginAs,
    {
      wallet: wallet2,
      profile,
      onSuccess
    },
    profile.id
  )) });
}

// src/stamps/index.tsx
var import_wagmi3 = require("wagmi");

// src/component/providers.tsx
var import_react7 = require("react");
var import_wagmi = require("wagmi");
var import_rainbowkit = require("@rainbow-me/rainbowkit");
var import_chains = require("wagmi/chains");
var import_react8 = require("@web3modal/wagmi/react");
var import_config = require("@web3modal/wagmi/react/config");
var import_react_query = require("@tanstack/react-query");

// src/component/providerNear.tsx
var import_near_api_js = require("near-api-js");
var import_modal_ui = require("@near-wallet-selector/modal-ui");
var import_core = require("@near-wallet-selector/core");
var import_ledger = require("@near-wallet-selector/ledger");
var import_my_near_wallet = require("@near-wallet-selector/my-near-wallet");
var import_near_wallet = require("@near-wallet-selector/near-wallet");
var import_sender = require("@near-wallet-selector/sender");
var import_here_wallet = require("@near-wallet-selector/here-wallet");
var sender = (0, import_sender.setupSender)();
var hereWallet = (0, import_here_wallet.setupHereWallet)();
var nearWallet = (0, import_near_wallet.setupNearWallet)();
var THIRTY_TGAS = "30000000000000";
var NO_DEPOSIT = "0";
var Wallet = class {
  constructor({ createAccessKeyFor = void 0, network = "testnet" }) {
    this.walletSelector = null;
    this.wallet = null;
    this.network = null;
    this.createAccessKeyFor = null;
    this.createAccessKeyFor = createAccessKeyFor;
    this.network = "mainnet";
  }
  // To be called when the website loads
  async startUp() {
    this.walletSelector = await (0, import_core.setupWalletSelector)({
      network: this.network,
      modules: [
        nearWallet,
        // meteorWallet,
        (0, import_my_near_wallet.setupMyNearWallet)(),
        (0, import_ledger.setupLedger)(),
        sender,
        hereWallet
      ]
    });
    const isSignedIn = this.walletSelector.isSignedIn();
    if (isSignedIn) {
      this.wallet = await this.walletSelector.wallet();
      this.accountId = this.walletSelector.store.getState().accounts[0].accountId;
    }
    return isSignedIn;
  }
  async account() {
    const [acc] = await this.wallet.getAccounts();
    return acc;
  }
  // Sign-in method
  signIn() {
    const description = "Please select a wallet to sign in.";
    const modal = (0, import_modal_ui.setupModal)(this.walletSelector, {
      contractId: this.createAccessKeyFor,
      description
    });
    modal.show();
  }
  // Sign-out method
  signOut() {
    this.wallet.signOut();
    this.wallet = this.accountId = this.createAccessKeyFor = null;
    window.location.replace(window.location.origin + window.location.pathname);
  }
  // Make a read-only call to retrieve information from the network
  async viewMethod({ contractId, method, args = {} }) {
    const { network } = this.walletSelector.options;
    const provider = new import_near_api_js.providers.JsonRpcProvider({ url: network.nodeUrl });
    let res = await provider.query({
      request_type: "call_function",
      account_id: contractId,
      method_name: method,
      args_base64: import_buffer.Buffer.from(JSON.stringify(args)).toString("base64"),
      finality: "optimistic"
    });
    return JSON.parse(import_buffer.Buffer.from(res.result).toString());
  }
  // Call a method that changes the contract's state
  async callMethod({
    contractId,
    method,
    args = {},
    gas = THIRTY_TGAS,
    deposit = NO_DEPOSIT
  }) {
    return await this.wallet.signAndSendTransaction({
      signerId: this.accountId,
      receiverId: contractId,
      actions: [
        {
          type: "FunctionCall",
          params: {
            methodName: method,
            args,
            gas,
            deposit
          }
        }
      ]
    });
  }
  // Get transaction result from the network
  async getTransactionResult(txhash) {
    const { network } = this.walletSelector.options;
    const provider = new import_near_api_js.providers.JsonRpcProvider({ url: network.nodeUrl });
    const transaction = await provider.txStatus(txhash, "unnused");
    return import_near_api_js.providers.getTransactionLastResult(transaction);
  }
};

// src/component/providerSolana.tsx
var import_react6 = require("react");
var import_wallet_adapter_react = require("@solana/wallet-adapter-react");
var import_wallet_adapter_base = require("@solana/wallet-adapter-base");
var import_wallet_adapter_react_ui = require("@solana/wallet-adapter-react-ui");
var import_web3 = require("@solana/web3.js");
var import_jsx_runtime8 = require("react/jsx-runtime");
function SolanaAppWalletProvider({
  children
}) {
  const network = import_wallet_adapter_base.WalletAdapterNetwork.Devnet;
  const endpoint = (0, import_react6.useMemo)(() => (0, import_web3.clusterApiUrl)(network), [network]);
  const wallets = (0, import_react6.useMemo)(
    () => [
      // manually add any legacy wallet adapters here
      // new UnsafeBurnerWalletAdapter(),
    ],
    [network]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_wallet_adapter_react.ConnectionProvider, { endpoint, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_wallet_adapter_react.WalletProvider, { wallets, autoConnect: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_wallet_adapter_react_ui.WalletModalProvider, { children }) }) });
}

// src/component/providers.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var AuthKitProvider = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, { children });
var config = {
  rpcUrl: "https://mainnet.optimism.io",
  domain: "example.com",
  siweUri: "https://example.com/login"
};
var wallet = new Wallet({
  createAccessKeyFor: "registry.i-am-human.near"
});
wallet.startUp();
var queryClient = new import_react_query.QueryClient();
var configForRainbow = (0, import_rainbowkit.getDefaultConfig)({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [import_chains.mainnet, import_chains.polygon, import_chains.optimism, import_chains.arbitrum, import_chains.base],
  ssr: true
  // If your dApp uses server side rendering (SSR)
});
var Provider = (props) => {
  const [wagmiConfig, setWagmiConfig] = (0, import_react7.useState)(
    configForRainbow
  );
  const [configSet, setConfigSet] = (0, import_react7.useState)(false);
  (0, import_react7.useEffect)(() => {
    const projectId = "6833ed2c1539b9d27e8840c51f53bd0c";
    const metadata = {
      name: "Web3Modal",
      description: "Web3Modal Example",
      url: "https://web3modal.com",
      icons: ["https://avatars.githubusercontent.com/u/37784886"]
    };
    const chains = [import_chains.mainnet];
    const wagmiConfig2 = (0, import_config.defaultWagmiConfig)({ chains, projectId, metadata });
    (0, import_react8.createWeb3Modal)({ wagmiConfig: wagmiConfig2, projectId, chains });
    setConfigSet(true);
  }, []);
  if (!wagmiConfig) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, {});
  }
  if (!configSet) {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_jsx_runtime9.Fragment, {});
  }
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(AuthKitProvider, { config, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SolanaAppWalletProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_wagmi.WagmiProvider, { config: wagmiConfig, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react_query.QueryClientProvider, { client: queryClient, children: props?.children }) }) }) });
};

// src/stamps/index.tsx
var import_wallet_adapter_react_ui2 = require("@solana/wallet-adapter-react-ui");
var import_wallet_adapter_react2 = require("@solana/wallet-adapter-react");

// src/component/blackListing/index.tsx
var import_react12 = require("react");

// src/component/blackListing/email.tsx
var import_axios4 = __toESM(require("axios"));
var import_react9 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var EmailVerificationModal = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
  email: passedEmail,
  apikey
}) => {
  const [otp, setOtp] = (0, import_react9.useState)(["", "", "", "", "", ""]);
  const [error, setError] = (0, import_react9.useState)("");
  const [success, setSuccess] = (0, import_react9.useState)(false);
  const [countdown, setCountdown] = (0, import_react9.useState)(0);
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    resetForm();
  };
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e3
    },
    modalContent: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      width: "90%",
      maxWidth: "400px",
      position: "relative",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    button: {
      backgroundColor: "black",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "background-color 0.3s"
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem"
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "0 0 8px 0"
    },
    subtitle: {
      fontSize: "18px",
      fontWeight: "500",
      margin: "0",
      color: "#333"
    },
    otpContainer: {
      display: "flex",
      gap: "8px",
      justifyContent: "center",
      margin: "1rem 0"
    },
    otpInput: {
      width: "40px",
      height: "48px",
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "bold",
      border: "2px solid #e2e2e2",
      borderRadius: "6px",
      outline: "none",
      transition: "border-color 0.3s"
    },
    actionButtons: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "1rem"
    },
    textButton: {
      background: "none",
      border: "none",
      color: "#666",
      fontSize: "14px",
      cursor: "pointer",
      padding: "4px 8px"
    },
    error: {
      color: "#e11d48",
      backgroundColor: "#fee2e2",
      padding: "12px",
      borderRadius: "6px",
      marginTop: "1rem",
      fontSize: "14px"
    },
    successContainer: {
      textAlign: "center",
      padding: "2rem 0"
    },
    successIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "#f8f8f8",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      margin: "0 auto 1rem"
    }
  };
  (0, import_react9.useEffect)(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  (0, import_react9.useEffect)(() => {
    if (isOpen && passedEmail) {
      sendOTP();
    }
  }, [isOpen, passedEmail]);
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="email-otp-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="email-otp-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };
  const sendOTP = async () => {
    if (!passedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passedEmail)) {
      setError("Invalid email address provided");
      return;
    }
    await import_axios4.default.post("https://passport.cubid.me/api/v2/email/send_otp", {
      email: passedEmail,
      apikey
    });
    setError("");
    setCountdown(30);
    console.log("Sending OTP to:", passedEmail);
  };
  const verifyOTP = async () => {
    const { data } = await import_axios4.default.post("https://passport.cubid.me/api/v2/email/verify_otp", {
      email: passedEmail,
      apikey,
      otp: otp.join("").length
    });
    if (otp.join("").length === 6 && data?.is_verified) {
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      }, 2e3);
    } else {
      setError("Invalid verification code");
      if (onError) {
        onError("Invalid verification code");
      }
    }
  };
  const resetForm = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess(false);
    setCountdown(0);
  };
  if (!isOpen || !passedEmail) {
    return null;
  }
  function obscureString(input) {
    if (input.length <= 5) {
      return input;
    }
    const firstTwo = input.slice(0, 2);
    const lastThree = input.slice(-3);
    return firstTwo + "****" + lastThree;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: styles.modalOverlay, onClick: handleClose, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: styles.modalContent, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: styles.header, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h2", { style: styles.title, children: "CUBID" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h3", { style: styles.subtitle, children: "Enter Security Code" })
    ] }),
    !success ? /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: { textAlign: "center", marginBottom: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { color: "#666", margin: "0" }, children: "We've sent a 6-digit code to" }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { fontWeight: "500", margin: "4px 0" }, children: obscureString(passedEmail) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: styles.otpContainer, children: otp.map((digit, index) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "input",
        {
          type: "text",
          name: `email-otp-${index}`,
          value: digit,
          onChange: (e) => handleOtpChange(index, e.target.value),
          onKeyDown: (e) => handleKeyDown(index, e),
          style: {
            ...styles.otpInput,
            borderColor: error ? "#e11d48" : "#e2e2e2"
          },
          maxLength: 1
        },
        index
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "button",
        {
          style: {
            ...styles.button,
            opacity: otp.some((digit) => !digit) ? 0.5 : 1,
            cursor: otp.some((digit) => !digit) ? "not-allowed" : "pointer"
          },
          onClick: verifyOTP,
          disabled: otp.some((digit) => !digit),
          onMouseOver: (e) => !otp.some((digit) => !digit) && (e.currentTarget.style.backgroundColor = "#333"),
          onMouseOut: (e) => !otp.some((digit) => !digit) && (e.currentTarget.style.backgroundColor = "black"),
          children: "Verify Code"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: styles.actionButtons, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "button",
        {
          style: {
            ...styles.textButton,
            opacity: countdown > 0 ? 0.5 : 1,
            cursor: countdown > 0 ? "not-allowed" : "pointer"
          },
          onClick: () => !countdown && sendOTP(),
          disabled: countdown > 0,
          children: countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"
        }
      ) }),
      error && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: styles.error, children: error })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: { color: "black !important" }, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { style: styles.successContainer, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { style: styles.successIcon, children: "\u2713" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h3", { style: { fontSize: "20px", margin: "0 0 8px 0" }, children: "Email Verified!" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { style: { color: "#666", margin: 0 }, children: "Your email has been verified with Cubid." })
    ] }) })
  ] }) });
};

// src/component/blackListing/phone.tsx
var import_axios5 = __toESM(require("axios"));
var import_react10 = require("react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var PhoneVerificationModal = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
  phone: passedPhone,
  apikey
}) => {
  const [otp, setOtp] = (0, import_react10.useState)(["", "", "", "", "", ""]);
  const [error, setError] = (0, import_react10.useState)("");
  const [success, setSuccess] = (0, import_react10.useState)(false);
  const [countdown, setCountdown] = (0, import_react10.useState)(0);
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    resetForm();
  };
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e3
    },
    modalContent: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      width: "90%",
      maxWidth: "400px",
      position: "relative",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    button: {
      backgroundColor: "black",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "background-color 0.3s"
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem"
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "0 0 8px 0"
    },
    subtitle: {
      fontSize: "18px",
      fontWeight: "500",
      margin: "0",
      color: "#333"
    },
    otpContainer: {
      display: "flex",
      gap: "8px",
      justifyContent: "center",
      margin: "1rem 0"
    },
    otpInput: {
      width: "40px",
      height: "48px",
      textAlign: "center",
      fontSize: "20px",
      fontWeight: "bold",
      border: "2px solid #e2e2e2",
      borderRadius: "6px",
      outline: "none",
      transition: "border-color 0.3s"
    },
    actionButtons: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "1rem"
    },
    textButton: {
      background: "none",
      border: "none",
      color: "#666",
      fontSize: "14px",
      cursor: "pointer",
      padding: "4px 8px"
    },
    error: {
      color: "#e11d48",
      backgroundColor: "#fee2e2",
      padding: "12px",
      borderRadius: "6px",
      marginTop: "1rem",
      fontSize: "14px"
    },
    successContainer: {
      textAlign: "center",
      padding: "2rem 0"
    },
    successIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "#f8f8f8",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      margin: "0 auto 1rem"
    }
  };
  (0, import_react10.useEffect)(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1e3);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  (0, import_react10.useEffect)(() => {
    if (isOpen && passedPhone) {
      sendOTP();
    }
  }, [isOpen, passedPhone]);
  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name="phone-otp-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="phone-otp-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };
  const sendOTP = async () => {
    if (!passedPhone || !validatePhoneNumber(passedPhone)) {
      setError("Invalid phone number provided");
      if (onError) {
        onError("Invalid phone number provided");
      }
      return;
    }
    await import_axios5.default.post("https://passport.cubid.me/api/v2/twillio/send-otp", {
      apikey,
      phone: passedPhone
    });
    setError("");
    setCountdown(30);
    console.log("Sending OTP to:", passedPhone);
  };
  const verifyOTP = async () => {
    const { data } = await import_axios5.default.post("https://passport.cubid.me/api/v2/twillio/verify-otp", {
      apikey,
      phone: passedPhone,
      otpCode: otp.join("")
    });
    if (otp.join("").length === 6 && data.status === "approved") {
      setSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
      setTimeout(() => {
        handleClose();
      }, 2e3);
    } else {
      setError("Invalid verification code");
      if (onError) {
        onError("Invalid verification code");
      }
    }
  };
  const resetForm = () => {
    setOtp(["", "", "", "", "", ""]);
    setError("");
    setSuccess(false);
    setCountdown(0);
  };
  if (!isOpen || !passedPhone) {
    return null;
  }
  function obscureString(input) {
    if (input.length <= 5) {
      return input;
    }
    const firstTwo = input.slice(0, 2);
    const lastThree = input.slice(-3);
    return firstTwo + "****" + lastThree;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { style: styles.modalOverlay, onClick: handleClose, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { style: styles.modalContent, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { style: styles.header, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h2", { style: styles.title, children: "CUBID" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h3", { style: styles.subtitle, children: "Enter Security Code" })
    ] }),
    !success ? /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { style: { textAlign: "center", marginBottom: "1rem" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { style: { color: "#666", margin: "0" }, children: "We've sent a 6-digit code to" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { style: { fontWeight: "500", margin: "4px 0" }, children: obscureString(passedPhone) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { style: styles.otpContainer, children: otp.map((digit, index) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "input",
        {
          type: "text",
          name: `phone-otp-${index}`,
          value: digit,
          onChange: (e) => handleOtpChange(index, e.target.value),
          onKeyDown: (e) => handleKeyDown(index, e),
          style: {
            ...styles.otpInput,
            borderColor: error ? "#e11d48" : "#e2e2e2"
          },
          maxLength: 1
        },
        index
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "button",
        {
          style: {
            ...styles.button,
            opacity: otp.some((digit) => !digit) ? 0.5 : 1,
            cursor: otp.some((digit) => !digit) ? "not-allowed" : "pointer"
          },
          onClick: verifyOTP,
          disabled: otp.some((digit) => !digit),
          onMouseOver: (e) => !otp.some((digit) => !digit) && (e.currentTarget.style.backgroundColor = "#333"),
          onMouseOut: (e) => !otp.some((digit) => !digit) && (e.currentTarget.style.backgroundColor = "black"),
          children: "Verify Code"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { style: styles.actionButtons, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        "button",
        {
          style: {
            ...styles.textButton,
            opacity: countdown > 0 ? 0.5 : 1,
            cursor: countdown > 0 ? "not-allowed" : "pointer"
          },
          onClick: () => !countdown && sendOTP(),
          disabled: countdown > 0,
          children: countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"
        }
      ) })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { style: { color: "black !important" }, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { style: styles.successContainer, children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { style: styles.successIcon, children: "\u2713" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h3", { style: { fontSize: "20px", margin: "0 0 8px 0" }, children: "Phone Verified!" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { style: { color: "#666", margin: 0 }, children: "Your phone number has been verified with Cubid." })
    ] }) })
  ] }) });
};

// src/component/blackListing/wallet.tsx
var import_react11 = require("react");
var import_wagmi2 = require("wagmi");
var import_jsx_runtime12 = require("react/jsx-runtime");
var WalletVerificationModal = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
  address: passedAddress
}) => {
  const { connect: connect2, connectors, isPending: isLoading } = (0, import_wagmi2.useConnect)();
  const { address, isConnected } = (0, import_wagmi2.useAccount)();
  const { disconnect } = (0, import_wagmi2.useDisconnect)();
  const [verificationAmount, setVerificationAmount] = (0, import_react11.useState)("");
  const [step, setStep] = (0, import_react11.useState)("connect");
  const [error, setError] = (0, import_react11.useState)("");
  const [success, setSuccess] = (0, import_react11.useState)(false);
  const [copied, setCopied] = (0, import_react11.useState)({ amount: false, address: false });
  const VERIFICATION_AMOUNT = "0.001";
  const CUBID_WALLET = "0x1234...5678";
  (0, import_react11.useEffect)(() => {
    if (isConnected && address) {
      setStep("verify");
    }
  }, [isConnected, address]);
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e3
    },
    modalContent: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      width: "90%",
      maxWidth: "400px",
      position: "relative",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    modalCloseButton: {
      position: "absolute",
      top: "1rem",
      right: "1rem",
      background: "none",
      border: "none",
      fontSize: "20px",
      cursor: "pointer",
      color: "#666",
      padding: "4px"
    },
    button: {
      backgroundColor: "black",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "background-color 0.3s"
    },
    connectorButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      padding: "12px",
      marginBottom: "8px",
      border: "2px solid #e2e2e2",
      borderRadius: "6px",
      backgroundColor: "white",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "16px"
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem"
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      margin: "0 0 8px 0"
    },
    subtitle: {
      fontSize: "18px",
      fontWeight: "500",
      margin: "0",
      color: "#333"
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "2px solid #e2e2e2",
      borderRadius: "6px",
      fontSize: "16px",
      fontFamily: "monospace",
      outline: "none",
      transition: "border-color 0.3s",
      textAlign: "center"
    },
    verificationBox: {
      backgroundColor: "#f8f8f8",
      border: "2px solid #e2e2e2",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1rem"
    },
    label: {
      display: "block",
      fontSize: "14px",
      color: "#666",
      marginBottom: "4px"
    },
    valueContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      padding: "8px 12px",
      borderRadius: "4px",
      border: "1px solid #e2e2e2"
    },
    value: {
      fontFamily: "monospace",
      fontSize: "16px"
    },
    copyButton: {
      background: "none",
      border: "none",
      padding: "4px",
      cursor: "pointer",
      color: "#666",
      transition: "color 0.3s"
    },
    etherscanLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      color: "black",
      textDecoration: "none",
      fontSize: "14px",
      marginTop: "1rem"
    },
    error: {
      color: "#e11d48",
      backgroundColor: "#fee2e2",
      padding: "12px",
      borderRadius: "6px",
      marginTop: "1rem",
      fontSize: "14px"
    },
    successContainer: {
      textAlign: "center",
      padding: "2rem 0"
    },
    successIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "#f8f8f8",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      margin: "0 auto 1rem"
    }
  };
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [type]: false }));
    }, 2e3);
  };
  const verifyTransaction = () => {
    if (!verificationAmount || verificationAmount !== VERIFICATION_AMOUNT) {
      setError("Please enter the correct verification amount");
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      handleClose();
    }, 2e3);
  };
  const resetForm = () => {
    setVerificationAmount("");
    setStep("connect");
    setError("");
    setSuccess(false);
    setCopied({ amount: false, address: false });
    disconnect();
  };
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    resetForm();
  };
  const handleDisconnect = () => {
    disconnect();
    setStep("connect");
  };
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: styles.modalOverlay, onClick: handleClose, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: styles.modalContent, onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
      "button",
      {
        style: styles.modalCloseButton,
        onClick: handleClose,
        "aria-label": "Close Wallet Modal",
        children: "\xD7"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: styles.header, children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { style: styles.title, children: "CUBID" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { style: styles.subtitle, children: "Verify Delivery Wallet" })
    ] }),
    !success ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
      step === "connect" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { style: { textAlign: "center", color: "#666", margin: "0 0 1rem 0" }, children: "Connect your wallet to begin verification." }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: { marginBottom: "1rem" }, children: connectors.map((connector) => /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
          "button",
          {
            disabled: !connector.ready,
            onClick: () => connect2({ connector }),
            style: styles.connectorButton,
            onMouseOver: (e) => e.currentTarget.style.borderColor = "black",
            onMouseOut: (e) => e.currentTarget.style.borderColor = "#e2e2e2",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: connector.name }),
              !connector.ready && " (unsupported)",
              isLoading && " (connecting)"
            ]
          },
          connector.id
        )) })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: styles.verificationBox, children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("p", { style: { margin: "0 0 1rem 0", textAlign: "center" }, children: [
            "Connected: ",
            address?.slice(0, 6),
            "...",
            address?.slice(-4)
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { marginBottom: "1rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { style: styles.label, children: "Send Amount:" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: styles.valueContainer, children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { style: styles.value, children: [
                VERIFICATION_AMOUNT,
                " ETH"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "button",
                {
                  style: styles.copyButton,
                  onClick: () => copyToClipboard(VERIFICATION_AMOUNT, "amount"),
                  children: copied.amount ? "\u2713" : "\u{1F4CB}"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { style: styles.label, children: "To Address:" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: styles.valueContainer, children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { style: styles.value, children: CUBID_WALLET }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "button",
                {
                  style: styles.copyButton,
                  onClick: () => copyToClipboard(CUBID_WALLET, "address"),
                  children: copied.address ? "\u2713" : "\u{1F4CB}"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "a",
          {
            href: `https://etherscan.io/address/${CUBID_WALLET}`,
            target: "_blank",
            rel: "noopener noreferrer",
            style: styles.etherscanLink,
            children: "View on Etherscan \u2197"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: { marginTop: "1.5rem" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { style: { textAlign: "center", color: "#666", margin: "0 0 1rem 0" }, children: "After sending, enter the verification amount:" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "input",
            {
              type: "text",
              placeholder: "0.001",
              value: verificationAmount,
              onChange: (e) => setVerificationAmount(e.target.value),
              style: {
                ...styles.input,
                borderColor: error ? "#e11d48" : "#e2e2e2"
              }
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "button",
          {
            style: {
              ...styles.button,
              marginTop: "1rem"
            },
            onClick: verifyTransaction,
            onMouseOver: (e) => e.currentTarget.style.backgroundColor = "#333",
            onMouseOut: (e) => e.currentTarget.style.backgroundColor = "black",
            children: "Verify Transaction"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          "button",
          {
            style: {
              background: "none",
              border: "none",
              color: "#666",
              width: "100%",
              padding: "8px",
              marginTop: "8px",
              cursor: "pointer"
            },
            onClick: handleDisconnect,
            children: "Disconnect Wallet"
          }
        )
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: styles.error, children: error })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { style: styles.successContainer, children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { style: styles.successIcon, children: "\u2713" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { style: { fontSize: "20px", margin: "0 0 8px 0" }, children: "Wallet Verified!" }),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { style: { color: "#666", margin: 0 }, children: "Your delivery wallet has been verified with Cubid." })
    ] })
  ] }) });
};

// src/component/blackListing/index.tsx
var import_jsx_runtime13 = require("react/jsx-runtime");
var VerificationModal = ({
  type,
  isOpen,
  onClose,
  onSuccess,
  onError,
  duplicateInfo,
  realInfo,
  credType,
  apikey
}) => {
  const [verificationState, setVerificationState] = (0, import_react12.useState)(
    duplicateInfo ? "duplicate-alert" : "verification"
  );
  const styles = {
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1e3
    },
    modalContent: {
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      width: "90%",
      maxWidth: "400px",
      position: "relative",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    },
    title: {
      fontSize: "18px",
      fontWeight: "500",
      marginBottom: "1.5rem",
      textAlign: "center",
      color: "#333"
    },
    description: {
      fontSize: "15px",
      lineHeight: "1.5",
      color: "#4B5563",
      marginBottom: "2rem"
    },
    primaryButton: {
      width: "100%",
      padding: "12px",
      backgroundColor: "black",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      marginBottom: "12px",
      transition: "background-color 0.3s"
    },
    secondaryButton: {
      width: "100%",
      padding: "12px",
      backgroundColor: "white",
      color: "black",
      border: "2px solid black",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "all 0.3s"
    },
    highlight: {
      fontWeight: "500",
      color: "#2563EB"
    }
  };
  const handleSendPasscode = () => {
    setVerificationState("verification");
  };
  const handleContactSupport = () => {
    setVerificationState("support");
    window.location.href = "/support";
  };
  function obscureString(input) {
    if (input.length <= 5) {
      return input;
    }
    const firstTwo = input.slice(0, 2);
    const lastThree = input.slice(-3);
    return firstTwo + "****" + lastThree;
  }
  const getDuplicateContent = () => {
    const duplicateValue = credType === "email" ? duplicateInfo?.maskedEmail : type === "phone" ? duplicateInfo?.maskedPhone : duplicateInfo?.maskedAddress;
    const credentialType = type === "email" ? "email address" : type === "phone" ? "phone number" : "wallet address";
    return {
      title: `Duplicate ${credentialType.charAt(0).toUpperCase() + credentialType.slice(1)} Detected`,
      description: type === "wallet" ? `Oops! It seems like this wallet address was already registered to account ${obscureString(duplicateInfo?.maskedAddress)}. Was that you? We don't allow account duplication, so to prevent blacklisting, we would strongly encourage you to rectify immediately` : `Oops! It seems like this ${credentialType} was already registered to account ${obscureString(duplicateInfo?.maskedEmail)}. Was that you? We don't allow account duplication, so to prevent blacklisting, we would strongly encourage you to rectify immediately`,
      primaryButton: `That's my ${credentialType} too. Send me a passcode`,
      secondaryButton: "I may have been hacked. Contact support"
    };
  };
  const renderContent = () => {
    switch (verificationState) {
      case "duplicate-alert": {
        const content = getDuplicateContent();
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { style: styles.modalContent, onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { style: styles.title, children: content.title }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { style: { ...styles.description, whiteSpace: "pre-line", wordBreak: type === "wallet" ? "break-all" : "normal" }, children: content.description }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "button",
            {
              style: styles.primaryButton,
              onClick: handleSendPasscode,
              onMouseOver: (e) => e.currentTarget.style.backgroundColor = "#333",
              onMouseOut: (e) => e.currentTarget.style.backgroundColor = "black",
              children: content.primaryButton
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "button",
            {
              style: styles.secondaryButton,
              onClick: handleContactSupport,
              onMouseOver: (e) => {
                e.currentTarget.style.backgroundColor = "black";
                e.currentTarget.style.color = "white";
              },
              onMouseOut: (e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "black";
              },
              children: content.secondaryButton
            }
          )
        ] });
      }
      case "verification":
        switch (credType) {
          case "email":
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              EmailVerificationModal,
              {
                isOpen: true,
                onClose,
                apikey,
                onSuccess,
                onError,
                email: realInfo?.email
              }
            );
          case "phone":
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              PhoneVerificationModal,
              {
                isOpen: true,
                onClose,
                onSuccess,
                apikey,
                onError,
                phone: realInfo?.phone
              }
            );
          case "wallet":
            return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              WalletVerificationModal,
              {
                isOpen: true,
                onClose,
                onSuccess,
                onError,
                address: realInfo?.address
              }
            );
          default:
            return null;
        }
      default:
        return null;
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { style: styles.modalOverlay, onClick: onClose, children: renderContent() });
};

// src/stamps/index.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
var useFarcasterProfile;
var SignInButton;
(async () => {
  const authKit = await import("@farcaster/auth-kit");
  useFarcasterProfile = authKit.useProfile;
  SignInButton = authKit.SignInButton;
})();
var stampsWithId = {
  facebook: 1,
  github: 2,
  google: 3,
  twitter: 4,
  discord: 5,
  poh: 6,
  iah: 7,
  brightid: 8,
  gitcoin: 9,
  instagram: 10,
  phone: 11,
  gooddollar: 12,
  "near-wallet": 15,
  fractal: 17,
  evm: 14,
  email: 13,
  solana: 53,
  telegram: 27,
  worldcoin: 26,
  near: 15,
  "lens-protocol": 66,
  farcaster: 68,
  address: 70
};
var socialDataToMap = [
  {
    local_key: "facebook_data",
    supabase_key: "facebook",
    stampTypeId: 1,
    title: "Facebook",
    image: "https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg",
    color: "info"
  },
  {
    local_key: "github_data",
    supabase_key: "github",
    stampTypeId: 2,
    title: "Github",
    image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhITERIWFRAVFRUWFxYRFhUYFRAYFREaFxcSFhMYHCghGR4lGxYVITEiJSkrLi4uFx8zODMtNygtLi0BCgoKDQ0ODw8PDysZFRkrKysrKy0rKys3KystKy0tLSsrKystKys3KystKysrKystKysrKysrKysrKy0rKystK//AABEIAOAA4AMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABwgBBQYEAgP/xABJEAABAwICBwQECQkGBwAAAAABAAIDBBEFIQYHEjFBUXETImGBQnKRoQgUIzJic4KisSQzNVJTsrPBwkOSk6PD4RUlVGN0g4T/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAAREx/9oADAMBAAIRAxEAPwCcUREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBF8yPABJIAGZJyA81yuK6yMLp7h9ZG5w3thvK4HlaMHNB1iKLKzXnQN/NwVEnjsxsHvdf3LUS6/Bfu4cSObqkA+wRH8VcE1IoVj1+Z97DiBzbUgn2GIfittR686B352Coj8bMePc6/uTBKiLk8J1j4XUWDKyNrjkGzXiJO61pAM7rqo3ggEEEHcRmD0Kg+kREBERAREQEREBERAREQEREBERARYJUfaw9Z8FBtQw2mrbfNv3IMsjKRx47Az6b0HaYvjEFLGZamVsUY9J5tc8gN5PgFEGlOu83LMOhFv21QDn4thH4uPkopx7HKisl7WqldJJwvk2MfqsaMmjotctSJraY5pDV1jtqqqJJc7hrz3G+rGLNHsWrCIqgiIgIiIoVs8D0hq6M3paiSLO5aw9x3rRm7T7FrEREz6La8DcMxGEW/bU43eLoT+LT5KX8IxiCqjEtNK2WM+kw3seRHA+BzVOVssBx2oo5RLSyujfle2bZAPRew5OHVTF1cJFHurvWhBX7MM9oa3g2/cn8YieP0Tn1Ug3WVZREQEREBERAREQEREBYKyo01w6fGij+K0zvyyVty4HOmjOW165ztysTyuGs1r6zzAX0dC75cZSzg/mOcbPp8z6Pid0FON7km5OZJzJJNySeJWEW8QReqmw6eQF0UMsjRkXRxveAeRLR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",
    color: "secondary"
  },
  {
    local_key: "google_data",
    supabase_key: "google",
    stampTypeId: 3,
    title: "Google",
    image: "https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw",
    color: "primary"
  },
  {
    local_key: "twitter_data",
    supabase_key: "twitter",
    stampTypeId: 4,
    title: "Twitter",
    image: "data:image/png;base64,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",
    color: "error"
  },
  {
    local_key: "discord_data",
    supabase_key: "discord",
    stampTypeId: 5,
    title: "Discord",
    image: "data:image/png;base64,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",
    color: "error"
  }
];
var Stamps = ({
  stampToRender,
  uuid,
  page_id,
  api_key,
  isGrid,
  onStampChange,
  showAllowCreds,
  email,
  allStampIds,
  refresh,
  onBlacklistVerify
}) => {
  const [allStamps, setAllStamps] = (0, import_react13.useState)([]);
  const [stampLoading, setStampLoading] = (0, import_react13.useState)(true);
  const [phoneOpen, setPhoneOpen] = (0, import_react13.useState)(false);
  const [addressOpen, setAddressOpen] = (0, import_react13.useState)(false);
  const [verifyStampFlow, setVerifyStampFlow] = (0, import_react13.useState)(false);
  const { address } = (0, import_wagmi3.useAccount)();
  const { connectors, connect: connect2 } = (0, import_wagmi3.useConnect)({});
  const { disconnect } = (0, import_wagmi3.useDisconnect)();
  const [lensModalOpen, setLensModalOpen] = (0, import_react13.useState)(false);
  const [blacklist, setBlacklist] = (0, import_react13.useState)(false);
  const [blacklistCred, setBlacklistCred] = (0, import_react13.useState)({
    "type": "",
    "value": "",
    "actual": ""
  });
  const fetchStampData = (0, import_react13.useCallback)(async () => {
    setStampLoading(true);
    try {
      onStampChange?.();
      const response = await import_axios6.default.post("https://passport.cubid.me/api/v2/identity/fetch_stamps", {
        user_id: uuid,
        apikey: api_key,
        page_id
      });
      setAllStamps(response.data.all_stamps);
    } catch (error) {
      console.error("Error fetching stamps:", error);
    } finally {
      setStampLoading(false);
    }
  }, [uuid, api_key, page_id, onStampChange]);
  const connectToWeb3Node = async () => {
    if (address) {
      const {
        data: { stamps, scores }
      } = await import_axios6.default.post("https://passport.cubid.me/api/gitcoin-passport-data", { address });
      const stampId = stampsWithId.gitcoin;
      if (scores.score !== "0E-9") {
        await import_axios6.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
          stamp_type: "gitcoin",
          user_data: { user_id: uuid, uuid: "" },
          stampData: {
            identity: address,
            uniquevalue: address,
            stamps,
            scores
          },
          page_id
        });
      }
      await import_axios6.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
        stamp_type: "evm",
        user_data: { user_id: uuid, uuid: "" },
        stampData: {
          identity: address,
          uniquevalue: address
        },
        page_id
      });
      fetchStampData();
      disconnect();
    }
  };
  (0, import_react13.useEffect)(() => {
    if (address && !localStorage.getItem("lens-loggin")) {
      connectToWeb3Node(address);
    }
  }, [connectToWeb3Node, address]);
  const { isAuthenticated: isFarcasterAuthenticated, profile } = useFarcasterProfile?.() ?? {};
  (0, import_react13.useEffect)(() => {
    fetchStampData();
  }, [fetchStampData]);
  (0, import_react13.useEffect)(() => {
    const intervalId = setInterval(fetchStampData, 2e3);
    return () => clearInterval(intervalId);
  }, [fetchStampData]);
  (0, import_react13.useEffect)(() => {
    if (isFarcasterAuthenticated && profile?.fid && profile?.username) {
      (async () => {
        await import_axios6.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
          page_id,
          stamp_type: "farcaster",
          stampData: { uniquevalue: profile.fid, identity: profile.username },
          user_data: { uuid }
        });
        fetchStampData();
      })();
    }
  }, [isFarcasterAuthenticated, profile, uuid, fetchStampData, page_id]);
  const doesStampExist = (stamp_id) => {
    return allStamps.some(({ stamptype }) => stamptype === stamp_id);
  };
  const handleSocialConnect = (supabase_key) => {
    window.location.href = `https://allow.cubid.me/widget-allow?uid=${uuid}&social_provider=${supabase_key}&page_id=${page_id}`;
  };
  (0, import_react13.useEffect)(() => {
    const interval = setInterval(() => {
      if (localStorage.getItem("logged_in") == uuid && Boolean(showAllowCreds)) {
        setVerifyStampFlow(true);
      } else if (!Boolean(showAllowCreds)) {
        setVerifyStampFlow(false);
      }
    }, 1e3);
    return () => {
      clearInterval(interval);
    };
  }, [uuid, showAllowCreds, refresh]);
  const fetchNearWallet = (0, import_react13.useCallback)(async () => {
    if (wallet?.accountId) {
      const dataCategory = await wallet.viewMethod({
        contractId: "registry.i-am-human.near",
        method: "sbt_tokens_by_owner",
        args: {
          account: `${wallet.accountId}`,
          issuer: "fractal.i-am-human.near"
        }
      });
      if (uuid) {
        await import_axios6.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
          stamp_type: "iah",
          user_data: { uuid },
          stampData: {
            identity: wallet.accountId,
            uniquevalue: wallet.accountId
          },
          page_id
        });
        await import_axios6.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
          stamp_type: "near-wallet",
          user_data: { uuid },
          stampData: {
            identity: wallet.accountId,
            uniquevalue: wallet.accountId
          },
          page_id
        });
        wallet.signOut();
      }
    }
  }, []);
  const [gitcoinModalOpen, setGitcoinModalOpen] = (0, import_react13.useState)(false);
  const { publicKey, connected: solConnected } = (0, import_wallet_adapter_react2.useWallet)();
  (0, import_react13.useEffect)(() => {
    (async () => {
      if (!doesStampExist(stampsWithId["solana"]) && solConnected) {
        const string_publicKey = publicKey?.toString();
        await import_axios6.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
          stamp_type: "solana",
          user_data: { uuid },
          stampData: {
            identity: publicKey?.toString(),
            uniquevalue: publicKey?.toString()
          },
          app_id: await getIdForApp()
        });
        fetchStampData();
      }
    })();
  }, [publicKey, solConnected]);
  const [showTelegramScript, setShowTelegramScript] = (0, import_react13.useState)(false);
  function detectInputFormat(input) {
    if (typeof input !== "string") {
      return "invalid";
    }
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^(\+\d{1,3}[ -]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const walletPattern = /^0x[a-fA-F0-9]{40}$/;
    if (emailPattern.test(input)) {
      return "email";
    } else if (phonePattern.test(input)) {
      return "phone";
    } else if (walletPattern.test(input)) {
      return "wallet";
    }
    return "unknown";
  }
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      VerificationModal,
      {
        type: blacklistCred.type,
        credType: detectInputFormat(blacklistCred.value),
        isOpen: blacklist,
        onClose: () => {
          setBlacklist(false);
        },
        apikey: api_key,
        onSuccess: () => {
          setBlacklist(false);
          onBlacklistVerify({ secondaryAcc: blacklistCred.value });
        },
        onError: () => {
        },
        duplicateInfo: {
          maskedEmail: blacklistCred?.value
        },
        realInfo: {
          email: blacklistCred.value
        }
      }
    ),
    console.log({ blacklistCred }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr",
          pointerEvents: stampLoading ? "none" : "auto"
        },
        children: [
          socialDataToMap.filter((item) => item.supabase_key === stampToRender).map((item) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "div",
            {
              style: {
                border: "1px solid #ccc",
                width: isGrid ? "100%" : "300px",
                height: "190px",
                borderRadius: "12px",
                padding: "16px 24px",
                marginBottom: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "img",
                    {
                      src: item.image,
                      alt: `${item.title} logo`,
                      style: { marginBottom: "8px", width: "40px", height: "40px", borderRadius: "8px" }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { style: { fontSize: "20px", fontWeight: "bold" }, children: item.title }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { style: { fontSize: "14px", color: "#666", marginTop: "4px" }, children: showAllowCreds ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "font-bold", children: "You need to verify your stamp" }) : doesStampExist(item.stampTypeId) ? `Your ${item.supabase_key} account is verified` : `Connect your ${item.supabase_key} to verify` })
                ] }),
                verifyStampFlow ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(AdvancedCredentialCollection, { uuid, refresh: () => {
                  setVerifyStampFlow(false);
                  refresh();
                }, allStampIds, email, apikey: api_key }) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "16px" }, children: showAllowCreds ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "button",
                    {
                      style: {
                        backgroundColor: "#FFBF00",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "12px",
                        border: "none"
                      },
                      onClick: () => {
                        setVerifyStampFlow(true);
                      },
                      children: "Verify Stamp"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { style: { paddingLeft: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(InfoTooltip, { content: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("p", { style: { fontSize: 14, color: "red" }, children: [
                    "We found a cubid credential for a different app.",
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("br", {}),
                    " Send a one time passcode to verify it"
                  ] }) }) }) })
                ] }) : doesStampExist(item.stampTypeId) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "button",
                  {
                    style: {
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "12px",
                      border: "none"
                    },
                    children: "Verified Stamp"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "button",
                  {
                    onClick: () => handleSocialConnect(item.supabase_key),
                    style: {
                      backgroundColor: "#007bff",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "12px",
                      border: "none"
                    },
                    children: "Connect Account"
                  }
                ) })
              ]
            },
            item.supabase_key
          )),
          stampToRender === "iah" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "img",
                {
                  src: "data:image/png;base64,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",
                  alt: "Image",
                  className: "mb-1 size-10 rounded-md"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "font-bold", children: "I-Am-Human" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: doesStampExist(stampsWithId["iah"]) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-green-600", children: "Your NEAR account is verified" }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "Use a NEAR wallet to connect your IAH-verified account" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-4", children: false ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { style: {
                borderRadius: 10
              }, className: "bg-green-500 text-white px-4 py-2 rounded", children: "Verified Stamp" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "relative" })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "button",
              {
                onClick: () => {
                  wallet.signIn();
                },
                style: {
                  borderRadius: 10
                },
                className: "bg-blue-500 text-white px-4 py-2",
                children: "Connect Wallet"
              }
            ) })
          ] }) }),
          stampToRender === "brightid" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "brightid" }),
          stampToRender === "gitcoin" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "div",
            {
              style: {
                border: "1px solid #ccc",
                width: isGrid ? "100%" : "300px",
                height: "190px",
                borderRadius: "12px",
                padding: "16px 24px",
                marginBottom: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "items-center", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "img",
                    {
                      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAP1BMVEUAQzsAQzsAQzsAPTQAQDgANy2WpaM/Yl0ALiP///+otbMACAAAJxpSb2rd4uJogXzK0dCBlZIjUUq7xcTz9fUp8LglAAAAAnRSTlMm5BIqaH0AAADfSURBVHgBfNKBCsMgDEXRzSQ2z0a12v//1tUyoM61FxTgYCDg6/V2N71nG9Q9dEFiJ3yD5BfxC/9HRVgRjO4wIvmsMiMZvnnlH2RJSFFNY0ESHlETEPSckJF0QPHICHLkRBI2uqIiWa7ii7cNaHJ9SRGZSBN2AGUvOuCGyseV14ywNgwoHtQvI4O3ABtww8IU0ZaGJGUfXnKFF6ceQAMQ5Ip9TXVOaq7qyu+eFFGMHdNxrMEG7CMLK/U0jNi1L7/lo1gmdFIbvs3oWLTGs4Un7NFZtxHnnvH5U3+GLzsAAOyFDgN+WSNyAAAAAElFTkSuQmCC",
                      alt: "Image",
                      className: "mb-1 size-10 rounded-md"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "font-bold", children: "Gitcoin Passport" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-gray-600", children: "Connect to import your existing Gitcoin Passport" })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-2", children: doesStampExist(stampsWithId.gitcoin) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { display: "flex", justifyContent: "space-between" }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { style: { borderRadius: 10 }, className: "bg-green-500 text-white px-4 py-2 rounded", children: "Verified Stamp" }) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
                  gitcoinModalOpen && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "bg-white rounded-lg p-6 w-96", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-xl font-bold mb-2", children: "Connect Web3 Wallet for Gitcoin Passport" }),
                    connectors.map((connector) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "button",
                      {
                        className: "bg-blue-500 text-white px-4 py-2 rounded w-full mb-4",
                        onClick: () => connect2({ connector }),
                        children: connector.name
                      },
                      connector.uid
                    )),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "button",
                      {
                        className: "mt-4 text-red-500",
                        style: { borderRadius: 10 },
                        onClick: () => setGitcoinModalOpen(false),
                        children: "Close"
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "button",
                    {
                      className: "bg-blue-500 text-white px-4 py-2 rounded",
                      onClick: () => setGitcoinModalOpen(true),
                      children: "Connect Gitcoin"
                    }
                  )
                ] }) })
              ]
            }
          ) }),
          stampToRender === "instagram" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "instagram" }),
          stampToRender === "gooddollar" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "gooddollar" }),
          stampToRender === "near-wallet" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "img",
                {
                  src: "data:image/png;base64,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",
                  alt: "Image",
                  className: "mb-1 size-10 rounded-md"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "font-bold", children: "Near" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: doesStampExist(stampsWithId["iah"]) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-green-600", children: "Your NEAR account is verified" }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "Use a NEAR wallet" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-4", children: false ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { style: {
                borderRadius: 10
              }, className: "bg-green-500 text-white px-4 py-2 rounded", children: "Verified Stamp" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "relative" })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "button",
              {
                onClick: () => {
                  wallet.signIn();
                },
                style: {
                  borderRadius: 10
                },
                className: "bg-blue-500 text-white px-4 py-2",
                children: "Connect Wallet"
              }
            ) })
          ] }) }),
          stampToRender === "fractal" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "fractal" }),
          stampToRender === "solana" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "img",
                {
                  src: "data:image/webp;base64,UklGRqALAABXRUJQVlA4IJQLAAAQPwCdASrhAOEAPoVAm0klJCMhJ1N7IKAQiWVu1SWGGnKZE+eiz3jV4GXrT9/0YeJz6LfUhz//RAdRnuRmUFNI/vfKpe1/y02H9oP+49o/Y3tW/6HeMMx+pRNWVbY3PWY/wf2u9KP1J6O3pVeyT9m/aHM9zjqcPePALfxulPfUQGoe8cWxmi4o5P++gEEAL2+D+hNsUv/a3zx5rISTicZbRIHoZtX8eZNxBMEm8s9GH4y2IlEZWWgCged4NtCkDBQjRrb9T8nAxo5YVz15osAPtaYq4OtSgPf72Z09XrhKSOCrRG+VWwt6YgSsKJEGTOS0t82MIb53voT0Z7GF+1jF8+gPrczz0JbhAJLAa9n0agJbvy5TJ0NCq2SqkgXtLW78dYYjAlLazJTgBTuAZ8PpFiKur67ShQG+/29RZwHXrpjgnGqJN4jNgwBky7HSiaWpXJL6GjUABc5UjC6T/RYE2k+YWnjxs+zy8J38k61HrgxvWBPdSXXv2UDEacJ3lKPFXSyu/z3QI+J3CvGB56S0dKUDd3BTj1r7VvKDp/xwWapYhlQXrkwRAIThMmdgD31fKHQj4CatCYNzhstq2Zf1LudosSMzHmjsfMWMrYfMWZyv6L/IaSIpQGOXxsMueACHkzECtqV+v3zzGP02+eMplOZN+3wxXjf4HqtrwXqR3AAA/vshlw5PNaSz1Yqd+wL4TKiuhwpN3BIhUC4PLr2Wwun9bawbcwHa1S223WzRGrFXP7Hl36taoiN+PpmUrZvj/VRb2Qvt9T5xWcBM6O7+kxvXG3pnsBrgiWvBBWPD0FPKj+Big2f27V/Y63rdFT6wDiyZcCvuCLDqRWiHJixrJ7c4oZ3cW/T08hLJheYPCoJloKuzqXVP9dwL03u2uN5kjkK3BbxkEtl5UKuK2xrgHtreWj9HG52l2SK4Pyl6QM0CUz/H2b9PMGrGSHVMZvAsKS7vH3QRjfYkO3SkeIn0HOaMwadMCK6QROfvNiMJwiXKn0T0qGHPUQupgrsAcAPN7FaupOgOBfyheUPqcEtqH0VDGgt5erI9rSI+3kdav9ybKLVAXNOXewwOu7AUPUAp7uSD7cF+synxqZQOUQh0uo46O8YGu1und6DfjL5CeHaIAqBaQYidNwnI/ILTXEi6QCiuoMk3c/8AaOyyUA8jfUo8H1ZjNEy9dPfZ9cRqZMs6+dLCvJU8Q//77G9HNBCyMbfjcprUXzURVmaC7PlV9/CEgBJ2dzLI7Rif/TV6qEXwWCfXH+/e2Rjv7/bug2KBK/KTUhjK5Pj2Wf0mLRnjAA18j8WpqhqU4DdqC3ZZsf75YBfoc5EJTueJox/IhQxopy/7OHIapy61YozpSpKlvdqs2I25gOk2b3X0mB1hfi0WH0UQSL89yHT0wAxos+tZ2gKlatQUaOq+udbkivLu6bnvPXYKo42WBYtFmfI2muzSlzl45pyZzMYoBAnkzPe1LezttHnX0rzoIhrw8vFLwKhJOoTCEzUXo304soSKyQGT2CgQkTcPaw1dbWdaMkKdcJDl2c6/xoPypaP9vlj/OC610WpaOAn2qIfPxAx9Nq9mM8mxMBmM6eHolGPyZIYtOWL1XTpC3a0U1Bj1LMtZnQq63BSGRlCb1wxop4KyNpMf31EWa/NiU4ILZ+FSQ/uY1WFnZCWZV7kAFOCZTVwZkrfFI+Tv/s4ak8fVCQ0zhmyUUv6WAGD/3MFp3m7MEncT8D2rb8ACTYERe9IeUyPhy6FoKIEstgLFs1je+tJoN32YWRFIarsOiTVvc2OgNP7j0Vh0RMo54QidUxCFRxqJJ9nOz+9p/BSRdzo5PIBxRqNC9+lkT5dqxA7X9fmapq+Hz8zbPhDgoh+pZzHuStwAbkupkichFpD4MQIziLn0nvDbp+ZCEfjdePx4bANi2gF0vBtuZp3s5CYMA2FcqjLYvytCVe78U760uouG1s2rR/U7HL+2mnXICOkirCOKZmIHrcRdB1xAZIilQwmseADZnDVfw2TlnZ2InO2IKPrntZZubz5rnQrK2aqTdm5eLTDSkqO1bRxjEh1Dhs+5P/COhwdAb3nG4szffo1owzWCURcSud4qT03rEnNBnu8NXgbgJHK7aVV5G/uI1yXSehJrpVjfH1der3CntMWfkrgC8jt/6o4C1rFa5tJUqyYYkcuY3oDdwUKj5fdVbM9R59yFTbHXb0Po8AmdvV5m3lpl4GgTRVwmCkChqnqlfI91CSNPEgXYhABt6MkTDWcu3Ec2iYQC159weyDjdFL0paEPbJJvnQ1NSVan+apXw11XjKwEU8cUdd3JewS0x/1YaAEvsEFTzhONEA6ZXvQj0mLf1UXULd/4CpU2x1JuNOODqH/aBpqbBWyY+IlNSK9bI6l2CvfPwXQ2XkixkEyqDlF8cNi/w4spY2CHKriUxNQTfjGGQanrkXKohopSInDKUO8BDUk6R64vLD77MoVB0fsFqYcrD8xyfAeaKGpiMUkgMElM027Xi1qEUJuqMNmEnzVSqfYgS0UkaPx//kYxEwlbKtEnY53SSt2thXcVOKMP2gqZr6h1PewXooUGmLSNGwi94bu9/+ESIk/fVyqu1R4jU2Yp/+tl2giJdKX9GBze32FY7BTtj+sDlhNlAAy2Hax1M5NTMbeMJVXck6wEvd/ksd+4/ZznlMA4YRoSltRHg0F8ywlwxQgnHDAbM/JBWSSBWyXz2nBNNad/xmjNEfeQlyK5aqDlwRheSgND2lqwFI5/eQYJLCqh436ZAAasFvhMsZQX/9/yvdo4nT+5NtRmWVsEDYE6k+MKmnaW3LtUp421MdDjUx47hbkdo50mkStJhNFCZypYXqQF06RWC6Li+Jk9wD6fbvm8cmkeOABcZGuzdoDoyUW47kCujBO0msE8aLhNiFGlOVZ8BkgEFRwHGk6IEaJNJ+kxgQVjvpD6+/815r/NVhBo/g2pgx8iSBLiE5QG351M/f8ZM9WUHJ/kMhJ9+niEVmYGvL1I4xRP+rVf1HdqVDPLFpfW4w+JNG2yNbVqerbHRPmPufIBniQ9MA3Y625DlIu1eBXWBHwhN1Uwi7tjp2/ZZ1DPVpjVtY0VVYNVM6pj0Ca20QX69H9dJSqlSBiDbLbp8peXEYPtJZI+y/UB8OTNIDKVIwbzjMuAO17hLqa8sxZJ/65RqovdouRC0iwyiuuzWORl3anW7VzfnzptP8OyaW9m3kTA/GHoOCsP0mAGI4dTS6qozwprpkw9rEV7B8cNTzGRgZ6qKm9002Cg5AUaU1uDgmfDKo7tvcTj/Kt2qpFjGUX6QwEgEU4NpIWD5VcDLSucflDKAfwfoojblL6XYi9KvU2U+ufyEktS0aPoUA63x9yoVwWUh20JMB4vcP6oisNosGss93HB+56ldbWpU5RMXYHw2iC77tF1y6wbWNy45J3qcsW4qy7jaMbdulKGfoMAAAAAAJYS4rg98dObrOXj/SVSssKnqAXAxPnELR6Xc8S9wrwdIpVvMyrJAsGVZyQEk3JRXxYZqbAHBSb2p7XxqpyaVAEZzJVkCFOlyW5rs6KVeMPE3mF5P44dbmEf0YH+5/QFMxXp/Z9Y4XZWmicQvoV/BOYio0ant9M/qzwkgXwkzZTagwX56zec/8LWviMOqQ7unO6HN4SU8amxQA+cjlorlxfLid5r4ezSs0ok/Qu+HJwY0uoGJidMOKmZrwZzh5dSowfCd87QlSPw/PpAe/3iUp18/KkwwZLkrwzqpi3TFuxVi1a/4SYfp8OZKcmM3ftaEPKjcYldp79TiOryGV9Xg+ptYJeGomZF170z2VYNTweyVdPcxnfLnujFKnA1W5ABu1GXEdCRTjGJbJDq4sS0nskK7Mo+FCAKp1PRL5hbvJZb321U2dTLFFTyD0b1o8L78QryEFoAIDXyATBKAKDbxvD7PGAA+NXazTcFlfxviPCrIAAAAAA=",
                  alt: "Image",
                  className: "mb-1 object-cover rounded-md",
                  style: {
                    width: 40,
                    height: 40
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "font-bold", children: "Solana" }),
                doesStampExist(stampsWithId["solana"]) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-gray-600", children: "Your Solana address is verified" }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: 1.5,
                      stroke: "#00e64d",
                      className: "size-6",
                      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                      )
                    }
                  )
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-gray-600", children: "Connect to Solana" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-4", children: doesStampExist(stampsWithId["solana"]) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { display: "flex", justifyContent: "space-between" }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "button",
              {
                onClick: () => {
                },
                style: {
                  borderRadius: 10
                },
                className: "bg-green-500 text-white px-4 py-2 rounded",
                children: "Solana Connected"
              }
            ) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_wallet_adapter_react_ui2.WalletMultiButton, {}) }) })
          ] }) }),
          stampToRender === "telegram" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "img",
                {
                  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/2048px-Telegram_2019_Logo.svg.png",
                  alt: "Image",
                  className: "mb-1 size-10 rounded-md object-cover"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "font-bold", children: "Telegram" }),
                doesStampExist(stampsWithId.telegram) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center space-x-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-gray-600", children: "Your telegram is verified" }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      strokeWidth: 1.5,
                      stroke: "#00e64d",
                      className: "size-6",
                      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        }
                      )
                    }
                  )
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-gray-600", children: "Verify your telegram" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-4", children: doesStampExist(stampsWithId.telegram) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { display: "flex", justifyContent: "space-between" }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { className: "bg-green-500 text-white px-4 py-2 rounded", children: "Verified Stamp" }) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "button",
                {
                  onClick: () => {
                    setShowTelegramScript(true);
                  },
                  className: "bg-blue-500 text-white px-4 py-2 rounded",
                  children: "Connect Telegram"
                }
              ),
              showTelegramScript && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "p-3", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "script",
                {
                  async: true,
                  src: "https://telegram.org/js/telegram-widget.js?22",
                  "data-telegram-login": "cubid_bot",
                  "data-size": "medium",
                  "data-auth-url": "https://passport.cubid.me/telegram",
                  "data-request-access": "write"
                }
              ) })
            ] }) })
          ] }) }),
          stampToRender === "worldcoin" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "worldcoin" }),
          stampToRender === "near" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: {
            border: "1px solid #ccc",
            width: isGrid ? "100%" : "300px",
            height: "190px",
            borderRadius: "12px",
            padding: "16px 24px",
            marginBottom: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center space-x-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                "img",
                {
                  src: "data:image/png;base64,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",
                  alt: "Image",
                  className: "mb-1 size-10 rounded-md"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "font-bold", children: "Near" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: doesStampExist(stampsWithId["iah"]) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-green-600", children: "Your NEAR account is verified" }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "Use a NEAR wallet" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "mt-4", children: false ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { style: {
                borderRadius: 10
              }, className: "bg-green-500 text-white px-4 py-2 rounded", children: "Verified Stamp" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "relative" })
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "button",
              {
                onClick: () => {
                  wallet.signIn();
                },
                style: {
                  borderRadius: 10
                },
                className: "bg-blue-500 text-white px-4 py-2",
                children: "Connect Wallet"
              }
            ) })
          ] }) }),
          stampToRender === "lens-protocol" && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "div",
            {
              style: {
                border: "1px solid #ccc",
                borderRadius: "12px",
                marginBottom: "16px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                height: "auto"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "mb-3", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "img",
                    {
                      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAZlBMVEX////r6+uDg4VMTU9TVFaYmJn6+vrCw8MAAAAfICQlJioaGx/k5eXy8vIpKi4sLTCwsLFub3FcXV4XGB0VFxvc3N3Ozs55enshIyZDREcJDBKAgYK6urs1Njk8PD+bm53V1danqKn7JVr2AAAAm0lEQVR4AdXOxQGAIABAUZVuu3P/Ie2WBfwXhUc5v831AETYboQyzoWQNlNMmzkOnGd+EHrSj8xanKRZmJHDYJxzlhd6Qw2inOdltZm3bVnt+inr9Y3zyBKHCyalsaUbNaMUdmzV+h5uQ7a9iJS2jZG7Pbcr9cfK1Nmrc/Y00fTOmazKi7UQSF22cRkLxkRc8ouuEtIhNBDX+WkTbzIRXoEbjE4AAAAASUVORK5CYII=",
                      alt: "Image",
                      className: "mb-1 w-10 h-10 rounded-md"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h3", { className: "text-xl font-bold", children: "Lens Protocol" }),
                  doesStampExist(stampsWithId["lens-protocol"]) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center space-x-1 text-sm text-gray-600 mt-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { children: "Your Lens Protocol is verified" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "svg",
                      {
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        strokeWidth: 1.5,
                        stroke: "#00e64d",
                        className: "w-6 h-6",
                        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M9 12.75L11.25 15 15 9.75M21 12a9 \n               9 0 11-18 0 9 9 0 0118 0z"
                          }
                        )
                      }
                    )
                  ] }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-sm texAccountt-gray-600 mt-1", children: "Use a Lens Protocol" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { children: doesStampExist(stampsWithId["lens-protocol"]) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Button, { children: "Verified Stamp" }) }) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: address ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  LoginOptions,
                  {
                    wallet: address ?? "",
                    onSuccess: async (args) => {
                      await import_axios6.default.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                        page_id,
                        stamp_type: "lens-protocol",
                        stampData: {
                          uniquevalue: args?.handle?.linkedTo?.nftTokenId,
                          identity: args.handle?.fullHandle,
                          ...args,
                          metdata: { ...args?.metadata, picture: null }
                        },
                        user_data: { uuid }
                      });
                      disconnect();
                      fetchStampData();
                    }
                  }
                ) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
                  lensModalOpen && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                    "div",
                    {
                      style: {
                        border: "1px solid #eee",
                        borderRadius: "8px",
                        padding: "16px",
                        marginTop: "8px"
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-lg font-semibold mb-2", children: "Connect Web3 Wallet for Lens" }),
                        connectors.map((connector) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                          Button,
                          {
                            variant: "secondary",
                            className: "bg-blue-500 mb-4 text-white",
                            style: { width: "200px" },
                            onClick: () => {
                              localStorage?.setItem("lens-loggin", "true");
                              connect2({ connector });
                            },
                            children: connector.name
                          },
                          connector.uid
                        ))
                      ]
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    Button,
                    {
                      variant: "outline",
                      className: "bg-blue-500 text-white",
                      style: { marginTop: "8px", borderRadius: 10 },
                      onClick: () => {
                        setLensModalOpen(true);
                      },
                      children: "Connect Lens Wallet"
                    }
                  )
                ] }) }) })
              ]
            }
          ),
          stampToRender === "phone" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "div",
            {
              style: {
                border: "1px solid #ccc",
                width: isGrid ? "100%" : "300px",
                borderRadius: "12px",
                padding: "16px 24px",
                marginBottom: "16px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { display: "flex", flexDirection: "column", alignItems: "flex-start" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "img",
                  {
                    src: "https://i.pinimg.com/736x/84/4e/8c/844e8cd4ab26c82286238471f0e5a901.jpg",
                    alt: "Farcaster logo",
                    style: { marginBottom: "8px", width: "40px", height: "40px", borderRadius: "8px" }
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { style: { fontSize: "20px", fontWeight: "bold" }, children: "Phone" }),
                doesStampExist(stampsWithId.phone) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "button",
                  {
                    style: {
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "8px 16px",
                      borderRadius: "12px",
                      border: "none"
                    },
                    children: "Verified Stamp"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { borderRadius: "8px", padding: "8px 12px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { style: { fontSize: "14px", color: "#666" }, children: "Connect your phone" }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "button",
                    {
                      onClick: () => {
                        setPhoneOpen(true);
                      },
                      style: {
                        backgroundColor: "#007bff",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "12px",
                        border: "none",
                        marginTop: "8px"
                      },
                      children: "Connect Phone"
                    }
                  )
                ] })
              ] })
            }
          ),
          stampToRender === "farcaster" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: `border ${isGrid ? "w-full" : "w-[300px]"} rounded-xl p-4 px-6 mb-4 shadow-md`, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex flex-col items-start", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "img",
              {
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0LwYIlZ9aYglKkSRuhEH0TM6VkCmqRqXpQ&s",
                alt: "Farcaster logo",
                className: "mb-1 size-10 rounded-md"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "text-xl font-bold", children: "Farcaster" }),
            doesStampExist(4) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "text-sm text-gray-600 mt-1", children: "Your Farcaster is verified" }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "bg-white w-[fit-content] rounded-lg mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(SignInButton, {}) })
          ] }) }),
          stampToRender === "address" && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(import_jsx_runtime14.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "div",
            {
              style: {
                border: "1px solid #e5e7eb",
                width: isGrid ? "100%" : "300px",
                borderRadius: "0.75rem",
                // Tailwind: rounded-xl
                padding: "1rem 1.5rem",
                // p-4 & px-6
                marginBottom: "1rem",
                // mb-4
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                // shadow-md
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start"
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "img",
                      {
                        src: "https://thumbs.dreamstime.com/b/destination-place-pin-red-pointer-map-position-mark-125211341.jpg",
                        alt: "Farcaster logo",
                        style: {
                          marginBottom: "0.25rem",
                          // mb-1
                          width: "2.5rem",
                          // w-10
                          height: "2.5rem",
                          // h-10
                          borderRadius: "0.375rem"
                          // rounded-md
                        }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "h2",
                      {
                        style: {
                          fontSize: "1.25rem",
                          // text-xl
                          fontWeight: 700
                          // font-bold
                        },
                        children: "Address"
                      }
                    ),
                    doesStampExist(stampsWithId.address) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                      "p",
                      {
                        style: {
                          fontSize: "0.875rem",
                          // text-sm
                          color: "#4b5563",
                          // text-gray-600
                          marginTop: "0.25rem"
                          // mt-1
                        },
                        children: "Local address verified"
                      }
                    ) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                      "div",
                      {
                        style: {
                          width: "fit-content",
                          borderRadius: "0.5rem"
                          // rounded-lg
                        },
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                            "p",
                            {
                              style: {
                                fontSize: "0.875rem",
                                // text-sm
                                color: "#4b5563"
                                // text-gray-600
                              },
                              children: "Add your address"
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                            "button",
                            {
                              onClick: () => setAddressOpen(true),
                              style: {
                                backgroundColor: "#3b82f6",
                                // bg-blue-500
                                color: "#fff",
                                // text-white
                                padding: "0.5rem 1rem",
                                // py-2 px-4
                                borderRadius: "0.25rem",
                                // rounded
                                marginTop: "0.5rem",
                                // mt-2
                                cursor: "pointer",
                                border: "none"
                              },
                              children: "Add Address"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { style: {
                      fontSize: "0.875rem",
                      // text-sm
                      color: "#4b5563"
                      // text-gray-600
                    }, children: "Use www.cubid.me to manage. One update per year is allowed" })
                  ]
                }
              )
            }
          ) }),
          stampToRender === "evm" && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "div",
            {
              style: {
                border: "1px solid #ccc",
                width: isGrid ? "100%" : "300px",
                height: "190px",
                borderRadius: "12px",
                padding: "16px 24px",
                marginBottom: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: { alignItems: "center" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "img",
                    {
                      src: "data:image/png;base64,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",
                      alt: "Image",
                      style: {
                        marginBottom: "4px",
                        borderRadius: "50%",
                        height: "40px",
                        width: "40px"
                      }
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { style: { fontWeight: "bold", fontSize: "16px" }, children: "EVM Wallet" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { style: { color: "#757575", fontSize: "14px" }, children: "Connect to evm wallet" })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { marginTop: "8px" }, children: doesStampExist(stampsWithId.evm) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: { display: "flex", justifyContent: "space-between" }, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                  "button",
                  {
                    style: {
                      borderRadius: "10px",
                      backgroundColor: "#4caf50",
                      color: "white",
                      padding: "8px 16px",
                      border: "none"
                    },
                    children: "Verified Stamp"
                  }
                ) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
                  gitcoinModalOpen && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "div",
                    {
                      style: {
                        position: "fixed",
                        inset: "0",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 50
                      },
                      children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
                        "div",
                        {
                          style: {
                            backgroundColor: "white",
                            borderRadius: "12px",
                            padding: "24px",
                            width: "24rem"
                          },
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                              "p",
                              {
                                style: {
                                  fontSize: "20px",
                                  fontWeight: "bold",
                                  marginBottom: "12px"
                                },
                                children: "Connect Web3 Wallet"
                              }
                            ),
                            connectors.map((connector) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                              "button",
                              {
                                style: {
                                  backgroundColor: "#007bff",
                                  color: "white",
                                  padding: "8px 16px",
                                  borderRadius: "8px",
                                  width: "100%",
                                  marginBottom: "8px",
                                  border: "none"
                                },
                                onClick: () => connect2({ connector }),
                                children: connector.name
                              },
                              connector.uid
                            )),
                            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                              "button",
                              {
                                style: {
                                  marginTop: "16px",
                                  color: "#ff0000",
                                  borderRadius: "10px",
                                  background: "none",
                                  border: "none"
                                },
                                onClick: () => setGitcoinModalOpen(false),
                                children: "Close"
                              }
                            )
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "button",
                    {
                      style: {
                        backgroundColor: "#007bff",
                        color: "white",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none"
                      },
                      onClick: () => setGitcoinModalOpen(true),
                      children: "Connect Evm Wallet"
                    }
                  )
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            PhoneNumberConnect,
            {
              apikey: api_key,
              open: phoneOpen,
              onClose: () => setPhoneOpen(false),
              fetchStamps: fetchStampData,
              page_id,
              uuid,
              setBlacklist,
              setBlacklistCred
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            LocationSearchPanel,
            {
              fetchStamps: fetchStampData,
              apikey: api_key,
              open: addressOpen,
              onClose: () => setAddressOpen(false),
              page_id,
              uuid
            }
          )
        ]
      }
    )
  ] });
};

// src/component/cubidWidget.tsx
var import_axios7 = __toESM(require("axios"));
var import_jsx_runtime15 = require("react/jsx-runtime");
var stampsWithId2 = {
  facebook: 1,
  github: 2,
  google: 3,
  twitter: 4,
  discord: 5,
  poh: 6,
  iah: 7,
  brightid: 8,
  gitcoin: 9,
  instagram: 10,
  phone: 11,
  gooddollar: 12,
  "near-wallet": 15,
  fractal: 17,
  evm: 14,
  email: 13,
  solana: 53,
  telegram: 27,
  worldcoin: 26,
  near: 15,
  "lens-protocol": 66,
  "farcaster": 68
};
var CubidWidget = ({ stampToRender, uuid, page_id, api_key, onStampChange, onBlacklistVerify }) => {
  const [allStamps, setAllStamps] = import_react14.default.useState([]);
  const [user_email, setUserEmail] = import_react14.default.useState();
  const fetchStampData = import_react14.default.useCallback(async () => {
    if (uuid) {
      try {
        const {
          data: { all_stamps: dbData, email }
        } = await import_axios7.default.post(`https://passport.cubid.me/api/v2/identity/fetch_stamps`, {
          user_id: uuid,
          apikey: api_key,
          page_id
        });
        setUserEmail(email);
        setAllStamps(dbData);
      } catch (error) {
        console.error("Error fetching stamps:", error);
      }
    }
  }, [uuid, api_key, page_id]);
  import_react14.default.useEffect(() => {
    fetchStampData();
  }, [fetchStampData]);
  const showAllowCreds = allStamps.filter((item) => !item.permAvailable && stampsWithId2[stampToRender] === item.stamptype)?.[0];
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_jsx_runtime15.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "p-3", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    Stamps,
    {
      allStampIds: [...allStamps.filter((item) => item.stamptype == stampsWithId2[stampToRender])].map((item) => item.id),
      refresh: fetchStampData,
      email: user_email,
      onBlacklistVerify,
      stampToRender,
      uuid,
      onStampChange,
      page_id,
      api_key,
      showAllowCreds
    }
  ) }) });
};

// index.tsx
function toBase58(buffer) {
  const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  const BASE = ALPHABET.length;
  const digits = Array.from(buffer);
  let output = "";
  let n = BigInt(0);
  for (const digit of digits) {
    n = n * BigInt(256) + BigInt(digit);
  }
  while (n > 0) {
    output = ALPHABET[Number(n % BigInt(BASE))] + output;
    n = n / BigInt(BASE);
  }
  for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
    output = ALPHABET[0] + output;
  }
  return output;
}
async function generateNEARWallet() {
  try {
    const keyPair = import_near_api_js2.KeyPair.fromRandom("ed25519");
    const publicKey = keyPair.getPublicKey();
    const privateKey = keyPair.toString();
    const publicKeyBase64 = publicKey.toString().split(":")[1];
    const publicKeyBytes = import_buffer.Buffer.from(publicKeyBase64, "base64");
    const hashedKeyBytes = import_buffer.Buffer.from((0, import_js_sha256.sha256)(publicKeyBytes), "hex");
    const accountId = toBase58(hashedKeyBytes);
    const config2 = {
      networkId: "testnet",
      keyStore: new import_near_api_js2.keyStores.InMemoryKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org"
    };
    const near = await (0, import_near_api_js2.connect)(config2);
    const wallet2 = {
      accountId,
      publicKey: publicKey.toString(),
      privateKey,
      network: config2.networkId
    };
    return wallet2;
  } catch (error) {
    console.error("Error generating NEAR wallet:", error);
    throw error;
  }
}
var CubidSDK = class {
  dapp_id;
  api_key;
  baseUrl;
  TOTAL_SHARES = 3;
  // Always create 3 shares
  THRESHOLD = 2;
  // Need 2 shares to reconstruct
  constructor(dapp_id, api_key) {
    this.dapp_id = dapp_id;
    this.api_key = api_key;
    this.baseUrl = "https://passport.cubid.me/api/v2";
  }
  /**
   * Converts a hex string to Uint8Array
   */
  hexToBytes(hex) {
    hex = hex.replace("0x", "");
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
    }
    return bytes;
  }
  /**
   * Converts Uint8Array to hex string
   */
  bytesToHex(bytes) {
    return "0x" + Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  /**
   * Helper function to make POST HTTP requests
   */
  async makePostRequest(endpoint, data = {}) {
    try {
      const response = await (0, import_axios8.default)({
        url: `${this.baseUrl}/${endpoint}`,
        method: "POST",
        headers: {
          "dapp-id": this.dapp_id,
          "api-key": this.api_key,
          "Content-Type": "application/json"
        },
        data
      });
      return response.data;
    } catch (error) {
      throw new Error(`API request to ${endpoint} failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  async generateEthereumKey() {
    console.log("Starting Ethereum wallet generation");
    try {
      const wallet2 = import_ethers.ethers.Wallet.createRandom();
      console.log("Successfully generated Ethereum wallet", {
        addressPrefix: wallet2.address.slice(0, 6),
        // Log only first few chars of address for identification
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      return {
        privateKey: wallet2.privateKey,
        address: wallet2.address
      };
    } catch (error) {
      console.error("Failed to generate Ethereum wallet:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : "",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      throw error;
    }
  }
  async generateNearKey() {
    console.log("Starting NEAR wallet generation");
    try {
      const wallet2 = await generateNEARWallet();
      console.log("Successfully generated NEAR wallet", {
        addressPrefix: wallet2.publicKey.slice(0, 6),
        // Log only first few chars for identification
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      return {
        privateKey: wallet2.privateKey,
        address: wallet2.publicKey
      };
    } catch (error) {
      console.error("Failed to generate NEAR wallet:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : "",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      throw error;
    }
  }
  async encryptPrivateKey({ user_id, wallet_type }) {
    console.log("Starting private key encryption process", {
      userId: user_id,
      walletType: wallet_type,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      if (!user_id) {
        console.error("Encryption failed: Missing user ID");
        throw new Error("User ID is required");
      }
      console.log(`Generating ${wallet_type} wallet`);
      const walletInfo = wallet_type === "near" ? await this.generateNearKey() : await this.generateEthereumKey();
      console.log("Converting private key to bytes for sharing");
      const secretBytes = this.hexToBytes(walletInfo.privateKey);
      console.log("Generating Shamir shares", {
        totalShares: this.TOTAL_SHARES,
        threshold: this.THRESHOLD,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      const shares = await (0, import_shamir_secret_sharing.split)(secretBytes, this.TOTAL_SHARES, this.THRESHOLD);
      console.log("Converting shares to hex format");
      const hexShares = shares.map((share) => this.bytesToHex(share));
      const [userShare1, userShare2, apiShare] = hexShares;
      console.log("Saving API share to storage", {
        userId: user_id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      await this.saveSecret({
        user_id,
        secret: apiShare
      });
      console.log("Successfully completed encryption process", {
        userId: user_id,
        walletType: wallet_type,
        addressPrefix: walletInfo.address.slice(0, 6),
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      return {
        user_shares: [userShare1, userShare2],
        public_address: walletInfo.address
      };
    } catch (error) {
      console.error("Encryption process failed:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : "",
        userId: user_id,
        walletType: wallet_type,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  async decryptPrivateKey({ userShares, user_id }) {
    console.log("Starting private key decryption process", {
      userId: user_id,
      hasUserShares: Boolean(userShares?.length),
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
    try {
      if (!Array.isArray(userShares) || userShares.length !== 2) {
        console.error("Decryption failed: Invalid number of user shares", {
          userId: user_id,
          providedShares: userShares?.length,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        throw new Error("Exactly two user shares are required");
      }
      if (!user_id) {
        console.error("Decryption failed: Missing user ID");
        throw new Error("User ID is required");
      }
      console.log("Fetching API share from storage", {
        userId: user_id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      const apiShareResponse = await this.fetchUserData({ user_id });
      if (!apiShareResponse?.secret) {
        console.error("Failed to retrieve API share", {
          userId: user_id,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        throw new Error("Failed to retrieve share from API");
      }
      console.log("Converting shares to bytes for combination");
      const shareBytes = [...userShares, apiShareResponse.secret].map((share) => this.hexToBytes(share));
      console.log("Combining shares to recover secret", {
        numberOfShares: shareBytes.length,
        threshold: this.THRESHOLD,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      const recoveredBytes = await (0, import_shamir_secret_sharing.combine)(shareBytes.slice(0, this.THRESHOLD));
      console.log("Successfully completed decryption process", {
        userId: user_id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      return this.bytesToHex(recoveredBytes);
    } catch (error) {
      console.error("Decryption process failed:", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : "",
        userId: user_id,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  // API Methods
  async fetchApproxLocation({ user_id }) {
    return this.makePostRequest("identity/fetch_approx_location", { apikey: this.api_key, user_id });
  }
  async fetchExactLocation({ user_id }) {
    return this.makePostRequest("identity/fetch_exact_location", { apikey: this.api_key, user_id });
  }
  async fetchIdentity({ user_id }) {
    return this.makePostRequest("identity/fetch_identity", { apikey: this.api_key, user_id });
  }
  async fetchStamps({ user_id }) {
    return this.makePostRequest("identity/fetch_stamps", { apikey: this.api_key, user_id });
  }
  async fetchRoughLocation({ user_id }) {
    return this.makePostRequest("identity/fetch_rough_location", { apikey: this.api_key, user_id });
  }
  async fetchUserData({ user_id }) {
    return this.makePostRequest("identity/fetch_user_data", { apikey: this.api_key, user_id });
  }
  async fetchScore({ user_id }) {
    return this.makePostRequest("score/fetch_score", { apikey: this.api_key, user_id });
  }
  async createUser({ email, phone, evm }) {
    return this.makePostRequest("create_user", {
      dapp_id: this.dapp_id,
      apikey: this.api_key,
      email,
      phone,
      evm
    });
  }
  async saveSecret({ user_id, secret }) {
    return this.makePostRequest("save_secret", {
      user_id,
      api_key: this.api_key,
      secret
    });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CubidSDK,
  CubidWidget,
  Provider,
  generateNEARWallet
});
//# sourceMappingURL=index.js.map