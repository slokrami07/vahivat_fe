import * as React from 'react'
import { DataTable, type Column } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { useToast } from '@/components/Toast'
import { formatIndianDate } from '@/lib/commission'
import { mockVendors } from '@/lib/mockData'
import { ADMIN_NOTIFICATIONS, generateWhatsAppUrl } from '@/lib/notifications'
import type { VendorData } from '@/lib/roles'
import { Plus, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VendorManagement() {
  const { showToast } = useToast()
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [inviteMobile, setInviteMobile] = React.useState('')
  const [inviteName, setInviteName] = React.useState('')

  const groupVendors = mockVendors.filter(v => v.groupId === 'grp_it_ahm_001')
  const filtered = statusFilter === 'all' ? groupVendors : groupVendors.filter(v => v.status === statusFilter)

  const handleInvite = () => {
    const msg = `Vahiવટ platform par join thao, Ahmedabad IT group ma verified vendor bano! 🚀\n\nJoin here: vahiવટ.in/register?ref=grp_it_ahm_001`
    const url = generateWhatsAppUrl(inviteMobile, msg)
    window.open(url, '_blank')
    showToast(ADMIN_NOTIFICATIONS.VENDOR_INVITED(inviteMobile))
    setInviteOpen(false)
    setInviteMobile('')
    setInviteName('')
  }

  const columns: Column<VendorData & Record<string, unknown>>[] = [
    {
      key: 'businessName', label: 'Business', priority: true, sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-ink">{row.businessName as string}</p>
          <p className="text-xs text-slate-500">{row.ownerName as string}</p>
        </div>
      ),
    },
    { key: 'gstin', label: 'GSTIN', priority: false, render: (v) => <span className="font-mono text-xs">{v as string}</span> },
    { key: 'plan', label: 'Plan', render: (v) => <span className="capitalize font-medium">{v as string}</span> },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v as string} /> },
    { key: 'dealsCompleted', label: 'Deals', sortable: true },
    { key: 'lastActive', label: 'Last Active', priority: false, render: (v) => formatIndianDate(v as string) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-fraunces font-bold text-ink">Vendors</h1>
          <p className="text-sm text-slate-500 mt-1">{groupVendors.length} vendors in your group</p>
        </div>
        <Button onClick={() => setInviteOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Invite Vendor
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'active', 'verified', 'pending', 'suspended', 'trial'].map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors min-h-0 ${
              statusFilter === s
                ? 'bg-terracotta/10 border-terracotta/20 text-terracotta'
                : 'border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered as (VendorData & Record<string, unknown>)[]}
        emptyMessage="No vendors found"
        emptyIcon="👥"
        searchPlaceholder="Search vendors..."
      />

      {/* Invite modal */}
      {inviteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setInviteOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-fraunces font-bold text-ink mb-4">Invite Vendor</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Mobile Number *</label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-sm text-slate-500">+91</span>
                  <input
                    value={inviteMobile}
                    onChange={e => setInviteMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="w-full px-3 py-2.5 rounded-r-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Name (optional)</label>
                <input
                  value={inviteName}
                  onChange={e => setInviteName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
              <Button
                onClick={handleInvite}
                disabled={inviteMobile.length !== 10}
                className="bg-terracotta hover:bg-terracotta/90 gap-2"
              >
                <Send className="w-4 h-4" /> Send WhatsApp Invite
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
