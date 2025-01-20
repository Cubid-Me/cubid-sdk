function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
var OTPInput = function(param) {
    var _param_length = param.length, length = _param_length === void 0 ? 6 : _param_length, value = param.value, onChange = param.onChange;
    var _useState = _sliced_to_array(useState(new Array(length).fill("")), 2), otp = _useState[0], setOtp = _useState[1];
    var inputRefs = useRef([]);
    var handleChange = function(e, index) {
        var val = e.target.value;
        if (isNaN(val)) return;
        var newOtp = _to_consumable_array(otp);
        newOtp[index] = val.slice(-1);
        setOtp(newOtp);
        var otpString = newOtp.join("");
        onChange(otpString);
        if (val && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }
    };
    var handleKeyDown = function(e, index) {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };
    var handlePaste = function(e) {
        var _inputRefs_current_focusIndex;
        e.preventDefault();
        var pasteData = e.clipboardData.getData("text").slice(0, length);
        var newOtp = _to_consumable_array(otp);
        for(var i = 0; i < pasteData.length; i++){
            if (isNaN(pasteData[i])) continue;
            newOtp[i] = pasteData[i];
        }
        setOtp(newOtp);
        onChange(newOtp.join(""));
        var nextEmptyIndex = newOtp.findIndex(function(val) {
            return !val;
        });
        var focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
        (_inputRefs_current_focusIndex = inputRefs.current[focusIndex]) === null || _inputRefs_current_focusIndex === void 0 ? void 0 : _inputRefs_current_focusIndex.focus();
    };
    var containerStyle = {
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        margin: '16px 0'
    };
    var inputStyle = {
        width: '48px',
        height: '48px',
        textAlign: 'center',
        border: '2px solid #E2E8F0',
        borderRadius: '8px',
        fontSize: '20px',
        outline: 'none'
    };
    var focusedInputStyle = _object_spread_props(_object_spread({}, inputStyle), {
        borderColor: '#22C55E',
        boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.2)'
    });
    return /*#__PURE__*/ React.createElement("div", {
        style: containerStyle
    }, otp.map(function(digit, index) {
        return /*#__PURE__*/ React.createElement("input", {
            key: index,
            ref: function(el) {
                return inputRefs.current[index] = el;
            },
            type: "text",
            inputMode: "numeric",
            maxLength: 1,
            value: digit,
            onChange: function(e) {
                return handleChange(e, index);
            },
            onKeyDown: function(e) {
                return handleKeyDown(e, index);
            },
            onPaste: handlePaste,
            style: inputStyle,
            onFocus: function(e) {
                return e.target.style.borderColor = '#22C55E';
            },
            onBlur: function(e) {
                return e.target.style.borderColor = '#E2E8F0';
            }
        });
    }));
};
export var PhoneNumberConnect = function(param) {
    var open = param.open, fetchStamps = param.fetchStamps, onClose = param.onClose, page_id = param.page_id, uuid = param.uuid, apikey = param.apikey, setBlacklist = param.setBlacklist, setBlacklistCred = param.setBlacklistCred;
    var _useState = _sliced_to_array(useState(""), 2), phoneInput = _useState[0], setPhoneInput = _useState[1];
    var _useState1 = _sliced_to_array(useState(false), 2), otpSent = _useState1[0], setOtpSent = _useState1[1];
    var _useState2 = _sliced_to_array(useState(""), 2), otpCode = _useState2[0], setOtpCode = _useState2[1];
    var sendOtp = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/v2/twillio/send-otp", {
                                phone: "+".concat(phoneInput),
                                apikey: apikey
                            })
                        ];
                    case 1:
                        _state.sent();
                        setOtpSent(true);
                        toast.success("OTP sent!");
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        toast.error("Failed to send OTP.");
                        return [
                            3,
                            3
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        });
        return function sendOtp() {
            return _ref.apply(this, arguments);
        };
    }();
    var verifyOtp = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var _ref, verify_data, _ref1, blacklist_creds, _ref2, all_email, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            8,
                            ,
                            9
                        ]);
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/v2/twillio/verify-otp", {
                                phone: "+".concat(phoneInput),
                                otpCode: otpCode,
                                apikey: apikey
                            })
                        ];
                    case 1:
                        _ref = _state.sent(), verify_data = _ref.data;
                        if (!(verify_data.status === "approved")) return [
                            3,
                            6
                        ];
                        toast.success("OTP Verified");
                        onClose();
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
                                page_id: page_id,
                                stamp_type: "phone",
                                stampData: {
                                    uniquevalue: phoneInput,
                                    identity: phoneInput
                                },
                                user_data: {
                                    uuid: uuid
                                }
                            })
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/v2/fetch_blacklisted_creds", {
                                apikey: apikey,
                                cred: phoneInput
                            })
                        ];
                    case 3:
                        _ref1 = _state.sent(), blacklist_creds = _ref1.data;
                        fetchStamps();
                        if (!(blacklist_creds === null || blacklist_creds === void 0 ? void 0 : blacklist_creds.is_blacklisted)) return [
                            3,
                            5
                        ];
                        return [
                            4,
                            axios.post('https://passport.cubid.me/api/v2/find_users_with_blacklist', {
                                cred: phoneInput,
                                apikey: apikey
                            })
                        ];
                    case 4:
                        _ref2 = _state.sent(), all_email = _ref2.data.all_email;
                        setBlacklist(true);
                        setBlacklistCred({
                            type: "phone",
                            value: all_email === null || all_email === void 0 ? void 0 : all_email.email1,
                            actual: phoneInput
                        });
                        _state.label = 5;
                    case 5:
                        return [
                            3,
                            7
                        ];
                    case 6:
                        toast.error("Incorrect OTP");
                        _state.label = 7;
                    case 7:
                        return [
                            3,
                            9
                        ];
                    case 8:
                        error = _state.sent();
                        toast.error("OTP verification failed.");
                        return [
                            3,
                            9
                        ];
                    case 9:
                        return [
                            2
                        ];
                }
            });
        });
        return function verifyOtp() {
            return _ref.apply(this, arguments);
        };
    }();
    if (!open) return null;
    var overlayStyle = {
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.67)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50
    };
    var modalStyle = {
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        maxWidth: '400px',
        width: '100%',
        padding: '24px'
    };
    var titleStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: '16px'
    };
    var contentStyle = {
        marginTop: '8px',
        color: '#4B5563'
    };
    var buttonContainerStyle = {
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'flex-end'
    };
    var primaryButtonStyle = {
        backgroundColor: '#22C55E',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        width: '100%',
        marginTop: '16px'
    };
    var secondaryButtonStyle = {
        backgroundColor: '#E5E7EB',
        color: '#1F2937',
        padding: '8px 16px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer'
    };
    var messageStyle = {
        fontSize: '14px',
        color: '#4B5563',
        textAlign: 'center',
        marginBottom: '16px'
    };
    return /*#__PURE__*/ React.createElement("div", {
        style: overlayStyle
    }, /*#__PURE__*/ React.createElement("div", {
        style: modalStyle
    }, /*#__PURE__*/ React.createElement("h2", {
        style: titleStyle
    }, "Phone Number Connect"), /*#__PURE__*/ React.createElement("div", {
        style: contentStyle
    }, otpSent ? /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("p", {
        style: messageStyle
    }, "Enter the verification code sent to your phone"), /*#__PURE__*/ React.createElement(OTPInput, {
        length: 6,
        value: otpCode,
        onChange: setOtpCode
    }), /*#__PURE__*/ React.createElement("button", {
        onClick: verifyOtp,
        style: primaryButtonStyle
    }, "Verify OTP")) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(PhoneInput, {
        country: "us",
        value: phoneInput,
        onChange: function(phone) {
            return setPhoneInput(phone);
        },
        containerStyle: {
            marginBottom: '16px'
        }
    }), /*#__PURE__*/ React.createElement("button", {
        onClick: sendOtp,
        style: primaryButtonStyle
    }, "Send Passcode"))), /*#__PURE__*/ React.createElement("div", {
        style: buttonContainerStyle
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: onClose,
        style: secondaryButtonStyle
    }, "Cancel"))));
};
export default PhoneNumberConnect;
