// @ts-nocheck
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import { Button } from "../component/button";

const OTPInput = ({ length = 6, value, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (isNaN(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onChange(otpString);

    if (val && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const newOtp = [...otp];

    for (let i = 0; i < pasteData.length; i++) {
      if (isNaN(pasteData[i])) continue;
      newOtp[i] = pasteData[i];
    }

    setOtp(newOtp);
    onChange(newOtp.join(""));

    const nextEmptyIndex = newOtp.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const containerStyle = {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    margin: '16px 0'
  };

  const inputStyle = {
    width: '48px',
    height: '48px',
    textAlign: 'center',
    border: '2px solid #E2E8F0',
    borderRadius: '8px',
    fontSize: '20px',
    outline: 'none'
  };

  const focusedInputStyle = {
    ...inputStyle,
    borderColor: '#22C55E',
    boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.2)'
  };

  return (
    <div style={containerStyle}>
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          style={inputStyle}
          onFocus={e => e.target.style.borderColor = '#22C55E'}
          onBlur={e => e.target.style.borderColor = '#E2E8F0'}
        />
      ))}
    </div>
  );
};

export const PhoneNumberConnect = ({
  open,
  fetchStamps,
  onClose,
  page_id,
  uuid,
  apikey,
  setBlacklist,
  setBlacklistCred
}) => {
  const [phoneInput, setPhoneInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);

  const resendTimerRef = useRef(null);

  const sendOtp = async () => {
    if (!phoneInput) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    try {
      await axios.post("https://passport.cubid.me/api/v2/twillio/send-otp", {
        phone: `+${phoneInput}`,
        apikey,
      });
      setOtpSent(true);
      toast.success("OTP sent!");

      // Start cooldown timer (e.g., 60 seconds)
      setResendCooldown(60);
    } catch (error) {
      toast.error("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    if (otpCode.length !== 6) {
      toast.error("Please enter the complete OTP.");
      return;
    }

    try {
      const { data: verify_data } = await axios.post("https://passport.cubid.me/api/v2/twillio/verify-otp", {
        phone: `+${phoneInput}`,
        otpCode,
        apikey,
      });
      if (verify_data.status === "approved") {
        toast.success("OTP Verified");
        handleClose(); // Use handleClose to reset states

        await axios.post("https://passport.cubid.me/api/v2/identity/add_stamp", {
          page_id,
          stamp_type: "phone",
          stampData: { uniquevalue: phoneInput, identity: phoneInput },
          user_data: { uuid },
        });

        const { data: blacklist_creds } = await axios.post("https://passport-backend-p49d.onrender.com/api/v2/fetch_blacklisted_creds", {
          apikey,
          cred: phoneInput
        });

        await fetchStamps();

        if (blacklist_creds?.is_blacklisted) {
          const { data: { all_email } } = await axios.post('https://passport-backend-p49d.onrender.com/api/v2/find_users_with_blacklist', {
            cred: phoneInput, apikey
          });
          setBlacklist(true);
          setBlacklistCred({
            type: "phone",
            value: all_email?.email1,
            actual: phoneInput
          });
        }
      } else {
        toast.error("Incorrect OTP");
      }
    } catch (error) {
      toast.error("OTP verification failed.");
    }
  };

  const handleClose = () => {
    // Reset all states
    setPhoneInput("");
    setOtpSent(false);
    setOtpCode("");
    setResendCooldown(0);
    if (resendTimerRef.current) {
      clearInterval(resendTimerRef.current);
      resendTimerRef.current = null;
    }
    onClose();
  };

  useEffect(() => {
    // Handle cooldown timer
    if (resendCooldown > 0) {
      resendTimerRef.current = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(resendTimerRef.current);
            resendTimerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (resendTimerRef.current) {
        clearInterval(resendTimerRef.current);
      }
    };
  }, [resendCooldown]);

  if (!open) return null;

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.67)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  };

  const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    maxWidth: '400px',
    width: '100%',
    padding: '24px'
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '16px'
  };

  const contentStyle = {
    marginTop: '8px',
    color: '#4B5563'
  };

  const buttonContainerStyle = {
    marginTop: '24px',
    display: 'flex',
    justifyContent: 'flex-end'
  };

  const primaryButtonStyle = {
    backgroundColor: '#22C55E',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    marginTop: '16px'
  };

  const secondaryButtonStyle = {
    backgroundColor: '#E5E7EB',
    color: '#1F2937',
    padding: '8px 16px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer'
  };

  const resendButtonStyle = {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '8px',
    border: 'none',
    cursor: resendCooldown === 0 ? 'pointer' : 'not-allowed',
    marginTop: '12px'
  };

  const messageStyle = {
    fontSize: '14px',
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: '16px'
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2 style={titleStyle}>Phone Number Connect</h2>
        <div style={contentStyle}>
          {otpSent ? (
            <div>
              <p style={messageStyle}>Enter the verification code sent to your phone</p>
              <OTPInput
                length={6}
                value={otpCode}
                onChange={setOtpCode}
              />
              <button
                onClick={verifyOtp}
                style={primaryButtonStyle}
              >
                Verify OTP
              </button>
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <button
                  onClick={sendOtp}
                  style={resendButtonStyle}
                  disabled={resendCooldown !== 0}
                >
                  {resendCooldown === 0 ? 'Resend OTP' : `Resend in ${resendCooldown}s`}
                </button>
              </div>
            </div>
          ) : (
            <>
              <PhoneInput
                country={"us"}
                value={phoneInput}
                onChange={(phone) => setPhoneInput(phone)}
                containerStyle={{ marginBottom: '16px' }}
              />
              <button
                onClick={sendOtp}
                style={primaryButtonStyle}
              >
                Send Passcode
              </button>
            </>
          )}
        </div>
        <div style={buttonContainerStyle}>
          <button
            onClick={handleClose}
            style={secondaryButtonStyle}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberConnect;
