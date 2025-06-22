import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Menu, X } from "lucide-react";
import api from "../components/api";
import ResumeUploader from "../components/Students/resumeUploader";
import StudentSkillMonitor from "../components/students/StudentSkillMonitor";

const Dashboard = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [resumeData, setResumeData] = useState(null);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  const logout = async () => {
    try {
      await api.post("/api/students/logout");
      navigate("/student/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const fetchProfileAndResume = async () => {
      try {
        const res = await api.get("/api/profile/me");
        setProfile(res.data);

        const resumeRes = await api.get("/api/resume/me");
        setResumeData(resumeRes.data);
      } catch (err) {
        if (err.response?.status === 404) {
          if (err.config.url.includes("/api/profile")) {
            navigate("/profile");
          }
        } else if (err.response?.status === 401) {
          navigate("/student/login");
        } else {
          console.error("Unexpected error:", err);
        }
      }
    };

    fetchProfileAndResume();
  }, [navigate]);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <button
          onClick={toggleMenu}
          className={styles.menuButton}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className={styles.title}>
          {role ? `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard` : "Student Dashboard"}
        </h1>
      </header>

      <div className={styles.main}>
        <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ""}`}>
          <ul>
            <li><button onClick={() => navigate("/profile")}>Profile</button></li>
            <li><button onClick={() => navigate("/settings")}>Settings</button></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        </aside>

        <section className={styles.content}>
          <h2>Welcome, {profile?.fullName || "Loading..."}</h2>
          <p>This is your personalized dashboard.</p>

          {resumeData && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold mb-4">Skill Intelligence Monitor</h3>
              <StudentSkillMonitor resumeData={resumeData} />
            </div>
          )}

          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">Upload or Replace Resume</h3>
            <ResumeUploader />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
