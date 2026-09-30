import { useNavigate } from "react-router-dom";

function BackToDashboard() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/dashboard")}
      style={{
        padding: "10px 16px",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        background: "#ffffff",
        color: "#374151",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      ← Return to Dashboard
    </button>
  );
}

export default BackToDashboard;