import { useNavigate } from 'react-router-dom'
import { KPICard } from '@/components/admin/KPICard'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { formatIndianCurrency, formatRelativeTime } from '@/lib/commission'
import { mockGroups, mockActivities, mockVerificationQueue } from '@/lib/mockData'
import { Users, Grid3X3, IndianRupee, ShieldCheck, UserPlus, CheckCircle, AlertTriangle, Landmark, Handshake, PlusCircle } from 'lucide-react'

const totalVendors = mockGroups.reduce((s, g) => s + g.vendorCount, 0)
const activeGroups = mockGroups.filter(g => g.status === 'active').length
const monthlyRev = mockGroups.reduce((s, g) => s + g.monthlyRevenue, 0)
const pendingVerifications = mockVerificationQueue.filter(v => v.status === 'pending').length

const activityIcons: Record<string, typeof UserPlus> = {
  vendor_joined: UserPlus,
  deal_closed: Handshake,
  vendor_verified: CheckCircle,
  payout_processed: Landmark,
  dispute_opened: AlertTriangle,
  vendor_suspended: AlertTriangle,
  group_created: PlusCircle,
}

export function SuperadminDashboard() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">Dashboard</h1>
        <p className="text-sm text-slate-500 mt-1">Platform overview at a glance</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Vendors"
          value={totalVendors.toString()}
          subtitle={`Across ${mockGroups.length} groups`}
          trend="positive"
          trendText="↑ 12 this week"
          icon={Users}
          onClick={() => navigate('/superadmin/vendors')}
        />
        <KPICard
          title="Active Groups"
          value={activeGroups.toString()}
          subtitle={mockGroups.filter(g => g.status === 'active').map(g => g.industry).join(', ')}
          trend="neutral"
          trendText={`${mockGroups.length} total`}
          icon={Grid3X3}
          onClick={() => navigate('/superadmin/groups')}
        />
        <KPICard
          title="This Month Revenue"
          value={formatIndianCurrency(monthlyRev)}
          trend="positive"
          trendText="↑ 22% vs last month"
          icon={IndianRupee}
          onClick={() => navigate('/superadmin/revenue')}
        />
        <KPICard
          title="Pending Verifications"
          value={pendingVerifications.toString()}
          subtitle="Needs review"
          trend={pendingVerifications > 10 ? 'negative' : 'neutral'}
          trendText={pendingVerifications > 10 ? 'High queue' : 'Normal'}
          icon={ShieldCheck}
          iconColor="text-amber-600"
          onClick={() => navigate('/superadmin/verification-queue')}
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left — Recent Activity (60%) */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-fraunces font-semibold text-ink">Recent Activity</h2>
          <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 shadow-sm">
            {mockActivities.map(activity => {
              const Icon = activityIcons[activity.type] || UserPlus
              return (
                <div key={activity.id} className="flex items-start gap-3 p-4 hover:bg-slate-50/50 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-4 h-4 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400">{formatRelativeTime(activity.timestamp)}</span>
                      {activity.groupName && (
                        <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {activity.groupName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column (40%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Groups at a glance */}
          <div>
            <h2 className="text-lg font-fraunces font-semibold text-ink mb-3">Groups at a Glance</h2>
            <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 shadow-sm">
              {mockGroups.map(group => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-4 hover:bg-slate-50/50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/superadmin/groups/${group.id}`)}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink truncate">{group.name}</p>
                    <p className="text-xs text-slate-500">{group.vendorCount} vendors · {formatIndianCurrency(group.monthlyRevenue)}/mo</p>
                  </div>
                  <StatusBadge status={group.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Verification preview */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-fraunces font-semibold text-ink">Verification Queue</h2>
              <button
                onClick={() => navigate('/superadmin/verification-queue')}
                className="text-xs text-terracotta font-medium hover:underline min-h-0"
              >
                Review all →
              </button>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100 shadow-sm">
              {mockVerificationQueue
                .filter(v => v.status === 'pending')
                .slice(0, 5)
                .map(item => (
                  <div key={item.id} className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium text-ink">{item.businessName}</p>
                      <p className="text-xs text-slate-500">{item.groupName}</p>
                    </div>
                    <StatusBadge status={item.gstApiStatus} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
