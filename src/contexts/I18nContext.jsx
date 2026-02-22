import React, { createContext, useState, useEffect, useContext } from 'react';
import { locales } from '../data/locales';

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
    const [locale, setLocale] = useState(localStorage.getItem('locale') || 'zh');

    useEffect(() => {
        localStorage.setItem('locale', locale);
    }, [locale]);

    const t = (key) => {
        const keys = key.split('.');
        let value = locales[locale];
        for (const k of keys) {
            value = value?.[k];
            if (!value) return key;
        }
        return value;
    };

    const toggleLocale = () => {
        setLocale((prev) => (prev === 'zh' ? 'en' : 'zh'));
    };

    return (
        <I18nContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => useContext(I18nContext);
