import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

function ATSUploadResult() {
  const navigate = useNavigate();

  const resumeText =
    sessionStorage.getItem("atsUploadedResumeText") || "";

  const resumeName =
    sessionStorage.getItem("atsUploadedResumeName") ||
    "Resume";

  const analysis = useMemo(() => {
    const text = resumeText.toLowerCase();

    const sectionKeywords = {
      Contact: [
        "email",
        "phone",
        "mobile",
        "linkedin",
        "github",
      ],

      Summary: [
        "summary",
        "objective",
        "profile",
      ],

      Education: [
        "education",
        "b.tech",
        "btech",
        "bachelor",
        "degree",
        "diploma",
        "university",
        "college",
      ],

      Experience: [
        "experience",
        "internship",
        "intern",
        "work experience",
      ],

      Skills: [
        "skills",
        "technical skills",
        "technologies",
      ],

      Projects: [
        "projects",
        "project",
      ],

      Certifications: [
        "certifications",
        "certification",
        "courses",
      ],
    };

    const sections = {};

    Object.entries(sectionKeywords).forEach(
      ([section, keywords]) => {
        sections[section] = keywords.some((keyword) =>
          text.includes(keyword)
        );
      }
    );

    const totalSections = Object.keys(sections).length;

    const matchedSections = Object.values(sections).filter(
      Boolean
    ).length;

    const sectionScore = Math.round(
      (matchedSections / totalSections) * 100
    );

    const technicalSkills = [
      "java",
      "javascript",
      "react",
      "spring boot",
      "spring",
      "mysql",
      "sql",
      "html",
      "css",
      "android",
      "python",
      "c",
      "c++",
      "git",
      "github",
      "docker",
      "aws",
      "mongodb",
      "firebase",
      "rest api",
      "api",
    ];

    const detectedSkills = technicalSkills.filter((skill) =>
      text.includes(skill)
    );

    const keywordScore = Math.min(
      100,
      Math.round(
        (detectedSkills.length / 8) * 100
      )
    );

    const overallScore = Math.round(
      sectionScore * 0.6 +
      keywordScore * 0.4
    );

    const suggestions = [];

    if (!sections.Contact) {
      suggestions.push(
        "Add clear contact information such as email, phone, LinkedIn and GitHub."
      );
    }

    if (!sections.Summary) {
      suggestions.push(
        "Add a concise professional summary tailored to your target role."
      );
    }

    if (!sections.Education) {
      suggestions.push(
        "Add your education section with degree, college and graduation details."
      );
    }

    if (!sections.Experience) {
      suggestions.push(
        "Add internship, work experience or relevant practical experience."
      );
    }

    if (!sections.Skills) {
      suggestions.push(
        "Add a dedicated technical skills section."
      );
    }

    if (!sections.Projects) {
      suggestions.push(
        "Add relevant projects with technologies and measurable results."
      );
    }

    if (!sections.Certifications) {
      suggestions.push(
        "Add relevant certifications or courses if available."
      );
    }

    if (detectedSkills.length < 5) {
      suggestions.push(
        "Mention relevant technical skills and technologies used in your projects."
      );
    }

    if (resumeText.length < 1000) {
      suggestions.push(
        "Your resume contains limited text. Consider adding more relevant details while keeping it concise."
      );
    }

    return {
      sections,
      sectionScore,
      detectedSkills,
      keywordScore,
      overallScore,
      suggestions,
    };
  }, [resumeText]);

  if (!resumeText) {
    return (
      <div style={styles.emptyPage}>
        <div style={styles.emptyCard}>
          <h2>No Resume Found</h2>

          <p>
            Please upload a resume before viewing the ATS result.
          </p>

          <button
            onClick={() => navigate("/ats-upload")}
            style={styles.primaryButton}
          >
            Upload Resume
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.header}>
          <div>
            <h1 style={styles.logo}>Resume-X</h1>
            <p style={styles.headerText}>
              ATS Resume Analysis
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            style={styles.dashboardButton}
          >
            Dashboard
          </button>
        </div>

        <div style={styles.resumeName}>
          📄 {resumeName}
        </div>

        <div style={styles.scoreCard}>

          <div style={styles.scoreCircle}>
            <span style={styles.score}>
              {analysis.overallScore}
            </span>

            <span style={styles.outOf}>
              /100
            </span>
          </div>

          <h2 style={styles.scoreTitle}>
            ATS Resume Score
          </h2>

          <p style={styles.scoreDescription}>
            This score is based on resume structure,
            detected keywords and important ATS sections.
          </p>

        </div>

        <div style={styles.metrics}>

          <div style={styles.metricCard}>
            <span>📑</span>
            <strong>
              {analysis.sectionScore}%
            </strong>
            <p>Section Score</p>
          </div>

          <div style={styles.metricCard}>
            <span>🔑</span>
            <strong>
              {analysis.keywordScore}%
            </strong>
            <p>Keyword Score</p>
          </div>

          <div style={styles.metricCard}>
            <span>💻</span>
            <strong>
              {analysis.detectedSkills.length}
            </strong>
            <p>Skills Detected</p>
          </div>

        </div>

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Resume Section Analysis
          </h2>

          <div style={styles.sectionGrid}>

            {Object.entries(
              analysis.sections
            ).map(([section, found]) => (
              <div
                key={section}
                style={styles.sectionItem}
              >
                <span>
                  {section}
                </span>

                <span
                  style={{
                    ...styles.status,
                    background: found
                      ? "#dcfce7"
                      : "#fee2e2",
                    color: found
                      ? "#166534"
                      : "#b91c1c",
                  }}
                >
                  {found
                    ? "✓ Present"
                    : "✕ Missing"}
                </span>
              </div>
            ))}

          </div>

        </div>

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Detected Technical Skills
          </h2>

          {analysis.detectedSkills.length > 0 ? (
            <div style={styles.tags}>
              {analysis.detectedSkills.map(
                (skill) => (
                  <span
                    key={skill}
                    style={styles.tag}
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          ) : (
            <p style={styles.muted}>
              No common technical skills detected.
            </p>
          )}

        </div>

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Suggestions
          </h2>

          {analysis.suggestions.length > 0 ? (
            <div>
              {analysis.suggestions.map(
                (suggestion, index) => (
                  <div
                    key={index}
                    style={styles.suggestion}
                  >
                    <span>💡</span>

                    <p>
                      {suggestion}
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <p style={styles.successText}>
              Your resume contains the major ATS
              sections detected by this analyzer.
            </p>
          )}

        </div>

        <div style={styles.actions}>

          <button
            onClick={() => {
              sessionStorage.removeItem(
                "atsUploadedResumeText"
              );

              sessionStorage.removeItem(
                "atsUploadedResumeName"
              );

              navigate("/ats-upload");
            }}
            style={styles.secondaryButton}
          >
            Analyze Another Resume
          </button>

          <button
            onClick={() => navigate("/templates")}
            style={styles.primaryButton}
          >
            Build ATS-Friendly Resume
          </button>

        </div>

        <p style={styles.disclaimer}>
          Note: This is a resume-structure and
          keyword-based ATS analysis. Actual ATS
          results can vary depending on the employer,
          job description and ATS software used.
        </p>

      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "60px",
  },

  container: {
    maxWidth: "1050px",
    margin: "0 auto",
    padding: "25px 20px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  logo: {
    margin: 0,
    fontSize: "25px",
    color: "#111827",
  },

  headerText: {
    margin: "4px 0 0",
    color: "#6b7280",
    fontSize: "13px",
  },

  dashboardButton: {
    padding: "9px 16px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  resumeName: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "12px 15px",
    marginBottom: "20px",
    color: "#374151",
    fontSize: "14px",
  },

  scoreCard: {
    background: "#ffffff",
    borderRadius: "15px",
    padding: "35px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },

  scoreCircle: {
    width: "135px",
    height: "135px",
    borderRadius: "50%",
    border: "9px solid #111827",
    margin: "0 auto 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  score: {
    fontSize: "38px",
    fontWeight: "800",
    color: "#111827",
  },

  outOf: {
    fontSize: "12px",
    color: "#6b7280",
  },

  scoreTitle: {
    margin: "0 0 8px",
    color: "#111827",
  },

  scoreDescription: {
    maxWidth: "600px",
    margin: "0 auto",
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  metrics: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
    margin: "20px 0",
  },

  metricCard: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "22px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
  },

  metricCard: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "22px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
  },

  card: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "20px",
    border: "1px solid #e5e7eb",
  },

  cardTitle: {
    margin: "0 0 20px",
    fontSize: "19px",
    color: "#111827",
  },

  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px",
  },

  sectionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px",
    background: "#f9fafb",
    borderRadius: "7px",
    fontSize: "13px",
    fontWeight: "600",
  },

  status: {
    padding: "5px 9px",
    borderRadius: "20px",
    fontSize: "11px",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },

  tag: {
    background: "#f3f4f6",
    padding: "7px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    color: "#374151",
    fontWeight: "600",
  },

  suggestion: {
    display: "flex",
    gap: "10px",
    alignItems: "flex-start",
    marginBottom: "12px",
    padding: "11px",
    background: "#f9fafb",
    borderRadius: "7px",
  },

  suggestionP: {
    margin: 0,
  },

  successText: {
    color: "#166534",
  },

  muted: {
    color: "#6b7280",
    fontSize: "13px",
  },

  actions: {
    display: "flex",
    gap: "12px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "25px",
  },

  primaryButton: {
    padding: "12px 20px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "700",
  },

  secondaryButton: {
    padding: "12px 20px",
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "700",
  },

  disclaimer: {
    textAlign: "center",
    marginTop: "25px",
    color: "#9ca3af",
    fontSize: "11px",
    lineHeight: "1.5",
  },

  emptyPage: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },

  emptyCard: {
    background: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.06)",
  },
};

export default ATSUploadResult;