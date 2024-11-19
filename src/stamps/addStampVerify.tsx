'use client'
import { useState, useEffect } from 'react'
import { Button } from "../component/button"
import { Input } from "../component/input"
import { Label } from "../component/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../component/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../component/dialog"
import { RadioGroup, RadioGroupItem } from "../component/radio-group"
import { useToast } from "../component/use-toast"
import { AlertCircle, Check } from 'lucide-react'
import React from 'react';
import axios from 'axios'

const DAPP_NAME = "YourDAppName"

export function AdvancedCredentialCollection({ email, apikey, refresh, uuid, allStampIds }: { email: string, apikey: string, refresh: () => Promise<void>, uuid: string, allStampIds: Array<number> }) {
  const [passcodeRequested, setPasscodeRequested] = useState(false)
  const [passcode, setPasscode] = useState('')
  const [resendCountdown, setResendCountdown] = useState(60)
  const [cubidAuthenticated, setCubidAuthenticated] = useState(false)
  const [credentialShared, setCredentialShared] = useState(false)
  const [showAddCredentialModal, setShowAddCredentialModal] = useState(false)
  const [twitterHandles, setTwitterHandles] = useState(['@twitterUser123', '@anotherUser456'])
  const [selectedTwitterHandle, setSelectedTwitterHandle] = useState('@twitterUser123')
  const [showTwitterHandles, setShowTwitterHandles] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (passcodeRequested && resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [passcodeRequested, resendCountdown])

  const handlePasscodeRequest = async () => {
    setPasscodeRequested(true)
    setResendCountdown(60)
    await axios.post("https://passport.cubid.me/api/verify/send-dapp-email", {
      email: email,
      apikey
    })
    toast({
      title: "Passcode Sent",
      description: "Check your email for the passcode we just sent.",
    })
  }

  const handlePasscodeVerify = async () => {
    const { data } = await axios.post("https://passport.cubid.me/api/verify/verify-email", {
      email: email,
      apikey,
      otp: passcode,
      dappuser_id: uuid
    })
    if (data.success) {
      setCubidAuthenticated(true)
      toast({
        title: "Authentication Successful",
        description: "You have successfully authenticated with CUBID.",
      })
    } else {
      toast({
        title: "Authentication Failed",
        description: "The passcode you entered is incorrect. Please try again.",
        variant: "destructive",
      })
    }
  }


  const handleCloseAddCredentialModal = () => {
    setShowAddCredentialModal(false)
    setShowTwitterHandles(true)
  }

  const handleAuthorize = async () => {
    await axios.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
      apikey,
      user_id: uuid,
      stamp_id_array: allStampIds
    })
    refresh()
    setCredentialShared(true)
    toast({
      title: "Credential Shared",
      description: `Your credentials have been shared.`,
    })
  }

  function maskEmail(email) {
    // Split the email into the local part and the domain
    const [localPart, domain] = email.split("@");

    // Mask the first part of the local part (show first character only)
    const maskedLocal = localPart[0] + "*".repeat(localPart.length - 1);

    // Split the domain into the name and the extension (e.g., gmail.com -> gmail, com)
    const [domainName, extension] = domain.split(".");

    // Mask part of the domain name (show first character only)
    const maskedDomain = domainName[0] + "*".repeat(domainName.length - 1);

    // Return the email in the masked format
    return `${maskedLocal}@${maskedDomain}.${extension}`;
  }

  return (
    <div className="w-full p-3 mx-auto space-y-6">
      <Card className={credentialShared ? "bg-green-50 rounded-xl border-green-200" : (cubidAuthenticated ? "bg-yellow-50 rounded-xl border-yellow-200" : "bg-red-50 rounded-xl border-red-200")}>
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            {credentialShared ? <Check className="mr-2" /> : <AlertCircle className="mr-2" />}
            {credentialShared ? "Credential Shared" : (cubidAuthenticated ? "Credential Available" : "Unauthenticated Credential detected")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!cubidAuthenticated ? (
            <>
              <p className="mb-4 text-red-600">
                We found a credential on Cubid account for a different app. Get a one-time passcode to access it.
              </p>
              {!passcodeRequested ? (
                <Button className="!bg-red-600 !text-white rounded-xl" onClick={handlePasscodeRequest}>Send me a passcode</Button>
              ) : (
                <div className="space-y-4">
                  <p>Check your email - {maskEmail(email)} for the passcode we just sent</p>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter passcode here"
                      value={passcode}
                      className='rounded-xl'
                      onChange={(e) => setPasscode(e.target.value)}
                    />
                    <Button onClick={handlePasscodeVerify}>OK</Button>
                  </div>
                  <Button
                    disabled={resendCountdown > 0}
                    onClick={handlePasscodeRequest}
                  >
                    Resend {resendCountdown > 0 ? `(${resendCountdown}s)` : ''}
                  </Button>
                </div>
              )}
            </>
          ) : credentialShared ? (
            <p className="mb-4 text-green-700">
              Twitter Credential data: <strong>{selectedTwitterHandle}</strong>
            </p>
          ) : (
            <>
              <p className="mb-4 text-yellow-700">
                Nice, you've authenticated with Cubid.
                <br /><br />
              </p>
              {showTwitterHandles ? (
                <>
                  <RadioGroup value={selectedTwitterHandle} onValueChange={setSelectedTwitterHandle} className="mb-4">
                    {twitterHandles.map((handle) => (
                      <div key={handle} className="flex items-center space-x-2">
                        <RadioGroupItem value={handle} id={handle} />
                        <Label htmlFor={handle}>{handle}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button onClick={handleAuthorize} style={{ backgroundColor: "#007AFF" }} className="w-full text-white rounded-xl">
                    Authorize App to see this credential
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleAuthorize} style={{ backgroundColor: "#007AFF" }} className="w-full text-white rounded-xl mb-4">
                    Authorize App to see this credential
                  </Button>
                  {/* <Button onClick={handleAddCredential} variant="outline" className="w-full">
                    Add a different Twitter Credential
                  </Button> */}
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={showAddCredentialModal} onOpenChange={setShowAddCredentialModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Twitter Credential</DialogTitle>
            <DialogDescription>
              OAuth process would happen here
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleCloseAddCredentialModal}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}