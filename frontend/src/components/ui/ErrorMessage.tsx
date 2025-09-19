import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message: string
  className?: string
}

export default function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
  return (
    <div className={`flex items-start space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
      <span className="text-sm text-red-700 font-medium">{message}</span>
    </div>
  )
}