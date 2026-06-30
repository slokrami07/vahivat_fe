import { useNavigate, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { usePerspective } from "@/context/PerspectiveContext"

export const LandingFooter = () => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()
  const { logout } = usePerspective()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      logout();
      navigate(`/#${id}`);
    }
  }

  const languages = [
    { code: "gu", label: "ગુ" },
    { code: "hi", label: "हि" },
    { code: "en", label: "EN" },
  ] as const

  return (
    <footer role="contentinfo" style={{ background: "#0D172B", borderTop: "1px solid rgba(255,255,255,0.06)" }} className="py-12 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Col 1 — Brand */}
        <div>
          <span className="font-fraunces text-2xl font-semibold text-white">
            vahi<span className="text-terracotta">વટ</span>
          </span>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed" style={{ fontFamily: i18n.language === "en" ? "'Outfit', sans-serif" : i18n.language === "hi" ? "'Noto Sans Devanagari', sans-serif" : "'Noto Sans Gujarati', sans-serif" }}>
            {t("landing.footer.subtext")}
          </p>
          <div className="text-gray-500 text-sm mt-4 leading-relaxed whitespace-pre-line">
            {t("landing.footer.whatsapp_hint")}<br />
            <a
              href="https://wa.me/919999999999"
              className="text-gray-300 hover:text-white transition-colors font-medium mt-1 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 XXXXX XXXXX
            </a>
          </div>
        </div>

        {/* Col 2 — Platform */}
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4 font-semibold">Platform</p>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => {
                  logout()
                  navigate("/app/hub")
                }}
                className="text-gray-300 hover:text-white text-sm transition-colors inline-action text-left"
              >
                Find Vendors
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  logout()
                  navigate("/login?type=buyer")
                }}
                className="text-gray-300 hover:text-white text-sm transition-colors inline-action text-left"
              >
                Post an RFQ
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  logout()
                  navigate("/login?type=vendor")
                }}
                className="text-gray-300 hover:text-white text-sm transition-colors inline-action text-left"
              >
                List Your Business
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("pricing")} className="text-gray-300 hover:text-white text-sm transition-colors inline-action text-left">
                Pricing
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3 — Company */}
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4 font-semibold">Company</p>
          <ul className="space-y-2 text-left">
            <li>
              <Link to="/about" className="text-gray-300 hover:text-white text-sm transition-colors block text-left">
                About Vahivat
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-300 hover:text-white text-sm transition-colors block text-left">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors block text-left">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-gray-300 hover:text-white text-sm transition-colors block text-left">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4 — Industries */}
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-4 font-semibold">Industries</p>
          <ul className="space-y-2 text-left text-sm text-gray-300">
            <li>IT & Technology (Live)</li>
            <li>Textile (Coming Soon)</li>
            <li>Pharma (Coming Soon)</li>
            <li>Construction (Coming Soon)</li>
            <li>FMCG (Coming Soon)</li>
            <li>Manufacturing (Coming Soon)</li>
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div
        className="max-w-6xl mx-auto border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <p className="text-gray-500 text-sm">© 2026 Vahivat Technologies Pvt. Ltd. · Made in Gujarat, India 🇮🇳</p>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          {languages.map((lang, i) => (
            <span key={lang.code}>
              <button
                onClick={() => i18n.changeLanguage(lang.code)}
                className={`hover:text-white transition-colors inline-action ${i18n.language === lang.code ? "text-terracotta font-semibold" : ""
                  }`}
              >
                {lang.label}
              </button>
              {i < languages.length - 1 && <span className="ml-2">|</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
