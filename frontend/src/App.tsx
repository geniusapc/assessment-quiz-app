import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom"
import { useAuthStore } from "./stores/authStore"
import AuthPage from "./pages/AuthPage"
import { RouteGuard } from "./components/routing"
import { NotificationToast } from "./components/ui"

function App() {
  const { isAuthenticated } = useAuthStore()

  return (

    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <RouteGuard>
          <Routes>
            <Route path="/auth" element={isAuthenticated ? <Navigate to="/questions" replace /> : <AuthPage />} />
          </Routes>
        </RouteGuard>
        <NotificationToast />
      </div>
    </BrowserRouter>
  )
}

export default App
