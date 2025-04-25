import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppLayout from "./components/layout/AppLayout"
import Dashboard from "./pages/Dashboard"
import Bookings from "./pages/Bookings"
import Tracking from "./pages/Tracking"
import Reports from "./pages/Reports"
import Feedback from "./pages/Feedback"
import Settings from "./pages/Settings"
import { ThemeProvider } from "./contexts/ThemeContext"
import { BranchProvider } from "./contexts/BranchContext"

function App() {
  return (
    <ThemeProvider>
      <BranchProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AppLayout>
        </Router>
      </BranchProvider>
    </ThemeProvider>
  )
}

export default App
