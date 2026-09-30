import { useResume } from "../context/ResumeContext";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../components/BackToDashboard";

function CreateResume() {
  const {
    resumeData,
    updatePersonal,
  } = useResume();

  const navigate = useNavigate();

  // ================================================
  // HANDLE INPUT CHANGE
  // ================================================

  const handleChange = (e) => {
    updatePersonal({
      [e.target.name]: e.target.value,
    });
  };

  // ================================================
  // HANDLE SUBMIT
  // ================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Personal information saved!");

    navigate("/education");
  };

  return (



    <div style={styles.page}>

      <div style={styles.container}>
            <div className="no-print">
        <BackToDashboard />
      </div>

      <div className="no-print" style={styles.topBar}></div>

        <h1 style={styles.heading}>
          Create Your Resume
        </h1>

        <p style={styles.subtitle}>
          Enter your personal information to get started.
        </p>

        <form
          onSubmit={handleSubmit}
          style={styles.form}
        >

          {/* ============================================
              FULL NAME
          ============================================ */}

          <label style={styles.label}>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={resumeData.personal.fullName}
            onChange={handleChange}
            style={styles.input}
          />

          {/* ============================================
              EMAIL
          ============================================ */}

          <label style={styles.label}>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={resumeData.personal.email}
            onChange={handleChange}
            style={styles.input}
          />

          {/* ============================================
              PHONE
          ============================================ */}

          <label style={styles.label}>
            Phone
          </label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={resumeData.personal.phone}
            onChange={handleChange}
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
            value={resumeData.personal.location}
            onChange={handleChange}
            style={styles.input}
          />

          {/* ============================================
              JOB TITLE
          ============================================ */}

          <label style={styles.label}>
            Job Title
          </label>

          <input
            type="text"
            name="jobTitle"
            placeholder="e.g. Java Developer"
            value={resumeData.personal.jobTitle}
            onChange={handleChange}
            style={styles.input}
          />

          {/* ============================================
              PROFESSIONAL SUMMARY
          ============================================ */}

          <label style={styles.label}>
            Professional Summary
          </label>

          <textarea
            name="summary"
            placeholder="Write a short professional summary..."
            value={resumeData.personal.summary}
            onChange={handleChange}
            style={styles.textarea}
          />

          {/* ============================================
              SAVE & CONTINUE
          ============================================ */}

          <button
            type="submit"
            style={styles.button}
          >
            Save & Continue →
          </button>

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
    maxWidth: "700px",
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
  },

  form: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "16px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.06)",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "18px",
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
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "13px",
    border: "1px solid #d1d5db",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    resize: "vertical",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default CreateResume;
