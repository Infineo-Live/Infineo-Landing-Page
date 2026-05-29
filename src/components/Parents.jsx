import '../styles/Parents.css';

const Parents = () => {
  return (
    <section className="parents-section" id="parents">
      {/* Full-bleed background image */}
      <div className="parents-bg" aria-hidden="true" />

      {/* Soft overlay to give depth
      <div className="parents-overlay" aria-hidden="true" /> */}

      {/* Letter card */}
      <div className="letter-wrapper">
        {/* Decorative open-book SVG — top right */}
        <div className="letter-book-icon">
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 10C6 10 18 6 32 10C46 6 58 10 58 10V54C58 54 46 50 32 54C18 50 6 54 6 54V10Z"
              stroke="#C9A84C"
              strokeWidth="2.5"
              strokeLinejoin="round"
              fill="none"
            />
            <line x1="32" y1="10" x2="32" y2="54" stroke="#C9A84C" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Top gold ornament */}
        <div className="letter-ornament" aria-hidden="true">
          <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="10" x2="80" y2="10" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="100" cy="10" r="6" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="10" r="2" fill="#C9A84C" />
            <line x1="120" y1="10" x2="200" y2="10" stroke="#C9A84C" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>

        <span className="letter-heart">♡</span>

        <h2 className="letter-title">A Letter to Every Parent</h2>

        <blockquote className="letter-quote">
          <p>"Dear Parent,</p>
          <p>
            In a world moving at the speed of light, we often forget the roots that keep us
            grounded. At INFINEO, we believe the greatest gift you can give your child is not
            just knowledge — but a soul enriched with values.
          </p>
          <p>
            Our stories aren't just myths; they are ethical roadmaps. Through the magic of
            ancient Indian legends, your child learns what it means to be brave like Rama,
            focused like Arjuna, and kind like Krishna — one 30-minute session at a time,
            perfectly sized for young minds.
          </p>
          <p>
            Every class is personal. No crowded rooms, no falling behind. Just one expert
            storyteller, one child, and one conversation that builds courage, sharpens thinking,
            and grows a moral compass that lasts a lifetime.
          </p>
          <p>
            We are not just telling stories. We are raising the next generation of thinkers,
            leaders, and human beings.
          </p>
          <p>With love and purpose,"</p>
        </blockquote>

        {/* Bottom gold ornament */}
        <div className="letter-ornament letter-ornament--bottom" aria-hidden="true">
          <svg viewBox="0 0 200 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="10" x2="80" y2="10" stroke="var(--accent-primary)" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="100" cy="10" r="6" stroke="var(--accent-primary)" strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="10" r="2" fill="#C9A84C" />
            <line x1="120" y1="10" x2="200" y2="10" stroke="var(--accent-primary)" strokeWidth="1" strokeOpacity="0.5" />
          </svg>
        </div>

        <div className="letter-founder">
          <div className="founder-avatar">
            <img src="https://i.pravatar.cc/80?img=12" alt="Founder, INFINEO" />
          </div>
          <span className="founder-name">Ananya Sharma</span>
          <span className="founder-label">Founder, INFINEO</span>
        </div>
      </div>
    </section>
  );
};

export default Parents;