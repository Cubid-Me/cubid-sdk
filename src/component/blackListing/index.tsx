import React, { useState } from 'react';
import { EmailVerificationModal } from './email';
import { PhoneVerificationModal } from './phone';
import { WalletVerificationModal } from './wallet';

type VerificationType = 'email' | 'phone' | 'wallet';
type VerificationState = 'duplicate-alert' | 'verification' | 'support';

interface VerificationProps {
  type: VerificationType;
  isOpen: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  duplicateInfo?: {
    maskedEmail?: string;
    maskedPhone?: string;
    maskedAddress?: string;
  };
  realInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  }
}

export const VerificationModal: React.FC<VerificationProps> = ({
  type,
  isOpen,
  onClose,
  onSuccess,
  onError,
  duplicateInfo,
  realInfo
}) => {
  const [verificationState, setVerificationState] = useState<VerificationState>(
    duplicateInfo ? 'duplicate-alert' : 'verification'
  );

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
      zIndex: 1000
    },
    modalContent: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '400px',
      position: 'relative' as const,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    },
    title: {
      fontSize: '18px',
      fontWeight: '500',
      marginBottom: '1.5rem',
      textAlign: 'center' as const,
      color: '#333'
    },
    description: {
      fontSize: '15px',
      lineHeight: '1.5',
      color: '#4B5563',
      marginBottom: '2rem',
    },
    primaryButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      marginBottom: '12px',
      transition: 'background-color 0.3s'
    },
    secondaryButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: 'white',
      color: 'black',
      border: '2px solid black',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    highlight: {
      fontWeight: '500',
      color: '#2563EB'
    }
  };

  const handleSendPasscode = () => {
    setVerificationState('verification');
  };

  const handleContactSupport = () => {
    setVerificationState('support');
    window.location.href = '/support';
  };

  const getDuplicateContent = () => {
    const duplicateValue = type === 'email'
      ? duplicateInfo?.maskedEmail
      : type === 'phone'
        ? duplicateInfo?.maskedPhone
        : duplicateInfo?.maskedAddress;

    const credentialType = type === 'email'
      ? 'email address'
      : type === 'phone'
        ? 'phone number'
        : 'wallet address';

    return {
      title: `Duplicate ${credentialType.charAt(0).toUpperCase() + credentialType.slice(1)} Detected`,
      description: type === 'wallet'
        ? `Oops! It seems like this wallet address was already registered to account ${duplicateInfo?.maskedAddress}. Was that you? We don't allow account duplication, so to prevent blacklisting, we would strongly encourage you to rectify immediately. If this isn't your account then you may have been hacked.`
        : `Oops! It seems like this ${credentialType} was already registered to account ${duplicateInfo?.maskedEmail}. Was that you? We don't allow account duplication, so to prevent blacklisting, we would strongly encourage you to rectify immediately. If ${duplicateValue} is not your ${credentialType} then you may have been hacked.`,
      primaryButton: `That's my ${credentialType} too. Send me a passcode`,
      secondaryButton: "I may have been hacked. Contact support"
    };
  };

  const renderContent = () => {
    switch (verificationState) {
      case 'duplicate-alert': {
        const content = getDuplicateContent();
        return (
          <div style={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div style={styles.title}>
              {content.title}
            </div>
            <div style={{ ...styles.description, whiteSpace: "pre-line", wordBreak: type === "wallet" ? "break-all" : "normal" }}>
              {content.description}
            </div>
            <button
              style={styles.primaryButton}
              onClick={handleSendPasscode}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#333'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'black'}
            >
              {content.primaryButton}
            </button>
            <button
              style={styles.secondaryButton}
              onClick={handleContactSupport}
              onMouseOver={e => {
                e.currentTarget.style.backgroundColor = 'black';
                e.currentTarget.style.color = 'white';
              }}
              onMouseOut={e => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'black';
              }}
            >
              {content.secondaryButton}
            </button>
          </div>
        );
      }

      case 'verification':
        switch (type) {
          case 'email':
            return <EmailVerificationModal
              isOpen={true}
              onClose={onClose}
              onSuccess={onSuccess}
              onError={onError}
              email={realInfo?.email}
            />;
          case 'phone':
            return <PhoneVerificationModal
              isOpen={true}
              onClose={onClose}
              onSuccess={onSuccess}
              onError={onError}
              phone={realInfo?.phone}
            />;
          case 'wallet':
            return <WalletVerificationModal
              isOpen={true}
              onClose={onClose}
              onSuccess={onSuccess}
              onError={onError}
              address={realInfo?.address}
            />;
          default:
            return null;
        }

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      {renderContent()}
    </div>
  );
};