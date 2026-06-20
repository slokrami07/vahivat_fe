import * as React from "react"
import { useNavigate } from "react-router-dom"
import { usePerspective } from "@/context/PerspectiveContext"
import { Bell, Search, UserCircle, LogOut, Settings, User, Check, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const initialNotifications = [
  { id: 1, icon: "🎉", text: "Proposal Shortlisted: Acme Corp updated your status for 'E-Commerce Replatforming' to Shortlisted.", time: "10m ago", read: false },
  { id: 2, icon: "📅", text: "Meeting Request: Global Industries invited you to an ERP Sync call on June 18th.", time: "1h ago", read: false },
  { id: 3, icon: "⚡", text: "New Match: An enterprise just posted an RFP matching your 'React / Node.js' capability profile.", time: "3h ago", read: false },
]

export function Header() {
  const navigate = useNavigate()
  const { perspective, logout } = usePerspective()
  
  const [isProfileOpen, setIsProfileOpen] = React.useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState(initialNotifications)

  const profileRef = React.useRef<HTMLDivElement>(null)
  const notifRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }
  
  const clearNotifications = () => {
    setNotifications([])
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md px-6 shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-charcoal" strokeWidth={1.5} />
          <Input type="search" placeholder="Search marketplace..." className="pl-9 bg-cream border-none w-full focus-visible:ring-1 focus-visible:ring-terracotta rounded-full text-ink" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen)
              setIsProfileOpen(false)
            }}
            className="relative text-charcoal hover:text-ink transition-colors p-1"
          >
            <Bell className="h-5 w-5" strokeWidth={1.5} />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-terracotta ring-2 ring-white"></span>
            )}
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-100 bg-white text-ink shadow-lg outline-none animate-in fade-in-0 zoom-in-95 z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <span className="font-semibold text-sm text-ink">Notifications</span>
                {notifications.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-charcoal" onClick={markAllAsRead} title="Mark all as read">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-charcoal" onClick={clearNotifications} title="Clear all">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-sm text-charcoal">
                    No new notifications.
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={cn("px-4 py-3 flex gap-3 border-b border-slate-100 last:border-0 hover:bg-cream transition-colors", notif.read ? "opacity-75" : "")}>
                        <div className="text-lg">{notif.icon}</div>
                        <div className="flex flex-col gap-1">
                          <p className={cn("text-sm leading-snug", notif.read ? "text-charcoal" : "font-medium text-ink")}>
                            {notif.text}
                          </p>
                          <span className="text-xs text-charcoal/70">{notif.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => {
              setIsProfileOpen(!isProfileOpen)
              setIsNotificationsOpen(false)
            }}
            className="flex items-center gap-2 hover:bg-cream p-1 pr-2 rounded-full transition-colors border border-transparent hover:border-slate-200 text-charcoal"
          >
            <UserCircle className="h-8 w-8 text-charcoal" />
            <span className="text-sm font-medium hidden sm:inline-block">
              {perspective === "buyer" ? "Acme Corp" : "TechNova Agency"}
            </span>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-slate-100 bg-white text-ink shadow-md outline-none animate-in fade-in-0 zoom-in-95 z-50">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-medium leading-none mb-1 text-ink">
                  {perspective === "buyer" ? "Acme Corp" : "TechNova Agency"}
                </p>
                <p className="text-xs leading-none text-charcoal">
                  {perspective === "buyer" ? "buyer@acmecorp.com" : "vendor@technova.com"}
                </p>
              </div>
              <div className="p-1 border-b border-slate-100">
                <button 
                  onClick={() => {
                    setIsProfileOpen(false)
                    navigate('/settings')
                  }}
                  className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none text-charcoal hover:bg-cream hover:text-ink transition-colors"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </button>
                <button 
                  onClick={() => {
                    setIsProfileOpen(false)
                    navigate('/settings?tab=preferences')
                  }}
                  className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none text-charcoal hover:bg-cream hover:text-ink transition-colors"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Preferences</span>
                </button>
              </div>
              <div className="p-1">
                <button 
                  onClick={() => {
                    setIsProfileOpen(false)
                    logout()
                  }}
                  className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-cream hover:text-red-600 text-red-500 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  )
}
