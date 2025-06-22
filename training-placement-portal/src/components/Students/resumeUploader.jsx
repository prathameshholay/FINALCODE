import { useState, useEffect } from "react";
import { uploadResume, getMyResume } from "../api";

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [resume, setResume] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false); // toggle for replacement

  // ✅ Fetch resume on mount
  useEffect(() => {
    getMyResume()
      .then(res => {
        setResume(res.data);
        setStatus("Resume already uploaded.");
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setResume(null); // No resume uploaded
        } else {
          console.error("Error checking resume:", err);
          setStatus("Error fetching resume.");
        }
      });
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const res = await uploadResume(formData);
      setResume({ resume_id: res.data.id });
      setStatus("Resume uploaded successfully.");
      setShowUploadForm(false);
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("Failed to upload resume.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>

      {resume && !showUploadForm ? (
        <div className="text-green-700 mb-4">
          ✅ Resume already uploaded.
          <div className="mt-1 text-sm text-gray-700">
            Resume ID: <span className="font-mono">{resume.resume_id}</span>
          </div>
          <button
            onClick={() => setShowUploadForm(true)}
            className="mt-3 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Replace Resume
          </button>
        </div>
      ) : (
        <>
          <input
            type="file"
            accept=".pdf,.docx"
            className="mb-4"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}

      {status && (
        <div className="mt-4 text-sm text-gray-700">
          {status}
        </div>
      )}
    </div>
  );
}
