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
import React, { useState, useEffect } from 'react';
export var PhoneVerificationModal = function(param) {
    var isOpen = param.isOpen, onClose = param.onClose, onSuccess = param.onSuccess, onError = param.onError, passedPhone = param.phone;
    var obscureString = function obscureString(input) {
        // If the input is 5 characters or less, return as is.
        if (input.length <= 5) {
            return input;
        }
        var firstTwo = input.slice(0, 2);
        var lastThree = input.slice(-3);
        // Replace all characters between the first two and last three with "****"
        return firstTwo + "****" + lastThree;
    };
    var _useState = _sliced_to_array(useState([
        '',
        '',
        '',
        '',
        '',
        ''
    ]), 2), otp = _useState[0], setOtp = _useState[1];
    var _useState1 = _sliced_to_array(useState(''), 2), error = _useState1[0], setError = _useState1[1];
    var _useState2 = _sliced_to_array(useState(false), 2), success = _useState2[0], setSuccess = _useState2[1];
    var _useState3 = _sliced_to_array(useState(0), 2), countdown = _useState3[0], setCountdown = _useState3[1];
    // Handle close
    var handleClose = function() {
        if (onClose) {
            onClose();
        }
        resetForm();
    };
    // Styles object
    var styles = {
        modalOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '400px',
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        },
        button: {
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'background-color 0.3s'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem'
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '0 0 8px 0'
        },
        subtitle: {
            fontSize: '18px',
            fontWeight: '500',
            margin: '0',
            color: '#333'
        },
        otpContainer: {
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            margin: '1rem 0'
        },
        otpInput: {
            width: '40px',
            height: '48px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 'bold',
            border: '2px solid #e2e2e2',
            borderRadius: '6px',
            outline: 'none',
            transition: 'border-color 0.3s'
        },
        actionButtons: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem'
        },
        textButton: {
            background: 'none',
            border: 'none',
            color: '#666',
            fontSize: '14px',
            cursor: 'pointer',
            padding: '4px 8px'
        },
        error: {
            color: '#e11d48',
            backgroundColor: '#fee2e2',
            padding: '12px',
            borderRadius: '6px',
            marginTop: '1rem',
            fontSize: '14px'
        },
        successContainer: {
            textAlign: 'center',
            padding: '2rem 0'
        },
        successIcon: {
            width: '48px',
            height: '48px',
            backgroundColor: '#f8f8f8',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            margin: '0 auto 1rem'
        }
    };
    useEffect(function() {
        if (countdown > 0) {
            var timer = setTimeout(function() {
                return setCountdown(countdown - 1);
            }, 1000);
            return function() {
                return clearTimeout(timer);
            };
        }
    }, [
        countdown
    ]);
    useEffect(function() {
        if (isOpen && passedPhone) {
            sendOTP();
        }
    }, [
        isOpen,
        passedPhone
    ]);
    var handleOtpChange = function(index, value) {
        if (value.length > 1) return;
        var newOtp = _to_consumable_array(otp);
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 5) {
            var nextInput = document.querySelector('input[name="phone-otp-'.concat(index + 1, '"]'));
            if (nextInput) nextInput.focus();
        }
    };
    var handleKeyDown = function(index, e) {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            var prevInput = document.querySelector('input[name="phone-otp-'.concat(index - 1, '"]'));
            if (prevInput) prevInput.focus();
        }
    };
    var validatePhoneNumber = function(phone) {
        var phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        return phoneRegex.test(phone);
    };
    var sendOTP = function() {
        if (!passedPhone || !validatePhoneNumber(passedPhone)) {
            setError('Invalid phone number provided');
            if (onError) {
                onError('Invalid phone number provided');
            }
            return;
        }
        setError('');
        setCountdown(30);
        // Mock OTP send - replace with actual API call
        console.log('Sending OTP to:', passedPhone);
    };
    var verifyOTP = function() {
        // Mock verification - replace with actual API call
        if (otp.join('') === '123456') {
            setSuccess(true);
            if (onSuccess) {
                onSuccess();
            }
            setTimeout(function() {
                handleClose();
            }, 2000);
        } else {
            setError('Invalid verification code');
            if (onError) {
                onError('Invalid verification code');
            }
        }
    };
    var resetForm = function() {
        setOtp([
            '',
            '',
            '',
            '',
            '',
            ''
        ]);
        setError('');
        setSuccess(false);
        setCountdown(0);
    };
    if (!isOpen || !passedPhone) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        style: styles.modalOverlay,
        onClick: handleClose
    }, /*#__PURE__*/ React.createElement("div", {
        style: styles.modalContent,
        onClick: function(e) {
            return e.stopPropagation();
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: styles.header
    }, /*#__PURE__*/ React.createElement("h2", {
        style: styles.title
    }, "CUBID"), /*#__PURE__*/ React.createElement("h3", {
        style: styles.subtitle
    }, "Enter Security Code")), !success ? /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("div", {
        style: {
            textAlign: 'center',
            marginBottom: '1rem'
        }
    }, /*#__PURE__*/ React.createElement("p", {
        style: {
            color: '#666',
            margin: '0'
        }
    }, "We've sent a 6-digit code to"), /*#__PURE__*/ React.createElement("p", {
        style: {
            fontWeight: '500',
            margin: '4px 0'
        }
    }, obscureString(passedPhone))), /*#__PURE__*/ React.createElement("div", {
        style: styles.otpContainer
    }, otp.map(function(digit, index) {
        return /*#__PURE__*/ React.createElement("input", {
            key: index,
            type: "text",
            name: "phone-otp-".concat(index),
            value: digit,
            onChange: function(e) {
                return handleOtpChange(index, e.target.value);
            },
            onKeyDown: function(e) {
                return handleKeyDown(index, e);
            },
            style: _object_spread_props(_object_spread({}, styles.otpInput), {
                borderColor: error ? '#e11d48' : '#e2e2e2'
            }),
            maxLength: 1
        });
    })), /*#__PURE__*/ React.createElement("button", {
        style: _object_spread_props(_object_spread({}, styles.button), {
            opacity: otp.some(function(digit) {
                return !digit;
            }) ? 0.5 : 1,
            cursor: otp.some(function(digit) {
                return !digit;
            }) ? 'not-allowed' : 'pointer'
        }),
        onClick: verifyOTP,
        disabled: otp.some(function(digit) {
            return !digit;
        }),
        onMouseOver: function(e) {
            return !otp.some(function(digit) {
                return !digit;
            }) && (e.currentTarget.style.backgroundColor = '#333');
        },
        onMouseOut: function(e) {
            return !otp.some(function(digit) {
                return !digit;
            }) && (e.currentTarget.style.backgroundColor = 'black');
        }
    }, "Verify Code"), /*#__PURE__*/ React.createElement("div", {
        style: styles.actionButtons
    }, /*#__PURE__*/ React.createElement("button", {
        style: _object_spread_props(_object_spread({}, styles.textButton), {
            opacity: countdown > 0 ? 0.5 : 1,
            cursor: countdown > 0 ? 'not-allowed' : 'pointer'
        }),
        onClick: function() {
            return !countdown && sendOTP();
        },
        disabled: countdown > 0
    }, countdown > 0 ? "Resend in ".concat(countdown, "s") : 'Resend Code'))) : /*#__PURE__*/ React.createElement("div", {
        style: styles.successContainer
    }, /*#__PURE__*/ React.createElement("div", {
        style: styles.successIcon
    }, "✓"), /*#__PURE__*/ React.createElement("h3", {
        style: {
            fontSize: '20px',
            margin: '0 0 8px 0'
        }
    }, "Phone Verified!"), /*#__PURE__*/ React.createElement("p", {
        style: {
            color: '#666',
            margin: 0
        }
    }, "Your phone number has been verified with Cubid."))));
};
