function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
export function AdvancedCredentialCollection(param) {
    var email = param.email, apikey = param.apikey, refresh = param.refresh, uuid = param.uuid, allStampIds = param.allStampIds, onClose = param.onClose;
    // State management for different modal stages and data
    var _useState = _sliced_to_array(useState(true), 2), isOpen = _useState[0], setIsOpen = _useState[1];
    var _useState1 = _sliced_to_array(useState('confirmation'), 2), currentStep = _useState1[0], setCurrentStep = _useState1[1];
    var _useState2 = _sliced_to_array(useState(''), 2), passcode = _useState2[0], setPasscode = _useState2[1];
    var _useState3 = _sliced_to_array(useState(60), 2), resendCountdown = _useState3[0], setResendCountdown = _useState3[1];
    var _useState4 = _sliced_to_array(useState(false), 2), isLoading = _useState4[0], setIsLoading = _useState4[1];
    var _useState5 = _sliced_to_array(useState(''), 2), error = _useState5[0], setError = _useState5[1];
    // Handle countdown timer for resending passcode
    useEffect(function() {
        var timer;
        if (currentStep === 'passcode' && resendCountdown > 0) {
            timer = setTimeout(function() {
                return setResendCountdown(resendCountdown - 1);
            }, 1000);
        }
        return function() {
            return clearTimeout(timer);
        };
    }, [
        resendCountdown,
        currentStep
    ]);
    // Check if user is already logged in
    useEffect(function() {
        if (localStorage.getItem("logged_in") === uuid) {
            setCurrentStep('authorized');
        }
    }, [
        uuid
    ]);
    // Handle initial passcode request
    var handlePasscodeRequest = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var err;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            3,
                            4
                        ]);
                        setIsLoading(true);
                        setError('');
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/verify/send-dapp-email", {
                                email: email,
                                apikey: apikey
                            })
                        ];
                    case 1:
                        _state.sent();
                        setCurrentStep('passcode');
                        setResendCountdown(60);
                        return [
                            3,
                            4
                        ];
                    case 2:
                        err = _state.sent();
                        setError('Failed to send passcode. Please try again.');
                        return [
                            3,
                            4
                        ];
                    case 3:
                        setIsLoading(false);
                        return [
                            7
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        });
        return function handlePasscodeRequest() {
            return _ref.apply(this, arguments);
        };
    }();
    // Handle passcode verification
    var handlePasscodeVerify = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var data, err;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            6,
                            7,
                            8
                        ]);
                        setIsLoading(true);
                        setError('');
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/verify/verify-email", {
                                email: email,
                                apikey: apikey,
                                otp: passcode,
                                dappuser_id: uuid
                            })
                        ];
                    case 1:
                        data = _state.sent().data;
                        if (!data.success) return [
                            3,
                            4
                        ];
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
                                apikey: apikey,
                                user_id: uuid,
                                stamp_id_array: allStampIds
                            })
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            refresh()
                        ];
                    case 3:
                        _state.sent();
                        localStorage.setItem("logged_in", uuid);
                        setCurrentStep('authorized');
                        return [
                            3,
                            5
                        ];
                    case 4:
                        setError('Invalid passcode. Please try again.');
                        _state.label = 5;
                    case 5:
                        return [
                            3,
                            8
                        ];
                    case 6:
                        err = _state.sent();
                        setError('Verification failed. Please try again.');
                        return [
                            3,
                            8
                        ];
                    case 7:
                        setIsLoading(false);
                        return [
                            7
                        ];
                    case 8:
                        return [
                            2
                        ];
                }
            });
        });
        return function handlePasscodeVerify() {
            return _ref.apply(this, arguments);
        };
    }();
    // Handle final authorization
    var handleAuthorize = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var err;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            3,
                            4,
                            5
                        ]);
                        setIsLoading(true);
                        setError('');
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
                                apikey: apikey,
                                user_id: uuid,
                                stamp_id_array: allStampIds
                            })
                        ];
                    case 1:
                        _state.sent();
                        return [
                            4,
                            refresh()
                        ];
                    case 2:
                        _state.sent();
                        setIsOpen(false);
                        onClose === null || onClose === void 0 ? void 0 : onClose();
                        return [
                            3,
                            5
                        ];
                    case 3:
                        err = _state.sent();
                        setError('Authorization failed. Please try again.');
                        return [
                            3,
                            5
                        ];
                    case 4:
                        setIsLoading(false);
                        return [
                            7
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        });
        return function handleAuthorize() {
            return _ref.apply(this, arguments);
        };
    }();
    // Styles object for reusable styles
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
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '24px',
            width: '90%',
            maxWidth: '440px',
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        },
        header: {
            marginBottom: '20px'
        },
        title: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#1a1a1a',
            marginBottom: '8px'
        },
        description: {
            fontSize: '16px',
            color: '#4a5568',
            lineHeight: '1.5'
        },
        input: {
            width: '100%',
            padding: '12px',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            fontSize: '16px',
            marginBottom: '16px'
        },
        error: {
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            padding: '12px',
            borderRadius: '6px',
            marginBottom: '16px'
        },
        buttonContainer: {
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            marginTop: '24px'
        },
        button: {
            padding: '10px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            border: 'none',
            transition: 'background-color 0.2s'
        },
        primaryButton: {
            backgroundColor: '#2563EB',
            color: '#ffffff'
        },
        secondaryButton: {
            backgroundColor: '#E5E7EB',
            color: '#374151'
        },
        disabledButton: {
            opacity: 0.5,
            cursor: 'not-allowed'
        }
    };
    // Render different content based on current step
    var renderContent = function() {
        switch(currentStep){
            case 'confirmation':
                return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
                    style: styles.header
                }, /*#__PURE__*/ React.createElement("h2", {
                    style: styles.title
                }, "Credential Authorization Required"), /*#__PURE__*/ React.createElement("p", {
                    style: styles.description
                }, "It looks like this credential has already been registered for a different app in the Cubid ecosystem. Get a passcode to approve using it in this app too.")), /*#__PURE__*/ React.createElement("div", {
                    style: styles.buttonContainer
                }, /*#__PURE__*/ React.createElement("button", {
                    style: _object_spread({}, styles.button, styles.secondaryButton),
                    onClick: function() {
                        return setIsOpen(false);
                    }
                }, "Cancel"), /*#__PURE__*/ React.createElement("button", {
                    style: _object_spread({}, styles.button, styles.primaryButton, isLoading ? styles.disabledButton : {}),
                    onClick: handlePasscodeRequest,
                    disabled: isLoading
                }, isLoading ? 'Sending...' : 'Send Passcode')));
            case 'passcode':
                return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
                    style: styles.header
                }, /*#__PURE__*/ React.createElement("h2", {
                    style: styles.title
                }, "Enter Verification Code"), /*#__PURE__*/ React.createElement("p", {
                    style: styles.description
                }, "Please check your email (", email, ") for the verification code we just sent.")), /*#__PURE__*/ React.createElement("input", {
                    type: "text",
                    placeholder: "Enter passcode",
                    value: passcode,
                    onChange: function(e) {
                        return setPasscode(e.target.value);
                    },
                    style: styles.input,
                    maxLength: 6
                }), error && /*#__PURE__*/ React.createElement("div", {
                    style: styles.error
                }, error), /*#__PURE__*/ React.createElement("button", {
                    style: _object_spread(_object_spread_props(_object_spread({}, styles.button, styles.secondaryButton), {
                        width: '100%',
                        marginBottom: '16px'
                    }), resendCountdown > 0 || isLoading ? styles.disabledButton : {}),
                    disabled: resendCountdown > 0 || isLoading,
                    onClick: handlePasscodeRequest
                }, "Resend Code ", resendCountdown > 0 ? "(".concat(resendCountdown, "s)") : ''), /*#__PURE__*/ React.createElement("div", {
                    style: styles.buttonContainer
                }, /*#__PURE__*/ React.createElement("button", {
                    style: _object_spread({}, styles.button, styles.secondaryButton),
                    onClick: function() {
                        return setIsOpen(false);
                    }
                }, "Cancel"), /*#__PURE__*/ React.createElement("button", {
                    style: _object_spread({}, styles.button, styles.primaryButton, isLoading || !passcode ? styles.disabledButton : {}),
                    onClick: handlePasscodeVerify,
                    disabled: isLoading || !passcode
                }, isLoading ? 'Verifying...' : 'Verify')));
            case 'authorized':
                return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
                    style: styles.header
                }, /*#__PURE__*/ React.createElement("h2", {
                    style: styles.title
                }, "Authorization Successful"), /*#__PURE__*/ React.createElement("p", {
                    style: styles.description
                }, "You've successfully authenticated with Cubid. Click below to complete the authorization process.")), /*#__PURE__*/ React.createElement("div", {
                    style: styles.buttonContainer
                }, /*#__PURE__*/ React.createElement("button", {
                    style: _object_spread({}, styles.button, styles.primaryButton, isLoading ? styles.disabledButton : {}),
                    onClick: handleAuthorize,
                    disabled: isLoading
                }, isLoading ? 'Processing...' : 'Complete Authorization')));
        }
    };
    if (!isOpen) return null;
    return /*#__PURE__*/ React.createElement("div", {
        style: styles.modalOverlay,
        onClick: function() {
            return setIsOpen(false);
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: styles.modalContent,
        onClick: function(e) {
            return e.stopPropagation();
        }
    }, renderContent()));
}
export default AdvancedCredentialCollection;
