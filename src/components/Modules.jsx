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
  { id: 1, name: 'Ganesha', subtitle: 'Focus & New Beginnings', image: ganeshaImg, x: 14, y: 12, comingSoon: false },
  { id: 2, name: 'Hanuman', subtitle: 'Courage & Devotion', image: hanumanImg, x: 42, y: 5, comingSoon: false },
  { id: 'cp-2-3', isControlPoint: true, x: 57, y: 8 },
  { id: 3, name: 'Krishna', subtitle: 'Wisdom & Play', image: krishnaImg, x: 72, y: 14, comingSoon: false },
  { id: 4, name: 'Ram', subtitle: 'Duty & Integrity', image: ramImg, x: 84, y: 42, comingSoon: false },
  { id: 5, name: 'Shiva', subtitle: 'Stillness & Power', image: shivaImg, x: 58, y: 43, comingSoon: false },
  { id: 6, name: 'Shakti', subtitle: 'Strength & Grace', image: shaktiImg, x: 29, y: 39, comingSoon: false },
  { id: 7, name: 'Vishnu', subtitle: 'Leadership & Legacy', image: vishnuImg, x: 14, y: 74, comingSoon: false },
  { id: 8, name: 'Ramayana', subtitle: "Epic of Lord Ram's Journey", image: ramayanaImg, x: 45, y: 76, comingSoon: true },
  { id: 9, name: 'Mahabharata', subtitle: 'The Epic of Duty & Wisdom', image: mahabharataImg, x: 76, y: 78, comingSoon: true },
];

export default function Modules() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

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
    const route = section.querySelector('.journey-route');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (route) route.classList.add('is-visible');
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
          className="journey-route"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {MODULES.filter(m => !m.isControlPoint).slice(0, -1).map((mod, index) => {
            const start = getCoordinates(mod, index);
            const next = getCoordinates(MODULES.filter(m => !m.isControlPoint)[index + 1], index + 1);
            const midpoint = {
              x: (start.x + next.x) / 2,
              y: (start.y + next.y) / 2,
            };
            const bend = index % 2 === 0 ? -5 : 5;

            return (
              <g
                key={`${mod.id}-${index}`}
                className="route-segment"
              >
                <path
                  className="route-wave-glow"
                  d={`M ${start.x} ${start.y} Q ${midpoint.x} ${midpoint.y + bend} ${next.x} ${next.y}`}
                />
                <path
                  className="route-wave"
                  d={`M ${start.x} ${start.y} Q ${midpoint.x} ${midpoint.y + bend} ${next.x} ${next.y}`}
                />
                <circle className="route-waypoint-ring" cx={next.x} cy={next.y} r="1.2" />
                <circle className="route-waypoint-dot" cx={next.x} cy={next.y} r="0.38" />
              </g>
            );
          })}
        </svg>
        {/* Level Nodes */}
        {MODULES.filter(m => !m.isControlPoint).map((mod, index) => {
          const coords = getCoordinates(mod, index);
          return (
            <div
              key={mod.id}
              className={`level-node level-node-${mod.id}${mod.comingSoon ? ' level-node-coming-soon' : ''}`}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              <div className="level-tooltip">
                <p className="level-tooltip-name">{mod.name}</p>
                <p className="level-tooltip-sub">{mod.subtitle}</p>
              </div>

              {mod.comingSoon && (
                <div className="level-coming-next">Coming Soon</div>
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
