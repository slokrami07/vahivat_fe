import { cn } from '@/lib/utils'

const STATUS_CONFIG: Record<string, { label: string; bg: string; color: string }> = {
  active:     { label: 'Active',     bg: 'bg-emerald-50',  color: 'text-emerald-700' },
  inactive:   { label: 'Inactive',   bg: 'bg-slate-100',   color: 'text-slate-600' },
  pending:    { label: 'Pending',    bg: 'bg-amber-50',    color: 'text-amber-700' },
  verified:   { label: 'Verified',   bg: 'bg-emerald-50',  color: 'text-emerald-700' },
  rejected:   { label: 'Rejected',   bg: 'bg-red-50',      color: 'text-red-700' },
  suspended:  { label: 'Suspended',  bg: 'bg-red-50',      color: 'text-red-700' },
  trial:      { label: 'Trial',      bg: 'bg-violet-50',   color: 'text-violet-700' },
  paid:       { label: 'Paid',       bg: 'bg-emerald-50',  color: 'text-emerald-700' },
  processing: { label: 'Processing', bg: 'bg-blue-50',     color: 'text-blue-700' },
  open:       { label: 'Open',       bg: 'bg-amber-50',    color: 'text-amber-700' },
  resolved:   { label: 'Resolved',   bg: 'bg-emerald-50',  color: 'text-emerald-700' },
  escalated:  { label: 'Escalated',  bg: 'bg-red-50',      color: 'text-red-700' },
  failed:     { label: 'Failed',     bg: 'bg-red-50',      color: 'text-red-700' },
  refunded:   { label: 'Refunded',   bg: 'bg-slate-100',   color: 'text-slate-600' },
  sent:       { label: 'Sent',       bg: 'bg-emerald-50',  color: 'text-emerald-700' },
  scheduled:  { label: 'Scheduled',  bg: 'bg-blue-50',     color: 'text-blue-700' },
  draft:      { label: 'Draft',      bg: 'bg-slate-100',   color: 'text-slate-600' },
  approved:   { label: 'Approved',   bg: 'bg-emerald-50',  color: 'text-emerald-700' },
  mismatch:   { label: 'Mismatch',   bg: 'bg-amber-50',    color: 'text-amber-700' },
  not_found:  { label: 'Not Found',  bg: 'bg-red-50',      color: 'text-red-700' },
  free:       { label: 'Free',       bg: 'bg-slate-100',   color: 'text-slate-600' },
}

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] || { label: status, bg: 'bg-slate-100', color: 'text-slate-600' }

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold',
      config.bg,
      config.color,
      className
    )}>
      {config.label}
    </span>
  )
}
