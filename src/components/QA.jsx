import { useState } from 'react';
import { QA_DATA } from '../data/qa';

function QA() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="qa" id="faq" aria-labelledby="qa-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">常見問題</span>
                    <h2 id="qa-title" className="section-header__title">
                        你想知道的，都在這裡
                    </h2>
                    <p className="section-header__desc">
                        我們整理了一些最常見的問題。如果您還有其他疑問，歡迎隨時聯繫我們的客戶服務團隊。
                    </p>
                </div>

                <div className="qa__accordion" role="list">
                    {QA_DATA.map((item, index) => (
                        <article 
                            key={item.id} 
                            className={`qa__item ${activeIndex === index ? 'qa__item--active' : ''}`}
                            role="listitem"
                        >
                            <button 
                                className="qa__button"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={activeIndex === index}
                                aria-controls={`qa-content-${item.id}`}
                            >
                                <span className="qa__question">{item.question}</span>
                                <span className="qa__icon" aria-hidden="true">
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </button>
                            <div 
                                id={`qa-content-${item.id}`}
                                className="qa__content"
                                role="region"
                                aria-hidden={activeIndex !== index}
                                style={{
                                    maxHeight: activeIndex === index ? '300px' : '0',
                                    opacity: activeIndex === index ? '1' : '0'
                                }}
                            >
                                <p className="qa__answer">
                                    {item.answer}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default QA;
