import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import BackToDashboard from "../components/BackToDashboard";

function Education() {
  const navigate = useNavigate();

  const {
    resumeData,
    updateEducation,
  } = useResume();

  const [education, setEducation] = useState(
    resumeData.education.length > 0
      ? resumeData.education
      : [
          {
            degree: "",
            college: "",
            location: "",
            startYear: "",
            endYear: "",
            grade: "",
          },
        ]
  );

  // ================================================
  // HANDLE INPUT CHANGE
  // ================================================

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setEducation((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [name]: value,
      };

      return updated;
    });
  };

  // ================================================
  // ADD EDUCATION
  // ================================================

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        degree: "",
        college: "",
        location: "",
        startYear: "",
        endYear: "",
        grade: "",
      },
    ]);
  };

  // ================================================
  // REMOVE EDUCATION
  // ================================================

  const removeEducation = (index) => {
    if (education.length === 1) {
      return;
    }

    setEducation((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // ================================================
  // HANDLE SUBMIT
  // ================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    updateEducation(education);

    alert("Education information saved!");

    navigate("/experience");
  };

  return (
    <div style={styles.page}>

      <div style={styles.container}>
            <div className="no-print">
        <BackToDashboard />
      </div>

      <div className="no-print" style={styles.topBar}></div>

        {/* ============================================
            HEADING
        ============================================ */}

        <h1 style={styles.heading}>
          Education
        </h1>

        <p style={styles.subtitle}>
          Add your educational qualifications and academic details.
        </p>

        <form onSubmit={handleSubmit}>

          {/* ============================================
              EDUCATION LIST
          ============================================ */}

          {education.map((item, index) => (
            <div
              key={index}
              style={styles.card}
            >

              {/* ============================================
                  CARD HEADER
              ============================================ */}

              <div style={styles.cardHeader}>

                <h2 style={styles.cardTitle}>
                  Education {index + 1}
                </h2>

                {education.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeEducation(index)
                    }
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                )}

              </div>

              {/* ============================================
                  DEGREE / COURSE
              ============================================ */}

              <label style={styles.label}>
                Degree / Course
              </label>

              <input
                type="text"
                name="degree"
                placeholder="e.g. B.Tech Computer Engineering"
                value={item.degree}
                onChange={(e) =>
                  handleChange(index, e)
                }
                style={styles.input}
              />

              {/* ============================================
                  COLLEGE / UNIVERSITY
              ============================================ */}

              <label style={styles.label}>
                College / University
              </label>

              <input
                type="text"
                name="college"
                placeholder="e.g. XYZ College of Engineering"
                value={item.college}
                onChange={(e) =>
                  handleChange(index, e)
                }
                style={styles.input}
              />

              {/* ============================================
                  LOCATION
              ============================================ */}

              <label style={styles.label}>
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Nagpur, Maharashtra"
                value={item.location}
                onChange={(e) =>
                  handleChange(index, e)
                }
                style={styles.input}
              />

              {/* ============================================
                  START YEAR + END YEAR
              ============================================ */}

              <div style={styles.row}>

                <div style={styles.half}>

                  <label style={styles.label}>
                    Start Year
                  </label>

                  <input
                    type="text"
                    name="startYear"
                    placeholder="e.g. 2024"
                    value={item.startYear}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    style={styles.input}
                  />

                </div>

                <div style={styles.half}>

                  <label style={styles.label}>
                    End Year
                  </label>

                  <input
                    type="text"
                    name="endYear"
                    placeholder="e.g. 2028"
                    value={item.endYear}
                    onChange={(e) =>
                      handleChange(index, e)
                    }
                    style={styles.input}
                  />

                </div>

              </div>

              {/* ============================================
                  GRADE
              ============================================ */}

              <label style={styles.label}>
                Grade / Percentage / CGPA
              </label>

              <input
                type="text"
                name="grade"
                placeholder="e.g. 8.5 CGPA"
                value={item.grade}
                onChange={(e) =>
                  handleChange(index, e)
                }
                style={styles.input}
              />

            </div>
          ))}

          {/* ============================================
              ADD ANOTHER EDUCATION
          ============================================ */}

          <button
            type="button"
            onClick={addEducation}
            style={styles.addButton}
          >
            + Add Another Education
          </button>

          {/* ============================================
              ACTION BUTTONS
          ============================================ */}

          <div style={styles.actions}>

            <button
              type="button"
              onClick={() =>
                navigate("/create-resume")
              }
              style={styles.backButton}
            >
              ← Back
            </button>

            <button
              type="submit"
              style={styles.continueButton}
            >
              Save & Continue →
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

// ====================================================
// STYLES
// ====================================================

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "50px 20px",
  },

  container: {
    maxWidth: "750px",
    margin: "0 auto",
  },

  heading: {
    fontSize: "36px",
    color: "#111827",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "30px",
    lineHeight: "1.6",
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    marginBottom: "20px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.06)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    margin: 0,
    fontSize: "20px",
    color: "#111827",
  },

  label: {
    display: "block",
    marginTop: "18px",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#374151",
  },

  // Same input style as Personal Information
  input: {
    width: "100%",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
  },

  row: {
    display: "flex",
    gap: "15px",
  },

  half: {
    flex: 1,
  },

  removeButton: {
    border: "none",
    background: "#fee2e2",
    color: "#dc2626",
    padding: "8px 12px",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  addButton: {
    width: "100%",
    padding: "13px",
    background: "#ffffff",
    color: "#2563eb",
    border: "1px dashed #2563eb",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
  },

  backButton: {
    padding: "14px 25px",
    background: "#ffffff",
    color: "#374151",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  continueButton: {
    flex: 1,
    padding: "14px 25px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Education;
