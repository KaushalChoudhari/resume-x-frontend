import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

function ATSUpload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = (selectedFile) => {
    setError("");

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF file only.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const extractTextFromPDF = async (pdfFile) => {
    const arrayBuffer = await pdfFile.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let extractedText = "";

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ");

      extractedText += pageText + "\n";
    }

    return extractedText.trim();
  };

  const analyzeResume = async () => {
    if (!file) {
      setError("Please select your resume PDF first.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const extractedText = await extractTextFromPDF(file);

      if (!extractedText || extractedText.length < 50) {
        setError(
          "Unable to read meaningful text from this PDF. Please upload a text-based PDF."
        );
        setLoading(false);
        return;
      }

      sessionStorage.setItem(
        "atsUploadedResumeText",
        extractedText
      );

      sessionStorage.setItem(
        "atsUploadedResumeName",
        file.name
      );

      navigate("/ats-upload-result");
    } catch (error) {
      console.error(error);
      setError(
        "Something went wrong while reading the PDF. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.header}>
          <h1 style={styles.logo}>Resume-X</h1>

          <button
            onClick={() => navigate("/dashboard")}
            style={styles.dashboardButton}
          >
            Dashboard
          </button>
        </div>

        <div style={styles.card}>

          <div style={styles.icon}>📊</div>

          <h1 style={styles.title}>
            ATS Resume Analyzer
          </h1>

          <p style={styles.subtitle}>
            Upload your resume and check how ATS-friendly it is.
          </p>

          <div
            style={{
              ...styles.uploadBox,
              borderColor: file ? "#111827" : "#d1d5db",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <div style={styles.uploadIcon}>📄</div>

                <h3 style={styles.uploadTitle}>
                  Drag & Drop your resume
                </h3>

                <p style={styles.uploadText}>
                  or
                </p>

                <label style={styles.chooseButton}>
                  Choose PDF
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>

                <p style={styles.limitText}>
                  PDF only • Maximum 5 MB
                </p>
              </>
            ) : (
              <>
                <div style={styles.successIcon}>✓</div>

                <h3 style={styles.uploadTitle}>
                  Resume Selected
                </h3>

                <p style={styles.fileName}>
                  {file.name}
                </p>

                <p style={styles.fileSize}>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <label style={styles.changeButton}>
                  Change PDF
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </label>
              </>
            )}
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            onClick={analyzeResume}
            disabled={!file || loading}
            style={{
              ...styles.analyzeButton,
              opacity: !file || loading ? 0.6 : 1,
              cursor:
                !file || loading
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {loading
              ? "Analyzing Resume..."
              : "Analyze Resume"}
          </button>

          <div style={styles.features}>

            <div style={styles.feature}>
              <strong>🔍 ATS Check</strong>
              <span>Analyze resume structure</span>
            </div>

            <div style={styles.feature}>
              <strong>⚡ Instant Result</strong>
              <span>Get your score immediately</span>
            </div>

            <div style={styles.feature}>
              <strong>🔒 Privacy</strong>
              <span>Resume processed locally</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "25px 20px 60px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "45px",
  },

  logo: {
    margin: 0,
    fontSize: "25px",
    fontWeight: "800",
    color: "#111827",
  },

  dashboardButton: {
    padding: "9px 16px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  card: {
    maxWidth: "720px",
    margin: "0 auto",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "45px 35px",
    textAlign: "center",
    boxShadow: "0 10px 35px rgba(0,0,0,0.07)",
  },

  icon: {
    fontSize: "42px",
    marginBottom: "10px",
  },

  title: {
    margin: "0 0 10px",
    fontSize: "32px",
    color: "#111827",
  },

  subtitle: {
    margin: "0 0 35px",
    color: "#6b7280",
    fontSize: "15px",
  },

  uploadBox: {
    border: "2px dashed #d1d5db",
    borderRadius: "12px",
    padding: "45px 20px",
    background: "#f9fafb",
    transition: "0.2s",
  },

  uploadIcon: {
    fontSize: "45px",
    marginBottom: "10px",
  },

  successIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    background: "#dcfce7",
    color: "#16a34a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
    fontSize: "28px",
    fontWeight: "bold",
  },

  uploadTitle: {
    margin: "8px 0",
    color: "#111827",
  },

  uploadText: {
    margin: "5px 0 12px",
    color: "#6b7280",
  },

  chooseButton: {
    display: "inline-block",
    padding: "11px 20px",
    background: "#111827",
    color: "#ffffff",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  changeButton: {
    display: "inline-block",
    marginTop: "15px",
    padding: "9px 16px",
    background: "#ffffff",
    color: "#111827",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    cursor: "pointer",
    fontWeight: "600",
  },

  limitText: {
    marginTop: "18px",
    fontSize: "12px",
    color: "#9ca3af",
  },

  fileName: {
    margin: "8px 0 2px",
    fontWeight: "700",
    color: "#111827",
    wordBreak: "break-word",
  },

  fileSize: {
    margin: "0",
    fontSize: "12px",
    color: "#6b7280",
  },

  error: {
    marginTop: "18px",
    padding: "12px",
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "7px",
    fontSize: "13px",
  },

  analyzeButton: {
    width: "100%",
    marginTop: "22px",
    padding: "14px",
    background: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "700",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginTop: "35px",
  },

  feature: {
    padding: "15px",
    background: "#f9fafb",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontSize: "12px",
    color: "#6b7280",
  },
};

export default ATSUpload;