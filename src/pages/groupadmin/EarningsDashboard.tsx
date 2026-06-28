import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { KPICard } from '@/components/admin/KPICard'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { usePerspective } from '@/context/PerspectiveContext'
import { formatIndianCurrency, PLANS, projectAdditionalEarnings } from '@/lib/commission'
import { mockVendors, mockPayouts, mockMonthlyEarnings } from '@/lib/mockData'
import { IndianRupee, Clock, Award, Percent, ArrowRight, UserPlus } from 'lucide-react'
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts'
import { Button } from '@/components/ui/button'

export function EarningsDashboard() {
  const navigate = useNavigate()
  const { user } = usePerspective()
  const commissionRate = user?.commissionRate || 22
  const [additionalVendors, setAdditionalVendors] = React.useState(10)

  const groupVendors = mockVendors.filter(v => v.groupId === 'grp_it_ahm_001')
  const activeVendors = groupVendors.filter(v => v.status === 'active')
  const myPayouts = mockPayouts.filter(p => p.adminId === 'adm_001')

  // Vendor breakdown with commission calc
  const vendorBreakdown = groupVendors.map(v => {
    const planPrice = PLANS[v.plan]?.price || 0
    const commission = (planPrice * commissionRate) / 100
    return { ...v, planPrice, commission: Math.round(commission * 100) / 100 }
  })

  const monthlyCommission = activeVendors.reduce((sum, v) => {
    const planPrice = PLANS[v.plan]?.price || 0
    return sum + (planPrice * commissionRate) / 100
  }, 0)

  const projected = projectAdditionalEarnings(activeVendors.length, additionalVendors, 'pro', commissionRate)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">My Earnings</h1>
        <p className="text-sm text-slate-500 mt-1">Your commission earnings and payout history</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="This Month"
          value={formatIndianCurrency(Math.round(monthlyCommission))}
          subtitle={`from ${activeVendors.length} vendors`}
          icon={IndianRupee}
          iconColor="text-emerald-600"
        />
        <KPICard
          title="Pending Payout"
          value={formatIndianCurrency(user?.pendingPayout || 3200)}
          subtitle="Payout: July 1"
          icon={Clock}
          iconColor="text-amber-600"
        />
        <KPICard
          title="Lifetime Earned"
          value={formatIndianCurrency(user?.totalEarned || 62400)}
          subtitle="Since Mar 2024"
          icon={Award}
          iconColor="text-violet-600"
        />
        <KPICard
          title="Commission Rate"
          value={`${commissionRate}%`}
          subtitle="of subscriptions"
          icon={Percent}
          iconColor="text-terracotta"
        />
      </div>

      {/* How commission works */}
      <div className="bg-gradient-to-br from-cream to-cream/30 rounded-xl border border-terracotta/20 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-3">
          💰 How your commission works
        </h3>
        <div className="space-y-2 text-sm text-charcoal">
          <p>When a vendor in your group pays their subscription:</p>
          <div className="bg-white/60 rounded-lg p-3 space-y-1">
            <p>Vendor pays <strong>{formatIndianCurrency(PLANS.pro.price)}/month</strong> (Pro plan)</p>
            <p>Your commission: <strong>{commissionRate}% = {formatIndianCurrency(Math.round(PLANS.pro.price * commissionRate / 100))}</strong></p>
            <p className="text-xs text-terracotta">Paid to you every month they remain subscribed</p>
          </div>
          <p className="font-semibold pt-1 text-ink">More vendors = more monthly income for you 📈</p>
        </div>
      </div>

      {/* Earnings chart */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Monthly Earnings (Last 12 Months)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={mockMonthlyEarnings}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <YAxis yAxisId="left" tick={{ fontSize: 11 }} stroke="#94a3b8" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} stroke="#94a3b8" />
            <Tooltip
              formatter={(value: any, name: any) => [
                name === 'earnings' ? formatIndianCurrency(Number(value)) : value,
                name === 'earnings' ? 'Earnings' : 'Active Vendors',
              ]}
            />
            <Bar yAxisId="left" dataKey="earnings" fill="#C75D3A" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="vendors" stroke="#C75D3A" strokeWidth={2} dot={{ r: 3 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Vendor breakdown table */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Vendor Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Vendor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Plan</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Plan Price</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Your Commission/mo</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendorBreakdown.map(v => (
                <tr key={v.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-ink">{v.businessName}</p>
                    <p className="text-xs text-slate-500">{v.ownerName}</p>
                  </td>
                  <td className="px-4 py-3.5 text-sm capitalize font-medium">{v.plan}</td>
                  <td className="px-4 py-3.5 text-sm">{formatIndianCurrency(v.planPrice)}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold text-emerald-600">
                    {v.status === 'active' ? formatIndianCurrency(v.commission) : '-'}
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge status={v.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payout history */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Payout History</h3>
          <button className="text-xs text-terracotta font-medium hover:underline min-h-0">Download Statement</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Cycle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Method</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Reference</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myPayouts.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3.5 text-sm">{p.cycle}</td>
                  <td className="px-4 py-3.5 text-sm font-semibold">{formatIndianCurrency(p.amount)}</td>
                  <td className="px-4 py-3.5 text-sm uppercase text-xs">{p.method}</td>
                  <td className="px-4 py-3.5 text-xs font-mono text-slate-400">{p.referenceNumber || '-'}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Growth motivator */}
      <div className="bg-gradient-to-br from-terracotta via-marigold to-terracotta/90 rounded-xl p-6 text-white shadow-md">
        <h3 className="text-lg font-fraunces font-bold mb-2">📈 Grow your earnings</h3>
        <p className="text-cream/90 text-sm mb-4">
          You have <strong>{activeVendors.length} active vendors</strong>. See what happens if you add more:
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-sm text-cream/90">Add</span>
            <input
              type="number"
              min={1}
              max={100}
              value={additionalVendors}
              onChange={e => setAdditionalVendors(Math.max(1, Number(e.target.value)))}
              className="w-20 px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white text-sm font-bold text-center placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <span className="text-sm text-cream/90">vendors on Pro plan</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowRight className="w-4 h-4 text-amber-100" />
            <span className="text-lg font-bold">+{formatIndianCurrency(projected.additionalMonthlyEarnings)}/month</span>
          </div>
        </div>
        <p className="text-xs text-amber-100 mt-2">That's {formatIndianCurrency(projected.additionalYearlyEarnings)} per year!</p>
        <Button
          onClick={() => navigate('/admin/vendors')}
          className="mt-4 bg-ink text-white hover:bg-ink/90 gap-2"
        >
          <UserPlus className="w-4 h-4" /> Invite Vendors
        </Button>
      </div>
    </div>
  )
}
