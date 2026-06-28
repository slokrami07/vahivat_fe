import * as React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ConfirmModalProps {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  confirmVariant?: 'danger' | 'primary'
  onConfirm: (inputValue?: string) => void
  onCancel: () => void
  inputLabel?: string
  inputPlaceholder?: string
  inputRequired?: boolean
}

export function ConfirmModal({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  confirmVariant = 'primary',
  onConfirm,
  onCancel,
  inputLabel,
  inputPlaceholder,
  inputRequired = false,
}: ConfirmModalProps) {
  const [inputValue, setInputValue] = React.useState('')

  React.useEffect(() => {
    if (!open) setInputValue('')
  }, [open])

  if (!open) return null

  const canConfirm = !inputRequired || inputValue.trim().length > 0

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 transition-colors min-h-0"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>

        <h3 className="text-lg font-fraunces font-bold text-ink mb-2 pr-8">
          {title}
        </h3>
        <p className="text-charcoal text-sm mb-5 leading-relaxed">
          {message}
        </p>

        {inputLabel && (
          <div className="mb-5">
            <label className="block text-sm font-medium text-ink mb-1.5">
              {inputLabel}
              {inputRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta resize-none"
            />
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            className="min-h-[40px]"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(inputValue || undefined)}
            disabled={!canConfirm}
            className={cn(
              'min-h-[40px]',
              confirmVariant === 'danger'
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-terracotta hover:bg-terracotta/90 text-white',
            )}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
