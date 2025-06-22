import { useEffect, useState } from "react";
import styles from "./styles/StudentSkillMonitor.module.css";
import { getParsedResume } from "../api";

export default function StudentSkillMonitor() {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchResume = async () => {
      try {
        console.log("📡 Requesting parsed resume...");
        const data = await getParsedResume();

        if (!data || !data.predicted_role) {
          throw new Error("Resume parsing failed or returned incomplete data.");
        }

        setResumeData(data);
      } catch (err) {
        console.error("❌ Failed to load resume data:", err);
        setErrorMsg(err.message || "Failed to analyze your resume.");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

 if (loading) {
  return (
    <div className={styles.loading}>
      <div className={styles.loaderWrapper} title="Loading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          style={{ enableBackground: "new 0 0 50 50" }}
        >
          <rect x="0" y="0" width="4" height="7" fill="#FF6700">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="scale"
              values="1,1; 1,3; 1,1"
              begin="0s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="10" y="0" width="4" height="7" fill="#FF6700">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="scale"
              values="1,1; 1,3; 1,1"
              begin="0.2s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="20" y="0" width="4" height="7" fill="#FF6700">
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="scale"
              values="1,1; 1,3; 1,1"
              begin="0.4s"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
        <p className={styles.loaderText}>Analyzing your resume...</p>
      </div>
    </div>
  );
}


  if (errorMsg) {
    return (
      <div className={styles.error}>
        ❌ {errorMsg}
        <br />
        Please re-upload your resume or contact support.
      </div>
    );
  }

  if (!resumeData) {
    return <div className={styles.error}>❌ No resume data available.</div>;
  }

  const {
    predicted_role,
    confidence_scores,
    seen_strengths,
    soft_skills,
    notable_projects,
    toolset,
    certifications = [],
    courses = [],
    awards = [],
    volunteering = []
  } = resumeData;

  const skillMap = {
    "Software Engineer": ["JavaScript", "React", "Node.js", "C++", "Git", "Web Development"],
    "Data Scientist": ["Pandas", "NumPy", "Statistics", "SQL", "Data Visualization", "ML"],
    "Product Manager": ["Stakeholder Management", "Leadership", "Business Intelligence"],
    "AI Engineer": ["Python", "TensorFlow", "NLP", "Speech Recognition", "PyTorch", "Keras", "Deep Learning"],
    "Cloud Architect": ["Cloud", "AWS", "Kubernetes", "Security", "Scalability"]
  };

  const expectedSkills = skillMap[predicted_role] || [];
  const missingSkills = expectedSkills.filter(skill => !seen_strengths.includes(skill));

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📊 Skill Intelligence Monitor</h1>

      <div className={styles.section}>
        <h2 className={styles.subheading}>🎯 Predicted Role</h2>
        <p className={styles.role}>{predicted_role}</p>

        <h3 className={styles.subheading}>Confidence Breakdown:</h3>
        <ul className={styles.confidenceList}>
          {Object.entries(confidence_scores).map(([role, score]) => (
            <li key={role}>
              {role}: <span className={styles.mono}>{Math.round(score * 100)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.grid}>
        <SkillCard title="✅ Technical Strengths" items={seen_strengths} />
        <SkillCard title="🧠 Soft Skills" items={soft_skills} />
        <SkillCard title="🛠 Tools" items={toolset} />
        <SkillCard title="📁 Projects" items={notable_projects} />
        <SkillCard title="📜 Certifications" items={certifications} />
        <SkillCard title="🎓 Courses" items={courses} />
        <SkillCard title="🏆 Awards" items={awards} />
        <SkillCard title="⚠️ Missing Role Skills" items={missingSkills.length ? missingSkills : ["None"]} />
        <SkillCard title="🤝 Volunteering" items={volunteering} />

      </div>
    </div>
  );
}

function SkillCard({ title, items }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      {items.length > 0 ? (
        <ul className={styles.cardList}>
          {items.map((item, idx) => (
            <li key={idx} className={styles.cardItem}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>No data available</p>
      )}
    </div>
  );
}
