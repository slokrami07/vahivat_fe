import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'

interface AdminEmptyStateProps {
  icon?: LucideIcon
  headline: string
  subtext?: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function AdminEmptyState({
  icon: Icon = Inbox,
  headline,
  subtext,
  actionLabel,
  onAction,
  className,
}: AdminEmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-16 px-6 text-center',
      'border-2 border-dashed border-slate-200 rounded-xl bg-white',
      className,
    )}>
      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-5">
        <Icon className="w-7 h-7 text-slate-400" />
      </div>
      <h3 className="text-lg font-fraunces font-bold text-ink mb-2">{headline}</h3>
      {subtext && <p className="text-charcoal text-sm max-w-md mb-6">{subtext}</p>}
      {actionLabel && onAction && (
        <Button onClick={onAction} className="rounded-full">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
