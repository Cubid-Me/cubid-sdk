import React, { useState, useEffect } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';

interface WalletVerificationModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onSuccess?: () => void;
    onError?: any;
    address?: string;
}

export const WalletVerificationModal: React.FC<WalletVerificationModalProps> = ({
    isOpen,
    onClose,
    onSuccess,
    onError,
    address: passedAddress
}) => {
    // Wagmi hooks
    const { connect, connectors, isPending: isLoading } = useConnect();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [verificationAmount, setVerificationAmount] = useState('');
    const [step, setStep] = useState<'connect' | 'verify'>('connect');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [copied, setCopied] = useState({ amount: false, address: false });

    // Constants for verification
    const VERIFICATION_AMOUNT = '0.001';
    const CUBID_WALLET = '0x1234...5678';

    // Effect to handle wallet connection
    useEffect(() => {
        if (isConnected && address) {
            setStep('verify');
        }
    }, [isConnected, address]);

    // Styles
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
        modalCloseButton: {
            position: 'absolute' as const,
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666',
            padding: '4px',
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
        connectorButton: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '12px',
            marginBottom: '8px',
            border: '2px solid #e2e2e2',
            borderRadius: '6px',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontSize: '16px',
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
        input: {
            width: '100%',
            padding: '12px',
            border: '2px solid #e2e2e2',
            borderRadius: '6px',
            fontSize: '16px',
            fontFamily: 'monospace',
            outline: 'none',
            transition: 'border-color 0.3s',
            textAlign: 'center' as const,
        },
        verificationBox: {
            backgroundColor: '#f8f8f8',
            border: '2px solid #e2e2e2',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
        },
        label: {
            display: 'block',
            fontSize: '14px',
            color: '#666',
            marginBottom: '4px',
        },
        valueContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #e2e2e2',
        },
        value: {
            fontFamily: 'monospace',
            fontSize: '16px',
        },
        copyButton: {
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            color: '#666',
            transition: 'color 0.3s',
        },
        etherscanLink: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            color: 'black',
            textDecoration: 'none',
            fontSize: '14px',
            marginTop: '1rem',
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

    const copyToClipboard = (text: string, type: 'amount' | 'address') => {
        navigator.clipboard.writeText(text);
        setCopied((prev) => ({ ...prev, [type]: true }));
        setTimeout(() => {
            setCopied((prev) => ({ ...prev, [type]: false }));
        }, 2000);
    };

    const verifyTransaction = () => {
        if (!verificationAmount || verificationAmount !== VERIFICATION_AMOUNT) {
            setError('Please enter the correct verification amount');
            return;
        }
        setSuccess(true);
        setTimeout(() => {
            handleClose();
        }, 2000);
    };

    const resetForm = () => {
        setVerificationAmount('');
        setStep('connect');
        setError('');
        setSuccess(false);
        setCopied({ amount: false, address: false });
        disconnect();
    };

    // Handle close
    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        resetForm();
    };

    const handleDisconnect = () => {
        disconnect();
        setStep('connect');
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div style={styles.modalOverlay} onClick={handleClose}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button
                    style={styles.modalCloseButton}
                    onClick={handleClose}
                    aria-label="Close Wallet Modal"
                >
                    ×
                </button>

                <div style={styles.header}>
                    <h2 style={styles.title}>CUBID</h2>
                    <h3 style={styles.subtitle}>Verify Delivery Wallet</h3>
                </div>

                {!success ? (
                    <div>
                        {step === 'connect' ? (
                            <>
                                <p style={{ textAlign: 'center', color: '#666', margin: '0 0 1rem 0' }}>
                                    Connect your wallet to begin verification.
                                </p>
                                <div style={{ marginBottom: '1rem' }}>
                                    {connectors.map((connector) => (
                                        <button
                                            disabled={!connector.ready}
                                            key={connector.id}
                                            onClick={() => connect({ connector })}
                                            style={styles.connectorButton}
                                            onMouseOver={(e) => (e.currentTarget.style.borderColor = 'black')}
                                            onMouseOut={(e) => (e.currentTarget.style.borderColor = '#e2e2e2')}
                                        >
                                            <span>{connector.name}</span>
                                            {!connector.ready && ' (unsupported)'}
                                            {isLoading && ' (connecting)'}
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={styles.verificationBox}>
                                    <p style={{ margin: '0 0 1rem 0', textAlign: 'center' }}>
                                        Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
                                    </p>

                                    <div style={{ marginBottom: '1rem' }}>
                                        <label style={styles.label}>Send Amount:</label>
                                        <div style={styles.valueContainer}>
                                            <span style={styles.value}>{VERIFICATION_AMOUNT} ETH</span>
                                            <button
                                                style={styles.copyButton}
                                                onClick={() => copyToClipboard(VERIFICATION_AMOUNT, 'amount')}
                                            >
                                                {copied.amount ? '✓' : '📋'}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={styles.label}>To Address:</label>
                                        <div style={styles.valueContainer}>
                                            <span style={styles.value}>{CUBID_WALLET}</span>
                                            <button
                                                style={styles.copyButton}
                                                onClick={() => copyToClipboard(CUBID_WALLET, 'address')}
                                            >
                                                {copied.address ? '✓' : '📋'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <a
                                    href={`https://etherscan.io/address/${CUBID_WALLET}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={styles.etherscanLink}
                                >
                                    View on Etherscan ↗
                                </a>

                                <div style={{ marginTop: '1.5rem' }}>
                                    <p style={{ textAlign: 'center', color: '#666', margin: '0 0 1rem 0' }}>
                                        After sending, enter the verification amount:
                                    </p>
                                    <input
                                        type="text"
                                        placeholder="0.001"
                                        value={verificationAmount}
                                        onChange={(e) => setVerificationAmount(e.target.value)}
                                        style={{
                                            ...styles.input,
                                            borderColor: error ? '#e11d48' : '#e2e2e2',
                                        }}
                                    />
                                </div>

                                <button
                                    style={{
                                        ...styles.button,
                                        marginTop: '1rem',
                                    }}
                                    onClick={verifyTransaction}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'black')}
                                >
                                    Verify Transaction
                                </button>

                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#666',
                                        width: '100%',
                                        padding: '8px',
                                        marginTop: '8px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleDisconnect}
                                >
                                    Disconnect Wallet
                                </button>
                            </>
                        )}

                        {error && <div style={styles.error}>{error}</div>}
                    </div>
                ) : (
                    <div style={styles.successContainer}>
                        <div style={styles.successIcon}>✓</div>
                        <h3 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>Wallet Verified!</h3>
                        <p style={{ color: '#666', margin: 0 }}>
                            Your delivery wallet has been verified with Cubid.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};