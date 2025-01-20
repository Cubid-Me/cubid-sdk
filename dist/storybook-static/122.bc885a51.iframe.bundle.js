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
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
(self.webpackChunkcubid_sdk = self.webpackChunkcubid_sdk || []).push([
    [
        122
    ],
    {
        "./node_modules/@storybook/blocks/dist/Color-ERTF36HU.mjs": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            "use strict";
            var c = function c(e, r) {
                if (null == e) return {};
                var t, n, o = {}, a = Object.keys(e);
                for(n = 0; n < a.length; n++)r.indexOf(t = a[n]) >= 0 || (o[t] = e[t]);
                return o;
            };
            var i = function i(e) {
                var t = (0, react.useRef)(e), n = (0, react.useRef)(function(e) {
                    t.current && t.current(e);
                });
                return t.current = e, n.current;
            };
            var Y = function Y(e, t, l) {
                var u = i(l), c = (0, react.useState)(function() {
                    return e.toHsva(t);
                }), s = c[0], f = c[1], v = (0, react.useRef)({
                    color: t,
                    hsva: s
                });
                (0, react.useEffect)(function() {
                    if (!e.equal(t, v.current.color)) {
                        var r = e.toHsva(t);
                        v.current = {
                            hsva: r,
                            color: t
                        }, f(r);
                    }
                }, [
                    t,
                    e
                ]), (0, react.useEffect)(function() {
                    var r;
                    F(s, v.current.hsva) || e.equal(r = e.fromHsva(s), v.current.color) || (v.current = {
                        hsva: s,
                        color: r
                    }, u(r));
                }, [
                    s,
                    e,
                    u
                ]);
                var d = (0, react.useCallback)(function(e) {
                    f(function(r) {
                        return Object.assign({}, r, e);
                    });
                }, []);
                return [
                    s,
                    d
                ];
            };
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                ColorControl: function() {
                    return ColorControl;
                },
                default: function() {
                    return Color_default;
                }
            });
            var chunk_MKV36LKP = __webpack_require__("./node_modules/@storybook/blocks/dist/chunk-MKV36LKP.mjs"), react = __webpack_require__("./node_modules/react/index.js"), components = __webpack_require__("./node_modules/@storybook/core/dist/components/index.js"), theming = __webpack_require__("./node_modules/@storybook/core/dist/theming/index.js"), dist = __webpack_require__("./node_modules/@storybook/icons/dist/index.mjs"), color_convert = __webpack_require__("./node_modules/@storybook/blocks/node_modules/color-convert/index.js"), color_convert_default = __webpack_require__.n(color_convert), debounce = __webpack_require__("./node_modules/lodash/debounce.js"), debounce_default = __webpack_require__.n(debounce);
            function u() {
                return (u = Object.assign || function(e) {
                    for(var r = 1; r < arguments.length; r++){
                        var t = arguments[r];
                        for(var n in t)Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
                    }
                    return e;
                }).apply(this, arguments);
            }
            var s = function s(e, r, t) {
                return void 0 === r && (r = 0), void 0 === t && (t = 1), e > t ? t : e < r ? r : e;
            }, f = function f(e) {
                return "touches" in e;
            }, v = function v(e) {
                return e && e.ownerDocument.defaultView || self;
            }, d = function d(e, r, t) {
                var n = e.getBoundingClientRect(), o = f(r) ? function(e, r) {
                    for(var _$t = 0; _$t < e.length; _$t++)if (e[_$t].identifier === r) return e[_$t];
                    return e[0];
                }(r.touches, t) : r;
                return {
                    left: s((o.pageX - (n.left + v(e).pageXOffset)) / n.width),
                    top: s((o.pageY - (n.top + v(e).pageYOffset)) / n.height)
                };
            }, h = function h(e) {
                !f(e) && e.preventDefault();
            }, m = react.memo(function(o) {
                var a = o.onMove, l = o.onKey, s = c(o, [
                    "onMove",
                    "onKey"
                ]), m = (0, react.useRef)(null), g = i(a), p = i(l), b = (0, react.useRef)(null), _ = (0, react.useRef)(!1), x = (0, react.useMemo)(function() {
                    var e = function e(e) {
                        h(e), (f(e) ? e.touches.length > 0 : e.buttons > 0) && m.current ? g(d(m.current, e, b.current)) : t(!1);
                    }, r = function r() {
                        return t(!1);
                    };
                    function t(t) {
                        var n = _.current, _$o = v(m.current), a = t ? _$o.addEventListener : _$o.removeEventListener;
                        a(n ? "touchmove" : "mousemove", e), a(n ? "touchend" : "mouseup", r);
                    }
                    return [
                        function(e) {
                            var r = e.nativeEvent, n = m.current;
                            if (n && (h(r), !function(e, r) {
                                return r && !f(e);
                            }(r, _.current) && n)) {
                                if (f(r)) {
                                    _.current = !0;
                                    var _$o = r.changedTouches || [];
                                    _$o.length && (b.current = _$o[0].identifier);
                                }
                                n.focus(), g(d(n, r, b.current)), t(!0);
                            }
                        },
                        function(e) {
                            var r = e.which || e.keyCode;
                            r < 37 || r > 40 || (e.preventDefault(), p({
                                left: 39 === r ? .05 : 37 === r ? -.05 : 0,
                                top: 40 === r ? .05 : 38 === r ? -.05 : 0
                            }));
                        },
                        t
                    ];
                }, [
                    p,
                    g
                ]), C = x[0], E = x[1], H = x[2];
                return (0, react.useEffect)(function() {
                    return H;
                }, [
                    H
                ]), react.createElement("div", u({}, s, {
                    onTouchStart: C,
                    onMouseDown: C,
                    className: "react-colorful__interactive",
                    ref: m,
                    onKeyDown: E,
                    tabIndex: 0,
                    role: "slider"
                }));
            }), g = function g(e) {
                return e.filter(Boolean).join(" ");
            }, p = function p(r) {
                var t = r.color, n = r.left, o = r.top, a = void 0 === o ? .5 : o, l = g([
                    "react-colorful__pointer",
                    r.className
                ]);
                return react.createElement("div", {
                    className: l,
                    style: {
                        top: 100 * a + "%",
                        left: 100 * n + "%"
                    }
                }, react.createElement("div", {
                    className: "react-colorful__pointer-fill",
                    style: {
                        backgroundColor: t
                    }
                }));
            }, b = function b(e, r, t) {
                return void 0 === r && (r = 0), void 0 === t && (t = Math.pow(10, r)), Math.round(t * e) / t;
            }, _ = {
                grad: .9,
                turn: 360,
                rad: 360 / (2 * Math.PI)
            }, x = function x(e) {
                return L(C(e));
            }, C = function C(e) {
                return "#" === e[0] && (e = e.substring(1)), e.length < 6 ? {
                    r: parseInt(e[0] + e[0], 16),
                    g: parseInt(e[1] + e[1], 16),
                    b: parseInt(e[2] + e[2], 16),
                    a: 4 === e.length ? b(parseInt(e[3] + e[3], 16) / 255, 2) : 1
                } : {
                    r: parseInt(e.substring(0, 2), 16),
                    g: parseInt(e.substring(2, 4), 16),
                    b: parseInt(e.substring(4, 6), 16),
                    a: 8 === e.length ? b(parseInt(e.substring(6, 8), 16) / 255, 2) : 1
                };
            }, E = function E(e, r) {
                return void 0 === r && (r = "deg"), Number(e) * (_[r] || 1);
            }, H = function H(e) {
                var r = /hsla?\(?\s*(-?\d*\.?\d+)(deg|rad|grad|turn)?[,\s]+(-?\d*\.?\d+)%?[,\s]+(-?\d*\.?\d+)%?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);
                return r ? N({
                    h: E(r[1], r[2]),
                    s: Number(r[3]),
                    l: Number(r[4]),
                    a: void 0 === r[5] ? 1 : Number(r[5]) / (r[6] ? 100 : 1)
                }) : {
                    h: 0,
                    s: 0,
                    v: 0,
                    a: 1
                };
            }, N = function N(e) {
                var r = e.s, t = e.l;
                return {
                    h: e.h,
                    s: (r *= (t < 50 ? t : 100 - t) / 100) > 0 ? 2 * r / (t + r) * 100 : 0,
                    v: t + r,
                    a: e.a
                };
            }, w = function w(e) {
                return K(I(e));
            }, y = function y(e) {
                var r = e.s, t = e.v, n = e.a, o = (200 - r) * t / 100;
                return {
                    h: b(e.h),
                    s: b(o > 0 && o < 200 ? r * t / 100 / (o <= 100 ? o : 200 - o) * 100 : 0),
                    l: b(o / 2),
                    a: b(n, 2)
                };
            }, q = function q(e) {
                var r = y(e);
                return "hsl(" + r.h + ", " + r.s + "%, " + r.l + "%)";
            }, k = function k(e) {
                var r = y(e);
                return "hsla(" + r.h + ", " + r.s + "%, " + r.l + "%, " + r.a + ")";
            }, I = function I(e) {
                var r = e.h, t = e.s, n = e.v, o = e.a;
                r = r / 360 * 6, t /= 100, n /= 100;
                var a = Math.floor(r), l = n * (1 - t), u = n * (1 - (r - a) * t), c = n * (1 - (1 - r + a) * t), i = a % 6;
                return {
                    r: b(255 * [
                        n,
                        u,
                        l,
                        l,
                        c,
                        n
                    ][i]),
                    g: b(255 * [
                        c,
                        n,
                        n,
                        u,
                        l,
                        l
                    ][i]),
                    b: b(255 * [
                        l,
                        l,
                        c,
                        n,
                        n,
                        u
                    ][i]),
                    a: b(o, 2)
                };
            }, z = function z(e) {
                var r = /rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(e);
                return r ? L({
                    r: Number(r[1]) / (r[2] ? 100 / 255 : 1),
                    g: Number(r[3]) / (r[4] ? 100 / 255 : 1),
                    b: Number(r[5]) / (r[6] ? 100 / 255 : 1),
                    a: void 0 === r[7] ? 1 : Number(r[7]) / (r[8] ? 100 : 1)
                }) : {
                    h: 0,
                    s: 0,
                    v: 0,
                    a: 1
                };
            }, D = function D(e) {
                var r = e.toString(16);
                return r.length < 2 ? "0" + r : r;
            }, K = function K(e) {
                var r = e.r, t = e.g, n = e.b, o = e.a, a = o < 1 ? D(b(255 * o)) : "";
                return "#" + D(r) + D(t) + D(n) + a;
            }, L = function L(e) {
                var r = e.r, t = e.g, n = e.b, o = e.a, a = Math.max(r, t, n), l = a - Math.min(r, t, n), u = l ? a === r ? (t - n) / l : a === t ? 2 + (n - r) / l : 4 + (r - t) / l : 0;
                return {
                    h: b(60 * (u < 0 ? u + 6 : u)),
                    s: b(a ? l / a * 100 : 0),
                    v: b(a / 255 * 100),
                    a: o
                };
            }, S = react.memo(function(r) {
                var t = r.hue, n = r.onChange, o = g([
                    "react-colorful__hue",
                    r.className
                ]);
                return react.createElement("div", {
                    className: o
                }, react.createElement(m, {
                    onMove: function onMove(e) {
                        n({
                            h: 360 * e.left
                        });
                    },
                    onKey: function onKey(e) {
                        n({
                            h: s(t + 360 * e.left, 0, 360)
                        });
                    },
                    "aria-label": "Hue",
                    "aria-valuenow": b(t),
                    "aria-valuemax": "360",
                    "aria-valuemin": "0"
                }, react.createElement(p, {
                    className: "react-colorful__hue-pointer",
                    left: t / 360,
                    color: q({
                        h: t,
                        s: 100,
                        v: 100,
                        a: 1
                    })
                })));
            }), T = react.memo(function(r) {
                var t = r.hsva, n = r.onChange, o = {
                    backgroundColor: q({
                        h: t.h,
                        s: 100,
                        v: 100,
                        a: 1
                    })
                };
                return react.createElement("div", {
                    className: "react-colorful__saturation",
                    style: o
                }, react.createElement(m, {
                    onMove: function onMove(e) {
                        n({
                            s: 100 * e.left,
                            v: 100 - 100 * e.top
                        });
                    },
                    onKey: function onKey(e) {
                        n({
                            s: s(t.s + 100 * e.left, 0, 100),
                            v: s(t.v - 100 * e.top, 0, 100)
                        });
                    },
                    "aria-label": "Color",
                    "aria-valuetext": "Saturation " + b(t.s) + "%, Brightness " + b(t.v) + "%"
                }, react.createElement(p, {
                    className: "react-colorful__saturation-pointer",
                    top: 1 - t.v / 100,
                    left: t.s / 100,
                    color: q(t)
                })));
            }), F = function F(e, r) {
                if (e === r) return !0;
                for(var t in e)if (e[t] !== r[t]) return !1;
                return !0;
            }, P = function P(e, r) {
                return e.replace(/\s/g, "") === r.replace(/\s/g, "");
            }, X = function X(e, r) {
                return e.toLowerCase() === r.toLowerCase() || F(C(e), C(r));
            };
            var R, ColorSpace2, V = "undefined" != typeof window ? react.useLayoutEffect : react.useEffect, J = new Map, Q = function Q(e) {
                V(function() {
                    var r = e.current ? e.current.ownerDocument : document;
                    if (void 0 !== r && !J.has(r)) {
                        var t = r.createElement("style");
                        t.innerHTML = '.react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:"";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>\')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}', J.set(r, t);
                        var n = R || __webpack_require__.nc;
                        n && t.setAttribute("nonce", n), r.head.appendChild(t);
                    }
                }, []);
            }, U = function U(t) {
                var n = t.className, o = t.colorModel, a = t.color, l = void 0 === a ? o.defaultColor : a, i = t.onChange, s = c(t, [
                    "className",
                    "colorModel",
                    "color",
                    "onChange"
                ]), f = (0, react.useRef)(null);
                Q(f);
                var v = Y(o, l, i), d = v[0], h = v[1], m = g([
                    "react-colorful",
                    n
                ]);
                return react.createElement("div", u({}, s, {
                    ref: f,
                    className: m
                }), react.createElement(T, {
                    hsva: d,
                    onChange: h
                }), react.createElement(S, {
                    hue: d.h,
                    onChange: h,
                    className: "react-colorful__last-control"
                }));
            }, W = {
                defaultColor: "000",
                toHsva: x,
                fromHsva: function fromHsva(e) {
                    return w({
                        h: e.h,
                        s: e.s,
                        v: e.v,
                        a: 1
                    });
                },
                equal: X
            }, ee = function ee(r) {
                var t = r.className, n = r.hsva, o = r.onChange, a = {
                    backgroundImage: "linear-gradient(90deg, " + k(Object.assign({}, n, {
                        a: 0
                    })) + ", " + k(Object.assign({}, n, {
                        a: 1
                    })) + ")"
                }, l = g([
                    "react-colorful__alpha",
                    t
                ]), u = b(100 * n.a);
                return react.createElement("div", {
                    className: l
                }, react.createElement("div", {
                    className: "react-colorful__alpha-gradient",
                    style: a
                }), react.createElement(m, {
                    onMove: function onMove(e) {
                        o({
                            a: e.left
                        });
                    },
                    onKey: function onKey(e) {
                        o({
                            a: s(n.a + e.left)
                        });
                    },
                    "aria-label": "Alpha",
                    "aria-valuetext": u + "%",
                    "aria-valuenow": u,
                    "aria-valuemin": "0",
                    "aria-valuemax": "100"
                }, react.createElement(p, {
                    className: "react-colorful__alpha-pointer",
                    left: n.a,
                    color: k(n)
                })));
            }, re = function re(t) {
                var n = t.className, o = t.colorModel, a = t.color, l = void 0 === a ? o.defaultColor : a, i = t.onChange, s = c(t, [
                    "className",
                    "colorModel",
                    "color",
                    "onChange"
                ]), f = (0, react.useRef)(null);
                Q(f);
                var v = Y(o, l, i), d = v[0], h = v[1], m = g([
                    "react-colorful",
                    n
                ]);
                return react.createElement("div", u({}, s, {
                    ref: f,
                    className: m
                }), react.createElement(T, {
                    hsva: d,
                    onChange: h
                }), react.createElement(S, {
                    hue: d.h,
                    onChange: h
                }), react.createElement(ee, {
                    hsva: d,
                    onChange: h,
                    className: "react-colorful__last-control"
                }));
            }, le = {
                defaultColor: "hsla(0, 0%, 0%, 1)",
                toHsva: H,
                fromHsva: k,
                equal: P
            }, Ee = {
                defaultColor: "rgba(0, 0, 0, 1)",
                toHsva: z,
                fromHsva: function fromHsva(e) {
                    var r = I(e);
                    return "rgba(" + r.r + ", " + r.g + ", " + r.b + ", " + r.a + ")";
                },
                equal: P
            }, Wrapper = theming.I4.div({
                position: "relative",
                maxWidth: 250,
                '&[aria-readonly="true"]': {
                    opacity: .5
                }
            }), PickerTooltip = (0, theming.I4)(components.kR)({
                position: "absolute",
                zIndex: 1,
                top: 4,
                left: 4,
                "[aria-readonly=true] &": {
                    cursor: "not-allowed"
                }
            }), TooltipContent = theming.I4.div({
                width: 200,
                margin: 5,
                ".react-colorful__saturation": {
                    borderRadius: "4px 4px 0 0"
                },
                ".react-colorful__hue": {
                    boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 5%)"
                },
                ".react-colorful__last-control": {
                    borderRadius: "0 0 4px 4px"
                }
            }), Note = (0, theming.I4)(components._)(function(param) {
                var theme = param.theme;
                return {
                    fontFamily: theme.typography.fonts.base
                };
            }), Swatches = theming.I4.div({
                display: "grid",
                gridTemplateColumns: "repeat(9, 16px)",
                gap: 6,
                padding: 3,
                marginTop: 5,
                width: 200
            }), SwatchColor = theming.I4.div(function(param) {
                var theme = param.theme, active = param.active;
                return {
                    width: 16,
                    height: 16,
                    boxShadow: active ? "".concat(theme.appBorderColor, " 0 0 0 1px inset, ").concat(theme.textMutedColor, "50 0 0 0 4px") : "".concat(theme.appBorderColor, " 0 0 0 1px inset"),
                    borderRadius: theme.appBorderRadius
                };
            }), Swatch = function(_param) {
                var value = _param.value, style = _param.style, props = _object_without_properties(_param, [
                    "value",
                    "style"
                ]);
                var backgroundImage = "linear-gradient(".concat(value, ", ").concat(value, '), url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>\'), linear-gradient(#fff, #fff)');
                return react.createElement(SwatchColor, _object_spread_props(_object_spread({}, props), {
                    style: _object_spread_props(_object_spread({}, style), {
                        backgroundImage: backgroundImage
                    })
                }));
            }, Input = (0, theming.I4)(components.lV.Input)(function(param) {
                var theme = param.theme, readOnly = param.readOnly;
                return {
                    width: "100%",
                    paddingLeft: 30,
                    paddingRight: 30,
                    boxSizing: "border-box",
                    fontFamily: theme.typography.fonts.base
                };
            }), ToggleIcon = (0, theming.I4)(dist.QDE)(function(param) {
                var theme = param.theme;
                return {
                    position: "absolute",
                    zIndex: 1,
                    top: 6,
                    right: 7,
                    width: 20,
                    height: 20,
                    padding: 4,
                    boxSizing: "border-box",
                    cursor: "pointer",
                    color: theme.input.color
                };
            }), ColorSpace = ((ColorSpace2 = ColorSpace || {}).RGB = "rgb", ColorSpace2.HSL = "hsl", ColorSpace2.HEX = "hex", ColorSpace2), COLOR_SPACES = Object.values(ColorSpace), COLOR_REGEXP = /\(([0-9]+),\s*([0-9]+)%?,\s*([0-9]+)%?,?\s*([0-9.]+)?\)/, RGB_REGEXP = /^\s*rgba?\(([0-9]+),\s*([0-9]+),\s*([0-9]+),?\s*([0-9.]+)?\)\s*$/i, HSL_REGEXP = /^\s*hsla?\(([0-9]+),\s*([0-9]+)%,\s*([0-9]+)%,?\s*([0-9.]+)?\)\s*$/i, HEX_REGEXP = /^\s*#?([0-9a-f]{3}|[0-9a-f]{6})\s*$/i, SHORTHEX_REGEXP = /^\s*#?([0-9a-f]{3})\s*$/i, ColorPicker = {
                hex: function hex(r) {
                    return react.createElement(U, u({}, r, {
                        colorModel: W
                    }));
                },
                rgb: function rgb(r) {
                    return react.createElement(re, u({}, r, {
                        colorModel: Ee
                    }));
                },
                hsl: function hsl(r) {
                    return react.createElement(re, u({}, r, {
                        colorModel: le
                    }));
                }
            }, fallbackColor = {
                hex: "transparent",
                rgb: "rgba(0, 0, 0, 0)",
                hsl: "hsla(0, 0%, 0%, 0)"
            }, stringToArgs = function(value) {
                var match = value === null || value === void 0 ? void 0 : value.match(COLOR_REGEXP);
                if (!match) return [
                    0,
                    0,
                    0,
                    1
                ];
                var _match = _sliced_to_array(match, 5), x = _match[1], y = _match[2], z = _match[3], tmp = _match[4], a = tmp === void 0 ? 1 : tmp;
                return [
                    x,
                    y,
                    z,
                    a
                ].map(Number);
            }, parseValue = function(value) {
                if (!value) return;
                var valid = !0;
                if (RGB_REGEXP.test(value)) {
                    var _stringToArgs = _sliced_to_array(stringToArgs(value), 4), r = _stringToArgs[0], g = _stringToArgs[1], b = _stringToArgs[2], a = _stringToArgs[3], _ref = _sliced_to_array(color_convert_default().rgb.hsl([
                        r,
                        g,
                        b
                    ]) || [
                        0,
                        0,
                        0
                    ], 3), h = _ref[0], s = _ref[1], l = _ref[2];
                    return {
                        valid: valid,
                        value: value,
                        keyword: color_convert_default().rgb.keyword([
                            r,
                            g,
                            b
                        ]),
                        colorSpace: "rgb",
                        rgb: value,
                        hsl: "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(a, ")"),
                        hex: "#".concat(color_convert_default().rgb.hex([
                            r,
                            g,
                            b
                        ]).toLowerCase())
                    };
                }
                if (HSL_REGEXP.test(value)) {
                    var _stringToArgs1 = _sliced_to_array(stringToArgs(value), 4), h1 = _stringToArgs1[0], s1 = _stringToArgs1[1], l1 = _stringToArgs1[2], a1 = _stringToArgs1[3], _ref1 = _sliced_to_array(color_convert_default().hsl.rgb([
                        h1,
                        s1,
                        l1
                    ]) || [
                        0,
                        0,
                        0
                    ], 3), r1 = _ref1[0], g1 = _ref1[1], b1 = _ref1[2];
                    return {
                        valid: valid,
                        value: value,
                        keyword: color_convert_default().hsl.keyword([
                            h1,
                            s1,
                            l1
                        ]),
                        colorSpace: "hsl",
                        rgb: "rgba(".concat(r1, ", ").concat(g1, ", ").concat(b1, ", ").concat(a1, ")"),
                        hsl: value,
                        hex: "#".concat(color_convert_default().hsl.hex([
                            h1,
                            s1,
                            l1
                        ]).toLowerCase())
                    };
                }
                var plain = value.replace("#", ""), rgb = color_convert_default().keyword.rgb(plain) || color_convert_default().hex.rgb(plain), hsl = color_convert_default().rgb.hsl(rgb), mapped = value;
                if (/[^#a-f0-9]/i.test(value) ? mapped = plain : HEX_REGEXP.test(value) && (mapped = "#".concat(plain)), mapped.startsWith("#")) valid = HEX_REGEXP.test(mapped);
                else try {
                    color_convert_default().keyword.hex(mapped);
                } catch (e) {
                    valid = !1;
                }
                return {
                    valid: valid,
                    value: mapped,
                    keyword: color_convert_default().rgb.keyword(rgb),
                    colorSpace: "hex",
                    rgb: "rgba(".concat(rgb[0], ", ").concat(rgb[1], ", ").concat(rgb[2], ", 1)"),
                    hsl: "hsla(".concat(hsl[0], ", ").concat(hsl[1], "%, ").concat(hsl[2], "%, 1)"),
                    hex: mapped
                };
            }, useColorInput = function(initialValue, onChange) {
                var _ref = _sliced_to_array((0, react.useState)(initialValue || ""), 2), value = _ref[0], setValue = _ref[1], _ref1 = _sliced_to_array((0, react.useState)(function() {
                    return parseValue(value);
                }), 2), color = _ref1[0], setColor = _ref1[1], _ref2 = _sliced_to_array((0, react.useState)((color === null || color === void 0 ? void 0 : color.colorSpace) || "hex"), 2), colorSpace = _ref2[0], setColorSpace = _ref2[1];
                (0, react.useEffect)(function() {
                    var nextValue = initialValue || "", nextColor = parseValue(nextValue);
                    setValue(nextValue), setColor(nextColor), setColorSpace((nextColor === null || nextColor === void 0 ? void 0 : nextColor.colorSpace) || "hex");
                }, [
                    initialValue
                ]);
                var realValue = (0, react.useMemo)(function() {
                    return (function(value, color, colorSpace) {
                        if (!value || !(color === null || color === void 0 ? void 0 : color.valid)) return fallbackColor[colorSpace];
                        if ("hex" !== colorSpace) return (color === null || color === void 0 ? void 0 : color[colorSpace]) || fallbackColor[colorSpace];
                        if (!color.hex.startsWith("#")) try {
                            return "#".concat(color_convert_default().keyword.hex(color.hex));
                        } catch (e) {
                            return fallbackColor.hex;
                        }
                        var short = color.hex.match(SHORTHEX_REGEXP);
                        if (!short) return HEX_REGEXP.test(color.hex) ? color.hex : fallbackColor.hex;
                        var _short__split = _sliced_to_array(short[1].split(""), 3), r = _short__split[0], g = _short__split[1], b = _short__split[2];
                        return "#".concat(r).concat(r).concat(g).concat(g).concat(b).concat(b);
                    })(value, color, colorSpace).toLowerCase();
                }, [
                    value,
                    color,
                    colorSpace
                ]), updateValue = (0, react.useCallback)(function(update) {
                    var parsed = parseValue(update), v = (parsed === null || parsed === void 0 ? void 0 : parsed.value) || update || "";
                    setValue(v), "" === v && (setColor(void 0), onChange(void 0)), parsed && (setColor(parsed), setColorSpace(parsed.colorSpace), onChange(parsed.value));
                }, [
                    onChange
                ]), cycleColorSpace = (0, react.useCallback)(function() {
                    var next = COLOR_SPACES.indexOf(colorSpace) + 1;
                    next >= COLOR_SPACES.length && (next = 0), setColorSpace(COLOR_SPACES[next]);
                    var update = (color === null || color === void 0 ? void 0 : color[COLOR_SPACES[next]]) || "";
                    setValue(update), onChange(update);
                }, [
                    color,
                    colorSpace,
                    onChange
                ]);
                return {
                    value: value,
                    realValue: realValue,
                    updateValue: updateValue,
                    color: color,
                    colorSpace: colorSpace,
                    cycleColorSpace: cycleColorSpace
                };
            }, id = function(value) {
                return value.replace(/\s*/, "").toLowerCase();
            }, ColorControl = function(param) {
                var name = param.name, initialValue = param.value, onChange = param.onChange, onFocus = param.onFocus, onBlur = param.onBlur, presetColors = param.presetColors, _param_startOpen = param.startOpen, startOpen = _param_startOpen === void 0 ? !1 : _param_startOpen, argType = param.argType;
                var _argType_table;
                var debouncedOnChange = (0, react.useCallback)(debounce_default()(onChange, 200), [
                    onChange
                ]), _useColorInput = useColorInput(initialValue, debouncedOnChange), value = _useColorInput.value, realValue = _useColorInput.realValue, updateValue = _useColorInput.updateValue, color = _useColorInput.color, colorSpace = _useColorInput.colorSpace, cycleColorSpace = _useColorInput.cycleColorSpace, _ref = function(presetColors, currentColor, colorSpace) {
                    var _ref = _sliced_to_array((0, react.useState)((currentColor === null || currentColor === void 0 ? void 0 : currentColor.valid) ? [
                        currentColor
                    ] : []), 2), selectedColors = _ref[0], setSelectedColors = _ref[1];
                    (0, react.useEffect)(function() {
                        void 0 === currentColor && setSelectedColors([]);
                    }, [
                        currentColor
                    ]);
                    var presets = (0, react.useMemo)(function() {
                        return (presetColors || []).map(function(preset) {
                            return "string" == typeof preset ? parseValue(preset) : preset.title ? _object_spread_props(_object_spread({}, parseValue(preset.color)), {
                                keyword: preset.title
                            }) : parseValue(preset.color);
                        }).concat(selectedColors).filter(Boolean).slice(-27);
                    }, [
                        presetColors,
                        selectedColors
                    ]), addPreset = (0, react.useCallback)(function(color) {
                        (color === null || color === void 0 ? void 0 : color.valid) && (presets.some(function(preset) {
                            return id(preset[colorSpace]) === id(color[colorSpace]);
                        }) || setSelectedColors(function(arr) {
                            return arr.concat(color);
                        }));
                    }, [
                        colorSpace,
                        presets
                    ]);
                    return {
                        presets: presets,
                        addPreset: addPreset
                    };
                }(presetColors, color, colorSpace), presets = _ref.presets, addPreset = _ref.addPreset, Picker = ColorPicker[colorSpace], readonly = !!(argType === null || argType === void 0 ? void 0 : (_argType_table = argType.table) === null || _argType_table === void 0 ? void 0 : _argType_table.readonly);
                return react.createElement(Wrapper, {
                    "aria-readonly": readonly
                }, react.createElement(PickerTooltip, {
                    startOpen: startOpen,
                    trigger: readonly ? [
                        null
                    ] : void 0,
                    closeOnOutsideClick: !0,
                    onVisibleChange: function() {
                        return addPreset(color);
                    },
                    tooltip: react.createElement(TooltipContent, null, react.createElement(Picker, {
                        color: "transparent" === realValue ? "#000000" : realValue,
                        onChange: updateValue,
                        onFocus: onFocus,
                        onBlur: onBlur
                    }), presets.length > 0 && react.createElement(Swatches, null, presets.map(function(preset, index) {
                        return react.createElement(components.kR, {
                            key: "".concat(preset.value, "-").concat(index),
                            hasChrome: !1,
                            tooltip: react.createElement(Note, {
                                note: preset.keyword || preset.value
                            })
                        }, react.createElement(Swatch, {
                            value: preset[colorSpace],
                            active: color && id(preset[colorSpace]) === id(color[colorSpace]),
                            onClick: function() {
                                return updateValue(preset.value);
                            }
                        }));
                    })))
                }, react.createElement(Swatch, {
                    value: realValue,
                    style: {
                        margin: 4
                    }
                })), react.createElement(Input, {
                    id: (0, chunk_MKV36LKP.ZA)(name),
                    value: value,
                    onChange: function(e) {
                        return updateValue(e.target.value);
                    },
                    onFocus: function(e) {
                        return e.target.select();
                    },
                    readOnly: readonly,
                    placeholder: "Choose color..."
                }), value ? react.createElement(ToggleIcon, {
                    onClick: cycleColorSpace
                }) : null);
            }, Color_default = ColorControl;
        },
        "./node_modules/@storybook/blocks/node_modules/color-convert/conversions.js": function(module, __unused_webpack_exports, __webpack_require__) {
            var cssKeywords = __webpack_require__("./node_modules/@storybook/blocks/node_modules/color-name/index.js"), reverseKeywords = {};
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = Object.keys(cssKeywords)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var key = _step.value;
                    reverseKeywords[cssKeywords[key]] = key;
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
            var convert = {
                rgb: {
                    channels: 3,
                    labels: "rgb"
                },
                hsl: {
                    channels: 3,
                    labels: "hsl"
                },
                hsv: {
                    channels: 3,
                    labels: "hsv"
                },
                hwb: {
                    channels: 3,
                    labels: "hwb"
                },
                cmyk: {
                    channels: 4,
                    labels: "cmyk"
                },
                xyz: {
                    channels: 3,
                    labels: "xyz"
                },
                lab: {
                    channels: 3,
                    labels: "lab"
                },
                lch: {
                    channels: 3,
                    labels: "lch"
                },
                hex: {
                    channels: 1,
                    labels: [
                        "hex"
                    ]
                },
                keyword: {
                    channels: 1,
                    labels: [
                        "keyword"
                    ]
                },
                ansi16: {
                    channels: 1,
                    labels: [
                        "ansi16"
                    ]
                },
                ansi256: {
                    channels: 1,
                    labels: [
                        "ansi256"
                    ]
                },
                hcg: {
                    channels: 3,
                    labels: [
                        "h",
                        "c",
                        "g"
                    ]
                },
                apple: {
                    channels: 3,
                    labels: [
                        "r16",
                        "g16",
                        "b16"
                    ]
                },
                gray: {
                    channels: 1,
                    labels: [
                        "gray"
                    ]
                }
            };
            module.exports = convert;
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = Object.keys(convert)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var model = _step1.value;
                    if (!("channels" in convert[model])) throw new Error("missing channels property: " + model);
                    if (!("labels" in convert[model])) throw new Error("missing channel labels property: " + model);
                    if (convert[model].labels.length !== convert[model].channels) throw new Error("channel and label counts mismatch: " + model);
                    var _convert_model = convert[model], channels = _convert_model.channels, labels = _convert_model.labels;
                    delete convert[model].channels, delete convert[model].labels, Object.defineProperty(convert[model], "channels", {
                        value: channels
                    }), Object.defineProperty(convert[model], "labels", {
                        value: labels
                    });
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
            convert.rgb.hsl = function(rgb) {
                var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), delta = max - min;
                var h, s;
                max === min ? h = 0 : r === max ? h = (g - b) / delta : g === max ? h = 2 + (b - r) / delta : b === max && (h = 4 + (r - g) / delta), h = Math.min(60 * h, 360), h < 0 && (h += 360);
                var l = (min + max) / 2;
                return s = max === min ? 0 : l <= .5 ? delta / (max + min) : delta / (2 - max - min), [
                    h,
                    100 * s,
                    100 * l
                ];
            }, convert.rgb.hsv = function(rgb) {
                var rdif, gdif, bdif, h, s;
                var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, v = Math.max(r, g, b), diff = v - Math.min(r, g, b), diffc = function diffc(c) {
                    return (v - c) / 6 / diff + .5;
                };
                return 0 === diff ? (h = 0, s = 0) : (s = diff / v, rdif = diffc(r), gdif = diffc(g), bdif = diffc(b), r === v ? h = bdif - gdif : g === v ? h = 1 / 3 + rdif - bdif : b === v && (h = 2 / 3 + gdif - rdif), h < 0 ? h += 1 : h > 1 && (h -= 1)), [
                    360 * h,
                    100 * s,
                    100 * v
                ];
            }, convert.rgb.hwb = function(rgb) {
                var r = rgb[0], g = rgb[1];
                var b = rgb[2];
                var h = convert.rgb.hsl(rgb)[0], w = 1 / 255 * Math.min(r, Math.min(g, b));
                return b = 1 - 1 / 255 * Math.max(r, Math.max(g, b)), [
                    h,
                    100 * w,
                    100 * b
                ];
            }, convert.rgb.cmyk = function(rgb) {
                var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, k = Math.min(1 - r, 1 - g, 1 - b);
                return [
                    100 * ((1 - r - k) / (1 - k) || 0),
                    100 * ((1 - g - k) / (1 - k) || 0),
                    100 * ((1 - b - k) / (1 - k) || 0),
                    100 * k
                ];
            }, convert.rgb.keyword = function(rgb) {
                var reversed = reverseKeywords[rgb];
                if (reversed) return reversed;
                var currentClosestKeyword, currentClosestDistance = 1 / 0;
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                try {
                    for(var _iterator = Object.keys(cssKeywords)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                        var keyword = _step.value;
                        var value = cssKeywords[keyword], distance = (y = value, Math.pow((x = rgb)[0] - y[0], 2) + Math.pow(x[1] - y[1], 2) + Math.pow(x[2] - y[2], 2));
                        distance < currentClosestDistance && (currentClosestDistance = distance, currentClosestKeyword = keyword);
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
                var x, y;
                return currentClosestKeyword;
            }, convert.keyword.rgb = function(keyword) {
                return cssKeywords[keyword];
            }, convert.rgb.xyz = function(rgb) {
                var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
                r = r > .04045 ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92, g = g > .04045 ? Math.pow((g + .055) / 1.055, 2.4) : g / 12.92, b = b > .04045 ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92;
                return [
                    100 * (.4124 * r + .3576 * g + .1805 * b),
                    100 * (.2126 * r + .7152 * g + .0722 * b),
                    100 * (.0193 * r + .1192 * g + .9505 * b)
                ];
            }, convert.rgb.lab = function(rgb) {
                var xyz = convert.rgb.xyz(rgb);
                var x = xyz[0], y = xyz[1], z = xyz[2];
                x /= 95.047, y /= 100, z /= 108.883, x = x > .008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116, y = y > .008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116, z = z > .008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
                return [
                    116 * y - 16,
                    500 * (x - y),
                    200 * (y - z)
                ];
            }, convert.hsl.rgb = function(hsl) {
                var h = hsl[0] / 360, s = hsl[1] / 100, l = hsl[2] / 100;
                var t2, t3, val;
                if (0 === s) return val = 255 * l, [
                    val,
                    val,
                    val
                ];
                t2 = l < .5 ? l * (1 + s) : l + s - l * s;
                var t1 = 2 * l - t2, rgb = [
                    0,
                    0,
                    0
                ];
                for(var i = 0; i < 3; i++)t3 = h + 1 / 3 * -(i - 1), t3 < 0 && t3++, t3 > 1 && t3--, val = 6 * t3 < 1 ? t1 + 6 * (t2 - t1) * t3 : 2 * t3 < 1 ? t2 : 3 * t3 < 2 ? t1 + (t2 - t1) * (2 / 3 - t3) * 6 : t1, rgb[i] = 255 * val;
                return rgb;
            }, convert.hsl.hsv = function(hsl) {
                var h = hsl[0];
                var s = hsl[1] / 100, l = hsl[2] / 100, smin = s;
                var lmin = Math.max(l, .01);
                l *= 2, s *= l <= 1 ? l : 2 - l, smin *= lmin <= 1 ? lmin : 2 - lmin;
                return [
                    h,
                    100 * (0 === l ? 2 * smin / (lmin + smin) : 2 * s / (l + s)),
                    100 * ((l + s) / 2)
                ];
            }, convert.hsv.rgb = function(hsv) {
                var h = hsv[0] / 60, s = hsv[1] / 100;
                var v = hsv[2] / 100;
                var hi = Math.floor(h) % 6, f = h - Math.floor(h), p = 255 * v * (1 - s), q = 255 * v * (1 - s * f), t = 255 * v * (1 - s * (1 - f));
                switch(v *= 255, hi){
                    case 0:
                        return [
                            v,
                            t,
                            p
                        ];
                    case 1:
                        return [
                            q,
                            v,
                            p
                        ];
                    case 2:
                        return [
                            p,
                            v,
                            t
                        ];
                    case 3:
                        return [
                            p,
                            q,
                            v
                        ];
                    case 4:
                        return [
                            t,
                            p,
                            v
                        ];
                    case 5:
                        return [
                            v,
                            p,
                            q
                        ];
                }
            }, convert.hsv.hsl = function(hsv) {
                var h = hsv[0], s = hsv[1] / 100, v = hsv[2] / 100, vmin = Math.max(v, .01);
                var sl, l;
                l = (2 - s) * v;
                var lmin = (2 - s) * vmin;
                return sl = s * vmin, sl /= lmin <= 1 ? lmin : 2 - lmin, sl = sl || 0, l /= 2, [
                    h,
                    100 * sl,
                    100 * l
                ];
            }, convert.hwb.rgb = function(hwb) {
                var h = hwb[0] / 360;
                var wh = hwb[1] / 100, bl = hwb[2] / 100;
                var ratio = wh + bl;
                var f;
                ratio > 1 && (wh /= ratio, bl /= ratio);
                var i = Math.floor(6 * h), v = 1 - bl;
                f = 6 * h - i, 1 & i && (f = 1 - f);
                var n = wh + f * (v - wh);
                var r, g, b;
                switch(i){
                    default:
                    case 6:
                    case 0:
                        r = v, g = n, b = wh;
                        break;
                    case 1:
                        r = n, g = v, b = wh;
                        break;
                    case 2:
                        r = wh, g = v, b = n;
                        break;
                    case 3:
                        r = wh, g = n, b = v;
                        break;
                    case 4:
                        r = n, g = wh, b = v;
                        break;
                    case 5:
                        r = v, g = wh, b = n;
                }
                return [
                    255 * r,
                    255 * g,
                    255 * b
                ];
            }, convert.cmyk.rgb = function(cmyk) {
                var c = cmyk[0] / 100, m = cmyk[1] / 100, y = cmyk[2] / 100, k = cmyk[3] / 100;
                return [
                    255 * (1 - Math.min(1, c * (1 - k) + k)),
                    255 * (1 - Math.min(1, m * (1 - k) + k)),
                    255 * (1 - Math.min(1, y * (1 - k) + k))
                ];
            }, convert.xyz.rgb = function(xyz) {
                var x = xyz[0] / 100, y = xyz[1] / 100, z = xyz[2] / 100;
                var r, g, b;
                return r = 3.2406 * x + -1.5372 * y + -.4986 * z, g = -.9689 * x + 1.8758 * y + .0415 * z, b = .0557 * x + -.204 * y + 1.057 * z, r = r > .0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - .055 : 12.92 * r, g = g > .0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - .055 : 12.92 * g, b = b > .0031308 ? 1.055 * Math.pow(b, 1 / 2.4) - .055 : 12.92 * b, r = Math.min(Math.max(0, r), 1), g = Math.min(Math.max(0, g), 1), b = Math.min(Math.max(0, b), 1), [
                    255 * r,
                    255 * g,
                    255 * b
                ];
            }, convert.xyz.lab = function(xyz) {
                var x = xyz[0], y = xyz[1], z = xyz[2];
                x /= 95.047, y /= 100, z /= 108.883, x = x > .008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116, y = y > .008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116, z = z > .008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
                return [
                    116 * y - 16,
                    500 * (x - y),
                    200 * (y - z)
                ];
            }, convert.lab.xyz = function(lab) {
                var x, y, z;
                y = (lab[0] + 16) / 116, x = lab[1] / 500 + y, z = y - lab[2] / 200;
                var y2 = Math.pow(y, 3), x2 = Math.pow(x, 3), z2 = Math.pow(z, 3);
                return y = y2 > .008856 ? y2 : (y - 16 / 116) / 7.787, x = x2 > .008856 ? x2 : (x - 16 / 116) / 7.787, z = z2 > .008856 ? z2 : (z - 16 / 116) / 7.787, x *= 95.047, y *= 100, z *= 108.883, [
                    x,
                    y,
                    z
                ];
            }, convert.lab.lch = function(lab) {
                var l = lab[0], a = lab[1], b = lab[2];
                var h;
                h = 360 * Math.atan2(b, a) / 2 / Math.PI, h < 0 && (h += 360);
                return [
                    l,
                    Math.sqrt(a * a + b * b),
                    h
                ];
            }, convert.lch.lab = function(lch) {
                var l = lch[0], c = lch[1], hr = lch[2] / 360 * 2 * Math.PI;
                return [
                    l,
                    c * Math.cos(hr),
                    c * Math.sin(hr)
                ];
            }, convert.rgb.ansi16 = function(args) {
                var saturation = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                var _args = _sliced_to_array(args, 3), r = _args[0], g = _args[1], b = _args[2];
                var value = null === saturation ? convert.rgb.hsv(args)[2] : saturation;
                if (value = Math.round(value / 50), 0 === value) return 30;
                var ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
                return 2 === value && (ansi += 60), ansi;
            }, convert.hsv.ansi16 = function(args) {
                return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
            }, convert.rgb.ansi256 = function(args) {
                var r = args[0], g = args[1], b = args[2];
                if (r === g && g === b) return r < 8 ? 16 : r > 248 ? 231 : Math.round((r - 8) / 247 * 24) + 232;
                return 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
            }, convert.ansi16.rgb = function(args) {
                var color = args % 10;
                if (0 === color || 7 === color) return args > 50 && (color += 3.5), color = color / 10.5 * 255, [
                    color,
                    color,
                    color
                ];
                var mult = .5 * (1 + ~~(args > 50));
                return [
                    (1 & color) * mult * 255,
                    (color >> 1 & 1) * mult * 255,
                    (color >> 2 & 1) * mult * 255
                ];
            }, convert.ansi256.rgb = function(args) {
                if (args >= 232) {
                    var c = 10 * (args - 232) + 8;
                    return [
                        c,
                        c,
                        c
                    ];
                }
                var rem;
                args -= 16;
                return [
                    Math.floor(args / 36) / 5 * 255,
                    Math.floor((rem = args % 36) / 6) / 5 * 255,
                    rem % 6 / 5 * 255
                ];
            }, convert.rgb.hex = function(args) {
                var string = (((255 & Math.round(args[0])) << 16) + ((255 & Math.round(args[1])) << 8) + (255 & Math.round(args[2]))).toString(16).toUpperCase();
                return "000000".substring(string.length) + string;
            }, convert.hex.rgb = function(args) {
                var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
                if (!match) return [
                    0,
                    0,
                    0
                ];
                var colorString = match[0];
                3 === match[0].length && (colorString = colorString.split("").map(function(char) {
                    return char + char;
                }).join(""));
                var integer = parseInt(colorString, 16);
                return [
                    integer >> 16 & 255,
                    integer >> 8 & 255,
                    255 & integer
                ];
            }, convert.rgb.hcg = function(rgb) {
                var r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255, max = Math.max(Math.max(r, g), b), min = Math.min(Math.min(r, g), b), chroma = max - min;
                var grayscale, hue;
                return grayscale = chroma < 1 ? min / (1 - chroma) : 0, hue = chroma <= 0 ? 0 : max === r ? (g - b) / chroma % 6 : max === g ? 2 + (b - r) / chroma : 4 + (r - g) / chroma, hue /= 6, hue %= 1, [
                    360 * hue,
                    100 * chroma,
                    100 * grayscale
                ];
            }, convert.hsl.hcg = function(hsl) {
                var s = hsl[1] / 100, l = hsl[2] / 100, c = l < .5 ? 2 * s * l : 2 * s * (1 - l);
                var f = 0;
                return c < 1 && (f = (l - .5 * c) / (1 - c)), [
                    hsl[0],
                    100 * c,
                    100 * f
                ];
            }, convert.hsv.hcg = function(hsv) {
                var s = hsv[1] / 100, v = hsv[2] / 100, c = s * v;
                var f = 0;
                return c < 1 && (f = (v - c) / (1 - c)), [
                    hsv[0],
                    100 * c,
                    100 * f
                ];
            }, convert.hcg.rgb = function(hcg) {
                var h = hcg[0] / 360, c = hcg[1] / 100, g = hcg[2] / 100;
                if (0 === c) return [
                    255 * g,
                    255 * g,
                    255 * g
                ];
                var pure = [
                    0,
                    0,
                    0
                ], hi = h % 1 * 6, v = hi % 1, w = 1 - v;
                var mg = 0;
                switch(Math.floor(hi)){
                    case 0:
                        pure[0] = 1, pure[1] = v, pure[2] = 0;
                        break;
                    case 1:
                        pure[0] = w, pure[1] = 1, pure[2] = 0;
                        break;
                    case 2:
                        pure[0] = 0, pure[1] = 1, pure[2] = v;
                        break;
                    case 3:
                        pure[0] = 0, pure[1] = w, pure[2] = 1;
                        break;
                    case 4:
                        pure[0] = v, pure[1] = 0, pure[2] = 1;
                        break;
                    default:
                        pure[0] = 1, pure[1] = 0, pure[2] = w;
                }
                return mg = (1 - c) * g, [
                    255 * (c * pure[0] + mg),
                    255 * (c * pure[1] + mg),
                    255 * (c * pure[2] + mg)
                ];
            }, convert.hcg.hsv = function(hcg) {
                var c = hcg[1] / 100, v = c + hcg[2] / 100 * (1 - c);
                var f = 0;
                return v > 0 && (f = c / v), [
                    hcg[0],
                    100 * f,
                    100 * v
                ];
            }, convert.hcg.hsl = function(hcg) {
                var c = hcg[1] / 100, l = hcg[2] / 100 * (1 - c) + .5 * c;
                var s = 0;
                return l > 0 && l < .5 ? s = c / (2 * l) : l >= .5 && l < 1 && (s = c / (2 * (1 - l))), [
                    hcg[0],
                    100 * s,
                    100 * l
                ];
            }, convert.hcg.hwb = function(hcg) {
                var c = hcg[1] / 100, v = c + hcg[2] / 100 * (1 - c);
                return [
                    hcg[0],
                    100 * (v - c),
                    100 * (1 - v)
                ];
            }, convert.hwb.hcg = function(hwb) {
                var w = hwb[1] / 100, v = 1 - hwb[2] / 100, c = v - w;
                var g = 0;
                return c < 1 && (g = (v - c) / (1 - c)), [
                    hwb[0],
                    100 * c,
                    100 * g
                ];
            }, convert.apple.rgb = function(apple) {
                return [
                    apple[0] / 65535 * 255,
                    apple[1] / 65535 * 255,
                    apple[2] / 65535 * 255
                ];
            }, convert.rgb.apple = function(rgb) {
                return [
                    rgb[0] / 255 * 65535,
                    rgb[1] / 255 * 65535,
                    rgb[2] / 255 * 65535
                ];
            }, convert.gray.rgb = function(args) {
                return [
                    args[0] / 100 * 255,
                    args[0] / 100 * 255,
                    args[0] / 100 * 255
                ];
            }, convert.gray.hsl = function(args) {
                return [
                    0,
                    0,
                    args[0]
                ];
            }, convert.gray.hsv = convert.gray.hsl, convert.gray.hwb = function(gray) {
                return [
                    0,
                    100,
                    gray[0]
                ];
            }, convert.gray.cmyk = function(gray) {
                return [
                    0,
                    0,
                    0,
                    gray[0]
                ];
            }, convert.gray.lab = function(gray) {
                return [
                    gray[0],
                    0,
                    0
                ];
            }, convert.gray.hex = function(gray) {
                var val = 255 & Math.round(gray[0] / 100 * 255), string = ((val << 16) + (val << 8) + val).toString(16).toUpperCase();
                return "000000".substring(string.length) + string;
            }, convert.rgb.gray = function(rgb) {
                return [
                    (rgb[0] + rgb[1] + rgb[2]) / 3 / 255 * 100
                ];
            };
        },
        "./node_modules/@storybook/blocks/node_modules/color-convert/index.js": function(module, __unused_webpack_exports, __webpack_require__) {
            var conversions = __webpack_require__("./node_modules/@storybook/blocks/node_modules/color-convert/conversions.js"), route = __webpack_require__("./node_modules/@storybook/blocks/node_modules/color-convert/route.js"), convert = {};
            Object.keys(conversions).forEach(function(fromModel) {
                convert[fromModel] = {}, Object.defineProperty(convert[fromModel], "channels", {
                    value: conversions[fromModel].channels
                }), Object.defineProperty(convert[fromModel], "labels", {
                    value: conversions[fromModel].labels
                });
                var routes = route(fromModel);
                Object.keys(routes).forEach(function(toModel) {
                    var fn = routes[toModel];
                    convert[fromModel][toModel] = function wrapRounded(fn) {
                        var wrappedFn = function wrappedFn() {
                            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                                args[_key] = arguments[_key];
                            }
                            var arg0 = args[0];
                            if (null == arg0) return arg0;
                            arg0.length > 1 && (args = arg0);
                            var result = fn(args);
                            if ("object" == (typeof result === "undefined" ? "undefined" : _type_of(result))) for(var len = result.length, i = 0; i < len; i++)result[i] = Math.round(result[i]);
                            return result;
                        };
                        return "conversion" in fn && (wrappedFn.conversion = fn.conversion), wrappedFn;
                    }(fn), convert[fromModel][toModel].raw = function wrapRaw(fn) {
                        var wrappedFn = function wrappedFn() {
                            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                                args[_key] = arguments[_key];
                            }
                            var arg0 = args[0];
                            return null == arg0 ? arg0 : (arg0.length > 1 && (args = arg0), fn(args));
                        };
                        return "conversion" in fn && (wrappedFn.conversion = fn.conversion), wrappedFn;
                    }(fn);
                });
            }), module.exports = convert;
        },
        "./node_modules/@storybook/blocks/node_modules/color-convert/route.js": function(module, __unused_webpack_exports, __webpack_require__) {
            var deriveBFS = function deriveBFS(fromModel) {
                var graph = function buildGraph() {
                    var graph = {}, models = Object.keys(conversions);
                    for(var len = models.length, i = 0; i < len; i++)graph[models[i]] = {
                        distance: -1,
                        parent: null
                    };
                    return graph;
                }(), queue = [
                    fromModel
                ];
                for(graph[fromModel].distance = 0; queue.length;){
                    var current = queue.pop(), adjacents = Object.keys(conversions[current]);
                    for(var len = adjacents.length, i = 0; i < len; i++){
                        var adjacent = adjacents[i], node = graph[adjacent];
                        -1 === node.distance && (node.distance = graph[current].distance + 1, node.parent = current, queue.unshift(adjacent));
                    }
                }
                return graph;
            };
            var link = function link(from, to) {
                return function(args) {
                    return to(from(args));
                };
            };
            var wrapConversion = function wrapConversion(toModel, graph) {
                var path = [
                    graph[toModel].parent,
                    toModel
                ];
                var fn = conversions[graph[toModel].parent][toModel], cur = graph[toModel].parent;
                for(; graph[cur].parent;)path.unshift(graph[cur].parent), fn = link(conversions[graph[cur].parent][cur], fn), cur = graph[cur].parent;
                return fn.conversion = path, fn;
            };
            var conversions = __webpack_require__("./node_modules/@storybook/blocks/node_modules/color-convert/conversions.js");
            module.exports = function(fromModel) {
                var graph = deriveBFS(fromModel), conversion = {}, models = Object.keys(graph);
                for(var len = models.length, i = 0; i < len; i++){
                    var toModel = models[i];
                    null !== graph[toModel].parent && (conversion[toModel] = wrapConversion(toModel, graph));
                }
                return conversion;
            };
        },
        "./node_modules/@storybook/blocks/node_modules/color-name/index.js": function(module) {
            "use strict";
            module.exports = {
                aliceblue: [
                    240,
                    248,
                    255
                ],
                antiquewhite: [
                    250,
                    235,
                    215
                ],
                aqua: [
                    0,
                    255,
                    255
                ],
                aquamarine: [
                    127,
                    255,
                    212
                ],
                azure: [
                    240,
                    255,
                    255
                ],
                beige: [
                    245,
                    245,
                    220
                ],
                bisque: [
                    255,
                    228,
                    196
                ],
                black: [
                    0,
                    0,
                    0
                ],
                blanchedalmond: [
                    255,
                    235,
                    205
                ],
                blue: [
                    0,
                    0,
                    255
                ],
                blueviolet: [
                    138,
                    43,
                    226
                ],
                brown: [
                    165,
                    42,
                    42
                ],
                burlywood: [
                    222,
                    184,
                    135
                ],
                cadetblue: [
                    95,
                    158,
                    160
                ],
                chartreuse: [
                    127,
                    255,
                    0
                ],
                chocolate: [
                    210,
                    105,
                    30
                ],
                coral: [
                    255,
                    127,
                    80
                ],
                cornflowerblue: [
                    100,
                    149,
                    237
                ],
                cornsilk: [
                    255,
                    248,
                    220
                ],
                crimson: [
                    220,
                    20,
                    60
                ],
                cyan: [
                    0,
                    255,
                    255
                ],
                darkblue: [
                    0,
                    0,
                    139
                ],
                darkcyan: [
                    0,
                    139,
                    139
                ],
                darkgoldenrod: [
                    184,
                    134,
                    11
                ],
                darkgray: [
                    169,
                    169,
                    169
                ],
                darkgreen: [
                    0,
                    100,
                    0
                ],
                darkgrey: [
                    169,
                    169,
                    169
                ],
                darkkhaki: [
                    189,
                    183,
                    107
                ],
                darkmagenta: [
                    139,
                    0,
                    139
                ],
                darkolivegreen: [
                    85,
                    107,
                    47
                ],
                darkorange: [
                    255,
                    140,
                    0
                ],
                darkorchid: [
                    153,
                    50,
                    204
                ],
                darkred: [
                    139,
                    0,
                    0
                ],
                darksalmon: [
                    233,
                    150,
                    122
                ],
                darkseagreen: [
                    143,
                    188,
                    143
                ],
                darkslateblue: [
                    72,
                    61,
                    139
                ],
                darkslategray: [
                    47,
                    79,
                    79
                ],
                darkslategrey: [
                    47,
                    79,
                    79
                ],
                darkturquoise: [
                    0,
                    206,
                    209
                ],
                darkviolet: [
                    148,
                    0,
                    211
                ],
                deeppink: [
                    255,
                    20,
                    147
                ],
                deepskyblue: [
                    0,
                    191,
                    255
                ],
                dimgray: [
                    105,
                    105,
                    105
                ],
                dimgrey: [
                    105,
                    105,
                    105
                ],
                dodgerblue: [
                    30,
                    144,
                    255
                ],
                firebrick: [
                    178,
                    34,
                    34
                ],
                floralwhite: [
                    255,
                    250,
                    240
                ],
                forestgreen: [
                    34,
                    139,
                    34
                ],
                fuchsia: [
                    255,
                    0,
                    255
                ],
                gainsboro: [
                    220,
                    220,
                    220
                ],
                ghostwhite: [
                    248,
                    248,
                    255
                ],
                gold: [
                    255,
                    215,
                    0
                ],
                goldenrod: [
                    218,
                    165,
                    32
                ],
                gray: [
                    128,
                    128,
                    128
                ],
                green: [
                    0,
                    128,
                    0
                ],
                greenyellow: [
                    173,
                    255,
                    47
                ],
                grey: [
                    128,
                    128,
                    128
                ],
                honeydew: [
                    240,
                    255,
                    240
                ],
                hotpink: [
                    255,
                    105,
                    180
                ],
                indianred: [
                    205,
                    92,
                    92
                ],
                indigo: [
                    75,
                    0,
                    130
                ],
                ivory: [
                    255,
                    255,
                    240
                ],
                khaki: [
                    240,
                    230,
                    140
                ],
                lavender: [
                    230,
                    230,
                    250
                ],
                lavenderblush: [
                    255,
                    240,
                    245
                ],
                lawngreen: [
                    124,
                    252,
                    0
                ],
                lemonchiffon: [
                    255,
                    250,
                    205
                ],
                lightblue: [
                    173,
                    216,
                    230
                ],
                lightcoral: [
                    240,
                    128,
                    128
                ],
                lightcyan: [
                    224,
                    255,
                    255
                ],
                lightgoldenrodyellow: [
                    250,
                    250,
                    210
                ],
                lightgray: [
                    211,
                    211,
                    211
                ],
                lightgreen: [
                    144,
                    238,
                    144
                ],
                lightgrey: [
                    211,
                    211,
                    211
                ],
                lightpink: [
                    255,
                    182,
                    193
                ],
                lightsalmon: [
                    255,
                    160,
                    122
                ],
                lightseagreen: [
                    32,
                    178,
                    170
                ],
                lightskyblue: [
                    135,
                    206,
                    250
                ],
                lightslategray: [
                    119,
                    136,
                    153
                ],
                lightslategrey: [
                    119,
                    136,
                    153
                ],
                lightsteelblue: [
                    176,
                    196,
                    222
                ],
                lightyellow: [
                    255,
                    255,
                    224
                ],
                lime: [
                    0,
                    255,
                    0
                ],
                limegreen: [
                    50,
                    205,
                    50
                ],
                linen: [
                    250,
                    240,
                    230
                ],
                magenta: [
                    255,
                    0,
                    255
                ],
                maroon: [
                    128,
                    0,
                    0
                ],
                mediumaquamarine: [
                    102,
                    205,
                    170
                ],
                mediumblue: [
                    0,
                    0,
                    205
                ],
                mediumorchid: [
                    186,
                    85,
                    211
                ],
                mediumpurple: [
                    147,
                    112,
                    219
                ],
                mediumseagreen: [
                    60,
                    179,
                    113
                ],
                mediumslateblue: [
                    123,
                    104,
                    238
                ],
                mediumspringgreen: [
                    0,
                    250,
                    154
                ],
                mediumturquoise: [
                    72,
                    209,
                    204
                ],
                mediumvioletred: [
                    199,
                    21,
                    133
                ],
                midnightblue: [
                    25,
                    25,
                    112
                ],
                mintcream: [
                    245,
                    255,
                    250
                ],
                mistyrose: [
                    255,
                    228,
                    225
                ],
                moccasin: [
                    255,
                    228,
                    181
                ],
                navajowhite: [
                    255,
                    222,
                    173
                ],
                navy: [
                    0,
                    0,
                    128
                ],
                oldlace: [
                    253,
                    245,
                    230
                ],
                olive: [
                    128,
                    128,
                    0
                ],
                olivedrab: [
                    107,
                    142,
                    35
                ],
                orange: [
                    255,
                    165,
                    0
                ],
                orangered: [
                    255,
                    69,
                    0
                ],
                orchid: [
                    218,
                    112,
                    214
                ],
                palegoldenrod: [
                    238,
                    232,
                    170
                ],
                palegreen: [
                    152,
                    251,
                    152
                ],
                paleturquoise: [
                    175,
                    238,
                    238
                ],
                palevioletred: [
                    219,
                    112,
                    147
                ],
                papayawhip: [
                    255,
                    239,
                    213
                ],
                peachpuff: [
                    255,
                    218,
                    185
                ],
                peru: [
                    205,
                    133,
                    63
                ],
                pink: [
                    255,
                    192,
                    203
                ],
                plum: [
                    221,
                    160,
                    221
                ],
                powderblue: [
                    176,
                    224,
                    230
                ],
                purple: [
                    128,
                    0,
                    128
                ],
                rebeccapurple: [
                    102,
                    51,
                    153
                ],
                red: [
                    255,
                    0,
                    0
                ],
                rosybrown: [
                    188,
                    143,
                    143
                ],
                royalblue: [
                    65,
                    105,
                    225
                ],
                saddlebrown: [
                    139,
                    69,
                    19
                ],
                salmon: [
                    250,
                    128,
                    114
                ],
                sandybrown: [
                    244,
                    164,
                    96
                ],
                seagreen: [
                    46,
                    139,
                    87
                ],
                seashell: [
                    255,
                    245,
                    238
                ],
                sienna: [
                    160,
                    82,
                    45
                ],
                silver: [
                    192,
                    192,
                    192
                ],
                skyblue: [
                    135,
                    206,
                    235
                ],
                slateblue: [
                    106,
                    90,
                    205
                ],
                slategray: [
                    112,
                    128,
                    144
                ],
                slategrey: [
                    112,
                    128,
                    144
                ],
                snow: [
                    255,
                    250,
                    250
                ],
                springgreen: [
                    0,
                    255,
                    127
                ],
                steelblue: [
                    70,
                    130,
                    180
                ],
                tan: [
                    210,
                    180,
                    140
                ],
                teal: [
                    0,
                    128,
                    128
                ],
                thistle: [
                    216,
                    191,
                    216
                ],
                tomato: [
                    255,
                    99,
                    71
                ],
                turquoise: [
                    64,
                    224,
                    208
                ],
                violet: [
                    238,
                    130,
                    238
                ],
                wheat: [
                    245,
                    222,
                    179
                ],
                white: [
                    255,
                    255,
                    255
                ],
                whitesmoke: [
                    245,
                    245,
                    245
                ],
                yellow: [
                    255,
                    255,
                    0
                ],
                yellowgreen: [
                    154,
                    205,
                    50
                ]
            };
        },
        "./node_modules/lodash/_baseTrim.js": function(module, __unused_webpack_exports, __webpack_require__) {
            var trimmedEndIndex = __webpack_require__("./node_modules/lodash/_trimmedEndIndex.js"), reTrimStart = /^\s+/;
            module.exports = function baseTrim(string) {
                return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
            };
        },
        "./node_modules/lodash/_trimmedEndIndex.js": function(module) {
            var reWhitespace = /\s/;
            module.exports = function trimmedEndIndex(string) {
                for(var index = string.length; index-- && reWhitespace.test(string.charAt(index)););
                return index;
            };
        },
        "./node_modules/lodash/debounce.js": function(module, __unused_webpack_exports, __webpack_require__) {
            var isObject = __webpack_require__("./node_modules/lodash/isObject.js"), now = __webpack_require__("./node_modules/lodash/now.js"), toNumber = __webpack_require__("./node_modules/lodash/toNumber.js"), nativeMax = Math.max, nativeMin = Math.min;
            module.exports = function debounce(func, wait, options) {
                var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = !1, maxing = !1, trailing = !0;
                if ("function" != typeof func) throw new TypeError("Expected a function");
                function invokeFunc(time) {
                    var args = lastArgs, thisArg = lastThis;
                    return lastArgs = lastThis = void 0, lastInvokeTime = time, result = func.apply(thisArg, args);
                }
                function shouldInvoke(time) {
                    var timeSinceLastCall = time - lastCallTime;
                    return void 0 === lastCallTime || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && time - lastInvokeTime >= maxWait;
                }
                function timerExpired() {
                    var time = now();
                    if (shouldInvoke(time)) return trailingEdge(time);
                    timerId = setTimeout(timerExpired, function remainingWait(time) {
                        var timeWaiting = wait - (time - lastCallTime);
                        return maxing ? nativeMin(timeWaiting, maxWait - (time - lastInvokeTime)) : timeWaiting;
                    }(time));
                }
                function trailingEdge(time) {
                    return timerId = void 0, trailing && lastArgs ? invokeFunc(time) : (lastArgs = lastThis = void 0, result);
                }
                function debounced() {
                    var time = now(), isInvoking = shouldInvoke(time);
                    if (lastArgs = arguments, lastThis = this, lastCallTime = time, isInvoking) {
                        if (void 0 === timerId) return function leadingEdge(time) {
                            return lastInvokeTime = time, timerId = setTimeout(timerExpired, wait), leading ? invokeFunc(time) : result;
                        }(lastCallTime);
                        if (maxing) return clearTimeout(timerId), timerId = setTimeout(timerExpired, wait), invokeFunc(lastCallTime);
                    }
                    return void 0 === timerId && (timerId = setTimeout(timerExpired, wait)), result;
                }
                return wait = toNumber(wait) || 0, isObject(options) && (leading = !!options.leading, maxWait = (maxing = "maxWait" in options) ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait, trailing = "trailing" in options ? !!options.trailing : trailing), debounced.cancel = function cancel() {
                    void 0 !== timerId && clearTimeout(timerId), lastInvokeTime = 0, lastArgs = lastCallTime = lastThis = timerId = void 0;
                }, debounced.flush = function flush() {
                    return void 0 === timerId ? result : trailingEdge(now());
                }, debounced;
            };
        },
        "./node_modules/lodash/now.js": function(module, __unused_webpack_exports, __webpack_require__) {
            var root = __webpack_require__("./node_modules/lodash/_root.js");
            module.exports = function() {
                return root.Date.now();
            };
        },
        "./node_modules/lodash/toNumber.js": function(module, __unused_webpack_exports, __webpack_require__) {
            var baseTrim = __webpack_require__("./node_modules/lodash/_baseTrim.js"), isObject = __webpack_require__("./node_modules/lodash/isObject.js"), isSymbol = __webpack_require__("./node_modules/lodash/isSymbol.js"), reIsBadHex = /^[-+]0x[0-9a-f]+$/i, reIsBinary = /^0b[01]+$/i, reIsOctal = /^0o[0-7]+$/i, freeParseInt = parseInt;
            module.exports = function toNumber(value) {
                if ("number" == typeof value) return value;
                if (isSymbol(value)) return NaN;
                if (isObject(value)) {
                    var other = "function" == typeof value.valueOf ? value.valueOf() : value;
                    value = isObject(other) ? other + "" : other;
                }
                if ("string" != typeof value) return 0 === value ? value : +value;
                value = baseTrim(value);
                var isBinary = reIsBinary.test(value);
                return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NaN : +value;
            };
        }
    }
]);
