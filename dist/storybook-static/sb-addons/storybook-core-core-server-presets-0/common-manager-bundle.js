function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
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
try {
    (function() {
        var T = __STORYBOOK_API__, _ = __STORYBOOK_API__.ActiveTabs, g = __STORYBOOK_API__.Consumer, O = __STORYBOOK_API__.ManagerContext, f = __STORYBOOK_API__.Provider, A = __STORYBOOK_API__.RequestResponseError, n = __STORYBOOK_API__.addons, v = __STORYBOOK_API__.combineParameters, P = __STORYBOOK_API__.controlOrMetaKey, k = __STORYBOOK_API__.controlOrMetaSymbol, x = __STORYBOOK_API__.eventMatchesShortcut, M = __STORYBOOK_API__.eventToShortcut, R = __STORYBOOK_API__.experimental_requestResponse, w = __STORYBOOK_API__.isMacLike, C = __STORYBOOK_API__.isShortcutTaken, G = __STORYBOOK_API__.keyToSymbol, I = __STORYBOOK_API__.merge, K = __STORYBOOK_API__.mockChannel, q = __STORYBOOK_API__.optionOrAltSymbol, B = __STORYBOOK_API__.shortcutMatchesShortcut, F = __STORYBOOK_API__.shortcutToHumanString, Y = __STORYBOOK_API__.types, j = __STORYBOOK_API__.useAddonState, E = __STORYBOOK_API__.useArgTypes, H = __STORYBOOK_API__.useArgs, L = __STORYBOOK_API__.useChannel, N = __STORYBOOK_API__.useGlobalTypes, z = __STORYBOOK_API__.useGlobals, D = __STORYBOOK_API__.useParameter, J = __STORYBOOK_API__.useSharedState, Q = __STORYBOOK_API__.useStoryPrepared, U = __STORYBOOK_API__.useStorybookApi, V = __STORYBOOK_API__.useStorybookState;
        var S = function() {
            var _$e;
            return (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" ? _$e = window : (typeof globalThis === "undefined" ? "undefined" : _type_of(globalThis)) < "u" ? _$e = globalThis : (typeof window === "undefined" ? "undefined" : _type_of(window)) < "u" ? _$e = window : (typeof self === "undefined" ? "undefined" : _type_of(self)) < "u" ? _$e = self : _$e = {}, _$e;
        }(), u = "static-filter";
        n.register(u, function(e) {
            var _S_TAGS_OPTIONS;
            var i = Object.entries((_S_TAGS_OPTIONS = S.TAGS_OPTIONS) !== null && _S_TAGS_OPTIONS !== void 0 ? _S_TAGS_OPTIONS : {}).reduce(function(t, r) {
                var _r = _sliced_to_array(r, 2), o = _r[0], c = _r[1];
                return c.excludeFromSidebar && (t[o] = !0), t;
            }, {});
            e.experimental_setFilter(u, function(t) {
                var _t_tags;
                var r = (_t_tags = t.tags) !== null && _t_tags !== void 0 ? _t_tags : [];
                return (r.includes("dev") || t.type === "docs") && r.filter(function(o) {
                    return i[o];
                }).length === 0;
            });
        });
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
