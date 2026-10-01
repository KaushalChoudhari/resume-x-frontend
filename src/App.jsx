import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateResume from "./pages/CreateResume";
import Education from "./pages/Education";
import Experience from "./pages/Experience";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Certifications from "./pages/Certifications";
import Preview from "./pages/Preview";
import Templates from "./pages/Templates";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ATSAnalyzer from "./pages/ATSAnalyzer";
import ATSUpload from "./pages/ATSUpload";
import ATSUploadResult from "./pages/ATSUploadResult";

import ProtectedRoute from "./components/ProtectedRoute";

import { ResumeProvider } from "./context/ResumeContext";

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <Routes>

          {/* PUBLIC ROUTES */}

          <Route path="/" element={<Home />} />

          <Route
            path="/templates"
            element={<Templates />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />


          {/* PROTECTED RESUME ROUTES */}

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create-resume"
            element={
              <ProtectedRoute>
                <CreateResume />
              </ProtectedRoute>
            }
          />

          <Route
            path="/education"
            element={
              <ProtectedRoute>
                <Education />
              </ProtectedRoute>
            }
          />

          <Route
            path="/experience"
            element={
              <ProtectedRoute>
                <Experience />
              </ProtectedRoute>
            }
          />

          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <Skills />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/certifications"
            element={
              <ProtectedRoute>
                <Certifications />
              </ProtectedRoute>
            }
          />

          <Route
            path="/preview"
            element={
              <ProtectedRoute>
                <Preview />
              </ProtectedRoute>
            }
          />


          {/* EXISTING JD-BASED ATS ANALYZER */}

          <Route
            path="/ats-analyzer"
            element={
              <ProtectedRoute>
                <ATSAnalyzer />
              </ProtectedRoute>
            }
          />


          {/* NEW ATS UPLOAD FLOW */}

          <Route
            path="/ats-upload"
            element={
              <ProtectedRoute>
                <ATSUpload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ats-upload-result"
            element={
              <ProtectedRoute>
                <ATSUploadResult />
              </ProtectedRoute>
            }
          />

        </Routes>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;