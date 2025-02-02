import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  onError?: any;
  email?: string;
  apikey?: string;
}

export const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onError,
  email: passedEmail,
  apikey
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Handle close
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    resetForm();
  };

  // Styles object
  const styles = {
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '400px',
      position: 'relative' as const,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    button: {
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'background-color 0.3s',
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2rem',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      margin: '0 0 8px 0',
    },
    subtitle: {
      fontSize: '18px',
      fontWeight: '500',
      margin: '0',
      color: '#333',
    },
    otpContainer: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      margin: '1rem 0',
    },
    otpInput: {
      width: '40px',
      height: '48px',
      textAlign: 'center' as const,
      fontSize: '20px',
      fontWeight: 'bold',
      border: '2px solid #e2e2e2',
      borderRadius: '6px',
      outline: 'none',
      transition: 'border-color 0.3s',
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '1rem',
    },
    textButton: {
      background: 'none',
      border: 'none',
      color: '#666',
      fontSize: '14px',
      cursor: 'pointer',
      padding: '4px 8px',
    },
    error: {
      color: '#e11d48',
      backgroundColor: '#fee2e2',
      padding: '12px',
      borderRadius: '6px',
      marginTop: '1rem',
      fontSize: '14px',
    },
    successContainer: {
      textAlign: 'center' as const,
      padding: '2rem 0',
    },
    successIcon: {
      width: '48px',
      height: '48px',
      backgroundColor: '#f8f8f8',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      margin: '0 auto 1rem',
    },
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (isOpen && passedEmail) {
      sendOTP();
    }
  }, [isOpen, passedEmail]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(`input[name="email-otp-${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(`input[name="email-otp-${index - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  };

  const sendOTP = async () => {
    if (!passedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(passedEmail)) {
      setError('Invalid email address provided');
      return;
    }
    await axios.post('https://passport.cubid.me/api/v2/email/send_otp', {
      email: passedEmail,
      apikey
    })

    setError('');
    setCountdown(30);
    console.log('Sending OTP to:', passedEmail);
  };

  const verifyOTP = async () => {
    // Mock verification - replace with actual API call
    const { data } = await axios.post('https://passport.cubid.me/api/v2/email/verify_otp', {
      email: passedEmail,
      apikey,
      otp: otp.join('').length
    })

    if (otp.join('').length === 6 && data?.is_verified) {
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
        handleClose();
      }, 2000);
    } else {
      setError('Invalid verification code');
      if (onError) {
        onError('Invalid verification code');
      }
    }
  };

  const resetForm = () => {
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess(false);
    setCountdown(0);
  };

  if (!isOpen || !passedEmail) {
    return null;
  }

  function obscureString(input) {
    // If the input is 5 characters or less, return as is.
    if (input.length <= 5) {
      return input;
    }

    const firstTwo = input.slice(0, 2);
    const lastThree = input.slice(-3);

    // Replace all characters between the first two and last three with "****"
    return firstTwo + "****" + lastThree;
  }

  return (
    <div style={styles.modalOverlay} onClick={handleClose}>
      <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>CUBID</h2>
          <h3 style={styles.subtitle}>Enter Security Code</h3>
        </div>

        {!success ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <p style={{ color: '#666', margin: '0' }}>We've sent a 6-digit code to</p>
              <p style={{ fontWeight: '500', margin: '4px 0' }}>{obscureString(passedEmail)}</p>
            </div>

            <div style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`email-otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    ...styles.otpInput,
                    borderColor: error ? '#e11d48' : '#e2e2e2',
                  }}
                  maxLength={1}
                />
              ))}
            </div>

            <button
              style={{
                ...styles.button,
                opacity: otp.some((digit) => !digit) ? 0.5 : 1,
                cursor: otp.some((digit) => !digit) ? 'not-allowed' : 'pointer',
              }}
              onClick={verifyOTP}
              disabled={otp.some((digit) => !digit)}
              onMouseOver={(e) =>
                !otp.some((digit) => !digit) && (e.currentTarget.style.backgroundColor = '#333')
              }
              onMouseOut={(e) =>
                !otp.some((digit) => !digit) && (e.currentTarget.style.backgroundColor = 'black')
              }
            >
              Verify Code
            </button>

            <div style={styles.actionButtons}>
              <button
                style={{
                  ...styles.textButton,
                  opacity: countdown > 0 ? 0.5 : 1,
                  cursor: countdown > 0 ? 'not-allowed' : 'pointer',
                }}
                onClick={() => !countdown && sendOTP()}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
              </button>
            </div>

            {error && <div style={styles.error}>{error}</div>}
          </div>
        ) : (
          <div style={{ color: "black !important" }}>
            <div style={styles.successContainer}>
              <div style={styles.successIcon}>✓</div>
              <h3 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>Email Verified!</h3>
              <p style={{ color: '#666', margin: 0 }}>
                Your email has been verified with Cubid.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};