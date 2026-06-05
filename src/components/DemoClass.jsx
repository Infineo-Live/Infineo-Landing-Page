import { useState, useRef, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/DemoClass.css';
import neoMascot from '../assets/neo-version/neo-without-eyes.webp';

const REWARDS = [
  { icon: '✏️', label: 'Cartoon Art Prints', color: '#5B8DEF' },
  { icon: '🏆', label: 'Certificate', color: '#E7B860' },
  { icon: '🎨', label: 'Colouring Story Sheet', color: '#E05A8A' },
  { icon: '🧩', label: 'Maze Master Worksheet', color: '#9B6FE8' },
  { icon: '🎮', label: 'Mini Games & Activities', color: '#3DC47E' },
];

// Final resting positions for each card (% of stage width/height)
const CARD_POSITIONS = [
  { x: 10, y: 22 },
  { x: 68, y: 10 },
  { x: 6, y: 62 },
  { x: 62, y: 60 },
  { x: 36, y: 78 },
];

const CONFETTI_COLORS = ['#e7b860', '#e05a8a', '#5B8DEF', '#9B6FE8', '#3DC47E', '#ffffff'];

export default function DemoClass() {
  const [formData, setFormData] = useState({
    childName: '', parentName: '', email: '',
    phone: '', childAge: '', language: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [burst, setBurst] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [cards, setCards] = useState([]);
  const hasBurst = useRef(false);

  const containerRef = useRef(null);
  const mascotRef = useRef(null);
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);
  const leftPupilRef = useRef(null);
  const rightPupilRef = useRef(null);
  const stageRef = useRef(null);

  // ── IntersectionObserver ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('in-view'); },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  // ── Open from navbar / pricing ──
  useEffect(() => {
    const handler = (e) => {
      // Scroll the form into view
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Pre-fill module if a plan was passed
      if (e.detail?.module) {
        setFormData(prev => ({ ...prev, module: e.detail.module }));
      }
    };
    window.addEventListener('open-demo-modal', handler);
    return () => window.removeEventListener('open-demo-modal', handler);
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

  // ── Confetti imperative spawn ──
  const spawnConfetti = useCallback(() => {
    if (!stageRef.current) return;
    const stage = stageRef.current;
    const cx = stage.offsetWidth / 2;
    const cy = stage.offsetHeight * 0.65;

    for (let i = 0; i < 48; i++) {
      const el = document.createElement('div');
      el.className = 'gift-confetti';
      el.style.cssText = `
        position:absolute; width:7px; height:7px; border-radius:${Math.random() > 0.4 ? '50%' : '1px'};
        background:${CONFETTI_COLORS[i % CONFETTI_COLORS.length]};
        left:${cx}px; top:${cy}px; opacity:0; pointer-events:none; z-index:20;
      `;
      stage.appendChild(el);

      const angle = (Math.random() * 360) * Math.PI / 180;
      const speed = 80 + Math.random() * 190;
      const tx = Math.cos(angle) * speed;
      const ty = Math.sin(angle) * speed - 70;
      const rot = Math.random() * 540 - 270;
      const delay = Math.random() * 150;
      const dur = 600 + Math.random() * 400;

      setTimeout(() => {
        el.style.transition = `transform ${dur}ms cubic-bezier(0.2,1,0.3,1), opacity ${dur * 0.6}ms ease ${dur * 0.4}ms`;
        el.style.opacity = '1';
        el.style.transform = `translate(${tx}px,${ty}px) rotate(${rot}deg)`;
        setTimeout(() => { el.style.opacity = '0'; }, dur * 0.55);
        setTimeout(() => el.remove(), dur + 100);
      }, delay);
    }
  }, []);

  // ── Gift burst handler ──
  const handleGiftClick = useCallback(() => {
    if (hasBurst.current) return;
    hasBurst.current = true;

    // 1. Shake
    setShaking(true);
    setTimeout(() => setShaking(false), 1000);

    // 2. Burst + confetti
    setTimeout(() => {
      setBurst(true);
      spawnConfetti();
    }, 960);

    // 3. Reveal cards with stagger
    setTimeout(() => {
      setCards(REWARDS.map((r, i) => ({ ...r, pos: CARD_POSITIONS[i], visible: false })));
      REWARDS.forEach((_, i) => {
        setTimeout(() => {
          setCards(prev =>
            prev.map((c, idx) => idx === i ? { ...c, visible: true } : c)
          );
        }, i * 220);
      });
    }, 1120);
  }, [spawnConfetti]);

  // ── Scroll Event trigger for Gift Burst ──
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleGiftClick();
        }
      },
      { threshold: 0.5 } // Triggers when 50% of the stage is visible
    );
    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [handleGiftClick]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send(
        "service_q11sqw8",
        "template_vipoclo",
        {child_name: formData.childName,
        parent_name: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        child_age: formData.childAge,
        language: formData.module,
      },
        "xs8aj8X8ITOMt7KSF"
      );
      setIsSubmitted(true); 
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          childName: '',
          parentName: '',
          email: '',
          phone: '',
          childAge: '',
          module: '',
        });
      }, 3000);

    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Failed to send form");
    }
  };


  

  

  return (
    <section className="demo-class-section" ref={containerRef}>
      <div className="demo-ambient" />

      {/* ── STARTER KIT / REWARD SECTION ── */}
      <div className="reward-section">
        <div className="reward-left">
          <span className="demo-badge">
            <span className="badge-star">★</span> Trial Completion Reward
          </span>
          <h2 className="demo-headline">
            The Journey Awaits — Starting With One Free Demo Class
          </h2>
          <p className="demo-body">
            Unlock your Infineo <span className="demo-highlight">Starter Kit</span> after the session.
          </p>
          <a href="#book" className="demo-cta">
            Book Free Trial <span className="cta-arrow">→</span>
          </a>
        </div>

        <div className="reward-right">
          <div className="demo-ambient-right" />

          {/* Stage */}
          <div className="gift-stage" ref={stageRef}>

            {/* Pulse rings */}
            {!burst && <>
              <div className="gift-ring" />
              <div className="gift-ring" style={{ animationDelay: '0.7s' }} />
            </>}

            {/* Gift box */}
            <div
              className={`gift-wrap${shaking ? ' shaking' : ''}${burst ? ' burst' : ''}`}
            >
              <div className="gift-bow">
                <div className="bow-loop" />
                <div className="bow-loop" />
              </div>
              <div className="gift-lid">
                <div className="gift-shine" />
              </div>
              <div className="gift-body" />
            </div>

            {/* Reward cards */}
            {cards.map((card, i) => (
              <div
                key={card.label}
                className={`reward-card-burst${card.visible ? ' visible' : ''}`}
                style={{
                  left: `${card.pos.x}%`,
                  top: `${card.pos.y}%`,
                }}
              >
                <span className="reward-icon-burst">{card.icon}</span>
                <div className="reward-info-burst">
                  <span className="reward-label-burst">{card.label}</span>
                  <span className="reward-unlocked">
                    <span className="reward-dot" style={{ background: card.color }} />
                    UNLOCKED
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING FORM SECTION ── */}
      <div className="demo-container">
        <div className="demo-info">
          <h2 className="demo-title">Book a Free 30-Minute Demo Class</h2>
          <p className="demo-subtitle">
            Tailored to your child's age and interests — experience the Infineo difference firsthand.
          </p>

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
        </div>

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
                <label htmlFor="language">Preferred Language *</label>
                <select id="language" name="language" value={formData.language} onChange={handleChange} required>
                  <option value="">Select language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
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