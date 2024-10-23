import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"

export const useAuth = () => {


    const getUser = useCallback(async () => {

    }, [])

    return { loading: false, user: {}, supabaseUser: {}, getUser }
}

export default useAuth
