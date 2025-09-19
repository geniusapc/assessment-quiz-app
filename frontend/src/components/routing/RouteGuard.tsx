
import type React from "react"

import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthStore } from "../../stores/authStore"

interface RouteGuardProps {
  children: React.ReactNode
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, token } = useAuthStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated || !token) {
      // Allow access to auth page
      if (location.pathname !== "/auth") {
        navigate("/auth", { replace: true })
      }
      return
    }

    // If authenticated and on auth page, redirect to questions
    if (location.pathname === "/auth") {
      navigate("/questions", { replace: true })
    }
  }, [isAuthenticated, token, location.pathname, navigate])

  return <>{children}</>
}
