import { useState } from 'react';
import { QA_DATA } from '../data/qa';

function QASection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="qa-section" id="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 id="faq-title" className="section-header__title">
                        有疑問？我們來為您解答
                    </h2>
                    <p className="section-header__desc">
                        探索我們的常見問題，了解 SalesPilot 如何幫助您的業務飛速成長。
                    </p>
                </div>

                <div className="qa-section__list" role="list">
                    {QA_DATA.map((item, index) => {
                        const isOpen = activeIndex === index;
                        return (
                            <div
                                key={item.id}
                                className={`qa-section__item ${isOpen ? 'qa-section__item--open' : ''}`}
                            >
                                <button
                                    className="qa-section__question"
                                    onClick={() => toggleAccordion(index)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${item.id}`}
                                >
                                    <h3>{item.question}</h3>
                                    <span className="qa-section__icon" aria-hidden="true">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="6 9 12 15 18 9"></polyline>
                                        </svg>
                                    </span>
                                </button>
                                <div
                                    id={`faq-answer-${item.id}`}
                                    className="qa-section__answer-wrapper"
                                    role="region"
                                    aria-labelledby={`faq-question-${item.id}`}
                                >
                                    <div className="qa-section__answer">
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default QASection;
