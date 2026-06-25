import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { PerspectiveProvider, usePerspective } from "./context/PerspectiveContext"
import { ToastProvider } from "./components/Toast"
import { WhatsAppButton } from "./components/WhatsAppButton"
import { Layout } from "./components/layout/Layout"
import { Dashboard } from "./pages/Dashboard"
import { DiscoveryHub } from "./pages/DiscoveryHub"
import { RFPs } from "./pages/RFPs"
import { Calendar } from "./pages/Calendar"
import { Chat } from "./pages/Chat"
import { Login } from "./pages/Login"
import { Settings } from "./pages/Settings"
import { CreateRFP } from "./pages/CreateRFP"

import { Onboarding } from "./pages/Onboarding"

function AppRoutes() {
  const { isAuthenticated, hasOnboarded } = usePerspective()

  if (!isAuthenticated) {
    return <Login />
  }

  if (!hasOnboarded) {
    return <Onboarding />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="hub" element={<DiscoveryHub />} />
          <Route path="rfps" element={<RFPs />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-rfp" element={<CreateRFP />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* WhatsApp support FAB - shown on all pages when logged in */}
      <WhatsAppButton />
    </Router>
  )
}

function App() {
  return (
    <PerspectiveProvider>
      <ToastProvider>
        <AppRoutes />
      </ToastProvider>
    </PerspectiveProvider>
  )
}

export default App
