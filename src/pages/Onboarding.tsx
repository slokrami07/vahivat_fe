import * as React from "react"
import { useTranslation } from "react-i18next"
import { usePerspective } from "@/context/PerspectiveContext"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle2, Loader2, Phone, ShieldCheck, Camera, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
  { id: "textiles", icon: "🧵", key: "onboarding.cat_textiles" },
  { id: "chemicals", icon: "🧪", key: "onboarding.cat_chemicals" },
  { id: "machinery", icon: "⚙️", key: "onboarding.cat_machinery" },
  { id: "food", icon: "🌶️", key: "onboarding.cat_food" },
  { id: "construction", icon: "🏗️", key: "onboarding.cat_construction" },
  { id: "electronics", icon: "💻", key: "onboarding.cat_electronics" },
]

export function Onboarding() {
  const { setOnboarded, updateProfile } = usePerspective()
  const { t } = useTranslation()
  const [step, setStep] = React.useState(1)

  // Step 1 state
  const [phoneNumber, setPhoneNumber] = React.useState("")
  const [otpSent, setOtpSent] = React.useState(false)
  const [otp, setOtp] = React.useState("")
  const [otpVerified, setOtpVerified] = React.useState(false)
  const [resendTimer, setResendTimer] = React.useState(0)
  const [phoneError, setPhoneError] = React.useState("")

  // Step 2 state
  const [gstin, setGstin] = React.useState("")
  const [gstVerifying, setGstVerifying] = React.useState(false)
  const [gstVerified, setGstVerified] = React.useState(false)
  const [gstData, setGstData] = React.useState<{ name: string; date: string; state: string } | null>(null)
  const [gstSkipped, setGstSkipped] = React.useState(false)
  const [gstError, setGstError] = React.useState("")

  // Step 3 state
  const [selectedCategory, setSelectedCategory] = React.useState("")
  const [businessName, setBusinessName] = React.useState("")
  const [photoFile, setPhotoFile] = React.useState<string | null>(null)

  // Success state
  const [showSuccess, setShowSuccess] = React.useState(false)

  // OTP resend timer
  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  // Pre-fill business name from GST data
  React.useEffect(() => {
    if (gstData?.name && !businessName) {
      setBusinessName(gstData.name)
    }
  }, [gstData])

  const handleSendOtp = () => {
    if (phoneNumber.length !== 10) {
      setPhoneError(t('error.invalid_phone'))
      return
    }
    setPhoneError("")
    setOtpSent(true)
    setResendTimer(30)
  }

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      return
    }
    // Mock OTP verification
    setOtpVerified(true)
    updateProfile({ phone: `+91${phoneNumber}` })
  }

  const handleVerifyGstin = () => {
    if (gstin.length !== 15) {
      setGstError(t('error.invalid_gstin'))
      return
    }
    setGstError("")
    setGstVerifying(true)
    // Mock GSTIN verification
    setTimeout(() => {
      setGstVerifying(false)
      setGstVerified(true)
      const mockData = { 
        name: "Shree Textile Industries",
        date: "15/03/2018",
        state: "Gujarat"
      }
      setGstData(mockData)
      updateProfile({ gstin, gstBusinessName: mockData.name, gstState: mockData.state, gstDate: mockData.date })
    }, 1500)
  }

  const handleComplete = () => {
    updateProfile({
      category: selectedCategory,
      businessName: businessName,
      photo: photoFile || undefined,
      products: selectedCategory ? [selectedCategory] : [],
    })
    setShowSuccess(true)
    setTimeout(() => {
      setOnboarded(true)
    }, 2500)
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else handleComplete()
  }

  const canProceed = () => {
    if (step === 1) return otpVerified
    if (step === 2) return gstVerified || gstSkipped
    if (step === 3) return selectedCategory && businessName.trim().length > 0
    return false
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setPhotoFile(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  // Success animation
  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream p-6 relative overflow-hidden">
        {/* Confetti */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece absolute w-3 h-3 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              backgroundColor: ['#C75D3A', '#E8A23D', '#16a34a', '#2563eb', '#8B5CF6'][i % 5],
              animationDelay: `${Math.random() * 1.5}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
        <div className="text-center animate-in fade-in zoom-in duration-500 z-10">
          <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-fraunces font-bold text-ink mb-3">{t('onboarding.success_title')}</h2>
          <p className="text-charcoal max-w-md mx-auto">{t('onboarding.success_desc')}</p>
        </div>
      </div>
    )
  }

  const stepLabels = [
    t('onboarding.step1_label'),
    t('onboarding.step2_label'),
    t('onboarding.step3_label'),
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-6 transition-colors duration-200">
      <div className="w-full max-w-2xl space-y-8 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Progress Tracker */}
        <div className="relative max-w-md mx-auto mb-8">
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
            {stepLabels.map((label, i) => (
              <span key={i} className={cn(step >= i + 1 && "text-ink font-semibold", i === 1 && "text-center")}>{label}</span>
            ))}
          </div>
        </div>

        <Card className="border-slate-100 shadow-xl rounded-2xl bg-white backdrop-blur-sm">
          <CardHeader className="p-8 pb-6 text-center">
            <CardTitle className="text-3xl font-fraunces tracking-tight text-ink">
              {step === 1 && t('onboarding.step1_title')}
              {step === 2 && t('onboarding.step2_title')}
              {step === 3 && t('onboarding.step3_title')}
            </CardTitle>
            <CardDescription className="text-base mt-2 text-charcoal">
              {step === 1 && t('onboarding.step1_desc')}
              {step === 2 && t('onboarding.step2_desc')}
              {step === 3 && t('onboarding.step3_desc')}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-0">
            {/* Step 1: Phone + OTP */}
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 max-w-sm mx-auto">
                <div className="space-y-2">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-charcoal font-medium text-sm pointer-events-none">
                      <Phone className="h-4 w-4" />
                      +91
                    </div>
                    <Input
                      type="tel"
                      placeholder={t('onboarding.phone_placeholder')}
                      value={phoneNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                        setPhoneNumber(val)
                        setPhoneError("")
                      }}
                      disabled={otpVerified}
                      className="pl-[72px] bg-cream border-transparent h-14 rounded-xl focus-visible:ring-terracotta text-ink text-lg"
                    />
                  </div>
                  {phoneError && <p className="field-error">{phoneError}</p>}

                  {!otpSent && !otpVerified && (
                    <Button 
                      onClick={handleSendOtp} 
                      className="w-full rounded-full bg-terracotta hover:bg-terracotta/90 text-white h-12 text-base"
                      disabled={phoneNumber.length !== 10}
                    >
                      {t('onboarding.send_otp')}
                    </Button>
                  )}
                </div>

                {otpSent && !otpVerified && (
                  <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> {t('onboarding.otp_sent')}
                    </p>
                    <Input
                      type="text"
                      inputMode="numeric"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      maxLength={6}
                      autoFocus
                      className="bg-cream border-transparent h-14 rounded-xl focus-visible:ring-terracotta text-ink text-2xl text-center tracking-[0.5em] font-mono"
                    />
                    <Button 
                      onClick={handleVerifyOtp} 
                      className="w-full rounded-full bg-terracotta hover:bg-terracotta/90 text-white h-12"
                      disabled={otp.length !== 6}
                    >
                      {t('onboarding.verify_otp')}
                    </Button>
                    <div className="text-center">
                      {resendTimer > 0 ? (
                        <span className="text-xs text-charcoal">{t('onboarding.resend_in')} {resendTimer}s</span>
                      ) : (
                        <button 
                          onClick={() => { setResendTimer(30) }} 
                          className="text-xs text-terracotta font-medium hover:underline inline-action"
                        >
                          {t('onboarding.resend_otp')}
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {otpVerified && (
                  <div className="flex items-center gap-2 text-emerald-600 font-medium animate-in fade-in duration-300">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>{t('onboarding.otp_sent')} ✓</span>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: GSTIN */}
            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300 max-w-sm mx-auto">
                {!gstVerified && !gstSkipped && (
                  <>
                    <div className="space-y-2">
                      <Input
                        type="text"
                        placeholder={t('onboarding.gstin_placeholder')}
                        value={gstin}
                        onChange={(e) => {
                          setGstin(e.target.value.toUpperCase().slice(0, 15))
                          setGstError("")
                        }}
                        maxLength={15}
                        className="bg-cream border-transparent h-14 rounded-xl focus-visible:ring-terracotta text-ink text-lg text-center tracking-wider font-mono"
                      />
                      <p className="text-xs text-charcoal text-center">
                        {t('onboarding.gstin_helper')}
                      </p>
                      {gstError && <p className="field-error text-center">{gstError}</p>}
                    </div>
                    
                    <Button 
                      onClick={handleVerifyGstin} 
                      className="w-full rounded-full bg-terracotta hover:bg-terracotta/90 text-white h-12"
                      disabled={gstin.length < 15 || gstVerifying}
                    >
                      {gstVerifying ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('onboarding.verifying')}</>
                      ) : (
                        <><ShieldCheck className="mr-2 h-4 w-4" /> {t('onboarding.verify_gstin')}</>
                      )}
                    </Button>
                    
                    <div className="text-center">
                      <button 
                        onClick={() => setGstSkipped(true)} 
                        className="text-sm text-charcoal hover:text-terracotta transition-colors inline-action"
                      >
                        {t('onboarding.skip_now')}
                      </button>
                    </div>
                  </>
                )}

                {gstVerified && gstData && (
                  <div className="animate-in fade-in zoom-in-95 duration-300">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                        <ShieldCheck className="h-5 w-5" />
                        {t('onboarding.gstin_verified')}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-charcoal">{t('onboarding.business_name')}</span>
                          <span className="font-medium text-ink">{gstData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal">{t('onboarding.registration_date')}</span>
                          <span className="font-medium text-ink">{gstData.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-charcoal">{t('onboarding.state')}</span>
                          <span className="font-medium text-ink">{gstData.state}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {gstSkipped && (
                  <div className="animate-in fade-in duration-300">
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">{t('onboarding.skip_now')}</p>
                        <p className="text-xs text-amber-700 mt-1">{t('onboarding.skip_warning')}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Business Setup */}
            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div>
                  <p className="text-sm font-medium text-ink mb-3">{t('onboarding.select_category')}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-center",
                          selectedCategory === cat.id 
                            ? "border-terracotta bg-terracotta/5 ring-1 ring-terracotta/20" 
                            : "border-slate-100 bg-white hover:border-terracotta/40 hover:bg-cream"
                        )}
                      >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs font-medium text-ink leading-tight">{t(cat.key)}</span>
                        {selectedCategory === cat.id && (
                          <CheckCircle2 className="h-4 w-4 text-terracotta" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 max-w-sm mx-auto">
                  <label className="text-sm font-medium text-ink">{t('onboarding.business_name_label')}</label>
                  <Input
                    type="text"
                    placeholder={t('onboarding.business_name_placeholder')}
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="bg-cream border-transparent h-12 rounded-xl focus-visible:ring-terracotta text-ink"
                  />
                </div>

                <div className="max-w-sm mx-auto">
                  <label className="text-sm font-medium text-ink block mb-2">{t('onboarding.photo_upload')}</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label
                      htmlFor="photo-upload"
                      className={cn(
                        "flex items-center justify-center gap-3 border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all",
                        photoFile 
                          ? "border-emerald-300 bg-emerald-50" 
                          : "border-slate-200 bg-cream hover:border-terracotta/40"
                      )}
                    >
                      {photoFile ? (
                        <div className="flex items-center gap-3">
                          <img src={photoFile} alt="" className="h-12 w-12 rounded-lg object-cover" />
                          <span className="text-sm text-emerald-700 font-medium">Photo added ✓</span>
                        </div>
                      ) : (
                        <>
                          <Camera className="h-6 w-6 text-charcoal/50" />
                          <span className="text-sm text-charcoal">{t('onboarding.photo_hint')}</span>
                        </>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-slate-100 p-8 bg-cream rounded-b-2xl">
            <Button 
              variant="ghost" 
              onClick={() => setStep(step > 1 ? step - 1 : 1)} 
              disabled={step === 1} 
              className="rounded-full px-6 text-charcoal hover:bg-white hover:text-ink"
            >
              {t('onboarding.back')}
            </Button>
            <Button 
              onClick={handleNext} 
              disabled={!canProceed()}
              className="min-w-[160px] rounded-full bg-terracotta hover:bg-terracotta/90 text-white shadow-md shadow-terracotta/20 transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50"
            >
              {step === 3 ? t('onboarding.start_profile') : t('onboarding.continue')}
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  )
}
