import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.text();

      if (!response.ok) {
        setMessage(data);
        return;
      }

      // =====================================================
      // SAVE JWT TOKEN
      // =====================================================

      localStorage.setItem("token", data);

      // =====================================================
      // CHECK WHERE USER CAME FROM
      // =====================================================

      const from = location.state?.from;

      // -----------------------------------------------------
      // ATS FLOW
      // Home
      //   ↓
      // ATS Analyzer
      //   ↓
      // Login
      //   ↓
      // ATS Upload
      // -----------------------------------------------------

      if (from === "/ats-upload") {
        window.location.href = "/ats-upload";
        return;
      }

      // =====================================================
      // NORMAL RESUME FLOW
      // =====================================================

      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
      setMessage("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>
          Welcome Back
        </h1>

        <p style={styles.subtitle}>
          Login to continue to Resume-X
        </p>

        <form onSubmit={handleSubmit}>
          {/* EMAIL */}

          <label style={styles.label}>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* PASSWORD */}

          <label style={styles.label}>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* ERROR MESSAGE */}

          {message && (
            <p style={styles.message}>
              {message}
            </p>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        {/* REGISTER */}

        <p style={styles.bottomText}>
          Don't have an account?{" "}

          <Link
            to="/register"
            state={location.state}
            style={styles.link}
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f5f7fb",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    background: "#ffffff",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  },

  heading: {
    margin: "0 0 8px",
    fontSize: "32px",
    color: "#111827",
  },

  subtitle: {
    color: "#6b7280",
    marginBottom: "30px",
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
    outline: "none",
  },

  button: {
    width: "100%",
    marginTop: "25px",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
  },

  message: {
    color: "#dc2626",
    marginTop: "15px",
    fontSize: "14px",
  },

  bottomText: {
    marginTop: "25px",
    textAlign: "center",
    color: "#6b7280",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Login;