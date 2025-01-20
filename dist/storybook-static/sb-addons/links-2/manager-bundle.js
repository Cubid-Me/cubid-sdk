try {
    (function() {
        var E = __STORYBOOK_API__, T = __STORYBOOK_API__.ActiveTabs, h = __STORYBOOK_API__.Consumer, p = __STORYBOOK_API__.ManagerContext, A = __STORYBOOK_API__.Provider, b = __STORYBOOK_API__.RequestResponseError, a = __STORYBOOK_API__.addons, O = __STORYBOOK_API__.combineParameters, R = __STORYBOOK_API__.controlOrMetaKey, k = __STORYBOOK_API__.controlOrMetaSymbol, v = __STORYBOOK_API__.eventMatchesShortcut, g = __STORYBOOK_API__.eventToShortcut, I = __STORYBOOK_API__.experimental_requestResponse, C = __STORYBOOK_API__.isMacLike, M = __STORYBOOK_API__.isShortcutTaken, P = __STORYBOOK_API__.keyToSymbol, x = __STORYBOOK_API__.merge, f = __STORYBOOK_API__.mockChannel, q = __STORYBOOK_API__.optionOrAltSymbol, D = __STORYBOOK_API__.shortcutMatchesShortcut, G = __STORYBOOK_API__.shortcutToHumanString, K = __STORYBOOK_API__.types, V = __STORYBOOK_API__.useAddonState, $ = __STORYBOOK_API__.useArgTypes, B = __STORYBOOK_API__.useArgs, N = __STORYBOOK_API__.useChannel, Q = __STORYBOOK_API__.useGlobalTypes, U = __STORYBOOK_API__.useGlobals, Y = __STORYBOOK_API__.useParameter, H = __STORYBOOK_API__.useSharedState, L = __STORYBOOK_API__.useStoryPrepared, j = __STORYBOOK_API__.useStorybookApi, w = __STORYBOOK_API__.useStorybookState;
        var _$e = "storybook/links", n = {
            NAVIGATE: "".concat(_$e, "/navigate"),
            REQUEST: "".concat(_$e, "/request"),
            RECEIVE: "".concat(_$e, "/receive")
        };
        a.register(_$e, function(t) {
            t.on(n.REQUEST, function(param) {
                var u = param.kind, S = param.name;
                var c = t.storyId(u, S);
                t.emit(n.RECEIVE, c);
            });
        });
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
