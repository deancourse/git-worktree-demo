import { useState } from 'react';
import { NAV_LINKS, BRAND } from '../data/navigation';
import { useTheme } from '../context/ThemeContext';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="navbar" role="banner">
            <div className="navbar__inner container">
                <a href="/" className="navbar__brand" aria-label={`${BRAND.name} 首頁`}>
                    <span className="navbar__logo" aria-hidden="true">◆</span>
                    <span className="navbar__brand-name">{BRAND.name}</span>
                </a>

                <button
                    className="navbar__toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-controls="nav-menu"
                    aria-label="切換導覽選單"
                >
                    <span className="navbar__toggle-bar" />
                    <span className="navbar__toggle-bar" />
                    <span className="navbar__toggle-bar" />
                </button>

                <nav
                    id="nav-menu"
                    className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}
                    role="navigation"
                    aria-label="主要導覽"
                >
                    <ul className="navbar__list">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href} className="navbar__item">
                                <a href={link.href} className="navbar__link" onClick={() => setMenuOpen(false)}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? '切換至淺色主題' : '切換至深色主題'}
                        title={theme === 'dark' ? '切換至淺色主題' : '切換至深色主題'}
                    >
                        {theme === 'dark' ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="5" />
                                <line x1="12" y1="1" x2="12" y2="3" />
                                <line x1="12" y1="21" x2="12" y2="23" />
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                <line x1="1" y1="12" x2="3" y2="12" />
                                <line x1="21" y1="12" x2="23" y2="12" />
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                            </svg>
                        ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                            </svg>
                        )}
                    </button>
                    <a href="#demo" className="btn btn--primary btn--sm navbar__cta">
                        預約 Demo
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
