// @ts-nocheck
// loginOptions.js
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
import { useEffect, useState } from 'react';
import { useLogin } from '@lens-protocol/react-web';
import { useProfilesManaged } from '@lens-protocol/react-web';
import { toast } from 'react-toastify';
function LoginAs(param) {
    var profile = param.profile, wallet = param.wallet, onSuccess = param.onSuccess;
    var _profile_handle;
    var _useLogin = useLogin(), execute = _useLogin.execute, loading = _useLogin.loading;
    var login = /*#__PURE__*/ function() {
        var _ref = _async_to_generator(function() {
            var result;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            execute({
                                address: wallet,
                                profileId: profile.id
                            })
                        ];
                    case 1:
                        result = _state.sent();
                        if (result.isSuccess()) {
                            return [
                                2,
                                onSuccess(profile)
                            ];
                        }
                        localStorage.removeItem('lens-loggin');
                        window.alert(result.error.message);
                        return [
                            2
                        ];
                }
            });
        });
        return function login() {
            return _ref.apply(this, arguments);
        };
    }();
    var _profile_handle_fullHandle;
    return /*#__PURE__*/ React.createElement("button", {
        disabled: loading,
        onClick: login
    }, (_profile_handle_fullHandle = (_profile_handle = profile.handle) === null || _profile_handle === void 0 ? void 0 : _profile_handle.fullHandle) !== null && _profile_handle_fullHandle !== void 0 ? _profile_handle_fullHandle : profile.id);
}
export function LoginOptions(param) {
    var wallet = param.wallet, onSuccess = param.onSuccess;
    var _useProfilesManaged = useProfilesManaged({
        for: wallet,
        includeOwned: true
    }), profiles = _useProfilesManaged.data, error = _useProfilesManaged.error, loading = _useProfilesManaged.loading;
    // We'll conditionally load the useDisconnect hook on the client.
    // Initialize disconnect as a no-op.
    var _useState = _sliced_to_array(useState(function() {
        return function() {};
    }), 2), disconnect = _useState[0], setDisconnect = _useState[1];
    useEffect(function() {
        // Only run in the browser
        if (typeof window !== 'undefined') {
            import('wagmi').then(function(module) {
                // Depending on how 'wagmi' exports useDisconnect, you might access it as a named export.
                // This example assumes it is exported named.
                var useDisconnect = module.useDisconnect;
                // Now that we have the hook, we call it.
                // IMPORTANT: Since hooks must be called unconditionally, this still isn’t ideal.
                // One workaround is to force a re-render by storing the disconnect function.
                var _useDisconnect = useDisconnect(), disconnectFn = _useDisconnect.disconnect;
                setDisconnect(function() {
                    return disconnectFn;
                });
            });
        }
    }, []);
    useEffect(function() {
        if (!loading && profiles.length === 0) {
            localStorage.removeItem('lens-loggin');
            disconnect();
            toast.error('No profiles managed by this wallet.');
        }
        if (profiles === null || profiles === void 0 ? void 0 : profiles.length) {
            onSuccess(profiles[0]);
        }
    }, [
        loading,
        profiles,
        onSuccess,
        disconnect
    ]);
    if (loading) {
        return /*#__PURE__*/ React.createElement("p", null, "Loading...");
    }
    if (error) {
        return /*#__PURE__*/ React.createElement("p", null, error);
    }
    if (profiles.length === 0) {
        return /*#__PURE__*/ React.createElement("p", null, "No profiles managed by this wallet.");
    }
    return /*#__PURE__*/ React.createElement("div", null, profiles.map(function(profile) {
        return /*#__PURE__*/ React.createElement(LoginAs, {
            key: profile.id,
            wallet: wallet,
            profile: profile,
            onSuccess: onSuccess
        });
    }));
}
