import { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Slight delay before showing to ensure smooth entrance
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        setIsAnimatingOut(true);
        localStorage.setItem('cookieConsent', 'true');
        // Wait for animation to finish before hiding from DOM
        setTimeout(() => setIsVisible(false), 400);
    };

    if (!isVisible) return null;

    return (
        <div className={`cookie-consent ${isAnimatingOut ? 'cookie-consent--hide' : 'cookie-consent--show'}`}>
            <div className="cookie-consent__inner container">
                <div className="cookie-consent__content">
                    <div className="cookie-consent__icon">
                        🍪
                    </div>
                    <div className="cookie-consent__text">
                        <h3 className="cookie-consent__title">我們重視您的隱私</h3>
                        <p className="cookie-consent__desc">
                            我們使用 Cookie 來改善您的瀏覽體驗、提供個人化內容並分析我們的流量。點擊「同意」，即表示您同意我們使用 Cookie。
                        </p>
                    </div>
                </div>
                <div className="cookie-consent__actions">
                    <a href="#privacy" className="btn btn--outline cookie-consent__link">隱私權政策</a>
                    <button onClick={handleAccept} className="btn btn--primary cookie-consent__btn">
                        同意
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
