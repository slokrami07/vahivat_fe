import { useState } from "react"
import { usePerspective } from "@/context/PerspectiveContext"
import { Input } from "@/components/ui/input"
import { Building, Briefcase, Eye, EyeOff, ShieldCheck, Users } from "lucide-react"
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

  const handleQuickLogin = (type: "buyer" | "vendor" | "superadmin" | "admin") => {
    if (type === "buyer") {
      setEmail("buyer@acmecorp.com")
      setPassword("demo123")
      login("buyer@acmecorp.com")
    } else if (type === "vendor") {
      setEmail("vendor@technova.com")
      setPassword("demo123")
      login("vendor@technova.com")
    } else if (type === "superadmin") {
      setEmail("superadmin@vahiવટ.com")
      setPassword("demo123")
      login("superadmin@vahiવટ.com")
    } else if (type === "admin") {
      setEmail("admin@vahiવટ.com")
      setPassword("demo123")
      login("admin@vahiવટ.com")
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 transition-colors duration-200">
      <div className="w-full max-w-md mb-8 text-center flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-4 flex items-center justify-center">
          <img src="/logo.png" alt="Vahivat Logo" className="w-20 h-20 object-contain shrink-0" />
        </div>
        <h1 className="text-3xl font-fraunces font-bold tracking-tight text-ink">
          vahi<span className="text-terracotta">વટ</span>
        </h1>
        <p className="text-sm md:text-base font-medium text-slate-600 mt-2 text-center">
          Where <span className="font-bold text-[#1E3A8A]">Big Buyers</span> Meet The <span className="font-bold text-[#EA580C]">Makers</span>
        </p>
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

      <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-500 delay-200">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-border flex-1 max-w-[100px]"></div>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-charcoal">Demo Environments</p>
          <div className="h-px bg-border flex-1 max-w-[100px]"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => handleQuickLogin("buyer")}
            className="flex items-center text-left p-4 border border-slate-100 rounded-2xl bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-terracotta group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl bg-transparent group-hover:bg-terracotta/10 transition-colors duration-300 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-12 w-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mr-3 group-hover:scale-110 transition-transform duration-300">
              <Building className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold font-fraunces text-ink text-sm">Acme Corp</h3>
              <p className="text-xs text-charcoal mt-0.5">Enterprise Buyer Profile</p>
            </div>
          </button>

          <button
            onClick={() => handleQuickLogin("vendor")}
            className="flex items-center text-left p-4 border border-slate-100 rounded-2xl bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-terracotta group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl bg-transparent group-hover:bg-terracotta/10 transition-colors duration-300 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-12 w-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mr-3 group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold font-fraunces text-ink text-sm">TechNova Agency</h3>
              <p className="text-xs text-charcoal mt-0.5">Service Vendor Profile</p>
            </div>
          </button>

          <button
            onClick={() => handleQuickLogin("superadmin")}
            className="flex items-center text-left p-4 border border-slate-100 rounded-2xl bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-terracotta group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl bg-transparent group-hover:bg-terracotta/10 transition-colors duration-300 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-12 w-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mr-3 group-hover:scale-110 transition-transform duration-300">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold font-fraunces text-ink text-sm">Slok Rami</h3>
              <p className="text-xs text-charcoal mt-0.5">Superadmin Profile</p>
            </div>
          </button>

          <button
            onClick={() => handleQuickLogin("admin")}
            className="flex items-center text-left p-4 border border-slate-100 rounded-2xl bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-terracotta group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl bg-transparent group-hover:bg-terracotta/10 transition-colors duration-300 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-12 w-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mr-3 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-bold font-fraunces text-ink text-sm">Rahul Shah</h3>
              <p className="text-xs text-charcoal mt-0.5">Partner (Group Admin)</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
