import React from 'react';
import { useI18n } from '../contexts/I18nContext';

const Loading = () => {
    const { t } = useI18n();

    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>{t('loading.text')}</p>
        </div>
    );
};

export default Loading;
