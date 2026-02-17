import React, { useState } from 'react';
import { useI18n } from '../contexts/I18nContext';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="faq-question">
                {question}
                <span className="faq-toggle">{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
};

const FAQ = () => {
    const { t } = useI18n();
    const questions = [
        { q: t('faq.q1'), a: t('faq.a1') },
        { q: t('faq.q2'), a: t('faq.a2') },
        { q: t('faq.q3'), a: t('faq.a3') },
    ];

    return (
        <section className="faq-section">
            <div className="container">
                <h2>{t('faq.title')}</h2>
                <div className="faq-list">
                    {questions.map((item, index) => (
                        <FAQItem key={index} question={item.q} answer={item.a} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
