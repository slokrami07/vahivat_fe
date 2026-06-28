import { useParams, useNavigate } from 'react-router-dom'
import { KPICard } from '@/components/admin/KPICard'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { DataTable, type Column } from '@/components/admin/DataTable'
import { formatIndianCurrency, formatIndianDate } from '@/lib/commission'
import { mockGroups, mockVendors } from '@/lib/mockData'
import { ArrowLeft, Users, IndianRupee, Percent, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { VendorData } from '@/lib/roles'

export function GroupDetail() {
  const { groupId } = useParams()
  const navigate = useNavigate()

  const group = mockGroups.find(g => g.id === groupId)
  if (!group) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Group not found</p>
        <Button variant="outline" onClick={() => navigate('/superadmin/groups')} className="mt-4">Back to Groups</Button>
      </div>
    )
  }

  const groupVendors = mockVendors.filter(v => v.groupId === groupId)

  const vendorColumns: Column<VendorData & Record<string, unknown>>[] = [
    {
      key: 'businessName', label: 'Business', priority: true, sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-ink">{row.businessName as string}</p>
          <p className="text-xs text-slate-500">{row.ownerName as string}</p>
        </div>
      ),
    },
    { key: 'plan', label: 'Plan', render: (v) => <span className="capitalize font-medium">{v as string}</span> },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v as string} /> },
    { key: 'dealsCompleted', label: 'Deals', sortable: true },
    { key: 'lastActive', label: 'Last Active', priority: false, render: (v) => formatIndianDate(v as string) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/superadmin/groups')} className="p-2 rounded-lg hover:bg-slate-100 min-h-0">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-fraunces font-bold text-ink">{group.name}</h1>
            <StatusBadge status={group.status} />
          </div>
          <p className="text-sm text-slate-500">{group.industry} · {group.city}</p>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Vendors" value={group.vendorCount.toString()} subtitle={`${group.buyerCount} buyers`} icon={Users} />
        <KPICard title="Monthly Revenue" value={formatIndianCurrency(group.monthlyRevenue)} icon={IndianRupee} />
        <KPICard title="Commission Rate" value={`${group.commissionRate}%`} icon={Percent} />
        <KPICard title="Deals This Month" value="34" icon={ShoppingBag} trend="positive" trendText="↑ 12% vs last" />
      </div>

      {/* Admin info */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Group Admin</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div><p className="text-xs text-slate-400">Name</p><p className="text-sm font-medium text-ink">{group.admin.name}</p></div>
          <div><p className="text-xs text-slate-400">Mobile</p><p className="text-sm text-ink">+91 {group.admin.mobile}</p></div>
          <div><p className="text-xs text-slate-400">Payout</p><p className="text-sm text-ink">{group.admin.payoutMethod === 'upi' ? `UPI: ${group.admin.upiId}` : 'Bank Transfer'}</p></div>
          <div><p className="text-xs text-slate-400">Pending Payout</p><p className="text-sm font-medium text-emerald-600">{formatIndianCurrency(group.admin.pendingPayout)}</p></div>
        </div>
      </div>

      {/* Vendors table */}
      <div>
        <h2 className="text-lg font-fraunces font-semibold text-ink mb-3">Vendors in this Group</h2>
        <DataTable
          columns={vendorColumns}
          data={groupVendors as (VendorData & Record<string, unknown>)[]}
          emptyMessage="No vendors in this group yet"
          emptyIcon="👥"
          searchPlaceholder="Search vendors..."
        />
      </div>
    </div>
  )
}
