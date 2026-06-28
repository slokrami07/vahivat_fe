import * as React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { usePerspective } from '@/context/PerspectiveContext'
import { formatIndianCurrency } from '@/lib/commission'
import {
  LayoutDashboard, Users, UserCheck, BarChart3, AlertTriangle,
  Megaphone, IndianRupee, UserCircle, LogOut, Menu, X, ChevronLeft,
} from 'lucide-react'

export function GroupAdminLayout() {
  const { user, logout } = usePerspective()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(false)

  const pendingPayout = user?.pendingPayout || 3200

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Vendors', path: '/admin/vendors', icon: Users },
    { name: 'Buyers', path: '/admin/buyers', icon: UserCheck },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Disputes', path: '/admin/disputes', icon: AlertTriangle },
    { name: 'Announcements', path: '/admin/announcements', icon: Megaphone },
    { name: 'My Earnings', path: '/admin/earnings', icon: IndianRupee, badge: formatIndianCurrency(pendingPayout), badgeColor: 'bg-terracotta' },
    { name: 'Group Profile', path: '/admin/profile', icon: UserCircle },
  ]

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
        {/* Logo + group info */}
        <div className={cn(
          'h-16 flex items-center border-b border-slate-100 px-4 gap-2',
          collapsed && 'justify-center px-2',
        )}>
          <div className="flex items-center gap-2 cursor-pointer min-w-0" onClick={() => navigate('/admin')}>
            <span className="font-fraunces text-xl font-semibold text-ink whitespace-nowrap">
              {collapsed ? 'v' : <span>vahi<span className="text-terracotta">વટ</span></span>}
            </span>
          </div>
          {!collapsed && (
            <span className="ml-auto bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
              Partner
            </span>
          )}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto p-1 min-h-0">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Group name */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-medium text-ink truncate">{user?.groupName || 'IT Ahmedabad'}</p>
            <span className="text-xs text-slate-400">Industry Group</span>
          </div>
        )}

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
              {item.badge && (
                <span className={cn(
                  'text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 whitespace-nowrap',
                  item.badgeColor || 'bg-terracotta',
                  collapsed ? 'absolute -top-1 -right-1 text-[8px]' : 'ml-auto',
                )}>
                  {collapsed ? '₹' : item.badge}
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

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center justify-center h-10 border-t border-slate-100 text-slate-400 hover:text-ink transition-colors min-h-0"
        >
          <ChevronLeft className={cn('w-4 h-4 transition-transform', collapsed && 'rotate-180')} />
        </button>

        {/* User + Logout */}
        <div className={cn('border-t border-slate-100 p-3', collapsed && 'flex flex-col items-center')}>
          {!collapsed && (
            <div className="px-3 py-2 mb-2">
              <p className="text-sm font-medium text-ink truncate">{user?.name || 'Group Admin'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          )}
          <button
            onClick={() => { logout(); navigate('/'); }}
            className={cn(
              'flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors',
              collapsed && 'justify-center px-2',
            )}
          >
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className={cn('flex-1 flex flex-col transition-all duration-300', collapsed ? 'lg:pl-[72px]' : 'lg:pl-60')}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center px-4 lg:px-6 shadow-sm transition-colors duration-200">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 mr-3 min-h-0">
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <span className="font-fraunces text-lg font-semibold text-ink lg:hidden">
            vahi<span className="text-terracotta">વટ</span>
          </span>

          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="text-xs text-slate-500 hover:text-ink font-medium px-3 py-1.5 rounded-lg border border-slate-100 hover:bg-cream transition-colors"
            >
              Exit Partner Portal
            </button>
            <span className="hidden sm:inline text-xs text-slate-500">{user?.groupName || 'IT Ahmedabad'}</span>
            <span className="bg-terracotta text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Partner
            </span>
            <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-sm font-bold">
              {(user?.name || 'A').charAt(0)}
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
