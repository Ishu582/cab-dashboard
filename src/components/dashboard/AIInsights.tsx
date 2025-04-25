import Card from "../common/Card"
import { TrendingUp, AlertTriangle, ThumbsUp } from "lucide-react"

const AIInsights = () => {
  return (
    <Card title="AI Insights" className="h-full">
      <div className="space-y-4">
        <div className="flex items-start p-3 bg-primary-50 rounded-lg">
          <div className="flex-shrink-0 p-1.5 bg-primary-100 rounded-md">
            <TrendingUp className="h-5 w-5 text-primary-600" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-primary-800">Demand Prediction</h4>
            <p className="mt-1 text-sm text-primary-700">
              Based on historical data, you should increase cab allocation on Mondays and Fridays by 15% to prevent
              underbooking.
            </p>
          </div>
        </div>

        <div className="flex items-start p-3 bg-error-50 rounded-lg">
          <div className="flex-shrink-0 p-1.5 bg-error-100 rounded-md">
            <AlertTriangle className="h-5 w-5 text-error-600" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-error-800">Cost Anomaly Detected</h4>
            <p className="mt-1 text-sm text-error-700">
              The Marketing department's cab expenses are 32% higher than average this month. Consider investigating
              unusual usage patterns.
            </p>
          </div>
        </div>

        <div className="flex items-start p-3 bg-success-50 rounded-lg">
          <div className="flex-shrink-0 p-1.5 bg-success-100 rounded-md">
            <ThumbsUp className="h-5 w-5 text-success-600" />
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-success-800">Sentiment Analysis</h4>
            <p className="mt-1 text-sm text-success-700">
              Driver satisfaction ratings have improved by 12% after implementing the new feedback system. Keep up the
              good work!
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">View All Insights</button>
      </div>
    </Card>
  )
}

export default AIInsights
