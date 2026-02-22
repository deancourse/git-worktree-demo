import React, { useState, useEffect } from 'react';
import { useI18n } from '../contexts/I18nContext';

const CookieConsent = () => {
    const { t } = useI18n();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="cookie-consent">
            <p>{t('cookie.message')}</p>
            <button onClick={handleAccept}>{t('cookie.accept')}</button>
        </div>
    );
};

export default CookieConsent;
