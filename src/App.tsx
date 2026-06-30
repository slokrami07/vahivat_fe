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
import { LandingPage } from "./pages/LandingPage"
import { AboutPage } from "./pages/AboutPage"
import { ContactPage } from "./pages/ContactPage"
import { PrivacyPage } from "./pages/PrivacyPage"
import { TermsPage } from "./pages/TermsPage"

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
  const isRoleAdmin = role === ROLES.SUPERADMIN || role === ROLES.GROUP_ADMIN

  return (
    <Routes>
      {/* ── PUBLIC ROUTES ── */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />

      {/* ── AUTHENTICATED ROUTES (redirect to /login if not auth'd) ── */}
      <Route
        path="/app"
        element={
          !isAuthenticated ? (
            <Navigate to="/login" replace />
          ) : !hasOnboarded && !isRoleAdmin ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <Layout />
          )
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="hub" element={<DiscoveryHub />} />
        <Route path="rfps" element={<RFPs />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="chat" element={<Chat />} />
        <Route path="settings" element={<Settings />} />
        <Route path="create-rfp" element={<CreateRFP />} />
      </Route>

      {/* ── ONBOARDING ── */}
      <Route path="/onboarding" element={
        !isAuthenticated ? <Navigate to="/login" replace /> :
        hasOnboarded ? <Navigate to="/app" replace /> :
        <Onboarding />
      } />

      {/* ── SUPERADMIN ── */}
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

      {/* ── GROUP ADMIN ── */}
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

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <PerspectiveProvider>
      <ToastProvider>
        <Router>
          <AppRoutes />
          <WhatsAppButton />
        </Router>
      </ToastProvider>
    </PerspectiveProvider>
  )
}

export default App
