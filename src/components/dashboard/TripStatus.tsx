import { Clock, CheckCircle, AlertCircle } from "lucide-react"

interface TripStatusProps {
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  className?: string
}

const TripStatus = ({ status, className = "" }: TripStatusProps) => {
  const getStatusInfo = () => {
    switch (status) {
      case "scheduled":
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "Scheduled",
          color: "text-primary-500 bg-primary-50",
        }
      case "in-progress":
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "In Progress",
          color: "text-accent-500 bg-accent-50",
        }
      case "completed":
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          text: "Completed",
          color: "text-success-500 bg-success-50",
        }
      case "cancelled":
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          text: "Cancelled",
          color: "text-error-500 bg-error-50",
        }
      default:
        return {
          icon: <Clock className="h-4 w-4" />,
          text: "Unknown",
          color: "text-gray-500 bg-gray-50",
        }
    }
  }

  const { icon, text, color } = getStatusInfo()

  return (
    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color} ${className}`}>
      {icon}
      <span className="ml-1">{text}</span>
    </div>
  )
}

export default TripStatus
