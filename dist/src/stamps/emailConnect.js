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
import React from "react";
import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase";
import { useCreatedByAppId } from "@/hooks/useCreatedByApp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { insertStamp } from "../lib/insertStamp";
export var EmailConnect = function(param) {
    var open = param.open, fetchStamps = param.fetchStamps, onClose = param.onClose, appId = param.appId, dbUser = param.dbUser, uid = param.uid;
    var _React_useState = _sliced_to_array(React.useState(""), 2), emailInput = _React_useState[0], setEmailInput = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(false), 2), otpSent = _React_useState1[0], setOtpSent = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(React.useState(""), 2), otpCode = _React_useState2[0], setOtpCode = _React_useState2[1];
    var sendOtp = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            supabase.auth.signInWithOtp({
                                email: emailInput
                            })
                        ];
                    case 1:
                        _state.sent();
                        setOtpSent(true);
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
    console.log({
        appId: appId
    }, "email");
    var getIdForApp = useCreatedByAppId().getIdForApp;
    var verifyOtp = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var error, _tmp;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            supabase.auth.verifyOtp({
                                email: emailInput,
                                token: otpCode,
                                type: "email"
                            })
                        ];
                    case 1:
                        error = _state.sent().error;
                        if (!!error) return [
                            3,
                            4
                        ];
                        toast.success("Otp Verified");
                        setOtpSent(true);
                        _tmp = {
                            stamp_type: 'email',
                            user_data: {
                                user_id: dbUser === null || dbUser === void 0 ? void 0 : dbUser.id,
                                uuid: uid
                            },
                            stampData: {
                                identity: emailInput,
                                uniquevalue: emailInput
                            }
                        };
                        return [
                            4,
                            getIdForApp()
                        ];
                    case 2:
                        return [
                            4,
                            insertStamp.apply(void 0, [
                                (_tmp.app_id = _state.sent(), _tmp)
                            ])
                        ];
                    case 3:
                        _state.sent();
                        onClose();
                        fetchStamps();
                        _state.label = 4;
                    case 4:
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
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Sheet, {
        open: open,
        onOpenChange: function(value) {
            if (value === false) {
                onClose();
            }
        }
    }, /*#__PURE__*/ React.createElement(SheetContent, null, /*#__PURE__*/ React.createElement(SheetHeader, null, /*#__PURE__*/ React.createElement(SheetTitle, null, "Email Connect"), /*#__PURE__*/ React.createElement("form", {
        onSubmit: function(e) {
            e.preventDefault();
            if (otpSent) {
                verifyOtp();
            } else {
                sendOtp();
            }
        }
    }, otpSent ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Input, {
        placeholder: "OTP",
        value: otpCode,
        type: "number",
        onChange: function(e) {
            setOtpCode(e.target.value);
        }
    }), /*#__PURE__*/ React.createElement(Button, {
        type: "submit",
        className: "mt-3"
    }, "Verify OTP")) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Input, {
        placeholder: "Email",
        value: emailInput,
        type: "email",
        onChange: function(e) {
            setEmailInput(e.target.value);
        }
    }), /*#__PURE__*/ React.createElement(Button, {
        type: "submit",
        className: "mt-3"
    }, "Send Passcode")))))));
};
