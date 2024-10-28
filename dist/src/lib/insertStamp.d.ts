export declare const supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", any>;
export declare const insertStampPerm: (stampId: any, dapp_user_id: any) => Promise<void>;
export declare const encode_data: (str: string) => Promise<number>;
export declare const stampsWithId: {
    facebook: number;
    github: number;
    google: number;
    twitter: number;
    discord: number;
    poh: number;
    iah: number;
    brightid: number;
    gitcoin: number;
    instagram: number;
    phone: number;
    gooddollar: number;
    "near-wallet": number;
    fractal: number;
    evm: number;
    email: number;
    solana: number;
    telegram: number;
    worldcoin: number;
    near: number;
    "lens-protocol": number;
    farcaster: number;
    address: number;
};
export declare const insertStamp: ({ stampData, user_data, stamp_type, app_id }: {
    app_id: number;
    stampData: any;
    user_data: {
        user_id: number;
        uuid: string;
    };
    stamp_type: keyof typeof stampsWithId;
}) => Promise<void>;
