import * as React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { usePerspective } from '@/context/PerspectiveContext'
import { mockVerificationQueue } from '@/lib/mockData'
import {
  LayoutDashboard, Grid3X3, Users, ShieldCheck, IndianRupee,
  Banknote, ToggleLeft, BarChart3, LogOut, Menu, X, ChevronLeft,
} from 'lucide-react'

const pendingVerifications = mockVerificationQueue.filter(v => v.status === 'pending').length

const navItems = [
  { name: 'Dashboard', path: '/superadmin', icon: LayoutDashboard, end: true },
  { name: 'Industry Groups', path: '/superadmin/groups', icon: Grid3X3 },
  { name: 'All Vendors', path: '/superadmin/vendors', icon: Users },
  { name: 'Verification Queue', path: '/superadmin/verification-queue', icon: ShieldCheck, badge: pendingVerifications },
  { name: 'Revenue', path: '/superadmin/revenue', icon: IndianRupee },
  { name: 'Partner Payouts', path: '/superadmin/payouts', icon: Banknote },
  { name: 'Feature Flags', path: '/superadmin/feature-flags', icon: ToggleLeft },
  { name: 'Reports', path: '/superadmin/reports', icon: BarChart3 },
]

export function SuperadminLayout() {
  const { user, logout } = usePerspective()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div className="flex min-h-screen bg-cream transition-colors duration-200">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 bg-white border-r border-slate-100 flex flex-col transition-all duration-300 ease-in-out',
          collapsed ? 'w-[72px]' : 'w-60',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        {/* Logo */}
        <div className={cn(
          'h-16 flex items-center border-b border-slate-100 px-4 gap-3',
          collapsed && 'justify-center px-2',
        )}>
          <div
            className="flex items-center gap-2 cursor-pointer min-w-0"
            onClick={() => navigate('/superadmin')}
          >
            <span className="font-fraunces text-xl font-semibold text-ink whitespace-nowrap">
              {collapsed ? 'v' : <span>vahi<span className="text-terracotta">વટ</span></span>}
            </span>
          </div>
          {!collapsed && (
            <span className="ml-auto bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              Super
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-1 min-h-0"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 relative group',
                  collapsed && 'justify-center px-2',
                  isActive
                    ? 'bg-terracotta/10 text-terracotta'
                    : 'text-slate-600 hover:bg-cream hover:text-ink',
                )
              }
            >
              <item.icon className="w-[18px] h-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.name}</span>}
              {item.badge && item.badge > 0 && (
                <span className={cn(
                  'bg-terracotta text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center',
                  collapsed ? 'absolute -top-1 -right-1' : 'ml-auto',
                )}>
                  {item.badge}
                </span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-ink text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center h-10 border-t border-slate-100 text-slate-400 hover:text-ink transition-colors min-h-0"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>

        {/* User + Logout */}
        <div className={cn(
          'border-t border-slate-100 p-3',
          collapsed && 'flex flex-col items-center',
        )}>
          {!collapsed && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-ink truncate">{user?.name || 'Superadmin'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className={cn(
              'flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-cream hover:text-terracotta transition-colors',
              collapsed && 'justify-center px-2',
            )}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={cn(
        'flex-1 flex flex-col transition-all duration-300',
        collapsed ? 'lg:pl-[72px]' : 'lg:pl-60',
      )}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center px-4 lg:px-6 shadow-sm transition-colors duration-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 mr-3 min-h-0"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          <div className="flex items-center gap-2">
            <span className="font-fraunces text-lg font-semibold text-ink lg:hidden">
              vahi<span className="text-terracotta">વટ</span>
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => navigate('/app')}
              className="text-xs text-slate-500 hover:text-ink font-medium px-3 py-1.5 rounded-lg border border-slate-100 hover:bg-cream transition-colors"
            >
              Exit Admin Panel
            </button>
            <span className="bg-terracotta text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Superadmin
            </span>
            <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-sm font-bold">
              {(user?.name || 'S').charAt(0)}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
