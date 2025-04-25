"use client"

import { useState } from "react"
import Card from "../components/common/Card"
import { BarChart3, PieChart, ArrowDown, Download, Filter } from "lucide-react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js"
import { Bar, Pie, Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
)

const Reports = () => {
  const [reportType, setReportType] = useState("cost")
  const [timeRange, setTimeRange] = useState("month")

  const costData = {
    labels: ["Sales", "Marketing", "Engineering", "HR", "Finance", "Operations"],
    datasets: [
      {
        label: "Department Costs ($)",
        data: [12450, 8900, 7600, 4500, 6200, 9800],
        backgroundColor: "rgba(30, 58, 138, 0.8)",
        borderColor: "rgba(30, 58, 138, 1)",
        borderWidth: 1,
      },
      {
        label: "Previous Month ($)",
        data: [10200, 7800, 8100, 4800, 5900, 9200],
        backgroundColor: "rgba(30, 58, 138, 0.2)",
        borderColor: "rgba(30, 58, 138, 0.6)",
        borderWidth: 1,
      },
    ],
  }

  const usageData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Morning (6-10)",
        data: [45, 52, 48, 50, 42, 15, 10],
        borderColor: "rgba(13, 148, 136, 1)",
        backgroundColor: "rgba(13, 148, 136, 0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Evening (4-8)",
        data: [38, 42, 40, 45, 35, 12, 8],
        borderColor: "rgba(245, 158, 11, 1)",
        backgroundColor: "rgba(245, 158, 11, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const tripPurposeData = {
    labels: ["Office Commute", "Airport Transfer", "Client Meeting", "Event", "Other"],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          "rgba(30, 58, 138, 0.8)",
          "rgba(13, 148, 136, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const feedbackData = {
    labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
    datasets: [
      {
        label: "Driver Ratings",
        data: [856, 458, 112, 65, 34],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",
          "rgba(34, 197, 94, 0.6)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.6)",
          "rgba(239, 68, 68, 0.8)",
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  const lineOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
  }

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
    },
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
        <button className="btn btn-primary flex items-center">
          <Download className="h-4 w-4 mr-1" />
          Export Data
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row border-b border-gray-200">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              reportType === "cost"
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setReportType("cost")}
          >
            Cost Analysis
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              reportType === "usage"
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setReportType("usage")}
          >
            Usage Patterns
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              reportType === "feedback"
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setReportType("feedback")}
          >
            Feedback Analysis
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              reportType === "predictions"
                ? "border-b-2 border-primary-500 text-primary-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setReportType("predictions")}
          >
            AI Predictions
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2 sm:mb-0">
              {reportType === "cost" && "Cost Analysis by Department"}
              {reportType === "usage" && "Cab Usage Patterns"}
              {reportType === "feedback" && "Driver Feedback Ratings"}
              {reportType === "predictions" && "AI-Powered Demand Predictions"}
            </h2>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ArrowDown className="h-4 w-4" />
                </div>
              </div>

              <button className="flex items-center text-sm border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-1" />
                Filters
              </button>
            </div>
          </div>

          {reportType === "cost" && (
            <div className="space-y-6">
              <div className="h-80 bg-white rounded-lg">
                <Bar options={options} data={costData} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <h3 className="text-lg font-medium mb-2">Top Spending Department</h3>
                  <p className="text-3xl font-bold text-primary-600">Sales</p>
                  <p className="text-gray-500">$12,450 this month</p>
                  <p className="text-sm text-error-500 mt-2">+18% from last month</p>
                </Card>
                <Card>
                  <h3 className="text-lg font-medium mb-2">Average Trip Cost</h3>
                  <p className="text-3xl font-bold text-primary-600">$38.50</p>
                  <p className="text-gray-500">Based on 324 trips</p>
                  <p className="text-sm text-success-500 mt-2">-5% from last month</p>
                </Card>
                <Card>
                  <h3 className="text-lg font-medium mb-2">Cost Anomalies</h3>
                  <p className="text-3xl font-bold text-error-600">12</p>
                  <p className="text-gray-500">Flagged for review</p>
                  <p className="text-sm text-error-500 mt-2">+4 from last month</p>
                </Card>
              </div>
            </div>
          )}

          {reportType === "usage" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80 bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Daily Trip Distribution</h3>
                <Line options={lineOptions} data={usageData} />
              </div>
              <div className="h-80 bg-white rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Trip Purpose Breakdown</h3>
                <Pie options={pieOptions} data={tripPurposeData} />
              </div>
              <Card>
                <h3 className="text-lg font-medium mb-2">Peak Usage Time</h3>
                <p className="text-3xl font-bold text-secondary-600">8:30 - 9:30 AM</p>
                <p className="text-gray-500">Weekday mornings</p>
              </Card>
              <Card>
                <h3 className="text-lg font-medium mb-2">Most Common Route</h3>
                <p className="text-xl font-bold text-secondary-600">Headquarters ↔ Airport</p>
                <p className="text-gray-500">28% of all trips</p>
              </Card>
            </div>
          )}

          {reportType === "feedback" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="h-80 bg-white rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">Driver Satisfaction Ratings</h3>
                  <Bar options={options} data={feedbackData} />
                </div>
                <Card>
                  <h3 className="text-lg font-medium mb-4">Overall Driver Rating</h3>
                  <div className="flex items-center justify-center">
                    <div className="text-5xl font-bold text-accent-500 mr-2">4.8</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-6 h-6 text-accent-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-center text-gray-500 mt-2">Based on 856 reviews</p>
                  <div className="mt-6 space-y-2">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 w-16">5 stars</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-accent-500 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">70%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 w-16">4 stars</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-accent-500 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">20%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 w-16">3 stars</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-accent-500 rounded-full" style={{ width: "5%" }}></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">5%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 w-16">2 stars</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-accent-500 rounded-full" style={{ width: "3%" }}></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">3%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 w-16">1 star</span>
                      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-accent-500 rounded-full" style={{ width: "2%" }}></div>
                      </div>
                      <span className="text-sm text-gray-500 w-8">2%</span>
                    </div>
                  </div>
                </Card>
              </div>
              <Card>
                <h3 className="text-lg font-medium mb-4">Top Driver Complaints</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-error-100 flex items-center justify-center text-error-600 mr-2">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <div>
                      <p className="font-medium">Late arrivals</p>
                      <p className="text-sm text-gray-500">42% of all complaints</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-error-100 flex items-center justify-center text-error-600 mr-2">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <div>
                      <p className="font-medium">Vehicle cleanliness</p>
                      <p className="text-sm text-gray-500">24% of all complaints</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-error-100 flex items-center justify-center text-error-600 mr-2">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <div>
                      <p className="font-medium">Routing issues</p>
                      <p className="text-sm text-gray-500">18% of all complaints</p>
                    </div>
                  </li>
                </ul>
              </Card>
            </div>
          )}

          {reportType === "predictions" && (
            <div className="space-y-6">
              <Card>
                <h3 className="text-lg font-medium mb-4">Demand Prediction</h3>
                <div className="h-60 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <BarChart3 className="h-10 w-10 mx-auto mb-2 text-primary-500" />
                    <p className="text-gray-500">Projected Cab Demand (Next 30 Days)</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-success-50 p-4 rounded-lg">
                    <h4 className="font-medium text-success-800">Suggested Actions</h4>
                    <ul className="mt-2 text-sm text-success-700 space-y-1">
                      <li>Increase fleet by 15% for next Monday</li>
                      <li>Schedule 5 additional drivers for Friday evening</li>
                    </ul>
                  </div>
                  <div className="bg-warning-50 p-4 rounded-lg">
                    <h4 className="font-medium text-warning-800">Potential Bottlenecks</h4>
                    <ul className="mt-2 text-sm text-warning-700 space-y-1">
                      <li>Airport pickup demand spike on Thursday</li>
                      <li>Multiple large events on March 25th</li>
                    </ul>
                  </div>
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-medium text-primary-800">Projected Savings</h4>
                    <p className="mt-2 text-xl font-bold text-primary-700">$3,450</p>
                    <p className="text-sm text-primary-700">Through optimized scheduling</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <h3 className="text-lg font-medium mb-4">Cost Anomaly Detection</h3>
                  <div className="space-y-3">
                    <div className="flex items-start p-3 bg-error-50 rounded-lg">
                      <div className="flex-shrink-0 h-8 w-8 bg-error-100 rounded-full flex items-center justify-center text-error-600 mr-3">
                        <span className="text-sm font-medium">!</span>
                      </div>
                      <div>
                        <p className="font-medium text-error-800">Marketing Department</p>
                        <p className="text-sm text-error-700">
                          32% higher than average this month. Multiple trips scheduled outside of business hours.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-warning-50 rounded-lg">
                      <div className="flex-shrink-0 h-8 w-8 bg-warning-100 rounded-full flex items-center justify-center text-warning-600 mr-3">
                        <span className="text-sm font-medium">!</span>
                      </div>
                      <div>
                        <p className="font-medium text-warning-800">Engineering Team</p>
                        <p className="text-sm text-warning-700">
                          18% higher than historical average. Increase in airport transfers noted.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card>
                  <h3 className="text-lg font-medium mb-4">Sentiment Analysis</h3>
                  <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <PieChart className="h-10 w-10 mx-auto mb-2 text-accent-500" />
                      <p className="text-gray-500">Feedback Sentiment Distribution</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-success-500 font-bold text-lg">76%</p>
                      <p className="text-sm text-gray-500">Positive</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-bold text-lg">19%</p>
                      <p className="text-sm text-gray-500">Neutral</p>
                    </div>
                    <div>
                      <p className="text-error-500 font-bold text-lg">5%</p>
                      <p className="text-sm text-gray-500">Negative</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Reports

export default Reports
