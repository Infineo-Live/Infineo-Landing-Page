import { useEffect, useRef } from 'react';
import '../styles/Modules.css';

import ganeshaImg from '../assets/gods/ganesha-new.png';
import hanumanImg from '../assets/gods/hanuman.png';
import krishnaImg from '../assets/gods/krishna.png';
import shivaImg from '../assets/gods/shiv.png';

const MODULES = [
  { id: 1, name: 'Ganesha', subtitle: 'The Remover of Obstacles', image: ganeshaImg, col: 1, row: 1, comingSoon: false },
  { id: 2, name: 'Hanuman', subtitle: 'The Symbol of Strength', image: hanumanImg, col: 3, row: 1, comingSoon: false },
  { id: 3, name: 'Krishna', subtitle: 'The Divine Teacher', image: krishnaImg, col: 5, row: 1, comingSoon: false },
  { id: 4, name: 'Ram', subtitle: 'The Prince of Dharma', image: null, col: 7, row: 1, comingSoon: false },
  { id: 5, name: 'Shiva', subtitle: 'The Great Protector', image: shivaImg, col: 7, row: 3, comingSoon: false },
  { id: 6, name: 'Shakti', subtitle: 'The Divine Feminine Power', image: null, col: 5, row: 3, comingSoon: false },
  { id: 7, name: 'Ramayana', subtitle: "The Epic of Lord Ram's Journey", image: null, col: 3, row: 3, comingSoon: true },
  { id: 8, name: 'Mahabharata', subtitle: 'The Epic of Duty & Wisdom', image: null, col: 1, row: 3, comingSoon: true },
];

// Grid column → x%,  row → y%
const colToX = { 1: 12.5, 3: 37.5, 5: 62.5, 7: 87.5 };
const rowToY = { 1: 26, 3: 74 };

/*
  Build a smooth S-shaped winding path:
    Row 1:  left → right  (nodes 1-4)
    Curve:  right side curves down
    Row 3:  right → left  (nodes 5-8)

  We use cubic Bézier segments between consecutive nodes.
  Control points arc UP on row 1 and DOWN on row 3 to give a
  gentle wave rather than flat straight lines.
*/
const pts = MODULES.map(m => ({ x: colToX[m.col], y: rowToY[m.row] }));

function buildPath(pts) {
  // Helper: midpoint control points with vertical arc
  const arc = 8; // how many SVG units to bow the control point

  const segments = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const mx = (a.x + b.x) / 2;
    // For row-1 segments (left→right) bow upward; downward curve segment; row-3 bow upward
    let cy1, cy2;
    if (i < 3) {
      // row 1: bow slightly upward
      cy1 = a.y - arc * 0.6;
      cy2 = b.y - arc * 0.6;
    } else if (i === 3) {
      // the connecting curve (ram → shiva) bows to the right
      // handled separately below
      segments.push(`C ${a.x + 10} ${a.y + 16}, ${b.x + 10} ${b.y - 16}, ${b.x} ${b.y}`);
      continue;
    } else {
      // row 3: bow slightly downward
      cy1 = a.y + arc * 0.5;
      cy2 = b.y + arc * 0.5;
    }
    segments.push(`C ${mx} ${cy1}, ${mx} ${cy2}, ${b.x} ${b.y}`);
  }
  return `M ${pts[0].x} ${pts[0].y} ` + segments.join(' ');
}

const PATH_D = buildPath(pts);

export default function Modules() {
  const sectionRef = useRef(null);

useEffect(() => {
  const section = sectionRef.current;
  if (!section) return;
  const nodes = section.querySelectorAll('.level-node');
  const svg = section.querySelector('.path-svg');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (svg) svg.classList.add('is-visible');
      nodes.forEach((node, i) => {
        setTimeout(() => node.classList.add('is-visible'), i * 120);
      });
      observer.disconnect();
    });
  }, { threshold: 0 });
  observer.observe(section);
  return () => observer.disconnect();
}, []);
  return (
    <section className="modules-section" id="modules" ref={sectionRef}>

      <div className="modules-header">
        <span className="modules-eyebrow">Our Learning Journey</span>
        <h2>Explore. Learn. Grow.</h2>
        <p>A magical path through timeless stories and lessons that shape young hearts.</p>
      </div>

      <div className="game-map-wrapper">

        {/* ── Winding dashed path ── */}
        <svg className="path-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Glow backing */}

          <path
            className="path-line"
            d={PATH_D}
            fill="none"
            stroke="rgba(212,175,55,0.25)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1000"
          />
          {/* Dashed gold path */}
          <path
            className="path-line"
            d={PATH_D}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="0.8"
            strokeDasharray="3 1.8"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.9"
          />
        </svg>

        {/* ── Level Nodes ── */}
        {MODULES.map((mod) => {
          const x = colToX[mod.col];
          const y = rowToY[mod.row];

          return (
            <div
              key={mod.id}
              className="level-node"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Hover tooltip — shows above the god image */}
              <div className="level-tooltip">
                <p className="level-tooltip-name">{mod.name}</p>
                <p className="level-tooltip-sub">{mod.subtitle}</p>
              </div>

              {/* God image OR placeholder emoji */}
              {mod.image ? (
                <img src={mod.image} alt={mod.name} className="level-god-img" />
              ) : (
                <div className="level-god-placeholder">
                  {mod.comingSoon ? '✨' : '🙏'}
                </div>
              )}

              {/* Gold number badge */}
              <div className="level-badge">{mod.id}</div>

              {/* Name label */}
              <div className="level-label">
                <span className="level-label-name">{mod.name}</span>
              </div>
            </div>
          );
        })}

        {/* ── Journey end marker ── */}
        <div className="journey-end">
          <span>∞</span>
          <p>The journey<br />never ends!</p>
        </div>

      </div>

      {/* ── Bottom feature strip ── */}
      <div className="modules-features">
        {[
          { icon: '📖', label: 'Engaging Stories That Inspire' },
          { icon: '⭐', label: 'Fun Learning That Sticks' },
          { icon: '❤️', label: 'Values That Shape Life' },
          { icon: '✨', label: 'A Journey of Joy & Discovery' },
        ].map(f => (
          <div key={f.label} className="feature-pill">
            <span>{f.icon}</span>
            <span>{f.label}</span>
          </div>
        ))}
      </div>

    </section>
  );
}