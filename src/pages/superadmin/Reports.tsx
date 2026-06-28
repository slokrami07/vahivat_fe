import { AdminEmptyState } from '@/components/admin/AdminEmptyState'
import { BarChart3 } from 'lucide-react'

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Platform analytics and downloadable reports</p>
      </div>

      <AdminEmptyState
        icon={BarChart3}
        headline="Reports coming soon"
        subtext="Advanced reporting with exportable data, custom date ranges, and automated scheduled reports will be available in the next update."
      />
    </div>
  )
}
