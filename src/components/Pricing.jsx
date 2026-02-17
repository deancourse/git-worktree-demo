import { useState } from 'react';
import { PRICING_PLANS } from '../data/pricing';
import { useI18n } from '../contexts/I18nContext';

function Pricing() {
    const { t } = useI18n();
    const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
    const plansData = t('pricing.plans');

    // Merge static data (IDs, price values for calc) with localized data
    const plans = Array.isArray(plansData) ? plansData.map((p, i) => ({
        ...p,
        id: PRICING_PLANS[i]?.id,
        priceValue: PRICING_PLANS[i]?.priceValue,
        featured: PRICING_PLANS[i]?.featured,
        ctaHref: PRICING_PLANS[i]?.cta.href
    })) : [];

    const calculatePrice = (plan) => {
        if (plan.priceValue === null) return plan.price; // "Contact Us" or localized string from plan object? 
        // plan.price from locales.js might be "Contact Us". 
        // But for numeric plans, we need to format.
        // Let's rely on priceValue.

        let price = plan.priceValue;
        if (billingCycle === 'yearly') {
            price = Math.round(price * 0.8 * 12); // 20% off, annual
            return `NT$ ${price.toLocaleString()}`;
        }
        return `NT$ ${price.toLocaleString()}`;
    };

    const getPeriod = (plan) => {
        if (plan.priceValue === null) return '';
        return billingCycle === 'yearly' ? t('pricing.per_year') : t('pricing.per_month');
    };

    return (
        <section className="pricing" id="pricing" aria-labelledby="pricing-title">
            <div className="container">
                <div className="section-header">
                    <span className="section-header__badge">{t('nav.pricing')}</span>
                    <h2 id="pricing-title" className="section-header__title">
                        {t('pricing.title')}
                    </h2>
                    <p className="section-header__desc">
                        {t('faq.a1')}
                    </p>
                </div>

                <div className="pricing__toggle-container">
                    <span className={`pricing__toggle-label ${billingCycle === 'monthly' ? 'active' : ''}`}>
                        {t('pricing.monthly')}
                    </span>
                    <button
                        className={`pricing__toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                        onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                        aria-label="Toggle billing cycle"
                    >
                        <div className="pricing__toggle-thumb" />
                    </button>
                    <span className={`pricing__toggle-label ${billingCycle === 'yearly' ? 'active' : ''}`}>
                        {t('pricing.yearly')} <span className="highlight">({t('pricing.save')})</span>
                    </span>
                </div>

                <div className="pricing__grid" role="list">
                    {plans.map((plan) => (
                        <article
                            key={plan.id}
                            className={`pricing__card ${plan.featured ? 'pricing__card--featured' : ''}`}
                            role="listitem"
                        >
                            {plan.badge && (
                                <span className="pricing__badge">{plan.badge}</span>
                            )}
                            <h3 className="pricing__plan-name">{plan.name}</h3>
                            <p className="pricing__plan-desc">{plan.desc}</p>
                            <div className="pricing__price">
                                <span className="pricing__amount">{calculatePrice(plan)}</span>
                                {plan.priceValue !== null && <span className="pricing__period">{getPeriod(plan)}</span>}
                            </div>
                            <a
                                href={plan.ctaHref}
                                className={`btn btn--lg btn--full ${plan.featured ? 'btn--primary' : 'btn--outline'}`}
                            >
                                {plan.cta}
                            </a>
                            <ul className="pricing__features" role="list">
                                {plan.features && plan.features.map((f) => (
                                    <li key={f} className="pricing__feature" role="listitem">
                                        <span className="pricing__check" aria-hidden="true">✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Pricing;
