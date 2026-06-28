import * as React from 'react'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { AdminEmptyState } from '@/components/admin/AdminEmptyState'
import { useToast } from '@/components/Toast'
import { formatIndianDate } from '@/lib/commission'
import { mockVerificationQueue } from '@/lib/mockData'
import { ADMIN_NOTIFICATIONS } from '@/lib/notifications'
import type { VerificationItem } from '@/lib/roles'
import { Check, X, RotateCcw, FileText } from 'lucide-react'

type TabKey = 'all' | 'pending' | 'approved' | 'rejected'

export function VerificationQueue() {
  const { showToast } = useToast()
  const [queue, setQueue] = React.useState(mockVerificationQueue)
  const [activeTab, setActiveTab] = React.useState<TabKey>('pending')
  const [modal, setModal] = React.useState<{ type: 'approve' | 'reject' | 'resubmit'; item: VerificationItem } | null>(null)

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: queue.length },
    { key: 'pending', label: 'Pending', count: queue.filter(q => q.status === 'pending').length },
    { key: 'approved', label: 'Approved', count: queue.filter(q => q.status === 'approved').length },
    { key: 'rejected', label: 'Rejected', count: queue.filter(q => q.status === 'rejected').length },
  ]

  const filtered = activeTab === 'all' ? queue : queue.filter(q => q.status === activeTab)

  const handleApprove = () => {
    if (!modal || modal.type !== 'approve') return
    setQueue(prev => prev.map(q => q.id === modal.item.id ? { ...q, status: 'approved' as const } : q))
    showToast(ADMIN_NOTIFICATIONS.VENDOR_APPROVED(modal.item.businessName))
    setModal(null)
  }

  const handleReject = (reason?: string) => {
    if (!modal || modal.type !== 'reject') return
    setQueue(prev => prev.map(q => q.id === modal.item.id ? { ...q, status: 'rejected' as const, rejectionReason: reason } : q))
    showToast(ADMIN_NOTIFICATIONS.VENDOR_REJECTED(modal.item.businessName))
    setModal(null)
  }

  const handleResubmit = (notes?: string) => {
    if (!modal || modal.type !== 'resubmit') return
    showToast(ADMIN_NOTIFICATIONS.VENDOR_RESUBMISSION(modal.item.businessName))
    if (notes) { /* would send notes to vendor */ }
    setModal(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">Verification Queue</h1>
        <p className="text-sm text-slate-500 mt-1">{queue.filter(q => q.status === 'pending').length} pending verifications</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-cream p-1 rounded-lg w-fit border border-slate-100 shadow-sm">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors min-h-0 ${
              activeTab === tab.key ? 'bg-white text-ink shadow-sm' : 'text-slate-500 hover:text-ink'
            }`}
          >
            {tab.label} <span className="ml-1 text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Queue */}
      {filtered.length === 0 ? (
        <AdminEmptyState
          headline="No verifications here"
          subtext="All caught up! No verification requests in this category."
          icon={Check}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-ink">{item.businessName}</h3>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-500">
                    <span>GSTIN: <span className="font-mono text-xs">{item.gstin}</span></span>
                    <span>GST API: <StatusBadge status={item.gstApiStatus} /></span>
                    <span>Group: {item.groupName}</span>
                    <span>Submitted: {formatIndianDate(item.submittedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-xs text-slate-500">{item.documents.join(', ')}</span>
                  </div>
                  {item.rejectionReason && (
                    <p className="text-xs text-terracotta mt-2 bg-terracotta/10 border border-terracotta/20 px-3 py-1.5 rounded-lg inline-block">
                      Rejection: {item.rejectionReason}
                    </p>
                  )}
                </div>

                {item.status === 'pending' && (
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setModal({ type: 'approve', item })}
                      className="flex items-center gap-1.5 px-3 py-2 bg-terracotta/10 text-terracotta rounded-lg text-sm font-semibold hover:bg-terracotta/20 transition-colors min-h-[40px]"
                    >
                      <Check className="w-4 h-4" /> Approve
                    </button>
                    <button
                      onClick={() => setModal({ type: 'reject', item })}
                      className="flex items-center gap-1.5 px-3 py-2 bg-ink text-white rounded-lg text-sm font-semibold hover:bg-ink/90 transition-colors min-h-[40px]"
                    >
                      <X className="w-4 h-4" /> Reject
                    </button>
                    <button
                      onClick={() => setModal({ type: 'resubmit', item })}
                      className="flex items-center gap-1.5 px-3 py-2 bg-marigold/10 text-marigold rounded-lg text-sm font-semibold hover:bg-marigold/20 transition-colors min-h-[40px] border border-marigold/10"
                    >
                      <RotateCcw className="w-4 h-4" /> Resubmit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <ConfirmModal
        open={modal?.type === 'approve'}
        title="Approve Vendor"
        message={`Are you sure you want to approve ${modal?.item.businessName}? The vendor will be notified via WhatsApp.`}
        confirmLabel="Approve"
        confirmVariant="primary"
        onConfirm={handleApprove}
        onCancel={() => setModal(null)}
      />
      <ConfirmModal
        open={modal?.type === 'reject'}
        title="Reject Verification"
        message={`Rejecting ${modal?.item.businessName}. Please provide a reason (required).`}
        confirmLabel="Reject"
        confirmVariant="danger"
        onConfirm={handleReject}
        onCancel={() => setModal(null)}
        inputLabel="Rejection Reason"
        inputPlaceholder="e.g. GST certificate expired, name mismatch..."
        inputRequired
      />
      <ConfirmModal
        open={modal?.type === 'resubmit'}
        title="Request Resubmission"
        message={`Ask ${modal?.item.businessName} to resubmit documents.`}
        confirmLabel="Send Request"
        onConfirm={handleResubmit}
        onCancel={() => setModal(null)}
        inputLabel="Notes for vendor"
        inputPlaceholder="What needs to be corrected..."
      />
    </div>
  )
}
