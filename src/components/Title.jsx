import { useRef, useEffect, useState } from 'react';
import Logo from '../assets/logo_with_text.png';
import '../styles/Title.css';

const Title = () => {
  const navRef = useRef(null);
  const dropletRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Cursor-following droplet inside the nav pill
  useEffect(() => {
    const nav = navRef.current;
    const droplet = dropletRef.current;
    if (!nav || !droplet) return;

    const handleMouseMove = (e) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      droplet.style.left = `${x}px`;
      droplet.style.top = `${y}px`;
      droplet.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      droplet.style.opacity = '0';
    };

    nav.addEventListener('mousemove', handleMouseMove);
    nav.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      nav.removeEventListener('mousemove', handleMouseMove);
      nav.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Scroll-based header style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Floating bubbles across the page
  // useEffect(() => {
  //   const container = document.getElementById('bubble-container');
  //   if (!container) return;

  //   const spawn = () => {
  //     const bubble = document.createElement('span');
  //     bubble.className = 'hero-bubble';
  //     const size = Math.random() * 40 + 12;
  //     bubble.style.cssText = `
  //       width: ${size}px;
  //       height: ${size}px;
  //       left: ${Math.random() * 100}%;
  //       animation-duration: ${Math.random() * 8 + 6}s;
  //       animation-delay: ${Math.random() * 2}s;
  //       opacity: ${Math.random() * 0.35 + 0.08};
  //     `;
  //     container.appendChild(bubble);
  //     bubble.addEventListener('animationend', () => bubble.remove());
  //   };

  //   const interval = setInterval(spawn, 600);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      {/* Floating bubbles layer */}
      <div id="bubble-container" className="bubble-container" aria-hidden="true" />

      <header className={`title ${scrolled ? 'title--scrolled' : ''}`}>
        <img src={Logo} alt="Infineo Logo" className="logo" />

        {/* Desktop Nav */}
        <nav className="title-links" ref={navRef}>
          <span className="nav-droplet" ref={dropletRef} />
          <a href="#home">ABOUT</a>
          <a href="#stories">IMPACT</a>
          <a href="#how">NOTE TO PARENTS</a>
          <a href="#curriculum">CURRICULUM</a>
          <a href="#pricing">PRICING</a>
          <button className="login-btn">BOOK THE DEMO</button>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        {/* Mobile Drawer */}
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="#stories" onClick={() => setMenuOpen(false)}>STORIES</a>
          <a href="#how" onClick={() => setMenuOpen(false)}>HOW IT WORKS</a>
          <a href="#curriculum" onClick={() => setMenuOpen(false)}>CURRICULUM</a>
          <button className="login-btn" onClick={() => setMenuOpen(false)}>BOOK THE DEMO</button>
        </div>
      </header>
    </>
  );
};

export default Title;