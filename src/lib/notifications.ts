/**
 * Notification types for admin actions
 */
export const ADMIN_NOTIFICATIONS = {
  VENDOR_APPROVED: (vendorName: string) =>
    `${vendorName} approved and notified via WhatsApp`,
  VENDOR_REJECTED: (vendorName: string) =>
    `${vendorName} rejected. Reason sent via WhatsApp`,
  VENDOR_SUSPENDED: (vendorName: string) =>
    `${vendorName} suspended. Vendor has been notified`,
  VENDOR_RESUBMISSION: (vendorName: string) =>
    `Resubmission request sent to ${vendorName} via WhatsApp`,
  GROUP_CREATED: (groupName: string) =>
    `Group "${groupName}" created. Credentials generated.`,
  GROUP_DEACTIVATED: (groupName: string) =>
    `Group "${groupName}" has been deactivated`,
  PAYOUT_MARKED: (adminName: string, amount: number) =>
    `Payout of ₹${new Intl.NumberFormat('en-IN').format(amount)} marked as paid to ${adminName}`,
  DISPUTE_RESOLVED: (disputeId: string) =>
    `Dispute #${disputeId} resolved and both parties notified`,
  DISPUTE_ESCALATED: (disputeId: string) =>
    `Dispute #${disputeId} escalated to Superadmin`,
  ANNOUNCEMENT_SENT: (count: number) =>
    `Announcement sent to ${count} members`,
  VENDOR_INVITED: (mobile: string) =>
    `Invite sent to +91 ${mobile} via WhatsApp`,
  BUYER_INVITED: (mobile: string) =>
    `Invite sent to +91 ${mobile} via WhatsApp`,
  FEATURE_FLAG_UPDATED: (flagName: string, enabled: boolean) =>
    `${flagName} ${enabled ? 'enabled' : 'disabled'} globally`,
  VENDOR_NUDGED: (vendorName: string) =>
    `Reminder sent to ${vendorName} via WhatsApp`,
}

/**
 * Generate WhatsApp URL with pre-filled message
 */
export const generateWhatsAppUrl = (mobile: string, message: string): string => {
  const cleanMobile = mobile.replace(/\D/g, '')
  const encoded = encodeURIComponent(message)
  return `https://wa.me/91${cleanMobile}?text=${encoded}`
}

/**
 * Generate Group Admin credential WhatsApp message in Gujarati
 */
export const generateCredentialMessage = (
  name: string,
  mobile: string,
  password: string
): string => {
  return `નમસ્કાર ${name},

Vahiવટ પ્લેટફોર્મ પર આપનું ગ્રૂપ એડ્મિન એકાઉન્ટ બની ગયું છે.

Login URL: vahiવટ.in/admin/login
Mobile: ${mobile}
Password: ${password}

Login કરો અને તમારા ગ્રૂપ ને set up કરો.

- Vahiવટ Team`
}

/**
 * Generate a random secure password
 */
export const generateSecurePassword = (groupCode: string): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let result = 'Vah@'
  const year = new Date().getFullYear()
  result += year + '#'
  result += groupCode.substring(0, 3).toUpperCase()
  for (let i = 0; i < 2; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
