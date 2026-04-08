import { useState, useEffect } from 'react';

function getInitialTheme() {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ThemeToggle() {
    const [theme, setTheme] = useState('light');

    // 初始化主题（避免 SSR 问题，在 useEffect 中读取）
    useEffect(() => {
        const initial = getInitialTheme();
        setTheme(initial);
        document.documentElement.dataset.theme = initial;
    }, []);

    const toggle = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        document.documentElement.dataset.theme = next;
        localStorage.setItem('theme', next);
    };

    return (
        <button
            id="theme-toggle"
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? '切换为浅色主题' : '切换为深色主题'}
            title={theme === 'dark' ? '切换为浅色主题' : '切换为深色主题'}
        >
            <span className="theme-toggle__icon" aria-hidden="true">
                {theme === 'dark' ? '☀️' : '🌙'}
            </span>
        </button>
    );
}

export default ThemeToggle;
