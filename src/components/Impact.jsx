import { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/Impact.css';
import sadChild from '../assets/distressed-child.png';
import neoMascot from '../assets/website-neo.png';
import happyChild from '../assets/child-after.png';

const CARDS = [
  { id: 1, phase: 'p', side: 'L', top: 12, icon: '📱', title: 'Screen Addiction', text: 'Stuck in endless digital loops.', ac: '#FF6B6B' },
  { id: 2, phase: 'p', side: 'R', top: 22, icon: '🌪️', title: 'Distracted Mind', text: 'Struggling to sit still and focus.', ac: '#FF8C42' },
  { id: 3, phase: 'p', side: 'L', top: 32, icon: '😰', title: 'Stress & Anxiety', text: 'Overwhelmed by modern pressures.', ac: '#C94040' },
  { id: 4, phase: 'i', side: 'R', top: 46, icon: '📖', title: 'Live Storytelling', text: 'Narratives that weave in morals.', ac: '#D4AF37' },
  { id: 5, phase: 'i', side: 'L', top: 56, icon: '🏛️', title: 'Indian Mythology', text: 'Connecting children to ancient roots.', ac: '#E8C84A' },
  { id: 6, phase: 'i', side: 'R', top: 66, icon: '🎭', title: '1-on-1 Sessions', text: 'Personalised care, every session.', ac: '#C9973A' },
  { id: 7, phase: 'r', side: 'L', top: 75, icon: '🎯', title: 'Deep Focus', text: 'Clarity of thought and purpose.', ac: '#4ADE80' },
  { id: 8, phase: 'r', side: 'R', top: 83, icon: '🌟', title: 'Strong Values', text: 'Kind, empathetic, self-confident.', ac: '#34D399' },
  { id: 9, phase: 'r', side: 'L', top: 91, icon: '🚀', title: 'Inspired Daily', text: 'Ready to take on the world.', ac: '#6EE7B7' },
];

const PHASE_AVATARS = { p: sadChild, i: neoMascot, r: happyChild };
const PHASE_BORDERS = { p: '#FF6B6B', i: '#D4AF37', r: '#4ADE80' };
const PHASE_SHADOWS = { p: 'rgba(255,107,107,0.5)', i: 'rgba(212,175,55,0.6)', r: 'rgba(74,222,128,0.6)' };
const PHASE_GLOWS = {
  p: 'radial-gradient(ellipse 55% 55% at 50% 20%, rgba(180,40,40,0.18) 0%, transparent 70%)',
  i: 'radial-gradient(ellipse 55% 55% at 50% 55%, rgba(160,120,10,0.18) 0%, transparent 70%)',
  r: 'radial-gradient(ellipse 55% 55% at 50% 80%, rgba(20,140,70,0.18) 0%, transparent 70%)',
};

export default function Impact() {
  const sceneRef = useRef(null);
  const stickyRef = useRef(null);
  const pathRef = useRef(null);
  const waveTrackRef = useRef(null);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [charPos, setCharPos] = useState({ x: 0, y: 0 });
  const [phase, setPhase] = useState('p');
  const [drawnLen, setDrawnLen] = useState(0);
  const [visibleCards, setVisibleCards] = useState(new Set());

  const getWavePoint = useCallback((prog) => {
    const path = pathRef.current;
    const track = waveTrackRef.current;
    const sticky = stickyRef.current;
    if (!path || !track || !sticky) return { x: 0, y: 0 };

    const totalLen = path.getTotalLength();
    const pt = path.getPointAtLength(prog * totalLen);
    const svgEl = path.ownerSVGElement;
    const svgRect = svgEl.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();

    const scaleX = svgRect.width / 140;
    const scaleY = svgRect.height / 800;

    return {
      x: (svgRect.left - stickyRect.left) + pt.x * scaleX,
      y: (svgRect.top - stickyRect.top) + pt.y * scaleY,
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const scene = sceneRef.current;
        const sticky = stickyRef.current;
        if (!scene || !sticky) return;
        const sceneRect = scene.getBoundingClientRect();
        const total = scene.offsetHeight - window.innerHeight;
        const scrolled = -sceneRect.top;
        const prog = Math.max(0, Math.min(1, scrolled / total));

        setProgress(prog);

        const path = pathRef.current;
        if (path) setDrawnLen(prog * path.getTotalLength());

        const newPhase = prog > 0.66 ? 'r' : prog > 0.33 ? 'i' : 'p';
        setPhase(newPhase);

        setCharPos(getWavePoint(prog));

        const next = new Set();
        CARDS.forEach((c) => {
          if (prog >= (c.top / 100) * 0.85 - 0.04) next.add(c.id);
        });
        setVisibleCards(next);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [getWavePoint]);

  const totalLen = pathRef.current?.getTotalLength() ?? 1000;

  return (
    <section className="pi-scene" ref={sceneRef}>

      {/* Heading lives outside sticky so it scrolls away cleanly */}
      <div className="pi-heading">
        <p className="pi-heading-eyebrow">Every child deserves a guiding light</p>
        <h2 className="pi-heading-title">
          The Journey to <span className="pi-heading-highlight">Wisdom</span>
        </h2>
      </div>

      <div className="pi-sticky" ref={stickyRef}>

        {/* Background glow */}
        <div className="pi-bg-glow" style={{ background: PHASE_GLOWS[phase] }} />

        {/* Wave track */}
        <div className="pi-wave-track" ref={waveTrackRef}>
          <svg className="pi-wave-svg" viewBox="0 0 140 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wg" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#4ADE80" />
              </linearGradient>
            </defs>
            {/* Dashed background path */}
            <path
              ref={pathRef}
              d="M70,0 C90,80 50,150 70,240 C90,330 50,410 70,490 C90,570 50,650 70,800"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
              strokeDasharray="6 5"
            />
            {/* Animated fill path */}
            <path
              d="M70,0 C90,80 50,150 70,240 C90,330 50,410 70,490 C90,570 50,650 70,800"
              fill="none"
              stroke="url(#wg)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${drawnLen} ${totalLen}`}
            />
          </svg>

          {/* Phase labels — sit inside wave-track so they're centred on the path */}
          <span className={`pi-phase-label lbl-p ${progress < 0.33 ? 'vis' : ''}`}>
            The Problem
          </span>
          <span className={`pi-phase-label lbl-i ${progress >= 0.33 && progress < 0.66 ? 'vis' : ''}`}>
            The Infineo Way
          </span>
          <span className={`pi-phase-label lbl-r ${progress >= 0.66 ? 'vis' : ''}`}>
            The Results
          </span>
        </div>

        {/* Character node — absolute inside sticky, coords from getWavePoint */}
        <div
          className={`pi-char-node ${phase === 'i' ? 'float' : ''}`}
          style={{
            left: charPos.x,
            top: charPos.y,
            borderColor: PHASE_BORDERS[phase],
            boxShadow: `0 0 22px ${PHASE_SHADOWS[phase]}`,
          }}
        >
          <img src={PHASE_AVATARS[phase]} alt="Child journey" />
        </div>

        {/* Story cards */}
        {CARDS.map((c) => (
          <div
            key={c.id}
            className={`pi-card side-${c.side} ${visibleCards.has(c.id) ? 'vis' : ''}`}
            style={{ '--ac': c.ac, top: `calc(10vh + ${c.top / 100} * 80vh)` }}
          >
            <div className="pi-card-top">
              <span className="pi-card-icon">{c.icon}</span>
              <span className="pi-card-title">{c.title}</span>
            </div>
            <p className="pi-card-text">{c.text}</p>
            <div className="pi-card-dot" />
          </div>
        ))}

        {/* CTA */}
        <div className={`pi-cta-zone ${progress > 0.88 ? 'vis' : ''}`}>
          <button className="pi-cta-btn">Book a free trial →</button>
          <span className="pi-cta-sub">No commitment · First session is free</span>
        </div>

      </div>
    </section>
  );
}