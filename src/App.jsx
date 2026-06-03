import { ThemeProvider } from "./context/ThemeContext"
import { useEffect } from "react"
import initCursorSparkles from "./utils/cursorSparkles"
import Title from "./components/Title"
import Hero from "./components/Hero"
import Impact from "./components/Impact"
import Parents from "./components/Parents"
import Modules from "./components/Modules"
import DemoClass from "./components/DemoClass"
import Pricing from "./components/Pricing"
import FloatingChatbot from "./components/FloatingChatbot"
import FloatingWhatsapp from "./components/FloatingWhatsapp"
import Footer from "./components/Footer"
import './App.css'

function App() {
  useEffect(() => {
    const cleanup = initCursorSparkles({
      minInterval: 55,      // ms between trail bursts
      extraChance: 0.14,    // bonus particle probability
      clickBurst: 8,        // particles per click
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
      cleanup();
      observer.disconnect();
    };
  }, []);

  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App