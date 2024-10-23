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
exports.useStamps = void 0;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const useAuth_1 = __importDefault(require("./useAuth"));
const useStamps = ({ user }) => {
    const [stamps, setStamps] = (0, react_1.useState)([]);
    const [gitcoinScore, setGitcoinScore] = (0, react_1.useState)(0);
    const { supabaseUser } = (0, useAuth_1.default)();
    const fetchNearAndGitcoinStamps = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (supabaseUser === null || supabaseUser === void 0 ? void 0 : supabaseUser.id) {
            const { data: { data: gitcoin_data }, } = yield axios_1.default.post("/api/supabase/select", {
                match: {
                    created_by_user_id: user ? user === null || user === void 0 ? void 0 : user.id : supabaseUser.id,
                    stamptype: 9,
                },
                table: "stamps",
            });
            const gitcoinStamps = (_d = (_c = (_b = (_a = gitcoin_data === null || gitcoin_data === void 0 ? void 0 : gitcoin_data[0]) === null || _a === void 0 ? void 0 : _a.stamp_json) === null || _b === void 0 ? void 0 : _b.stamps) === null || _c === void 0 ? void 0 : _c.items) !== null && _d !== void 0 ? _d : [];
            setStamps(gitcoinStamps);
            setGitcoinScore(Math.round((_h = (_g = (_f = (_e = gitcoin_data === null || gitcoin_data === void 0 ? void 0 : gitcoin_data[0]) === null || _e === void 0 ? void 0 : _e.stamp_json) === null || _f === void 0 ? void 0 : _f.scores) === null || _g === void 0 ? void 0 : _g.score) !== null && _h !== void 0 ? _h : 0));
        }
    }), [supabaseUser, user]);
    (0, react_1.useEffect)(() => {
        fetchNearAndGitcoinStamps();
    }, [fetchNearAndGitcoinStamps]);
    const stampCollector = (0, react_1.useMemo)(() => {
        var _a, _b, _c, _d;
        const stampDataArray = [];
        let counter = 0;
        for (const i of stamps) {
            let st = {
                id: counter,
                stamp: (_b = (_a = i === null || i === void 0 ? void 0 : i.metadata) === null || _a === void 0 ? void 0 : _a.platform) === null || _b === void 0 ? void 0 : _b.id,
                icon: (_d = (_c = i === null || i === void 0 ? void 0 : i.metadata) === null || _c === void 0 ? void 0 : _c.platform) === null || _d === void 0 ? void 0 : _d.icon,
            };
            stampDataArray.push(st);
            counter += 1;
        }
        return stampDataArray;
    }, [stamps]);
    return { stamps, stampCollector, fetchNearAndGitcoinStamps, gitcoinScore };
};
exports.useStamps = useStamps;
