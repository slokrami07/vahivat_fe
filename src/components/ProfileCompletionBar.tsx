import { useTranslation } from "react-i18next"

interface ProfileData {
  phone?: string
  gstin?: string
  photo?: string
  products?: string[]
  description?: string
}

export function ProfileCompletionBar({ profile }: { profile: ProfileData }) {
  const { t } = useTranslation()

  const steps = [
    { key: 'phone', label: t('profile.phone_verified'), done: !!profile.phone },
    { key: 'gstin', label: t('profile.gstin_verified'), done: !!profile.gstin },
    { key: 'photo', label: t('profile.photo_added'), done: !!profile.photo },
    { key: 'products', label: t('profile.product_added'), done: (profile.products?.length ?? 0) > 0 },
    { key: 'description', label: t('profile.description_added'), done: !!profile.description },
  ]

  const completed = steps.filter(s => s.done).length
  const percentage = Math.round((completed / steps.length) * 100)

  if (percentage === 100) return null

  const nextStep = steps.find(s => !s.done)

  return (
    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-amber-900">
          {t('profile.complete')} — {percentage}%
        </span>
        <span className="text-xs text-amber-700 font-medium">{completed}/{steps.length}</span>
      </div>
      <div className="bg-amber-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-amber-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {nextStep && (
        <div className="mt-2 text-xs text-amber-800">
          👉 {nextStep.label}
        </div>
      )}
    </div>
  )
}
