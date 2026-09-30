import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";
import BackToDashboard from "../components/BackToDashboard";

function Certifications() {
  const navigate = useNavigate();
  const { resumeData, updateCertifications } = useResume();

  const [certifications, setCertifications] = useState(
    resumeData.certifications.length > 0
      ? resumeData.certifications
      : [
          {
            name: "",
            organization: "",
            date: "",
            link: "",
          },
        ]
  );

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    const updatedCertifications = [...certifications];

    updatedCertifications[index] = {
      ...updatedCertifications[index],
      [name]: value,
    };

    setCertifications(updatedCertifications);
  };

  const addCertification = () => {
    setCertifications([
      ...certifications,
      {
        name: "",
        organization: "",
        date: "",
        link: "",
      },
    ]);
  };

  const removeCertification = (index) => {
    if (certifications.length === 1) return;

    const updatedCertifications = certifications.filter(
      (_, i) => i !== index
    );

    setCertifications(updatedCertifications);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateCertifications(certifications);

    alert("Certifications saved successfully!");

    // Preview page next
    navigate("/preview");
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
            <div className="no-print">
        <BackToDashboard />
      </div>

      <div className="no-print" style={styles.topBar}></div>
        <h1 style={styles.heading}>Certifications</h1>

        <p style={styles.subtitle}>
          Add certifications, courses and professional credentials that
          strengthen your resume.
        </p>

        <form onSubmit={handleSubmit}>
          {certifications.map((certification, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>
                  Certification {index + 1}
                </h2>

                {certifications.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    style={styles.removeButton}
                  >
                    Remove
                  </button>
                )}
              </div>

              <label style={styles.label}>
                Certification Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="e.g. Java Programming Certificate"
                value={certification.name}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />

              <label style={styles.label}>
                Issuing Organization
              </label>

              <input
                type="text"
                name="organization"
                placeholder="e.g. Coursera, Udemy, Google"
                value={certification.organization}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />

              <label style={styles.label}>
                Date
              </label>

              <input
                type="text"
                name="date"
                placeholder="e.g. August 2026"
                value={certification.date}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />

              <label style={styles.label}>
                Certificate Link
              </label>

              <input
                type="url"
                name="link"
                placeholder="https://example.com/certificate"
                value={certification.link}
                onChange={(e) => handleChange(index, e)}
                style={styles.input}
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addCertification}
            style={styles.addButton}
          >
            + Add Another Certification
          </button>

          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate("/projects")}
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
    position: "relative",
    zIndex: 10,
    pointerEvents: "auto",
    outline: "none",
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

export default Certifications;