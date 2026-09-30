import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import BackToDashboard from "../components/BackToDashboard";

function Skills() {
  const navigate = useNavigate();
  const { resumeData, updateSkills } = useResume();

  const [skills, setSkills] = useState(
    resumeData.skills || []
  );

  const [skillInput, setSkillInput] = useState();

  // Add skill
  const addSkill = () => {
    const skill = skillInput.trim("");

    if (!skill) return;

    // Prevent duplicate skills
    const alreadyExists = skills.some(
      (item) => item.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      alert("This skill is already added.");
      return;
    }

    setSkills([...skills, skill]);
    setSkillInput("");
  };

  // Remove skill
  const removeSkill = (index) => {
    const updatedSkills = skills.filter(
      (_, i) => i !== index
    );

    setSkills(updatedSkills);
  };

  // Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  // Save and continue
  const handleSubmit = (e) => {
    e.preventDefault();

    updateSkills(skills);

    alert("Skills saved successfully!");

    navigate("/projects");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

            <div className="no-print">
        <BackToDashboard />
      </div>

      <div className="no-print" style={styles.topBar}></div>

        {/* Heading */}
        <h1 style={styles.heading}>
          Skills
        </h1>

        <p style={styles.subtitle}>
          Add the skills that best describe your abilities.
        </p>


        <form onSubmit={handleSubmit}>

          {/* Skill Input Card */}
          <div style={styles.card}>

            <label style={styles.label}>
              Add a Skill
            </label>

            <div style={styles.inputRow}>

              <input
                type="text"
                placeholder="e.g. Java, React, SQL"
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                style={styles.input}
              />

              <button
                type="button"
                onClick={addSkill}
                style={styles.addButton}
              >
                Add
              </button>

            </div>

            <p style={styles.helperText}>
              Press Enter or click Add to add a skill.
            </p>

          </div>


          {/* Skills List */}
          <div style={styles.card}>

            <h2 style={styles.cardTitle}>
              Your Skills
            </h2>

            {skills.length === 0 ? (
              <p style={styles.emptyText}>
                No skills added yet.
              </p>
            ) : (
              <div style={styles.skillsContainer}>

                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={styles.skillTag}
                  >

                    <span>
                      {skill}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      style={styles.removeButton}
                    >
                      ×
                    </button>

                  </div>
                ))}

              </div>
            )}

          </div>


          {/* Navigation */}
          <div style={styles.actions}>

            <button
              type="button"
              onClick={() => navigate("/experience")}
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


/* ================= STYLES ================= */

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    padding: "50px 20px",
    position: "relative",
    zIndex: 1,
  },

  container: {
    maxWidth: "750px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
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
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
    position: "relative",
    zIndex: 1,
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "600",
    color: "#374151",
  },

  inputRow: {
    display: "flex",
    gap: "12px",
  },

  input: {
    flex: 1,
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: 10,
    pointerEvents: "auto",
    outline: "none",
  },

  addButton: {
    padding: "13px 22px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  helperText: {
    marginTop: "10px",
    marginBottom: 0,
    color: "#94a3b8",
    fontSize: "13px",
  },

  cardTitle: {
    margin: "0 0 20px 0",
    fontSize: "20px",
    color: "#111827",
  },

  emptyText: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  skillsContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },

  skillTag: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 12px",
    background: "#eff6ff",
    color: "#1d4ed8",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "600",
  },

  removeButton: {
    width: "20px",
    height: "20px",
    border: "none",
    borderRadius: "50%",
    background: "#dbeafe",
    color: "#1d4ed8",
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: "16px",
    padding: 0,
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

export default Skills;