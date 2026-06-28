import * as React from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, AreaChart, Area, Cell
} from 'recharts'
import { KPICard } from '@/components/admin/KPICard'
import { formatIndianCurrency, formatIndianNumber } from '@/lib/commission'
import {
  BarChart3, FileText, CheckCircle2, TrendingUp,
  AlertCircle, Award
} from 'lucide-react'

// Local mock data for detailed Group Analytics
const mockMonthlyActivity = [
  { month: 'Jan 24', rfqs: 45, bids: 120, deals: 28, value: 850000 },
  { month: 'Feb 24', rfqs: 52, bids: 145, deals: 32, value: 980000 },
  { month: 'Mar 24', rfqs: 60, bids: 178, deals: 38, value: 1250000 },
  { month: 'Apr 24', rfqs: 58, bids: 165, deals: 36, value: 1100000 },
  { month: 'May 24', rfqs: 72, bids: 210, deals: 46, value: 1540000 },
  { month: 'Jun 24', rfqs: 88, bids: 260, deals: 58, value: 1950000 },
]

const mockTopVendors = [
  { name: 'TechSolutions', deals: 18, value: 580000, conversion: 88 },
  { name: 'CloudFirst', deals: 15, value: 620000, conversion: 92 },
  { name: 'NetSecure', deals: 12, value: 380000, conversion: 85 },
  { name: 'SilkRoute', deals: 10, value: 240000, conversion: 78 },
  { name: 'Diamond Fabrics', deals: 8, value: 280000, conversion: 80 },
]

const mockCategoryTrends = [
  { category: 'IT Services', rfqs: 120, pct: 42 },
  { category: 'Software Dev', rfqs: 85, pct: 30 },
  { category: 'Infrastructure', rfqs: 40, pct: 14 },
  { category: 'Cloud Solutions', rfqs: 25, pct: 9 },
  { category: 'Security Services', rfqs: 15, pct: 5 },
]

const mockFunnelData = [
  { stage: 'RFQs Published', count: 88, conversion: '100%' },
  { stage: 'Bids Received', count: 76, conversion: '86.3%' },
  { stage: 'Deals Finalized', count: 58, conversion: '76.3%' },
  { stage: 'Deals Closed & Paid', count: 52, conversion: '89.6%' },
]

export function GroupAnalytics() {
  const [timeRange, setTimeRange] = React.useState('6m')

  // Calculate totals
  const totalRFQs = mockMonthlyActivity.reduce((sum, item) => sum + item.rfqs, 0)
  const totalBids = mockMonthlyActivity.reduce((sum, item) => sum + item.bids, 0)
  const totalDeals = mockMonthlyActivity.reduce((sum, item) => sum + item.deals, 0)
  const totalVolume = mockMonthlyActivity.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-fraunces font-bold text-ink">Group Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Detailed performance metrics, deal flow, and marketplace insights</p>
        </div>
        <div className="flex gap-2">
          {['1m', '3m', '6m'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors min-h-0 ${
                timeRange === range
                  ? 'bg-terracotta text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {range === '1m' ? '1 Month' : range === '3m' ? '3 Months' : '6 Months'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total RFQs"
          value={formatIndianNumber(totalRFQs)}
          subtitle="+18% vs last period"
          icon={FileText}
          iconColor="text-terracotta"
          trend="positive"
        />
        <KPICard
          title="Total Bids"
          value={formatIndianNumber(totalBids)}
          subtitle="2.95 average bids per RFQ"
          icon={BarChart3}
          iconColor="text-violet-600"
          trend="positive"
        />
        <KPICard
          title="Deals Finalized"
          value={formatIndianNumber(totalDeals)}
          subtitle="65.9% conversion rate"
          icon={CheckCircle2}
          iconColor="text-emerald-600"
          trend="positive"
        />
        <KPICard
          title="Gross Deal Volume"
          value={formatIndianCurrency(totalVolume)}
          subtitle="Average deal: ₹29,820"
          icon={TrendingUp}
          iconColor="text-terracotta"
          trend="positive"
        />
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Flow and Volume Chart */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-fraunces font-semibold text-ink">Deal Flow & Volume</h3>
              <p className="text-xs text-slate-400">Monthly RFQ volume and closed deal value</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-terracotta rounded-full"></span>RFQs</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-rose-500 rounded-full"></span>Deals</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockMonthlyActivity} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRfqs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C75D3A" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#C75D3A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDeals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value, name) => [
                    name === 'value' ? formatIndianCurrency(value as number) : formatIndianNumber(value as number),
                    name === 'rfqs' ? 'RFQs' : name === 'deals' ? 'Deals Closed' : 'Deal Volume (₹)'
                  ]}
                />
                <Area type="monotone" dataKey="rfqs" stroke="#C75D3A" strokeWidth={2} fillOpacity={1} fill="url(#colorRfqs)" name="rfqs" />
                <Area type="monotone" dataKey="deals" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorDeals)" name="deals" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Performing Vendors */}
        <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-fraunces font-semibold text-ink">Top Performing Vendors</h3>
              <p className="text-xs text-slate-400">Ranked by closed deal volume (₹)</p>
            </div>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTopVendors} layout="vertical" margin={{ top: 10, right: 10, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `₹${val/1000}k`} tickLine={false} />
                <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} width={100} />
                <Tooltip
                  contentStyle={{ background: '#fff', border: '1px solid #f1f5f9', borderRadius: '8px' }}
                  formatter={(value) => [formatIndianCurrency(value as number), 'Deal Volume']}
                />
                <Bar dataKey="value" fill="#C75D3A" radius={[0, 4, 4, 0]} barSize={16}>
                  {mockTopVendors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#1B2A4A' : '#C75D3A'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Two columns - Funnel + Category Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left (3/5) - Funnel & Conversion */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
          <h3 className="font-fraunces font-semibold text-ink mb-1">RFQ Conversion Funnel</h3>
          <p className="text-xs text-slate-400 mb-6">Efficiency of the RFQ pipeline from publication to paid deal</p>

          <div className="space-y-4">
            {mockFunnelData.map((item, index) => (
              <div key={item.stage} className="relative">
                <div className="flex justify-between items-center text-sm font-medium text-ink mb-1 relative z-10">
                  <span>{item.stage}</span>
                  <span className="text-slate-500">{item.count} items <span className="text-xs text-terracotta font-semibold">({item.conversion})</span></span>
                </div>
                <div className="w-full h-8 bg-slate-50 rounded-lg overflow-hidden border border-slate-100 relative">
                  <div
                    className="h-full bg-terracotta/10 border-r-2 border-terracotta transition-all"
                    style={{ width: `${100 - index * 12}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (2/5) - Category Demand */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-fraunces font-semibold text-ink mb-1">Category Demand</h3>
            <p className="text-xs text-slate-400 mb-4">RFQ counts by service category</p>

            <div className="space-y-3.5 mt-2">
              {mockCategoryTrends.map((cat) => (
                <div key={cat.category} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-ink">
                    <span>{cat.category}</span>
                    <span className="text-slate-500">{cat.rfqs} RFQs ({cat.pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-terracotta rounded-full"
                      style={{ width: `${cat.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Alerts / Recommendations */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mt-6">
            <div className="flex gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-800">SLA Nudge Recommendation</p>
                <p className="text-[11px] text-amber-700 mt-1 leading-relaxed">
                  Average response times for <strong>Hardware Purchase</strong> are trending upwards (3.1 hours).
                  We recommend nudging the 2 slowest responding vendors in this category.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
