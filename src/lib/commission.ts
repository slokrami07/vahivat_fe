/**
 * Subscription plan monthly prices
 */
export const PLANS = {
  free: { name: 'Free', price: 0 },
  basic: { name: 'Basic', price: 999 },
  pro: { name: 'Pro', price: 2999 },
  enterprise: { name: 'Enterprise', price: 5999 },
} as const

export type PlanKey = keyof typeof PLANS

/**
 * Format number using Indian numbering system (₹1,24,500)
 */
export const formatIndianCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format number using Indian numbering system without currency symbol
 */
export const formatIndianNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num)
}

/**
 * Format date as DD/MM/YYYY (Indian standard)
 */
export const formatIndianDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}

/**
 * Format date as relative time (e.g. "2 hours ago", "3 days ago")
 */
export const formatRelativeTime = (dateStr: string): string => {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatIndianDate(dateStr)
}

interface VendorForCommission {
  plan: PlanKey
  status: string
  [key: string]: unknown
}

/**
 * Calculate monthly commission for a Group Admin
 */
export const calculateMonthlyCommission = (
  vendors: VendorForCommission[],
  commissionRate: number
) => {
  const activeVendors = vendors.filter(v => v.status === 'active')

  const vendorBreakdown = activeVendors.map(vendor => {
    const planPrice = PLANS[vendor.plan]?.price || 0
    const commission = (planPrice * commissionRate) / 100
    return {
      ...vendor,
      planPrice,
      commission: Math.round(commission * 100) / 100,
    }
  })

  const totalRevenue = vendorBreakdown.reduce((sum, v) => sum + v.planPrice, 0)
  const commissionAmount = vendorBreakdown.reduce((sum, v) => sum + v.commission, 0)

  return {
    totalRevenue,
    commissionAmount: Math.round(commissionAmount * 100) / 100,
    vendorBreakdown,
    activeVendorCount: activeVendors.length,
  }
}

/**
 * Project future earnings based on adding more vendors
 */
export const projectAdditionalEarnings = (
  _currentVendors: number,
  additionalVendors: number,
  assumedPlan: PlanKey = 'pro',
  commissionRate: number
) => {
  const planPrice = PLANS[assumedPlan]?.price || 0
  const additionalMonthlyEarnings = (additionalVendors * planPrice * commissionRate) / 100
  return {
    additionalMonthlyEarnings: Math.round(additionalMonthlyEarnings),
    additionalYearlyEarnings: Math.round(additionalMonthlyEarnings * 12),
  }
}
