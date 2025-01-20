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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _tagged_template_literal(strings, raw) {
    if (!raw) {
        raw = strings.slice(0);
    }
    return Object.freeze(Object.defineProperties(strings, {
        raw: {
            value: Object.freeze(raw)
        }
    }));
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
function _templateObject() {
    var data = _tagged_template_literal([
        '\n        Backgrounds Addon: could not find the default color "',
        '".\n        These are the available colors for your story based on your configuration:\n        ',
        ".\n      "
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
try {
    (function() {
        var oe = function oe(e) {
            for(var o = [], c = 1; c < arguments.length; c++)o[c - 1] = arguments[c];
            var r = Array.from(typeof e == "string" ? [
                e
            ] : e);
            r[r.length - 1] = r[r.length - 1].replace(/\r?\n([\t ]*)$/, "");
            var i = r.reduce(function(t, n) {
                var u = n.match(/\n([\t ]+|(?!\s).)/g);
                return u ? t.concat(u.map(function(a) {
                    var I, s;
                    return (s = (I = a.match(/[\t ]/g)) === null || I === void 0 ? void 0 : I.length) !== null && s !== void 0 ? s : 0;
                })) : t;
            }, []);
            if (i.length) {
                var d = new RegExp("\n[	 ]{" + Math.min.apply(Math, i) + "}", "g");
                r = r.map(function(t) {
                    return t.replace(d, "\n");
                });
            }
            r[0] = r[0].replace(/^\r?\n/, "");
            var l = r[0];
            return o.forEach(function(t, n) {
                var u = l.match(/(?:^|\n)( *)$/), a = u ? u[1] : "", I = t;
                typeof t == "string" && t.includes("\n") && (I = String(t).split("\n").map(function(s, C) {
                    return C === 0 ? s : "" + a + s;
                }).join("\n")), l += I + r[n + 1];
            }), l;
        };
        var re = Object.create;
        var Y = Object.defineProperty;
        var ie = Object.getOwnPropertyDescriptor;
        var ae = Object.getOwnPropertyNames;
        var ce = Object.getPrototypeOf, le = Object.prototype.hasOwnProperty;
        var E = function(e) {
            return (typeof require === "undefined" ? "undefined" : _type_of(require)) < "u" ? require : (typeof Proxy === "undefined" ? "undefined" : _type_of(Proxy)) < "u" ? new Proxy(e, {
                get: function(o, c) {
                    return ((typeof require === "undefined" ? "undefined" : _type_of(require)) < "u" ? require : o)[c];
                }
            }) : e;
        }(function(e) {
            if ((typeof require === "undefined" ? "undefined" : _type_of(require)) < "u") return require.apply(this, arguments);
            throw Error('Dynamic require of "' + e + '" is not supported');
        });
        var M = function(e, o) {
            return function() {
                return e && (o = e(e = 0)), o;
            };
        };
        var se = function(e, o) {
            return function() {
                return o || e((o = {
                    exports: {}
                }).exports, o), o.exports;
            };
        };
        var ue = function(e, o, c, r) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            if (o && (typeof o === "undefined" ? "undefined" : _type_of(o)) == "object" || typeof o == "function") try {
                var _loop = function() {
                    var i = _step.value;
                    !le.call(e, i) && i !== c && Y(e, i, {
                        get: function() {
                            return o[i];
                        },
                        enumerable: !(r = ie(o, i)) || r.enumerable
                    });
                };
                for(var _iterator = ae(o)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
        var Ie = function(e, o, c) {
            return c = e != null ? re(ce(e)) : {}, ue(o || !e || !e.__esModule ? Y(c, "default", {
                value: e,
                enumerable: !0
            }) : c, e);
        };
        var p = M(function() {});
        var h = M(function() {});
        var f = M(function() {});
        var X = se(function(Q, V) {
            p();
            h();
            f();
            (function(e) {
                if ((typeof Q === "undefined" ? "undefined" : _type_of(Q)) == "object" && (typeof V === "undefined" ? "undefined" : _type_of(V)) < "u") V.exports = e();
                else if (typeof define == "function" && define.amd) define([], e);
                else {
                    var o;
                    (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" || (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" ? o = window : (typeof self === "undefined" ? "undefined" : _type_of(self)) < "u" ? o = self : o = this, o.memoizerific = e();
                }
            })(function() {
                var _$e, o, c;
                return (function r(i, d, l) {
                    function t(a, I) {
                        if (!d[a]) {
                            if (!i[a]) {
                                var s = typeof E == "function" && E;
                                if (!I && s) return s(a, !0);
                                if (n) return n(a, !0);
                                var C = new Error("Cannot find module '" + a + "'");
                                throw C.code = "MODULE_NOT_FOUND", C;
                            }
                            var m = d[a] = {
                                exports: {}
                            };
                            i[a][0].call(m.exports, function(b) {
                                var y = i[a][1][b];
                                return t(y || b);
                            }, m, m.exports, r, i, d, l);
                        }
                        return d[a].exports;
                    }
                    for(var n = typeof E == "function" && E, u = 0; u < l.length; u++)t(l[u]);
                    return t;
                })({
                    1: [
                        function(r, i, d) {
                            i.exports = function(l) {
                                if (typeof Map != "function" || l) {
                                    var t = r("./similar");
                                    return new t;
                                } else return new Map;
                            };
                        },
                        {
                            "./similar": 2
                        }
                    ],
                    2: [
                        function(r, i, d) {
                            function l() {
                                return this.list = [], this.lastItem = void 0, this.size = 0, this;
                            }
                            l.prototype.get = function(t) {
                                var n;
                                if (this.lastItem && this.isEqual(this.lastItem.key, t)) return this.lastItem.val;
                                if (n = this.indexOf(t), n >= 0) return this.lastItem = this.list[n], this.list[n].val;
                            }, l.prototype.set = function(t, n) {
                                var u;
                                return this.lastItem && this.isEqual(this.lastItem.key, t) ? (this.lastItem.val = n, this) : (u = this.indexOf(t), u >= 0 ? (this.lastItem = this.list[u], this.list[u].val = n, this) : (this.lastItem = {
                                    key: t,
                                    val: n
                                }, this.list.push(this.lastItem), this.size++, this));
                            }, l.prototype.delete = function(t) {
                                var n;
                                if (this.lastItem && this.isEqual(this.lastItem.key, t) && (this.lastItem = void 0), n = this.indexOf(t), n >= 0) return this.size--, this.list.splice(n, 1)[0];
                            }, l.prototype.has = function(t) {
                                var n;
                                return this.lastItem && this.isEqual(this.lastItem.key, t) ? !0 : (n = this.indexOf(t), n >= 0 ? (this.lastItem = this.list[n], !0) : !1);
                            }, l.prototype.forEach = function(t, n) {
                                var u;
                                for(u = 0; u < this.size; u++)t.call(n || this, this.list[u].val, this.list[u].key, this);
                            }, l.prototype.indexOf = function(t) {
                                var n;
                                for(n = 0; n < this.size; n++)if (this.isEqual(this.list[n].key, t)) return n;
                                return -1;
                            }, l.prototype.isEqual = function(t, n) {
                                return t === n || t !== t && n !== n;
                            }, i.exports = l;
                        },
                        {}
                    ],
                    3: [
                        function(r, i, d) {
                            var l = r("map-or-similar");
                            i.exports = function(a) {
                                var I = new l(!1), s = [];
                                return function(C) {
                                    var m = function m1() {
                                        var b = I, y, w, _ = arguments.length - 1, x = Array(_ + 1), O = !0, A;
                                        if ((m.numArgs || m.numArgs === 0) && m.numArgs !== _ + 1) throw new Error("Memoizerific functions should always be called with the same number of arguments");
                                        for(A = 0; A < _; A++){
                                            if (x[A] = {
                                                cacheItem: b,
                                                arg: arguments[A]
                                            }, b.has(arguments[A])) {
                                                b = b.get(arguments[A]);
                                                continue;
                                            }
                                            O = !1, y = new l(!1), b.set(arguments[A], y), b = y;
                                        }
                                        return O && (b.has(arguments[_]) ? w = b.get(arguments[_]) : O = !1), O || (w = C.apply(null, arguments), b.set(arguments[_], w)), a > 0 && (x[_] = {
                                            cacheItem: b,
                                            arg: arguments[_]
                                        }, O ? t(s, x) : s.push(x), s.length > a && n(s.shift())), m.wasMemoized = O, m.numArgs = _ + 1, w;
                                    };
                                    return m.limit = a, m.wasMemoized = !1, m.cache = I, m.lru = s, m;
                                };
                            };
                            function t(a, I) {
                                var s = a.length, C = I.length, m, b, y;
                                for(b = 0; b < s; b++){
                                    for(m = !0, y = 0; y < C; y++)if (!u(a[b][y].arg, I[y].arg)) {
                                        m = !1;
                                        break;
                                    }
                                    if (m) break;
                                }
                                a.push(a.splice(b, 1)[0]);
                            }
                            function n(a) {
                                var I = a.length, s = a[I - 1], C, m;
                                for(s.cacheItem.delete(s.arg), m = I - 2; m >= 0 && (s = a[m], C = s.cacheItem.get(s.arg), !C || !C.size); m--)s.cacheItem.delete(s.arg);
                            }
                            function u(a, I) {
                                return a === I || a !== a && I !== I;
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
        p();
        h();
        f();
        p();
        h();
        f();
        p();
        h();
        f();
        p();
        h();
        f();
        var g = __REACT__, Ee = __REACT__.Children, Be = __REACT__.Component, D = __REACT__.Fragment, Re = __REACT__.Profiler, we = __REACT__.PureComponent, xe = __REACT__.StrictMode, Le = __REACT__.Suspense, Pe = __REACT__.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Me = __REACT__.cloneElement, De = __REACT__.createContext, Ge = __REACT__.createElement, Fe = __REACT__.createFactory, Ne = __REACT__.createRef, Ue = __REACT__.forwardRef, He = __REACT__.isValidElement, qe = __REACT__.lazy, B = __REACT__.memo, ze = __REACT__.startTransition, Ke = __REACT__.unstable_act, G = __REACT__.useCallback, Ve = __REACT__.useContext, We = __REACT__.useDebugValue, Ye = __REACT__.useDeferredValue, je = __REACT__.useEffect, $e = __REACT__.useId, Ze = __REACT__.useImperativeHandle, Je = __REACT__.useInsertionEffect, Qe = __REACT__.useLayoutEffect, j = __REACT__.useMemo, Xe = __REACT__.useReducer, eo = __REACT__.useRef, F = __REACT__.useState, oo = __REACT__.useSyncExternalStore, no = __REACT__.useTransition, to = __REACT__.version;
        p();
        h();
        f();
        var lo = __STORYBOOK_API__, so = __STORYBOOK_API__.ActiveTabs, uo = __STORYBOOK_API__.Consumer, Io = __STORYBOOK_API__.ManagerContext, mo = __STORYBOOK_API__.Provider, po = __STORYBOOK_API__.RequestResponseError, N = __STORYBOOK_API__.addons, ho = __STORYBOOK_API__.combineParameters, fo = __STORYBOOK_API__.controlOrMetaKey, go = __STORYBOOK_API__.controlOrMetaSymbol, bo = __STORYBOOK_API__.eventMatchesShortcut, Co = __STORYBOOK_API__.eventToShortcut, yo = __STORYBOOK_API__.experimental_requestResponse, So = __STORYBOOK_API__.isMacLike, ko = __STORYBOOK_API__.isShortcutTaken, vo = __STORYBOOK_API__.keyToSymbol, To = __STORYBOOK_API__.merge, _o = __STORYBOOK_API__.mockChannel, Ao = __STORYBOOK_API__.optionOrAltSymbol, Oo = __STORYBOOK_API__.shortcutMatchesShortcut, Eo = __STORYBOOK_API__.shortcutToHumanString, $ = __STORYBOOK_API__.types, Bo = __STORYBOOK_API__.useAddonState, Ro = __STORYBOOK_API__.useArgTypes, wo = __STORYBOOK_API__.useArgs, xo = __STORYBOOK_API__.useChannel, Lo = __STORYBOOK_API__.useGlobalTypes, L = __STORYBOOK_API__.useGlobals, P = __STORYBOOK_API__.useParameter, Po = __STORYBOOK_API__.useSharedState, Mo = __STORYBOOK_API__.useStoryPrepared, Do = __STORYBOOK_API__.useStorybookApi, Go = __STORYBOOK_API__.useStorybookState;
        p();
        h();
        f();
        var qo = __STORYBOOK_COMPONENTS__, zo = __STORYBOOK_COMPONENTS__.A, Ko = __STORYBOOK_COMPONENTS__.ActionBar, Vo = __STORYBOOK_COMPONENTS__.AddonPanel, Wo = __STORYBOOK_COMPONENTS__.Badge, Yo = __STORYBOOK_COMPONENTS__.Bar, jo = __STORYBOOK_COMPONENTS__.Blockquote, $o = __STORYBOOK_COMPONENTS__.Button, Zo = __STORYBOOK_COMPONENTS__.ClipboardCode, Jo = __STORYBOOK_COMPONENTS__.Code, Qo = __STORYBOOK_COMPONENTS__.DL, Xo = __STORYBOOK_COMPONENTS__.Div, en = __STORYBOOK_COMPONENTS__.DocumentWrapper, on = __STORYBOOK_COMPONENTS__.EmptyTabContent, nn = __STORYBOOK_COMPONENTS__.ErrorFormatter, tn = __STORYBOOK_COMPONENTS__.FlexBar, rn = __STORYBOOK_COMPONENTS__.Form, an = __STORYBOOK_COMPONENTS__.H1, cn = __STORYBOOK_COMPONENTS__.H2, ln = __STORYBOOK_COMPONENTS__.H3, sn = __STORYBOOK_COMPONENTS__.H4, un = __STORYBOOK_COMPONENTS__.H5, In = __STORYBOOK_COMPONENTS__.H6, dn = __STORYBOOK_COMPONENTS__.HR, R = __STORYBOOK_COMPONENTS__.IconButton, mn = __STORYBOOK_COMPONENTS__.IconButtonSkeleton, pn = __STORYBOOK_COMPONENTS__.Icons, hn = __STORYBOOK_COMPONENTS__.Img, fn = __STORYBOOK_COMPONENTS__.LI, gn = __STORYBOOK_COMPONENTS__.Link, bn = __STORYBOOK_COMPONENTS__.ListItem, Cn = __STORYBOOK_COMPONENTS__.Loader, yn = __STORYBOOK_COMPONENTS__.Modal, Sn = __STORYBOOK_COMPONENTS__.OL, kn = __STORYBOOK_COMPONENTS__.P, vn = __STORYBOOK_COMPONENTS__.Placeholder, Tn = __STORYBOOK_COMPONENTS__.Pre, _n = __STORYBOOK_COMPONENTS__.ResetWrapper, An = __STORYBOOK_COMPONENTS__.ScrollArea, On = __STORYBOOK_COMPONENTS__.Separator, En = __STORYBOOK_COMPONENTS__.Spaced, Bn = __STORYBOOK_COMPONENTS__.Span, Rn = __STORYBOOK_COMPONENTS__.StorybookIcon, wn = __STORYBOOK_COMPONENTS__.StorybookLogo, xn = __STORYBOOK_COMPONENTS__.Symbols, Ln = __STORYBOOK_COMPONENTS__.SyntaxHighlighter, Pn = __STORYBOOK_COMPONENTS__.TT, Mn = __STORYBOOK_COMPONENTS__.TabBar, Dn = __STORYBOOK_COMPONENTS__.TabButton, Gn = __STORYBOOK_COMPONENTS__.TabWrapper, Fn = __STORYBOOK_COMPONENTS__.Table, Nn = __STORYBOOK_COMPONENTS__.Tabs, Un = __STORYBOOK_COMPONENTS__.TabsState, U = __STORYBOOK_COMPONENTS__.TooltipLinkList, Hn = __STORYBOOK_COMPONENTS__.TooltipMessage, qn = __STORYBOOK_COMPONENTS__.TooltipNote, zn = __STORYBOOK_COMPONENTS__.UL, H = __STORYBOOK_COMPONENTS__.WithTooltip, Kn = __STORYBOOK_COMPONENTS__.WithTooltipPure, Vn = __STORYBOOK_COMPONENTS__.Zoom, Wn = __STORYBOOK_COMPONENTS__.codeCommon, Yn = __STORYBOOK_COMPONENTS__.components, jn = __STORYBOOK_COMPONENTS__.createCopyToClipboardFunction, $n = __STORYBOOK_COMPONENTS__.getStoryHref, Zn = __STORYBOOK_COMPONENTS__.icons, Jn = __STORYBOOK_COMPONENTS__.interleaveSeparators, Qn = __STORYBOOK_COMPONENTS__.nameSpaceClassNames, Xn = __STORYBOOK_COMPONENTS__.resetComponents, et = __STORYBOOK_COMPONENTS__.withReset;
        p();
        h();
        f();
        var it = __STORYBOOK_ICONS__, at = __STORYBOOK_ICONS__.AccessibilityAltIcon, ct = __STORYBOOK_ICONS__.AccessibilityIcon, lt = __STORYBOOK_ICONS__.AddIcon, st = __STORYBOOK_ICONS__.AdminIcon, ut = __STORYBOOK_ICONS__.AlertAltIcon, It = __STORYBOOK_ICONS__.AlertIcon, dt = __STORYBOOK_ICONS__.AlignLeftIcon, mt = __STORYBOOK_ICONS__.AlignRightIcon, pt = __STORYBOOK_ICONS__.AppleIcon, ht = __STORYBOOK_ICONS__.ArrowBottomLeftIcon, ft = __STORYBOOK_ICONS__.ArrowBottomRightIcon, gt = __STORYBOOK_ICONS__.ArrowDownIcon, bt = __STORYBOOK_ICONS__.ArrowLeftIcon, Ct = __STORYBOOK_ICONS__.ArrowRightIcon, yt = __STORYBOOK_ICONS__.ArrowSolidDownIcon, St = __STORYBOOK_ICONS__.ArrowSolidLeftIcon, kt = __STORYBOOK_ICONS__.ArrowSolidRightIcon, vt = __STORYBOOK_ICONS__.ArrowSolidUpIcon, Tt = __STORYBOOK_ICONS__.ArrowTopLeftIcon, _t = __STORYBOOK_ICONS__.ArrowTopRightIcon, At = __STORYBOOK_ICONS__.ArrowUpIcon, Ot = __STORYBOOK_ICONS__.AzureDevOpsIcon, Et = __STORYBOOK_ICONS__.BackIcon, Bt = __STORYBOOK_ICONS__.BasketIcon, Rt = __STORYBOOK_ICONS__.BatchAcceptIcon, wt = __STORYBOOK_ICONS__.BatchDenyIcon, xt = __STORYBOOK_ICONS__.BeakerIcon, Lt = __STORYBOOK_ICONS__.BellIcon, Pt = __STORYBOOK_ICONS__.BitbucketIcon, Mt = __STORYBOOK_ICONS__.BoldIcon, Dt = __STORYBOOK_ICONS__.BookIcon, Gt = __STORYBOOK_ICONS__.BookmarkHollowIcon, Ft = __STORYBOOK_ICONS__.BookmarkIcon, Nt = __STORYBOOK_ICONS__.BottomBarIcon, Ut = __STORYBOOK_ICONS__.BottomBarToggleIcon, Ht = __STORYBOOK_ICONS__.BoxIcon, qt = __STORYBOOK_ICONS__.BranchIcon, zt = __STORYBOOK_ICONS__.BrowserIcon, Kt = __STORYBOOK_ICONS__.ButtonIcon, Vt = __STORYBOOK_ICONS__.CPUIcon, Wt = __STORYBOOK_ICONS__.CalendarIcon, Yt = __STORYBOOK_ICONS__.CameraIcon, jt = __STORYBOOK_ICONS__.CategoryIcon, $t = __STORYBOOK_ICONS__.CertificateIcon, Zt = __STORYBOOK_ICONS__.ChangedIcon, Jt = __STORYBOOK_ICONS__.ChatIcon, Qt = __STORYBOOK_ICONS__.CheckIcon, Xt = __STORYBOOK_ICONS__.ChevronDownIcon, er = __STORYBOOK_ICONS__.ChevronLeftIcon, or = __STORYBOOK_ICONS__.ChevronRightIcon, nr = __STORYBOOK_ICONS__.ChevronSmallDownIcon, tr = __STORYBOOK_ICONS__.ChevronSmallLeftIcon, rr = __STORYBOOK_ICONS__.ChevronSmallRightIcon, ir = __STORYBOOK_ICONS__.ChevronSmallUpIcon, ar = __STORYBOOK_ICONS__.ChevronUpIcon, cr = __STORYBOOK_ICONS__.ChromaticIcon, lr = __STORYBOOK_ICONS__.ChromeIcon, sr = __STORYBOOK_ICONS__.CircleHollowIcon, Z = __STORYBOOK_ICONS__.CircleIcon, ur = __STORYBOOK_ICONS__.ClearIcon, Ir = __STORYBOOK_ICONS__.CloseAltIcon, dr = __STORYBOOK_ICONS__.CloseIcon, mr = __STORYBOOK_ICONS__.CloudHollowIcon, pr = __STORYBOOK_ICONS__.CloudIcon, hr = __STORYBOOK_ICONS__.CogIcon, fr = __STORYBOOK_ICONS__.CollapseIcon, gr = __STORYBOOK_ICONS__.CommandIcon, br = __STORYBOOK_ICONS__.CommentAddIcon, Cr = __STORYBOOK_ICONS__.CommentIcon, yr = __STORYBOOK_ICONS__.CommentsIcon, Sr = __STORYBOOK_ICONS__.CommitIcon, kr = __STORYBOOK_ICONS__.CompassIcon, vr = __STORYBOOK_ICONS__.ComponentDrivenIcon, Tr = __STORYBOOK_ICONS__.ComponentIcon, _r = __STORYBOOK_ICONS__.ContrastIcon, Ar = __STORYBOOK_ICONS__.ControlsIcon, Or = __STORYBOOK_ICONS__.CopyIcon, Er = __STORYBOOK_ICONS__.CreditIcon, Br = __STORYBOOK_ICONS__.CrossIcon, Rr = __STORYBOOK_ICONS__.DashboardIcon, wr = __STORYBOOK_ICONS__.DatabaseIcon, xr = __STORYBOOK_ICONS__.DeleteIcon, Lr = __STORYBOOK_ICONS__.DiamondIcon, Pr = __STORYBOOK_ICONS__.DirectionIcon, Mr = __STORYBOOK_ICONS__.DiscordIcon, Dr = __STORYBOOK_ICONS__.DocChartIcon, Gr = __STORYBOOK_ICONS__.DocListIcon, Fr = __STORYBOOK_ICONS__.DocumentIcon, Nr = __STORYBOOK_ICONS__.DownloadIcon, Ur = __STORYBOOK_ICONS__.DragIcon, Hr = __STORYBOOK_ICONS__.EditIcon, qr = __STORYBOOK_ICONS__.EllipsisIcon, zr = __STORYBOOK_ICONS__.EmailIcon, Kr = __STORYBOOK_ICONS__.ExpandAltIcon, Vr = __STORYBOOK_ICONS__.ExpandIcon, Wr = __STORYBOOK_ICONS__.EyeCloseIcon, Yr = __STORYBOOK_ICONS__.EyeIcon, jr = __STORYBOOK_ICONS__.FaceHappyIcon, $r = __STORYBOOK_ICONS__.FaceNeutralIcon, Zr = __STORYBOOK_ICONS__.FaceSadIcon, Jr = __STORYBOOK_ICONS__.FacebookIcon, Qr = __STORYBOOK_ICONS__.FailedIcon, Xr = __STORYBOOK_ICONS__.FastForwardIcon, ei = __STORYBOOK_ICONS__.FigmaIcon, oi = __STORYBOOK_ICONS__.FilterIcon, ni = __STORYBOOK_ICONS__.FlagIcon, ti = __STORYBOOK_ICONS__.FolderIcon, ri = __STORYBOOK_ICONS__.FormIcon, ii = __STORYBOOK_ICONS__.GDriveIcon, ai = __STORYBOOK_ICONS__.GithubIcon, ci = __STORYBOOK_ICONS__.GitlabIcon, li = __STORYBOOK_ICONS__.GlobeIcon, si = __STORYBOOK_ICONS__.GoogleIcon, ui = __STORYBOOK_ICONS__.GraphBarIcon, Ii = __STORYBOOK_ICONS__.GraphLineIcon, di = __STORYBOOK_ICONS__.GraphqlIcon, mi = __STORYBOOK_ICONS__.GridAltIcon, q = __STORYBOOK_ICONS__.GridIcon, pi = __STORYBOOK_ICONS__.GrowIcon, hi = __STORYBOOK_ICONS__.HeartHollowIcon, fi = __STORYBOOK_ICONS__.HeartIcon, gi = __STORYBOOK_ICONS__.HomeIcon, bi = __STORYBOOK_ICONS__.HourglassIcon, Ci = __STORYBOOK_ICONS__.InfoIcon, yi = __STORYBOOK_ICONS__.ItalicIcon, Si = __STORYBOOK_ICONS__.JumpToIcon, ki = __STORYBOOK_ICONS__.KeyIcon, vi = __STORYBOOK_ICONS__.LightningIcon, Ti = __STORYBOOK_ICONS__.LightningOffIcon, _i = __STORYBOOK_ICONS__.LinkBrokenIcon, Ai = __STORYBOOK_ICONS__.LinkIcon, Oi = __STORYBOOK_ICONS__.LinkedinIcon, Ei = __STORYBOOK_ICONS__.LinuxIcon, Bi = __STORYBOOK_ICONS__.ListOrderedIcon, Ri = __STORYBOOK_ICONS__.ListUnorderedIcon, wi = __STORYBOOK_ICONS__.LocationIcon, xi = __STORYBOOK_ICONS__.LockIcon, Li = __STORYBOOK_ICONS__.MarkdownIcon, Pi = __STORYBOOK_ICONS__.MarkupIcon, Mi = __STORYBOOK_ICONS__.MediumIcon, Di = __STORYBOOK_ICONS__.MemoryIcon, Gi = __STORYBOOK_ICONS__.MenuIcon, Fi = __STORYBOOK_ICONS__.MergeIcon, Ni = __STORYBOOK_ICONS__.MirrorIcon, Ui = __STORYBOOK_ICONS__.MobileIcon, Hi = __STORYBOOK_ICONS__.MoonIcon, qi = __STORYBOOK_ICONS__.NutIcon, zi = __STORYBOOK_ICONS__.OutboxIcon, Ki = __STORYBOOK_ICONS__.OutlineIcon, Vi = __STORYBOOK_ICONS__.PaintBrushIcon, Wi = __STORYBOOK_ICONS__.PaperClipIcon, Yi = __STORYBOOK_ICONS__.ParagraphIcon, ji = __STORYBOOK_ICONS__.PassedIcon, $i = __STORYBOOK_ICONS__.PhoneIcon, Zi = __STORYBOOK_ICONS__.PhotoDragIcon, z = __STORYBOOK_ICONS__.PhotoIcon, Ji = __STORYBOOK_ICONS__.PinAltIcon, Qi = __STORYBOOK_ICONS__.PinIcon, Xi = __STORYBOOK_ICONS__.PlayBackIcon, ea = __STORYBOOK_ICONS__.PlayIcon, oa = __STORYBOOK_ICONS__.PlayNextIcon, na = __STORYBOOK_ICONS__.PlusIcon, ta = __STORYBOOK_ICONS__.PointerDefaultIcon, ra = __STORYBOOK_ICONS__.PointerHandIcon, ia = __STORYBOOK_ICONS__.PowerIcon, aa = __STORYBOOK_ICONS__.PrintIcon, ca = __STORYBOOK_ICONS__.ProceedIcon, la = __STORYBOOK_ICONS__.ProfileIcon, sa = __STORYBOOK_ICONS__.PullRequestIcon, ua = __STORYBOOK_ICONS__.QuestionIcon, Ia = __STORYBOOK_ICONS__.RSSIcon, da = __STORYBOOK_ICONS__.RedirectIcon, ma = __STORYBOOK_ICONS__.ReduxIcon, J = __STORYBOOK_ICONS__.RefreshIcon, pa = __STORYBOOK_ICONS__.ReplyIcon, ha = __STORYBOOK_ICONS__.RepoIcon, fa = __STORYBOOK_ICONS__.RequestChangeIcon, ga = __STORYBOOK_ICONS__.RewindIcon, ba = __STORYBOOK_ICONS__.RulerIcon, Ca = __STORYBOOK_ICONS__.SearchIcon, ya = __STORYBOOK_ICONS__.ShareAltIcon, Sa = __STORYBOOK_ICONS__.ShareIcon, ka = __STORYBOOK_ICONS__.ShieldIcon, va = __STORYBOOK_ICONS__.SideBySideIcon, Ta = __STORYBOOK_ICONS__.SidebarAltIcon, _a = __STORYBOOK_ICONS__.SidebarAltToggleIcon, Aa = __STORYBOOK_ICONS__.SidebarIcon, Oa = __STORYBOOK_ICONS__.SidebarToggleIcon, Ea = __STORYBOOK_ICONS__.SpeakerIcon, Ba = __STORYBOOK_ICONS__.StackedIcon, Ra = __STORYBOOK_ICONS__.StarHollowIcon, wa = __STORYBOOK_ICONS__.StarIcon, xa = __STORYBOOK_ICONS__.StatusFailIcon, La = __STORYBOOK_ICONS__.StatusPassIcon, Pa = __STORYBOOK_ICONS__.StatusWarnIcon, Ma = __STORYBOOK_ICONS__.StickerIcon, Da = __STORYBOOK_ICONS__.StopAltIcon, Ga = __STORYBOOK_ICONS__.StopIcon, Fa = __STORYBOOK_ICONS__.StorybookIcon, Na = __STORYBOOK_ICONS__.StructureIcon, Ua = __STORYBOOK_ICONS__.SubtractIcon, Ha = __STORYBOOK_ICONS__.SunIcon, qa = __STORYBOOK_ICONS__.SupportIcon, za = __STORYBOOK_ICONS__.SwitchAltIcon, Ka = __STORYBOOK_ICONS__.SyncIcon, Va = __STORYBOOK_ICONS__.TabletIcon, Wa = __STORYBOOK_ICONS__.ThumbsUpIcon, Ya = __STORYBOOK_ICONS__.TimeIcon, ja = __STORYBOOK_ICONS__.TimerIcon, $a = __STORYBOOK_ICONS__.TransferIcon, Za = __STORYBOOK_ICONS__.TrashIcon, Ja = __STORYBOOK_ICONS__.TwitterIcon, Qa = __STORYBOOK_ICONS__.TypeIcon, Xa = __STORYBOOK_ICONS__.UbuntuIcon, ec = __STORYBOOK_ICONS__.UndoIcon, oc = __STORYBOOK_ICONS__.UnfoldIcon, nc = __STORYBOOK_ICONS__.UnlockIcon, tc = __STORYBOOK_ICONS__.UnpinIcon, rc = __STORYBOOK_ICONS__.UploadIcon, ic = __STORYBOOK_ICONS__.UserAddIcon, ac = __STORYBOOK_ICONS__.UserAltIcon, cc = __STORYBOOK_ICONS__.UserIcon, lc = __STORYBOOK_ICONS__.UsersIcon, sc = __STORYBOOK_ICONS__.VSCodeIcon, uc = __STORYBOOK_ICONS__.VerifiedIcon, Ic = __STORYBOOK_ICONS__.VideoIcon, dc = __STORYBOOK_ICONS__.WandIcon, mc = __STORYBOOK_ICONS__.WatchIcon, pc = __STORYBOOK_ICONS__.WindowsIcon, hc = __STORYBOOK_ICONS__.WrenchIcon, fc = __STORYBOOK_ICONS__.XIcon, gc = __STORYBOOK_ICONS__.YoutubeIcon, bc = __STORYBOOK_ICONS__.ZoomIcon, Cc = __STORYBOOK_ICONS__.ZoomOutIcon, yc = __STORYBOOK_ICONS__.ZoomResetIcon, Sc = __STORYBOOK_ICONS__.iconList;
        p();
        h();
        f();
        var Ac = __STORYBOOK_CLIENT_LOGGER__, Oc = __STORYBOOK_CLIENT_LOGGER__.deprecate, K = __STORYBOOK_CLIENT_LOGGER__.logger, Ec = __STORYBOOK_CLIENT_LOGGER__.once, Bc = __STORYBOOK_CLIENT_LOGGER__.pretty;
        var W = Ie(X());
        p();
        h();
        f();
        var Fc = __STORYBOOK_THEMING__, Nc = __STORYBOOK_THEMING__.CacheProvider, Uc = __STORYBOOK_THEMING__.ClassNames, Hc = __STORYBOOK_THEMING__.Global, qc = __STORYBOOK_THEMING__.ThemeProvider, zc = __STORYBOOK_THEMING__.background, Kc = __STORYBOOK_THEMING__.color, Vc = __STORYBOOK_THEMING__.convert, Wc = __STORYBOOK_THEMING__.create, Yc = __STORYBOOK_THEMING__.createCache, jc = __STORYBOOK_THEMING__.createGlobal, $c = __STORYBOOK_THEMING__.createReset, Zc = __STORYBOOK_THEMING__.css, Jc = __STORYBOOK_THEMING__.darken, Qc = __STORYBOOK_THEMING__.ensure, Xc = __STORYBOOK_THEMING__.ignoreSsrWarning, el = __STORYBOOK_THEMING__.isPropValid, ol = __STORYBOOK_THEMING__.jsx, nl = __STORYBOOK_THEMING__.keyframes, tl = __STORYBOOK_THEMING__.lighten, ee = __STORYBOOK_THEMING__.styled, rl = __STORYBOOK_THEMING__.themes, il = __STORYBOOK_THEMING__.typography, al = __STORYBOOK_THEMING__.useTheme, cl = __STORYBOOK_THEMING__.withTheme;
        p();
        h();
        f();
        var ne = "storybook/background", S = "backgrounds", de = {
            light: {
                name: "light",
                value: "#F8F8F8"
            },
            dark: {
                name: "dark",
                value: "#333"
            }
        }, me = B(function() {
            var _$e = P(S), _L = _sliced_to_array(L(), 3), o = _L[0], c = _L[1], r = _L[2], _F = _sliced_to_array(F(!1), 2), i = _F[0], d = _F[1], _ref = _$e || {}, tmp = _ref.options, l = tmp === void 0 ? de : tmp, tmp1 = _ref.disable, t = tmp1 === void 0 ? !0 : tmp1;
            if (t) return null;
            var n = o[S] || {}, u = n.value, a = n.grid || !1, I = l[u], s = !!(r === null || r === void 0 ? void 0 : r[S]), C = Object.keys(l).length;
            return g.createElement(pe, {
                length: C,
                backgroundMap: l,
                item: I,
                updateGlobals: c,
                backgroundName: u,
                setIsTooltipVisible: d,
                isLocked: s,
                isGridActive: a,
                isTooltipVisible: i
            });
        }), pe = B(function(e) {
            var o = e.item, c = e.length, r = e.updateGlobals, i = e.setIsTooltipVisible, d = e.backgroundMap, l = e.backgroundName, t = e.isLocked, n = e.isGridActive, u = e.isTooltipVisible, a = G(function(I) {
                r(_define_property({}, S, I));
            }, [
                r
            ]);
            return g.createElement(D, null, g.createElement(R, {
                key: "grid",
                active: n,
                disabled: t,
                title: "Apply a grid to the preview",
                onClick: function() {
                    return a({
                        value: l,
                        grid: !n
                    });
                }
            }, g.createElement(q, null)), c > 0 ? g.createElement(H, {
                key: "background",
                placement: "top",
                closeOnOutsideClick: !0,
                tooltip: function(param) {
                    var I = param.onHide;
                    return g.createElement(U, {
                        links: _to_consumable_array(o ? [
                            {
                                id: "reset",
                                title: "Reset background",
                                icon: g.createElement(J, null),
                                onClick: function() {
                                    a({
                                        value: void 0,
                                        grid: n
                                    }), I();
                                }
                            }
                        ] : []).concat(_to_consumable_array(Object.entries(d).map(function(param) {
                            var _param = _sliced_to_array(param, 2), s = _param[0], C = _param[1];
                            return {
                                id: s,
                                title: C.name,
                                icon: g.createElement(Z, {
                                    color: (C === null || C === void 0 ? void 0 : C.value) || "grey"
                                }),
                                active: s === l,
                                onClick: function() {
                                    a({
                                        value: s,
                                        grid: n
                                    }), I();
                                }
                            };
                        })))
                    });
                },
                onVisibleChange: i
            }, g.createElement(R, {
                disabled: t,
                key: "background",
                title: "Change the background of the preview",
                active: !!o || u
            }, g.createElement(z, null))) : null);
        }), he = ee.span(function(param) {
            var _$e = param.background;
            return {
                borderRadius: "1rem",
                display: "block",
                height: "1rem",
                width: "1rem",
                background: _$e
            };
        }, function(param) {
            var _$e = param.theme;
            return {
                boxShadow: "".concat(_$e.appBorderColor, " 0 0 0 1px inset")
            };
        }), fe = function(e) {
            var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], c = arguments.length > 2 ? arguments[2] : void 0;
            if (e === "transparent") return "transparent";
            if (o.find(function(i) {
                return i.value === e;
            }) || e) return e;
            var r = o.find(function(i) {
                return i.name === c;
            });
            if (r) return r.value;
            if (c) {
                var i = o.map(function(d) {
                    return d.name;
                }).join(", ");
                K.warn(oe(_templateObject(), c, i));
            }
            return "transparent";
        }, te = (0, W.default)(1e3)(function(e, o, c, r, i, d) {
            return {
                id: e || o,
                title: o,
                onClick: function() {
                    i({
                        selected: c,
                        name: o
                    });
                },
                value: c,
                right: r ? g.createElement(he, {
                    background: c
                }) : void 0,
                active: d
            };
        }), ge = (0, W.default)(10)(function(e, o, c) {
            var r = e.map(function(param) {
                var i = param.name, d = param.value;
                return te(null, i, d, !0, c, d === o);
            });
            return o !== "transparent" ? [
                te("reset", "Clear background", "transparent", null, c, !1)
            ].concat(_to_consumable_array(r)) : r;
        }), be = {
            default: null,
            disable: !0,
            values: []
        }, Ce = B(function() {
            var _r_S;
            var _$e = P(S, be), _F = _sliced_to_array(F(!1), 2), o = _F[0], c = _F[1], _L = _sliced_to_array(L(), 2), r = _L[0], i = _L[1], d = (_r_S = r[S]) === null || _r_S === void 0 ? void 0 : _r_S.value, l = j(function() {
                return fe(d, _$e.values, _$e.default);
            }, [
                _$e,
                d
            ]);
            Array.isArray(_$e) && K.warn("Addon Backgrounds api has changed in Storybook 6.0. Please refer to the migration guide: https://github.com/storybookjs/storybook/blob/next/MIGRATION.md");
            var t = G(function(n) {
                i(_define_property({}, S, _object_spread_props(_object_spread({}, r[S]), {
                    value: n
                })));
            }, [
                _$e,
                r,
                i
            ]);
            return _$e.disable ? null : g.createElement(H, {
                placement: "top",
                closeOnOutsideClick: !0,
                tooltip: function(param) {
                    var n = param.onHide;
                    return g.createElement(U, {
                        links: ge(_$e.values, l, function(param) {
                            var u = param.selected;
                            l !== u && t(u), n();
                        })
                    });
                },
                onVisibleChange: c
            }, g.createElement(R, {
                key: "background",
                title: "Change the background of the preview",
                active: l !== "transparent" || o
            }, g.createElement(z, null)));
        }), ye = B(function() {
            var _e_S;
            var _L = _sliced_to_array(L(), 2), _$e = _L[0], o = _L[1], _P = P(S, {
                grid: {
                    disable: !1
                }
            }), c = _P.grid;
            if (c === null || c === void 0 ? void 0 : c.disable) return null;
            var r = ((_e_S = _$e[S]) === null || _e_S === void 0 ? void 0 : _e_S.grid) || !1;
            return g.createElement(R, {
                key: "background",
                active: r,
                title: "Apply a grid to the preview",
                onClick: function() {
                    return o(_define_property({}, S, _object_spread_props(_object_spread({}, _$e[S]), {
                        grid: !r
                    })));
                }
            }, g.createElement(q, null));
        });
        N.register(ne, function() {
            N.add(ne, {
                title: "Backgrounds",
                type: $.TOOL,
                match: function(param) {
                    var _$e = param.viewMode, o = param.tabId;
                    return !!(_$e && _$e.match(/^(story|docs)$/)) && !o;
                },
                render: function() {
                    var _FEATURES;
                    return ((_FEATURES = FEATURES) === null || _FEATURES === void 0 ? void 0 : _FEATURES.backgroundsStoryGlobals) ? g.createElement(me, null) : g.createElement(D, null, g.createElement(Ce, null), g.createElement(ye, null));
                }
            });
        });
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
