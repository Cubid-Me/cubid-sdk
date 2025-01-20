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
        var self1 = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self1, args);
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
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
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
try {
    (function() {
        var _FEATURES;
        var he = Object.create;
        var J = Object.defineProperty;
        var me = Object.getOwnPropertyDescriptor;
        var fe = Object.getOwnPropertyNames;
        var ge = Object.getPrototypeOf, we = Object.prototype.hasOwnProperty;
        var O = function(e) {
            return (typeof require === "undefined" ? "undefined" : _type_of(require)) < "u" ? require : (typeof Proxy === "undefined" ? "undefined" : _type_of(Proxy)) < "u" ? new Proxy(e, {
                get: function(t, a) {
                    return ((typeof require === "undefined" ? "undefined" : _type_of(require)) < "u" ? require : t)[a];
                }
            }) : e;
        }(function(e) {
            if ((typeof require === "undefined" ? "undefined" : _type_of(require)) < "u") return require.apply(this, arguments);
            throw Error('Dynamic require of "' + e + '" is not supported');
        });
        var N = function(e, t) {
            return function() {
                return e && (t = e(e = 0)), t;
            };
        };
        var be = function(e, t) {
            return function() {
                return t || e((t = {
                    exports: {}
                }).exports, t), t.exports;
            };
        };
        var ye = function(e, t, a, s) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            if (t && (typeof t === "undefined" ? "undefined" : _type_of(t)) == "object" || typeof t == "function") try {
                var _loop = function() {
                    var c = _step.value;
                    !we.call(e, c) && c !== a && J(e, c, {
                        get: function() {
                            return t[c];
                        },
                        enumerable: !(s = me(t, c)) || s.enumerable
                    });
                };
                for(var _iterator = fe(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
            return e;
        };
        var Se = function(e, t, a) {
            return a = e != null ? he(ge(e)) : {}, ye(t || !e || !e.__esModule ? J(a, "default", {
                value: e,
                enumerable: !0
            }) : a, e);
        };
        var f = N(function() {});
        var g = N(function() {});
        var w = N(function() {});
        var le = be(function(ce, Z) {
            f();
            g();
            w();
            (function(e) {
                if ((typeof ce === "undefined" ? "undefined" : _type_of(ce)) == "object" && (typeof Z === "undefined" ? "undefined" : _type_of(Z)) < "u") Z.exports = e();
                else if (typeof define == "function" && define.amd) define([], e);
                else {
                    var t;
                    (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" || (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" ? t = window : (typeof self === "undefined" ? "undefined" : _type_of(self)) < "u" ? t = self : t = this, t.memoizerific = e();
                }
            })(function() {
                var _$e, t, a;
                return (function s(c, b, p) {
                    function o(n, d) {
                        if (!b[n]) {
                            if (!c[n]) {
                                var r = typeof O == "function" && O;
                                if (!d && r) return r(n, !0);
                                if (i) return i(n, !0);
                                var u = new Error("Cannot find module '" + n + "'");
                                throw u.code = "MODULE_NOT_FOUND", u;
                            }
                            var I = b[n] = {
                                exports: {}
                            };
                            c[n][0].call(I.exports, function(m) {
                                var y = c[n][1][m];
                                return o(y || m);
                            }, I, I.exports, s, c, b, p);
                        }
                        return b[n].exports;
                    }
                    for(var i = typeof O == "function" && O, h = 0; h < p.length; h++)o(p[h]);
                    return o;
                })({
                    1: [
                        function(s, c, b) {
                            c.exports = function(p) {
                                if (typeof Map != "function" || p) {
                                    var o = s("./similar");
                                    return new o;
                                } else return new Map;
                            };
                        },
                        {
                            "./similar": 2
                        }
                    ],
                    2: [
                        function(s, c, b) {
                            function p() {
                                return this.list = [], this.lastItem = void 0, this.size = 0, this;
                            }
                            p.prototype.get = function(o) {
                                var i;
                                if (this.lastItem && this.isEqual(this.lastItem.key, o)) return this.lastItem.val;
                                if (i = this.indexOf(o), i >= 0) return this.lastItem = this.list[i], this.list[i].val;
                            }, p.prototype.set = function(o, i) {
                                var h;
                                return this.lastItem && this.isEqual(this.lastItem.key, o) ? (this.lastItem.val = i, this) : (h = this.indexOf(o), h >= 0 ? (this.lastItem = this.list[h], this.list[h].val = i, this) : (this.lastItem = {
                                    key: o,
                                    val: i
                                }, this.list.push(this.lastItem), this.size++, this));
                            }, p.prototype.delete = function(o) {
                                var i;
                                if (this.lastItem && this.isEqual(this.lastItem.key, o) && (this.lastItem = void 0), i = this.indexOf(o), i >= 0) return this.size--, this.list.splice(i, 1)[0];
                            }, p.prototype.has = function(o) {
                                var i;
                                return this.lastItem && this.isEqual(this.lastItem.key, o) ? !0 : (i = this.indexOf(o), i >= 0 ? (this.lastItem = this.list[i], !0) : !1);
                            }, p.prototype.forEach = function(o, i) {
                                var h;
                                for(h = 0; h < this.size; h++)o.call(i || this, this.list[h].val, this.list[h].key, this);
                            }, p.prototype.indexOf = function(o) {
                                var i;
                                for(i = 0; i < this.size; i++)if (this.isEqual(this.list[i].key, o)) return i;
                                return -1;
                            }, p.prototype.isEqual = function(o, i) {
                                return o === i || o !== o && i !== i;
                            }, c.exports = p;
                        },
                        {}
                    ],
                    3: [
                        function(s, c, b) {
                            var p = s("map-or-similar");
                            c.exports = function(n) {
                                var d = new p(!1), r = [];
                                return function(u) {
                                    var I = function I1() {
                                        var m = d, y, k, S = arguments.length - 1, M = Array(S + 1), x = !0, C;
                                        if ((I.numArgs || I.numArgs === 0) && I.numArgs !== S + 1) throw new Error("Memoizerific functions should always be called with the same number of arguments");
                                        for(C = 0; C < S; C++){
                                            if (M[C] = {
                                                cacheItem: m,
                                                arg: arguments[C]
                                            }, m.has(arguments[C])) {
                                                m = m.get(arguments[C]);
                                                continue;
                                            }
                                            x = !1, y = new p(!1), m.set(arguments[C], y), m = y;
                                        }
                                        return x && (m.has(arguments[S]) ? k = m.get(arguments[S]) : x = !1), x || (k = u.apply(null, arguments), m.set(arguments[S], k)), n > 0 && (M[S] = {
                                            cacheItem: m,
                                            arg: arguments[S]
                                        }, x ? o(r, M) : r.push(M), r.length > n && i(r.shift())), I.wasMemoized = x, I.numArgs = S + 1, k;
                                    };
                                    return I.limit = n, I.wasMemoized = !1, I.cache = d, I.lru = r, I;
                                };
                            };
                            function o(n, d) {
                                var r = n.length, u = d.length, I, m, y;
                                for(m = 0; m < r; m++){
                                    for(I = !0, y = 0; y < u; y++)if (!h(n[m][y].arg, d[y].arg)) {
                                        I = !1;
                                        break;
                                    }
                                    if (I) break;
                                }
                                n.push(n.splice(m, 1)[0]);
                            }
                            function i(n) {
                                var d = n.length, r = n[d - 1], u, I;
                                for(r.cacheItem.delete(r.arg), I = d - 2; I >= 0 && (r = n[I], u = r.cacheItem.get(r.arg), !u || !u.size); I--)r.cacheItem.delete(r.arg);
                            }
                            function h(n, d) {
                                return n === d || n !== n && d !== d;
                            }
                        },
                        {
                            "map-or-similar": 1
                        }
                    ]
                }, {}, [
                    3
                ])(3);
            });
        });
        f();
        g();
        w();
        f();
        g();
        w();
        f();
        g();
        w();
        f();
        g();
        w();
        var l = __REACT__, $e = __REACT__.Children, Je = __REACT__.Component, V = __REACT__.Fragment, Qe = __REACT__.Profiler, Xe = __REACT__.PureComponent, et = __REACT__.StrictMode, tt = __REACT__.Suspense, ot = __REACT__.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, nt = __REACT__.cloneElement, rt = __REACT__.createContext, z = __REACT__.createElement, it = __REACT__.createFactory, at = __REACT__.createRef, ct = __REACT__.forwardRef, lt = __REACT__.isValidElement, st = __REACT__.lazy, Q = __REACT__.memo, ut = __REACT__.startTransition, It = __REACT__.unstable_act, X = __REACT__.useCallback, pt = __REACT__.useContext, dt = __REACT__.useDebugValue, ht = __REACT__.useDeferredValue, _ = __REACT__.useEffect, mt = __REACT__.useId, ft = __REACT__.useImperativeHandle, gt = __REACT__.useInsertionEffect, wt = __REACT__.useLayoutEffect, bt = __REACT__.useMemo, yt = __REACT__.useReducer, ee = __REACT__.useRef, G = __REACT__.useState, St = __REACT__.useSyncExternalStore, vt = __REACT__.useTransition, Ct = __REACT__.version;
        f();
        g();
        w();
        var kt = __STORYBOOK_API__, xt = __STORYBOOK_API__.ActiveTabs, At = __STORYBOOK_API__.Consumer, Ot = __STORYBOOK_API__.ManagerContext, _t = __STORYBOOK_API__.Provider, Lt = __STORYBOOK_API__.RequestResponseError, H = __STORYBOOK_API__.addons, Bt = __STORYBOOK_API__.combineParameters, Pt = __STORYBOOK_API__.controlOrMetaKey, Mt = __STORYBOOK_API__.controlOrMetaSymbol, Vt = __STORYBOOK_API__.eventMatchesShortcut, Dt = __STORYBOOK_API__.eventToShortcut, Nt = __STORYBOOK_API__.experimental_requestResponse, zt = __STORYBOOK_API__.isMacLike, Gt = __STORYBOOK_API__.isShortcutTaken, Ht = __STORYBOOK_API__.keyToSymbol, Ft = __STORYBOOK_API__.merge, Ut = __STORYBOOK_API__.mockChannel, qt = __STORYBOOK_API__.optionOrAltSymbol, Wt = __STORYBOOK_API__.shortcutMatchesShortcut, Yt = __STORYBOOK_API__.shortcutToHumanString, te = __STORYBOOK_API__.types, jt = __STORYBOOK_API__.useAddonState, Kt = __STORYBOOK_API__.useArgTypes, Zt = __STORYBOOK_API__.useArgs, $t = __STORYBOOK_API__.useChannel, Jt = __STORYBOOK_API__.useGlobalTypes, F = __STORYBOOK_API__.useGlobals, U = __STORYBOOK_API__.useParameter, Qt = __STORYBOOK_API__.useSharedState, Xt = __STORYBOOK_API__.useStoryPrepared, oe = __STORYBOOK_API__.useStorybookApi, eo = __STORYBOOK_API__.useStorybookState;
        f();
        g();
        w();
        var io = __STORYBOOK_COMPONENTS__, ao = __STORYBOOK_COMPONENTS__.A, co = __STORYBOOK_COMPONENTS__.ActionBar, lo = __STORYBOOK_COMPONENTS__.AddonPanel, so = __STORYBOOK_COMPONENTS__.Badge, uo = __STORYBOOK_COMPONENTS__.Bar, Io = __STORYBOOK_COMPONENTS__.Blockquote, po = __STORYBOOK_COMPONENTS__.Button, ho = __STORYBOOK_COMPONENTS__.ClipboardCode, mo = __STORYBOOK_COMPONENTS__.Code, fo = __STORYBOOK_COMPONENTS__.DL, go = __STORYBOOK_COMPONENTS__.Div, wo = __STORYBOOK_COMPONENTS__.DocumentWrapper, bo = __STORYBOOK_COMPONENTS__.EmptyTabContent, yo = __STORYBOOK_COMPONENTS__.ErrorFormatter, So = __STORYBOOK_COMPONENTS__.FlexBar, vo = __STORYBOOK_COMPONENTS__.Form, Co = __STORYBOOK_COMPONENTS__.H1, Eo = __STORYBOOK_COMPONENTS__.H2, Ro = __STORYBOOK_COMPONENTS__.H3, To = __STORYBOOK_COMPONENTS__.H4, ko = __STORYBOOK_COMPONENTS__.H5, xo = __STORYBOOK_COMPONENTS__.H6, Ao = __STORYBOOK_COMPONENTS__.HR, L = __STORYBOOK_COMPONENTS__.IconButton, Oo = __STORYBOOK_COMPONENTS__.IconButtonSkeleton, _o = __STORYBOOK_COMPONENTS__.Icons, Lo = __STORYBOOK_COMPONENTS__.Img, Bo = __STORYBOOK_COMPONENTS__.LI, Po = __STORYBOOK_COMPONENTS__.Link, Mo = __STORYBOOK_COMPONENTS__.ListItem, Vo = __STORYBOOK_COMPONENTS__.Loader, Do = __STORYBOOK_COMPONENTS__.Modal, No = __STORYBOOK_COMPONENTS__.OL, zo = __STORYBOOK_COMPONENTS__.P, Go = __STORYBOOK_COMPONENTS__.Placeholder, Ho = __STORYBOOK_COMPONENTS__.Pre, Fo = __STORYBOOK_COMPONENTS__.ResetWrapper, Uo = __STORYBOOK_COMPONENTS__.ScrollArea, qo = __STORYBOOK_COMPONENTS__.Separator, Wo = __STORYBOOK_COMPONENTS__.Spaced, Yo = __STORYBOOK_COMPONENTS__.Span, jo = __STORYBOOK_COMPONENTS__.StorybookIcon, Ko = __STORYBOOK_COMPONENTS__.StorybookLogo, Zo = __STORYBOOK_COMPONENTS__.Symbols, $o = __STORYBOOK_COMPONENTS__.SyntaxHighlighter, Jo = __STORYBOOK_COMPONENTS__.TT, Qo = __STORYBOOK_COMPONENTS__.TabBar, Xo = __STORYBOOK_COMPONENTS__.TabButton, en = __STORYBOOK_COMPONENTS__.TabWrapper, tn = __STORYBOOK_COMPONENTS__.Table, on = __STORYBOOK_COMPONENTS__.Tabs, nn = __STORYBOOK_COMPONENTS__.TabsState, q = __STORYBOOK_COMPONENTS__.TooltipLinkList, rn = __STORYBOOK_COMPONENTS__.TooltipMessage, an = __STORYBOOK_COMPONENTS__.TooltipNote, cn = __STORYBOOK_COMPONENTS__.UL, W = __STORYBOOK_COMPONENTS__.WithTooltip, ln = __STORYBOOK_COMPONENTS__.WithTooltipPure, sn = __STORYBOOK_COMPONENTS__.Zoom, un = __STORYBOOK_COMPONENTS__.codeCommon, In = __STORYBOOK_COMPONENTS__.components, pn = __STORYBOOK_COMPONENTS__.createCopyToClipboardFunction, dn = __STORYBOOK_COMPONENTS__.getStoryHref, hn = __STORYBOOK_COMPONENTS__.icons, mn = __STORYBOOK_COMPONENTS__.interleaveSeparators, fn = __STORYBOOK_COMPONENTS__.nameSpaceClassNames, gn = __STORYBOOK_COMPONENTS__.resetComponents, wn = __STORYBOOK_COMPONENTS__.withReset;
        f();
        g();
        w();
        var Cn = __STORYBOOK_THEMING__, En = __STORYBOOK_THEMING__.CacheProvider, Rn = __STORYBOOK_THEMING__.ClassNames, Y = __STORYBOOK_THEMING__.Global, Tn = __STORYBOOK_THEMING__.ThemeProvider, kn = __STORYBOOK_THEMING__.background, xn = __STORYBOOK_THEMING__.color, An = __STORYBOOK_THEMING__.convert, On = __STORYBOOK_THEMING__.create, _n = __STORYBOOK_THEMING__.createCache, Ln = __STORYBOOK_THEMING__.createGlobal, Bn = __STORYBOOK_THEMING__.createReset, Pn = __STORYBOOK_THEMING__.css, Mn = __STORYBOOK_THEMING__.darken, Vn = __STORYBOOK_THEMING__.ensure, Dn = __STORYBOOK_THEMING__.ignoreSsrWarning, Nn = __STORYBOOK_THEMING__.isPropValid, zn = __STORYBOOK_THEMING__.jsx, Gn = __STORYBOOK_THEMING__.keyframes, Hn = __STORYBOOK_THEMING__.lighten, v = __STORYBOOK_THEMING__.styled, Fn = __STORYBOOK_THEMING__.themes, Un = __STORYBOOK_THEMING__.typography, qn = __STORYBOOK_THEMING__.useTheme, Wn = __STORYBOOK_THEMING__.withTheme;
        f();
        g();
        w();
        var $n = __STORYBOOK_ICONS__, Jn = __STORYBOOK_ICONS__.AccessibilityAltIcon, Qn = __STORYBOOK_ICONS__.AccessibilityIcon, Xn = __STORYBOOK_ICONS__.AddIcon, er = __STORYBOOK_ICONS__.AdminIcon, tr = __STORYBOOK_ICONS__.AlertAltIcon, or = __STORYBOOK_ICONS__.AlertIcon, nr = __STORYBOOK_ICONS__.AlignLeftIcon, rr = __STORYBOOK_ICONS__.AlignRightIcon, ir = __STORYBOOK_ICONS__.AppleIcon, ar = __STORYBOOK_ICONS__.ArrowBottomLeftIcon, cr = __STORYBOOK_ICONS__.ArrowBottomRightIcon, lr = __STORYBOOK_ICONS__.ArrowDownIcon, sr = __STORYBOOK_ICONS__.ArrowLeftIcon, ur = __STORYBOOK_ICONS__.ArrowRightIcon, Ir = __STORYBOOK_ICONS__.ArrowSolidDownIcon, pr = __STORYBOOK_ICONS__.ArrowSolidLeftIcon, dr = __STORYBOOK_ICONS__.ArrowSolidRightIcon, hr = __STORYBOOK_ICONS__.ArrowSolidUpIcon, mr = __STORYBOOK_ICONS__.ArrowTopLeftIcon, fr = __STORYBOOK_ICONS__.ArrowTopRightIcon, gr = __STORYBOOK_ICONS__.ArrowUpIcon, wr = __STORYBOOK_ICONS__.AzureDevOpsIcon, br = __STORYBOOK_ICONS__.BackIcon, yr = __STORYBOOK_ICONS__.BasketIcon, Sr = __STORYBOOK_ICONS__.BatchAcceptIcon, vr = __STORYBOOK_ICONS__.BatchDenyIcon, Cr = __STORYBOOK_ICONS__.BeakerIcon, Er = __STORYBOOK_ICONS__.BellIcon, Rr = __STORYBOOK_ICONS__.BitbucketIcon, Tr = __STORYBOOK_ICONS__.BoldIcon, kr = __STORYBOOK_ICONS__.BookIcon, xr = __STORYBOOK_ICONS__.BookmarkHollowIcon, Ar = __STORYBOOK_ICONS__.BookmarkIcon, Or = __STORYBOOK_ICONS__.BottomBarIcon, _r = __STORYBOOK_ICONS__.BottomBarToggleIcon, Lr = __STORYBOOK_ICONS__.BoxIcon, Br = __STORYBOOK_ICONS__.BranchIcon, ne = __STORYBOOK_ICONS__.BrowserIcon, Pr = __STORYBOOK_ICONS__.ButtonIcon, Mr = __STORYBOOK_ICONS__.CPUIcon, Vr = __STORYBOOK_ICONS__.CalendarIcon, Dr = __STORYBOOK_ICONS__.CameraIcon, Nr = __STORYBOOK_ICONS__.CategoryIcon, zr = __STORYBOOK_ICONS__.CertificateIcon, Gr = __STORYBOOK_ICONS__.ChangedIcon, Hr = __STORYBOOK_ICONS__.ChatIcon, Fr = __STORYBOOK_ICONS__.CheckIcon, Ur = __STORYBOOK_ICONS__.ChevronDownIcon, qr = __STORYBOOK_ICONS__.ChevronLeftIcon, Wr = __STORYBOOK_ICONS__.ChevronRightIcon, Yr = __STORYBOOK_ICONS__.ChevronSmallDownIcon, jr = __STORYBOOK_ICONS__.ChevronSmallLeftIcon, Kr = __STORYBOOK_ICONS__.ChevronSmallRightIcon, Zr = __STORYBOOK_ICONS__.ChevronSmallUpIcon, $r = __STORYBOOK_ICONS__.ChevronUpIcon, Jr = __STORYBOOK_ICONS__.ChromaticIcon, Qr = __STORYBOOK_ICONS__.ChromeIcon, Xr = __STORYBOOK_ICONS__.CircleHollowIcon, ei = __STORYBOOK_ICONS__.CircleIcon, ti = __STORYBOOK_ICONS__.ClearIcon, oi = __STORYBOOK_ICONS__.CloseAltIcon, ni = __STORYBOOK_ICONS__.CloseIcon, ri = __STORYBOOK_ICONS__.CloudHollowIcon, ii = __STORYBOOK_ICONS__.CloudIcon, ai = __STORYBOOK_ICONS__.CogIcon, ci = __STORYBOOK_ICONS__.CollapseIcon, li = __STORYBOOK_ICONS__.CommandIcon, si = __STORYBOOK_ICONS__.CommentAddIcon, ui = __STORYBOOK_ICONS__.CommentIcon, Ii = __STORYBOOK_ICONS__.CommentsIcon, pi = __STORYBOOK_ICONS__.CommitIcon, di = __STORYBOOK_ICONS__.CompassIcon, hi = __STORYBOOK_ICONS__.ComponentDrivenIcon, mi = __STORYBOOK_ICONS__.ComponentIcon, fi = __STORYBOOK_ICONS__.ContrastIcon, gi = __STORYBOOK_ICONS__.ControlsIcon, wi = __STORYBOOK_ICONS__.CopyIcon, bi = __STORYBOOK_ICONS__.CreditIcon, yi = __STORYBOOK_ICONS__.CrossIcon, Si = __STORYBOOK_ICONS__.DashboardIcon, vi = __STORYBOOK_ICONS__.DatabaseIcon, Ci = __STORYBOOK_ICONS__.DeleteIcon, Ei = __STORYBOOK_ICONS__.DiamondIcon, Ri = __STORYBOOK_ICONS__.DirectionIcon, Ti = __STORYBOOK_ICONS__.DiscordIcon, ki = __STORYBOOK_ICONS__.DocChartIcon, xi = __STORYBOOK_ICONS__.DocListIcon, Ai = __STORYBOOK_ICONS__.DocumentIcon, Oi = __STORYBOOK_ICONS__.DownloadIcon, _i = __STORYBOOK_ICONS__.DragIcon, Li = __STORYBOOK_ICONS__.EditIcon, Bi = __STORYBOOK_ICONS__.EllipsisIcon, Pi = __STORYBOOK_ICONS__.EmailIcon, Mi = __STORYBOOK_ICONS__.ExpandAltIcon, Vi = __STORYBOOK_ICONS__.ExpandIcon, Di = __STORYBOOK_ICONS__.EyeCloseIcon, Ni = __STORYBOOK_ICONS__.EyeIcon, zi = __STORYBOOK_ICONS__.FaceHappyIcon, Gi = __STORYBOOK_ICONS__.FaceNeutralIcon, Hi = __STORYBOOK_ICONS__.FaceSadIcon, Fi = __STORYBOOK_ICONS__.FacebookIcon, Ui = __STORYBOOK_ICONS__.FailedIcon, qi = __STORYBOOK_ICONS__.FastForwardIcon, Wi = __STORYBOOK_ICONS__.FigmaIcon, Yi = __STORYBOOK_ICONS__.FilterIcon, ji = __STORYBOOK_ICONS__.FlagIcon, Ki = __STORYBOOK_ICONS__.FolderIcon, Zi = __STORYBOOK_ICONS__.FormIcon, $i = __STORYBOOK_ICONS__.GDriveIcon, Ji = __STORYBOOK_ICONS__.GithubIcon, Qi = __STORYBOOK_ICONS__.GitlabIcon, Xi = __STORYBOOK_ICONS__.GlobeIcon, ea = __STORYBOOK_ICONS__.GoogleIcon, ta = __STORYBOOK_ICONS__.GraphBarIcon, oa = __STORYBOOK_ICONS__.GraphLineIcon, na = __STORYBOOK_ICONS__.GraphqlIcon, ra = __STORYBOOK_ICONS__.GridAltIcon, ia = __STORYBOOK_ICONS__.GridIcon, j = __STORYBOOK_ICONS__.GrowIcon, aa = __STORYBOOK_ICONS__.HeartHollowIcon, ca = __STORYBOOK_ICONS__.HeartIcon, la = __STORYBOOK_ICONS__.HomeIcon, sa = __STORYBOOK_ICONS__.HourglassIcon, ua = __STORYBOOK_ICONS__.InfoIcon, Ia = __STORYBOOK_ICONS__.ItalicIcon, pa = __STORYBOOK_ICONS__.JumpToIcon, da = __STORYBOOK_ICONS__.KeyIcon, ha = __STORYBOOK_ICONS__.LightningIcon, ma = __STORYBOOK_ICONS__.LightningOffIcon, fa = __STORYBOOK_ICONS__.LinkBrokenIcon, ga = __STORYBOOK_ICONS__.LinkIcon, wa = __STORYBOOK_ICONS__.LinkedinIcon, ba = __STORYBOOK_ICONS__.LinuxIcon, ya = __STORYBOOK_ICONS__.ListOrderedIcon, Sa = __STORYBOOK_ICONS__.ListUnorderedIcon, va = __STORYBOOK_ICONS__.LocationIcon, Ca = __STORYBOOK_ICONS__.LockIcon, Ea = __STORYBOOK_ICONS__.MarkdownIcon, Ra = __STORYBOOK_ICONS__.MarkupIcon, Ta = __STORYBOOK_ICONS__.MediumIcon, ka = __STORYBOOK_ICONS__.MemoryIcon, xa = __STORYBOOK_ICONS__.MenuIcon, Aa = __STORYBOOK_ICONS__.MergeIcon, Oa = __STORYBOOK_ICONS__.MirrorIcon, re = __STORYBOOK_ICONS__.MobileIcon, _a = __STORYBOOK_ICONS__.MoonIcon, La = __STORYBOOK_ICONS__.NutIcon, Ba = __STORYBOOK_ICONS__.OutboxIcon, Pa = __STORYBOOK_ICONS__.OutlineIcon, Ma = __STORYBOOK_ICONS__.PaintBrushIcon, Va = __STORYBOOK_ICONS__.PaperClipIcon, Da = __STORYBOOK_ICONS__.ParagraphIcon, Na = __STORYBOOK_ICONS__.PassedIcon, za = __STORYBOOK_ICONS__.PhoneIcon, Ga = __STORYBOOK_ICONS__.PhotoDragIcon, Ha = __STORYBOOK_ICONS__.PhotoIcon, Fa = __STORYBOOK_ICONS__.PinAltIcon, Ua = __STORYBOOK_ICONS__.PinIcon, qa = __STORYBOOK_ICONS__.PlayBackIcon, Wa = __STORYBOOK_ICONS__.PlayIcon, Ya = __STORYBOOK_ICONS__.PlayNextIcon, ja = __STORYBOOK_ICONS__.PlusIcon, Ka = __STORYBOOK_ICONS__.PointerDefaultIcon, Za = __STORYBOOK_ICONS__.PointerHandIcon, $a = __STORYBOOK_ICONS__.PowerIcon, Ja = __STORYBOOK_ICONS__.PrintIcon, Qa = __STORYBOOK_ICONS__.ProceedIcon, Xa = __STORYBOOK_ICONS__.ProfileIcon, ec = __STORYBOOK_ICONS__.PullRequestIcon, tc = __STORYBOOK_ICONS__.QuestionIcon, oc = __STORYBOOK_ICONS__.RSSIcon, nc = __STORYBOOK_ICONS__.RedirectIcon, rc = __STORYBOOK_ICONS__.ReduxIcon, ie = __STORYBOOK_ICONS__.RefreshIcon, ic = __STORYBOOK_ICONS__.ReplyIcon, ac = __STORYBOOK_ICONS__.RepoIcon, cc = __STORYBOOK_ICONS__.RequestChangeIcon, lc = __STORYBOOK_ICONS__.RewindIcon, sc = __STORYBOOK_ICONS__.RulerIcon, uc = __STORYBOOK_ICONS__.SearchIcon, Ic = __STORYBOOK_ICONS__.ShareAltIcon, pc = __STORYBOOK_ICONS__.ShareIcon, dc = __STORYBOOK_ICONS__.ShieldIcon, hc = __STORYBOOK_ICONS__.SideBySideIcon, mc = __STORYBOOK_ICONS__.SidebarAltIcon, fc = __STORYBOOK_ICONS__.SidebarAltToggleIcon, gc = __STORYBOOK_ICONS__.SidebarIcon, wc = __STORYBOOK_ICONS__.SidebarToggleIcon, bc = __STORYBOOK_ICONS__.SpeakerIcon, yc = __STORYBOOK_ICONS__.StackedIcon, Sc = __STORYBOOK_ICONS__.StarHollowIcon, vc = __STORYBOOK_ICONS__.StarIcon, Cc = __STORYBOOK_ICONS__.StatusFailIcon, Ec = __STORYBOOK_ICONS__.StatusPassIcon, Rc = __STORYBOOK_ICONS__.StatusWarnIcon, Tc = __STORYBOOK_ICONS__.StickerIcon, kc = __STORYBOOK_ICONS__.StopAltIcon, xc = __STORYBOOK_ICONS__.StopIcon, Ac = __STORYBOOK_ICONS__.StorybookIcon, Oc = __STORYBOOK_ICONS__.StructureIcon, _c = __STORYBOOK_ICONS__.SubtractIcon, Lc = __STORYBOOK_ICONS__.SunIcon, Bc = __STORYBOOK_ICONS__.SupportIcon, Pc = __STORYBOOK_ICONS__.SwitchAltIcon, Mc = __STORYBOOK_ICONS__.SyncIcon, ae = __STORYBOOK_ICONS__.TabletIcon, Vc = __STORYBOOK_ICONS__.ThumbsUpIcon, Dc = __STORYBOOK_ICONS__.TimeIcon, Nc = __STORYBOOK_ICONS__.TimerIcon, K = __STORYBOOK_ICONS__.TransferIcon, zc = __STORYBOOK_ICONS__.TrashIcon, Gc = __STORYBOOK_ICONS__.TwitterIcon, Hc = __STORYBOOK_ICONS__.TypeIcon, Fc = __STORYBOOK_ICONS__.UbuntuIcon, Uc = __STORYBOOK_ICONS__.UndoIcon, qc = __STORYBOOK_ICONS__.UnfoldIcon, Wc = __STORYBOOK_ICONS__.UnlockIcon, Yc = __STORYBOOK_ICONS__.UnpinIcon, jc = __STORYBOOK_ICONS__.UploadIcon, Kc = __STORYBOOK_ICONS__.UserAddIcon, Zc = __STORYBOOK_ICONS__.UserAltIcon, $c = __STORYBOOK_ICONS__.UserIcon, Jc = __STORYBOOK_ICONS__.UsersIcon, Qc = __STORYBOOK_ICONS__.VSCodeIcon, Xc = __STORYBOOK_ICONS__.VerifiedIcon, el = __STORYBOOK_ICONS__.VideoIcon, tl = __STORYBOOK_ICONS__.WandIcon, ol = __STORYBOOK_ICONS__.WatchIcon, nl = __STORYBOOK_ICONS__.WindowsIcon, rl = __STORYBOOK_ICONS__.WrenchIcon, il = __STORYBOOK_ICONS__.XIcon, al = __STORYBOOK_ICONS__.YoutubeIcon, cl = __STORYBOOK_ICONS__.ZoomIcon, ll = __STORYBOOK_ICONS__.ZoomOutIcon, sl = __STORYBOOK_ICONS__.ZoomResetIcon, ul = __STORYBOOK_ICONS__.iconList;
        var $ = Se(le()), B = "storybook/viewport", A = "viewport", Ie = {
            mobile1: {
                name: "Small mobile",
                styles: {
                    height: "568px",
                    width: "320px"
                },
                type: "mobile"
            },
            mobile2: {
                name: "Large mobile",
                styles: {
                    height: "896px",
                    width: "414px"
                },
                type: "mobile"
            },
            tablet: {
                name: "Tablet",
                styles: {
                    height: "1112px",
                    width: "834px"
                },
                type: "tablet"
            }
        }, P = {
            name: "Reset viewport",
            styles: {
                height: "100%",
                width: "100%"
            },
            type: "desktop"
        }, Ce = _define_property({}, A, {
            value: void 0,
            isRotated: !1
        }), Ee = {
            viewport: "reset",
            viewportRotated: !1
        }, Re = ((_FEATURES = FEATURES) === null || _FEATURES === void 0 ? void 0 : _FEATURES.viewportStoryGlobals) ? Ce : Ee, pe = function(e, t) {
            return e.indexOf(t);
        }, Te = function(e, t) {
            var a = pe(e, t);
            return a === e.length - 1 ? e[0] : e[a + 1];
        }, ke = function(e, t) {
            var a = pe(e, t);
            return a < 1 ? e[e.length - 1] : e[a - 1];
        }, de = /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function(e, t, a, s) {
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            return [
                                4,
                                e.setAddonShortcut(B, {
                                    label: "Previous viewport",
                                    defaultShortcut: [
                                        "alt",
                                        "shift",
                                        "V"
                                    ],
                                    actionName: "previous",
                                    action: function() {
                                        a({
                                            viewport: ke(s, t)
                                        });
                                    }
                                })
                            ];
                        case 1:
                            _state.sent();
                            return [
                                4,
                                e.setAddonShortcut(B, {
                                    label: "Next viewport",
                                    defaultShortcut: [
                                        "alt",
                                        "V"
                                    ],
                                    actionName: "next",
                                    action: function() {
                                        a({
                                            viewport: Te(s, t)
                                        });
                                    }
                                })
                            ];
                        case 2:
                            _state.sent();
                            return [
                                4,
                                e.setAddonShortcut(B, {
                                    label: "Reset viewport",
                                    defaultShortcut: [
                                        "alt",
                                        "control",
                                        "V"
                                    ],
                                    actionName: "reset",
                                    action: function() {
                                        a(Re);
                                    }
                                })
                            ];
                        case 3:
                            _state.sent();
                            return [
                                2
                            ];
                    }
                });
            });
            return function de(e, t, a, s) {
                return _ref.apply(this, arguments);
            };
        }(), xe = v.div(function() {
            return {
                display: "inline-flex",
                alignItems: "center"
            };
        }), se = v.div(function(param) {
            var _$e = param.theme;
            return {
                display: "inline-block",
                textDecoration: "none",
                padding: 10,
                fontWeight: _$e.typography.weight.bold,
                fontSize: _$e.typography.size.s2 - 1,
                lineHeight: "1",
                height: 40,
                border: "none",
                borderTop: "3px solid transparent",
                borderBottom: "3px solid transparent",
                background: "transparent"
            };
        }), Ae = v(L)(function() {
            return {
                display: "inline-flex",
                alignItems: "center"
            };
        }), Oe = v.div(function(param) {
            var _$e = param.theme;
            return {
                fontSize: _$e.typography.size.s2 - 1,
                marginLeft: 10
            };
        }), _e = {
            desktop: l.createElement(ne, null),
            mobile: l.createElement(re, null),
            tablet: l.createElement(ae, null),
            other: l.createElement(V, null)
        }, Le = function(param) {
            var _$e = param.api;
            var t = U(A), _F = _sliced_to_array(F(), 3), a = _F[0], s = _F[1], c = _F[2], _G = _sliced_to_array(G(!1), 2), b = _G[0], p = _G[1], _ref = t || {}, tmp = _ref.options, o = tmp === void 0 ? Ie : tmp, i = _ref.disable, h = (a === null || a === void 0 ? void 0 : a[A]) || {}, n = h.value, d = h.isRotated, r = o[n] || P, u = b || r !== P, I = A in c, m = Object.keys(o).length;
            if (_(function() {
                de(_$e, n, s, Object.keys(o));
            }, [
                o,
                n,
                s,
                _$e
            ]), r.styles === null || !o || m < 1) return null;
            if (typeof r.styles == "function") return console.warn("Addon Viewport no longer supports dynamic styles using a function, use css calc() instead"), null;
            var y = d ? r.styles.height : r.styles.width, k = d ? r.styles.width : r.styles.height;
            return i ? null : l.createElement(Be, {
                item: r,
                updateGlobals: s,
                viewportMap: o,
                viewportName: n,
                isRotated: d,
                setIsTooltipVisible: p,
                isLocked: I,
                isActive: u,
                width: y,
                height: k
            });
        }, Be = l.memo(function(e) {
            var t = e.item, a = e.viewportMap, s = e.viewportName, c = e.isRotated, b = e.updateGlobals, p = e.setIsTooltipVisible, o = e.isLocked, i = e.isActive, h = e.width, n = e.height, d = X(function(r) {
                return b(_define_property({}, A, r));
            }, [
                b
            ]);
            return l.createElement(V, null, l.createElement(W, {
                placement: "bottom",
                tooltip: function(param) {
                    var r = param.onHide;
                    return l.createElement(q, {
                        links: _to_consumable_array(length > 0 && t !== P ? [
                            {
                                id: "reset",
                                title: "Reset viewport",
                                icon: l.createElement(ie, null),
                                onClick: function() {
                                    d({
                                        value: void 0,
                                        isRotated: !1
                                    }), r();
                                }
                            }
                        ] : []).concat(_to_consumable_array(Object.entries(a).map(function(param) {
                            var _param = _sliced_to_array(param, 2), u = _param[0], I = _param[1];
                            return {
                                id: u,
                                title: I.name,
                                icon: _e[I.type],
                                active: u === s,
                                onClick: function() {
                                    d({
                                        value: u,
                                        isRotated: !1
                                    }), r();
                                }
                            };
                        })))
                    });
                },
                closeOnOutsideClick: !0,
                onVisibleChange: p
            }, l.createElement(Ae, {
                disabled: o,
                key: "viewport",
                title: "Change the size of the preview",
                active: i,
                onDoubleClick: function() {
                    d({
                        value: void 0,
                        isRotated: !1
                    });
                }
            }, l.createElement(j, null), t !== P ? l.createElement(Oe, null, t.name, " ", c ? "(L)" : "(P)") : null)), l.createElement(Y, {
                styles: {
                    'iframe[data-is-storybook="true"]': {
                        width: h,
                        height: n
                    }
                }
            }), t !== P ? l.createElement(xe, null, l.createElement(se, {
                title: "Viewport width"
            }, h.replace("px", "")), o ? "/" : l.createElement(L, {
                key: "viewport-rotate",
                title: "Rotate viewport",
                onClick: function() {
                    d({
                        value: s,
                        isRotated: !c
                    });
                }
            }, l.createElement(K, null)), l.createElement(se, {
                title: "Viewport height"
            }, n.replace("px", ""))) : null);
        }), Pe = (0, $.default)(50)(function(e) {
            return _to_consumable_array(Me).concat(_to_consumable_array(Object.entries(e).map(function(_param) {
                var _$_param = _sliced_to_array(_param, 2), t = _$_param[0], _param_ = _$_param[1], a = _param_.name, s = _object_without_properties(_param[1], [
                    "name"
                ]);
                return _object_spread_props(_object_spread({}, s), {
                    id: t,
                    title: a
                });
            })));
        }), D = {
            id: "reset",
            title: "Reset viewport",
            styles: null,
            type: "other"
        }, Me = [
            D
        ], Ve = (0, $.default)(50)(function(e, t, a, s) {
            return e.filter(function(c) {
                return c.id !== D.id || t.id !== c.id;
            }).map(function(c) {
                return _object_spread_props(_object_spread({}, c), {
                    onClick: function() {
                        a({
                            viewport: c.id
                        }), s();
                    }
                });
            });
        }), De = function(_param) {
            var _$e = _param.width, t = _param.height, a = _object_without_properties(_param, [
                "width",
                "height"
            ]);
            return _object_spread_props(_object_spread({}, a), {
                height: _$e,
                width: t
            });
        }, Ne = v.div(function() {
            return {
                display: "inline-flex",
                alignItems: "center"
            };
        }), ue = v.div(function(param) {
            var _$e = param.theme;
            return {
                display: "inline-block",
                textDecoration: "none",
                padding: 10,
                fontWeight: _$e.typography.weight.bold,
                fontSize: _$e.typography.size.s2 - 1,
                lineHeight: "1",
                height: 40,
                border: "none",
                borderTop: "3px solid transparent",
                borderBottom: "3px solid transparent",
                background: "transparent"
            };
        }), ze = v(L)(function() {
            return {
                display: "inline-flex",
                alignItems: "center"
            };
        }), Ge = v.div(function(param) {
            var _$e = param.theme;
            return {
                fontSize: _$e.typography.size.s2 - 1,
                marginLeft: 10
            };
        }), He = function(e, t, a) {
            if (t === null) return;
            var s = typeof t == "function" ? t(e) : t;
            return a ? De(s) : s;
        }, Fe = Q(function() {
            var _F = _sliced_to_array(F(), 2), _$e = _F[0], t = _F[1], _U = U(A, {}), tmp = _U.viewports, a = tmp === void 0 ? Ie : tmp, s = _U.defaultOrientation, c = _U.defaultViewport, b = _U.disable, p = Pe(a), o = oe(), _G = _sliced_to_array(G(!1), 2), i = _G[0], h = _G[1];
            c && !p.find(function(u) {
                return u.id === c;
            }) && console.warn('Cannot find "defaultViewport" of "'.concat(c, '" in addon-viewport configs, please check the "viewports" setting in the configuration.')), _(function() {
                de(o, _$e, t, Object.keys(a));
            }, [
                a,
                _$e,
                _$e.viewport,
                t,
                o
            ]), _(function() {
                var u = s === "landscape";
                (c && _$e.viewport !== c || s && _$e.viewportRotated !== u) && t({
                    viewport: c,
                    viewportRotated: u
                });
            }, [
                s,
                c,
                t
            ]);
            var n = p.find(function(u) {
                return u.id === _$e.viewport;
            }) || p.find(function(u) {
                return u.id === c;
            }) || p.find(function(u) {
                return u.default;
            }) || D, d = ee(), r = He(d.current, n.styles, _$e.viewportRotated);
            return _(function() {
                d.current = r;
            }, [
                n
            ]), b || Object.entries(a).length === 0 ? null : l.createElement(V, null, l.createElement(W, {
                placement: "top",
                tooltip: function(param) {
                    var u = param.onHide;
                    return l.createElement(q, {
                        links: Ve(p, n, t, u)
                    });
                },
                closeOnOutsideClick: !0,
                onVisibleChange: h
            }, l.createElement(ze, {
                key: "viewport",
                title: "Change the size of the preview",
                active: i || !!r,
                onDoubleClick: function() {
                    t({
                        viewport: D.id
                    });
                }
            }, l.createElement(j, null), r ? l.createElement(Ge, null, _$e.viewportRotated ? "".concat(n.title, " (L)") : "".concat(n.title, " (P)")) : null)), r ? l.createElement(Ne, null, l.createElement(Y, {
                styles: {
                    'iframe[data-is-storybook="true"]': _object_spread({}, r || {
                        width: "100%",
                        height: "100%"
                    })
                }
            }), l.createElement(ue, {
                title: "Viewport width"
            }, r.width.replace("px", "")), l.createElement(L, {
                key: "viewport-rotate",
                title: "Rotate viewport",
                onClick: function() {
                    t({
                        viewportRotated: !_$e.viewportRotated
                    });
                }
            }, l.createElement(K, null)), l.createElement(ue, {
                title: "Viewport height"
            }, r.height.replace("px", ""))) : null);
        });
        H.register(B, function(e) {
            H.add(B, {
                title: "viewport / media-queries",
                type: te.TOOL,
                match: function(param) {
                    var t = param.viewMode, a = param.tabId;
                    return t === "story" && !a;
                },
                render: function() {
                    var _FEATURES;
                    return ((_FEATURES = FEATURES) === null || _FEATURES === void 0 ? void 0 : _FEATURES.viewportStoryGlobals) ? z(Le, {
                        api: e
                    }) : z(Fe, null);
                }
            });
        });
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
