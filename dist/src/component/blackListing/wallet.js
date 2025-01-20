function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import React, { useState, useEffect } from 'react';
import { useConnect, useAccount, useDisconnect } from 'wagmi';
export var WalletVerificationModal = function(param) {
    var isOpen = param.isOpen, onClose = param.onClose, onSuccess = param.onSuccess, onError = param.onError, passedAddress = param.address;
    // Wagmi hooks
    var _useConnect = useConnect(), connect = _useConnect.connect, connectors = _useConnect.connectors, isLoading = _useConnect.isPending;
    var _useAccount = useAccount(), address = _useAccount.address, isConnected = _useAccount.isConnected;
    var disconnect = useDisconnect().disconnect;
    var _useState = _sliced_to_array(useState(''), 2), verificationAmount = _useState[0], setVerificationAmount = _useState[1];
    var _useState1 = _sliced_to_array(useState('connect'), 2), step = _useState1[0], setStep = _useState1[1];
    var _useState2 = _sliced_to_array(useState(''), 2), error = _useState2[0], setError = _useState2[1];
    var _useState3 = _sliced_to_array(useState(false), 2), success = _useState3[0], setSuccess = _useState3[1];
    var _useState4 = _sliced_to_array(useState({
        amount: false,
        address: false
    }), 2), copied = _useState4[0], setCopied = _useState4[1];
    // Constants for verification
    var VERIFICATION_AMOUNT = '0.001';
    var CUBID_WALLET = '0x1234...5678';
    // Effect to handle wallet connection
    useEffect(function() {
        if (isConnected && address) {
            setStep('verify');
        }
    }, [
        isConnected,
        address
    ]);
    // Styles
    var styles = {
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
            zIndex: 1000
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '400px',
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        },
        modalCloseButton: {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#666',
            padding: '4px'
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
            transition: 'background-color 0.3s'
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
            fontSize: '16px'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem'
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            margin: '0 0 8px 0'
        },
        subtitle: {
            fontSize: '18px',
            fontWeight: '500',
            margin: '0',
            color: '#333'
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
            textAlign: 'center'
        },
        verificationBox: {
            backgroundColor: '#f8f8f8',
            border: '2px solid #e2e2e2',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem'
        },
        label: {
            display: 'block',
            fontSize: '14px',
            color: '#666',
            marginBottom: '4px'
        },
        valueContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            border: '1px solid #e2e2e2'
        },
        value: {
            fontFamily: 'monospace',
            fontSize: '16px'
        },
        copyButton: {
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            color: '#666',
            transition: 'color 0.3s'
        },
        etherscanLink: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            color: 'black',
            textDecoration: 'none',
            fontSize: '14px',
            marginTop: '1rem'
        },
        error: {
            color: '#e11d48',
            backgroundColor: '#fee2e2',
            padding: '12px',
            borderRadius: '6px',
            marginTop: '1rem',
            fontSize: '14px'
        },
        successContainer: {
            textAlign: 'center',
            padding: '2rem 0'
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
            margin: '0 auto 1rem'
        }
    };
    var copyToClipboard = function(text, type) {
        navigator.clipboard.writeText(text);
        setCopied(function(prev) {
            return _object_spread_props(_object_spread({}, prev), _define_property({}, type, true));
        });
        setTimeout(function() {
            setCopied(function(prev) {
                return _object_spread_props(_object_spread({}, prev), _define_property({}, type, false));
            });
        }, 2000);
    };
    var verifyTransaction = function() {
        if (!verificationAmount || verificationAmount !== VERIFICATION_AMOUNT) {
            setError('Please enter the correct verification amount');
            return;
        }
        setSuccess(true);
        setTimeout(function() {
            handleClose();
        }, 2000);
    };
    var resetForm = function() {
        setVerificationAmount('');
        setStep('connect');
        setError('');
        setSuccess(false);
        setCopied({
            amount: false,
            address: false
        });
        disconnect();
    };
    // Handle close
    var handleClose = function() {
        if (onClose) {
            onClose();
        }
        resetForm();
    };
    var handleDisconnect = function() {
        disconnect();
        setStep('connect');
    };
    if (!isOpen) {
        return null;
    }
    return /*#__PURE__*/ React.createElement("div", {
        style: styles.modalOverlay,
        onClick: handleClose
    }, /*#__PURE__*/ React.createElement("div", {
        style: styles.modalContent,
        onClick: function(e) {
            return e.stopPropagation();
        }
    }, /*#__PURE__*/ React.createElement("button", {
        style: styles.modalCloseButton,
        onClick: handleClose,
        "aria-label": "Close Wallet Modal"
    }, "\xd7"), /*#__PURE__*/ React.createElement("div", {
        style: styles.header
    }, /*#__PURE__*/ React.createElement("h2", {
        style: styles.title
    }, "CUBID"), /*#__PURE__*/ React.createElement("h3", {
        style: styles.subtitle
    }, "Verify Delivery Wallet")), !success ? /*#__PURE__*/ React.createElement("div", null, step === 'connect' ? /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("p", {
        style: {
            textAlign: 'center',
            color: '#666',
            margin: '0 0 1rem 0'
        }
    }, "Connect your wallet to begin verification."), /*#__PURE__*/ React.createElement("div", {
        style: {
            marginBottom: '1rem'
        }
    }, connectors.map(function(connector) {
        return /*#__PURE__*/ React.createElement("button", {
            disabled: !connector.ready,
            key: connector.id,
            onClick: function() {
                return connect({
                    connector: connector
                });
            },
            style: styles.connectorButton,
            onMouseOver: function(e) {
                return e.currentTarget.style.borderColor = 'black';
            },
            onMouseOut: function(e) {
                return e.currentTarget.style.borderColor = '#e2e2e2';
            }
        }, /*#__PURE__*/ React.createElement("span", null, connector.name), !connector.ready && ' (unsupported)', isLoading && ' (connecting)');
    }))) : /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement("div", {
        style: styles.verificationBox
    }, /*#__PURE__*/ React.createElement("p", {
        style: {
            margin: '0 0 1rem 0',
            textAlign: 'center'
        }
    }, "Connected: ", address === null || address === void 0 ? void 0 : address.slice(0, 6), "...", address === null || address === void 0 ? void 0 : address.slice(-4)), /*#__PURE__*/ React.createElement("div", {
        style: {
            marginBottom: '1rem'
        }
    }, /*#__PURE__*/ React.createElement("label", {
        style: styles.label
    }, "Send Amount:"), /*#__PURE__*/ React.createElement("div", {
        style: styles.valueContainer
    }, /*#__PURE__*/ React.createElement("span", {
        style: styles.value
    }, VERIFICATION_AMOUNT, " ETH"), /*#__PURE__*/ React.createElement("button", {
        style: styles.copyButton,
        onClick: function() {
            return copyToClipboard(VERIFICATION_AMOUNT, 'amount');
        }
    }, copied.amount ? '✓' : '📋'))), /*#__PURE__*/ React.createElement("div", null, /*#__PURE__*/ React.createElement("label", {
        style: styles.label
    }, "To Address:"), /*#__PURE__*/ React.createElement("div", {
        style: styles.valueContainer
    }, /*#__PURE__*/ React.createElement("span", {
        style: styles.value
    }, CUBID_WALLET), /*#__PURE__*/ React.createElement("button", {
        style: styles.copyButton,
        onClick: function() {
            return copyToClipboard(CUBID_WALLET, 'address');
        }
    }, copied.address ? '✓' : '📋')))), /*#__PURE__*/ React.createElement("a", {
        href: "https://etherscan.io/address/".concat(CUBID_WALLET),
        target: "_blank",
        rel: "noopener noreferrer",
        style: styles.etherscanLink
    }, "View on Etherscan ↗"), /*#__PURE__*/ React.createElement("div", {
        style: {
            marginTop: '1.5rem'
        }
    }, /*#__PURE__*/ React.createElement("p", {
        style: {
            textAlign: 'center',
            color: '#666',
            margin: '0 0 1rem 0'
        }
    }, "After sending, enter the verification amount:"), /*#__PURE__*/ React.createElement("input", {
        type: "text",
        placeholder: "0.001",
        value: verificationAmount,
        onChange: function(e) {
            return setVerificationAmount(e.target.value);
        },
        style: _object_spread_props(_object_spread({}, styles.input), {
            borderColor: error ? '#e11d48' : '#e2e2e2'
        })
    })), /*#__PURE__*/ React.createElement("button", {
        style: _object_spread_props(_object_spread({}, styles.button), {
            marginTop: '1rem'
        }),
        onClick: verifyTransaction,
        onMouseOver: function(e) {
            return e.currentTarget.style.backgroundColor = '#333';
        },
        onMouseOut: function(e) {
            return e.currentTarget.style.backgroundColor = 'black';
        }
    }, "Verify Transaction"), /*#__PURE__*/ React.createElement("button", {
        style: {
            background: 'none',
            border: 'none',
            color: '#666',
            width: '100%',
            padding: '8px',
            marginTop: '8px',
            cursor: 'pointer'
        },
        onClick: handleDisconnect
    }, "Disconnect Wallet")), error && /*#__PURE__*/ React.createElement("div", {
        style: styles.error
    }, error)) : /*#__PURE__*/ React.createElement("div", {
        style: styles.successContainer
    }, /*#__PURE__*/ React.createElement("div", {
        style: styles.successIcon
    }, "✓"), /*#__PURE__*/ React.createElement("h3", {
        style: {
            fontSize: '20px',
            margin: '0 0 8px 0'
        }
    }, "Wallet Verified!"), /*#__PURE__*/ React.createElement("p", {
        style: {
            color: '#666',
            margin: 0
        }
    }, "Your delivery wallet has been verified with Cubid."))));
};
