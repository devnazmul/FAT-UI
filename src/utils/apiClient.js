import axios from "axios";

// Use env variable for base URL, fallback to empty string if not set
const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

// Add Authorization header dynamically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.headers.Authorization)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
