"use client"

import React from "react"
import { NavLink } from "react-router-dom"
import {
  Home,
  Calendar,
  Map,
  BarChart3,
  MessageSquare,
  Settings,
  PiIcon as TaxiIcon,
  X,
  ChevronsUpDown,
} from "lucide-react"
import { useBranch } from "../../contexts/BranchContext"

interface SidebarProps {
  onClose: () => void
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { currentBranch, allBranches, setCurrentBranch } = useBranch()
  const [branchMenuOpen, setBranchMenuOpen] = React.useState(false)

  const toggleBranchMenu = () => {
    setBranchMenuOpen(!branchMenuOpen)
  }

  const selectBranch = (branch: typeof currentBranch) => {
    setCurrentBranch(branch)
    setBranchMenuOpen(false)
  }

  return (
    <div className="flex h-full flex-col bg-primary-800 text-white">
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center">
          <TaxiIcon className="h-8 w-8 text-white" />
          <span className="ml-2 text-xl font-semibold">CabManager</span>
        </div>
        <button onClick={onClose} className="lg:hidden text-white hover:text-gray-200">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="mx-4 mt-2">
        <div className="relative">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-md bg-primary-900 px-3 py-2 text-left text-sm font-medium text-white focus:outline-none"
            onClick={toggleBranchMenu}
          >
            <span className="truncate">{currentBranch.name}</span>
            <ChevronsUpDown className="h-4 w-4" />
          </button>

          {branchMenuOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-md bg-primary-700 shadow-lg">
              <ul className="py-1 text-sm text-white">
                {allBranches.map((branch) => (
                  <li key={branch.id}>
                    <button
                      type="button"
                      className={`w-full px-4 py-2 text-left hover:bg-primary-600 ${
                        branch.id === currentBranch.id ? "bg-primary-600" : ""
                      }`}
                      onClick={() => selectBranch(branch)}
                    >
                      {branch.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-8 flex-1 space-y-1 px-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
              isActive ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-700 hover:text-white"
            }`
          }
        >
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </NavLink>

        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
              isActive ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-700 hover:text-white"
            }`
          }
        >
          <Calendar className="mr-3 h-5 w-5" />
          Bookings
        </NavLink>

        <NavLink
          to="/tracking"
          className={({ isActive }) =>
            `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
              isActive ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-700 hover:text-white"
            }`
          }
        >
          <Map className="mr-3 h-5 w-5" />
          Tracking
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
              isActive ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-700 hover:text-white"
            }`
          }
        >
          <BarChart3 className="mr-3 h-5 w-5" />
          Reports
        </NavLink>

        <NavLink
          to="/feedback"
          className={({ isActive }) =>
            `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
              isActive ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-700 hover:text-white"
            }`
          }
        >
          <MessageSquare className="mr-3 h-5 w-5" />
          Feedback
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
              isActive ? "bg-primary-700 text-white" : "text-primary-100 hover:bg-primary-700 hover:text-white"
            }`
          }
        >
          <Settings className="mr-3 h-5 w-5" />
          Settings
        </NavLink>
      </nav>

      <div className="border-t border-primary-700 p-4">
        <div className="text-xs text-primary-200">
          <p>© 2025 CabManager</p>
          <p>v1.0.0</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
