"use client"

import { useState } from "react"
import Card from "../components/common/Card"
import { Save, Users, Globe, Bell, Shield, Bus } from "lucide-react"

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-in-out]">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <Card className="p-0">
            <nav className="flex flex-col">
              <button
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === "general"
                    ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("general")}
              >
                <Globe className="h-5 w-5 mr-3" />
                General
              </button>
              <button
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === "users"
                    ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <Users className="h-5 w-5 mr-3" />
                Users & Permissions
              </button>
              <button
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === "vehicles"
                    ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("vehicles")}
              >
                <Bus className="h-5 w-5 mr-3" />
                Vehicle Management
              </button>
              <button
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === "notifications"
                    ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell className="h-5 w-5 mr-3" />
                Notifications
              </button>
              <button
                className={`flex items-center px-4 py-3 text-sm font-medium ${
                  activeTab === "security"
                    ? "bg-primary-50 text-primary-700 border-l-4 border-primary-500"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("security")}
              >
                <Shield className="h-5 w-5 mr-3" />
                Security
              </button>
            </nav>
          </Card>
        </div>

        <div className="md:col-span-3">
          {activeTab === "general" && (
            <Card title="General Settings">
              <form className="space-y-6">
                <div>
                  <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    defaultValue="Acme Corporation"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="time-zone" className="block text-sm font-medium text-gray-700">
                    Default Timezone
                  </label>
                  <select
                    id="time-zone"
                    defaultValue="America/New_York"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="Europe/London">London</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date-format" className="block text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <select
                    id="date-format"
                    defaultValue="MM/DD/YYYY"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">Currency</legend>
                  <div className="mt-1 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="currency-usd"
                        name="currency"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="currency-usd" className="ml-3 block text-sm font-medium text-gray-700">
                        USD ($)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="currency-eur"
                        name="currency"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="currency-eur" className="ml-3 block text-sm font-medium text-gray-700">
                        EUR (€)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="currency-gbp"
                        name="currency"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor="currency-gbp" className="ml-3 block text-sm font-medium text-gray-700">
                        GBP (£)
                      </label>
                    </div>
                  </div>
                </fieldset>

                <div className="flex justify-end">
                  <button type="button" className="btn btn-primary flex items-center">
                    <Save className="h-4 w-4 mr-1" />
                    Save Changes
                  </button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === "users" && (
            <Card title="Users & Permissions">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">User Roles</h3>
                  <button className="btn btn-outline">Add Role</button>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Users
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Permissions
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Admin</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">5 users</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">All permissions</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Manager</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">12 users</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">View, Book, Report</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Employee</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">248 users</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">View, Book</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Branch Settings</h3>
                  <button className="btn btn-outline">Add Branch</button>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Branch Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Manager
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Headquarters</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">New York, USA</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">John Smith</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">West Coast Office</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">San Francisco, USA</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">Sarah Williams</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">European HQ</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">London, UK</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">David Brown</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card title="Notification Settings">
              <form className="space-y-6">
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">Email Notifications</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="booking-confirmations"
                          name="booking-confirmations"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="booking-confirmations" className="font-medium text-gray-700">
                          Booking Confirmations
                        </label>
                        <p className="text-gray-500">Receive an email when a new booking is confirmed</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="trip-reminders"
                          name="trip-reminders"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="trip-reminders" className="font-medium text-gray-700">
                          Trip Reminders
                        </label>
                        <p className="text-gray-500">Receive reminders 1 hour before scheduled trips</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="feedback-requests"
                          name="feedback-requests"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="feedback-requests" className="font-medium text-gray-700">
                          Feedback Requests
                        </label>
                        <p className="text-gray-500">Receive requests to provide feedback after trips</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="reports"
                          name="reports"
                          type="checkbox"
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="reports" className="font-medium text-gray-700">
                          Weekly Reports
                        </label>
                        <p className="text-gray-500">Receive weekly usage and cost reports</p>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-medium text-gray-700">Mobile Push Notifications</legend>
                  <div className="mt-4 space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="driver-updates"
                          name="driver-updates"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="driver-updates" className="font-medium text-gray-700">
                          Driver Updates
                        </label>
                        <p className="text-gray-500">Receive updates when your driver is approaching</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="booking-changes"
                          name="booking-changes"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="booking-changes" className="font-medium text-gray-700">
                          Booking Changes
                        </label>
                        <p className="text-gray-500">Receive notifications for any changes to your bookings</p>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <div className="flex justify-end">
                  <button type="button" className="btn btn-primary flex items-center">
                    <Save className="h-4 w-4 mr-1" />
                    Save Changes
                  </button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === "vehicles" && (
            <Card title="Vehicle Management">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Fleet Information</h3>
                  <button className="btn btn-outline">Add Vehicle</button>
                </div>

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Maintenance
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Toyota Camry</div>
                        <div className="text-sm text-gray-500">ABC123</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">John Smith</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">March 10, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Honda Accord</div>
                        <div className="text-sm text-gray-500">XYZ789</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Sarah Williams</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">February 28, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Nissan Altima</div>
                        <div className="text-sm text-gray-500">DEF456</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Michael Johnson</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-100 text-warning-800">
                          Maintenance
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">March 15, 2025</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-primary-600 hover:text-primary-900">Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Maintenance Schedule</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-900 mb-2">Upcoming Maintenance</h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Toyota Camry (ABC123)</p>
                          <p className="text-xs text-gray-500">Oil Change & Inspection</p>
                        </div>
                        <p className="text-sm text-gray-700">April 10, 2025</p>
                      </li>
                      <li className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Honda Accord (XYZ789)</p>
                          <p className="text-xs text-gray-500">Tire Rotation</p>
                        </div>
                        <p className="text-sm text-gray-700">April 15, 2025</p>
                      </li>
                      <li className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">Nissan Altima (DEF456)</p>
                          <p className="text-xs text-gray-500">Brake Inspection</p>
                        </div>
                        <p className="text-sm text-gray-700">Currently in service</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "security" && (
            <Card title="Security Settings">
              <form className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Password Policy</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="password-expiry"
                          name="password-expiry"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="password-expiry" className="font-medium text-gray-700">
                          Password Expiry
                        </label>
                        <p className="text-gray-500">Force password reset every 90 days</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="complex-password"
                          name="complex-password"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="complex-password" className="font-medium text-gray-700">
                          Complex Password Requirements
                        </label>
                        <p className="text-gray-500">
                          Require minimum length, special characters, numbers, and mixed case
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="failed-attempts"
                          name="failed-attempts"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="failed-attempts" className="font-medium text-gray-700">
                          Account Lockout
                        </label>
                        <p className="text-gray-500">Lock account after 5 failed login attempts</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="enable-2fa"
                          name="enable-2fa"
                          type="checkbox"
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="enable-2fa" className="font-medium text-gray-700">
                          Enable for All Admin Users
                        </label>
                        <p className="text-gray-500">Require 2FA for all users with administrative privileges</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="enable-2fa-optional"
                          name="enable-2fa-optional"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="enable-2fa-optional" className="font-medium text-gray-700">
                          Optional for Standard Users
                        </label>
                        <p className="text-gray-500">Allow standard users to enable 2FA for their accounts</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Logging</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="audit-trail"
                          name="audit-trail"
                          type="checkbox"
                          defaultChecked
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="audit-trail" className="font-medium text-gray-700">
                          Enable Audit Trail
                        </label>
                        <p className="text-gray-500">Log all user actions for security and compliance</p>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="log-retention" className="block text-sm font-medium text-gray-700">
                        Log Retention Period
                      </label>
                      <select
                        id="log-retention"
                        name="log-retention"
                        defaultValue="180"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="30">30 days</option>
                        <option value="90">90 days</option>
                        <option value="180">180 days</option>
                        <option value="365">1 year</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="btn btn-primary flex items-center">
                    <Save className="h-4 w-4 mr-1" />
                    Save Changes
                  </button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings
