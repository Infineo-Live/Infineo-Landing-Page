import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Impact.css';
import sadChild from '../assets/distressed-child.png';
import neoMascot from '../assets/website-neo.png';
import happyChild from '../assets/child-after.png';

const TRANSITIONS = [
  {
    id: 1,
    title: "Focus & Attention",
    challenge: {
      icon: "📱",
      subtitle: "Screen Addiction",
      text: "Endless scrolling and digital dopamine loops destroy focus, leaving kids restless, impatient, and easily distracted.",
      statusText: "Restless & Distracted",
      colorClass: "stage-challenge"
    },
    solution: {
      icon: "📖",
      subtitle: "Live Storytelling",
      text: "Interactive 1-on-1 sessions engage kids with ancient epic sagas, training their imagination and listening skills naturally.",
      statusText: "Active Listening",
      colorClass: "stage-solution"
    },
    transformation: {
      icon: "🎯",
      subtitle: "Deep Concentration",
      text: "Kids develop a sustained attention span, enabling them to read deeply, focus in classrooms, and reflect calmly.",
      statusText: "Mindful & Focused",
      colorClass: "stage-result"
    }
  },
  {
    id: 2,
    title: "Values & Empathy",
    challenge: {
      icon: "🌪️",
      subtitle: "Peer Influence",
      text: "Modern school and social pressures lead kids toward emotional isolation, anxiety, and a disconnect from core moral values.",
      statusText: "Isolated & Anxious",
      colorClass: "stage-challenge"
    },
    solution: {
      icon: "🏛️",
      subtitle: "Epic Moral Dilemmas",
      text: "Through the stories of Ramayana and Ganesha, kids explore ethical choices, discussing and internalizing correct values.",
      statusText: "Exploring Values",
      colorClass: "stage-solution"
    },
    transformation: {
      icon: "🌟",
      subtitle: "Strong Moral Compass",
      text: "Children act with empathy, respect, and kindness, expressing confidence in their cultural identity and ancient roots.",
      statusText: "Empathetic & Grounded",
      colorClass: "stage-result"
    }
  },
  {
    id: 3,
    title: "Resilience & Confidence",
    challenge: {
      icon: "😰",
      subtitle: "Stress & Anxiety",
      text: "Academic performance expectations and competitive pressure cause kids to fear failure, triggering anxiety.",
      statusText: "Fear of Failure",
      colorClass: "stage-challenge"
    },
    solution: {
      icon: "🎭",
      subtitle: "Brave Characters",
      text: "Exploring heroic sagas (Hanuman, Shiva) allows kids to identify with courage, learning to voice their thoughts freely.",
      statusText: "Building Courage",
      colorClass: "stage-solution"
    },
    transformation: {
      icon: "🚀",
      subtitle: "Emotional Strength",
      text: "Kids face challenges with resilience and self-confidence, communicating clearly and managing daily stress easily.",
      statusText: "Confident & Resilient",
      colorClass: "stage-result"
    }
  }
];

const STAGE_METADATA = [
  { 
    id: 0, 
    label: "1. Current Challenges", 
    class: "stage-p", 
    avatar: sadChild, 
    badgeText: "The Struggle", 
    desc: "Modern digital and social pressures impacting kids' daily well-being." 
  },
  { 
    id: 1, 
    label: "2. The Infineo Path", 
    class: "stage-i", 
    avatar: neoMascot, 
    badgeText: "The Intervention", 
    desc: "Interactive 1-on-1 live mentoring classes using ancient Indian epic stories." 
  },
  { 
    id: 2, 
    label: "3. Positive Outcomes", 
    class: "stage-r", 
    avatar: happyChild, 
    badgeText: "The Transformation", 
    desc: "Empowered children exhibiting deep focus, rich empathy, and high resilience." 
  }
];

export default function Impact() {
  const [activeStage, setActiveStage] = useState(0); // 0: Challenge, 1: Solution, 2: Result

  const getCurrentData = (pillar) => {
    if (activeStage === 0) return pillar.challenge;
    if (activeStage === 1) return pillar.solution;
    return pillar.transformation;
  };

  const getStageColor = () => {
    if (activeStage === 0) return "rgba(255, 107, 107, 0.15)";
    if (activeStage === 1) return "rgba(212, 160, 85, 0.22)";
    return "rgba(74, 222, 128, 0.18)";
  };

  return (
    <section className="pi-scene" id="stories">
      {/* Background glass overlay */}
      <div className="pi-scene-overlay" />

      {/* Decorative stardust floating elements */}
      <div className="pi-stardust" aria-hidden="true" />

      {/* Heading */}
      <div className="pi-heading">
        <p className="pi-heading-eyebrow">Interactive Transformation Journey</p>
        <h2 className="pi-heading-title">
          From Challenges to <span className="pi-heading-highlight">Wisdom</span>
        </h2>
        <p className="pi-heading-subtitle">
          See how Infineo helps children shift from modern distractions to balanced, value-driven lives.
        </p>
      </div>

      <div className="pi-interactive-container">
        {/* Step Navigation Bar */}
        <div className="pi-navigation-bar">
          <div className="pi-nav-line-bg" />
          <div 
            className="pi-nav-line-active" 
            style={{ 
              width: `${(activeStage / 2) * 100}%`,
              background: activeStage === 0 ? '#ff6b6b' : activeStage === 1 ? 'var(--color-primary)' : '#4ade80'
            }} 
          />
          {STAGE_METADATA.map((stage) => (
            <button
              key={stage.id}
              className={`pi-nav-btn ${activeStage === stage.id ? 'active ' + stage.class : ''}`}
              onClick={() => setActiveStage(stage.id)}
              aria-label={`Go to stage ${stage.label}`}
            >
              <span className="pi-nav-btn-dot" />
              <span className="pi-nav-btn-label">{stage.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Stage Banner */}
        <div className="pi-stage-banner">
          <span className={`pi-stage-badge ${STAGE_METADATA[activeStage].class}`}>
            {STAGE_METADATA[activeStage].badgeText}
          </span>
          <p className="pi-stage-description">
            {STAGE_METADATA[activeStage].desc}
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="pi-dashboard-grid">
          
          {/* Growth Cards (Columns 1, 2, 3) */}
          <div className="pi-cards-column">
            {TRANSITIONS.map((pillar) => {
              const data = getCurrentData(pillar);
              return (
                <div key={pillar.id} className={`pi-growth-card ${data.colorClass}`}>
                  <div className="pi-card-header">
                    <span className="pi-card-pillar-tag">{pillar.title}</span>
                    <span className="pi-card-status-badge">{data.statusText}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="pi-card-body"
                    >
                      <div className="pi-card-icon-container">
                        <span className="pi-card-big-icon">{data.icon}</span>
                      </div>
                      <h3 className="pi-card-subtitle">{data.subtitle}</h3>
                      <p className="pi-card-desc">{data.text}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Central Character Transformation Display */}
          <div className="pi-mascot-showcase">
            <div className="pi-mascot-orbit-ring" />
            <div className="pi-mascot-glow-sphere" style={{ background: getStageColor() }} />
            
            <div className="pi-mascot-frame">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 8 }}
                  transition={{ duration: 0.4, cubicBezier: [0.34, 1.56, 0.64, 1] }}
                  className="pi-mascot-wrapper"
                >
                  <img 
                    src={STAGE_METADATA[activeStage].avatar} 
                    alt={STAGE_METADATA[activeStage].badgeText} 
                    className="pi-mascot-image"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="pi-mascot-interactive-tip">
              <span className="pi-tip-icon">✨</span>
              <span>Click steps above to watch the transformation</span>
            </div>
          </div>

        </div>

        {/* CTA Zone */}
        <div className="pi-cta-action-zone">
          <button className="pi-primary-cta-btn">
            <span>Book a Free Live Demo Class</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <span className="pi-cta-subtext">No credit card required · 1-on-1 private session</span>
        </div>

      </div>
    </section>
  );
}