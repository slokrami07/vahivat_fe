import * as React from "react"
import i18n from "@/i18n"

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
})

export const PerspectiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [perspective, setPerspective] = React.useState<Perspective>("buyer")
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [hasOnboarded, setOnboarded] = React.useState(false)
  const [profile, setProfile] = React.useState<ProfileData>({})
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
    if (email.includes("vendor")) {
      setPerspective("vendor")
    } else {
      setPerspective("buyer")
    }
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setOnboarded(false)
    setProfile({})
  }

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updates }))
  }

  const handleSetVendorStatus = (status: VendorStatusType) => {
    setVendorStatus(status)
    localStorage.setItem('vahivat-vendor-status', status)
  }

  return (
    <PerspectiveContext.Provider value={{ 
      perspective, setPerspective, isAuthenticated, hasOnboarded, setOnboarded, 
      login, logout, profile, updateProfile, vendorStatus, setVendorStatus: handleSetVendorStatus 
    }}>
      {children}
    </PerspectiveContext.Provider>
  )
}

export const usePerspective = () => React.useContext(PerspectiveContext)

