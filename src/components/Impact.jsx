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

const PROBLEMS = orbitalBubbles([
  { label: 'Screen Addiction', icon: '📱', color: '#FF6B6B' },
  { label: 'Distracted Mind', icon: '🌪️', color: '#FF8C42' },
  { label: 'Lack of Values', icon: '❌', color: '#E05C5C' },
  { label: 'Stress & Anxiety', icon: '😰', color: '#C94040' },
  { label: 'Lost Identity', icon: '🫥', color: '#FF7070' },
  { label: 'Poor Focus', icon: '🙈', color: '#E07070' },
], 190);

const INFINEO = orbitalBubbles([
  { label: 'Live Storytelling', icon: '📖', color: '#D4AF37' },
  { label: '1-on-1 Sessions', icon: '🎭', color: '#C9973A' },
  { label: 'Indian Mythology', icon: '🏛️', color: '#E8C84A' },
  { label: 'Life Lessons', icon: '💡', color: '#D4AF37' },
  { label: 'Expert Guides', icon: '🧙', color: '#C9973A' },
  { label: '30-Min Magic', icon: '⏳', color: '#E8C84A' },
], 190);

const RESULTS = orbitalBubbles([
  { label: 'Deep Focus', icon: '🎯', color: '#4ADE80' },
  { label: 'Strong Values', icon: '🌟', color: '#34D399' },
  { label: 'Calm & Peaceful', icon: '🧘', color: '#6EE7B7' },
  { label: 'Inspired Daily', icon: '🚀', color: '#4ADE80' },
  { label: 'Kind & Empathetic', icon: '💚', color: '#34D399' },
  { label: 'Self-Confident', icon: '🦁', color: '#6EE7B7' },
], 190);

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
    centerLabel: 'Neo (Guru)',
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
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0); 
  const [overallProgress, setOverallProgress] = useState(0); 
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      const raw = (scrollY - sectionTop) / (sectionHeight - vh);
      const total = Math.max(0, Math.min(1, raw));

      setOverallProgress(total);

      const phaseCount = PHASES.length;
      const sliceSize = 1 / phaseCount;
      const phaseIdx = Math.min(phaseCount - 1, Math.floor(total / sliceSize));
      const phaseRaw = (total - phaseIdx * sliceSize) / sliceSize;

      setPhase((prev) => {
        if (prev !== phaseIdx) {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 350);
        }
        return phaseIdx;
      });

      setProgress(Math.max(0, Math.min(1, phaseRaw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const current = PHASES[phase];
  const panelOpacity = progress < 0.08 ? progress / 0.08 : progress > 0.88 ? 1 - (progress - 0.88) / 0.12 : 1;

  // SVG circular measurements (Radius = 190, Diameter = 380)
  const radius = 210;
  const circumference = 2 * Math.PI * radius; // ~1193.8
  // Compute how much of the circular arc path needs to light up based on scrolling progress
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <section className="impact-section" ref={sectionRef} data-phase={current.key}>
      <div className="impact-sticky">
        <div
          className="impact-atmosphere"
          style={{ background: `radial-gradient(circle 50% at 50% 50%, ${current.orbitColor}, transparent 70%)` }}
        />

        {/* Global Progress Connecting Track */}
        <div className="impact-progress">
          {PHASES.map((p, i) => (
            <div key={p.key} className="progress-track">
              <div
                className={`progress-dot ${phase === i ? 'active' : phase > i ? 'done' : ''}`}
                style={phase === i ? { borderColor: current.titleColor, background: current.titleColor } : {}}
              />
              {i < PHASES.length - 1 && (
                <div
                  className="progress-line"
                  style={{ background: phase > i ? current.titleColor : 'rgba(255,255,255,0.1)' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Header content section */}
        <div className={`impact-header ${isTransitioning ? 'swapping' : ''}`} style={{ opacity: panelOpacity }}>
          <h2 className="impact-title" style={{ color: current.titleColor }}>
            {current.title}
          </h2>
          <p className="impact-sub">{current.sub}</p>
        </div>

        {/* Structural Canvas Block */}
        <div className={`orbital-stage ${isTransitioning ? 'swapping' : ''}`} style={{ opacity: panelOpacity }}>

          {/* SVG Animated Path Layer */}
          <svg className="orbit-svg-canvas" viewBox="0 0 500 500">
            {/* Background Base Ring */}
            <circle
              cx="250"
              cy="250"
              r={radius}
              className="orbit-svg-base-ring"
              style={{ stroke: current.orbitColor }}
            />
            {/* Active Drawing Path */}
            <circle
              cx="250"
              cy="250"
              r={radius}
              className="orbit-svg-active-path"
              style={{
                stroke: current.titleColor,
                strokeDasharray: circumference,
                strokeDashoffset: strokeDashoffset,
              }}
            />
          </svg>

          {/* Central Avatar */}
          <div
            className="orbit-center"
            style={{
              background: current.centerBg,
              borderColor: current.centerBorder,
              boxShadow: `0 0 50px ${current.centerBorder}25, inset 0 0 20px ${current.centerBorder}15`,
            }}
          >
            <img src={current.centerImage} alt={current.centerLabel} className="orbit-center-img" />
            <span className="orbit-center-label" style={{ color: current.centerBorder }}>
              {current.centerLabel}
            </span>
          </div>

          {/* Context Bubble Map */}
          {current.bubbles.map((bubble, i) => {
            const fractionStep = 1 / current.bubbles.length;
            const isBubbleActive = progress >= i * fractionStep;

            return (
              <div
                key={bubble.label}
                className={`orbit-bubble ${isBubbleActive ? 'revealed' : ''}`}
                style={{
                  /* This combines the structural -50% centering shift with your 
                    calculated X/Y variables directly inside a single property */
                  transform: `translate(calc(-50% + ${bubble.x}px), calc(-50% + ${bubble.y}px))`,}}>
                <div
                  className="bubble-inner"
                  style={{
                    background: `linear-gradient(135deg, rgba(20,32,54,0.8) 0%, rgba(10,18,32,0.95) 100%)`,
                    borderColor: isBubbleActive ? bubble.color : 'rgba(255,255,255,0.1)',
                    boxShadow: isBubbleActive
                      ? `0 4px 24px rgba(0,0,0,0.4), 0 0 12px ${bubble.color}25`
                      : `0 4px 12px rgba(0,0,0,0.2)`,
                  }}
                >
                  <span className="bubble-icon" style={{ textShadow: isBubbleActive ? `0 0 10px ${bubble.color}50` : 'none' }}>
                    {bubble.icon}
                  </span>
                  <span className="bubble-label">{bubble.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="impact-action-zone">
          <button className={`impact-cta ${phase === 2 ? 'visible' : ''}`}>
            Book Free Trial →
          </button>
        </div>
      </div>
    </section>
  );
}