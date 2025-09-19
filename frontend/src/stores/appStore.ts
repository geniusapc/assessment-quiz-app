import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AppState {
  theme: "light" | "dark"
  sidebarOpen: boolean
  notifications: Notification[]
  setTheme: (theme: "light" | "dark") => void
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  duration?: number
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      sidebarOpen: false,
      notifications: [],

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      addNotification: (notification) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newNotification: Notification = {
          id,
          duration: 5000,
          ...notification,
        }

        set((state) => ({
          notifications: [...state.notifications, newNotification],
        }))

        // Auto remove notification after duration
        if (newNotification.duration && newNotification.duration > 0) {
          setTimeout(() => {
            get().removeNotification(id)
          }, newNotification.duration)
        }
      },

      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
