import type { ReactNode } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  icon: ReactNode
  change?: number
  changeText?: string
  changeType?: "increase" | "decrease" | "neutral"
  className?: string
}

const StatsCard = ({
  title,
  value,
  icon,
  change,
  changeText,
  changeType = "neutral",
  className = "",
}: StatsCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-2 bg-primary-50 rounded-lg">{icon}</div>
      </div>

      {(change !== undefined || changeText) && (
        <div className="mt-4 flex items-center">
          {change !== undefined && (
            <span
              className={`mr-2 flex items-center text-sm font-medium ${
                changeType === "increase"
                  ? "text-success-500"
                  : changeType === "decrease"
                    ? "text-error-500"
                    : "text-gray-500"
              }`}
            >
              {changeType === "increase" ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : changeType === "decrease" ? (
                <ArrowDown className="mr-1 h-4 w-4" />
              ) : null}
              {change}%
            </span>
          )}
          {changeText && <span className="text-sm text-gray-500">{changeText}</span>}
        </div>
      )}
    </div>
  )
}

export default StatsCard
