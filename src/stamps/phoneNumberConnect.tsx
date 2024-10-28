
import React from "react"
import axios from "axios"
import { toast } from "react-toastify"
import PhoneInput from 'react-phone-input-2'

import { Button } from "../component/button"
import { Input } from "../component/input"
import { stampsWithId } from "./index"
import 'react-phone-input-2/lib/style.css'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../component/alert-dialog"

export const PhoneNumberConnect = ({
  open,
  fetchStamps,
  onClose,
  page_id,
  uuid,
  apikey
}: {
  open: boolean
  fetchStamps: () => void
  onClose: () => void
  page_id?: string
  uuid: string
  apikey:string
}) => {
  const [phoneInput, setPhoneInput] = React.useState("")
  const [otpSent, setOtpSent] = React.useState(false)
  const [otpCode, setOtpCode] = React.useState("")

  const sendOtp = async () => {
    await axios.post("https://passport.cubid.me/api/v2/twillio/send-otp", {
      phone: `+${phoneInput}`,
      apikey
    })
    setOtpSent(true)
  }

  const verifyOtp = async () => {
    const { data: verify_data } = await axios.post("https://passport.cubid.me/api/v2/twillio/verify-otp", {
      phone: `+${phoneInput}`,
      otpCode,
      apikey
    })
    if (verify_data.status === "approved") {
      toast.success("Otp Verified")
      setOtpSent(true)
      onClose()

      const stampId = stampsWithId.phone
      await axios.post('https://passport.cubid.me/api/v2/identity/add_stamp', {
        page_id,
        stamp_type: "phone",
        stampData: { uniquevalue: phoneInput, identity: phoneInput },
        user_data: { uuid },
      });

      fetchStamps()
    }
  }

  return (
    <>
      {open && (
        <AlertDialog open={open}>
          <AlertDialogContent
            style={{ borderRadius: 10 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm h-[350px] mx-auto p-6"
          >
            <AlertDialogHeader className="mb-4">
              <AlertDialogTitle className="text-2xl font-bold text-gray-800">
                Phone Number Connect
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-gray-600">
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
                      className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                    >
                      Verify OTP
                    </Button>
                  </>
                ) : (
                  <>
                    <PhoneInput
                      country={'us'}
                      value={phoneInput}
                      onChange={phone => setPhoneInput(phone)}
                    />
                    <Button
                      onClick={sendOtp}
                      style={{ borderRadius: 10 }}
                      className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md"
                    >
                      Send Passcode
                    </Button>
                  </>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex absolute bottom-[10px] right-[10px] justify-end md:space-x-2">
              <AlertDialogCancel
                onClick={onClose}
                style={{ borderRadius: 10 }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
              >
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
