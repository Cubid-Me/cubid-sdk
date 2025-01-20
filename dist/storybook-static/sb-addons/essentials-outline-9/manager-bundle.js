function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
try {
    (function() {
        var t = __REACT__, k = __REACT__.Children, R = __REACT__.Component, P = __REACT__.Fragment, L = __REACT__.Profiler, w = __REACT__.PureComponent, E = __REACT__.StrictMode, D = __REACT__.Suspense, v = __REACT__.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, x = __REACT__.cloneElement, H = __REACT__.createContext, M = __REACT__.createElement, F = __REACT__.createFactory, U = __REACT__.createRef, N = __REACT__.forwardRef, G = __REACT__.isValidElement, W = __REACT__.lazy, u = __REACT__.memo, K = __REACT__.startTransition, Y = __REACT__.unstable_act, d = __REACT__.useCallback, q = __REACT__.useContext, V = __REACT__.useDebugValue, Z = __REACT__.useDeferredValue, p = __REACT__.useEffect, z = __REACT__.useId, J = __REACT__.useImperativeHandle, Q = __REACT__.useInsertionEffect, X = __REACT__.useLayoutEffect, $ = __REACT__.useMemo, j = __REACT__.useReducer, oo = __REACT__.useRef, no = __REACT__.useState, eo = __REACT__.useSyncExternalStore, co = __REACT__.useTransition, to = __REACT__.version;
        var io = __STORYBOOK_API__, so = __STORYBOOK_API__.ActiveTabs, uo = __STORYBOOK_API__.Consumer, po = __STORYBOOK_API__.ManagerContext, mo = __STORYBOOK_API__.Provider, So = __STORYBOOK_API__.RequestResponseError, l = __STORYBOOK_API__.addons, Co = __STORYBOOK_API__.combineParameters, ho = __STORYBOOK_API__.controlOrMetaKey, Ao = __STORYBOOK_API__.controlOrMetaSymbol, To = __STORYBOOK_API__.eventMatchesShortcut, _o = __STORYBOOK_API__.eventToShortcut, bo = __STORYBOOK_API__.experimental_requestResponse, go = __STORYBOOK_API__.isMacLike, yo = __STORYBOOK_API__.isShortcutTaken, Oo = __STORYBOOK_API__.keyToSymbol, Bo = __STORYBOOK_API__.merge, fo = __STORYBOOK_API__.mockChannel, ko = __STORYBOOK_API__.optionOrAltSymbol, Ro = __STORYBOOK_API__.shortcutMatchesShortcut, Po = __STORYBOOK_API__.shortcutToHumanString, m = __STORYBOOK_API__.types, Lo = __STORYBOOK_API__.useAddonState, wo = __STORYBOOK_API__.useArgTypes, Eo = __STORYBOOK_API__.useArgs, Do = __STORYBOOK_API__.useChannel, vo = __STORYBOOK_API__.useGlobalTypes, S = __STORYBOOK_API__.useGlobals, xo = __STORYBOOK_API__.useParameter, Ho = __STORYBOOK_API__.useSharedState, Mo = __STORYBOOK_API__.useStoryPrepared, C = __STORYBOOK_API__.useStorybookApi, Fo = __STORYBOOK_API__.useStorybookState;
        var Ko = __STORYBOOK_COMPONENTS__, Yo = __STORYBOOK_COMPONENTS__.A, qo = __STORYBOOK_COMPONENTS__.ActionBar, Vo = __STORYBOOK_COMPONENTS__.AddonPanel, Zo = __STORYBOOK_COMPONENTS__.Badge, zo = __STORYBOOK_COMPONENTS__.Bar, Jo = __STORYBOOK_COMPONENTS__.Blockquote, Qo = __STORYBOOK_COMPONENTS__.Button, Xo = __STORYBOOK_COMPONENTS__.ClipboardCode, $o = __STORYBOOK_COMPONENTS__.Code, jo = __STORYBOOK_COMPONENTS__.DL, on = __STORYBOOK_COMPONENTS__.Div, nn = __STORYBOOK_COMPONENTS__.DocumentWrapper, en = __STORYBOOK_COMPONENTS__.EmptyTabContent, cn = __STORYBOOK_COMPONENTS__.ErrorFormatter, tn = __STORYBOOK_COMPONENTS__.FlexBar, rn = __STORYBOOK_COMPONENTS__.Form, In = __STORYBOOK_COMPONENTS__.H1, an = __STORYBOOK_COMPONENTS__.H2, ln = __STORYBOOK_COMPONENTS__.H3, sn = __STORYBOOK_COMPONENTS__.H4, un = __STORYBOOK_COMPONENTS__.H5, dn = __STORYBOOK_COMPONENTS__.H6, pn = __STORYBOOK_COMPONENTS__.HR, h = __STORYBOOK_COMPONENTS__.IconButton, mn = __STORYBOOK_COMPONENTS__.IconButtonSkeleton, Sn = __STORYBOOK_COMPONENTS__.Icons, Cn = __STORYBOOK_COMPONENTS__.Img, hn = __STORYBOOK_COMPONENTS__.LI, An = __STORYBOOK_COMPONENTS__.Link, Tn = __STORYBOOK_COMPONENTS__.ListItem, _n = __STORYBOOK_COMPONENTS__.Loader, bn = __STORYBOOK_COMPONENTS__.Modal, gn = __STORYBOOK_COMPONENTS__.OL, yn = __STORYBOOK_COMPONENTS__.P, On = __STORYBOOK_COMPONENTS__.Placeholder, Bn = __STORYBOOK_COMPONENTS__.Pre, fn = __STORYBOOK_COMPONENTS__.ResetWrapper, kn = __STORYBOOK_COMPONENTS__.ScrollArea, Rn = __STORYBOOK_COMPONENTS__.Separator, Pn = __STORYBOOK_COMPONENTS__.Spaced, Ln = __STORYBOOK_COMPONENTS__.Span, wn = __STORYBOOK_COMPONENTS__.StorybookIcon, En = __STORYBOOK_COMPONENTS__.StorybookLogo, Dn = __STORYBOOK_COMPONENTS__.Symbols, vn = __STORYBOOK_COMPONENTS__.SyntaxHighlighter, xn = __STORYBOOK_COMPONENTS__.TT, Hn = __STORYBOOK_COMPONENTS__.TabBar, Mn = __STORYBOOK_COMPONENTS__.TabButton, Fn = __STORYBOOK_COMPONENTS__.TabWrapper, Un = __STORYBOOK_COMPONENTS__.Table, Nn = __STORYBOOK_COMPONENTS__.Tabs, Gn = __STORYBOOK_COMPONENTS__.TabsState, Wn = __STORYBOOK_COMPONENTS__.TooltipLinkList, Kn = __STORYBOOK_COMPONENTS__.TooltipMessage, Yn = __STORYBOOK_COMPONENTS__.TooltipNote, qn = __STORYBOOK_COMPONENTS__.UL, Vn = __STORYBOOK_COMPONENTS__.WithTooltip, Zn = __STORYBOOK_COMPONENTS__.WithTooltipPure, zn = __STORYBOOK_COMPONENTS__.Zoom, Jn = __STORYBOOK_COMPONENTS__.codeCommon, Qn = __STORYBOOK_COMPONENTS__.components, Xn = __STORYBOOK_COMPONENTS__.createCopyToClipboardFunction, $n = __STORYBOOK_COMPONENTS__.getStoryHref, jn = __STORYBOOK_COMPONENTS__.icons, oe = __STORYBOOK_COMPONENTS__.interleaveSeparators, ne = __STORYBOOK_COMPONENTS__.nameSpaceClassNames, ee = __STORYBOOK_COMPONENTS__.resetComponents, ce = __STORYBOOK_COMPONENTS__.withReset;
        var le = __STORYBOOK_ICONS__, ie = __STORYBOOK_ICONS__.AccessibilityAltIcon, se = __STORYBOOK_ICONS__.AccessibilityIcon, ue = __STORYBOOK_ICONS__.AddIcon, de = __STORYBOOK_ICONS__.AdminIcon, pe = __STORYBOOK_ICONS__.AlertAltIcon, me = __STORYBOOK_ICONS__.AlertIcon, Se = __STORYBOOK_ICONS__.AlignLeftIcon, Ce = __STORYBOOK_ICONS__.AlignRightIcon, he = __STORYBOOK_ICONS__.AppleIcon, Ae = __STORYBOOK_ICONS__.ArrowBottomLeftIcon, Te = __STORYBOOK_ICONS__.ArrowBottomRightIcon, _e = __STORYBOOK_ICONS__.ArrowDownIcon, be = __STORYBOOK_ICONS__.ArrowLeftIcon, ge = __STORYBOOK_ICONS__.ArrowRightIcon, ye = __STORYBOOK_ICONS__.ArrowSolidDownIcon, Oe = __STORYBOOK_ICONS__.ArrowSolidLeftIcon, Be = __STORYBOOK_ICONS__.ArrowSolidRightIcon, fe = __STORYBOOK_ICONS__.ArrowSolidUpIcon, ke = __STORYBOOK_ICONS__.ArrowTopLeftIcon, Re = __STORYBOOK_ICONS__.ArrowTopRightIcon, Pe = __STORYBOOK_ICONS__.ArrowUpIcon, Le = __STORYBOOK_ICONS__.AzureDevOpsIcon, we = __STORYBOOK_ICONS__.BackIcon, Ee = __STORYBOOK_ICONS__.BasketIcon, De = __STORYBOOK_ICONS__.BatchAcceptIcon, ve = __STORYBOOK_ICONS__.BatchDenyIcon, xe = __STORYBOOK_ICONS__.BeakerIcon, He = __STORYBOOK_ICONS__.BellIcon, Me = __STORYBOOK_ICONS__.BitbucketIcon, Fe = __STORYBOOK_ICONS__.BoldIcon, Ue = __STORYBOOK_ICONS__.BookIcon, Ne = __STORYBOOK_ICONS__.BookmarkHollowIcon, Ge = __STORYBOOK_ICONS__.BookmarkIcon, We = __STORYBOOK_ICONS__.BottomBarIcon, Ke = __STORYBOOK_ICONS__.BottomBarToggleIcon, Ye = __STORYBOOK_ICONS__.BoxIcon, qe = __STORYBOOK_ICONS__.BranchIcon, Ve = __STORYBOOK_ICONS__.BrowserIcon, Ze = __STORYBOOK_ICONS__.ButtonIcon, ze = __STORYBOOK_ICONS__.CPUIcon, Je = __STORYBOOK_ICONS__.CalendarIcon, Qe = __STORYBOOK_ICONS__.CameraIcon, Xe = __STORYBOOK_ICONS__.CategoryIcon, $e = __STORYBOOK_ICONS__.CertificateIcon, je = __STORYBOOK_ICONS__.ChangedIcon, oc = __STORYBOOK_ICONS__.ChatIcon, nc = __STORYBOOK_ICONS__.CheckIcon, ec = __STORYBOOK_ICONS__.ChevronDownIcon, cc = __STORYBOOK_ICONS__.ChevronLeftIcon, tc = __STORYBOOK_ICONS__.ChevronRightIcon, rc = __STORYBOOK_ICONS__.ChevronSmallDownIcon, Ic = __STORYBOOK_ICONS__.ChevronSmallLeftIcon, ac = __STORYBOOK_ICONS__.ChevronSmallRightIcon, lc = __STORYBOOK_ICONS__.ChevronSmallUpIcon, ic = __STORYBOOK_ICONS__.ChevronUpIcon, sc = __STORYBOOK_ICONS__.ChromaticIcon, uc = __STORYBOOK_ICONS__.ChromeIcon, dc = __STORYBOOK_ICONS__.CircleHollowIcon, pc = __STORYBOOK_ICONS__.CircleIcon, mc = __STORYBOOK_ICONS__.ClearIcon, Sc = __STORYBOOK_ICONS__.CloseAltIcon, Cc = __STORYBOOK_ICONS__.CloseIcon, hc = __STORYBOOK_ICONS__.CloudHollowIcon, Ac = __STORYBOOK_ICONS__.CloudIcon, Tc = __STORYBOOK_ICONS__.CogIcon, _c = __STORYBOOK_ICONS__.CollapseIcon, bc = __STORYBOOK_ICONS__.CommandIcon, gc = __STORYBOOK_ICONS__.CommentAddIcon, yc = __STORYBOOK_ICONS__.CommentIcon, Oc = __STORYBOOK_ICONS__.CommentsIcon, Bc = __STORYBOOK_ICONS__.CommitIcon, fc = __STORYBOOK_ICONS__.CompassIcon, kc = __STORYBOOK_ICONS__.ComponentDrivenIcon, Rc = __STORYBOOK_ICONS__.ComponentIcon, Pc = __STORYBOOK_ICONS__.ContrastIcon, Lc = __STORYBOOK_ICONS__.ControlsIcon, wc = __STORYBOOK_ICONS__.CopyIcon, Ec = __STORYBOOK_ICONS__.CreditIcon, Dc = __STORYBOOK_ICONS__.CrossIcon, vc = __STORYBOOK_ICONS__.DashboardIcon, xc = __STORYBOOK_ICONS__.DatabaseIcon, Hc = __STORYBOOK_ICONS__.DeleteIcon, Mc = __STORYBOOK_ICONS__.DiamondIcon, Fc = __STORYBOOK_ICONS__.DirectionIcon, Uc = __STORYBOOK_ICONS__.DiscordIcon, Nc = __STORYBOOK_ICONS__.DocChartIcon, Gc = __STORYBOOK_ICONS__.DocListIcon, Wc = __STORYBOOK_ICONS__.DocumentIcon, Kc = __STORYBOOK_ICONS__.DownloadIcon, Yc = __STORYBOOK_ICONS__.DragIcon, qc = __STORYBOOK_ICONS__.EditIcon, Vc = __STORYBOOK_ICONS__.EllipsisIcon, Zc = __STORYBOOK_ICONS__.EmailIcon, zc = __STORYBOOK_ICONS__.ExpandAltIcon, Jc = __STORYBOOK_ICONS__.ExpandIcon, Qc = __STORYBOOK_ICONS__.EyeCloseIcon, Xc = __STORYBOOK_ICONS__.EyeIcon, $c = __STORYBOOK_ICONS__.FaceHappyIcon, jc = __STORYBOOK_ICONS__.FaceNeutralIcon, ot = __STORYBOOK_ICONS__.FaceSadIcon, nt = __STORYBOOK_ICONS__.FacebookIcon, et = __STORYBOOK_ICONS__.FailedIcon, ct = __STORYBOOK_ICONS__.FastForwardIcon, tt = __STORYBOOK_ICONS__.FigmaIcon, rt = __STORYBOOK_ICONS__.FilterIcon, It = __STORYBOOK_ICONS__.FlagIcon, at = __STORYBOOK_ICONS__.FolderIcon, lt = __STORYBOOK_ICONS__.FormIcon, it = __STORYBOOK_ICONS__.GDriveIcon, st = __STORYBOOK_ICONS__.GithubIcon, ut = __STORYBOOK_ICONS__.GitlabIcon, dt = __STORYBOOK_ICONS__.GlobeIcon, pt = __STORYBOOK_ICONS__.GoogleIcon, mt = __STORYBOOK_ICONS__.GraphBarIcon, St = __STORYBOOK_ICONS__.GraphLineIcon, Ct = __STORYBOOK_ICONS__.GraphqlIcon, ht = __STORYBOOK_ICONS__.GridAltIcon, At = __STORYBOOK_ICONS__.GridIcon, Tt = __STORYBOOK_ICONS__.GrowIcon, _t = __STORYBOOK_ICONS__.HeartHollowIcon, bt = __STORYBOOK_ICONS__.HeartIcon, gt = __STORYBOOK_ICONS__.HomeIcon, yt = __STORYBOOK_ICONS__.HourglassIcon, Ot = __STORYBOOK_ICONS__.InfoIcon, Bt = __STORYBOOK_ICONS__.ItalicIcon, ft = __STORYBOOK_ICONS__.JumpToIcon, kt = __STORYBOOK_ICONS__.KeyIcon, Rt = __STORYBOOK_ICONS__.LightningIcon, Pt = __STORYBOOK_ICONS__.LightningOffIcon, Lt = __STORYBOOK_ICONS__.LinkBrokenIcon, wt = __STORYBOOK_ICONS__.LinkIcon, Et = __STORYBOOK_ICONS__.LinkedinIcon, Dt = __STORYBOOK_ICONS__.LinuxIcon, vt = __STORYBOOK_ICONS__.ListOrderedIcon, xt = __STORYBOOK_ICONS__.ListUnorderedIcon, Ht = __STORYBOOK_ICONS__.LocationIcon, Mt = __STORYBOOK_ICONS__.LockIcon, Ft = __STORYBOOK_ICONS__.MarkdownIcon, Ut = __STORYBOOK_ICONS__.MarkupIcon, Nt = __STORYBOOK_ICONS__.MediumIcon, Gt = __STORYBOOK_ICONS__.MemoryIcon, Wt = __STORYBOOK_ICONS__.MenuIcon, Kt = __STORYBOOK_ICONS__.MergeIcon, Yt = __STORYBOOK_ICONS__.MirrorIcon, qt = __STORYBOOK_ICONS__.MobileIcon, Vt = __STORYBOOK_ICONS__.MoonIcon, Zt = __STORYBOOK_ICONS__.NutIcon, zt = __STORYBOOK_ICONS__.OutboxIcon, A = __STORYBOOK_ICONS__.OutlineIcon, Jt = __STORYBOOK_ICONS__.PaintBrushIcon, Qt = __STORYBOOK_ICONS__.PaperClipIcon, Xt = __STORYBOOK_ICONS__.ParagraphIcon, $t = __STORYBOOK_ICONS__.PassedIcon, jt = __STORYBOOK_ICONS__.PhoneIcon, or = __STORYBOOK_ICONS__.PhotoDragIcon, nr = __STORYBOOK_ICONS__.PhotoIcon, er = __STORYBOOK_ICONS__.PinAltIcon, cr = __STORYBOOK_ICONS__.PinIcon, tr = __STORYBOOK_ICONS__.PlayBackIcon, rr = __STORYBOOK_ICONS__.PlayIcon, Ir = __STORYBOOK_ICONS__.PlayNextIcon, ar = __STORYBOOK_ICONS__.PlusIcon, lr = __STORYBOOK_ICONS__.PointerDefaultIcon, ir = __STORYBOOK_ICONS__.PointerHandIcon, sr = __STORYBOOK_ICONS__.PowerIcon, ur = __STORYBOOK_ICONS__.PrintIcon, dr = __STORYBOOK_ICONS__.ProceedIcon, pr = __STORYBOOK_ICONS__.ProfileIcon, mr = __STORYBOOK_ICONS__.PullRequestIcon, Sr = __STORYBOOK_ICONS__.QuestionIcon, Cr = __STORYBOOK_ICONS__.RSSIcon, hr = __STORYBOOK_ICONS__.RedirectIcon, Ar = __STORYBOOK_ICONS__.ReduxIcon, Tr = __STORYBOOK_ICONS__.RefreshIcon, _r = __STORYBOOK_ICONS__.ReplyIcon, br = __STORYBOOK_ICONS__.RepoIcon, gr = __STORYBOOK_ICONS__.RequestChangeIcon, yr = __STORYBOOK_ICONS__.RewindIcon, Or = __STORYBOOK_ICONS__.RulerIcon, Br = __STORYBOOK_ICONS__.SearchIcon, fr = __STORYBOOK_ICONS__.ShareAltIcon, kr = __STORYBOOK_ICONS__.ShareIcon, Rr = __STORYBOOK_ICONS__.ShieldIcon, Pr = __STORYBOOK_ICONS__.SideBySideIcon, Lr = __STORYBOOK_ICONS__.SidebarAltIcon, wr = __STORYBOOK_ICONS__.SidebarAltToggleIcon, Er = __STORYBOOK_ICONS__.SidebarIcon, Dr = __STORYBOOK_ICONS__.SidebarToggleIcon, vr = __STORYBOOK_ICONS__.SpeakerIcon, xr = __STORYBOOK_ICONS__.StackedIcon, Hr = __STORYBOOK_ICONS__.StarHollowIcon, Mr = __STORYBOOK_ICONS__.StarIcon, Fr = __STORYBOOK_ICONS__.StatusFailIcon, Ur = __STORYBOOK_ICONS__.StatusPassIcon, Nr = __STORYBOOK_ICONS__.StatusWarnIcon, Gr = __STORYBOOK_ICONS__.StickerIcon, Wr = __STORYBOOK_ICONS__.StopAltIcon, Kr = __STORYBOOK_ICONS__.StopIcon, Yr = __STORYBOOK_ICONS__.StorybookIcon, qr = __STORYBOOK_ICONS__.StructureIcon, Vr = __STORYBOOK_ICONS__.SubtractIcon, Zr = __STORYBOOK_ICONS__.SunIcon, zr = __STORYBOOK_ICONS__.SupportIcon, Jr = __STORYBOOK_ICONS__.SwitchAltIcon, Qr = __STORYBOOK_ICONS__.SyncIcon, Xr = __STORYBOOK_ICONS__.TabletIcon, $r = __STORYBOOK_ICONS__.ThumbsUpIcon, jr = __STORYBOOK_ICONS__.TimeIcon, oI = __STORYBOOK_ICONS__.TimerIcon, nI = __STORYBOOK_ICONS__.TransferIcon, eI = __STORYBOOK_ICONS__.TrashIcon, cI = __STORYBOOK_ICONS__.TwitterIcon, tI = __STORYBOOK_ICONS__.TypeIcon, rI = __STORYBOOK_ICONS__.UbuntuIcon, II = __STORYBOOK_ICONS__.UndoIcon, aI = __STORYBOOK_ICONS__.UnfoldIcon, lI = __STORYBOOK_ICONS__.UnlockIcon, iI = __STORYBOOK_ICONS__.UnpinIcon, sI = __STORYBOOK_ICONS__.UploadIcon, uI = __STORYBOOK_ICONS__.UserAddIcon, dI = __STORYBOOK_ICONS__.UserAltIcon, pI = __STORYBOOK_ICONS__.UserIcon, mI = __STORYBOOK_ICONS__.UsersIcon, SI = __STORYBOOK_ICONS__.VSCodeIcon, CI = __STORYBOOK_ICONS__.VerifiedIcon, hI = __STORYBOOK_ICONS__.VideoIcon, AI = __STORYBOOK_ICONS__.WandIcon, TI = __STORYBOOK_ICONS__.WatchIcon, _I = __STORYBOOK_ICONS__.WindowsIcon, bI = __STORYBOOK_ICONS__.WrenchIcon, gI = __STORYBOOK_ICONS__.XIcon, yI = __STORYBOOK_ICONS__.YoutubeIcon, OI = __STORYBOOK_ICONS__.ZoomIcon, BI = __STORYBOOK_ICONS__.ZoomOutIcon, fI = __STORYBOOK_ICONS__.ZoomResetIcon, kI = __STORYBOOK_ICONS__.iconList;
        var i = "storybook/outline", T = "outline", _ = u(function() {
            var _S = _sliced_to_array(S(), 2), c = _S[0], r = _S[1], s = C(), I = [
                !0,
                "true"
            ].includes(c[T]), a = d(function() {
                return r(_define_property({}, T, !I));
            }, [
                I
            ]);
            return p(function() {
                s.setAddonShortcut(i, {
                    label: "Toggle Outline",
                    defaultShortcut: [
                        "alt",
                        "O"
                    ],
                    actionName: "outline",
                    showInMenu: !1,
                    action: a
                });
            }, [
                a,
                s
            ]), t.createElement(h, {
                key: "outline",
                active: I,
                title: "Apply outlines to the preview",
                onClick: a
            }, t.createElement(A, null));
        });
        l.register(i, function() {
            l.add(i, {
                title: "Outline",
                type: m.TOOL,
                match: function(param) {
                    var c = param.viewMode, r = param.tabId;
                    return !!(c && c.match(/^(story|docs)$/)) && !r;
                },
                render: function() {
                    return t.createElement(_, null);
                }
            });
        });
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
