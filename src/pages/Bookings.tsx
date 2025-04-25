"use client"

import { useState } from "react"
import Card from "../components/common/Card"
import TripStatus from "../components/dashboard/TripStatus"
import { Calendar, Users, Clock, X, Calendar as CalendarIcon, Plus } from "lucide-react"

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    title: "Airport Pickup - Alex Johnson",
    description: "Pick up from Airport Terminal 1",
    startTime: "2025-03-18T08:00:00",
    endTime: "2025-03-18T09:00:00",
    passengers: 1,
    status: "scheduled",
    type: "one-time",
  },
  {
    id: "2",
    title: "Team Outing - Product Team",
    description: "Transport to Riverside Restaurant",
    startTime: "2025-03-20T18:00:00",
    endTime: "2025-03-20T19:30:00",
    passengers: 8,
    status: "scheduled",
    type: "one-time",
  },
  {
    id: "3",
    title: "Daily Office Commute - Maria Garcia",
    description: "Pickup from residence to Headquarters",
    startTime: "2025-03-19T08:30:00",
    endTime: "2025-03-19T09:15:00",
    passengers: 1,
    status: "scheduled",
    type: "recurring",
    recurrence: "Weekdays",
  },
  {
    id: "4",
    title: "Client Meeting - Executive Team",
    description: "Transport to Downtown Office",
    startTime: "2025-03-21T10:00:00",
    endTime: "2025-03-21T11:00:00",
    passengers: 3,
    status: "scheduled",
    type: "one-time",
  },
  {
    id: "5",
    title: "Airport Drop - David Kim",
    description: "Drop at International Terminal",
    startTime: "2025-03-22T15:00:00",
    endTime: "2025-03-22T16:00:00",
    passengers: 1,
    status: "scheduled",
    type: "one-time",
  },
]

const Bookings = () => {
  const [filter, setFilter] = useState("all")
  const [showModal, setShowModal] = useState(false)

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleString("en-US", options)
  }

  const filteredBookings = filter === "all" ? mockBookings : mockBookings.filter((booking) => booking.type === filter)

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Bookings</h1>
        <button className="btn btn-primary flex items-center" onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-1" />
          New Booking
        </button>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-gray-200">
          <div className="space-x-2 mb-4 sm:mb-0">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                filter === "all" ? "bg-primary-100 text-primary-700" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setFilter("all")}
            >
              All Bookings
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                filter === "one-time" ? "bg-primary-100 text-primary-700" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setFilter("one-time")}
            >
              One-time
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                filter === "recurring" ? "bg-primary-100 text-primary-700" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setFilter("recurring")}
            >
              Recurring
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              placeholder="Filter by date"
            />
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Passengers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        {booking.type === "recurring" ? (
                          <div className="h-9 w-9 rounded-md bg-primary-100 text-primary-700 flex items-center justify-center">
                            <Calendar className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="h-9 w-9 rounded-md bg-accent-100 text-accent-700 flex items-center justify-center">
                            <Calendar className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{booking.title}</div>
                        <div className="text-sm text-gray-500">{booking.description}</div>
                        {booking.type === "recurring" && (
                          <div className="text-xs text-primary-600 mt-1 font-medium">{booking.recurrence}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="h-4 w-4 text-gray-400 mr-1" />
                      {formatDate(booking.startTime)}
                    </div>
                    <div className="text-sm text-gray-500 ml-5">to {formatDate(booking.endTime)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{booking.passengers}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <TripStatus status={booking.status as any} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">Edit</button>
                    <button className="text-error-600 hover:text-error-900">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Booking Modal (simplified version) */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={() => setShowModal(false)}
            ></div>
            <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setShowModal(false)}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">New Booking</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="Enter booking title"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">
                        Start Time
                      </label>
                      <input
                        type="datetime-local"
                        id="start-time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">
                        End Time
                      </label>
                      <input
                        type="datetime-local"
                        id="end-time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="booking-type" className="block text-sm font-medium text-gray-700">
                      Booking Type
                    </label>
                    <select
                      id="booking-type"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    >
                      <option value="one-time">One-time</option>
                      <option value="recurring">Recurring</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
                      Number of Passengers
                    </label>
                    <input
                      type="number"
                      id="passengers"
                      min="1"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="Add additional details"
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>
                      Create Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Bookings
