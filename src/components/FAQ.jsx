import { useState, useRef, useEffect } from 'react';
import { faqData } from '../data/faq';

const FAQItem = ({ faq, isOpen, onClick }) => {
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
            <button
                className="faq__question"
                onClick={onClick}
                aria-expanded={isOpen}
            >
                <span className="faq__question-text">{faq.question}</span>
                <span className="faq__icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>
            <div
                className="faq__answer-wrapper"
                style={{ height: isOpen ? `${contentHeight}px` : '0px' }}
            >
                <div className="faq__answer" ref={contentRef}>
                    <p>{faq.answer}</p>
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId((prevId) => (prevId === id ? null : id));
    };

    return (
        <section className="faq" id="faq">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見常見</span>
                    <h2 className="section-header__title">仍有疑問嗎？</h2>
                    <p className="section-header__desc">針對 SalesPilot 的常見問題為您作解答。</p>
                </div>

                <div className="faq__list">
                    {faqData.map((faq) => (
                        <FAQItem
                            key={faq.id}
                            faq={faq}
                            isOpen={openId === faq.id}
                            onClick={() => handleToggle(faq.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
