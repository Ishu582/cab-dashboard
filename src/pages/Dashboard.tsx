import StatsCard from "../components/common/StatsCard"
import RecentTrips from "../components/dashboard/RecentTrips"
import UsageMetrics from "../components/dashboard/UsageMetrics"
import AIInsights from "../components/dashboard/AIInsights"
import { PiIcon as TaxiIcon, Users, DollarSign, Calendar } from "lucide-react"

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline">Export</button>
          <button className="btn btn-primary">Schedule Cab</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Trips"
          value="24"
          icon={<TaxiIcon className="h-6 w-6 text-primary-600" />}
          change={12}
          changeText="from last week"
          changeType="increase"
        />
        <StatsCard
          title="Total Employees"
          value="412"
          icon={<Users className="h-6 w-6 text-secondary-600" />}
          change={8}
          changeText="from last month"
          changeType="increase"
        />
        <StatsCard
          title="Monthly Expenses"
          value="$28,560"
          icon={<DollarSign className="h-6 w-6 text-accent-500" />}
          change={5}
          changeText="from last month"
          changeType="decrease"
        />
        <StatsCard
          title="Scheduled Rides"
          value="86"
          icon={<Calendar className="h-6 w-6 text-success-500" />}
          change={15}
          changeText="for next week"
          changeType="increase"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentTrips />
        <UsageMetrics />
      </div>

      <AIInsights />
    </div>
  )
}

export default Dashboard
