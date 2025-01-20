// @ts-nocheck
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
var DAPP_NAME = "YourDAppName";
export function AdvancedCredentialCollection(param) {
    var email = param.email, apikey = param.apikey, refresh = param.refresh, uuid = param.uuid, allStampIds = param.allStampIds;
    var _useState = _sliced_to_array(useState(true), 2), passcodeRequested = _useState[0], setPasscodeRequested = _useState[1];
    var _useState1 = _sliced_to_array(useState(''), 2), passcode = _useState1[0], setPasscode = _useState1[1];
    var _useState2 = _sliced_to_array(useState(60), 2), resendCountdown = _useState2[0], setResendCountdown = _useState2[1];
    var _useState3 = _sliced_to_array(useState(false), 2), cubidAuthenticated = _useState3[0], setCubidAuthenticated = _useState3[1];
    var _useState4 = _sliced_to_array(useState(false), 2), credentialShared = _useState4[0], setCredentialShared = _useState4[1];
    var _useState5 = _sliced_to_array(useState(false), 2), showTwitterHandles = _useState5[0], setShowTwitterHandles = _useState5[1];
    var _useState6 = _sliced_to_array(useState([
        '@twitterUser123',
        '@anotherUser456'
    ]), 2), twitterHandles = _useState6[0], setTwitterHandles = _useState6[1];
    var _useState7 = _sliced_to_array(useState('@twitterUser123'), 2), selectedTwitterHandle = _useState7[0], setSelectedTwitterHandle = _useState7[1];
    var _useState8 = _sliced_to_array(useState(false), 2), grantPerm = _useState8[0], setGrantPerm = _useState8[1];
    useEffect(function() {
        var timer;
        if (passcodeRequested && resendCountdown > 0) {
            timer = setTimeout(function() {
                return setResendCountdown(resendCountdown - 1);
            }, 1000);
        }
        return function() {
            return clearTimeout(timer);
        };
    }, [
        passcodeRequested,
        resendCountdown
    ]);
    var handlePasscodeRequest = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/verify/send-dapp-email", {
                                email: email,
                                apikey: apikey
                            })
                        ];
                    case 1:
                        _state.sent();
                        setPasscode(60);
                        alert("Passcode Sent. Check your email for the passcode we just sent.");
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
    var handlePasscodeVerify = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var data;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
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
                            8
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
                        return [
                            4,
                            refresh()
                        ];
                    case 4:
                        _state.sent();
                        return [
                            4,
                            axios.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
                                apikey: apikey,
                                user_id: uuid,
                                stamp_id_array: allStampIds
                            })
                        ];
                    case 5:
                        _state.sent();
                        return [
                            4,
                            refresh()
                        ];
                    case 6:
                        _state.sent();
                        return [
                            4,
                            refresh()
                        ];
                    case 7:
                        _state.sent();
                        setCredentialShared(true);
                        localStorage.setItem("logged_in", uuid);
                        return [
                            3,
                            9
                        ];
                    case 8:
                        alert("Authentication Failed. The passcode you entered is incorrect. Please try again.");
                        _state.label = 9;
                    case 9:
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
    var handleAuthorize = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
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
                        return [
                            4,
                            refresh()
                        ];
                    case 3:
                        _state.sent();
                        return [
                            4,
                            refresh()
                        ];
                    case 4:
                        _state.sent();
                        setCredentialShared(true);
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
    useEffect(function() {
        if (localStorage.getItem("logged_in") === uuid) {
            setGrantPerm(true);
        }
        setInterval(function() {
            if (localStorage.getItem("logged_in") === uuid) {
                setGrantPerm(true);
            } else {
                setGrantPerm(false);
            }
        }, 1000);
    }, [
        uuid
    ]);
    useEffect(function() {
        if (localStorage.getItem("logged_in") != uuid) {
            handlePasscodeRequest();
        }
    }, []);
    console.log({
        email: email
    });
    if (grantPerm) {
        return /*#__PURE__*/ React.createElement("button", {
            onClick: handleAuthorize,
            style: {
                width: '100%',
                padding: '8px 16px',
                backgroundColor: '#007AFF',
                color: '#FFF',
                borderRadius: '8px',
                marginTop: '8px'
            }
        }, "Grant Permission");
    }
    return /*#__PURE__*/ React.createElement("div", {
        style: {
            width: '100%',
            marginBottom: '16px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: {
            padding: '16px',
            borderRadius: '8px',
            border: "2px solid ".concat(credentialShared ? '#38A169' : cubidAuthenticated ? '#D69E2E' : '#E53E3E'),
            backgroundColor: credentialShared ? '#F0FFF4' : cubidAuthenticated ? '#FEFCBF' : '#FFF5F5'
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: {
            marginTop: ''
        }
    }, !cubidAuthenticated ? /*#__PURE__*/ React.createElement(React.Fragment, null, !passcodeRequested ? /*#__PURE__*/ React.createElement(React.Fragment, null) : /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("p", null, "Check your email - ", email && email, " for the passcode we just sent."), /*#__PURE__*/ React.createElement("div", {
        style: {
            alignItems: 'center',
            gap: '8px'
        }
    }, /*#__PURE__*/ React.createElement("input", {
        type: "text",
        placeholder: "Enter passcode here",
        value: passcode,
        style: {
            padding: '8px',
            borderRadius: '8px',
            border: '1px solid #DDD'
        },
        onChange: function(e) {
            return setPasscode(e.target.value);
        }
    }), /*#__PURE__*/ React.createElement("div", {
        style: {
            marginTop: 10
        }
    }, /*#__PURE__*/ React.createElement("button", {
        onClick: handlePasscodeVerify,
        style: {
            padding: '8px 16px',
            backgroundColor: '#3182CE',
            color: '#FFF',
            borderRadius: '8px'
        }
    }, "OK"))), /*#__PURE__*/ React.createElement("button", {
        onClick: handlePasscodeRequest,
        disabled: resendCountdown > 0,
        style: {
            marginTop: '8px',
            padding: '8px 16px',
            backgroundColor: '#E2E8F0',
            color: '#4A5568',
            borderRadius: '8px',
            cursor: resendCountdown > 0 ? 'not-allowed' : 'pointer'
        }
    }, "Resend ", resendCountdown > 0 ? "(".concat(resendCountdown, "s)") : ''))) : credentialShared ? /*#__PURE__*/ React.createElement("p", {
        style: {
            color: '#38A169'
        }
    }, "Twitter Credential data: ", /*#__PURE__*/ React.createElement("strong", null, selectedTwitterHandle)) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("p", {
        style: {
            color: '#D69E2E'
        }
    }, "Nice, you've authenticated with Cubid."), showTwitterHandles ? /*#__PURE__*/ React.createElement("div", null, twitterHandles.map(function(handle) {
        return /*#__PURE__*/ React.createElement("div", {
            key: handle,
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px'
            }
        }, /*#__PURE__*/ React.createElement("input", {
            type: "radio",
            id: handle,
            value: handle,
            checked: selectedTwitterHandle === handle,
            onChange: function() {
                return setSelectedTwitterHandle(handle);
            }
        }), /*#__PURE__*/ React.createElement("label", {
            htmlFor: handle
        }, handle));
    }), /*#__PURE__*/ React.createElement("button", {
        onClick: handleAuthorize,
        style: {
            width: '100%',
            padding: '8px 16px',
            backgroundColor: '#007AFF',
            color: '#FFF',
            borderRadius: '8px',
            marginTop: '8px'
        }
    }, "Authorize App to see this credential")) : /*#__PURE__*/ React.createElement("button", {
        onClick: handleAuthorize,
        style: {
            width: '100%',
            padding: '8px 16px',
            backgroundColor: '#007AFF',
            color: '#FFF',
            borderRadius: '8px',
            marginTop: '8px'
        }
    }, "Authorize App to see this credential")))));
}
