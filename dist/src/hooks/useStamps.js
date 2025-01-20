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
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";
export var useStamps = function(param) {
    var user = param.user;
    var _useState = _sliced_to_array(useState([]), 2), stamps = _useState[0], setStamps = _useState[1];
    var _useState1 = _sliced_to_array(useState(0), 2), gitcoinScore = _useState1[0], setGitcoinScore = _useState1[1];
    var supabaseUser = useAuth().supabaseUser;
    var fetchNearAndGitcoinStamps = useCallback(/*#__PURE__*/ _async_to_generator(function() {
        var _gitcoin_data__stamp_json_stamps, _gitcoin_data__stamp_json, _gitcoin_data_, _gitcoin_data__stamp_json_scores, _gitcoin_data__stamp_json1, _gitcoin_data_1, _ref, _ref_data, gitcoin_data, _gitcoin_data__stamp_json_stamps_items, gitcoinStamps, _gitcoin_data__stamp_json_scores_score;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!(supabaseUser === null || supabaseUser === void 0 ? void 0 : supabaseUser.id)) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        axios.post("/api/supabase/select", {
                            match: {
                                created_by_user_id: user ? user === null || user === void 0 ? void 0 : user.id : supabaseUser.id,
                                stamptype: 9
                            },
                            table: "stamps"
                        })
                    ];
                case 1:
                    _ref = _state.sent(), _ref_data = _ref.data, gitcoin_data = _ref_data.data;
                    gitcoinStamps = (_gitcoin_data__stamp_json_stamps_items = gitcoin_data === null || gitcoin_data === void 0 ? void 0 : (_gitcoin_data_ = gitcoin_data[0]) === null || _gitcoin_data_ === void 0 ? void 0 : (_gitcoin_data__stamp_json = _gitcoin_data_.stamp_json) === null || _gitcoin_data__stamp_json === void 0 ? void 0 : (_gitcoin_data__stamp_json_stamps = _gitcoin_data__stamp_json.stamps) === null || _gitcoin_data__stamp_json_stamps === void 0 ? void 0 : _gitcoin_data__stamp_json_stamps.items) !== null && _gitcoin_data__stamp_json_stamps_items !== void 0 ? _gitcoin_data__stamp_json_stamps_items : [];
                    setStamps(gitcoinStamps);
                    setGitcoinScore(Math.round((_gitcoin_data__stamp_json_scores_score = gitcoin_data === null || gitcoin_data === void 0 ? void 0 : (_gitcoin_data_1 = gitcoin_data[0]) === null || _gitcoin_data_1 === void 0 ? void 0 : (_gitcoin_data__stamp_json1 = _gitcoin_data_1.stamp_json) === null || _gitcoin_data__stamp_json1 === void 0 ? void 0 : (_gitcoin_data__stamp_json_scores = _gitcoin_data__stamp_json1.scores) === null || _gitcoin_data__stamp_json_scores === void 0 ? void 0 : _gitcoin_data__stamp_json_scores.score) !== null && _gitcoin_data__stamp_json_scores_score !== void 0 ? _gitcoin_data__stamp_json_scores_score : 0));
                    _state.label = 2;
                case 2:
                    return [
                        2
                    ];
            }
        });
    }), [
        supabaseUser,
        user
    ]);
    useEffect(function() {
        fetchNearAndGitcoinStamps();
    }, [
        fetchNearAndGitcoinStamps
    ]);
    var stampCollector = useMemo(function() {
        var stampDataArray = [];
        var counter = 0;
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = stamps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var i = _step.value;
                var _i_metadata_platform, _i_metadata, _i_metadata_platform1, _i_metadata1;
                var st = {
                    id: counter,
                    stamp: i === null || i === void 0 ? void 0 : (_i_metadata = i.metadata) === null || _i_metadata === void 0 ? void 0 : (_i_metadata_platform = _i_metadata.platform) === null || _i_metadata_platform === void 0 ? void 0 : _i_metadata_platform.id,
                    icon: i === null || i === void 0 ? void 0 : (_i_metadata1 = i.metadata) === null || _i_metadata1 === void 0 ? void 0 : (_i_metadata_platform1 = _i_metadata1.platform) === null || _i_metadata_platform1 === void 0 ? void 0 : _i_metadata_platform1.icon
                };
                stampDataArray.push(st);
                counter += 1;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        return stampDataArray;
    }, [
        stamps
    ]);
    return {
        stamps: stamps,
        stampCollector: stampCollector,
        fetchNearAndGitcoinStamps: fetchNearAndGitcoinStamps,
        gitcoinScore: gitcoinScore
    };
};
