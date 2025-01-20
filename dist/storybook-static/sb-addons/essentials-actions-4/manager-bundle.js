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
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
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
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
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
try {
    (function() {
        var Fe = function Fe(e, t, r) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            try {
                for(var _iterator = e.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                    r = _step.value;
                    if (L(r, t)) return r;
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
        };
        var He = function He(e) {
            if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        };
        var je = function je(e, t) {
            e.prototype = Object.create(t.prototype), e.prototype.constructor = e, R(e, t);
        };
        var Ue = function Ue(e) {
            try {
                return Function.toString.call(e).indexOf("[native code]") !== -1;
            } catch (e1) {
                return typeof e == "function";
            }
        };
        var ke = function ke(e, t, r) {
            if (ee()) return Reflect.construct.apply(null, arguments);
            var n = [
                null
            ];
            n.push.apply(n, t);
            var a = new (e.bind.apply(e, n));
            return r && R(a, r.prototype), a;
        };
        var Ge = function Ge(e, t) {
            return e.substr(-t.length) === t;
        };
        var We = function We(e) {
            if (typeof e != "string") return e;
            var t = e.match(pt);
            return t ? parseFloat(e) : e;
        };
        var te = function te(e) {
            return Math.round(e * 255);
        };
        var dt = function dt(e, t, r) {
            return te(e) + "," + te(t) + "," + te(r);
        };
        var F = function F(e, t, r, n) {
            if (n === void 0 && (n = dt), t === 0) return n(r, r, r);
            var a = (e % 360 + 360) % 360 / 60, i = (1 - Math.abs(2 * r - 1)) * t, s = i * (1 - Math.abs(a % 2 - 1)), l = 0, u = 0, c = 0;
            a >= 0 && a < 1 ? (l = i, u = s) : a >= 1 && a < 2 ? (l = s, u = i) : a >= 2 && a < 3 ? (u = i, c = s) : a >= 3 && a < 4 ? (u = s, c = i) : a >= 4 && a < 5 ? (l = s, c = i) : a >= 5 && a < 6 && (l = i, c = s);
            var p = r - i / 2, d = l + p, f = u + p, E = c + p;
            return n(d, f, E);
        };
        var mt = function mt(e) {
            if (typeof e != "string") return e;
            var t = e.toLowerCase();
            return Ve[t] ? "#" + Ve[t] : e;
        };
        var I = function I(e) {
            if (typeof e != "string") throw new _(3);
            var t = mt(e);
            if (t.match(gt)) return {
                red: parseInt("" + t[1] + t[2], 16),
                green: parseInt("" + t[3] + t[4], 16),
                blue: parseInt("" + t[5] + t[6], 16)
            };
            if (t.match(bt)) {
                var r = parseFloat((parseInt("" + t[7] + t[8], 16) / 255).toFixed(2));
                return {
                    red: parseInt("" + t[1] + t[2], 16),
                    green: parseInt("" + t[3] + t[4], 16),
                    blue: parseInt("" + t[5] + t[6], 16),
                    alpha: r
                };
            }
            if (t.match(ht)) return {
                red: parseInt("" + t[1] + t[1], 16),
                green: parseInt("" + t[2] + t[2], 16),
                blue: parseInt("" + t[3] + t[3], 16)
            };
            if (t.match(Et)) {
                var n = parseFloat((parseInt("" + t[4] + t[4], 16) / 255).toFixed(2));
                return {
                    red: parseInt("" + t[1] + t[1], 16),
                    green: parseInt("" + t[2] + t[2], 16),
                    blue: parseInt("" + t[3] + t[3], 16),
                    alpha: n
                };
            }
            var a = re.exec(t);
            if (a) return {
                red: parseInt("" + a[1], 10),
                green: parseInt("" + a[2], 10),
                blue: parseInt("" + a[3], 10)
            };
            var i = yt.exec(t.substring(0, 50));
            if (i) return {
                red: parseInt("" + i[1], 10),
                green: parseInt("" + i[2], 10),
                blue: parseInt("" + i[3], 10),
                alpha: parseFloat("" + i[4]) > 1 ? parseFloat("" + i[4]) / 100 : parseFloat("" + i[4])
            };
            var s = Ot.exec(t);
            if (s) {
                var l = parseInt("" + s[1], 10), u = parseInt("" + s[2], 10) / 100, c = parseInt("" + s[3], 10) / 100, p = "rgb(" + F(l, u, c) + ")", d = re.exec(p);
                if (!d) throw new _(4, t, p);
                return {
                    red: parseInt("" + d[1], 10),
                    green: parseInt("" + d[2], 10),
                    blue: parseInt("" + d[3], 10)
                };
            }
            var f = Tt.exec(t.substring(0, 50));
            if (f) {
                var E = parseInt("" + f[1], 10), m = parseInt("" + f[2], 10) / 100, y = parseInt("" + f[3], 10) / 100, O = "rgb(" + F(E, m, y) + ")", N = re.exec(O);
                if (!N) throw new _(4, t, O);
                return {
                    red: parseInt("" + N[1], 10),
                    green: parseInt("" + N[2], 10),
                    blue: parseInt("" + N[3], 10),
                    alpha: parseFloat("" + f[4]) > 1 ? parseFloat("" + f[4]) / 100 : parseFloat("" + f[4])
                };
            }
            throw new _(5);
        };
        var _t = function _t(e) {
            var t = e.red / 255, r = e.green / 255, n = e.blue / 255, a = Math.max(t, r, n), i = Math.min(t, r, n), s = (a + i) / 2;
            if (a === i) return e.alpha !== void 0 ? {
                hue: 0,
                saturation: 0,
                lightness: s,
                alpha: e.alpha
            } : {
                hue: 0,
                saturation: 0,
                lightness: s
            };
            var l, u = a - i, c = s > .5 ? u / (2 - a - i) : u / (a + i);
            switch(a){
                case t:
                    l = (r - n) / u + (r < n ? 6 : 0);
                    break;
                case r:
                    l = (n - t) / u + 2;
                    break;
                default:
                    l = (t - r) / u + 4;
                    break;
            }
            return l *= 60, e.alpha !== void 0 ? {
                hue: l,
                saturation: c,
                lightness: s,
                alpha: e.alpha
            } : {
                hue: l,
                saturation: c,
                lightness: s
            };
        };
        var A = function A(e) {
            return _t(I(e));
        };
        var w = function w(e) {
            var t = e.toString(16);
            return t.length === 1 ? "0" + t : t;
        };
        var ne = function ne(e) {
            return w(Math.round(e * 255));
        };
        var St = function St(e, t, r) {
            return ae("#" + ne(e) + ne(t) + ne(r));
        };
        var V = function V(e, t, r) {
            return F(e, t, r, St);
        };
        var Rt = function Rt(e, t, r) {
            if (typeof e == "number" && typeof t == "number" && typeof r == "number") return V(e, t, r);
            if ((typeof e === "undefined" ? "undefined" : _type_of(e)) == "object" && t === void 0 && r === void 0) return V(e.hue, e.saturation, e.lightness);
            throw new _(1);
        };
        var At = function At(e, t, r, n) {
            if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof n == "number") return n >= 1 ? V(e, t, r) : "rgba(" + F(e, t, r) + "," + n + ")";
            if ((typeof e === "undefined" ? "undefined" : _type_of(e)) == "object" && t === void 0 && r === void 0 && n === void 0) return e.alpha >= 1 ? V(e.hue, e.saturation, e.lightness) : "rgba(" + F(e.hue, e.saturation, e.lightness) + "," + e.alpha + ")";
            throw new _(2);
        };
        var oe = function oe(e, t, r) {
            if (typeof e == "number" && typeof t == "number" && typeof r == "number") return ae("#" + w(e) + w(t) + w(r));
            if ((typeof e === "undefined" ? "undefined" : _type_of(e)) == "object" && t === void 0 && r === void 0) return ae("#" + w(e.red) + w(e.green) + w(e.blue));
            throw new _(6);
        };
        var $ = function $(e, t, r, n) {
            if (typeof e == "string" && typeof t == "number") {
                var a = I(e);
                return "rgba(" + a.red + "," + a.green + "," + a.blue + "," + t + ")";
            } else {
                if (typeof e == "number" && typeof t == "number" && typeof r == "number" && typeof n == "number") return n >= 1 ? oe(e, t, r) : "rgba(" + e + "," + t + "," + r + "," + n + ")";
                if ((typeof e === "undefined" ? "undefined" : _type_of(e)) == "object" && t === void 0 && r === void 0 && n === void 0) return e.alpha >= 1 ? oe(e.red, e.green, e.blue) : "rgba(" + e.red + "," + e.green + "," + e.blue + "," + e.alpha + ")";
            }
            throw new _(7);
        };
        var C = function C(e) {
            if ((typeof e === "undefined" ? "undefined" : _type_of(e)) != "object") throw new _(8);
            if (wt(e)) return $(e);
            if (Ct(e)) return oe(e);
            if (xt(e)) return At(e);
            if (Nt(e)) return Rt(e);
            throw new _(8);
        };
        var v = function v(e) {
            return Ye(e, e.length, []);
        };
        var Lt = function Lt(e, t) {
            if (t === "transparent") return t;
            var r = A(t);
            return C(T({}, r, {
                hue: r.hue + parseFloat(e)
            }));
        };
        var D = function D(e, t, r) {
            return Math.max(e, Math.min(t, r));
        };
        var It = function It(e, t) {
            if (t === "transparent") return t;
            var r = A(t);
            return C(T({}, r, {
                lightness: D(0, 1, r.lightness - parseFloat(e))
            }));
        };
        var Dt = function Dt(e, t) {
            if (t === "transparent") return t;
            var r = A(t);
            return C(T({}, r, {
                saturation: D(0, 1, r.saturation - parseFloat(e))
            }));
        };
        var Mt = function Mt(e, t) {
            if (t === "transparent") return t;
            var r = A(t);
            return C(T({}, r, {
                lightness: D(0, 1, r.lightness + parseFloat(e))
            }));
        };
        var Pt = function Pt(e, t, r) {
            if (t === "transparent") return r;
            if (r === "transparent") return t;
            if (e === 0) return r;
            var n = I(t), a = T({}, n, {
                alpha: typeof n.alpha == "number" ? n.alpha : 1
            }), i = I(r), s = T({}, i, {
                alpha: typeof i.alpha == "number" ? i.alpha : 1
            }), l = a.alpha - s.alpha, u = parseFloat(e) * 2 - 1, c = u * l === -1 ? u : u + l, p = 1 + u * l, d = (c / p + 1) / 2, f = 1 - d, E = {
                red: Math.floor(a.red * d + s.red * f),
                green: Math.floor(a.green * d + s.green * f),
                blue: Math.floor(a.blue * d + s.blue * f),
                alpha: a.alpha * parseFloat(e) + s.alpha * (1 - parseFloat(e))
            };
            return $(E);
        };
        var Ft = function Ft(e, t) {
            if (t === "transparent") return t;
            var r = I(t), n = typeof r.alpha == "number" ? r.alpha : 1, a = T({}, r, {
                alpha: D(0, 1, (n * 100 + parseFloat(e) * 100) / 100)
            });
            return $(a);
        };
        var Ht = function Ht(e, t) {
            if (t === "transparent") return t;
            var r = A(t);
            return C(T({}, r, {
                saturation: D(0, 1, r.saturation + parseFloat(e))
            }));
        };
        var jt = function jt(e, t) {
            return t === "transparent" ? t : C(T({}, A(t), {
                hue: parseFloat(e)
            }));
        };
        var Ut = function Ut(e, t) {
            return t === "transparent" ? t : C(T({}, A(t), {
                lightness: parseFloat(e)
            }));
        };
        var kt = function kt(e, t) {
            return t === "transparent" ? t : C(T({}, A(t), {
                saturation: parseFloat(e)
            }));
        };
        var Gt = function Gt(e, t) {
            return t === "transparent" ? t : Je(parseFloat(e), "rgb(0, 0, 0)", t);
        };
        var Wt = function Wt(e, t) {
            return t === "transparent" ? t : Je(parseFloat(e), "rgb(255, 255, 255)", t);
        };
        var Vt = function Vt(e, t) {
            if (t === "transparent") return t;
            var r = I(t), n = typeof r.alpha == "number" ? r.alpha : 1, a = T({}, r, {
                alpha: D(0, 1, +(n * 100 - parseFloat(e) * 100).toFixed(2) / 100)
            });
            return $(a);
        };
        var J = function J(e, t) {
            return !t(e).next().done;
        };
        var ue = function ue(e, t) {
            var r = Object.getOwnPropertyDescriptor(e, t);
            if (r.get) try {
                return r.get();
            } catch (e) {
                return r.get;
            }
            return e[t];
        };
        var Ze = function Ze(e, t) {
            return e.length === 0 ? [] : e.slice(1).reduce(function(r, n) {
                return r.concat([
                    t,
                    n
                ]);
            }, [
                e[0]
            ]);
        };
        var hr = function hr(e) {
            if ((typeof e === "undefined" ? "undefined" : _type_of(e)) == "object") {
                var t = [];
                if (Array.isArray(e)) {
                    var n = e.length;
                    t = _to_consumable_array(Array(n).keys());
                } else e !== null && (t = Object.keys(e));
                var r = t.reduce(function(n, a) {
                    var i = e[a];
                    return (typeof i === "undefined" ? "undefined" : _type_of(i)) == "object" && i !== null && Object.keys(i).reduce(function(s, l) {
                        return s.includes(l) || s.push(l), s;
                    }, n), n;
                }, []);
                return {
                    rowHeaders: t,
                    colHeaders: r
                };
            }
        };
        var Ur = function Ur() {
            var _Me = _sliced_to_array(Me(H, {
                count: 0
            }), 2), _Me_ = _Me[0], _$e = _Me_.count, t = _Me[1];
            var _obj;
            return Pe((_obj = {}, _define_property(_obj, se, function() {
                t(function(r) {
                    return _object_spread_props(_object_spread({}, r), {
                        count: r.count + 1
                    });
                });
            }), _define_property(_obj, k, function() {
                t(function(r) {
                    return _object_spread_props(_object_spread({}, r), {
                        count: 0
                    });
                });
            }), _define_property(_obj, et, function() {
                t(function(r) {
                    return _object_spread_props(_object_spread({}, r), {
                        count: 0
                    });
                });
            }), _obj)), o.createElement("div", null, o.createElement(Ie, {
                col: 1
            }, o.createElement("span", {
                style: {
                    display: "inline-block",
                    verticalAlign: "middle"
                }
            }, "Actions"), _$e === 0 ? "" : o.createElement(xe, {
                status: "neutral"
            }, _$e)));
        };
        var o = __REACT__, Te = __REACT__.Children, _e = __REACT__.Component, ve = __REACT__.Fragment, Jr = __REACT__.Profiler, qr = __REACT__.PureComponent, Xr = __REACT__.StrictMode, Zr = __REACT__.Suspense, Kr = __REACT__.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Qr = __REACT__.cloneElement, Z = __REACT__.createContext, en = __REACT__.createElement, tn = __REACT__.createFactory, rn = __REACT__.createRef, Se = __REACT__.forwardRef, nn = __REACT__.isValidElement, an = __REACT__.lazy, j = __REACT__.memo, on = __REACT__.startTransition, sn = __REACT__.unstable_act, x = __REACT__.useCallback, K = __REACT__.useContext, ln = __REACT__.useDebugValue, un = __REACT__.useDeferredValue, Re = __REACT__.useEffect, cn = __REACT__.useId, pn = __REACT__.useImperativeHandle, fn = __REACT__.useInsertionEffect, Ae = __REACT__.useLayoutEffect, Ce = __REACT__.useMemo, dn = __REACT__.useReducer, we = __REACT__.useRef, U = __REACT__.useState, mn = __REACT__.useSyncExternalStore, gn = __REACT__.useTransition, bn = __REACT__.version;
        var Tn = __STORYBOOK_COMPONENTS__, _n = __STORYBOOK_COMPONENTS__.A, Ne = __STORYBOOK_COMPONENTS__.ActionBar, vn = __STORYBOOK_COMPONENTS__.AddonPanel, xe = __STORYBOOK_COMPONENTS__.Badge, Sn = __STORYBOOK_COMPONENTS__.Bar, Rn = __STORYBOOK_COMPONENTS__.Blockquote, An = __STORYBOOK_COMPONENTS__.Button, Cn = __STORYBOOK_COMPONENTS__.ClipboardCode, wn = __STORYBOOK_COMPONENTS__.Code, Nn = __STORYBOOK_COMPONENTS__.DL, xn = __STORYBOOK_COMPONENTS__.Div, Ln = __STORYBOOK_COMPONENTS__.DocumentWrapper, In = __STORYBOOK_COMPONENTS__.EmptyTabContent, Dn = __STORYBOOK_COMPONENTS__.ErrorFormatter, Mn = __STORYBOOK_COMPONENTS__.FlexBar, Pn = __STORYBOOK_COMPONENTS__.Form, Bn = __STORYBOOK_COMPONENTS__.H1, Fn = __STORYBOOK_COMPONENTS__.H2, zn = __STORYBOOK_COMPONENTS__.H3, Hn = __STORYBOOK_COMPONENTS__.H4, jn = __STORYBOOK_COMPONENTS__.H5, Un = __STORYBOOK_COMPONENTS__.H6, kn = __STORYBOOK_COMPONENTS__.HR, Gn = __STORYBOOK_COMPONENTS__.IconButton, Wn = __STORYBOOK_COMPONENTS__.IconButtonSkeleton, Vn = __STORYBOOK_COMPONENTS__.Icons, $n = __STORYBOOK_COMPONENTS__.Img, Yn = __STORYBOOK_COMPONENTS__.LI, Jn = __STORYBOOK_COMPONENTS__.Link, qn = __STORYBOOK_COMPONENTS__.ListItem, Xn = __STORYBOOK_COMPONENTS__.Loader, Zn = __STORYBOOK_COMPONENTS__.Modal, Kn = __STORYBOOK_COMPONENTS__.OL, Qn = __STORYBOOK_COMPONENTS__.P, ea = __STORYBOOK_COMPONENTS__.Placeholder, ta = __STORYBOOK_COMPONENTS__.Pre, ra = __STORYBOOK_COMPONENTS__.ResetWrapper, Le = __STORYBOOK_COMPONENTS__.ScrollArea, na = __STORYBOOK_COMPONENTS__.Separator, Ie = __STORYBOOK_COMPONENTS__.Spaced, aa = __STORYBOOK_COMPONENTS__.Span, oa = __STORYBOOK_COMPONENTS__.StorybookIcon, ia = __STORYBOOK_COMPONENTS__.StorybookLogo, sa = __STORYBOOK_COMPONENTS__.Symbols, la = __STORYBOOK_COMPONENTS__.SyntaxHighlighter, ua = __STORYBOOK_COMPONENTS__.TT, ca = __STORYBOOK_COMPONENTS__.TabBar, pa = __STORYBOOK_COMPONENTS__.TabButton, fa = __STORYBOOK_COMPONENTS__.TabWrapper, da = __STORYBOOK_COMPONENTS__.Table, ma = __STORYBOOK_COMPONENTS__.Tabs, ga = __STORYBOOK_COMPONENTS__.TabsState, ba = __STORYBOOK_COMPONENTS__.TooltipLinkList, ha = __STORYBOOK_COMPONENTS__.TooltipMessage, Ea = __STORYBOOK_COMPONENTS__.TooltipNote, ya = __STORYBOOK_COMPONENTS__.UL, Oa = __STORYBOOK_COMPONENTS__.WithTooltip, Ta = __STORYBOOK_COMPONENTS__.WithTooltipPure, _a = __STORYBOOK_COMPONENTS__.Zoom, va = __STORYBOOK_COMPONENTS__.codeCommon, Sa = __STORYBOOK_COMPONENTS__.components, Ra = __STORYBOOK_COMPONENTS__.createCopyToClipboardFunction, Aa = __STORYBOOK_COMPONENTS__.getStoryHref, Ca = __STORYBOOK_COMPONENTS__.icons, wa = __STORYBOOK_COMPONENTS__.interleaveSeparators, Na = __STORYBOOK_COMPONENTS__.nameSpaceClassNames, xa = __STORYBOOK_COMPONENTS__.resetComponents, La = __STORYBOOK_COMPONENTS__.withReset;
        var Ba = __STORYBOOK_CORE_EVENTS__, Fa = __STORYBOOK_CORE_EVENTS__.ARGTYPES_INFO_REQUEST, za = __STORYBOOK_CORE_EVENTS__.ARGTYPES_INFO_RESPONSE, Ha = __STORYBOOK_CORE_EVENTS__.CHANNEL_CREATED, ja = __STORYBOOK_CORE_EVENTS__.CHANNEL_WS_DISCONNECT, Ua = __STORYBOOK_CORE_EVENTS__.CONFIG_ERROR, ka = __STORYBOOK_CORE_EVENTS__.CREATE_NEW_STORYFILE_REQUEST, Ga = __STORYBOOK_CORE_EVENTS__.CREATE_NEW_STORYFILE_RESPONSE, Wa = __STORYBOOK_CORE_EVENTS__.CURRENT_STORY_WAS_SET, Va = __STORYBOOK_CORE_EVENTS__.DOCS_PREPARED, $a = __STORYBOOK_CORE_EVENTS__.DOCS_RENDERED, Ya = __STORYBOOK_CORE_EVENTS__.FILE_COMPONENT_SEARCH_REQUEST, Ja = __STORYBOOK_CORE_EVENTS__.FILE_COMPONENT_SEARCH_RESPONSE, qa = __STORYBOOK_CORE_EVENTS__.FORCE_REMOUNT, Xa = __STORYBOOK_CORE_EVENTS__.FORCE_RE_RENDER, Za = __STORYBOOK_CORE_EVENTS__.GLOBALS_UPDATED, Ka = __STORYBOOK_CORE_EVENTS__.NAVIGATE_URL, Qa = __STORYBOOK_CORE_EVENTS__.PLAY_FUNCTION_THREW_EXCEPTION, eo = __STORYBOOK_CORE_EVENTS__.PRELOAD_ENTRIES, to = __STORYBOOK_CORE_EVENTS__.PREVIEW_BUILDER_PROGRESS, ro = __STORYBOOK_CORE_EVENTS__.PREVIEW_KEYDOWN, no = __STORYBOOK_CORE_EVENTS__.REGISTER_SUBSCRIPTION, ao = __STORYBOOK_CORE_EVENTS__.REQUEST_WHATS_NEW_DATA, oo = __STORYBOOK_CORE_EVENTS__.RESET_STORY_ARGS, io = __STORYBOOK_CORE_EVENTS__.RESULT_WHATS_NEW_DATA, so = __STORYBOOK_CORE_EVENTS__.SAVE_STORY_REQUEST, lo = __STORYBOOK_CORE_EVENTS__.SAVE_STORY_RESPONSE, uo = __STORYBOOK_CORE_EVENTS__.SELECT_STORY, co = __STORYBOOK_CORE_EVENTS__.SET_CONFIG, po = __STORYBOOK_CORE_EVENTS__.SET_CURRENT_STORY, fo = __STORYBOOK_CORE_EVENTS__.SET_FILTER, mo = __STORYBOOK_CORE_EVENTS__.SET_GLOBALS, go = __STORYBOOK_CORE_EVENTS__.SET_INDEX, bo = __STORYBOOK_CORE_EVENTS__.SET_STORIES, ho = __STORYBOOK_CORE_EVENTS__.SET_WHATS_NEW_CACHE, Eo = __STORYBOOK_CORE_EVENTS__.SHARED_STATE_CHANGED, yo = __STORYBOOK_CORE_EVENTS__.SHARED_STATE_SET, Oo = __STORYBOOK_CORE_EVENTS__.STORIES_COLLAPSE_ALL, To = __STORYBOOK_CORE_EVENTS__.STORIES_EXPAND_ALL, _o = __STORYBOOK_CORE_EVENTS__.STORY_ARGS_UPDATED, k = __STORYBOOK_CORE_EVENTS__.STORY_CHANGED, vo = __STORYBOOK_CORE_EVENTS__.STORY_ERRORED, So = __STORYBOOK_CORE_EVENTS__.STORY_INDEX_INVALIDATED, Ro = __STORYBOOK_CORE_EVENTS__.STORY_MISSING, Ao = __STORYBOOK_CORE_EVENTS__.STORY_PREPARED, Co = __STORYBOOK_CORE_EVENTS__.STORY_RENDERED, wo = __STORYBOOK_CORE_EVENTS__.STORY_RENDER_PHASE_CHANGED, No = __STORYBOOK_CORE_EVENTS__.STORY_SPECIFIED, xo = __STORYBOOK_CORE_EVENTS__.STORY_THREW_EXCEPTION, Lo = __STORYBOOK_CORE_EVENTS__.STORY_UNCHANGED, Io = __STORYBOOK_CORE_EVENTS__.TELEMETRY_ERROR, Do = __STORYBOOK_CORE_EVENTS__.TOGGLE_WHATS_NEW_NOTIFICATIONS, Mo = __STORYBOOK_CORE_EVENTS__.UNHANDLED_ERRORS_WHILE_PLAYING, Po = __STORYBOOK_CORE_EVENTS__.UPDATE_GLOBALS, Bo = __STORYBOOK_CORE_EVENTS__.UPDATE_QUERY_PARAMS, Fo = __STORYBOOK_CORE_EVENTS__.UPDATE_STORY_ARGS;
        var Yo = __STORYBOOK_API__, Jo = __STORYBOOK_API__.ActiveTabs, qo = __STORYBOOK_API__.Consumer, Xo = __STORYBOOK_API__.ManagerContext, Zo = __STORYBOOK_API__.Provider, Ko = __STORYBOOK_API__.RequestResponseError, Q = __STORYBOOK_API__.addons, Qo = __STORYBOOK_API__.combineParameters, ei = __STORYBOOK_API__.controlOrMetaKey, ti = __STORYBOOK_API__.controlOrMetaSymbol, ri = __STORYBOOK_API__.eventMatchesShortcut, ni = __STORYBOOK_API__.eventToShortcut, ai = __STORYBOOK_API__.experimental_requestResponse, oi = __STORYBOOK_API__.isMacLike, ii = __STORYBOOK_API__.isShortcutTaken, si = __STORYBOOK_API__.keyToSymbol, li = __STORYBOOK_API__.merge, ui = __STORYBOOK_API__.mockChannel, ci = __STORYBOOK_API__.optionOrAltSymbol, pi = __STORYBOOK_API__.shortcutMatchesShortcut, fi = __STORYBOOK_API__.shortcutToHumanString, De = __STORYBOOK_API__.types, Me = __STORYBOOK_API__.useAddonState, di = __STORYBOOK_API__.useArgTypes, mi = __STORYBOOK_API__.useArgs, Pe = __STORYBOOK_API__.useChannel, gi = __STORYBOOK_API__.useGlobalTypes, bi = __STORYBOOK_API__.useGlobals, hi = __STORYBOOK_API__.useParameter, Ei = __STORYBOOK_API__.useSharedState, yi = __STORYBOOK_API__.useStoryPrepared, Oi = __STORYBOOK_API__.useStorybookApi, Ti = __STORYBOOK_API__.useStorybookState;
        var Be = Object.prototype.hasOwnProperty;
        function L(e, t) {
            var r, n, a;
            if (e === t) return !0;
            if (e && t && (r = e.constructor) === t.constructor) {
                if (r === Date) return e.getTime() === t.getTime();
                if (r === RegExp) return e.toString() === t.toString();
                if (r === Array) {
                    if ((n = e.length) === t.length) for(; n-- && L(e[n], t[n]););
                    return n === -1;
                }
                if (r === Set) {
                    if (e.size !== t.size) return !1;
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    try {
                        for(var _iterator = e[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            n = _step.value;
                            if (a = n, a && (typeof a === "undefined" ? "undefined" : _type_of(a)) == "object" && (a = Fe(t, a), !a) || !t.has(a)) return !1;
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
                }
                if (r === Map) {
                    if (e.size !== t.size) return !1;
                    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                    try {
                        for(var _iterator1 = e[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                            n = _step1.value;
                            if (a = n[0], a && (typeof a === "undefined" ? "undefined" : _type_of(a)) == "object" && (a = Fe(t, a), !a) || !L(n[1], t.get(a))) return !1;
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
                }
                if (r === ArrayBuffer) e = new Uint8Array(e), t = new Uint8Array(t);
                else if (r === DataView) {
                    if ((n = e.byteLength) === t.byteLength) for(; n-- && e.getInt8(n) === t.getInt8(n););
                    return n === -1;
                }
                if (ArrayBuffer.isView(e)) {
                    if ((n = e.byteLength) === t.byteLength) for(; n-- && e[n] === t[n];);
                    return n === -1;
                }
                if (!r || (typeof e === "undefined" ? "undefined" : _type_of(e)) == "object") {
                    n = 0;
                    for(r in e)if (Be.call(e, r) && ++n && !Be.call(t, r) || !(r in t) || !L(e[r], t[r])) return !1;
                    return Object.keys(t).length === n;
                }
            }
            return e !== e && t !== t;
        }
        var xi = __STORYBOOK_THEMING__, Li = __STORYBOOK_THEMING__.CacheProvider, Ii = __STORYBOOK_THEMING__.ClassNames, Di = __STORYBOOK_THEMING__.Global, Mi = __STORYBOOK_THEMING__.ThemeProvider, Pi = __STORYBOOK_THEMING__.background, Bi = __STORYBOOK_THEMING__.color, Fi = __STORYBOOK_THEMING__.convert, zi = __STORYBOOK_THEMING__.create, Hi = __STORYBOOK_THEMING__.createCache, ji = __STORYBOOK_THEMING__.createGlobal, Ui = __STORYBOOK_THEMING__.createReset, ki = __STORYBOOK_THEMING__.css, Gi = __STORYBOOK_THEMING__.darken, Wi = __STORYBOOK_THEMING__.ensure, Vi = __STORYBOOK_THEMING__.ignoreSsrWarning, $i = __STORYBOOK_THEMING__.isPropValid, Yi = __STORYBOOK_THEMING__.jsx, Ji = __STORYBOOK_THEMING__.keyframes, qi = __STORYBOOK_THEMING__.lighten, B = __STORYBOOK_THEMING__.styled, Xi = __STORYBOOK_THEMING__.themes, Zi = __STORYBOOK_THEMING__.typography, Ki = __STORYBOOK_THEMING__.useTheme, ze = __STORYBOOK_THEMING__.withTheme;
        function T() {
            return T = Object.assign ? Object.assign.bind() : function T(e) {
                for(var t = 1; t < arguments.length; t++){
                    var r = arguments[t];
                    for(var n in r)({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
                }
                return e;
            }, T.apply(null, arguments);
        }
        function R(e, t) {
            return R = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function R(r, n) {
                return r.__proto__ = n, r;
            }, R(e, t);
        }
        function G(e) {
            return G = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function G(t) {
                return t.__proto__ || Object.getPrototypeOf(t);
            }, G(e);
        }
        function ee() {
            try {
                var _$e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
            } catch (e) {}
            return (ee = function ee() {
                return !!_$e;
            })();
        }
        function W(e) {
            var t = typeof Map == "function" ? new Map : void 0;
            return W = function W(n) {
                if (n === null || !Ue(n)) return n;
                if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
                if (t !== void 0) {
                    if (t.has(n)) return t.get(n);
                    t.set(n, a);
                }
                function a() {
                    return ke(n, arguments, G(this).constructor);
                }
                return a.prototype = Object.create(n.prototype, {
                    constructor: {
                        value: a,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), R(a, n);
            }, W(e);
        }
        var _ = function(e) {
            je(t, e);
            function t(r) {
                var n;
                if (1) n = e.call(this, "An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/errors.md#" + r + " for more information.") || this;
                else for(var a, i, s; s < a; s++);
                return He(n);
            }
            return t;
        }(W(Error));
        var pt = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
        var ft = function ft(t) {
            return function(r, n) {
                n === void 0 && (n = "16px");
                var a = r, i = n;
                if (typeof r == "string") {
                    if (!Ge(r, "px")) throw new _(69, t, r);
                    a = We(r);
                }
                if (typeof n == "string") {
                    if (!Ge(n, "px")) throw new _(70, t, n);
                    i = We(n);
                }
                if (typeof a == "string") throw new _(71, r, t);
                if (typeof i == "string") throw new _(72, n, t);
                return "" + a / i + t;
            };
        }, $e = ft, rl = $e("em");
        var nl = $e("rem");
        var Ve = {
            aliceblue: "f0f8ff",
            antiquewhite: "faebd7",
            aqua: "00ffff",
            aquamarine: "7fffd4",
            azure: "f0ffff",
            beige: "f5f5dc",
            bisque: "ffe4c4",
            black: "000",
            blanchedalmond: "ffebcd",
            blue: "0000ff",
            blueviolet: "8a2be2",
            brown: "a52a2a",
            burlywood: "deb887",
            cadetblue: "5f9ea0",
            chartreuse: "7fff00",
            chocolate: "d2691e",
            coral: "ff7f50",
            cornflowerblue: "6495ed",
            cornsilk: "fff8dc",
            crimson: "dc143c",
            cyan: "00ffff",
            darkblue: "00008b",
            darkcyan: "008b8b",
            darkgoldenrod: "b8860b",
            darkgray: "a9a9a9",
            darkgreen: "006400",
            darkgrey: "a9a9a9",
            darkkhaki: "bdb76b",
            darkmagenta: "8b008b",
            darkolivegreen: "556b2f",
            darkorange: "ff8c00",
            darkorchid: "9932cc",
            darkred: "8b0000",
            darksalmon: "e9967a",
            darkseagreen: "8fbc8f",
            darkslateblue: "483d8b",
            darkslategray: "2f4f4f",
            darkslategrey: "2f4f4f",
            darkturquoise: "00ced1",
            darkviolet: "9400d3",
            deeppink: "ff1493",
            deepskyblue: "00bfff",
            dimgray: "696969",
            dimgrey: "696969",
            dodgerblue: "1e90ff",
            firebrick: "b22222",
            floralwhite: "fffaf0",
            forestgreen: "228b22",
            fuchsia: "ff00ff",
            gainsboro: "dcdcdc",
            ghostwhite: "f8f8ff",
            gold: "ffd700",
            goldenrod: "daa520",
            gray: "808080",
            green: "008000",
            greenyellow: "adff2f",
            grey: "808080",
            honeydew: "f0fff0",
            hotpink: "ff69b4",
            indianred: "cd5c5c",
            indigo: "4b0082",
            ivory: "fffff0",
            khaki: "f0e68c",
            lavender: "e6e6fa",
            lavenderblush: "fff0f5",
            lawngreen: "7cfc00",
            lemonchiffon: "fffacd",
            lightblue: "add8e6",
            lightcoral: "f08080",
            lightcyan: "e0ffff",
            lightgoldenrodyellow: "fafad2",
            lightgray: "d3d3d3",
            lightgreen: "90ee90",
            lightgrey: "d3d3d3",
            lightpink: "ffb6c1",
            lightsalmon: "ffa07a",
            lightseagreen: "20b2aa",
            lightskyblue: "87cefa",
            lightslategray: "789",
            lightslategrey: "789",
            lightsteelblue: "b0c4de",
            lightyellow: "ffffe0",
            lime: "0f0",
            limegreen: "32cd32",
            linen: "faf0e6",
            magenta: "f0f",
            maroon: "800000",
            mediumaquamarine: "66cdaa",
            mediumblue: "0000cd",
            mediumorchid: "ba55d3",
            mediumpurple: "9370db",
            mediumseagreen: "3cb371",
            mediumslateblue: "7b68ee",
            mediumspringgreen: "00fa9a",
            mediumturquoise: "48d1cc",
            mediumvioletred: "c71585",
            midnightblue: "191970",
            mintcream: "f5fffa",
            mistyrose: "ffe4e1",
            moccasin: "ffe4b5",
            navajowhite: "ffdead",
            navy: "000080",
            oldlace: "fdf5e6",
            olive: "808000",
            olivedrab: "6b8e23",
            orange: "ffa500",
            orangered: "ff4500",
            orchid: "da70d6",
            palegoldenrod: "eee8aa",
            palegreen: "98fb98",
            paleturquoise: "afeeee",
            palevioletred: "db7093",
            papayawhip: "ffefd5",
            peachpuff: "ffdab9",
            peru: "cd853f",
            pink: "ffc0cb",
            plum: "dda0dd",
            powderblue: "b0e0e6",
            purple: "800080",
            rebeccapurple: "639",
            red: "f00",
            rosybrown: "bc8f8f",
            royalblue: "4169e1",
            saddlebrown: "8b4513",
            salmon: "fa8072",
            sandybrown: "f4a460",
            seagreen: "2e8b57",
            seashell: "fff5ee",
            sienna: "a0522d",
            silver: "c0c0c0",
            skyblue: "87ceeb",
            slateblue: "6a5acd",
            slategray: "708090",
            slategrey: "708090",
            snow: "fffafa",
            springgreen: "00ff7f",
            steelblue: "4682b4",
            tan: "d2b48c",
            teal: "008080",
            thistle: "d8bfd8",
            tomato: "ff6347",
            turquoise: "40e0d0",
            violet: "ee82ee",
            wheat: "f5deb3",
            white: "fff",
            whitesmoke: "f5f5f5",
            yellow: "ff0",
            yellowgreen: "9acd32"
        };
        var gt = /^#[a-fA-F0-9]{6}$/, bt = /^#[a-fA-F0-9]{8}$/, ht = /^#[a-fA-F0-9]{3}$/, Et = /^#[a-fA-F0-9]{4}$/, re = /^rgb\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*\)$/i, yt = /^rgb(?:a)?\(\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,)?\s*(\d{1,3})\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i, Ot = /^hsl\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i, Tt = /^hsl(?:a)?\(\s*(\d{0,3}[.]?[0-9]+(?:deg)?)\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,)?\s*(\d{1,3}[.]?[0-9]?)%\s*(?:,|\/)\s*([-+]?\d*[.]?\d+[%]?)\s*\)$/i;
        var vt = function vt(t) {
            return t.length === 7 && t[1] === t[2] && t[3] === t[4] && t[5] === t[6] ? "#" + t[1] + t[3] + t[5] : t;
        }, ae = vt;
        var Ct = function Ct(t) {
            return typeof t.red == "number" && typeof t.green == "number" && typeof t.blue == "number" && (typeof t.alpha != "number" || _type_of(t.alpha) > "u");
        }, wt = function wt(t) {
            return typeof t.red == "number" && typeof t.green == "number" && typeof t.blue == "number" && typeof t.alpha == "number";
        }, Nt = function Nt(t) {
            return typeof t.hue == "number" && typeof t.saturation == "number" && typeof t.lightness == "number" && (typeof t.alpha != "number" || _type_of(t.alpha) > "u");
        }, xt = function xt(t) {
            return typeof t.hue == "number" && typeof t.saturation == "number" && typeof t.lightness == "number" && typeof t.alpha == "number";
        };
        function Ye(e, t, r) {
            return function() {
                var a = r.concat(Array.prototype.slice.call(arguments));
                return a.length >= t ? e.apply(this, a) : Ye(e, t, a);
            };
        }
        var al = v(Lt);
        var ol = v(It);
        var il = v(Dt);
        var sl = v(Mt);
        var Bt = v(Pt), Je = Bt;
        var zt = v(Ft), qe = zt;
        var ll = v(Ht);
        var ul = v(jt);
        var cl = v(Ut);
        var pl = v(kt);
        var fl = v(Gt);
        var dl = v(Wt);
        var ml = v(Vt);
        var $t = "actions", H = "storybook/actions", Yt = "".concat(H, "/panel"), se = "".concat(H, "/action-event"), et = "".concat(H, "/action-clear"), Jt = Object.create, pe = Object.defineProperty, qt = Object.getOwnPropertyDescriptor, tt = Object.getOwnPropertyNames, Xt = Object.getPrototypeOf, Zt = Object.prototype.hasOwnProperty, fe = function(e, t) {
            return function fe() {
                return t || (0, e[tt(e)[0]])((t = {
                    exports: {}
                }).exports, t), t.exports;
            };
        }, Kt = function(e, t) {
            for(var r in t)pe(e, r, {
                get: t[r],
                enumerable: !0
            });
        }, Qt = function(e, t, r, n) {
            var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
            if (t && (typeof t === "undefined" ? "undefined" : _type_of(t)) == "object" || typeof t == "function") try {
                var _loop = function() {
                    var a = _step.value;
                    !Zt.call(e, a) && a !== r && pe(e, a, {
                        get: function() {
                            return t[a];
                        },
                        enumerable: !(n = qt(t, a)) || n.enumerable
                    });
                };
                for(var _iterator = tt(t)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
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
        }, er = function(e, t, r) {
            return r = e != null ? Jt(Xt(e)) : {}, Qt(t || !e || !e.__esModule ? pe(r, "default", {
                value: e,
                enumerable: !0
            }) : r, e);
        }, tr = fe({
            "node_modules/is-object/index.js": function(e, t) {
                t.exports = function(r) {
                    return (typeof r === "undefined" ? "undefined" : _type_of(r)) == "object" && r !== null;
                };
            }
        }), rr = fe({
            "node_modules/is-window/index.js": function(e, t) {
                t.exports = function(r) {
                    if (r == null) return !1;
                    var n = Object(r);
                    return n === n.window;
                };
            }
        }), nr = fe({
            "node_modules/is-dom/index.js": function(e, t) {
                var r = tr(), n = rr();
                function a(i) {
                    return !r(i) || !n(window) || typeof window.Node != "function" ? !1 : typeof i.nodeType == "number" && typeof i.nodeName == "string";
                }
                t.exports = a;
            }
        }), q = {};
        Kt(q, {
            chromeDark: function() {
                return ar;
            },
            chromeLight: function() {
                return or;
            }
        });
        var ar = {
            BASE_FONT_FAMILY: "Menlo, monospace",
            BASE_FONT_SIZE: "11px",
            BASE_LINE_HEIGHT: 1.2,
            BASE_BACKGROUND_COLOR: "rgb(36, 36, 36)",
            BASE_COLOR: "rgb(213, 213, 213)",
            OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
            OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
            OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
            OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
            OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
            OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
            OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
            OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
            OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
            OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
            OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(85, 106, 242)",
            HTML_TAG_COLOR: "rgb(93, 176, 215)",
            HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
            HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
            HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
            HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
            HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
            HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
            ARROW_COLOR: "rgb(145, 145, 145)",
            ARROW_MARGIN_RIGHT: 3,
            ARROW_FONT_SIZE: 12,
            ARROW_ANIMATION_DURATION: "0",
            TREENODE_FONT_FAMILY: "Menlo, monospace",
            TREENODE_FONT_SIZE: "11px",
            TREENODE_LINE_HEIGHT: 1.2,
            TREENODE_PADDING_LEFT: 12,
            TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
            TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
            TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
            TABLE_SORT_ICON_COLOR: "black",
            TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))",
            TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
        }, or = {
            BASE_FONT_FAMILY: "Menlo, monospace",
            BASE_FONT_SIZE: "11px",
            BASE_LINE_HEIGHT: 1.2,
            BASE_BACKGROUND_COLOR: "white",
            BASE_COLOR: "black",
            OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
            OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
            OBJECT_NAME_COLOR: "rgb(136, 19, 145)",
            OBJECT_VALUE_NULL_COLOR: "rgb(128, 128, 128)",
            OBJECT_VALUE_UNDEFINED_COLOR: "rgb(128, 128, 128)",
            OBJECT_VALUE_REGEXP_COLOR: "rgb(196, 26, 22)",
            OBJECT_VALUE_STRING_COLOR: "rgb(196, 26, 22)",
            OBJECT_VALUE_SYMBOL_COLOR: "rgb(196, 26, 22)",
            OBJECT_VALUE_NUMBER_COLOR: "rgb(28, 0, 207)",
            OBJECT_VALUE_BOOLEAN_COLOR: "rgb(28, 0, 207)",
            OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(13, 34, 170)",
            HTML_TAG_COLOR: "rgb(168, 148, 166)",
            HTML_TAGNAME_COLOR: "rgb(136, 18, 128)",
            HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
            HTML_ATTRIBUTE_NAME_COLOR: "rgb(153, 69, 0)",
            HTML_ATTRIBUTE_VALUE_COLOR: "rgb(26, 26, 166)",
            HTML_COMMENT_COLOR: "rgb(35, 110, 37)",
            HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
            ARROW_COLOR: "#6e6e6e",
            ARROW_MARGIN_RIGHT: 3,
            ARROW_FONT_SIZE: 12,
            ARROW_ANIMATION_DURATION: "0",
            TREENODE_FONT_FAMILY: "Menlo, monospace",
            TREENODE_FONT_SIZE: "11px",
            TREENODE_LINE_HEIGHT: 1.2,
            TREENODE_PADDING_LEFT: 12,
            TABLE_BORDER_COLOR: "#aaa",
            TABLE_TH_BACKGROUND_COLOR: "#eee",
            TABLE_TH_HOVER_COLOR: "hsla(0, 0%, 90%, 1)",
            TABLE_SORT_ICON_COLOR: "#6e6e6e",
            TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))",
            TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
        }, rt = Z([
            {},
            function() {}
        ]), ie = {
            WebkitTouchCallout: "none",
            WebkitUserSelect: "none",
            KhtmlUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            OUserSelect: "none",
            userSelect: "none"
        }, Y = function(e) {
            return {
                DOMNodePreview: {
                    htmlOpenTag: {
                        base: {
                            color: e.HTML_TAG_COLOR
                        },
                        tagName: {
                            color: e.HTML_TAGNAME_COLOR,
                            textTransform: e.HTML_TAGNAME_TEXT_TRANSFORM
                        },
                        htmlAttributeName: {
                            color: e.HTML_ATTRIBUTE_NAME_COLOR
                        },
                        htmlAttributeValue: {
                            color: e.HTML_ATTRIBUTE_VALUE_COLOR
                        }
                    },
                    htmlCloseTag: {
                        base: {
                            color: e.HTML_TAG_COLOR
                        },
                        offsetLeft: {
                            marginLeft: -e.TREENODE_PADDING_LEFT
                        },
                        tagName: {
                            color: e.HTML_TAGNAME_COLOR,
                            textTransform: e.HTML_TAGNAME_TEXT_TRANSFORM
                        }
                    },
                    htmlComment: {
                        color: e.HTML_COMMENT_COLOR
                    },
                    htmlDoctype: {
                        color: e.HTML_DOCTYPE_COLOR
                    }
                },
                ObjectPreview: {
                    objectDescription: {
                        fontStyle: "italic"
                    },
                    preview: {
                        fontStyle: "italic"
                    },
                    arrayMaxProperties: e.OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES,
                    objectMaxProperties: e.OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES
                },
                ObjectName: {
                    base: {
                        color: e.OBJECT_NAME_COLOR
                    },
                    dimmed: {
                        opacity: .6
                    }
                },
                ObjectValue: {
                    objectValueNull: {
                        color: e.OBJECT_VALUE_NULL_COLOR
                    },
                    objectValueUndefined: {
                        color: e.OBJECT_VALUE_UNDEFINED_COLOR
                    },
                    objectValueRegExp: {
                        color: e.OBJECT_VALUE_REGEXP_COLOR
                    },
                    objectValueString: {
                        color: e.OBJECT_VALUE_STRING_COLOR
                    },
                    objectValueSymbol: {
                        color: e.OBJECT_VALUE_SYMBOL_COLOR
                    },
                    objectValueNumber: {
                        color: e.OBJECT_VALUE_NUMBER_COLOR
                    },
                    objectValueBoolean: {
                        color: e.OBJECT_VALUE_BOOLEAN_COLOR
                    },
                    objectValueFunctionPrefix: {
                        color: e.OBJECT_VALUE_FUNCTION_PREFIX_COLOR,
                        fontStyle: "italic"
                    },
                    objectValueFunctionName: {
                        fontStyle: "italic"
                    }
                },
                TreeView: {
                    treeViewOutline: {
                        padding: 0,
                        margin: 0,
                        listStyleType: "none"
                    }
                },
                TreeNode: {
                    treeNodeBase: {
                        color: e.BASE_COLOR,
                        backgroundColor: e.BASE_BACKGROUND_COLOR,
                        lineHeight: e.TREENODE_LINE_HEIGHT,
                        cursor: "default",
                        boxSizing: "border-box",
                        listStyle: "none",
                        fontFamily: e.TREENODE_FONT_FAMILY,
                        fontSize: e.TREENODE_FONT_SIZE
                    },
                    treeNodePreviewContainer: {},
                    treeNodePlaceholder: _object_spread({
                        whiteSpace: "pre",
                        fontSize: e.ARROW_FONT_SIZE,
                        marginRight: e.ARROW_MARGIN_RIGHT
                    }, ie),
                    treeNodeArrow: {
                        base: _object_spread({
                            color: e.ARROW_COLOR,
                            display: "inline-block",
                            fontSize: e.ARROW_FONT_SIZE,
                            marginRight: e.ARROW_MARGIN_RIGHT
                        }, parseFloat(e.ARROW_ANIMATION_DURATION) > 0 ? {
                            transition: "transform ".concat(e.ARROW_ANIMATION_DURATION, " ease 0s")
                        } : {}, ie),
                        expanded: {
                            WebkitTransform: "rotateZ(90deg)",
                            MozTransform: "rotateZ(90deg)",
                            transform: "rotateZ(90deg)"
                        },
                        collapsed: {
                            WebkitTransform: "rotateZ(0deg)",
                            MozTransform: "rotateZ(0deg)",
                            transform: "rotateZ(0deg)"
                        }
                    },
                    treeNodeChildNodesContainer: {
                        margin: 0,
                        paddingLeft: e.TREENODE_PADDING_LEFT
                    }
                },
                TableInspector: {
                    base: {
                        color: e.BASE_COLOR,
                        position: "relative",
                        border: "1px solid ".concat(e.TABLE_BORDER_COLOR),
                        fontFamily: e.BASE_FONT_FAMILY,
                        fontSize: e.BASE_FONT_SIZE,
                        lineHeight: "120%",
                        boxSizing: "border-box",
                        cursor: "default"
                    }
                },
                TableInspectorHeaderContainer: {
                    base: {
                        top: 0,
                        height: "17px",
                        left: 0,
                        right: 0,
                        overflowX: "hidden"
                    },
                    table: {
                        tableLayout: "fixed",
                        borderSpacing: 0,
                        borderCollapse: "separate",
                        height: "100%",
                        width: "100%",
                        margin: 0
                    }
                },
                TableInspectorDataContainer: {
                    tr: {
                        display: "table-row"
                    },
                    td: {
                        boxSizing: "border-box",
                        border: "none",
                        height: "16px",
                        verticalAlign: "top",
                        padding: "1px 4px",
                        WebkitUserSelect: "text",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "14px"
                    },
                    div: {
                        position: "static",
                        top: "17px",
                        bottom: 0,
                        overflowY: "overlay",
                        transform: "translateZ(0)",
                        left: 0,
                        right: 0,
                        overflowX: "hidden"
                    },
                    table: {
                        positon: "static",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        borderTop: "0 none transparent",
                        margin: 0,
                        backgroundImage: e.TABLE_DATA_BACKGROUND_IMAGE,
                        backgroundSize: e.TABLE_DATA_BACKGROUND_SIZE,
                        tableLayout: "fixed",
                        borderSpacing: 0,
                        borderCollapse: "separate",
                        width: "100%",
                        fontSize: e.BASE_FONT_SIZE,
                        lineHeight: "120%"
                    }
                },
                TableInspectorTH: {
                    base: {
                        position: "relative",
                        height: "auto",
                        textAlign: "left",
                        backgroundColor: e.TABLE_TH_BACKGROUND_COLOR,
                        borderBottom: "1px solid ".concat(e.TABLE_BORDER_COLOR),
                        fontWeight: "normal",
                        verticalAlign: "middle",
                        padding: "0 4px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "14px",
                        ":hover": {
                            backgroundColor: e.TABLE_TH_HOVER_COLOR
                        }
                    },
                    div: {
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        fontSize: e.BASE_FONT_SIZE,
                        lineHeight: "120%"
                    }
                },
                TableInspectorLeftBorder: {
                    none: {
                        borderLeft: "none"
                    },
                    solid: {
                        borderLeft: "1px solid ".concat(e.TABLE_BORDER_COLOR)
                    }
                },
                TableInspectorSortIcon: _object_spread({
                    display: "block",
                    marginRight: 3,
                    width: 8,
                    height: 7,
                    marginTop: -7,
                    color: e.TABLE_SORT_ICON_COLOR,
                    fontSize: 12
                }, ie)
            };
        }, le = "chromeLight", nt = Z(Y(q[le])), S = function(e) {
            return K(nt)[e];
        }, de = function(e) {
            return function(_param) {
                var tmp = _param.theme, t = tmp === void 0 ? le : tmp, r = _object_without_properties(_param, [
                    "theme"
                ]);
                var n = Ce(function() {
                    switch(Object.prototype.toString.call(t)){
                        case "[object String]":
                            return Y(q[t]);
                        case "[object Object]":
                            return Y(t);
                        default:
                            return Y(q[le]);
                    }
                }, [
                    t
                ]);
                return o.createElement(nt.Provider, {
                    value: n
                }, o.createElement(e, _object_spread({}, r)));
            };
        }, ir = function(param) {
            var _$e = param.expanded, t = param.styles;
            return o.createElement("span", {
                style: _object_spread({}, t.base, _$e ? t.expanded : t.collapsed)
            }, "\u25B6");
        }, sr = j(function(e) {
            e = _object_spread({
                expanded: !0,
                nodeRenderer: function(param) {
                    var p = param.name;
                    return o.createElement("span", null, p);
                },
                onClick: function() {},
                shouldShowArrow: !1,
                shouldShowPlaceholder: !0
            }, e);
            var t = e.expanded, r = e.onClick, n = e.children, a = e.nodeRenderer, i = e.title, s = e.shouldShowArrow, l = e.shouldShowPlaceholder, u = S("TreeNode"), c = a;
            return o.createElement("li", {
                "aria-expanded": t,
                role: "treeitem",
                style: u.treeNodeBase,
                title: i
            }, o.createElement("div", {
                style: u.treeNodePreviewContainer,
                onClick: r
            }, s || Te.count(n) > 0 ? o.createElement(ir, {
                expanded: t,
                styles: u.treeNodeArrow
            }) : l && o.createElement("span", {
                style: u.treeNodePlaceholder
            }, "\xA0"), o.createElement(c, _object_spread({}, e))), o.createElement("ol", {
                role: "group",
                style: u.treeNodeChildNodesContainer
            }, t ? n : void 0));
        }), X = "$", Xe = "*";
        var lr = function(e) {
            return Array.from({
                length: e
            }, function(t, r) {
                return [
                    X
                ].concat(Array.from({
                    length: r
                }, function() {
                    return "*";
                })).join(".");
            });
        }, ur = function(e, t, r, n, a) {
            var i = [].concat(lr(n)).concat(r).filter(function(l) {
                return typeof l == "string";
            }), s = [];
            return i.forEach(function(l) {
                var u = l.split("."), c = function(p, d, f) {
                    if (f === u.length) {
                        s.push(d);
                        return;
                    }
                    var E = u[f];
                    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    if (f === 0) J(p, t) && (E === X || E === Xe) && c(p, X, f + 1);
                    else if (E === Xe) try {
                        for(var _iterator = t(p)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                            var _step_value = _step.value, m = _step_value.name, y = _step_value.data;
                            J(y, t) && c(y, "".concat(d, ".").concat(m), f + 1);
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
                    else {
                        var m1 = p[E];
                        J(m1, t) && c(m1, "".concat(d, ".").concat(E), f + 1);
                    }
                };
                c(e, "", 0);
            }), s.reduce(function(l, u) {
                return l[u] = !0, l;
            }, _object_spread({}, a));
        }, at = j(function(e) {
            var t = e.data, r = e.dataIterator, n = e.path, a = e.depth, i = e.nodeRenderer, _K = _sliced_to_array(K(rt), 2), s = _K[0], l = _K[1], u = J(t, r), c = !!s[n], p = x(function() {
                return u && l(function(d) {
                    return _object_spread_props(_object_spread({}, d), _define_property({}, n, !c));
                });
            }, [
                u,
                l,
                n,
                c
            ]);
            return o.createElement(sr, _object_spread({
                expanded: c,
                onClick: p,
                shouldShowArrow: u,
                shouldShowPlaceholder: a > 0,
                nodeRenderer: i
            }, e), c ? _to_consumable_array(r(t)).map(function(_param) {
                var d = _param.name, f = _param.data, E = _object_without_properties(_param, [
                    "name",
                    "data"
                ]);
                return o.createElement(at, _object_spread({
                    name: d,
                    data: f,
                    depth: a + 1,
                    path: "".concat(n, ".").concat(d),
                    key: d,
                    dataIterator: r,
                    nodeRenderer: i
                }, E));
            }) : null);
        }), ot = j(function(param) {
            var _$e = param.name, t = param.data, r = param.dataIterator, n = param.nodeRenderer, a = param.expandPaths, i = param.expandLevel;
            var s = S("TreeView"), l = U({}), _l = _sliced_to_array(l, 2), u = _l[1];
            return Ae(function() {
                return u(function(c) {
                    return ur(t, r, a, i, c);
                });
            }, [
                t,
                r,
                a,
                i
            ]), o.createElement(rt.Provider, {
                value: l
            }, o.createElement("ol", {
                role: "tree",
                style: s.treeViewOutline
            }, o.createElement(at, {
                name: _$e,
                data: t,
                dataIterator: r,
                depth: 0,
                path: X,
                nodeRenderer: n
            })));
        }), me = function(param) {
            var _$e = param.name, tmp = param.dimmed, t = tmp === void 0 ? !1 : tmp, tmp1 = param.styles, r = tmp1 === void 0 ? {} : tmp1;
            var n = S("ObjectName"), a = _object_spread({}, n.base, t ? n.dimmed : {}, r);
            return o.createElement("span", {
                style: a
            }, _$e);
        }, z = function(param) {
            var _$e = param.object, t = param.styles;
            var r = S("ObjectValue"), n = function(a) {
                return _object_spread({}, r[a], t);
            };
            switch(typeof _$e === "undefined" ? "undefined" : _type_of(_$e)){
                case "bigint":
                    return o.createElement("span", {
                        style: n("objectValueNumber")
                    }, String(_$e), "n");
                case "number":
                    return o.createElement("span", {
                        style: n("objectValueNumber")
                    }, String(_$e));
                case "string":
                    return o.createElement("span", {
                        style: n("objectValueString")
                    }, '"', _$e, '"');
                case "boolean":
                    return o.createElement("span", {
                        style: n("objectValueBoolean")
                    }, String(_$e));
                case "undefined":
                    return o.createElement("span", {
                        style: n("objectValueUndefined")
                    }, "undefined");
                case "object":
                    return _$e === null ? o.createElement("span", {
                        style: n("objectValueNull")
                    }, "null") : _instanceof(_$e, Date) ? o.createElement("span", null, _$e.toString()) : _instanceof(_$e, RegExp) ? o.createElement("span", {
                        style: n("objectValueRegExp")
                    }, _$e.toString()) : Array.isArray(_$e) ? o.createElement("span", null, "Array(".concat(_$e.length, ")")) : _$e.constructor ? typeof _$e.constructor.isBuffer == "function" && _$e.constructor.isBuffer(_$e) ? o.createElement("span", null, "Buffer[".concat(_$e.length, "]")) : o.createElement("span", null, _$e.constructor.name) : o.createElement("span", null, "Object");
                case "function":
                    return o.createElement("span", null, o.createElement("span", {
                        style: n("objectValueFunctionPrefix")
                    }, "\u0192\xA0"), o.createElement("span", {
                        style: n("objectValueFunctionName")
                    }, _$e.name, "()"));
                case "symbol":
                    return o.createElement("span", {
                        style: n("objectValueSymbol")
                    }, _$e.toString());
                default:
                    return o.createElement("span", null);
            }
        }, it = Object.prototype.hasOwnProperty, cr = Object.prototype.propertyIsEnumerable;
        var ce = function(param) {
            var _$e = param.data;
            var t = S("ObjectPreview"), r = _$e;
            if ((typeof r === "undefined" ? "undefined" : _type_of(r)) != "object" || r === null || _instanceof(r, Date) || _instanceof(r, RegExp)) return o.createElement(z, {
                object: r
            });
            if (Array.isArray(r)) {
                var n = t.arrayMaxProperties, a = r.slice(0, n).map(function(s, l) {
                    return o.createElement(z, {
                        key: l,
                        object: s
                    });
                });
                r.length > n && a.push(o.createElement("span", {
                    key: "ellipsis"
                }, "\u2026"));
                var i = r.length;
                return o.createElement(o.Fragment, null, o.createElement("span", {
                    style: t.objectDescription
                }, i === 0 ? "" : "(".concat(i, ")\xa0")), o.createElement("span", {
                    style: t.preview
                }, "[", Ze(a, ", "), "]"));
            } else {
                var n1 = t.objectMaxProperties, a1 = [];
                for(var s in r)if (it.call(r, s)) {
                    var l = void 0;
                    a1.length === n1 - 1 && Object.keys(r).length > n1 && (l = o.createElement("span", {
                        key: "ellipsis"
                    }, "\u2026"));
                    var u = ue(r, s);
                    if (a1.push(o.createElement("span", {
                        key: s
                    }, o.createElement(me, {
                        name: s || '""'
                    }), ":\xA0", o.createElement(z, {
                        object: u
                    }), l)), l) break;
                }
                var i1 = r.constructor ? r.constructor.name : "Object";
                return o.createElement(o.Fragment, null, o.createElement("span", {
                    style: t.objectDescription
                }, i1 === "Object" ? "" : "".concat(i1, " ")), o.createElement("span", {
                    style: t.preview
                }, "{", Ze(a1, ", "), "}"));
            }
        }, pr = function(param) {
            var _$e = param.name, t = param.data;
            return typeof _$e == "string" ? o.createElement("span", null, o.createElement(me, {
                name: _$e
            }), o.createElement("span", null, ": "), o.createElement(ce, {
                data: t
            })) : o.createElement(ce, {
                data: t
            });
        }, fr = function(param) {
            var _$e = param.name, t = param.data, tmp = param.isNonenumerable, r = tmp === void 0 ? !1 : tmp;
            var n = t;
            return o.createElement("span", null, typeof _$e == "string" ? o.createElement(me, {
                name: _$e,
                dimmed: r
            }) : o.createElement(ce, {
                data: _$e
            }), o.createElement("span", null, ": "), o.createElement(z, {
                object: n
            }));
        }, dr = function(e, t) {
            return function dr(r) {
                var n, a, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, _i, s, l, err, a1, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, i1, s1, s2, _tmp, err, _tmp1;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            if (!((typeof r === "undefined" ? "undefined" : _type_of(r)) == "object" && r !== null || typeof r == "function")) return [
                                2
                            ];
                            n = Array.isArray(r);
                            if (!(!n && r[Symbol.iterator])) return [
                                3,
                                12
                            ];
                            a = 0;
                            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                            _state.label = 1;
                        case 1:
                            _state.trys.push([
                                1,
                                9,
                                10,
                                11
                            ]);
                            _iterator = r[Symbol.iterator]();
                            _state.label = 2;
                        case 2:
                            if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                                3,
                                8
                            ];
                            i = _step.value;
                            if (!(Array.isArray(i) && i.length === 2)) return [
                                3,
                                4
                            ];
                            _i = _sliced_to_array(i, 2), s = _i[0], l = _i[1];
                            return [
                                4,
                                {
                                    name: s,
                                    data: l
                                }
                            ];
                        case 3:
                            _state.sent();
                            return [
                                3,
                                6
                            ];
                        case 4:
                            return [
                                4,
                                {
                                    name: a.toString(),
                                    data: i
                                }
                            ];
                        case 5:
                            _state.sent();
                            _state.label = 6;
                        case 6:
                            a++;
                            _state.label = 7;
                        case 7:
                            _iteratorNormalCompletion = true;
                            return [
                                3,
                                2
                            ];
                        case 8:
                            return [
                                3,
                                11
                            ];
                        case 9:
                            err = _state.sent();
                            _didIteratorError = true;
                            _iteratorError = err;
                            return [
                                3,
                                11
                            ];
                        case 10:
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally{
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                            return [
                                7
                            ];
                        case 11:
                            return [
                                3,
                                26
                            ];
                        case 12:
                            a1 = Object.getOwnPropertyNames(r);
                            t === !0 && !n ? a1.sort() : typeof t == "function" && a1.sort(t);
                            _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
                            _state.label = 13;
                        case 13:
                            _state.trys.push([
                                13,
                                21,
                                22,
                                23
                            ]);
                            _iterator1 = a1[Symbol.iterator]();
                            _state.label = 14;
                        case 14:
                            if (!!(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done)) return [
                                3,
                                20
                            ];
                            i1 = _step1.value;
                            if (!cr.call(r, i1)) return [
                                3,
                                16
                            ];
                            s1 = ue(r, i1);
                            return [
                                4,
                                {
                                    name: i1 || '""',
                                    data: s1
                                }
                            ];
                        case 15:
                            _state.sent();
                            return [
                                3,
                                19
                            ];
                        case 16:
                            if (!e) return [
                                3,
                                19
                            ];
                            s2 = void 0;
                            try {
                                s2 = ue(r, i1);
                            } catch (e) {}
                            _tmp = s2 !== void 0;
                            if (!_tmp) return [
                                3,
                                18
                            ];
                            return [
                                4,
                                {
                                    name: i1,
                                    data: s2,
                                    isNonenumerable: !0
                                }
                            ];
                        case 17:
                            _tmp = _state.sent();
                            _state.label = 18;
                        case 18:
                            _tmp;
                            _state.label = 19;
                        case 19:
                            _iteratorNormalCompletion1 = true;
                            return [
                                3,
                                14
                            ];
                        case 20:
                            return [
                                3,
                                23
                            ];
                        case 21:
                            err = _state.sent();
                            _didIteratorError1 = true;
                            _iteratorError1 = err;
                            return [
                                3,
                                23
                            ];
                        case 22:
                            try {
                                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                                    _iterator1.return();
                                }
                            } finally{
                                if (_didIteratorError1) {
                                    throw _iteratorError1;
                                }
                            }
                            return [
                                7
                            ];
                        case 23:
                            _tmp1 = e && r !== Object.prototype;
                            if (!_tmp1) return [
                                3,
                                25
                            ];
                            return [
                                4,
                                {
                                    name: "__proto__",
                                    data: Object.getPrototypeOf(r),
                                    isNonenumerable: !0
                                }
                            ];
                        case 24:
                            _tmp1 = _state.sent();
                            _state.label = 25;
                        case 25:
                            _tmp1;
                            _state.label = 26;
                        case 26:
                            return [
                                2
                            ];
                    }
                });
            };
        }, mr = function(param) {
            var _$e = param.depth, t = param.name, r = param.data, n = param.isNonenumerable;
            return _$e === 0 ? o.createElement(pr, {
                name: t,
                data: r
            }) : o.createElement(fr, {
                name: t,
                data: r,
                isNonenumerable: n
            });
        }, gr = function(_param) {
            var tmp = _param.showNonenumerable, _$e = tmp === void 0 ? !1 : tmp, t = _param.sortObjectKeys, r = _param.nodeRenderer, n = _object_without_properties(_param, [
                "showNonenumerable",
                "sortObjectKeys",
                "nodeRenderer"
            ]);
            var a = dr(_$e, t), i = r || mr;
            return o.createElement(ot, _object_spread({
                nodeRenderer: i,
                dataIterator: a
            }, n));
        }, br = de(gr);
        var Er = function(param) {
            var _$e = param.rows, t = param.columns, r = param.rowsData;
            var n = S("TableInspectorDataContainer"), a = S("TableInspectorLeftBorder");
            return o.createElement("div", {
                style: n.div
            }, o.createElement("table", {
                style: n.table
            }, o.createElement("colgroup", null), o.createElement("tbody", null, _$e.map(function(i, s) {
                return o.createElement("tr", {
                    key: i,
                    style: n.tr
                }, o.createElement("td", {
                    style: _object_spread({}, n.td, a.none)
                }, i), t.map(function(l) {
                    var u = r[s];
                    return (typeof u === "undefined" ? "undefined" : _type_of(u)) == "object" && u !== null && it.call(u, l) ? o.createElement("td", {
                        key: l,
                        style: _object_spread({}, n.td, a.solid)
                    }, o.createElement(z, {
                        object: u[l]
                    })) : o.createElement("td", {
                        key: l,
                        style: _object_spread({}, n.td, a.solid)
                    });
                }));
            }))));
        }, yr = function(e) {
            return o.createElement("div", {
                style: {
                    position: "absolute",
                    top: 1,
                    right: 0,
                    bottom: 1,
                    display: "flex",
                    alignItems: "center"
                }
            }, e.children);
        }, Or = function(param) {
            var _$e = param.sortAscending;
            var t = S("TableInspectorSortIcon"), r = _$e ? "\u25B2" : "\u25BC";
            return o.createElement("div", {
                style: t
            }, r);
        }, Ke = function(_param) {
            var tmp = _param.sortAscending, _$e = tmp === void 0 ? !1 : tmp, tmp1 = _param.sorted, t = tmp1 === void 0 ? !1 : tmp1, tmp2 = _param.onClick, r = tmp2 === void 0 ? void 0 : tmp2, tmp3 = _param.borderStyle, n = tmp3 === void 0 ? {} : tmp3, a = _param.children, i = _object_without_properties(_param, [
                "sortAscending",
                "sorted",
                "onClick",
                "borderStyle",
                "children"
            ]);
            var s = S("TableInspectorTH"), _U = _sliced_to_array(U(!1), 2), l = _U[0], u = _U[1], c = x(function() {
                return u(!0);
            }, []), p = x(function() {
                return u(!1);
            }, []);
            return o.createElement("th", _object_spread_props(_object_spread({}, i), {
                style: _object_spread({}, s.base, n, l ? s.base[":hover"] : {}),
                onMouseEnter: c,
                onMouseLeave: p,
                onClick: r
            }), o.createElement("div", {
                style: s.div
            }, a), t && o.createElement(yr, null, o.createElement(Or, {
                sortAscending: _$e
            })));
        }, Tr = function(param) {
            var tmp = param.indexColumnText, _$e = tmp === void 0 ? "(index)" : tmp, tmp1 = param.columns, t = tmp1 === void 0 ? [] : tmp1, r = param.sorted, n = param.sortIndexColumn, a = param.sortColumn, i = param.sortAscending, s = param.onTHClick, l = param.onIndexTHClick;
            var u = S("TableInspectorHeaderContainer"), c = S("TableInspectorLeftBorder");
            return o.createElement("div", {
                style: u.base
            }, o.createElement("table", {
                style: u.table
            }, o.createElement("tbody", null, o.createElement("tr", null, o.createElement(Ke, {
                borderStyle: c.none,
                sorted: r && n,
                sortAscending: i,
                onClick: l
            }, _$e), t.map(function(p) {
                return o.createElement(Ke, {
                    borderStyle: c.solid,
                    key: p,
                    sorted: r && a === p,
                    sortAscending: i,
                    onClick: s.bind(null, p)
                }, p);
            })))));
        }, _r = function(param) {
            var _$e = param.data, t = param.columns;
            var r = S("TableInspector"), _U = _sliced_to_array(U({
                sorted: !1,
                sortIndexColumn: !1,
                sortColumn: void 0,
                sortAscending: !1
            }), 2), _U_ = _U[0], n = _U_.sorted, a = _U_.sortIndexColumn, i = _U_.sortColumn, s = _U_.sortAscending, l = _U[1], u = x(function() {
                l(function(param) {
                    var m = param.sortIndexColumn, y = param.sortAscending;
                    return {
                        sorted: !0,
                        sortIndexColumn: !0,
                        sortColumn: void 0,
                        sortAscending: m ? !y : !0
                    };
                });
            }, []), c = x(function(m) {
                l(function(param) {
                    var y = param.sortColumn, O = param.sortAscending;
                    return {
                        sorted: !0,
                        sortIndexColumn: !1,
                        sortColumn: m,
                        sortAscending: m === y ? !O : !0
                    };
                });
            }, []);
            if ((typeof _$e === "undefined" ? "undefined" : _type_of(_$e)) != "object" || _$e === null) return o.createElement("div", null);
            var _hr = hr(_$e), p = _hr.rowHeaders, d = _hr.colHeaders;
            t !== void 0 && (d = t);
            var f = p.map(function(m) {
                return _$e[m];
            }), E;
            if (i !== void 0 ? E = f.map(function(m, y) {
                return (typeof m === "undefined" ? "undefined" : _type_of(m)) == "object" && m !== null ? [
                    m[i],
                    y
                ] : [
                    void 0,
                    y
                ];
            }) : a && (E = p.map(function(m, y) {
                return [
                    p[y],
                    y
                ];
            })), E !== void 0) {
                var m = function(O, N) {
                    return function(ut, ct) {
                        var ge = O(ut), be = O(ct), he = typeof ge === "undefined" ? "undefined" : _type_of(ge), Ee = typeof be === "undefined" ? "undefined" : _type_of(be), ye = function(P, Oe) {
                            return P < Oe ? -1 : P > Oe ? 1 : 0;
                        }, M;
                        if (he === Ee) M = ye(ge, be);
                        else {
                            var P = {
                                string: 0,
                                number: 1,
                                object: 2,
                                symbol: 3,
                                boolean: 4,
                                undefined: 5,
                                function: 6
                            };
                            M = ye(P[he], P[Ee]);
                        }
                        return N || (M = -M), M;
                    };
                }, y = E.sort(m(function(O) {
                    return O[0];
                }, s)).map(function(O) {
                    return O[1];
                });
                p = y.map(function(O) {
                    return p[O];
                }), f = y.map(function(O) {
                    return f[O];
                });
            }
            return o.createElement("div", {
                style: r.base
            }, o.createElement(Tr, {
                columns: d,
                sorted: n,
                sortIndexColumn: a,
                sortColumn: i,
                sortAscending: s,
                onTHClick: c,
                onIndexTHClick: u
            }), o.createElement(Er, {
                rows: p,
                columns: d,
                rowsData: f
            }));
        }, vr = de(_r), Sr = 80, st = function(e) {
            return e.childNodes.length === 0 || e.childNodes.length === 1 && e.childNodes[0].nodeType === Node.TEXT_NODE && e.textContent.length < Sr;
        }, Rr = function(param) {
            var _$e = param.tagName, t = param.attributes, r = param.styles;
            return o.createElement("span", {
                style: r.base
            }, "<", o.createElement("span", {
                style: r.tagName
            }, _$e), function() {
                if (t) {
                    var n = [];
                    for(var a = 0; a < t.length; a++){
                        var i = t[a];
                        n.push(o.createElement("span", {
                            key: a
                        }, " ", o.createElement("span", {
                            style: r.htmlAttributeName
                        }, i.name), '="', o.createElement("span", {
                            style: r.htmlAttributeValue
                        }, i.value), '"'));
                    }
                    return n;
                }
            }(), ">");
        }, Qe = function(param) {
            var _$e = param.tagName, tmp = param.isChildNode, t = tmp === void 0 ? !1 : tmp, r = param.styles;
            return o.createElement("span", {
                style: Object.assign({}, r.base, t && r.offsetLeft)
            }, "</", o.createElement("span", {
                style: r.tagName
            }, _$e), ">");
        }, Ar = {
            1: "ELEMENT_NODE",
            3: "TEXT_NODE",
            7: "PROCESSING_INSTRUCTION_NODE",
            8: "COMMENT_NODE",
            9: "DOCUMENT_NODE",
            10: "DOCUMENT_TYPE_NODE",
            11: "DOCUMENT_FRAGMENT_NODE"
        }, Cr = function(param) {
            var _$e = param.isCloseTag, t = param.data, r = param.expanded;
            var n = S("DOMNodePreview");
            if (_$e) return o.createElement(Qe, {
                styles: n.htmlCloseTag,
                isChildNode: !0,
                tagName: t.tagName
            });
            switch(t.nodeType){
                case Node.ELEMENT_NODE:
                    return o.createElement("span", null, o.createElement(Rr, {
                        tagName: t.tagName,
                        attributes: t.attributes,
                        styles: n.htmlOpenTag
                    }), st(t) ? t.textContent : !r && "\u2026", !r && o.createElement(Qe, {
                        tagName: t.tagName,
                        styles: n.htmlCloseTag
                    }));
                case Node.TEXT_NODE:
                    return o.createElement("span", null, t.textContent);
                case Node.CDATA_SECTION_NODE:
                    return o.createElement("span", null, "<![CDATA[" + t.textContent + "]]>");
                case Node.COMMENT_NODE:
                    return o.createElement("span", {
                        style: n.htmlComment
                    }, "<!--", t.textContent, "-->");
                case Node.PROCESSING_INSTRUCTION_NODE:
                    return o.createElement("span", null, t.nodeName);
                case Node.DOCUMENT_TYPE_NODE:
                    return o.createElement("span", {
                        style: n.htmlDoctype
                    }, "<!DOCTYPE ", t.name, t.publicId ? ' PUBLIC "'.concat(t.publicId, '"') : "", !t.publicId && t.systemId ? " SYSTEM" : "", t.systemId ? ' "'.concat(t.systemId, '"') : "", ">");
                case Node.DOCUMENT_NODE:
                    return o.createElement("span", null, t.nodeName);
                case Node.DOCUMENT_FRAGMENT_NODE:
                    return o.createElement("span", null, t.nodeName);
                default:
                    return o.createElement("span", null, Ar[t.nodeType]);
            }
        }, wr = function wr(e) {
            var t, r, _tmp, _tmp1;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!(e && e.childNodes)) return [
                            3,
                            8
                        ];
                        if (st(e)) return [
                            2
                        ];
                        t = 0;
                        _state.label = 1;
                    case 1:
                        if (!(t < e.childNodes.length)) return [
                            3,
                            5
                        ];
                        r = e.childNodes[t];
                        _tmp = r.nodeType === Node.TEXT_NODE && r.textContent.trim().length === 0;
                        if (_tmp) return [
                            3,
                            3
                        ];
                        return [
                            4,
                            {
                                name: "".concat(r.tagName, "[").concat(t, "]"),
                                data: r
                            }
                        ];
                    case 2:
                        _tmp = _state.sent();
                        _state.label = 3;
                    case 3:
                        _tmp;
                        _state.label = 4;
                    case 4:
                        t++;
                        return [
                            3,
                            1
                        ];
                    case 5:
                        _tmp1 = e.tagName;
                        if (!_tmp1) return [
                            3,
                            7
                        ];
                        return [
                            4,
                            {
                                name: "CLOSE_TAG",
                                data: {
                                    tagName: e.tagName
                                },
                                isCloseTag: !0
                            }
                        ];
                    case 6:
                        _tmp1 = _state.sent();
                        _state.label = 7;
                    case 7:
                        _tmp1;
                        _state.label = 8;
                    case 8:
                        return [
                            2
                        ];
                }
            });
        }, Nr = function(e) {
            return o.createElement(ot, _object_spread({
                nodeRenderer: Cr,
                dataIterator: wr
            }, e));
        }, xr = de(Nr), Lr = er(nr()), Ir = function(_param) {
            var tmp = _param.table, _$e = tmp === void 0 ? !1 : tmp, t = _param.data, r = _object_without_properties(_param, [
                "table",
                "data"
            ]);
            return _$e ? o.createElement(vr, _object_spread({
                data: t
            }, r)) : (0, Lr.default)(t) ? o.createElement(xr, _object_spread({
                data: t
            }, r)) : o.createElement(br, _object_spread({
                data: t
            }, r));
        }, Dr = B.div({
            display: "flex",
            padding: 0,
            borderLeft: "5px solid transparent",
            borderBottom: "1px solid transparent",
            transition: "all 0.1s",
            alignItems: "flex-start",
            whiteSpace: "pre"
        }), Mr = B.div(function(param) {
            var _$e = param.theme;
            return {
                backgroundColor: qe(.5, _$e.appBorderColor),
                color: _$e.color.inverseText,
                fontSize: _$e.typography.size.s1,
                fontWeight: _$e.typography.weight.bold,
                lineHeight: 1,
                padding: "1px 5px",
                borderRadius: 20,
                margin: "2px 0px"
            };
        }), Pr = B.div({
            flex: 1,
            padding: "0 0 0 5px"
        }), lt = Se(function(param, r) {
            var _$e = param.children, t = param.className;
            return o.createElement(Le, {
                ref: r,
                horizontal: !0,
                vertical: !0,
                className: t
            }, _$e);
        });
        lt.displayName = "UnstyledWrapped";
        var Br = B(lt)({
            margin: 0,
            padding: "10px 5px 20px"
        }), Fr = ze(function(_param) {
            var _$e = _param.theme, t = _object_without_properties(_param, [
                "theme"
            ]);
            return o.createElement(Ir, _object_spread({
                theme: _$e.addonActionsTheme || "chromeLight",
                table: !1
            }, t));
        }), zr = function(param) {
            var _$e = param.actions, t = param.onClear;
            var r = we(null), n = r.current, a = n && n.scrollHeight - n.scrollTop === n.clientHeight;
            return Re(function() {
                a && (r.current.scrollTop = r.current.scrollHeight);
            }, [
                a,
                _$e.length
            ]), o.createElement(ve, null, o.createElement(Br, {
                ref: r
            }, _$e.map(function(i) {
                var _i_data_args;
                return o.createElement(Dr, {
                    key: i.id
                }, i.count > 1 && o.createElement(Mr, null, i.count), o.createElement(Pr, null, o.createElement(Fr, {
                    sortObjectKeys: !0,
                    showNonenumerable: !1,
                    name: i.data.name,
                    data: (_i_data_args = i.data.args) !== null && _i_data_args !== void 0 ? _i_data_args : i.data
                })));
            })), o.createElement(Ne, {
                actionItems: [
                    {
                        title: "Clear",
                        onClick: t
                    }
                ]
            }));
        }, Hr = function(e, t) {
            try {
                return L(e, t);
            } catch (e) {
                return !1;
            }
        }, jr = /*#__PURE__*/ function(_e) {
            "use strict";
            _inherits(jr, _e);
            function jr(e) {
                _class_call_check(this, jr);
                var _this;
                _this = _call_super(this, jr, [
                    e
                ]), _this.handleStoryChange = function() {
                    var _this_state = _this.state, t = _this_state.actions;
                    t.length > 0 && t[0].options.clearOnStoryChange && _this.clearActions();
                }, _this.addAction = function(t) {
                    _this.setState(function(r) {
                        var n = _to_consumable_array(r.actions), a = n.length && n[n.length - 1];
                        return a && Hr(a.data, t.data) ? a.count++ : (t.count = 1, n.push(t)), {
                            actions: n.slice(0, t.options.limit)
                        };
                    });
                }, _this.clearActions = function() {
                    var _this_props = _this.props, t = _this_props.api;
                    t.emit(et), _this.setState({
                        actions: []
                    });
                }, _this.mounted = !1, _this.state = {
                    actions: []
                };
                return _this;
            }
            _create_class(jr, [
                {
                    key: "componentDidMount",
                    value: function componentDidMount() {
                        this.mounted = !0;
                        var _this_props = this.props, _$e = _this_props.api;
                        _$e.on(se, this.addAction), _$e.on(k, this.handleStoryChange);
                    }
                },
                {
                    key: "componentWillUnmount",
                    value: function componentWillUnmount() {
                        this.mounted = !1;
                        var _this_props = this.props, _$e = _this_props.api;
                        _$e.off(k, this.handleStoryChange), _$e.off(se, this.addAction);
                    }
                },
                {
                    key: "render",
                    value: function render() {
                        var _this_state = this.state, tmp = _this_state.actions, _$e = tmp === void 0 ? [] : tmp, _this_props = this.props, t = _this_props.active, r = {
                            actions: _$e,
                            onClear: this.clearActions
                        };
                        return t ? o.createElement(zr, _object_spread({}, r)) : null;
                    }
                }
            ]);
            return jr;
        }(_e);
        Q.register(H, function(e) {
            Q.add(Yt, {
                title: Ur,
                type: De.PANEL,
                render: function(param) {
                    var t = param.active;
                    return o.createElement(jr, {
                        api: e,
                        active: !!t
                    });
                },
                paramKey: $t
            });
        });
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
