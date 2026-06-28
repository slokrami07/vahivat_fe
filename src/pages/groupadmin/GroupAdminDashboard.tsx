import { useNavigate } from 'react-router-dom'
import { KPICard } from '@/components/admin/KPICard'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { usePerspective } from '@/context/PerspectiveContext'
import { formatIndianCurrency } from '@/lib/commission'
import { mockVendors, mockDisputes } from '@/lib/mockData'
import { Users, FileText, Handshake, Clock, AlertTriangle, Send } from 'lucide-react'
import { useToast } from '@/components/Toast'
import { ADMIN_NOTIFICATIONS } from '@/lib/notifications'

export function GroupAdminDashboard() {
  const navigate = useNavigate()
  const { user } = usePerspective()
  const { showToast } = useToast()
  const commissionRate = user?.commissionRate || 22

  const groupVendors = mockVendors.filter(v => v.groupId === 'grp_it_ahm_001')
  const activeVendors = groupVendors.filter(v => v.status === 'active')
  const inactiveVendors = groupVendors.filter(v => v.lastActive < '2024-06-18')
  const openDisputes = mockDisputes.filter(d => d.status === 'open')

  return (
    <div className="space-y-6">
      {/* Hero earnings banner */}
      <div className="bg-gradient-to-r from-terracotta via-marigold to-terracotta/90 rounded-xl p-6 text-white shadow-md">
        <p className="text-cream/90 text-sm font-medium uppercase tracking-wider">Your earnings this month</p>
        <div className="flex items-baseline gap-3 mt-1">
          <span className="text-3xl font-fraunces font-bold">{formatIndianCurrency(8250)}</span>
          <span className="text-cream/80 text-sm">{commissionRate}% commission on {formatIndianCurrency(37500)} in subscriptions</span>
        </div>
        <p className="text-cream/70 text-sm mt-2">
          {formatIndianCurrency(user?.pendingPayout || 3200)} pending payout · Next payout: July 1
        </p>
        <button
          onClick={() => navigate('/admin/earnings')}
          className="mt-3 text-sm font-medium text-white hover:text-cream/90 transition-colors inline-flex items-center gap-1 min-h-0"
        >
          View details →
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Vendors"
          value={`${activeVendors.length} active`}
          subtitle={`${groupVendors.length - activeVendors.length} inactive`}
          icon={Users}
          onClick={() => navigate('/admin/vendors')}
        />
        <KPICard title="Open RFQs Today" value="8" trend="positive" trendText="↑ 3 from yesterday" icon={FileText} />
        <KPICard title="Deals Closed" value="17" subtitle="This month" trend="positive" trendText="↑ 38% conversion" icon={Handshake} />
        <KPICard title="Avg Response Time" value="1.8 hrs" trend="positive" trendText="↓ from 2.4 hrs" icon={Clock} />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left (60%) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Vendors needing attention */}
          <div>
            <h2 className="text-lg font-fraunces font-semibold text-ink mb-3">Vendors Needing Attention</h2>
            <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 shadow-sm">
              {inactiveVendors.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">All vendors are active! 🎉</div>
              ) : (
                inactiveVendors.slice(0, 5).map(v => (
                  <div key={v.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-ink">{v.businessName}</p>
                      <p className="text-xs text-slate-500">Last active: {v.lastActive} · {v.status === 'pending' ? 'Unverified' : 'No activity'}</p>
                    </div>
                    <button
                      onClick={() => {
                        showToast(ADMIN_NOTIFICATIONS.VENDOR_NUDGED(v.businessName))
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-100 transition-colors min-h-0"
                    >
                      <Send className="w-3 h-3" /> Nudge
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent disputes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-fraunces font-semibold text-ink">Recent Disputes</h2>
              <button onClick={() => navigate('/admin/disputes')} className="text-xs text-terracotta font-medium hover:underline min-h-0">View all →</button>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 shadow-sm">
              {openDisputes.length === 0 ? (
                <div className="p-6 text-center text-sm text-slate-500">No open disputes 🎉</div>
              ) : (
                openDisputes.slice(0, 3).map(d => (
                  <div key={d.id} className="flex items-center justify-between p-4">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-ink">#{d.id} — {d.reason.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-slate-500">{d.filerName} vs {d.againstName}</p>
                      </div>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance */}
          <div>
            <h2 className="text-lg font-fraunces font-semibold text-ink mb-3">Performance vs Last Month</h2>
            <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm space-y-3">
              {[
                { label: 'Vendors', value: '+3', trend: 'positive' as const },
                { label: 'Deals', value: '+5', trend: 'positive' as const },
                { label: 'Response Time', value: '-0.6 hrs', trend: 'positive' as const },
                { label: 'Buyer Satisfaction', value: '+2%', trend: 'positive' as const },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{item.label}</span>
                  <span className={`text-sm font-semibold ${item.trend === 'positive' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Unanswered RFQs */}
          <div>
            <h2 className="text-lg font-fraunces font-semibold text-ink mb-3">Unanswered RFQs {'>'}48hrs</h2>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
              {[
                { rfq: 'Networking equipment for 3 offices', buyer: 'Rajesh Industries', age: '52 hrs' },
                { rfq: 'Cloud backup solution — 5TB', buyer: 'TechPark GN', age: '49 hrs' },
              ].map((item, i) => (
                <div key={i} className="p-4 border-b border-slate-100 last:border-0">
                  <p className="text-sm font-medium text-ink">{item.rfq}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-500">{item.buyer}</span>
                    <span className="text-xs text-red-500 font-medium">{item.age}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
