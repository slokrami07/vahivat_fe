import * as React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { LayoutDashboard, Compass, FileText, CalendarDays, MessageSquare, Zap, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePerspective } from "@/context/PerspectiveContext"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const { perspective } = usePerspective()
  const { t } = useTranslation()
  const navigate = useNavigate()

  const buyerNavItems = [
    { name: t('nav.dashboard'), path: "/", icon: LayoutDashboard },
    { name: t('nav.discovery_hub'), path: "/hub", icon: Compass },
    { name: t('nav.active_rfps'), path: "/rfps", icon: FileText },
    { name: t('nav.calendar'), path: "/calendar", icon: CalendarDays },
    { name: t('nav.chat'), path: "/chat", icon: MessageSquare },
  ]

  const vendorNavItems = [
    { name: t('nav.dashboard'), path: "/", icon: LayoutDashboard },
    { name: t('nav.scan_opportunities'), path: "/hub", icon: Compass },
    { name: t('nav.active_proposals'), path: "/rfps", icon: FileText },
    { name: t('nav.calendar'), path: "/calendar", icon: CalendarDays },
    { name: t('nav.chat'), path: "/chat", icon: MessageSquare },
  ]

  const navItems = perspective === "buyer" ? buyerNavItems : vendorNavItems

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-100 bg-white shadow-sm hidden lg:block transition-colors duration-200">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <span className="font-fraunces text-2xl font-semibold tracking-tight text-ink">
            vahi<span className="text-terracotta">વટ</span>
          </span>
        </div>
      </div>
      
      <div className="p-4 py-6 flex flex-col gap-2 h-[calc(100vh-4rem)]">
        {perspective === "buyer" && (
          <div className="mb-4">
            <Button 
              className="w-full justify-start gap-2 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" 
              onClick={() => navigate('/create-rfp')}
            >
              <PlusCircle className="h-5 w-5" />
              {t('nav.create_requirement')}
            </Button>
          </div>
        )}

        <div className="flex-1 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-terracotta/10 text-terracotta"
                    : "text-charcoal hover:bg-cream hover:text-ink hover:translate-x-1 hover:border-l-2 hover:border-terracotta/50"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </aside>
  )
}
