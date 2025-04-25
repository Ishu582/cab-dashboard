"use client"
import Card from "../common/Card"

// Mock data for usage metrics
const usageData = [
  { month: "Jan", trips: 120 },
  { month: "Feb", trips: 150 },
  { month: "Mar", trips: 180 },
  { month: "Apr", trips: 220 },
  { month: "May", trips: 270 },
  { month: "Jun", trips: 250 },
]

const UsageMetrics = () => {
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...usageData.map((item) => item.trips))

  return (
    <Card title="Monthly Usage Trends" className="h-full">
      <div className="h-64 flex items-end space-x-2">
        {usageData.map((data, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-primary-500 rounded-t-sm transition-all duration-500 ease-in-out hover:bg-primary-600"
              style={{
                height: `${(data.trips / maxValue) * 180}px`,
                animation: `growUp 0.5s ease-out ${index * 0.1}s forwards`,
                transform: "scaleY(0)",
                transformOrigin: "bottom",
              }}
            ></div>
            <div className="text-xs text-gray-500 mt-2">{data.month}</div>
            <div className="text-xs font-medium">{data.trips}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <div>
          <p className="text-sm text-gray-500">Total Trips</p>
          <p className="text-2xl font-semibold text-gray-900">1,190</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Monthly Average</p>
          <p className="text-2xl font-semibold text-gray-900">198</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Growth</p>
          <p className="text-2xl font-semibold text-success-500">+18%</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes growUp {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </Card>
  )
}

export default UsageMetrics
