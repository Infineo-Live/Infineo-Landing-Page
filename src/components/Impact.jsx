import { useRef, useEffect, useState } from 'react';
import '../styles/Impact.css';

import imgScreenAddiction from '../assets/impact/screen-addiction.webp';
import imgStoryTelling from '../assets/impact/storytelling.webp';
import imgTransformed from '../assets/impact/transformed.webp';
import imgPeerPressure from '../assets/impact/peer-pressure.webp';
import imgAnxiety from '../assets/impact/anxiety.webp';
import imgEmpathy from '../assets/impact/empathy.webp';

import glassSfx from '../assets/audio/glass-break.mp3';

// Import mascot frames
import neo1 from '../assets/neo-version/neo.webp'; // Eyes Open
import neo2 from '../assets/neo-version/blink/neo2.webp'; // Half-Closed
import neo3 from '../assets/neo-version/blink/neo3.webp'; // Fully Closed
import neo4 from '../assets/neo-version/blink/neo4.webp'; // Half-Closed

const JOURNEYS = [
  {
    id: 'focus',
    problem: { label: 'Screen Addiction', caption: 'Endless scrolling destroys focus', image: imgScreenAddiction, color: '#ff6b6b' },
    result: { label: 'Deep Focus', caption: 'Sustained attention & inner calm', image: imgStoryTelling, color: '#4ade80' },
  },
  {
    id: 'values',
    problem: { label: 'Peer Pressure', caption: 'Isolation & lost moral compass', image: imgPeerPressure, color: '#ff9f43' },
    result: { label: 'Empathy & Kindness', caption: 'Confident cultural identity & values', image: imgEmpathy, color: '#38bdf8' },
  },
  {
    id: 'resilience',
    problem: { label: 'Anxiety & Fear', caption: 'Academic pressure & fear of failure', image: imgAnxiety, color: '#a78bfa' },
    result: { label: 'Inner Strength', caption: 'Courage, resilience & a fear-free mindset', image: imgTransformed, color: '#f59e0b' },
  },
];

/* Unique shard polygon sets per card */
const SHARD_SETS = [
  [
    "0,0 45,0 38,60 0,55", "45,0 100,0 100,45 52,70", "0,55 38,60 30,100 0,100",
    "38,60 52,70 60,100 30,100", "52,70 100,45 100,100 60,100", "100,0 100,45 52,70 45,0",
  ],
  [
    "0,0 50,0 42,55 0,48", "50,0 100,0 100,50 58,62", "0,48 42,55 35,100 0,100",
    "42,55 58,62 65,100 35,100", "58,62 100,50 100,100 65,100", "0,0 42,55 0,48",
  ],
  [
    "0,0 40,0 35,50 0,60", "40,0 100,0 100,40 55,65", "0,60 35,50 40,100 0,100",
    "35,50 55,65 62,100 40,100", "55,65 100,40 100,100 62,100", "40,0 100,0 55,65 35,50",
  ],
];

/* Shard fly-out directions */
const SHARD_TRANSFORMS = [
  "translate(-18px,-22px) rotate(-15deg)", "translate(20px,-18px) rotate(12deg)",
  "translate(-22px,20px) rotate(-10deg)", "translate(5px,25px) rotate(8deg)",
  "translate(22px,18px) rotate(14deg)", "translate(15px,-25px) rotate(-12deg)",
];

/* ── Glass break sound — unlocked on first user gesture ── */
let audioUnlocked = false;
const glassAudio = typeof Audio !== 'undefined' ? new Audio(glassSfx) : null;
if (glassAudio) {
  glassAudio.preload = 'auto';
  glassAudio.volume = 0.8;
}

function unlockAudio() {
  if (audioUnlocked || !glassAudio) return;
  // A silent play+pause driven by a user gesture satisfies autoplay policy
  glassAudio.volume = 0;
  glassAudio.play().then(() => {
    glassAudio.pause();
    glassAudio.currentTime = 0;
    glassAudio.volume = 0.8;
    audioUnlocked = true;
  }).catch(() => { });
}

function playGlassBreak() {
  if (!glassAudio) return;
  try {
    // Clone so overlapping plays don't cut each other off
    const clone = glassAudio.cloneNode();
    clone.volume = 0.8;
    clone.play().catch(() => { });
  } catch (e) {
    // Silently fail
  }
}

function GlassBreakCard({ journey, index }) {
  const ref = useRef(null);
  const [phase, setPhase] = useState('hidden'); // hidden → enter → breaking → broken → reveal

  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) {
      setPhase('hidden');
      return;
    }

    let active = true;
    let timers = [];

    const runSequence = () => {
      if (!active) return;
      setPhase('enter');

      const t1 = setTimeout(() => {
        if (!active) return;
        setPhase('breaking');
        playGlassBreak();
      }, 1200);
      timers.push(t1);

      const t2 = setTimeout(() => {
        if (!active) return;
        setPhase('broken');
      }, 1900);
      timers.push(t2);

      const t3 = setTimeout(() => {
        if (!active) return;
        setPhase('reveal');
      }, 2400);
      timers.push(t3);
    };

    const staggerTimeout = setTimeout(() => {
      runSequence();
    }, index * 200);
    timers.push(staggerTimeout);

    return () => {
      active = false;
      timers.forEach(clearTimeout);
    };
  }, [isIntersecting, index]);

  const shards = SHARD_SETS[index % SHARD_SETS.length];
  const uniqueId = `clip-${journey.id}`;

  return (
    <div ref={ref} className={`gb-scene gb-scene--${phase}`}>

      {/* ── PROBLEM CARD with glass-break shards ── */}
      <div className="gb-problem">

        {/* Base image — stays visible blurred after break instead of disappearing */}
        <img
          src={journey.problem.image}
          alt={journey.problem.label}
          className="gb-img gb-img--problem"
        />

        {/* Crack overlay — SVG lines */}
        <svg className="gb-cracks" viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="38" y1="0" x2="30" y2="100" stroke="rgba(255,255,255,0.9)" strokeWidth="0.4" />
          <line x1="38" y1="0" x2="52" y2="70" stroke="rgba(255,255,255,0.9)" strokeWidth="0.35" />
          <line x1="52" y1="70" x2="100" y2="45" stroke="rgba(255,255,255,0.9)" strokeWidth="0.35" />
          <line x1="52" y1="70" x2="60" y2="100" stroke="rgba(255,255,255,0.9)" strokeWidth="0.3" />
          <line x1="0" y1="55" x2="38" y2="60" stroke="rgba(255,255,255,0.7)" strokeWidth="0.3" />
          <line x1="38" y1="60" x2="100" y2="45" stroke="rgba(255,255,255,0.7)" strokeWidth="0.3" />
        </svg>

        {/* Shards — each clips the image to a polygon, then flies away */}
        {shards.map((pts, i) => (
          <div
            key={i}
            className="gb-shard"
            style={{ '--fly': SHARD_TRANSFORMS[i], '--delay': `${i * 55}ms` }}
          >
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="gb-shard-svg">
              <defs>
                <clipPath id={`${uniqueId}-${i}`} clipPathUnits="objectBoundingBox">
                  <polygon points={pts.split(' ').map(p => {
                    const [x, y] = p.split(',');
                    return `${x / 100},${y / 100}`;
                  }).join(' ')} />
                </clipPath>
              </defs>
            </svg>
            <div
              className="gb-shard-face"
              style={{
                backgroundImage: `url(${journey.problem.image})`,
                clipPath: `polygon(${pts.split(' ').map(p => {
                  const [x, y] = p.split(',');
                  return `${x}% ${y}%`;
                }).join(', ')})`,
              }}
            />
            {/* Glass sheen on each shard */}
            <div className="gb-shard-sheen" style={{
              clipPath: `polygon(${pts.split(' ').map(p => {
                const [x, y] = p.split(',');
                return `${x}% ${y}%`;
              }).join(', ')})`,
            }} />
          </div>
        ))}

        {/* Label */}
        <div className="gb-label gb-label--problem" style={{ '--c': journey.problem.color }}>
          <span className="gb-label-tag">The Problem</span>
          <h3>{journey.problem.label}</h3>
          <p>{journey.problem.caption}</p>
        </div>
      </div>

      {/* ── TRANSFORMATION ARROW ── */}
      <div className="gb-arrow" aria-hidden="true">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>

      {/* ── RESULT CARD ── */}
      <div className="gb-result">
        <img src={journey.result.image} alt={journey.result.label} className="gb-img gb-img--result" />
        <div className="gb-label gb-label--result" style={{ '--c': journey.result.color }}>
          <span className="gb-label-tag">The Transformation</span>
          <h3>{journey.result.label}</h3>
          <p>{journey.result.caption}</p>
        </div>
        {/* Radiate particles on reveal */}
        <div className="gb-sparkles" aria-hidden="true">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="gb-spark" style={{ '--i': i }} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default function Impact() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(e => document.addEventListener(e, unlockAudio, { once: true }));
    return () => events.forEach(e => document.removeEventListener(e, unlockAudio));
  }, []);

  return (
    <section className="impact-section" id="stories" ref={sectionRef}>
      <div className="impact-section__overlay" />

      <div className="impact-heading">
        <span className="impact-heading__eyebrow">The Infineo Journey</span>
        <h2 className="impact-heading__title">
          What Infineo <span className="impact-heading__highlight">Addresses</span>
        </h2>
        <p className="impact-heading__sub">Scroll to watch ancient wisdom shatter modern struggles</p>
      </div>

      <div className="impact-column-headers">
        <h3 className="impact-column-header header-problems">PROBLEMS</h3>
        <h3 className="impact-column-header header-transformation">TRANSFORMATION</h3>
      </div>

      <div className="impact-journeys">
        {JOURNEYS.map((j, i) => (
          <GlassBreakCard key={j.id} journey={j} index={i} />
        ))}
      </div>

      <div className="impact-cta">
        <button className="btn-primary impact-cta__btn">
          <span>Start Your Child's Journey</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <span className="impact-cta__note">Free demo class · No credit card</span>
      </div>

      {/* Mascot at the bottom-left of the impact section wrapped in sticky container */}
      <div className="impact-neo-sticky-container">
        <div className={`impact-neo-left ${inView ? 'active' : ''}`}>
          <img src={neo1} className="neo-frame nf1" alt="Mascot Open" />
          <img src={neo2} className="neo-frame nf2" alt="Mascot Half Closed" />
          <img src={neo3} className="neo-frame nf3" alt="Mascot Closed" />
          <img src={neo4} className="neo-frame nf4" alt="Mascot Transition" />
        </div>
      </div>
    </section>
  );
}