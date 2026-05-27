import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          {/* Column 1 - Brand */}
          <div className="footer-column">
            <div className="footer-brand">
              <img src="/src/assets/logo_with_text.png" alt="Infineo Logo" className="footer-logo" />
              <p className="footer-tagline">
                Empowering children with timeless wisdom through Indian mythology, one story at a time.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" title="Facebook">
                  <span>f</span>
                </a>
                <a href="#" className="social-link" title="Instagram">
                  <span>📷</span>
                </a>
                <a href="#" className="social-link" title="YouTube">
                  <span>▶</span>
                </a>
                <a href="#" className="social-link" title="Twitter">
                  <span>𝕏</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Modules */}
          <div className="footer-column">
            <h4 className="footer-column-title">Our Modules</h4>
            <ul className="footer-links">
              <li><a href="#modules">🙏 Ganesha</a></li>
              <li><a href="#modules">💪 Hanuman</a></li>
              <li><a href="#modules">🎵 Krishna</a></li>
              <li><a href="#modules">🔥 Shiva</a></li>
              <li><a href="#modules">✨ Shakti</a></li>
              <li><a href="#modules">🏹 Ramayana</a></li>
              <li><a href="#modules">⚔️ Mahabharata</a></li>
            </ul>
          </div>

          {/* Column 3 - Learning */}
          <div className="footer-column">
            <h4 className="footer-column-title">For Parents</h4>
            <ul className="footer-links">
              <li><a href="#pricing">Pricing Plans</a></li>
              <li><a href="#demo">Book Demo Class</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#impact">Why Infineo?</a></li>
              <li><a href="#parents">Benefits of 1-on-1</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div className="footer-column">
            <h4 className="footer-column-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Team</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Press Kit</a></li>
              <li><a href="#">Career</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Column 5 - Legal */}
          <div className="footer-column">
            <h4 className="footer-column-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>

        {/* Middle Section - Newsletter */}
        <div className="footer-middle">
          <div className="newsletter-section">
            <h3>Stay Updated</h3>
            <p>Get stories, learning tips, and updates delivered to your inbox</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">Subscribe</button>
            </form>
          </div>

          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <a href="mailto:hello@infineo.com">hello@infineo.com</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📱</span>
              <a href="tel:+919876543210">+91 98765 43210</a>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Infineo. All rights reserved. Crafted with 💖 for young minds.
            </p>
            <div className="footer-credits">
              <a href="#">Privacy</a>
              <span className="divider">•</span>
              <a href="#">Terms</a>
              <span className="divider">•</span>
              <a href="#">Cookies</a>
              <span className="divider">•</span>
              <span>Made with ❤️ by Infineo Team</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="footer-decoration footer-decoration-1"></div>
      <div className="footer-decoration footer-decoration-2"></div>
    </footer>
  );
}
