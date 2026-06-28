import * as React from 'react'
import { useToast } from '@/components/Toast'
import { mockFeatureFlags } from '@/lib/mockData'
import { ADMIN_NOTIFICATIONS } from '@/lib/notifications'
import { formatRelativeTime } from '@/lib/commission'
import type { FeatureFlagData } from '@/lib/roles'
import { ToggleLeft, ToggleRight, Clock, User } from 'lucide-react'

export function FeatureFlags() {
  const { showToast } = useToast()
  const [flags, setFlags] = React.useState<FeatureFlagData[]>(mockFeatureFlags)

  const toggleFlag = (flagId: string) => {
    setFlags(prev => prev.map(f => {
      if (f.id !== flagId) return f
      const updated = { ...f, enabled: !f.enabled, lastModified: new Date().toISOString(), modifiedBy: 'Slok (Superadmin)' }
      showToast(ADMIN_NOTIFICATIONS.FEATURE_FLAG_UPDATED(f.name, updated.enabled))
      return updated
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">Feature Flags</h1>
        <p className="text-sm text-slate-500 mt-1">Control feature rollout globally and per group</p>
      </div>

      <div className="space-y-3">
        {flags.map(flag => (
          <div key={flag.id} className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Toggle */}
              <button
                onClick={() => toggleFlag(flag.id)}
                className="mt-0.5 shrink-0 min-h-0"
              >
                {flag.enabled ? (
                  <ToggleRight className="w-10 h-10 text-terracotta" />
                ) : (
                  <ToggleLeft className="w-10 h-10 text-slate-300" />
                )}
              </button>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-semibold text-ink">{flag.name}</h3>
                  <span className="font-mono text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{flag.key}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${flag.enabled ? 'bg-terracotta/10 text-terracotta' : 'bg-slate-100 text-slate-500'}`}>
                    {flag.enabled ? 'ON' : 'OFF'}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{flag.description}</p>

                {/* Group overrides */}
                {flag.groupOverrides.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase mb-1.5">Group Overrides</p>
                    <div className="flex flex-wrap gap-2">
                      {flag.groupOverrides.map(override => (
                        <span
                          key={override.groupId}
                          className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            override.enabled ? 'bg-terracotta/10 text-terracotta' : 'bg-ink text-white'
                          }`}
                        >
                          {override.groupName}: {override.enabled ? 'ON' : 'OFF'}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatRelativeTime(flag.lastModified)}</span>
                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{flag.modifiedBy}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
