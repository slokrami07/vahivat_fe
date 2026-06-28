import * as React from 'react'
import { KPICard } from '@/components/admin/KPICard'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { useToast } from '@/components/Toast'
import { formatIndianCurrency } from '@/lib/commission'
import { mockPayouts } from '@/lib/mockData'
import { ADMIN_NOTIFICATIONS } from '@/lib/notifications'
import { Banknote, Clock, CheckCircle, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PayoutsManager() {
  const { showToast } = useToast()
  const [payouts, setPayouts] = React.useState(mockPayouts)
  const [markingPaid, setMarkingPaid] = React.useState<typeof mockPayouts[0] | null>(null)

  const pendingTotal = payouts.filter(p => p.status === 'pending').reduce((s, p) => s + p.amount, 0)
  const paidThisMonth = payouts.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0)
  const pendingCount = payouts.filter(p => p.status === 'pending' || p.status === 'processing').length

  const handleMarkPaid = (refNumber?: string) => {
    if (!markingPaid) return
    setPayouts(prev => prev.map(p =>
      p.id === markingPaid.id ? { ...p, status: 'paid' as const, referenceNumber: refNumber, paidDate: new Date().toISOString().split('T')[0] } : p
    ))
    showToast(ADMIN_NOTIFICATIONS.PAYOUT_MARKED(markingPaid.adminName, markingPaid.amount))
    setMarkingPaid(null)
  }

  const handleExportCSV = () => {
    const headers = 'Admin,Group,Amount,Cycle,Method,Status,Reference\n'
    const rows = payouts.map(p =>
      `${p.adminName},${p.groupName},${p.amount},${p.cycle},${p.method},${p.status},${p.referenceNumber || ''}`
    ).join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'payouts_export.csv'
    a.click()
    URL.revokeObjectURL(url)
    showToast('CSV exported successfully')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-fraunces font-bold text-ink">Partner Payouts</h1>
          <p className="text-sm text-slate-500 mt-1">Commission payouts to Group Admins</p>
        </div>
        <Button variant="outline" onClick={handleExportCSV} className="gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard title="Total Pending" value={formatIndianCurrency(pendingTotal)} icon={Clock} iconColor="text-amber-600" />
        <KPICard title="Paid This Month" value={formatIndianCurrency(paidThisMonth)} icon={CheckCircle} iconColor="text-emerald-600" />
        <KPICard title="Partners Awaiting" value={pendingCount.toString()} subtitle="Need payout processing" icon={Banknote} />
      </div>

      {/* Payout table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Admin</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Rate</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Cycle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Method</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payouts.map(payout => (
                <tr key={payout.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-ink">{payout.adminName}</p>
                    <p className="text-xs text-slate-500">{payout.groupName}</p>
                  </td>
                  <td className="px-4 py-3.5 text-sm">
                    {mockPayouts.find(p => p.adminId === payout.adminId) ? '22%' : '-'}
                  </td>
                  <td className="px-4 py-3.5 text-sm text-charcoal">{payout.cycle}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-ink">{formatIndianCurrency(payout.amount)}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs bg-cream px-2 py-0.5 rounded-full font-semibold uppercase">
                      {payout.method}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5">{payout.upiId || payout.bankAccount}</p>
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge status={payout.status} /></td>
                  <td className="px-4 py-3.5">
                    {payout.status === 'pending' || payout.status === 'processing' ? (
                      <button
                        onClick={() => setMarkingPaid(payout)}
                        className="px-3 py-1.5 bg-terracotta/10 text-terracotta rounded-lg text-xs font-semibold hover:bg-terracotta/20 transition-colors min-h-0"
                      >
                        Mark as Paid
                      </button>
                    ) : payout.referenceNumber ? (
                      <span className="text-xs text-slate-400 font-mono">{payout.referenceNumber}</span>
                    ) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        open={!!markingPaid}
        title="Confirm Payout"
        message={`Mark payout of ${markingPaid ? formatIndianCurrency(markingPaid.amount) : ''} to ${markingPaid?.adminName} as paid?`}
        confirmLabel="Mark as Paid"
        onConfirm={handleMarkPaid}
        onCancel={() => setMarkingPaid(null)}
        inputLabel="Transaction Reference Number"
        inputPlaceholder="e.g. TXN20240701001"
        inputRequired
      />
    </div>
  )
}
