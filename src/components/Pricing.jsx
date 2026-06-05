import { useState, useRef, useEffect } from 'react';
import '../styles/Pricing.css';

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(2);
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

  const plans = [
    {
      id: 1,
      name: 'Trial Session',
      sessions: '1',
      sessionUnit: 'Free Demo Session',
      price: {
        original: 0,
        inaugural: 0
      },
      priceNote: 'No Credit Card Required',
      description: 'Discover Infineo',
      features: [
        'Infineo Starter Kit'
      ],
      color: 'starter'
    },
    {
      id: 2,
      name: 'Foundation',
      sessions: '10',
      sessionUnit: 'sessions',
      price: {
        original: 5000,
        inaugural: 4500
      },
      priceNote: '₹450 per session',
      description: 'The Infineo Experience',
      features: [
        'Everything from Discover Infineo',
        '10 sessions',
        '1 module',
        'Flexible 1-2x/week'
      ],
      color: 'popular'
    },
    {
      id: 3,
      name: 'Committed Learner',
      sessions: '30',
      sessionUnit: 'sessions',
      price: {
        original: 15000,
        inaugural: 12000
      },
      priceNote: '₹400 per session',
      description: 'Deepest Value',
      features: [
        'Everything from Infineo Experience',
        '30 sessions',
        '3 modules',
        'Class recordings',
        'Monthly progress summary'
      ],
      color: 'premium'
    }
  ];

  return (
    <section className="pricing-section" ref={containerRef}>
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
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`pricing-card ${selectedPlan === plan.id ? 'highlighted' : ''
                } ${plan.color}`}
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
                {plan.price.original > 0 && (
                  <div className="original-price">
                    Original: <s>₹{plan.price.original}</s>
                  </div>
                )}

                <div className="plan-price">
                  {plan.price.inaugural === 0 ? (
                    <span className="price">FREE</span>
                  ) : (
                    <>
                      <span className="currency">₹</span>
                      <span className="price">
                        {plan.price.inaugural}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="price-note">
                <p>{plan.priceNote}</p>
              </div>

              <button
                className="cta-btn"
                onClick={(e) => e.stopPropagation()}
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
          ))}
        </div>

      </div>
    </section>
  );
}