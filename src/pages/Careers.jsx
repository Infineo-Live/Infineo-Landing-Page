import { useEffect } from "react"
import initCursorSparkles from "../utils/cursorSparkles"
import Title from "../components/Title"
import Footer from "../components/Footer"
import FloatingChatbot from "../components/FloatingChatbot"
import FloatingWhatsapp from "../components/FloatingWhatsapp"
import '../styles/Careers.css'
import '../App.css'

export default function Careers() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const cleanup = initCursorSparkles({
      minInterval: 55,    // ms between trail bursts
      extraChance: 0.14,  // bonus particle probability
      clickBurst: 8,      // particles per click
    });

    return () => cleanup();
  }, []);

  const openPositions = [
    {
      title: "Mythology Storyteller & Educator",
      type: "Full-Time",
      location: "Remote",
      experience: "2+ Years"
    },
    {
      title: "Senior Full-Stack Engineer (React/Node)",
      type: "Full-Time",
      location: "Remote / Hybrid (Noida)",
      experience: "5+ Years"
    },
    {
      title: "Product Designer (UI/UX)",
      type: "Part-Time",
      location: "Remote",
      experience: "3+ Years"
    }
  ];

  return (
    <div className="careers-page">
      <Title />
      
      <section className="careers-hero">
        <h1>Shape the Future of Storytelling & Learning</h1>
        <p>Join Infineo in bringing India's timeless wisdom and life skills to the next generation through interactive storytelling and gaming.</p>
      </section>

      <main className="careers-content">
        <section>
          <h2 className="careers-section-title">Our Values & Culture</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Culture First</h3>
              <p>We foster a culture of creativity, openness, and lifelong learning. Every idea is heard and valued.</p>
            </div>
            <div className="value-card">
              <h3>Impact Driven</h3>
              <p>We believe storytelling is a powerful tool to shape character, confidence, and life skills for young minds.</p>
            </div>
            <div className="value-card">
              <h3>Autonomy & Trust</h3>
              <p>We work remotely and flexibly. We focus on impact and results, trusting you to own your work.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="careers-section-title">Open Positions</h2>
          <div className="jobs-list">
            {openPositions.map((job, idx) => (
              <div key={idx} className="job-card">
                <div className="job-details">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>⏳ {job.experience}</span>
                  </div>
                </div>
                <button 
                  className="apply-btn"
                  onClick={() => window.location.href = 'mailto:infineo.live@gmail.com?subject=Application for ' + encodeURIComponent(job.title)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="careers-cta">
          <h3>Don't see a matching role?</h3>
          <p>We are always looking for passionate creators, developers, and educators. Send your resume and a short intro to us.</p>
          <a href="mailto:infineo.live@gmail.com" className="careers-email">infineo.live@gmail.com</a>
        </section>
      </main>

      <FloatingChatbot />
      <FloatingWhatsapp />
      <Footer />
    </div>
  )
}