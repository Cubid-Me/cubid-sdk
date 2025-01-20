// @ts-nocheck
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
import React, { useState } from "react";
export var InfoTooltip = function(param) {
    var content = param.content;
    var _useState = _sliced_to_array(useState(false), 2), visible = _useState[0], setVisible = _useState[1];
    var styles = {
        container: {
            position: "relative",
            display: "inline-block",
            cursor: "pointer"
        },
        icon: {
            fontSize: "20px",
            color: "red",
            border: "1px solid red",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none"
        },
        tooltip: {
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            whiteSpace: "nowrap",
            zIndex: 10,
            display: visible ? "block" : "none"
        },
        tooltipArrow: _define_property({
            position: "absolute",
            top: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "10px",
            backgroundColor: "#fff",
            borderLeft: "1px solid #ddd",
            borderTop: "1px solid #ddd",
            transformOrigin: "center"
        }, "transform", "translateX(-50%) rotate(45deg)")
    };
    return /*#__PURE__*/ React.createElement("div", {
        style: styles.container,
        onMouseEnter: function() {
            return setVisible(true);
        },
        onMouseLeave: function() {
            return setVisible(false);
        },
        onClick: function() {
            return setVisible(!visible);
        }
    }, /*#__PURE__*/ React.createElement("div", {
        style: styles.icon
    }, "i"), /*#__PURE__*/ React.createElement("div", {
        style: styles.tooltip
    }, /*#__PURE__*/ React.createElement("div", {
        style: styles.tooltipArrow
    }), content));
};
