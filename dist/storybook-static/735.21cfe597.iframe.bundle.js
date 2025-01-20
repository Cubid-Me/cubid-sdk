"use strict";
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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
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
        735
    ],
    {
        "./node_modules/@storybook/react-dom-shim/dist/react-18.mjs": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
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
        "./node_modules/react-dom/client.js": function(__unused_webpack_module, exports, __webpack_require__) {
            var m = __webpack_require__("./node_modules/react-dom/index.js");
            exports.H = m.createRoot, m.hydrateRoot;
        }
    }
]);
