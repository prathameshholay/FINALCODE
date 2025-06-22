import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// ✅ Centralized Axios instance for app backend
const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ✅ Interceptors
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errMsg = error?.response?.data?.msg || error.message;
    console.error('API error:', errMsg);

    if (error?.response?.status === 401) {
      window.location.href = '/student/login';
    }

    return Promise.reject(error);
  }
);

// === STUDENT AUTH / PROFILE
export const getStudentProfile = () => api.get("/api/profile/me");
export const logoutStudent = () => api.post("/api/students/logout");

// === RESUME
export const uploadResume = (formData) =>
  api.post("/api/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  });

export const getMyResume = () => api.get("/api/resume/me");

export const getParsedResume = async () => {
  try {
    // Call your JS backend directly (which internally parses the resume)
    const parsedRes = await api.post("/api/resume/parse");

    return parsedRes.data;
  } catch (err) {
    console.error("❌ Error in getParsedResume:", err.message || err);
    throw err;
  }
};


export default api;
