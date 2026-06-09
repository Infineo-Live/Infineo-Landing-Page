import { useEffect } from "react";
import initCursorSparkles from "../utils/cursorSparkles";
import Title from "../components/Title";
import Footer from "../components/Footer";
import FloatingChatbot from "../components/FloatingChatbot";
import FloatingWhatsapp from "../components/FloatingWhatsapp";

import "../styles/Careers.css";
import "../App.css";

// Replace with actual form links
const TEACHER_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSesbOKwUw1fnQb3G5CLOnBgwTaZ8100cFBiAzGOQNB30O56Kw/viewform?usp=header";
const INTERN_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfoZRb85d_mB5EFSnMNV59FTBGmjQdAKclEj5KqdT1ynS-dQg/viewform?usp=publish-editor";

export default function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const cleanup = initCursorSparkles({
      minInterval: 55,
      extraChance: 0.14,
      clickBurst: 8,
    });

    return () => cleanup();
  }, []);
  // Fade-in animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const teacherPositions = [
    {
      title: "Storytelling Teacher",
      type: "Freelance / Contract",
      location: "Remote (India)",
      compensation: "Per Class",
    },
  ];

  const openPositions = [
    {
      title: "Game Development Intern",
      type: "Internship",
      location: "Remote",
      duration: "3 Months",
    },
    {
      title: "Social Media Intern",
      type: "Internship",
      location: "Remote",
      duration: "3 Months",
    },
    {
      title: "Content Creation Intern",
      type: "Internship",
      location: "Remote",
      duration: "3 Months",
    },
    {
      title: "Video Creation Intern",
      type: "Internship",
      location: "Remote",
      duration: "3 Months",
    },
    {
      title: "HR Intern",
      type: "Internship",
      location: "Remote",
      duration: "3 Months",
    },
    {
      title: "Sales & Marketing Intern",
      type: "Internship",
      location: "Remote",
      duration: "3 Months",
    },
    {
      title: "Website Building Intern",
      type: "Internship",
      location: "Remote",
      duration: "3 Months",
    },
  ];

  return (
    <div className="careers-page">
      <Title />

      {/* Hero Section */}
      <section className="careers-hero fade-in">
        <h1>Join the Mission to Shape the Next Generation</h1>
        <p>
          Help children build values, confidence, and life skills through
          mythology and storytelling.
        </p>
        {/* CTA Buttons */}
        <div
          className="primary-cta"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "48px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={TEACHER_FORM_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply as Teacher
          </a>

          <a
            href={INTERN_FORM_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply as Intern
          </a>
        </div>
      </section>
      <main className="careers-content fade-in">
        {/* Mission */}
        <section
          className="about-infineo magic-card"
          style={{ marginBottom: "64px", padding: "40px" }}
        >
          <h2 className="careers-section-title">Our Mission</h2>

          <p>
            At Infineo, we blend ancient mythology with modern storytelling to
            empower young minds. Our interactive games and narratives nurture
            confidence, values, and essential life skills.
          </p>
        </section>

        {/* Who We Look For */}
        <section>
          <h2 className="careers-section-title">Who We Look For</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Excellent Communicators</h3>
              <p>
                Individuals who can connect, explain, and engage effectively.
              </p>
            </div>
            <div className="value-card">
              <h3>Passion for Education</h3>
              <p>
                People who genuinely care about helping children learn and grow.
              </p>
            </div>
            <div className="value-card">
              <h3>Creative Thinkers</h3>
              <p>
                Team members who enjoy storytelling, content, and innovation.
              </p>
            </div>
            <div className="value-card">
              <h3>Ownership Mindset</h3>
              <p>
                People who take responsibility and work independently.
              </p>
            </div>
          </div>
        </section>
        {/* Storytelling Teacher */}
        <section>
          <h2 className="careers-section-title">Storytelling Teacher</h2>

          <div className="magic-card" style={{ padding: "32px" }}>
            <p>
              Help children build confidence, communication skills, empathy, resilience,
              and strong values through engaging storytelling, mythology, and
              interactive learning experiences.
            </p>
            <ul style={{ marginTop: "20px", lineHeight: "1.8" }}>
              <li>🎓 Graduates preferred</li>
              <li>📍 Remote opportunity across India</li>
              <li>💼 Freelance / Contract basis</li>
              <li>🖥️ Conduct live online classes</li>
              <li>👧 Work with children through storytelling and value-based education</li>
              <li>💬 Strong communication and presentation skills preferred</li>
              <li>📅 Fixed recurring student schedules</li>
              <li>💰 Compensation on a per-class basis</li>
            </ul>
            <div style={{ marginTop: "28px" }}>
              <a
                href={TEACHER_FORM_URL}
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply as Teacher
              </a>
            </div>
          </div>
        </section>

        {/* Teaching Opportunities */}
        <section>
          <h2 className="careers-section-title">Teaching Opportunities</h2>

          <div className="jobs-list">
            {teacherPositions.map((job, idx) => (
              <div key={idx} className="job-card">
                <div className="job-details">
                  <h3>{job.title}</h3>

                  <div className="job-meta">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>💰 {job.compensation}</span>
                  </div>
                </div>

                <button
                  className="apply-btn"
                  onClick={() =>
                    window.open(
                      TEACHER_FORM_URL,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>
        {/* Internship Program */}
        <section>
          <h2 className="careers-section-title">Internship Program</h2>
          <div className="magic-card" style={{ padding: "32px" }}>
            <p>
              Our internship program is designed for ambitious college students
              who want hands-on experience while contributing to meaningful
              projects.
            </p>
            <ul style={{ marginTop: "20px", lineHeight: "1.8" }}>
              <li>📅 Duration: 3 Months</li>
              <li>🧪 Initial Probation Period: 10 Days</li>
              <li>📍 Remote Opportunity</li>
              <li>
                🎓 Top performers may receive a Letter of Recommendation (LOR)
              </li>
              <li>
                🚀 Outstanding interns may be offered a permanent position
              </li>
            </ul>
          </div>
        </section>
        {/* Open Positions */}
        <section>
          <h2 className="careers-section-title">Open Internship Roles</h2>
          <div className="jobs-list">
            {openPositions.map((job, idx) => (
              <div key={idx} className="job-card">
                <div className="job-details">
                  <h3>{job.title}</h3>
                  <div className="job-meta">
                    <span>📍 {job.location}</span>
                    <span>💼 {job.type}</span>
                    <span>⏳ {job.duration}</span>
                  </div>
                </div>
                <button
                  className="apply-btn"
                  onClick={() =>
                    window.open(
                      INTERN_FORM_URL,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="careers-cta">
          <h3>Ready to Make an Impact?</h3>

          <p>
            Join us in shaping stories, experiences, and technology that empower
            the next generation.
          </p>

          <a
            href={INTERN_FORM_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply Today
          </a>
        </section>
      </main>
      <FloatingChatbot />
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
}