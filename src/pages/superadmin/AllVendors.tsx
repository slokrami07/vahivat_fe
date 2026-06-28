import { DataTable, type Column } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { formatIndianDate } from '@/lib/commission'
import { mockVendors } from '@/lib/mockData'
import type { VendorData } from '@/lib/roles'

export function AllVendors() {
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
    {
      key: 'groupName', label: 'Group', priority: true,
      render: (v) => <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full font-medium">{v as string}</span>,
    },
    { key: 'gstin', label: 'GSTIN', priority: false, render: (v) => <span className="font-mono text-xs">{v as string}</span> },
    { key: 'plan', label: 'Plan', render: (v) => <span className="capitalize font-medium">{v as string}</span> },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v as string} /> },
    { key: 'dealsCompleted', label: 'Deals', sortable: true },
    { key: 'lastActive', label: 'Last Active', priority: false, render: (v) => formatIndianDate(v as string) },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">All Vendors</h1>
        <p className="text-sm text-slate-500 mt-1">{mockVendors.length} vendors across all groups</p>
      </div>

      <DataTable
        columns={columns}
        data={mockVendors as (VendorData & Record<string, unknown>)[]}
        emptyMessage="No vendors found"
        emptyIcon="👥"
        searchPlaceholder="Search vendors by name, GSTIN..."
      />
    </div>
  )
}
