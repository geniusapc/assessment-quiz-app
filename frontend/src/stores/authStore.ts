import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, AuthResponse } from "../types/index"

interface AuthState {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    login: (authData: AuthResponse) => void
    logout: () => void
    setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            login: (authData: AuthResponse) => {
                set({
                    user: authData.data.user,
                    token: authData.data.accessToken,
                    isAuthenticated: true,
                })
            },
            logout: () => {
                set({
                    user: null,
                    token: null,
                    isAuthenticated: false,
                })
            },
            setUser: (user: User) => {
                set({ user })
            },
        }),
        {
            name: "auth-storage",
        },
    ),
)
