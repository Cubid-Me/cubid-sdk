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
        var l = __REACT__, se = __REACT__.Children, ie = __REACT__.Component, ue = __REACT__.Fragment, ce = __REACT__.Profiler, pe = __REACT__.PureComponent, me = __REACT__.StrictMode, de = __REACT__.Suspense, be = __REACT__.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Se = __REACT__.cloneElement, Te = __REACT__.createContext, ye = __REACT__.createElement, _e = __REACT__.createFactory, fe = __REACT__.createRef, Ce = __REACT__.forwardRef, ve = __REACT__.isValidElement, Ie = __REACT__.lazy, Oe = __REACT__.memo, Ee = __REACT__.startTransition, xe = __REACT__.unstable_act, C = __REACT__.useCallback, ge = __REACT__.useContext, ke = __REACT__.useDebugValue, he = __REACT__.useDeferredValue, g = __REACT__.useEffect, Ae = __REACT__.useId, Re = __REACT__.useImperativeHandle, Le = __REACT__.useInsertionEffect, Be = __REACT__.useLayoutEffect, Me = __REACT__.useMemo, Pe = __REACT__.useReducer, L = __REACT__.useRef, B = __REACT__.useState, Ne = __REACT__.useSyncExternalStore, we = __REACT__.useTransition, Ve = __REACT__.version;
        var We = __STORYBOOK_API__, Ke = __STORYBOOK_API__.ActiveTabs, Ye = __STORYBOOK_API__.Consumer, $e = __STORYBOOK_API__.ManagerContext, qe = __STORYBOOK_API__.Provider, ze = __STORYBOOK_API__.RequestResponseError, k = __STORYBOOK_API__.addons, Ue = __STORYBOOK_API__.combineParameters, je = __STORYBOOK_API__.controlOrMetaKey, Ze = __STORYBOOK_API__.controlOrMetaSymbol, Je = __STORYBOOK_API__.eventMatchesShortcut, Qe = __STORYBOOK_API__.eventToShortcut, Xe = __STORYBOOK_API__.experimental_requestResponse, et = __STORYBOOK_API__.isMacLike, tt = __STORYBOOK_API__.isShortcutTaken, ot = __STORYBOOK_API__.keyToSymbol, rt = __STORYBOOK_API__.merge, at = __STORYBOOK_API__.mockChannel, lt = __STORYBOOK_API__.optionOrAltSymbol, nt = __STORYBOOK_API__.shortcutMatchesShortcut, st = __STORYBOOK_API__.shortcutToHumanString, M = __STORYBOOK_API__.types, it = __STORYBOOK_API__.useAddonState, ut = __STORYBOOK_API__.useArgTypes, ct = __STORYBOOK_API__.useArgs, pt = __STORYBOOK_API__.useChannel, P = __STORYBOOK_API__.useGlobalTypes, h = __STORYBOOK_API__.useGlobals, mt = __STORYBOOK_API__.useParameter, dt = __STORYBOOK_API__.useSharedState, bt = __STORYBOOK_API__.useStoryPrepared, N = __STORYBOOK_API__.useStorybookApi, St = __STORYBOOK_API__.useStorybookState;
        var Ct = __STORYBOOK_COMPONENTS__, vt = __STORYBOOK_COMPONENTS__.A, It = __STORYBOOK_COMPONENTS__.ActionBar, Ot = __STORYBOOK_COMPONENTS__.AddonPanel, Et = __STORYBOOK_COMPONENTS__.Badge, xt = __STORYBOOK_COMPONENTS__.Bar, gt = __STORYBOOK_COMPONENTS__.Blockquote, kt = __STORYBOOK_COMPONENTS__.Button, ht = __STORYBOOK_COMPONENTS__.ClipboardCode, At = __STORYBOOK_COMPONENTS__.Code, Rt = __STORYBOOK_COMPONENTS__.DL, Lt = __STORYBOOK_COMPONENTS__.Div, Bt = __STORYBOOK_COMPONENTS__.DocumentWrapper, Mt = __STORYBOOK_COMPONENTS__.EmptyTabContent, Pt = __STORYBOOK_COMPONENTS__.ErrorFormatter, Nt = __STORYBOOK_COMPONENTS__.FlexBar, wt = __STORYBOOK_COMPONENTS__.Form, Vt = __STORYBOOK_COMPONENTS__.H1, Dt = __STORYBOOK_COMPONENTS__.H2, Ht = __STORYBOOK_COMPONENTS__.H3, Ft = __STORYBOOK_COMPONENTS__.H4, Gt = __STORYBOOK_COMPONENTS__.H5, Wt = __STORYBOOK_COMPONENTS__.H6, Kt = __STORYBOOK_COMPONENTS__.HR, w = __STORYBOOK_COMPONENTS__.IconButton, Yt = __STORYBOOK_COMPONENTS__.IconButtonSkeleton, A = __STORYBOOK_COMPONENTS__.Icons, $t = __STORYBOOK_COMPONENTS__.Img, qt = __STORYBOOK_COMPONENTS__.LI, zt = __STORYBOOK_COMPONENTS__.Link, Ut = __STORYBOOK_COMPONENTS__.ListItem, jt = __STORYBOOK_COMPONENTS__.Loader, Zt = __STORYBOOK_COMPONENTS__.Modal, Jt = __STORYBOOK_COMPONENTS__.OL, Qt = __STORYBOOK_COMPONENTS__.P, Xt = __STORYBOOK_COMPONENTS__.Placeholder, eo = __STORYBOOK_COMPONENTS__.Pre, to = __STORYBOOK_COMPONENTS__.ResetWrapper, oo = __STORYBOOK_COMPONENTS__.ScrollArea, V = __STORYBOOK_COMPONENTS__.Separator, ro = __STORYBOOK_COMPONENTS__.Spaced, ao = __STORYBOOK_COMPONENTS__.Span, lo = __STORYBOOK_COMPONENTS__.StorybookIcon, no = __STORYBOOK_COMPONENTS__.StorybookLogo, so = __STORYBOOK_COMPONENTS__.Symbols, io = __STORYBOOK_COMPONENTS__.SyntaxHighlighter, uo = __STORYBOOK_COMPONENTS__.TT, co = __STORYBOOK_COMPONENTS__.TabBar, po = __STORYBOOK_COMPONENTS__.TabButton, mo = __STORYBOOK_COMPONENTS__.TabWrapper, bo = __STORYBOOK_COMPONENTS__.Table, So = __STORYBOOK_COMPONENTS__.Tabs, To = __STORYBOOK_COMPONENTS__.TabsState, D = __STORYBOOK_COMPONENTS__.TooltipLinkList, yo = __STORYBOOK_COMPONENTS__.TooltipMessage, _o = __STORYBOOK_COMPONENTS__.TooltipNote, fo = __STORYBOOK_COMPONENTS__.UL, H = __STORYBOOK_COMPONENTS__.WithTooltip, Co = __STORYBOOK_COMPONENTS__.WithTooltipPure, vo = __STORYBOOK_COMPONENTS__.Zoom, Io = __STORYBOOK_COMPONENTS__.codeCommon, Oo = __STORYBOOK_COMPONENTS__.components, Eo = __STORYBOOK_COMPONENTS__.createCopyToClipboardFunction, xo = __STORYBOOK_COMPONENTS__.getStoryHref, go = __STORYBOOK_COMPONENTS__.icons, ko = __STORYBOOK_COMPONENTS__.interleaveSeparators, ho = __STORYBOOK_COMPONENTS__.nameSpaceClassNames, Ao = __STORYBOOK_COMPONENTS__.resetComponents, Ro = __STORYBOOK_COMPONENTS__.withReset;
        var K = {
            type: "item",
            value: ""
        }, Y = function(o, t) {
            return _object_spread_props(_object_spread({}, t), {
                name: t.name || o,
                description: t.description || o,
                toolbar: _object_spread_props(_object_spread({}, t.toolbar), {
                    items: t.toolbar.items.map(function(e) {
                        var r = typeof e == "string" ? {
                            value: e,
                            title: e
                        } : e;
                        return r.type === "reset" && t.toolbar.icon && (r.icon = t.toolbar.icon, r.hideIcon = !0), _object_spread({}, K, r);
                    })
                })
            });
        }, $ = [
            "reset"
        ], q = function(o) {
            return o.filter(function(t) {
                return !$.includes(t.type);
            }).map(function(t) {
                return t.value;
            });
        }, S = "addon-toolbars", z = /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function(o, t, e) {
                var _tmp, _tmp1, _tmp2;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _tmp = e && e.next;
                            if (!_tmp) return [
                                3,
                                2
                            ];
                            return [
                                4,
                                o.setAddonShortcut(S, {
                                    label: e.next.label,
                                    defaultShortcut: e.next.keys,
                                    actionName: "".concat(t, ":next"),
                                    action: e.next.action
                                })
                            ];
                        case 1:
                            _tmp = _state.sent();
                            _state.label = 2;
                        case 2:
                            _tmp;
                            _tmp1 = e && e.previous;
                            if (!_tmp1) return [
                                3,
                                4
                            ];
                            return [
                                4,
                                o.setAddonShortcut(S, {
                                    label: e.previous.label,
                                    defaultShortcut: e.previous.keys,
                                    actionName: "".concat(t, ":previous"),
                                    action: e.previous.action
                                })
                            ];
                        case 3:
                            _tmp1 = _state.sent();
                            _state.label = 4;
                        case 4:
                            _tmp1;
                            _tmp2 = e && e.reset;
                            if (!_tmp2) return [
                                3,
                                6
                            ];
                            return [
                                4,
                                o.setAddonShortcut(S, {
                                    label: e.reset.label,
                                    defaultShortcut: e.reset.keys,
                                    actionName: "".concat(t, ":reset"),
                                    action: e.reset.action
                                })
                            ];
                        case 5:
                            _tmp2 = _state.sent();
                            _state.label = 6;
                        case 6:
                            _tmp2;
                            return [
                                2
                            ];
                    }
                });
            });
            return function z(o, t, e) {
                return _ref.apply(this, arguments);
            };
        }(), U = function(o) {
            return function(t) {
                var _$e = t.id, _t_toolbar = t.toolbar, r = _t_toolbar.items, a = _t_toolbar.shortcuts, c = N(), _h = _sliced_to_array(h(), 2), T = _h[0], i = _h[1], n = L([]), u = T[_$e], v = C(function() {
                    i(_define_property({}, _$e, ""));
                }, [
                    i
                ]), I = C(function() {
                    var s = n.current, m = s.indexOf(u), d = m === s.length - 1 ? 0 : m + 1, p = n.current[d];
                    i(_define_property({}, _$e, p));
                }, [
                    n,
                    u,
                    i
                ]), O = C(function() {
                    var s = n.current, m = s.indexOf(u), d = m > -1 ? m : 0, p = d === 0 ? s.length - 1 : d - 1, b = n.current[p];
                    i(_define_property({}, _$e, b));
                }, [
                    n,
                    u,
                    i
                ]);
                return g(function() {
                    a && z(c, _$e, {
                        next: _object_spread_props(_object_spread({}, a.next), {
                            action: I
                        }),
                        previous: _object_spread_props(_object_spread({}, a.previous), {
                            action: O
                        }),
                        reset: _object_spread_props(_object_spread({}, a.reset), {
                            action: v
                        })
                    });
                }, [
                    c,
                    _$e,
                    a,
                    I,
                    O,
                    v
                ]), g(function() {
                    n.current = q(r);
                }, []), l.createElement(o, _object_spread({
                    cycleValues: n.current
                }, t));
            };
        }, F = function(param) {
            var o = param.currentValue, t = param.items;
            return o != null && t.find(function(e) {
                return e.value === o && e.type !== "reset";
            });
        }, j = function(param) {
            var o = param.currentValue, t = param.items;
            var _$e = F({
                currentValue: o,
                items: t
            });
            if (_$e) return _$e.icon;
        }, Z = function(param) {
            var o = param.currentValue, t = param.items;
            var _$e = F({
                currentValue: o,
                items: t
            });
            if (_$e) return _$e.title;
        }, J = function(param) {
            var o = param.active, t = param.disabled, _$e = param.title, r = param.icon, a = param.description, c = param.onClick;
            return l.createElement(w, {
                active: o,
                title: a,
                disabled: t,
                onClick: t ? function() {} : c
            }, r && l.createElement(A, {
                icon: r,
                __suppressDeprecationWarning: !0
            }), _$e ? "\xa0".concat(_$e) : null);
        }, Q = function(param) {
            var o = param.right, t = param.title, _$e = param.value, r = param.icon, a = param.hideIcon, c = param.onClick, T = param.disabled, i = param.currentValue;
            var n = r && l.createElement(A, {
                style: {
                    opacity: 1
                },
                icon: r
            }), u = {
                id: _$e !== null && _$e !== void 0 ? _$e : "_reset",
                active: i === _$e,
                right: o,
                title: t,
                disabled: T,
                onClick: c
            };
            return r && !a && (u.icon = n), u;
        }, X = U(function(param) {
            var o = param.id, t = param.name, _$e = param.description, _param_toolbar = param.toolbar, r = _param_toolbar.icon, a = _param_toolbar.items, c = _param_toolbar.title, T = _param_toolbar.preventDynamicIcon, i = _param_toolbar.dynamicTitle;
            var _h = _sliced_to_array(h(), 3), n = _h[0], u = _h[1], v = _h[2], _B = _sliced_to_array(B(!1), 2), I = _B[0], O = _B[1], s = n[o], m = !!s, d = o in v, p = r, b = c;
            T || (p = j({
                currentValue: s,
                items: a
            }) || p), i && (b = Z({
                currentValue: s,
                items: a
            }) || b), !b && !p && console.warn("Toolbar '".concat(t, "' has no title or icon"));
            var G = C(function(x) {
                u(_define_property({}, o, x));
            }, [
                o,
                u
            ]);
            return l.createElement(H, {
                placement: "top",
                tooltip: function(param) {
                    var x = param.onHide;
                    var W = a.filter(function(param) {
                        var E = param.type;
                        var R = !0;
                        return E === "reset" && !s && (R = !1), R;
                    }).map(function(E) {
                        return Q(_object_spread_props(_object_spread({}, E), {
                            currentValue: s,
                            disabled: d,
                            onClick: function() {
                                G(E.value), x();
                            }
                        }));
                    });
                    return l.createElement(D, {
                        links: W
                    });
                },
                closeOnOutsideClick: !0,
                onVisibleChange: O
            }, l.createElement(J, {
                active: I || m,
                disabled: d,
                description: _$e || "",
                icon: p,
                title: b || ""
            }));
        }), ee = function() {
            var o = P(), t = Object.keys(o).filter(function(e) {
                return !!o[e].toolbar;
            });
            return t.length ? l.createElement(l.Fragment, null, l.createElement(V, null), t.map(function(e) {
                var r = Y(e, o[e]);
                return l.createElement(X, _object_spread({
                    key: e,
                    id: e
                }, r));
            })) : null;
        };
        k.register(S, function() {
            return k.add(S, {
                title: S,
                type: M.TOOL,
                match: function(param) {
                    var o = param.tabId;
                    return !o;
                },
                render: function() {
                    return l.createElement(ee, null);
                }
            });
        });
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
