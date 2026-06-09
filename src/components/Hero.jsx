import { useRef, useEffect } from 'react';
import '../styles/Hero.css';
import BroadwayText from './BroadwayText';


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
      <div className="hero-overlay"/>
      <div className="hero-content">
        <h1 className="hero-heading">
          <BroadwayText text="SOME STORIES DON'T TEACH HISTORY." className="hero-heading-line1" tag="span" />
          <BroadwayText text="THEY TEACH LIFE." className="hero-heading-line2" tag="span" />
        </h1>

        <p className="hero-subtitle">
          Discover timeless stories that nurture confidence, empathy and resilience.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('open-demo-modal'))}>
  <span>BOOK THE DEMO</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          {/* <button className="btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Watch a Story
          </button> */}
        </div>
        {/* Social proof strip */}
        <div className="hero-trust">
          <div className="hero-trust-item">
            <span className="hero-trust-num">1 ON 1</span>
            <span className="hero-trust-label">MEETING</span>
          </div>
          <div className="hero-trust-divider" />
          <div className="hero-trust-item">
            <span className="hero-trust-num">30 MINUTES</span>
            <span className="hero-trust-label">SESSION</span>
          </div>
          <div className="hero-trust-divider" />
          <div className="hero-trust-item">
            <span className="hero-trust-num">5-12 YRS</span>
            <span className="hero-trust-label">KIDS WELCOME</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;