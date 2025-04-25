"use client"

import { useState } from "react"
import Card from "../components/common/Card"
import { Star, Search, ChevronDown, MessageSquare } from "lucide-react"

interface FeedbackItem {
  id: string
  employeeName: string
  driverName: string
  rating: number
  tripDate: string
  comment: string
  sentiment: "positive" | "neutral" | "negative"
}

// Mock data for feedback
const mockFeedback: FeedbackItem[] = [
  {
    id: "1",
    employeeName: "Alex Johnson",
    driverName: "John Smith",
    rating: 5,
    tripDate: "2025-03-14",
    comment:
      "Driver was very professional and the car was clean. Arrived early and got me to my destination ahead of schedule.",
    sentiment: "positive",
  },
  {
    id: "2",
    employeeName: "Maria Garcia",
    driverName: "Sarah Williams",
    rating: 4,
    tripDate: "2025-03-13",
    comment: "Good service overall. The driver was courteous but took a longer route than necessary.",
    sentiment: "positive",
  },
  {
    id: "3",
    employeeName: "David Kim",
    driverName: "Michael Johnson",
    rating: 2,
    tripDate: "2025-03-12",
    comment: "Driver was late and the car was not very clean. Communication was poor.",
    sentiment: "negative",
  },
  {
    id: "4",
    employeeName: "Sarah Wilson",
    driverName: "Robert Brown",
    rating: 5,
    tripDate: "2025-03-11",
    comment: "Excellent service! Driver was punctual, professional, and very helpful with my luggage.",
    sentiment: "positive",
  },
  {
    id: "5",
    employeeName: "James Lee",
    driverName: "Lisa Chen",
    rating: 3,
    tripDate: "2025-03-10",
    comment: "Average service. Nothing special to note.",
    sentiment: "neutral",
  },
]

const Feedback = () => {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  // Filter feedback based on current filter and search term
  const filteredFeedback = mockFeedback
    .filter((item) => {
      if (filter === "positive") return item.sentiment === "positive"
      if (filter === "negative") return item.sentiment === "negative"
      return true
    })
    .filter((item) => {
      const searchLower = searchTerm.toLowerCase()
      return (
        item.employeeName.toLowerCase().includes(searchLower) ||
        item.driverName.toLowerCase().includes(searchLower) ||
        item.comment.toLowerCase().includes(searchLower)
      )
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "date") return new Date(b.tripDate).getTime() - new Date(a.tripDate).getTime()
      return 0
    })

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? "text-accent-500 fill-accent-500" : "text-gray-300"}`} />
      ))
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Employee Feedback</h1>
        <div className="flex space-x-3">
          <button className="btn btn-outline">Generate Report</button>
        </div>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-gray-200">
          <div className="space-x-2 mb-4 sm:mb-0">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                filter === "all" ? "bg-primary-100 text-primary-700" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setFilter("all")}
            >
              All Feedback
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                filter === "positive" ? "bg-success-100 text-success-700" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setFilter("positive")}
            >
              Positive
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                filter === "negative" ? "bg-error-100 text-error-700" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setFilter("negative")}
            >
              Negative
            </button>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 w-full"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <select
                className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 w-full sm:w-auto"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Latest First</option>
                <option value="rating">Highest Rated</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {filteredFeedback.length === 0 ? (
            <div className="text-center py-10">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900">No feedback found</h3>
              <p className="mt-2 text-gray-500">No feedback matches your current filters.</p>
            </div>
          ) : (
            filteredFeedback.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-lg ${
                  item.sentiment === "positive"
                    ? "bg-success-50"
                    : item.sentiment === "negative"
                      ? "bg-error-50"
                      : "bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.employeeName}</h3>
                    <p className="text-gray-500 text-sm">
                      Trip with {item.driverName} on{" "}
                      {new Date(item.tripDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex">{renderStars(item.rating)}</div>
                </div>
                <p className="mt-3 text-gray-700">{item.comment}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.sentiment === "positive"
                        ? "bg-success-100 text-success-800"
                        : item.sentiment === "negative"
                          ? "bg-error-100 text-error-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.sentiment === "positive"
                      ? "Positive"
                      : item.sentiment === "negative"
                        ? "Negative"
                        : "Neutral"}
                  </span>
                  <button className="text-sm text-primary-600 hover:text-primary-800">View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card title="AI Sentiment Analysis Insights">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-success-100 flex items-center justify-center text-success-600 mr-3">
                <span className="text-sm font-medium">+</span>
              </div>
              <h4 className="font-medium text-gray-900">Positive Feedback Trends</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-success-100 flex items-center justify-center text-success-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">1</span>
                </div>
                <span>Driver professionalism (mentioned in 78% of positive reviews)</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-success-100 flex items-center justify-center text-success-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">2</span>
                </div>
                <span>Vehicle cleanliness (mentioned in 65% of positive reviews)</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-success-100 flex items-center justify-center text-success-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">3</span>
                </div>
                <span>Punctuality (mentioned in 60% of positive reviews)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-error-100 flex items-center justify-center text-error-600 mr-3">
                <span className="text-sm font-medium">-</span>
              </div>
              <h4 className="font-medium text-gray-900">Negative Feedback Trends</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-error-100 flex items-center justify-center text-error-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">1</span>
                </div>
                <span>Late arrivals (mentioned in 42% of negative reviews)</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-error-100 flex items-center justify-center text-error-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">2</span>
                </div>
                <span>Poor communication (mentioned in 35% of negative reviews)</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-error-100 flex items-center justify-center text-error-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">3</span>
                </div>
                <span>Vehicle condition (mentioned in 28% of negative reviews)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                <span className="text-sm font-medium">!</span>
              </div>
              <h4 className="font-medium text-gray-900">Recommended Actions</h4>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">1</span>
                </div>
                <span>Schedule refresher training for drivers with consistently low ratings</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">2</span>
                </div>
                <span>Implement new pickup notification system to reduce late arrivals</span>
              </li>
              <li className="flex items-start">
                <div className="h-5 w-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-2 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">3</span>
                </div>
                <span>Recognize top-rated drivers with quarterly incentives</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Feedback
