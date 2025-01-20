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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
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
import axios from "axios";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import { Button } from "../component/button";
import { Input } from "../component/input";
export var LocationSearchPanel = function(param) {
    var open = param.open, onClose = param.onClose, apikey = param.apikey, page_id = param.page_id, uuid = param.uuid, fetchStamps = param.fetchStamps;
    var _React_useState = _sliced_to_array(React.useState(""), 2), locationInput = _React_useState[0], setLocationInput = _React_useState[1];
    var _React_useState1 = _sliced_to_array(React.useState([]), 2), allLocations = _React_useState1[0], setAllLocations = _React_useState1[1];
    var _React_useState2 = _sliced_to_array(React.useState(null), 2), selectedLocation = _React_useState2[0], setSelectedLocation = _React_useState2[1];
    // Debounced function for location search
    var handleLocationSearch = debounce(/*#__PURE__*/ function() {
        var _ref = _async_to_generator(function(input) {
            var response, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        setSelectedLocation(null);
                        if (!(input.length >= 2)) return [
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
                            axios.post("https://passport.cubid.me/api/v2/search-location", {
                                location_input: input,
                                apikey: apikey
                            })
                        ];
                    case 2:
                        response = _state.sent();
                        setAllLocations(response.data);
                        return [
                            3,
                            4
                        ];
                    case 3:
                        error = _state.sent();
                        toast.error("Error fetching locations.");
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
        });
        return function(input) {
            return _ref.apply(this, arguments);
        };
    }(), 500);
    var handleLocationChange = function(e) {
        setLocationInput(e.target.value);
        handleLocationSearch(e.target.value);
    };
    if (!open) return null; // Render nothing if the modal is not open
    return /*#__PURE__*/ React.createElement("div", {
        style: {
            backgroundColor: "#000000AB",
            zIndex: 1000
        },
        className: "fixed inset-0 flex items-center justify-center"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "bg-white rounded-xl shadow-lg overflow-hidden max-w-sm w-full p-6"
    }, /*#__PURE__*/ React.createElement("h2", {
        className: "text-2xl font-bold text-gray-800 mb-4"
    }, "Location Search"), /*#__PURE__*/ React.createElement("p", {
        className: "mt-2 text-gray-600"
    }, /*#__PURE__*/ React.createElement(Input, {
        placeholder: "Search and select home or work address",
        value: locationInput,
        style: {
            backgroundColor: "white",
            color: "black"
        },
        onChange: handleLocationChange,
        className: "mt-4 w-full border border-gray-300 rounded-lg p-2 shadow focus:outline-none focus:shadow-outline"
    })), /*#__PURE__*/ React.createElement("div", {
        className: "h-[200px] overflow-y-auto mt-3"
    }, allLocations.map(function(item) {
        return /*#__PURE__*/ React.createElement("div", {
            key: item.name,
            onClick: function() {
                setLocationInput(item.formatted_address);
                setSelectedLocation(item);
            },
            style: {
                color: "black"
            },
            className: "cursor-pointer pb-2 ".concat((selectedLocation === null || selectedLocation === void 0 ? void 0 : selectedLocation.formatted_address) === item.formatted_address ? "font-bold" : "")
        }, item.formatted_address);
    })), /*#__PURE__*/ React.createElement("div", {
        className: "flex justify-between space-x-4 mt-4"
    }, /*#__PURE__*/ React.createElement(Button, {
        onClick: onClose,
        style: {
            borderRadius: 10
        },
        className: "bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
    }, "Cancel"), /*#__PURE__*/ React.createElement(Button, {
        onClick: /*#__PURE__*/ _async_to_generator(function() {
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        return [
                            4,
                            axios.post('https://passport.cubid.me/api/v2/identity/add_stamp', {
                                page_id: page_id,
                                stamp_type: "address",
                                stampData: _object_spread({
                                    uniquevalue: "".concat(uuid, "-").concat(selectedLocation === null || selectedLocation === void 0 ? void 0 : selectedLocation.formatted_address),
                                    identity: selectedLocation === null || selectedLocation === void 0 ? void 0 : selectedLocation.formatted_address
                                }, selectedLocation),
                                user_data: {
                                    uuid: uuid
                                }
                            })
                        ];
                    case 1:
                        _state.sent();
                        fetchStamps();
                        onClose();
                        return [
                            2
                        ];
                }
            });
        }),
        style: {
            borderRadius: 10
        },
        disabled: !Boolean(selectedLocation),
        className: "bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-md"
    }, "Save Location"))));
};
