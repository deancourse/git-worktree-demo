import { useState, useEffect } from 'react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            // Show popup with a slight delay for better UX
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'false');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent">
            <div className="cookie-consent-content">
                <div className="cookie-consent-text">
                    <h4>我們重視您的隱私</h4>
                    <p>
                        本網站使用 cookies 來提升您的瀏覽體驗、分析網站流量，並提供客製化內容。
                        點擊「同意」即表示您同意我們使用 cookies。
                    </p>
                </div>
                <div className="cookie-consent-actions">
                    <button
                        className="btn btn-secondary cookie-btn-decline"
                        onClick={handleDecline}
                    >
                        拒絕
                    </button>
                    <button
                        className="btn btn-primary cookie-btn-accept"
                        onClick={handleAccept}
                    >
                        同意
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
