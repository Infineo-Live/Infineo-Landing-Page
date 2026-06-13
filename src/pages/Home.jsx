import { useEffect } from "react"
import { useLocation } from "react-router-dom"

import initCursorSparkles from "../utils/cursorSparkles"
import Title from "../components/Title"
import Hero from "../components/Hero"
import Impact from "../components/Impact"
import Parents from "../components/Parents"
import Modules from "../components/Modules"
import DemoClass from "../components/DemoClass"
import Pricing from "../components/Pricing"
import FloatingChatbot from "../components/FloatingChatbot"
import FloatingWhatsapp from "../components/FloatingWhatsapp"
import Footer from "../components/Footer"
import '../App.css'

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const timer = setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  useEffect(() => {
    const cleanup = initCursorSparkles({
      minInterval: 55,    
      extraChance: 0.14,    
      clickBurst: 8,       
    });

    // Add scroll transition classes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            entry.target.classList.remove('section-blurred');
          } else {
            entry.target.classList.add('section-blurred');
            entry.target.classList.remove('section-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    // Select all major sections
    const sections = document.querySelectorAll('section');
    sections.forEach((sec) => {
      sec.classList.add('section-transition');
      observer.observe(sec);
    });

    return () => {
      cleanup?.();
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Title />
      <Hero />
      <div className="journey-background">
        <Impact />
        <Parents />
        <Modules />
        <DemoClass />
        <Pricing />
      </div>
      {/* Floating buttons MUST be outside any ancestor with filter/will-change:filter
          or background-attachment:fixed — those properties create a new containing
          block that confines position:fixed children to that element, not the viewport */}
      <FloatingChatbot />
      <FloatingWhatsapp />
      <Footer />
    </>
  )
}

export default Home