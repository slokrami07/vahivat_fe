import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: 'positive' | 'negative' | 'neutral'
  trendText?: string
  onClick?: () => void
  icon?: LucideIcon
  iconColor?: string
  className?: string
}

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendText,
  onClick,
  icon: Icon,
  iconColor = 'text-terracotta',
  className,
}: KPICardProps) {
  const TrendIcon = trend === 'positive' ? TrendingUp : trend === 'negative' ? TrendingDown : Minus
  const trendColor = trend === 'positive' ? 'text-emerald-600' : trend === 'negative' ? 'text-red-500' : 'text-slate-400'

  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-slate-100 p-5 transition-all duration-300',
        'hover:shadow-md hover:border-terracotta/20 hover:-translate-y-0.5',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={cn('w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center', iconColor)}>
            <Icon className="w-4.5 h-4.5" />
          </div>
        )}
      </div>
      <div className="text-2xl font-fraunces font-bold text-ink mb-1">{value}</div>
      {subtitle && <p className="text-xs text-slate-500 mb-1">{subtitle}</p>}
      {trend && trendText && (
        <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
          <TrendIcon className="w-3.5 h-3.5" />
          {trendText}
        </div>
      )}
    </div>
  )
}
