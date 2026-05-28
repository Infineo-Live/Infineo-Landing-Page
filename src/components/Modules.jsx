import { useEffect, useRef, useState } from 'react';
import '../styles/Modules.css';

import ganeshaImg from '../assets/gods/ganesha-new.png';
import hanumanImg from '../assets/gods/hanuman.png';
import krishnaImg from '../assets/gods/krishna.png';
import shivaImg   from '../assets/gods/shiv.png';

const GOLDEN_COLOR = '#D4AF37';
const GOLDEN_BG    = '#F8F1DE';

const modules = [
  {
    id: 1,
    name: 'Ganesha',
    image: ganeshaImg,
    subtitle: 'The Remover of Obstacles',
    description:
      'Learn from Lord Ganesha about overcoming challenges with wisdom and perseverance. This module teaches problem-solving and resilience.',
    color: GOLDEN_COLOR,
    bgColor: GOLDEN_BG,
  },
  {
    id: 2,
    name: 'Hanuman',
    image: hanumanImg,
    subtitle: 'The Symbol of Strength',
    description:
      "Discover the virtues of loyalty, strength, and unwavering faith through Hanuman's story. Build confidence and dedication.",
    color: GOLDEN_COLOR,
    bgColor: GOLDEN_BG,
  },
  {
    id: 3,
    name: 'Krishna',
    image: krishnaImg,
    subtitle: 'The Divine Teacher',
    description:
      "Explore wisdom, playfulness, and divine love through Krishna's teachings. Learn about balance and living a purposeful life.",
    color: GOLDEN_COLOR,
    bgColor: GOLDEN_BG,
  },
  {
    id: 4,
    name: 'Shiva',
    image: shivaImg,
    subtitle: 'The Yogi of Transformation',
    description:
      'Learn transformation, meditation, and inner peace from Lord Shiva. Discover the power of stillness and meditation.',
    color: GOLDEN_COLOR,
    bgColor: GOLDEN_BG,
  },
  {
    id: 5,
    name: 'Shakti',
    image: null,
    subtitle: 'The Divine Feminine Power',
    description:
      'Embrace empowerment and inner strength through the Divine Mother. Learn about resilience, nurturing, and feminine power.',
    color: GOLDEN_COLOR,
    bgColor: GOLDEN_BG,
  },
  {
    id: 6,
    name: 'Ramayana',
    image: null,
    subtitle: 'The Epic of Values',
    description:
      'Journey through the greatest epic of dharma. Learn about righteousness, duty, love, and the triumph of good over evil.',
    color: GOLDEN_COLOR,
    bgColor: GOLDEN_BG,
  },
  {
    id: 7,
    name: 'Mahabharata',
    image: null,
    subtitle: 'The War of Duty',
    description:
      "Explore the complex world's greatest epic. Learn about duty, ethics, courage, and making difficult decisions with integrity.",
    color: GOLDEN_COLOR,
    bgColor: GOLDEN_BG,
  },
];

const Modules = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [imgErrors,    setImgErrors]    = useState({});
  const containerRef = useRef(null);

  const FALLBACK_IMAGE = ganeshaImg;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveModule(Number(entry.target.dataset.index));
          }
        });
      },
      { root: container, threshold: 0.6 }
    );

    const cards = container.querySelectorAll('.focused-module-stage');
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  const scrollToModule = (index) => {
    const el = document.getElementById(`module-card-${index}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleImgError = (id) =>
    setImgErrors((prev) => ({ ...prev, [id]: true }));

  return (
    <section className="modules-section" id="modules">
      {/* Header */}
      <div className="modules-header">
        <h2>Our 7 Sacred Modules</h2>
        <p>Scroll to explore the divine modules one by one</p>
      </div>

      {/* Scrolling cards */}
      <div className="modules-single-view-container" ref={containerRef}>
        {modules.map((module, idx) => {
          const imageSrc =
            imgErrors[module.id] || !module.image
              ? FALLBACK_IMAGE
              : module.image;

          return (
            <div
              key={module.id}
              id={`module-card-${idx}`}
              data-index={idx}
              className={`focused-module-stage ${activeModule === idx ? 'is-active' : ''}`}
            >
              <div
                className="module-presentation-card"
                style={{
                  borderTopColor:  module.color,
                  backgroundColor: module.bgColor,
                }}
              >
                <div className="module-main-content">
                  <div className="module-left-details">
                    {/* Image */}
                    <div
                      className="module-image-wrapper"
                      style={{ '--module-color': module.color }}
                    >
                      <img
                        src={imageSrc}
                        alt={module.name}
                        className="module-god-image"
                        onError={() => handleImgError(module.id)}
                      />
                      <div
                        className="module-image-glow"
                        style={{ background: module.color }}
                      />
                    </div>

                    {/* Text */}
                    <div className="module-text-block">
                      <h3 className="module-title">{module.name}</h3>
                      <p className="module-subtitle">{module.subtitle}</p>
                      <p className="module-description">{module.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side navigator */}
      <div className="modules-side-navigator">
        {modules.map((module, idx) => (
          <button
            key={idx}
            className={`nav-row-item ${activeModule === idx ? 'active' : ''}`}
            onClick={() => scrollToModule(idx)}
            style={{ '--active-color': module.color }}
          >
            <span className="nav-row-label">{module.name}</span>
            <span className="nav-row-dot" />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Modules;