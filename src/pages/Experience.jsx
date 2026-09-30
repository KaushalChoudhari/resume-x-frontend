import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import BackToDashboard from "../components/BackToDashboard";

function Experience() {
  const navigate = useNavigate();
  const { resumeData, updateExperience } = useResume();

  const [experience, setExperience] = useState(
    resumeData.experience?.length > 0
      ? resumeData.experience
      : [
          {
            jobTitle: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ]
  );

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setExperience((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        [name]: value,
      };

      return updated;
    });
  };

  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeExperience = (index) => {
    if (experience.length === 1) return;

    setExperience((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateExperience(experience);

    alert("Experience information saved!");

    navigate("/skills");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

            <div className="no-print">
        <BackToDashboard />
      </div>

      <div className="no-print" style={styles.topBar}></div>

        <h1 style={styles.heading}>
          Work Experience
        </h1>

        <p style={styles.subtitle}>
          Add your professional experience, internships or
          relevant work experience.
        </p>

        <form onSubmit={handleSubmit}>

          {experience.map((item, index) => (
            <div key={index} style={styles.card}>

              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  Experience {index + 1}
                </h2>

                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                )}
              </div>

              <label style={styles.label}>
                Job Title
              </label>

              <input
                type="text"
                name="jobTitle"
                placeholder="e.g. Software Developer Intern"
                value={item.jobTitle}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />

              <label style={styles.label}>
                Company
              </label>

              <input
                type="text"
                name="company"
                placeholder="e.g. ABC Technologies"
                value={item.company}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />

              <label style={styles.label}>
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="e.g. Nagpur, Maharashtra"
                value={item.location}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />

              <div style={styles.row}>

                <div style={styles.half}>
                  <label style={styles.label}>
                    Start Date
                  </label>

                  <input
                    type="text"
                    name="startDate"
                    placeholder="e.g. June 2024"
                    value={item.startDate}
                    onChange={(e) => handleChange(index, e)}
                    style={styles.input}
                  />
                </div>

                <div style={styles.half}>
                  <label style={styles.label}>
                    End Date
                  </label>

                  <input
                    type="text"
                    name="endDate"
                    placeholder="e.g. August 2024"
                    value={item.endDate}
                    onChange={(e) => handleChange(index, e)}
                    style={styles.input}
                  />
                </div>

              </div>

              <label style={styles.label}>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Describe your responsibilities, achievements and work..."
                value={item.description}
                onChange={(e) => handleChange(index, e)}
                style={styles.textarea}
              />

            </div>
          ))}

          <button
            type="button"
            onClick={addExperience}
            style={styles.addButton}
          >
            + Add Another Experience
          </button>

          <div style={styles.actions}>

            <button
              type="button"
              onClick={() => navigate("/education")}
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
    boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
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

  input: {
    width: "100%",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "130px",
    padding: "13px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    resize: "vertical",
    boxSizing: "border-box",
    fontFamily: "Arial, sans-serif",
    outline: "none",
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

export default Experience;