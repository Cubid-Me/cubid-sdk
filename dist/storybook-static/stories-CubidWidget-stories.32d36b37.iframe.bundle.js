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
        820
    ],
    {
        "./src/stories/CubidWidget.stories.tsx": function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
            var _GoogleWidget_parameters, _GoogleWidget_parameters_docs, _GoogleWidget_parameters1, _DiscordWidget_parameters, _DiscordWidget_parameters_docs, _DiscordWidget_parameters1, _AddressWidget_parameters, _AddressWidget_parameters_docs, _AddressWidget_parameters1, _PhoneWidget_parameters, _PhoneWidget_parameters_docs, _PhoneWidget_parameters1;
            __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
                AddressWidget: function() {
                    return AddressWidget;
                },
                DiscordWidget: function() {
                    return DiscordWidget;
                },
                GoogleWidget: function() {
                    return GoogleWidget;
                },
                PhoneWidget: function() {
                    return PhoneWidget;
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
                title: "Cubid/Widget",
                component: __webpack_require__("./src/component/cubidWidget.tsx").I,
                tags: [
                    "autodocs"
                ],
                parameters: {
                    layout: "fullscreen"
                },
                args: {
                    stampToRender: "",
                    uuid: "",
                    page_id: "",
                    api_key: ""
                }
            }, GoogleWidget = {
                args: {
                    stampToRender: "google",
                    uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
                    page_id: "35",
                    api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"
                }
            }, DiscordWidget = {
                args: {
                    stampToRender: "discord",
                    uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
                    page_id: "35",
                    api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"
                }
            }, AddressWidget = {
                args: {
                    stampToRender: "address",
                    uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
                    page_id: "35",
                    api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"
                }
            }, PhoneWidget = {
                args: {
                    stampToRender: "phone",
                    uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
                    page_id: "35",
                    api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"
                }
            }, __namedExportsOrder = [
                "GoogleWidget",
                "DiscordWidget",
                "AddressWidget",
                "PhoneWidget"
            ];
            GoogleWidget.parameters = _object_spread_props(_object_spread({}, GoogleWidget.parameters), {
                docs: _object_spread_props(_object_spread({}, (_GoogleWidget_parameters = GoogleWidget.parameters) === null || _GoogleWidget_parameters === void 0 ? void 0 : _GoogleWidget_parameters.docs), {
                    source: _object_spread({
                        originalSource: '{\n  args: {\n    stampToRender: "google",\n    uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",\n    page_id: "35",\n    api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"\n  }\n}'
                    }, (_GoogleWidget_parameters1 = GoogleWidget.parameters) === null || _GoogleWidget_parameters1 === void 0 ? void 0 : (_GoogleWidget_parameters_docs = _GoogleWidget_parameters1.docs) === null || _GoogleWidget_parameters_docs === void 0 ? void 0 : _GoogleWidget_parameters_docs.source)
                })
            }), DiscordWidget.parameters = _object_spread_props(_object_spread({}, DiscordWidget.parameters), {
                docs: _object_spread_props(_object_spread({}, (_DiscordWidget_parameters = DiscordWidget.parameters) === null || _DiscordWidget_parameters === void 0 ? void 0 : _DiscordWidget_parameters.docs), {
                    source: _object_spread({
                        originalSource: '{\n  args: {\n    stampToRender: "discord",\n    uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",\n    page_id: "35",\n    api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"\n  }\n}'
                    }, (_DiscordWidget_parameters1 = DiscordWidget.parameters) === null || _DiscordWidget_parameters1 === void 0 ? void 0 : (_DiscordWidget_parameters_docs = _DiscordWidget_parameters1.docs) === null || _DiscordWidget_parameters_docs === void 0 ? void 0 : _DiscordWidget_parameters_docs.source)
                })
            }), AddressWidget.parameters = _object_spread_props(_object_spread({}, AddressWidget.parameters), {
                docs: _object_spread_props(_object_spread({}, (_AddressWidget_parameters = AddressWidget.parameters) === null || _AddressWidget_parameters === void 0 ? void 0 : _AddressWidget_parameters.docs), {
                    source: _object_spread({
                        originalSource: '{\n  args: {\n    stampToRender: "address",\n    uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",\n    page_id: "35",\n    api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"\n  }\n}'
                    }, (_AddressWidget_parameters1 = AddressWidget.parameters) === null || _AddressWidget_parameters1 === void 0 ? void 0 : (_AddressWidget_parameters_docs = _AddressWidget_parameters1.docs) === null || _AddressWidget_parameters_docs === void 0 ? void 0 : _AddressWidget_parameters_docs.source)
                })
            }), PhoneWidget.parameters = _object_spread_props(_object_spread({}, PhoneWidget.parameters), {
                docs: _object_spread_props(_object_spread({}, (_PhoneWidget_parameters = PhoneWidget.parameters) === null || _PhoneWidget_parameters === void 0 ? void 0 : _PhoneWidget_parameters.docs), {
                    source: _object_spread({
                        originalSource: '{\n  args: {\n    stampToRender: "phone",\n    uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",\n    page_id: "35",\n    api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"\n  }\n}'
                    }, (_PhoneWidget_parameters1 = PhoneWidget.parameters) === null || _PhoneWidget_parameters1 === void 0 ? void 0 : (_PhoneWidget_parameters_docs = _PhoneWidget_parameters1.docs) === null || _PhoneWidget_parameters_docs === void 0 ? void 0 : _PhoneWidget_parameters_docs.source)
                })
            });
        }
    }
]);
