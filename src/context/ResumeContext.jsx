import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const ResumeContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL}/api/resumes`;

// ================================================
// EMPTY RESUME DATA
// ================================================

const createEmptyResumeData = () => ({
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    jobTitle: "",
    summary: "",
  },

  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
});

// ================================================
// CREATE TEMPORARY ID
// ================================================

const createId = () => {
  return `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};

// ================================================
// GET JWT TOKEN
// ================================================

const getToken = () => {
  return localStorage.getItem("token");
};

// ================================================
// HANDLE UNAUTHORIZED / EXPIRED TOKEN
// ================================================

const handleUnauthorized = () => {
  console.error(
    "Session expired or unauthorized"
  );

  localStorage.removeItem("token");

  localStorage.removeItem(
    "currentResumeId"
  );

  window.location.href = "/login";
};

// ================================================
// CREATE LOCAL RESUME
// ================================================

const createNewResume = (
  name = "My Resume",
  data = null
) => ({
  id: createId(),

  name,

  resumeData:
    data || createEmptyResumeData(),

  selectedTemplate:
    "professional",

  createdAt:
    new Date().toISOString(),

  updatedAt:
    new Date().toISOString(),
});

// ================================================
// BACKEND → FRONTEND
// ================================================

const convertBackendResume = (
  resume
) => {
  let parsedData =
    createEmptyResumeData();

  try {
    if (resume.resumeData) {
      parsedData =
        typeof resume.resumeData ===
        "string"
          ? JSON.parse(
              resume.resumeData
            )
          : resume.resumeData;
    }
  } catch (error) {
    console.error(
      "Error parsing resume data:",
      error
    );
  }

  return {
    id: String(resume.id),

    name:
      resume.resumeName ||
      "My Resume",

    resumeData: {
      ...createEmptyResumeData(),

      ...parsedData,

      personal: {
        ...createEmptyResumeData()
          .personal,

        ...(parsedData.personal || {}),
      },
    },

    selectedTemplate:
      resume.template ||
      "professional",

    createdAt:
      resume.createdAt ||
      new Date().toISOString(),

    updatedAt:
      resume.updatedAt ||
      new Date().toISOString(),
  };
};

// ================================================
// RESUME PROVIDER
// ================================================

export const ResumeProvider = ({
  children,
}) => {

  const [state, setState] =
    useState({
      resumes: [],

      currentResumeId:
        localStorage.getItem(
          "currentResumeId"
        ) || null,
    });

  const [loading, setLoading] =
    useState(true);

  const [saveStatus, setSaveStatus] =
  useState("idle");

  const {
    resumes,
    currentResumeId,
  } = state;

  // ================================================
  // CURRENT RESUME
  // ================================================

  const currentResume =
    resumes.find(
      (resume) =>
        String(resume.id) ===
        String(currentResumeId)
    ) || resumes[0];

  const resumeData =
    currentResume?.resumeData ||
    createEmptyResumeData();

  const selectedTemplate =
    currentResume?.selectedTemplate ||
    "professional";

  // ================================================
  // FETCH USER RESUMES
  // ================================================

  const fetchResumes = async () => {

    const token = getToken();

    if (!token) {

      setState({
        resumes: [],
        currentResumeId: null,
      });

      setLoading(false);

      return;
    }

    try {

      const response =
        await fetch(API_URL, {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        });

      // --------------------------------
      // JWT EXPIRED / UNAUTHORIZED
      // --------------------------------

      if (
        response.status === 401 ||
        response.status === 403
      ) {

        handleUnauthorized();

        return;
      }

      if (!response.ok) {

        throw new Error(
          "Failed to fetch resumes"
        );
      }

      const data =
        await response.json();

      const backendResumes =
        data.map(
          convertBackendResume
        );

      let savedCurrentId =
        localStorage.getItem(
          "currentResumeId"
        );

      // --------------------------------
      // CHECK CURRENT RESUME
      // --------------------------------

      const currentExists =
        backendResumes.some(
          (resume) =>
            String(resume.id) ===
            String(savedCurrentId)
        );

      // --------------------------------
      // SELECT FIRST RESUME
      // --------------------------------

      if (
        !currentExists &&
        backendResumes.length > 0
      ) {

        savedCurrentId =
          backendResumes[0].id;
      }

      // --------------------------------
      // NO RESUMES
      // --------------------------------

      if (
        backendResumes.length === 0
      ) {

        savedCurrentId = null;

        localStorage.removeItem(
          "currentResumeId"
        );
      }

      setState({
        resumes:
          backendResumes,

        currentResumeId:
          savedCurrentId,
      });

    } catch (error) {

      console.error(
        "Error fetching resumes:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  // ================================================
  // LOAD RESUMES
  // ================================================

  useEffect(() => {

    fetchResumes();

  }, []);

  // ================================================
  // SAVE CURRENT RESUME ID
  // ================================================

  useEffect(() => {

    if (currentResumeId) {

      localStorage.setItem(
        "currentResumeId",
        currentResumeId
      );

    } else {

      localStorage.removeItem(
        "currentResumeId"
      );
    }

  }, [currentResumeId]);

  // ================================================
  // CREATE NEW RESUME
  // ================================================

  const createResume = async (
    name = "Untitled Resume"
  ) => {

    const token = getToken();

    if (!token) {

      handleUnauthorized();

      return null;
    }

    const newResume =
      createNewResume(name);

    // --------------------------------
    // TEMPORARY UI
    // --------------------------------

    setState((prev) => ({

      ...prev,

      resumes: [
        ...prev.resumes,
        newResume,
      ],

      currentResumeId:
        newResume.id,
    }));

    try {

      const response =
        await fetch(API_URL, {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            resumeName: name,

            resumeData:
              newResume.resumeData,

            template:
              newResume.selectedTemplate,
          }),
        });

      // --------------------------------
      // AUTH ERROR
      // --------------------------------

      if (
        response.status === 401 ||
        response.status === 403
      ) {

        handleUnauthorized();

        return null;
      }

      if (!response.ok) {

        throw new Error(
          "Failed to create resume"
        );
      }

      const savedResume =
        await response.json();

      const convertedResume =
        convertBackendResume(
          savedResume
        );

      // --------------------------------
      // REPLACE TEMPORARY ID
      // --------------------------------

      setState((prev) => ({

        ...prev,

        resumes:
          prev.resumes.map(
            (resume) =>
              resume.id ===
              newResume.id
                ? convertedResume
                : resume
          ),

        currentResumeId:
          convertedResume.id,
      }));

      return convertedResume.id;

    } catch (error) {

      console.error(
        "Error creating resume:",
        error
      );

      // --------------------------------
      // REMOVE FAILED TEMP RESUME
      // --------------------------------

      setState((prev) => ({

        ...prev,

        resumes:
          prev.resumes.filter(
            (resume) =>
              resume.id !==
              newResume.id
          ),

        currentResumeId:
          prev.resumes.length > 0
            ? prev.resumes[0].id
            : null,
      }));

      return null;
    }
  };

  // ================================================
  // SELECT RESUME
  // ================================================

  const selectResume = (id) => {

    setState((prev) => {

      const exists =
        prev.resumes.some(
          (resume) =>
            String(resume.id) ===
            String(id)
        );

      if (!exists) {

        return prev;
      }

      return {
        ...prev,

        currentResumeId: id,
      };
    });
  };

  // ================================================
  // SAVE RESUME TO BACKEND
  // ================================================

  const saveResumeToBackend =
  async (
    id,
    name,
    data,
    template
  ) => {

    const token = getToken();

    if (!token) {

      handleUnauthorized();

      return false;
    }

    setSaveStatus("saving");

    try {

      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              resumeName:
                name,

              resumeData:
                data,

              template:
                template,
            }),
          }
        );

      // --------------------------------
      // AUTH ERROR
      // --------------------------------

      if (
        response.status === 401 ||
        response.status === 403
      ) {

        handleUnauthorized();

        return false;
      }

      // --------------------------------
      // OTHER SERVER ERROR
      // --------------------------------

      if (!response.ok) {

        console.error(
          "Failed to save resume"
        );

        setSaveStatus("error");

        return false;
      }

      // --------------------------------
      // SUCCESS
      // --------------------------------

      setSaveStatus("saved");

      return true;

    } catch (error) {

      console.error(
        "Error saving resume:",
        error
      );

      setSaveStatus("error");

      return false;
    }
  };
    // ================================================
  // UPDATE COMPLETE RESUME DATA
  // ================================================

  const updateResumeData = (
    data
  ) => {

    const activeId =
      state.currentResumeId ||
      state.resumes[0]?.id;

    if (!activeId) {
      return;
    }

    const updatedResume =
      state.resumes.find(
        (resume) =>
          String(resume.id) ===
          String(activeId)
      );

    if (!updatedResume) {
      return;
    }

    const updatedAt =
      new Date().toISOString();

    // --------------------------------
    // UPDATE UI
    // --------------------------------

    setState((prev) => ({

      ...prev,

      resumes:
        prev.resumes.map(
          (resume) => {

            if (
              String(resume.id) !==
              String(activeId)
            ) {

              return resume;
            }

            return {
              ...resume,

              resumeData: data,

              updatedAt,
            };
          }
        ),
    }));

    // --------------------------------
    // TEMP ID CHECK
    // --------------------------------

    if (
      typeof activeId ===
        "string" &&
      activeId.includes("-")
    ) {

      return;
    }

    saveResumeToBackend(
      activeId,

      updatedResume.name,

      data,

      updatedResume.selectedTemplate
    );
  };

  // ================================================
  // UPDATE PERSONAL
  // ================================================

  const updatePersonal = (
    data
  ) => {

    updateResumeData({

      ...resumeData,

      personal: {

        ...resumeData.personal,

        ...data,
      },
    });
  };

  // ================================================
  // UPDATE EDUCATION
  // ================================================

  const updateEducation = (
    data
  ) => {

    updateResumeData({

      ...resumeData,

      education: data,
    });
  };

  // ================================================
  // UPDATE EXPERIENCE
  // ================================================

  const updateExperience = (
    data
  ) => {

    updateResumeData({

      ...resumeData,

      experience: data,
    });
  };

  // ================================================
  // UPDATE SKILLS
  // ================================================

  const updateSkills = (
    data
  ) => {

    updateResumeData({

      ...resumeData,

      skills: data,
    });
  };

  // ================================================
  // UPDATE PROJECTS
  // ================================================

  const updateProjects = (
    data
  ) => {

    updateResumeData({

      ...resumeData,

      projects: data,
    });
  };

  // ================================================
  // UPDATE CERTIFICATIONS
  // ================================================

  const updateCertifications = (
    data
  ) => {

    updateResumeData({

      ...resumeData,

      certifications: data,
    });
  };

  // ================================================
  // UPDATE TEMPLATE
  // ================================================

  const updateTemplate = async (
    template
  ) => {

    const activeId =
      state.currentResumeId;

    if (!activeId) {
      return;
    }

    const activeResume =
      state.resumes.find(
        (resume) =>
          String(resume.id) ===
          String(activeId)
      );

    if (!activeResume) {
      return;
    }

    const updatedAt =
      new Date().toISOString();

    // --------------------------------
    // UPDATE UI
    // --------------------------------

    setState((prev) => ({

      ...prev,

      resumes:
        prev.resumes.map(
          (resume) => {

            if (
              String(resume.id) !==
              String(activeId)
            ) {

              return resume;
            }

            return {
              ...resume,

              selectedTemplate:
                template,

              updatedAt,
            };
          }
        ),
    }));

    // --------------------------------
    // SAVE BACKEND
    // --------------------------------

    if (
      !(
        typeof activeId ===
          "string" &&
        activeId.includes("-")
      )
    ) {

      await saveResumeToBackend(
        activeId,

        activeResume.name,

        activeResume.resumeData,

        template
      );
    }
  };

  // ================================================
  // RENAME RESUME
  // ================================================

  const renameResume = async (
    id,
    newName
  ) => {

    const resume =
      state.resumes.find(
        (item) =>
          String(item.id) ===
          String(id)
      );

    if (!resume) {
      return;
    }

    // --------------------------------
    // UPDATE UI
    // --------------------------------

    setState((prev) => ({

      ...prev,

      resumes:
        prev.resumes.map(
          (item) => {

            if (
              String(item.id) !==
              String(id)
            ) {

              return item;
            }

            return {
              ...item,

              name: newName,

              updatedAt:
                new Date().toISOString(),
            };
          }
        ),
    }));

    // --------------------------------
    // SAVE BACKEND
    // --------------------------------

    if (
      !(
        typeof id === "string" &&
        id.includes("-")
      )
    ) {

      await saveResumeToBackend(
        id,

        newName,

        resume.resumeData,

        resume.selectedTemplate
      );
    }
  };

  // ================================================
  // DUPLICATE RESUME
  // ================================================

  const duplicateResume =
    async (id) => {

      const token = getToken();

      if (!token) {

        handleUnauthorized();

        return null;
      }

      try {

        const response =
          await fetch(
            `${API_URL}/${id}/duplicate`,
            {
              method: "POST",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        // --------------------------------
        // AUTH ERROR
        // --------------------------------

        if (
          response.status === 401 ||
          response.status === 403
        ) {

          handleUnauthorized();

          return null;
        }

        if (!response.ok) {

          throw new Error(
            "Failed to duplicate resume"
          );
        }

        const savedResume =
          await response.json();

        const duplicate =
          convertBackendResume(
            savedResume
          );

        setState((prev) => ({

          ...prev,

          resumes: [
            ...prev.resumes,
            duplicate,
          ],

          currentResumeId:
            duplicate.id,
        }));

        return duplicate.id;

      } catch (error) {

        console.error(
          "Error duplicating resume:",
          error
        );

        return null;
      }
    };

  // ================================================
  // DELETE RESUME
  // ================================================

  const deleteResume =
    async (id) => {

      const token = getToken();

      if (!token) {

        handleUnauthorized();

        return;
      }

      try {

        const response =
          await fetch(
            `${API_URL}/${id}`,
            {
              method: "DELETE",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        // --------------------------------
        // AUTH ERROR
        // --------------------------------

        if (
          response.status === 401 ||
          response.status === 403
        ) {

          handleUnauthorized();

          return;
        }

        if (!response.ok) {

          throw new Error(
            "Failed to delete resume"
          );
        }

        setState((prev) => {

          const remainingResumes =
            prev.resumes.filter(
              (resume) =>
                String(resume.id) !==
                String(id)
            );

          // --------------------------------
          // NO RESUMES LEFT
          // --------------------------------

          if (
            remainingResumes.length ===
            0
          ) {

            return {
              resumes: [],
              currentResumeId: null,
            };
          }

          // --------------------------------
          // SELECT ANOTHER RESUME
          // --------------------------------

          const newCurrentId =
            String(
              prev.currentResumeId
            ) === String(id)
              ? remainingResumes[0].id
              : prev.currentResumeId;

          return {
            resumes:
              remainingResumes,

            currentResumeId:
              newCurrentId,
          };
        });

      } catch (error) {

        console.error(
          "Error deleting resume:",
          error
        );
      }
    };

  // ================================================
  // CLEAR CURRENT RESUME
  // ================================================

  const clearResume = () => {

    updateResumeData(
      createEmptyResumeData()
    );
  };

  // ================================================
  // CLEAR ALL RESUMES
  // ================================================

  const clearAllResumes =
    async () => {

      const token = getToken();

      if (!token) {

        handleUnauthorized();

        return;
      }

      try {

        const deleteRequests =
          state.resumes.map(
            (resume) =>
              fetch(
                `${API_URL}/${resume.id}`,
                {
                  method: "DELETE",

                  headers: {
                    Authorization:
                      `Bearer ${token}`,
                  },
                }
              )
          );

        const responses =
          await Promise.all(
            deleteRequests
          );

        // --------------------------------
        // CHECK AUTH
        // --------------------------------

        const unauthorized =
          responses.some(
            (response) =>
              response.status === 401 ||
              response.status === 403
          );

        if (unauthorized) {

          handleUnauthorized();

          return;
        }

        setState({
          resumes: [],
          currentResumeId: null,
        });

        localStorage.removeItem(
          "currentResumeId"
        );

      } catch (error) {

        console.error(
          "Error clearing resumes:",
          error
        );
      }
    };

  // ================================================
  // LOGOUT
  // ================================================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "currentResumeId"
    );

    setState({
      resumes: [],
      currentResumeId: null,
    });

    window.location.href =
      "/login";
  };

  // ================================================
  // PROVIDER
  // ================================================

  return (
    <ResumeContext.Provider
      value={{

        resumeData,

        currentResume,

        currentResumeId,

        selectedTemplate,

        loading,

        saveStatus,

        resumes,

        fetchResumes,

        createResume,

        selectResume,

        renameResume,

        duplicateResume,

        deleteResume,

        clearResume,

        clearAllResumes,

        logout,

        updateResumeData,

        updatePersonal,

        updateEducation,

        updateExperience,

        updateSkills,

        updateProjects,

        updateCertifications,

        updateTemplate,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

// ================================================
// CUSTOM HOOK
// ================================================

export const useResume = () => {

  return useContext(
    ResumeContext
  );
};