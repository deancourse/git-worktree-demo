import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if the user has already answered the consent
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent">
            <div className="cookie-consent__content">
                <div className="cookie-consent__icon">🍪</div>
                <div className="cookie-consent__text">
                    <h3 className="cookie-consent__title">我們重視您的隱私</h3>
                    <p className="cookie-consent__description">
                        我們使用 Cookie 來改善您的瀏覽體驗、提供個人化內容以及分析網站流量。您可以選擇同意所有 Cookie，或僅允許必要的 Cookie。
                    </p>
                </div>
            </div>
            <div className="cookie-consent__actions">
                <button 
                    className="btn btn--outline cookie-consent__btn" 
                    onClick={handleReject}
                >
                    僅必要
                </button>
                <button 
                    className="btn btn--primary cookie-consent__btn" 
                    onClick={handleAccept}
                >
                    同意
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
