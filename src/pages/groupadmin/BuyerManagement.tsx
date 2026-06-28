import * as React from 'react'
import { DataTable, type Column } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { useToast } from '@/components/Toast'
import { mockBuyers } from '@/lib/mockData'
import { ADMIN_NOTIFICATIONS, generateWhatsAppUrl } from '@/lib/notifications'
import type { BuyerData } from '@/lib/roles'
import { Plus, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function BuyerManagement() {
  const { showToast } = useToast()
  const [inviteOpen, setInviteOpen] = React.useState(false)
  const [inviteMobile, setInviteMobile] = React.useState('')

  const groupBuyers = mockBuyers.filter(b => b.groupId === 'grp_it_ahm_001' || b.groupId === 'grp_pharma_vad_003')

  const handleInvite = () => {
    const msg = `Vahiવટ platform par verified vendors shahero jaodo! 🏪\n\nJoin: vahiવટ.in/register?role=buyer`
    window.open(generateWhatsAppUrl(inviteMobile, msg), '_blank')
    showToast(ADMIN_NOTIFICATIONS.BUYER_INVITED(inviteMobile))
    setInviteOpen(false)
    setInviteMobile('')
  }

  const columns: Column<BuyerData & Record<string, unknown>>[] = [
    {
      key: 'name', label: 'Name', priority: true, sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-ink">{row.name as string}</p>
          <p className="text-xs text-slate-500">{row.company as string}</p>
        </div>
      ),
    },
    { key: 'email', label: 'Email', priority: false },
    { key: 'phone', label: 'Phone', render: (v) => <span>+91 {v as string}</span> },
    { key: 'dealsMade', label: 'Deals', sortable: true },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v as string} /> },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-fraunces font-bold text-ink">Buyers</h1>
          <p className="text-sm text-slate-500 mt-1">{groupBuyers.length} buyers in your group</p>
        </div>
        <Button onClick={() => setInviteOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Invite Buyer
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={groupBuyers as (BuyerData & Record<string, unknown>)[]}
        emptyMessage="No buyers yet"
        emptyIcon="🛒"
        searchPlaceholder="Search buyers..."
      />

      {inviteOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setInviteOpen(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-fraunces font-bold text-ink mb-4">Invite Buyer</h3>
            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Mobile Number *</label>
              <div className="flex">
                <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-sm text-slate-500">+91</span>
                <input value={inviteMobile} onChange={e => setInviteMobile(e.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="9876543210" className="w-full px-3 py-2.5 rounded-r-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-5">
              <Button variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
              <Button onClick={handleInvite} disabled={inviteMobile.length !== 10} className="bg-terracotta hover:bg-terracotta/90 gap-2">
                <Send className="w-4 h-4" /> Send Invite
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
