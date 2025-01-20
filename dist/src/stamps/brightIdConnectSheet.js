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
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
export var BrightIdConnectSheet = function(param) {
    var modalOpen = param.modalOpen, closeModal = param.closeModal, email = param.email;
    var _useState = _sliced_to_array(useState(), 2), brightIdData = _useState[0], setBrightIdData = _useState[1];
    var getUser = useAuth({}).getUser;
    var fetchUserData = useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var user, _ref, data;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!email) return [
                        3,
                        3
                    ];
                    return [
                        4,
                        getUser()
                    ];
                case 1:
                    user = _state.sent();
                    if (!(user === null || user === void 0 ? void 0 : user.id)) return [
                        3,
                        3
                    ];
                    return [
                        4,
                        axios.post("/api/supabase/select", {
                            match: {
                                created_by_user_id: user.id,
                                stamptype: 8
                            },
                            table: "stamps"
                        })
                    ];
                case 2:
                    _ref = _state.sent(), data = _ref.data.data;
                    if (data === null || data === void 0 ? void 0 : data[0]) {
                        setBrightIdData === null || setBrightIdData === void 0 ? void 0 : setBrightIdData(data[0]);
                    }
                    return [
                        2,
                        data === null || data === void 0 ? void 0 : data[0]
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    }), [
        email,
        getUser
    ]);
    useEffect(function() {
        fetchUserData();
    }, [
        fetchUserData
    ]);
    useEffect(function() {
        var interval;
        if (modalOpen) {
            interval = setInterval(/*#__PURE__*/ _async_to_generator(function() {
                var allUserData;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            return [
                                4,
                                fetchUserData()
                            ];
                        case 1:
                            allUserData = _state.sent();
                            if (allUserData) {
                                closeModal();
                                window.location.reload();
                            }
                            return [
                                2
                            ];
                    }
                });
            }), 1000);
        } else {
            clearInterval(interval);
        }
        return function() {
            clearInterval(interval);
        };
    }, [
        modalOpen,
        fetchUserData,
        closeModal
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Sheet, {
        open: modalOpen,
        onOpenChange: function(value) {
            if (value === false) {
                closeModal();
            }
        }
    }, /*#__PURE__*/ React.createElement(SheetContent, null, /*#__PURE__*/ React.createElement(SheetHeader, null, /*#__PURE__*/ React.createElement(SheetTitle, null, "Connect to BrightId"), /*#__PURE__*/ React.createElement("div", null, modalOpen && /*#__PURE__*/ React.createElement("iframe", {
        style: {
            width: "100%",
            height: 1000,
            borderRadius: 10,
            marginTop: 10
        },
        src: "https://aura-new-beta.vercel.app/?email=".concat(email)
    }))))));
};
