import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import BackToDashboard from "../components/BackToDashboard";

function Preview() {
  const navigate = useNavigate();
  const { resumeData } = useResume();

  const {
    personal,
    education,
    experience,
    skills,
    projects,
    certifications,
  } = resumeData;

  const [selectedTemplate, setSelectedTemplate] = useState(
    localStorage.getItem("selectedTemplate") || "modern"
  );

  const templates = {
    modern: {
      name: "Modern",
      accent: "#2563eb",
    },

    professional: {
      name: "Professional",
      accent: "#111827",
    },

    minimal: {
      name: "Minimal",
      accent: "#374151",
    },

    executive: {
      name: "Executive",
      accent: "#7c3aed",
    },

    creative: {
      name: "Creative",
      accent: "#db2777",
    },

    tech: {
      name: "Tech",
      accent: "#059669",
    },

    classic: {
      name: "Classic",
      accent: "#1f2937",
    },

    elegant: {
      name: "Elegant",
      accent: "#b45309",
    },

    twocolumn: {
      name: "Two Column",
      accent: "#0f766e",
    },

    compact: {
      name: "Compact",
      accent: "#dc2626",
    },
  };

  const currentTemplate =
    templates[selectedTemplate] || templates.modern;

  const accent = currentTemplate.accent;

  /* ==========================================
     KEEP TEMPLATE UPDATED
  ========================================== */

  useEffect(() => {
    const updateTemplate = () => {
      const template =
        localStorage.getItem("selectedTemplate") || "modern";

      setSelectedTemplate(template);
    };

    window.addEventListener(
      "templateChanged",
      updateTemplate
    );

    window.addEventListener(
      "storage",
      updateTemplate
    );

    return () => {
      window.removeEventListener(
        "templateChanged",
        updateTemplate
      );

      window.removeEventListener(
        "storage",
        updateTemplate
      );
    };
  }, []);

  /* ==========================================
     SAVE AS PDF
  ========================================== */

  const saveAsPDF = () => {
    window.print();
  };

  /* ==========================================
     CHANGE TEMPLATE
  ========================================== */

  const changeTemplate = () => {
    navigate("/templates");
  };

  const analyzeResume = () => {
  navigate("/ats-analyzer");
};

  /* ==========================================
     EDIT RESUME
  ========================================== */

  const editResume = () => {
    navigate("/certifications");
  };

  return (
    <div style={styles.page}>

      {/* ==================================================
          BACK TO DASHBOARD
      ================================================== */}

      <div className="no-print">
        <BackToDashboard />
      </div>


      {/* ==================================================
          TOP TOOLBAR
      ================================================== */}

      <div className="no-print" style={styles.topBar}>

        <button
  onClick={analyzeResume}
  style={styles.atsButton}
>
  📊 Analyze ATS
</button>

        {/* LEFT */}

        <button
          onClick={editResume}
          style={styles.editButton}
        >
          ← Edit Resume
        </button>


        {/* CENTER */}

        <div style={styles.titleContainer}>

          <h2 style={styles.previewTitle}>
            Resume Preview
          </h2>

          <span
            style={{
              ...styles.templateBadge,
              background: `${accent}15`,
              color: accent,
            }}
          >
            {currentTemplate.name}
          </span>

        </div>


        {/* RIGHT */}

        <div style={styles.actions}>

          <button
            onClick={changeTemplate}
            style={styles.changeButton}
          >
            🎨 Change Template
          </button>

          <button
            onClick={saveAsPDF}
            style={{
              ...styles.pdfButton,
              background: accent,
            }}
          >
            ↓ Save as PDF
          </button>

        </div>

      </div>


      {/* ==================================================
          TEMPLATE
      ================================================== */}

      {selectedTemplate === "modern" && (
        <ModernTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "professional" && (
        <ProfessionalTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "minimal" && (
        <MinimalTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "executive" && (
        <ExecutiveTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "creative" && (
        <CreativeTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "tech" && (
        <TechTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "classic" && (
        <ClassicTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "elegant" && (
        <ElegantTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "twocolumn" && (
        <TwoColumnTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {selectedTemplate === "compact" && (
        <CompactTemplate
          personal={personal}
          education={education}
          experience={experience}
          skills={skills}
          projects={projects}
          certifications={certifications}
          accent={accent}
        />
      )}


      {/* ==================================================
          BOTTOM ACTION BAR
      ================================================== */}

      <div className="no-print" style={styles.bottomBar}>

        <div>

          <div style={styles.bottomLabel}>
            CURRENT TEMPLATE
          </div>

          <div style={styles.bottomTemplate}>
            {currentTemplate.name}
          </div>

        </div>

        <div style={styles.bottomActions}>

          <button
            onClick={changeTemplate}
            style={styles.bottomChange}
          >
            Change Template
          </button>

          <button
            onClick={saveAsPDF}
            style={{
              ...styles.bottomPDF,
              background: accent,
            }}
          >
            Save Resume as PDF →
          </button>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   COMMON RESUME PROPS
========================================================= */

function ResumeContent({
  personal,
  education,
  experience,
  skills,
  projects,
  certifications,
  accent,
  tech = false,
}) {
  return (
    <>

      {/* SUMMARY */}

      {personal.summary && (
        <ResumeSection
          title={
            tech
              ? "// SUMMARY"
              : "PROFESSIONAL SUMMARY"
          }
          accent={accent}
        >

          <p style={styles.text}>
            {personal.summary}
          </p>

        </ResumeSection>
      )}


      {/* EXPERIENCE */}

      {experience.length > 0 && (
        <ResumeSection
          title={
            tech
              ? "// EXPERIENCE"
              : "EXPERIENCE"
          }
          accent={accent}
        >

          {experience.map((item, index) => (

            <div
              key={index}
              style={styles.item}
            >

              <div style={styles.itemTop}>

                <strong>
                  {item.jobTitle}
                </strong>

                {item.startDate && (
                  <span>
                    {item.startDate}

                    {item.endDate &&
                      ` - ${item.endDate}`}
                  </span>
                )}

              </div>

              {item.company && (
                <div style={styles.organization}>
                  {item.company}

                  {item.location &&
                    `, ${item.location}`}
                </div>
              )}

              {item.description && (
                <p style={styles.text}>
                  {item.description}
                </p>
              )}

            </div>

          ))}

        </ResumeSection>
      )}


      {/* PROJECTS */}

      {projects.length > 0 && (
        <ResumeSection
          title={
            tech
              ? "// PROJECTS"
              : "PROJECTS"
          }
          accent={accent}
        >

          {projects.map((project, index) => (

            <div
              key={index}
              style={styles.item}
            >

              <div style={styles.itemTop}>
                <strong>
                  {project.name}
                </strong>
              </div>

              {project.technologies && (
                <div style={styles.organization}>
                  Technologies:{" "}
                  {project.technologies}
                </div>
              )}

              {project.description && (
                <p style={styles.text}>
                  {project.description}
                </p>
              )}

              {project.link && (
                <div style={styles.link}>
                  {project.link}
                </div>
              )}

            </div>

          ))}

        </ResumeSection>
      )}


      {/* EDUCATION */}

      {education.length > 0 && (
        <ResumeSection
          title={
            tech
              ? "// EDUCATION"
              : "EDUCATION"
          }
          accent={accent}
        >

          {education.map((item, index) => (

            <div
              key={index}
              style={styles.item}
            >

              <div style={styles.itemTop}>

                <strong>
                  {item.degree}
                </strong>

                {item.startYear && (
                  <span>
                    {item.startYear}

                    {item.endYear &&
                      ` - ${item.endYear}`}
                  </span>
                )}

              </div>

              {item.college && (
                <div style={styles.organization}>
                  {item.college}
                </div>
              )}

              {item.location && (
                <div style={styles.smallText}>
                  {item.location}
                </div>
              )}

              {item.grade && (
                <div style={styles.smallText}>
                  Grade: {item.grade}
                </div>
              )}

            </div>

          ))}

        </ResumeSection>
      )}


      {/* SKILLS */}

      {skills.length > 0 && (
        <ResumeSection
          title={
            tech
              ? "// TECH STACK"
              : "SKILLS"
          }
          accent={accent}
        >

          <div style={styles.skills}>

            {skills.map((skill, index) => (

              <span
                key={index}
                style={{
                  ...styles.skill,
                  borderColor: accent,
                  color: accent,
                }}
              >
                {skill}
              </span>

            ))}

          </div>

        </ResumeSection>
      )}


      {/* CERTIFICATIONS */}

      {certifications.length > 0 && (
        <ResumeSection
          title={
            tech
              ? "// CERTIFICATIONS"
              : "CERTIFICATIONS"
          }
          accent={accent}
        >

          {certifications.map(
            (certification, index) => (

              <div
                key={index}
                style={styles.item}
              >

                <div style={styles.itemTop}>

                  <strong>
                    {certification.name}
                  </strong>

                  {certification.date && (
                    <span>
                      {certification.date}
                    </span>
                  )}

                </div>

                {certification.organization && (
                  <div style={styles.organization}>
                    {certification.organization}
                  </div>
                )}

                {certification.link && (
                  <div style={styles.link}>
                    {certification.link}
                  </div>
                )}

              </div>

            )
          )}

        </ResumeSection>
      )}

    </>
  );
}


/* =========================================================
   MODERN
========================================================= */

function ModernTemplate({
  personal,
  education,
  experience,
  skills,
  projects,
  certifications,
  accent,
}) {
  return (
    <ResumePage
      className="resume-page"
      style={{
        borderTop: `7px solid ${accent}`,
      }}
    >

      <header
        style={{
          ...styles.header,
          borderBottom: `2px solid ${accent}`,
        }}
      >

        <h1 style={styles.name}>
          {personal.fullName || "Your Name"}
        </h1>

        {personal.jobTitle && (
          <p style={styles.jobTitle}>
            {personal.jobTitle}
          </p>
        )}

        <Contact personal={personal} />

      </header>

      <ResumeContent
        personal={personal}
        education={education}
        experience={experience}
        skills={skills}
        projects={projects}
        certifications={certifications}
        accent={accent}
      />

    </ResumePage>
  );
}


/* =========================================================
   PROFESSIONAL
========================================================= */

function ProfessionalTemplate(props) {
  return (
    <ResumePage>

      <div style={styles.professionalHeader}>

        <h1 style={styles.professionalName}>
          {props.personal.fullName ||
            "Your Name"}
        </h1>

        <div style={styles.professionalJob}>
          {props.personal.jobTitle}
        </div>

        <Contact personal={props.personal} />

      </div>

      <ResumeContent {...props} />

    </ResumePage>
  );
}


/* =========================================================
   MINIMAL
========================================================= */

function MinimalTemplate(props) {
  return (
    <ResumePage style={{ padding: "22mm" }}>

      <h1 style={styles.minimalName}>
        {props.personal.fullName ||
          "Your Name"}
      </h1>

      <div style={styles.minimalJob}>
        {props.personal.jobTitle}
      </div>

      <Contact personal={props.personal} />

      <div
        style={{
          height: "1px",
          background: "#d1d5db",
          margin: "18px 0",
        }}
      />

      <ResumeContent {...props} />

    </ResumePage>
  );
}


/* =========================================================
   EXECUTIVE
========================================================= */

function ExecutiveTemplate(props) {
  return (
    <ResumePage>

      <div
        style={{
          background: props.accent,
          color: "#ffffff",
          padding: "25px",
          margin: "-18mm -18mm 25px",
        }}
      >

        <h1 style={styles.executiveName}>
          {props.personal.fullName ||
            "Your Name"}
        </h1>

        <div style={styles.executiveJob}>
          {props.personal.jobTitle}
        </div>

        <Contact
          personal={props.personal}
          light
        />

      </div>

      <ResumeContent {...props} />

    </ResumePage>
  );
}


/* =========================================================
   CREATIVE
========================================================= */

function CreativeTemplate(props) {
  return (
    <ResumePage>

      <div style={styles.creativeLayout}>

        <aside
          style={{
            ...styles.creativeSidebar,
            background: props.accent,
          }}
        >

          <div style={styles.creativeAvatar}>
            {props.personal.fullName
              ? props.personal.fullName
                  .charAt(0)
                  .toUpperCase()
              : "Y"}
          </div>

          <h3 style={styles.sidebarHeading}>
            CONTACT
          </h3>

          <div style={styles.sidebarText}>
            {props.personal.email}
          </div>

          <div style={styles.sidebarText}>
            {props.personal.phone}
          </div>

          <div style={styles.sidebarText}>
            {props.personal.location}
          </div>

          <h3 style={styles.sidebarHeading}>
            SKILLS
          </h3>

          {props.skills.map((skill, index) => (
            <div
              key={index}
              style={styles.sidebarSkill}
            >
              {skill}
            </div>
          ))}

        </aside>

        <main style={styles.creativeMain}>

          <h1 style={styles.creativeName}>
            {props.personal.fullName ||
              "Your Name"}
          </h1>

          <div style={styles.creativeJob}>
            {props.personal.jobTitle}
          </div>

          <ResumeContent
            {...props}
            skills={[]}
          />

        </main>

      </div>

    </ResumePage>
  );
}


/* =========================================================
   TECH
========================================================= */

function TechTemplate(props) {
  return (
    <ResumePage
      style={{
        fontFamily: "Courier New, monospace",
      }}
    >

      <div style={styles.techHeader}>

        <div
          style={{
            ...styles.techSymbol,
            color: props.accent,
          }}
        >
          &lt;/&gt;
        </div>

        <div>

          <h1 style={styles.techName}>
            {props.personal.fullName ||
              "Your Name"}
          </h1>

          <div style={styles.techJob}>
            {props.personal.jobTitle}
          </div>

        </div>

      </div>

      <Contact personal={props.personal} />

      <ResumeContent
        {...props}
        tech
      />

    </ResumePage>
  );
}


/* =========================================================
   CLASSIC
========================================================= */

function ClassicTemplate(props) {
  return (
    <ResumePage>

      <div style={styles.classicHeader}>

        <h1 style={styles.classicName}>
          {props.personal.fullName ||
            "Your Name"}
        </h1>

        <div style={styles.classicJob}>
          {props.personal.jobTitle}
        </div>

        <Contact personal={props.personal} />

      </div>

      <div
        style={{
          height: "1px",
          background: props.accent,
          margin: "15px 0 20px",
        }}
      />

      <ResumeContent {...props} />

    </ResumePage>
  );
}


/* =========================================================
   ELEGANT
========================================================= */

function ElegantTemplate(props) {
  return (
    <ResumePage
      style={{
        fontFamily: "Georgia, serif",
      }}
    >

      <div style={styles.elegantHeader}>

        <div
          style={{
            ...styles.elegantInitial,
            color: props.accent,
          }}
        >
          {props.personal.fullName
            ? props.personal.fullName
                .charAt(0)
                .toUpperCase()
            : "Y"}
        </div>

        <div>

          <h1 style={styles.elegantName}>
            {props.personal.fullName ||
              "Your Name"}
          </h1>

          <div style={styles.elegantJob}>
            {props.personal.jobTitle}
          </div>

        </div>

      </div>

      <Contact personal={props.personal} />

      <ResumeContent {...props} />

    </ResumePage>
  );
}


/* =========================================================
   TWO COLUMN
========================================================= */

function TwoColumnTemplate(props) {
  return (
    <ResumePage>

      <div style={styles.twoColumnLayout}>

        <aside
          style={{
            ...styles.twoColumnSidebar,
            borderRight: `2px solid ${props.accent}`,
          }}
        >

          <h1 style={styles.twoColumnName}>
            {props.personal.fullName ||
              "Your Name"}
          </h1>

          <div style={styles.twoColumnJob}>
            {props.personal.jobTitle}
          </div>

          <Contact personal={props.personal} />

          <h3 style={styles.sideSection}>
            SKILLS
          </h3>

          {props.skills.map((skill, index) => (
            <div
              key={index}
              style={styles.twoColumnSkill}
            >
              • {skill}
            </div>
          ))}

        </aside>

        <main style={styles.twoColumnMain}>

          <ResumeContent
            {...props}
            skills={[]}
          />

        </main>

      </div>

    </ResumePage>
  );
}


/* =========================================================
   COMPACT
========================================================= */

function CompactTemplate(props) {
  return (
    <ResumePage
      style={{
        padding: "15mm",
      }}
    >

      <div style={styles.compactHeader}>

        <h1 style={styles.compactName}>
          {props.personal.fullName ||
            "Your Name"}
        </h1>

        <div style={styles.compactJob}>
          {props.personal.jobTitle}
        </div>

      </div>

      <Contact personal={props.personal} />

      <ResumeContent {...props} />

    </ResumePage>
  );
}


/* =========================================================
   RESUME PAGE
========================================================= */

function ResumePage({ children, style = {} }) {
  return (
    <div
      className="resume-page"
      style={{
        ...styles.resume,
        ...style,
      }}
    >
      {children}
    </div>
  );
}


/* =========================================================
   CONTACT
========================================================= */

function Contact({ personal, light = false }) {
  return (
    <div
      style={{
        ...styles.contact,
        color: light ? "#e5e7eb" : "#4b5563",
      }}
    >

      {personal.email && (
        <span>{personal.email}</span>
      )}

      {personal.phone && (
        <span> | {personal.phone}</span>
      )}

      {personal.location && (
        <span> | {personal.location}</span>
      )}

    </div>
  );
}


/* =========================================================
   SECTION
========================================================= */

function ResumeSection({
  title,
  accent,
  children,
}) {
  return (
    <section style={styles.section}>

      <h2
        style={{
          ...styles.sectionTitle,
          color: accent,
          borderBottom: `1px solid ${accent}`,
        }}
      >
        {title}
      </h2>

      {children}

    </section>
  );
}


/* =========================================================
   STYLES
========================================================= */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#eef1f5",
    paddingBottom: "70px",
  },

  /* TOOLBAR */

  topBar: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "13px 25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
  },

  titleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  previewTitle: {
    margin: 0,
    color: "#111827",
    fontSize: "19px",
  },

  templateBadge: {
    padding: "5px 9px",
    borderRadius: "5px",
    fontSize: "10px",
    fontWeight: "800",
  },

  actions: {
    display: "flex",
    gap: "8px",
  },

  editButton: {
    padding: "10px 15px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#374151",
  },

  changeButton: {
    padding: "10px 15px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#374151",
  },

  atsButton: {
  padding: "10px 16px",
  background: "#111827",
  color: "#ffffff",
  border: "none",
  borderRadius: "7px",
  fontSize: "13px",
  fontWeight: "700",
  cursor: "pointer",
},

  pdfButton: {
    padding: "10px 17px",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "700",
  },

  /* RESUME */

  resume: {
    width: "210mm",
    minHeight: "297mm",
    margin: "40px auto",
    background: "#ffffff",
    padding: "18mm",
    boxSizing: "border-box",
    boxShadow: "0 5px 25px rgba(0,0,0,0.12)",
    color: "#111827",
    fontFamily: "Arial, Helvetica, sans-serif",
    overflow: "visible",
  },

  header: {
    textAlign: "center",
    paddingBottom: "15px",
    marginBottom: "20px",
  },

  name: {
    margin: 0,
    fontSize: "30px",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },

  jobTitle: {
    margin: "7px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#374151",
  },

  contact: {
    fontSize: "11px",
    marginTop: "8px",
  },

  section: {
    marginBottom: "19px",
    breakInside: "avoid",
  },

  sectionTitle: {
    fontSize: "14px",
    paddingBottom: "5px",
    marginBottom: "10px",
    letterSpacing: "0.7px",
  },

  item: {
    marginBottom: "13px",
    breakInside: "avoid",
  },

  itemTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    fontSize: "13px",
  },

  organization: {
    marginTop: "3px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#374151",
  },

  smallText: {
    marginTop: "3px",
    fontSize: "11px",
    color: "#4b5563",
  },

  text: {
    fontSize: "12px",
    lineHeight: "1.5",
    margin: "5px 0 0",
    whiteSpace: "pre-line",
  },

  skills: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",
  },

  skill: {
    fontSize: "11px",
    border: "1px solid",
    padding: "5px 9px",
    borderRadius: "3px",
  },

  link: {
    marginTop: "4px",
    fontSize: "11px",
    color: "#2563eb",
    wordBreak: "break-all",
  },

  /* PROFESSIONAL */

  professionalHeader: {
    borderBottom: "2px solid #111827",
    paddingBottom: "15px",
    marginBottom: "20px",
  },

  professionalName: {
    margin: 0,
    fontSize: "29px",
    textTransform: "uppercase",
  },

  professionalJob: {
    fontSize: "14px",
    marginTop: "6px",
    fontWeight: "600",
    color: "#4b5563",
  },

  /* MINIMAL */

  minimalName: {
    fontSize: "32px",
    fontWeight: "700",
    margin: 0,
  },

  minimalJob: {
    color: "#64748b",
    marginTop: "6px",
    fontSize: "14px",
  },

  /* EXECUTIVE */

  executiveName: {
    margin: 0,
    fontSize: "29px",
    textTransform: "uppercase",
  },

  executiveJob: {
    marginTop: "6px",
    fontSize: "14px",
  },

  /* CREATIVE */

  creativeLayout: {
    display: "flex",
    minHeight: "auto",
  },

  creativeSidebar: {
    width: "31%",
    padding: "25px 18px",
    color: "#ffffff",
    boxSizing: "border-box",
  },

  creativeAvatar: {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "25px",
  },

  sidebarHeading: {
    fontSize: "11px",
    letterSpacing: "1px",
    marginTop: "22px",
  },

  sidebarText: {
    fontSize: "9px",
    marginBottom: "7px",
    wordBreak: "break-word",
  },

  sidebarSkill: {
    fontSize: "9px",
    marginBottom: "6px",
  },

  creativeMain: {
    flex: 1,
    padding: "5px 0 0 25px",
  },

  creativeName: {
    margin: 0,
    fontSize: "30px",
    textTransform: "uppercase",
  },

  creativeJob: {
    marginTop: "5px",
    fontSize: "13px",
    color: "#64748b",
  },

  /* TECH */

  techHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "10px",
  },

  techSymbol: {
    fontSize: "28px",
    fontWeight: "700",
  },

  techName: {
    margin: 0,
    fontSize: "27px",
  },

  techJob: {
    marginTop: "5px",
    fontSize: "12px",
  },

  /* CLASSIC */

  classicHeader: {
    textAlign: "center",
  },

  classicName: {
    margin: 0,
    fontSize: "28px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },

  classicJob: {
    marginTop: "5px",
    fontSize: "13px",
    color: "#64748b",
  },

  /* ELEGANT */

  elegantHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "10px",
  },

  elegantInitial: {
    fontSize: "55px",
    fontWeight: "300",
  },

  elegantName: {
    margin: 0,
    fontSize: "29px",
    letterSpacing: "1px",
  },

  elegantJob: {
    marginTop: "5px",
    fontSize: "13px",
    color: "#64748b",
  },

  /* TWO COLUMN */

  twoColumnLayout: {
    display: "flex",
    minHeight: "auto",
  },

  twoColumnSidebar: {
    width: "31%",
    paddingRight: "18px",
    boxSizing: "border-box",
  },

  twoColumnMain: {
    flex: 1,
    paddingLeft: "20px",
  },

  twoColumnName: {
    margin: 0,
    fontSize: "24px",
    textTransform: "uppercase",
  },

  twoColumnJob: {
    marginTop: "6px",
    fontSize: "11px",
    color: "#64748b",
  },

  sideSection: {
    fontSize: "12px",
    marginTop: "25px",
    borderBottom: "1px solid #d1d5db",
    paddingBottom: "5px",
  },

  twoColumnSkill: {
    fontSize: "10px",
    marginBottom: "6px",
  },

  /* COMPACT */

  compactHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  compactName: {
    margin: 0,
    fontSize: "25px",
    textTransform: "uppercase",
  },

  compactJob: {
    fontSize: "12px",
    color: "#64748b",
  },

  /* BOTTOM */

  bottomBar: {
    width: "210mm",
    margin: "0 auto",
    padding: "17px 20px",
    boxSizing: "border-box",
    background: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  bottomLabel: {
    fontSize: "9px",
    color: "#94a3b8",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  bottomTemplate: {
    fontSize: "15px",
    fontWeight: "700",
    marginTop: "3px",
  },

  bottomActions: {
    display: "flex",
    gap: "10px",
  },

  bottomChange: {
    padding: "11px 16px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  bottomPDF: {
    padding: "11px 18px",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "700",
  },
};


/* =========================================================
   PRINT STYLES
========================================================= */

const printStyles = `
@media print {

  @page {
    size: A4;
    margin: 0;
  }

  html,
  body {
    width: 210mm !important;
    margin: 0 !important;
    padding: 0 !important;
    background: white !important;
  }

  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  .no-print {
    display: none !important;
  }

  .resume-page {
    width: 210mm !important;
    min-width: 210mm !important;

    min-height: 297mm !important;

    margin: 0 !important;

    box-sizing: border-box !important;

    box-shadow: none !important;
    border-radius: 0 !important;

    overflow: visible !important;

    background: #ffffff !important;

    break-after: auto !important;
    page-break-after: auto !important;
  }

  .resume-page section {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  .resume-page .item {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  .resume-page p,
  .resume-page div,
  .resume-page span {
    overflow: visible !important;
  }

  .resume-page * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

}
`;


/* =========================================================
   PRINT STYLE COMPONENT
========================================================= */

function PrintStyles() {
  useEffect(() => {
    const style = document.createElement("style");

    style.setAttribute(
      "data-resume-print",
      "true"
    );

    style.innerHTML = printStyles;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}


/* =========================================================
   FINAL EXPORT
========================================================= */

export default function PreviewWithPrintStyles() {
  return (
    <>
      <Preview />
      <PrintStyles />
    </>
  );
}
