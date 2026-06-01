import { useRef, useEffect } from 'react';
import '../styles/Hero.css';
import neoLeft from '../assets/neo-version/neo.png';
import neoRight from '../assets/neo-version/neo2.png';

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);
  return (

    <section className="hero" id="home" ref={heroRef}>
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/bg-video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="hero-overlay" />

      {/* Neo Characters — left and right edges */}
      <img src={neoLeft} alt="Neo character rii" className="hero-neo-right" />

      {/* Content */}
      <div className="hero-content">
        {/* Decorative top label */}
        <div className="hero-label">
          <span className="hero-label-dot" />
          Storytelling for Kids
          <span className="hero-label-dot" />
        </div>

        <h1 className="hero-heading">
          <span className="hero-heading-line1">INSTILLING VALUES VIA STORYTELLING</span>
          <span className="hero-heading-line2">FOR YOUR KIDS</span>
        </h1>

        <p className="hero-subtitle">
          Fun 1-on-1 classes that help kids build confidence, focus, values,
          and emotional strength through Indian ancient stories.
        </p>

        <div className="hero-actions">
          <button className="hero-btn-primary">
            <span>BOOK THE DEMO</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button className="hero-btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch a Story
          </button>
        </div>

        {/* Social proof strip */}
        <div className="hero-trust">
          <div className="hero-trust-item">
            <span className="hero-trust-num">500+</span>
            <span className="hero-trust-label">Happy Kids</span>
          </div>
          <div className="hero-trust-divider" />
          <div className="hero-trust-item">
            <span className="hero-trust-num">7</span>
            <span className="hero-trust-label">Epic Modules</span>
          </div>
          <div className="hero-trust-divider" />
          <div className="hero-trust-item">
            <span className="hero-trust-num">Ages 5–14</span>
            <span className="hero-trust-label">All Welcome</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default Hero;