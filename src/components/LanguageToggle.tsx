import { useTranslation } from 'react-i18next'
import { usePerspective } from '@/context/PerspectiveContext'

const languages = [
  { code: 'gu', label: 'ગુ' },
  { code: 'hi', label: 'हि' },
  { code: 'en', label: 'EN' },
] as const

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const { perspective } = usePerspective()

  if (perspective === 'buyer') {
    return null
  }

  const handleToggle = (langCode: string) => {
    i18n.changeLanguage(langCode)
  }

  // On mobile: tap cycles through languages
  const cycleLang = () => {
    const currentIdx = languages.findIndex(l => l.code === i18n.language)
    const nextIdx = (currentIdx + 1) % languages.length
    handleToggle(languages[nextIdx].code)
  }

  return (
    <>
      {/* Desktop: show all three as pills */}
      <div className="hidden sm:flex items-center bg-cream rounded-full border border-slate-200 p-0.5 gap-0.5">
        {languages.map((lang) => {
          const isSelected = i18n.language === lang.code
          return (
            <button
              key={lang.code}
              onClick={() => handleToggle(lang.code)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[32px] min-w-[36px] flex items-center justify-center gap-1 ${
                isSelected
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'text-charcoal hover:text-ink hover:bg-white'
              }`}
              aria-label={`Switch to ${lang.code}`}
            >
              {lang.label}
            </button>
          )
        })}
      </div>

      {/* Mobile: single button that cycles */}
      <button
        onClick={cycleLang}
        className="sm:hidden flex items-center justify-center bg-cream rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-terracotta min-h-[36px] min-w-[36px] transition-all active:scale-95"
        aria-label="Switch language"
      >
        {languages.find(l => l.code === i18n.language)?.label || 'EN'}
      </button>
    </>
  )
}



