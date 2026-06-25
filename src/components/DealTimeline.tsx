import { useTranslation } from "react-i18next"

interface DealTimelineProps {
  currentStatus: string
}

export function DealTimeline({ currentStatus }: DealTimelineProps) {
  const { t } = useTranslation()

  const stages = [
    { key: 'inquiry', icon: '📋' },
    { key: 'quoted', icon: '💬' },
    { key: 'negotiating', icon: '🤝' },
    { key: 'confirmed', icon: '✅' },
    { key: 'delivered', icon: '📦' },
    { key: 'paid', icon: '💰' },
  ]

  const currentIndex = stages.findIndex(s => s.key === currentStatus)

  return (
    <div className="overflow-x-auto py-2 px-1 -mx-1">
      <div className="flex items-center min-w-[480px] gap-0">
        {stages.map((stage, index) => {
          const done = index < currentIndex
          const active = index === currentIndex
          
          return (
            <div key={stage.key} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                    done
                      ? 'bg-emerald-500 text-white'
                      : active
                      ? 'bg-blue-600 text-white ring-[3px] ring-blue-200'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {done ? '✓' : stage.icon}
                </div>
                <span
                  className={`text-[10px] text-center leading-tight max-w-[56px] ${
                    done
                      ? 'text-emerald-600 font-medium'
                      : active
                      ? 'text-blue-600 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {t(`deal.status.${stage.key}`)}
                </span>
              </div>
              {index < stages.length - 1 && (
                <div
                  className={`flex-1 h-[3px] mb-5 transition-colors duration-300 mx-1 rounded-full ${
                    index < currentIndex ? 'bg-emerald-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
