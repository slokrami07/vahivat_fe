import * as React from "react"
import { useTranslation } from "react-i18next"

type VendorStatusType = "active" | "busy" | "unavailable"

interface VendorStatusProps {
  status: VendorStatusType
  editable?: boolean
  onChange?: (status: VendorStatusType) => void
}

const statusConfig = {
  active: { dot: 'bg-emerald-400', ring: 'ring-emerald-100', key: 'vendor.status_active' },
  busy: { dot: 'bg-amber-400', ring: 'ring-amber-100', key: 'vendor.status_busy' },
  unavailable: { dot: 'bg-red-400', ring: 'ring-red-100', key: 'vendor.status_unavailable' },
} as const

export function VendorStatus({ status, editable = false, onChange }: VendorStatusProps) {
  const { t } = useTranslation()
  const [showPopover, setShowPopover] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowPopover(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const config = statusConfig[status]

  const badge = (
    <div className="flex items-center gap-2">
      <div className={`w-2.5 h-2.5 rounded-full ${config.dot} ring-2 ${config.ring}`} />
      <span className="text-xs text-charcoal font-medium">{t(config.key)}</span>
    </div>
  )

  if (!editable) return badge

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setShowPopover(!showPopover)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white hover:bg-cream transition-colors cursor-pointer min-h-[36px]"
        title={t('vendor.set_status')}
      >
        {badge}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-charcoal/50">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {showPopover && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-slate-100 rounded-xl shadow-lg z-50 min-w-[200px] py-1 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-charcoal/50 font-semibold">
            {t('vendor.set_status')}
          </div>
          {(Object.keys(statusConfig) as VendorStatusType[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                onChange?.(key)
                setShowPopover(false)
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-cream transition-colors ${
                status === key ? 'bg-cream/50' : ''
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full ${statusConfig[key].dot}`} />
              <span className="text-sm text-ink">{t(statusConfig[key].key)}</span>
              {status === key && <span className="ml-auto text-terracotta text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
