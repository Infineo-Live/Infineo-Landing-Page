import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeContext"
import Home from "./pages/Home"
import Careers from "./pages/Careers"
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<Careers />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App