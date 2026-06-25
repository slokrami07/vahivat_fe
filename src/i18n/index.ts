import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import gu from './locales/gu.json'
import hi from './locales/hi.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      gu: { translation: gu },
      hi: { translation: hi },
    },
    // English by default — only changes when user explicitly toggles
    lng: localStorage.getItem('vahivat-lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

// Persist language choice
i18n.on('languageChanged', (lng: string) => {
  localStorage.setItem('vahivat-lang', lng)
  // Update document lang attribute for accessibility
  document.documentElement.lang = lng
})

export default i18n
