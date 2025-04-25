"use client"
import { Bell, User, Menu, Search } from "lucide-react"
import { useBranch } from "../../contexts/BranchContext"

interface HeaderProps {
  toggleSidebar: () => void
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { currentBranch } = useBranch()

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center">
          <button type="button" className="text-gray-500 focus:outline-none lg:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="ml-3 lg:ml-0">
            <h2 className="text-lg font-medium text-gray-900">{currentBranch.name}</h2>
            <p className="text-sm text-gray-500">
              {currentBranch.city}, {currentBranch.country}
            </p>
          </div>
        </div>

        <div className="hidden md:block mx-auto max-w-xs w-full">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
