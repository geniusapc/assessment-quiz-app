import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message: string
  className?: string
}

export default function ErrorMessage({ message, className = "" }: ErrorMessageProps) {
  return (
    <div className={`flex items-center space-x-2 text-destructive ${className}`}>
      <AlertCircle className="h-4 w-4" />
      <span className="text-sm">{message}</span>
    </div>
  )
}
