import { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';

function FAQ() {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

    return (
        <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 id="faq-title" className="section-header__title">
                        您可能想知道的問題
                    </h2>
                    <p className="section-header__desc">
                        以下是關於 SalesPilot 方案、試用與整合的常見問答，若還有其他疑問歡迎聯繫我們。
                    </p>
                </div>

                <div className="faq__list" role="list">
                    {FAQ_ITEMS.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                                role="listitem"
                            >
                                <button
                                    type="button"
                                    className="faq__question"
                                    onClick={() => toggle(item.id)}
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${item.id}`}
                                    id={`faq-question-${item.id}`}
                                >
                                    <span>{item.question}</span>
                                    <span className="faq__icon" aria-hidden="true">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                <div
                                    id={`faq-answer-${item.id}`}
                                    className="faq__answer"
                                    role="region"
                                    aria-labelledby={`faq-question-${item.id}`}
                                    hidden={!isOpen}
                                >
                                    <p>{item.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FAQ;
