export const ROLES = {
  SUPERADMIN: 'superadmin',
  GROUP_ADMIN: 'group_admin',
  VENDOR: 'vendor',
  BUYER: 'buyer',
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

export interface AdminUser {
  id: string
  name: string
  email: string
  role: Role
  groupId: string | null
  groupName: string | null
  commissionRate: number | null
  totalEarned: number | null
  pendingPayout: number | null
  permissions: string[]
}

export interface GroupData {
  id: string
  name: string
  industry: string
  city: string
  secondaryCities?: string[]
  description?: string
  logo?: string
  status: 'active' | 'inactive' | 'pending'
  vendorCount: number
  buyerCount: number
  commissionRate: number
  monthlyRevenue: number
  admin: GroupAdminData
}

export interface GroupAdminData {
  id: string
  name: string
  mobile: string
  email: string
  payoutMethod: 'bank' | 'upi'
  upiId?: string
  bankAccount?: string
  ifsc?: string
  accountHolderName?: string
  totalEarned: number
  pendingPayout: number
}

export interface VendorData {
  id: string
  businessName: string
  ownerName: string
  mobile: string
  gstin: string
  gstVerified: boolean
  gstApiStatus?: 'verified' | 'mismatch' | 'inactive' | 'not_found'
  plan: 'basic' | 'pro' | 'enterprise' | 'free'
  status: 'active' | 'inactive' | 'pending' | 'verified' | 'rejected' | 'suspended' | 'trial'
  groupId: string
  groupName?: string
  joinedDate: string
  dealsCompleted: number
  avgResponseTime: string
  lastActive: string
  documents?: string[]
}

export interface BuyerData {
  id: string
  name: string
  company: string
  email: string
  phone: string
  dealsMade: number
  lastActive: string
  status: 'active' | 'inactive'
  groupId: string
}

export interface PayoutData {
  id: string
  adminId: string
  adminName: string
  groupName: string
  amount: number
  cycle: string
  method: 'bank' | 'upi'
  upiId?: string
  bankAccount?: string
  status: 'pending' | 'paid' | 'processing'
  dueDate: string
  referenceNumber?: string
  paidDate?: string
}

export interface DisputeData {
  id: string
  dateOpened: string
  filedBy: 'buyer' | 'vendor'
  filerName: string
  againstName: string
  dealId: string
  reason: 'non_delivery' | 'payment_issue' | 'quality_dispute' | 'fraud_concern' | 'other'
  description: string
  status: 'open' | 'resolved' | 'escalated'
  resolvedInFavourOf?: 'buyer' | 'vendor'
  resolutionNote?: string
  adminNotes?: string[]
  timeline?: { date: string; event: string }[]
}

export interface VerificationItem {
  id: string
  vendorId: string
  businessName: string
  gstin: string
  gstApiStatus: 'verified' | 'mismatch' | 'inactive' | 'not_found'
  documents: string[]
  groupId: string
  groupName: string
  submittedDate: string
  status: 'pending' | 'approved' | 'rejected'
  rejectionReason?: string
}

export interface FeatureFlagData {
  id: string
  name: string
  key: string
  description: string
  enabled: boolean
  groupOverrides: { groupId: string; groupName: string; enabled: boolean }[]
  lastModified: string
  modifiedBy: string
}

export interface AnnouncementData {
  id: string
  message: string
  targetAudience: 'all' | 'vendors' | 'buyers' | 'specific'
  targetVendorIds?: string[]
  language: 'gu' | 'hi' | 'en'
  deliveryChannel: 'in_app' | 'whatsapp' | 'both'
  sentDate: string
  deliveredCount: number
  openedCount: number
  status: 'sent' | 'scheduled' | 'draft'
}

export interface ActivityItem {
  id: string
  timestamp: string
  type: 'vendor_joined' | 'payout_processed' | 'vendor_suspended' | 'group_created' | 'vendor_verified' | 'deal_closed' | 'dispute_opened'
  description: string
  groupName?: string
}
