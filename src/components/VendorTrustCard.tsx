import { useTranslation } from "react-i18next"

interface VendorTrustData {
  gstVerified?: boolean
  yearsInBusiness?: number
  avgResponseTime?: string
  completedDeals?: number
}

export function VendorTrustCard({ vendor }: { vendor: VendorTrustData }) {
  const { t } = useTranslation()

  return (
    <div className="grid grid-cols-2 gap-2 p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 mt-3">
      {/* GST Verified */}
      <div className="flex items-center gap-2">
        <span className="text-emerald-600 text-sm font-bold">✓</span>
        <div>
          <div className="text-[10px] text-charcoal/60 leading-tight">GST</div>
          <div className={`text-xs font-semibold leading-tight ${vendor.gstVerified ? 'text-emerald-700' : 'text-amber-600'}`}>
            {vendor.gstVerified ? t('vendor.verified') : t('vendor.unverified')}
          </div>
        </div>
      </div>

      {/* Years in Business */}
      <div className="flex items-center gap-2">
        <span className="text-sm">🏢</span>
        <div>
          <div className="text-[10px] text-charcoal/60 leading-tight">{t('vendor.established')}</div>
          <div className="text-xs font-semibold text-ink leading-tight">
            {vendor.yearsInBusiness || 0} {t('vendor.years')}
          </div>
        </div>
      </div>

      {/* Avg Response Time */}
      <div className="flex items-center gap-2">
        <span className="text-sm">⚡</span>
        <div>
          <div className="text-[10px] text-charcoal/60 leading-tight">{t('vendor.response_time')}</div>
          <div className="text-xs font-semibold text-ink leading-tight">
            {vendor.avgResponseTime || '< 2 hrs'}
          </div>
        </div>
      </div>

      {/* Completed Deals */}
      <div className="flex items-center gap-2">
        <span className="text-sm">🤝</span>
        <div>
          <div className="text-[10px] text-charcoal/60 leading-tight">{t('vendor.deals')}</div>
          <div className="text-xs font-semibold text-ink leading-tight">
            {vendor.completedDeals || 0} {t('vendor.deals_suffix')}
          </div>
        </div>
      </div>
    </div>
  )
}
