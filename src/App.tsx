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

// Auth & Protected Route
import ProtectedRoute from "./components/ProtectedRoute"
import { ROLES } from "./lib/roles"
import { Unauthorized } from "./pages/Unauthorized"

// Layouts
import { SuperadminLayout } from "./layouts/SuperadminLayout"
import { GroupAdminLayout } from "./layouts/GroupAdminLayout"

// Superadmin Pages
import { SuperadminDashboard } from "./pages/superadmin/SuperadminDashboard"
import { GroupManager } from "./pages/superadmin/GroupManager"
import { CreateGroup } from "./pages/superadmin/CreateGroup"
import { GroupDetail } from "./pages/superadmin/GroupDetail"
import { AllVendors } from "./pages/superadmin/AllVendors"
import { VerificationQueue } from "./pages/superadmin/VerificationQueue"
import { RevenueDashboard } from "./pages/superadmin/RevenueDashboard"
import { PayoutsManager } from "./pages/superadmin/PayoutsManager"
import { FeatureFlags } from "./pages/superadmin/FeatureFlags"
import { Reports } from "./pages/superadmin/Reports"

// Group Admin Pages
import { GroupAdminDashboard } from "./pages/groupadmin/GroupAdminDashboard"
import { EarningsDashboard } from "./pages/groupadmin/EarningsDashboard"
import { VendorManagement } from "./pages/groupadmin/VendorManagement"
import { VendorDetail } from "./pages/groupadmin/VendorDetail"
import { BuyerManagement } from "./pages/groupadmin/BuyerManagement"
import { GroupAnalytics } from "./pages/groupadmin/GroupAnalytics"
import { DisputeManager } from "./pages/groupadmin/DisputeManager"
import { Announcements } from "./pages/groupadmin/Announcements"
import { GroupProfile } from "./pages/groupadmin/GroupProfile"

function AppRoutes() {
  const { isAuthenticated, hasOnboarded, role } = usePerspective()

  if (!isAuthenticated) {
    return <Login />
  }

  // Admin roles bypass onboarding
  const isRoleAdmin = role === ROLES.SUPERADMIN || role === ROLES.GROUP_ADMIN

  if (!hasOnboarded && !isRoleAdmin) {
    return <Onboarding />
  }

  return (
    <Router>
      <Routes>
        {/* Buyer/Vendor Perspective Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="hub" element={<DiscoveryHub />} />
          <Route path="rfps" element={<RFPs />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="chat" element={<Chat />} />
          <Route path="settings" element={<Settings />} />
          <Route path="create-rfp" element={<CreateRFP />} />
        </Route>

        {/* Superadmin Panel Routes */}
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute allowedRoles={[ROLES.SUPERADMIN]}>
              <SuperadminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SuperadminDashboard />} />
          <Route path="groups" element={<GroupManager />} />
          <Route path="groups/create" element={<CreateGroup />} />
          <Route path="groups/:groupId" element={<GroupDetail />} />
          <Route path="vendors" element={<AllVendors />} />
          <Route path="verification-queue" element={<VerificationQueue />} />
          <Route path="revenue" element={<RevenueDashboard />} />
          <Route path="payouts" element={<PayoutsManager />} />
          <Route path="feature-flags" element={<FeatureFlags />} />
          <Route path="reports" element={<Reports />} />
        </Route>

        {/* Group Admin Panel Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[ROLES.GROUP_ADMIN]}>
              <GroupAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<GroupAdminDashboard />} />
          <Route path="vendors" element={<VendorManagement />} />
          <Route path="vendors/:vendorId" element={<VendorDetail />} />
          <Route path="buyers" element={<BuyerManagement />} />
          <Route path="analytics" element={<GroupAnalytics />} />
          <Route path="disputes" element={<DisputeManager />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="earnings" element={<EarningsDashboard />} />
          <Route path="profile" element={<GroupProfile />} />
        </Route>

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Catch-all Redirect */}
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
