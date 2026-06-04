import { useState, useRef, useEffect, useCallback } from 'react';
import '../styles/DemoClass.css';
import neoMascot from '../assets/neo-version/neo-without-eyes.png';

const REWARDS = [
  { icon: '✏️', label: 'Drawing Sheet', color: '#5B8DEF' },
  { icon: '🏆', label: 'Certificate', color: '#E7B860' },
  { icon: '🎨', label: 'Coloring Sheet', color: '#E05A8A' },
  { icon: '🧩', label: 'Mind Games', color: '#9B6FE8' },
  { icon: '🎮', label: 'Maze Master', color: '#3DC47E' },
];

const ORBIT_RADIUS = 240; // px from center gift card
const SPARKLE_CHARS = ['✦', '✧', '★', '✶', '✸'];

export default function DemoClass() {
  const [formData, setFormData] = useState({
    childName: '', parentName: '', email: '',
    phone: '', childAge: '', module: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [angle, setAngle] = useState(0);

  const containerRef = useRef(null);
  const mascotRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const rafRef = useRef(null);
  const angleRef = useRef(0);
  const sparkleIdRef = useRef(0);

  // ── IntersectionObserver ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Orbit animation loop ──
  useEffect(() => {
    let last = performance.now();
    const tick = (now) => {
      const delta = now - last;
      last = now;
      angleRef.current = (angleRef.current + delta * 0.004) % 360;
      setAngle(angleRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── Scroll animation for mascot ──
  useEffect(() => {
    const onScroll = () => {
      if (!mascotRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      mascotRef.current.style.transform = `translateY(${-20 + progress * 20}px)`;
      mascotRef.current.style.opacity = Math.min(1, 0.3 + progress * 0.7);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Eye Tracking ──
  const trackPupil = useCallback((eyeEl, pupilEl, clientX, clientY) => {
    if (!eyeEl || !pupilEl) return;
    const socketRect = eyeEl.getBoundingClientRect();
    const socketCX = socketRect.left + socketRect.width / 2;
    const socketCY = socketRect.top + socketRect.height / 2;
    const dx = clientX - socketCX;
    const dy = clientY - socketCY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.hypot(dx, dy);
    const socketRadius = socketRect.width / 2;
    const pupilRadius = (pupilEl.offsetWidth || 15) / 2;
    const maxTravel = Math.max(0, socketRadius - pupilRadius - 2);
    const travel = Math.min(dist / 14, maxTravel);
    const moveX = Math.cos(angle) * travel;
    const moveY = Math.sin(angle) * travel;
    const proximity = Math.max(0, Math.min(1, dist / 320));
    const scale = 1.18 - proximity * 0.18;
    pupilEl.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) scale(${scale})`;
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      trackPupil(leftEyeRef.current, leftPupilRef.current, cx, cy);
      trackPupil(rightEyeRef.current, rightPupilRef.current, cx, cy);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, [trackPupil]);

  // ── Sparkle burst on card hover ──
  const handleCardHover = (e, index) => {
    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: ++sparkleIdRef.current,
      cardIndex: index,
      // spread in a circle around the card center (0, 0)
      x: Math.cos((i / 8) * Math.PI * 2) * (50 + Math.random() * 30),
      y: Math.sin((i / 8) * Math.PI * 2) * (30 + Math.random() * 20),
      char: SPARKLE_CHARS[i % SPARKLE_CHARS.length],
      scale: 0.6 + Math.random() * 0.8,
    }));

    setSparkles(prev => [...prev, ...newSparkles]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => !newSparkles.find(n => n.id === s.id)));
    }, 720);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ childName: '', parentName: '', email: '', phone: '', childAge: '', module: '' });
    }, 3000);
  };

  return (
    <section className="demo-class-section" ref={containerRef}>
      <div className="demo-ambient" />

      <div className="reward-section">
        <div className="reward-left">
          <span className="demo-badge">
            <span className="badge-star">★</span> Trial Completion Reward
          </span>
          <h2 className="demo-headline">The Journey<br />Awaits!</h2>
          <p className="demo-body">
            Book your 1:1 session today. Once finished, we'll unlock your{' '}
            <span className="demo-highlight">Success Kit</span> containing all the digital goodies below!
          </p>
          <a href="#book" className="demo-cta">
            Book Free Trial <span className="cta-arrow">→</span>
          </a>
        </div>

        <div className="reward-right">
          <div className="demo-ambient-right" />

          {/* Central gift card */}
          <div className="gift-card">
            <div className="gift-sparkles"><span>✦</span><span>✦</span><span>✦</span></div>
            <div className="gift-icon">🎁</div>
            <p className="gift-label">YOUR GIFT</p>
            <span className="gift-tag">POST-TRIAL</span>
          </div>

          {/* Orbiting reward cards — single wrapper anchored to center */}
          <div className="reward-orbit">
            {REWARDS.map((r, i) => {
              const deg = angle + (i / REWARDS.length) * 360;
              const rad = (deg * Math.PI) / 180;
              const x = Math.cos(rad) * ORBIT_RADIUS;
              const y = Math.sin(rad) * ORBIT_RADIUS * 0.55; // flatten to ellipse
              return (
                <div
                  key={r.label}
                  className="reward-card"
                  style={{
                    left: x,
                    top: y,
                    animationDelay: `${0.3 + i * 0.1}s`,
                  }}
                  onMouseEnter={(e) => handleCardHover(e, i)}
                >
                  <span className="reward-icon" style={{ color: r.color }}>{r.icon}</span>
                  <div className="reward-info">
                    <span className="reward-label">{r.label}</span>
                    <span className="reward-locked">LOCKED</span>
                  </div>

                  {/* Sparkles nested inside the card, absolute positioned */}
                  {sparkles
                    .filter(s => s.cardIndex === i)
                    .map(s => (
                      <span
                        key={s.id}
                        className="sparkle-particle"
                        style={{
                          left: `calc(50% + ${s.x}px)`,
                          top: `calc(50% + ${s.y}px)`,
                          transform: `translate(-50%, -50%) scale(${s.scale})`,
                        }}
                      >
                        {s.char}
                      </span>
                    ))
                  }
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── rest of JSX unchanged from here ── */}
      <div className="demo-divider">
        <span className="divider-line" />
        <span className="divider-text">Experience Infineo Firsthand</span>
        <span className="divider-line" />
      </div>

      <div className="demo-container">
        <div className="demo-info">
          <h2 className="demo-title">Book a FREE 30-Minute Demo Class</h2>
          <p className="demo-subtitle">TAILORED TO YOUR CHILD'S LEARNING JOURNEY</p>

          <div className="neo-mascot-wrapper" ref={mascotRef}>
            <div className="neo-eyes-underlay" aria-hidden="true">
              <div className="neo-eye neo-left-eye" ref={leftEyeRef}>
                <div className="neo-pupil" ref={leftPupilRef} />
              </div>
              <div className="neo-eye neo-right-eye" ref={rightEyeRef}>
                <div className="neo-pupil" ref={rightPupilRef} />
              </div>
            </div>
            <img src={neoMascot} alt="Neo, the Infineo mascot" className="neo-demo-image" />
            <div className="neo-blush neo-left-blush" aria-hidden="true" />
            <div className="neo-blush neo-right-blush" aria-hidden="true" />
          </div>

          <div className="demo-highlights">
            <div className="highlight">
              <span className="highlight-number">30</span>
              <span className="highlight-text">Minutes</span>
            </div>
            <div className="highlight">
              <span className="highlight-number">1-on-1</span>
              <span className="highlight-text">Personal</span>
            </div>
          </div>
        </div>

        <div className="demo-form-container" id="book">
          <form onSubmit={handleSubmit} className="demo-form">
            <h3>Book Your Demo Class</h3>
            <div className="form-group">
              <label htmlFor="childName">Child's Name *</label>
              <input type="text" id="childName" name="childName" value={formData.childName} onChange={handleChange} placeholder="Enter child's name" required />
            </div>
            <div className="form-group">
              <label htmlFor="parentName">Parent/Guardian Name *</label>
              <input type="text" id="parentName" name="parentName" value={formData.parentName} onChange={handleChange} placeholder="Enter parent/guardian name" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
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
            <button type="submit" className="submit-btn">Book Your Free Demo Class</button>
            <p className="form-note">We respect your privacy. No spam, just valuable learning opportunities.</p>
          </form>
        </div>
      </div>
    </section>
  );
}