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
        var t = __REACT__, f = __REACT__.Children, k = __REACT__.Component, R = __REACT__.Fragment, L = __REACT__.Profiler, P = __REACT__.PureComponent, w = __REACT__.StrictMode, E = __REACT__.Suspense, D = __REACT__.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, M = __REACT__.cloneElement, x = __REACT__.createContext, v = __REACT__.createElement, H = __REACT__.createFactory, F = __REACT__.createRef, U = __REACT__.forwardRef, N = __REACT__.isValidElement, G = __REACT__.lazy, W = __REACT__.memo, K = __REACT__.startTransition, Y = __REACT__.unstable_act, u = __REACT__.useCallback, q = __REACT__.useContext, V = __REACT__.useDebugValue, Z = __REACT__.useDeferredValue, d = __REACT__.useEffect, z = __REACT__.useId, J = __REACT__.useImperativeHandle, Q = __REACT__.useInsertionEffect, X = __REACT__.useLayoutEffect, $ = __REACT__.useMemo, j = __REACT__.useReducer, oo = __REACT__.useRef, no = __REACT__.useState, eo = __REACT__.useSyncExternalStore, co = __REACT__.useTransition, to = __REACT__.version;
        var so = __STORYBOOK_API__, io = __STORYBOOK_API__.ActiveTabs, uo = __STORYBOOK_API__.Consumer, mo = __STORYBOOK_API__.ManagerContext, po = __STORYBOOK_API__.Provider, So = __STORYBOOK_API__.RequestResponseError, l = __STORYBOOK_API__.addons, Co = __STORYBOOK_API__.combineParameters, ho = __STORYBOOK_API__.controlOrMetaKey, bo = __STORYBOOK_API__.controlOrMetaSymbol, Ao = __STORYBOOK_API__.eventMatchesShortcut, To = __STORYBOOK_API__.eventToShortcut, _o = __STORYBOOK_API__.experimental_requestResponse, go = __STORYBOOK_API__.isMacLike, yo = __STORYBOOK_API__.isShortcutTaken, Bo = __STORYBOOK_API__.keyToSymbol, Oo = __STORYBOOK_API__.merge, fo = __STORYBOOK_API__.mockChannel, ko = __STORYBOOK_API__.optionOrAltSymbol, Ro = __STORYBOOK_API__.shortcutMatchesShortcut, Lo = __STORYBOOK_API__.shortcutToHumanString, m = __STORYBOOK_API__.types, Po = __STORYBOOK_API__.useAddonState, wo = __STORYBOOK_API__.useArgTypes, Eo = __STORYBOOK_API__.useArgs, Do = __STORYBOOK_API__.useChannel, Mo = __STORYBOOK_API__.useGlobalTypes, p = __STORYBOOK_API__.useGlobals, xo = __STORYBOOK_API__.useParameter, vo = __STORYBOOK_API__.useSharedState, Ho = __STORYBOOK_API__.useStoryPrepared, S = __STORYBOOK_API__.useStorybookApi, Fo = __STORYBOOK_API__.useStorybookState;
        var Ko = __STORYBOOK_COMPONENTS__, Yo = __STORYBOOK_COMPONENTS__.A, qo = __STORYBOOK_COMPONENTS__.ActionBar, Vo = __STORYBOOK_COMPONENTS__.AddonPanel, Zo = __STORYBOOK_COMPONENTS__.Badge, zo = __STORYBOOK_COMPONENTS__.Bar, Jo = __STORYBOOK_COMPONENTS__.Blockquote, Qo = __STORYBOOK_COMPONENTS__.Button, Xo = __STORYBOOK_COMPONENTS__.ClipboardCode, $o = __STORYBOOK_COMPONENTS__.Code, jo = __STORYBOOK_COMPONENTS__.DL, on = __STORYBOOK_COMPONENTS__.Div, nn = __STORYBOOK_COMPONENTS__.DocumentWrapper, en = __STORYBOOK_COMPONENTS__.EmptyTabContent, cn = __STORYBOOK_COMPONENTS__.ErrorFormatter, tn = __STORYBOOK_COMPONENTS__.FlexBar, rn = __STORYBOOK_COMPONENTS__.Form, In = __STORYBOOK_COMPONENTS__.H1, an = __STORYBOOK_COMPONENTS__.H2, ln = __STORYBOOK_COMPONENTS__.H3, sn = __STORYBOOK_COMPONENTS__.H4, un = __STORYBOOK_COMPONENTS__.H5, dn = __STORYBOOK_COMPONENTS__.H6, mn = __STORYBOOK_COMPONENTS__.HR, C = __STORYBOOK_COMPONENTS__.IconButton, pn = __STORYBOOK_COMPONENTS__.IconButtonSkeleton, Sn = __STORYBOOK_COMPONENTS__.Icons, Cn = __STORYBOOK_COMPONENTS__.Img, hn = __STORYBOOK_COMPONENTS__.LI, bn = __STORYBOOK_COMPONENTS__.Link, An = __STORYBOOK_COMPONENTS__.ListItem, Tn = __STORYBOOK_COMPONENTS__.Loader, _n = __STORYBOOK_COMPONENTS__.Modal, gn = __STORYBOOK_COMPONENTS__.OL, yn = __STORYBOOK_COMPONENTS__.P, Bn = __STORYBOOK_COMPONENTS__.Placeholder, On = __STORYBOOK_COMPONENTS__.Pre, fn = __STORYBOOK_COMPONENTS__.ResetWrapper, kn = __STORYBOOK_COMPONENTS__.ScrollArea, Rn = __STORYBOOK_COMPONENTS__.Separator, Ln = __STORYBOOK_COMPONENTS__.Spaced, Pn = __STORYBOOK_COMPONENTS__.Span, wn = __STORYBOOK_COMPONENTS__.StorybookIcon, En = __STORYBOOK_COMPONENTS__.StorybookLogo, Dn = __STORYBOOK_COMPONENTS__.Symbols, Mn = __STORYBOOK_COMPONENTS__.SyntaxHighlighter, xn = __STORYBOOK_COMPONENTS__.TT, vn = __STORYBOOK_COMPONENTS__.TabBar, Hn = __STORYBOOK_COMPONENTS__.TabButton, Fn = __STORYBOOK_COMPONENTS__.TabWrapper, Un = __STORYBOOK_COMPONENTS__.Table, Nn = __STORYBOOK_COMPONENTS__.Tabs, Gn = __STORYBOOK_COMPONENTS__.TabsState, Wn = __STORYBOOK_COMPONENTS__.TooltipLinkList, Kn = __STORYBOOK_COMPONENTS__.TooltipMessage, Yn = __STORYBOOK_COMPONENTS__.TooltipNote, qn = __STORYBOOK_COMPONENTS__.UL, Vn = __STORYBOOK_COMPONENTS__.WithTooltip, Zn = __STORYBOOK_COMPONENTS__.WithTooltipPure, zn = __STORYBOOK_COMPONENTS__.Zoom, Jn = __STORYBOOK_COMPONENTS__.codeCommon, Qn = __STORYBOOK_COMPONENTS__.components, Xn = __STORYBOOK_COMPONENTS__.createCopyToClipboardFunction, $n = __STORYBOOK_COMPONENTS__.getStoryHref, jn = __STORYBOOK_COMPONENTS__.icons, oe = __STORYBOOK_COMPONENTS__.interleaveSeparators, ne = __STORYBOOK_COMPONENTS__.nameSpaceClassNames, ee = __STORYBOOK_COMPONENTS__.resetComponents, ce = __STORYBOOK_COMPONENTS__.withReset;
        var le = __STORYBOOK_ICONS__, se = __STORYBOOK_ICONS__.AccessibilityAltIcon, ie = __STORYBOOK_ICONS__.AccessibilityIcon, ue = __STORYBOOK_ICONS__.AddIcon, de = __STORYBOOK_ICONS__.AdminIcon, me = __STORYBOOK_ICONS__.AlertAltIcon, pe = __STORYBOOK_ICONS__.AlertIcon, Se = __STORYBOOK_ICONS__.AlignLeftIcon, Ce = __STORYBOOK_ICONS__.AlignRightIcon, he = __STORYBOOK_ICONS__.AppleIcon, be = __STORYBOOK_ICONS__.ArrowBottomLeftIcon, Ae = __STORYBOOK_ICONS__.ArrowBottomRightIcon, Te = __STORYBOOK_ICONS__.ArrowDownIcon, _e = __STORYBOOK_ICONS__.ArrowLeftIcon, ge = __STORYBOOK_ICONS__.ArrowRightIcon, ye = __STORYBOOK_ICONS__.ArrowSolidDownIcon, Be = __STORYBOOK_ICONS__.ArrowSolidLeftIcon, Oe = __STORYBOOK_ICONS__.ArrowSolidRightIcon, fe = __STORYBOOK_ICONS__.ArrowSolidUpIcon, ke = __STORYBOOK_ICONS__.ArrowTopLeftIcon, Re = __STORYBOOK_ICONS__.ArrowTopRightIcon, Le = __STORYBOOK_ICONS__.ArrowUpIcon, Pe = __STORYBOOK_ICONS__.AzureDevOpsIcon, we = __STORYBOOK_ICONS__.BackIcon, Ee = __STORYBOOK_ICONS__.BasketIcon, De = __STORYBOOK_ICONS__.BatchAcceptIcon, Me = __STORYBOOK_ICONS__.BatchDenyIcon, xe = __STORYBOOK_ICONS__.BeakerIcon, ve = __STORYBOOK_ICONS__.BellIcon, He = __STORYBOOK_ICONS__.BitbucketIcon, Fe = __STORYBOOK_ICONS__.BoldIcon, Ue = __STORYBOOK_ICONS__.BookIcon, Ne = __STORYBOOK_ICONS__.BookmarkHollowIcon, Ge = __STORYBOOK_ICONS__.BookmarkIcon, We = __STORYBOOK_ICONS__.BottomBarIcon, Ke = __STORYBOOK_ICONS__.BottomBarToggleIcon, Ye = __STORYBOOK_ICONS__.BoxIcon, qe = __STORYBOOK_ICONS__.BranchIcon, Ve = __STORYBOOK_ICONS__.BrowserIcon, Ze = __STORYBOOK_ICONS__.ButtonIcon, ze = __STORYBOOK_ICONS__.CPUIcon, Je = __STORYBOOK_ICONS__.CalendarIcon, Qe = __STORYBOOK_ICONS__.CameraIcon, Xe = __STORYBOOK_ICONS__.CategoryIcon, $e = __STORYBOOK_ICONS__.CertificateIcon, je = __STORYBOOK_ICONS__.ChangedIcon, oc = __STORYBOOK_ICONS__.ChatIcon, nc = __STORYBOOK_ICONS__.CheckIcon, ec = __STORYBOOK_ICONS__.ChevronDownIcon, cc = __STORYBOOK_ICONS__.ChevronLeftIcon, tc = __STORYBOOK_ICONS__.ChevronRightIcon, rc = __STORYBOOK_ICONS__.ChevronSmallDownIcon, Ic = __STORYBOOK_ICONS__.ChevronSmallLeftIcon, ac = __STORYBOOK_ICONS__.ChevronSmallRightIcon, lc = __STORYBOOK_ICONS__.ChevronSmallUpIcon, sc = __STORYBOOK_ICONS__.ChevronUpIcon, ic = __STORYBOOK_ICONS__.ChromaticIcon, uc = __STORYBOOK_ICONS__.ChromeIcon, dc = __STORYBOOK_ICONS__.CircleHollowIcon, mc = __STORYBOOK_ICONS__.CircleIcon, pc = __STORYBOOK_ICONS__.ClearIcon, Sc = __STORYBOOK_ICONS__.CloseAltIcon, Cc = __STORYBOOK_ICONS__.CloseIcon, hc = __STORYBOOK_ICONS__.CloudHollowIcon, bc = __STORYBOOK_ICONS__.CloudIcon, Ac = __STORYBOOK_ICONS__.CogIcon, Tc = __STORYBOOK_ICONS__.CollapseIcon, _c = __STORYBOOK_ICONS__.CommandIcon, gc = __STORYBOOK_ICONS__.CommentAddIcon, yc = __STORYBOOK_ICONS__.CommentIcon, Bc = __STORYBOOK_ICONS__.CommentsIcon, Oc = __STORYBOOK_ICONS__.CommitIcon, fc = __STORYBOOK_ICONS__.CompassIcon, kc = __STORYBOOK_ICONS__.ComponentDrivenIcon, Rc = __STORYBOOK_ICONS__.ComponentIcon, Lc = __STORYBOOK_ICONS__.ContrastIcon, Pc = __STORYBOOK_ICONS__.ControlsIcon, wc = __STORYBOOK_ICONS__.CopyIcon, Ec = __STORYBOOK_ICONS__.CreditIcon, Dc = __STORYBOOK_ICONS__.CrossIcon, Mc = __STORYBOOK_ICONS__.DashboardIcon, xc = __STORYBOOK_ICONS__.DatabaseIcon, vc = __STORYBOOK_ICONS__.DeleteIcon, Hc = __STORYBOOK_ICONS__.DiamondIcon, Fc = __STORYBOOK_ICONS__.DirectionIcon, Uc = __STORYBOOK_ICONS__.DiscordIcon, Nc = __STORYBOOK_ICONS__.DocChartIcon, Gc = __STORYBOOK_ICONS__.DocListIcon, Wc = __STORYBOOK_ICONS__.DocumentIcon, Kc = __STORYBOOK_ICONS__.DownloadIcon, Yc = __STORYBOOK_ICONS__.DragIcon, qc = __STORYBOOK_ICONS__.EditIcon, Vc = __STORYBOOK_ICONS__.EllipsisIcon, Zc = __STORYBOOK_ICONS__.EmailIcon, zc = __STORYBOOK_ICONS__.ExpandAltIcon, Jc = __STORYBOOK_ICONS__.ExpandIcon, Qc = __STORYBOOK_ICONS__.EyeCloseIcon, Xc = __STORYBOOK_ICONS__.EyeIcon, $c = __STORYBOOK_ICONS__.FaceHappyIcon, jc = __STORYBOOK_ICONS__.FaceNeutralIcon, ot = __STORYBOOK_ICONS__.FaceSadIcon, nt = __STORYBOOK_ICONS__.FacebookIcon, et = __STORYBOOK_ICONS__.FailedIcon, ct = __STORYBOOK_ICONS__.FastForwardIcon, tt = __STORYBOOK_ICONS__.FigmaIcon, rt = __STORYBOOK_ICONS__.FilterIcon, It = __STORYBOOK_ICONS__.FlagIcon, at = __STORYBOOK_ICONS__.FolderIcon, lt = __STORYBOOK_ICONS__.FormIcon, st = __STORYBOOK_ICONS__.GDriveIcon, it = __STORYBOOK_ICONS__.GithubIcon, ut = __STORYBOOK_ICONS__.GitlabIcon, dt = __STORYBOOK_ICONS__.GlobeIcon, mt = __STORYBOOK_ICONS__.GoogleIcon, pt = __STORYBOOK_ICONS__.GraphBarIcon, St = __STORYBOOK_ICONS__.GraphLineIcon, Ct = __STORYBOOK_ICONS__.GraphqlIcon, ht = __STORYBOOK_ICONS__.GridAltIcon, bt = __STORYBOOK_ICONS__.GridIcon, At = __STORYBOOK_ICONS__.GrowIcon, Tt = __STORYBOOK_ICONS__.HeartHollowIcon, _t = __STORYBOOK_ICONS__.HeartIcon, gt = __STORYBOOK_ICONS__.HomeIcon, yt = __STORYBOOK_ICONS__.HourglassIcon, Bt = __STORYBOOK_ICONS__.InfoIcon, Ot = __STORYBOOK_ICONS__.ItalicIcon, ft = __STORYBOOK_ICONS__.JumpToIcon, kt = __STORYBOOK_ICONS__.KeyIcon, Rt = __STORYBOOK_ICONS__.LightningIcon, Lt = __STORYBOOK_ICONS__.LightningOffIcon, Pt = __STORYBOOK_ICONS__.LinkBrokenIcon, wt = __STORYBOOK_ICONS__.LinkIcon, Et = __STORYBOOK_ICONS__.LinkedinIcon, Dt = __STORYBOOK_ICONS__.LinuxIcon, Mt = __STORYBOOK_ICONS__.ListOrderedIcon, xt = __STORYBOOK_ICONS__.ListUnorderedIcon, vt = __STORYBOOK_ICONS__.LocationIcon, Ht = __STORYBOOK_ICONS__.LockIcon, Ft = __STORYBOOK_ICONS__.MarkdownIcon, Ut = __STORYBOOK_ICONS__.MarkupIcon, Nt = __STORYBOOK_ICONS__.MediumIcon, Gt = __STORYBOOK_ICONS__.MemoryIcon, Wt = __STORYBOOK_ICONS__.MenuIcon, Kt = __STORYBOOK_ICONS__.MergeIcon, Yt = __STORYBOOK_ICONS__.MirrorIcon, qt = __STORYBOOK_ICONS__.MobileIcon, Vt = __STORYBOOK_ICONS__.MoonIcon, Zt = __STORYBOOK_ICONS__.NutIcon, zt = __STORYBOOK_ICONS__.OutboxIcon, Jt = __STORYBOOK_ICONS__.OutlineIcon, Qt = __STORYBOOK_ICONS__.PaintBrushIcon, Xt = __STORYBOOK_ICONS__.PaperClipIcon, $t = __STORYBOOK_ICONS__.ParagraphIcon, jt = __STORYBOOK_ICONS__.PassedIcon, or = __STORYBOOK_ICONS__.PhoneIcon, nr = __STORYBOOK_ICONS__.PhotoDragIcon, er = __STORYBOOK_ICONS__.PhotoIcon, cr = __STORYBOOK_ICONS__.PinAltIcon, tr = __STORYBOOK_ICONS__.PinIcon, rr = __STORYBOOK_ICONS__.PlayBackIcon, Ir = __STORYBOOK_ICONS__.PlayIcon, ar = __STORYBOOK_ICONS__.PlayNextIcon, lr = __STORYBOOK_ICONS__.PlusIcon, sr = __STORYBOOK_ICONS__.PointerDefaultIcon, ir = __STORYBOOK_ICONS__.PointerHandIcon, ur = __STORYBOOK_ICONS__.PowerIcon, dr = __STORYBOOK_ICONS__.PrintIcon, mr = __STORYBOOK_ICONS__.ProceedIcon, pr = __STORYBOOK_ICONS__.ProfileIcon, Sr = __STORYBOOK_ICONS__.PullRequestIcon, Cr = __STORYBOOK_ICONS__.QuestionIcon, hr = __STORYBOOK_ICONS__.RSSIcon, br = __STORYBOOK_ICONS__.RedirectIcon, Ar = __STORYBOOK_ICONS__.ReduxIcon, Tr = __STORYBOOK_ICONS__.RefreshIcon, _r = __STORYBOOK_ICONS__.ReplyIcon, gr = __STORYBOOK_ICONS__.RepoIcon, yr = __STORYBOOK_ICONS__.RequestChangeIcon, Br = __STORYBOOK_ICONS__.RewindIcon, h = __STORYBOOK_ICONS__.RulerIcon, Or = __STORYBOOK_ICONS__.SearchIcon, fr = __STORYBOOK_ICONS__.ShareAltIcon, kr = __STORYBOOK_ICONS__.ShareIcon, Rr = __STORYBOOK_ICONS__.ShieldIcon, Lr = __STORYBOOK_ICONS__.SideBySideIcon, Pr = __STORYBOOK_ICONS__.SidebarAltIcon, wr = __STORYBOOK_ICONS__.SidebarAltToggleIcon, Er = __STORYBOOK_ICONS__.SidebarIcon, Dr = __STORYBOOK_ICONS__.SidebarToggleIcon, Mr = __STORYBOOK_ICONS__.SpeakerIcon, xr = __STORYBOOK_ICONS__.StackedIcon, vr = __STORYBOOK_ICONS__.StarHollowIcon, Hr = __STORYBOOK_ICONS__.StarIcon, Fr = __STORYBOOK_ICONS__.StatusFailIcon, Ur = __STORYBOOK_ICONS__.StatusPassIcon, Nr = __STORYBOOK_ICONS__.StatusWarnIcon, Gr = __STORYBOOK_ICONS__.StickerIcon, Wr = __STORYBOOK_ICONS__.StopAltIcon, Kr = __STORYBOOK_ICONS__.StopIcon, Yr = __STORYBOOK_ICONS__.StorybookIcon, qr = __STORYBOOK_ICONS__.StructureIcon, Vr = __STORYBOOK_ICONS__.SubtractIcon, Zr = __STORYBOOK_ICONS__.SunIcon, zr = __STORYBOOK_ICONS__.SupportIcon, Jr = __STORYBOOK_ICONS__.SwitchAltIcon, Qr = __STORYBOOK_ICONS__.SyncIcon, Xr = __STORYBOOK_ICONS__.TabletIcon, $r = __STORYBOOK_ICONS__.ThumbsUpIcon, jr = __STORYBOOK_ICONS__.TimeIcon, oI = __STORYBOOK_ICONS__.TimerIcon, nI = __STORYBOOK_ICONS__.TransferIcon, eI = __STORYBOOK_ICONS__.TrashIcon, cI = __STORYBOOK_ICONS__.TwitterIcon, tI = __STORYBOOK_ICONS__.TypeIcon, rI = __STORYBOOK_ICONS__.UbuntuIcon, II = __STORYBOOK_ICONS__.UndoIcon, aI = __STORYBOOK_ICONS__.UnfoldIcon, lI = __STORYBOOK_ICONS__.UnlockIcon, sI = __STORYBOOK_ICONS__.UnpinIcon, iI = __STORYBOOK_ICONS__.UploadIcon, uI = __STORYBOOK_ICONS__.UserAddIcon, dI = __STORYBOOK_ICONS__.UserAltIcon, mI = __STORYBOOK_ICONS__.UserIcon, pI = __STORYBOOK_ICONS__.UsersIcon, SI = __STORYBOOK_ICONS__.VSCodeIcon, CI = __STORYBOOK_ICONS__.VerifiedIcon, hI = __STORYBOOK_ICONS__.VideoIcon, bI = __STORYBOOK_ICONS__.WandIcon, AI = __STORYBOOK_ICONS__.WatchIcon, TI = __STORYBOOK_ICONS__.WindowsIcon, _I = __STORYBOOK_ICONS__.WrenchIcon, gI = __STORYBOOK_ICONS__.XIcon, yI = __STORYBOOK_ICONS__.YoutubeIcon, BI = __STORYBOOK_ICONS__.ZoomIcon, OI = __STORYBOOK_ICONS__.ZoomOutIcon, fI = __STORYBOOK_ICONS__.ZoomResetIcon, kI = __STORYBOOK_ICONS__.iconList;
        var s = "storybook/measure-addon", b = "".concat(s, "/tool"), A = function() {
            var _p = _sliced_to_array(p(), 2), r = _p[0], c = _p[1], I = r.measureEnabled, i = S(), a = u(function() {
                return c({
                    measureEnabled: !I
                });
            }, [
                c,
                I
            ]);
            return d(function() {
                i.setAddonShortcut(s, {
                    label: "Toggle Measure [M]",
                    defaultShortcut: [
                        "M"
                    ],
                    actionName: "measure",
                    showInMenu: !1,
                    action: a
                });
            }, [
                a,
                i
            ]), t.createElement(C, {
                key: b,
                active: I,
                title: "Enable measure",
                onClick: a
            }, t.createElement(h, null));
        };
        l.register(s, function() {
            l.add(b, {
                type: m.TOOL,
                title: "Measure",
                match: function(param) {
                    var r = param.viewMode, c = param.tabId;
                    return r === "story" && !c;
                },
                render: function() {
                    return t.createElement(A, null);
                }
            });
        });
    })();
} catch (e) {
    console.error("[Storybook] One of your manager-entries failed: " + import.meta.url, e);
}
