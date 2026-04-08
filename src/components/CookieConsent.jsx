import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsMounted(true);
                // Allow DOM to update before applying visible class for transition
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsVisible(true);
                    });
                });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleConsent = (value) => {
        localStorage.setItem('cookie-consent', value);
        setIsVisible(false);
    };

    const handleTransitionEnd = (e) => {
        // Ensure we only unmount when the transition finishes and we are intended to be hidden
        if (!isVisible && e.propertyName === 'transform') {
            setIsMounted(false);
        }
    };

    if (!isMounted) return null;

    return (
        <div 
            className={`cookie-consent ${isVisible ? 'cookie-consent--visible' : ''}`}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className="cookie-consent__header">
                <span className="cookie-consent__icon" aria-hidden="true">🍪</span>
                <h3 className="cookie-consent__title">Cookie 使用说明</h3>
            </div>
            <p className="cookie-consent__desc">
                我们使用 Cookie 来改善您的浏览体验，分析网站流量并提供个性化内容。继续使用本网站即表示您同意我们使用的 Cookie。
            </p>
            <div className="cookie-consent__actions">
                <button className="btn btn--primary cookie-consent__btn" onClick={() => handleConsent('accepted')}>
                    ✅ 全部接受
                </button>
                <button className="btn btn--outline cookie-consent__btn" onClick={() => handleConsent('rejected')}>
                    ❌ 拒绝
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
