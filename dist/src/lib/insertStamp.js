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
exports.insertStamp = exports.stampsWithId = exports.encode_data = exports.insertStampPerm = exports.supabase = void 0;
const axios_1 = __importDefault(require("axios"));
const supabase_js_1 = require("@supabase/supabase-js");
exports.supabase = (0, supabase_js_1.createClient)("XXXX", "XXXX");
const insertStampPerm = (stampId, dapp_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.post("/api/supabase/insert", {
        body: {
            stamp_id: stampId,
            dappuser_id: dapp_user_id,
            can_write: true,
            can_delete: true,
            can_read: true,
        },
        table: "stamp_dappuser_permissions"
    });
});
exports.insertStampPerm = insertStampPerm;
const encode_data = (str) => __awaiter(void 0, void 0, void 0, function* () {
    const seed = 0;
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
});
exports.encode_data = encode_data;
exports.stampsWithId = {
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
const insertStamp = (_a) => __awaiter(void 0, [_a], void 0, function* ({ stampData, user_data, stamp_type, app_id }) {
    var _b, _c, _d, _e, _f, _g;
    console.log({ stampData, user_data, stamp_type, app_id }, 'stamp defense');
    const stampID = exports.stampsWithId[stamp_type];
    const { data } = yield exports.supabase.from("stamptypes").select("*").match({ id: stampID });
    if (data === null || data === void 0 ? void 0 : data[0]) {
        const { fields_to_use } = data === null || data === void 0 ? void 0 : data[0];
        if ((fields_to_use === null || fields_to_use === void 0 ? void 0 : fields_to_use.make_child_email_stamp) && (stampData === null || stampData === void 0 ? void 0 : stampData.email)) {
            const dataToSet_stamp = {
                created_by_user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id,
                created_by_app: app_id,
                stamptype: exports.stampsWithId.email,
                uniquevalue: stampData.email,
                user_id_and_uniqueval: `${user_data === null || user_data === void 0 ? void 0 : user_data.user_id} ${exports.stampsWithId.email} ${stampData.email}`,
                unique_hash: yield (0, exports.encode_data)(JSON.stringify(stampData)),
                stamp_json: { stampData },
                type_and_uniquehash: `${exports.stampsWithId.email} ${yield (0, exports.encode_data)(JSON.stringify(stampData))}`,
                identity: stampData === null || stampData === void 0 ? void 0 : stampData.email
            };
            const { data: { data: evmData }, } = yield axios_1.default.post("/api/supabase/insert", {
                table: "stamps",
                body: dataToSet_stamp,
            });
        }
        if ((fields_to_use === null || fields_to_use === void 0 ? void 0 : fields_to_use.make_child_phone_stamp) && (stampData === null || stampData === void 0 ? void 0 : stampData.phone)) {
            const dataToSet_stamp = {
                created_by_user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id,
                created_by_app: app_id,
                stamptype: exports.stampsWithId.phone,
                uniquevalue: stampData.phone,
                user_id_and_uniqueval: `${user_data === null || user_data === void 0 ? void 0 : user_data.user_id} ${exports.stampsWithId.phone} ${stampData.phone}`,
                unique_hash: yield (0, exports.encode_data)(JSON.stringify(stampData)),
                stamp_json: { stampData },
                type_and_uniquehash: `${exports.stampsWithId.phone} ${yield (0, exports.encode_data)(JSON.stringify(stampData))}`,
                identity: stampData === null || stampData === void 0 ? void 0 : stampData.phone
            };
            const { data: { data: evmData }, } = yield axios_1.default.post("/api/supabase/insert", {
                table: "stamps",
                body: dataToSet_stamp,
            });
        }
    }
    const dataToSet_stamp = {
        created_by_user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id,
        created_by_app: app_id,
        stamptype: exports.stampsWithId[stamp_type],
        uniquevalue: stampData.uniquevalue,
        user_id_and_uniqueval: `${user_data === null || user_data === void 0 ? void 0 : user_data.user_id} ${exports.stampsWithId[stamp_type]} ${stampData.uniquevalue}`,
        unique_hash: yield (0, exports.encode_data)(JSON.stringify(stampData)),
        stamp_json: { stampData },
        type_and_uniquehash: `${exports.stampsWithId[stamp_type]} ${yield (0, exports.encode_data)(JSON.stringify(stampData))}`,
        identity: stampData === null || stampData === void 0 ? void 0 : stampData.identity
    };
    const { data: { data: stampInsertData }, } = yield axios_1.default.post("/api/supabase/insert", {
        table: "stamps",
        body: dataToSet_stamp,
    });
    if (user_data === null || user_data === void 0 ? void 0 : user_data.uuid) {
        yield (0, exports.insertStampPerm)((_b = stampInsertData === null || stampInsertData === void 0 ? void 0 : stampInsertData[0]) === null || _b === void 0 ? void 0 : _b.id, user_data.uuid);
    }
    else {
        const { data: dapp_data } = yield ((_c = exports.supabase.from("dapp_users")) === null || _c === void 0 ? void 0 : _c.select("*").match({ user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id, dapp_id: process.env.NEXT_PUBLIC_DAPP_ID }));
        if (dapp_data === null || dapp_data === void 0 ? void 0 : dapp_data[0]) {
            yield (0, exports.insertStampPerm)((_d = stampInsertData === null || stampInsertData === void 0 ? void 0 : stampInsertData[0]) === null || _d === void 0 ? void 0 : _d.id, (_e = dapp_data === null || dapp_data === void 0 ? void 0 : dapp_data[0]) === null || _e === void 0 ? void 0 : _e.uuid);
        }
        else {
            const { data: newDappUser, error } = yield exports.supabase
                .from("dapp_users")
                .insert({ user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id, dapp_id: process.env.NEXT_PUBLIC_DAPP_ID })
                .select("*");
            yield (0, exports.insertStampPerm)((_f = stampInsertData === null || stampInsertData === void 0 ? void 0 : stampInsertData[0]) === null || _f === void 0 ? void 0 : _f.id, (_g = newDappUser === null || newDappUser === void 0 ? void 0 : newDappUser[0]) === null || _g === void 0 ? void 0 : _g.uuid);
        }
    }
});
exports.insertStamp = insertStamp;
