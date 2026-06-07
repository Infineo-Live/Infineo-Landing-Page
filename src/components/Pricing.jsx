import { useState, useRef, useEffect } from 'react';
import '../styles/Pricing.css';
import { PRICING, COUNTRY_TO_CURRENCY } from '../config/pricing';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(2);
  const [currency, setCurrency] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const override = params.get('country');
    if (override) {
      setCurrency(COUNTRY_TO_CURRENCY[override] ?? 'USD');
      return;
    }

    fetch('/api/country')
      .then((r) => r.json())
      .then(({ country }) => {
        setCurrency(COUNTRY_TO_CURRENCY[country] ?? 'USD');
      })
      .catch(() => {
        setCurrency('USD');
      });
  }, []);

  const plans = [
    {
      id: 1,
      name: 'Trial Session',
      sessions: 1,
      sessionUnit: 'Free Demo Session',
      description: 'Discover Infineo',
      features: [
        'Infineo Starter Kit'
      ],
      color: 'starter',
      pricingKey: null,
    },
    {
      id: 2,
      name: 'Foundation',
      sessions: 10,
      sessionUnit: 'sessions',
      description: 'The Infineo Experience',
      features: [
        'Everything from Discover Infineo',
        '10 sessions',
        '1 module',
        'Flexible 1-2x/week'
      ],
      color: 'popular',
      pricingKey: 'foundation',
    },
    {
      id: 3,
      name: 'Committed Learner',
      sessions: 30,
      sessionUnit: 'sessions',
      description: 'Deepest Value',
      features: [
        'Everything from Infineo Experience',
        '30 sessions',
        '3 modules',
        'Class recordings',
        'Monthly progress summary'
      ],
      color: 'premium',
      pricingKey: 'committedLearner',
    }
  ];

  const currencyData = currency ? PRICING[currency] : null;

  return (
    <section className="pricing-section" ref={containerRef} id="pricing">
      <div className="pricing-container">

        {/* Header */}
        <div className="pricing-header">
          <h2 className="pricing-title">Flexible Pricing Plans</h2>
          <p className="pricing-subtitle">
            Choose what works best for your kid
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards">
          {plans.map((plan, index) => {
            const planPricing = plan.pricingKey && currencyData
              ? currencyData[plan.pricingKey]
              : null;

            const symbol = currencyData ? currencyData.symbol : '';
            const original = planPricing ? planPricing.original : null;
            const discounted = planPricing ? planPricing.discounted : null;
            const priceNote = (discounted !== null && plan.sessions > 1)
              ? `${symbol}${Math.round(discounted / plan.sessions)}/- session`
              : null;

            return (
              <div
                key={plan.id}
                className={`pricing-card ${selectedPlan === plan.id ? 'highlighted' : ''} ${plan.color}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.id === 2 && (
                  <div className="popular-badge">MOST POPULAR</div>
                )}

                <div className="card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">
                    {plan.description}
                  </p>
                </div>

                <div className="plan-sessions">
                  <span className="sessions-number">
                    {plan.sessions}
                  </span>
                  <span className="sessions-text">
                    {plan.sessionUnit}
                  </span>
                </div>

                <div className="plan-price-wrap">
                  {plan.pricingKey ? (
                    <>
                      <div className="original-price">
                        {currency === null
                          ? <span>Original: <s>—</s></span>
                          : original !== null
                            ? <span>Original: <s>{symbol}{original}</s></span>
                            : null
                        }
                      </div>

                      <div className="plan-price">
                        {currency === null ? (
                          <span className="price">—</span>
                        ) : discounted !== null ? (
                          <>
                            <span className="currency">{symbol}</span>
                            <span className="price">{discounted}</span>
                          </>
                        ) : (
                          <span className="price">—</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="plan-price">
                      <span className="price">FREE</span>
                    </div>
                  )}
                </div>

                <div className="price-note">
                  <p>
                    {plan.pricingKey
                      ? (priceNote ?? '')
                      : 'No Credit Card Required'
                    }
                  </p>
                </div>

                <button
                  className="cta-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.dispatchEvent(new CustomEvent('open-demo-modal'));
                  }}
                >
                  Get Started
                </button>

                <div className="features-list">
                  <p className="features-title">
                    What's Included:
                  </p>

                  {plan.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="feature-item"
                    >
                      <span className="feature-check">
                        ✓
                      </span>
                      <span className="feature-text">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
