import { useState, useEffect, useRef } from 'react';
import '../styles/Impact.css';

const Impact = () => {
  const sectionRef = useRef(null);
  // phase: 0 = before, 1 = journey, 2 = after, 3 = benefits
  const [phase, setPhase] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0); // 0–1 within current phase

  useEffect(() => {
  const handleScroll = () => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    console.log({ sectionTop, sectionHeight, scrollY, vh }); // ADD THIS
    // Progress: 0 when section top hits viewport top, 1 when section bottom leaves
    const progress = Math.max(0, Math.min(1,
      (scrollY - sectionTop) / (sectionHeight - vh)
    ));
    console.log('progress:', progress, 'phase:', phase); // AND THIS

    if (progress < 0.33) {
      setPhase(0);
      setPhaseProgress(progress / 0.33);
    } else if (progress < 0.66) {
      setPhase(1);
      setPhaseProgress((progress - 0.33) / 0.33);
    } else {
      setPhase(2);
      setPhaseProgress((progress - 0.66) / 0.34);
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  // Visibility helpers
  const beforeVisible  = phase === 0;
  const journeyVisible = phase === 1;
  const afterVisible   = phase === 2;

  // Transition: fade out at end of its phase, fade in at start
  const beforeOpacity  = beforeVisible  ? (phaseProgress > 0.75 ? 1 - (phaseProgress - 0.75) / 0.25 : 1) : 0;
  const journeyOpacity = journeyVisible ? (phaseProgress > 0.75 ? 1 - (phaseProgress - 0.75) / 0.25 : Math.min(1, phaseProgress / 0.2)) : 0;
  const afterOpacity   = afterVisible   ? Math.min(1, phaseProgress / 0.2) : 0;

  const beforeY  = beforeVisible  ? `${phaseProgress > 0.75 ? -(phaseProgress - 0.75) / 0.25 * 40 : 0}px` : '-40px';
  const journeyY = journeyVisible ? `${phaseProgress < 0.2 ? (1 - phaseProgress / 0.2) * 30 : phaseProgress > 0.75 ? -(phaseProgress - 0.75) / 0.25 * 30 : 0}px` : '30px';
  const afterY   = afterVisible   ? `${(1 - Math.min(1, phaseProgress / 0.2)) * 40}px` : '40px';

  return (
    <section className="impact-section" id="impact-section" ref={sectionRef}>
      {/* Sticky viewport */}
      <div className="impact-sticky">

        {/* Progress dots */}
        <div className="impact-progress">
          <div className={`progress-dot ${phase >= 0 ? 'active' : ''}`} />
          <div className="progress-line" style={{ background: phase >= 1 ? '#D4AF37' : 'rgba(255,255,255,0.2)' }} />
          <div className={`progress-dot ${phase >= 1 ? 'active' : ''}`} />
          <div className="progress-line" style={{ background: phase >= 2 ? '#D4AF37' : 'rgba(255,255,255,0.2)' }} />
          <div className={`progress-dot ${phase >= 2 ? 'active' : ''}`} />
        </div>

        {/* ── BEFORE ── */}
        <div
          className="impact-panel before-panel"
          style={{ opacity: beforeOpacity, transform: `translateY(${beforeY})`, pointerEvents: beforeVisible ? 'all' : 'none' }}
        >
          <div className="panel-badge before-badge">BEFORE INFINEO</div>
          <div className="panel-emoji">😟</div>
          <h3 className="panel-title">Your Child Right Now</h3>
          <ul className="impact-list">
            <li className="impact-list-item bad"><span className="list-icon">✗</span>Distracted &amp; Unfocused</li>
            <li className="impact-list-item bad"><span className="list-icon">✗</span>Screen Addiction</li>
            <li className="impact-list-item bad"><span className="list-icon">✗</span>Lack of Values</li>
            <li className="impact-list-item bad"><span className="list-icon">✗</span>Stress &amp; Anxiety</li>
            <li className="impact-list-item bad"><span className="list-icon">✗</span>Lost in Modern Life</li>
          </ul>
          <div className="panel-scroll-hint">Scroll to see the transformation ↓</div>
        </div>

        {/* ── JOURNEY ── */}
        <div
          className="impact-panel journey-panel"
          style={{ opacity: journeyOpacity, transform: `translateY(${journeyY})`, pointerEvents: journeyVisible ? 'all' : 'none' }}
        >
          <div className="journey-sparkles">
            <span>✨</span><span>⭐</span><span>✨</span>
          </div>
          <div className="journey-orb" />
          <h2 className="journey-title">30-Minute Magical Journey</h2>
          <p className="journey-sub">With Infineo's 1-on-1 Storytelling Sessions</p>
          <div className="journey-features">
            <div className="journey-feat"><span>📖</span>Live storytelling</div>
            <div className="journey-feat"><span>🎭</span>Interactive roleplay</div>
            <div className="journey-feat"><span>🏛️</span>Indian mythology</div>
            <div className="journey-feat"><span>💡</span>Life lessons</div>
          </div>
          <div className="journey-arrow">↓ See the result</div>
        </div>

        {/* ── AFTER ── */}
        <div
          className="impact-panel after-panel"
          style={{ opacity: afterOpacity, transform: `translateY(${afterY})`, pointerEvents: afterVisible ? 'all' : 'none' }}
        >
          <div className="panel-badge after-badge">AFTER INFINEO</div>
          <div className="panel-emoji">😊</div>
          <h3 className="panel-title">Your Child Transformed</h3>
          <ul className="impact-list">
            <li className="impact-list-item good"><span className="list-icon">✓</span>Focused &amp; Engaged</li>
            <li className="impact-list-item good"><span className="list-icon">✓</span>Mindful Living</li>
            <li className="impact-list-item good"><span className="list-icon">✓</span>Strong Values</li>
            <li className="impact-list-item good"><span className="list-icon">✓</span>Calm &amp; Peaceful</li>
            <li className="impact-list-item good"><span className="list-icon">✓</span>Inspired &amp; Confident</li>
          </ul>
          <button className="after-cta">Book Free Trial →</button>
        </div>

      </div>
    </section>
  );
};

export default Impact;