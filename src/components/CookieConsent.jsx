import { useState, useEffect } from 'react';

function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [dismissed, setDismissed] = useState(() => !!localStorage.getItem('cookie-consent'));

    useEffect(() => {
        if (dismissed) return;
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
    }, [dismissed]);

    useEffect(() => {
        if (visible && !dismissed) {
            document.body.classList.add('cookie-banner-open');
        } else {
            document.body.classList.remove('cookie-banner-open');
        }
        return () => document.body.classList.remove('cookie-banner-open');
    }, [visible, dismissed]);

    if (dismissed || !visible) return null;

    const accept = (value) => {
        localStorage.setItem('cookie-consent', value);
        setDismissed(true);
    };

    return (
        <div className="cookie-consent" role="dialog" aria-label="Cookie 同意">
            <div className="cookie-consent__inner container">
                <p className="cookie-consent__text">
                    我們使用 Cookie 來改善您的使用體驗並分析網站流量。{' '}
                    <a href="#" className="cookie-consent__link">了解更多</a>
                </p>
                <div className="cookie-consent__actions">
                    <button
                        className="btn btn--sm btn--outline"
                        onClick={() => accept('essential')}
                    >
                        僅必要
                    </button>
                    <button
                        className="btn btn--sm btn--primary"
                        onClick={() => accept('accepted')}
                    >
                        接受所有 Cookie
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieConsent;
