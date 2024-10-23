import { useCallback, useEffect, useState } from "react"
import axios from "axios"

export const useCreatedByAppId = () => {
    const cubidAppId = 22
    const adminuid = 'uuid'
    const fetchValidId = useCallback(async () => {
        if (adminuid) {
            const { data } = await axios.post("/api/allow/fetch_allow_uid", {
                uid: adminuid,
            })
            return data?.dapp_users?.[0]?.dapps?.id;
        }
    }, [adminuid])
    const getIdForApp = useCallback(async () => {
        return window.location.href.includes("/allow") ? await fetchValidId() : cubidAppId
    }, [fetchValidId])
    return { getIdForApp };
}
