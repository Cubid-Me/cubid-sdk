// @ts-nocheck
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
import React, { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { useCreatedByAppId } from "@/hooks/useCreatedByApp";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { insertStamp } from "@/lib/stampInsertion";
var redirectUri = "https://passport.cubid.me/app/";
var InstagramAuth = function(param) {
    var allowPage = param.allowPage;
    var handleLogin = function() {
        var clientId = "328555189879651";
        if (allowPage) {
            localStorage.setItem("allow_url", window.location.href.replace("".concat(window.location.origin, "/allow?"), ""));
        }
        window.location.href = "https://api.instagram.com/oauth/authorize?client_id=".concat(clientId, "&redirect_uri=").concat(redirectUri, "&scope=user_profile&response_type=code");
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: "py-2"
    }, /*#__PURE__*/ React.createElement(Button, {
        variant: "default",
        onClick: handleLogin
    }, "Login with Instagram"));
};
export var InstagramConnect = function(param) {
    var open = param.open, onClose = param.onClose, onOpen = param.onOpen, fetchStamps = param.fetchStamps, appId = param.appId, allowPage = param.allowPage;
    var searchParams = useSearchParams();
    var authData = useAuth({
        appId: appId
    });
    var router = useRouter();
    var getIdForApp = useCreatedByAppId().getIdForApp;
    var fetchData = useCallback(/*#__PURE__*/ function() {
        var _ref = _async_to_generator(function(code_fixes) {
            var email, _ref, _ref_data, user_id, data, allData, dbUser, _tmp;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            authData.getUser()
                        ];
                    case 1:
                        email = _state.sent().email;
                        console.log(email);
                        if (!(typeof email === "string")) return [
                            3,
                            6
                        ];
                        return [
                            4,
                            axios.post("/api/insta-data-fetch", {
                                code: code_fixes,
                                redirectUri: redirectUri,
                                email: email
                            })
                        ];
                    case 2:
                        _ref = _state.sent(), _ref_data = _ref.data, user_id = _ref_data.user_id, data = _ref_data.data;
                        allData = data;
                        if (!user_id) return [
                            3,
                            6
                        ];
                        return [
                            4,
                            authData.getUser()
                        ];
                    case 3:
                        dbUser = _state.sent();
                        _tmp = {
                            stamp_type: 'instagram',
                            user_data: {
                                user_id: dbUser === null || dbUser === void 0 ? void 0 : dbUser.id,
                                uuid: ""
                            },
                            stampData: {
                                identity: allData.username,
                                uniquevalue: allData.id
                            }
                        };
                        return [
                            4,
                            getIdForApp()
                        ];
                    case 4:
                        return [
                            4,
                            insertStamp.apply(void 0, [
                                (_tmp.app_id = _state.sent(), _tmp)
                            ])
                        ];
                    case 5:
                        _state.sent();
                        fetchStamps();
                        _state.label = 6;
                    case 6:
                        return [
                            2
                        ];
                }
            });
        });
        return function(code_fixes) {
            return _ref.apply(this, arguments);
        };
    }(), [
        authData,
        fetchStamps,
        getIdForApp
    ]);
    useEffect(function() {
        ;
        _async_to_generator(function() {
            var code;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        code = searchParams === null || searchParams === void 0 ? void 0 : searchParams.get("code");
                        if (!code) return [
                            3,
                            2
                        ];
                        return [
                            4,
                            fetchData(code)
                        ];
                    case 1:
                        _state.sent();
                        _state.label = 2;
                    case 2:
                        return [
                            2
                        ];
                }
            });
        })();
    }, [
        onOpen,
        searchParams,
        fetchData
    ]);
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(Sheet, {
        open: open,
        onOpenChange: function(value) {
            if (value === false) {
                onClose();
            }
        }
    }, /*#__PURE__*/ React.createElement(SheetContent, null, /*#__PURE__*/ React.createElement(SheetHeader, null, /*#__PURE__*/ React.createElement(SheetTitle, null, "Connect Instagram"), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement(InstagramAuth, {
        allowPage: allowPage
    }))))));
};
