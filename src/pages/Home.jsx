import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // ================================================
  // CREATE RESUME
  // ================================================

  const handleCreateResume = () => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/templates");
    } else {
      navigate("/login");
    }
  };

  const handleATS = () => {
    navigate("/ats-upload");
  };

  return (
    <div style={styles.page}>
      {/* ================================================= */}
      {/* GLOBAL / RESPONSIVE CSS */}
      {/* ================================================= */}

      <style>
        {`
          * {
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            margin: 0;
          }

          .nav-link:hover {
            color: #2563eb !important;
          }

          .primary-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 30px rgba(37, 99, 235, 0.25);
          }

          .secondary-btn:hover {
            transform: translateY(-2px);
            border-color: #2563eb !important;
            color: #2563eb !important;
          }

          .ats-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 14px 30px rgba(15, 23, 42, 0.20);
          }

          .feature-card:hover {
            transform: translateY(-7px);
            border-color: #bfdbfe !important;
            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
          }

          .template-box:hover {
            transform: translateY(-5px);
            border-color: #93c5fd !important;
            box-shadow: 0 20px 45px rgba(37, 99, 235, 0.10);
          }

          .step-card:hover {
            transform: translateY(-5px);
          }

          .footer-link:hover {
            color: #ffffff !important;
          }

          @media (max-width: 900px) {
            .navbar {
              padding: 0 5% !important;
            }

            .nav-links {
              display: none !important;
            }

            .hero {
              flex-direction: column !important;
              text-align: center;
              padding: 65px 5% !important;
            }

            .hero-content {
              max-width: 720px !important;
            }

            .hero-buttons {
              justify-content: center !important;
            }

            .hero-preview {
              margin-top: 15px;
            }

            .feature-grid {
              grid-template-columns: 1fr 1fr !important;
            }

            .steps-grid {
              grid-template-columns: 1fr 1fr !important;
            }
          }

          @media (max-width: 600px) {
            .navbar {
              min-height: 65px !important;
            }

            .nav-button {
              padding: 9px 13px !important;
              font-size: 12px !important;
            }

            .hero {
              padding: 50px 5% !important;
            }

            .hero-title {
              font-size: 42px !important;
              letter-spacing: -1.5px !important;
            }

            .hero-description {
              font-size: 16px !important;
            }

            .hero-buttons {
              flex-direction: column !important;
              width: 100%;
            }

            .hero-buttons button,
            .hero-buttons a {
              width: 100% !important;
              text-align: center;
            }

            .hero-preview {
              transform: scale(0.88);
              margin-top: -10px;
              margin-bottom: -30px;
            }

            .feature-grid,
            .steps-grid {
              grid-template-columns: 1fr !important;
            }

            .section-heading {
              font-size: 30px !important;
            }

            .stats-grid {
              grid-template-columns: 1fr 1fr !important;
            }

            .template-grid {
              grid-template-columns: 1fr !important;
            }

            .about-card {
              padding: 30px 20px !important;
            }
          }
        `}
      </style>

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav style={styles.navbar} className="navbar">
        <Link to="/" style={styles.logo}>
          <span style={styles.logoMark}>R</span>
          Resume-X
        </Link>

        <div style={styles.navLinks} className="nav-links">
          <a href="#features" style={styles.navLink} className="nav-link">
            Features
          </a>

          <Link
            to="/templates"
            style={styles.navLink}
            className="nav-link"
          >
            Templates
          </Link>

          <a href="#how-it-works" style={styles.navLink} className="nav-link">
            How It Works
          </a>

          <a href="#about" style={styles.navLink} className="nav-link">
            About
          </a>
        </div>

        <button
          onClick={handleCreateResume}
          style={styles.navButton}
          className="nav-button"
        >
          Create Resume
        </button>
      </nav>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section style={styles.hero} className="hero">
        <div style={styles.heroGlow}></div>

        <div
          style={styles.heroContent}
          className="hero-content"
        >
          <div style={styles.badge}>
            <span style={styles.badgeDot}>●</span>
            Smart Resume Builder for Students & Professionals
          </div>

          <h1
            style={styles.heroTitle}
            className="hero-title"
          >
            Build a Resume
            <br />
            <span style={styles.gradientText}>
              That Gets Noticed.
            </span>
          </h1>

          <p
            style={styles.description}
            className="hero-description"
          >
            Create a professional, modern and ATS-friendly resume
            in minutes. Choose a template, add your details and
            create a resume that is ready to apply.
          </p>

          <div
            style={styles.buttons}
            className="hero-buttons"
          >
            <button
              onClick={handleCreateResume}
              style={styles.primaryButton}
              className="primary-btn"
            >
              Create My Resume
              <span style={styles.buttonArrow}>→</span>
            </button>

            <button
              onClick={handleATS}
              style={styles.atsHomeButton}
              className="ats-btn"
            >
              <span>📊</span>
              ATS Resume Analyzer
            </button>

            <Link
              to="/templates"
              style={styles.secondaryButton}
              className="secondary-btn"
            >
              Explore Templates
            </Link>
          </div>

          <div style={styles.trustRow}>
            <div style={styles.trustItem}>
              <span style={styles.check}>✓</span>
              Free to create
            </div>

            <div style={styles.trustItem}>
              <span style={styles.check}>✓</span>
              ATS Friendly
            </div>

            <div style={styles.trustItem}>
              <span style={styles.check}>✓</span>
              Professional Templates
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* RESUME MOCKUP */}
        {/* ================================================= */}

        <div
          style={styles.previewContainer}
          className="hero-preview"
        >
          <div style={styles.previewGlow}></div>

          <div style={styles.resumeCard}>
            <div style={styles.resumeTop}>
              <div>
                <div style={styles.mockName}>ALEX MORGAN</div>

                <div style={styles.mockRole}>
                  Software Developer
                </div>

                <div style={styles.mockContact}>
                  alex@email.com&nbsp;&nbsp; • &nbsp;&nbsp;Mumbai, India
                </div>
              </div>

              <div style={styles.profileCircle}>
                AM
              </div>
            </div>

            <div style={styles.resumeLine}></div>

            <div style={styles.mockSectionTitle}>
              PROFILE
            </div>

            <div style={styles.mockText}>
              <span></span>
              <span></span>
              <span style={{ width: "70%" }}></span>
            </div>

            <div style={styles.mockSectionTitle}>
              EXPERIENCE
            </div>

            <div style={styles.mockJob}>
              <div style={styles.mockJobTitle}>
                Software Developer
              </div>

              <div style={styles.mockSmall}>
                Tech Company • 2024 - Present
              </div>
            </div>

            <div style={styles.mockText}>
              <span></span>
              <span></span>
              <span style={{ width: "78%" }}></span>
            </div>

            <div style={styles.mockSectionTitle}>
              EDUCATION
            </div>

            <div style={styles.mockJob}>
              <div style={styles.mockJobTitle}>
                B.Tech Computer Engineering
              </div>

              <div style={styles.mockSmall}>
                University • 2021 - 2025
              </div>
            </div>

            <div style={styles.mockSectionTitle}>
              SKILLS
            </div>

            <div style={styles.skillRow}>
              <span>Java</span>
              <span>React</span>
              <span>SQL</span>
              <span>Spring Boot</span>
            </div>

            <div style={styles.atsMiniBadge}>
              <span>✓</span> ATS Ready
            </div>
          </div>

          <div style={styles.floatingCard}>
            <div style={styles.floatingIcon}>✓</div>

            <div>
              <div style={styles.floatingTitle}>
                ATS Friendly
              </div>

              <div style={styles.floatingText}>
                Resume optimized
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* STATS */}
      {/* ================================================= */}

      <section style={styles.statsSection}>
        <div style={styles.statsGrid} className="stats-grid">
          <div>
            <div style={styles.statNumber}>10+</div>
            <div style={styles.statLabel}>Professional Templates</div>
          </div>

          <div>
            <div style={styles.statNumber}>ATS</div>
            <div style={styles.statLabel}>Resume Analysis</div>
          </div>

          <div>
            <div style={styles.statNumber}>PDF</div>
            <div style={styles.statLabel}>Ready to Download</div>
          </div>

          <div>
            <div style={styles.statNumber}>100%</div>
            <div style={styles.statLabel}>Web Based</div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* FEATURES */}
      {/* ================================================= */}

      <section
        id="features"
        style={styles.features}
      >
        <div style={styles.sectionContainer}>
          <p style={styles.smallHeading}>
            FEATURES
          </p>

          <h2
            style={styles.sectionHeading}
            className="section-heading"
          >
            Everything you need to
            <br />
            build a better resume.
          </h2>

          <p style={styles.sectionDescription}>
            Resume-X combines professional design, easy editing
            and ATS analysis into one simple platform.
          </p>

          <div
            style={styles.featureGrid}
            className="feature-grid"
          >
            <div
              style={styles.featureCard}
              className="feature-card"
            >
              <div style={styles.featureIcon}>
                ⚡
              </div>

              <h3 style={styles.cardTitle}>
                Fast & Easy
              </h3>

              <p style={styles.cardText}>
                Build a professional resume without spending
                hours fighting with formatting and layouts.
              </p>

              <div style={styles.featureLink}>
                Simple workflow →
              </div>
            </div>

            <div
              style={styles.featureCard}
              className="feature-card"
            >
              <div style={styles.featureIcon}>
                🎨
              </div>

              <h3 style={styles.cardTitle}>
                Professional Templates
              </h3>

              <p style={styles.cardText}>
                Choose from multiple clean and modern templates
                designed for different career profiles.
              </p>

              <div style={styles.featureLink}>
                Explore templates →
              </div>
            </div>

            <div
              style={styles.featureCard}
              className="feature-card"
            >
              <div style={styles.featureIcon}>
                🎯
              </div>

              <h3 style={styles.cardTitle}>
                ATS Analysis
              </h3>

              <p style={styles.cardText}>
                Analyze your resume and identify sections,
                keywords and skills that can be improved.
              </p>

              <div style={styles.featureLink}>
                Check your resume →
              </div>
            </div>

            <div
              style={styles.featureCard}
              className="feature-card"
            >
              <div style={styles.featureIcon}>
                ☁️
              </div>

              <h3 style={styles.cardTitle}>
                Save Your Resumes
              </h3>

              <p style={styles.cardText}>
                Keep multiple resumes in your dashboard and
                continue editing whenever you need.
              </p>

              <div style={styles.featureLink}>
                Manage resumes →
              </div>
            </div>

            <div
              style={styles.featureCard}
              className="feature-card"
            >
              <div style={styles.featureIcon}>
                📄
              </div>

              <h3 style={styles.cardTitle}>
                PDF Export
              </h3>

              <p style={styles.cardText}>
                Turn your finished resume into a clean,
                professional PDF ready for applications.
              </p>

              <div style={styles.featureLink}>
                Export instantly →
              </div>
            </div>

            <div
              style={styles.featureCard}
              className="feature-card"
            >
              <div style={styles.featureIcon}>
                🔐
              </div>

              <h3 style={styles.cardTitle}>
                Secure Accounts
              </h3>

              <p style={styles.cardText}>
                Your resumes are connected to your account,
                keeping your saved work separated and organized.
              </p>

              <div style={styles.featureLink}>
                Create your account →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* HOW IT WORKS */}
      {/* ================================================= */}

      <section
        id="how-it-works"
        style={styles.howSection}
      >
        <div style={styles.sectionContainer}>
          <p style={styles.smallHeading}>
            HOW IT WORKS
          </p>

          <h2
            style={styles.sectionHeading}
            className="section-heading"
          >
            From blank page to
            <br />
            application-ready resume.
          </h2>

          <p style={styles.sectionDescription}>
            No complicated design tools. Just add your
            information and let Resume-X handle the structure.
          </p>

          <div
            style={styles.stepsGrid}
            className="steps-grid"
          >
            <div style={styles.stepCard} className="step-card">
              <div style={styles.stepNumber}>01</div>

              <div style={styles.stepIcon}>👤</div>

              <h3 style={styles.stepTitle}>
                Add Your Details
              </h3>

              <p style={styles.stepText}>
                Enter your education, experience, skills,
                projects and other information.
              </p>
            </div>

            <div style={styles.stepCard} className="step-card">
              <div style={styles.stepNumber}>02</div>

              <div style={styles.stepIcon}>🎨</div>

              <h3 style={styles.stepTitle}>
                Choose a Template
              </h3>

              <p style={styles.stepText}>
                Select a professional design that matches
                your career and personal style.
              </p>
            </div>

            <div style={styles.stepCard} className="step-card">
              <div style={styles.stepNumber}>03</div>

              <div style={styles.stepIcon}>🔍</div>

              <h3 style={styles.stepTitle}>
                Check Your Resume
              </h3>

              <p style={styles.stepText}>
                Use the ATS analyzer to review keywords,
                skills and important resume sections.
              </p>
            </div>

            <div style={styles.stepCard} className="step-card">
              <div style={styles.stepNumber}>04</div>

              <div style={styles.stepIcon}>🚀</div>

              <h3 style={styles.stepTitle}>
                Download & Apply
              </h3>

              <p style={styles.stepText}>
                Export your resume as PDF and start applying
                for internships and jobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* TEMPLATES */}
      {/* ================================================= */}

      <section
        id="templates"
        style={styles.templates}
      >
        <div style={styles.sectionContainer}>
          <p style={styles.smallHeading}>
            RESUME TEMPLATES
          </p>

          <h2
            style={styles.sectionHeading}
            className="section-heading"
          >
            Find a style that
            <br />
            fits your career.
          </h2>

          <p style={styles.sectionDescription}>
            Explore professional templates created for students,
            developers, designers, freshers and professionals.
          </p>

          <div
            style={styles.templateGrid}
            className="template-grid"
          >
            <div
              style={styles.templateBox}
              className="template-box"
            >
              <div style={styles.templatePreview}>
                <div style={styles.templateHeaderLine}></div>
                <div style={styles.templateNameLine}></div>
                <div style={styles.templateBodyLine}></div>
                <div style={styles.templateBodyLine}></div>
                <div style={styles.templateBodyShort}></div>
              </div>

              <h3 style={styles.templateTitle}>
                Modern
              </h3>

              <p style={styles.templateText}>
                Clean and contemporary
              </p>
            </div>

            <div
              style={styles.templateBox}
              className="template-box"
            >
              <div
                style={{
                  ...styles.templatePreview,
                  borderLeft: "5px solid #2563eb",
                }}
              >
                <div style={styles.templateNameLine}></div>
                <div style={styles.templateHeaderLine}></div>
                <div style={styles.templateBodyLine}></div>
                <div style={styles.templateBodyLine}></div>
                <div style={styles.templateBodyShort}></div>
              </div>

              <h3 style={styles.templateTitle}>
                Professional
              </h3>

              <p style={styles.templateText}>
                Corporate and polished
              </p>
            </div>

            <div
              style={styles.templateBox}
              className="template-box"
            >
              <div
                style={{
                  ...styles.templatePreview,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    ...styles.templateNameLine,
                    margin: "0 auto 8px",
                  }}
                ></div>

                <div style={styles.templateHeaderLine}></div>
                <div style={styles.templateBodyLine}></div>
                <div style={styles.templateBodyShort}></div>
              </div>

              <h3 style={styles.templateTitle}>
                Minimal
              </h3>

              <p style={styles.templateText}>
                Simple and elegant
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/templates")}
            style={styles.viewTemplatesButton}
            className="primary-btn"
          >
            View All Templates →
          </button>
        </div>
      </section>

      {/* ================================================= */}
      {/* ATS CTA */}
      {/* ================================================= */}

      <section style={styles.atsSection}>
        <div style={styles.atsCard}>
          <div style={styles.atsCardGlow}></div>

          <div style={styles.atsContent}>
            <div style={styles.atsIconLarge}>
              📊
            </div>

            <div>
              <div style={styles.atsLabel}>
                ATS RESUME ANALYZER
              </div>

              <h2 style={styles.atsHeading}>
                Already have a resume?
                <br />
                Check it before you apply.
              </h2>

              <p style={styles.atsDescription}>
                Upload your PDF resume and get an instant
                analysis of sections, keywords and technical
                skills.
              </p>
            </div>
          </div>

          <button
            onClick={handleATS}
            style={styles.atsCTA}
            className="ats-btn"
          >
            Analyze My Resume →
          </button>
        </div>
      </section>

      {/* ================================================= */}
      {/* ABOUT */}
      {/* ================================================= */}

      <section
        id="about"
        style={styles.about}
      >
        <div style={styles.aboutCard} className="about-card">
          <div style={styles.aboutBadge}>
            ABOUT RESUME-X
          </div>

          <h2
            style={styles.sectionHeading}
            className="section-heading"
          >
            Your resume should represent
            <br />
            your potential.
          </h2>

          <p style={styles.aboutText}>
            Resume-X is a modern resume builder designed to help
            students, freshers and professionals create clean,
            professional and ATS-friendly resumes without
            dealing with complicated formatting.
          </p>

          <p style={styles.aboutText}>
            Build your resume, keep multiple versions,
            analyze your ATS readiness and export your final
            document whenever you are ready to apply.
          </p>

          <button
            onClick={handleCreateResume}
            style={styles.aboutButton}
            className="primary-btn"
          >
            Start Building My Resume →
          </button>
        </div>
      </section>

      {/* ================================================= */}
      {/* FINAL CTA */}
      {/* ================================================= */}

      <section style={styles.finalCTA}>
        <div style={styles.finalCTAContent}>
          <div style={styles.finalBadge}>
            READY TO GET STARTED?
          </div>

          <h2 style={styles.finalHeading}>
            Your next opportunity
            <br />
            starts with your resume.
          </h2>

          <p style={styles.finalText}>
            Create your professional resume with Resume-X today.
          </p>

          <button
            onClick={handleCreateResume}
            style={styles.finalButton}
            className="primary-btn"
          >
            Create My Resume →
          </button>
        </div>
      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer style={styles.footer}>
        <div style={styles.footerTop}>
          <div>
            <div style={styles.footerLogo}>
              <span style={styles.footerLogoMark}>R</span>
              Resume-X
            </div>

            <p style={styles.footerText}>
              Build your resume. Build your career.
            </p>
          </div>

          <div style={styles.footerLinks}>
            <Link
              to="/templates"
              style={styles.footerLink}
              className="footer-link"
            >
              Templates
            </Link>

            <a
              href="#features"
              style={styles.footerLink}
              className="footer-link"
            >
              Features
            </a>

            <a
              href="#about"
              style={styles.footerLink}
              className="footer-link"
            >
              About
            </a>
          </div>
        </div>

        <div style={styles.footerBottom}>
          © {new Date().getFullYear()} Resume-X. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

const styles = {
  /* ================= PAGE ================= */

  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    overflowX: "hidden",
  },

  /* ================= NAVBAR ================= */

  navbar: {
    height: "72px",
    padding: "0 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    background: "rgba(255,255,255,0.94)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    textDecoration: "none",
    color: "#111827",
    fontSize: "24px",
    fontWeight: "850",
    letterSpacing: "-1px",
  },

  logoMark: {
    width: "32px",
    height: "32px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "9px",
    background: "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#ffffff",
    fontSize: "17px",
    fontWeight: "900",
    boxShadow: "0 6px 18px rgba(37,99,235,0.25)",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    marginLeft: "auto",
  },

  navLink: {
    textDecoration: "none",
    color: "#64748b",
    fontSize: "14px",
    fontWeight: "650",
    transition: "0.2s",
  },

  navButton: {
    padding: "11px 19px",
    background: "#111827",
    color: "#ffffff",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "750",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },

  /* ================= HERO ================= */

  hero: {
    minHeight: "680px",
    padding: "90px 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "70px",
    position: "relative",
    overflow: "hidden",
    background:
      "radial-gradient(circle at 15% 20%, rgba(219,234,254,0.75), transparent 34%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
  },

  heroGlow: {
    position: "absolute",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    right: "-180px",
    top: "-180px",
    background: "rgba(99,102,241,0.09)",
    filter: "blur(10px)",
  },

  heroContent: {
    maxWidth: "650px",
    position: "relative",
    zIndex: 2,
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 13px",
    borderRadius: "30px",
    background: "#eff6ff",
    border: "1px solid #dbeafe",
    color: "#1d4ed8",
    fontSize: "12px",
    fontWeight: "750",
    marginBottom: "22px",
  },

  badgeDot: {
    fontSize: "8px",
    color: "#2563eb",
  },

  heroTitle: {
    fontSize: "60px",
    lineHeight: "1.04",
    letterSpacing: "-2.8px",
    margin: "0 0 24px",
    fontWeight: "850",
    color: "#0f172a",
  },

  gradientText: {
    background:
      "linear-gradient(90deg, #2563eb, #4f46e5, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  description: {
    fontSize: "18px",
    lineHeight: "1.75",
    color: "#64748b",
    maxWidth: "600px",
    margin: 0,
  },

  buttons: {
    display: "flex",
    gap: "12px",
    marginTop: "32px",
    flexWrap: "wrap",
    alignItems: "center",
  },

  primaryButton: {
    padding: "15px 22px",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #111827, #1e293b)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "750",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "0.2s",
    boxShadow: "0 8px 22px rgba(15,23,42,0.15)",
  },

  buttonArrow: {
    marginLeft: "9px",
    fontSize: "18px",
  },

  atsHomeButton: {
    padding: "14px 20px",
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "750",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "0.2s",
  },

  secondaryButton: {
    padding: "14px 20px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#334155",
    fontSize: "14px",
    fontWeight: "700",
    textDecoration: "none",
    transition: "0.2s",
  },

  trustRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "24px",
  },

  trustItem: {
    color: "#64748b",
    fontSize: "12px",
    fontWeight: "600",
  },

  check: {
    color: "#16a34a",
    fontWeight: "900",
    marginRight: "5px",
  },

  /* ================= RESUME PREVIEW ================= */

  previewContainer: {
    width: "440px",
    minHeight: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexShrink: 0,
  },

  previewGlow: {
    position: "absolute",
    width: "340px",
    height: "340px",
    borderRadius: "50%",
    background: "rgba(37,99,235,0.13)",
    filter: "blur(50px)",
  },

  resumeCard: {
    width: "325px",
    minHeight: "465px",
    padding: "27px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    boxShadow:
      "0 35px 90px rgba(15,23,42,0.16)",
    transform: "rotate(3deg)",
    position: "relative",
    zIndex: 2,
  },

  resumeTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mockName: {
    fontSize: "17px",
    fontWeight: "850",
    letterSpacing: "-0.5px",
  },

  mockRole: {
    marginTop: "4px",
    fontSize: "9px",
    color: "#2563eb",
    fontWeight: "700",
  },

  mockContact: {
    marginTop: "5px",
    fontSize: "6px",
    color: "#94a3b8",
  },

  profileCircle: {
    width: "43px",
    height: "43px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #dbeafe, #e0e7ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#2563eb",
    fontSize: "10px",
    fontWeight: "800",
  },

  resumeLine: {
    height: "2px",
    background: "#2563eb",
    margin: "17px 0",
  },

  mockSectionTitle: {
    marginTop: "15px",
    marginBottom: "7px",
    fontSize: "8px",
    fontWeight: "850",
    color: "#334155",
    letterSpacing: "1px",
  },

  mockText: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  mockJob: {
    marginBottom: "5px",
  },

  mockJobTitle: {
    fontSize: "8px",
    fontWeight: "750",
    color: "#334155",
  },

  mockSmall: {
    fontSize: "6px",
    color: "#94a3b8",
    marginTop: "3px",
  },

  skillRow: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
  },

  atsMiniBadge: {
    position: "absolute",
    bottom: "18px",
    right: "18px",
    padding: "6px 8px",
    borderRadius: "6px",
    background: "#ecfdf5",
    color: "#15803d",
    fontSize: "7px",
    fontWeight: "800",
  },

  floatingCard: {
    position: "absolute",
    zIndex: 5,
    right: "-10px",
    bottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "9px",
    padding: "11px 14px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "11px",
    boxShadow: "0 15px 40px rgba(15,23,42,0.14)",
  },

  floatingIcon: {
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    background: "#dcfce7",
    color: "#16a34a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    fontSize: "13px",
  },

  floatingTitle: {
    fontSize: "10px",
    fontWeight: "800",
    color: "#111827",
  },

  floatingText: {
    fontSize: "8px",
    color: "#94a3b8",
    marginTop: "2px",
  },

  /* ================= STATS ================= */

  statsSection: {
    padding: "28px 7%",
    background: "#ffffff",
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },

  statsGrid: {
    maxWidth: "1050px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    textAlign: "center",
  },

  statNumber: {
    fontSize: "24px",
    fontWeight: "850",
    color: "#111827",
  },

  statLabel: {
    marginTop: "4px",
    fontSize: "11px",
    color: "#94a3b8",
    fontWeight: "600",
  },

  /* ================= COMMON ================= */

  sectionContainer: {
    maxWidth: "1120px",
    margin: "0 auto",
  },

  smallHeading: {
    color: "#2563eb",
    fontSize: "11px",
    fontWeight: "850",
    letterSpacing: "2px",
    marginBottom: "13px",
  },

  sectionHeading: {
    fontSize: "38px",
    lineHeight: "1.18",
    letterSpacing: "-1.4px",
    margin: 0,
    color: "#111827",
    fontWeight: "820",
  },

  sectionDescription: {
    maxWidth: "620px",
    margin: "16px auto 0",
    color: "#64748b",
    lineHeight: "1.7",
    fontSize: "15px",
  },

  /* ================= FEATURES ================= */

  features: {
    padding: "100px 7%",
    background: "#ffffff",
    textAlign: "center",
  },

  featureGrid: {
    marginTop: "52px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
  },

  featureCard: {
    padding: "27px",
    border: "1px solid #e5e7eb",
    borderRadius: "17px",
    textAlign: "left",
    background: "#ffffff",
    transition: "0.25s",
  },

  featureIcon: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "13px",
    background: "#eff6ff",
    fontSize: "23px",
    marginBottom: "19px",
  },

  cardTitle: {
    margin: "0 0 9px",
    fontSize: "18px",
    fontWeight: "800",
    color: "#111827",
  },

  cardText: {
    margin: 0,
    color: "#64748b",
    lineHeight: "1.65",
    fontSize: "13px",
  },

  featureLink: {
    marginTop: "17px",
    fontSize: "12px",
    color: "#2563eb",
    fontWeight: "750",
  },

  /* ================= HOW IT WORKS ================= */

  howSection: {
    padding: "100px 7%",
    background: "#f8fafc",
    textAlign: "center",
  },

  stepsGrid: {
    marginTop: "50px",
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
  },

  stepCard: {
    position: "relative",
    padding: "28px 22px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "17px",
    textAlign: "left",
    transition: "0.25s",
  },

  stepNumber: {
    fontSize: "11px",
    fontWeight: "850",
    color: "#2563eb",
    letterSpacing: "1px",
  },

  stepIcon: {
    fontSize: "28px",
    margin: "20px 0 15px",
  },

  stepTitle: {
    margin: "0 0 8px",
    fontSize: "16px",
    fontWeight: "800",
  },

  stepText: {
    margin: 0,
    color: "#64748b",
    fontSize: "12px",
    lineHeight: "1.65",
  },

  /* ================= TEMPLATES ================= */

  templates: {
    padding: "100px 7%",
    textAlign: "center",
    background: "#ffffff",
  },

  templateGrid: {
    maxWidth: "850px",
    margin: "50px auto 35px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },

  templateBox: {
    padding: "16px",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    background: "#ffffff",
    textAlign: "left",
    transition: "0.25s",
  },

  templatePreview: {
    height: "190px",
    padding: "22px 17px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    background: "#f8fafc",
  },

  templateHeaderLine: {
    height: "3px",
    width: "35%",
    background: "#2563eb",
    marginBottom: "12px",
    borderRadius: "4px",
  },

  templateNameLine: {
    height: "7px",
    width: "55%",
    background: "#334155",
    marginBottom: "10px",
    borderRadius: "4px",
  },

  templateBodyLine: {
    height: "4px",
    width: "90%",
    background: "#cbd5e1",
    marginBottom: "7px",
    borderRadius: "4px",
  },

  templateBodyShort: {
    height: "4px",
    width: "62%",
    background: "#cbd5e1",
    marginBottom: "7px",
    borderRadius: "4px",
  },

  templateTitle: {
    margin: "16px 0 4px",
    fontSize: "15px",
    fontWeight: "800",
  },

  templateText: {
    margin: 0,
    color: "#94a3b8",
    fontSize: "11px",
  },

  viewTemplatesButton: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "10px",
    background: "#111827",
    color: "#ffffff",
    fontWeight: "750",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "0.2s",
  },

  /* ================= ATS ================= */

  atsSection: {
    padding: "35px 7% 100px",
    background: "#ffffff",
  },

  atsCard: {
    maxWidth: "1120px",
    margin: "0 auto",
    padding: "45px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b 60%, #172554)",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 25px 60px rgba(15,23,42,0.18)",
  },

  atsCardGlow: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    right: "-100px",
    top: "-140px",
    background: "rgba(59,130,246,0.18)",
    filter: "blur(15px)",
  },

  atsContent: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    position: "relative",
    zIndex: 2,
  },

  atsIconLarge: {
    width: "62px",
    height: "62px",
    flexShrink: 0,
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.10)",
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: "27px",
  },

  atsLabel: {
    color: "#93c5fd",
    fontSize: "10px",
    fontWeight: "850",
    letterSpacing: "2px",
    marginBottom: "8px",
  },

  atsHeading: {
    margin: 0,
    fontSize: "29px",
    lineHeight: "1.2",
    letterSpacing: "-0.7px",
  },

  atsDescription: {
    margin: "12px 0 0",
    maxWidth: "580px",
    color: "#cbd5e1",
    fontSize: "13px",
    lineHeight: "1.65",
  },

  atsCTA: {
    position: "relative",
    zIndex: 2,
    flexShrink: 0,
    padding: "14px 19px",
    background: "#ffffff",
    color: "#111827",
    border: "none",
    borderRadius: "10px",
    fontSize: "13px",
    fontWeight: "800",
    cursor: "pointer",
    transition: "0.2s",
  },

  /* ================= ABOUT ================= */

  about: {
    padding: "100px 7%",
    background: "#f8fafc",
    textAlign: "center",
  },

  aboutCard: {
    maxWidth: "850px",
    margin: "0 auto",
    padding: "55px 45px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "22px",
    boxShadow: "0 20px 50px rgba(15,23,42,0.06)",
  },

  aboutBadge: {
    display: "inline-block",
    marginBottom: "15px",
    color: "#2563eb",
    fontSize: "10px",
    fontWeight: "850",
    letterSpacing: "2px",
  },

  aboutText: {
    maxWidth: "650px",
    margin: "17px auto 0",
    color: "#64748b",
    lineHeight: "1.75",
    fontSize: "14px",
  },

  aboutButton: {
    marginTop: "28px",
    padding: "14px 22px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "750",
    cursor: "pointer",
    fontFamily: "inherit",
    transition: "0.2s",
  },

  /* ================= FINAL CTA ================= */

  finalCTA: {
    padding: "100px 7%",
    textAlign: "center",
    background:
      "linear-gradient(180deg, #ffffff 0%, #eff6ff 100%)",
  },

  finalCTAContent: {
    maxWidth: "700px",
    margin: "0 auto",
  },

  finalBadge: {
    color: "#2563eb",
    fontSize: "10px",
    fontWeight: "850",
    letterSpacing: "2px",
    marginBottom: "13px",
  },

  finalHeading: {
    margin: 0,
    fontSize: "42px",
    lineHeight: "1.15",
    letterSpacing: "-1.5px",
    fontWeight: "850",
    color: "#111827",
  },

  finalText: {
    color: "#64748b",
    fontSize: "14px",
    margin: "15px 0 25px",
  },

  finalButton: {
    padding: "15px 24px",
    background:
      "linear-gradient(135deg, #2563eb, #4f46e5)",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "800",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 10px 25px rgba(37,99,235,0.25)",
    transition: "0.2s",
  },

  /* ================= FOOTER ================= */

  footer: {
    padding: "42px 7% 20px",
    background: "#0f172a",
    color: "#ffffff",
  },

  footerTop: {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
  },

  footerLogo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "21px",
    fontWeight: "850",
  },

  footerLogoMark: {
    width: "27px",
    height: "27px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "7px",
    background: "#2563eb",
    fontSize: "14px",
  },

  footerText: {
    color: "#94a3b8",
    fontSize: "12px",
    marginTop: "8px",
  },

  footerLinks: {
    display: "flex",
    gap: "24px",
  },

  footerLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "600",
    transition: "0.2s",
  },

  footerBottom: {
    maxWidth: "1120px",
    margin: "35px auto 0",
    paddingTop: "18px",
    borderTop: "1px solid #1e293b",
    color: "#64748b",
    fontSize: "10px",
    textAlign: "center",
  },
};

export default Home;