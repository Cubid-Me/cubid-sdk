// @ts-nocheck
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function AdvancedCredentialCollection({ email, apikey, refresh, uuid, allStampIds, onClose }) {
  // State management for different modal stages and data
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState('confirmation');
  const [passcode, setPasscode] = useState('');
  const [resendCountdown, setResendCountdown] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle countdown timer for resending passcode
  useEffect(() => {
    let timer;
    if (currentStep === 'passcode' && resendCountdown > 0) {
      timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown, currentStep]);

  // Check if user is already logged in
  useEffect(() => {
    if (localStorage.getItem("logged_in") === uuid) {
      setCurrentStep('authorized');
    }
  }, [uuid]);

  // Handle initial passcode request
  const handlePasscodeRequest = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      await axios.post("https://passport.cubid.me/api/verify/send-dapp-email", {
        email,
        apikey,
      });
      
      setCurrentStep('passcode');
      setResendCountdown(60);
    } catch (err) {
      setError('Failed to send passcode. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle passcode verification
  const handlePasscodeVerify = async () => {
    try {
      setIsLoading(true);
      setError('');

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
        localStorage.setItem("logged_in", uuid);
        setCurrentStep('authorized');
      } else {
        setError('Invalid passcode. Please try again.');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle final authorization
  const handleAuthorize = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      await axios.post("https://passport.cubid.me/api/verify/add-stamp-perm", {
        apikey,
        user_id: uuid,
        stamp_id_array: allStampIds,
      });
      await refresh();
      setIsOpen(false);
      onClose?.();
    } catch (err) {
      setError('Authorization failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Styles object for reusable styles
  const styles = {
    modalOverlay: {
      position: 'fixed',
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
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '24px',
      width: '90%',
      maxWidth: '440px',
      position: 'relative',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
      marginBottom: '20px',
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#1a1a1a',
      marginBottom: '8px',
    },
    description: {
      fontSize: '16px',
      color: '#4a5568',
      lineHeight: '1.5',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '16px',
      marginBottom: '16px',
    },
    error: {
      backgroundColor: '#FEE2E2',
      color: '#DC2626',
      padding: '12px',
      borderRadius: '6px',
      marginBottom: '16px',
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '24px',
    },
    button: {
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.2s',
    },
    primaryButton: {
      backgroundColor: '#2563EB',
      color: '#ffffff',
    },
    secondaryButton: {
      backgroundColor: '#E5E7EB',
      color: '#374151',
    },
    disabledButton: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  };

  // Render different content based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 'confirmation':
        return (
          <>
            <div style={styles.header}>
              <h2 style={styles.title}>Credential Authorization Required</h2>
              <p style={styles.description}>
                It looks like this credential has already been registered for a different app in the Cubid ecosystem. 
                Get a passcode to approve using it in this app too.
              </p>
            </div>
            <div style={styles.buttonContainer}>
              <button 
                style={{...styles.button, ...styles.secondaryButton}} 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button 
                style={{
                  ...styles.button, 
                  ...styles.primaryButton,
                  ...(isLoading ? styles.disabledButton : {})
                }} 
                onClick={handlePasscodeRequest}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Passcode'}
              </button>
            </div>
          </>
        );

      case 'passcode':
        return (
          <>
            <div style={styles.header}>
              <h2 style={styles.title}>Enter Verification Code</h2>
              <p style={styles.description}>
                Please check your email ({email}) for the verification code we just sent.
              </p>
            </div>
            <input
              type="text"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              style={styles.input}
              maxLength={6}
            />
            {error && (
              <div style={styles.error}>{error}</div>
            )}
            <button
              style={{
                ...styles.button,
                ...styles.secondaryButton,
                width: '100%',
                marginBottom: '16px',
                ...(resendCountdown > 0 || isLoading ? styles.disabledButton : {})
              }}
              disabled={resendCountdown > 0 || isLoading}
              onClick={handlePasscodeRequest}
            >
              Resend Code {resendCountdown > 0 ? `(${resendCountdown}s)` : ''}
            </button>
            <div style={styles.buttonContainer}>
              <button 
                style={{...styles.button, ...styles.secondaryButton}}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button 
                style={{
                  ...styles.button, 
                  ...styles.primaryButton,
                  ...(isLoading || !passcode ? styles.disabledButton : {})
                }}
                onClick={handlePasscodeVerify}
                disabled={isLoading || !passcode}
              >
                {isLoading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </>
        );

      case 'authorized':
        return (
          <>
            <div style={styles.header}>
              <h2 style={styles.title}>Authorization Successful</h2>
              <p style={styles.description}>
                You've successfully authenticated with Cubid. Click below to complete the authorization process.
              </p>
            </div>
            <div style={styles.buttonContainer}>
              <button 
                style={{
                  ...styles.button, 
                  ...styles.primaryButton,
                  ...(isLoading ? styles.disabledButton : {})
                }}
                onClick={handleAuthorize}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Complete Authorization'}
              </button>
            </div>
          </>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={() => setIsOpen(false)}>
      <div 
        style={styles.modalContent} 
        onClick={e => e.stopPropagation()}
      >
        {renderContent()}
      </div>
    </div>
  );
}

export default AdvancedCredentialCollection;