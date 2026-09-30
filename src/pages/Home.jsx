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

  return (
    <div style={styles.page}>

      {/* ================= NAVBAR ================= */}

      <nav style={styles.navbar}>

        <Link to="/" style={styles.logo}>
          Resume-X
        </Link>

        <div style={styles.navLinks}>

          <a
            href="#features"
            style={styles.navLink}
          >
            Features
          </a>

          <Link
            to="/templates"
            style={styles.navLink}
          >
            Templates
          </Link>

          <a
            href="#about"
            style={styles.navLink}
          >
            About
          </a>

        </div>

        <button
          onClick={handleCreateResume}
          style={styles.navButton}
        >
          Create Resume
        </button>

      </nav>


      {/* ================= HERO ================= */}

      <section style={styles.hero}>

        <div style={styles.heroContent}>

          <div style={styles.badge}>
            ✨ Build your career with confidence
          </div>

          <h1 style={styles.heading}>

            Create a Resume That

            <span style={styles.highlight}>
              Gets Noticed.
            </span>

          </h1>

          <p style={styles.description}>
            Create a professional, modern and ATS-friendly resume
            in minutes. Add your details, choose your style and
            get ready to apply for your dream job.
          </p>


          <div style={styles.buttons}>

            <button
              onClick={handleCreateResume}
              style={styles.primaryButton}
            >
              Create My Resume →
            </button>

            <button
            onClick={() => navigate("/ats-upload")}
            style={styles.atsHomeButton}
          >
            📊 ATS Resume Analyzer
          </button>


            <Link
              to="/templates"
              style={styles.secondaryButton}
            >
              Explore Templates
            </Link>

          </div>


          <div style={styles.note}>
            ✓ Free to create &nbsp;&nbsp;
            ✓ Easy to use &nbsp;&nbsp;
            ✓ ATS Friendly
          </div>

        </div>


        {/* ================= RESUME PREVIEW ================= */}

        <div style={styles.previewContainer}>

          <div style={styles.resumeCard}>

            <div style={styles.resumeHeader}>

              <div>

                <div style={styles.name}>
                  YOUR NAME
                </div>

                <div style={styles.role}>
                  Software Developer
                </div>

              </div>


              <div style={styles.profileCircle}></div>

            </div>


            <div style={styles.line}></div>


            <div style={styles.sectionTitle}>
              PROFILE
            </div>

            <div style={styles.textLine}></div>
            <div style={styles.textLine}></div>
            <div style={styles.textLineShort}></div>


            <div style={styles.sectionTitle}>
              EXPERIENCE
            </div>

            <div style={styles.textLine}></div>
            <div style={styles.textLine}></div>
            <div style={styles.textLineShort}></div>


            <div style={styles.sectionTitle}>
              EDUCATION
            </div>

            <div style={styles.textLine}></div>
            <div style={styles.textLineShort}></div>


            <div style={styles.sectionTitle}>
              SKILLS
            </div>


            <div style={styles.skillRow}>

              <span>
                Java
              </span>

              <span>
                React
              </span>

              <span>
                SQL
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="features"
        style={styles.features}
      >

        <div style={styles.sectionContainer}>

          <p style={styles.smallHeading}>
            FEATURES
          </p>


          <h2 style={styles.sectionHeading}>

            Everything you need to build

            <br />

            a great resume

          </h2>


          <p style={styles.sectionDescription}>
            Resume-X makes resume creation simple, fast and
            professional.
          </p>


          <div style={styles.featureGrid}>


            {/* FEATURE 1 */}

            <div style={styles.featureCard}>

              <div style={styles.icon}>
                ⚡
              </div>

              <h3 style={styles.cardTitle}>
                Fast & Easy
              </h3>

              <p style={styles.cardText}>
                Create your resume without wasting hours
                on formatting and designing.
              </p>

            </div>


            {/* FEATURE 2 */}

            <div style={styles.featureCard}>

              <div style={styles.icon}>
                📄
              </div>

              <h3 style={styles.cardTitle}>
                Professional Templates
              </h3>

              <p style={styles.cardText}>
                Choose clean and modern designs that
                make your resume stand out.
              </p>

            </div>


            {/* FEATURE 3 */}

            <div style={styles.featureCard}>

              <div style={styles.icon}>
                🎯
              </div>

              <h3 style={styles.cardTitle}>
                ATS Friendly
              </h3>

              <p style={styles.cardText}>
                Build resumes designed to work well with
                Applicant Tracking Systems.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= TEMPLATES ================= */}

      <section
        id="templates"
        style={styles.templates}
      >

        <p style={styles.smallHeading}>
          TEMPLATES
        </p>


        <h2 style={styles.sectionHeading}>
          Choose your resume style
        </h2>


        <p style={styles.sectionDescription}>
          Choose from multiple professional resume
          templates designed for different careers.
        </p>

      </section>


      {/* ================= ABOUT ================= */}

      <section
        id="about"
        style={styles.about}
      >

        <h2 style={styles.sectionHeading}>
          About Resume-X
        </h2>


        <p style={styles.aboutText}>

          Resume-X is a modern resume builder designed to help
          students, freshers and professionals create clean,
          professional and ATS-friendly resumes quickly.

        </p>


        <button
          onClick={handleCreateResume}
          style={styles.aboutButton}
        >
          Start Building →
        </button>

      </section>


      {/* ================= FOOTER ================= */}

      <footer style={styles.footer}>

        <div style={styles.footerLogo}>
          Resume-X
        </div>


        <p style={styles.footerText}>
          Build your resume. Build your career.
        </p>

      </footer>

    </div>
  );
}


/* ================================================= */
/* ===================== STYLES ==================== */
/* ================================================= */

const styles = {

atsHomeButton: {
  padding: "13px 22px",
  background: "#111827",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "700",
  cursor: "pointer",
  marginLeft: "10px",
},



  /* ================= PAGE ================= */

  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#0f172a",
    fontFamily: "Arial, Helvetica, sans-serif",
  },


  /* ================= NAVBAR ================= */

  navbar: {
    minHeight: "72px",
    padding: "0 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "30px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxSizing: "border-box",
  },


  logo: {
    textDecoration: "none",
    color: "#111827",
    fontSize: "25px",
    fontWeight: "800",
    letterSpacing: "-1px",
  },


  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    marginLeft: "auto",
  },


  navLink: {
    textDecoration: "none",
    color: "#475569",
    fontSize: "14px",
    fontWeight: "600",
  },


  navButton: {
    padding: "11px 20px",
    background: "#111827",
    color: "#ffffff",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "700",
    whiteSpace: "nowrap",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },


  /* ================= HERO ================= */

  hero: {
    minHeight: "620px",
    padding: "80px 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "70px",
    boxSizing: "border-box",
  },


  heroContent: {
    maxWidth: "620px",
  },


  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "30px",
    background: "#e2e8f0",
    color: "#334155",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "20px",
  },


  heading: {
    fontSize: "58px",
    lineHeight: "1.08",
    letterSpacing: "-2px",
    margin: "0 0 25px 0",
    fontWeight: "800",
  },


  highlight: {
    display: "block",
    color: "#2563eb",
  },


  description: {
    fontSize: "18px",
    lineHeight: "1.7",
    color: "#64748b",
    margin: 0,
  },


  buttons: {
    display: "flex",
    gap: "14px",
    marginTop: "32px",
    flexWrap: "wrap",
  },


  primaryButton: {
    display: "inline-block",
    padding: "15px 24px",
    borderRadius: "9px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "700",
    border: "none",
    cursor: "pointer",
    fontFamily: "inherit",
  },


  secondaryButton: {
    display: "inline-block",
    padding: "14px 24px",
    border: "1px solid #cbd5e1",
    borderRadius: "9px",
    background: "#ffffff",
    color: "#334155",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
  },


  note: {
    marginTop: "20px",
    color: "#64748b",
    fontSize: "13px",
  },


  /* ================= RESUME MOCKUP ================= */

  previewContainer: {
    width: "400px",
    display: "flex",
    justifyContent: "center",
    flexShrink: 0,
  },


  resumeCard: {
    width: "300px",
    minHeight: "430px",
    padding: "28px",
    background: "#ffffff",
    borderRadius: "8px",
    boxShadow:
      "0 25px 70px rgba(15, 23, 42, 0.15)",
    transform: "rotate(3deg)",
    boxSizing: "border-box",
  },


  resumeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },


  name: {
    fontSize: "20px",
    fontWeight: "800",
  },


  role: {
    marginTop: "5px",
    fontSize: "11px",
    color: "#64748b",
  },


  profileCircle: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    background: "#e2e8f0",
  },


  line: {
    height: "2px",
    background: "#0f172a",
    margin: "20px 0",
  },


  sectionTitle: {
    marginTop: "18px",
    marginBottom: "9px",
    fontSize: "10px",
    fontWeight: "800",
    color: "#334155",
  },


  textLine: {
    height: "5px",
    width: "100%",
    marginBottom: "6px",
    background: "#e2e8f0",
    borderRadius: "5px",
  },


  textLineShort: {
    height: "5px",
    width: "65%",
    marginBottom: "6px",
    background: "#e2e8f0",
    borderRadius: "5px",
  },


  skillRow: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    fontSize: "8px",
  },


  /* ================= FEATURES ================= */

  features: {
    padding: "90px 7%",
    background: "#ffffff",
    textAlign: "center",
  },


  sectionContainer: {
    maxWidth: "1100px",
    margin: "0 auto",
  },


  smallHeading: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
    marginBottom: "12px",
  },


  sectionHeading: {
    fontSize: "36px",
    lineHeight: "1.2",
    margin: "0",
    color: "#111827",
  },


  sectionDescription: {
    maxWidth: "600px",
    margin: "15px auto 0",
    color: "#64748b",
    lineHeight: "1.6",
  },


  featureGrid: {
    marginTop: "45px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
  },


  featureCard: {
    padding: "30px",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    textAlign: "left",
    background: "#ffffff",
  },


  icon: {
    fontSize: "30px",
    marginBottom: "15px",
  },


  cardTitle: {
    margin: "0 0 10px 0",
    fontSize: "19px",
  },


  cardText: {
    margin: 0,
    color: "#64748b",
    lineHeight: "1.6",
    fontSize: "14px",
  },


  /* ================= TEMPLATES ================= */

  templates: {
    padding: "90px 7%",
    textAlign: "center",
    background: "#f8fafc",
  },


  /* ================= ABOUT ================= */

  about: {
    padding: "90px 7%",
    textAlign: "center",
    background: "#ffffff",
  },


  aboutText: {
    maxWidth: "650px",
    margin: "20px auto 30px",
    color: "#64748b",
    lineHeight: "1.7",
  },


  aboutButton: {
    display: "inline-block",
    padding: "14px 24px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "inherit",
  },


  /* ================= FOOTER ================= */

  footer: {
    padding: "35px 7%",
    background: "#111827",
    color: "#ffffff",
    textAlign: "center",
  },


  footerLogo: {
    fontSize: "22px",
    fontWeight: "800",
  },


  footerText: {
    color: "#94a3b8",
    fontSize: "13px",
    marginTop: "8px",
  },

};


export default Home;