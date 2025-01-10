import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DAPP_NAME = "YourDAppName";

export function AdvancedCredentialCollection({ email, apikey, refresh, uuid, allStampIds }) {
  const [passcodeRequested, setPasscodeRequested] = useState(true);
  const [passcode, setPasscode] = useState('');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [cubidAuthenticated, setCubidAuthenticated] = useState(false);
  const [credentialShared, setCredentialShared] = useState(false);
  const [showTwitterHandles, setShowTwitterHandles] = useState(false);
  const [twitterHandles, setTwitterHandles] = useState(['@twitterUser123', '@anotherUser456']);
  const [selectedTwitterHandle, setSelectedTwitterHandle] = useState('@twitterUser123');
  const [grantPerm, setGrantPerm] = useState(false)

  useEffect(() => {
    let timer;
    if (passcodeRequested && resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [passcodeRequested, resendCountdown]);

  const handlePasscodeRequest = async () => {
    await axios.post("https://passport.cubid.me/api/verify/send-dapp-email", {
      email,
      apikey,
    });
    setPasscode(60 as any)
    alert("Passcode Sent. Check your email for the passcode we just sent.");
  };

  const handlePasscodeVerify = async () => {
    const { data } = await axios.post("https://passport.cubid.me/api/verify/verify-email", {
      email,
      apikey,
      otp: passcode,
      dappuser_id: uuid,
    });
    if (data.success) {
      await axios.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
        apikey,
        user_id: uuid,
        stamp_id_array: allStampIds,
      });
      await refresh();
      await refresh();
      await axios.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
        apikey,
        user_id: uuid,
        stamp_id_array: allStampIds,
      });
      await refresh();
      await refresh();
      setCredentialShared(true);
      localStorage.setItem("logged_in", uuid)

    } else {
      alert("Authentication Failed. The passcode you entered is incorrect. Please try again.");
    }
  };

  const handleAuthorize = async () => {
    await axios.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
      apikey,
      user_id: uuid,
      stamp_id_array: allStampIds,
    });
    await refresh();
   await refresh();
   await  refresh();
    setCredentialShared(true);
  };

  useEffect(() => {
    if (localStorage.getItem("logged_in") === uuid) {
      setGrantPerm(true)
    }
    setInterval(() => {
      if (localStorage.getItem("logged_in") === uuid) {
        setGrantPerm(true)
      } else {
        setGrantPerm(false)
      }
    }, 1000)
  }, [uuid])

  useEffect(() => {
    if (localStorage.getItem("logged_in") != uuid) {
      handlePasscodeRequest()
    }
  }, [])

  console.log({ email })

  if (grantPerm) {
    return (
      <button
        onClick={handleAuthorize}
        style={{
          width: '100%',
          padding: '8px 16px',
          backgroundColor: '#007AFF',
          color: '#FFF',
          borderRadius: '8px',
          marginTop: '8px',
        }}
      >
        Grant Permission
      </button>
    )
  }

  return (

    <div style={{ width: '100%', marginBottom: '16px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        padding: '16px',
        borderRadius: '8px',
        border: `2px solid ${credentialShared ? '#38A169' : cubidAuthenticated ? '#D69E2E' : '#E53E3E'}`,
        backgroundColor: credentialShared ? '#F0FFF4' : cubidAuthenticated ? '#FEFCBF' : '#FFF5F5',
      }}>
        <div style={{ marginTop: '' }}>
          {!cubidAuthenticated ? (
            <>
              {!passcodeRequested ? (
                <></>
              ) : (
                <div>
                  <p>Check your email - {email && email} for the passcode we just sent.</p>
                  <div style={{ alignItems: 'center', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Enter passcode here"
                      value={passcode}
                      style={{ padding: '8px', borderRadius: '8px', border: '1px solid #DDD' }}
                      onChange={(e) => setPasscode(e.target.value)}
                    />
                    <div style={{ marginTop: 10 }}>
                      <button onClick={handlePasscodeVerify} style={{ padding: '8px 16px', backgroundColor: '#3182CE', color: '#FFF', borderRadius: '8px' }}>
                        OK
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handlePasscodeRequest}
                    disabled={resendCountdown > 0}
                    style={{
                      marginTop: '8px',
                      padding: '8px 16px',
                      backgroundColor: '#E2E8F0',
                      color: '#4A5568',
                      borderRadius: '8px',
                      cursor: resendCountdown > 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    Resend {resendCountdown > 0 ? `(${resendCountdown}s)` : ''}
                  </button>
                </div>
              )}
            </>
          ) : credentialShared ? (
            <p style={{ color: '#38A169' }}>Twitter Credential data: <strong>{selectedTwitterHandle}</strong></p>
          ) : (
            <>
              <p style={{ color: '#D69E2E' }}>Nice, you've authenticated with Cubid.</p>
              {showTwitterHandles ? (
                <div>
                  {twitterHandles.map((handle) => (
                    <div key={handle} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <input
                        type="radio"
                        id={handle}
                        value={handle}
                        checked={selectedTwitterHandle === handle}
                        onChange={() => setSelectedTwitterHandle(handle)}
                      />
                      <label htmlFor={handle}>{handle}</label>
                    </div>
                  ))}
                  <button
                    onClick={handleAuthorize}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      backgroundColor: '#007AFF',
                      color: '#FFF',
                      borderRadius: '8px',
                      marginTop: '8px',
                    }}
                  >
                    Authorize App to see this credential
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuthorize}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    backgroundColor: '#007AFF',
                    color: '#FFF',
                    borderRadius: '8px',
                    marginTop: '8px',
                  }}
                >
                  Authorize App to see this credential
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
