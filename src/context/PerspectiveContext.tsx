import * as React from "react"
import i18n from "@/i18n"
import { ROLES, type Role } from "@/lib/roles"

type Perspective = "buyer" | "vendor"
type VendorStatusType = "active" | "busy" | "unavailable"

interface ProfileData {
  phone?: string
  gstin?: string
  gstBusinessName?: string
  gstState?: string
  gstDate?: string
  photo?: string
  products?: string[]
  description?: string
  businessName?: string
  category?: string
}

interface PerspectiveContextType {
  perspective: Perspective
  setPerspective: (p: Perspective) => void
  isAuthenticated: boolean
  hasOnboarded: boolean
  setOnboarded: (status: boolean) => void
  login: (email: string) => void
  logout: () => void
  profile: ProfileData
  updateProfile: (updates: Partial<ProfileData>) => void
  vendorStatus: VendorStatusType
  setVendorStatus: (status: VendorStatusType) => void
  // Admin fields
  role: Role | null
  loading: boolean
  user: AdminUserData | null
  updateUser: (updates: Partial<AdminUserData>) => void
}

interface AdminUserData {
  id: string
  name: string
  email: string
  role: Role
  groupId: string | null
  groupName: string | null
  commissionRate: number | null
  totalEarned: number | null
  pendingPayout: number | null
  permissions: string[]
}

export const PerspectiveContext = React.createContext<PerspectiveContextType>({
  perspective: "buyer",
  setPerspective: () => {},
  isAuthenticated: false,
  hasOnboarded: false,
  setOnboarded: () => {},
  login: () => {},
  logout: () => {},
  profile: {},
  updateProfile: () => {},
  vendorStatus: "active",
  setVendorStatus: () => {},
  role: null,
  loading: false,
  user: null,
  updateUser: () => {},
})

export const PerspectiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [perspective, setPerspective] = React.useState<Perspective>("buyer")
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [hasOnboarded, setOnboarded] = React.useState(false)
  const [profile, setProfile] = React.useState<ProfileData>({})
  const [role, setRole] = React.useState<Role | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState<AdminUserData | null>(null)
  const [vendorStatus, setVendorStatus] = React.useState<VendorStatusType>(
    () => (localStorage.getItem('vahivat-vendor-status') as VendorStatusType) || 'active'
  )

  // Force language to English for buyer perspective
  React.useEffect(() => {
    if (perspective === "buyer") {
      i18n.changeLanguage("en")
    }
  }, [perspective])

  const login = (email: string) => {
    setLoading(true)

    // Detect role from email pattern
    if (email.includes("superadmin")) {
      setRole(ROLES.SUPERADMIN)
      setUser({
        id: 'usr_superadmin_001',
        name: 'Slok Rami',
        email,
        role: ROLES.SUPERADMIN,
        groupId: null,
        groupName: null,
        commissionRate: null,
        totalEarned: null,
        pendingPayout: null,
        permissions: ['*'],
      })
      setPerspective("buyer") // default perspective for superadmin
    } else if (email.includes("admin")) {
      setRole(ROLES.GROUP_ADMIN)
      setUser({
        id: 'usr_admin_001',
        name: 'Rahul Shah',
        email,
        role: ROLES.GROUP_ADMIN,
        groupId: 'grp_it_ahm_001',
        groupName: 'IT Ahmedabad',
        commissionRate: 22,
        totalEarned: 62400,
        pendingPayout: 3200,
        permissions: ['manage_vendors', 'manage_buyers', 'view_analytics', 'manage_disputes'],
      })
      setPerspective("vendor") // group admins see vendor perspective
    } else if (email.includes("vendor")) {
      setRole(ROLES.VENDOR)
      setUser({
        id: 'usr_vendor_001',
        name: 'Jayesh Patel',
        email,
        role: ROLES.VENDOR,
        groupId: 'grp_it_ahm_001',
        groupName: 'IT Ahmedabad',
        commissionRate: null,
        totalEarned: null,
        pendingPayout: null,
        permissions: ['view_profile', 'manage_deals'],
      })
      setPerspective("vendor")
    } else {
      setRole(ROLES.BUYER)
      setUser({
        id: 'usr_buyer_001',
        name: 'Rajesh Industries',
        email,
        role: ROLES.BUYER,
        groupId: 'grp_it_ahm_001',
        groupName: 'IT Ahmedabad',
        commissionRate: null,
        totalEarned: null,
        pendingPayout: null,
        permissions: ['view_profile', 'create_rfp'],
      })
      setPerspective("buyer")
    }

    setIsAuthenticated(true)
    setLoading(false)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setOnboarded(false)
    setProfile({})
    setRole(null)
    setUser(null)
  }

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  const handleSetVendorStatus = (status: VendorStatusType) => {
    setVendorStatus(status)
    localStorage.setItem('vahivat-vendor-status', status)
  }

  const updateUser = (updates: Partial<AdminUserData>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null)
  }

  return (
    <PerspectiveContext.Provider value={{ 
      perspective, setPerspective, isAuthenticated, hasOnboarded, setOnboarded, 
      login, logout, profile, updateProfile, vendorStatus, setVendorStatus: handleSetVendorStatus,
      role, loading, user, updateUser,
    }}>
      {children}
    </PerspectiveContext.Provider>
  )
}

export const usePerspective = () => React.useContext(PerspectiveContext)
