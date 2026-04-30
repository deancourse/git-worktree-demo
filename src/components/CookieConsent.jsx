import { useState, useEffect } from 'react';

const STORAGE_KEY = 'salespilot-cookie-consent';

function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        const value = localStorage.getItem(STORAGE_KEY);
        if (!value) {
            setVisible(true);
        }
    }, []);

    const handleConsent = (decision) => {
        localStorage.setItem(STORAGE_KEY, decision);
        setExiting(true);
        setTimeout(() => {
            setVisible(false);
            setExiting(false);
        }, 300);
    };

    if (!visible) return null;

    return (
        <aside
            className={`cookie-consent ${exiting ? 'cookie-consent--exit' : ''}`}
            role="dialog"
            aria-labelledby="cookie-consent-heading"
            aria-modal="false"
        >
            <div className="cookie-consent__inner container">
                <div className="cookie-consent__text">
                    <h2 className="cookie-consent__heading" id="cookie-consent-heading">
                        Cookie 使用聲明
                    </h2>
                    <p className="cookie-consent__desc">
                        本網站使用必要的 Cookie 來確保基本功能運作，並使用分析型 Cookie 來持續改善使用體驗。
                        點擊「接受」即表示你同意我們使用 Cookie。詳情請參閱我們的隱私權政策。
                    </p>
                </div>
                <div className="cookie-consent__actions">
                    <button
                        className="btn btn--outline btn--sm cookie-consent__btn"
                        onClick={() => handleConsent('declined')}
                    >
                        拒絕
                    </button>
                    <button
                        className="btn btn--primary btn--sm cookie-consent__btn"
                        onClick={() => handleConsent('accepted')}
                    >
                        接受
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default CookieConsent;
