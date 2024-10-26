import React, { useCallback, useEffect, useState } from 'react';
import { Stamps } from '../stamps/index'
import 'tailwindcss/tailwind.css'
import { AdvancedCredentialCollection } from '../stamps/addStampVerify'
import axios from 'axios';

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
}

/**
 * A simple React widget for the Cubid SDK.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the widget.
 */
export const CubidWidget = ({ stampToRender, uuid, page_id, api_key }: { stampToRender: string, uuid: string, page_id: string, api_key: string }) => {
    const [allStamps, setAllStamps] = useState([])
    const [user_email, setUserEmail] = useState()

    const fetchStampData = useCallback(async () => {
        if (uuid) {
            try {
                const {
                    data: { all_stamps: dbData, email },
                } = await axios.post(`https://passport.cubid.me/api/v2/identity/fetch_stamps`, {
                    user_id: uuid,
                    apikey: api_key,
                    page_id: page_id
                })
                setUserEmail(email)
                setAllStamps(dbData)
            } catch (error) {
                console.error("Error fetching stamps:", error)
            }
        }
    }, [uuid, api_key, page_id])

    useEffect(() => {
        fetchStampData()
    }, [fetchStampData])


    const showAllowCreds = allStamps.filter((item) => !item.permAvailable && stampsWithId[stampToRender] === item.stamptype)?.[0]

    return (
        <>
            {allStamps.length !== 0 && showAllowCreds && (
                <AdvancedCredentialCollection allStampIds={allStamps.map((item: { id: number }) => item.id) as any} email={user_email} uuid={uuid} refresh={fetchStampData} apikey={api_key} />
            )}
            <div className="p-3">
                <Stamps stampToRender={stampToRender} uuid={uuid} page_id={page_id} api_key={api_key} />
            </div>
        </>
    );
};

export const CubidWidgetCollection = ({ stampToRender, uuid, page_id, api_key }: { stampToRender: string[], uuid: string, page_id: string, api_key: string }) => {
    const [allStamps, setAllStamps] = useState([])
    const [user_email, setUserEmail] = useState()
    const [showAllowCreds, setShowAllowCreds] = useState(false);

    const fetchStampData = useCallback(async () => {
        if (uuid) {
            try {
                const {
                    data: { all_stamps: dbData, email },
                } = await axios.post(`https://passport.cubid.me/api/v2/identity/fetch_stamps`, {
                    user_id: uuid,
                    apikey: api_key,
                    page_id: page_id
                })
                setUserEmail(email)
                setAllStamps(dbData)
            } catch (error) {
                console.error("Error fetching stamps:", error)
            }
        }
    }, [uuid, api_key, page_id])

    useEffect(() => {
        fetchStampData()
    }, [fetchStampData])

    stampToRender.map((_) => {
        const showAllowCreds = allStamps.filter((item) => !item.permAvailable && stampsWithId[_] === item.stamptype)?.[0]
        setShowAllowCreds(Boolean(showAllowCreds))
    })


    return (
        <>
            {allStamps.length !== 0 && showAllowCreds && (
                <AdvancedCredentialCollection allStampIds={allStamps.map((item: { id: number }) => item.id) as any} email={user_email} uuid={uuid} refresh={fetchStampData} apikey={api_key} />
            )}
            <div className="grid md:grid-cols-3 px-3 gap-4 grid-cols-1">
                {stampToRender.map((item) => (
                    <Stamps isGrid stampToRender={item} uuid={uuid} page_id={page_id} api_key={api_key} />
                ))}
            </div>
        </>
    );
};
