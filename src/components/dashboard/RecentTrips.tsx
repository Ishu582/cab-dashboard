import Card from "../common/Card"
import TripStatus from "./TripStatus"
import { MapPin, User } from "lucide-react"

// Mock data for recent trips
const recentTrips = [
  {
    id: "1",
    employee: "Alex Johnson",
    pickup: "123 Main St",
    destination: "Airport Terminal 1",
    date: "2025-03-15",
    time: "08:30 AM",
    status: "completed",
  },
  {
    id: "2",
    employee: "Maria Garcia",
    pickup: "Headquarters",
    destination: "Client Office - Downtown",
    date: "2025-03-15",
    time: "09:45 AM",
    status: "in-progress",
  },
  {
    id: "3",
    employee: "David Kim",
    pickup: "West Branch Office",
    destination: "Convention Center",
    date: "2025-03-15",
    time: "10:15 AM",
    status: "scheduled",
  },
  {
    id: "4",
    employee: "Sarah Wilson",
    pickup: "Airport Terminal 2",
    destination: "Headquarters",
    date: "2025-03-15",
    time: "11:30 AM",
    status: "scheduled",
  },
  {
    id: "5",
    employee: "James Lee",
    pickup: "Hotel Grandeur",
    destination: "Tech Conference Center",
    date: "2025-03-14",
    time: "02:00 PM",
    status: "cancelled",
  },
]

const RecentTrips = () => {
  return (
    <Card title="Recent Trips" className="h-full">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentTrips.map((trip) => (
              <tr key={trip.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{trip.employee}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <span>{trip.pickup}</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 ml-5">to {trip.destination}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{trip.date}</div>
                  <div className="text-sm text-gray-500">{trip.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TripStatus status={trip.status as any} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">View All Trips</button>
      </div>
    </Card>
  )
}

export default RecentTrips
