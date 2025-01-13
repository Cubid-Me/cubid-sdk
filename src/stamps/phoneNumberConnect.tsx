// @ts-nocheck

import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { Button } from "../component/button";
import { Input } from "../component/input";
import { stampsWithId } from "./index";

export const PhoneNumberConnect = ({
  open,
  fetchStamps,
  onClose,
  page_id,
  uuid,
  apikey,
}: {
  open: boolean;
  fetchStamps: () => void;
  onClose: () => void;
  page_id?: string;
  uuid: string;
  apikey: string;
}) => {
  const [phoneInput, setPhoneInput] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [otpCode, setOtpCode] = React.useState("");

  const sendOtp = async () => {
    try {
      await axios.post("https://passport.cubid.me/api/v2/twillio/send-otp", {
        phone: `+${phoneInput}`,
        apikey,
      });
      setOtpSent(true);
      toast.success("OTP sent!");
    } catch (error) {
      toast.error("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      const { data: verify_data } = await axios.post("https://passport.cubid.me/api/v2/twillio/verify-otp", {
        phone: `+${phoneInput}`,
        otpCode,
        apikey,
      });
      if (verify_data.status === "approved") {
        toast.success("OTP Verified");
        onClose();
        await axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
          page_id,
          stamp_type: "phone",
          stampData: { uniquevalue: phoneInput, identity: phoneInput },
          user_data: { uuid },
        });
        fetchStamps();
      }
    } catch (error) {
      toast.error("OTP verification failed.");
    }
  };

  if (!open) return null;

  return (
    <div style={{ backgroundColor: "#000000AB", zIndex: 1000 }} className="fixed inset-0 flex items-center justify-center z-50">
      <div style={{ height: 400 }} className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm w-full p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Phone Number Connect</h2>
        <div className="mt-2 text-gray-600">
          {otpSent ? (
            <>
              <Input
                placeholder="Enter OTP"
                value={otpCode}
                type="number"
                onChange={(e) => setOtpCode(e.target.value)}
                className="mt-4 w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:ring focus:ring-green-400"
              />
              <Button
                onClick={verifyOtp}
                style={{ borderRadius: 10 }}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2"
              >
                Verify OTP
              </Button>
            </>
          ) : (
            <>
              <PhoneInput
                country={"us"}
                value={phoneInput}
                onChange={(phone) => setPhoneInput(phone)}
              />
              <Button
                onClick={sendOtp}
                style={{ borderRadius: 10 }}
                className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2"
              >
                Send Passcode
              </Button>
            </>
          )}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <Button
            onClick={onClose}
            style={{ borderRadius: 10 }}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
