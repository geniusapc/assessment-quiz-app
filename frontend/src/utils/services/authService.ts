import type { AuthResponse, User } from "../../types"
import { authApi } from "../api"


export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  name?: string
}

export type AuthFormData = LoginCredentials & RegisterCredentials

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await authApi.post("/login", credentials)
    return response.data
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const response = await authApi.post("/register", credentials)
    return response.data
  },

  async getCurrentUser(token: string): Promise<User> {
    const response = await authApi.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  },
}
