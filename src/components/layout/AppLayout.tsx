"use client"

import type React from "react"
import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"

interface AppLayoutProps {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      <div
        className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      ></div>

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={toggleSidebar} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

export default AppLayout
