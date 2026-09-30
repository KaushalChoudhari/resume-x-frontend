import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

function ATSAnalyzer() {
  const navigate = useNavigate();
  const { resumeData } = useResume();

  const {
    personal = {},
    education = [],
    experience = [],
    skills = [],
    projects = [],
    certifications = [],
  } = resumeData || {};

  const [jobDescription, setJobDescription] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  // =========================================================
  // HELPERS
  // =========================================================

  const normalize = (text = "") => {
    return String(text)
      .toLowerCase()
      .replace(/[^\w\s+#.-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  const hasValue = (value) => {
    return (
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
    );
  };

  const objectHasData = (obj) => {
    if (!obj || typeof obj !== "object") return false;

    return Object.values(obj).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) => hasValue(item));
      }

      return hasValue(value);
    });
  };

  const arrayHasData = (arr) => {
    if (!Array.isArray(arr)) return false;

    return arr.some((item) => {
      if (typeof item === "string") {
        return item.trim() !== "";
      }

      return objectHasData(item);
    });
  };

  // =========================================================
  // ACTUAL RESUME TEXT
  // IMPORTANT:
  // Do NOT use JSON.stringify(resumeData)
  // because field names can create false keyword matches.
  // =========================================================

  const resumeText = useMemo(() => {
    const parts = [];

    // Personal
    parts.push(
      personal.fullName || "",
      personal.email || "",
      personal.phone || "",
      personal.location || "",
      personal.jobTitle || "",
      personal.summary || ""
    );

    // Education
    education.forEach((item) => {
      if (!item) return;

      Object.values(item).forEach((value) => {
        if (hasValue(value)) {
          parts.push(String(value));
        }
      });
    });

    // Experience
    experience.forEach((item) => {
      if (!item) return;

      Object.values(item).forEach((value) => {
        if (hasValue(value)) {
          parts.push(String(value));
        }
      });
    });

    // Skills
    skills.forEach((item) => {
      if (typeof item === "string") {
        if (item.trim()) parts.push(item);
      } else if (item) {
        Object.values(item).forEach((value) => {
          if (hasValue(value)) {
            parts.push(String(value));
          }
        });
      }
    });

    // Projects
    projects.forEach((item) => {
      if (!item) return;

      Object.values(item).forEach((value) => {
        if (hasValue(value)) {
          parts.push(String(value));
        }
      });
    });

    // Certifications
    certifications.forEach((item) => {
      if (!item) return;

      Object.values(item).forEach((value) => {
        if (hasValue(value)) {
          parts.push(String(value));
        }
      });
    });

    return normalize(parts.join(" "));
  }, [
    personal,
    education,
    experience,
    skills,
    projects,
    certifications,
  ]);

  // =========================================================
  // TECHNICAL SKILLS
  // =========================================================

  const technicalSkills = [
    "java",
    "javascript",
    "typescript",
    "python",
    "c",
    "c++",
    "c#",
    "react",
    "react.js",
    "angular",
    "vue",
    "node",
    "node.js",
    "spring",
    "spring boot",
    "hibernate",
    "android",
    "kotlin",
    "xml",
    "html",
    "css",
    "bootstrap",
    "tailwind",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "firebase",
    "oracle",
    "git",
    "github",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "rest",
    "rest api",
    "api",
    "microservices",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "data structures",
    "algorithms",
    "oop",
    "oops",
    "dbms",
    "database",
    "linux",
    "agile",
    "scrum",
    "junit",
    "maven",
  ];

  // =========================================================
  // KEYWORD EXTRACTION
  // =========================================================

  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "have",
    "has",
    "are",
    "was",
    "were",
    "will",
    "your",
    "you",
    "our",
    "their",
    "they",
    "them",
    "about",
    "into",
    "over",
    "under",
    "after",
    "before",
    "than",
    "then",
    "also",
    "using",
    "use",
    "used",
    "work",
    "working",
    "role",
    "job",
    "candidate",
    "required",
    "requirements",
    "responsibilities",
    "skills",
    "experience",
    "years",
    "year",
    "team",
    "company",
    "ability",
    "good",
    "strong",
    "knowledge",
    "looking",
    "including",
    "such",
    "other",
    "should",
    "must",
    "can",
    "able",
    "within",
    "through",
    "across",
    "based",
    "need",
    "needs",
    "who",
    "its",
    "our",
    "an",
    "a",
    "of",
    "to",
    "in",
    "on",
    "at",
    "by",
    "is",
    "be",
    "as",
    "or",
  ]);

  const extractKeywords = (text) => {
    const words = normalize(text)
      .split(/\s+/)
      .filter(
        (word) =>
          word.length >= 3 &&
          !stopWords.has(word) &&
          !/^\d+$/.test(word)
      );

    const frequency = {};

    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    return Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 40)
      .map(([word]) => word);
  };

  // =========================================================
  // ANALYSIS
  // =========================================================

  const analysis = useMemo(() => {
    if (!analyzed || !jobDescription.trim()) {
      return null;
    }

    const jdText = normalize(jobDescription);

    const jdKeywords = extractKeywords(jobDescription);

    // -------------------------------------------------------
    // Keyword matching
    // -------------------------------------------------------

    const matchedKeywords = jdKeywords.filter((keyword) =>
      resumeText.includes(keyword)
    );

    const missingKeywords = jdKeywords.filter(
      (keyword) => !resumeText.includes(keyword)
    );

    const keywordScore =
      jdKeywords.length === 0
        ? 0
        : Math.round(
            (matchedKeywords.length / jdKeywords.length) * 100
          );

    // -------------------------------------------------------
    // Technical skill matching
    // -------------------------------------------------------

    const jdSkills = technicalSkills.filter((skill) =>
      jdText.includes(normalize(skill))
    );

    const matchedSkills = jdSkills.filter((skill) =>
      resumeText.includes(normalize(skill))
    );

    const missingSkills = jdSkills.filter(
      (skill) => !resumeText.includes(normalize(skill))
    );

    // IMPORTANT:
    // No skills in JD = neutral 100
    // But empty resume skills = 0
    const hasSkills = arrayHasData(skills);

    let skillScore = 0;

    if (jdSkills.length === 0) {
      skillScore = hasSkills ? 100 : 0;
    } else if (!hasSkills) {
      skillScore = 0;
    } else {
      skillScore = Math.round(
        (matchedSkills.length / jdSkills.length) * 100
      );
    }

    // -------------------------------------------------------
    // Education
    // -------------------------------------------------------

    const hasEducation = arrayHasData(education);

    const educationKeywords = [
      "b.tech",
      "btech",
      "b.e",
      "be degree",
      "bachelor",
      "degree",
      "computer science",
      "computer engineering",
      "information technology",
      "engineering",
      "graduate",
      "graduation",
      "master",
      "m.tech",
      "mtech",
      "mca",
      "mba",
      "diploma",
    ];

    const jdEducationKeywords = educationKeywords.filter(
      (word) => jdText.includes(normalize(word))
    );

    let educationMatch = 0;

    if (!hasEducation) {
      educationMatch = 0;
    } else if (jdEducationKeywords.length === 0) {
      educationMatch = 100;
    } else {
      const matchedEducation = jdEducationKeywords.filter(
        (word) => resumeText.includes(normalize(word))
      );

      educationMatch = Math.round(
        (matchedEducation.length /
          jdEducationKeywords.length) *
          100
      );
    }

    // -------------------------------------------------------
    // Experience
    // -------------------------------------------------------

    const hasExperience = arrayHasData(experience);

    const experienceKeywords = [
      "internship",
      "intern",
      "developer",
      "software developer",
      "software engineer",
      "engineer",
      "frontend",
      "backend",
      "full stack",
      "web developer",
      "android developer",
      "programming",
      "development",
    ];

    const jdExperienceKeywords = experienceKeywords.filter(
      (word) => jdText.includes(normalize(word))
    );

    let experienceMatch = 0;

    if (!hasExperience) {
      experienceMatch = 0;
    } else if (jdExperienceKeywords.length === 0) {
      experienceMatch = 100;
    } else {
      const matchedExperience = jdExperienceKeywords.filter(
        (word) => resumeText.includes(normalize(word))
      );

      experienceMatch = Math.round(
        (matchedExperience.length /
          jdExperienceKeywords.length) *
          100
      );
    }

    // -------------------------------------------------------
    // Resume Sections
    // -------------------------------------------------------

    const hasName = hasValue(personal.fullName);
    const hasEmail = hasValue(personal.email);
    const hasPhone = hasValue(personal.phone);
    const hasSummary = hasValue(personal.summary);

    const hasProjects = arrayHasData(projects);
    const hasCertifications = arrayHasData(certifications);

    const sectionScore =
      (hasName ? 10 : 0) +
      (hasEmail ? 10 : 0) +
      (hasPhone ? 10 : 0) +
      (hasSummary ? 10 : 0) +
      (hasEducation ? 15 : 0) +
      (hasExperience ? 15 : 0) +
      (hasSkills && skills.length >= 5 ? 15 : 0) +
      (hasProjects ? 10 : 0) +
      (hasCertifications ? 5 : 0);

    // -------------------------------------------------------
    // Overall score
    // -------------------------------------------------------

    const overallScore = Math.round(
      keywordScore * 0.45 +
        skillScore * 0.30 +
        sectionScore * 0.25
    );

    // -------------------------------------------------------
    // Suggestions
    // -------------------------------------------------------

    const suggestions = [];

    if (keywordScore < 50) {
      suggestions.push(
        "Add relevant keywords from the job description where they accurately describe your experience."
      );
    }

    if (skillScore < 50) {
      suggestions.push(
        "Add relevant technical skills from the job description only if you genuinely have those skills."
      );
    }

    if (!hasSummary) {
      suggestions.push(
        "Add a concise professional summary tailored to the target role."
      );
    }

    if (!hasEducation) {
      suggestions.push(
        "Add your education details, including degree, institution and relevant academic information."
      );
    }

    if (!hasExperience) {
      suggestions.push(
        "Add internship, work experience, or relevant practical experience if applicable."
      );
    }

    if (!hasSkills) {
      suggestions.push(
        "Add your technical and professional skills."
      );
    } else if (skills.length < 5) {
      suggestions.push(
        "Consider adding more relevant skills that you actually possess."
      );
    }

    if (!hasProjects) {
      suggestions.push(
        "Add relevant projects with technologies used and measurable outcomes where possible."
      );
    }

    if (missingSkills.length > 0) {
      suggestions.push(
        `Review missing technical skills: ${missingSkills
          .slice(0, 6)
          .join(", ")}`
      );
    }

    return {
      overallScore,
      keywordScore,
      skillScore,
      educationMatch,
      experienceMatch,
      matchedKeywords,
      missingKeywords,
      jdSkills,
      matchedSkills,
      missingSkills,
      sectionScore,
      suggestions,
      hasEducation,
      hasExperience,
      hasSkills,
      hasProjects,
      hasCertifications,
    };
  }, [
    analyzed,
    jobDescription,
    resumeText,
    personal,
    education,
    experience,
    skills,
    projects,
    certifications,
  ]);

  // =========================================================
  // SCORE LABEL
  // =========================================================

  const getScoreLabel = (score) => {
    if (score >= 85) return "Excellent Match";
    if (score >= 70) return "Good Match";
    if (score >= 55) return "Moderate Match";
    return "Low Match";
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "#16a34a";
    if (score >= 70) return "#2563eb";
    if (score >= 55) return "#d97706";
    return "#dc2626";
  };

  // =========================================================
  // ANALYZE
  // =========================================================

  const handleAnalyze = () => {
    if (!jobDescription.trim()) {
      alert("Please paste a Job Description first.");
      return;
    }

    setAnalyzed(true);
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleChangeJobDescription = () => {
    setAnalyzed(false);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>ATS Resume Analyzer</h1>

          <p style={styles.subtitle}>
            Compare your resume with a Job Description
          </p>
        </div>

        <button
          onClick={() => navigate("/preview")}
          style={styles.backButton}
        >
          ← View Resume
        </button>
      </div>

      <div style={styles.container}>
        {/* JOB DESCRIPTION INPUT */}

        {!analyzed && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>
              Paste Job Description
            </h2>

            <p style={styles.cardDescription}>
              Paste the complete job description below. The
              analyzer will compare it with the information
              currently present in your Resume-X resume.
            </p>

            <textarea
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              placeholder="Example: We are looking for a Java Developer with Spring Boot, MySQL, REST API, Git and problem-solving skills..."
              style={styles.textarea}
            />

            <button
              onClick={handleAnalyze}
              style={styles.primaryButton}
            >
              🔍 Analyze Resume
            </button>
          </div>
        )}

        {/* RESULTS */}

        {analyzed && analysis && (
          <>
            {/* OVERALL SCORE */}

            <div style={styles.scoreCard}>
              <div>
                <p style={styles.smallLabel}>
                  OVERALL JOB MATCH
                </p>

                <div
                  style={{
                    ...styles.bigScore,
                    color: getScoreColor(
                      analysis.overallScore
                    ),
                  }}
                >
                  {analysis.overallScore}/100
                </div>

                <p
                  style={{
                    ...styles.scoreLabel,
                    color: getScoreColor(
                      analysis.overallScore
                    ),
                  }}
                >
                  {getScoreLabel(analysis.overallScore)}
                </p>
              </div>

              <div style={styles.scoreCircle}>
                <div
                  style={{
                    ...styles.circleInner,
                    borderColor: getScoreColor(
                      analysis.overallScore
                    ),
                  }}
                >
                  {analysis.overallScore}%
                </div>
              </div>
            </div>

            {/* METRICS */}

            <div style={styles.metricsGrid}>
              <MetricCard
                title="Keyword Match"
                value={`${analysis.keywordScore}%`}
              />

              <MetricCard
                title="Skills Match"
                value={`${analysis.skillScore}%`}
              />

              <MetricCard
                title="Experience Match"
                value={`${analysis.experienceMatch}%`}
              />

              <MetricCard
                title="Education Match"
                value={`${analysis.educationMatch}%`}
              />
            </div>

            {/* RESUME STATUS */}

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                Resume Section Status
              </h2>

              <div style={styles.statusGrid}>
                <StatusItem
                  title="Personal Details"
                  active={
                    hasValue(personal.fullName) &&
                    hasValue(personal.email)
                  }
                />

                <StatusItem
                  title="Education"
                  active={analysis.hasEducation}
                />

                <StatusItem
                  title="Experience"
                  active={analysis.hasExperience}
                />

                <StatusItem
                  title="Skills"
                  active={analysis.hasSkills}
                />

                <StatusItem
                  title="Projects"
                  active={analysis.hasProjects}
                />

                <StatusItem
                  title="Certifications"
                  active={analysis.hasCertifications}
                />
              </div>
            </div>

            {/* KEYWORDS */}

            <div style={styles.twoColumn}>
              <div style={styles.card}>
                <h2 style={styles.cardTitle}>
                  ✅ Matched Keywords
                </h2>

                {analysis.matchedKeywords.length === 0 ? (
                  <p style={styles.emptyText}>
                    No significant keywords matched.
                  </p>
                ) : (
                  <div style={styles.tags}>
                    {analysis.matchedKeywords.map(
                      (keyword, index) => (
                        <span
                          key={index}
                          style={styles.matchTag}
                        >
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>

              <div style={styles.card}>
                <h2 style={styles.cardTitle}>
                  ⚠️ Missing Keywords
                </h2>

                {analysis.missingKeywords.length === 0 ? (
                  <p style={styles.emptyText}>
                    No missing keywords detected.
                  </p>
                ) : (
                  <div style={styles.tags}>
                    {analysis.missingKeywords.map(
                      (keyword, index) => (
                        <span
                          key={index}
                          style={styles.missingTag}
                        >
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* TECHNICAL SKILLS */}

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                🛠 Technical Skill Analysis
              </h2>

              {analysis.jdSkills.length === 0 ? (
                <p style={styles.emptyText}>
                  No recognized technical skills were detected
                  in this Job Description.
                </p>
              ) : (
                <div style={styles.tags}>
                  {analysis.jdSkills.map(
                    (skill, index) => {
                      const matched =
                        analysis.matchedSkills.includes(skill);

                      return (
                        <span
                          key={index}
                          style={
                            matched
                              ? styles.matchTag
                              : styles.missingTag
                          }
                        >
                          {matched ? "✓ " : "✗ "}
                          {skill}
                        </span>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* SECTION SCORE */}

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                📋 Resume Completeness
              </h2>

              <div style={styles.progressRow}>
                <span>Contact Details</span>
                <strong>
                  {hasValue(personal.fullName) &&
                  hasValue(personal.email) &&
                  hasValue(personal.phone)
                    ? "Complete"
                    : "Incomplete"}
                </strong>
              </div>

              <div style={styles.progressRow}>
                <span>Professional Summary</span>
                <strong>
                  {hasValue(personal.summary)
                    ? "Complete"
                    : "Missing"}
                </strong>
              </div>

              <div style={styles.progressRow}>
                <span>Education</span>
                <strong>
                  {analysis.hasEducation
                    ? "Added"
                    : "Missing"}
                </strong>
              </div>

              <div style={styles.progressRow}>
                <span>Experience</span>
                <strong>
                  {analysis.hasExperience
                    ? "Added"
                    : "Missing"}
                </strong>
              </div>

              <div style={styles.progressRow}>
                <span>Skills</span>
                <strong>
                  {analysis.hasSkills
                    ? `${skills.length} added`
                    : "Missing"}
                </strong>
              </div>

              <div style={styles.progressRow}>
                <span>Projects</span>
                <strong>
                  {analysis.hasProjects
                    ? "Added"
                    : "Missing"}
                </strong>
              </div>
            </div>

            {/* SUGGESTIONS */}

            <div style={styles.card}>
              <h2 style={styles.cardTitle}>
                💡 Improvement Suggestions
              </h2>

              {analysis.suggestions.length === 0 ? (
                <p style={styles.successText}>
                  No major issues detected by this rule-based
                  analysis.
                </p>
              ) : (
                <div>
                  {analysis.suggestions.map(
                    (suggestion, index) => (
                      <div
                        key={index}
                        style={styles.suggestion}
                      >
                        <span style={styles.suggestionNumber}>
                          {index + 1}
                        </span>

                        <span>{suggestion}</span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* ACTIONS */}

            <div style={styles.actions}>
              <button
                onClick={handleChangeJobDescription}
                style={styles.secondaryButton}
              >
                ← Change Job Description
              </button>

              <button
                onClick={() => navigate("/create-resume")}
                style={styles.primaryButton}
              >
                ✏️ Edit Resume
              </button>

              <button
                onClick={() => navigate("/preview")}
                style={styles.darkButton}
              >
                👁 View Resume
              </button>
            </div>

            {/* DISCLAIMER */}

            <div style={styles.disclaimer}>
              <strong>Important:</strong> This is an automated
              rule-based estimate, not a guarantee of how a
              particular Applicant Tracking System will score
              your resume. Add keywords or skills only when they
              accurately represent your qualifications.
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// =========================================================
// METRIC CARD
// =========================================================

function MetricCard({ title, value }) {
  return (
    <div style={styles.metricCard}>
      <p style={styles.metricTitle}>{title}</p>
      <h3 style={styles.metricValue}>{value}</h3>
    </div>
  );
}

// =========================================================
// STATUS ITEM
// =========================================================

function StatusItem({ title, active }) {
  return (
    <div style={styles.statusItem}>
      <span
        style={{
          ...styles.statusDot,
          background: active ? "#16a34a" : "#dc2626",
        }}
      />

      <span>{title}</span>

      <strong
        style={{
          marginLeft: "auto",
          color: active ? "#16a34a" : "#dc2626",
        }}
      >
        {active ? "Added" : "Missing"}
      </strong>
    </div>
  );
}

// =========================================================
// STYLES
// =========================================================

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    color: "#111827",
    paddingBottom: "50px",
  },

  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "22px 6%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
  },

  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  backButton: {
    padding: "10px 15px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  container: {
    width: "90%",
    maxWidth: "1150px",
    margin: "30px auto",
  },

  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },

  cardTitle: {
    margin: "0 0 8px",
    fontSize: "19px",
    fontWeight: "750",
  },

  cardDescription: {
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: 1.6,
    marginBottom: "18px",
  },

  textarea: {
    width: "100%",
    minHeight: "260px",
    boxSizing: "border-box",
    padding: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    resize: "vertical",
    fontSize: "14px",
    lineHeight: 1.6,
    outline: "none",
    fontFamily: "inherit",
  },

  primaryButton: {
    marginTop: "16px",
    padding: "11px 18px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  darkButton: {
    padding: "11px 18px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "11px 18px",
    background: "#ffffff",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },

  scoreCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "30px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  bigScore: {
    fontSize: "52px",
    fontWeight: "850",
    marginTop: "5px",
  },

  scoreLabel: {
    margin: "0",
    fontWeight: "800",
    fontSize: "15px",
  },

  scoreCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  circleInner: {
    width: "105px",
    height: "105px",
    borderRadius: "50%",
    border: "9px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "800",
  },

  metricsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },

  metricCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "11px",
    padding: "20px",
  },

  metricTitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: "13px",
    fontWeight: "600",
  },

  metricValue: {
    margin: "8px 0 0",
    fontSize: "28px",
    fontWeight: "800",
  },

  statusGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "10px",
    marginTop: "15px",
  },

  statusItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "13px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
  },

  statusDot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
  },

  twoColumn: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginTop: "15px",
  },

  matchTag: {
    padding: "7px 10px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },

  missingTag: {
    padding: "7px 10px",
    background: "#fee2e2",
    color: "#991b1b",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
  },

  emptyText: {
    color: "#6b7280",
    fontSize: "14px",
    marginTop: "15px",
  },

  successText: {
    color: "#166534",
    background: "#f0fdf4",
    padding: "13px",
    borderRadius: "8px",
    fontSize: "14px",
  },

  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "13px 0",
    borderBottom: "1px solid #f0f0f0",
    fontSize: "14px",
  },

  suggestion: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "13px",
    background: "#f9fafb",
    borderRadius: "8px",
    marginTop: "10px",
    fontSize: "14px",
    lineHeight: 1.5,
  },

  suggestionNumber: {
    minWidth: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#111827",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "800",
  },

  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "25px",
    marginBottom: "20px",
  },

  disclaimer: {
    background: "#fffbeb",
    border: "1px solid #fde68a",
    color: "#92400e",
    padding: "15px",
    borderRadius: "9px",
    fontSize: "12px",
    lineHeight: 1.6,
  },
};

export default ATSAnalyzer;