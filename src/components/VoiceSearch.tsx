import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface VoiceSearchProps {
  onResult: (transcript: string) => void
}

export function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(false)
  const { i18n, t } = useTranslation()

  const langMap: Record<string, string> = {
    gu: 'gu-IN',
    hi: 'hi-IN',
    en: 'en-IN',
  }

  useEffect(() => {
    setSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  }, [])

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.lang = langMap[i18n.language] || 'gu-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    setListening(true)
    recognition.start()

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      onResult(transcript)
      setListening(false)
    }

    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
  }

  if (!supported) return null

  return (
    <button
      onClick={startListening}
      aria-label={t('search.voice_tooltip')}
      title={t('search.voice_tooltip')}
      className={`flex items-center justify-center rounded-full w-9 h-9 transition-all duration-200 min-h-[36px] min-w-[36px] ${
        listening
          ? 'bg-red-500 text-white voice-pulse'
          : 'text-charcoal/70 hover:text-terracotta hover:bg-terracotta/10'
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    </button>
  )
}
