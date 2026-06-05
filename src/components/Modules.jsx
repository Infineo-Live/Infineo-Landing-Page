import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/Modules.css';

import ganeshaImg from '../assets/gods/Ganesha.webp';
import hanumanImg from '../assets/gods/Hanuman.webp';
import krishnaImg from '../assets/gods/Krishna.webp';
import shivaImg from '../assets/gods/Shiva.webp';
import ramImg from '../assets/gods/Ram.webp';
import shaktiImg from '../assets/gods/Shakti.webp';
import vishnuImg from '../assets/gods/Vishnu.webp';
import ramayanaImg from '../assets/gods/Ramayan.webp';
import mahabharataImg from '../assets/gods/Mahabharata.webp';

const MODULES = [
  { id: 1, name: 'Ganesha', subtitle: 'Focus & New Beginnings', image: ganeshaImg, x: 0, y: 10, comingSoon: false },
  { id: 2, name: 'Hanuman', subtitle: 'Courage & Devotion', image: hanumanImg, x: 20, y: 40, comingSoon: false },
  { id: 3, name: 'Krishna', subtitle: 'Wisdom & Play', image: krishnaImg, x: 50, y: 22, comingSoon: false },
  { id: 4, name: 'Ram', subtitle: 'Duty & Integrity', image: ramImg, x: 85, y: 32, comingSoon: false },
  { id: 5, name: 'Shiva', subtitle: 'Stillness & Power', image: shivaImg, x: 101, y: 52, comingSoon: false },
  { id: 6, name: 'Shakti', subtitle: 'Strength & Grace', image: shaktiImg, x: 78, y: 68, comingSoon: false },
  { id: 7, name: 'Vishnu', subtitle: 'Leadership & Legacy', image: vishnuImg, x: 44, y: 89, comingSoon: false },
  { id: 8, name: 'Ramayana', subtitle: "Epic of Lord Ram's Journey", image: ramayanaImg, x: 16, y: 82, comingSoon: true },
  { id: 9, name: 'Mahabharata', subtitle: 'The Epic of Duty & Wisdom', image: mahabharataImg, x: -2, y: 80, comingSoon: true },
];

export default function Modules() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [pathD, setPathD] = useState('');

  // Generates dynamic vectors mapping to active viewport aspect ratio constraints
  const getCoordinates = useCallback((mod, index) => {
    if (!isMobile) {
      return { x: mod.x, y: mod.y };
    }
    // Mirror the exact vertical layout positions declared in your media query
    const x = index % 2 === 0 ? 25 : 75;
    const y = 8 + index * 10.5; // Distribute nicely down 100% height bounds
    return { x, y };
  }, [isMobile]);

  // Re-build path strings whenever sizing conditions mutate
  useEffect(() => {
    let dString = '';
    MODULES.forEach((mod, i) => {
      const curr = getCoordinates(mod, i);
      if (i === 0) {
        dString += `M ${curr.x} ${curr.y}`;
      } else {
        const prev = getCoordinates(MODULES[i - 1], i - 1);
        if (!isMobile) {
          const mx = (prev.x + curr.x) / 2;
          dString += ` C ${mx} ${prev.y}, ${mx} ${curr.y}, ${curr.x} ${curr.y}`;
        } else {
          // Clean vertical S-curves for screens under 650px
          const my = (prev.y + curr.y) / 2;
          dString += ` C ${prev.x} ${my}, ${curr.x} ${my}, ${curr.x} ${curr.y}`;
        }
      }
    });
    setPathD(dString);
  }, [isMobile, getCoordinates]);

  // Breakpoint Media Listener
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 650px)');
    const handleResize = (e) => setIsMobile(e.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  // Reveal Animations Observer
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
    }, { threshold: 0.05 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="modules-section" id="modules" ref={sectionRef}>
      <div className="modules-header">
        <span className="modules-eyebrow">A Journey Designed for Growing Minds</span>
        <h2>Explore. Learn. <span>Grow.</span></h2>
        <p>Every step reveals a story. Every story reveals a life lesson.</p>
      </div>

      <div className="game-map-wrapper">
        <svg
          className="path-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Magical glow */}
            <filter id="path-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Strong visibility shadow */}
            <filter id="path-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="2"
                stdDeviation="1.5"
                floodColor="var(--path-shadow)"
                floodOpacity="0.95"
              />
            </filter>
          </defs>

          {/* Glow Trail */}
          <path
            className="path-line path-glow-line"
            d={pathD}
            fill="none"
            stroke="var(--path-glow)"
            strokeWidth={isMobile ? "3.2" : "2.2"}
            strokeLinecap="round"
            filter="url(#path-glow)"
          />

          {/* Main Trail */}
          <path
            className="path-line path-core-line"
            d={pathD}
            fill="none"
            stroke="var(--path-core)"
            strokeWidth={isMobile ? "1.3" : "0.9"}
            strokeDasharray={isMobile ? "3 2" : "4 2"}
            strokeLinecap="round"
            filter="url(#path-shadow)"
          />
        </svg>
        {/* Level Nodes */}
        {MODULES.map((mod, index) => {
          const coords = getCoordinates(mod, index);
          return (
            <div
              key={mod.id}
              className="level-node"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              <div className="level-tooltip">
                <p className="level-tooltip-name">{mod.name}</p>
                <p className="level-tooltip-sub">{mod.subtitle}</p>
              </div>

              {mod.comingSoon && (
                <div className="level-coming-next">Coming Next</div>
              )}

              {mod.image ? (
                <img src={mod.image} alt={mod.name} className="level-god-img" />
              ) : (
                <div className="level-god-placeholder">
                  {mod.comingSoon ? '\u2728' : '\U0001f64f'}
                </div>
              )}
              <div className="level-badge">{mod.id}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}