import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

function Dashboard() {
  const navigate = useNavigate();

  const {
    resumes = [],
    createResume,
    selectResume,
    renameResume,
    duplicateResume,
    deleteResume,
    logout,
  } = useResume();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [resumeName, setResumeName] = useState("");

  // =========================
  // CREATE RESUME
  // =========================

  const handleCreateResume = () => {
    const name = resumeName.trim();

    if (!name) {
      alert("Please enter a resume name.");
      return;
    }

    const newResume = createResume(name);

    setResumeName("");
    setShowCreateModal(false);

    if (newResume?.id) {
      selectResume(newResume.id);
    }

    navigate("/create-resume");
  };

  // =========================
  // CONTINUE EDITING
  // =========================

  const handleContinue = (resume) => {
    selectResume(resume.id);
    navigate("/create-resume");
  };

  // =========================
  // PREVIEW
  // =========================

  const handlePreview = (resume) => {
    selectResume(resume.id);
    navigate("/preview");
  };

  // =========================
  // RENAME
  // =========================

  const handleRename = (resume) => {
    const newName = window.prompt(
      "Enter new resume name:",
      resume.name || "Untitled Resume"
    );

    if (!newName || !newName.trim()) {
      return;
    }

    renameResume(resume.id, newName.trim());
  };

  // =========================
  // DUPLICATE
  // =========================

  const handleDuplicate = (resume) => {
    duplicateResume(resume.id);
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = (resume) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${resume.name || "Untitled Resume"}"?`
    );

    if (!confirmed) {
      return;
    }

    deleteResume(resume.id);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    logout();
    navigate("/login");
  };

  // =========================
  // SEARCH + SORT
  // =========================

  const filteredResumes = useMemo(() => {
    let result = [...resumes];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((resume) =>
        (resume.name || "Untitled Resume")
          .toLowerCase()
          .includes(keyword)
      );
    }

    result.sort((a, b) => {
      if (sortBy === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }

      if (sortBy === "oldest") {
        return (
          new Date(a.updatedAt || a.createdAt || 0) -
          new Date(b.updatedAt || b.createdAt || 0)
        );
      }

      return (
        new Date(b.updatedAt || b.createdAt || 0) -
        new Date(a.updatedAt || a.createdAt || 0)
      );
    });

    return result;
  }, [resumes, search, sortBy]);

  // =========================
  // DATE FORMAT
  // =========================

  const formatDate = (date) => {
    if (!date) {
      return "Recently";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Recently";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // GET STATS
  // =========================

  const totalResumes = resumes.length;

  const recentResumes = resumes.filter((resume) => {
    if (!resume.updatedAt && !resume.createdAt) {
      return false;
    }

    const date = new Date(resume.updatedAt || resume.createdAt);

    const sevenDaysAgo =
      Date.now() - 7 * 24 * 60 * 60 * 1000;

    return date.getTime() >= sevenDaysAgo;
  }).length;

  // =========================
  // UI
  // =========================

  return (
    <div style={styles.page}>

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside style={styles.sidebar}>

        <div style={styles.logo}>
          Resume<span style={styles.logoAccent}>-X</span>
        </div>

        <div style={styles.sidebarSection}>
          <p style={styles.sectionLabel}>WORKSPACE</p>

          <div style={styles.activeMenu}>
            <span>▦</span>
            Dashboard
          </div>

          <button
            style={styles.sidebarButton}
            onClick={() => setShowCreateModal(true)}
          >
            <span>＋</span>
            New Resume
          </button>

          <button
            style={styles.sidebarButton}
            onClick={() => navigate("/templates")}
          >
            <span>◈</span>
            Templates
          </button>
        </div>

        <div style={styles.sidebarBottom}>

          <button
            style={styles.sidebarButton}
            onClick={() => navigate("/")}
          >
            <span>⌂</span>
            Home
          </button>

          <button
            style={styles.logoutButton}
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </div>

      </aside>

      {/* =========================
          MAIN
      ========================= */}

      <main style={styles.main}>

        {/* TOP BAR */}

        <header style={styles.topbar}>

          <div>
            <h1 style={styles.heading}>
              Dashboard
            </h1>

            <p style={styles.subheading}>
              Create, manage and customize your resumes.
            </p>
          </div>

          <button
            style={styles.primaryButton}
            onClick={() => setShowCreateModal(true)}
          >
            <span style={styles.plusIcon}>＋</span>
            Create Resume
          </button>

        </header>

        {/* =========================
            STATS
        ========================= */}

        <section style={styles.statsGrid}>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>📄</div>

            <div>
              <p style={styles.statLabel}>
                Total Resumes
              </p>

              <h2 style={styles.statValue}>
                {totalResumes}
              </h2>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>✦</div>

            <div>
              <p style={styles.statLabel}>
                Updated This Week
              </p>

              <h2 style={styles.statValue}>
                {recentResumes}
              </h2>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statIcon}>⚡</div>

            <div>
              <p style={styles.statLabel}>
                Resume Builder
              </p>

              <h2 style={styles.statValue}>
                Active
              </h2>
            </div>
          </div>

        </section>

        {/* =========================
            TOOLBAR
        ========================= */}

        <section style={styles.toolbar}>

          <div style={styles.searchBox}>

            <span style={styles.searchIcon}>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search your resumes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />

          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="recent">
              Recently Updated
            </option>

            <option value="oldest">
              Oldest First
            </option>

            <option value="name">
              Name A-Z
            </option>
          </select>

        </section>

        {/* =========================
            RESUME SECTION
        ========================= */}

        <section>

          <div style={styles.sectionHeader}>

            <div>
              <h2 style={styles.resumeHeading}>
                My Resumes
              </h2>

              <p style={styles.resumeCount}>
                {filteredResumes.length}{" "}
                {filteredResumes.length === 1
                  ? "resume"
                  : "resumes"}
              </p>
            </div>

          </div>

          {/* EMPTY STATE */}

          {filteredResumes.length === 0 ? (

            <div style={styles.emptyState}>

              <div style={styles.emptyIcon}>
                📄
              </div>

              <h2 style={styles.emptyTitle}>
                {search
                  ? "No resumes found"
                  : "Create your first resume"}
              </h2>

              <p style={styles.emptyText}>
                {search
                  ? "Try searching with a different resume name."
                  : "Build a professional, ATS-friendly resume in minutes."}
              </p>

              {!search && (
                <button
                  style={styles.primaryButton}
                  onClick={() =>
                    setShowCreateModal(true)
                  }
                >
                  ＋ Create Your First Resume
                </button>
              )}

            </div>

          ) : (

            <div style={styles.resumeGrid}>

              {filteredResumes.map((resume) => (

                <div
                  key={resume.id}
                  style={styles.resumeCard}
                >

                  {/* CARD HEADER */}

                  <div style={styles.cardTop}>

                    <div style={styles.documentIcon}>
                      📄
                    </div>

                    <button
                      style={styles.moreButton}
                      onClick={() => {
                        const action =
                          window.prompt(
                            "Type an action:\n\nrename\npreview\nduplicate\ndelete"
                          );

                        if (!action) return;

                        const selectedAction =
                          action.toLowerCase().trim();

                        if (
                          selectedAction === "rename"
                        ) {
                          handleRename(resume);
                        } else if (
                          selectedAction === "preview"
                        ) {
                          handlePreview(resume);
                        } else if (
                          selectedAction === "duplicate"
                        ) {
                          handleDuplicate(resume);
                        } else if (
                          selectedAction === "delete"
                        ) {
                          handleDelete(resume);
                        }
                      }}
                    >
                      ⋮
                    </button>

                  </div>

                  {/* CARD CONTENT */}

                  <div style={styles.cardContent}>

                    <h3 style={styles.resumeName}>
                      {resume.name ||
                        "Untitled Resume"}
                    </h3>

                    <p style={styles.updatedText}>
                      Updated{" "}
                      {formatDate(
                        resume.updatedAt ||
                          resume.createdAt
                      )}
                    </p>

                  </div>

                  {/* CARD ACTIONS */}

                  <div style={styles.cardActions}>

                    <button
                      style={styles.editButton}
                      onClick={() =>
                        handleContinue(resume)
                      }
                    >
                      Edit Resume
                    </button>

                    <button
                      style={styles.previewButton}
                      onClick={() =>
                        handlePreview(resume)
                      }
                    >
                      Preview
                    </button>

                  </div>

                  {/* SECONDARY ACTIONS */}

                  <div style={styles.secondaryActions}>

                    <button
                      style={styles.textButton}
                      onClick={() =>
                        handleRename(resume)
                      }
                    >
                      ✏ Rename
                    </button>

                    <button
                      style={styles.textButton}
                      onClick={() =>
                        handleDuplicate(resume)
                      }
                    >
                      ⧉ Duplicate
                    </button>

                    <button
                      style={styles.deleteTextButton}
                      onClick={() =>
                        handleDelete(resume)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))}

              {/* CREATE NEW CARD */}

              <button
                style={styles.createCard}
                onClick={() =>
                  setShowCreateModal(true)
                }
              >

                <div style={styles.createCardIcon}>
                  ＋
                </div>

                <h3 style={styles.createCardTitle}>
                  Create New Resume
                </h3>

                <p style={styles.createCardText}>
                  Start with a fresh professional
                  resume.
                </p>

              </button>

            </div>

          )}

        </section>

        {/* FOOTER */}

        <footer style={styles.footer}>
          <span>
            Resume-X
          </span>

          <span>
            Build your career. Build your future.
          </span>
        </footer>

      </main>

      {/* =========================
          CREATE MODAL
      ========================= */}

      {showCreateModal && (

        <div
          style={styles.modalOverlay}
          onClick={() =>
            setShowCreateModal(false)
          }
        >

          <div
            style={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div style={styles.modalHeader}>

              <div>
                <h2 style={styles.modalTitle}>
                  Create New Resume
                </h2>

                <p style={styles.modalSubtitle}>
                  Give your resume a name to get started.
                </p>
              </div>

              <button
                style={styles.closeButton}
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                ×
              </button>

            </div>

            <label style={styles.modalLabel}>
              Resume Name
            </label>

            <input
              autoFocus
              type="text"
              placeholder="e.g. Software Developer Resume"
              value={resumeName}
              onChange={(e) =>
                setResumeName(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCreateResume();
                }
              }}
              style={styles.modalInput}
            />

            <div style={styles.modalActions}>

              <button
                style={styles.cancelButton}
                onClick={() => {
                  setResumeName("");
                  setShowCreateModal(false);
                }}
              >
                Cancel
              </button>

              <button
                style={styles.modalCreateButton}
                onClick={handleCreateResume}
              >
                Create Resume
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    color: "#111827",
    display: "flex",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  // SIDEBAR

  sidebar: {
    width: "245px",
    minHeight: "100vh",
    background: "#ffffff",
    borderRight: "1px solid #e5e7eb",
    padding: "28px 18px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    position: "sticky",
    top: 0,
    height: "100vh",
  },

  logo: {
    fontSize: "25px",
    fontWeight: "800",
    letterSpacing: "-1px",
    padding: "0 12px",
    marginBottom: "45px",
  },

  logoAccent: {
    color: "#4f46e5",
  },

  sidebarSection: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  sectionLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#9ca3af",
    letterSpacing: "1px",
    padding: "0 12px",
    marginBottom: "8px",
  },

  activeMenu: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 13px",
    borderRadius: "9px",
    background: "#eef2ff",
    color: "#4338ca",
    fontWeight: "700",
    fontSize: "14px",
  },

  sidebarButton: {
    width: "100%",
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 13px",
    borderRadius: "9px",
    color: "#4b5563",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "left",
  },

  sidebarBottom: {
    marginTop: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  logoutButton: {
    width: "100%",
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 13px",
    borderRadius: "9px",
    color: "#dc2626",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    textAlign: "left",
  },

  // MAIN

  main: {
    flex: 1,
    minWidth: 0,
    padding: "38px 45px",
    boxSizing: "border-box",
  },

  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "30px",
  },

  heading: {
    margin: 0,
    fontSize: "31px",
    fontWeight: "800",
    letterSpacing: "-0.8px",
  },

  subheading: {
    margin: "7px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  primaryButton: {
    border: "none",
    background: "#4f46e5",
    color: "#ffffff",
    padding: "12px 18px",
    borderRadius: "9px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(79,70,229,0.18)",
    whiteSpace: "nowrap",
  },

  plusIcon: {
    marginRight: "5px",
    fontSize: "16px",
  },

  // STATS

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "18px",
    marginBottom: "32px",
  },

  statCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "13px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  statIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "#eef2ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  },

  statLabel: {
    margin: 0,
    color: "#6b7280",
    fontSize: "12px",
    fontWeight: "600",
  },

  statValue: {
    margin: "3px 0 0",
    fontSize: "21px",
    fontWeight: "800",
  },

  // TOOLBAR

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
  },

  searchBox: {
    flex: 1,
    maxWidth: "500px",
    height: "44px",
    background: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "9px",
    display: "flex",
    alignItems: "center",
    padding: "0 13px",
    boxSizing: "border-box",
  },

  searchIcon: {
    fontSize: "14px",
    marginRight: "8px",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    color: "#111827",
    background: "transparent",
  },

  sortSelect: {
    height: "44px",
    padding: "0 13px",
    borderRadius: "9px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#374151",
    fontSize: "13px",
    fontWeight: "600",
    outline: "none",
    cursor: "pointer",
  },

  // SECTION

  sectionHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },

  resumeHeading: {
    margin: 0,
    fontSize: "20px",
    fontWeight: "800",
  },

  resumeCount: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#9ca3af",
  },

  // CARDS

  resumeGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  resumeCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "20px",
    minHeight: "230px",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    transition: "box-shadow 0.2s ease",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  documentIcon: {
    width: "43px",
    height: "43px",
    borderRadius: "10px",
    background: "#eef2ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "19px",
  },

  moreButton: {
    width: "32px",
    height: "32px",
    border: "none",
    background: "#f9fafb",
    borderRadius: "7px",
    cursor: "pointer",
    fontSize: "19px",
    color: "#6b7280",
  },

  cardContent: {
    marginTop: "18px",
    flex: 1,
  },

  resumeName: {
    margin: 0,
    fontSize: "17px",
    fontWeight: "750",
    wordBreak: "break-word",
  },

  updatedText: {
    margin: "7px 0 0",
    color: "#9ca3af",
    fontSize: "12px",
  },

  cardActions: {
    display: "grid",
    gridTemplateColumns: "1fr 90px",
    gap: "8px",
    marginTop: "17px",
  },

  editButton: {
    border: "none",
    background: "#4f46e5",
    color: "#ffffff",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },

  previewButton: {
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#374151",
    borderRadius: "8px",
    padding: "10px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
  },

  secondaryActions: {
    display: "flex",
    gap: "12px",
    marginTop: "13px",
    paddingTop: "12px",
    borderTop: "1px solid #f3f4f6",
  },

  textButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    color: "#6b7280",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
  },

  deleteTextButton: {
    border: "none",
    background: "transparent",
    padding: 0,
    color: "#dc2626",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
  },

  // CREATE CARD

  createCard: {
    minHeight: "230px",
    border: "2px dashed #d1d5db",
    background: "#ffffff",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "25px",
  },

  createCardIcon: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "23px",
    fontWeight: "700",
    marginBottom: "12px",
  },

  createCardTitle: {
    margin: 0,
    fontSize: "15px",
    fontWeight: "750",
  },

  createCardText: {
    margin: "6px 0 0",
    fontSize: "12px",
    color: "#9ca3af",
    textAlign: "center",
  },

  // EMPTY STATE

  emptyState: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "65px 20px",
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: "38px",
    marginBottom: "13px",
  },

  emptyTitle: {
    margin: 0,
    fontSize: "19px",
    fontWeight: "800",
  },

  emptyText: {
    maxWidth: "400px",
    margin: "8px auto 20px",
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: 1.6,
  },

  // FOOTER

  footer: {
    marginTop: "55px",
    paddingTop: "20px",
    borderTop: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    color: "#9ca3af",
    fontSize: "11px",
  },

  // MODAL

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 1000,
  },

  modal: {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    borderRadius: "16px",
    padding: "25px",
    boxSizing: "border-box",
    boxShadow:
      "0 25px 60px rgba(0,0,0,0.18)",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "25px",
  },

  modalTitle: {
    margin: 0,
    fontSize: "21px",
    fontWeight: "800",
  },

  modalSubtitle: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "13px",
  },

  closeButton: {
    width: "32px",
    height: "32px",
    border: "none",
    background: "#f3f4f6",
    borderRadius: "8px",
    fontSize: "20px",
    cursor: "pointer",
    color: "#6b7280",
  },

  modalLabel: {
    display: "block",
    marginBottom: "8px",
    fontSize: "13px",
    fontWeight: "700",
    color: "#374151",
  },

  modalInput: {
    width: "100%",
    height: "45px",
    boxSizing: "border-box",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "0 13px",
    fontSize: "14px",
    outline: "none",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "23px",
  },

  cancelButton: {
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#374151",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },

  modalCreateButton: {
    border: "none",
    background: "#4f46e5",
    color: "#ffffff",
    padding: "10px 17px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Dashboard;