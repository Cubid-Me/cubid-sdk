function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import React, { useState } from 'react';
import { EmailVerificationModal } from './email';
import { PhoneVerificationModal } from './phone';
import { WalletVerificationModal } from './wallet';
export var VerificationModal = function(param) {
    var type = param.type, isOpen = param.isOpen, onClose = param.onClose, onSuccess = param.onSuccess, onError = param.onError, duplicateInfo = param.duplicateInfo, realInfo = param.realInfo, credType = param.credType;
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
    var _useState = _sliced_to_array(useState(duplicateInfo ? 'duplicate-alert' : 'verification'), 2), verificationState = _useState[0], setVerificationState = _useState[1];
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
        title: {
            fontSize: '18px',
            fontWeight: '500',
            marginBottom: '1.5rem',
            textAlign: 'center',
            color: '#333'
        },
        description: {
            fontSize: '15px',
            lineHeight: '1.5',
            color: '#4B5563',
            marginBottom: '2rem'
        },
        primaryButton: {
            width: '100%',
            padding: '12px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '12px',
            transition: 'background-color 0.3s'
        },
        secondaryButton: {
            width: '100%',
            padding: '12px',
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s'
        },
        highlight: {
            fontWeight: '500',
            color: '#2563EB'
        }
    };
    var handleSendPasscode = function() {
        setVerificationState('verification');
    };
    var handleContactSupport = function() {
        setVerificationState('support');
        window.location.href = '/support';
    };
    var getDuplicateContent = function() {
        var duplicateValue = credType === 'email' ? duplicateInfo === null || duplicateInfo === void 0 ? void 0 : duplicateInfo.maskedEmail : type === 'phone' ? duplicateInfo === null || duplicateInfo === void 0 ? void 0 : duplicateInfo.maskedPhone : duplicateInfo === null || duplicateInfo === void 0 ? void 0 : duplicateInfo.maskedAddress;
        var credentialType = type === 'email' ? 'email address' : type === 'phone' ? 'phone number' : 'wallet address';
        return {
            title: "Duplicate ".concat(credentialType.charAt(0).toUpperCase() + credentialType.slice(1), " Detected"),
            description: type === 'wallet' ? "Oops! It seems like this wallet address was already registered to account ".concat(obscureString(duplicateInfo === null || duplicateInfo === void 0 ? void 0 : duplicateInfo.maskedAddress), ". Was that you? We don't allow account duplication, so to prevent blacklisting, we would strongly encourage you to rectify immediately") : "Oops! It seems like this ".concat(credentialType, " was already registered to account ").concat(obscureString(duplicateInfo === null || duplicateInfo === void 0 ? void 0 : duplicateInfo.maskedEmail), ". Was that you? We don't allow account duplication, so to prevent blacklisting, we would strongly encourage you to rectify immediately"),
            primaryButton: "That's my ".concat(credentialType, " too. Send me a passcode"),
            secondaryButton: "I may have been hacked. Contact support"
        };
    };
    var renderContent = function() {
        switch(verificationState){
            case 'duplicate-alert':
                {
                    var content = getDuplicateContent();
                    return /*#__PURE__*/ React.createElement("div", {
                        style: styles.modalContent,
                        onClick: function(e) {
                            return e.stopPropagation();
                        }
                    }, /*#__PURE__*/ React.createElement("div", {
                        style: styles.title
                    }, content.title), /*#__PURE__*/ React.createElement("div", {
                        style: _object_spread_props(_object_spread({}, styles.description), {
                            whiteSpace: "pre-line",
                            wordBreak: type === "wallet" ? "break-all" : "normal"
                        })
                    }, content.description), /*#__PURE__*/ React.createElement("button", {
                        style: styles.primaryButton,
                        onClick: handleSendPasscode,
                        onMouseOver: function(e) {
                            return e.currentTarget.style.backgroundColor = '#333';
                        },
                        onMouseOut: function(e) {
                            return e.currentTarget.style.backgroundColor = 'black';
                        }
                    }, content.primaryButton), /*#__PURE__*/ React.createElement("button", {
                        style: styles.secondaryButton,
                        onClick: handleContactSupport,
                        onMouseOver: function(e) {
                            e.currentTarget.style.backgroundColor = 'black';
                            e.currentTarget.style.color = 'white';
                        },
                        onMouseOut: function(e) {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = 'black';
                        }
                    }, content.secondaryButton));
                }
            case 'verification':
                switch(credType){
                    case 'email':
                        return /*#__PURE__*/ React.createElement(EmailVerificationModal, {
                            isOpen: true,
                            onClose: onClose,
                            onSuccess: onSuccess,
                            onError: onError,
                            email: realInfo === null || realInfo === void 0 ? void 0 : realInfo.email
                        });
                    case 'phone':
                        return /*#__PURE__*/ React.createElement(PhoneVerificationModal, {
                            isOpen: true,
                            onClose: onClose,
                            onSuccess: onSuccess,
                            onError: onError,
                            phone: realInfo === null || realInfo === void 0 ? void 0 : realInfo.phone
                        });
                    case 'wallet':
                        return /*#__PURE__*/ React.createElement(WalletVerificationModal, {
                            isOpen: true,
                            onClose: onClose,
                            onSuccess: onSuccess,
                            onError: onError,
                            address: realInfo === null || realInfo === void 0 ? void 0 : realInfo.address
                        });
                    default:
                        return null;
                }
            default:
                return null;
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ React.createElement("div", {
        style: styles.modalOverlay,
        onClick: onClose
    }, renderContent());
};
