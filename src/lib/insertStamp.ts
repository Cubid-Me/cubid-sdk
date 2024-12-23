import axios from "axios"
import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
    "XXXX",
    "XXXX"
);

export const insertStampPerm = async (stampId: any, dapp_user_id: any) => {
    await axios.post("/api/supabase/insert", {
        body: {
            stamp_id: stampId,
            dappuser_id: dapp_user_id,
            can_write: true,
            can_delete: true,
            can_read: true,
        },
        table: "stamp_dappuser_permissions"
    })
}

export const encode_data = async (str: string) => {
    const seed = 0
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i)
        h1 = Math.imul(h1 ^ ch, 2654435761)
        h2 = Math.imul(h2 ^ ch, 1597334677)
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

    return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}


export const stampsWithId = {
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
}


export const insertStamp = async ({ stampData, user_data, stamp_type, app_id }: { app_id: number, stampData: any, user_data: { user_id: number, uuid: string }, stamp_type: keyof typeof stampsWithId }) => {
    console.log({ stampData, user_data, stamp_type, app_id }, 'stamp defense')
    const stampID = stampsWithId[stamp_type]
    const { data } = await supabase.from("stamptypes").select("*").match({ id: stampID })

    if (data?.[0]) {
        const { fields_to_use } = data?.[0];
        if (fields_to_use?.make_child_email_stamp && stampData?.email) {
            const dataToSet_stamp = {
                created_by_user_id: user_data?.user_id,
                created_by_app: app_id,
                stamptype: stampsWithId.email,
                uniquevalue: stampData.email,
                user_id_and_uniqueval: `${user_data?.user_id} ${stampsWithId.email} ${stampData.email}`,
                unique_hash: await encode_data(JSON.stringify(stampData)),
                stamp_json: { stampData },
                type_and_uniquehash: `${stampsWithId.email} ${await encode_data(
                    JSON.stringify(stampData)
                )}`,
                identity: stampData?.email
            };
            const {
                data: { data: evmData },
            } = await axios.post("/api/supabase/insert", {
                table: "stamps",
                body: dataToSet_stamp,
            })
        }
        if (fields_to_use?.make_child_phone_stamp && stampData?.phone) {
            const dataToSet_stamp = {
                created_by_user_id: user_data?.user_id,
                created_by_app: app_id,
                stamptype: stampsWithId.phone,
                uniquevalue: stampData.phone,
                user_id_and_uniqueval: `${user_data?.user_id} ${stampsWithId.phone} ${stampData.phone}`,
                unique_hash: await encode_data(JSON.stringify(stampData)),
                stamp_json: { stampData },
                type_and_uniquehash: `${stampsWithId.phone} ${await encode_data(
                    JSON.stringify(stampData)
                )}`,
                identity: stampData?.phone
            };
            const {
                data: { data: evmData },
            } = await axios.post("/api/supabase/insert", {
                table: "stamps",
                body: dataToSet_stamp,
            })
        }
    }

    const dataToSet_stamp = {
        created_by_user_id: user_data?.user_id,
        created_by_app: app_id,
        stamptype: stampsWithId[stamp_type],
        uniquevalue: stampData.uniquevalue,
        user_id_and_uniqueval: `${user_data?.user_id} ${stampsWithId[stamp_type]} ${stampData.uniquevalue}`,
        unique_hash: await encode_data(JSON.stringify(stampData)),
        stamp_json: { stampData },
        type_and_uniquehash: `${stampsWithId[stamp_type]} ${await encode_data(
            JSON.stringify(stampData)
        )}`,
        identity: stampData?.identity
    };
    const {
        data: { data: stampInsertData },
    } = await axios.post("/api/supabase/insert", {
        table: "stamps",
        body: dataToSet_stamp,
    })
    if (user_data?.uuid) {
        await insertStampPerm(stampInsertData?.[0]?.id, user_data.uuid)
    } else {
        const { data: dapp_data } = await supabase.from("dapp_users")?.select("*").match({ user_id: user_data?.user_id, dapp_id: process.env.NEXT_PUBLIC_DAPP_ID })
        if (dapp_data?.[0]) {
            await insertStampPerm(stampInsertData?.[0]?.id, dapp_data?.[0]?.uuid)
        } else {
            const { data: newDappUser, error } = await supabase
                .from("dapp_users")
                .insert({ user_id: user_data?.user_id, dapp_id: process.env.NEXT_PUBLIC_DAPP_ID })
                .select("*")
            await insertStampPerm(stampInsertData?.[0]?.id, newDappUser?.[0]?.uuid)
        }
    }
}