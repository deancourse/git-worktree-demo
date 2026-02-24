/**
 * ThemeToggle — 日/月圖示動畫切換按鈕
 * 接收 theme ('dark'|'light') 與 toggleTheme callback
 */
function ThemeToggle({ theme, toggleTheme }) {
    const isDark = theme === 'dark';

    return (
        <button
            id="theme-toggle-btn"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? '切換至淺色主題' : '切換至深色主題'}
            aria-pressed={!isDark}
            title={isDark ? '切換至淺色主題' : '切換至深色主題'}
        >
            <span className="theme-toggle__thumb" aria-hidden="true">
                {/* 月亮（深色模式） */}
                <span className="theme-toggle__icon theme-toggle__icon--moon">
                    🌙
                </span>
                {/* 太陽（淺色模式） */}
                <span className="theme-toggle__icon theme-toggle__icon--sun">
                    ☀️
                </span>
            </span>
        </button>
    );
}

export default ThemeToggle;
