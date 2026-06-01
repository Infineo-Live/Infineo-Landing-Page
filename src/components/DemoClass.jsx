import { useState, useRef, useEffect } from 'react';
import '../styles/DemoClass.css';

const REWARDS = [
  { icon: '✏️', label: 'Drawing Sheet',  color: '#5B8DEF', pos: 'top-right'    },
  { icon: '🏆', label: 'Certificate',    color: '#E7B860', pos: 'mid-left'     },
  { icon: '🎨', label: 'Coloring Sheet', color: '#E05A8A', pos: 'mid-right'    },
  { icon: '🧩', label: 'Mind Games',     color: '#9B6FE8', pos: 'bottom-left'  },
  { icon: '🎮', label: 'Maze Master',    color: '#3DC47E', pos: 'bottom-right' },
];

export default function DemoClass() {
  const [formData, setFormData] = useState({
    childName: '', parentName: '', email: '',
    phone: '', childAge: '', module: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ childName: '', parentName: '', email: '', phone: '', childAge: '', module: '' });
    }, 3000);
  };

  return (
    <section className="demo-class-section" ref={containerRef}>
      <div className="demo-ambient" />

      {/* ── PART 1: Trial Completion Reward ── */}
      <div className={`reward-section ${visible ? 'in-view' : ''}`}>
        <div className="reward-left">
          <span className="demo-badge">
            <span className="badge-star">★</span> Trial Completion Reward
          </span>
          <h2 className="demo-headline">
            The Journey<br />Awaits!
          </h2>
          <p className="demo-body">
            Book your 1:1 session today. Once finished, we'll unlock your{' '}
            <span className="demo-highlight">Success Kit</span> containing
            all the digital goodies below!
          </p>
          <a href="#book" className="demo-cta">
            Book Free Trial <span className="cta-arrow">→</span>
          </a>
        </div>

        <div className="reward-right">
          <div className="demo-ambient-right" />
          <div className="gift-card">
            <div className="gift-sparkles"><span>✦</span><span>✦</span><span>✦</span></div>
            <div className="gift-icon">🎁</div>
            <p className="gift-label">YOUR GIFT</p>
            <span className="gift-tag">POST-TRIAL</span>
          </div>
          {REWARDS.map((r, i) => (
            <div
              key={r.label}
              className={`reward-card reward-${r.pos}`}
              style={{ '--reward-color': r.color, animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <span className="reward-icon" style={{ color: r.color }}>{r.icon}</span>
              <div className="reward-info">
                <span className="reward-label">{r.label}</span>
                <span className="reward-locked">LOCKED</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="demo-divider">
        <span className="divider-line" />
        <span className="divider-text">Experience Infineo Firsthand</span>
        <span className="divider-line" />
      </div>

      {/* ── PART 2: Demo Booking Form ── */}
      <div className="demo-container">
        {/* Left side - Info */}
        <div className="demo-info">
          <h2 className="demo-title">Get a FREE 30-Minute Demo Class</h2>
          <p className="demo-subtitle">Tailored to your child's learning journey</p>

          <div className="demo-benefits">
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <div>
                <h4>Personalized Session</h4>
                <p>Tailored to your child's learning style and interests</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">👨‍🏫</span>
              <div>
                <h4>Expert Guidance</h4>
                <p>Meet our experienced instructors and understand our teaching methodology</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🏆</span>
              <div>
                <h4>Module Preview</h4>
                <p>Explore one of our 7 sacred modules and see how your child learns</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">💡</span>
              <div>
                <h4>Personal Recommendation</h4>
                <p>Receive guidance on the best module and schedule for your child</p>
              </div>
            </div>
          </div>

          <div className="demo-highlights">
            <div className="highlight">
              <span className="highlight-number">30</span>
              <span className="highlight-text">Minutes</span>
            </div>
            <div className="highlight">
              <span className="highlight-number">100%</span>
              <span className="highlight-text">FREE</span>
            </div>
            <div className="highlight">
              <span className="highlight-number">1-on-1</span>
              <span className="highlight-text">Personal</span>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="demo-form-container" id="book">
          <form onSubmit={handleSubmit} className="demo-form">
            <h3>Book Your Demo Class</h3>

            <div className="form-group">
              <label htmlFor="childName">Child's Name *</label>
              <input type="text" id="childName" name="childName" value={formData.childName}
                onChange={handleChange} placeholder="Enter child's name" required />
            </div>

            <div className="form-group">
              <label htmlFor="parentName">Parent/Guardian Name *</label>
              <input type="text" id="parentName" name="parentName" value={formData.parentName}
                onChange={handleChange} placeholder="Enter parent/guardian name" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={formData.email}
                  onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" value={formData.phone}
                  onChange={handleChange} placeholder="+91 98765 43210" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="childAge">Child's Age *</label>
                <select id="childAge" name="childAge" value={formData.childAge} onChange={handleChange} required>
                  <option value="">Select age</option>
                  <option value="5-7">5-7 years</option>
                  <option value="8-10">8-10 years</option>
                  <option value="11-13">11-13 years</option>
                  <option value="14">14 years</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="module">Preferred Module *</label>
                <select id="module" name="module" value={formData.module} onChange={handleChange} required>
                  <option value="">Select module</option>
                  <option value="ganesha">Ganesha</option>
                  <option value="hanuman">Hanuman</option>
                  <option value="krishna">Krishna</option>
                  <option value="shiva">Shiva</option>
                  <option value="shakti">Shakti</option>
                  <option value="ramayana">Ramayana</option>
                  <option value="mahabharata">Mahabharata</option>
                </select>
              </div>
            </div>

            {isSubmitted && (
              <div className="success-message">
                ✓ Thank you! We'll contact you soon to schedule your demo class.
              </div>
            )}

            <button type="submit" className="submit-btn">
              Book Your Free Demo Class
            </button>
            <p className="form-note">
              We respect your privacy. No spam, just valuable learning opportunities.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
