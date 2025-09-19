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
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/questions"
            className="flex items-center space-x-2 transition-transform duration-200 hover:scale-105"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-xl font-bold text-gray-800">Quiz App</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/questions"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Questions
            </Link>
            <Link
              to="/quiz"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Take Quiz
            </Link>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 hidden md:block">{user.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center space-x-1"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}