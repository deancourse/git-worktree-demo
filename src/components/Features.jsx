import { FEATURES } from '../data/features';
import { useI18n } from '../contexts/I18nContext';

function Features() {
    const { t } = useI18n();
    const featuresList = t('features.list');

    // Merge static icons with localized text
    const features = Array.isArray(featuresList) ? featuresList.map((f, i) => ({
        ...f,
        icon: FEATURES[i]?.icon // Fallback to icon from data if order matches
    })) : [];

    return (
        <section className="features" id="features" aria-labelledby="features-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">{t('nav.features')}</span>
                    <h2 id="features-title" className="section-header__title">
                        {t('features.title')}
                    </h2>
                    <p className="section-header__desc">
                        {t('features.desc')}
                    </p>
                </div>

                <div className="features__grid" role="list">
                    {features.map((feature) => (
                        <article
                            key={feature.id}
                            className="features__card"
                            role="listitem"
                        >
                            <div className="features__icon" aria-hidden="true">
                                {feature.icon}
                            </div>
                            <h3 className="features__title">{feature.title}</h3>
                            <p className="features__desc">{feature.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Features;
