import * as React from "react"
import { usePerspective } from "@/context/PerspectiveContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Building2, Laptop, Cloud, UploadCloud, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function Onboarding() {
  const { setOnboarded } = usePerspective()
  const [step, setStep] = React.useState(1)
  const [focus, setFocus] = React.useState<string[]>([])

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else setOnboarded(true)
  }

  const toggleFocus = (id: string) => {
    setFocus(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6 transition-colors duration-200">
      <div className="w-full max-w-4xl space-y-12 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Progress Tracker */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-slate-200 rounded-full">
            <div 
              className="h-full bg-terracotta rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
          </div>
          <div className="relative flex justify-between">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-300 z-10 shadow-sm",
                  step >= s ? "border-terracotta text-terracotta bg-terracotta/10" : "border-slate-200 text-slate-400 bg-white"
                )}
              >
                {step > s ? <CheckCircle2 className="h-5 w-5 text-terracotta" strokeWidth={2.5} /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-medium text-slate-500 px-1">
            <span className={cn(step >= 1 && "text-ink font-semibold")}>Legal Profile</span>
            <span className={cn("text-center", step >= 2 && "text-ink font-semibold")}>Operational Focus</span>
            <span className={cn(step >= 3 && "text-ink font-semibold")}>Verification Vault</span>
          </div>
        </div>

        <Card className="border-slate-100 shadow-xl rounded-2xl bg-white backdrop-blur-sm">
          <CardHeader className="p-8 pb-6 text-center">
            <CardTitle className="text-3xl font-fraunces tracking-tight text-ink">
              {step === 1 && "Complete Your Legal Profile"}
              {step === 2 && "Select Your Operational Focus"}
              {step === 3 && "Verification Vault"}
            </CardTitle>
            <CardDescription className="text-base mt-2 text-charcoal">
              {step === 1 && "Please provide your registered company details to continue."}
              {step === 2 && "What are your primary verticals? Select all that apply."}
              {step === 3 && "Upload your ISO, Security, or Tax Compliance PDFs to get verified faster."}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 max-w-xl mx-auto">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-ink">Company Name</label>
                  <Input placeholder="e.g. Acme Corporation" className="bg-cream border-transparent h-12 rounded-xl focus-visible:ring-terracotta text-ink" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-ink">GST / Tax Registration Number</label>
                  <Input placeholder="Enter Tax ID" className="bg-cream border-transparent h-12 rounded-xl focus-visible:ring-terracotta text-ink" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-ink">Website</label>
                    <Input placeholder="https://" className="bg-cream border-transparent h-12 rounded-xl focus-visible:ring-terracotta text-ink" />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-ink">Location</label>
                    <Input placeholder="City, Country" className="bg-cream border-transparent h-12 rounded-xl focus-visible:ring-terracotta text-ink" />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid md:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
                {[
                  { id: "it", title: "IT/Software Dev Agency", icon: Building2 },
                  { id: "hw", title: "Hardware Provider", icon: Laptop },
                  { id: "saas", title: "SaaS Reseller", icon: Cloud },
                ].map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => toggleFocus(item.id)}
                    className={cn(
                      "flex flex-col items-center text-center p-8 border rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group bg-white",
                      focus.includes(item.id) ? "border-terracotta ring-1 ring-terracotta/20" : "border-slate-100 hover:border-terracotta/50"
                    )}
                  >
                    {/* Decorative Corner */}
                    <div className={cn(
                      "absolute top-0 right-0 w-8 h-8 rounded-bl-2xl transition-colors duration-300 flex items-center justify-center",
                      focus.includes(item.id) ? "bg-terracotta" : "bg-transparent group-hover:bg-terracotta/10"
                    )}>
                      {focus.includes(item.id) && <CheckCircle2 className="h-4 w-4 text-white" strokeWidth={3} />}
                    </div>
                    
                    <item.icon className={cn("h-12 w-12 mb-6 transition-colors duration-300", focus.includes(item.id) ? "text-terracotta" : "text-slate-400 group-hover:text-terracotta/90")} strokeWidth={1.5} />
                    <span className="font-bold text-lg text-ink font-fraunces tracking-tight">{item.title}</span>
                    <span className="text-sm text-charcoal mt-3 leading-relaxed">Access tailored RFPs in this category.</span>
                  </div>
                ))}
              </div>
            )}

            {step === 3 && (
              <div className="animate-in slide-in-from-right-4 duration-300 max-w-xl mx-auto">
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-16 flex flex-col items-center justify-center text-center bg-cream transition-colors hover:bg-terracotta/5 cursor-pointer group">
                  <UploadCloud className="h-14 w-14 text-slate-300 group-hover:text-terracotta transition-colors mb-6" strokeWidth={1.5} />
                  <h3 className="font-bold font-fraunces text-xl tracking-tight mb-2 text-ink">Drag and drop your PDFs here</h3>
                  <p className="text-sm text-charcoal mb-6">or click to browse from your computer</p>
                  <Button variant="outline" className="rounded-full px-8 hover:border-terracotta hover:text-terracotta text-charcoal bg-white">Select Files</Button>
                </div>
                <div className="mt-6 text-xs text-charcoal text-center font-medium">
                  Supported formats: PDF (Max 10MB per file)
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 p-8 bg-cream rounded-b-2xl">
            <Button variant="ghost" onClick={() => setStep(step > 1 ? step - 1 : 1)} disabled={step === 1} className="rounded-full px-6 text-charcoal hover:bg-white hover:text-ink">
              Back
            </Button>
            <Button onClick={handleNext} className="min-w-[140px] rounded-full bg-terracotta hover:bg-terracotta/90 text-white shadow-md shadow-terracotta/20 transition-all hover:shadow-lg hover:-translate-y-0.5">
              {step === 3 ? "Complete Profile" : "Continue"}
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  )
}
