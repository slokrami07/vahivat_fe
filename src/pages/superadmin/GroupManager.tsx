import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { DataTable, type Column } from '@/components/admin/DataTable'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { formatIndianCurrency } from '@/lib/commission'
import { mockGroups } from '@/lib/mockData'
import type { GroupData } from '@/lib/roles'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function GroupManager() {
  const navigate = useNavigate()
  const [industryFilter, setIndustryFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('all')

  const industries = [...new Set(mockGroups.map(g => g.industry))]

  const filtered = mockGroups.filter(g => {
    if (industryFilter !== 'all' && g.industry !== industryFilter) return false
    if (statusFilter !== 'all' && g.status !== statusFilter) return false
    return true
  })

  const columns: Column<GroupData & Record<string, unknown>>[] = [
    {
      key: 'name', label: 'Group', priority: true, sortable: true,
      render: (_, row) => (
        <div>
          <p className="font-medium text-ink">{row.name as string}</p>
          <p className="text-xs text-slate-500">{row.city as string}</p>
        </div>
      ),
    },
    {
      key: 'industry', label: 'Industry', priority: true,
      render: (v) => (
        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
          {v as string}
        </span>
      ),
    },
    {
      key: 'adminName', label: 'Group Admin', priority: false,
      render: (_, row) => <span>{(row as unknown as GroupData).admin.name}</span>,
    },
    {
      key: 'vendorCount', label: 'Vendors', sortable: true,
      render: (_, row) => (
        <span>{row.vendorCount as number} / {row.buyerCount as number} buyers</span>
      ),
    },
    {
      key: 'commissionRate', label: 'Commission', sortable: true,
      render: (v) => <span className="font-medium">{v as number}%</span>,
    },
    {
      key: 'monthlyRevenue', label: 'Monthly Revenue', sortable: true, priority: false,
      render: (v) => <span className="font-medium">{formatIndianCurrency(v as number)}</span>,
    },
    {
      key: 'status', label: 'Status',
      render: (v) => <StatusBadge status={v as string} />,
    },
  ]

  // We need to cast to the generic Record type for DataTable
  const tableData = filtered.map(g => ({
    ...g,
    adminName: g.admin.name,
  })) as (GroupData & Record<string, unknown>)[]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-fraunces font-bold text-ink">Industry Groups</h1>
          <p className="text-sm text-slate-500 mt-1">{mockGroups.length} groups · {mockGroups.reduce((s, g) => s + g.vendorCount, 0)} total vendors</p>
        </div>
        <Button onClick={() => navigate('/superadmin/groups/new')} className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Group
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <select
          value={industryFilter}
          onChange={e => setIndustryFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white min-h-[40px]"
        >
          <option value="all">All Industries</option>
          {industries.map(ind => (
            <option key={ind} value={ind}>{ind}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white min-h-[40px]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending Setup</option>
        </select>
      </div>

      <DataTable
        columns={columns}
        data={tableData}
        onRowClick={(row) => navigate(`/superadmin/groups/${row.id}`)}
        emptyMessage="No groups found"
        emptyIcon="🏢"
        searchPlaceholder="Search groups..."
      />
    </div>
  )
}
