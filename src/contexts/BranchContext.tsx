"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Branch {
  id: string
  name: string
  city: string
  country: string
}

interface BranchContextType {
  currentBranch: Branch
  allBranches: Branch[]
  setCurrentBranch: (branch: Branch) => void
}

const defaultBranches: Branch[] = [
  { id: "1", name: "Headquarters", city: "New York", country: "USA" },
  { id: "2", name: "West Coast Office", city: "San Francisco", country: "USA" },
  { id: "3", name: "European HQ", city: "London", country: "UK" },
  { id: "4", name: "Asia Pacific", city: "Singapore", country: "Singapore" },
  { id: "5", name: "South Asia", city: "Bangalore", country: "India" },
]

const BranchContext = createContext<BranchContextType | undefined>(undefined)

export function BranchProvider({ children }: { children: ReactNode }) {
  const [currentBranch, setCurrentBranch] = useState<Branch>(defaultBranches[0])

  return (
    <BranchContext.Provider
      value={{
        currentBranch,
        allBranches: defaultBranches,
        setCurrentBranch,
      }}
    >
      {children}
    </BranchContext.Provider>
  )
}

export function useBranch() {
  const context = useContext(BranchContext)
  if (context === undefined) {
    throw new Error("useBranch must be used within a BranchProvider")
  }
  return context
}
