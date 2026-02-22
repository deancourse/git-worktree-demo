import { HERO_CONTENT } from '../data/hero';
import { useI18n } from '../contexts/I18nContext';

function Hero() {
    const { t, locale } = useI18n();
    const { primaryCta, secondaryCta } = HERO_CONTENT; // Keep hrefs from data file if needed, or move them too.

    // Get structured data from locales
    const stats = t('hero.stats');

    return (
        <section className="hero" aria-labelledby="hero-title">
            <div className="hero__bg" aria-hidden="true">
                <div className="hero__gradient" />
                <div className="hero__grid" />
            </div>

            <div className="hero__inner container">
                <div className="hero__content">
                    <h1 id="hero-title" className="hero__title">
                        {t('hero.title').split('\n').map((line, i) => (
                            <span key={i}>
                                {line}
                                {i === 0 && <br />}
                            </span>
                        ))}
                    </h1>
                    <p className="hero__subtitle">{t('hero.subtitle')}</p>

                    <div className="hero__actions">
                        <a href={primaryCta.href} className="btn btn--primary btn--lg">
                            {t('hero.cta')}
                        </a>
                        <a href={secondaryCta.href} className="btn btn--outline btn--lg">
                            {t('hero.secondaryCta')}
                        </a>
                    </div>

                    <div className="hero__stats" role="list" aria-label="關鍵成效數據">
                        {Array.isArray(stats) && stats.map((stat) => (
                            <div key={stat.label} className="hero__stat" role="listitem">
                                <span className="hero__stat-value">{stat.value}</span>
                                <span className="hero__stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hero__visual" aria-hidden="true">
                    <div className="hero__mockup">
                        <div className="hero__mockup-header">
                            <span className="hero__mockup-dot" />
                            <span className="hero__mockup-dot" />
                            <span className="hero__mockup-dot" />
                        </div>
                        <div className="hero__mockup-body">
                            <div className="hero__mockup-sidebar">
                                <div className="hero__mockup-sidebar-item" />
                                <div className="hero__mockup-sidebar-item" />
                                <div className="hero__mockup-sidebar-item hero__mockup-sidebar-item--active" />
                                <div className="hero__mockup-sidebar-item" />
                            </div>
                            <div className="hero__mockup-content">
                                <div className="hero__mockup-pipeline">
                                    <div className="hero__mockup-col">
                                        <div className="hero__mockup-col-header">{t('hero.mockup.col1')}</div>
                                        <div className="hero__mockup-card hero__mockup-card--blue" />
                                        <div className="hero__mockup-card hero__mockup-card--blue" />
                                    </div>
                                    <div className="hero__mockup-col">
                                        <div className="hero__mockup-col-header">{t('hero.mockup.col2')}</div>
                                        <div className="hero__mockup-card hero__mockup-card--purple" />
                                    </div>
                                    <div className="hero__mockup-col">
                                        <div className="hero__mockup-col-header">{t('hero.mockup.col3')}</div>
                                        <div className="hero__mockup-card hero__mockup-card--amber" />
                                        <div className="hero__mockup-card hero__mockup-card--amber" />
                                        <div className="hero__mockup-card hero__mockup-card--amber" />
                                    </div>
                                    <div className="hero__mockup-col">
                                        <div className="hero__mockup-col-header">{t('hero.mockup.col4')}</div>
                                        <div className="hero__mockup-card hero__mockup-card--green" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
