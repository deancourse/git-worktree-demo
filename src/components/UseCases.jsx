import { USE_CASES } from '../data/useCases';
import { useI18n } from '../contexts/I18nContext';

function UseCases() {
    const { t } = useI18n();
    const useCasesList = t('useCases.list');

    // Merge static icons/ids with localized text
    const useCases = Array.isArray(useCasesList) ? useCasesList.map((uc, i) => ({
        ...uc,
        id: USE_CASES[i]?.id,
        icon: USE_CASES[i]?.icon
    })) : [];

    return (
        <section className="use-cases" id="use-cases" aria-labelledby="use-cases-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">{t('nav.useCases')}</span>
                    <h2 id="use-cases-title" className="section-header__title">
                        {t('useCases.title')}
                    </h2>
                </div>

                <div className="use-cases__list">
                    {useCases.map((uc, index) => (
                        <article
                            key={uc.id || index}
                            className={`use-cases__item ${index % 2 === 1 ? 'use-cases__item--reverse' : ''}`}
                        >
                            <div className="use-cases__content">
                                <div className="use-cases__role-badge">
                                    <span aria-hidden="true">{uc.icon}</span> {uc.role}
                                </div>
                                <h3 className="use-cases__title">{uc.title}</h3>
                                <p className="use-cases__desc">{uc.desc}</p>
                                <ul className="use-cases__highlights" role="list">
                                    {uc.highlights && uc.highlights.map((h) => (
                                        <li key={h} className="use-cases__highlight" role="listitem">
                                            <span className="use-cases__check" aria-hidden="true">✓</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="use-cases__visual" aria-hidden="true">
                                <div className="use-cases__illustration">
                                    <span className="use-cases__illustration-icon">{uc.icon}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default UseCases;
