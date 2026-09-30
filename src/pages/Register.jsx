import { useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        "http://localhost:8081/api/auth/register",
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

      alert("Registration successful!");

      /*
       * Preserve previous route information.
       *
       * Example:
       * Home
       * → ATS Analyzer
       * → Login
       * → Register
       *
       * After registration:
       * Register → Login → ATS Upload
       */
      navigate("/login", {
        state: location.state,
      });

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
          Create Account
        </h1>

        <p style={styles.subtitle}>
          Register to continue to Resume-X
        </p>

        <form onSubmit={handleSubmit}>

          {/* NAME */}

          <label style={styles.label}>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />


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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            style={styles.input}
          />


          {/* ERROR MESSAGE */}

          {message && (
            <p style={styles.message}>
              {message}
            </p>
          )}


          {/* REGISTER BUTTON */}

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
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>


        {/* LOGIN LINK */}

        <p style={styles.bottomText}>
          Already have an account?{" "}

          <Link
            to="/login"
            state={location.state}
            style={styles.link}
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}


const styles = {

  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "14px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
  },

  heading: {
    margin: "0",
    textAlign: "center",
    fontSize: "28px",
    color: "#111827",
  },

  subtitle: {
    textAlign: "center",
    margin: "8px 0 30px",
    color: "#6b7280",
    fontSize: "14px",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px",
    marginBottom: "18px",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    fontSize: "14px",
    outline: "none",
  },

  message: {
    color: "#dc2626",
    fontSize: "13px",
    marginBottom: "15px",
  },

  button: {
    width: "100%",
    padding: "13px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "7px",
    fontSize: "14px",
    fontWeight: "700",
  },

  bottomText: {
    textAlign: "center",
    marginTop: "22px",
    fontSize: "13px",
    color: "#6b7280",
  },

  link: {
    color: "#111827",
    fontWeight: "700",
    textDecoration: "none",
  },

};

export default Register;