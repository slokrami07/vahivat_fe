import * as React from "react"
import { useTranslation } from "react-i18next"

interface ConfirmDialogProps {
  open: boolean
  title?: string
  message?: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
  const { t } = useTranslation()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-lg font-fraunces font-bold text-ink mb-2">
          {title || t('confirm.title')}
        </h3>
        <p className="text-charcoal text-sm mb-6 leading-relaxed">
          {message || t('confirm.delete_message')}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-full text-sm font-medium text-charcoal bg-slate-100 hover:bg-slate-200 transition-colors min-h-[44px]"
          >
            {t('confirm.cancel')}
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-full text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md shadow-red-200 min-h-[44px]"
          >
            {t('confirm.confirm')}
          </button>
        </div>
      </div>
    </div>
  )
}
