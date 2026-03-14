import axios from "axios";

// In production there's no localhost, so we make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// Automatically attach JWT token from localStorage to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("notara_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;