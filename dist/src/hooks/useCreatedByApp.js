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
import { useCallback } from "react";
import axios from "axios";
export var useCreatedByAppId = function() {
    var cubidAppId = 22;
    var adminuid = 'uuid';
    var fetchValidId = useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var _data_dapp_users__dapps, _data_dapp_users_, _data_dapp_users, data;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!adminuid) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        axios.post("/api/allow/fetch_allow_uid", {
                            uid: adminuid
                        })
                    ];
                case 1:
                    data = _state.sent().data;
                    return [
                        2,
                        data === null || data === void 0 ? void 0 : (_data_dapp_users = data.dapp_users) === null || _data_dapp_users === void 0 ? void 0 : (_data_dapp_users_ = _data_dapp_users[0]) === null || _data_dapp_users_ === void 0 ? void 0 : (_data_dapp_users__dapps = _data_dapp_users_.dapps) === null || _data_dapp_users__dapps === void 0 ? void 0 : _data_dapp_users__dapps.id
                    ];
                case 2:
                    return [
                        2
                    ];
            }
        });
    }), [
        adminuid
    ]);
    var getIdForApp = useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var _tmp;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!window.location.href.includes("/allow")) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        fetchValidId()
                    ];
                case 1:
                    _tmp = _state.sent();
                    return [
                        3,
                        3
                    ];
                case 2:
                    _tmp = cubidAppId;
                    _state.label = 3;
                case 3:
                    return [
                        2,
                        _tmp
                    ];
            }
        });
    }), [
        fetchValidId
    ]);
    return {
        getIdForApp: getIdForApp
    };
};
