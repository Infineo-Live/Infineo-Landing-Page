import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import '../styles/Impact.css';

// Pixar-themed impact images
import imgScreenAddiction from '../assets/impact/screen-addiction.png';
import imgStoryTelling from '../assets/impact/storytelling.png';
import imgTransformed from '../assets/impact/transformed.png';
import imgPeerPressure from '../assets/impact/peer-pressure.png';
import imgAnxiety from '../assets/impact/anxiety.png';
import imgEmpathy from '../assets/impact/empathy.png';

// God assets for floating parallax
import hanuman from '../assets/gods/Hanuman.png';
import krishna from '../assets/gods/Krishna.png';
import ganesha from '../assets/gods/Ganesha.png';

const JOURNEYS = [
  {
    id: 'focus',
    problem: {
      emoji: '📱',
      label: 'Screen Addiction',
      caption: 'Endless scrolling destroys focus',
      image: imgScreenAddiction,
    },
    result: {
      emoji: '🎯',
      label: 'Deep Focus',
      caption: 'Sustained attention & calm reflection',
      image: imgStoryTelling,
    },
    color: { problem: '#ff6b6b', result: '#4ade80' },
  },
  {
    id: 'values',
    problem: {
      emoji: '🌪️',
      label: 'Peer Pressure',
      caption: 'Isolation & lost moral compass',
      image: imgPeerPressure,
    },
    result: {
      emoji: '🤝',
      label: 'Empathy & Kindness',
      caption: 'Confident cultural identity & values',
      image: imgEmpathy,
    },
    color: { problem: '#ff9f43', result: '#38bdf8' },
  },
  {
    id: 'resilience',
    problem: {
      emoji: '😰',
      label: 'Anxiety & Fear',
      caption: 'Academic pressure & fear of failure',
      image: imgAnxiety,
    },
    result: {
      emoji: '🚀',
      label: 'Inner Strength',
      caption: 'Courage, resilience & confidence',
      image: imgTransformed,
    },
    color: { problem: '#a78bfa', result: '#f59e0b' },
  },
];

/* ── Floating God for parallax ── */
function FloatingGod({ src, alt, className, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.6, 0.6, 0]);
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  return (
    <motion.img
      src={src}
      alt={alt}
      className={`impact-floating-god ${className}`}
      style={{ y: springY, opacity }}
      aria-hidden="true"
    />
  );
}

/* ── Single Journey Row ── */
function JourneyRow({ journey, index, scrollYProgress }) {
  const rowRef = useRef(null);
  const isInView = useInView(rowRef, { once: false, margin: '-10% 0px' });
  const isEven = index % 2 === 0;

  // Progress bar animation linked to scroll
  const barWidth = useTransform(
    scrollYProgress,
    [index * 0.33, (index + 1) * 0.33],
    ['0%', '100%']
  );

  return (
    <div
      ref={rowRef}
      className={`impact-journey-row ${isEven ? '' : 'impact-journey-row--reversed'}`}
    >
      {/* ── PROBLEM side ── */}
      <motion.div
        className="impact-card impact-card--problem"
        initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.92 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="impact-card__image-wrap">
          <img src={journey.problem.image} alt={journey.problem.label} className="impact-card__image" />
          <div className="impact-card__vignette impact-card__vignette--problem" />
        </div>
        <div className="impact-card__content">
          <span className="impact-card__emoji">{journey.problem.emoji}</span>
          <h3 className="impact-card__title impact-card__title--problem">{journey.problem.label}</h3>
          <p className="impact-card__caption">{journey.problem.caption}</p>
        </div>
      </motion.div>

      {/* ── CENTER ARROW / CONNECTOR ── */}
      <div className="impact-connector">
        <div className="impact-connector__track">
          <motion.div
            className="impact-connector__fill"
            style={{
              height: barWidth,
              background: `linear-gradient(180deg, ${journey.color.problem}, var(--color-infineo-gold), ${journey.color.result})`,
            }}
          />
        </div>
        <motion.div
          className="impact-connector__spark"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          ✨
        </motion.div>
      </div>

      {/* ── RESULT side ── */}
      <motion.div
        className="impact-card impact-card--result"
        initial={{ opacity: 0, x: isEven ? 60 : -60, scale: 0.92 }}
        animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="impact-card__image-wrap">
          <img src={journey.result.image} alt={journey.result.label} className="impact-card__image" />
          <div className="impact-card__vignette impact-card__vignette--result" />
        </div>
        <div className="impact-card__content">
          <span className="impact-card__emoji">{journey.result.emoji}</span>
          <h3 className="impact-card__title impact-card__title--result">{journey.result.label}</h3>
          <p className="impact-card__caption">{journey.result.caption}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Main Impact Section ── */
export default function Impact() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-5%' });

  return (
    <section className="impact-section" id="stories" ref={sectionRef}>
      {/* Background overlay — keeps original bg visible */}
      <div className="impact-section__overlay" />

      {/* Floating parallax gods */}
      <FloatingGod src={hanuman} alt="" className="impact-god--left" scrollYProgress={scrollYProgress} />
      <FloatingGod src={krishna} alt="" className="impact-god--right" scrollYProgress={scrollYProgress} />
      <FloatingGod src={ganesha} alt="" className="impact-god--center" scrollYProgress={scrollYProgress} />

      {/* Floating particles */}
      <div className="impact-particles" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className="impact-particle" style={{
            '--delay': `${i * 0.8}s`,
            '--x': `${10 + Math.random() * 80}%`,
            '--size': `${3 + Math.random() * 5}px`,
          }} />
        ))}
      </div>

      {/* Heading */}
      <motion.div
        ref={headingRef}
        className="impact-heading"
        initial={{ opacity: 0, y: 40 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <span className="impact-heading__eyebrow">The Infineo Journey</span>
        <h2 className="impact-heading__title">
          Every Child's <span className="impact-heading__highlight">Transformation</span>
        </h2>
        <p className="impact-heading__sub">
          Scroll to see how ancient wisdom replaces modern struggles
        </p>
        <div className="impact-heading__scroll-hint" aria-hidden="true">
          <span className="impact-heading__scroll-arrow">↓</span>
        </div>
      </motion.div>

      {/* Journey rows */}
      <div className="impact-journeys">
        {JOURNEYS.map((journey, i) => (
          <JourneyRow
            key={journey.id}
            journey={journey}
            index={i}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        className="impact-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6 }}
      >
        <button className="impact-cta__btn">
          <span>Start Your Child's Journey</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        <span className="impact-cta__note">Free demo class · No credit card</span>
      </motion.div>
    </section>
  );
}