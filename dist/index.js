// src/index.js
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
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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
import axios from 'axios';
export { CubidWidget } from './src/component/cubidWidget';
export { Provider } from './src/component/providers';
export var CubidSDK = /*#__PURE__*/ function() {
    "use strict";
    function CubidSDK(dapp_id, api_key) {
        _class_call_check(this, CubidSDK);
        _define_property(this, "dapp_id", void 0);
        _define_property(this, "api_key", void 0);
        _define_property(this, "baseUrl", void 0);
        this.dapp_id = dapp_id;
        this.api_key = api_key;
        this.baseUrl = 'https://passport.cubid.me/api/v2';
    }
    _create_class(CubidSDK, [
        {
            key: "makePostRequest",
            value: /**
     * Helper function to make POST HTTP requests.
     * @param {string} endpoint - API endpoint to be called.
     * @param {Object} data - The payload to be sent in the POST request.
     * @returns {Promise<Object>} - The response from the API.
     */ function makePostRequest(endpoint) {
                var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var response, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    axios({
                                        url: "".concat(_this.baseUrl, "/").concat(endpoint),
                                        method: 'POST',
                                        headers: {
                                            'dapp-id': _this.dapp_id,
                                            'api-key': _this.api_key,
                                            'Content-Type': 'application/json'
                                        },
                                        data: data
                                    })
                                ];
                            case 1:
                                response = _state.sent();
                                return [
                                    2,
                                    response.data
                                ];
                            case 2:
                                error = _state.sent();
                                throw new Error("API request to ".concat(endpoint, " failed: ").concat(error.message));
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "fetchApproxLocation",
            value: /**
     * Fetches approximate location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The approximate location data.
     */ function fetchApproxLocation(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_approx_location', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchExactLocation",
            value: /**
     * Fetches exact location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The exact location data.
     */ function fetchExactLocation(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_exact_location', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchIdentity",
            value: /**
     * Fetches identity data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The identity data.
     */ function fetchIdentity(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_identity', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchRoughLocation",
            value: /**
     * Fetches rough location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The rough location data.
     */ function fetchRoughLocation(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_rough_location', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchUserData",
            value: /**
     * Fetches user data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The user data.
     */ function fetchUserData(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('identity/fetch_user_data', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "fetchScore",
            value: /**
     * Fetches the score for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The score data.
     */ function fetchScore(param) {
                var user_id = param.user_id;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('score/fetch_score', {
                                apikey: _this.api_key,
                                user_id: user_id
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "createUser",
            value: /**
     * Creates a new user in the system.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.email - The email of the new user.
     * @param {string} params.phone - The phone number of the new user.
     *  * @param {string} params.evm - The evm address of the new user.
     * @returns {Promise<Object>} - The newly created user data.
     */ function createUser(param) {
                var email = param.email, phone = param.phone, evm = param.evm;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('create_user', {
                                dapp_id: _this.dapp_id,
                                apikey: _this.api_key,
                                email: email,
                                phone: phone,
                                evm: evm
                            })
                        ];
                    });
                })();
            }
        },
        {
            key: "saveSecret",
            value: /**
 * Saves a secret for a user.
 * @param {Object} params - The parameters for the API call.
 * @param {string} params.user_id - The ID of the user.
 * @param {string} params.secret - The secret to be saved.
 * @returns {Promise<Object>} - The success status of the operation.
 */ function saveSecret(param) {
                var user_id = param.user_id, secret = param.secret;
                var _this = this;
                return _async_to_generator(function() {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            _this.makePostRequest('save_secret', {
                                user_id: user_id,
                                api_key: _this.api_key,
                                secret: secret
                            })
                        ];
                    });
                })();
            }
        }
    ]);
    return CubidSDK;
}();
