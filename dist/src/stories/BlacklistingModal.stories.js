// file: CubidBlacklist.stories.tsx
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
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
import React, { useState } from 'react';
// We pull in these styles to match your example, though
// you could remove them if they're not needed:
import 'react-phone-input-2/lib/style.css';
import '@farcaster/auth-kit/styles.css';
import { Provider } from '../component/providers';
import { VerificationModal } from '../component/blackListing';
/**
 * Storybook: Combining everything
 * -------------------------------
 * We wrap VerificationModal in Provider (PropsWithComp),
 * then define three stories (Email, Phone, Wallet).
 */ var PropsWithComp = function(props) {
    return /*#__PURE__*/ React.createElement(Provider, null, /*#__PURE__*/ React.createElement(VerificationModal, _object_spread({
        duplicateInfo: {
            maskedEmail: "asas@gmail.com",
            maskedAddress: "0x712913366F98aa0A5E77EfddA05BaC65C52ae9bD",
            maskedPhone: "+918146851290"
        }
    }, props)));
};
var meta = {
    title: 'Cubid/Blacklist',
    component: PropsWithComp,
    tags: [
        'autodocs'
    ],
    parameters: {
        layout: 'fullscreen'
    }
};
export default meta;
/**
 * Email Story
 */ export var Email = {
    args: {
        type: 'email'
    },
    render: function(args) {
        var _useState = _sliced_to_array(useState(false), 2), isOpen = _useState[0], setIsOpen = _useState[1];
        return /*#__PURE__*/ React.createElement("div", {
            style: {
                padding: 20
            }
        }, /*#__PURE__*/ React.createElement("button", {
            onClick: function() {
                return setIsOpen(true);
            }
        }, "Open Email Modal"), /*#__PURE__*/ React.createElement(PropsWithComp, _object_spread_props(_object_spread({}, args), {
            isOpen: isOpen,
            onClose: function() {
                return setIsOpen(false);
            },
            realInfo: {
                email: "harjaapdhillon.hrizn@gmail.com"
            }
        })));
    }
};
/**
 * Phone Story
 */ export var Phone = {
    args: {
        type: 'phone'
    },
    render: function(args) {
        var _useState = _sliced_to_array(useState(false), 2), isOpen = _useState[0], setIsOpen = _useState[1];
        return /*#__PURE__*/ React.createElement("div", {
            style: {
                padding: 20
            }
        }, /*#__PURE__*/ React.createElement("button", {
            onClick: function() {
                return setIsOpen(true);
            }
        }, "Open Phone Modal"), /*#__PURE__*/ React.createElement(PropsWithComp, _object_spread_props(_object_spread({}, args), {
            isOpen: isOpen,
            onClose: function() {
                return setIsOpen(false);
            },
            realInfo: {
                phone: "+918146851290"
            }
        })));
    }
};
/**
 * Wallet Story
 */ export var Wallet = {
    args: {
        type: 'wallet'
    },
    render: function(args) {
        var _useState = _sliced_to_array(useState(false), 2), isOpen = _useState[0], setIsOpen = _useState[1];
        return /*#__PURE__*/ React.createElement("div", {
            style: {
                padding: 20
            }
        }, /*#__PURE__*/ React.createElement("button", {
            onClick: function() {
                return setIsOpen(true);
            }
        }, "Open Wallet Modal"), /*#__PURE__*/ React.createElement(PropsWithComp, _object_spread_props(_object_spread({}, args), {
            isOpen: isOpen,
            onClose: function() {
                return setIsOpen(false);
            },
            realInfo: {
                phone: "0x712913366F98aa0A5E77EfddA05BaC65C52ae9bD"
            }
        })));
    }
};
