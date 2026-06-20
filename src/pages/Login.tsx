import { useState } from "react"
import { usePerspective } from "@/context/PerspectiveContext"
import { Input } from "@/components/ui/input"
import { Building, Briefcase, Eye, EyeOff, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function Login() {
  const { login } = usePerspective()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "demo123") {
      login(email)
    } else {
      setError("Invalid password. Hint: demo123")
    }
  }

  const handleQuickLogin = (type: "buyer" | "vendor") => {
    if (type === "buyer") {
      setEmail("buyer@acmecorp.com")
      setPassword("demo123")
      login("buyer@acmecorp.com")
    } else {
      setEmail("vendor@technova.com")
      setPassword("demo123")
      login("vendor@technova.com")
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-md mb-8 text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-4 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M2 4L12 28L18 16L12 4H2Z" fill="url(#login-grad)" opacity="0.8"/>
            <path d="M30 4L16 28L10 16L18 4H30Z" fill="url(#login-grad)"/>
            <defs>
              <linearGradient id="login-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#312E81"/>
                <stop offset="1" stopColor="#8B5CF6"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 className="text-3xl font-fraunces font-bold tracking-tight lowercase text-ink">vahivat</h1>
        <p className="text-charcoal text-sm mt-1">Premium B2B Commerce Network</p>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-100 shadow-xl rounded-2xl p-8 mb-8 animate-in fade-in zoom-in-95 duration-500 delay-100 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-fraunces font-bold tracking-tight text-ink">Sign in</h2>
          <p className="text-sm text-charcoal mt-2">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">Work Email</label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-cream h-12 rounded-xl focus-visible:ring-terracotta text-ink border-transparent"
            />
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-cream h-12 rounded-xl focus-visible:ring-terracotta pr-10 text-ink border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal/70 hover:text-charcoal"
              >
                {showPassword ? <EyeOff className="h-5 w-5" strokeWidth={1.5} /> : <Eye className="h-5 w-5" strokeWidth={1.5} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-terracotta hover:bg-terracotta/90 text-white font-medium py-3 px-4 rounded-full transition-all mt-4 shadow-md shadow-terracotta/20 hover:shadow-lg hover:-translate-y-0.5"
          >
            Sign in securely
          </button>
        </form>
      </div>

      <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-border flex-1 max-w-[100px]"></div>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-charcoal">Demo Environments</p>
          <div className="h-px bg-border flex-1 max-w-[100px]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => handleQuickLogin("buyer")}
            className="flex items-center text-left p-6 border border-slate-100 rounded-2xl bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-terracotta group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl bg-transparent group-hover:bg-terracotta/10 transition-colors duration-300 flex items-center justify-center">
               <ShieldCheck className="h-4 w-4 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-14 w-14 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
              <Building className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold font-fraunces text-ink">Acme Corp</h3>
              <p className="text-sm text-charcoal mt-1">Enterprise Buyer Profile</p>
            </div>
          </button>

          <button
            onClick={() => handleQuickLogin("vendor")}
            className="flex items-center text-left p-6 border border-slate-100 rounded-2xl bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-terracotta group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl bg-transparent group-hover:bg-terracotta/10 transition-colors duration-300 flex items-center justify-center">
               <ShieldCheck className="h-4 w-4 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-14 w-14 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold font-fraunces text-ink">TechNova Agency</h3>
              <p className="text-sm text-charcoal mt-1">Service Vendor Profile</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
