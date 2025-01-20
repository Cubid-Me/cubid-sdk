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
import { useLogin } from '@lens-protocol/react-web';
import { useProfilesManaged } from '@lens-protocol/react-web';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDisconnect } from 'wagmi';
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
                        localStorage.removeItem("lens-loggin");
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
    console.log({
        wallet: wallet,
        onSuccess: onSuccess
    });
    var _useProfilesManaged = useProfilesManaged({
        for: wallet,
        includeOwned: true
    }), profiles = _useProfilesManaged.data, error = _useProfilesManaged.error, loading = _useProfilesManaged.loading;
    var disconnect = useDisconnect().disconnect;
    console.log({
        profiles: profiles
    });
    useEffect(function() {
        if (!loading && profiles.length === 0) {
            localStorage.removeItem("lens-loggin");
            disconnect();
            toast.error("No profiles managed by this wallet.");
        }
        if ((profiles === null || profiles === void 0 ? void 0 : profiles.length) !== 0) {
            onSuccess(profiles === null || profiles === void 0 ? void 0 : profiles[0]);
        }
    }, [
        loading,
        profiles,
        onSuccess
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
