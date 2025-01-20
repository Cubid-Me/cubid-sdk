// @ts-nocheck
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
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
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
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
import React from 'react';
import { Stamps } from '../stamps/index';
import axios from 'axios';
var stampsWithId = {
    facebook: 1,
    github: 2,
    google: 3,
    twitter: 4,
    discord: 5,
    poh: 6,
    iah: 7,
    brightid: 8,
    gitcoin: 9,
    instagram: 10,
    phone: 11,
    gooddollar: 12,
    "near-wallet": 15,
    fractal: 17,
    evm: 14,
    email: 13,
    solana: 53,
    telegram: 27,
    worldcoin: 26,
    near: 15,
    "lens-protocol": 66,
    'farcaster': 68
};
/**
 * A simple React widget for the Cubid SDK.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the widget.
 */ export var CubidWidget = function(param) {
    var stampToRender = param.stampToRender, uuid = param.uuid, page_id = param.page_id, api_key = param.api_key, onStampChange = param.onStampChange, onBlacklistVerify = param.onBlacklistVerify;
    var _allStamps_filter;
    var _React_useState = _sliced_to_array(React.useState([]), 2), allStamps = _React_useState[0], setAllStamps = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(), 2), user_email = _React_useState1[0], setUserEmail = _React_useState1[1];
    var fetchStampData = React.useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var _ref, _ref_data, dbData, email, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!uuid) return [
                        3,
                        4
                    ];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        axios.post("https://passport.cubid.me/api/v2/identity/fetch_stamps", {
                            user_id: uuid,
                            apikey: api_key,
                            page_id: page_id
                        })
                    ];
                case 2:
                    _ref = _state.sent(), _ref_data = _ref.data, dbData = _ref_data.all_stamps, email = _ref_data.email;
                    setUserEmail(email);
                    setAllStamps(dbData);
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    console.error("Error fetching stamps:", error);
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    }), [
        uuid,
        api_key,
        page_id
    ]);
    React.useEffect(function() {
        fetchStampData();
    }, [
        fetchStampData
    ]);
    var showAllowCreds = (_allStamps_filter = allStamps.filter(function(item) {
        return !item.permAvailable && stampsWithId[stampToRender] === item.stamptype;
    })) === null || _allStamps_filter === void 0 ? void 0 : _allStamps_filter[0];
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        className: "p-3"
    }, /*#__PURE__*/ React.createElement(Stamps, {
        allStampIds: _to_consumable_array(allStamps.filter(function(item) {
            return item.stamptype == stampsWithId[stampToRender];
        })).map(function(item) {
            return item.id;
        }),
        refresh: fetchStampData,
        email: user_email,
        onBlacklistVerify: onBlacklistVerify,
        stampToRender: stampToRender,
        uuid: uuid,
        onStampChange: onStampChange,
        page_id: page_id,
        api_key: api_key,
        showAllowCreds: showAllowCreds
    })));
};
export var CubidWidgetCollection = function(param) {
    var stampToRender = param.stampToRender, uuid = param.uuid, page_id = param.page_id, api_key = param.api_key, onStampChange = param.onStampChange;
    var _React_useState = _sliced_to_array(React.useState([]), 2), allStamps = _React_useState[0], setAllStamps = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState(), 2), user_email = _React_useState1[0], setUserEmail = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(React.useState(false), 2), showAllowCreds = _React_useState2[0], setShowAllowCreds = _React_useState2[1];
    var fetchStampData = React.useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var _ref, _ref_data, dbData, email, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!uuid) return [
                        3,
                        4
                    ];
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        axios.post("https://passport.cubid.me/api/v2/identity/fetch_stamps", {
                            user_id: uuid,
                            apikey: api_key,
                            page_id: page_id
                        })
                    ];
                case 2:
                    _ref = _state.sent(), _ref_data = _ref.data, dbData = _ref_data.all_stamps, email = _ref_data.email;
                    setUserEmail(email);
                    setAllStamps(dbData);
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    console.error("Error fetching stamps:", error);
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    }), [
        uuid,
        api_key,
        page_id
    ]);
    React.useEffect(function() {
        fetchStampData();
    }, [
        fetchStampData
    ]);
    React.useEffect(function() {
        stampToRender.map(function(_) {
            var _allStamps_filter;
            var showAllowCreds = (_allStamps_filter = allStamps.filter(function(item) {
                return !item.permAvailable && stampsWithId[_] === item.stamptype;
            })) === null || _allStamps_filter === void 0 ? void 0 : _allStamps_filter[0];
            setShowAllowCreds(Boolean(showAllowCreds));
        });
    }, [
        allStamps
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        className: "grid md:grid-cols-3 px-3 gap-4 grid-cols-1"
    }, stampToRender.map(function(item) {
        return /*#__PURE__*/ React.createElement(CubidWidget, {
            onStampChange: onStampChange,
            stampToRender: item,
            uuid: uuid,
            page_id: page_id,
            api_key: api_key
        });
    }));
};
