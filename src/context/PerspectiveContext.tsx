import * as React from "react"

type Perspective = "buyer" | "vendor"

interface PerspectiveContextType {
  perspective: Perspective
  setPerspective: (p: Perspective) => void
  isAuthenticated: boolean
  hasOnboarded: boolean
  setOnboarded: (status: boolean) => void
  login: (email: string) => void
  logout: () => void
}

export const PerspectiveContext = React.createContext<PerspectiveContextType>({
  perspective: "buyer",
  setPerspective: () => {},
  isAuthenticated: false,
  hasOnboarded: false,
  setOnboarded: () => {},
  login: () => {},
  logout: () => {},
})

export const PerspectiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [perspective, setPerspective] = React.useState<Perspective>("buyer")
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [hasOnboarded, setOnboarded] = React.useState(false)

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
  }

  return (
    <PerspectiveContext.Provider value={{ perspective, setPerspective, isAuthenticated, hasOnboarded, setOnboarded, login, logout }}>
      {children}
    </PerspectiveContext.Provider>
  )
}

export const usePerspective = () => React.useContext(PerspectiveContext)
