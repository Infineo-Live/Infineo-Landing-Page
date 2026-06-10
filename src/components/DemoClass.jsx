import { useState, useRef, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/DemoClass.css';
import neoMascot from '../assets/neo-version/neo-without-eyes.webp';
import COUNTRIES from '../assets/countries.json';
import { verifyPhone } from '../utils/verifyPhone';
const SHEET_URL='https://script.google.com/macros/s/AKfycbwGpPWzbg7CgOy1Z-0OhlmY-e-Ug7JM-gmuxtnJPhZ_gkevRpWYv3HgQQ0jjfeIpUol8w/exec';
const REWARDS = [
  { icon: '✏️', label: 'Cartoon Art Prints', color: '#5B8DEF' },
  { icon: '🏆', label: 'Certificate', color: '#E7B860' },
  { icon: '🎨', label: 'Colouring Story Sheet', color: '#E05A8A' },
  { icon: '🧩', label: 'Maze Master Worksheet', color: '#9B6FE8' },
  { icon: '🎮', label: 'Mini Games & Activities', color: '#3DC47E' },
];

// Final resting positions for each card (% of stage width/height)
const CARD_POSITIONS = [
  { x: 28, y: 22 },
  { x: 70, y: 10 },
  { x: 24, y: 42 },
  { x: 70, y: 32 },
  { x: 60, y: 55 },
];

const CONFETTI_COLORS = ['#e7b860', '#e05a8a', '#5B8DEF', '#9B6FE8', '#3DC47E', '#ffffff'];

export default function DemoClass() {
  const [formData, setFormData] = useState({
    childName: '', parentName: '', email: '',
    phone: '', childAge: '', language: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({ email: '', phone: '' });
  const [touched, setTouched] = useState({ email: false, phone: false });
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
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
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

    setShaking(true);
    setTimeout(() => setShaking(false), 1000);

    setTimeout(() => {
      setBurst(true);
      spawnConfetti();
    }, 960);

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
      ([entry]) => { if (entry.isIntersecting) handleGiftClick(); },
      { threshold: 0.5 }
    );
    if (stageRef.current) observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, [handleGiftClick]);

  const validateField = useCallback((name, value) => { 
    if (name === 'email') { 
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) 
        ? '' 
        : 'Invalid email — must look like name@example.com'; 
    } 
    if (name === 'phone') { 
      const digits = value.replace(/[\s\-().+]/g, ''); 
      if (digits.length !== selectedCountry.digits) 
        return `${selectedCountry.name} numbers must be ${selectedCountry.digits} digits (e.g. ${selectedCountry.example})`; 
      if (!selectedCountry.startsWith.includes(digits[0])) 
        return `${selectedCountry.name} numbers start with ${selectedCountry.startsWith.join(' or ')}`; 
      return ''; 
    } 
    return ''; 
  }, [selectedCountry]); 
 
  const handleBlur = (e) => { 
    const { name, value } = e.target; 
    setTouched(prev => ({ ...prev, [name]: true })); 
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) })); 
  }; 
  
  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData(prev => ({ ...prev, [name]: value })); 
    if (touched[name]) { 
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) })); 
    } 
  }; 
  
  const handleCountryChange = (e) => { 
    const country = COUNTRIES.find(c => c.code === e.target.value); 
    setSelectedCountry(country); 
    setFormData(prev => ({ ...prev, phone: '' })); 
    setErrors(prev => ({ ...prev, phone: '' })); 
    setTouched(prev => ({ ...prev, phone: false })); 
  };

  const handleCtaScroll = (e) => {
    e.preventDefault();
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, phone: true });
    const emailError = validateField('email', formData.email);
    const phoneError = validateField('phone', formData.phone);
    setErrors({ email: emailError, phone: phoneError });
    if (emailError || phoneError) return; 
    const result = verifyPhone(selectedCountry.dialCode, formData.phone);
    if (!result.valid) {
      setErrors(prev => ({ ...prev, phone: 'This number is invalid for ' + selectedCountry.name + '. Please check and try again.' }));
      return;
    }
    try {
      const fullPhone = `${selectedCountry.dialCode} ${formData.phone}`;

      // Send email notification via EmailJS
      await emailjs.send(
        "service_q11sqw8",
        "template_vipoclo",
        {
          child_name:  formData.childName,
          parent_name: formData.parentName,
          email:       formData.email,
          phone:       fullPhone,
          child_age:   formData.childAge,
          language:    formData.language,
        },
        "xs8aj8X8ITOMt7KSF"
      );

      // Save to Google Sheets simultaneously
      fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type':'text/plain' },

        body: JSON.stringify({
          childName:  formData.childName,
          parentName: formData.parentName,
          email:      formData.email,
          phone:      fullPhone,
          childAge:   formData.childAge,
          language:   formData.language,
        }),
      })
      .then(() => console.log('Sheet save successful'))
      .catch(err => console.error('Sheet save failed:', err));
      // Note: we don't await this — if sheet fails, form still submits fine

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          childName: '', parentName: '', email: '',
          phone: '', childAge: '', language: '',
        });
        setTouched({ email: false, phone: false });
        setErrors({ email: '', phone: '' });
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
          <a href="#book" onClick={handleCtaScroll} className="demo-cta">
            Book Free Trial <span className="cta-arrow">→</span>
          </a>
        </div>

        <div className="reward-right">
          <div className="demo-ambient-right" />
          <div className="gift-stage" ref={stageRef}>
            {!burst && <>
              <div className="gift-ring" />
              <div className="gift-ring" style={{ animationDelay: '0.7s' }} />
            </>}

            <div className={`gift-wrap${shaking ? ' shaking' : ''}${burst ? ' burst' : ''}`}>
              <div className="gift-bow">
                <div className="bow-loop" />
                <div className="bow-loop" />
              </div>
              <div className="gift-lid"><div className="gift-shine" /></div>
              <div className="gift-body" />
            </div>

            {cards.map((card) => (
              <div
                key={card.label}
                className={`reward-card-burst${card.visible ? ' visible' : ''}`}
                style={{ left: `${card.pos.x}%`, top: `${card.pos.y}%` }}
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
            <img src={neoMascot} alt="Neo, the mascot" className="neo-demo-image" />
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
            
            <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email" id="email" name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="your@email.com"
              required
              className={
                touched.email && errors.email  ? 'input-error':
                ''
            }
          />
          {touched.email && errors.email && (
            <span className="form-error" role="alert">{errors.email}</span>
          )}
          
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <div className="phone-input-wrapper">
            <select
              className="country-code-select"
          value={selectedCountry.code}
          onChange={handleCountryChange}
          aria-label="Select country code"
        >
          {COUNTRIES.map(c => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.dialCode}
            </option>
          ))}
              </select>
              <input
                type="tel" id="phone" name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={selectedCountry.example}
                required
                style={
                  touched.phone && errors.phone  ? { borderColor: '#ff6b6b' } :
                  touched.phone && !errors.phone ? { borderColor: '#3DC47E' } :
                    {}
                  }
                />
              </div>
              {touched.phone && errors.phone && (
                <span className="form-error" role="alert">{errors.phone}</span>
              )}
              
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
                Thank you! We'll contact you soon to schedule your demo class.
              </div>
            )}
           <button type="submit" className="submit-btn">
              Book Your Free Demo Class
            </button>
            <p className="form-note">We respect your privacy. No spam, just valuable learning opportunities.</p>
          </form>
        </div>
      </div>
    </section>
  );
}