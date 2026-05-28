import { ThemeProvider } from "./context/ThemeContext"
import Title from "./components/Title"
import Hero from "./components/Hero"
import Impact from "./components/Impact"
import Parents from "./components/Parents"
import Modules from "./components/Modules"
import DemoClass from "./components/DemoClass"
import Pricing from "./components/Pricing"
import FloatingChatbot from "./components/FloatingChatbot"
import Footer from "./components/Footer"

function App() {
  return (
    <ThemeProvider>
      <Title/>
      <Hero/>
      <Impact/>
      <Parents/>
      <Modules/>
      <DemoClass/>
      <Pricing/>
      <FloatingChatbot/>
      <Footer/>
    </ThemeProvider>
  )
}

export default App
