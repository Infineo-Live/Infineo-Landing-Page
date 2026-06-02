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
      minInterval: 60,      // was 30 — fires less often
      extraChance: 0.12,    // was 0.32 — fewer bonus particles
      clickBurst: 6,        // was 12 — lighter click burst
    });
    return cleanup;
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
        <FloatingChatbot />
        <FloatingWhatsapp />
      </div>
      <Footer />
    </ThemeProvider>
  )
}

export default App