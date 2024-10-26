// @ts-nocheck
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import 'tailwindcss/tailwind.css';

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useProfile as useFarcasterProfile, SignInButton } from '@farcaster/auth-kit';

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
    title: "Github",
    image:
      "https://play-lh.googleusercontent.com/PCpXdqvUWfCW1mXhH1Y_98yBpgsWxuTSTofy3NGMo9yBTATDyzVkqU580bfSln50bFU",
    color: "secondary",
  },
  {
    local_key: "google_data",
    supabase_key: "google",
    stampTypeId: 3,
    title: "Google",
    image:
      "https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw",
    color: "primary",
  },
  {
    local_key: "twitter_data",
    supabase_key: "twitter",
    stampTypeId: 4,
    title: "Twitter",
    image:
      "data:image/png;base64,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",
    color: "error",
  },
  {
    local_key: "discord_data",
    supabase_key: "discord",
    stampTypeId: 5,
    title: "Discord",
    image:
      "https://images-eds-ssl.xboxlive.com/image?url=Q_rwcVSTCIytJ0KOzcjWTYl.n38D8jlKWXJx7NRJmQKBAEDCgtTAQ0JS02UoaiwRCHTTX1RAopljdoYpOaNfVf5nBNvbwGfyR5n4DAs0DsOwxSO9puiT_GgKqinHT8HsW8VYeiiuU1IG3jY69EhnsQ--&format=source",
    color: "error",
  },
];

export const Stamps = ({
  stampToRender,
  uuid,
  page_id,
  api_key,
  isGrid,
}: any) => {
  const [allStamps, setAllStamps] = useState([]);
  const [stampLoading, setStampLoading] = useState(true);

  const { isAuthenticated: isFarcasterAuthenticated, profile } = useFarcasterProfile();

  const fetchStampData = useCallback(async () => {
    if (!uuid) return;
    setStampLoading(true);
    try {
      const response = await axios.post(`https://passport.cubid.me/api/v2/identity/fetch_stamps`, {
        user_id: uuid,
        apikey: api_key,
        page_id: page_id,
      });
      setAllStamps(response.data.all_stamps);
    } catch (error) {
      console.error("Error fetching stamps:", error);
    } finally {
      setStampLoading(false);
    }
  }, [uuid, api_key, page_id]);

  useEffect(() => {
    fetchStampData();
  }, [fetchStampData]);

  useEffect(() => {
    if (isFarcasterAuthenticated && profile?.fid && profile?.username) {
      (async () => {
        await axios.post('https://passport.cubid.me/api/v2/identity/add_stamp', {
          page_id,
          stamp_type: "farcaster",
          stampData: { uniquevalue: profile.fid, identity: profile.username },
          user_data: { uuid },
        });
        fetchStampData();
      })();
    }
  }, [isFarcasterAuthenticated, profile, uuid, fetchStampData, page_id]);

  const doesStampExist = (stamp_id) => {
    return allStamps.some(({ stamptype }) => stamptype === stamp_id);
  };

  const handleSocialConnect = (supabase_key) => {
    // Add your sign-in logic here
  };

  return (
    <div className={`grid grid-cols-1 ${stampLoading ? "pointer-events-none" : ""}`}>
      {socialDataToMap
        .filter((item) => item.supabase_key === stampToRender)
        .map((item) => (
          <div
            className={`border ${isGrid ? "w-full" : "w-[300px]"} rounded-xl p-4 px-6 mb-4 shadow-md`}
            key={item.supabase_key}
          >
            <div className="flex flex-col items-start">
              <img
                src={item.image}
                alt={`${item.title} logo`}
                className="mb-1 size-10 rounded-xl"
              />
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {doesStampExist(item.stampTypeId)
                  ? `Your ${item.supabase_key} account is verified`
                  : `Connect your ${item.supabase_key} to verify`}
              </p>
            </div>
            <div className="flex justify-between mt-4">
              {doesStampExist(item.stampTypeId) ? (
                <button className="bg-blue-500 text-white py-2 px-4 rounded-xl">
                  Verified Stamp
                </button>
              ) : (
                <button
                  onClick={() => handleSocialConnect(item.supabase_key)}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Connect Account
                </button>
              )}
            </div>
          </div>
        ))}
      {stampToRender === "farcaster" && (
        <div className={`border ${isGrid ? "w-full" : "w-[300px]"} rounded-xl p-4 px-6 mb-4 shadow-md`}>
          <div className="flex flex-col items-start">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0LwYIlZ9aYglKkSRuhEH0TM6VkCmqRqXpQ&s"
              alt="Farcaster logo"
              className="mb-1 size-10 rounded-md"
            />
            <h2 className="text-xl font-bold">Farcaster</h2>
            {doesStampExist(4) ? (
              <p className="text-sm text-gray-600 mt-1">Your Farcaster is verified</p>
            ) : (
              <div className="bg-white w-[fit-content] rounded-lg mt-2">
                <SignInButton />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
