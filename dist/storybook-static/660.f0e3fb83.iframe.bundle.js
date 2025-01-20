function _assert_this_initialized(self1) {
    if (self1 === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self1;
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
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
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
function _possible_constructor_return(self1, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self1);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
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
(self.webpackChunkcubid_sdk = self.webpackChunkcubid_sdk || []).push([
    [
        660,
        735
    ],
    {
        "./node_modules/@storybook/addon-docs/dist/DocsRenderer-CFRXHY34.mjs": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
                DocsRenderer: function() {
                    return DocsRenderer;
                }
            });
            var react = __webpack_require__("./node_modules/react/index.js"), dist = __webpack_require__("./node_modules/@storybook/blocks/dist/index.mjs"), react_18 = __webpack_require__("./node_modules/@storybook/react-dom-shim/dist/react-18.mjs"), defaultComponents = _object_spread({
                code: dist.XA,
                a: dist.zE
            }, dist.Sw), ErrorBoundary = /*#__PURE__*/ function(_react_Component) {
                _inherits(ErrorBoundary, _react_Component);
                function ErrorBoundary() {
                    _class_call_check(this, ErrorBoundary);
                    var _this;
                    _this = _call_super(this, ErrorBoundary, arguments), _this.state = {
                        hasError: !1
                    };
                    return _this;
                }
                _create_class(ErrorBoundary, [
                    {
                        key: "componentDidCatch",
                        value: function componentDidCatch(err) {
                            var showException = this.props.showException;
                            showException(err);
                        }
                    },
                    {
                        key: "render",
                        value: function render() {
                            var hasError = this.state.hasError, children = this.props.children;
                            return hasError ? null : react.createElement(react.Fragment, null, children);
                        }
                    }
                ], [
                    {
                        key: "getDerivedStateFromError",
                        value: function getDerivedStateFromError() {
                            return {
                                hasError: !0
                            };
                        }
                    }
                ]);
                return ErrorBoundary;
            }(react.Component), DocsRenderer = function DocsRenderer() {
                _class_call_check(this, DocsRenderer);
                this.render = /*#__PURE__*/ function() {
                    var _ref = _async_to_generator(function(context, docsParameter, element) {
                        var components, TDocs;
                        return _ts_generator(this, function(_state) {
                            components = _object_spread({}, defaultComponents, docsParameter === null || docsParameter === void 0 ? void 0 : docsParameter.components), TDocs = dist.kQ;
                            return [
                                2,
                                new Promise(function(resolve, reject) {
                                    __webpack_require__.e(294).then(__webpack_require__.bind(__webpack_require__, "./node_modules/@mdx-js/react/index.js")).then(function(param) {
                                        var MDXProvider = param.MDXProvider;
                                        return (0, react_18.renderElement)(react.createElement(ErrorBoundary, {
                                            showException: reject,
                                            key: Math.random()
                                        }, react.createElement(MDXProvider, {
                                            components: components
                                        }, react.createElement(TDocs, {
                                            context: context,
                                            docsParameter: docsParameter
                                        }))), element);
                                    }).then(function() {
                                        return resolve();
                                    });
                                })
                            ];
                        });
                    });
                    return function(context, docsParameter, element) {
                        return _ref.apply(this, arguments);
                    };
                }(), this.unmount = function(element) {
                    (0, react_18.unmountElement)(element);
                };
            };
            __webpack_require__("./node_modules/@storybook/addon-docs/dist/chunk-H6MOWX77.mjs");
        },
        "./node_modules/@storybook/core/dist/components sync recursive": function(module) {
            var webpackEmptyContext = function webpackEmptyContext(req) {
                var e = new Error("Cannot find module '" + req + "'");
                throw e.code = "MODULE_NOT_FOUND", e;
            };
            webpackEmptyContext.keys = function() {
                return [];
            }, webpackEmptyContext.resolve = webpackEmptyContext, webpackEmptyContext.id = "./node_modules/@storybook/core/dist/components sync recursive", module.exports = webpackEmptyContext;
        },
        "./node_modules/@storybook/core/dist/theming sync recursive": function(module) {
            var webpackEmptyContext = function webpackEmptyContext(req) {
                var e = new Error("Cannot find module '" + req + "'");
                throw e.code = "MODULE_NOT_FOUND", e;
            };
            webpackEmptyContext.keys = function() {
                return [];
            }, webpackEmptyContext.resolve = webpackEmptyContext, webpackEmptyContext.id = "./node_modules/@storybook/core/dist/theming sync recursive", module.exports = webpackEmptyContext;
        },
        "./node_modules/@storybook/react-dom-shim/dist/react-18.mjs": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
                renderElement: function() {
                    return renderElement;
                },
                unmountElement: function() {
                    return unmountElement;
                }
            });
            var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js"), react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/react-dom/client.js"), nodes = new Map;
            var WithCallback = function(param) {
                var callback = param.callback, children = param.children;
                var once = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
                return react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(function() {
                    once.current !== callback && (once.current = callback, callback());
                }, [
                    callback
                ]), children;
            };
            _type_of(Promise.withResolvers) > "u" && (Promise.withResolvers = function() {
                var resolve = null, reject = null;
                return {
                    promise: new Promise(function(res, rej) {
                        resolve = res, reject = rej;
                    }),
                    resolve: resolve,
                    reject: reject
                };
            });
            var renderElement = /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(node, el, rootOptions) {
                    var root, _Promise_withResolvers, promise, resolve;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                return [
                                    4,
                                    getReactRoot(el, rootOptions)
                                ];
                            case 1:
                                root = _state.sent();
                                if (function getIsReactActEnvironment() {
                                    return globalThis.IS_REACT_ACT_ENVIRONMENT;
                                }()) return [
                                    2,
                                    void root.render(node)
                                ];
                                _Promise_withResolvers = Promise.withResolvers(), promise = _Promise_withResolvers.promise, resolve = _Promise_withResolvers.resolve;
                                return [
                                    2,
                                    (root.render(react__WEBPACK_IMPORTED_MODULE_0__.createElement(WithCallback, {
                                        callback: resolve
                                    }, node)), promise)
                                ];
                        }
                    });
                });
                return function renderElement(node, el, rootOptions) {
                    return _ref.apply(this, arguments);
                };
            }(), unmountElement = function(el, shouldUseNewRootApi) {
                var root = nodes.get(el);
                root && (root.unmount(), nodes.delete(el));
            }, getReactRoot = /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(el, rootOptions) {
                    var root;
                    return _ts_generator(this, function(_state) {
                        root = nodes.get(el);
                        return [
                            2,
                            (root || (root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.H(el, rootOptions), nodes.set(el, root)), root)
                        ];
                    });
                });
                return function getReactRoot(el, rootOptions) {
                    return _ref.apply(this, arguments);
                };
            }();
        },
        "./node_modules/memoizerific sync recursive": function(module) {
            var webpackEmptyContext = function webpackEmptyContext(req) {
                var e = new Error("Cannot find module '" + req + "'");
                throw e.code = "MODULE_NOT_FOUND", e;
            };
            webpackEmptyContext.keys = function() {
                return [];
            }, webpackEmptyContext.resolve = webpackEmptyContext, webpackEmptyContext.id = "./node_modules/memoizerific sync recursive", module.exports = webpackEmptyContext;
        },
        "./node_modules/react-dom/client.js": function(__unused_webpack_module, exports, __webpack_require__) {
            "use strict";
            var m = __webpack_require__("./node_modules/react-dom/index.js");
            exports.H = m.createRoot, m.hydrateRoot;
        }
    }
]);
