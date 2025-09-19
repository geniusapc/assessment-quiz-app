"use client"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { useAppStore } from "../../stores/appStore"

export default function NotificationToast() {
  const { notifications, removeNotification } = useAppStore()

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getBorderColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-green-500"
      case "error":
        return "border-red-500"
      case "warning":
        return "border-yellow-500"
      case "info":
        return "border-blue-500"
      default:
        return "border-blue-500"
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`card p-4 min-w-[300px] max-w-[400px] border-l-4 ${getBorderColor(notification.type)} animate-in slide-in-from-right duration-300`}
        >
          <div className="flex items-start space-x-3">
            {getIcon(notification.type)}
            <div className="flex-1">
              <h4 className="font-medium text-sm">{notification.title}</h4>
              {notification.message && <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
