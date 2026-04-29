import { useState } from 'react';
import { FAQ_ITEMS } from '../data/faq';

function FAQ() {
    const [openId, setOpenId] = useState(null);

    function toggle(id) {
        setOpenId((prev) => (prev === id ? null : id));
    }

    return (
        <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 id="faq-title" className="section-header__title">
                        您最想知道的問題
                    </h2>
                    <p className="section-header__desc">
                        找不到答案？歡迎隨時聯繫我們的支援團隊。
                    </p>
                </div>

                <dl className="faq__list">
                    {FAQ_ITEMS.map((item) => {
                        const isOpen = openId === item.id;
                        return (
                            <div
                                key={item.id}
                                className={`faq__item${isOpen ? ' faq__item--open' : ''}`}
                            >
                                <dt>
                                    <button
                                        className="faq__question"
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${item.id}`}
                                        onClick={() => toggle(item.id)}
                                    >
                                        <span>{item.question}</span>
                                        <span className="faq__icon" aria-hidden="true">
                                            {isOpen ? '−' : '+'}
                                        </span>
                                    </button>
                                </dt>
                                <dd
                                    id={`faq-answer-${item.id}`}
                                    className="faq__answer"
                                    aria-hidden={!isOpen}
                                >
                                    <p>{item.answer}</p>
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
