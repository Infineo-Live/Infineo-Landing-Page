import { useState, useRef, useEffect } from 'react';
import '../styles/Pricing.css';

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly');
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
      name: 'Starter',
      icon: '🌱',
      sessions: '4',
      sessionUnit: 'sessions/month',
      price: { monthly: 1999, quarterly: 5499 },
      description: 'Perfect for trying out Infineo',
      features: [
        '4 classes per month',
        '30-minute sessions',
        'One module',
        'Progress tracking',
        'Email support'
      ],
      color: 'starter'
    },
    {
      id: 2,
      name: 'Popular',
      icon: '⭐',
      sessions: '8',
      sessionUnit: 'sessions/month',
      price: { monthly: 3999, quarterly: 10999 },
      description: 'Most loved by our families',
      features: [
        '8 classes per month',
        '30-minute sessions',
        'Multiple modules',
        'Progress tracking',
        'Priority email support',
        'Monthly progress report',
        'Parent webinar access'
      ],
      highlighted: true,
      color: 'popular'
    },
    {
      id: 3,
      name: 'Premium',
      icon: '👑',
      sessions: '12',
      sessionUnit: 'sessions/month',
      price: { monthly: 5999, quarterly: 16499 },
      description: 'Maximum learning & engagement',
      features: [
        '12 classes per month',
        '30-minute sessions',
        'All 7 modules',
        'Detailed progress tracking',
        'Priority phone support',
        'Weekly progress report',
        'Exclusive parent webinars',
        'Custom learning plan',
        'Festival celebrations'
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
          <p className="pricing-subtitle">Choose what works best for your family</p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <button
              className={`toggle-btn ${billingPeriod === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button
              className={`toggle-btn ${billingPeriod === 'quarterly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('quarterly')}
            >
              Quarterly <span className="save-badge">Save 8%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.highlighted ? 'highlighted' : ''} ${plan.color}`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {plan.highlighted && <div className="popular-badge">POPULAR</div>}

              <div className="card-header">
                <span className="plan-icon">{plan.icon}</span>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
              </div>

              <div className="plan-sessions">
                <span className="sessions-number">{plan.sessions}</span>
                <span className="sessions-text">{plan.sessionUnit}</span>
              </div>

              <div className="plan-price">
                <span className="currency">₹</span>
                <span className="price">{plan.price[billingPeriod]}</span>
                <span className="period">{billingPeriod === 'monthly' ? '/month' : '/quarter'}</span>
              </div>

              <div className="price-note">
                {billingPeriod === 'monthly' ? (
                  <p>~₹{Math.round(plan.price.monthly / parseInt(plan.sessions))} per session</p>
                ) : (
                  <p>~₹{Math.round(plan.price.quarterly / (parseInt(plan.sessions) * 3))} per session</p>
                )}
              </div>

              <button className="cta-btn">Get Started</button>

              <div className="features-list">
                <p className="features-title">What's Included:</p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="feature-item">
                    <span className="feature-check">✓</span>
                    <span className="feature-text">{feature}</span>
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
