import '../styles/Footer.css';
import logoWithText from '../assets/logo_with_text.webp';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top: Brand + Nav */}
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoWithText} alt="Infineo Logo" className="footer-logo" />
            <p className="footer-tagline">
              Helping children build character, confidence, and life skills through India's timeless stories.
            </p>
            <p className="footer-subtagline">
              For children aged 5–12 • Live 1-on-1 sessions • Free trial class
            </p>
            <a href="#book" className="footer-cta-btn">Book Free Class</a>
          </div>

          <nav className="footer-nav">
            <div className="footer-nav-group">
              <span className="footer-nav-label">For Parents</span>
              {/* <a href="#">How It Works</a> */}
              <a href="#modules">Curriculum</a>
              <a href="#pricing">Pricing</a>
              <a href="#book">Book a Free Class</a>
              <a href="#faq">FAQs</a>
            </div>
            <div className="footer-nav-group">
              <span className="footer-nav-label">Company</span>
              <a href="#home">About</a>
              <a href="#parents">Founder Letter</a>
              <a href="#contact">Contact</a>
            </div>
          </nav>
        </div>

        {/* Bottom: Social + Legal + Copyright */}
        <div className="footer-bottom" id="contact">
          <div className="footer-bottom-left">
            <div className="social-links">
              <a href="https://www.facebook.com/share/1By8zEfJAP/" className="social-link" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 13.5h2.5l1-3H14V8.5c0-.8.2-1.3 1.3-1.3H17V4.5c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.1H8.5v3H11V21h3v-7.5z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/infineo.live?utm_source=qr&igsh=Mnd4cW5tNHB4Z3Ri#" className="social-link" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@InfineoLive" className="social-link" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://x.com/InfineoLive" className="social-link" aria-label="Twitter / X">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
            <div className="footer-contact">
              <a href="mailto:infineo.live@gmail.com">infineo.live@gmail.com</a>
              <span className="footer-dot">·</span>
              <a href="tel:+917007967357">+91 70079 67357</a>
            </div>
          </div>

          <div className="footer-bottom-right">
            <div className="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Refunds</a>
            </div>
            <p className="copyright">© {currentYear} Infineo. All rights reserved.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}