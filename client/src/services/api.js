import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api"
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Helper function to get image URL from filename
export const getImageUrl = (filename) => {
  if (!filename) return null;
  const baseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";
  // Remove /api from the end to get server base URL
  const serverBase = baseURL.replace(/\/api$/, "");
  return `${serverBase}/uploads/${filename}`;
};

export default API;
