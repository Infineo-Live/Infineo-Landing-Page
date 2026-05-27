import { useEffect, useRef, useState } from 'react';
import '../styles/Modules.css';

import ganeshaImg from '../assets/gods/ganesha-new.png';
import hanumanImg from '../assets/gods/hanuman.png';
import krishnaImg from '../assets/gods/krishna.png';
import shivaImg from '../assets/gods/shiv.png';

const Modules = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  const containerRef = useRef(null);

  // Fallback image used for modules that don't have their own asset
  const FALLBACK_IMAGE = '/Infineo-Landing-Page/src/assets/gods/ganesha-new.png';

  const GOLDEN_COLOR = '#D4AF37';
  const GOLDEN_BG = '#F8F1DE';

  const modules = [
    {
      id: 1,
      name: 'Ganesha',
      image: ganeshaImg,
      subtitle: 'The Remover of Obstacles',
      description:
        'Learn from Lord Ganesha about overcoming challenges with wisdom and perseverance. This module teaches problem-solving and resilience.',
      lessons: [
        'Facing fears with courage',
        'Problem-solving strategies',
        'Wisdom through patience',
        'Celebrating small victories',
        'The power of determination'
      ],
      color: GOLDEN_COLOR,
      bgColor: GOLDEN_BG
    },
    {
      id: 2,
      name: 'Hanuman',
      image: hanumanImg,
      subtitle: 'The Symbol of Strength',
      description:
        "Discover the virtues of loyalty, strength, and unwavering faith through Hanuman's story. Build confidence and dedication.",
      lessons: [
        'Courage in difficult times',
        'Loyalty and friendship',
        'Physical and mental strength',
        'Dedication to purpose',
        'Selfless service'
      ],
      color: GOLDEN_COLOR,
      bgColor: GOLDEN_BG
    },
    {
      id: 3,
      name: 'Krishna',
      image: krishnaImg,
      subtitle: 'The Divine Teacher',
      description:
        "Explore wisdom, playfulness, and divine love through Krishna's teachings. Learn about balance and living a purposeful life.",
      lessons: [
        'Wisdom and intelligence',
        'Balance in all things',
        'Joy and playfulness',
        'Duty and responsibility',
        'Divine love and compassion'
      ],
      color: GOLDEN_COLOR,
      bgColor: GOLDEN_BG
    },
    {
      id: 4,
      name: 'Shiva',
      image: shivaImg,
      subtitle: 'The Yogi of Transformation',
      description:
        'Learn transformation, meditation, and inner peace from Lord Shiva. Discover the power of stillness and meditation.',
      lessons: [
        'Inner peace and meditation',
        'Transformation and change',
        'Strength through stillness',
        'Protection and renewal',
        'Connection with nature'
      ],
      color: GOLDEN_COLOR,
      bgColor: GOLDEN_BG
    },
    {
      id: 5,
      name: 'Shakti',
      image: '../assets/gods/shakti.png',
      subtitle: 'The Divine Feminine Power',
      description:
        'Embrace empowerment and inner strength through the Divine Mother. Learn about resilience, nurturing, and feminine power.',
      lessons: [
        'Inner strength and power',
        'Nurturing and compassion',
        'Breaking barriers',
        'Creative expression',
        'Self-empowerment'
      ],
      color: GOLDEN_COLOR,
      bgColor: GOLDEN_BG
    },
    {
      id: 6,
      name: 'Ramayana',
      image: '../assets/gods/ramayana.png',
      subtitle: 'The Epic of Values',
      description:
        'Journey through the greatest epic of dharma. Learn about righteousness, duty, love, and the triumph of good over evil.',
      lessons: [
        'Dharma (righteousness)',
        'Family values',
        'Good vs evil',
        'Loyalty and honor',
        'Victory through virtue'
      ],
      color: GOLDEN_COLOR,
      bgColor: GOLDEN_BG
    },
    {
      id: 7,
      name: 'Mahabharata',
      image: '../assets/gods/mahabharata.png',
      subtitle: 'The War of Duty',
      description:
        "Explore the complex world's greatest epic. Learn about duty, ethics, courage, and making difficult decisions with integrity.",
      lessons: [
        'Complex decision-making',
        'Ethical dilemmas',
        'Courage and honor',
        'Justice and karma',
        'Growth through challenges'
      ],
      color: GOLDEN_COLOR,
      bgColor: GOLDEN_BG
    }
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveModule(index);
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6
      }
    );

    const cards = document.querySelectorAll('.focused-module-stage');
    cards.forEach((card) => observer.observe(card));

    return () => {
      cards.forEach((card) => observer.unobserve(card));
    };
  }, []);

  const scrollToModule = (index) => {
    const element = document.getElementById(`module-card-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleImgError = (moduleId) => {
    setImgErrors((prev) => ({ ...prev, [moduleId]: true }));
  };

  return (
    <section className="modules-section" id="modules">
      <div className="modules-header">
        <h2>Our 7 Sacred Modules</h2>
        <p>Scroll to explore the divine modules one by one</p>
      </div>

      <div
        className="modules-single-view-container"
        ref={containerRef}
      >
        {modules.map((module, idx) => {
          const imageSrc = imgErrors[module.id] ? FALLBACK_IMAGE : module.image;

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
                  borderTopColor: module.color,
                  backgroundColor: module.bgColor
                }}
              >
                <div className="module-main-content">
                  {/* LEFT: image + text */}
                  <div className="module-left-details">
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

                    <div className="module-text-block">
                      <h3 className="module-title">{module.name}</h3>

                      <p className="module-subtitle">{module.subtitle}</p>

                      <p className="module-description">{module.description}</p>

                    </div>
                  </div>

                  {/* RIGHT: lessons */}
                  <div
                    className="module-right-lessons"
                    style={{ borderLeftColor: module.color }}
                  >
                    <h4>Key Learning Points:</h4>

                    {module.lessons.map((lesson, lessonIdx) => (
                      <div key={lessonIdx} className="lesson-item">
                        <span
                          className="lesson-dot"
                          style={{ backgroundColor: module.color }}
                        />
                        {lesson}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="modules-side-navigator">
        {modules.map((module, idx) => (
          <button
            key={idx}
            className={`nav-row-item ${activeModule === idx ? 'active' : ''}`}
            onClick={() => scrollToModule(idx)}
            style={{ '--active-color': module.color }}
          >
            <span className="nav-row-dot" />
            <span className="nav-row-label">{module.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Modules;