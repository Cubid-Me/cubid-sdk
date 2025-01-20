function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
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
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
function _templateObject() {
    var data = _tagged_template_literal([
        "\n  all: unset;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: 0.25rem;\n  cursor: pointer;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 0.75rem;\n  background: ",
        ";\n  color: ",
        ";\n  box-shadow: ",
        ";\n  height: 32px;\n  font-size: 0.8125rem;\n  font-weight: 700;\n  font-family: ",
        ";\n  transition: background-color, box-shadow, color, opacity;\n  transition-duration: 0.16s;\n  transition-timing-function: ease-in-out;\n  text-decoration: none;\n\n  &:hover {\n    background-color: ",
        ";\n    color: ",
        ";\n  }\n\n  &:focus {\n    box-shadow: ",
        ";\n  }\n"
    ]);
    _templateObject = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject1() {
    var data = _tagged_template_literal([
        "\n  padding: 15px;\n  border-radius: 5px;\n"
    ]);
    _templateObject1 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject2() {
    var data = _tagged_template_literal([
        "\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n"
    ]);
    _templateObject2 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject3() {
    var data = _tagged_template_literal([
        "\n  display: flex;\n  align-items: center;\n  align-self: stretch;\n  justify-content: space-between;\n  margin: -5px -5px 5px 0;\n"
    ]);
    _templateObject3 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject4() {
    var data = _tagged_template_literal([
        "\n  line-height: 18px;\n  font-weight: 700;\n  font-size: 14px;\n  margin: 5px 5px 5px 0;\n"
    ]);
    _templateObject4 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject5() {
    var data = _tagged_template_literal([
        "\n  font-size: 14px;\n  line-height: 18px;\n  text-align: start;\n  text-wrap: balance;\n  margin: 0;\n  margin-top: 5px;\n"
    ]);
    _templateObject5 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject6() {
    var data = _tagged_template_literal([
        "\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-top: 15px;\n"
    ]);
    _templateObject6 = function _templateObject() {
        return data;
    };
    return data;
}
function _templateObject7() {
    var data = _tagged_template_literal([
        "\n  font-size: 13px;\n"
    ]);
    _templateObject7 = function _templateObject() {
        return data;
    };
    return data;
}
try {
    (function() {
        var ei = function ei(_param) {
            var tmp = _param.top, _$e = tmp === void 0 ? 0 : tmp, tmp1 = _param.left, t = tmp1 === void 0 ? 0 : tmp1, tmp2 = _param.width, n = tmp2 === void 0 ? window.innerWidth : tmp2, tmp3 = _param.height, r = tmp3 === void 0 ? window.innerHeight : tmp3, tmp4 = _param.colors, i = tmp4 === void 0 ? [
                "#CA90FF",
                "#FC521F",
                "#66BF3C",
                "#FF4785",
                "#FFAE00",
                "#1EA7FD"
            ] : tmp4, o = _object_without_properties(_param, [
                "top",
                "left",
                "width",
                "height",
                "colors"
            ]);
            var _ue = _sliced_to_array(ue(function() {
                var s = document.createElement("div");
                return s.setAttribute("id", "confetti-container"), s.setAttribute("style", "position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999;"), s;
            }), 1), a = _ue[0];
            return ce(function() {
                return document.body.appendChild(a), function() {
                    document.body.removeChild(a);
                };
            }, []), it(E.createElement(Zo, {
                top: _$e,
                left: t,
                width: n,
                height: r
            }, E.createElement(hr.default, _object_spread({
                colors: i,
                drawShape: ni
            }, o))), a);
        };
        var ti = function ti(e, t) {
            return Math.floor(Math.random() * (t - e)) + e;
        };
        var ni = function ni(e) {
            switch(this.shape = this.shape || ti(1, 6), this.shape){
                case 2:
                    {
                        var t = this.w / 2, n = this.h / 2;
                        e.moveTo(-t + 2, -n), e.lineTo(t - 2, -n), e.arcTo(t, -n, t, -n + 2, 2), e.lineTo(t, n - 2), e.arcTo(t, n, t - 2, n, 2), e.lineTo(-t + 2, n), e.arcTo(-t, n, -t, n - 2, 2), e.lineTo(-t, -n + 2), e.arcTo(-t, -n, -t + 2, -n, 2);
                        break;
                    }
                case 3:
                    {
                        e.rect(-4, -4, 8, 16), e.rect(-12, -4, 24, 8);
                        break;
                    }
                case 4:
                    {
                        e.rect(-4, -4, 8, 16), e.rect(-4, -4, 24, 8);
                        break;
                    }
                case 1:
                    {
                        e.arc(0, 0, this.radius, 0, 2 * Math.PI);
                        break;
                    }
                case 5:
                    {
                        e.moveTo(16, 4), e.lineTo(4, 24), e.lineTo(24, 24);
                        break;
                    }
                case 6:
                    {
                        e.arc(4, -4, 4, -Math.PI / 2, 0), e.lineTo(4, 0);
                        break;
                    }
            }
            e.closePath(), e.fill();
        };
        var Ln = function Ln(param) {
            var _$e = param.targetSelector, tmp = param.pulsating, t = tmp === void 0 ? !1 : tmp;
            return ce(function() {
                var n = document.querySelector(_$e);
                if (n) if (t) {
                    n.style.animation = "pulsate 3s infinite", n.style.transformOrigin = "center", n.style.animationTimingFunction = "ease-in-out";
                    var r = "\n        @keyframes pulsate {\n          0% {\n            box-shadow: rgba(2,156,253,1) 0 0 2px 1px, 0 0 0 0 rgba(2, 156, 253, 0.7), 0 0 0 0 rgba(2, 156, 253, 0.4);\n          }\n          50% {\n            box-shadow: rgba(2,156,253,1) 0 0 2px 1px, 0 0 0 20px rgba(2, 156, 253, 0), 0 0 0 40px rgba(2, 156, 253, 0);\n          }\n          100% {\n            box-shadow: rgba(2,156,253,1) 0 0 2px 1px, 0 0 0 0 rgba(2, 156, 253, 0), 0 0 0 0 rgba(2, 156, 253, 0);\n          }\n        }\n      ", i = document.createElement("style");
                    i.id = "sb-onboarding-pulsating-effect", i.innerHTML = r, document.head.appendChild(i);
                } else n.style.boxShadow = "rgba(2,156,253,1) 0 0 2px 1px";
                return function() {
                    var r = document.querySelector("#sb-onboarding-pulsating-effect");
                    r && r.remove(), n && (n.style.animation = "", n.style.boxShadow = "");
                };
            }, [
                _$e,
                t
            ]), null;
        };
        var Er = function Er(e) {
            return function(t) {
                return (typeof t === "undefined" ? "undefined" : _type_of(t)) === e;
            };
        };
        var ai = function ai(e, t) {
            var n = e.length;
            if (n !== t.length) return !1;
            for(var r = n; r-- !== 0;)if (!ae(e[r], t[r])) return !1;
            return !0;
        };
        var si = function si(e, t) {
            if (e.byteLength !== t.byteLength) return !1;
            var n = new DataView(e.buffer), r = new DataView(t.buffer), i = e.byteLength;
            for(; i--;)if (n.getUint8(i) !== r.getUint8(i)) return !1;
            return !0;
        };
        var li = function li(e, t) {
            if (e.size !== t.size) return !1;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = e.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var n = _step.value;
                    if (!t.has(n[0])) return !1;
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
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = e.entries()[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var n1 = _step1.value;
                    if (!ae(n1[1], t.get(n1[0]))) return !1;
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
            return !0;
        };
        var ci = function ci(e, t) {
            if (e.size !== t.size) return !1;
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = e.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    var n = _step.value;
                    if (!t.has(n[0])) return !1;
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
            return !0;
        };
        var Nt = function Nt(e) {
            var t = Object.prototype.toString.call(e).slice(8, -1);
            if (/HTML\w+Element/.test(t)) return "HTMLElement";
            if (fi(t)) return t;
        };
        var Ee = function Ee(e) {
            return function(t) {
                return Nt(t) === e;
            };
        };
        var fi = function fi(e) {
            return ui.includes(e);
        };
        var Je = function Je(e) {
            return function(t) {
                return (typeof t === "undefined" ? "undefined" : _type_of(t)) === e;
            };
        };
        var di = function di(e) {
            return pi.includes(e);
        };
        var yi = function yi() {
            for(var _len = arguments.length, _$e = new Array(_len), _key = 0; _key < _len; _key++){
                _$e[_key] = arguments[_key];
            }
            return _$e.every(function(t) {
                return j.string(t) || j.array(t) || j.plainObject(t);
            });
        };
        var mi = function mi(e, t, n) {
            return Or(e, t) ? [
                e,
                t
            ].every(j.array) ? !e.some(zn(n)) && t.some(zn(n)) : [
                e,
                t
            ].every(j.plainObject) ? !Object.entries(e).some(Gn(n)) && Object.entries(t).some(Gn(n)) : t === n : !1;
        };
        var Wn = function Wn(e, t, n) {
            var r = n.actual, i = n.key, o = n.previous, a = n.type, s = Te(e, i), l = Te(t, i), c = [
                s,
                l
            ].every(j.number) && (a === "increased" ? s < l : s > l);
            return j.undefined(r) || (c = c && l === r), j.undefined(o) || (c = c && s === o), c;
        };
        var Un = function Un(e, t, n) {
            var r = n.key, i = n.type, o = n.value, a = Te(e, r), s = Te(t, r), l = i === "added" ? a : s, c = i === "added" ? s : a;
            if (!j.nullOrUndefined(o)) {
                if (j.defined(l)) {
                    if (j.array(l) || j.plainObject(l)) return mi(l, c, o);
                } else return ae(c, o);
                return !1;
            }
            return [
                a,
                s
            ].every(j.array) ? !c.every(on(l)) : [
                a,
                s
            ].every(j.plainObject) ? gi(Object.keys(l), Object.keys(c)) : ![
                a,
                s
            ].every(function(p) {
                return j.primitive(p) && j.defined(p);
            }) && (i === "added" ? !j.defined(a) && j.defined(s) : j.defined(a) && !j.defined(s));
        };
        var Hn = function Hn(e, t) {
            var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = _ref.key;
            var r = Te(e, n), i = Te(t, n);
            if (!Or(r, i)) throw new TypeError("Inputs have different types");
            if (!yi(r, i)) throw new TypeError("Inputs don't have length");
            return [
                r,
                i
            ].every(j.plainObject) && (r = Object.keys(r), i = Object.keys(i)), [
                r,
                i
            ];
        };
        var Gn = function Gn(e) {
            return function(param) {
                var _param = _sliced_to_array(param, 2), t = _param[0], n = _param[1];
                return j.array(e) ? ae(e, n) || e.some(function(r) {
                    return ae(r, n) || j.array(n) && on(n)(r);
                }) : j.plainObject(e) && e[t] ? !!e[t] && ae(e[t], n) : ae(e, n);
            };
        };
        var gi = function gi(e, t) {
            return t.some(function(n) {
                return !e.includes(n);
            });
        };
        var zn = function zn(e) {
            return function(t) {
                return j.array(e) ? e.some(function(n) {
                    return ae(n, t) || j.array(t) && on(t)(n);
                }) : ae(e, t);
            };
        };
        var lt = function lt(e, t) {
            return j.array(e) ? e.some(function(n) {
                return ae(n, t);
            }) : ae(e, t);
        };
        var on = function on(e) {
            return function(t) {
                return e.some(function(n) {
                    return ae(n, t);
                });
            };
        };
        var Or = function Or() {
            for(var _len = arguments.length, _$e = new Array(_len), _key = 0; _key < _len; _key++){
                _$e[_key] = arguments[_key];
            }
            return _$e.every(j.array) || _$e.every(j.number) || _$e.every(j.plainObject) || _$e.every(j.string);
        };
        var Te = function Te(e, t) {
            return j.plainObject(e) || j.array(e) ? j.string(t) ? t.split(".").reduce(function(n, r) {
                return n && n[r];
            }, e) : j.number(t) ? e[t] : e : e;
        };
        var xt = function xt(e, t) {
            if ([
                e,
                t
            ].some(j.nullOrUndefined)) throw new Error("Missing required parameters");
            if (![
                e,
                t
            ].every(function(n) {
                return j.plainObject(n) || j.array(n);
            })) throw new Error("Expected plain objects or array");
            return {
                added: function(n, r) {
                    try {
                        return Un(e, t, {
                            key: n,
                            type: "added",
                            value: r
                        });
                    } catch (e) {
                        return !1;
                    }
                },
                changed: function(n, r, i) {
                    try {
                        var o = Te(e, n), a = Te(t, n), s = j.defined(r), l = j.defined(i);
                        if (s || l) {
                            var c = l ? lt(i, o) : !lt(r, o), p = lt(r, a);
                            return c && p;
                        }
                        return [
                            o,
                            a
                        ].every(j.array) || [
                            o,
                            a
                        ].every(j.plainObject) ? !ae(o, a) : o !== a;
                    } catch (e) {
                        return !1;
                    }
                },
                changedFrom: function(n, r, i) {
                    if (!j.defined(n)) return !1;
                    try {
                        var o = Te(e, n), a = Te(t, n), s = j.defined(i);
                        return lt(r, o) && (s ? lt(i, a) : !s);
                    } catch (e) {
                        return !1;
                    }
                },
                decreased: function(n, r, i) {
                    if (!j.defined(n)) return !1;
                    try {
                        return Wn(e, t, {
                            key: n,
                            actual: r,
                            previous: i,
                            type: "decreased"
                        });
                    } catch (e) {
                        return !1;
                    }
                },
                emptied: function(n) {
                    try {
                        var _Hn = _sliced_to_array(Hn(e, t, {
                            key: n
                        }), 2), r = _Hn[0], i = _Hn[1];
                        return !!r.length && !i.length;
                    } catch (e) {
                        return !1;
                    }
                },
                filled: function(n) {
                    try {
                        var _Hn = _sliced_to_array(Hn(e, t, {
                            key: n
                        }), 2), r = _Hn[0], i = _Hn[1];
                        return !r.length && !!i.length;
                    } catch (e) {
                        return !1;
                    }
                },
                increased: function(n, r, i) {
                    if (!j.defined(n)) return !1;
                    try {
                        return Wn(e, t, {
                            key: n,
                            actual: r,
                            previous: i,
                            type: "increased"
                        });
                    } catch (e) {
                        return !1;
                    }
                },
                removed: function(n, r) {
                    try {
                        return Un(e, t, {
                            key: n,
                            type: "removed",
                            value: r
                        });
                    } catch (e) {
                        return !1;
                    }
                }
            };
        };
        var Ei = function Ei(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e();
                }));
            };
        };
        var Oi = function Oi(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e();
                }, vi));
            };
        };
        var Sr = function Sr(e) {
            var t = {};
            return e && t.toString.call(e) === "[object Function]";
        };
        var We = function We(e, t) {
            if (e.nodeType !== 1) return [];
            var n = e.ownerDocument.defaultView, r = n.getComputedStyle(e, null);
            return t ? r[t] : r;
        };
        var an = function an(e) {
            return e.nodeName === "HTML" ? e : e.parentNode || e.host;
        };
        var Tr = function Tr(e) {
            return e && e.referenceNode ? e.referenceNode : e;
        };
        var Xe = function Xe(e) {
            return e === 11 ? Yn : e === 10 ? qn : Yn || qn;
        };
        var Ti = function Ti(e) {
            var t = e.nodeName;
            return t === "BODY" ? !1 : t === "HTML" || $e(e.firstElementChild) === e;
        };
        var Ve = function Ve(e) {
            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top", n = t === "top" ? "scrollTop" : "scrollLeft", r = e.nodeName;
            if (r === "BODY" || r === "HTML") {
                var i = e.ownerDocument.documentElement, o = e.ownerDocument.scrollingElement || i;
                return o[n];
            }
            return e[n];
        };
        var Ii = function Ii(e, t) {
            var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = Ve(t, "top"), i = Ve(t, "left"), o = n ? -1 : 1;
            return e.top += r * o, e.bottom += r * o, e.left += i * o, e.right += i * o, e;
        };
        var $n = function $n(e, t) {
            var n = t === "x" ? "Left" : "Top", r = n === "Left" ? "Right" : "Bottom";
            return parseFloat(e["border" + n + "Width"]) + parseFloat(e["border" + r + "Width"]);
        };
        var Vn = function Vn(e, t, n, r) {
            return Math.max(t["offset" + e], t["scroll" + e], n["client" + e], n["offset" + e], n["scroll" + e], Xe(10) ? parseInt(n["offset" + e]) + parseInt(r["margin" + (e === "Height" ? "Top" : "Left")]) + parseInt(r["margin" + (e === "Height" ? "Bottom" : "Right")]) : 0);
        };
        var Ir = function Ir(e) {
            var t = e.body, n = e.documentElement, r = Xe(10) && getComputedStyle(n);
            return {
                height: Vn("Height", t, n, r),
                width: Vn("Width", t, n, r)
            };
        };
        var je = function je(e) {
            return de({}, e, {
                right: e.left + e.width,
                bottom: e.top + e.height
            });
        };
        var Qt = function Qt(e) {
            var t = {};
            try {
                if (Xe(10)) {
                    t = e.getBoundingClientRect();
                    var n = Ve(e, "top"), r = Ve(e, "left");
                    t.top += n, t.left += r, t.bottom += n, t.right += r;
                } else t = e.getBoundingClientRect();
            } catch (e) {}
            var i = {
                left: t.left,
                top: t.top,
                width: t.right - t.left,
                height: t.bottom - t.top
            }, o = e.nodeName === "HTML" ? Ir(e.ownerDocument) : {}, a = o.width || e.clientWidth || i.width, s = o.height || e.clientHeight || i.height, l = e.offsetWidth - a, c = e.offsetHeight - s;
            if (l || c) {
                var p = We(e);
                l -= $n(p, "x"), c -= $n(p, "y"), i.width -= l, i.height -= c;
            }
            return je(i);
        };
        var sn = function sn(e, t) {
            var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1, r = Xe(10), i = t.nodeName === "HTML", o = Qt(e), a = Qt(t), s = yt(e), l = We(t), c = parseFloat(l.borderTopWidth), p = parseFloat(l.borderLeftWidth);
            n && i && (a.top = Math.max(a.top, 0), a.left = Math.max(a.left, 0));
            var u = je({
                top: o.top - a.top - c,
                left: o.left - a.left - p,
                width: o.width,
                height: o.height
            });
            if (u.marginTop = 0, u.marginLeft = 0, !r && i) {
                var f = parseFloat(l.marginTop), b = parseFloat(l.marginLeft);
                u.top -= c - f, u.bottom -= c - f, u.left -= p - b, u.right -= p - b, u.marginTop = f, u.marginLeft = b;
            }
            return (r && !n ? t.contains(s) : t === s && s.nodeName !== "BODY") && (u = Ii(u, t)), u;
        };
        var Ri = function Ri(e) {
            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = e.ownerDocument.documentElement, r = sn(e, n), i = Math.max(n.clientWidth, window.innerWidth || 0), o = Math.max(n.clientHeight, window.innerHeight || 0), a = t ? 0 : Ve(n), s = t ? 0 : Ve(n, "left"), l = {
                top: a - r.top + r.marginTop,
                left: s - r.left + r.marginLeft,
                width: i,
                height: o
            };
            return je(l);
        };
        var Pr = function Pr(e) {
            if (!e || !e.parentElement || Xe()) return document.documentElement;
            for(var t = e.parentElement; t && We(t, "transform") === "none";)t = t.parentElement;
            return t || document.documentElement;
        };
        var ln = function ln(e, t, n, r) {
            var i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1, o = {
                top: 0,
                left: 0
            }, a = i ? Pr(e) : _t(e, Tr(t));
            if (r === "viewport") o = Ri(a, i);
            else {
                var s = void 0;
                r === "scrollParent" ? (s = yt(an(t)), s.nodeName === "BODY" && (s = e.ownerDocument.documentElement)) : r === "window" ? s = e.ownerDocument.documentElement : s = r;
                var l = sn(s, a, i);
                if (s.nodeName === "HTML" && !Cr(a)) {
                    var c = Ir(e.ownerDocument), p = c.height, u = c.width;
                    o.top += l.top - l.marginTop, o.bottom = p + l.top, o.left += l.left - l.marginLeft, o.right = u + l.left;
                } else o = l;
            }
            n = n || 0;
            var f = typeof n == "number";
            return o.left += f ? n : n.left || 0, o.top += f ? n : n.top || 0, o.right -= f ? n : n.right || 0, o.bottom -= f ? n : n.bottom || 0, o;
        };
        var xi = function xi(e) {
            var t = e.width, n = e.height;
            return t * n;
        };
        var Rr = function Rr(e, t, n, r, i) {
            var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
            if (e.indexOf("auto") === -1) return e;
            var a = ln(n, r, o, i), s = {
                top: {
                    width: a.width,
                    height: t.top - a.top
                },
                right: {
                    width: a.right - t.right,
                    height: a.height
                },
                bottom: {
                    width: a.width,
                    height: a.bottom - t.bottom
                },
                left: {
                    width: t.left - a.left,
                    height: a.height
                }
            }, l = Object.keys(s).map(function(f) {
                return de({
                    key: f
                }, s[f], {
                    area: xi(s[f])
                });
            }).sort(function(f, b) {
                return b.area - f.area;
            }), c = l.filter(function(f) {
                var b = f.width, m = f.height;
                return b >= n.clientWidth && m >= n.clientHeight;
            }), p = c.length > 0 ? c[0].key : l[0].key, u = e.split("-")[1];
            return p + (u ? "-" + u : "");
        };
        var xr = function xr(e, t, n) {
            var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, i = r ? Pr(t) : _t(t, Tr(n));
            return sn(n, i, r);
        };
        var _r = function _r(e) {
            var t = e.ownerDocument.defaultView, n = t.getComputedStyle(e), r = parseFloat(n.marginTop || 0) + parseFloat(n.marginBottom || 0), i = parseFloat(n.marginLeft || 0) + parseFloat(n.marginRight || 0), o = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + r
            };
            return o;
        };
        var At = function At(e) {
            var t = {
                left: "right",
                right: "left",
                bottom: "top",
                top: "bottom"
            };
            return e.replace(/left|right|bottom|top/g, function(n) {
                return t[n];
            });
        };
        var Ar = function Ar(e, t, n) {
            n = n.split("-")[0];
            var r = _r(e), i = {
                width: r.width,
                height: r.height
            }, o = [
                "right",
                "left"
            ].indexOf(n) !== -1, a = o ? "top" : "left", s = o ? "left" : "top", l = o ? "height" : "width", c = o ? "width" : "height";
            return i[a] = t[a] + t[l] / 2 - r[l] / 2, n === s ? i[s] = t[s] - r[c] : i[s] = t[At(s)], i;
        };
        var mt = function mt(e, t) {
            return Array.prototype.find ? e.find(t) : e.filter(t)[0];
        };
        var _i = function _i(e, t, n) {
            if (Array.prototype.findIndex) return e.findIndex(function(i) {
                return i[t] === n;
            });
            var r = mt(e, function(i) {
                return i[t] === n;
            });
            return e.indexOf(r);
        };
        var kr = function kr(e, t, n) {
            var r = n === void 0 ? e : e.slice(0, _i(e, "name", n));
            return r.forEach(function(i) {
                i.function && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                var o = i.function || i.fn;
                i.enabled && Sr(o) && (t.offsets.popper = je(t.offsets.popper), t.offsets.reference = je(t.offsets.reference), t = o(t, i));
            }), t;
        };
        var Ai = function Ai() {
            if (!this.state.isDestroyed) {
                var _$e = {
                    instance: this,
                    styles: {},
                    arrowStyles: {},
                    attributes: {},
                    flipped: !1,
                    offsets: {}
                };
                _$e.offsets.reference = xr(this.state, this.popper, this.reference, this.options.positionFixed), _$e.placement = Rr(this.options.placement, _$e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), _$e.originalPlacement = _$e.placement, _$e.positionFixed = this.options.positionFixed, _$e.offsets.popper = Ar(this.popper, _$e.offsets.reference, _$e.placement), _$e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", _$e = kr(this.modifiers, _$e), this.state.isCreated ? this.options.onUpdate(_$e) : (this.state.isCreated = !0, this.options.onCreate(_$e));
            }
        };
        var Nr = function Nr(e, t) {
            return e.some(function(n) {
                var r = n.name, i = n.enabled;
                return i && r === t;
            });
        };
        var cn = function cn(e) {
            for(var t = [
                !1,
                "ms",
                "Webkit",
                "Moz",
                "O"
            ], n = e.charAt(0).toUpperCase() + e.slice(1), r = 0; r < t.length; r++){
                var i = t[r], o = i ? "" + i + n : e;
                if (_type_of(document.body.style[o]) < "u") return o;
            }
            return null;
        };
        var ki = function ki() {
            return this.state.isDestroyed = !0, Nr(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[cn("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
        };
        var jr = function jr(e) {
            var t = e.ownerDocument;
            return t ? t.defaultView : window;
        };
        var Ni = function Ni(e, t, n, r) {
            n.updateBound = r, jr(e).addEventListener("resize", n.updateBound, {
                passive: !0
            });
            var i = yt(e);
            return Mr(i, "scroll", n.updateBound, n.scrollParents), n.scrollElement = i, n.eventsEnabled = !0, n;
        };
        var ji = function ji() {
            this.state.eventsEnabled || (this.state = Ni(this.reference, this.options, this.state, this.scheduleUpdate));
        };
        var Mi = function Mi(e, t) {
            return jr(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach(function(n) {
                n.removeEventListener("scroll", t.updateBound);
            }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
        };
        var Li = function Li() {
            this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = Mi(this.reference, this.state));
        };
        var un = function un(e) {
            return e !== "" && !isNaN(parseFloat(e)) && isFinite(e);
        };
        var Zt = function Zt(e, t) {
            Object.keys(t).forEach(function(n) {
                var r = "";
                [
                    "width",
                    "height",
                    "top",
                    "right",
                    "bottom",
                    "left"
                ].indexOf(n) !== -1 && un(t[n]) && (r = "px"), e.style[n] = t[n] + r;
            });
        };
        var Di = function Di(e, t) {
            Object.keys(t).forEach(function(n) {
                var r = t[n];
                r !== !1 ? e.setAttribute(n, t[n]) : e.removeAttribute(n);
            });
        };
        var Fi = function Fi(e) {
            return Zt(e.instance.popper, e.styles), Di(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && Zt(e.arrowElement, e.arrowStyles), e;
        };
        var Bi = function Bi(e, t, n, r, i) {
            var o = xr(i, t, e, n.positionFixed), a = Rr(n.placement, o, t, e, n.modifiers.flip.boundariesElement, n.modifiers.flip.padding);
            return t.setAttribute("x-placement", a), Zt(t, {
                position: n.positionFixed ? "fixed" : "absolute"
            }), n;
        };
        var Wi = function Wi(e, t) {
            var n = e.offsets, r = n.popper, i = n.reference, o = Math.round, a = Math.floor, s = function s(F) {
                return F;
            }, l = o(i.width), c = o(r.width), p = [
                "left",
                "right"
            ].indexOf(e.placement) !== -1, u = e.placement.indexOf("-") !== -1, f = l % 2 === c % 2, b = l % 2 === 1 && c % 2 === 1, m = t ? p || u || f ? o : a : s, T = t ? o : s;
            return {
                left: m(b && !u && t ? r.left - 1 : r.left),
                top: T(r.top),
                bottom: T(r.bottom),
                right: m(r.right)
            };
        };
        var Hi = function Hi(e, t) {
            var n = t.x, r = t.y, i = e.offsets.popper, o = mt(e.instance.modifiers, function(v) {
                return v.name === "applyStyle";
            }).gpuAcceleration;
            o !== void 0 && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
            var a = o !== void 0 ? o : t.gpuAcceleration, s = $e(e.instance.popper), l = Qt(s), c = {
                position: i.position
            }, p = Wi(e, window.devicePixelRatio < 2 || !Ui), u = n === "bottom" ? "top" : "bottom", f = r === "right" ? "left" : "right", b = cn("transform"), m = void 0, T = void 0;
            if (u === "bottom" ? s.nodeName === "HTML" ? T = -s.clientHeight + p.bottom : T = -l.height + p.bottom : T = p.top, f === "right" ? s.nodeName === "HTML" ? m = -s.clientWidth + p.right : m = -l.width + p.right : m = p.left, a && b) c[b] = "translate3d(" + m + "px, " + T + "px, 0)", c[u] = 0, c[f] = 0, c.willChange = "transform";
            else {
                var F = u === "bottom" ? -1 : 1, I = f === "right" ? -1 : 1;
                c[u] = T * F, c[f] = m * I, c.willChange = u + ", " + f;
            }
            var x = {
                "x-placement": e.placement
            };
            return e.attributes = de({}, x, e.attributes), e.styles = de({}, c, e.styles), e.arrowStyles = de({}, e.offsets.arrow, e.arrowStyles), e;
        };
        var Lr = function Lr(e, t, n) {
            var r = mt(e, function(s) {
                var l = s.name;
                return l === t;
            }), i = !!r && e.some(function(s) {
                return s.name === n && s.enabled && s.order < r.order;
            });
            if (!i) {
                var o = "`" + t + "`", a = "`" + n + "`";
                console.warn(a + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!");
            }
            return i;
        };
        var Gi = function Gi(e, t) {
            var n;
            if (!Lr(e.instance.modifiers, "arrow", "keepTogether")) return e;
            var r = t.element;
            if (typeof r == "string") {
                if (r = e.instance.popper.querySelector(r), !r) return e;
            } else if (!e.instance.popper.contains(r)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
            var i = e.placement.split("-")[0], o = e.offsets, a = o.popper, s = o.reference, l = [
                "left",
                "right"
            ].indexOf(i) !== -1, c = l ? "height" : "width", p = l ? "Top" : "Left", u = p.toLowerCase(), f = l ? "left" : "top", b = l ? "bottom" : "right", m = _r(r)[c];
            s[b] - m < a[u] && (e.offsets.popper[u] -= a[u] - (s[b] - m)), s[u] + m > a[b] && (e.offsets.popper[u] += s[u] + m - a[b]), e.offsets.popper = je(e.offsets.popper);
            var T = s[u] + s[c] / 2 - m / 2, F = We(e.instance.popper), I = parseFloat(F["margin" + p]), x = parseFloat(F["border" + p + "Width"]), v = T - e.offsets.popper[u] - I - x;
            return v = Math.max(Math.min(a[c] - m, v), 0), e.arrowElement = r, e.offsets.arrow = (n = {}, Ke(n, u, Math.round(v)), Ke(n, f, ""), n), e;
        };
        var zi = function zi(e) {
            return e === "end" ? "start" : e === "start" ? "end" : e;
        };
        var Kn = function Kn(e) {
            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, n = Vt.indexOf(e), r = Vt.slice(n + 1).concat(Vt.slice(0, n));
            return t ? r.reverse() : r;
        };
        var Yi = function Yi(e, t) {
            if (Nr(e.instance.modifiers, "inner") || e.flipped && e.placement === e.originalPlacement) return e;
            var n = ln(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed), r = e.placement.split("-")[0], i = At(r), o = e.placement.split("-")[1] || "", a = [];
            switch(t.behavior){
                case Kt.FLIP:
                    a = [
                        r,
                        i
                    ];
                    break;
                case Kt.CLOCKWISE:
                    a = Kn(r);
                    break;
                case Kt.COUNTERCLOCKWISE:
                    a = Kn(r, !0);
                    break;
                default:
                    a = t.behavior;
            }
            return a.forEach(function(s, l) {
                if (r !== s || a.length === l + 1) return e;
                r = e.placement.split("-")[0], i = At(r);
                var c = e.offsets.popper, p = e.offsets.reference, u = Math.floor, f = r === "left" && u(c.right) > u(p.left) || r === "right" && u(c.left) < u(p.right) || r === "top" && u(c.bottom) > u(p.top) || r === "bottom" && u(c.top) < u(p.bottom), b = u(c.left) < u(n.left), m = u(c.right) > u(n.right), T = u(c.top) < u(n.top), F = u(c.bottom) > u(n.bottom), I = r === "left" && b || r === "right" && m || r === "top" && T || r === "bottom" && F, x = [
                    "top",
                    "bottom"
                ].indexOf(r) !== -1, v = !!t.flipVariations && (x && o === "start" && b || x && o === "end" && m || !x && o === "start" && T || !x && o === "end" && F), P = !!t.flipVariationsByContent && (x && o === "start" && m || x && o === "end" && b || !x && o === "start" && F || !x && o === "end" && T), R = v || P;
                (f || I || R) && (e.flipped = !0, (f || I) && (r = a[l + 1]), R && (o = zi(o)), e.placement = r + (o ? "-" + o : ""), e.offsets.popper = de({}, e.offsets.popper, Ar(e.instance.popper, e.offsets.reference, e.placement)), e = kr(e.instance.modifiers, e, "flip"));
            }), e;
        };
        var qi = function qi(e) {
            var t = e.offsets, n = t.popper, r = t.reference, i = e.placement.split("-")[0], o = Math.floor, a = [
                "top",
                "bottom"
            ].indexOf(i) !== -1, s = a ? "right" : "bottom", l = a ? "left" : "top", c = a ? "width" : "height";
            return n[s] < o(r[l]) && (e.offsets.popper[l] = o(r[l]) - n[c]), n[l] > o(r[s]) && (e.offsets.popper[l] = o(r[s])), e;
        };
        var $i = function $i(e, t, n, r) {
            var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/), o = +i[1], a = i[2];
            if (!o) return e;
            if (a.indexOf("%") === 0) {
                var s = void 0;
                switch(a){
                    case "%p":
                        s = n;
                        break;
                    case "%":
                    case "%r":
                    default:
                        s = r;
                }
                var l = je(s);
                return l[t] / 100 * o;
            } else if (a === "vh" || a === "vw") {
                var c = void 0;
                return a === "vh" ? c = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : c = Math.max(document.documentElement.clientWidth, window.innerWidth || 0), c / 100 * o;
            } else return o;
        };
        var Vi = function Vi(e, t, n, r) {
            var i = [
                0,
                0
            ], o = [
                "right",
                "left"
            ].indexOf(r) !== -1, a = e.split(/(\+|\-)/).map(function(p) {
                return p.trim();
            }), s = a.indexOf(mt(a, function(p) {
                return p.search(/,|\s/) !== -1;
            }));
            a[s] && a[s].indexOf(",") === -1 && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
            var l = /\s*,\s*|\s+/, c = s !== -1 ? [
                a.slice(0, s).concat([
                    a[s].split(l)[0]
                ]),
                [
                    a[s].split(l)[1]
                ].concat(a.slice(s + 1))
            ] : [
                a
            ];
            return c = c.map(function(p, u) {
                var f = (u === 1 ? !o : o) ? "height" : "width", b = !1;
                return p.reduce(function(m, T) {
                    return m[m.length - 1] === "" && [
                        "+",
                        "-"
                    ].indexOf(T) !== -1 ? (m[m.length - 1] = T, b = !0, m) : b ? (m[m.length - 1] += T, b = !1, m) : m.concat(T);
                }, []).map(function(m) {
                    return $i(m, f, t, n);
                });
            }), c.forEach(function(p, u) {
                p.forEach(function(f, b) {
                    un(f) && (i[u] += f * (p[b - 1] === "-" ? -1 : 1));
                });
            }), i;
        };
        var Ki = function Ki(e, t) {
            var n = t.offset, r = e.placement, i = e.offsets, o = i.popper, a = i.reference, s = r.split("-")[0], l = void 0;
            return un(+n) ? l = [
                +n,
                0
            ] : l = Vi(n, o, a, s), s === "left" ? (o.top += l[0], o.left -= l[1]) : s === "right" ? (o.top += l[0], o.left += l[1]) : s === "top" ? (o.left += l[0], o.top -= l[1]) : s === "bottom" && (o.left += l[0], o.top += l[1]), e.popper = o, e;
        };
        var Ji = function Ji(e, t) {
            var n = t.boundariesElement || $e(e.instance.popper);
            e.instance.reference === n && (n = $e(n));
            var r = cn("transform"), i = e.instance.popper.style, o = i.top, a = i.left, s = i[r];
            i.top = "", i.left = "", i[r] = "";
            var l = ln(e.instance.popper, e.instance.reference, t.padding, n, e.positionFixed);
            i.top = o, i.left = a, i[r] = s, t.boundaries = l;
            var c = t.priority, p = e.offsets.popper, u = {
                primary: function primary(f) {
                    var b = p[f];
                    return p[f] < l[f] && !t.escapeWithReference && (b = Math.max(p[f], l[f])), Ke({}, f, b);
                },
                secondary: function secondary(f) {
                    var b = f === "right" ? "left" : "top", m = p[b];
                    return p[f] > l[f] && !t.escapeWithReference && (m = Math.min(p[b], l[f] - (f === "right" ? p.width : p.height))), Ke({}, b, m);
                }
            };
            return c.forEach(function(f) {
                var b = [
                    "left",
                    "top"
                ].indexOf(f) !== -1 ? "primary" : "secondary";
                p = de({}, p, u[b](f));
            }), e.offsets.popper = p, e;
        };
        var Xi = function Xi(e) {
            var t = e.placement, n = t.split("-")[0], r = t.split("-")[1];
            if (r) {
                var i = e.offsets, o = i.reference, a = i.popper, s = [
                    "bottom",
                    "top"
                ].indexOf(n) !== -1, l = s ? "left" : "top", c = s ? "width" : "height", p = {
                    start: Ke({}, l, o[l]),
                    end: Ke({}, l, o[l] + o[c] - a[c])
                };
                e.offsets.popper = de({}, a, p[r]);
            }
            return e;
        };
        var Qi = function Qi(e) {
            if (!Lr(e.instance.modifiers, "hide", "preventOverflow")) return e;
            var t = e.offsets.reference, n = mt(e.instance.modifiers, function(r) {
                return r.name === "preventOverflow";
            }).boundaries;
            if (t.bottom < n.top || t.left > n.right || t.top > n.bottom || t.right < n.left) {
                if (e.hide === !0) return e;
                e.hide = !0, e.attributes["x-out-of-boundaries"] = "";
            } else {
                if (e.hide === !1) return e;
                e.hide = !1, e.attributes["x-out-of-boundaries"] = !1;
            }
            return e;
        };
        var Zi = function Zi(e) {
            var t = e.placement, n = t.split("-")[0], r = e.offsets, i = r.popper, o = r.reference, a = [
                "left",
                "right"
            ].indexOf(n) !== -1, s = [
                "top",
                "left"
            ].indexOf(n) === -1;
            return i[a ? "left" : "top"] = o[n] - (s ? i[a ? "width" : "height"] : 0), e.placement = At(t), e.offsets.popper = je(i), e;
        };
        var Mt = function Mt(e) {
            var t = Object.prototype.toString.call(e).slice(8, -1);
            if (/HTML\w+Element/.test(t)) return "HTMLElement";
            if (ia(t)) return t;
        };
        var Oe = function Oe(e) {
            return function(t) {
                return Mt(t) === e;
            };
        };
        var ia = function ia(e) {
            return ra.includes(e);
        };
        var Qe = function Qe(e) {
            return function(t) {
                return (typeof t === "undefined" ? "undefined" : _type_of(t)) === e;
            };
        };
        var aa = function aa(e) {
            return oa.includes(e);
        };
        var Fr = function Fr(e) {
            return function(t) {
                return (typeof t === "undefined" ? "undefined" : _type_of(t)) === e;
            };
        };
        var ua = function ua(e, t) {
            var n = e.length;
            if (n !== t.length) return !1;
            for(var r = n; r-- !== 0;)if (!le(e[r], t[r])) return !1;
            return !0;
        };
        var pa = function pa(e, t) {
            if (e.byteLength !== t.byteLength) return !1;
            for(var n = new DataView(e.buffer), r = new DataView(t.buffer), i = e.byteLength; i--;)if (n.getUint8(i) !== r.getUint8(i)) return !1;
            return !0;
        };
        var fa = function fa(e, t) {
            var n, r, i, o;
            if (e.size !== t.size) return !1;
            try {
                for(var a = tn(e.entries()), s = a.next(); !s.done; s = a.next()){
                    var l = s.value;
                    if (!t.has(l[0])) return !1;
                }
            } catch (u) {
                n = {
                    error: u
                };
            } finally{
                try {
                    s && !s.done && (r = a.return) && r.call(a);
                } finally{
                    if (n) throw n.error;
                }
            }
            try {
                for(var c = tn(e.entries()), p = c.next(); !p.done; p = c.next()){
                    var l = p.value;
                    if (!le(l[1], t.get(l[0]))) return !1;
                }
            } catch (u) {
                i = {
                    error: u
                };
            } finally{
                try {
                    p && !p.done && (o = c.return) && o.call(c);
                } finally{
                    if (i) throw i.error;
                }
            }
            return !0;
        };
        var da = function da(e, t) {
            var n, r;
            if (e.size !== t.size) return !1;
            try {
                for(var i = tn(e.entries()), o = i.next(); !o.done; o = i.next()){
                    var a = o.value;
                    if (!t.has(a[0])) return !1;
                }
            } catch (s) {
                n = {
                    error: s
                };
            } finally{
                try {
                    o && !o.done && (r = i.return) && r.call(i);
                } finally{
                    if (n) throw n.error;
                }
            }
            return !0;
        };
        var ha = function ha() {
            for(var _$e = [], t = 0; t < arguments.length; t++)_$e[t] = arguments[t];
            return _$e.every(function(n) {
                return D.string(n) || D.array(n) || D.plainObject(n);
            });
        };
        var ya = function ya(e, t, n) {
            return Br(e, t) ? [
                e,
                t
            ].every(D.array) ? !e.some(rr(n)) && t.some(rr(n)) : [
                e,
                t
            ].every(D.plainObject) ? !Object.entries(e).some(nr(n)) && Object.entries(t).some(nr(n)) : t === n : !1;
        };
        var Zn = function Zn(e, t, n) {
            var r = n.actual, i = n.key, o = n.previous, a = n.type, s = Ie(e, i), l = Ie(t, i), c = [
                s,
                l
            ].every(D.number) && (a === "increased" ? s < l : s > l);
            return D.undefined(r) || (c = c && l === r), D.undefined(o) || (c = c && s === o), c;
        };
        var er = function er(e, t, n) {
            var r = n.key, i = n.type, o = n.value, a = Ie(e, r), s = Ie(t, r), l = i === "added" ? a : s, c = i === "added" ? s : a;
            if (!D.nullOrUndefined(o)) {
                if (D.defined(l)) {
                    if (D.array(l) || D.plainObject(l)) return ya(l, c, o);
                } else return le(c, o);
                return !1;
            }
            return [
                a,
                s
            ].every(D.array) ? !c.every(pn(l)) : [
                a,
                s
            ].every(D.plainObject) ? ma(Object.keys(l), Object.keys(c)) : ![
                a,
                s
            ].every(function(p) {
                return D.primitive(p) && D.defined(p);
            }) && (i === "added" ? !D.defined(a) && D.defined(s) : D.defined(a) && !D.defined(s));
        };
        var tr = function tr(e, t, n) {
            var r = n === void 0 ? {} : n, i = r.key, o = Ie(e, i), a = Ie(t, i);
            if (!Br(o, a)) throw new TypeError("Inputs have different types");
            if (!ha(o, a)) throw new TypeError("Inputs don't have length");
            return [
                o,
                a
            ].every(D.plainObject) && (o = Object.keys(o), a = Object.keys(a)), [
                o,
                a
            ];
        };
        var nr = function nr(e) {
            return function(t) {
                var n = t[0], r = t[1];
                return D.array(e) ? le(e, r) || e.some(function(i) {
                    return le(i, r) || D.array(r) && pn(r)(i);
                }) : D.plainObject(e) && e[n] ? !!e[n] && le(e[n], r) : le(e, r);
            };
        };
        var ma = function ma(e, t) {
            return t.some(function(n) {
                return !e.includes(n);
            });
        };
        var rr = function rr(e) {
            return function(t) {
                return D.array(e) ? e.some(function(n) {
                    return le(n, t) || D.array(t) && pn(t)(n);
                }) : le(e, t);
            };
        };
        var ct = function ct(e, t) {
            return D.array(e) ? e.some(function(n) {
                return le(n, t);
            }) : le(e, t);
        };
        var pn = function pn(e) {
            return function(t) {
                return e.some(function(n) {
                    return le(n, t);
                });
            };
        };
        var Br = function Br() {
            for(var _$e = [], t = 0; t < arguments.length; t++)_$e[t] = arguments[t];
            return _$e.every(D.array) || _$e.every(D.number) || _$e.every(D.plainObject) || _$e.every(D.string);
        };
        var Ie = function Ie(e, t) {
            if (D.plainObject(e) || D.array(e)) {
                if (D.string(t)) {
                    var n = t.split(".");
                    return n.reduce(function(r, i) {
                        return r && r[i];
                    }, e);
                }
                return D.number(t) ? e[t] : e;
            }
            return e;
        };
        var ga = function ga(e, t) {
            if ([
                e,
                t
            ].some(D.nullOrUndefined)) throw new Error("Missing required parameters");
            if (![
                e,
                t
            ].every(function(u) {
                return D.plainObject(u) || D.array(u);
            })) throw new Error("Expected plain objects or array");
            var n = function n(u, f) {
                try {
                    return er(e, t, {
                        key: u,
                        type: "added",
                        value: f
                    });
                } catch (e) {
                    return !1;
                }
            }, r = function r(u, f, b) {
                try {
                    var m = Ie(e, u), T = Ie(t, u), F = D.defined(f), I = D.defined(b);
                    if (F || I) {
                        var x = I ? ct(b, m) : !ct(f, m), v = ct(f, T);
                        return x && v;
                    }
                    return [
                        m,
                        T
                    ].every(D.array) || [
                        m,
                        T
                    ].every(D.plainObject) ? !le(m, T) : m !== T;
                } catch (e) {
                    return !1;
                }
            }, i = function i(u, f, b) {
                if (!D.defined(u)) return !1;
                try {
                    var m = Ie(e, u), T = Ie(t, u), F = D.defined(b);
                    return ct(f, m) && (F ? ct(b, T) : !F);
                } catch (e) {
                    return !1;
                }
            }, o = function o(u, f) {
                return D.defined(u) ? (console.warn("`changedTo` is deprecated! Replace it with `change`"), r(u, f)) : !1;
            }, a = function a(u, f, b) {
                if (!D.defined(u)) return !1;
                try {
                    return Zn(e, t, {
                        key: u,
                        actual: f,
                        previous: b,
                        type: "decreased"
                    });
                } catch (e) {
                    return !1;
                }
            }, s = function s(u) {
                try {
                    var f = tr(e, t, {
                        key: u
                    }), b = f[0], m = f[1];
                    return !!b.length && !m.length;
                } catch (e) {
                    return !1;
                }
            }, l = function l(u) {
                try {
                    var f = tr(e, t, {
                        key: u
                    }), b = f[0], m = f[1];
                    return !b.length && !!m.length;
                } catch (e) {
                    return !1;
                }
            }, c = function c(u, f, b) {
                if (!D.defined(u)) return !1;
                try {
                    return Zn(e, t, {
                        key: u,
                        actual: f,
                        previous: b,
                        type: "increased"
                    });
                } catch (e) {
                    return !1;
                }
            }, p = function p(u, f) {
                try {
                    return er(e, t, {
                        key: u,
                        type: "removed",
                        value: f
                    });
                } catch (e) {
                    return !1;
                }
            };
            return {
                added: n,
                changed: r,
                changedFrom: i,
                changedTo: o,
                decreased: a,
                emptied: s,
                filled: l,
                increased: c,
                removed: p
            };
        };
        var or = function or(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter(function(i) {
                    return Object.getOwnPropertyDescriptor(e, i).enumerable;
                })), n.push.apply(n, r);
            }
            return n;
        };
        var ee = function ee(e) {
            for(var t = 1; t < arguments.length; t++){
                var n = arguments[t] != null ? arguments[t] : {};
                t % 2 ? or(Object(n), !0).forEach(function(r) {
                    oe(e, r, n[r]);
                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : or(Object(n)).forEach(function(r) {
                    Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
                });
            }
            return e;
        };
        var gt = function gt(e, t) {
            if (!_instanceof(e, t)) throw new TypeError("Cannot call a class as a function");
        };
        var ir = function ir(e, t) {
            for(var n = 0; n < t.length; n++){
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, Ur(r.key), r);
            }
        };
        var bt = function bt(e, t, n) {
            return t && ir(e.prototype, t), n && ir(e, n), Object.defineProperty(e, "prototype", {
                writable: !1
            }), e;
        };
        var oe = function oe(e, t, n) {
            return t = Ur(t), t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e;
        };
        var vt = function vt(e, t) {
            if (typeof t != "function" && t !== null) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(e, "prototype", {
                writable: !1
            }), t && nn(e, t);
        };
        var ba = function ba() {
            if ((typeof Reflect === "undefined" ? "undefined" : _type_of(Reflect)) > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
            if (typeof Proxy == "function") return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), !0;
            } catch (e) {
                return !1;
            }
        };
        var va = function va(e, t) {
            if (e == null) return {};
            var n = {}, r = Object.keys(e), i, o;
            for(o = 0; o < r.length; o++)i = r[o], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
            return n;
        };
        var Wr = function Wr(e, t) {
            if (e == null) return {};
            var n = va(e, t), r, i;
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                for(i = 0; i < o.length; i++)r = o[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
            }
            return n;
        };
        var Pe = function Pe(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        };
        var Ea = function Ea(e, t) {
            if (t && ((typeof t === "undefined" ? "undefined" : _type_of(t)) == "object" || typeof t == "function")) return t;
            if (t !== void 0) throw new TypeError("Derived constructors may only return object or undefined");
            return Pe(e);
        };
        var Et = function Et(e) {
            var t = ba();
            return function() {
                var n = kt(e), r;
                if (t) {
                    var i = kt(this).constructor;
                    r = Reflect.construct(n, arguments, i);
                } else r = n.apply(this, arguments);
                return Ea(this, r);
            };
        };
        var Oa = function Oa(e, t) {
            if ((typeof e === "undefined" ? "undefined" : _type_of(e)) != "object" || e === null) return e;
            var n = e[Symbol.toPrimitive];
            if (n !== void 0) {
                var r = n.call(e, t || "default");
                if ((typeof r === "undefined" ? "undefined" : _type_of(r)) != "object") return r;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return (t === "string" ? String : Number)(e);
        };
        var Ur = function Ur(e) {
            var t = Oa(e, "string");
            return (typeof t === "undefined" ? "undefined" : _type_of(t)) == "symbol" ? t : String(t);
        };
        var Ia = function Ia(e, t, n, r) {
            return typeof e == "boolean" ? e : typeof e == "function" ? e(t, n, r) : e ? !!e : !1;
        };
        var Ca = function Ca(e, t) {
            return Object.hasOwnProperty.call(e, t);
        };
        var Pa = function Pa(e, t, n, r) {
            return r ? new Error(r) : new Error("Required ".concat(e[t], " `").concat(t, "` was not specified in `").concat(n, "`."));
        };
        var Ra = function Ra(e, t) {
            if (typeof e != "function") throw new TypeError(Sa);
            if (t && typeof t != "string") throw new TypeError(Ta);
        };
        var ar = function ar(e, t, n) {
            return Ra(e, n), function(r, i, o) {
                for(var a = arguments.length, s = new Array(a > 3 ? a - 3 : 0), l = 3; l < a; l++)s[l - 3] = arguments[l];
                return Ia(t, r, i, o) ? Ca(r, i) ? e.apply(void 0, [
                    r,
                    i,
                    o
                ].concat(s)) : Pa(r, i, o, n) : e.apply(void 0, [
                    r,
                    i,
                    o
                ].concat(s));
            };
        };
        var Se = function Se() {
            return !!((typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" && window.document && window.document.createElement);
        };
        var Jt = function Jt() {
            return "ontouchstart" in window && /Mobi/.test(navigator.userAgent);
        };
        var Rt = function Rt(e) {
            var t = e.title, n = e.data, r = e.warn, i = r === void 0 ? !1 : r, o = e.debug, a = o === void 0 ? !1 : o, s = i ? console.warn || console.error : console.log;
            a && t && n && (console.groupCollapsed("%creact-floater: ".concat(t), "color: #9b00ff; font-weight: bold; font-size: 12px;"), Array.isArray(n) ? n.forEach(function(l) {
                D.plainObject(l) && l.key ? s.apply(console, [
                    l.key,
                    l.value
                ]) : s.apply(console, [
                    l
                ]);
            }) : s.apply(console, [
                n
            ]), console.groupEnd());
        };
        var xa = function xa(e, t, n) {
            var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
            e.addEventListener(t, n, r);
        };
        var _a = function _a(e, t, n) {
            var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
            e.removeEventListener(t, n, r);
        };
        var Aa = function Aa(e, t, n) {
            var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1, i;
            i = function(o) {
                n(o), _a(e, t, i);
            }, xa(e, t, i, r);
        };
        var sr = function sr() {};
        var zr = function zr(e) {
            var t = e.handleClick, n = e.styles, r = n.color, i = n.height, o = n.width, a = Wr(n, ka);
            return E.createElement("button", {
                "aria-label": "close",
                onClick: t,
                style: a,
                type: "button"
            }, E.createElement("svg", {
                width: "".concat(o, "px"),
                height: "".concat(i, "px"),
                viewBox: "0 0 18 18",
                version: "1.1",
                xmlns: "http://www.w3.org/2000/svg",
                preserveAspectRatio: "xMidYMid"
            }, E.createElement("g", null, E.createElement("path", {
                d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z",
                fill: r
            }))));
        };
        var Yr = function Yr(e) {
            var t = e.content, n = e.footer, r = e.handleClick, i = e.open, o = e.positionWrapper, a = e.showCloseButton, s = e.title, l = e.styles, c = {
                content: E.isValidElement(t) ? t : E.createElement("div", {
                    className: "__floater__content",
                    style: l.content
                }, t)
            };
            return s && (c.title = E.isValidElement(s) ? s : E.createElement("div", {
                className: "__floater__title",
                style: l.title
            }, s)), n && (c.footer = E.isValidElement(n) ? n : E.createElement("div", {
                className: "__floater__footer",
                style: l.footer
            }, n)), (a || o) && !D.boolean(i) && (c.close = E.createElement(zr, {
                styles: l.close,
                handleClick: r
            })), E.createElement("div", {
                className: "__floater__container",
                style: l.container
            }, c.close, c.title, c.content, c.footer);
        };
        var ja = function ja(e) {
            var t = (0, en.default)(Na, e.options || {});
            return {
                wrapper: {
                    cursor: "help",
                    display: "inline-flex",
                    flexDirection: "column",
                    zIndex: t.zIndex
                },
                wrapperPosition: {
                    left: -1e3,
                    position: "absolute",
                    top: -1e3,
                    visibility: "hidden"
                },
                floater: {
                    display: "inline-block",
                    filter: "drop-shadow(0 0 3px rgba(0, 0, 0, 0.3))",
                    maxWidth: 300,
                    opacity: 0,
                    position: "relative",
                    transition: "opacity 0.3s",
                    visibility: "hidden",
                    zIndex: t.zIndex
                },
                floaterOpening: {
                    opacity: 1,
                    visibility: "visible"
                },
                floaterWithAnimation: {
                    opacity: 1,
                    transition: "opacity 0.3s, transform 0.2s",
                    visibility: "visible"
                },
                floaterWithComponent: {
                    maxWidth: "100%"
                },
                floaterClosing: {
                    opacity: 0,
                    visibility: "visible"
                },
                floaterCentered: {
                    left: "50%",
                    position: "fixed",
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                },
                container: {
                    backgroundColor: "#fff",
                    color: "#666",
                    minHeight: 60,
                    minWidth: 200,
                    padding: 20,
                    position: "relative",
                    zIndex: 10
                },
                title: {
                    borderBottom: "1px solid #555",
                    color: "#555",
                    fontSize: 18,
                    marginBottom: 5,
                    paddingBottom: 6,
                    paddingRight: 18
                },
                content: {
                    fontSize: 15
                },
                close: {
                    backgroundColor: "transparent",
                    border: 0,
                    borderRadius: 0,
                    color: "#555",
                    fontSize: 0,
                    height: 15,
                    outline: "none",
                    padding: 10,
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: 15,
                    WebkitAppearance: "none"
                },
                footer: {
                    borderTop: "1px solid #ccc",
                    fontSize: 13,
                    marginTop: 10,
                    paddingTop: 5
                },
                arrow: {
                    color: "#fff",
                    display: "inline-flex",
                    length: 16,
                    margin: 8,
                    position: "absolute",
                    spread: 32
                },
                options: t
            };
        };
        var Ae = function Ae() {
            return !!((typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" && window.document && window.document.createElement);
        };
        var Vr = function Vr(e) {
            return e ? e.getBoundingClientRect() : null;
        };
        var Wa = function Wa() {
            var _$e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
            var t = document.body, n = document.documentElement;
            if (!t || !n) return 0;
            if (_$e) {
                var r = [
                    t.scrollHeight,
                    t.offsetHeight,
                    n.clientHeight,
                    n.scrollHeight,
                    n.offsetHeight
                ].sort(function(o, a) {
                    return o - a;
                }), i = Math.floor(r.length / 2);
                return r.length % 2 === 0 ? (r[i - 1] + r[i]) / 2 : r[i];
            }
            return Math.max(t.scrollHeight, t.offsetHeight, n.clientHeight, n.scrollHeight, n.offsetHeight);
        };
        var Ne = function Ne(e) {
            return typeof e == "string" ? document.querySelector(e) : e;
        };
        var Ua = function Ua(e) {
            return !e || e.nodeType !== 1 ? null : getComputedStyle(e);
        };
        var Lt = function Lt(e, t, n) {
            if (!e) return Fe();
            var r = (0, wr.default)(e);
            if (r) {
                if (r.isSameNode(Fe())) return n ? document : Fe();
                if (!(r.scrollHeight > r.offsetHeight) && !t) return r.style.overflow = "initial", Fe();
            }
            return r;
        };
        var Ot = function Ot(e, t) {
            if (!e) return !1;
            var n = Lt(e, t);
            return n ? !n.isSameNode(Fe()) : !1;
        };
        var Ha = function Ha(e) {
            return e.offsetParent !== document.body;
        };
        var Ga = function Ga(e) {
            var t;
            if (!e) return !1;
            var n = e;
            for(; n && n !== document.body;){
                if (_instanceof(n, HTMLElement)) {
                    var _getComputedStyle = getComputedStyle(n), r = _getComputedStyle.display, i = _getComputedStyle.visibility;
                    if (r === "none" || i === "hidden") return !1;
                }
                n = (t = n.parentElement) != null ? t : null;
            }
            return !0;
        };
        var za = function za(e, t, n) {
            var r;
            var i = Vr(e), o = Lt(e, n), a = Ot(e, n), s = 0, l = (r = i === null || i === void 0 ? void 0 : i.top) != null ? r : 0;
            return _instanceof(o, HTMLElement) && (s = o.scrollTop, !a && !dt(e) && (l += s), o.isSameNode(Fe()) || (l += Fe().scrollTop)), Math.floor(l - t);
        };
        var Ya = function Ya(e, t, n) {
            var r;
            if (!e) return 0;
            var _ref = (r = (0, wr.default)(e)) != null ? r : {}, tmp = _ref.offsetTop, i = tmp === void 0 ? 0 : tmp, tmp1 = _ref.scrollTop, o = tmp1 === void 0 ? 0 : tmp1, a = e.getBoundingClientRect().top + o;
            i && (Ot(e, n) || Ha(e)) && (a -= i);
            var s = Math.floor(a - t);
            return s < 0 ? 0 : s;
        };
        var Fe = function Fe() {
            var _$e;
            return (_$e = document.scrollingElement) != null ? _$e : document.documentElement;
        };
        var qa = function qa(e, t) {
            var n = t.duration, r = t.element;
            return new Promise(function(i, o) {
                var a = r.scrollTop, s = e > a ? e - a : a - e;
                bi.default.top(r, e, {
                    duration: s < 100 ? 50 : n
                }, function(l) {
                    return l && l.message !== "Element already at target scroll position" ? o(l) : i();
                });
            });
        };
        var Kr = function Kr() {
            var _$e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : navigator.userAgent;
            var t = _$e;
            return (typeof window === "undefined" ? "undefined" : _type_of(window)) > "u" ? t = "node" : document.documentMode ? t = "ie" : /Edge/.test(_$e) ? t = "edge" : window.opera || _$e.includes(" OPR/") ? t = "opera" : _type_of(window.InstallTrigger) < "u" ? t = "firefox" : window.chrome ? t = "chrome" : /(Version\/([\d._]+).*Safari|CriOS|FxiOS| Mobile\/)/.test(_$e) && (t = "safari"), t;
        };
        var ke = function ke(e) {
            var t = [], n = function(r) {
                if (typeof r == "string" || typeof r == "number") t.push(r);
                else if (Array.isArray(r)) r.forEach(function(i) {
                    return n(i);
                });
                else if (Ht(r)) {
                    var _r_props = r.props, i = _r_props.children;
                    Array.isArray(i) ? i.forEach(function(o) {
                        return n(o);
                    }) : n(i);
                }
            };
            return n(e), t.join(" ").trim();
        };
        var $a = function $a(e, t) {
            return !j.plainObject(e) || !j.array(t) ? !1 : Object.keys(e).every(function(n) {
                return t.includes(n);
            });
        };
        var Va = function Va(e) {
            var t = /^#?([\da-f])([\da-f])([\da-f])$/i, n = e.replace(t, function(i, o, a, s) {
                return o + o + a + a + s + s;
            }), r = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(n);
            return r ? [
                parseInt(r[1], 16),
                parseInt(r[2], 16),
                parseInt(r[3], 16)
            ] : [];
        };
        var lr = function lr(e) {
            return e.disableBeacon || e.placement === "center";
        };
        var cr = function cr() {
            return ![
                "chrome",
                "safari",
                "firefox",
                "opera"
            ].includes(Kr());
        };
        var Me = function Me(param) {
            var _$e = param.data, tmp = param.debug, t = tmp === void 0 ? !1 : tmp, n = param.title, tmp1 = param.warn, r = tmp1 === void 0 ? !1 : tmp1;
            var i = r ? console.warn || console.error : console.log;
            t && (n && _$e ? (console.groupCollapsed("%creact-joyride: ".concat(n), "color: #ff0044; font-weight: bold; font-size: 12px;"), Array.isArray(_$e) ? _$e.forEach(function(o) {
                j.plainObject(o) && o.key ? i.apply(console, [
                    o.key,
                    o.value
                ]) : i.apply(console, [
                    o
                ]);
            }) : i.apply(console, [
                _$e
            ]), console.groupEnd()) : console.error("Missing title or data props"));
        };
        var Ka = function Ka(e) {
            return Object.keys(e);
        };
        var Jr = function Jr(e) {
            for(var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                t[_key - 1] = arguments[_key];
            }
            if (!j.plainObject(e)) throw new TypeError("Expected an object");
            var n = {};
            for(var r in e)({}).hasOwnProperty.call(e, r) && (t.includes(r) || (n[r] = e[r]));
            return n;
        };
        var Ja = function Ja(e) {
            for(var _len = arguments.length, t = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                t[_key - 1] = arguments[_key];
            }
            if (!j.plainObject(e)) throw new TypeError("Expected an object");
            if (!t.length) return e;
            var n = {};
            for(var r in e)({}).hasOwnProperty.call(e, r) && t.includes(r) && (n[r] = e[r]);
            return n;
        };
        var Xa = function Xa(e) {
            var t = e.isFirstStep, n = e.lifecycle, r = e.previousLifecycle, i = e.scrollToFirstStep, o = e.step, a = e.target;
            return !o.disableScrolling && (!t || i || n === W.TOOLTIP) && o.placement !== "center" && (!o.isFixed || !dt(a)) && r !== n && [
                W.BEACON,
                W.TOOLTIP
            ].includes(n);
        };
        var ns = function ns(e, t) {
            var n, r, i, o, a;
            var s = e.floaterProps, l = e.styles, c = (0, Pt.default)((n = t.floaterProps) != null ? n : {}, s !== null && s !== void 0 ? s : {}), p = (0, Pt.default)(l !== null && l !== void 0 ? l : {}, (r = t.styles) != null ? r : {}), u = (0, Pt.default)(ts, p.options || {}), f = t.placement === "center" || t.disableBeacon, b = u.width;
            window.innerWidth > 480 && (b = 380), "width" in u && (b = typeof u.width == "number" && window.innerWidth < u.width ? window.innerWidth - 30 : u.width);
            var m = {
                bottom: 0,
                left: 0,
                overflow: "hidden",
                position: "absolute",
                right: 0,
                top: 0,
                zIndex: u.zIndex
            }, T = {
                beacon: _object_spread_props(_object_spread({}, ft), {
                    display: f ? "none" : "inline-block",
                    height: u.beaconSize,
                    position: "relative",
                    width: u.beaconSize,
                    zIndex: u.zIndex
                }),
                beaconInner: {
                    animation: "joyride-beacon-inner 1.2s infinite ease-in-out",
                    backgroundColor: u.primaryColor,
                    borderRadius: "50%",
                    display: "block",
                    height: "50%",
                    left: "50%",
                    opacity: .7,
                    position: "absolute",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50%"
                },
                beaconOuter: {
                    animation: "joyride-beacon-outer 1.2s infinite ease-in-out",
                    backgroundColor: "rgba(".concat(Va(u.primaryColor).join(","), ", 0.2)"),
                    border: "2px solid ".concat(u.primaryColor),
                    borderRadius: "50%",
                    boxSizing: "border-box",
                    display: "block",
                    height: "100%",
                    left: 0,
                    opacity: .9,
                    position: "absolute",
                    top: 0,
                    transformOrigin: "center",
                    width: "100%"
                },
                tooltip: {
                    backgroundColor: u.backgroundColor,
                    borderRadius: 5,
                    boxSizing: "border-box",
                    color: u.textColor,
                    fontSize: 16,
                    maxWidth: "100%",
                    padding: 15,
                    position: "relative",
                    width: b
                },
                tooltipContainer: {
                    lineHeight: 1.4,
                    textAlign: "center"
                },
                tooltipTitle: {
                    fontSize: 18,
                    margin: 0
                },
                tooltipContent: {
                    padding: "20px 10px"
                },
                tooltipFooter: {
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 15
                },
                tooltipFooterSpacer: {
                    flex: 1
                },
                buttonNext: _object_spread_props(_object_spread({}, ft), {
                    backgroundColor: u.primaryColor,
                    borderRadius: 4,
                    color: "#fff"
                }),
                buttonBack: _object_spread_props(_object_spread({}, ft), {
                    color: u.primaryColor,
                    marginLeft: "auto",
                    marginRight: 5
                }),
                buttonClose: _object_spread_props(_object_spread({}, ft), {
                    color: u.textColor,
                    height: 14,
                    padding: 15,
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: 14
                }),
                buttonSkip: _object_spread_props(_object_spread({}, ft), {
                    color: u.textColor,
                    fontSize: 14
                }),
                overlay: _object_spread_props(_object_spread({}, m), {
                    backgroundColor: u.overlayColor,
                    mixBlendMode: "hard-light"
                }),
                overlayLegacy: _object_spread({}, m),
                overlayLegacyCenter: _object_spread_props(_object_spread({}, m), {
                    backgroundColor: u.overlayColor
                }),
                spotlight: _object_spread_props(_object_spread({}, ur), {
                    backgroundColor: "gray"
                }),
                spotlightLegacy: _object_spread_props(_object_spread({}, ur), {
                    boxShadow: "0 0 0 9999px ".concat(u.overlayColor, ", ").concat(u.spotlightShadow)
                }),
                floaterStyles: {
                    arrow: {
                        color: (a = (o = (i = c === null || c === void 0 ? void 0 : c.styles) == null ? void 0 : i.arrow) == null ? void 0 : o.color) != null ? a : u.arrowColor
                    },
                    options: {
                        zIndex: u.zIndex + 100
                    }
                },
                options: u
            };
            return (0, Pt.default)(T, p);
        };
        var rs = function rs(e) {
            return Ja(e, "beaconComponent", "disableCloseOnEsc", "disableOverlay", "disableOverlayClose", "disableScrolling", "disableScrollParentFix", "floaterProps", "hideBackButton", "hideCloseButton", "locale", "showProgress", "showSkipButton", "spotlightClicks", "spotlightPadding", "styles", "tooltipComponent");
        };
        var qe = function qe(e, t) {
            var n, r, i, o, a, s;
            var l = t !== null && t !== void 0 ? t : {}, c = Ct.default.all([
                Za,
                rs(e),
                l
            ], {
                isMergeableObject: j.plainObject
            }), p = ns(e, c), u = Ot(Ne(c.target), c.disableScrollParentFix), f = Ct.default.all([
                Qa,
                (n = e.floaterProps) != null ? n : {},
                (r = c.floaterProps) != null ? r : {}
            ]);
            return f.offset = c.offset, f.styles = (0, Ct.default)((i = f.styles) != null ? i : {}, p.floaterStyles), f.offset += (a = (o = e.spotlightPadding) != null ? o : c.spotlightPadding) != null ? a : 0, c.placementBeacon && f.wrapperOptions && (f.wrapperOptions.placement = c.placementBeacon), u && f.options.preventOverflow && (f.options.preventOverflow.boundariesElement = "window"), _object_spread_props(_object_spread({}, c), {
                locale: Ct.default.all([
                    Xr,
                    (s = e.locale) != null ? s : {},
                    c.locale || {}
                ]),
                floaterProps: f,
                styles: Jr(p, "floaterStyles")
            });
        };
        var Qr = function Qr(e) {
            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            return j.plainObject(e) ? e.target ? !0 : (Me({
                title: "validateStep",
                data: "target is missing from the step",
                warn: !0,
                debug: t
            }), !1) : (Me({
                title: "validateStep",
                data: "step must be an object",
                warn: !0,
                debug: t
            }), !1);
        };
        var pr = function pr(e) {
            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
            return j.array(e) ? e.every(function(n) {
                return Qr(n, t);
            }) : (Me({
                title: "validateSteps",
                data: "steps must be an array",
                warn: !0,
                debug: t
            }), !1);
        };
        var is = function is(e) {
            return new os(e);
        };
        var as = function as(param) {
            var _$e = param.styles;
            return V("div", {
                key: "JoyrideSpotlight",
                className: "react-joyride__spotlight",
                "data-test-id": "spotlight",
                style: _$e
            });
        };
        var fs = function fs(_param) {
            var _$e = _param.styles, t = _object_without_properties(_param, [
                "styles"
            ]);
            var n = _$e.color, r = _$e.height, i = _$e.width, o = _object_without_properties(_$e, [
                "color",
                "height",
                "width"
            ]);
            return E.createElement("button", _object_spread({
                style: o,
                type: "button"
            }, t), E.createElement("svg", {
                height: typeof r == "number" ? "".concat(r, "px") : r,
                preserveAspectRatio: "xMidYMid",
                version: "1.1",
                viewBox: "0 0 18 18",
                width: typeof i == "number" ? "".concat(i, "px") : i,
                xmlns: "http://www.w3.org/2000/svg"
            }, E.createElement("g", null, E.createElement("path", {
                d: "M8.13911129,9.00268191 L0.171521827,17.0258467 C-0.0498027049,17.248715 -0.0498027049,17.6098394 0.171521827,17.8327545 C0.28204354,17.9443526 0.427188206,17.9998706 0.572051765,17.9998706 C0.71714958,17.9998706 0.862013139,17.9443526 0.972581703,17.8327545 L9.0000937,9.74924618 L17.0276057,17.8327545 C17.1384085,17.9443526 17.2832721,17.9998706 17.4281356,17.9998706 C17.5729992,17.9998706 17.718097,17.9443526 17.8286656,17.8327545 C18.0499901,17.6098862 18.0499901,17.2487618 17.8286656,17.0258467 L9.86135722,9.00268191 L17.8340066,0.973848225 C18.0553311,0.750979934 18.0553311,0.389855532 17.8340066,0.16694039 C17.6126821,-0.0556467968 17.254037,-0.0556467968 17.0329467,0.16694039 L9.00042166,8.25611765 L0.967006424,0.167268345 C0.745681892,-0.0553188426 0.387317931,-0.0553188426 0.165993399,0.167268345 C-0.0553311331,0.390136635 -0.0553311331,0.751261038 0.165993399,0.974176179 L8.13920499,9.00268191 L8.13911129,9.00268191 Z",
                fill: n
            }))));
        };
        var hs = function hs(e) {
            var t = e.backProps, n = e.closeProps, r = e.continuous, i = e.index, o = e.isLastStep, a = e.primaryProps, s = e.size, l = e.skipProps, c = e.step, p = e.tooltipProps, u = c.content, f = c.hideBackButton, b = c.hideCloseButton, m = c.hideFooter, T = c.locale, F = c.showProgress, I = c.showSkipButton, x = c.styles, v = c.title, P = T.back, R = T.close, K = T.last, B = T.next, te = T.skip, J = {
                primary: R
            };
            return r && (J.primary = o ? K : B, F && (J.primary = V("span", null, J.primary, " (", i + 1, "/", s, ")"))), J.primary && (J.primary = V("button", _object_spread({
                "data-test-id": "button-primary",
                style: x.buttonNext,
                type: "button"
            }, a), J.primary)), I && !o && (J.skip = V("button", _object_spread({
                "aria-live": "off",
                "data-test-id": "button-skip",
                style: x.buttonSkip,
                type: "button"
            }, l), te)), !f && i > 0 && (J.back = V("button", _object_spread({
                "data-test-id": "button-back",
                style: x.buttonBack,
                type: "button"
            }, t), P)), J.close = !b && V(ds, _object_spread({
                "data-test-id": "button-close",
                styles: x.buttonClose
            }, n)), V("div", _object_spread({
                key: "JoyrideTooltip",
                "aria-label": ke(v) || ke(u),
                className: "react-joyride__tooltip",
                style: x.tooltip
            }, p), V("div", {
                style: x.tooltipContainer
            }, v && V("h1", {
                "aria-label": ke(v),
                style: x.tooltipTitle
            }, v), V("div", {
                style: x.tooltipContent
            }, u)), !m && V("div", {
                style: x.tooltipFooter
            }, V("div", {
                style: x.tooltipFooterSpacer
            }, J.skip), J.back, J.primary), J.close);
        };
        var xs = function xs(param) {
            var _$e = param.step, t = param.steps, n = param.onClose, r = param.onComplete;
            var _t_i;
            var _ue = _sliced_to_array(ue(null), 2), i = _ue[0], o = _ue[1], a = _n();
            return ce(function() {
                var s;
                return o(function(l) {
                    var c = t.findIndex(function(param) {
                        var p = param.key;
                        return p === _$e;
                    });
                    return c === -1 ? null : c === l ? l : (s = setTimeout(o, 500, c), null);
                }), function() {
                    return clearTimeout(s);
                };
            }, [
                _$e,
                t
            ]), i === null ? null : E.createElement(bs, {
                continuous: !0,
                steps: t,
                stepIndex: i,
                spotlightPadding: 0,
                disableCloseOnEsc: !0,
                disableOverlayClose: !0,
                disableScrolling: !0,
                callback: function(s) {
                    s.action === $.CLOSE && n(), s.action === $.NEXT && s.index === s.size - 1 && r();
                },
                floaterProps: {
                    disableAnimation: !0,
                    styles: {
                        arrow: {
                            length: 20,
                            spread: 2
                        },
                        floater: {
                            filter: a.base === "light" ? "drop-shadow(0px 5px 5px rgba(0,0,0,0.05)) drop-shadow(0 1px 3px rgba(0,0,0,0.1))" : "drop-shadow(#fff5 0px 0px 0.5px) drop-shadow(#fff5 0px 0px 0.5px)"
                        }
                    }
                },
                tooltipComponent: Rs,
                styles: {
                    overlay: {
                        mixBlendMode: "unset",
                        backgroundColor: ((_t_i = t[i]) === null || _t_i === void 0 ? void 0 : _t_i.target) === "body" ? "rgba(27, 28, 29, 0.2)" : "none"
                    },
                    spotlight: {
                        backgroundColor: "none",
                        border: "solid 2px ".concat(a.color.secondary),
                        boxShadow: "0px 0px 0px 9999px rgba(27, 28, 29, 0.2)"
                    },
                    tooltip: {
                        width: 280,
                        color: a.color.lightest,
                        background: a.color.secondary
                    },
                    options: {
                        zIndex: 9998,
                        primaryColor: a.color.secondary,
                        arrowColor: a.color.secondary
                    }
                }
            });
        };
        var Gs = function Gs(param) {
            var _$e = param.api;
            var _ue = _sliced_to_array(ue(!0), 2), t = _ue[0], n = _ue[1], _ue1 = _sliced_to_array(ue(!1), 2), r = _ue1[0], i = _ue1[1], _ue2 = _sliced_to_array(ue("1:Intro"), 2), o = _ue2[0], a = _ue2[1], _ue3 = _sliced_to_array(ue(), 2), s = _ue3[0], l = _ue3[1], _ue4 = _sliced_to_array(ue(), 2), c = _ue4[0], p = _ue4[1], _ue5 = _sliced_to_array(ue(), 2), u = _ue5[0], f = _ue5[1], _ue6 = _sliced_to_array(ue(), 2), b = _ue6[0], m = _ue6[1], T = ze(function(B) {
                try {
                    var _ref = _$e.getCurrentStoryData() || {}, te = _ref.id, J = _ref.refId;
                    (te !== B || J !== void 0) && _$e.selectStory(B);
                } catch (e) {}
            }, [
                _$e
            ]), F = ze(function() {
                var B = new URL(window.location.href), te = decodeURIComponent(B.searchParams.get("path"));
                B.search = "?path=".concat(te, "&onboarding=false"), history.replaceState({}, "", B.href), _$e.setQueryParams({
                    onboarding: "false"
                }), n(!1);
            }, [
                _$e,
                n
            ]), I = ze(function() {
                _$e.emit(Dn, {
                    step: "6:FinishedOnboarding",
                    type: "telemetry"
                }), T("configure-your-project--docs"), F();
            }, [
                _$e,
                T,
                F
            ]);
            if (ce(function() {
                _$e.setQueryParams({
                    onboarding: "true"
                }), T("example-button--primary"), _$e.togglePanel(!0), _$e.togglePanelPosition("bottom"), _$e.setSelectedPanel("addon-controls");
            }, [
                _$e,
                T
            ]), ce(function() {
                var B = new MutationObserver(function() {
                    l(document.getElementById("control-primary")), p(document.getElementById("save-from-controls")), f(document.getElementById("create-new-story-form"));
                });
                return B.observe(document.body, {
                    childList: !0,
                    subtree: !0
                }), function() {
                    return B.disconnect();
                };
            }, []), ce(function() {
                a(function(B) {
                    return [
                        "1:Intro",
                        "5:StoryCreated",
                        "6:FinishedOnboarding"
                    ].includes(B) ? B : u ? "4:CreateStory" : c ? "3:SaveFromControls" : s ? "2:Controls" : "1:Intro";
                });
            }, [
                u,
                s,
                c
            ]), ce(function() {
                return _$e.on(wn, function(param) {
                    var B = param.payload, te = param.success;
                    !te || !(B === null || B === void 0 ? void 0 : B.newStoryName) || (m(B), i(!0), a("5:StoryCreated"), setTimeout(function() {
                        return _$e.clearNotification("save-story-success");
                    }));
                });
            }, [
                _$e
            ]), ce(function() {
                return _$e.emit(Dn, {
                    step: o,
                    type: "telemetry"
                });
            }, [
                _$e,
                o
            ]), !t) return null;
            var x = b === null || b === void 0 ? void 0 : b.sourceFileContent, v = x === null || x === void 0 ? void 0 : x.lastIndexOf("export const ".concat(b === null || b === void 0 ? void 0 : b.newStoryExportName)), P = x === null || x === void 0 ? void 0 : x.slice(v).trim(), R = x === null || x === void 0 ? void 0 : x.slice(0, v).split("\n").length, K = [
                {
                    key: "2:Controls",
                    target: "#control-primary",
                    title: "Interactive story playground",
                    content: E.createElement(E.Fragment, null, "See how a story renders with different data and state without touching code. Try it out by toggling this button.", E.createElement(Ln, {
                        targetSelector: "#control-primary",
                        pulsating: !0
                    })),
                    offset: 20,
                    placement: "right",
                    disableBeacon: !0,
                    disableOverlay: !0,
                    spotlightClicks: !0,
                    onNextButtonClick: function() {
                        document.querySelector("#control-primary").click();
                    }
                },
                {
                    key: "3:SaveFromControls",
                    target: 'button[aria-label="Create new story with these settings"]',
                    title: "Save your changes as a new story",
                    content: E.createElement(E.Fragment, null, "Great! Storybook stories represent the key states of each of your components. After modifying a story, you can save your changes from here or reset it.", E.createElement(Ln, {
                        targetSelector: "button[aria-label='Create new story with these settings']"
                    })),
                    offset: 6,
                    placement: "top",
                    disableBeacon: !0,
                    disableOverlay: !0,
                    spotlightClicks: !0,
                    onNextButtonClick: function() {
                        document.querySelector('button[aria-label="Create new story with these settings"]').click();
                    },
                    styles: {
                        tooltip: {
                            width: 400
                        }
                    }
                },
                {
                    key: "5:StoryCreated",
                    target: '#storybook-explorer-tree [data-selected="true"]',
                    title: "You just added your first story!",
                    content: E.createElement(E.Fragment, null, "Well done! You just created your first story from the Storybook manager. This automatically added a few lines of code in", " ", E.createElement(Ws, null, b === null || b === void 0 ? void 0 : b.sourceFileName), ".", P && E.createElement(Yt, {
                        theme: qt(xn.dark)
                    }, E.createElement(Us, null, E.createElement(Pn, {
                        language: "jsx",
                        showLineNumbers: !0,
                        startingLineNumber: R
                    }, P)))),
                    offset: 12,
                    placement: "right",
                    disableBeacon: !0,
                    disableOverlay: !0,
                    styles: {
                        tooltip: {
                            width: 400
                        }
                    }
                }
            ];
            return E.createElement(Yt, {
                theme: Hs
            }, r && E.createElement(ei, {
                numberOfPieces: 800,
                recycle: !1,
                tweenDuration: 2e4,
                onConfettiComplete: function(B) {
                    B === null || B === void 0 ? void 0 : B.reset(), i(!1);
                }
            }), o === "1:Intro" ? E.createElement(Bs, {
                onDismiss: function() {
                    return a("2:Controls");
                }
            }) : E.createElement(xs, {
                step: o,
                steps: K,
                onClose: F,
                onComplete: I
            }));
        };
        var io = Object.create;
        var wt = Object.defineProperty;
        var ao = Object.getOwnPropertyDescriptor;
        var so = Object.getOwnPropertyNames;
        var lo = Object.getPrototypeOf, co = Object.prototype.hasOwnProperty;
        var ye = function(e, t) {
            return function() {
                return e && (t = e(e = 0)), t;
            };
        };
        var uo = function(e, t) {
            return function() {
                return t || e((t = {
                    exports: {}
                }).exports, t), t.exports;
            };
        }, gn = function(e, t) {
            for(var n in t)wt(e, n, {
                get: t[n],
                enumerable: !0
            });
        }, bn = function(e, t, n, r) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            if (t && (typeof t === "undefined" ? "undefined" : _type_of(t)) == "object" || typeof t == "function") try {
                var _loop = function() {
                    var i = _step.value;
                    !co.call(e, i) && i !== n && wt(e, i, {
                        get: function() {
                            return t[i];
                        },
                        enumerable: !(r = ao(t, i)) || r.enumerable
                    });
                };
                for(var _iterator = so(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
        var po = function(e, t, n) {
            return n = e != null ? io(lo(e)) : {}, bn(t || !e || !e.__esModule ? wt(n, "default", {
                value: e,
                enumerable: !0
            }) : n, e);
        }, vn = function(e) {
            return bn(wt({}, "__esModule", {
                value: !0
            }), e);
        };
        var X = ye(function() {});
        var Q = ye(function() {});
        var Z = ye(function() {});
        var St = {};
        gn(St, {
            Children: function() {
                return fo;
            },
            Component: function() {
                return _e;
            },
            Fragment: function() {
                return ho;
            },
            Profiler: function() {
                return yo;
            },
            PureComponent: function() {
                return mo;
            },
            StrictMode: function() {
                return go;
            },
            Suspense: function() {
                return Wt;
            },
            __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: function() {
                return bo;
            },
            cloneElement: function() {
                return vo;
            },
            createContext: function() {
                return Eo;
            },
            createElement: function() {
                return V;
            },
            createFactory: function() {
                return Oo;
            },
            createRef: function() {
                return wo;
            },
            default: function() {
                return E;
            },
            forwardRef: function() {
                return Ut;
            },
            isValidElement: function() {
                return Ht;
            },
            lazy: function() {
                return Gt;
            },
            memo: function() {
                return So;
            },
            startTransition: function() {
                return To;
            },
            unstable_act: function() {
                return Io;
            },
            useCallback: function() {
                return ze;
            },
            useContext: function() {
                return Co;
            },
            useDebugValue: function() {
                return Po;
            },
            useDeferredValue: function() {
                return Ro;
            },
            useEffect: function() {
                return ce;
            },
            useId: function() {
                return xo;
            },
            useImperativeHandle: function() {
                return _o;
            },
            useInsertionEffect: function() {
                return Ao;
            },
            useLayoutEffect: function() {
                return ko;
            },
            useMemo: function() {
                return No;
            },
            useReducer: function() {
                return jo;
            },
            useRef: function() {
                return Mo;
            },
            useState: function() {
                return ue;
            },
            useSyncExternalStore: function() {
                return Lo;
            },
            useTransition: function() {
                return Do;
            },
            version: function() {
                return Fo;
            }
        });
        var E, fo, _e, ho, yo, mo, go, Wt, bo, vo, Eo, V, Oo, wo, Ut, Ht, Gt, So, To, Io, ze, Co, Po, Ro, ce, xo, _o, Ao, ko, No, jo, Mo, ue, Lo, Do, Fo, Ye = ye(function() {
            X();
            Q();
            Z();
            var ref;
            E = __REACT__, ref = __REACT__, fo = ref.Children, _e = ref.Component, ho = ref.Fragment, yo = ref.Profiler, mo = ref.PureComponent, go = ref.StrictMode, Wt = ref.Suspense, bo = ref.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, vo = ref.cloneElement, Eo = ref.createContext, V = ref.createElement, Oo = ref.createFactory, wo = ref.createRef, Ut = ref.forwardRef, Ht = ref.isValidElement, Gt = ref.lazy, So = ref.memo, To = ref.startTransition, Io = ref.unstable_act, ze = ref.useCallback, Co = ref.useContext, Po = ref.useDebugValue, Ro = ref.useDeferredValue, ce = ref.useEffect, xo = ref.useId, _o = ref.useImperativeHandle, Ao = ref.useInsertionEffect, ko = ref.useLayoutEffect, No = ref.useMemo, jo = ref.useReducer, Mo = ref.useRef, ue = ref.useState, Lo = ref.useSyncExternalStore, Do = ref.useTransition, Fo = ref.version, ref;
        });
        var De, tl, it, nl, rl, ol, il, al, sl, En, ll, On, cl, Tt = ye(function() {
            X();
            Q();
            Z();
            var ref;
            De = __REACT_DOM__, ref = __REACT_DOM__, tl = ref.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, it = ref.createPortal, nl = ref.createRoot, rl = ref.findDOMNode, ol = ref.flushSync, il = ref.hydrate, al = ref.hydrateRoot, sl = ref.render, En = ref.unmountComponentAtNode, ll = ref.unstable_batchedUpdates, On = ref.unstable_renderSubtreeIntoContainer, cl = ref.version, ref;
        });
        var dl, hl, yl, ml, gl, bl, vl, El, Ol, wl, Sl, Tl, Il, Cl, Pl, Rl, xl, _l, Al, kl, Nl, jl, Ml, Ll, Dl, Fl, wn, Bl, Wl, Ul, Hl, Gl, zl, Yl, ql, $l, Vl, Kl, Jl, Xl, Ql, Zl, ec, tc, nc, rc, oc, Sn, ic, ac, sc, lc, cc, uc, pc, fc, Tn = ye(function() {
            X();
            Q();
            Z();
            var ref;
            dl = __STORYBOOK_CORE_EVENTS__, ref = __STORYBOOK_CORE_EVENTS__, hl = ref.ARGTYPES_INFO_REQUEST, yl = ref.ARGTYPES_INFO_RESPONSE, ml = ref.CHANNEL_CREATED, gl = ref.CHANNEL_WS_DISCONNECT, bl = ref.CONFIG_ERROR, vl = ref.CREATE_NEW_STORYFILE_REQUEST, El = ref.CREATE_NEW_STORYFILE_RESPONSE, Ol = ref.CURRENT_STORY_WAS_SET, wl = ref.DOCS_PREPARED, Sl = ref.DOCS_RENDERED, Tl = ref.FILE_COMPONENT_SEARCH_REQUEST, Il = ref.FILE_COMPONENT_SEARCH_RESPONSE, Cl = ref.FORCE_REMOUNT, Pl = ref.FORCE_RE_RENDER, Rl = ref.GLOBALS_UPDATED, xl = ref.NAVIGATE_URL, _l = ref.PLAY_FUNCTION_THREW_EXCEPTION, Al = ref.PRELOAD_ENTRIES, kl = ref.PREVIEW_BUILDER_PROGRESS, Nl = ref.PREVIEW_KEYDOWN, jl = ref.REGISTER_SUBSCRIPTION, Ml = ref.REQUEST_WHATS_NEW_DATA, Ll = ref.RESET_STORY_ARGS, Dl = ref.RESULT_WHATS_NEW_DATA, Fl = ref.SAVE_STORY_REQUEST, wn = ref.SAVE_STORY_RESPONSE, Bl = ref.SELECT_STORY, Wl = ref.SET_CONFIG, Ul = ref.SET_CURRENT_STORY, Hl = ref.SET_FILTER, Gl = ref.SET_GLOBALS, zl = ref.SET_INDEX, Yl = ref.SET_STORIES, ql = ref.SET_WHATS_NEW_CACHE, $l = ref.SHARED_STATE_CHANGED, Vl = ref.SHARED_STATE_SET, Kl = ref.STORIES_COLLAPSE_ALL, Jl = ref.STORIES_EXPAND_ALL, Xl = ref.STORY_ARGS_UPDATED, Ql = ref.STORY_CHANGED, Zl = ref.STORY_ERRORED, ec = ref.STORY_INDEX_INVALIDATED, tc = ref.STORY_MISSING, nc = ref.STORY_PREPARED, rc = ref.STORY_RENDERED, oc = ref.STORY_RENDER_PHASE_CHANGED, Sn = ref.STORY_SPECIFIED, ic = ref.STORY_THREW_EXCEPTION, ac = ref.STORY_UNCHANGED, sc = ref.TELEMETRY_ERROR, lc = ref.TOGGLE_WHATS_NEW_NOTIFICATIONS, cc = ref.UNHANDLED_ERRORS_WHILE_PLAYING, uc = ref.UPDATE_GLOBALS, pc = ref.UPDATE_QUERY_PARAMS, fc = ref.UPDATE_STORY_ARGS, ref;
        });
        var zt = ye(function() {
            X();
            Q();
            Z();
            Tn();
        });
        var ou, iu, au, su, lu, cu, uu, pu, fu, du, hu, yu, mu, gu, bu, vu, Eu, Ou, wu, Su, Tu, Iu, Cu, Pu, Cn, Ru, xu, _u, Au, ku, Nu, ju, Mu, Lu, Du, Fu, Bu, Wu, Uu, Hu, Gu, zu, Yu, qu, $u, Pn, Vu, Ku, Ju, Xu, Qu, Zu, ep, tp, np, rp, op, ip, ap, sp, lp, cp, up, pp, fp, dp, hp, yp, mp, Rn = ye(function() {
            X();
            Q();
            Z();
            var ref;
            ou = __STORYBOOK_COMPONENTS__, ref = __STORYBOOK_COMPONENTS__, iu = ref.A, au = ref.ActionBar, su = ref.AddonPanel, lu = ref.Badge, cu = ref.Bar, uu = ref.Blockquote, pu = ref.Button, fu = ref.ClipboardCode, du = ref.Code, hu = ref.DL, yu = ref.Div, mu = ref.DocumentWrapper, gu = ref.EmptyTabContent, bu = ref.ErrorFormatter, vu = ref.FlexBar, Eu = ref.Form, Ou = ref.H1, wu = ref.H2, Su = ref.H3, Tu = ref.H4, Iu = ref.H5, Cu = ref.H6, Pu = ref.HR, Cn = ref.IconButton, Ru = ref.IconButtonSkeleton, xu = ref.Icons, _u = ref.Img, Au = ref.LI, ku = ref.Link, Nu = ref.ListItem, ju = ref.Loader, Mu = ref.Modal, Lu = ref.OL, Du = ref.P, Fu = ref.Placeholder, Bu = ref.Pre, Wu = ref.ResetWrapper, Uu = ref.ScrollArea, Hu = ref.Separator, Gu = ref.Spaced, zu = ref.Span, Yu = ref.StorybookIcon, qu = ref.StorybookLogo, $u = ref.Symbols, Pn = ref.SyntaxHighlighter, Vu = ref.TT, Ku = ref.TabBar, Ju = ref.TabButton, Xu = ref.TabWrapper, Qu = ref.Table, Zu = ref.Tabs, ep = ref.TabsState, tp = ref.TooltipLinkList, np = ref.TooltipMessage, rp = ref.TooltipNote, op = ref.UL, ip = ref.WithTooltip, ap = ref.WithTooltipPure, sp = ref.Zoom, lp = ref.codeCommon, cp = ref.components, up = ref.createCopyToClipboardFunction, pp = ref.getStoryHref, fp = ref.icons, dp = ref.interleaveSeparators, hp = ref.nameSpaceClassNames, yp = ref.resetComponents, mp = ref.withReset, ref;
        });
        var Op, wp, Sp, Tp, Yt, Ip, It, qt, Cp, Pp, Rp, xp, _p, Ap, kp, Np, jp, Mp, at, Lp, re, xn, Dp, _n, Fp, An = ye(function() {
            X();
            Q();
            Z();
            var ref;
            Op = __STORYBOOK_THEMING__, ref = __STORYBOOK_THEMING__, wp = ref.CacheProvider, Sp = ref.ClassNames, Tp = ref.Global, Yt = ref.ThemeProvider, Ip = ref.background, It = ref.color, qt = ref.convert, Cp = ref.create, Pp = ref.createCache, Rp = ref.createGlobal, xp = ref.createReset, _p = ref.css, Ap = ref.darken, kp = ref.ensure, Np = ref.ignoreSsrWarning, jp = ref.isPropValid, Mp = ref.jsx, at = ref.keyframes, Lp = ref.lighten, re = ref.styled, xn = ref.themes, Dp = ref.typography, _n = ref.useTheme, Fp = ref.withTheme, ref;
        });
        var kn = uo(function(st, $t) {
            X();
            Q();
            Z();
            (function(e, t) {
                (typeof st === "undefined" ? "undefined" : _type_of(st)) == "object" && (typeof $t === "undefined" ? "undefined" : _type_of($t)) == "object" ? $t.exports = t((Ye(), vn(St))) : typeof define == "function" && define.amd ? define([
                    "react"
                ], t) : (typeof st === "undefined" ? "undefined" : _type_of(st)) == "object" ? st.ReactConfetti = t((Ye(), vn(St))) : e.ReactConfetti = t(e.React);
            })((typeof self === "undefined" ? "undefined" : _type_of(self)) < "u" ? self : st, function(e) {
                return function(t) {
                    var n = {};
                    function r(i) {
                        if (n[i]) return n[i].exports;
                        var o = n[i] = {
                            i: i,
                            l: !1,
                            exports: {}
                        };
                        return t[i].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
                    }
                    return r.m = t, r.c = n, r.d = function(i, o, a) {
                        r.o(i, o) || Object.defineProperty(i, o, {
                            enumerable: !0,
                            get: a
                        });
                    }, r.r = function(i) {
                        (typeof Symbol === "undefined" ? "undefined" : _type_of(Symbol)) < "u" && Symbol.toStringTag && Object.defineProperty(i, Symbol.toStringTag, {
                            value: "Module"
                        }), Object.defineProperty(i, "__esModule", {
                            value: !0
                        });
                    }, r.t = function(i, o) {
                        if (1 & o && (i = r(i)), 8 & o || 4 & o && (typeof i === "undefined" ? "undefined" : _type_of(i)) == "object" && i && i.__esModule) return i;
                        var a = Object.create(null);
                        if (r.r(a), Object.defineProperty(a, "default", {
                            enumerable: !0,
                            value: i
                        }), 2 & o && typeof i != "string") for(var s in i)r.d(a, s, (function(l) {
                            return i[l];
                        }).bind(null, s));
                        return a;
                    }, r.n = function(i) {
                        var o = i && i.__esModule ? function o() {
                            return i.default;
                        } : function() {
                            return i;
                        };
                        return r.d(o, "a", o), o;
                    }, r.o = function(i, o) {
                        return Object.prototype.hasOwnProperty.call(i, o);
                    }, r.p = "", r(r.s = 2);
                }([
                    function(t, n) {
                        t.exports = e;
                    },
                    function(t, n, r) {
                        "use strict";
                        var i = {
                            linear: function linear(o, a, s, l) {
                                return (s - a) * o / l + a;
                            },
                            easeInQuad: function easeInQuad(o, a, s, l) {
                                return (s - a) * (o /= l) * o + a;
                            },
                            easeOutQuad: function easeOutQuad(o, a, s, l) {
                                return -(s - a) * (o /= l) * (o - 2) + a;
                            },
                            easeInOutQuad: function easeInOutQuad(o, a, s, l) {
                                var c = s - a;
                                return (o /= l / 2) < 1 ? c / 2 * o * o + a : -c / 2 * (--o * (o - 2) - 1) + a;
                            },
                            easeInCubic: function easeInCubic(o, a, s, l) {
                                return (s - a) * (o /= l) * o * o + a;
                            },
                            easeOutCubic: function easeOutCubic(o, a, s, l) {
                                return (s - a) * ((o = o / l - 1) * o * o + 1) + a;
                            },
                            easeInOutCubic: function easeInOutCubic(o, a, s, l) {
                                var c = s - a;
                                return (o /= l / 2) < 1 ? c / 2 * o * o * o + a : c / 2 * ((o -= 2) * o * o + 2) + a;
                            },
                            easeInQuart: function easeInQuart(o, a, s, l) {
                                return (s - a) * (o /= l) * o * o * o + a;
                            },
                            easeOutQuart: function easeOutQuart(o, a, s, l) {
                                return -(s - a) * ((o = o / l - 1) * o * o * o - 1) + a;
                            },
                            easeInOutQuart: function easeInOutQuart(o, a, s, l) {
                                var c = s - a;
                                return (o /= l / 2) < 1 ? c / 2 * o * o * o * o + a : -c / 2 * ((o -= 2) * o * o * o - 2) + a;
                            },
                            easeInQuint: function easeInQuint(o, a, s, l) {
                                return (s - a) * (o /= l) * o * o * o * o + a;
                            },
                            easeOutQuint: function easeOutQuint(o, a, s, l) {
                                return (s - a) * ((o = o / l - 1) * o * o * o * o + 1) + a;
                            },
                            easeInOutQuint: function easeInOutQuint(o, a, s, l) {
                                var c = s - a;
                                return (o /= l / 2) < 1 ? c / 2 * o * o * o * o * o + a : c / 2 * ((o -= 2) * o * o * o * o + 2) + a;
                            },
                            easeInSine: function easeInSine(o, a, s, l) {
                                var c = s - a;
                                return -c * Math.cos(o / l * (Math.PI / 2)) + c + a;
                            },
                            easeOutSine: function easeOutSine(o, a, s, l) {
                                return (s - a) * Math.sin(o / l * (Math.PI / 2)) + a;
                            },
                            easeInOutSine: function easeInOutSine(o, a, s, l) {
                                return -(s - a) / 2 * (Math.cos(Math.PI * o / l) - 1) + a;
                            },
                            easeInExpo: function easeInExpo(o, a, s, l) {
                                return o == 0 ? a : (s - a) * Math.pow(2, 10 * (o / l - 1)) + a;
                            },
                            easeOutExpo: function easeOutExpo(o, a, s, l) {
                                var c = s - a;
                                return o == l ? a + c : c * (1 - Math.pow(2, -10 * o / l)) + a;
                            },
                            easeInOutExpo: function easeInOutExpo(o, a, s, l) {
                                var c = s - a;
                                return o === 0 ? a : o === l ? a + c : (o /= l / 2) < 1 ? c / 2 * Math.pow(2, 10 * (o - 1)) + a : c / 2 * (2 - Math.pow(2, -10 * --o)) + a;
                            },
                            easeInCirc: function easeInCirc(o, a, s, l) {
                                return -(s - a) * (Math.sqrt(1 - (o /= l) * o) - 1) + a;
                            },
                            easeOutCirc: function easeOutCirc(o, a, s, l) {
                                return (s - a) * Math.sqrt(1 - (o = o / l - 1) * o) + a;
                            },
                            easeInOutCirc: function easeInOutCirc(o, a, s, l) {
                                var c = s - a;
                                return (o /= l / 2) < 1 ? -c / 2 * (Math.sqrt(1 - o * o) - 1) + a : c / 2 * (Math.sqrt(1 - (o -= 2) * o) + 1) + a;
                            },
                            easeInElastic: function easeInElastic(o, a, s, l) {
                                var c, p, u, f = s - a;
                                return u = 1.70158, o === 0 ? a : (o /= l) == 1 ? a + f : ((p = 0) || (p = .3 * l), (c = f) < Math.abs(f) ? (c = f, u = p / 4) : u = p / (2 * Math.PI) * Math.asin(f / c), -c * Math.pow(2, 10 * (o -= 1)) * Math.sin((o * l - u) * (2 * Math.PI) / p) + a);
                            },
                            easeOutElastic: function easeOutElastic(o, a, s, l) {
                                var c, p, u, f = s - a;
                                return u = 1.70158, o === 0 ? a : (o /= l) == 1 ? a + f : ((p = 0) || (p = .3 * l), (c = f) < Math.abs(f) ? (c = f, u = p / 4) : u = p / (2 * Math.PI) * Math.asin(f / c), c * Math.pow(2, -10 * o) * Math.sin((o * l - u) * (2 * Math.PI) / p) + f + a);
                            },
                            easeInOutElastic: function easeInOutElastic(o, a, s, l) {
                                var c, p, u, f = s - a;
                                return u = 1.70158, o === 0 ? a : (o /= l / 2) == 2 ? a + f : ((p = 0) || (p = l * .44999999999999996), (c = f) < Math.abs(f) ? (c = f, u = p / 4) : u = p / (2 * Math.PI) * Math.asin(f / c), o < 1 ? c * Math.pow(2, 10 * (o -= 1)) * Math.sin((o * l - u) * (2 * Math.PI) / p) * -.5 + a : c * Math.pow(2, -10 * (o -= 1)) * Math.sin((o * l - u) * (2 * Math.PI) / p) * .5 + f + a);
                            },
                            easeInBack: function easeInBack(o, a, s, l, c) {
                                return c === void 0 && (c = 1.70158), (s - a) * (o /= l) * o * ((c + 1) * o - c) + a;
                            },
                            easeOutBack: function easeOutBack(o, a, s, l, c) {
                                return c === void 0 && (c = 1.70158), (s - a) * ((o = o / l - 1) * o * ((c + 1) * o + c) + 1) + a;
                            },
                            easeInOutBack: function easeInOutBack(o, a, s, l, c) {
                                var p = s - a;
                                return c === void 0 && (c = 1.70158), (o /= l / 2) < 1 ? p / 2 * (o * o * ((1 + (c *= 1.525)) * o - c)) + a : p / 2 * ((o -= 2) * o * ((1 + (c *= 1.525)) * o + c) + 2) + a;
                            },
                            easeInBounce: function easeInBounce(o, a, s, l) {
                                var c = s - a;
                                return c - i.easeOutBounce(l - o, 0, c, l) + a;
                            },
                            easeOutBounce: function easeOutBounce(o, a, s, l) {
                                var c = s - a;
                                return (o /= l) < .36363636363636365 ? c * (7.5625 * o * o) + a : o < .7272727272727273 ? c * (7.5625 * (o -= .5454545454545454) * o + .75) + a : o < .9090909090909091 ? c * (7.5625 * (o -= .8181818181818182) * o + .9375) + a : c * (7.5625 * (o -= .9545454545454546) * o + .984375) + a;
                            },
                            easeInOutBounce: function easeInOutBounce(o, a, s, l) {
                                var c = s - a;
                                return o < l / 2 ? .5 * i.easeInBounce(2 * o, 0, c, l) + a : .5 * i.easeOutBounce(2 * o - l, 0, c, l) + .5 * c + a;
                            }
                        };
                        t.exports = i;
                    },
                    function(t, n, r) {
                        t.exports = r(3);
                    },
                    function(t, n, r) {
                        "use strict";
                        r.r(n), r.d(n, "ReactConfetti", function() {
                            return G;
                        });
                        var i, o, a = r(0), s = r.n(a), l = r(1), c = r.n(l);
                        function p(d, h) {
                            return d + Math.random() * (h - d);
                        }
                        function u(d, h) {
                            for(var g = 0; g < h.length; g++){
                                var y = h[g];
                                y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(d, y.key, y);
                            }
                        }
                        function f(d, h, g) {
                            return h in d ? Object.defineProperty(d, h, {
                                value: g,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : d[h] = g, d;
                        }
                        (function(d) {
                            d[d.Circle = 0] = "Circle", d[d.Square = 1] = "Square", d[d.Strip = 2] = "Strip";
                        })(i || (i = {})), function(d) {
                            d[d.Positive = 1] = "Positive", d[d.Negative = -1] = "Negative";
                        }(o || (o = {}));
                        var b = function() {
                            function d(k, M, w, O) {
                                (function(Dt, nt) {
                                    if (!_instanceof(Dt, nt)) throw new TypeError("Cannot call a class as a function");
                                })(this, d), f(this, "context", void 0), f(this, "radius", void 0), f(this, "x", void 0), f(this, "y", void 0), f(this, "w", void 0), f(this, "h", void 0), f(this, "vx", void 0), f(this, "vy", void 0), f(this, "shape", void 0), f(this, "angle", void 0), f(this, "angularSpin", void 0), f(this, "color", void 0), f(this, "rotateY", void 0), f(this, "rotationDirection", void 0), f(this, "getOptions", void 0), this.getOptions = M;
                                var U, z, ne = this.getOptions(), xe = ne.colors, ie = ne.initialVelocityX, Ge = ne.initialVelocityY;
                                this.context = k, this.x = w, this.y = O, this.w = p(5, 20), this.h = p(5, 20), this.radius = p(5, 10), this.vx = typeof ie == "number" ? p(-ie, ie) : p(ie.min, ie.max), this.vy = typeof Ge == "number" ? p(-Ge, 0) : p(Ge.min, Ge.max), this.shape = (U = 0, z = 2, Math.floor(U + Math.random() * (z - U + 1))), this.angle = p(0, 360) * Math.PI / 180, this.angularSpin = p(-.2, .2), this.color = xe[Math.floor(Math.random() * xe.length)], this.rotateY = p(0, 1), this.rotationDirection = p(0, 1) ? o.Positive : o.Negative;
                            }
                            var h, g, y;
                            return h = d, (g = [
                                {
                                    key: "update",
                                    value: function value() {
                                        var k = this.getOptions(), M = k.gravity, w = k.wind, O = k.friction, U = k.opacity, z = k.drawShape;
                                        this.x += this.vx, this.y += this.vy, this.vy += M, this.vx += w, this.vx *= O, this.vy *= O, this.rotateY >= 1 && this.rotationDirection === o.Positive ? this.rotationDirection = o.Negative : this.rotateY <= -1 && this.rotationDirection === o.Negative && (this.rotationDirection = o.Positive);
                                        var ne = .1 * this.rotationDirection;
                                        if (this.rotateY += ne, this.angle += this.angularSpin, this.context.save(), this.context.translate(this.x, this.y), this.context.rotate(this.angle), this.context.scale(1, this.rotateY), this.context.rotate(this.angle), this.context.beginPath(), this.context.fillStyle = this.color, this.context.strokeStyle = this.color, this.context.globalAlpha = U, this.context.lineCap = "round", this.context.lineWidth = 2, z && typeof z == "function") z.call(this, this.context);
                                        else switch(this.shape){
                                            case i.Circle:
                                                this.context.beginPath(), this.context.arc(0, 0, this.radius, 0, 2 * Math.PI), this.context.fill();
                                                break;
                                            case i.Square:
                                                this.context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
                                                break;
                                            case i.Strip:
                                                this.context.fillRect(-this.w / 6, -this.h / 2, this.w / 3, this.h);
                                        }
                                        this.context.closePath(), this.context.restore();
                                    }
                                }
                            ]) && u(h.prototype, g), y && u(h, y), d;
                        }();
                        function m(d, h, g) {
                            return h in d ? Object.defineProperty(d, h, {
                                value: g,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : d[h] = g, d;
                        }
                        var T = function d(h, g) {
                            var y = this;
                            (function(M, w) {
                                if (!_instanceof(M, w)) throw new TypeError("Cannot call a class as a function");
                            })(this, d), m(this, "canvas", void 0), m(this, "context", void 0), m(this, "getOptions", void 0), m(this, "x", 0), m(this, "y", 0), m(this, "w", 0), m(this, "h", 0), m(this, "lastNumberOfPieces", 0), m(this, "tweenInitTime", Date.now()), m(this, "particles", []), m(this, "particlesGenerated", 0), m(this, "removeParticleAt", function(M) {
                                y.particles.splice(M, 1);
                            }), m(this, "getParticle", function() {
                                var M = p(y.x, y.w + y.x), w = p(y.y, y.h + y.y);
                                return new b(y.context, y.getOptions, M, w);
                            }), m(this, "animate", function() {
                                var M = y.canvas, w = y.context, O = y.particlesGenerated, U = y.lastNumberOfPieces, z = y.getOptions(), ne = z.run, xe = z.recycle, ie = z.numberOfPieces, Ge = z.debug, Dt = z.tweenFunction, nt = z.tweenDuration;
                                if (!ne) return !1;
                                var Ft = y.particles.length, rt = xe ? Ft : O, Bt = Date.now();
                                if (rt < ie) {
                                    U !== ie && (y.tweenInitTime = Bt, y.lastNumberOfPieces = ie);
                                    for(var dn = y.tweenInitTime, oo = Dt(Bt - dn > nt ? nt : Math.max(0, Bt - dn), rt, ie, nt), hn = Math.round(oo - rt), yn = 0; yn < hn; yn++)y.particles.push(y.getParticle());
                                    y.particlesGenerated += hn;
                                }
                                return Ge && (w.font = "12px sans-serif", w.fillStyle = "#333", w.textAlign = "right", w.fillText("Particles: ".concat(Ft), M.width - 10, M.height - 20)), y.particles.forEach(function(ot, mn) {
                                    ot.update(), (ot.y > M.height || ot.y < -100 || ot.x > M.width + 100 || ot.x < -100) && (xe && rt <= ie ? y.particles[mn] = y.getParticle() : y.removeParticleAt(mn));
                                }), Ft > 0 || rt < ie;
                            }), this.canvas = h;
                            var k = this.canvas.getContext("2d");
                            if (!k) throw new Error("Could not get canvas context");
                            this.context = k, this.getOptions = g;
                        };
                        function F(d, h) {
                            var g = Object.keys(d);
                            if (Object.getOwnPropertySymbols) {
                                var y = Object.getOwnPropertySymbols(d);
                                h && (y = y.filter(function(k) {
                                    return Object.getOwnPropertyDescriptor(d, k).enumerable;
                                })), g.push.apply(g, y);
                            }
                            return g;
                        }
                        function I(d) {
                            for(var h = 1; h < arguments.length; h++){
                                var g = arguments[h] != null ? arguments[h] : {};
                                h % 2 ? F(Object(g), !0).forEach(function(y) {
                                    v(d, y, g[y]);
                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(d, Object.getOwnPropertyDescriptors(g)) : F(Object(g)).forEach(function(y) {
                                    Object.defineProperty(d, y, Object.getOwnPropertyDescriptor(g, y));
                                });
                            }
                            return d;
                        }
                        function x(d, h) {
                            for(var g = 0; g < h.length; g++){
                                var y = h[g];
                                y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(d, y.key, y);
                            }
                        }
                        function v(d, h, g) {
                            return h in d ? Object.defineProperty(d, h, {
                                value: g,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : d[h] = g, d;
                        }
                        var P = {
                            width: (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" ? window.innerWidth : 300,
                            height: (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" ? window.innerHeight : 200,
                            numberOfPieces: 200,
                            friction: .99,
                            wind: 0,
                            gravity: .1,
                            initialVelocityX: 4,
                            initialVelocityY: 10,
                            colors: [
                                "#f44336",
                                "#e91e63",
                                "#9c27b0",
                                "#673ab7",
                                "#3f51b5",
                                "#2196f3",
                                "#03a9f4",
                                "#00bcd4",
                                "#009688",
                                "#4CAF50",
                                "#8BC34A",
                                "#CDDC39",
                                "#FFEB3B",
                                "#FFC107",
                                "#FF9800",
                                "#FF5722",
                                "#795548"
                            ],
                            opacity: 1,
                            debug: !1,
                            tweenFunction: c.a.easeInOutQuad,
                            tweenDuration: 5e3,
                            recycle: !0,
                            run: !0
                        }, R = function() {
                            function d(k, M) {
                                var w = this;
                                (function(U, z) {
                                    if (!_instanceof(U, z)) throw new TypeError("Cannot call a class as a function");
                                })(this, d), v(this, "canvas", void 0), v(this, "context", void 0), v(this, "_options", void 0), v(this, "generator", void 0), v(this, "rafId", void 0), v(this, "setOptionsWithDefaults", function(U) {
                                    var z = {
                                        confettiSource: {
                                            x: 0,
                                            y: 0,
                                            w: w.canvas.width,
                                            h: 0
                                        }
                                    };
                                    w._options = I(I(I({}, z), P), U), Object.assign(w, U.confettiSource);
                                }), v(this, "update", function() {
                                    var U = w.options, z = U.run, ne = U.onConfettiComplete, xe = w.canvas, ie = w.context;
                                    z && (ie.fillStyle = "white", ie.clearRect(0, 0, xe.width, xe.height)), w.generator.animate() ? w.rafId = requestAnimationFrame(w.update) : (ne && typeof ne == "function" && w.generator.particlesGenerated > 0 && ne.call(w, w), w._options.run = !1);
                                }), v(this, "reset", function() {
                                    w.generator && w.generator.particlesGenerated > 0 && (w.generator.particlesGenerated = 0, w.generator.particles = [], w.generator.lastNumberOfPieces = 0);
                                }), v(this, "stop", function() {
                                    w.options = {
                                        run: !1
                                    }, w.rafId && (cancelAnimationFrame(w.rafId), w.rafId = void 0);
                                }), this.canvas = k;
                                var O = this.canvas.getContext("2d");
                                if (!O) throw new Error("Could not get canvas context");
                                this.context = O, this.generator = new T(this.canvas, function() {
                                    return w.options;
                                }), this.options = M, this.update();
                            }
                            var h, g, y;
                            return h = d, (g = [
                                {
                                    key: "options",
                                    get: function get() {
                                        return this._options;
                                    },
                                    set: function set(k) {
                                        var M = this._options && this._options.run, w = this._options && this._options.recycle;
                                        this.setOptionsWithDefaults(k), this.generator && (Object.assign(this.generator, this.options.confettiSource), typeof k.recycle == "boolean" && k.recycle && w === !1 && (this.generator.lastNumberOfPieces = this.generator.particles.length)), typeof k.run == "boolean" && k.run && M === !1 && this.update();
                                    }
                                }
                            ]) && x(h.prototype, g), y && x(h, y), d;
                        }();
                        function K(d) {
                            return function(h) {
                                if (Array.isArray(h)) return Re(h);
                            }(d) || function(h) {
                                if ((typeof Symbol === "undefined" ? "undefined" : _type_of(Symbol)) < "u" && Symbol.iterator in Object(h)) return Array.from(h);
                            }(d) || Ue(d) || function() {
                                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                            }();
                        }
                        function B(d) {
                            return (B = typeof Symbol == "function" && _type_of(Symbol.iterator) == "symbol" ? function B(h) {
                                return typeof h === "undefined" ? "undefined" : _type_of(h);
                            } : function(h) {
                                return h && typeof Symbol == "function" && h.constructor === Symbol && h !== Symbol.prototype ? "symbol" : typeof h === "undefined" ? "undefined" : _type_of(h);
                            })(d);
                        }
                        function te() {
                            return (te = Object.assign || function(d) {
                                for(var h = 1; h < arguments.length; h++){
                                    var g = arguments[h];
                                    for(var y in g)Object.prototype.hasOwnProperty.call(g, y) && (d[y] = g[y]);
                                }
                                return d;
                            }).apply(this, arguments);
                        }
                        function J(d, h) {
                            var g = Object.keys(d);
                            if (Object.getOwnPropertySymbols) {
                                var y = Object.getOwnPropertySymbols(d);
                                h && (y = y.filter(function(k) {
                                    return Object.getOwnPropertyDescriptor(d, k).enumerable;
                                })), g.push.apply(g, y);
                            }
                            return g;
                        }
                        function se(d) {
                            for(var h = 1; h < arguments.length; h++){
                                var g = arguments[h] != null ? arguments[h] : {};
                                h % 2 ? J(Object(g), !0).forEach(function(y) {
                                    we(d, y, g[y]);
                                }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(d, Object.getOwnPropertyDescriptors(g)) : J(Object(g)).forEach(function(y) {
                                    Object.defineProperty(d, y, Object.getOwnPropertyDescriptor(g, y));
                                });
                            }
                            return d;
                        }
                        function Ze(d, h) {
                            return function(g) {
                                if (Array.isArray(g)) return g;
                            }(d) || function(g, y) {
                                if (!((typeof Symbol === "undefined" ? "undefined" : _type_of(Symbol)) > "u" || !(Symbol.iterator in Object(g)))) {
                                    var k = [], M = !0, w = !1, O = void 0;
                                    try {
                                        for(var U, z = g[Symbol.iterator](); !(M = (U = z.next()).done) && (k.push(U.value), !y || k.length !== y); M = !0);
                                    } catch (ne) {
                                        w = !0, O = ne;
                                    } finally{
                                        try {
                                            M || z.return == null || z.return();
                                        } finally{
                                            if (w) throw O;
                                        }
                                    }
                                    return k;
                                }
                            }(d, h) || Ue(d, h) || function() {
                                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                            }();
                        }
                        function Ue(d, h) {
                            if (d) {
                                if (typeof d == "string") return Re(d, h);
                                var g = Object.prototype.toString.call(d).slice(8, -1);
                                return g === "Object" && d.constructor && (g = d.constructor.name), g === "Map" || g === "Set" ? Array.from(d) : g === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(g) ? Re(d, h) : void 0;
                            }
                        }
                        function Re(d, h) {
                            (h == null || h > d.length) && (h = d.length);
                            for(var g = 0, y = new Array(h); g < h; g++)y[g] = d[g];
                            return y;
                        }
                        function et(d, h) {
                            if (!_instanceof(d, h)) throw new TypeError("Cannot call a class as a function");
                        }
                        function He(d, h) {
                            for(var g = 0; g < h.length; g++){
                                var y = h[g];
                                y.enumerable = y.enumerable || !1, y.configurable = !0, "value" in y && (y.writable = !0), Object.defineProperty(d, y.key, y);
                            }
                        }
                        function Ce(d, h) {
                            return (Ce = Object.setPrototypeOf || function(g, y) {
                                return g.__proto__ = y, g;
                            })(d, h);
                        }
                        function tt(d) {
                            var h = function() {
                                if ((typeof Reflect === "undefined" ? "undefined" : _type_of(Reflect)) > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
                                if (typeof Proxy == "function") return !0;
                                try {
                                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), !0;
                                } catch (e) {
                                    return !1;
                                }
                            }();
                            return function() {
                                var g, y = Le(d);
                                if (h) {
                                    var k = Le(this).constructor;
                                    g = Reflect.construct(y, arguments, k);
                                } else g = y.apply(this, arguments);
                                return pe(this, g);
                            };
                        }
                        function pe(d, h) {
                            return !h || B(h) !== "object" && typeof h != "function" ? fe(d) : h;
                        }
                        function fe(d) {
                            if (d === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return d;
                        }
                        function Le(d) {
                            return (Le = Object.setPrototypeOf ? Object.getPrototypeOf : function Le(h) {
                                return h.__proto__ || Object.getPrototypeOf(h);
                            })(d);
                        }
                        function we(d, h, g) {
                            return h in d ? Object.defineProperty(d, h, {
                                value: g,
                                enumerable: !0,
                                configurable: !0,
                                writable: !0
                            }) : d[h] = g, d;
                        }
                        var S = s.a.createRef(), N = function(d) {
                            (function(w, O) {
                                if (typeof O != "function" && O !== null) throw new TypeError("Super expression must either be null or a function");
                                w.prototype = Object.create(O && O.prototype, {
                                    constructor: {
                                        value: w,
                                        writable: !0,
                                        configurable: !0
                                    }
                                }), O && Ce(w, O);
                            })(M, d);
                            var h, g, y, k = tt(M);
                            function M(w) {
                                var O;
                                et(this, M);
                                for(var U = arguments.length, z = new Array(U > 1 ? U - 1 : 0), ne = 1; ne < U; ne++)z[ne - 1] = arguments[ne];
                                return we(fe(O = k.call.apply(k, [
                                    this,
                                    w
                                ].concat(z))), "canvas", s.a.createRef()), we(fe(O), "confetti", void 0), O.canvas = w.canvasRef || S, O;
                            }
                            return h = M, (g = [
                                {
                                    key: "componentDidMount",
                                    value: function value() {
                                        if (this.canvas.current) {
                                            var w = H(this.props)[0];
                                            this.confetti = new R(this.canvas.current, w);
                                        }
                                    }
                                },
                                {
                                    key: "componentDidUpdate",
                                    value: function value() {
                                        var w = H(this.props)[0];
                                        this.confetti && (this.confetti.options = w);
                                    }
                                },
                                {
                                    key: "componentWillUnmount",
                                    value: function value() {
                                        this.confetti && this.confetti.stop(), this.confetti = void 0;
                                    }
                                },
                                {
                                    key: "render",
                                    value: function value() {
                                        var w = Ze(H(this.props), 2), O = w[0], U = w[1], z = se({
                                            zIndex: 2,
                                            position: "absolute",
                                            pointerEvents: "none",
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0
                                        }, U.style);
                                        return s.a.createElement("canvas", te({
                                            width: O.width,
                                            height: O.height,
                                            ref: this.canvas
                                        }, U, {
                                            style: z
                                        }));
                                    }
                                }
                            ]) && He(h.prototype, g), y && He(h, y), M;
                        }(a.Component);
                        function H(d) {
                            var h = {}, g = {}, y = [].concat(K(Object.keys(P)), [
                                "confettiSource",
                                "drawShape",
                                "onConfettiComplete"
                            ]), k = [
                                "canvasRef"
                            ];
                            for(var M in d){
                                var w = d[M];
                                y.includes(M) ? h[M] = w : k.includes(M) ? k[M] = w : g[M] = w;
                            }
                            return [
                                h,
                                g,
                                {}
                            ];
                        }
                        we(N, "defaultProps", se({}, P)), we(N, "displayName", "ReactConfetti");
                        var G = s.a.forwardRef(function(d, h) {
                            return s.a.createElement(N, te({
                                canvasRef: h
                            }, d));
                        });
                        n.default = G;
                    }
                ]).default;
            });
        });
        var qp, $p, Vp, Kp, Jp, Xp, Qp, Zp, ef, tf, nf, rf, of, af, Nn, sf, lf, cf, uf, pf, ff, df, hf, yf, mf, gf, bf, vf, Ef, Of, wf, Sf, Tf, If, Cf, Pf, Rf, xf, _f, Af, kf, Nf, jf, Mf, Lf, Df, Ff, Bf, Wf, Uf, Hf, Gf, zf, Yf, qf, $f, Vf, Kf, Jf, Xf, Qf, jn, Zf, ed, td, nd, rd, od, id, ad, sd, ld, cd, ud, pd, fd, dd, hd, yd, md, gd, bd, vd, Ed, Od, wd, Sd, Td, Id, Cd, Pd, Rd, xd, _d, Ad, kd, Nd, jd, Md, Ld, Dd, Fd, Bd, Wd, Ud, Hd, Gd, zd, Yd, qd, $d, Vd, Kd, Jd, Xd, Qd, Zd, eh, th, nh, rh, oh, ih, ah, sh, lh, ch, uh, ph, fh, dh, hh, yh, mh, gh, bh, vh, Eh, Oh, wh, Sh, Th, Ih, Ch, Ph, Rh, xh, _h, Ah, kh, Nh, jh, Mh, Lh, Dh, Fh, Bh, Wh, Uh, Hh, Gh, zh, Yh, qh, $h, Vh, Kh, Jh, Xh, Qh, Zh, ey, ty, ny, ry, oy, iy, ay, sy, ly, cy, uy, py, fy, dy, hy, yy, my, gy, by, vy, Ey, Oy, wy, Sy, Ty, Iy, Cy, Py, Ry, xy, _y, Ay, ky, Ny, jy, My, Ly, Dy, Fy, By, Wy, Uy, Hy, Gy, zy, Yy, qy, $y, Vy, Ky, Jy, Xy, Qy, Zy, em, tm, nm, rm, om, im, am, sm, lm, cm, um, pm, Mn = ye(function() {
            X();
            Q();
            Z();
            var ref;
            qp = __STORYBOOK_ICONS__, ref = __STORYBOOK_ICONS__, $p = ref.AccessibilityAltIcon, Vp = ref.AccessibilityIcon, Kp = ref.AddIcon, Jp = ref.AdminIcon, Xp = ref.AlertAltIcon, Qp = ref.AlertIcon, Zp = ref.AlignLeftIcon, ef = ref.AlignRightIcon, tf = ref.AppleIcon, nf = ref.ArrowBottomLeftIcon, rf = ref.ArrowBottomRightIcon, of = ref.ArrowDownIcon, af = ref.ArrowLeftIcon, Nn = ref.ArrowRightIcon, sf = ref.ArrowSolidDownIcon, lf = ref.ArrowSolidLeftIcon, cf = ref.ArrowSolidRightIcon, uf = ref.ArrowSolidUpIcon, pf = ref.ArrowTopLeftIcon, ff = ref.ArrowTopRightIcon, df = ref.ArrowUpIcon, hf = ref.AzureDevOpsIcon, yf = ref.BackIcon, mf = ref.BasketIcon, gf = ref.BatchAcceptIcon, bf = ref.BatchDenyIcon, vf = ref.BeakerIcon, Ef = ref.BellIcon, Of = ref.BitbucketIcon, wf = ref.BoldIcon, Sf = ref.BookIcon, Tf = ref.BookmarkHollowIcon, If = ref.BookmarkIcon, Cf = ref.BottomBarIcon, Pf = ref.BottomBarToggleIcon, Rf = ref.BoxIcon, xf = ref.BranchIcon, _f = ref.BrowserIcon, Af = ref.ButtonIcon, kf = ref.CPUIcon, Nf = ref.CalendarIcon, jf = ref.CameraIcon, Mf = ref.CategoryIcon, Lf = ref.CertificateIcon, Df = ref.ChangedIcon, Ff = ref.ChatIcon, Bf = ref.CheckIcon, Wf = ref.ChevronDownIcon, Uf = ref.ChevronLeftIcon, Hf = ref.ChevronRightIcon, Gf = ref.ChevronSmallDownIcon, zf = ref.ChevronSmallLeftIcon, Yf = ref.ChevronSmallRightIcon, qf = ref.ChevronSmallUpIcon, $f = ref.ChevronUpIcon, Vf = ref.ChromaticIcon, Kf = ref.ChromeIcon, Jf = ref.CircleHollowIcon, Xf = ref.CircleIcon, Qf = ref.ClearIcon, jn = ref.CloseAltIcon, Zf = ref.CloseIcon, ed = ref.CloudHollowIcon, td = ref.CloudIcon, nd = ref.CogIcon, rd = ref.CollapseIcon, od = ref.CommandIcon, id = ref.CommentAddIcon, ad = ref.CommentIcon, sd = ref.CommentsIcon, ld = ref.CommitIcon, cd = ref.CompassIcon, ud = ref.ComponentDrivenIcon, pd = ref.ComponentIcon, fd = ref.ContrastIcon, dd = ref.ControlsIcon, hd = ref.CopyIcon, yd = ref.CreditIcon, md = ref.CrossIcon, gd = ref.DashboardIcon, bd = ref.DatabaseIcon, vd = ref.DeleteIcon, Ed = ref.DiamondIcon, Od = ref.DirectionIcon, wd = ref.DiscordIcon, Sd = ref.DocChartIcon, Td = ref.DocListIcon, Id = ref.DocumentIcon, Cd = ref.DownloadIcon, Pd = ref.DragIcon, Rd = ref.EditIcon, xd = ref.EllipsisIcon, _d = ref.EmailIcon, Ad = ref.ExpandAltIcon, kd = ref.ExpandIcon, Nd = ref.EyeCloseIcon, jd = ref.EyeIcon, Md = ref.FaceHappyIcon, Ld = ref.FaceNeutralIcon, Dd = ref.FaceSadIcon, Fd = ref.FacebookIcon, Bd = ref.FailedIcon, Wd = ref.FastForwardIcon, Ud = ref.FigmaIcon, Hd = ref.FilterIcon, Gd = ref.FlagIcon, zd = ref.FolderIcon, Yd = ref.FormIcon, qd = ref.GDriveIcon, $d = ref.GithubIcon, Vd = ref.GitlabIcon, Kd = ref.GlobeIcon, Jd = ref.GoogleIcon, Xd = ref.GraphBarIcon, Qd = ref.GraphLineIcon, Zd = ref.GraphqlIcon, eh = ref.GridAltIcon, th = ref.GridIcon, nh = ref.GrowIcon, rh = ref.HeartHollowIcon, oh = ref.HeartIcon, ih = ref.HomeIcon, ah = ref.HourglassIcon, sh = ref.InfoIcon, lh = ref.ItalicIcon, ch = ref.JumpToIcon, uh = ref.KeyIcon, ph = ref.LightningIcon, fh = ref.LightningOffIcon, dh = ref.LinkBrokenIcon, hh = ref.LinkIcon, yh = ref.LinkedinIcon, mh = ref.LinuxIcon, gh = ref.ListOrderedIcon, bh = ref.ListUnorderedIcon, vh = ref.LocationIcon, Eh = ref.LockIcon, Oh = ref.MarkdownIcon, wh = ref.MarkupIcon, Sh = ref.MediumIcon, Th = ref.MemoryIcon, Ih = ref.MenuIcon, Ch = ref.MergeIcon, Ph = ref.MirrorIcon, Rh = ref.MobileIcon, xh = ref.MoonIcon, _h = ref.NutIcon, Ah = ref.OutboxIcon, kh = ref.OutlineIcon, Nh = ref.PaintBrushIcon, jh = ref.PaperClipIcon, Mh = ref.ParagraphIcon, Lh = ref.PassedIcon, Dh = ref.PhoneIcon, Fh = ref.PhotoDragIcon, Bh = ref.PhotoIcon, Wh = ref.PinAltIcon, Uh = ref.PinIcon, Hh = ref.PlayBackIcon, Gh = ref.PlayIcon, zh = ref.PlayNextIcon, Yh = ref.PlusIcon, qh = ref.PointerDefaultIcon, $h = ref.PointerHandIcon, Vh = ref.PowerIcon, Kh = ref.PrintIcon, Jh = ref.ProceedIcon, Xh = ref.ProfileIcon, Qh = ref.PullRequestIcon, Zh = ref.QuestionIcon, ey = ref.RSSIcon, ty = ref.RedirectIcon, ny = ref.ReduxIcon, ry = ref.RefreshIcon, oy = ref.ReplyIcon, iy = ref.RepoIcon, ay = ref.RequestChangeIcon, sy = ref.RewindIcon, ly = ref.RulerIcon, cy = ref.SearchIcon, uy = ref.ShareAltIcon, py = ref.ShareIcon, fy = ref.ShieldIcon, dy = ref.SideBySideIcon, hy = ref.SidebarAltIcon, yy = ref.SidebarAltToggleIcon, my = ref.SidebarIcon, gy = ref.SidebarToggleIcon, by = ref.SpeakerIcon, vy = ref.StackedIcon, Ey = ref.StarHollowIcon, Oy = ref.StarIcon, wy = ref.StatusFailIcon, Sy = ref.StatusPassIcon, Ty = ref.StatusWarnIcon, Iy = ref.StickerIcon, Cy = ref.StopAltIcon, Py = ref.StopIcon, Ry = ref.StorybookIcon, xy = ref.StructureIcon, _y = ref.SubtractIcon, Ay = ref.SunIcon, ky = ref.SupportIcon, Ny = ref.SwitchAltIcon, jy = ref.SyncIcon, My = ref.TabletIcon, Ly = ref.ThumbsUpIcon, Dy = ref.TimeIcon, Fy = ref.TimerIcon, By = ref.TransferIcon, Wy = ref.TrashIcon, Uy = ref.TwitterIcon, Hy = ref.TypeIcon, Gy = ref.UbuntuIcon, zy = ref.UndoIcon, Yy = ref.UnfoldIcon, qy = ref.UnlockIcon, $y = ref.UnpinIcon, Vy = ref.UploadIcon, Ky = ref.UserAddIcon, Jy = ref.UserAltIcon, Xy = ref.UserIcon, Qy = ref.UsersIcon, Zy = ref.VSCodeIcon, em = ref.VerifiedIcon, tm = ref.VideoIcon, nm = ref.WandIcon, rm = ref.WatchIcon, om = ref.WindowsIcon, im = ref.WrenchIcon, am = ref.XIcon, sm = ref.YoutubeIcon, lm = ref.ZoomIcon, cm = ref.ZoomOutIcon, um = ref.ZoomResetIcon, pm = ref.iconList, ref;
        });
        var no = {};
        gn(no, {
            default: function() {
                return Gs;
            }
        });
        function ae(e, t) {
            if (e === t) return !0;
            if (e && Bn(e) && t && Bn(t)) {
                if (e.constructor !== t.constructor) return !1;
                if (Array.isArray(e) && Array.isArray(t)) return ai(e, t);
                if (_instanceof(e, Map) && _instanceof(t, Map)) return li(e, t);
                if (_instanceof(e, Set) && _instanceof(t, Set)) return ci(e, t);
                if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) return si(e, t);
                if (Fn(e) && Fn(t)) return e.source === t.source && e.flags === t.flags;
                if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
                if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
                var n = Object.keys(e), r = Object.keys(t);
                if (n.length !== r.length) return !1;
                for(var i = n.length; i-- !== 0;)if (!Object.prototype.hasOwnProperty.call(t, n[i])) return !1;
                for(var i1 = n.length; i1-- !== 0;){
                    var o = n[i1];
                    if (!(o === "_owner" && e.$$typeof) && !ae(e[o], t[o])) return !1;
                }
                return !0;
            }
            return Number.isNaN(e) && Number.isNaN(t) ? !0 : e === t;
        }
        function _(e) {
            if (e === null) return "null";
            switch(typeof e === "undefined" ? "undefined" : _type_of(e)){
                case "bigint":
                    return "bigint";
                case "boolean":
                    return "boolean";
                case "number":
                    return "number";
                case "string":
                    return "string";
                case "symbol":
                    return "symbol";
                case "undefined":
                    return "undefined";
            }
            return _.array(e) ? "Array" : _.plainFunction(e) ? "Function" : Nt(e) || "Object";
        }
        function yt(e) {
            if (!e) return document.body;
            switch(e.nodeName){
                case "HTML":
                case "BODY":
                    return e.ownerDocument.body;
                case "#document":
                    return e.body;
            }
            var t = We(e), n = t.overflow, r = t.overflowX, i = t.overflowY;
            return /(auto|scroll|overlay)/.test(n + i + r) ? e : yt(an(e));
        }
        function $e(e) {
            if (!e) return document.documentElement;
            for(var t = Xe(10) ? document.body : null, n = e.offsetParent || null; n === t && e.nextElementSibling;)n = (e = e.nextElementSibling).offsetParent;
            var r = n && n.nodeName;
            return !r || r === "BODY" || r === "HTML" ? e ? e.ownerDocument.documentElement : document.documentElement : [
                "TH",
                "TD",
                "TABLE"
            ].indexOf(n.nodeName) !== -1 && We(n, "position") === "static" ? $e(n) : n;
        }
        function Xt(e) {
            return e.parentNode !== null ? Xt(e.parentNode) : e;
        }
        function _t(e, t) {
            if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
            var n = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING, r = n ? e : t, i = n ? t : e, o = document.createRange();
            o.setStart(r, 0), o.setEnd(i, 0);
            var a = o.commonAncestorContainer;
            if (e !== a && t !== a || r.contains(i)) return Ti(a) ? a : $e(a);
            var s = Xt(e);
            return s.host ? _t(s.host, t) : _t(e, Xt(t).host);
        }
        function Cr(e) {
            var t = e.nodeName;
            if (t === "BODY" || t === "HTML") return !1;
            if (We(e, "position") === "fixed") return !0;
            var n = an(e);
            return n ? Cr(n) : !1;
        }
        function Mr(e, t, n, r) {
            var i = e.nodeName === "BODY", o = i ? e.ownerDocument.defaultView : e;
            o.addEventListener(t, n, {
                passive: !0
            }), i || Mr(yt(o.parentNode), t, n, r), r.push(o);
        }
        function A(e) {
            if (e === null) return "null";
            switch(typeof e === "undefined" ? "undefined" : _type_of(e)){
                case "bigint":
                    return "bigint";
                case "boolean":
                    return "boolean";
                case "number":
                    return "number";
                case "string":
                    return "string";
                case "symbol":
                    return "symbol";
                case "undefined":
                    return "undefined";
            }
            if (A.array(e)) return "Array";
            if (A.plainFunction(e)) return "Function";
            var t = Mt(e);
            return t || "Object";
        }
        function le(e, t) {
            if (e === t) return !0;
            if (e && Qn(e) && t && Qn(t)) {
                if (e.constructor !== t.constructor) return !1;
                if (Array.isArray(e) && Array.isArray(t)) return ua(e, t);
                if (_instanceof(e, Map) && _instanceof(t, Map)) return fa(e, t);
                if (_instanceof(e, Set) && _instanceof(t, Set)) return da(e, t);
                if (ArrayBuffer.isView(e) && ArrayBuffer.isView(t)) return pa(e, t);
                if (Xn(e) && Xn(t)) return e.source === t.source && e.flags === t.flags;
                if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === t.valueOf();
                if (e.toString !== Object.prototype.toString) return e.toString() === t.toString();
                var n = Object.keys(e), r = Object.keys(t);
                if (n.length !== r.length) return !1;
                for(var i = n.length; i-- !== 0;)if (!Object.prototype.hasOwnProperty.call(t, n[i])) return !1;
                for(var i = n.length; i-- !== 0;){
                    var o = n[i];
                    if (!(o === "_owner" && e.$$typeof) && !le(e[o], t[o])) return !1;
                }
                return !0;
            }
            return Number.isNaN(e) && Number.isNaN(t) ? !0 : e === t;
        }
        function kt(e) {
            return kt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function kt(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            }, kt(e);
        }
        function nn(e, t) {
            return nn = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function nn(n, r) {
                return n.__proto__ = r, n;
            }, nn(e, t);
        }
        function dt(e) {
            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "fixed";
            if (!e || !_instanceof(e, HTMLElement)) return !1;
            var n = e.nodeName, r = Ua(e);
            return n === "BODY" || n === "HTML" ? !1 : r && r.position === t ? !0 : e.parentNode ? dt(e.parentNode, t) : !1;
        }
        var hr, Wo, yr, Uo, mr, Ho, Go, he, zo, Be, Yo, qo, rn, $o, gr, Vo, br, vr, Ko, Jo, Xo, Qo, Zo, Dn, ri, oi, Fn, Bn, ii, ui, pi, hi, j, bi, wr, Ct, Pt, C, ht, vi, wi, Si, Yn, qn, Ci, Pi, Ke, de, Ui, Dr, Vt, Kt, ea, ta, jt, Jn, en, na, ra, oa, D, sa, la, Xn, Qn, ca, tn, wa, Sa, Ta, q, ut, Hr, Gr, ka, qr, $r, Na, Ma, La, fn, Da, Fa, Ba, L, $, ve, W, Y, pt, Qa, Xr, Za, es, ts, ft, ur, Zr, fr, os, ss, ls, cs, us, ps, ds, ys, ms, gs, eo, bs, vs, Es, Os, ws, Ss, Ts, Is, Cs, Ps, Rs, _s, to, As, ks, Ns, js, Ms, Ls, Ds, Fs, dr, Bs, Ws, Us, Hs, ro = ye(function() {
            X();
            Q();
            Z();
            Ye();
            Ye();
            Rn();
            zt();
            An();
            Tt();
            Tt();
            hr = po(kn());
            Mn();
            Wo = Object.create, yr = Object.defineProperty, Uo = Object.getOwnPropertyDescriptor, mr = Object.getOwnPropertyNames, Ho = Object.getPrototypeOf, Go = Object.prototype.hasOwnProperty, he = function(e, t) {
                return function he() {
                    return t || (0, e[mr(e)[0]])((t = {
                        exports: {}
                    }).exports, t), t.exports;
                };
            }, zo = function(e, t, n, r) {
                var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                if (t && (typeof t === "undefined" ? "undefined" : _type_of(t)) == "object" || typeof t == "function") try {
                    var _loop = function() {
                        var i = _step.value;
                        !Go.call(e, i) && i !== n && yr(e, i, {
                            get: function() {
                                return t[i];
                            },
                            enumerable: !(r = Uo(t, i)) || r.enumerable
                        });
                    };
                    for(var _iterator = mr(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
            }, Be = function(e, t, n) {
                return n = e != null ? Wo(Ho(e)) : {}, zo(t || !e || !e.__esModule ? yr(n, "default", {
                    value: e,
                    enumerable: !0
                }) : n, e);
            }, Yo = he({
                "../../node_modules/scroll/index.js": function(e, t) {
                    var n = new Error("Element already at target scroll position"), r = new Error("Scroll cancelled"), i = Math.min, o = Date.now;
                    t.exports = {
                        left: a("scrollLeft"),
                        top: a("scrollTop")
                    };
                    function a(c) {
                        return function(p, u, f, b) {
                            f = f || {}, typeof f == "function" && (b = f, f = {}), typeof b != "function" && (b = l);
                            var m = o(), T = p[c], F = f.ease || s, I = isNaN(f.duration) ? 350 : +f.duration, x = !1;
                            return T === u ? b(n, p[c]) : requestAnimationFrame(P), v;
                            function v() {
                                x = !0;
                            }
                            function P(R) {
                                if (x) return b(r, p[c]);
                                var K = o(), B = i(1, (K - m) / I), te = F(B);
                                p[c] = te * (u - T) + T, B < 1 ? requestAnimationFrame(P) : requestAnimationFrame(function() {
                                    b(null, p[c]);
                                });
                            }
                        };
                    }
                    function s(c) {
                        return .5 * (1 - Math.cos(Math.PI * c));
                    }
                    function l() {}
                }
            }), qo = he({
                "../../node_modules/scrollparent/scrollparent.js": function(e, t) {
                    (function(n, r) {
                        typeof define == "function" && define.amd ? define([], r) : (typeof t === "undefined" ? "undefined" : _type_of(t)) == "object" && t.exports ? t.exports = r() : n.Scrollparent = r();
                    })(e, function() {
                        function n(i) {
                            var o = getComputedStyle(i, null).getPropertyValue("overflow");
                            return o.indexOf("scroll") > -1 || o.indexOf("auto") > -1;
                        }
                        function r(i) {
                            if (_instanceof(i, HTMLElement) || _instanceof(i, SVGElement)) {
                                for(var o = i.parentNode; o.parentNode;){
                                    if (n(o)) return o;
                                    o = o.parentNode;
                                }
                                return document.scrollingElement || document.documentElement;
                            }
                        }
                        return r;
                    });
                }
            }), rn = he({
                "../../node_modules/deepmerge/dist/cjs.js": function(e, t) {
                    var n = function n(v) {
                        return r(v) && !i(v);
                    };
                    function r(v) {
                        return !!v && (typeof v === "undefined" ? "undefined" : _type_of(v)) == "object";
                    }
                    function i(v) {
                        var P = Object.prototype.toString.call(v);
                        return P === "[object RegExp]" || P === "[object Date]" || s(v);
                    }
                    var o = typeof Symbol == "function" && Symbol.for, a = o ? Symbol.for("react.element") : 60103;
                    function s(v) {
                        return v.$$typeof === a;
                    }
                    function l(v) {
                        return Array.isArray(v) ? [] : {};
                    }
                    function c(v, P) {
                        return P.clone !== !1 && P.isMergeableObject(v) ? I(l(v), v, P) : v;
                    }
                    function p(v, P, R) {
                        return v.concat(P).map(function(K) {
                            return c(K, R);
                        });
                    }
                    function u(v, P) {
                        if (!P.customMerge) return I;
                        var R = P.customMerge(v);
                        return typeof R == "function" ? R : I;
                    }
                    function f(v) {
                        return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(v).filter(function(P) {
                            return Object.propertyIsEnumerable.call(v, P);
                        }) : [];
                    }
                    function b(v) {
                        return Object.keys(v).concat(f(v));
                    }
                    function m(v, P) {
                        try {
                            return P in v;
                        } catch (e) {
                            return !1;
                        }
                    }
                    function T(v, P) {
                        return m(v, P) && !(Object.hasOwnProperty.call(v, P) && Object.propertyIsEnumerable.call(v, P));
                    }
                    function F(v, P, R) {
                        var K = {};
                        return R.isMergeableObject(v) && b(v).forEach(function(B) {
                            K[B] = c(v[B], R);
                        }), b(P).forEach(function(B) {
                            T(v, B) || (m(v, B) && R.isMergeableObject(P[B]) ? K[B] = u(B, R)(v[B], P[B], R) : K[B] = c(P[B], R));
                        }), K;
                    }
                    function I(v, P, R) {
                        R = R || {}, R.arrayMerge = R.arrayMerge || p, R.isMergeableObject = R.isMergeableObject || n, R.cloneUnlessOtherwiseSpecified = c;
                        var K = Array.isArray(P), B = Array.isArray(v), te = K === B;
                        return te ? K ? R.arrayMerge(v, P, R) : F(v, P, R) : c(P, R);
                    }
                    I.all = function(v, P) {
                        if (!Array.isArray(v)) throw new Error("first argument should be an array");
                        return v.reduce(function(R, K) {
                            return I(R, K, P);
                        }, {});
                    };
                    var x = I;
                    t.exports = x;
                }
            }), $o = he({
                "../../node_modules/react-is/cjs/react-is.development.js": function(e) {
                    (function() {
                        var t = typeof Symbol == "function" && Symbol.for, n = t ? Symbol.for("react.element") : 60103, r = t ? Symbol.for("react.portal") : 60106, i = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, p = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, b = t ? Symbol.for("react.suspense_list") : 60120, m = t ? Symbol.for("react.memo") : 60115, T = t ? Symbol.for("react.lazy") : 60116, F = t ? Symbol.for("react.block") : 60121, I = t ? Symbol.for("react.fundamental") : 60117, x = t ? Symbol.for("react.responder") : 60118, v = t ? Symbol.for("react.scope") : 60119;
                        function P(O) {
                            return typeof O == "string" || typeof O == "function" || O === i || O === p || O === a || O === o || O === f || O === b || (typeof O === "undefined" ? "undefined" : _type_of(O)) == "object" && O !== null && (O.$$typeof === T || O.$$typeof === m || O.$$typeof === s || O.$$typeof === l || O.$$typeof === u || O.$$typeof === I || O.$$typeof === x || O.$$typeof === v || O.$$typeof === F);
                        }
                        function R(O) {
                            if ((typeof O === "undefined" ? "undefined" : _type_of(O)) == "object" && O !== null) {
                                var U = O.$$typeof;
                                switch(U){
                                    case n:
                                        var z = O.type;
                                        switch(z){
                                            case c:
                                            case p:
                                            case i:
                                            case a:
                                            case o:
                                            case f:
                                                return z;
                                            default:
                                                var ne = z && z.$$typeof;
                                                switch(ne){
                                                    case l:
                                                    case u:
                                                    case T:
                                                    case m:
                                                    case s:
                                                        return ne;
                                                    default:
                                                        return U;
                                                }
                                        }
                                    case r:
                                        return U;
                                }
                            }
                        }
                        var K = c, B = p, te = l, J = s, se = n, Ze = u, Ue = i, Re = T, et = m, He = r, Ce = a, tt = o, pe = f, fe = !1;
                        function Le(O) {
                            return fe || (fe = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), we(O) || R(O) === c;
                        }
                        function we(O) {
                            return R(O) === p;
                        }
                        function S(O) {
                            return R(O) === l;
                        }
                        function N(O) {
                            return R(O) === s;
                        }
                        function H(O) {
                            return (typeof O === "undefined" ? "undefined" : _type_of(O)) == "object" && O !== null && O.$$typeof === n;
                        }
                        function G(O) {
                            return R(O) === u;
                        }
                        function d(O) {
                            return R(O) === i;
                        }
                        function h(O) {
                            return R(O) === T;
                        }
                        function g(O) {
                            return R(O) === m;
                        }
                        function y(O) {
                            return R(O) === r;
                        }
                        function k(O) {
                            return R(O) === a;
                        }
                        function M(O) {
                            return R(O) === o;
                        }
                        function w(O) {
                            return R(O) === f;
                        }
                        e.AsyncMode = K, e.ConcurrentMode = B, e.ContextConsumer = te, e.ContextProvider = J, e.Element = se, e.ForwardRef = Ze, e.Fragment = Ue, e.Lazy = Re, e.Memo = et, e.Portal = He, e.Profiler = Ce, e.StrictMode = tt, e.Suspense = pe, e.isAsyncMode = Le, e.isConcurrentMode = we, e.isContextConsumer = S, e.isContextProvider = N, e.isElement = H, e.isForwardRef = G, e.isFragment = d, e.isLazy = h, e.isMemo = g, e.isPortal = y, e.isProfiler = k, e.isStrictMode = M, e.isSuspense = w, e.isValidElementType = P, e.typeOf = R;
                    })();
                }
            }), gr = he({
                "../../node_modules/react-is/index.js": function(e, t) {
                    t.exports = $o();
                }
            }), Vo = he({
                "../../node_modules/object-assign/index.js": function(e, t) {
                    var n = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable;
                    function o(s) {
                        if (s == null) throw new TypeError("Object.assign cannot be called with null or undefined");
                        return Object(s);
                    }
                    function a() {
                        try {
                            if (!Object.assign) return !1;
                            var s = new String("abc");
                            if (s[5] = "de", Object.getOwnPropertyNames(s)[0] === "5") return !1;
                            for(var l = {}, c = 0; c < 10; c++)l["_" + String.fromCharCode(c)] = c;
                            var p = Object.getOwnPropertyNames(l).map(function(f) {
                                return l[f];
                            });
                            if (p.join("") !== "0123456789") return !1;
                            var u = {};
                            return "abcdefghijklmnopqrst".split("").forEach(function(f) {
                                u[f] = f;
                            }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
                        } catch (e) {
                            return !1;
                        }
                    }
                    t.exports = a() ? Object.assign : function(s, l) {
                        for(var c, p = o(s), u, f = 1; f < arguments.length; f++){
                            c = Object(arguments[f]);
                            for(var b in c)r.call(c, b) && (p[b] = c[b]);
                            if (n) {
                                u = n(c);
                                for(var m = 0; m < u.length; m++)i.call(c, u[m]) && (p[u[m]] = c[u[m]]);
                            }
                        }
                        return p;
                    };
                }
            }), br = he({
                "../../node_modules/prop-types/lib/ReactPropTypesSecret.js": function(e, t) {
                    var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
                    t.exports = n;
                }
            }), vr = he({
                "../../node_modules/prop-types/lib/has.js": function(e, t) {
                    t.exports = Function.call.bind(Object.prototype.hasOwnProperty);
                }
            }), Ko = he({
                "../../node_modules/prop-types/checkPropTypes.js": function(e, t) {
                    var n = function n() {};
                    r = br(), i = {}, o = vr(), n = function n(s) {
                        var l = "Warning: " + s;
                        (typeof console === "undefined" ? "undefined" : _type_of(console)) < "u" && console.error(l);
                        try {
                            throw new Error(l);
                        } catch (e) {}
                    };
                    var r, i, o;
                    function a(s, l, c, p, u) {
                        for(var f in s)if (o(s, f)) {
                            var b;
                            try {
                                if (typeof s[f] != "function") {
                                    var m = Error((p || "React class") + ": " + c + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + _type_of(s[f]) + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                                    throw m.name = "Invariant Violation", m;
                                }
                                b = s[f](l, f, p, c, null, r);
                            } catch (F) {
                                b = F;
                            }
                            if (b && !_instanceof(b, Error) && n((p || "React class") + ": type specification of " + c + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + (typeof b === "undefined" ? "undefined" : _type_of(b)) + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."), _instanceof(b, Error) && !(b.message in i)) {
                                i[b.message] = !0;
                                var T = u ? u() : "";
                                n("Failed " + c + " type: " + b.message + (T !== null && T !== void 0 ? T : ""));
                            }
                        }
                    }
                    a.resetWarningCache = function() {
                        i = {};
                    }, t.exports = a;
                }
            }), Jo = he({
                "../../node_modules/prop-types/factoryWithTypeCheckers.js": function(e, t) {
                    var n = gr(), r = Vo(), i = br(), o = vr(), a = Ko(), s = function s() {};
                    s = function s(c) {
                        var p = "Warning: " + c;
                        (typeof console === "undefined" ? "undefined" : _type_of(console)) < "u" && console.error(p);
                        try {
                            throw new Error(p);
                        } catch (e) {}
                    };
                    function l() {
                        return null;
                    }
                    t.exports = function(c, p) {
                        var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
                        function b(S) {
                            var N = S && (u && S[u] || S[f]);
                            if (typeof N == "function") return N;
                        }
                        var m = "<<anonymous>>", T = {
                            array: v("array"),
                            bigint: v("bigint"),
                            bool: v("boolean"),
                            func: v("function"),
                            number: v("number"),
                            object: v("object"),
                            string: v("string"),
                            symbol: v("symbol"),
                            any: P(),
                            arrayOf: R,
                            element: K(),
                            elementType: B(),
                            instanceOf: te,
                            node: Ue(),
                            objectOf: se,
                            oneOf: J,
                            oneOfType: Ze,
                            shape: et,
                            exact: He
                        };
                        function F(S, N) {
                            return S === N ? S !== 0 || 1 / S === 1 / N : S !== S && N !== N;
                        }
                        function I(S, N) {
                            this.message = S, this.data = N && (typeof N === "undefined" ? "undefined" : _type_of(N)) == "object" ? N : {}, this.stack = "";
                        }
                        I.prototype = Error.prototype;
                        function x(S) {
                            var N = {}, H = 0;
                            function G(h, g, y, k, M, w, O) {
                                if (k = k || m, w = w || y, O !== i) {
                                    if (p) {
                                        var U = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types");
                                        throw U.name = "Invariant Violation", U;
                                    } else if ((typeof console === "undefined" ? "undefined" : _type_of(console)) < "u") {
                                        var z = k + ":" + y;
                                        !N[z] && H < 3 && (s("You are manually calling a React.PropTypes validation function for the `" + w + "` prop on `" + k + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."), N[z] = !0, H++);
                                    }
                                }
                                return g[y] == null ? h ? g[y] === null ? new I("The " + M + " `" + w + "` is marked as required " + ("in `" + k + "`, but its value is `null`.")) : new I("The " + M + " `" + w + "` is marked as required in " + ("`" + k + "`, but its value is `undefined`.")) : null : S(g, y, k, M, w);
                            }
                            var d = G.bind(null, !1);
                            return d.isRequired = G.bind(null, !0), d;
                        }
                        function v(S) {
                            function N(H, G, d, h, g, y) {
                                var k = H[G], M = pe(k);
                                if (M !== S) {
                                    var w = fe(k);
                                    return new I("Invalid " + h + " `" + g + "` of type " + ("`" + w + "` supplied to `" + d + "`, expected ") + ("`" + S + "`."), {
                                        expectedType: S
                                    });
                                }
                                return null;
                            }
                            return x(N);
                        }
                        function P() {
                            return x(l);
                        }
                        function R(S) {
                            function N(H, G, d, h, g) {
                                if (typeof S != "function") return new I("Property `" + g + "` of component `" + d + "` has invalid PropType notation inside arrayOf.");
                                var y = H[G];
                                if (!Array.isArray(y)) {
                                    var k = pe(y);
                                    return new I("Invalid " + h + " `" + g + "` of type " + ("`" + k + "` supplied to `" + d + "`, expected an array."));
                                }
                                for(var M = 0; M < y.length; M++){
                                    var w = S(y, M, d, h, g + "[" + M + "]", i);
                                    if (_instanceof(w, Error)) return w;
                                }
                                return null;
                            }
                            return x(N);
                        }
                        function K() {
                            function S(N, H, G, d, h) {
                                var g = N[H];
                                if (!c(g)) {
                                    var y = pe(g);
                                    return new I("Invalid " + d + " `" + h + "` of type " + ("`" + y + "` supplied to `" + G + "`, expected a single ReactElement."));
                                }
                                return null;
                            }
                            return x(S);
                        }
                        function B() {
                            function S(N, H, G, d, h) {
                                var g = N[H];
                                if (!n.isValidElementType(g)) {
                                    var y = pe(g);
                                    return new I("Invalid " + d + " `" + h + "` of type " + ("`" + y + "` supplied to `" + G + "`, expected a single ReactElement type."));
                                }
                                return null;
                            }
                            return x(S);
                        }
                        function te(S) {
                            function N(H, G, d, h, g) {
                                if (!_instanceof(H[G], S)) {
                                    var y = S.name || m, k = we(H[G]);
                                    return new I("Invalid " + h + " `" + g + "` of type " + ("`" + k + "` supplied to `" + d + "`, expected ") + ("instance of `" + y + "`."));
                                }
                                return null;
                            }
                            return x(N);
                        }
                        function J(S) {
                            if (!Array.isArray(S)) return arguments.length > 1 ? s("Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).") : s("Invalid argument supplied to oneOf, expected an array."), l;
                            function N(H, G, d, h, g) {
                                for(var y = H[G], k = 0; k < S.length; k++)if (F(y, S[k])) return null;
                                var M = JSON.stringify(S, function(w, O) {
                                    var U = fe(O);
                                    return U === "symbol" ? String(O) : O;
                                });
                                return new I("Invalid " + h + " `" + g + "` of value `" + String(y) + "` " + ("supplied to `" + d + "`, expected one of " + M + "."));
                            }
                            return x(N);
                        }
                        function se(S) {
                            function N(H, G, d, h, g) {
                                if (typeof S != "function") return new I("Property `" + g + "` of component `" + d + "` has invalid PropType notation inside objectOf.");
                                var y = H[G], k = pe(y);
                                if (k !== "object") return new I("Invalid " + h + " `" + g + "` of type " + ("`" + k + "` supplied to `" + d + "`, expected an object."));
                                for(var M in y)if (o(y, M)) {
                                    var w = S(y, M, d, h, g + "." + M, i);
                                    if (_instanceof(w, Error)) return w;
                                }
                                return null;
                            }
                            return x(N);
                        }
                        function Ze(S) {
                            if (!Array.isArray(S)) return s("Invalid argument supplied to oneOfType, expected an instance of array."), l;
                            for(var N = 0; N < S.length; N++){
                                var H = S[N];
                                if (typeof H != "function") return s("Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Le(H) + " at index " + N + "."), l;
                            }
                            function G(d, h, g, y, k) {
                                for(var M = [], w = 0; w < S.length; w++){
                                    var O = S[w], U = O(d, h, g, y, k, i);
                                    if (U == null) return null;
                                    U.data && o(U.data, "expectedType") && M.push(U.data.expectedType);
                                }
                                var z = M.length > 0 ? ", expected one of type [" + M.join(", ") + "]" : "";
                                return new I("Invalid " + y + " `" + k + "` supplied to " + ("`" + g + "`" + z + "."));
                            }
                            return x(G);
                        }
                        function Ue() {
                            function S(N, H, G, d, h) {
                                return Ce(N[H]) ? null : new I("Invalid " + d + " `" + h + "` supplied to " + ("`" + G + "`, expected a ReactNode."));
                            }
                            return x(S);
                        }
                        function Re(S, N, H, G, d) {
                            return new I((S || "React class") + ": " + N + " type `" + H + "." + G + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + d + "`.");
                        }
                        function et(S) {
                            function N(H, G, d, h, g) {
                                var y = H[G], k = pe(y);
                                if (k !== "object") return new I("Invalid " + h + " `" + g + "` of type `" + k + "` " + ("supplied to `" + d + "`, expected `object`."));
                                for(var M in S){
                                    var w = S[M];
                                    if (typeof w != "function") return Re(d, h, g, M, fe(w));
                                    var O = w(y, M, d, h, g + "." + M, i);
                                    if (O) return O;
                                }
                                return null;
                            }
                            return x(N);
                        }
                        function He(S) {
                            function N(H, G, d, h, g) {
                                var y = H[G], k = pe(y);
                                if (k !== "object") return new I("Invalid " + h + " `" + g + "` of type `" + k + "` " + ("supplied to `" + d + "`, expected `object`."));
                                var M = r({}, H[G], S);
                                for(var w in M){
                                    var O = S[w];
                                    if (o(S, w) && typeof O != "function") return Re(d, h, g, w, fe(O));
                                    if (!O) return new I("Invalid " + h + " `" + g + "` key `" + w + "` supplied to `" + d + "`.\nBad object: " + JSON.stringify(H[G], null, "  ") + "\nValid keys: " + JSON.stringify(Object.keys(S), null, "  "));
                                    var U = O(y, w, d, h, g + "." + w, i);
                                    if (U) return U;
                                }
                                return null;
                            }
                            return x(N);
                        }
                        function Ce(S) {
                            switch(typeof S === "undefined" ? "undefined" : _type_of(S)){
                                case "number":
                                case "string":
                                case "undefined":
                                    return !0;
                                case "boolean":
                                    return !S;
                                case "object":
                                    if (Array.isArray(S)) return S.every(Ce);
                                    if (S === null || c(S)) return !0;
                                    var N = b(S);
                                    if (N) {
                                        var H = N.call(S), G;
                                        if (N !== S.entries) {
                                            for(; !(G = H.next()).done;)if (!Ce(G.value)) return !1;
                                        } else for(; !(G = H.next()).done;){
                                            var d = G.value;
                                            if (d && !Ce(d[1])) return !1;
                                        }
                                    } else return !1;
                                    return !0;
                                default:
                                    return !1;
                            }
                        }
                        function tt(S, N) {
                            return S === "symbol" ? !0 : N ? N["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && _instanceof(N, Symbol) : !1;
                        }
                        function pe(S) {
                            var N = typeof S === "undefined" ? "undefined" : _type_of(S);
                            return Array.isArray(S) ? "array" : _instanceof(S, RegExp) ? "object" : tt(N, S) ? "symbol" : N;
                        }
                        function fe(S) {
                            if ((typeof S === "undefined" ? "undefined" : _type_of(S)) > "u" || S === null) return "" + S;
                            var N = pe(S);
                            if (N === "object") {
                                if (_instanceof(S, Date)) return "date";
                                if (_instanceof(S, RegExp)) return "regexp";
                            }
                            return N;
                        }
                        function Le(S) {
                            var N = fe(S);
                            switch(N){
                                case "array":
                                case "object":
                                    return "an " + N;
                                case "boolean":
                                case "date":
                                case "regexp":
                                    return "a " + N;
                                default:
                                    return N;
                            }
                        }
                        function we(S) {
                            return !S.constructor || !S.constructor.name ? m : S.constructor.name;
                        }
                        return T.checkPropTypes = a, T.resetWarningCache = a.resetWarningCache, T.PropTypes = T, T;
                    };
                }
            }), Xo = he({
                "../../node_modules/prop-types/index.js": function(e, t) {
                    n = gr(), r = !0, t.exports = Jo()(n.isElement, r);
                    var n, r;
                }
            }), Qo = he({
                "../../node_modules/react-innertext/index.js": function(e, t) {
                    var n = function n(o) {
                        return Object.prototype.hasOwnProperty.call(o, "props");
                    }, r = function r(o, a) {
                        return o + i(a);
                    }, i = function i1(o) {
                        return o === null || typeof o == "boolean" || (typeof o === "undefined" ? "undefined" : _type_of(o)) > "u" ? "" : typeof o == "number" ? o.toString() : typeof o == "string" ? o : Array.isArray(o) ? o.reduce(r, "") : n(o) && Object.prototype.hasOwnProperty.call(o.props, "children") ? i(o.props.children) : "";
                    };
                    i.default = i, t.exports = i;
                }
            }), Zo = re.div(function(param) {
                var _$e = param.width, t = param.height, n = param.left, r = param.top;
                return {
                    width: "".concat(_$e, "px"),
                    height: "".concat(t, "px"),
                    left: "".concat(n, "px"),
                    top: "".concat(r, "px"),
                    position: "relative",
                    overflow: "hidden"
                };
            });
            Dn = "STORYBOOK_ADDON_ONBOARDING_CHANNEL";
            ri = Er("function"), oi = function(e) {
                return e === null;
            }, Fn = function(e) {
                return Object.prototype.toString.call(e).slice(8, -1) === "RegExp";
            }, Bn = function(e) {
                return !ii(e) && !oi(e) && (ri(e) || (typeof e === "undefined" ? "undefined" : _type_of(e)) == "object");
            }, ii = Er("undefined");
            ui = [
                "Array",
                "ArrayBuffer",
                "AsyncFunction",
                "AsyncGenerator",
                "AsyncGeneratorFunction",
                "Date",
                "Error",
                "Function",
                "Generator",
                "GeneratorFunction",
                "HTMLElement",
                "Map",
                "Object",
                "Promise",
                "RegExp",
                "Set",
                "WeakMap",
                "WeakSet"
            ], pi = [
                "bigint",
                "boolean",
                "null",
                "number",
                "string",
                "symbol",
                "undefined"
            ];
            hi = [
                "innerHTML",
                "ownerDocument",
                "style",
                "attributes",
                "nodeValue"
            ];
            _.array = Array.isArray;
            _.arrayOf = function(e, t) {
                return !_.array(e) && !_.function(t) ? !1 : e.every(function(n) {
                    return t(n);
                });
            };
            _.asyncGeneratorFunction = function(e) {
                return Nt(e) === "AsyncGeneratorFunction";
            };
            _.asyncFunction = Ee("AsyncFunction");
            _.bigint = Je("bigint");
            _.boolean = function(e) {
                return e === !0 || e === !1;
            };
            _.date = Ee("Date");
            _.defined = function(e) {
                return !_.undefined(e);
            };
            _.domElement = function(e) {
                return _.object(e) && !_.plainObject(e) && e.nodeType === 1 && _.string(e.nodeName) && hi.every(function(t) {
                    return t in e;
                });
            };
            _.empty = function(e) {
                return _.string(e) && e.length === 0 || _.array(e) && e.length === 0 || _.object(e) && !_.map(e) && !_.set(e) && Object.keys(e).length === 0 || _.set(e) && e.size === 0 || _.map(e) && e.size === 0;
            };
            _.error = Ee("Error");
            _.function = Je("function");
            _.generator = function(e) {
                return _.iterable(e) && _.function(e.next) && _.function(e.throw);
            };
            _.generatorFunction = Ee("GeneratorFunction");
            _.instanceOf = function(e, t) {
                return !e || !t ? !1 : Object.getPrototypeOf(e) === t.prototype;
            };
            _.iterable = function(e) {
                return !_.nullOrUndefined(e) && _.function(e[Symbol.iterator]);
            };
            _.map = Ee("Map");
            _.nan = function(e) {
                return Number.isNaN(e);
            };
            _.null = function(e) {
                return e === null;
            };
            _.nullOrUndefined = function(e) {
                return _.null(e) || _.undefined(e);
            };
            _.number = function(e) {
                return Je("number")(e) && !_.nan(e);
            };
            _.numericString = function(e) {
                return _.string(e) && e.length > 0 && !Number.isNaN(Number(e));
            };
            _.object = function(e) {
                return !_.nullOrUndefined(e) && (_.function(e) || (typeof e === "undefined" ? "undefined" : _type_of(e)) == "object");
            };
            _.oneOf = function(e, t) {
                return _.array(e) ? e.indexOf(t) > -1 : !1;
            };
            _.plainFunction = Ee("Function");
            _.plainObject = function(e) {
                if (Nt(e) !== "Object") return !1;
                var t = Object.getPrototypeOf(e);
                return t === null || t === Object.getPrototypeOf({});
            };
            _.primitive = function(e) {
                return _.null(e) || di(typeof e === "undefined" ? "undefined" : _type_of(e));
            };
            _.promise = Ee("Promise");
            _.propertyOf = function(e, t, n) {
                if (!_.object(e) || !t) return !1;
                var r = e[t];
                return _.function(n) ? n(r) : _.defined(r);
            };
            _.regexp = Ee("RegExp");
            _.set = Ee("Set");
            _.string = Je("string");
            _.symbol = Je("symbol");
            _.undefined = Je("undefined");
            _.weakMap = Ee("WeakMap");
            _.weakSet = Ee("WeakSet");
            j = _;
            bi = Be(Yo(), 1), wr = Be(qo(), 1), Ct = Be(rn(), 1), Pt = Be(rn(), 1), C = Be(Xo()), ht = (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" && (typeof document === "undefined" ? "undefined" : _type_of(document)) < "u" && (typeof navigator === "undefined" ? "undefined" : _type_of(navigator)) < "u", vi = function() {
                for(var _$e = [
                    "Edge",
                    "Trident",
                    "Firefox"
                ], t = 0; t < _$e.length; t += 1)if (ht && navigator.userAgent.indexOf(_$e[t]) >= 0) return 1;
                return 0;
            }();
            wi = ht && window.Promise, Si = wi ? Ei : Oi;
            Yn = ht && !!(window.MSInputMethodContext && document.documentMode), qn = ht && /MSIE 10/.test(navigator.userAgent);
            Ci = function Ci(e, t) {
                if (!_instanceof(e, t)) throw new TypeError("Cannot call a class as a function");
            }, Pi = function() {
                function e(t, n) {
                    for(var r = 0; r < n.length; r++){
                        var i = n[r];
                        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t;
                };
            }(), Ke = function Ke(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e;
            }, de = Object.assign || function(e) {
                for(var t = 1; t < arguments.length; t++){
                    var n = arguments[t];
                    for(var r in n)Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                }
                return e;
            };
            Ui = ht && /Firefox/i.test(navigator.userAgent);
            Dr = [
                "auto-start",
                "auto",
                "auto-end",
                "top-start",
                "top",
                "top-end",
                "right-start",
                "right",
                "right-end",
                "bottom-end",
                "bottom",
                "bottom-start",
                "left-end",
                "left",
                "left-start"
            ], Vt = Dr.slice(3);
            Kt = {
                FLIP: "flip",
                CLOCKWISE: "clockwise",
                COUNTERCLOCKWISE: "counterclockwise"
            };
            ea = {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: Xi
                },
                offset: {
                    order: 200,
                    enabled: !0,
                    fn: Ki,
                    offset: 0
                },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: Ji,
                    priority: [
                        "left",
                        "right",
                        "top",
                        "bottom"
                    ],
                    padding: 5,
                    boundariesElement: "scrollParent"
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: qi
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: Gi,
                    element: "[x-arrow]"
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: Yi,
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                    flipVariations: !1,
                    flipVariationsByContent: !1
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: Zi
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: Qi
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: Hi,
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right"
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: Fi,
                    onLoad: Bi,
                    gpuAcceleration: void 0
                }
            }, ta = {
                placement: "bottom",
                positionFixed: !1,
                eventsEnabled: !0,
                removeOnDestroy: !1,
                onCreate: function onCreate() {},
                onUpdate: function onUpdate() {},
                modifiers: ea
            }, jt = function() {
                function e(t, n) {
                    var r = this, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                    Ci(this, e), this.scheduleUpdate = function() {
                        return requestAnimationFrame(r.update);
                    }, this.update = Si(this.update.bind(this)), this.options = de({}, e.Defaults, i), this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: []
                    }, this.reference = t && t.jquery ? t[0] : t, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(de({}, e.Defaults.modifiers, i.modifiers)).forEach(function(a) {
                        r.options.modifiers[a] = de({}, e.Defaults.modifiers[a] || {}, i.modifiers ? i.modifiers[a] : {});
                    }), this.modifiers = Object.keys(this.options.modifiers).map(function(a) {
                        return de({
                            name: a
                        }, r.options.modifiers[a]);
                    }).sort(function(a, s) {
                        return a.order - s.order;
                    }), this.modifiers.forEach(function(a) {
                        a.enabled && Sr(a.onLoad) && a.onLoad(r.reference, r.popper, r.options, a, r.state);
                    }), this.update();
                    var o = this.options.eventsEnabled;
                    o && this.enableEventListeners(), this.state.eventsEnabled = o;
                }
                return Pi(e, [
                    {
                        key: "update",
                        value: function value() {
                            return Ai.call(this);
                        }
                    },
                    {
                        key: "destroy",
                        value: function value() {
                            return ki.call(this);
                        }
                    },
                    {
                        key: "enableEventListeners",
                        value: function value() {
                            return ji.call(this);
                        }
                    },
                    {
                        key: "disableEventListeners",
                        value: function value() {
                            return Li.call(this);
                        }
                    }
                ]), e;
            }();
            jt.Utils = window.PopperUtils;
            jt.placements = Dr;
            jt.Defaults = ta;
            Jn = jt, en = Be(rn()), na = [
                "innerHTML",
                "ownerDocument",
                "style",
                "attributes",
                "nodeValue"
            ], ra = [
                "Array",
                "ArrayBuffer",
                "AsyncFunction",
                "AsyncGenerator",
                "AsyncGeneratorFunction",
                "Date",
                "Error",
                "Function",
                "Generator",
                "GeneratorFunction",
                "HTMLElement",
                "Map",
                "Object",
                "Promise",
                "RegExp",
                "Set",
                "WeakMap",
                "WeakSet"
            ], oa = [
                "bigint",
                "boolean",
                "null",
                "number",
                "string",
                "symbol",
                "undefined"
            ];
            A.array = Array.isArray;
            A.arrayOf = function(e, t) {
                return !A.array(e) && !A.function(t) ? !1 : e.every(function(n) {
                    return t(n);
                });
            };
            A.asyncGeneratorFunction = function(e) {
                return Mt(e) === "AsyncGeneratorFunction";
            };
            A.asyncFunction = Oe("AsyncFunction");
            A.bigint = Qe("bigint");
            A.boolean = function(e) {
                return e === !0 || e === !1;
            };
            A.date = Oe("Date");
            A.defined = function(e) {
                return !A.undefined(e);
            };
            A.domElement = function(e) {
                return A.object(e) && !A.plainObject(e) && e.nodeType === 1 && A.string(e.nodeName) && na.every(function(t) {
                    return t in e;
                });
            };
            A.empty = function(e) {
                return A.string(e) && e.length === 0 || A.array(e) && e.length === 0 || A.object(e) && !A.map(e) && !A.set(e) && Object.keys(e).length === 0 || A.set(e) && e.size === 0 || A.map(e) && e.size === 0;
            };
            A.error = Oe("Error");
            A.function = Qe("function");
            A.generator = function(e) {
                return A.iterable(e) && A.function(e.next) && A.function(e.throw);
            };
            A.generatorFunction = Oe("GeneratorFunction");
            A.instanceOf = function(e, t) {
                return !e || !t ? !1 : Object.getPrototypeOf(e) === t.prototype;
            };
            A.iterable = function(e) {
                return !A.nullOrUndefined(e) && A.function(e[Symbol.iterator]);
            };
            A.map = Oe("Map");
            A.nan = function(e) {
                return Number.isNaN(e);
            };
            A.null = function(e) {
                return e === null;
            };
            A.nullOrUndefined = function(e) {
                return A.null(e) || A.undefined(e);
            };
            A.number = function(e) {
                return Qe("number")(e) && !A.nan(e);
            };
            A.numericString = function(e) {
                return A.string(e) && e.length > 0 && !Number.isNaN(Number(e));
            };
            A.object = function(e) {
                return !A.nullOrUndefined(e) && (A.function(e) || (typeof e === "undefined" ? "undefined" : _type_of(e)) == "object");
            };
            A.oneOf = function(e, t) {
                return A.array(e) ? e.indexOf(t) > -1 : !1;
            };
            A.plainFunction = Oe("Function");
            A.plainObject = function(e) {
                if (Mt(e) !== "Object") return !1;
                var t = Object.getPrototypeOf(e);
                return t === null || t === Object.getPrototypeOf({});
            };
            A.primitive = function(e) {
                return A.null(e) || aa(typeof e === "undefined" ? "undefined" : _type_of(e));
            };
            A.promise = Oe("Promise");
            A.propertyOf = function(e, t, n) {
                if (!A.object(e) || !t) return !1;
                var r = e[t];
                return A.function(n) ? n(r) : A.defined(r);
            };
            A.regexp = Oe("RegExp");
            A.set = Oe("Set");
            A.string = Qe("string");
            A.symbol = Qe("symbol");
            A.undefined = Qe("undefined");
            A.weakMap = Oe("WeakMap");
            A.weakSet = Oe("WeakSet");
            D = A;
            sa = Fr("function"), la = function la(e) {
                return e === null;
            }, Xn = function Xn(e) {
                return Object.prototype.toString.call(e).slice(8, -1) === "RegExp";
            }, Qn = function Qn(e) {
                return !ca(e) && !la(e) && (sa(e) || (typeof e === "undefined" ? "undefined" : _type_of(e)) == "object");
            }, ca = Fr("undefined"), tn = function tn(e) {
                var t = typeof Symbol == "function" && Symbol.iterator, n = t && e[t], r = 0;
                if (n) return n.call(e);
                if (e && typeof e.length == "number") return {
                    next: function next() {
                        return e && r >= e.length && (e = void 0), {
                            value: e && e[r++],
                            done: !e
                        };
                    }
                };
                throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
            };
            wa = {
                flip: {
                    padding: 20
                },
                preventOverflow: {
                    padding: 10
                }
            }, Sa = "The typeValidator argument must be a function with the signature function(props, propName, componentName).", Ta = "The error message is optional, but must be a string if provided.";
            q = {
                INIT: "init",
                IDLE: "idle",
                OPENING: "opening",
                OPEN: "open",
                CLOSING: "closing",
                ERROR: "error"
            }, ut = De.createPortal !== void 0;
            Hr = function(e) {
                vt(n, e);
                var t = Et(n);
                function n() {
                    return gt(this, n), t.apply(this, arguments);
                }
                return bt(n, [
                    {
                        key: "componentDidMount",
                        value: function value() {
                            Se() && (this.node || this.appendNode(), ut || this.renderPortal());
                        }
                    },
                    {
                        key: "componentDidUpdate",
                        value: function value() {
                            Se() && (ut || this.renderPortal());
                        }
                    },
                    {
                        key: "componentWillUnmount",
                        value: function value() {
                            !Se() || !this.node || (ut || De.unmountComponentAtNode(this.node), this.node && this.node.parentNode === document.body && (document.body.removeChild(this.node), this.node = void 0));
                        }
                    },
                    {
                        key: "appendNode",
                        value: function value() {
                            var r = this.props, i = r.id, o = r.zIndex;
                            this.node || (this.node = document.createElement("div"), i && (this.node.id = i), o && (this.node.style.zIndex = o), document.body.appendChild(this.node));
                        }
                    },
                    {
                        key: "renderPortal",
                        value: function value() {
                            if (!Se()) return null;
                            var r = this.props, i = r.children, o = r.setRef;
                            if (this.node || this.appendNode(), ut) return De.createPortal(i, this.node);
                            var a = De.unstable_renderSubtreeIntoContainer(this, i.length > 1 ? E.createElement("div", null, i) : i[0], this.node);
                            return o(a), null;
                        }
                    },
                    {
                        key: "renderReact16",
                        value: function value() {
                            var r = this.props, i = r.hasChildren, o = r.placement, a = r.target;
                            return i ? this.renderPortal() : a || o === "center" ? this.renderPortal() : null;
                        }
                    },
                    {
                        key: "render",
                        value: function value() {
                            return ut ? this.renderReact16() : null;
                        }
                    }
                ]), n;
            }(E.Component);
            oe(Hr, "propTypes", {
                children: C.default.oneOfType([
                    C.default.element,
                    C.default.array
                ]),
                hasChildren: C.default.bool,
                id: C.default.oneOfType([
                    C.default.string,
                    C.default.number
                ]),
                placement: C.default.string,
                setRef: C.default.func.isRequired,
                target: C.default.oneOfType([
                    C.default.object,
                    C.default.string
                ]),
                zIndex: C.default.number
            });
            Gr = function(e) {
                vt(n, e);
                var t = Et(n);
                function n() {
                    return gt(this, n), t.apply(this, arguments);
                }
                return bt(n, [
                    {
                        key: "parentStyle",
                        get: function get() {
                            var r = this.props, i = r.placement, o = r.styles, a = o.arrow.length, s = {
                                pointerEvents: "none",
                                position: "absolute",
                                width: "100%"
                            };
                            return i.startsWith("top") ? (s.bottom = 0, s.left = 0, s.right = 0, s.height = a) : i.startsWith("bottom") ? (s.left = 0, s.right = 0, s.top = 0, s.height = a) : i.startsWith("left") ? (s.right = 0, s.top = 0, s.bottom = 0) : i.startsWith("right") && (s.left = 0, s.top = 0), s;
                        }
                    },
                    {
                        key: "render",
                        value: function value() {
                            var r = this.props, i = r.placement, o = r.setArrowRef, a = r.styles, s = a.arrow, l = s.color, c = s.display, p = s.length, u = s.margin, f = s.position, b = s.spread, m = {
                                display: c,
                                position: f
                            }, T, F = b, I = p;
                            return i.startsWith("top") ? (T = "0,0 ".concat(F / 2, ",").concat(I, " ").concat(F, ",0"), m.bottom = 0, m.marginLeft = u, m.marginRight = u) : i.startsWith("bottom") ? (T = "".concat(F, ",").concat(I, " ").concat(F / 2, ",0 0,").concat(I), m.top = 0, m.marginLeft = u, m.marginRight = u) : i.startsWith("left") ? (I = b, F = p, T = "0,0 ".concat(F, ",").concat(I / 2, " 0,").concat(I), m.right = 0, m.marginTop = u, m.marginBottom = u) : i.startsWith("right") && (I = b, F = p, T = "".concat(F, ",").concat(I, " ").concat(F, ",0 0,").concat(I / 2), m.left = 0, m.marginTop = u, m.marginBottom = u), E.createElement("div", {
                                className: "__floater__arrow",
                                style: this.parentStyle
                            }, E.createElement("span", {
                                ref: o,
                                style: m
                            }, E.createElement("svg", {
                                width: F,
                                height: I,
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg"
                            }, E.createElement("polygon", {
                                points: T,
                                fill: l
                            }))));
                        }
                    }
                ]), n;
            }(E.Component);
            oe(Gr, "propTypes", {
                placement: C.default.string.isRequired,
                setArrowRef: C.default.func.isRequired,
                styles: C.default.object.isRequired
            });
            ka = [
                "color",
                "height",
                "width"
            ];
            zr.propTypes = {
                handleClick: C.default.func.isRequired,
                styles: C.default.object.isRequired
            };
            Yr.propTypes = {
                content: C.default.node.isRequired,
                footer: C.default.node,
                handleClick: C.default.func.isRequired,
                open: C.default.bool,
                positionWrapper: C.default.bool.isRequired,
                showCloseButton: C.default.bool.isRequired,
                styles: C.default.object.isRequired,
                title: C.default.node
            };
            qr = function(e) {
                vt(n, e);
                var t = Et(n);
                function n() {
                    return gt(this, n), t.apply(this, arguments);
                }
                return bt(n, [
                    {
                        key: "style",
                        get: function get() {
                            var r = this.props, i = r.disableAnimation, o = r.component, a = r.placement, s = r.hideArrow, l = r.status, c = r.styles, p = c.arrow.length, u = c.floater, f = c.floaterCentered, b = c.floaterClosing, m = c.floaterOpening, T = c.floaterWithAnimation, F = c.floaterWithComponent, I = {};
                            return s || (a.startsWith("top") ? I.padding = "0 0 ".concat(p, "px") : a.startsWith("bottom") ? I.padding = "".concat(p, "px 0 0") : a.startsWith("left") ? I.padding = "0 ".concat(p, "px 0 0") : a.startsWith("right") && (I.padding = "0 0 0 ".concat(p, "px"))), [
                                q.OPENING,
                                q.OPEN
                            ].indexOf(l) !== -1 && (I = ee(ee({}, I), m)), l === q.CLOSING && (I = ee(ee({}, I), b)), l === q.OPEN && !i && (I = ee(ee({}, I), T)), a === "center" && (I = ee(ee({}, I), f)), o && (I = ee(ee({}, I), F)), ee(ee({}, u), I);
                        }
                    },
                    {
                        key: "render",
                        value: function value() {
                            var r = this.props, i = r.component, o = r.handleClick, a = r.hideArrow, s = r.setFloaterRef, l = r.status, c = {}, p = [
                                "__floater"
                            ];
                            return i ? E.isValidElement(i) ? c.content = E.cloneElement(i, {
                                closeFn: o
                            }) : c.content = i({
                                closeFn: o
                            }) : c.content = E.createElement(Yr, this.props), l === q.OPEN && p.push("__floater__open"), a || (c.arrow = E.createElement(Gr, this.props)), E.createElement("div", {
                                ref: s,
                                className: p.join(" "),
                                style: this.style
                            }, E.createElement("div", {
                                className: "__floater__body"
                            }, c.content, c.arrow));
                        }
                    }
                ]), n;
            }(E.Component);
            oe(qr, "propTypes", {
                component: C.default.oneOfType([
                    C.default.func,
                    C.default.element
                ]),
                content: C.default.node,
                disableAnimation: C.default.bool.isRequired,
                footer: C.default.node,
                handleClick: C.default.func.isRequired,
                hideArrow: C.default.bool.isRequired,
                open: C.default.bool,
                placement: C.default.string.isRequired,
                positionWrapper: C.default.bool.isRequired,
                setArrowRef: C.default.func.isRequired,
                setFloaterRef: C.default.func.isRequired,
                showCloseButton: C.default.bool,
                status: C.default.string.isRequired,
                styles: C.default.object.isRequired,
                title: C.default.node
            });
            $r = function(e) {
                vt(n, e);
                var t = Et(n);
                function n() {
                    return gt(this, n), t.apply(this, arguments);
                }
                return bt(n, [
                    {
                        key: "render",
                        value: function value() {
                            var r = this.props, i = r.children, o = r.handleClick, a = r.handleMouseEnter, s = r.handleMouseLeave, l = r.setChildRef, c = r.setWrapperRef, p = r.style, u = r.styles, f;
                            if (i) if (E.Children.count(i) === 1) if (!E.isValidElement(i)) f = E.createElement("span", null, i);
                            else {
                                var b = D.function(i.type) ? "innerRef" : "ref";
                                f = E.cloneElement(E.Children.only(i), oe({}, b, l));
                            }
                            else f = i;
                            return f ? E.createElement("span", {
                                ref: c,
                                style: ee(ee({}, u), p),
                                onClick: o,
                                onMouseEnter: a,
                                onMouseLeave: s
                            }, f) : null;
                        }
                    }
                ]), n;
            }(E.Component);
            oe($r, "propTypes", {
                children: C.default.node,
                handleClick: C.default.func.isRequired,
                handleMouseEnter: C.default.func.isRequired,
                handleMouseLeave: C.default.func.isRequired,
                setChildRef: C.default.func.isRequired,
                setWrapperRef: C.default.func.isRequired,
                style: C.default.object,
                styles: C.default.object.isRequired
            });
            Na = {
                zIndex: 100
            };
            Ma = [
                "arrow",
                "flip",
                "offset"
            ], La = [
                "position",
                "top",
                "right",
                "bottom",
                "left"
            ], fn = function(e) {
                vt(n, e);
                var t = Et(n);
                function n(r) {
                    var i;
                    return gt(this, n), i = t.call(this, r), oe(Pe(i), "setArrowRef", function(o) {
                        i.arrowRef = o;
                    }), oe(Pe(i), "setChildRef", function(o) {
                        i.childRef = o;
                    }), oe(Pe(i), "setFloaterRef", function(o) {
                        i.floaterRef = o;
                    }), oe(Pe(i), "setWrapperRef", function(o) {
                        i.wrapperRef = o;
                    }), oe(Pe(i), "handleTransitionEnd", function() {
                        var o = i.state.status, a = i.props.callback;
                        i.wrapperPopper && i.wrapperPopper.instance.update(), i.setState({
                            status: o === q.OPENING ? q.OPEN : q.IDLE
                        }, function() {
                            var s = i.state.status;
                            a(s === q.OPEN ? "open" : "close", i.props);
                        });
                    }), oe(Pe(i), "handleClick", function() {
                        var o = i.props, a = o.event, s = o.open;
                        if (!D.boolean(s)) {
                            var l = i.state, c = l.positionWrapper, p = l.status;
                            (i.event === "click" || i.event === "hover" && c) && (Rt({
                                title: "click",
                                data: [
                                    {
                                        event: a,
                                        status: p === q.OPEN ? "closing" : "opening"
                                    }
                                ],
                                debug: i.debug
                            }), i.toggle());
                        }
                    }), oe(Pe(i), "handleMouseEnter", function() {
                        var o = i.props, a = o.event, s = o.open;
                        if (!(D.boolean(s) || Jt())) {
                            var l = i.state.status;
                            i.event === "hover" && l === q.IDLE && (Rt({
                                title: "mouseEnter",
                                data: [
                                    {
                                        key: "originalEvent",
                                        value: a
                                    }
                                ],
                                debug: i.debug
                            }), clearTimeout(i.eventDelayTimeout), i.toggle());
                        }
                    }), oe(Pe(i), "handleMouseLeave", function() {
                        var o = i.props, a = o.event, s = o.eventDelay, l = o.open;
                        if (!(D.boolean(l) || Jt())) {
                            var c = i.state, p = c.status, u = c.positionWrapper;
                            i.event === "hover" && (Rt({
                                title: "mouseLeave",
                                data: [
                                    {
                                        key: "originalEvent",
                                        value: a
                                    }
                                ],
                                debug: i.debug
                            }), s ? [
                                q.OPENING,
                                q.OPEN
                            ].indexOf(p) !== -1 && !u && !i.eventDelayTimeout && (i.eventDelayTimeout = setTimeout(function() {
                                delete i.eventDelayTimeout, i.toggle();
                            }, s * 1e3)) : i.toggle(q.IDLE));
                        }
                    }), i.state = {
                        currentPlacement: r.placement,
                        needsUpdate: !1,
                        positionWrapper: r.wrapperOptions.position && !!r.target,
                        status: q.INIT,
                        statusWrapper: q.INIT
                    }, i._isMounted = !1, i.hasMounted = !1, Se() && window.addEventListener("load", function() {
                        i.popper && i.popper.instance.update(), i.wrapperPopper && i.wrapperPopper.instance.update();
                    }), i;
                }
                return bt(n, [
                    {
                        key: "componentDidMount",
                        value: function value() {
                            if (Se()) {
                                var r = this.state.positionWrapper, i = this.props, o = i.children, a = i.open, s = i.target;
                                this._isMounted = !0, Rt({
                                    title: "init",
                                    data: {
                                        hasChildren: !!o,
                                        hasTarget: !!s,
                                        isControlled: D.boolean(a),
                                        positionWrapper: r,
                                        target: this.target,
                                        floater: this.floaterRef
                                    },
                                    debug: this.debug
                                }), this.hasMounted || (this.initPopper(), this.hasMounted = !0), !o && s && D.boolean(a);
                            }
                        }
                    },
                    {
                        key: "componentDidUpdate",
                        value: function value(r, i) {
                            if (Se()) {
                                var o = this.props, a = o.autoOpen, s = o.open, l = o.target, c = o.wrapperOptions, p = ga(i, this.state), u = p.changedFrom, f = p.changed;
                                if (r.open !== s) {
                                    var b;
                                    D.boolean(s) && (b = s ? q.OPENING : q.CLOSING), this.toggle(b);
                                }
                                (r.wrapperOptions.position !== c.position || r.target !== l) && this.changeWrapperPosition(this.props), f("status", q.IDLE) && s ? this.toggle(q.OPEN) : u("status", q.INIT, q.IDLE) && a && this.toggle(q.OPEN), this.popper && f("status", q.OPENING) && this.popper.instance.update(), this.floaterRef && (f("status", q.OPENING) || f("status", q.CLOSING)) && Aa(this.floaterRef, "transitionend", this.handleTransitionEnd), f("needsUpdate", !0) && this.rebuildPopper();
                            }
                        }
                    },
                    {
                        key: "componentWillUnmount",
                        value: function value() {
                            Se() && (this._isMounted = !1, this.popper && this.popper.instance.destroy(), this.wrapperPopper && this.wrapperPopper.instance.destroy());
                        }
                    },
                    {
                        key: "initPopper",
                        value: function value() {
                            var r = this, i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.target, o = this.state.positionWrapper, a = this.props, s = a.disableFlip, l = a.getPopper, c = a.hideArrow, p = a.offset, u = a.placement, f = a.wrapperOptions, b = u === "top" || u === "bottom" ? "flip" : [
                                "right",
                                "bottom-end",
                                "top-end",
                                "left",
                                "top-start",
                                "bottom-start"
                            ];
                            if (u === "center") this.setState({
                                status: q.IDLE
                            });
                            else if (i && this.floaterRef) {
                                var m = this.options, T = m.arrow, F = m.flip, I = m.offset, x = Wr(m, Ma);
                                new Jn(i, this.floaterRef, {
                                    placement: u,
                                    modifiers: ee({
                                        arrow: ee({
                                            enabled: !c,
                                            element: this.arrowRef
                                        }, T),
                                        flip: ee({
                                            enabled: !s,
                                            behavior: b
                                        }, F),
                                        offset: ee({
                                            offset: "0, ".concat(p, "px")
                                        }, I)
                                    }, x),
                                    onCreate: function onCreate(P) {
                                        var R;
                                        if (r.popper = P, !((R = r.floaterRef) !== null && R !== void 0 && R.isConnected)) {
                                            r.setState({
                                                needsUpdate: !0
                                            });
                                            return;
                                        }
                                        l(P, "floater"), r._isMounted && r.setState({
                                            currentPlacement: P.placement,
                                            status: q.IDLE
                                        }), u !== P.placement && setTimeout(function() {
                                            P.instance.update();
                                        }, 1);
                                    },
                                    onUpdate: function onUpdate(P) {
                                        r.popper = P;
                                        var R = r.state.currentPlacement;
                                        r._isMounted && P.placement !== R && r.setState({
                                            currentPlacement: P.placement
                                        });
                                    }
                                });
                            }
                            if (o) {
                                var v = D.undefined(f.offset) ? 0 : f.offset;
                                new Jn(this.target, this.wrapperRef, {
                                    placement: f.placement || u,
                                    modifiers: {
                                        arrow: {
                                            enabled: !1
                                        },
                                        offset: {
                                            offset: "0, ".concat(v, "px")
                                        },
                                        flip: {
                                            enabled: !1
                                        }
                                    },
                                    onCreate: function onCreate(P) {
                                        r.wrapperPopper = P, r._isMounted && r.setState({
                                            statusWrapper: q.IDLE
                                        }), l(P, "wrapper"), u !== P.placement && setTimeout(function() {
                                            P.instance.update();
                                        }, 1);
                                    }
                                });
                            }
                        }
                    },
                    {
                        key: "rebuildPopper",
                        value: function value() {
                            var r = this;
                            this.floaterRefInterval = setInterval(function() {
                                var i;
                                (i = r.floaterRef) !== null && i !== void 0 && i.isConnected && (clearInterval(r.floaterRefInterval), r.setState({
                                    needsUpdate: !1
                                }), r.initPopper());
                            }, 50);
                        }
                    },
                    {
                        key: "changeWrapperPosition",
                        value: function value(r) {
                            var i = r.target, o = r.wrapperOptions;
                            this.setState({
                                positionWrapper: o.position && !!i
                            });
                        }
                    },
                    {
                        key: "toggle",
                        value: function value(r) {
                            var i = this.state.status, o = i === q.OPEN ? q.CLOSING : q.OPENING;
                            D.undefined(r) || (o = r), this.setState({
                                status: o
                            });
                        }
                    },
                    {
                        key: "debug",
                        get: function get() {
                            var r = this.props.debug;
                            return r || Se() && "ReactFloaterDebug" in window && !!window.ReactFloaterDebug;
                        }
                    },
                    {
                        key: "event",
                        get: function get() {
                            var r = this.props, i = r.disableHoverToClick, o = r.event;
                            return o === "hover" && Jt() && !i ? "click" : o;
                        }
                    },
                    {
                        key: "options",
                        get: function get() {
                            var r = this.props.options;
                            return (0, en.default)(wa, r || {});
                        }
                    },
                    {
                        key: "styles",
                        get: function get() {
                            var r = this, i = this.state, o = i.status, a = i.positionWrapper, s = i.statusWrapper, l = this.props.styles, c = (0, en.default)(ja(l), l);
                            if (a) {
                                var p;
                                [
                                    q.IDLE
                                ].indexOf(o) === -1 || [
                                    q.IDLE
                                ].indexOf(s) === -1 ? p = c.wrapperPosition : p = this.wrapperPopper.styles, c.wrapper = ee(ee({}, c.wrapper), p);
                            }
                            if (this.target) {
                                var u = window.getComputedStyle(this.target);
                                this.wrapperStyles ? c.wrapper = ee(ee({}, c.wrapper), this.wrapperStyles) : [
                                    "relative",
                                    "static"
                                ].indexOf(u.position) === -1 && (this.wrapperStyles = {}, a || (La.forEach(function(f) {
                                    r.wrapperStyles[f] = u[f];
                                }), c.wrapper = ee(ee({}, c.wrapper), this.wrapperStyles), this.target.style.position = "relative", this.target.style.top = "auto", this.target.style.right = "auto", this.target.style.bottom = "auto", this.target.style.left = "auto"));
                            }
                            return c;
                        }
                    },
                    {
                        key: "target",
                        get: function get() {
                            if (!Se()) return null;
                            var r = this.props.target;
                            return r ? D.domElement(r) ? r : document.querySelector(r) : this.childRef || this.wrapperRef;
                        }
                    },
                    {
                        key: "render",
                        value: function value() {
                            var r = this.state, i = r.currentPlacement, o = r.positionWrapper, a = r.status, s = this.props, l = s.children, c = s.component, p = s.content, u = s.disableAnimation, f = s.footer, b = s.hideArrow, m = s.id, T = s.open, F = s.showCloseButton, I = s.style, x = s.target, v = s.title, P = E.createElement($r, {
                                handleClick: this.handleClick,
                                handleMouseEnter: this.handleMouseEnter,
                                handleMouseLeave: this.handleMouseLeave,
                                setChildRef: this.setChildRef,
                                setWrapperRef: this.setWrapperRef,
                                style: I,
                                styles: this.styles.wrapper
                            }, l), R = {};
                            return o ? R.wrapperInPortal = P : R.wrapperAsChildren = P, E.createElement("span", null, E.createElement(Hr, {
                                hasChildren: !!l,
                                id: m,
                                placement: i,
                                setRef: this.setFloaterRef,
                                target: x,
                                zIndex: this.styles.options.zIndex
                            }, E.createElement(qr, {
                                component: c,
                                content: p,
                                disableAnimation: u,
                                footer: f,
                                handleClick: this.handleClick,
                                hideArrow: b || i === "center",
                                open: T,
                                placement: i,
                                positionWrapper: o,
                                setArrowRef: this.setArrowRef,
                                setFloaterRef: this.setFloaterRef,
                                showCloseButton: F,
                                status: a,
                                styles: this.styles,
                                title: v
                            }), R.wrapperInPortal), R.wrapperAsChildren);
                        }
                    }
                ]), n;
            }(E.Component);
            oe(fn, "propTypes", {
                autoOpen: C.default.bool,
                callback: C.default.func,
                children: C.default.node,
                component: ar(C.default.oneOfType([
                    C.default.func,
                    C.default.element
                ]), function(e) {
                    return !e.content;
                }),
                content: ar(C.default.node, function(e) {
                    return !e.component;
                }),
                debug: C.default.bool,
                disableAnimation: C.default.bool,
                disableFlip: C.default.bool,
                disableHoverToClick: C.default.bool,
                event: C.default.oneOf([
                    "hover",
                    "click"
                ]),
                eventDelay: C.default.number,
                footer: C.default.node,
                getPopper: C.default.func,
                hideArrow: C.default.bool,
                id: C.default.oneOfType([
                    C.default.string,
                    C.default.number
                ]),
                offset: C.default.number,
                open: C.default.bool,
                options: C.default.object,
                placement: C.default.oneOf([
                    "top",
                    "top-start",
                    "top-end",
                    "bottom",
                    "bottom-start",
                    "bottom-end",
                    "left",
                    "left-start",
                    "left-end",
                    "right",
                    "right-start",
                    "right-end",
                    "auto",
                    "center"
                ]),
                showCloseButton: C.default.bool,
                style: C.default.object,
                styles: C.default.object,
                target: C.default.oneOfType([
                    C.default.object,
                    C.default.string
                ]),
                title: C.default.node,
                wrapperOptions: C.default.shape({
                    offset: C.default.number,
                    placement: C.default.oneOf([
                        "top",
                        "top-start",
                        "top-end",
                        "bottom",
                        "bottom-start",
                        "bottom-end",
                        "left",
                        "left-start",
                        "left-end",
                        "right",
                        "right-start",
                        "right-end",
                        "auto"
                    ]),
                    position: C.default.bool
                })
            });
            oe(fn, "defaultProps", {
                autoOpen: !1,
                callback: sr,
                debug: !1,
                disableAnimation: !1,
                disableFlip: !1,
                disableHoverToClick: !1,
                event: "click",
                eventDelay: .4,
                getPopper: sr,
                hideArrow: !1,
                offset: 15,
                placement: "bottom",
                showCloseButton: !1,
                styles: {},
                target: null,
                wrapperOptions: {
                    position: !1
                }
            });
            Da = Be(Qo(), 1), Fa = Object.defineProperty, Ba = function(e, t, n) {
                return t in e ? Fa(e, t, {
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                    value: n
                }) : e[t] = n;
            }, L = function(e, t, n) {
                return Ba(e, (typeof t === "undefined" ? "undefined" : _type_of(t)) != "symbol" ? t + "" : t, n), n;
            }, $ = {
                INIT: "init",
                START: "start",
                STOP: "stop",
                RESET: "reset",
                PREV: "prev",
                NEXT: "next",
                GO: "go",
                CLOSE: "close",
                SKIP: "skip",
                UPDATE: "update"
            }, ve = {
                TOUR_START: "tour:start",
                STEP_BEFORE: "step:before",
                BEACON: "beacon",
                TOOLTIP: "tooltip",
                STEP_AFTER: "step:after",
                TOUR_END: "tour:end",
                TOUR_STATUS: "tour:status",
                TARGET_NOT_FOUND: "error:target_not_found",
                ERROR: "error"
            }, W = {
                INIT: "init",
                READY: "ready",
                BEACON: "beacon",
                TOOLTIP: "tooltip",
                COMPLETE: "complete",
                ERROR: "error"
            }, Y = {
                IDLE: "idle",
                READY: "ready",
                WAITING: "waiting",
                RUNNING: "running",
                PAUSED: "paused",
                SKIPPED: "skipped",
                FINISHED: "finished",
                ERROR: "error"
            };
            pt = it !== void 0;
            Qa = {
                options: {
                    preventOverflow: {
                        boundariesElement: "scrollParent"
                    }
                },
                wrapperOptions: {
                    offset: -18,
                    position: !0
                }
            }, Xr = {
                back: "Back",
                close: "Close",
                last: "Last",
                next: "Next",
                open: "Open the dialog",
                skip: "Skip"
            }, Za = {
                event: "click",
                placement: "bottom",
                offset: 10,
                disableBeacon: !1,
                disableCloseOnEsc: !1,
                disableOverlay: !1,
                disableOverlayClose: !1,
                disableScrollParentFix: !1,
                disableScrolling: !1,
                hideBackButton: !1,
                hideCloseButton: !1,
                hideFooter: !1,
                isFixed: !1,
                locale: Xr,
                showProgress: !1,
                showSkipButton: !1,
                spotlightClicks: !1,
                spotlightPadding: 10
            }, es = {
                continuous: !1,
                debug: !1,
                disableCloseOnEsc: !1,
                disableOverlay: !1,
                disableOverlayClose: !1,
                disableScrolling: !1,
                disableScrollParentFix: !1,
                getHelpers: void 0,
                hideBackButton: !1,
                run: !0,
                scrollOffset: 20,
                scrollDuration: 300,
                scrollToFirstStep: !1,
                showSkipButton: !1,
                showProgress: !1,
                spotlightClicks: !1,
                spotlightPadding: 10,
                steps: []
            }, ts = {
                arrowColor: "#fff",
                backgroundColor: "#fff",
                beaconSize: 36,
                overlayColor: "rgba(0, 0, 0, 0.5)",
                primaryColor: "#f04",
                spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
                textColor: "#333",
                width: 380,
                zIndex: 100
            }, ft = {
                backgroundColor: "transparent",
                border: 0,
                borderRadius: 0,
                color: "#555",
                cursor: "pointer",
                fontSize: 16,
                lineHeight: 1,
                padding: 8,
                WebkitAppearance: "none"
            }, ur = {
                borderRadius: 4,
                position: "absolute"
            };
            Zr = {
                action: "init",
                controlled: !1,
                index: 0,
                lifecycle: W.INIT,
                origin: null,
                size: 0,
                status: Y.IDLE
            }, fr = Ka(Jr(Zr, "controlled", "size")), os = /*#__PURE__*/ function() {
                "use strict";
                function os(e) {
                    var _this = this;
                    var _this1 = this;
                    _class_call_check(this, os);
                    L(this, "beaconPopper"), L(this, "tooltipPopper"), L(this, "data", new Map), L(this, "listener"), L(this, "store", new Map), L(this, "addListener", function(i) {
                        _this.listener = i;
                    }), L(this, "setSteps", function(i) {
                        var _this_getState = _this.getState(), o = _this_getState.size, a = _this_getState.status, s = {
                            size: i.length,
                            status: a
                        };
                        _this.data.set("steps", i), a === Y.WAITING && !o && i.length && (s.status = Y.RUNNING), _this.setState(s);
                    }), L(this, "getPopper", function(i) {
                        return i === "beacon" ? _this.beaconPopper : _this.tooltipPopper;
                    }), L(this, "setPopper", function(i, o) {
                        i === "beacon" ? _this.beaconPopper = o : _this.tooltipPopper = o;
                    }), L(this, "cleanupPoppers", function() {
                        _this.beaconPopper = null, _this.tooltipPopper = null;
                    }), L(this, "close", function() {
                        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
                        var _this_getState = _this1.getState(), o = _this_getState.index, a = _this_getState.status;
                        a === Y.RUNNING && _this1.setState(_object_spread({}, _this1.getNextState({
                            action: $.CLOSE,
                            index: o + 1,
                            origin: i
                        })));
                    }), L(this, "go", function(i) {
                        var _this_getState = _this.getState(), o = _this_getState.controlled, a = _this_getState.status;
                        if (o || a !== Y.RUNNING) return;
                        var s = _this.getSteps()[i];
                        _this.setState(_object_spread_props(_object_spread({}, _this.getNextState({
                            action: $.GO,
                            index: i
                        })), {
                            status: s ? a : Y.FINISHED
                        }));
                    }), L(this, "info", function() {
                        return _this.getState();
                    }), L(this, "next", function() {
                        var _this_getState = _this.getState(), i = _this_getState.index, o = _this_getState.status;
                        o === Y.RUNNING && _this.setState(_this.getNextState({
                            action: $.NEXT,
                            index: i + 1
                        }));
                    }), L(this, "open", function() {
                        var _this_getState = _this.getState(), i = _this_getState.status;
                        i === Y.RUNNING && _this.setState(_object_spread({}, _this.getNextState({
                            action: $.UPDATE,
                            lifecycle: W.TOOLTIP
                        })));
                    }), L(this, "prev", function() {
                        var _this_getState = _this.getState(), i = _this_getState.index, o = _this_getState.status;
                        o === Y.RUNNING && _this.setState(_object_spread({}, _this.getNextState({
                            action: $.PREV,
                            index: i - 1
                        })));
                    }), L(this, "reset", function() {
                        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                        var _this_getState = _this1.getState(), o = _this_getState.controlled;
                        o || _this1.setState(_object_spread_props(_object_spread({}, _this1.getNextState({
                            action: $.RESET,
                            index: 0
                        })), {
                            status: i ? Y.RUNNING : Y.READY
                        }));
                    }), L(this, "skip", function() {
                        var _this_getState = _this.getState(), i = _this_getState.status;
                        i === Y.RUNNING && _this.setState({
                            action: $.SKIP,
                            lifecycle: W.INIT,
                            status: Y.SKIPPED
                        });
                    }), L(this, "start", function(i) {
                        var _this_getState = _this.getState(), o = _this_getState.index, a = _this_getState.size;
                        _this.setState(_object_spread_props(_object_spread({}, _this.getNextState({
                            action: $.START,
                            index: j.number(i) ? i : o
                        }, !0)), {
                            status: a ? Y.RUNNING : Y.WAITING
                        }));
                    }), L(this, "stop", function() {
                        var i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                        var _this_getState = _this1.getState(), o = _this_getState.index, a = _this_getState.status;
                        [
                            Y.FINISHED,
                            Y.SKIPPED
                        ].includes(a) || _this1.setState(_object_spread_props(_object_spread({}, _this1.getNextState({
                            action: $.STOP,
                            index: o + (i ? 1 : 0)
                        })), {
                            status: Y.PAUSED
                        }));
                    }), L(this, "update", function(i) {
                        var o, a;
                        if (!$a(i, fr)) throw new Error("State is not valid. Valid keys: ".concat(fr.join(", ")));
                        _this.setState(_object_spread({}, _this.getNextState(_object_spread_props(_object_spread({}, _this.getState(), i), {
                            action: (o = i.action) != null ? o : $.UPDATE,
                            origin: (a = i.origin) != null ? a : null
                        }), !0)));
                    });
                    var _ref = e !== null && e !== void 0 ? e : {}, tmp = _ref.continuous, t = tmp === void 0 ? !1 : tmp, n = _ref.stepIndex, tmp1 = _ref.steps, r = tmp1 === void 0 ? [] : tmp1;
                    this.setState({
                        action: $.INIT,
                        controlled: j.number(n),
                        continuous: t,
                        index: j.number(n) ? n : 0,
                        lifecycle: W.INIT,
                        origin: null,
                        status: r.length ? Y.READY : Y.IDLE
                    }, !0), this.beaconPopper = null, this.tooltipPopper = null, this.listener = null, this.setSteps(r);
                }
                _create_class(os, [
                    {
                        key: "getState",
                        value: function getState() {
                            return this.store.size ? {
                                action: this.store.get("action") || "",
                                controlled: this.store.get("controlled") || !1,
                                index: parseInt(this.store.get("index"), 10),
                                lifecycle: this.store.get("lifecycle") || "",
                                origin: this.store.get("origin") || null,
                                size: this.store.get("size") || 0,
                                status: this.store.get("status") || ""
                            } : _object_spread({}, Zr);
                        }
                    },
                    {
                        key: "getNextState",
                        value: function getNextState(e) {
                            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                            var n, r, i, o, a;
                            var _this_getState = this.getState(), s = _this_getState.action, l = _this_getState.controlled, c = _this_getState.index, p = _this_getState.size, u = _this_getState.status, f = j.number(e.index) ? e.index : c, b = l && !t ? c : Math.min(Math.max(f, 0), p);
                            return {
                                action: (n = e.action) != null ? n : s,
                                controlled: l,
                                index: b,
                                lifecycle: (r = e.lifecycle) != null ? r : W.INIT,
                                origin: (i = e.origin) != null ? i : null,
                                size: (o = e.size) != null ? o : p,
                                status: b === p ? Y.FINISHED : (a = e.status) != null ? a : u
                            };
                        }
                    },
                    {
                        key: "getSteps",
                        value: function getSteps() {
                            var _$e = this.data.get("steps");
                            return Array.isArray(_$e) ? _$e : [];
                        }
                    },
                    {
                        key: "hasUpdatedState",
                        value: function hasUpdatedState(e) {
                            var t = JSON.stringify(e), n = JSON.stringify(this.getState());
                            return t !== n;
                        }
                    },
                    {
                        key: "setState",
                        value: function setState(e) {
                            var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                            var n = this.getState(), _$_object_spread = _object_spread({}, n, e), r = _$_object_spread.action, i = _$_object_spread.index, o = _$_object_spread.lifecycle, tmp = _$_object_spread.origin, a = tmp === void 0 ? null : tmp, s = _$_object_spread.size, l = _$_object_spread.status;
                            this.store.set("action", r), this.store.set("index", i), this.store.set("lifecycle", o), this.store.set("origin", a), this.store.set("size", s), this.store.set("status", l), t && (this.store.set("controlled", e.controlled), this.store.set("continuous", e.continuous)), this.listener && this.hasUpdatedState(n) && this.listener(this.getState());
                        }
                    },
                    {
                        key: "getHelpers",
                        value: function getHelpers() {
                            return {
                                close: this.close,
                                go: this.go,
                                info: this.info,
                                next: this.next,
                                open: this.open,
                                prev: this.prev,
                                reset: this.reset,
                                skip: this.skip
                            };
                        }
                    }
                ]);
                return os;
            }();
            ss = as, ls = /*#__PURE__*/ function(_e) {
                "use strict";
                _inherits(ls, _e);
                function ls() {
                    _class_call_check(this, ls);
                    var _this;
                    _this = _call_super(this, ls, arguments), L(_this, "isActive", !1), L(_this, "resizeTimeout"), L(_this, "scrollTimeout"), L(_this, "scrollParent"), L(_this, "state", {
                        isScrolling: !1,
                        mouseOverSpotlight: !1,
                        showSpotlight: !0
                    }), L(_this, "hideSpotlight", function() {
                        var _this_props = _this.props, _$e = _this_props.continuous, t = _this_props.disableOverlay, n = _this_props.lifecycle, r = [
                            W.BEACON,
                            W.COMPLETE,
                            W.ERROR
                        ];
                        return t || (_$e ? r.includes(n) : n !== W.TOOLTIP);
                    }), L(_this, "handleMouseMove", function(e) {
                        var _this_state = _this.state, t = _this_state.mouseOverSpotlight, _this_spotlightStyles = _this.spotlightStyles, n = _this_spotlightStyles.height, r = _this_spotlightStyles.left, i = _this_spotlightStyles.position, o = _this_spotlightStyles.top, a = _this_spotlightStyles.width, s = i === "fixed" ? e.clientY : e.pageY, l = i === "fixed" ? e.clientX : e.pageX, c = s >= o && s <= o + n, p = l >= r && l <= r + a && c;
                        p !== t && _this.updateState({
                            mouseOverSpotlight: p
                        });
                    }), L(_this, "handleScroll", function() {
                        var _this_props = _this.props, _$e = _this_props.target, t = Ne(_$e);
                        if (_this.scrollParent !== document) {
                            var _this_state = _this.state, n = _this_state.isScrolling;
                            n || _this.updateState({
                                isScrolling: !0,
                                showSpotlight: !1
                            }), clearTimeout(_this.scrollTimeout), _this.scrollTimeout = window.setTimeout(function() {
                                _this.updateState({
                                    isScrolling: !1,
                                    showSpotlight: !0
                                });
                            }, 50);
                        } else dt(t, "sticky") && _this.updateState({});
                    }), L(_this, "handleResize", function() {
                        clearTimeout(_this.resizeTimeout), _this.resizeTimeout = window.setTimeout(function() {
                            _this.isActive && _this.forceUpdate();
                        }, 100);
                    });
                    return _this;
                }
                _create_class(ls, [
                    {
                        key: "componentDidMount",
                        value: function componentDidMount() {
                            var _this_props = this.props, _$e = _this_props.debug, t = _this_props.disableScrolling, tmp = _this_props.disableScrollParentFix, n = tmp === void 0 ? !1 : tmp, r = _this_props.target, i = Ne(r);
                            this.scrollParent = Lt(i !== null && i !== void 0 ? i : document.body, n, !0), this.isActive = !0, !t && Ot(i, !0) && Me({
                                title: "step has a custom scroll parent and can cause trouble with scrolling",
                                data: [
                                    {
                                        key: "parent",
                                        value: this.scrollParent
                                    }
                                ],
                                debug: _$e
                            }), window.addEventListener("resize", this.handleResize);
                        }
                    },
                    {
                        key: "componentDidUpdate",
                        value: function componentDidUpdate(e) {
                            var _this = this;
                            var t;
                            var _this_props = this.props, n = _this_props.lifecycle, r = _this_props.spotlightClicks, _xt = xt(e, this.props), i = _xt.changed;
                            i("lifecycle", W.TOOLTIP) && ((t = this.scrollParent) == null || t.addEventListener("scroll", this.handleScroll, {
                                passive: !0
                            }), setTimeout(function() {
                                var _this_state = _this.state, o = _this_state.isScrolling;
                                o || _this.updateState({
                                    showSpotlight: !0
                                });
                            }, 100)), (i("spotlightClicks") || i("disableOverlay") || i("lifecycle")) && (r && n === W.TOOLTIP ? window.addEventListener("mousemove", this.handleMouseMove, !1) : n !== W.TOOLTIP && window.removeEventListener("mousemove", this.handleMouseMove));
                        }
                    },
                    {
                        key: "componentWillUnmount",
                        value: function componentWillUnmount() {
                            var _$e;
                            this.isActive = !1, window.removeEventListener("mousemove", this.handleMouseMove), window.removeEventListener("resize", this.handleResize), clearTimeout(this.resizeTimeout), clearTimeout(this.scrollTimeout), (_$e = this.scrollParent) == null || _$e.removeEventListener("scroll", this.handleScroll);
                        }
                    },
                    {
                        key: "overlayStyles",
                        get: function get() {
                            var _this_state = this.state, _$e = _this_state.mouseOverSpotlight, _this_props = this.props, t = _this_props.disableOverlayClose, n = _this_props.placement, r = _this_props.styles, i = r.overlay;
                            return cr() && (i = n === "center" ? r.overlayLegacyCenter : r.overlayLegacy), _object_spread({
                                cursor: t ? "default" : "pointer",
                                height: Wa(),
                                pointerEvents: _$e ? "none" : "auto"
                            }, i);
                        }
                    },
                    {
                        key: "spotlightStyles",
                        get: function get() {
                            var _$e, t, n;
                            var _this_state = this.state, r = _this_state.showSpotlight, _this_props = this.props, tmp = _this_props.disableScrollParentFix, i = tmp === void 0 ? !1 : tmp, o = _this_props.spotlightClicks, tmp1 = _this_props.spotlightPadding, a = tmp1 === void 0 ? 0 : tmp1, s = _this_props.styles, l = _this_props.target, c = Ne(l), p = Vr(c), u = dt(c), f = za(c, a, i);
                            return _object_spread_props(_object_spread({}, cr() ? s.spotlightLegacy : s.spotlight), {
                                height: Math.round(((_$e = p === null || p === void 0 ? void 0 : p.height) != null ? _$e : 0) + a * 2),
                                left: Math.round(((t = p === null || p === void 0 ? void 0 : p.left) != null ? t : 0) - a),
                                opacity: r ? 1 : 0,
                                pointerEvents: o ? "none" : "auto",
                                position: u ? "fixed" : "absolute",
                                top: f,
                                transition: "opacity 0.2s",
                                width: Math.round(((n = p === null || p === void 0 ? void 0 : p.width) != null ? n : 0) + a * 2)
                            });
                        }
                    },
                    {
                        key: "updateState",
                        value: function updateState(e) {
                            this.isActive && this.setState(function(t) {
                                return _object_spread({}, t, e);
                            });
                        }
                    },
                    {
                        key: "render",
                        value: function render() {
                            var _this_state = this.state, _$e = _this_state.showSpotlight, _this_props = this.props, t = _this_props.onClickOverlay, n = _this_props.placement, _this = this, r = _this.hideSpotlight, i = _this.overlayStyles, o = _this.spotlightStyles;
                            if (r()) return null;
                            var a = n !== "center" && _$e && V(ss, {
                                styles: o
                            });
                            if (Kr() === "safari") {
                                var s = i.mixBlendMode, l = i.zIndex, c = _object_without_properties(i, [
                                    "mixBlendMode",
                                    "zIndex"
                                ]);
                                a = V("div", {
                                    style: _object_spread({}, c)
                                }, a), delete i.backgroundColor;
                            }
                            return V("div", {
                                className: "react-joyride__overlay",
                                "data-test-id": "overlay",
                                onClick: t,
                                role: "presentation",
                                style: i
                            }, a);
                        }
                    }
                ]);
                return ls;
            }(_e), cs = /*#__PURE__*/ function(_e) {
                "use strict";
                _inherits(cs, _e);
                function cs() {
                    _class_call_check(this, cs);
                    var _this;
                    _this = _call_super(this, cs, arguments), L(_this, "node", null);
                    return _this;
                }
                _create_class(cs, [
                    {
                        key: "componentDidMount",
                        value: function componentDidMount() {
                            var _this_props = this.props, _$e = _this_props.id;
                            Ae() && (this.node = document.createElement("div"), this.node.id = _$e, document.body.appendChild(this.node), pt || this.renderReact15());
                        }
                    },
                    {
                        key: "componentDidUpdate",
                        value: function componentDidUpdate() {
                            Ae() && (pt || this.renderReact15());
                        }
                    },
                    {
                        key: "componentWillUnmount",
                        value: function componentWillUnmount() {
                            !Ae() || !this.node || (pt || En(this.node), this.node.parentNode === document.body && (document.body.removeChild(this.node), this.node = null));
                        }
                    },
                    {
                        key: "renderReact15",
                        value: function renderReact15() {
                            if (!Ae()) return;
                            var _this_props = this.props, _$e = _this_props.children;
                            this.node && On(this, _$e, this.node);
                        }
                    },
                    {
                        key: "renderReact16",
                        value: function renderReact16() {
                            if (!Ae() || !pt) return null;
                            var _this_props = this.props, _$e = _this_props.children;
                            return this.node ? it(_$e, this.node) : null;
                        }
                    },
                    {
                        key: "render",
                        value: function render() {
                            return pt ? this.renderReact16() : null;
                        }
                    }
                ]);
                return cs;
            }(_e), us = function us(e, t) {
                "use strict";
                var _this = this;
                _class_call_check(this, us);
                if (L(this, "element"), L(this, "options"), L(this, "canBeTabbed", function(n) {
                    var r = n.tabIndex;
                    return r === null || r < 0 ? !1 : _this.canHaveFocus(n);
                }), L(this, "canHaveFocus", function(n) {
                    var r = /input|select|textarea|button|object/, i = n.nodeName.toLowerCase();
                    return (r.test(i) && !n.getAttribute("disabled") || i === "a" && !!n.getAttribute("href")) && _this.isVisible(n);
                }), L(this, "findValidTabElements", function() {
                    return [].slice.call(_this.element.querySelectorAll("*"), 0).filter(_this.canBeTabbed);
                }), L(this, "handleKeyDown", function(n) {
                    var _this_options = _this.options, tmp = _this_options.code, r = tmp === void 0 ? "Tab" : tmp;
                    n.code === r && _this.interceptTab(n);
                }), L(this, "interceptTab", function(n) {
                    n.preventDefault();
                    var r = _this.findValidTabElements(), i = n.shiftKey;
                    if (!r.length) return;
                    var o = document.activeElement ? r.indexOf(document.activeElement) : 0;
                    o === -1 || !i && o + 1 === r.length ? o = 0 : i && o === 0 ? o = r.length - 1 : o += i ? -1 : 1, r[o].focus();
                }), L(this, "isHidden", function(n) {
                    var r = n.offsetWidth <= 0 && n.offsetHeight <= 0, i = window.getComputedStyle(n);
                    return r && !n.innerHTML ? !0 : r && i.getPropertyValue("overflow") !== "visible" || i.getPropertyValue("display") === "none";
                }), L(this, "isVisible", function(n) {
                    var r = n;
                    for(; r;)if (_instanceof(r, HTMLElement)) {
                        if (r === document.body) break;
                        if (_this.isHidden(r)) return !1;
                        r = r.parentNode;
                    }
                    return !0;
                }), L(this, "removeScope", function() {
                    window.removeEventListener("keydown", _this.handleKeyDown);
                }), L(this, "checkFocus", function(n) {
                    document.activeElement !== n && (n.focus(), window.requestAnimationFrame(function() {
                        return _this.checkFocus(n);
                    }));
                }), L(this, "setFocus", function() {
                    var _this_options = _this.options, n = _this_options.selector;
                    if (!n) return;
                    var r = _this.element.querySelector(n);
                    r && window.requestAnimationFrame(function() {
                        return _this.checkFocus(r);
                    });
                }), !_instanceof(e, HTMLElement)) throw new TypeError("Invalid parameter: element must be an HTMLElement");
                this.element = e, this.options = t, window.addEventListener("keydown", this.handleKeyDown, !1), this.setFocus();
            }, ps = /*#__PURE__*/ function(_e) {
                "use strict";
                _inherits(ps, _e);
                function ps(e) {
                    _class_call_check(this, ps);
                    var _this;
                    if (_this = _call_super(this, ps, [
                        e
                    ]), L(_this, "beacon", null), L(_this, "setBeaconRef", function(r) {
                        _this.beacon = r;
                    }), e.beaconComponent) return _possible_constructor_return(_this);
                    var t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
                    n.id = "joyride-beacon-animation", e.nonce && n.setAttribute("nonce", e.nonce), n.appendChild(document.createTextNode("\n        @keyframes joyride-beacon-inner {\n          20% {\n            opacity: 0.9;\n          }\n        \n          90% {\n            opacity: 0.7;\n          }\n        }\n        \n        @keyframes joyride-beacon-outer {\n          0% {\n            transform: scale(1);\n          }\n        \n          45% {\n            opacity: 0.7;\n            transform: scale(0.75);\n          }\n        \n          100% {\n            opacity: 0.9;\n            transform: scale(1);\n          }\n        }\n      ")), t.appendChild(n);
                    return _this;
                }
                _create_class(ps, [
                    {
                        key: "componentDidMount",
                        value: function componentDidMount() {
                            var _this = this;
                            var _this_props = this.props, _$e = _this_props.shouldFocus;
                            j.domElement(this.beacon) || console.warn("beacon is not a valid DOM element"), setTimeout(function() {
                                j.domElement(_this.beacon) && _$e && _this.beacon.focus();
                            }, 0);
                        }
                    },
                    {
                        key: "componentWillUnmount",
                        value: function componentWillUnmount() {
                            var _$e = document.getElementById("joyride-beacon-animation");
                            (_$e === null || _$e === void 0 ? void 0 : _$e.parentNode) && _$e.parentNode.removeChild(_$e);
                        }
                    },
                    {
                        key: "render",
                        value: function render() {
                            var _this_props = this.props, _$e = _this_props.beaconComponent, t = _this_props.continuous, n = _this_props.index, r = _this_props.isLastStep, i = _this_props.locale, o = _this_props.onClickOrHover, a = _this_props.size, s = _this_props.step, l = _this_props.styles, c = j.string(i.open) ? i.open : (0, Da.default)(i.open), p = {
                                "aria-label": c,
                                onClick: o,
                                onMouseEnter: o,
                                ref: this.setBeaconRef,
                                title: c
                            }, u;
                            return _$e ? u = V(_$e, _object_spread({
                                continuous: t,
                                index: n,
                                isLastStep: r,
                                size: a,
                                step: s
                            }, p)) : u = V("button", _object_spread({
                                key: "JoyrideBeacon",
                                className: "react-joyride__beacon",
                                "data-test-id": "button-beacon",
                                style: l.beacon,
                                type: "button"
                            }, p), V("span", {
                                style: l.beaconInner
                            }), V("span", {
                                style: l.beaconOuter
                            })), u;
                        }
                    }
                ]);
                return ps;
            }(_e);
            ds = fs;
            ys = hs, ms = /*#__PURE__*/ function(_e) {
                "use strict";
                _inherits(ms, _e);
                function ms() {
                    _class_call_check(this, ms);
                    var _this;
                    _this = _call_super(this, ms, arguments), L(_this, "handleClickBack", function(e) {
                        e.preventDefault();
                        var _this_props = _this.props, t = _this_props.helpers;
                        t.prev();
                    }), L(_this, "handleClickClose", function(e) {
                        e.preventDefault();
                        var _this_props = _this.props, t = _this_props.helpers;
                        t.close("button_close");
                    }), L(_this, "handleClickPrimary", function(e) {
                        e.preventDefault();
                        var _this_props = _this.props, t = _this_props.continuous, n = _this_props.helpers;
                        if (!t) {
                            n.close("button_primary");
                            return;
                        }
                        n.next();
                    }), L(_this, "handleClickSkip", function(e) {
                        e.preventDefault();
                        var _this_props = _this.props, t = _this_props.helpers;
                        t.skip();
                    }), L(_this, "getElementsProps", function() {
                        var _this_props = _this.props, _$e = _this_props.continuous, t = _this_props.isLastStep, n = _this_props.setTooltipRef, r = _this_props.step, i = ke(r.locale.back), o = ke(r.locale.close), a = ke(r.locale.last), s = ke(r.locale.next), l = ke(r.locale.skip), c = _$e ? s : o;
                        return t && (c = a), {
                            backProps: {
                                "aria-label": i,
                                "data-action": "back",
                                onClick: _this.handleClickBack,
                                role: "button",
                                title: i
                            },
                            closeProps: {
                                "aria-label": o,
                                "data-action": "close",
                                onClick: _this.handleClickClose,
                                role: "button",
                                title: o
                            },
                            primaryProps: {
                                "aria-label": c,
                                "data-action": "primary",
                                onClick: _this.handleClickPrimary,
                                role: "button",
                                title: c
                            },
                            skipProps: {
                                "aria-label": l,
                                "data-action": "skip",
                                onClick: _this.handleClickSkip,
                                role: "button",
                                title: l
                            },
                            tooltipProps: {
                                "aria-modal": !0,
                                ref: n,
                                role: "alertdialog"
                            }
                        };
                    });
                    return _this;
                }
                _create_class(ms, [
                    {
                        key: "render",
                        value: function render() {
                            var _this_props = this.props, _$e = _this_props.continuous, t = _this_props.index, n = _this_props.isLastStep, r = _this_props.setTooltipRef, i = _this_props.size, o = _this_props.step, a = o.beaconComponent, s = o.tooltipComponent, l = _object_without_properties(o, [
                                "beaconComponent",
                                "tooltipComponent"
                            ]), c;
                            if (s) {
                                var p = _object_spread_props(_object_spread({}, this.getElementsProps()), {
                                    continuous: _$e,
                                    index: t,
                                    isLastStep: n,
                                    size: i,
                                    step: l,
                                    setTooltipRef: r
                                });
                                c = V(s, _object_spread({}, p));
                            } else c = V(ys, _object_spread_props(_object_spread({}, this.getElementsProps()), {
                                continuous: _$e,
                                index: t,
                                isLastStep: n,
                                size: i,
                                step: o
                            }));
                            return c;
                        }
                    }
                ]);
                return ms;
            }(_e), gs = /*#__PURE__*/ function(_e) {
                "use strict";
                _inherits(gs, _e);
                function gs() {
                    _class_call_check(this, gs);
                    var _this;
                    _this = _call_super(this, gs, arguments), L(_this, "scope", null), L(_this, "tooltip", null), L(_this, "handleClickHoverBeacon", function(e) {
                        var _this_props = _this.props, t = _this_props.step, n = _this_props.store;
                        e.type === "mouseenter" && t.event !== "hover" || n.update({
                            lifecycle: W.TOOLTIP
                        });
                    }), L(_this, "setTooltipRef", function(e) {
                        _this.tooltip = e;
                    }), L(_this, "setPopper", function(e, t) {
                        var n;
                        var _this_props = _this.props, r = _this_props.action, i = _this_props.lifecycle, o = _this_props.step, a = _this_props.store;
                        t === "wrapper" ? a.setPopper("beacon", e) : a.setPopper("tooltip", e), a.getPopper("beacon") && a.getPopper("tooltip") && i === W.INIT && a.update({
                            action: r,
                            lifecycle: W.READY
                        }), (n = o.floaterProps) != null && n.getPopper && o.floaterProps.getPopper(e, t);
                    }), L(_this, "renderTooltip", function(e) {
                        var _this_props = _this.props, t = _this_props.continuous, n = _this_props.helpers, r = _this_props.index, i = _this_props.size, o = _this_props.step;
                        return V(ms, _object_spread({
                            continuous: t,
                            helpers: n,
                            index: r,
                            isLastStep: r + 1 === i,
                            setTooltipRef: _this.setTooltipRef,
                            size: i,
                            step: o
                        }, e));
                    });
                    return _this;
                }
                _create_class(gs, [
                    {
                        key: "componentDidMount",
                        value: function componentDidMount() {
                            var _this_props = this.props, _$e = _this_props.debug, t = _this_props.index;
                            Me({
                                title: "step:".concat(t),
                                data: [
                                    {
                                        key: "props",
                                        value: this.props
                                    }
                                ],
                                debug: _$e
                            });
                        }
                    },
                    {
                        key: "componentDidUpdate",
                        value: function componentDidUpdate(e) {
                            var t;
                            var _this_props = this.props, n = _this_props.action, r = _this_props.callback, i = _this_props.continuous, o = _this_props.controlled, a = _this_props.debug, s = _this_props.helpers, l = _this_props.index, c = _this_props.lifecycle, p = _this_props.status, u = _this_props.step, f = _this_props.store, _xt = xt(e, this.props), b = _xt.changed, m = _xt.changedFrom, T = s.info(), F = i && n !== $.CLOSE && (l > 0 || n === $.PREV), I = b("action") || b("index") || b("lifecycle") || b("status"), x = m("lifecycle", [
                                W.TOOLTIP,
                                W.INIT
                            ], W.INIT), v = b("action", [
                                $.NEXT,
                                $.PREV,
                                $.SKIP,
                                $.CLOSE
                            ]), P = o && l === e.index;
                            if (v && (x || P) && r(_object_spread_props(_object_spread({}, T), {
                                index: e.index,
                                lifecycle: W.COMPLETE,
                                step: e.step,
                                type: ve.STEP_AFTER
                            })), u.placement === "center" && p === Y.RUNNING && b("index") && n !== $.START && c === W.INIT && f.update({
                                lifecycle: W.READY
                            }), I) {
                                var R = Ne(u.target), K = !!R;
                                K && Ga(R) ? (m("status", Y.READY, Y.RUNNING) || m("lifecycle", W.INIT, W.READY)) && r(_object_spread_props(_object_spread({}, T), {
                                    step: u,
                                    type: ve.STEP_BEFORE
                                })) : (console.warn(K ? "Target not visible" : "Target not mounted", u), r(_object_spread_props(_object_spread({}, T), {
                                    type: ve.TARGET_NOT_FOUND,
                                    step: u
                                })), o || f.update({
                                    index: l + (n === $.PREV ? -1 : 1)
                                }));
                            }
                            m("lifecycle", W.INIT, W.READY) && f.update({
                                lifecycle: lr(u) || F ? W.TOOLTIP : W.BEACON
                            }), b("index") && Me({
                                title: "step:".concat(c),
                                data: [
                                    {
                                        key: "props",
                                        value: this.props
                                    }
                                ],
                                debug: a
                            }), b("lifecycle", W.BEACON) && r(_object_spread_props(_object_spread({}, T), {
                                step: u,
                                type: ve.BEACON
                            })), b("lifecycle", W.TOOLTIP) && (r(_object_spread_props(_object_spread({}, T), {
                                step: u,
                                type: ve.TOOLTIP
                            })), this.tooltip && (this.scope = new us(this.tooltip, {
                                selector: "[data-action=primary]"
                            }), this.scope.setFocus())), m("lifecycle", [
                                W.TOOLTIP,
                                W.INIT
                            ], W.INIT) && ((t = this.scope) == null || t.removeScope(), f.cleanupPoppers());
                        }
                    },
                    {
                        key: "componentWillUnmount",
                        value: function componentWillUnmount() {
                            var _$e;
                            (_$e = this.scope) == null || _$e.removeScope();
                        }
                    },
                    {
                        key: "open",
                        get: function get() {
                            var _this_props = this.props, _$e = _this_props.lifecycle, t = _this_props.step;
                            return lr(t) || _$e === W.TOOLTIP;
                        }
                    },
                    {
                        key: "render",
                        value: function render() {
                            var _this_props = this.props, _$e = _this_props.continuous, t = _this_props.debug, n = _this_props.index, r = _this_props.nonce, i = _this_props.shouldScroll, o = _this_props.size, a = _this_props.step, s = Ne(a.target);
                            return !Qr(a) || !j.domElement(s) ? null : V("div", {
                                key: "JoyrideStep-".concat(n),
                                className: "react-joyride__step"
                            }, V(fn, _object_spread_props(_object_spread({}, a.floaterProps), {
                                component: this.renderTooltip,
                                debug: t,
                                getPopper: this.setPopper,
                                id: "react-joyride-step-".concat(n),
                                open: this.open,
                                placement: a.placement,
                                target: a.target
                            }), V(ps, {
                                beaconComponent: a.beaconComponent,
                                continuous: _$e,
                                index: n,
                                isLastStep: n + 1 === o,
                                locale: a.locale,
                                nonce: r,
                                onClickOrHover: this.handleClickHoverBeacon,
                                shouldFocus: i,
                                size: o,
                                step: a,
                                styles: a.styles
                            })));
                        }
                    }
                ]);
                return gs;
            }(_e), eo = /*#__PURE__*/ function(_e) {
                "use strict";
                _inherits(eo, _e);
                function eo(e) {
                    _class_call_check(this, eo);
                    var _this;
                    _this = _call_super(this, eo, [
                        e
                    ]), L(_this, "helpers"), L(_this, "store"), L(_this, "callback", function(a) {
                        var _this_props = _this.props, s = _this_props.callback;
                        j.function(s) && s(a);
                    }), L(_this, "handleKeyboard", function(a) {
                        var _this_state = _this.state, s = _this_state.index, l = _this_state.lifecycle, _this_props = _this.props, c = _this_props.steps, p = c[s];
                        l === W.TOOLTIP && a.code === "Escape" && p && !p.disableCloseOnEsc && _this.store.close("keyboard");
                    }), L(_this, "handleClickOverlay", function() {
                        var _this_state = _this.state, a = _this_state.index, _this_props = _this.props, s = _this_props.steps;
                        qe(_this.props, s[a]).disableOverlayClose || _this.helpers.close("overlay");
                    }), L(_this, "syncState", function(a) {
                        _this.setState(a);
                    });
                    var t = e.debug, n = e.getHelpers, r = e.run, i = e.stepIndex;
                    _this.store = is(_object_spread_props(_object_spread({}, e), {
                        controlled: r && j.number(i)
                    })), _this.helpers = _this.store.getHelpers();
                    var _this_store = _this.store, o = _this_store.addListener;
                    Me({
                        title: "init",
                        data: [
                            {
                                key: "props",
                                value: _this.props
                            },
                            {
                                key: "state",
                                value: _this.state
                            }
                        ],
                        debug: t
                    }), o(_this.syncState), n && n(_this.helpers), _this.state = _this.store.getState();
                    return _this;
                }
                _create_class(eo, [
                    {
                        key: "componentDidMount",
                        value: function componentDidMount() {
                            if (!Ae()) return;
                            var _this_props = this.props, _$e = _this_props.debug, t = _this_props.disableCloseOnEsc, n = _this_props.run, r = _this_props.steps, _this_store = this.store, i = _this_store.start;
                            pr(r, _$e) && n && i(), t || document.body.addEventListener("keydown", this.handleKeyboard, {
                                passive: !0
                            });
                        }
                    },
                    {
                        key: "componentDidUpdate",
                        value: function componentDidUpdate(e, t) {
                            if (!Ae()) return;
                            var _this_state = this.state, n = _this_state.action, r = _this_state.controlled, i = _this_state.index, o = _this_state.lifecycle, a = _this_state.status, _this_props = this.props, s = _this_props.debug, l = _this_props.run, c = _this_props.stepIndex, p = _this_props.steps, u = e.stepIndex, f = e.steps, _this_store = this.store, b = _this_store.reset, m = _this_store.setSteps, T = _this_store.start, F = _this_store.stop, I = _this_store.update, _xt = xt(e, this.props), x = _xt.changed, _xt1 = xt(t, this.state), v = _xt1.changed, P = _xt1.changedFrom, R = qe(this.props, p[i]), K = !ae(f, p), B = j.number(c) && x("stepIndex"), te = Ne(R.target);
                            if (K && (pr(p, s) ? m(p) : console.warn("Steps are not valid", p)), x("run") && (l ? T(c) : F()), B) {
                                var se = j.number(u) && u < c ? $.NEXT : $.PREV;
                                n === $.STOP && (se = $.START), [
                                    Y.FINISHED,
                                    Y.SKIPPED
                                ].includes(a) || I({
                                    action: n === $.CLOSE ? $.CLOSE : se,
                                    index: c,
                                    lifecycle: W.INIT
                                });
                            }
                            !r && a === Y.RUNNING && i === 0 && !te && (this.store.update({
                                index: i + 1
                            }), this.callback(_object_spread_props(_object_spread({}, this.state), {
                                type: ve.TARGET_NOT_FOUND,
                                step: R
                            })));
                            var J = _object_spread_props(_object_spread({}, this.state), {
                                index: i,
                                step: R
                            });
                            if (v("action", [
                                $.NEXT,
                                $.PREV,
                                $.SKIP,
                                $.CLOSE
                            ]) && v("status", Y.PAUSED)) {
                                var se1 = qe(this.props, p[t.index]);
                                this.callback(_object_spread_props(_object_spread({}, J), {
                                    index: t.index,
                                    lifecycle: W.COMPLETE,
                                    step: se1,
                                    type: ve.STEP_AFTER
                                }));
                            }
                            if (v("status", [
                                Y.FINISHED,
                                Y.SKIPPED
                            ])) {
                                var se2 = qe(this.props, p[t.index]);
                                r || this.callback(_object_spread_props(_object_spread({}, J), {
                                    index: t.index,
                                    lifecycle: W.COMPLETE,
                                    step: se2,
                                    type: ve.STEP_AFTER
                                })), this.callback(_object_spread_props(_object_spread({}, J), {
                                    type: ve.TOUR_END,
                                    step: se2,
                                    index: t.index
                                })), b();
                            } else P("status", [
                                Y.IDLE,
                                Y.READY
                            ], Y.RUNNING) ? this.callback(_object_spread_props(_object_spread({}, J), {
                                type: ve.TOUR_START
                            })) : (v("status") || v("action", $.RESET)) && this.callback(_object_spread_props(_object_spread({}, J), {
                                type: ve.TOUR_STATUS
                            }));
                            this.scrollToStep(t), R.placement === "center" && a === Y.RUNNING && o === W.INIT && this.store.update({
                                lifecycle: W.READY
                            });
                        }
                    },
                    {
                        key: "componentWillUnmount",
                        value: function componentWillUnmount() {
                            var _this_props = this.props, _$e = _this_props.disableCloseOnEsc;
                            _$e || document.body.removeEventListener("keydown", this.handleKeyboard);
                        }
                    },
                    {
                        key: "scrollToStep",
                        value: function scrollToStep(e) {
                            var _this = this;
                            var _this_state = this.state, t = _this_state.index, n = _this_state.lifecycle, r = _this_state.status, _this_props = this.props, i = _this_props.debug, tmp = _this_props.disableScrollParentFix, o = tmp === void 0 ? !1 : tmp, a = _this_props.scrollDuration, tmp1 = _this_props.scrollOffset, s = tmp1 === void 0 ? 20 : tmp1, tmp2 = _this_props.scrollToFirstStep, l = tmp2 === void 0 ? !1 : tmp2, c = _this_props.steps, p = qe(this.props, c[t]), u = Ne(p.target), f = Xa({
                                isFirstStep: t === 0,
                                lifecycle: n,
                                previousLifecycle: e.lifecycle,
                                scrollToFirstStep: l,
                                step: p,
                                target: u
                            });
                            if (r === Y.RUNNING && f) {
                                var b = Ot(u, o), m = Lt(u, o), T = Math.floor(Ya(u, s, o)) || 0;
                                Me({
                                    title: "scrollToStep",
                                    data: [
                                        {
                                            key: "index",
                                            value: t
                                        },
                                        {
                                            key: "lifecycle",
                                            value: n
                                        },
                                        {
                                            key: "status",
                                            value: r
                                        }
                                    ],
                                    debug: i
                                });
                                var F = this.store.getPopper("beacon"), I = this.store.getPopper("tooltip");
                                if (n === W.BEACON && F) {
                                    var x = F.offsets, v = F.placement;
                                    ![
                                        "bottom"
                                    ].includes(v) && !b && (T = Math.floor(x.popper.top - s));
                                } else if (n === W.TOOLTIP && I) {
                                    var x1 = I.flipped, v1 = I.offsets, P = I.placement;
                                    [
                                        "top",
                                        "right",
                                        "left"
                                    ].includes(P) && !x1 && !b ? T = Math.floor(v1.popper.top - s) : T -= p.spotlightPadding;
                                }
                                T = T >= 0 ? T : 0, r === Y.RUNNING && qa(T, {
                                    element: m,
                                    duration: a
                                }).then(function() {
                                    setTimeout(function() {
                                        var x;
                                        (x = _this.store.getPopper("tooltip")) == null || x.instance.update();
                                    }, 10);
                                });
                            }
                        }
                    },
                    {
                        key: "render",
                        value: function render() {
                            if (!Ae()) return null;
                            var _this_state = this.state, _$e = _this_state.index, t = _this_state.lifecycle, n = _this_state.status, _this_props = this.props, tmp = _this_props.continuous, r = tmp === void 0 ? !1 : tmp, tmp1 = _this_props.debug, i = tmp1 === void 0 ? !1 : tmp1, o = _this_props.nonce, tmp2 = _this_props.scrollToFirstStep, a = tmp2 === void 0 ? !1 : tmp2, s = _this_props.steps, l = n === Y.RUNNING, c = {};
                            if (l && s[_$e]) {
                                var p = qe(this.props, s[_$e]);
                                c.step = V(gs, _object_spread_props(_object_spread({}, this.state), {
                                    callback: this.callback,
                                    continuous: r,
                                    debug: i,
                                    helpers: this.helpers,
                                    nonce: o,
                                    shouldScroll: !p.disableScrolling && (_$e !== 0 || a),
                                    step: p,
                                    store: this.store
                                })), c.overlay = V(cs, {
                                    id: "react-joyride-portal"
                                }, V(ls, _object_spread_props(_object_spread({}, p), {
                                    continuous: r,
                                    debug: i,
                                    lifecycle: t,
                                    onClickOverlay: this.handleClickOverlay
                                })));
                            }
                            return V("div", {
                                className: "react-joyride"
                            }, c.step, c.overlay);
                        }
                    }
                ]);
                return eo;
            }(_e);
            L(eo, "defaultProps", es);
            bs = eo, vs = re.button(_templateObject(), function(param) {
                var _$e = param.theme, t = param.variant;
                return t === "primary" ? _$e.color.secondary : t === "secondary" ? _$e.color.lighter : t === "outline" ? "transparent" : t === "white" ? _$e.color.lightest : _$e.color.secondary;
            }, function(param) {
                var _$e = param.theme, t = param.variant;
                return t === "primary" ? _$e.color.lightest : t === "secondary" || t === "outline" ? _$e.darkest : t === "white" ? _$e.color.secondary : _$e.color.lightest;
            }, function(param) {
                var _$e = param.variant;
                return _$e === "secondary" || _$e === "outline" ? "#D9E8F2 0 0 0 1px inset" : "none";
            }, function(param) {
                var _$e = param.theme;
                return _$e.typography.fonts.base;
            }, function(param) {
                var _$e = param.theme, t = param.variant;
                return t === "primary" ? "#0b94eb" : t === "secondary" ? "#eef4f9" : t === "outline" ? "transparent" : t === "white" ? _$e.color.lightest : "#0b94eb";
            }, function(param) {
                var _$e = param.theme, t = param.variant;
                return t === "primary" ? _$e.color.lightest : t === "secondary" || t === "outline" ? _$e.darkest : t === "white" ? _$e.color.darkest : _$e.color.lightest;
            }, function(param) {
                var _$e = param.variant;
                return _$e === "primary" ? "inset 0 0 0 1px rgba(0, 0, 0, 0.2)" : _$e === "secondary" || _$e === "outline" ? "inset 0 0 0 1px #0b94eb" : _$e === "white" ? "none" : "inset 0 0 0 2px rgba(0, 0, 0, 0.1)";
            }), Es = Ut(function(_param, i) {
                var _$e = _param.children, t = _param.onClick, tmp = _param.variant, n = tmp === void 0 ? "primary" : tmp, r = _object_without_properties(_param, [
                    "children",
                    "onClick",
                    "variant"
                ]);
                return E.createElement(vs, _object_spread({
                    ref: i,
                    onClick: t,
                    variant: n
                }, r), _$e);
            }), Os = re.div(_templateObject1()), ws = re.div(_templateObject2()), Ss = re.div(_templateObject3()), Ts = re.div(_templateObject4()), Is = re.p(_templateObject5()), Cs = re.div(_templateObject6()), Ps = re.span(_templateObject7()), Rs = function(param) {
                var _$e = param.index, t = param.size, n = param.step, r = param.closeProps, i = param.primaryProps, o = param.tooltipProps;
                var _n_styles;
                return ce(function() {
                    var a = document.createElement("style");
                    return a.id = "#sb-onboarding-arrow-style", a.innerHTML = "\n      .__floater__arrow { container-type: size; }\n      .__floater__arrow span { background: ".concat(It.secondary, "; }\n      .__floater__arrow span::before, .__floater__arrow span::after {\n        content: '';\n        display: block;\n        width: 2px;\n        height: 2px;\n        background: ").concat(It.secondary, ";\n        box-shadow: 0 0 0 2px ").concat(It.secondary, ";\n        border-radius: 3px;\n        flex: 0 0 2px;\n      }\n      @container (min-height: 1px) {\n        .__floater__arrow span { flex-direction: column; }\n      }\n    "), document.head.appendChild(a), function() {
                        var s = document.querySelector("#sb-onboarding-arrow-style");
                        s && s.remove();
                    };
                }, []), E.createElement(Os, _object_spread_props(_object_spread({}, o), {
                    style: (_n_styles = n.styles) === null || _n_styles === void 0 ? void 0 : _n_styles.tooltip
                }), E.createElement(ws, null, E.createElement(Ss, null, n.title && E.createElement(Ts, null, n.title), E.createElement(Cn, _object_spread_props(_object_spread({}, r), {
                    onClick: r.onClick,
                    variant: "solid"
                }), E.createElement(jn, null))), E.createElement(Is, null, n.content)), E.createElement(Cs, {
                    id: "buttonNext"
                }, E.createElement(Ps, null, _$e + 1, " of ", t), !n.hideNextButton && E.createElement(Es, _object_spread_props(_object_spread({}, i), {
                    onClick: n.onNextButtonClick || i.onClick,
                    variant: "white"
                }), _$e + 1 === t ? "Done" : "Next")));
            };
            _s = at({
                from: {
                    opacity: 0
                },
                to: {
                    opacity: 1
                }
            }), to = at({
                from: {
                    transform: "translate(0, 20px)",
                    opacity: 0
                },
                to: {
                    transform: "translate(0, 0)",
                    opacity: 1
                }
            }), As = at({
                from: {
                    opacity: 0,
                    transform: "scale(0.8)"
                },
                to: {
                    opacity: 1,
                    transform: "scale(1)"
                }
            }), ks = at({
                "0%": {
                    transform: "rotate(0deg)"
                },
                "100%": {
                    transform: "rotate(360deg)"
                }
            }), Ns = re.div(function(param) {
                var _$e = param.visible;
                return {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    opacity: _$e ? 1 : 0,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1e3,
                    transition: "opacity 1s 0.5s"
                };
            }), js = re.div({
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                animation: "".concat(_s, " 2s"),
                background: "\n    radial-gradient(90% 90%, #ff4785 0%, #db5698 30%, #1ea7fdcc 100%),\n    radial-gradient(circle, #ff4785 0%, transparent 80%),\n    radial-gradient(circle at 30% 40%, #fc521f99 0%, #fc521f66 20%, transparent 40%),\n    radial-gradient(circle at 75% 75%, #fc521f99 0%, #fc521f77 18%, transparent 30%)",
                "&::before": {
                    opacity: .5,
                    background: "\n      radial-gradient(circle at 30% 40%, #fc521f99 0%, #fc521f66 10%, transparent 20%),\n      radial-gradient(circle at 75% 75%, #fc521f99 0%, #fc521f77 8%, transparent 20%)",
                    content: '""',
                    position: "absolute",
                    top: "-50vw",
                    left: "-50vh",
                    transform: "translate(-50%, -50%)",
                    width: "calc(100vw + 100vh)",
                    height: "calc(100vw + 100vh)",
                    animation: "".concat(ks, " 12s linear infinite")
                }
            }), Ms = re.div(function(param) {
                var _$e = param.visible;
                return {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    textAlign: "center",
                    width: "90vw",
                    minWidth: 290,
                    maxWidth: 410,
                    opacity: _$e ? 1 : 0,
                    transition: "opacity 0.5s",
                    h1: {
                        fontSize: 45,
                        fontWeight: "bold",
                        animation: "".concat(to, " 1.5s 1s backwards")
                    }
                };
            }), Ls = re.div({
                display: "flex",
                marginTop: 40,
                div: {
                    display: "flex",
                    flexBasis: "33.33%",
                    flexDirection: "column",
                    alignItems: "center",
                    animation: "".concat(to, " 1s backwards"),
                    "&:nth-child(1)": {
                        animationDelay: "2s"
                    },
                    "&:nth-child(2)": {
                        animationDelay: "2.5s"
                    },
                    "&:nth-child(3)": {
                        animationDelay: "3s"
                    }
                },
                svg: {
                    marginBottom: 10
                }
            }), Ds = re.button({
                display: "inline-flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 40,
                width: 48,
                height: 48,
                padding: 0,
                borderRadius: "50%",
                border: 0,
                outline: "none",
                background: "rgba(255, 255, 255, 0.3)",
                cursor: "pointer",
                transition: "background 0.2s",
                animation: "".concat(As, " 1.5s 4s backwards"),
                "&:hover, &:focus": {
                    background: "rgba(255, 255, 255, 0.4)"
                }
            }), Fs = re(Nn)({
                width: 30,
                color: "white"
            }), dr = re.svg(function(param) {
                var _$e = param.progress;
                return {
                    position: "absolute",
                    top: -1,
                    left: -1,
                    width: "50px!important",
                    height: "50px!important",
                    transform: "rotate(-90deg)",
                    color: "white",
                    circle: {
                        r: "24",
                        cx: "25",
                        cy: "25",
                        fill: "transparent",
                        stroke: _$e ? "currentColor" : "transparent",
                        strokeWidth: "1",
                        strokeLinecap: "round",
                        strokeDasharray: Math.PI * 48
                    }
                };
            }), Bs = function(param) {
                var _$e = param.onDismiss, tmp = param.duration, t = tmp === void 0 ? 6e3 : tmp;
                var _ue = _sliced_to_array(ue(-4e5 / t), 2), n = _ue[0], r = _ue[1], _ue1 = _sliced_to_array(ue(!0), 2), i = _ue1[0], o = _ue1[1], a = n >= 100, s = ze(function() {
                    o(!1);
                    var l = setTimeout(_$e, 1500);
                    return function() {
                        return clearTimeout(l);
                    };
                }, [
                    _$e
                ]);
                return ce(function() {
                    if (!t) return;
                    var l = 1e3 / 50, c = 100 / (t / l), p = setInterval(function() {
                        return r(function(u) {
                            return u + c;
                        });
                    }, l);
                    return function() {
                        return clearInterval(p);
                    };
                }, [
                    t
                ]), ce(function() {
                    a && s();
                }, [
                    a,
                    s
                ]), E.createElement(Ns, {
                    visible: i
                }, E.createElement(js, null), E.createElement(Ms, {
                    visible: i
                }, E.createElement("h1", null, "Meet your new frontend workshop"), E.createElement(Ls, null, E.createElement("div", null, E.createElement("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "33",
                    height: "32"
                }, E.createElement("path", {
                    d: "M4.06 0H32.5v28.44h-3.56V32H.5V3.56h3.56V0Zm21.33 7.11H4.06v21.33h21.33V7.11Z",
                    fill: "currentColor"
                })), "Development"), E.createElement("div", null, E.createElement("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "32",
                    height: "32"
                }, E.createElement("path", {
                    d: "M15.95 32c-1.85 0-3.1-1.55-3.1-3.54 0-1.1.45-2.78 1.35-5.03.9-2.3 1.35-4.51 1.35-6.81a22.21 22.21 0 0 0-5.1 3.67c-2.5 2.47-4.95 4.9-7.55 4.9-1.6 0-2.9-1.1-2.9-2.43 0-1.46 1.35-2.91 4.3-3.62 1.45-.36 3.1-.75 4.95-1.06 1.8-.31 3.8-1.02 5.9-2.08a23.77 23.77 0 0 0-6.1-2.12C5.3 13.18 2.3 12.6 1 11.28.35 10.6 0 9.9 0 9.14 0 7.82 1.2 6.8 2.95 6.8c2.65 0 5.75 3.1 7.95 5.3 1.1 1.1 2.65 2.21 4.65 3.27v-.57c0-1.77-.15-3.23-.55-4.3-.8-2.11-2.05-5.43-2.05-6.97 0-2.04 1.3-3.54 3.1-3.54 1.75 0 3.1 1.41 3.1 3.54 0 1.06-.45 2.78-1.35 5.12-.9 2.35-1.35 4.6-1.35 6.72 2.85-1.59 2.5-1.41 4.95-3.5 2.35-2.29 4-3.7 4.9-4.23.95-.58 1.9-.84 2.9-.84 1.6 0 2.8.97 2.8 2.34 0 1.5-1.25 2.78-4.15 3.62-1.4.4-3.05.75-4.9 1.1-1.9.36-3.9 1.07-6.1 2.13a23.3 23.3 0 0 0 5.95 2.08c3.65.7 6.75 1.32 8.15 2.6.7.67 1.05 1.33 1.05 2.08 0 1.33-1.2 2.43-2.95 2.43-2.95 0-6.75-4.15-8.2-5.61-.7-.7-2.2-1.72-4.4-2.96v.57c0 1.9.45 4.03 1.3 6.32.85 2.3 1.3 3.94 1.3 4.95 0 2.08-1.35 3.54-3.1 3.54Z",
                    fill: "currentColor"
                })), "Testing"), E.createElement("div", null, E.createElement("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "33",
                    height: "32"
                }, E.createElement("path", {
                    d: "M.5 16a16 16 0 1 1 32 0 16 16 0 0 1-32 0Zm16 12.44A12.44 12.44 0 0 1 4.3 13.53a8 8 0 1 0 9.73-9.73 12.44 12.44 0 1 1 2.47 24.64ZM12.06 16a4.44 4.44 0 1 1 0-8.89 4.44 4.44 0 0 1 0 8.89Z",
                    fill: "currentColor",
                    fillRule: "evenodd"
                })), "Documentation")), E.createElement(Ds, {
                    onClick: s
                }, E.createElement(Fs, null), E.createElement(dr, {
                    xmlns: "http://www.w3.org/2000/svg"
                }, E.createElement("circle", null)), E.createElement(dr, {
                    xmlns: "http://www.w3.org/2000/svg",
                    progress: !0
                }, E.createElement("circle", {
                    strokeDashoffset: Math.PI * 48 * (1 - Math.max(0, Math.min(n, 100)) / 100)
                })))));
            }, Ws = re.span(function(param) {
                var _$e = param.theme;
                return {
                    display: "inline-flex",
                    borderRadius: 3,
                    padding: "0 5px",
                    marginBottom: -2,
                    opacity: .8,
                    fontFamily: _$e.typography.fonts.mono,
                    fontSize: 11,
                    border: _$e.base === "dark" ? _$e.color.darkest : _$e.color.lightest,
                    color: _$e.base === "dark" ? _$e.color.lightest : _$e.color.darkest,
                    backgroundColor: _$e.base === "dark" ? "black" : _$e.color.light,
                    boxSizing: "border-box",
                    lineHeight: "17px"
                };
            }), Us = re.div(function(param) {
                var _$e = param.theme;
                return {
                    background: _$e.background.content,
                    borderRadius: 3,
                    marginTop: 15,
                    padding: 10,
                    fontSize: _$e.typography.size.s1,
                    ".linenumber": {
                        opacity: .5
                    }
                };
            }), Hs = qt();
        });
        X();
        Q();
        Z();
        X();
        Q();
        Z();
        Ye();
        Tt();
        zt();
        X();
        Q();
        Z();
        var wc = __STORYBOOK_API__, Sc = __STORYBOOK_API__.ActiveTabs, Tc = __STORYBOOK_API__.Consumer, Ic = __STORYBOOK_API__.ManagerContext, Cc = __STORYBOOK_API__.Provider, Pc = __STORYBOOK_API__.RequestResponseError, In = __STORYBOOK_API__.addons, Rc = __STORYBOOK_API__.combineParameters, xc = __STORYBOOK_API__.controlOrMetaKey, _c = __STORYBOOK_API__.controlOrMetaSymbol, Ac = __STORYBOOK_API__.eventMatchesShortcut, kc = __STORYBOOK_API__.eventToShortcut, Nc = __STORYBOOK_API__.experimental_requestResponse, jc = __STORYBOOK_API__.isMacLike, Mc = __STORYBOOK_API__.isShortcutTaken, Lc = __STORYBOOK_API__.keyToSymbol, Dc = __STORYBOOK_API__.merge, Fc = __STORYBOOK_API__.mockChannel, Bc = __STORYBOOK_API__.optionOrAltSymbol, Wc = __STORYBOOK_API__.shortcutMatchesShortcut, Uc = __STORYBOOK_API__.shortcutToHumanString, Hc = __STORYBOOK_API__.types, Gc = __STORYBOOK_API__.useAddonState, zc = __STORYBOOK_API__.useArgTypes, Yc = __STORYBOOK_API__.useArgs, qc = __STORYBOOK_API__.useChannel, $c = __STORYBOOK_API__.useGlobalTypes, Vc = __STORYBOOK_API__.useGlobals, Kc = __STORYBOOK_API__.useParameter, Jc = __STORYBOOK_API__.useSharedState, Xc = __STORYBOOK_API__.useStoryPrepared, Qc = __STORYBOOK_API__.useStorybookApi, Zc = __STORYBOOK_API__.useStorybookState;
        var zs = Gt(function() {
            return Promise.resolve().then(function() {
                return ro(), no;
            });
        });
        In.register("@storybook/addon-onboarding", /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function(e) {
                var t, n;
                return _ts_generator(this, function(_state) {
                    t = e.getUrlState(), n = t.path === "/onboarding" || t.queryParams.onboarding === "true";
                    e.once(Sn, function() {
                        if (!(e.getData("example-button--primary") || document.getElementById("example-button--primary"))) {
                            console.warn("[@storybook/addon-onboarding] It seems like you have finished the onboarding experience in Storybook! Therefore this addon is not necessary anymore and will not be loaded. You are free to remove it from your project. More info: https://github.com/storybookjs/storybook/tree/next/code/addons/onboarding#uninstalling");
                            return;
                        }
                        if (!n || window.innerWidth < 730) return;
                        e.togglePanel(!0), e.togglePanelPosition("bottom"), e.setSelectedPanel("addon-controls");
                        var r = document.createElement("div");
                        r.id = "storybook-addon-onboarding", document.body.appendChild(r), De.render(E.createElement(Wt, {
                            fallback: E.createElement("div", null)
                        }, E.createElement(zs, {
                            api: e
                        })), r);
                    });
                    return [
                        2
                    ];
                });
            });
            return function(e) {
                return _ref.apply(this, arguments);
            };
        }());
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
