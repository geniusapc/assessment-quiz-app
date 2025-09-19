"use client"

import { Link, useNavigate } from "react-router-dom"
import { LogOut, Brain } from "lucide-react"
import { useAuthStore } from "../../stores/authStore"

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/auth")
  }

  if (!user) return null

  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/questions" className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Quiz App</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/questions" className="text-foreground hover:text-primary transition-colors">
              Questions
            </Link>
            <Link to="/quiz" className="text-foreground hover:text-primary transition-colors">
              Take Quiz
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <button onClick={handleLogout} className="btn-secondary p-2" title="Logout">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
