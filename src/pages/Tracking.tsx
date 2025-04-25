"use client"

import { useState } from "react"
import Card from "../components/common/Card"
import TripStatus from "../components/dashboard/TripStatus"
import { MapPin, Phone, Clock, User, Search } from "lucide-react"

// Mock data for active trips
const activeTrips = [
  {
    id: "1",
    employee: "Maria Garcia",
    pickup: "Headquarters",
    destination: "Client Office - Downtown",
    startTime: "09:45 AM",
    eta: "10:15 AM",
    driver: {
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      rating: 4.8,
      vehicle: "Toyota Camry - White (ABC123)",
    },
    status: "in-progress",
    currentLocation: "Main Street, 3 miles from destination",
    progress: 70,
  },
  {
    id: "2",
    employee: "Alex Johnson",
    pickup: "West Branch Office",
    destination: "Airport Terminal 2",
    startTime: "10:30 AM",
    eta: "11:15 AM",
    driver: {
      name: "Sarah Williams",
      phone: "+1 (555) 987-6543",
      rating: 4.9,
      vehicle: "Honda Accord - Black (XYZ789)",
    },
    status: "in-progress",
    currentLocation: "Highway 101, 8 miles from destination",
    progress: 40,
  },
  {
    id: "3",
    employee: "David Kim",
    pickup: "West Branch Office",
    destination: "Convention Center",
    startTime: "10:15 AM",
    eta: "10:45 AM",
    driver: {
      name: "Michael Johnson",
      phone: "+1 (555) 234-5678",
      rating: 4.7,
      vehicle: "Nissan Altima - Silver (DEF456)",
    },
    status: "scheduled",
    currentLocation: "Waiting for pickup",
    progress: 0,
  },
]

const Tracking = () => {
  const [selectedTrip, setSelectedTrip] = useState(activeTrips[0])
  const [searchTerm, setSearchTerm] = useState("")

  const filteredTrips = activeTrips.filter(
    (trip) =>
      trip.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.driver.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Live Tracking</h1>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Search trips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Active Trips">
            <div className="space-y-4 divide-y divide-gray-200">
              {filteredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className={`pt-4 first:pt-0 last:pb-0 cursor-pointer ${
                    selectedTrip.id === trip.id ? "bg-primary-50 -mx-6 px-6" : ""
                  }`}
                  onClick={() => setSelectedTrip(trip)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="ml-2 font-medium text-gray-900">{trip.employee}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <div className="flex items-center mb-1">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span>From: {trip.pickup}</span>
                        </div>
                        <div className="flex items-center mb-1 ml-5">
                          <span>To: {trip.destination}</span>
                        </div>
                      </div>
                    </div>
                    <TripStatus status={trip.status as any} />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>ETA: {trip.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card title="Trip Details">
            {selectedTrip && (
              <div className="space-y-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-lg">{selectedTrip.employee}'s Trip</h3>
                    <p className="text-gray-500">
                      {selectedTrip.pickup} to {selectedTrip.destination}
                    </p>
                  </div>
                  <TripStatus status={selectedTrip.status as any} className="self-start" />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <div className="font-medium">{selectedTrip.driver.name}</div>
                      <div className="text-sm text-gray-500">{selectedTrip.driver.vehicle}</div>
                      <div className="mt-1 flex items-center">
                        <div className="flex items-center mr-3">
                          <svg className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm ml-1">{selectedTrip.driver.rating}</span>
                        </div>
                        <div className="flex items-center text-primary-600">
                          <Phone className="h-4 w-4 mr-1" />
                          <span className="text-sm">{selectedTrip.driver.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Current Location:</span> {selectedTrip.currentLocation}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">ETA:</span> {selectedTrip.eta}
                    </div>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${selectedTrip.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <div>{selectedTrip.pickup}</div>
                    <div>{selectedTrip.destination}</div>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                    <p className="text-lg font-medium">Map View</p>
                    <p className="text-sm">Interactive map would be displayed here</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <button className="btn btn-outline">Contact Driver</button>
                  <button className="btn btn-primary">Send Alert</button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Tracking
