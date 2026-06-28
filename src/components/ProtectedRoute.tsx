import { Navigate } from 'react-router-dom'
import { usePerspective } from '@/context/PerspectiveContext'
import type { Role } from '@/lib/roles'

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: Role[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, role } = usePerspective()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-terracotta/30 border-t-terracotta rounded-full animate-spin" />
          <p className="text-charcoal text-sm font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
