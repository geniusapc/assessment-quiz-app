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

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50"
      case "error":
        return "bg-red-50"
      case "warning":
        return "bg-yellow-50"
      case "info":
        return "bg-blue-50"
      default:
        return "bg-blue-50"
    }
  }

  const getBorderColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500"
      case "error":
        return "border-l-red-500"
      case "warning":
        return "border-l-yellow-500"
      case "info":
        return "border-l-blue-500"
      default:
        return "border-l-blue-500"
    }
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${getBackgroundColor(notification.type)} ${getBorderColor(notification.type)} rounded-xl shadow-lg border-l-4 p-4 min-w-[320px] max-w-[400px] animate-in slide-in-from-right duration-500 fade-in-90`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 text-sm">
                {notification.title}
              </h4>
              {notification.message && (
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  {notification.message}
                </p>
              )}
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}