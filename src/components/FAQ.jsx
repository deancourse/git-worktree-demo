import { useState } from 'react';
import FAQ_DATA from '../data/faq';

function FAQ() {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section className="faq" id="faq" aria-labelledby="faq-heading">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">FAQ</span>
                    <h2 className="section-header__title" id="faq-heading">
                        常見問題
                    </h2>
                    <p className="section-header__desc">
                        快速了解 SalesPilot CRM 的功能與服務細節
                    </p>
                </div>

                <dl className="faq__list" role="presentation">
                    {FAQ_DATA.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                            >
                                <dt>
                                    <button
                                        className="faq__question"
                                        onClick={() => toggle(item.id)}
                                        aria-expanded={isOpen}
                                        aria-controls={`${item.id}-answer`}
                                    >
                                        <span className="faq__question-text">{item.question}</span>
                                        <svg
                                            className={`faq__icon ${isOpen ? 'faq__icon--open' : ''}`}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <line x1="12" y1="5" x2="12" y2="19" />
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                        </svg>
                                    </button>
                                </dt>
                                <dd
                                    id={`${item.id}-answer`}
                                    className={`faq__answer ${isOpen ? 'faq__answer--open' : ''}`}
                                    role="region"
                                    aria-labelledby={`${item.id}-question`}
                                    hidden={!isOpen}
                                >
                                    <div className="faq__answer-inner">
                                        <p className="faq__answer-text">{item.answer}</p>
                                    </div>
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            </div>
        </section>
    );
}

export default FAQ;
