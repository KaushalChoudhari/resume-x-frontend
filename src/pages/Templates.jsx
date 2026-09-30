import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Templates() {
  const navigate = useNavigate();

  /* =========================================================
     SELECTED TEMPLATE
  ========================================================= */

  const [selectedTemplate, setSelectedTemplate] = useState(
    localStorage.getItem("selectedTemplate") || "modern"
  );

  /* =========================================================
     TEMPLATE DATA
  ========================================================= */

  const templates = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean, modern and professional design.",
      accent: "#2563eb",
      type: "modern",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Traditional layout suitable for corporate jobs.",
      accent: "#111827",
      type: "professional",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple ATS-friendly design with less distraction.",
      accent: "#374151",
      type: "minimal",
    },
    {
      id: "executive",
      name: "Executive",
      description:
        "Premium corporate design for experienced professionals.",
      accent: "#7c3aed",
      type: "executive",
    },
    {
      id: "creative",
      name: "Creative",
      description:
        "Modern visual style for creative and design roles.",
      accent: "#db2777",
      type: "creative",
    },
    {
      id: "tech",
      name: "Tech",
      description:
        "Developer-focused layout for software and IT careers.",
      accent: "#059669",
      type: "tech",
    },
    {
      id: "classic",
      name: "Classic",
      description:
        "Timeless resume layout suitable for any industry.",
      accent: "#1f2937",
      type: "classic",
    },
    {
      id: "elegant",
      name: "Elegant",
      description:
        "Stylish and balanced design with a premium feel.",
      accent: "#b45309",
      type: "elegant",
    },
    {
      id: "twocolumn",
      name: "Two Column",
      description:
        "Compact two-column layout for maximum information.",
      accent: "#0f766e",
      type: "twocolumn",
    },
    {
      id: "compact",
      name: "Compact",
      description:
        "Space-efficient one-page resume for freshers.",
      accent: "#dc2626",
      type: "compact",
    },
  ];

  /* =========================================================
     GO HOME
  ========================================================= */

  const goHome = () => {
    navigate("/");
  };

  /* =========================================================
     GO DASHBOARD
  ========================================================= */

  const goDashboard = () => {
    navigate("/dashboard");
  };

  /* =========================================================
     SELECT TEMPLATE
  ========================================================= */

  const selectTemplate = (id) => {
    const token = localStorage.getItem("token");

    /*
     * Always remember the selected template.
     * This is especially important when the user selects
     * a template before login.
     */
    setSelectedTemplate(id);

    localStorage.setItem(
      "selectedTemplate",
      id
    );

    /*
     * =======================================================
     * CHANGE TEMPLATE MODE
     * =======================================================
     *
     * This flag is set when an existing resume wants to
     * change its template.
     *
     * Flow:
     *
     * Dashboard / Preview
     *        ↓
     * Change Template
     *        ↓
     * Templates
     *        ↓
     * Select
     *        ↓
     * Preview
     *
     * NO builder pages again.
     */

    const isChangingTemplate =
      localStorage.getItem(
        "templateChangeMode"
      ) === "true";

    if (isChangingTemplate) {

      if (!token) {

        alert(
          "Aapko template change karne ke liye login karna zaroori hai."
        );

        /*
         * Keep the selected template so that
         * the choice is not lost.
         */
        navigate("/login");

        return;
      }

      /*
       * The actual current resume template will be
       * updated by Preview / Templates flow.
       *
       * We use an event so ResumeContext can be listened
       * to later if required.
       */
      window.dispatchEvent(
        new CustomEvent(
          "templateSelected",
          {
            detail: {
              templateId: id,
              mode: "change",
            },
          }
        )
      );

      /*
       * Keep the flag.
       *
       * Preview will clear it after successful handling.
       */
      navigate("/preview");

      return;
    }

    /*
     * =======================================================
     * NEW RESUME MODE
     * =======================================================
     */

    /*
     * User is not logged in.
     *
     * Template is already stored in localStorage.
     */
    if (!token) {

      alert(
        "Aapko ye template use karne ke liye login karna zaroori hai.\n\n" +
          "Agar aapne abhi tak account nahi banaya hai, " +
          "toh pehle Register karein, fir Login karein."
      );

      /*
       * Remember that the user came here to create
       * a new resume.
       */
      localStorage.setItem(
        "resumeFlow",
        "new"
      );

      navigate("/login");

      return;
    }

    /*
     * User is already logged in.
     *
     * Go to Personal Details.
     */
    localStorage.setItem(
      "resumeFlow",
      "new"
    );
  window.dispatchEvent(new Event("templateChanged"));
  navigate("/preview");
  };

  /* =========================================================
     CONTINUE BUTTON
  ========================================================= */

  const continueToResume = () => {
    const token = localStorage.getItem("token");

    const isChangingTemplate =
      localStorage.getItem(
        "templateChangeMode"
      ) === "true";

    /*
     * Existing resume template-change flow
     */
    if (isChangingTemplate) {

      if (!token) {

        alert(
          "Aapko template change karne ke liye login karna zaroori hai."
        );

        navigate("/login");

        return;
      }

      navigate("/preview");

      return;
    }

    /*
     * New resume flow
     */
    if (!token) {

      alert(
        "Resume create karne ke liye login karna zaroori hai.\n\n" +
          "Agar aapne abhi tak account nahi banaya hai, " +
          "toh pehle Register karein, fir Login karein."
      );

      localStorage.setItem(
        "resumeFlow",
        "new"
      );

      navigate("/login");

      return;
    }

    localStorage.setItem(
      "resumeFlow",
      "new"
    );

    navigate("/create-resume");
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div style={styles.page}>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div style={styles.header}>

        <button
          onClick={goHome}
          style={styles.backButton}
        >
          ← Home
        </button>

        <div style={styles.headerCenter}>

          <h1 style={styles.heading}>
            Choose Your Template
          </h1>

          <p style={styles.subtitle}>
            Select a professional design for your resume.
          </p>

        </div>

        <div style={styles.headerRight}>

          {localStorage.getItem("token") && (
            <button
              onClick={goDashboard}
              style={styles.dashboardButton}
            >
              Dashboard
            </button>
          )}

        </div>

      </div>

      {/* =====================================================
          CHANGE TEMPLATE NOTICE
      ===================================================== */}

      {localStorage.getItem("templateChangeMode") === "true" && (
        <div style={styles.changeNotice}>

          <strong>
            Change Resume Template
          </strong>

          <span>
            Your personal details, education, experience,
            skills and projects will remain unchanged.
          </span>

        </div>
      )}

      {/* =====================================================
          TEMPLATE GRID
      ===================================================== */}

      <div style={styles.grid}>

        {templates.map((template) => (

          <div
            key={template.id}
            style={{
              ...styles.templateCard,

              border:
                selectedTemplate === template.id
                  ? `2px solid ${template.accent}`
                  : "1px solid #e5e7eb",
            }}
          >

            {/* =================================================
                TEMPLATE PREVIEW
            ================================================= */}

            <div
              style={{
                ...styles.preview,
                borderTop:
                  `6px solid ${template.accent}`,
              }}
            >

              {template.type === "modern" && (
                <ModernPreview
                  template={template}
                />
              )}

              {template.type === "professional" && (
                <ProfessionalPreview
                  template={template}
                />
              )}

              {template.type === "minimal" && (
                <MinimalPreview
                  template={template}
                />
              )}

              {template.type === "executive" && (
                <ExecutivePreview
                  template={template}
                />
              )}

              {template.type === "creative" && (
                <CreativePreview
                  template={template}
                />
              )}

              {template.type === "tech" && (
                <TechPreview
                  template={template}
                />
              )}

              {template.type === "classic" && (
                <ClassicPreview
                  template={template}
                />
              )}

              {template.type === "elegant" && (
                <ElegantPreview
                  template={template}
                />
              )}

              {template.type === "twocolumn" && (
                <TwoColumnPreview
                  template={template}
                />
              )}

              {template.type === "compact" && (
                <CompactPreview
                  template={template}
                />
              )}

            </div>

            {/* =================================================
                TEMPLATE INFORMATION
            ================================================= */}

            <div style={styles.info}>

              <div>

                <h2 style={styles.templateName}>
                  {template.name}
                </h2>

                <p style={styles.description}>
                  {template.description}
                </p>

              </div>

              <button
                onClick={() =>
                  selectTemplate(template.id)
                }
                style={{
                  ...styles.selectButton,

                  background:
                    selectedTemplate === template.id
                      ? template.accent
                      : "#ffffff",

                  color:
                    selectedTemplate === template.id
                      ? "#ffffff"
                      : "#111827",

                  border:
                    selectedTemplate === template.id
                      ? "none"
                      : "1px solid #d1d5db",
                }}
              >

                {selectedTemplate === template.id
                  ? "✓ Selected"
                  : "Select Template"}

              </button>

            </div>

          </div>

        ))}

      </div>

      {/* =====================================================
          BOTTOM ACTION
      ===================================================== */}

      <div style={styles.bottom}>

        <div>

          <p style={styles.selectedText}>

            Selected Template:{" "}

            <strong>
              {
                templates.find(
                  (item) =>
                    item.id === selectedTemplate
                )?.name
              }
            </strong>

          </p>

          {localStorage.getItem("templateChangeMode") === "true" ? (
            <p style={styles.bottomHint}>
              Your existing resume data will be preserved.
            </p>
          ) : (
            <p style={styles.bottomHint}>
              Select a template and start building your resume.
            </p>
          )}

        </div>

        <button
          onClick={continueToResume}
          style={styles.continueButton}
        >

          {localStorage.getItem("templateChangeMode") === "true"
            ? "Use This Template →"
            : "Continue to Resume →"}

        </button>

      </div>

    </div>
  );
}


/* =========================================================
   REUSABLE PREVIEW ELEMENT
========================================================= */

function Lines({ count = 3 }) {
  return (
    <div>
      {Array.from({ length: count }).map(
        (_, index) => (
          <div
            key={index}
            style={{
              ...styles.line,
              width:
                index === count - 1
                  ? "65%"
                  : "100%",
            }}
          />
        )
      )}
    </div>
  );
}


/* =========================================================
   1. MODERN
========================================================= */

function ModernPreview({ template }) {
  return (
    <>
      <div style={styles.modernHeader}>

        <div>

          <div style={styles.bigName}>
            YOUR NAME
          </div>

          <div style={styles.role}>
            Software Developer
          </div>

        </div>

        <div
          style={{
            ...styles.profileCircle,
            border:
              `3px solid ${template.accent}`,
          }}
        />

      </div>

      <div
        style={{
          ...styles.accentLine,
          background: template.accent,
        }}
      />

      <Section title="PROFILE" />
      <Lines count={3} />

      <Section title="EXPERIENCE" />
      <Lines count={3} />

      <Section title="EDUCATION" />
      <Lines count={1} />

      <Section title="SKILLS" />

      <div style={styles.skills}>

        <span style={styles.skillTag}>
          Java
        </span>

        <span style={styles.skillTag}>
          React
        </span>

        <span style={styles.skillTag}>
          SQL
        </span>

      </div>
    </>
  );
}


/* =========================================================
   2. PROFESSIONAL
========================================================= */

function ProfessionalPreview({ template }) {
  return (
    <>
      <div style={styles.centerHeader}>

        <div style={styles.bigName}>
          YOUR NAME
        </div>

        <div style={styles.role}>
          SOFTWARE ENGINEER
        </div>

        <div style={styles.contact}>
          email@example.com • +91 98765 43210
        </div>

      </div>

      <div
        style={{
          ...styles.thickLine,
          background: template.accent,
        }}
      />

      <Section title="PROFESSIONAL SUMMARY" />
      <Lines count={3} />

      <Section title="WORK EXPERIENCE" />
      <Lines count={4} />

      <Section title="EDUCATION" />
      <Lines count={2} />

      <Section title="TECHNICAL SKILLS" />
      <Lines count={1} />
    </>
  );
}


/* =========================================================
   3. MINIMAL
========================================================= */

function MinimalPreview() {
  return (
    <div style={styles.minimalPreview}>

      <div style={styles.minimalName}>
        YOUR NAME
      </div>

      <div style={styles.role}>
        Software Developer
      </div>

      <div style={styles.minimalContact}>
        Nagpur, Maharashtra | email@example.com
      </div>

      <Section title="SUMMARY" />
      <Lines count={2} />

      <Section title="EXPERIENCE" />
      <Lines count={3} />

      <Section title="EDUCATION" />
      <Lines count={2} />

      <Section title="SKILLS" />
      <Lines count={1} />

    </div>
  );
}


/* =========================================================
   4. EXECUTIVE
========================================================= */

function ExecutivePreview({ template }) {
  return (
    <>
      <div
        style={{
          background: template.accent,
          color: "white",
          padding: "18px",
          margin: "-25px -25px 18px",
        }}
      >

        <div style={styles.executiveName}>
          YOUR NAME
        </div>

        <div style={styles.executiveRole}>
          SENIOR SOFTWARE ENGINEER
        </div>

      </div>

      <Section title="EXECUTIVE PROFILE" />
      <Lines count={3} />

      <Section title="CORE COMPETENCIES" />
      <Lines count={2} />

      <Section title="PROFESSIONAL EXPERIENCE" />
      <Lines count={4} />

      <Section title="EDUCATION" />
      <Lines count={1} />

    </>
  );
}


/* =========================================================
   5. CREATIVE
========================================================= */

function CreativePreview({ template }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        height: "100%",
      }}
    >

      <div
        style={{
          width: "28%",
          background: template.accent,
          borderRadius: "6px",
          padding: "12px 8px",
          color: "white",
          boxSizing: "border-box",
        }}
      >

        <div style={styles.creativeCircle}></div>

        <div style={styles.sideTitle}>
          CONTACT
        </div>

        <div style={styles.sideLine}></div>
        <div style={styles.sideLine}></div>

        <div style={styles.sideTitle}>
          SKILLS
        </div>

        <div style={styles.sideLine}></div>
        <div style={styles.sideLine}></div>
        <div style={styles.sideLine}></div>

      </div>

      <div style={{ flex: 1 }}>

        <div style={styles.bigName}>
          YOUR NAME
        </div>

        <div style={styles.role}>
          CREATIVE DEVELOPER
        </div>

        <Section title="PROFILE" />
        <Lines count={3} />

        <Section title="EXPERIENCE" />
        <Lines count={4} />

        <Section title="EDUCATION" />
        <Lines count={2} />

      </div>

    </div>
  );
}


/* =========================================================
   6. TECH
========================================================= */

function TechPreview({ template }) {
  return (
    <>
      <div
        style={{
          fontFamily: "monospace",
          color: template.accent,
          fontSize: "9px",
          marginBottom: "10px",
        }}
      >
        &lt;resume /&gt;
      </div>

      <div style={styles.bigName}>
        YOUR NAME
      </div>

      <div
        style={{
          ...styles.role,
          fontFamily: "monospace",
        }}
      >
        Full Stack Developer
      </div>

      <Section title="// ABOUT_ME" />
      <Lines count={3} />

      <Section title="// EXPERIENCE" />
      <Lines count={4} />

      <Section title="// PROJECTS" />
      <Lines count={3} />

      <Section title="// TECH_STACK" />

      <div style={styles.techTags}>

        <span>Java</span>
        <span>Spring</span>
        <span>React</span>
        <span>SQL</span>

      </div>

    </>
  );
}


/* =========================================================
   7. CLASSIC
========================================================= */

function ClassicPreview({ template }) {
  return (
    <>
      <div style={styles.classicHeader}>

        <div style={styles.classicName}>
          YOUR NAME
        </div>

        <div style={styles.classicContact}>
          email@example.com | +91 98765 43210
        </div>

      </div>

      <div
        style={{
          ...styles.classicLine,
          background: template.accent,
        }}
      />

      <Section title="OBJECTIVE" />
      <Lines count={2} />

      <Section title="EXPERIENCE" />
      <Lines count={4} />

      <Section title="EDUCATION" />
      <Lines count={2} />

      <Section title="SKILLS" />
      <Lines count={2} />

    </>
  );
}


/* =========================================================
   8. ELEGANT
========================================================= */

function ElegantPreview({ template }) {
  return (
    <>
      <div style={styles.elegantHeader}>

        <div
          style={{
            ...styles.elegantInitial,
            color: template.accent,
          }}
        >
          Y
        </div>

        <div>

          <div style={styles.elegantName}>
            YOUR NAME
          </div>

          <div style={styles.role}>
            SOFTWARE PROFESSIONAL
          </div>

        </div>

      </div>

      <Section title="ABOUT ME" />
      <Lines count={3} />

      <Section title="EXPERIENCE" />
      <Lines count={4} />

      <Section title="EDUCATION" />
      <Lines count={2} />

      <Section title="EXPERTISE" />
      <Lines count={1} />

    </>
  );
}


/* =========================================================
   9. TWO COLUMN
========================================================= */

function TwoColumnPreview({ template }) {
  return (
    <div style={styles.twoColumn}>

      <div
        style={{
          width: "32%",
          borderRight:
            `2px solid ${template.accent}`,
          paddingRight: "10px",
          boxSizing: "border-box",
        }}
      >

        <div style={styles.smallName}>
          YOUR
          <br />
          NAME
        </div>

        <Section title="CONTACT" />
        <Lines count={2} />

        <Section title="SKILLS" />
        <Lines count={4} />

        <Section title="LANGUAGES" />
        <Lines count={2} />

      </div>

      <div
        style={{
          flex: 1,
          paddingLeft: "12px",
        }}
      >

        <div style={styles.role}>
          SOFTWARE DEVELOPER
        </div>

        <Section title="PROFILE" />
        <Lines count={3} />

        <Section title="EXPERIENCE" />
        <Lines count={5} />

        <Section title="EDUCATION" />
        <Lines count={2} />

      </div>

    </div>
  );
}


/* =========================================================
   10. COMPACT
========================================================= */

function CompactPreview({ template }) {
  return (
    <>
      <div style={styles.compactHeader}>

        <div style={styles.compactName}>
          YOUR NAME
        </div>

        <div style={styles.role}>
          SOFTWARE DEVELOPER
        </div>

      </div>

      <div
        style={{
          height: "2px",
          background: template.accent,
          margin: "8px 0",
        }}
      />

      <Section title="SUMMARY" />
      <Lines count={2} />

      <Section title="EXPERIENCE" />
      <Lines count={3} />

      <Section title="PROJECTS" />
      <Lines count={3} />

      <Section title="EDUCATION" />
      <Lines count={2} />

      <Section title="SKILLS" />
      <Lines count={1} />

    </>
  );
}


/* =========================================================
   COMMON SECTION
========================================================= */

function Section({ title }) {
  return (
    <div style={styles.section}>
      {title}
    </div>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "50px 7%",
    boxSizing: "border-box",
    fontFamily: "Arial, Helvetica, sans-serif",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "35px",
    gap: "20px",
  },

  headerCenter: {
    flex: 1,
  },

  headerRight: {
    width: "100px",
    display: "flex",
    justifyContent: "flex-end",
  },

  backButton: {
    padding: "10px 16px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#374151",
    whiteSpace: "nowrap",
  },

  dashboardButton: {
    padding: "10px 16px",
    background: "#111827",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#ffffff",
    whiteSpace: "nowrap",
  },

  heading: {
    margin: 0,
    textAlign: "center",
    fontSize: "38px",
    color: "#111827",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    marginTop: "10px",
  },

  changeNotice: {
    maxWidth: "1200px",
    margin: "0 auto 30px",
    padding: "15px 20px",
    background: "#eff6ff",
    border: "1px solid #bfdbfe",
    borderRadius: "10px",
    color: "#1e40af",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    fontSize: "14px",
  },

  grid: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
    gap: "28px",
  },

  templateCard: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "18px",
    boxShadow:
      "0 8px 30px rgba(15,23,42,0.07)",
    transition: "0.2s",
    boxSizing: "border-box",
  },

  preview: {
    height: "420px",
    background: "#ffffff",
    borderRadius: "8px",
    padding: "25px",
    boxSizing: "border-box",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  modernHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bigName: {
    fontSize: "20px",
    fontWeight: "800",
    color: "#111827",
  },

  role: {
    fontSize: "10px",
    color: "#64748b",
    marginTop: "5px",
  },

  profileCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "#e2e8f0",
    boxSizing: "border-box",
  },

  accentLine: {
    height: "2px",
    margin: "18px 0",
  },

  section: {
    fontSize: "9px",
    fontWeight: "800",
    marginTop: "16px",
    marginBottom: "7px",
    color: "#374151",
    letterSpacing: "0.5px",
  },

  line: {
    height: "4px",
    background: "#e5e7eb",
    borderRadius: "5px",
    marginBottom: "5px",
  },

  skills: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
  },

  skillTag: {
    fontSize: "8px",
    background: "#f1f5f9",
    padding: "4px 7px",
    borderRadius: "4px",
  },

  info: {
    padding: "20px 5px 5px",
  },

  templateName: {
    margin: 0,
    fontSize: "22px",
    color: "#111827",
  },

  description: {
    color: "#64748b",
    fontSize: "14px",
    lineHeight: "1.5",
    minHeight: "42px",
  },

  selectButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxSizing: "border-box",
  },

  bottom: {
    maxWidth: "1200px",
    margin: "45px auto 0",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.05)",
    boxSizing: "border-box",
  },

  selectedText: {
    margin: 0,
    color: "#475569",
  },

  bottomHint: {
    margin: "6px 0 0",
    color: "#94a3b8",
    fontSize: "13px",
  },

  continueButton: {
    padding: "13px 22px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  centerHeader: {
    textAlign: "center",
  },

  contact: {
    fontSize: "7px",
    color: "#94a3b8",
    marginTop: "6px",
  },

  thickLine: {
    height: "3px",
    margin: "12px 0",
  },

  minimalPreview: {
    paddingTop: "5px",
  },

  minimalName: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
  },

  minimalContact: {
    fontSize: "7px",
    color: "#94a3b8",
    marginTop: "8px",
  },

  executiveName: {
    fontSize: "19px",
    fontWeight: "800",
  },

  executiveRole: {
    fontSize: "8px",
    marginTop: "5px",
    opacity: 0.85,
  },

  creativeCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background:
      "rgba(255,255,255,0.3)",
    margin: "0 auto 18px",
  },

  sideTitle: {
    fontSize: "7px",
    fontWeight: "800",
    marginTop: "15px",
    marginBottom: "7px",
  },

  sideLine: {
    height: "3px",
    background:
      "rgba(255,255,255,0.45)",
    marginBottom: "5px",
    borderRadius: "5px",
  },

  techTags: {
    display: "flex",
    gap: "5px",
    flexWrap: "wrap",
    fontFamily: "monospace",
    fontSize: "8px",
  },

  classicHeader: {
    textAlign: "center",
  },

  classicName: {
    fontSize: "21px",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  classicContact: {
    fontSize: "7px",
    color: "#64748b",
    marginTop: "5px",
  },

  classicLine: {
    height: "1px",
    margin: "10px 0",
  },

  elegantHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  elegantInitial: {
    fontSize: "35px",
    fontWeight: "300",
    fontFamily:
      "Georgia, serif",
  },

  elegantName: {
    fontSize: "19px",
    fontWeight: "700",
    letterSpacing: "1px",
  },

  twoColumn: {
    display: "flex",
    height: "100%",
  },

  smallName: {
    fontSize: "16px",
    fontWeight: "800",
    lineHeight: "1.1",
  },

  compactHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
  },

  compactName: {
    fontSize: "19px",
    fontWeight: "800",
  },

};

export default Templates;
