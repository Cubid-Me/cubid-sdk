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
(self.webpackChunkcubid_sdk = self.webpackChunkcubid_sdk || []).push([
    [
        784
    ],
    {
        "./src/stories/CubidWidgetCollection.stories.tsx": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            var _StampCollection_parameters, _StampCollection_parameters_docs, _StampCollection_parameters1;
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                StampCollection: function() {
                    return StampCollection;
                },
                __namedExportsOrder: function() {
                    return __namedExportsOrder;
                },
                default: function() {
                    return __WEBPACK_DEFAULT_EXPORT__;
                }
            });
            __webpack_require__("./node_modules/tailwindcss/tailwind.css");
            var __WEBPACK_DEFAULT_EXPORT__ = {
                title: "Cubid/WidgetCollection",
                component: __webpack_require__("./src/component/cubidWidget.tsx").A,
                tags: [
                    "autodocs"
                ],
                parameters: {
                    layout: "fullscreen"
                },
                args: {
                    stampToRender: [],
                    uuid: "",
                    page_id: "",
                    api_key: ""
                }
            }, StampCollection = {
                args: {
                    stampToRender: [
                        "google",
                        "discord",
                        "github"
                    ],
                    uuid: "9ca584b0-dd55-441a-b72e-d06a72ff156d",
                    page_id: "35",
                    api_key: "653529fd-a25b-4340-ba2b-d87ded675ed1"
                }
            }, __namedExportsOrder = [
                "StampCollection"
            ];
            StampCollection.parameters = _object_spread_props(_object_spread({}, StampCollection.parameters), {
                docs: _object_spread_props(_object_spread({}, (_StampCollection_parameters = StampCollection.parameters) === null || _StampCollection_parameters === void 0 ? void 0 : _StampCollection_parameters.docs), {
                    source: _object_spread({
                        originalSource: '{\n  args: {\n    stampToRender: ["google", \'discord\', \'github\'],\n    uuid: "9ca584b0-dd55-441a-b72e-d06a72ff156d",\n    page_id: "35",\n    api_key: "653529fd-a25b-4340-ba2b-d87ded675ed1"\n  }\n}'
                    }, (_StampCollection_parameters1 = StampCollection.parameters) === null || _StampCollection_parameters1 === void 0 ? void 0 : (_StampCollection_parameters_docs = _StampCollection_parameters1.docs) === null || _StampCollection_parameters_docs === void 0 ? void 0 : _StampCollection_parameters_docs.source)
                })
            });
        }
    }
]);
