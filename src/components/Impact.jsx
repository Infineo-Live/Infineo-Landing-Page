import { useState, useEffect, useRef } from 'react';
import '../styles/Impact.css';
import sadChild from '../assets/distressed-child.png';
import neoMascot from '../assets/website-neo.png';
import happyChild from '../assets/child-after.png';

function orbitalBubbles(items, radiusPx, startAngle = -90) {
  return items.map((item, i) => {
    const angle = ((360 / items.length) * i + startAngle) * (Math.PI / 180);
    return {
      ...item,
      x: Math.cos(angle) * radiusPx,
      y: Math.sin(angle) * radiusPx,
    };
  });
}

const PROBLEMS = orbitalBubbles(
  [
    { label: 'Screen Addiction', icon: '📱', color: '#FF6B6B' },
    { label: 'Distracted Mind', icon: '🌪️', color: '#FF8C42' },
    { label: 'Lack of Values',  icon: '❌', color: '#E05C5C' },
    { label: 'Stress & Anxiety',icon: '😰', color: '#C94040' },
    { label: 'Lost Identity',   icon: '🫥', color: '#FF7070' },
    { label: 'Poor Focus',      icon: '🙈', color: '#E07070' },
  ],
  190
);

const INFINEO = orbitalBubbles(
  [
    { label: 'Live Storytelling', icon: '📖', color: '#D4AF37' },
    { label: '1-on-1 Sessions',   icon: '🎭', color: '#C9973A' },
    { label: 'Indian Mythology',  icon: '🏛️', color: '#E8C84A' },
    { label: 'Life Lessons',      icon: '💡', color: '#D4AF37' },
    { label: 'Expert Guides',     icon: '🧙', color: '#C9973A' },
    { label: '30-Min Magic',      icon: '⏳', color: '#E8C84A' },
  ],
  190
);

const RESULTS = orbitalBubbles(
  [
    { label: 'Deep Focus',       icon: '🎯', color: '#4ADE80' },
    { label: 'Strong Values',    icon: '🌟', color: '#34D399' },
    { label: 'Calm & Peaceful',  icon: '🧘', color: '#6EE7B7' },
    { label: 'Inspired Daily',   icon: '🚀', color: '#4ADE80' },
    { label: 'Kind & Empathetic',icon: '💚', color: '#34D399' },
    { label: 'Self-Confident',   icon: '🦁', color: '#6EE7B7' },
  ],
  190
);

const PHASES = [
  {
    key: 'problem',
    centerImage: sadChild,
    centerLabel: 'Your Child',
    centerBg: 'rgba(255,107,107,0.12)',
    centerBorder: '#FF6B6B',
    title: 'The Problem',
    sub: 'What your child faces today',
    titleColor: '#FF6B6B',
    bubbles: PROBLEMS,
    orbitColor: 'rgba(255,107,107,0.15)',
  },
  {
    key: 'infineo',
    centerImage: neoMascot,
    centerLabel: 'Neo',
    centerBg: 'rgba(212,175,55,0.12)',
    centerBorder: '#D4AF37',
    title: 'The Infineo Way',
    sub: 'One 30-minute session at a time',
    titleColor: '#D4AF37',
    bubbles: INFINEO,
    orbitColor: 'rgba(212,175,55,0.15)',
  },
  {
    key: 'results',
    centerImage: happyChild,
    centerLabel: 'Transformed',
    centerBg: 'rgba(74,222,128,0.12)',
    centerBorder: '#4ADE80',
    title: 'The Results',
    sub: 'A child raised with wisdom & purpose',
    titleColor: '#4ADE80',
    bubbles: RESULTS,
    orbitColor: 'rgba(74,222,128,0.15)',
  },
];

export default function Impact() {
  const sectionRef = useRef(null);
  const [phase, setPhase]     = useState(0);
  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY       = window.scrollY;
      const vh            = window.innerHeight;

      const raw   = (scrollY - sectionTop) / (sectionHeight - vh);
      const total = Math.max(0, Math.min(1, raw));

      setEntered(total > 0);

      const phaseCount = PHASES.length;
      const sliceSize  = 1 / phaseCount;
      const phaseIdx   = Math.min(phaseCount - 1, Math.floor(total / sliceSize));
      const phaseRaw   = (total - phaseIdx * sliceSize) / sliceSize;

      setPhase(phaseIdx);
      setProgress(Math.max(0, Math.min(1, phaseRaw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = PHASES[phase];

  const panelOpacity = entered
    ? progress < 0.08
      ? progress / 0.08
      : progress > 0.88
        ? 1 - (progress - 0.88) / 0.12
        : 1
    : 1;

  return (
    <section className="impact-section" id="impact-section" ref={sectionRef}>
      <div className="impact-sticky">
        <div
          className="impact-atmosphere"
          style={{
            background: `radial-gradient(circle 50% at 50% 50%, ${current.orbitColor}, transparent 70%)`,
          }}
        />

        {/* Phase navigation dots */}
        <div className="impact-progress">
          {PHASES.map((p, i) => (
            <div key={p.key} className="progress-track">
              <div
                className={`progress-dot ${phase === i ? 'active' : phase > i ? 'done' : ''}`}
                style={
                  phase === i
                    ? { borderColor: current.titleColor, background: current.titleColor }
                    : {}
                }
              />
              {i < PHASES.length - 1 && (
                <div
                  className="progress-line"
                  style={{
                    background: phase > i ? current.titleColor : 'rgba(255,255,255,0.1)',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="impact-header" style={{ opacity: panelOpacity }}>
          <h2 className="impact-title" style={{ color: current.titleColor }}>
            {current.title}
          </h2>
          <p className="impact-sub">{current.sub}</p>
        </div>

        {/* Orbital stage */}
        <div className="orbital-stage" style={{ opacity: panelOpacity }}>
          <div
            className="orbit-ring"
            style={{ borderColor: current.orbitColor }}
          />

          <div
            className="orbit-center"
            style={{
              background:  current.centerBg,
              borderColor: current.centerBorder,
              boxShadow: `0 0 50px ${current.centerBorder}25, inset 0 0 20px ${current.centerBorder}15`,
            }}
          >
            <img
              src={current.centerImage}
              alt={current.centerLabel}
              className="orbit-center-img"
            />
            <span
              className="orbit-center-label"
              style={{ color: current.centerBorder }}
            >
              {current.centerLabel}
            </span>
          </div>

          {current.bubbles.map((bubble, i) => (
            <div
              key={bubble.label}
              className="orbit-bubble"
              style={{
                /* Pass coordinates as CSS custom properties so the
                   float keyframe can compose on top cleanly */
                '--bx': `${bubble.x}px`,
                '--by': `${bubble.y}px`,
                transform: `translate(calc(-50% + ${bubble.x}px), calc(-50% + ${bubble.y}px))`,
                animationDelay: `${i * 0.06}s`,
              }}
            >
              <div
                className="bubble-inner"
                style={{
                  background:  `linear-gradient(135deg, rgba(20,32,54,0.75) 0%, rgba(10,18,32,0.90) 100%)`,
                  borderColor: `${bubble.color}50`,
                  boxShadow:   `0 4px 24px rgba(0,0,0,0.35), 0 0 12px ${bubble.color}18`,
                }}
              >
                <span
                  className="bubble-icon"
                  style={{ textShadow: `0 0 10px ${bubble.color}50` }}
                >
                  {bubble.icon}
                </span>
                <span className="bubble-label">{bubble.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA zone — fixed height so layout never jolts */}
        <div className="impact-action-zone">
          {phase === 2 && (
            <button
              className="impact-cta"
              style={{ opacity: Math.min(1, progress * 4) }}
            >
              Book Free Trial →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}