import axios from "axios"
import { useAuthStore } from "../stores/authStore"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"

// Create axios instance
export const apiV1 = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
})
export const authApi = axios.create({
  baseURL: `${API_BASE_URL}/api/v1/auth`,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
apiV1.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle auth errors
apiV1.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      useAuthStore.getState().logout()
      window.location.href = "/auth"
    }
    return Promise.reject(error)
  },
)
