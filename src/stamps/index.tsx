// @ts-nocheck
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import Web3 from "web3"
import { useWallet as useSolanaWallet, useConnection as useSolanaConnection, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { useStamps } from "../hooks/useStamps"
import "@near-wallet-selector/modal-ui/styles.css"

import useAuth from "../hooks/useAuth"
import { useCreatedByAppId } from "../hooks/useCreatedByApp"

import { config } from "../lib/web3Config"
import { BrightIdConnectSheet } from "./brightIdConnectSheet"
import { EmailConnect } from "./emailConnect"
import { GooddollarConnect } from "./gooddollarConnect"
import { InstagramConnect } from "./instagramConnect"
import { PhoneNumberConnect } from "./phoneNumberConnect"
import { insertStamp } from "../lib/insertStamp"

const socialDataToMap = [
  {
    local_key: "facebook_data",
    supabase_key: "facebook",
    stampTypeId: 1,
    title: "Facebook",
    image:
      "https://play-lh.googleusercontent.com/ccWDU4A7fX1R24v-vvT480ySh26AYp97g1VrIB_FIdjRcuQB2JP2WdY7h_wVVAeSpg",
    color: "info",
  },
  {
    local_key: "github_data",
    supabase_key: "github",
    stampTypeId: 2,
    image:
      "https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU",
    title: "Github",
    color: "secondary",
  },
  {
    local_key: "google_data",
    supabase_key: "google",
    stampTypeId: 3,
    image:
      "https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw",
    title: "Google",
    color: "primary",
  },
  {
    local_key: "twitter_data",
    supabase_key: "twitter",
    stampTypeId: 4,
    image:
      "data:image/png;base64,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",
    title: "Twitter",
    color: "error",
  },
  {
    local_key: "discord_data",
    supabase_key: "discord",
    stampTypeId: 5,
    image:
      "https://images-eds-ssl.xboxlive.com/image?url=Q_rwcVSTCIytJ0KOzcjWTYl.n38D8jlKWXJx7NRJmQKBAEDCgtTAQ0JS02UoaiwRCHTTX1RAopljdoYpOaNfVf5nBNvbwGfyR5n4DAs0DsOwxSO9puiT_GgKqinHT8HsW8VYeiiuU1IG3jY69EhnsQ--&format=source",
    title: "Discord",
    color: "error",
  },
]

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
  solana: 53
}

export const Stamps = ({
  stampToRender,
  uuid,
  page_id,
  api_key
}: any) => {
  console.log({ stampToRender })
  const signInWithSocial = async (socialName: any) => {
    window.location.href = `https://allow.cubid.me/widget-allow?uid=${uuid}&social_provider=${socialName}&page_id=${page_id}`
  }

  const [allStamps, setAllStamps] = useState([])
  const [stampLoading, setStampLoading] = useState(true)

  const fetchStampData = useCallback(async () => {
    console.log("fetch stampdata executed")
    if (uuid) {
      setStampLoading(true)
      const {
        data: { all_stamps: dbData },
      } = await axios.post(`https://passport.cubid.me/api/v2/identity/fetch_stamps`, {
        user_id: uuid,
        apikey: api_key
      })
      setAllStamps(dbData)
      setStampLoading(false)
    }
  }, [uuid, api_key])

  useEffect(() => {
    fetchStampData()
  }, [fetchStampData])


  const doesStampExist = (stamp_id: number | string) =>
    allStamps?.filter(({ stamptype }) => stamptype === stamp_id)?.[0]


  return (
    <div className="p-3 pb-16">
      <div className={`grid grid-cols-1 ${stampLoading ? "pointer-events-none opacity-40" : ""}`}>
        {socialDataToMap.filter((item) => item.supabase_key === stampToRender).map((item) => (
          <div className="border rounded-md p-4 mb-4 shadow-md">
            <div className="flex flex-col items-start">
              <img src={item.image} alt="Image" className="mb-1 size-10 rounded-md" />
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {doesStampExist(item.stampTypeId)
                  ? `Your ${item.supabase_key} account is verified`
                  : `Connect your existing ${item.supabase_key} to verify`}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              {doesStampExist(item.stampTypeId) ? (
                <>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded">Verified Stamp</button>
                  <div className="relative">
                  </div>
                </>
              ) : (
                <button
                  onClick={() => signInWithSocial(item.supabase_key)}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Connect Account
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
