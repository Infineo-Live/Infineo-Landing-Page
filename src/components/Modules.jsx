import { useEffect, useRef } from 'react';
import '../styles/Modules.css';

import ganeshaImg from '../assets/gods/Ganesha.png';
import hanumanImg from '../assets/gods/Hanuman.png';
import krishnaImg from '../assets/gods/Krishna.png';
import shivaImg from '../assets/gods/Shiva.png';
import ramImg from '../assets/gods/Ram.png';
import shaktiImg from '../assets/gods/Shakti.png';
import vishnuImg from '../assets/gods/Vishnu.png';
import ramayanaImg from '../assets/gods/Ramayan.png';
import mahabharataImg from '../assets/gods/Mahabharata.png';

const MODULES = [
  { id: 1, name: 'Ganesha', subtitle: 'The Remover of Obstacles', image: ganeshaImg, x: 0, y: 20, comingSoon: false },
  { id: 2, name: 'Hanuman', subtitle: 'The Symbol of Strength', image: hanumanImg, x: 24, y: 50, comingSoon: false },
  { id: 3, name: 'Krishna', subtitle: 'The Divine Teacher', image: krishnaImg, x: 50, y: 22, comingSoon: false },
  { id: 4, name: 'Ram', subtitle: 'The Prince of Dharma', image: ramImg, x: 85, y: 32, comingSoon: false },
  { id: 5, name: 'Shiva', subtitle: 'The Great Protector', image: shivaImg, x: 100, y: 52, comingSoon: false },
  { id: 6, name: 'Shakti', subtitle: 'The Divine Feminine Power', image: shaktiImg, x: 75, y: 60, comingSoon: false },
  { id: 7, name: 'Vishnu', subtitle: 'The Preserver of the Universe', image: vishnuImg, x: 44, y: 89, comingSoon: false },
  { id: 8, name: 'Ramayana', subtitle: "Epic of Lord Ram's Journey", image: ramayanaImg, x: 10, y: 82, comingSoon: true },
  { id: 9, name: 'Mahabharata', subtitle: 'The Epic of Duty & Wisdom', image: mahabharataImg, x: -2, y: 80, comingSoon: true },
];

function buildPath(modules) {
  return modules.reduce((path, curr, i) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = modules[i - 1];
    const mx = (prev.x + curr.x) / 2;
    return path + ` C ${mx} ${prev.y}, ${mx} ${curr.y}, ${curr.x} ${curr.y}`;
  }, '');
}

const PATH_D = buildPath(MODULES);

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

        {/* Winding path */}
        <svg
          className="path-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
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

        {/* Level Nodes */}
        {MODULES.map((mod) => (
          <div
            key={mod.id}
            className="level-node"
            style={{ left: `${mod.x}%`, top: `${mod.y}%` }}
          >
            {/* Hover tooltip */}
            <div className="level-tooltip">
              <p className="level-tooltip-name">{mod.name}</p>
              <p className="level-tooltip-sub">{mod.subtitle}</p>
            </div>

            {/* Coming soon badge */}
            {mod.comingSoon && (
              <div className="level-coming-next">Coming Next</div>
            )}

            {/* God image or placeholder */}
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
        ))}

        {/* Journey end marker
        <div className="journey-end">
          <span>∞</span>
          <p>The journey<br />never ends!</p>
        </div> */}

      </div>

    </section>
  );
}