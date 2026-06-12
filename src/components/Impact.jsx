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

/* Three large shards separated by the two visible structural cracks. */
const SHARDS = [
  "0,0 64,0 58,14 61,27 51,40 54,53 43,66 46,81 36,100 0,100",
  "64,0 100,0 100,48 88,45 77,51 64,47 54,53 51,40 61,27 58,14",
  "54,53 64,47 77,51 88,45 100,48 100,100 36,100 46,81 43,66",
];

/* Shard fly-out directions */
const SHARD_TRANSFORMS = [
  "translate(-22px,-10px) rotate(-4deg)",
  "translate(24px,-14px) rotate(4deg)",
  "translate(12px,24px) rotate(-3deg)",
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
        const cardCenter = entry.boundingClientRect.top + entry.boundingClientRect.height / 2;
        const viewportCenter = window.innerHeight / 2;

        if (cardCenter < viewportCenter) {
          // Upper half of viewport: keep active/visible
          setIsIntersecting(true);
        } else {
          // Lower half of viewport: trigger active status based on the 50% threshold
          setIsIntersecting(entry.intersectionRatio >= 0.5);
        }
      },
      {
        rootMargin: '0px',
        threshold: [0, 0.5]
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
      }, 300);
      timers.push(t1);

      const t2 = setTimeout(() => {
        if (!active) return;
        setPhase('broken');
      }, 600);
      timers.push(t2);

      const t3 = setTimeout(() => {
        if (!active) return;
        setPhase('reveal');
      }, 900);
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

  const shards = SHARDS;
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
          <path className="gb-crack gb-crack--main" d="M64 0 L58 14 L61 27 L51 40 L54 53 L43 66 L46 81 L36 100" />
          <path className="gb-crack gb-crack--main" d="M100 48 L88 45 L77 51 L64 47 L54 53" />
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

      {/* ── TRANSFORMATION ARROW ==== */}
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
          Igniting Curious <span className="impact-heading__highlight">Minds</span>
        </h2>
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
        <button className="btn-primary impact-cta__btn" onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}>
          <span>Start Your Child's Journey</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <span className="impact-cta__note">No payment. No commitment. Just a story worth starting.</span>
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
