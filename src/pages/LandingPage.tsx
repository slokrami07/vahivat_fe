import { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useScrollReveal } from "@/hooks/useScrollReveal"
import { useToast } from "@/components/Toast"
import { usePerspective } from "@/context/PerspectiveContext"
import { Check } from "lucide-react"
import { Helmet } from "react-helmet-async"
import BlurText from "./BlurText"
import ClickSpark from "./ClickSpark"
import PillNav from "@/components/PillNav"
import { PUBLIC_NAV_ITEMS, DARK_NAV_COLORS } from "@/config/navItems"
import { LandingFooter } from "@/components/landing/LandingFooter"

/* ═══════════════════════════════════════════════════════════════
   LANDING PAGE — vahiવટ B2B Marketplace
   Single-file component with all 12 sections inline.
   No separate layout — manages its own navbar + footer.
   ═══════════════════════════════════════════════════════════════ */

// ── SECTION COMPONENTS ────────────────────────────────────────



function HeroSection() {
  const navigate = useNavigate()
  const { login, logout } = usePerspective()
  const { t, i18n } = useTranslation()
  const [showSubline, setShowSubline] = useState(false)

  const heroWords = t("landing.hero.hero_words", { returnObjects: true }) as string[] || ["Gujarat's", "Verified", "Vendors"]

  useEffect(() => {
    setShowSubline(false)
  }, [i18n.language])

  const handleAnimationComplete = () => {
    setShowSubline(true)
  }

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden bg-ink"
    >
      {/* Ghost background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          style={{
            fontSize: "clamp(100px, 18vw, 240px)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.02)",
            letterSpacing: "-0.05em",
            whiteSpace: "nowrap",
          }}
          className="font-fraunces"
        >
          vahiવટ
        </span>
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        {/* Eyebrow */}
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">
          {t("landing.hero.eyebrow")}
        </p>

        {/* Dynamic headline — BlurText animation */}
        <BlurText
          key={i18n.language}
          text={heroWords.join(" ")}
          delay={200}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="mb-2 font-bold justify-center"
          as="h1"
          style={{
            fontSize: "clamp(36px, 7vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            fontFamily: i18n.language === "en" ? "'Outfit', sans-serif" : i18n.language === "hi" ? "'Noto Sans Devanagari', sans-serif" : "'Noto Sans Gujarati', sans-serif",
            color: "white",
          }}
          highlightWord="Verified"
          highlightClass="text-terracotta"
          highlightStyle={{ color: "#C75D3A" }}
        />

        {/* Sub-headline */}
        <span
          className="block text-gray-300 font-light transition-all duration-700 mt-2"
          style={{
            fontSize: "clamp(16px, 2vw, 26px)",
            opacity: showSubline ? 1 : 0,
            transform: showSubline ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {t("landing.hero.subline")}
        </span>

        {/* Dual CTA cards — Directs new users to onboarding */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 w-full max-w-lg">
          <div className="rounded-xl border border-slate-100/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-3 text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-1">{t("landing.hero.buy_title")}</p>
              <p className="text-sm text-gray-300">{t("landing.hero.buy_desc")}</p>
            </div>
            <button
              onClick={() => {
                login("buyer@acmecorp.com")
                navigate("/onboarding")
              }}
              aria-label="Join Vahivat as a buyer — find GST verified vendors in Gujarat"
              className="w-full bg-white text-ink rounded-lg py-3 text-sm font-semibold hover:bg-cream transition-colors"
            >
              {t("landing.hero.buy_cta")}
            </button>
          </div>
          <div className="rounded-xl border border-slate-100/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-3 text-left">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-1">{t("landing.hero.sell_title")}</p>
              <p className="text-sm text-gray-300">{t("landing.hero.sell_desc")}</p>
            </div>
            <button
              onClick={() => {
                login("vendor@technova.com")
                navigate("/onboarding")
              }}
              aria-label="List your business on Vahivat — verified B2B vendor marketplace Gujarat"
              className="w-full bg-terracotta text-white rounded-lg py-3 text-sm font-semibold hover:bg-terracotta/90 transition-colors"
            >
              {t("landing.hero.sell_cta")}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          {t("landing.hero.login_hint")}{" "}
          <button
            onClick={() => {
              logout()
              navigate("/login")
            }}
            className="text-white hover:text-terracotta underline underline-offset-2 transition-colors inline-action font-medium"
          >
            {t("landing.hero.login_link")}
          </button>
        </p>
      </div>

      {/* Scroll indicator (desktop) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-500">
        <div className="w-px h-10 bg-gray-700" />
        <span className="text-xs tracking-widest uppercase">{t("landing.hero.scroll")}</span>
      </div>
    </section>
  )
}

function TrustBar() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useTranslation()
  return (
    <section
      ref={ref}
      aria-label="Vahivat platform statistics — verified B2B vendor marketplace Gujarat"
      className={`reveal ${isVisible ? "visible" : ""} py-4 px-6 md:px-10`}
      style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "#132039" }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 reveal-child">
          <span className="text-white font-bold text-xl">200+</span>
          <span className="text-gray-400 text-xs leading-tight whitespace-pre-line">{t("landing.trust.businesses")}</span>
        </div>
        <div className="hidden md:block w-px h-8 bg-white/10" />
        <div className="flex items-center gap-3 reveal-child">
          <span className="text-white font-bold text-xl">1,400+</span>
          <span className="text-gray-400 text-xs leading-tight whitespace-pre-line">{t("landing.trust.deals")}</span>
        </div>
        <div className="hidden md:block w-px h-8 bg-white/10" />
        <div className="flex items-center gap-3 reveal-child">
          <span className="text-white font-bold text-xl">100%</span>
          <span className="text-gray-400 text-xs leading-tight whitespace-pre-line">{t("landing.trust.vendors")}</span>
        </div>
        <div className="hidden md:block w-px h-8 bg-white/10" />
        <p className="text-xs text-gray-500 tracking-wide reveal-child">Ahmedabad  ·  Surat  ·  Rajkot  ·  Vadodara</p>
      </div>
    </section>
  )
}

function ProblemSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useTranslation()

  const problems = [
    { title: t("landing.problem.gst.title"), desc: t("landing.problem.gst.desc") },
    { title: t("landing.problem.chats.title"), desc: t("landing.problem.chats.desc") },
    { title: t("landing.problem.quotes.title"), desc: t("landing.problem.quotes.desc") },
    { title: t("landing.problem.record.title"), desc: t("landing.problem.record.desc") },
  ]

  return (
    <section ref={ref} aria-labelledby="problem-heading" className={`reveal ${isVisible ? "visible" : ""} py-20 px-6 md:px-10 bg-ink`}>
      <div className="max-w-6xl mx-auto">
        <h2 id="problem-heading" className="text-white font-bold whitespace-pre-line" style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em" }}>
          {t("landing.problem.heading")}
        </h2>
        <p className="text-gray-300 text-base mt-4 max-w-xl">
          {t("landing.problem.desc")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 mt-14">
          {problems.map((p, i) => (
            <div key={i} className="bg-ink p-8 hover:bg-[#1E2E50] transition-colors duration-300 reveal-child">
              <div className="text-terracotta text-2xl mb-4 font-bold">✗</div>
              <h3 className="text-white font-semibold text-base mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<"buyer" | "vendor">("buyer")

  const buyerSteps = [
    { num: "01", title: t("landing.buyer_steps.rfq.title"), desc: t("landing.buyer_steps.rfq.desc") },
    { num: "02", title: t("landing.buyer_steps.quotes.title"), desc: t("landing.buyer_steps.quotes.desc") },
    { num: "03", title: t("landing.buyer_steps.compare.title"), desc: t("landing.buyer_steps.compare.desc") },
  ]

  const vendorSteps = [
    { num: "01", title: t("landing.vendor_steps.gstin.title"), desc: t("landing.vendor_steps.gstin.desc") },
    { num: "02", title: t("landing.vendor_steps.list.title"), desc: t("landing.vendor_steps.list.desc") },
    { num: "03", title: t("landing.vendor_steps.close.title"), desc: t("landing.vendor_steps.close.desc") },
  ]

  const steps = activeTab === "buyer" ? buyerSteps : vendorSteps

  return (
    <section ref={ref} aria-labelledby="how-heading" className={`reveal ${isVisible ? "visible" : ""} py-20 px-6 md:px-10 bg-cream`}>
      <div className="max-w-4xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-charcoal/70 mb-3">{t("landing.how.eyebrow")}</p>
        <h2
          id="how-heading"
          className="text-ink font-bold font-fraunces whitespace-pre-line"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em" }}
        >
          {t("landing.how.heading")}
        </h2>

        {/* Tab switcher */}
        <div role="tablist" aria-label="How Vahivat works for buyers and vendors" className="flex gap-0 border-b border-slate-200 mt-10 mb-8">
          {(["buyer", "vendor"] as const).map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`${tab}-steps`}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm transition-colors inline-action ${activeTab === tab
                ? "border-b-2 border-terracotta text-ink font-semibold"
                : "text-charcoal/70 hover:text-ink"
                }`}
            >
              {tab === "buyer" ? t("landing.how.tab_buyers") : t("landing.how.tab_vendors")}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div id={`${activeTab}-steps`} role="tabpanel" className="space-y-1">
          {steps.map((step, i) => (
            <div
              key={`${activeTab}-${step.num}`}
              className={`py-7 flex items-start gap-6 ${i < steps.length - 1 ? "border-b border-slate-200/80" : ""}`}
            >
              <span className="text-5xl font-bold text-terracotta/20 leading-none shrink-0 hidden sm:block font-fraunces">
                {step.num}
              </span>
              <div>
                <h3 className="font-bold text-lg text-ink">{step.title}</h3>
                <p className="text-sm text-charcoal mt-1 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useTranslation()

  const features = [
    { title: t("landing.features.gst.title"), desc: t("landing.features.gst.desc"), badge: t("landing.features.gst.badge"), icon: "🛡️" },
    { title: t("landing.features.ai.title"), desc: t("landing.features.ai.desc"), badge: t("landing.features.ai.badge"), icon: "🤖" },
    { title: t("landing.features.chat.title"), desc: t("landing.features.chat.desc"), icon: "💬" },
    { title: t("landing.features.compare.title"), desc: t("landing.features.compare.desc"), icon: "📊" },
    { title: t("landing.features.invoice.title"), desc: t("landing.features.invoice.desc"), icon: "📄" },
    { title: t("landing.features.progress.title"), desc: t("landing.features.progress.desc"), icon: "📈" },
  ]

  return (
    <section ref={ref} aria-labelledby="features-heading" className={`reveal ${isVisible ? "visible" : ""} py-20 px-6 md:px-10 bg-[#132039]`}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">{t("landing.features.eyebrow")}</p>
        <h2 id="features-heading" className="text-white font-bold whitespace-pre-line" style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em" }}>
          {t("landing.features.heading")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 mt-12">
          {features.map((f, i) => (
            <div key={i} className="bg-[#132039] p-7 hover:bg-ink transition-colors duration-300 reveal-child">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-base mb-2">{f.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">{f.desc}</p>
              {f.badge && (
                <span className="inline-block mt-3 text-xs px-2.5 py-1 rounded-full bg-terracotta/10 text-terracotta font-medium tracking-wide">
                  {f.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AISection() {
  const { ref, isVisible } = useScrollReveal()
  const { t, i18n } = useTranslation()
  const terminalRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [phase, setPhase] = useState<"typing" | "generating" | "result" | "resetting">("typing")
  const charIndex = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const demoText = t("landing.ai.demo_text_typed") || "mane 50 laptops joiye, next month delivery, budget 30,000 per unit"

  // IntersectionObserver to pause/resume animation
  useEffect(() => {
    const el = terminalRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const cleanup = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (!isInView) {
      cleanup()
      return
    }

    if (phase === "typing") {
      charIndex.current = 0
      setDisplayText("")
      intervalRef.current = setInterval(() => {
        if (charIndex.current < demoText.length) {
          setDisplayText(demoText.slice(0, charIndex.current + 1))
          charIndex.current++
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current)
          timerRef.current = setTimeout(() => setPhase("generating"), 600)
        }
      }, 38)
    } else if (phase === "generating") {
      timerRef.current = setTimeout(() => setPhase("result"), 1400)
    } else if (phase === "result") {
      timerRef.current = setTimeout(() => setPhase("resetting"), 3000)
    } else if (phase === "resetting") {
      setDisplayText("")
      charIndex.current = 0
      timerRef.current = setTimeout(() => setPhase("typing"), 500)
    }

    return cleanup
  }, [phase, isInView, cleanup, demoText])

  return (
    <section ref={ref} aria-label="AI-powered RFQ generator demonstration — Gujarati language procurement tool" className={`reveal ${isVisible ? "visible" : ""} py-20 px-6 md:px-10 bg-ink`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">{t("landing.ai.eyebrow")}</p>
          <h2
            id="ai-heading"
            className="text-white font-bold whitespace-pre-line"
            style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em", fontFamily: i18n.language === "en" ? "'Outfit', sans-serif" : i18n.language === "hi" ? "'Noto Sans Devanagari', sans-serif" : "'Noto Sans Gujarati', sans-serif" }}
          >
            {t("landing.ai.heading")}
          </h2>
          <p className="text-gray-400 text-sm tracking-wide mt-1.5 font-medium uppercase text-terracotta">
            {t("landing.ai.subheading")}
          </p>
          <p className="text-gray-300 text-base mt-4 max-w-md leading-relaxed whitespace-pre-line">
            {t("landing.ai.desc")}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[t("landing.ai.chip_1"), t("landing.ai.chip_2"), t("landing.ai.chip_3")].map((chip) => (
              <span key={chip} className="text-xs px-3 py-1.5 rounded-full border border-white/20 text-gray-300 inline-action bg-white/5 font-medium">
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Right — AI Terminal */}
        <div ref={terminalRef} className="bg-[#0E172A] border border-white/10 rounded-xl p-6 max-w-lg w-full shadow-2xl">
          {/* Top bar */}
          <div className="flex gap-1.5 mb-5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Prompt */}
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2 font-semibold">{t("landing.ai.prompt_label", "What do you need?")}</p>
          <p className="text-slate-200 text-sm leading-relaxed min-h-[48px] font-mono">
            {displayText}
            {phase === "typing" && (
              <span className="inline-block w-0.5 h-4 bg-terracotta ml-0.5 animate-pulse align-middle" />
            )}
          </p>

          {/* Generating */}
          {phase === "generating" && (
            <div className="flex items-center gap-2 mt-4 text-terracotta text-xs font-semibold">
              <div className="w-3.5 h-3.5 border border-terracotta border-t-transparent rounded-full animate-spin" />
              {t("landing.ai.generating")}
            </div>
          )}

          {/* Result */}
          {phase === "result" && (
            <div className="mt-4 bg-slate-900/60 border border-slate-700/50 rounded-lg p-4 animate-in fade-in duration-300">
              <p className="text-emerald-400 text-xs uppercase tracking-wider mb-3 font-semibold">{t("landing.ai.result_title")}</p>
              {[
                [t("landing.ai.label_product"), t("landing.ai.val_product")],
                [t("landing.ai.label_qty"), t("landing.ai.val_qty")],
                [t("landing.ai.label_budget"), t("landing.ai.val_budget")],
                [t("landing.ai.label_delivery"), t("landing.ai.val_delivery")],
                [t("landing.ai.label_matched"), t("landing.ai.val_matched")],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-xs py-1.5 border-b border-slate-800/80 last:border-0">
                  <span className="text-slate-400">{label}</span>
                  <span className={`font-medium ${label === t("landing.ai.label_matched") ? "text-terracotta" : "text-white"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function PricingSection() {
  const navigate = useNavigate()
  const { login } = usePerspective()
  const { ref, isVisible } = useScrollReveal()
  const { t } = useTranslation()
  const [isYearly, setIsYearly] = useState(false)

  const getPrice = (monthly: number) => {
    if (monthly === 0) return "₹0"
    const price = isYearly ? monthly * 10 : monthly
    return `₹${price.toLocaleString("en-IN")}`
  }

  const getPeriod = (monthly: number) => {
    if (monthly === 0) return t("landing.pricing.plans.free.period")
    return isYearly ? t("landing.pricing.yearly_period", "per year, billed annually") : t("landing.pricing.plans.basic.period")
  }

  const plans = [
    {
      name: t("landing.pricing.plans.free.name"),
      key: "free",
      monthly: 0,
      features: [
        t("landing.pricing.plans.free.feat1"),
        t("landing.pricing.plans.free.feat2"),
        t("landing.pricing.plans.free.feat3"),
        t("landing.pricing.plans.free.feat4"),
      ],
      cta: t("landing.pricing.plans.free.cta"),
      popular: false,
    },
    {
      name: t("landing.pricing.plans.basic.name"),
      key: "basic",
      monthly: 999,
      features: [
        t("landing.pricing.plans.basic.feat1"),
        t("landing.pricing.plans.basic.feat2"),
        t("landing.pricing.plans.basic.feat3"),
        t("landing.pricing.plans.basic.feat4"),
        t("landing.pricing.plans.basic.feat5"),
      ],
      cta: t("landing.pricing.plans.basic.cta"),
      popular: true,
    },
    {
      name: t("landing.pricing.plans.pro.name"),
      key: "pro",
      monthly: 2999,
      features: [
        t("landing.pricing.plans.pro.feat1"),
        t("landing.pricing.plans.pro.feat2"),
        t("landing.pricing.plans.pro.feat3"),
        t("landing.pricing.plans.pro.feat4"),
        t("landing.pricing.plans.pro.feat5"),
        t("landing.pricing.plans.pro.feat6"),
      ],
      cta: t("landing.pricing.plans.pro.cta"),
      popular: false,
    },
  ]

  return (
    <section id="pricing" ref={ref} aria-label="Vahivat vendor subscription pricing — B2B marketplace Gujarat" className={`reveal ${isVisible ? "visible" : ""} py-20 px-6 md:px-10 bg-cream`}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-charcoal/70 mb-3">{t("landing.pricing.eyebrow")}</p>
        <h2 id="pricing-heading" className="text-ink font-bold font-fraunces whitespace-pre-line" style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em" }}>
          {t("landing.pricing.heading")}
        </h2>

        {/* Buyer free callout */}
        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-3 mb-8 mt-8 text-sm text-emerald-800">
           <strong>{t("landing.pricing.callout")}</strong>
        </div>

        {/* Toggle */}
        <div className="flex rounded-lg border border-slate-300 overflow-hidden w-fit mb-8 bg-white p-0.5">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 text-sm transition-colors rounded-md inline-action font-medium ${!isYearly ? "bg-ink text-white" : "text-charcoal hover:bg-slate-100"
              }`}
          >
            {t("landing.pricing.monthly")}
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-5 py-2 text-sm transition-colors rounded-md inline-action font-medium ${isYearly ? "bg-ink text-white" : "text-charcoal hover:bg-slate-100"
              }`}
          >
            {t("landing.pricing.yearly")}
          </button>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-200 rounded-2xl overflow-hidden shadow-lg">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 relative flex flex-col justify-between ${plan.popular ? "bg-ink text-white" : "bg-white"}`}
            >
              {plan.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 bg-terracotta text-white text-xs px-4 py-1 rounded-b-lg font-semibold tracking-wide shadow-sm">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className={`text-lg font-bold mb-1 ${plan.popular ? "" : "text-ink"}`}>{plan.name}</h3>
                <div className="mb-6 mt-2">
                  <span className="text-3xl font-extrabold">{getPrice(plan.monthly)}</span>
                  <span className={`text-sm ml-1 ${plan.popular ? "text-slate-300" : "text-charcoal"}`}>
                    {getPeriod(plan.monthly)}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-terracotta mt-0.5" />
                      <span className={plan.popular ? "text-slate-200" : "text-charcoal"}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => {
                  login("vendor@technova.com")
                  localStorage.setItem("pending_plan", plan.key)
                  navigate("/onboarding")
                }}
                className={`w-full rounded-full py-3 text-sm font-semibold transition-all hover:scale-[1.02] ${plan.popular
                  ? "bg-terracotta text-white hover:bg-terracotta/95 shadow-md shadow-terracotta/20"
                  : "border border-slate-300 text-ink hover:bg-slate-50"
                  }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-charcoal/70 mt-6 leading-relaxed whitespace-pre-line">
          {t("landing.pricing.bottom_note")}
        </p>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t, i18n } = useTranslation()

  const testimonials = [
    { initials: "JP", name: t("landing.testimonials.jp.name"), business: t("landing.testimonials.jp.business"), city: t("landing.testimonials.jp.city"), color: "bg-terracotta", quote: t("landing.testimonials.jp.quote") },
    { initials: "MS", name: t("landing.testimonials.ms.name"), business: t("landing.testimonials.ms.business"), city: t("landing.testimonials.ms.city"), color: "bg-emerald-600", quote: t("landing.testimonials.ms.quote") },
    { initials: "RD", name: t("landing.testimonials.rd.name"), business: t("landing.testimonials.rd.business"), city: t("landing.testimonials.rd.city"), color: "bg-amber-600", quote: t("landing.testimonials.rd.quote") },
  ]

  return (
    <section ref={ref} aria-label="Customer testimonials — businesses using Vahivat B2B marketplace Gujarat" className={`reveal ${isVisible ? "visible" : ""} py-20 px-6 md:px-10 bg-ink`}>
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">{t("landing.testimonials.eyebrow")}</p>
        <h2
          id="testimonials-heading"
          className="text-white font-bold"
          style={{ fontSize: "clamp(28px, 4vw, 52px)", letterSpacing: "-0.02em", fontFamily: i18n.language === "en" ? "'Outfit', sans-serif" : i18n.language === "hi" ? "'Noto Sans Devanagari', sans-serif" : "'Noto Sans Gujarati', sans-serif" }}
        >
          {t("landing.testimonials.heading")}
        </h2>
        <p className="text-gray-300 text-base mt-2 max-w-xl">
          {t("landing.testimonials.subheading")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((tVal, i) => (
            <blockquote key={i} cite="Vahivat user review" className="bg-[#1C2C4E] border border-white/5 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 reveal-child text-left">
              <p className="text-gray-300 text-sm leading-relaxed italic mb-6">"{tVal.quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full ${tVal.color} flex items-center justify-center font-bold text-sm text-white`}
                >
                  {tVal.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{tVal.name}</p>
                  <p className="text-gray-400 text-xs">
                    {tVal.business}, {tVal.city}
                  </p>
                  <p className="text-yellow-400 text-xs mt-0.5">★★★★★</p>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection() {
  const { ref, isVisible } = useScrollReveal()
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    { q: t("landing.faq.q0"), a: t("landing.faq.a0") },
    { q: t("landing.faq.q1"), a: t("landing.faq.a1") },
    { q: t("landing.faq.q2"), a: t("landing.faq.a2") },
    { q: t("landing.faq.q3"), a: t("landing.faq.a3") },
    { q: t("landing.faq.q4"), a: t("landing.faq.a4") },
    { q: t("landing.faq.q5"), a: t("landing.faq.a5") },
    { q: t("landing.faq.q6"), a: t("landing.faq.a6") },
    { q: t("landing.faq.q7"), a: t("landing.faq.a7") },
  ]

  return (
    <section ref={ref} aria-labelledby="faq-heading" className={`reveal ${isVisible ? "visible" : ""} py-20 px-6 md:px-10 bg-cream border-b border-slate-200/60`}>
      <div className="max-w-4xl mx-auto">
        <h2 id="faq-heading" className="text-ink font-bold font-fraunces text-left mb-10" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          {t("landing.faq.heading")}
        </h2>
        <div className="border-t border-slate-200">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-slate-200 last:border-0">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
                aria-expanded={openFaq === i}
              >
                <span className="font-medium text-ink pr-8">{faq.q}</span>
                <span className="text-charcoal/70 flex-shrink-0 text-lg">
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && (
                <p className="pb-5 text-charcoal/70 text-sm leading-relaxed">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IndustriesSection() {
  const navigate = useNavigate()
  const { login } = usePerspective()
  const { showToast } = useToast()
  const { ref, isVisible } = useScrollReveal()
  const { t } = useTranslation()
  const [waitlistIndustry, setWaitlistIndustry] = useState<string | null>(null)
  const [waitlistPhone, setWaitlistPhone] = useState("")

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (waitlistPhone.length >= 10) {
      showToast(t("landing.industries.waitlist_success", "You're on the list. We'll reach out the moment it's live."))
      setWaitlistIndustry(null)
      setWaitlistPhone("")
    }
  }

  const industries = [
    { name: t("landing.industries.it.name"), live: true, desc: t("landing.industries.it.desc"), icon: "💻" },
    { name: t("landing.industries.textile.name"), live: false, desc: t("landing.industries.textile.desc"), icon: "🧵" },
    { name: t("landing.industries.pharma.name"), live: false, desc: t("landing.industries.pharma.desc"), icon: "💊" },
    { name: t("landing.industries.construction.name"), live: false, desc: t("landing.industries.construction.desc"), icon: "🏗️" },
    { name: t("landing.industries.fmcg.name"), live: false, desc: t("landing.industries.fmcg.desc"), icon: "📦" },
    { name: t("landing.industries.mfg.name"), live: false, desc: t("landing.industries.mfg.desc"), icon: "⚙️" },
  ]

  return (
    <section id="industries" ref={ref} aria-labelledby="industries-heading" className={`reveal ${isVisible ? "visible" : ""} py-20 px-6 md:px-10 bg-cream`}>
      <div className="max-w-4xl mx-auto">
        <h2 id="industries-heading" className="text-ink font-bold font-fraunces whitespace-pre-line" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
          {t("landing.industries.heading")}
        </h2>
        <p className="text-charcoal mt-3 text-base">
          {t("landing.industries.desc")}
        </p>

        <div className="flex flex-wrap gap-3 mt-10">
          {industries.map((ind) => (
            <button
              key={ind.name}
              onClick={() => {
                if (ind.live) {
                  login("vendor@technova.com")
                  navigate("/onboarding")
                } else {
                  setWaitlistIndustry(ind.name)
                }
              }}
              className={`rounded-xl border px-4 py-3 flex items-center gap-3 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-md ${ind.live
                ? "border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50"
                : "border-slate-300 bg-white hover:bg-slate-50"
                }`}
            >
              <span className="text-xl shrink-0">{ind.icon}</span>
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold text-ink leading-tight">{ind.name}</span>
                <span className="text-xs text-charcoal/70 font-normal mt-0.5 leading-snug">{ind.desc}</span>
              </div>
              {ind.live ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold shrink-0 self-start">Live</span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-charcoal/70 font-semibold shrink-0 self-start">Soon</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Waitlist Modal */}
      {waitlistIndustry && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-in fade-in duration-200"
          onClick={() => setWaitlistIndustry(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-ink mb-1">{t("landing.industries.waitlist_title", { industry: waitlistIndustry })}</h3>
            <p className="text-sm text-charcoal/80 mb-4">
              {t("landing.industries.waitlist_desc")}
            </p>
            <form onSubmit={handleWaitlistSubmit} className="space-y-3">
              <input
                type="tel"
                placeholder={t("landing.industries.waitlist_placeholder")}
                value={waitlistPhone}
                onChange={(e) => setWaitlistPhone(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-3 text-sm bg-white text-ink focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent"
                required
                minLength={10}
              />
              <button
                type="submit"
                className="w-full bg-terracotta text-white rounded-lg py-3 text-sm font-semibold hover:bg-terracotta/90 transition-colors shadow-md shadow-terracotta/10"
              >
                {t("landing.industries.waitlist_cta")}
              </button>
            </form>
            <button
              onClick={() => setWaitlistIndustry(null)}
              className="mt-3 w-full text-center text-sm text-charcoal/70 hover:text-ink transition-colors inline-action"
            >
              {t("landing.industries.cancel")}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function BottomCTASection() {
  const navigate = useNavigate()
  const { login } = usePerspective()
  const { ref, isVisible } = useScrollReveal()
  const { t } = useTranslation()
  return (
    <section ref={ref} aria-labelledby="bottom-cta-heading" className={`reveal ${isVisible ? "visible" : ""} py-24 px-6 text-center bg-terracotta`}>
      <div className="max-w-2xl mx-auto">
        <h2
          id="bottom-cta-heading"
          className="font-bold text-white font-fraunces"
          style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "-0.03em" }}
        >
          {t("landing.cta.heading")}
        </h2>
        <p className="text-white/80 text-base mt-3 mb-10 leading-relaxed">
          {t("landing.cta.subheading")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              login("buyer@acmecorp.com")
              navigate("/onboarding")
            }}
            className="bg-white text-terracotta font-bold rounded-xl px-8 py-4 text-sm hover:bg-cream transition-colors shadow-lg shadow-black/10 animate-in fade-in"
          >
            {t("landing.cta.find")}
          </button>
          <button
            onClick={() => {
              login("vendor@technova.com")
              navigate("/onboarding")
            }}
            className="border border-white/40 text-white rounded-xl px-8 py-4 text-sm hover:border-white transition-colors font-semibold"
          >
            {t("landing.cta.list")}
          </button>
        </div>
      </div>
    </section>
  )
}



// ── MAIN COMPONENT ────────────────────────────────────────────

export function LandingPage() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  return (
    <ClickSpark
      sparkColor="#C75D3A"
      sparkSize={21}
      sparkRadius={25}
      sparkCount={8}
      duration={400}
    >
      <div style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: 'fit-content',
        maxWidth: 'calc(100vw - 32px)',
      }}>
        <PillNav
          logoAlt="Vahivat"
          items={PUBLIC_NAV_ITEMS}
          activeHref={location.pathname}
          {...DARK_NAV_COLORS}
          initialLoadAnimation={false}
        />
      </div>

      <div className="min-w-0 overflow-x-hidden bg-cream text-charcoal">
        <Helmet>
          <title>{t("landing.seo.title", "Vahivat — Gujarat's Verified B2B Vendor Marketplace | Find GST-Verified Suppliers")}</title>
          <meta name="description" content={t("landing.seo.description", "Vahivat is Gujarat's #1 B2B marketplace to find GST-verified vendors, compare supplier quotes, and close deals — all in Gujarati. Trusted by 200+ businesses in Ahmedabad, Surat, Rajkot.")} />
          <link rel="canonical" href="https://vahivat.in/" />
          <html lang={i18n.language} />
        </Helmet>
        <main>
          <HeroSection />
          <TrustBar />
          <ProblemSection />
          <HowItWorksSection />
          <FeaturesSection />
          <AISection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <IndustriesSection />
          <BottomCTASection />
        </main>
        <LandingFooter />
      </div>
    </ClickSpark>
  )
}
