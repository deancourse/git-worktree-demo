import { useState, useEffect } from 'react';

const STORAGE_KEY = 'sp-theme';

/**
 * 讀取初始主題，優先順序：
 * 1. localStorage 中的使用者偏好
 * 2. OS 系統層級 prefers-color-scheme
 * 3. 預設 'dark'
 */
function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'dark';
}

/**
 * useTheme Hook
 * 管理主題狀態，同步至 <html data-theme="..."> 與 localStorage
 */
export function useTheme() {
    const [theme, setTheme] = useState(() => getInitialTheme());

    // 當 theme 改變時，同步至 html attribute 與 localStorage
    useEffect(() => {
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    function toggleTheme() {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    }

    return { theme, toggleTheme };
}
