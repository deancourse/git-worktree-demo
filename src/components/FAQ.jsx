import { useState } from 'react';

const FAQ_DATA = [
    {
        id: 1,
        question: "SalesPilot CRM 與其他工具有什麼不同？",
        answer: "SalesPilot 專為高成長團隊設計。不同於傳統 CRM 笨重且難以使用，我們專注於自動化、速度以及美觀的使用者介面，讓您的團隊真正享受使用的過程。"
    },
    {
        id: 2,
        question: "有提供免費試用嗎？",
        answer: "有的！我們提供 14 天免費試用，您可以完整體驗所有 Pro 功能。無需綁定信用卡即可開始使用，讓您無風險地探索我們的平台。"
    },
    {
        id: 3,
        question: "我可以從目前的 CRM 匯入資料嗎？",
        answer: "當然可以。我們提供 CSV 和 Excel 檔案的一鍵匯入工具。此外，我們也提供 Salesforce、HubSpot 和 Pipedrive 的直接遷移工具，讓切換過程無縫接軌。"
    },
    {
        id: 4,
        question: "我的資料安全嗎？",
        answer: "安全性是我們的首要考量。我們使用企業級 AES-256 加密技術保護靜態資料，並使用 TLS 1.3 保護傳輸中的資料。我們符合 SOC 2 Type II 標準，並定期進行安全稽核。"
    },
    {
        id: 5,
        question: "你們有提供與其他工具的整合嗎？",
        answer: "是的，SalesPilot 可與超過 2,000+ 個應用程式連接。我們與 Slack、Gmail、Outlook、Zoom 和 Stripe 有原生整合，並完全支援 Zapier，以自動化您的整個工作流程。"
    },
    {
        id: 6,
        question: "如果我需要升級或降級方案怎麼辦？",
        answer: "您可以隨時從後台儀表板更改您的方案。費用將根據使用天數自動按比例調整，您只需支付實際使用的部分。"
    }
];

const FAQ = () => {
    const [openItems, setOpenItems] = useState([]);

    const toggleItem = (id) => {
        setOpenItems(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    return (
        <section className="faq section" id="faq">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">支援中心</span>
                    <h2 className="section-header__title">常見問答</h2>
                    <p className="section-header__desc">關於 SalesPilot CRM 的所有疑問。找不到您需要的答案嗎？歡迎與我們友善的團隊聯繫。</p>
                </div>

                <div className="faq__grid">
                    {FAQ_DATA.map((item) => {
                        const isOpen = openItems.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}
                            >
                                <button
                                    className="faq__question"
                                    onClick={() => toggleItem(item.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="faq__question-text">{item.question}</span>
                                    <span className="faq__icon">
                                        {isOpen ? '−' : '+'}
                                    </span>
                                </button>
                                <div className="faq__answer-wrapper">
                                    <div className="faq__answerWrapperInner">
                                        <p className="faq__answer">{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
