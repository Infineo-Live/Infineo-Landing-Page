import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/theme.css'
import './App.css'

// Initialize lightweight cursor sparkles (only in browser, respects user preference)
if (typeof window !== 'undefined') {
  // Sparkles enabled by default; check localStorage for saved preference
  const sparklesPref = localStorage.getItem('infineo-sparkles');
  const sparklesEnabled = sparklesPref !== null ? sparklesPref === 'true' : true;
  window.__sparklesEnabled = sparklesEnabled;

  if (sparklesEnabled) {
    // avoid double-install during HMR or repeated imports
    if (!window.__cursorSparklesMounted) {
      import('./utils/cursorSparkles')
        .then(mod => {
          try {
            const cleanup = mod.default && mod.default();
            if (typeof cleanup === 'function') {
              window.__cursorSparklesCleanup = cleanup;
            }
            window.__cursorSparklesMounted = true;
          } catch (err) {
            // swallow - non-critical
            console.error('cursorSparkles init failed', err);
          }
        })
        .catch(err => console.error('failed to load cursorSparkles', err));

      // ensure cleanup on page unload (and helpful for HMR)
      window.addEventListener('beforeunload', () => {
        if (window.__cursorSparklesCleanup) {
          try { window.__cursorSparklesCleanup(); } catch (e) {}
        }
      });
    }
  }

  // Listen for sparkles toggle state change from ThemeContext
  const originalSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    originalSetItem.call(this, key, value);
    if (key === 'infineo-sparkles') {
      const enabled = value === 'true';
      if (enabled && !window.__cursorSparklesMounted) {
        // Sparkles are being enabled — init them
        import('./utils/cursorSparkles')
          .then(mod => {
            try {
              const cleanup = mod.default && mod.default();
              if (typeof cleanup === 'function') {
                window.__cursorSparklesCleanup = cleanup;
              }
              window.__cursorSparklesMounted = true;
            } catch (err) {
              console.error('cursorSparkles init failed', err);
            }
          })
          .catch(err => console.error('failed to load cursorSparkles', err));
      }
    }
  };
}

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
