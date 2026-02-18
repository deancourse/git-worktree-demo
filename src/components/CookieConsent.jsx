import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowBanner(true);
            // Small delay to allow browser to paint before adding class for transition
            setTimeout(() => setAnimateIn(true), 50);
        }
    }, []);

    const handleAccept = (type) => {
        localStorage.setItem('cookie-consent', type);
        setAnimateIn(false); // Triggers exit animation

        // Wait for animation to finish before removing from DOM
        setTimeout(() => {
            setShowBanner(false);
        }, 400);
    };

    if (!showBanner) return null;

    return (
        <div className={`cookie-consent ${animateIn ? 'cookie-consent--visible' : ''}`}>
            <div className="container">
                <div className="cookie-consent__inner">
                    <div className="cookie-consent__content">
                        <h3 className="cookie-consent__title">我們重視您的隱私</h3>
                        <p className="cookie-consent__text">
                            我們使用 Cookie 來改善您的瀏覽體驗、提供個人化內容並分析網站流量。
                            點擊「接受所有」即表示您同意我們使用 Cookie。
                            <a href="#" className="cookie-consent__link">了解更多</a>
                        </p>
                    </div>
                    <div className="cookie-consent__actions">
                        <button
                            className="btn btn--outline-white btn--sm"
                            onClick={() => handleAccept('necessary')}
                        >
                            僅必要
                        </button>
                        <button
                            className="btn btn--primary btn--sm"
                            onClick={() => handleAccept('accepted')}
                        >
                            接受所有
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
