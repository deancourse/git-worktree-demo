import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [show, setShow] = useState(false);
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    if (!show) {
        return null;
    }

    const handleConsent = (decision) => {
        setFadingOut(true);
        setTimeout(() => {
            localStorage.setItem('cookie_consent', decision);
            setShow(false);
        }, 500); // Wait for opacity transition
    };

    const containerStyle = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        color: '#fff',
        padding: '16px 20px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        zIndex: 9999,
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 0.5s ease',
    };

    const textStyle = {
        flex: '1 1 300px',
        fontSize: '14px',
        lineHeight: '1.5',
        margin: 0,
        textAlign: 'left'
    };

    const buttonContainerStyle = {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
    };

    const buttonStyle = {
        padding: '10px 16px',
        minHeight: '44px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '14px',
        whiteSpace: 'nowrap',
    };

    const acceptButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#007BFF',
        color: '#fff',
    };

    const declineButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#fff',
        color: '#000',
    };

    return (
        <div style={containerStyle}>
            <p style={textStyle}>
                我們使用 Cookie 來改善您的瀏覽體驗。繼續瀏覽即代表您同意我們的 Cookie 政策。
            </p>
            <div style={buttonContainerStyle}>
                <button style={declineButtonStyle} onClick={() => handleConsent('declined')}>
                    僅必要 Cookie
                </button>
                <button style={acceptButtonStyle} onClick={() => handleConsent('accepted')}>
                    接受所有 Cookie
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
