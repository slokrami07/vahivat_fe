import * as React from 'react'
import { KPICard } from '@/components/admin/KPICard'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { DataTable, type Column } from '@/components/admin/DataTable'
import { formatIndianCurrency, formatIndianDate } from '@/lib/commission'
import { mockGroups, mockTransactions, mockDailyRevenue, mockRevenueByGroup, mockRevenueByPlan } from '@/lib/mockData'
import { IndianRupee, TrendingUp, Users, Percent } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

type DateRange = '7d' | '30d' | '3m' | 'custom'

export function RevenueDashboard() {
  const [dateRange, setDateRange] = React.useState<DateRange>('30d')

  const totalRevenue = mockTransactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.amount, 0)
  const totalCommission = mockTransactions.filter(t => t.status === 'paid').reduce((s, t) => s + t.commission, 0)
  const netRevenue = totalRevenue - totalCommission
  const avgPerVendor = Math.round(totalRevenue / mockGroups.reduce((s, g) => s + g.vendorCount, 0))

  const txnColumns: Column<Record<string, unknown>>[] = [
    { key: 'vendorName', label: 'Vendor', priority: true, sortable: true },
    { key: 'groupName', label: 'Group', render: (v) => <span className="text-xs bg-cream px-2 py-0.5 rounded-full font-medium">{v as string}</span> },
    { key: 'plan', label: 'Plan', render: (v) => <span className="font-medium">{v as string}</span> },
    { key: 'amount', label: 'Amount', sortable: true, render: (v) => formatIndianCurrency(v as number) },
    { key: 'date', label: 'Date', priority: false, render: (v) => formatIndianDate(v as string) },
    { key: 'status', label: 'Status', render: (v) => <StatusBadge status={v as string} /> },
    { key: 'commission', label: 'Commission', priority: false, render: (v) => formatIndianCurrency(v as number) },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-fraunces font-bold text-ink">Revenue</h1>
          <p className="text-sm text-slate-500 mt-1">Subscription revenue and commission tracking</p>
        </div>
        <div className="flex gap-1 bg-cream p-1 rounded-lg border border-slate-100 shadow-sm">
          {([['7d', '7 Days'], ['30d', '30 Days'], ['3m', '3 Months']] as [DateRange, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setDateRange(key)}
              className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors min-h-0 ${
                dateRange === key ? 'bg-white text-ink shadow-sm' : 'text-slate-500 hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Revenue" value={formatIndianCurrency(totalRevenue)} trend="positive" trendText="↑ 22% vs last period" icon={IndianRupee} />
        <KPICard title="Commission Paid" value={formatIndianCurrency(totalCommission)} subtitle="To Group Admins" icon={Percent} />
        <KPICard title="Net Revenue" value={formatIndianCurrency(netRevenue)} trend="positive" trendText="After commissions" icon={TrendingUp} />
        <KPICard title="Avg per Vendor" value={formatIndianCurrency(avgPerVendor)} subtitle="Monthly" icon={Users} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily revenue line chart */}
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Daily Revenue</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={mockDailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: any) => [formatIndianCurrency(Number(v)), 'Revenue']} />
              <Line type="monotone" dataKey="revenue" stroke="#C75D3A" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by group bar chart */}
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Revenue by Group</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={mockRevenueByGroup} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <YAxis type="category" dataKey="group" tick={{ fontSize: 11 }} stroke="#94a3b8" width={120} />
              <Tooltip formatter={(v: any) => [formatIndianCurrency(Number(v)), 'Revenue']} />
              <Bar dataKey="revenue" fill="#C75D3A" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription tier donut */}
        <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Revenue by Plan</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={mockRevenueByPlan.filter(p => p.value > 0)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                nameKey="plan"
              >
                {mockRevenueByPlan.filter(p => p.value > 0).map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(v: any) => [formatIndianCurrency(Number(v)), 'Revenue']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions table */}
      <div>
        <h2 className="text-lg font-fraunces font-semibold text-ink mb-3">Transactions</h2>
        <DataTable
          columns={txnColumns}
          data={mockTransactions as Record<string, unknown>[]}
          searchPlaceholder="Search transactions..."
        />
      </div>
    </div>
  )
}
