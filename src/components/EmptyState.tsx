import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  emoji?: string
  titleKey: string
  descriptionKey: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({ emoji = "📭", titleKey, descriptionKey, actionLabel, onAction }: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border-2 border-dashed border-slate-200 rounded-xl bg-white">
      <div className="text-6xl mb-4">{emoji}</div>
      <h3 className="text-lg font-fraunces font-bold text-ink mb-2">
        {t(titleKey)}
      </h3>
      <p className="text-charcoal text-sm max-w-md mb-6">
        {t(descriptionKey)}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="rounded-full bg-terracotta hover:bg-terracotta/90 text-white px-6"
        >
          {t(actionLabel)}
        </Button>
      )}
    </div>
  )
}
