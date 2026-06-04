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
                <a href="#" className="social-link" title="Facebook" aria-label="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 13.5h2.5l1-3H14V8.5c0-.8.2-1.3 1.3-1.3H17V4.5c-.3 0-1.2-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.1H8.5v3H11V21h3v-7.5z" />
                  </svg>
                </a>
                <a href="#" className="social-link" title="Instagram" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a href="#" className="social-link" title="YouTube" aria-label="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107c1.883.511 9.388.511 9.388.511s7.505 0 9.388-.511a3.002 3.002 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a href="#" className="social-link" title="Twitter / X" aria-label="Twitter / X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Modules */}
          <div className="footer-column">
            <h4 className="footer-column-title">Our Modules</h4>
            <ul className="footer-links">
              <li><a href="#modules">Ganesha</a></li>
              <li><a href="#modules">Hanuman</a></li>
              <li><a href="#modules">Krishna</a></li>
              <li><a href="#modules">Shiva</a></li>
              <li><a href="#modules">Shakti</a></li>
              <li><a href="#modules">Ramayana</a></li>
              <li><a href="#modules">Mahabharata</a></li>
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



        <div className="contact-info">
          <h3>Get in Touch</h3>
          <div className="contact-item">
            <span className="contact-label">Email:</span>
            <a href="mailto:infineo.live@gmail.com">infineo.live@gmail.com</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Phone:</span>
            <a href="tel:+917007967357">+91 70079 67357</a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Location:</span>
            <span>India</span>
          </div>
        </div>


        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} Infineo. All rights reserved. Crafted for young minds.
            </p>
            <div className="footer-credits">
              <a href="#">Privacy</a>
              <span className="divider">•</span>
              <a href="#">Terms</a>
              <span className="divider">•</span>
              <a href="#">Cookies</a>
              <span className="divider">•</span>
              <span>Made by Infineo Team</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="footer-decoration footer-decoration-1"></div>
      <div className="footer-decoration footer-decoration-2"></div>
    </footer >
  );
}
