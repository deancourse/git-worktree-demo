import './cookie-consent.css';

const COOKIE_CONSENT_ACKNOWLEDGED = 'COOKIE_CONSENT_ACKNOWLEDGED';

function initCookieConsent() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const hasConsented = localStorage.getItem(COOKIE_CONSENT_ACKNOWLEDGED);
    if (hasConsented) {
        return;
    }

    // Show banner
    banner.style.display = 'flex';

    // Wait for next frame to trigger CSS transition
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            banner.classList.add('visible');
        });
    });

    const hideBanner = (value) => {
        localStorage.setItem(COOKIE_CONSENT_ACKNOWLEDGED, value);
        banner.classList.remove('visible');
        banner.addEventListener('transitionend', () => {
            if (!banner.classList.contains('visible')) {
                banner.style.display = 'none';
            }
        }, { once: true });
    };

    document.getElementById('cookie-btn-accept')?.addEventListener('click', () => hideBanner('true'));
    document.getElementById('cookie-btn-decline')?.addEventListener('click', () => hideBanner('false'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
} else {
    initCookieConsent();
}
