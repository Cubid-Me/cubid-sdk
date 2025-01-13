"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubidWidgetCollection = exports.CubidWidget = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const index_1 = require("../stamps/index");
const axios_1 = __importDefault(require("axios"));
const stampsWithId = {
    facebook: 1,
    github: 2,
    google: 3,
    twitter: 4,
    discord: 5,
    poh: 6,
    iah: 7,
    brightid: 8,
    gitcoin: 9,
    instagram: 10,
    phone: 11,
    gooddollar: 12,
    "near-wallet": 15,
    fractal: 17,
    evm: 14,
    email: 13,
    solana: 53,
    telegram: 27,
    worldcoin: 26,
    near: 15,
    "lens-protocol": 66,
    'farcaster': 68
};
/**
 * A simple React widget for the Cubid SDK.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the widget.
 */
const CubidWidget = ({ stampToRender, uuid, page_id, api_key, onStampChange }) => {
    var _a;
    const [allStamps, setAllStamps] = react_1.default.useState([]);
    const [user_email, setUserEmail] = react_1.default.useState();
    const fetchStampData = react_1.default.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (uuid) {
            try {
                const { data: { all_stamps: dbData, email }, } = yield axios_1.default.post(`https://passport.cubid.me/api/v2/identity/fetch_stamps`, {
                    user_id: uuid,
                    apikey: api_key,
                    page_id: page_id
                });
                setUserEmail(email);
                setAllStamps(dbData);
            }
            catch (error) {
                console.error("Error fetching stamps:", error);
            }
        }
    }), [uuid, api_key, page_id]);
    react_1.default.useEffect(() => {
        fetchStampData();
    }, [fetchStampData]);
    const showAllowCreds = (_a = allStamps.filter((item) => !item.permAvailable && stampsWithId[stampToRender] === item.stamptype)) === null || _a === void 0 ? void 0 : _a[0];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "p-3" },
            react_1.default.createElement(index_1.Stamps, { allStampIds: [...allStamps.filter((item) => item.stamptype == stampsWithId[stampToRender])].map((item) => item.id), refresh: fetchStampData, email: user_email, stampToRender: stampToRender, uuid: uuid, onStampChange: onStampChange, page_id: page_id, api_key: api_key, showAllowCreds: showAllowCreds }))));
};
exports.CubidWidget = CubidWidget;
const CubidWidgetCollection = ({ stampToRender, uuid, page_id, api_key, onStampChange }) => {
    const [allStamps, setAllStamps] = react_1.default.useState([]);
    const [user_email, setUserEmail] = react_1.default.useState();
    const [showAllowCreds, setShowAllowCreds] = react_1.default.useState(false);
    const fetchStampData = react_1.default.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (uuid) {
            try {
                const { data: { all_stamps: dbData, email }, } = yield axios_1.default.post(`https://passport.cubid.me/api/v2/identity/fetch_stamps`, {
                    user_id: uuid,
                    apikey: api_key,
                    page_id: page_id
                });
                setUserEmail(email);
                setAllStamps(dbData);
            }
            catch (error) {
                console.error("Error fetching stamps:", error);
            }
        }
    }), [uuid, api_key, page_id]);
    react_1.default.useEffect(() => {
        fetchStampData();
    }, [fetchStampData]);
    react_1.default.useEffect(() => {
        stampToRender.map((_) => {
            var _a;
            const showAllowCreds = (_a = allStamps.filter((item) => !item.permAvailable && stampsWithId[_] === item.stamptype)) === null || _a === void 0 ? void 0 : _a[0];
            setShowAllowCreds(Boolean(showAllowCreds));
        });
    }, [allStamps]);
    return (react_1.default.createElement("div", { className: "grid md:grid-cols-3 px-3 gap-4 grid-cols-1" }, stampToRender.map((item) => (react_1.default.createElement(exports.CubidWidget, { onStampChange: onStampChange, stampToRender: item, uuid: uuid, page_id: page_id, api_key: api_key })))));
};
exports.CubidWidgetCollection = CubidWidgetCollection;
