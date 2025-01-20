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
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
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
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
export var supabase = createClient("XXXX", "XXXX");
export var insertStampPerm = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(stampId, dapp_user_id) {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        axios.post("/api/supabase/insert", {
                            body: {
                                stamp_id: stampId,
                                dappuser_id: dapp_user_id,
                                can_write: true,
                                can_delete: true,
                                can_read: true
                            },
                            table: "stamp_dappuser_permissions"
                        })
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return function insertStampPerm(stampId, dapp_user_id) {
        return _ref.apply(this, arguments);
    };
}();
export var encode_data = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(str) {
        var seed, h1, h2, i, ch;
        return _ts_generator(this, function(_state) {
            seed = 0;
            h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
            for(i = 0; i < str.length; i++){
                ch = str.charCodeAt(i);
                h1 = Math.imul(h1 ^ ch, 2654435761);
                h2 = Math.imul(h2 ^ ch, 1597334677);
            }
            h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
            h1 ^= Math.imul(h2 ^ h2 >>> 13, 3266489909);
            h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
            h2 ^= Math.imul(h1 ^ h1 >>> 13, 3266489909);
            return [
                2,
                4294967296 * (2097151 & h2) + (h1 >>> 0)
            ];
        });
    });
    return function encode_data(str) {
        return _ref.apply(this, arguments);
    };
}();
export var stampsWithId = {
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
    'farcaster': 68,
    'address': 70
};
export var insertStamp = /*#__PURE__*/ function() {
    var _ref = _async_to_generator(function(param) {
        var stampData, user_data, stamp_type, app_id, stampID, data, fields_to_use, dataToSet_stamp, _tmp, _, _1, _ref, _ref_data, evmData, dataToSet_stamp1, _tmp1, _2, _3, _ref1, _ref_data1, evmData1, dataToSet_stamp2, _tmp2, _4, _5, _ref2, _ref_data2, stampInsertData, _stampInsertData_, _supabase_from, _ref3, dapp_data, _stampInsertData_1, _dapp_data_, _stampInsertData_2, _newDappUser_, _ref4, newDappUser, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    stampData = param.stampData, user_data = param.user_data, stamp_type = param.stamp_type, app_id = param.app_id;
                    console.log({
                        stampData: stampData,
                        user_data: user_data,
                        stamp_type: stamp_type,
                        app_id: app_id
                    }, 'stamp defense');
                    stampID = stampsWithId[stamp_type];
                    return [
                        4,
                        supabase.from("stamptypes").select("*").match({
                            id: stampID
                        })
                    ];
                case 1:
                    data = _state.sent().data;
                    if (!(data === null || data === void 0 ? void 0 : data[0])) return [
                        3,
                        9
                    ];
                    fields_to_use = (data === null || data === void 0 ? void 0 : data[0]).fields_to_use;
                    if (!((fields_to_use === null || fields_to_use === void 0 ? void 0 : fields_to_use.make_child_email_stamp) && (stampData === null || stampData === void 0 ? void 0 : stampData.email))) return [
                        3,
                        5
                    ];
                    _tmp = {
                        created_by_user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id,
                        created_by_app: app_id,
                        stamptype: stampsWithId.email,
                        uniquevalue: stampData.email,
                        user_id_and_uniqueval: "".concat(user_data === null || user_data === void 0 ? void 0 : user_data.user_id, " ").concat(stampsWithId.email, " ").concat(stampData.email)
                    };
                    return [
                        4,
                        encode_data(JSON.stringify(stampData))
                    ];
                case 2:
                    _tmp.unique_hash = _state.sent(), _tmp.stamp_json = {
                        stampData: stampData
                    };
                    _1 = (_ = "".concat(stampsWithId.email, " ")).concat;
                    return [
                        4,
                        encode_data(JSON.stringify(stampData))
                    ];
                case 3:
                    dataToSet_stamp = (_tmp.type_and_uniquehash = _1.apply(_, [
                        _state.sent()
                    ]), _tmp.identity = stampData === null || stampData === void 0 ? void 0 : stampData.email, _tmp);
                    return [
                        4,
                        axios.post("/api/supabase/insert", {
                            table: "stamps",
                            body: dataToSet_stamp
                        })
                    ];
                case 4:
                    _ref = _state.sent(), _ref_data = _ref.data, evmData = _ref_data.data;
                    _state.label = 5;
                case 5:
                    if (!((fields_to_use === null || fields_to_use === void 0 ? void 0 : fields_to_use.make_child_phone_stamp) && (stampData === null || stampData === void 0 ? void 0 : stampData.phone))) return [
                        3,
                        9
                    ];
                    _tmp1 = {
                        created_by_user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id,
                        created_by_app: app_id,
                        stamptype: stampsWithId.phone,
                        uniquevalue: stampData.phone,
                        user_id_and_uniqueval: "".concat(user_data === null || user_data === void 0 ? void 0 : user_data.user_id, " ").concat(stampsWithId.phone, " ").concat(stampData.phone)
                    };
                    return [
                        4,
                        encode_data(JSON.stringify(stampData))
                    ];
                case 6:
                    _tmp1.unique_hash = _state.sent(), _tmp1.stamp_json = {
                        stampData: stampData
                    };
                    _3 = (_2 = "".concat(stampsWithId.phone, " ")).concat;
                    return [
                        4,
                        encode_data(JSON.stringify(stampData))
                    ];
                case 7:
                    dataToSet_stamp1 = (_tmp1.type_and_uniquehash = _3.apply(_2, [
                        _state.sent()
                    ]), _tmp1.identity = stampData === null || stampData === void 0 ? void 0 : stampData.phone, _tmp1);
                    return [
                        4,
                        axios.post("/api/supabase/insert", {
                            table: "stamps",
                            body: dataToSet_stamp1
                        })
                    ];
                case 8:
                    _ref1 = _state.sent(), _ref_data1 = _ref1.data, evmData1 = _ref_data1.data;
                    _state.label = 9;
                case 9:
                    _tmp2 = {
                        created_by_user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id,
                        created_by_app: app_id,
                        stamptype: stampsWithId[stamp_type],
                        uniquevalue: stampData.uniquevalue,
                        user_id_and_uniqueval: "".concat(user_data === null || user_data === void 0 ? void 0 : user_data.user_id, " ").concat(stampsWithId[stamp_type], " ").concat(stampData.uniquevalue)
                    };
                    return [
                        4,
                        encode_data(JSON.stringify(stampData))
                    ];
                case 10:
                    _tmp2.unique_hash = _state.sent(), _tmp2.stamp_json = {
                        stampData: stampData
                    };
                    _5 = (_4 = "".concat(stampsWithId[stamp_type], " ")).concat;
                    return [
                        4,
                        encode_data(JSON.stringify(stampData))
                    ];
                case 11:
                    dataToSet_stamp2 = (_tmp2.type_and_uniquehash = _5.apply(_4, [
                        _state.sent()
                    ]), _tmp2.identity = stampData === null || stampData === void 0 ? void 0 : stampData.identity, _tmp2);
                    return [
                        4,
                        axios.post("/api/supabase/insert", {
                            table: "stamps",
                            body: dataToSet_stamp2
                        })
                    ];
                case 12:
                    _ref2 = _state.sent(), _ref_data2 = _ref2.data, stampInsertData = _ref_data2.data;
                    if (!(user_data === null || user_data === void 0 ? void 0 : user_data.uuid)) return [
                        3,
                        14
                    ];
                    return [
                        4,
                        insertStampPerm(stampInsertData === null || stampInsertData === void 0 ? void 0 : (_stampInsertData_ = stampInsertData[0]) === null || _stampInsertData_ === void 0 ? void 0 : _stampInsertData_.id, user_data.uuid)
                    ];
                case 13:
                    _state.sent();
                    return [
                        3,
                        20
                    ];
                case 14:
                    return [
                        4,
                        (_supabase_from = supabase.from("dapp_users")) === null || _supabase_from === void 0 ? void 0 : _supabase_from.select("*").match({
                            user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id,
                            dapp_id: process.env.NEXT_PUBLIC_DAPP_ID
                        })
                    ];
                case 15:
                    _ref3 = _state.sent(), dapp_data = _ref3.data;
                    if (!(dapp_data === null || dapp_data === void 0 ? void 0 : dapp_data[0])) return [
                        3,
                        17
                    ];
                    return [
                        4,
                        insertStampPerm(stampInsertData === null || stampInsertData === void 0 ? void 0 : (_stampInsertData_1 = stampInsertData[0]) === null || _stampInsertData_1 === void 0 ? void 0 : _stampInsertData_1.id, dapp_data === null || dapp_data === void 0 ? void 0 : (_dapp_data_ = dapp_data[0]) === null || _dapp_data_ === void 0 ? void 0 : _dapp_data_.uuid)
                    ];
                case 16:
                    _state.sent();
                    return [
                        3,
                        20
                    ];
                case 17:
                    return [
                        4,
                        supabase.from("dapp_users").insert({
                            user_id: user_data === null || user_data === void 0 ? void 0 : user_data.user_id,
                            dapp_id: process.env.NEXT_PUBLIC_DAPP_ID
                        }).select("*")
                    ];
                case 18:
                    _ref4 = _state.sent(), newDappUser = _ref4.data, error = _ref4.error;
                    return [
                        4,
                        insertStampPerm(stampInsertData === null || stampInsertData === void 0 ? void 0 : (_stampInsertData_2 = stampInsertData[0]) === null || _stampInsertData_2 === void 0 ? void 0 : _stampInsertData_2.id, newDappUser === null || newDappUser === void 0 ? void 0 : (_newDappUser_ = newDappUser[0]) === null || _newDappUser_ === void 0 ? void 0 : _newDappUser_.uuid)
                    ];
                case 19:
                    _state.sent();
                    _state.label = 20;
                case 20:
                    return [
                        2
                    ];
            }
        });
    });
    return function insertStamp(_) {
        return _ref.apply(this, arguments);
    };
}();
