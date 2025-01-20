"use strict";
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
(self.webpackChunkcubid_sdk = self.webpackChunkcubid_sdk || []).push([
    [
        294
    ],
    {
        "./node_modules/@mdx-js/react/index.js": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                MDXProvider: function() {
                    return _lib_index_js__WEBPACK_IMPORTED_MODULE_0__.x;
                },
                useMDXComponents: function() {
                    return _lib_index_js__WEBPACK_IMPORTED_MODULE_0__.R;
                }
            });
            var _lib_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@mdx-js/react/lib/index.js");
        },
        "./node_modules/@mdx-js/react/lib/index.js": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            var useMDXComponents = function useMDXComponents(components) {
                var contextComponents = react__WEBPACK_IMPORTED_MODULE_0__.useContext(MDXContext);
                return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(function() {
                    return "function" == typeof components ? components(contextComponents) : _object_spread({}, contextComponents, components);
                }, [
                    contextComponents,
                    components
                ]);
            };
            var MDXProvider = function MDXProvider(properties) {
                var allComponents;
                return allComponents = properties.disableParentContext ? "function" == typeof properties.components ? properties.components(emptyComponents) : properties.components || emptyComponents : useMDXComponents(properties.components), react__WEBPACK_IMPORTED_MODULE_0__.createElement(MDXContext.Provider, {
                    value: allComponents
                }, properties.children);
            };
            __webpack_require__.d(__webpack_exports__, {
                R: function() {
                    return useMDXComponents;
                },
                x: function() {
                    return MDXProvider;
                }
            });
            var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/react/index.js");
            var emptyComponents = {}, MDXContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(emptyComponents);
        }
    }
]);
