import { createContext, useContext, useEffect, useState } from 'react';

// Create theme context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const [sparklesEnabled, setSparklesEnabled] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('infineo-theme');
    const savedSparkles = localStorage.getItem('infineo-sparkles');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    const initialSparkles = savedSparkles !== null ? savedSparkles === 'true' : true;
    
    setTheme(initialTheme);
    setSparklesEnabled(initialSparkles);
    applyTheme(initialTheme);
    applySparkles(initialSparkles);
  }, []);

  const applyTheme = (newTheme) => {
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('infineo-theme', newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('infineo-theme', newTheme);
  };

  const applySparkles = (enabled) => {
    localStorage.setItem('infineo-sparkles', String(enabled));
    if (typeof window !== 'undefined') {
      window.__sparklesEnabled = enabled;
      // if sparkles are being disabled, clean them up
      if (!enabled && window.__cursorSparklesCleanup) {
        try {
          window.__cursorSparklesCleanup();
          window.__cursorSparklesMounted = false;
        } catch (e) {}
      }
    }
  };

  const toggleSparkles = () => {
    const newState = !sparklesEnabled;
    setSparklesEnabled(newState);
    applySparkles(newState);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, sparklesEnabled, toggleSparkles }}>
      {children}
    </ThemeContext.Provider>
  );
}
// Hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
