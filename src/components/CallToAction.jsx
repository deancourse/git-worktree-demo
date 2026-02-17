import { useI18n } from '../contexts/I18nContext';

function CallToAction() {
    const { t } = useI18n();

    return (
        <section className="cta-banner" id="demo" aria-labelledby="cta-title">
            <div className="cta-banner__bg" aria-hidden="true" />
            <div className="container cta-banner__inner">
                <h2 id="cta-title" className="cta-banner__title">
                    {t('cta.title')}
                </h2>
                <p className="cta-banner__desc">
                    {t('cta.desc')}
                </p>
                <div className="cta-banner__actions">
                    <a href="#demo" className="btn btn--white btn--lg">
                        {t('cta.btn_primary')}
                    </a>
                    <a href="#pricing" className="btn btn--outline-white btn--lg">
                        {t('cta.btn_secondary')}
                    </a>
                </div>
            </div>
        </section>
    );
}

export default CallToAction;
