import type {
  GroupData, VendorData, BuyerData, PayoutData, DisputeData,
  VerificationItem, FeatureFlagData, AnnouncementData, ActivityItem,
} from './roles'

// ─── Mock Groups ─────────────────────────────────────────────────
export const mockGroups: GroupData[] = [
  {
    id: 'grp_it_ahm_001',
    name: 'IT Ahmedabad',
    industry: 'IT',
    city: 'Ahmedabad',
    secondaryCities: ['Gandhinagar', 'Rajkot'],
    description: 'Top IT solution providers in Ahmedabad and Gujarat region',
    status: 'active',
    vendorCount: 47,
    buyerCount: 23,
    commissionRate: 22,
    monthlyRevenue: 94503,
    admin: {
      id: 'adm_001',
      name: 'Rahul Shah',
      mobile: '9876543210',
      email: 'rahul@itvendors.com',
      payoutMethod: 'upi',
      upiId: 'rahul@okaxis',
      totalEarned: 62400,
      pendingPayout: 3200,
    },
  },
  {
    id: 'grp_textile_surat_002',
    name: 'Textile Surat',
    industry: 'Textile',
    city: 'Surat',
    status: 'active',
    vendorCount: 83,
    buyerCount: 45,
    commissionRate: 18,
    monthlyRevenue: 156200,
    admin: {
      id: 'adm_002',
      name: 'Meena Desai',
      mobile: '9898765432',
      email: 'meena@textilehub.com',
      payoutMethod: 'bank',
      bankAccount: '12345678901234',
      ifsc: 'SBIN0001234',
      accountHolderName: 'Meena Desai',
      totalEarned: 89400,
      pendingPayout: 5600,
    },
  },
  {
    id: 'grp_pharma_vad_003',
    name: 'Pharma Vadodara',
    industry: 'Pharma',
    city: 'Vadodara',
    status: 'active',
    vendorCount: 31,
    buyerCount: 18,
    commissionRate: 25,
    monthlyRevenue: 72800,
    admin: {
      id: 'adm_003',
      name: 'Nikhil Patel',
      mobile: '9879876543',
      email: 'nikhil@pharmazone.com',
      payoutMethod: 'upi',
      upiId: 'nikhil@gpay',
      totalEarned: 45200,
      pendingPayout: 4100,
    },
  },
  {
    id: 'grp_const_ahm_004',
    name: 'Construction Ahmedabad',
    industry: 'Construction',
    city: 'Ahmedabad',
    status: 'active',
    vendorCount: 56,
    buyerCount: 34,
    commissionRate: 20,
    monthlyRevenue: 112500,
    admin: {
      id: 'adm_004',
      name: 'Kamlesh Joshi',
      mobile: '9825432109',
      email: 'kamlesh@buildright.com',
      payoutMethod: 'bank',
      bankAccount: '98765432101234',
      ifsc: 'HDFC0002345',
      accountHolderName: 'Kamlesh Joshi',
      totalEarned: 72600,
      pendingPayout: 6800,
    },
  },
  {
    id: 'grp_fmcg_rjk_005',
    name: 'FMCG Rajkot',
    industry: 'FMCG',
    city: 'Rajkot',
    status: 'inactive',
    vendorCount: 12,
    buyerCount: 8,
    commissionRate: 15,
    monthlyRevenue: 18900,
    admin: {
      id: 'adm_005',
      name: 'Priya Mehta',
      mobile: '9812345678',
      email: 'priya@fmcgdirect.com',
      payoutMethod: 'upi',
      upiId: 'priya@paytm',
      totalEarned: 12300,
      pendingPayout: 0,
    },
  },
  {
    id: 'grp_mfg_bhav_006',
    name: 'Manufacturing Bhavnagar',
    industry: 'Manufacturing',
    city: 'Bhavnagar',
    status: 'pending',
    vendorCount: 0,
    buyerCount: 0,
    commissionRate: 20,
    monthlyRevenue: 0,
    admin: {
      id: 'adm_006',
      name: 'Vijay Rathod',
      mobile: '9854321098',
      email: 'vijay@mfghub.com',
      payoutMethod: 'bank',
      bankAccount: '56789012345678',
      ifsc: 'BKID0003456',
      accountHolderName: 'Vijay Rathod',
      totalEarned: 0,
      pendingPayout: 0,
    },
  },
]

// ─── Mock Vendors ────────────────────────────────────────────────
export const mockVendors: VendorData[] = [
  {
    id: 'vnd_001', businessName: 'TechSolutions Ahmedabad', ownerName: 'Jayesh Patel',
    mobile: '9898989898', gstin: '24AABCT1332L1Z2', gstVerified: true, gstApiStatus: 'verified',
    plan: 'pro', status: 'active', groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad',
    joinedDate: '2024-03-15', dealsCompleted: 12, avgResponseTime: '1.8 hrs', lastActive: '2024-06-24',
  },
  {
    id: 'vnd_002', businessName: 'CloudFirst Gujarat', ownerName: 'Anil Sharma',
    mobile: '9876541234', gstin: '24AABCF2345M2Z3', gstVerified: true, gstApiStatus: 'verified',
    plan: 'enterprise', status: 'active', groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad',
    joinedDate: '2024-01-20', dealsCompleted: 24, avgResponseTime: '0.9 hrs', lastActive: '2024-06-25',
  },
  {
    id: 'vnd_003', businessName: 'DataBridge Infra', ownerName: 'Ravi Kumar',
    mobile: '9845671234', gstin: '24AABCD3456N3Z4', gstVerified: false, gstApiStatus: 'mismatch',
    plan: 'basic', status: 'pending', groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad',
    joinedDate: '2024-06-10', dealsCompleted: 0, avgResponseTime: '-', lastActive: '2024-06-22',
  },
  {
    id: 'vnd_004', businessName: 'NetSecure Solutions', ownerName: 'Deepak Thakkar',
    mobile: '9812349876', gstin: '24AABCN4567P4Z5', gstVerified: true, gstApiStatus: 'verified',
    plan: 'pro', status: 'active', groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad',
    joinedDate: '2024-02-28', dealsCompleted: 18, avgResponseTime: '1.2 hrs', lastActive: '2024-06-25',
  },
  {
    id: 'vnd_005', businessName: 'SilkRoute Textiles', ownerName: 'Mansoor Ali',
    mobile: '9834567890', gstin: '24AABCS5678Q5Z6', gstVerified: true, gstApiStatus: 'verified',
    plan: 'pro', status: 'active', groupId: 'grp_textile_surat_002', groupName: 'Textile Surat',
    joinedDate: '2024-01-10', dealsCompleted: 35, avgResponseTime: '2.1 hrs', lastActive: '2024-06-25',
  },
  {
    id: 'vnd_006', businessName: 'Diamond Fabrics', ownerName: 'Paresh Patel',
    mobile: '9856781234', gstin: '24AABCD6789R6Z7', gstVerified: true, gstApiStatus: 'verified',
    plan: 'enterprise', status: 'active', groupId: 'grp_textile_surat_002', groupName: 'Textile Surat',
    joinedDate: '2024-02-05', dealsCompleted: 42, avgResponseTime: '1.5 hrs', lastActive: '2024-06-24',
  },
  {
    id: 'vnd_007', businessName: 'MedLife Pharma', ownerName: 'Harsh Trivedi',
    mobile: '9823456789', gstin: '24AABCM7890S7Z8', gstVerified: true, gstApiStatus: 'verified',
    plan: 'basic', status: 'active', groupId: 'grp_pharma_vad_003', groupName: 'Pharma Vadodara',
    joinedDate: '2024-04-12', dealsCompleted: 8, avgResponseTime: '3.2 hrs', lastActive: '2024-06-20',
  },
  {
    id: 'vnd_008', businessName: 'BuildRight Materials', ownerName: 'Suresh Yadav',
    mobile: '9867890123', gstin: '24AABCB8901T8Z9', gstVerified: false, gstApiStatus: 'not_found',
    plan: 'basic', status: 'suspended', groupId: 'grp_const_ahm_004', groupName: 'Construction Ahmedabad',
    joinedDate: '2024-05-01', dealsCompleted: 3, avgResponseTime: '4.5 hrs', lastActive: '2024-06-10',
  },
  {
    id: 'vnd_009', businessName: 'InfraTech Systems', ownerName: 'Amit Raval',
    mobile: '9878901234', gstin: '24AABCI9012U9Z0', gstVerified: true, gstApiStatus: 'verified',
    plan: 'pro', status: 'trial', groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad',
    joinedDate: '2024-06-18', dealsCompleted: 1, avgResponseTime: '2.0 hrs', lastActive: '2024-06-25',
  },
  {
    id: 'vnd_010', businessName: 'WebCraft Solutions', ownerName: 'Pooja Singh',
    mobile: '9889012345', gstin: '24AABCW0123V0Z1', gstVerified: false, gstApiStatus: 'inactive',
    plan: 'free', status: 'inactive', groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad',
    joinedDate: '2024-04-22', dealsCompleted: 0, avgResponseTime: '-', lastActive: '2024-05-15',
  },
]

// ─── Mock Buyers ─────────────────────────────────────────────────
export const mockBuyers: BuyerData[] = [
  { id: 'buy_001', name: 'Rajesh Industries', company: 'Rajesh Industries Pvt Ltd', email: 'rajesh@rindustries.com', phone: '9871234567', dealsMade: 8, lastActive: '2024-06-25', status: 'active', groupId: 'grp_it_ahm_001' },
  { id: 'buy_002', name: 'Gujarat Hospitals', company: 'Gujarat Hospital Group', email: 'purchase@gujhospitals.com', phone: '9862345678', dealsMade: 15, lastActive: '2024-06-24', status: 'active', groupId: 'grp_pharma_vad_003' },
  { id: 'buy_003', name: 'Surat Fashion House', company: 'Surat Fashion House LLP', email: 'buying@sfhouse.com', phone: '9853456789', dealsMade: 22, lastActive: '2024-06-25', status: 'active', groupId: 'grp_textile_surat_002' },
  { id: 'buy_004', name: 'Ahmedabad Metro Corp', company: 'Ahmedabad Metro Corporation', email: 'procurement@amdmetro.gov.in', phone: '9844567890', dealsMade: 5, lastActive: '2024-06-20', status: 'active', groupId: 'grp_const_ahm_004' },
  { id: 'buy_005', name: 'TechPark Gandhinagar', company: 'TechPark GN', email: 'admin@techparkgn.com', phone: '9835678901', dealsMade: 3, lastActive: '2024-06-15', status: 'inactive', groupId: 'grp_it_ahm_001' },
]

// ─── Mock Payouts ────────────────────────────────────────────────
export const mockPayouts: PayoutData[] = [
  { id: 'pay_001', adminId: 'adm_001', adminName: 'Rahul Shah', groupName: 'IT Ahmedabad', amount: 8250, cycle: 'June 2024', method: 'upi', upiId: 'rahul@okaxis', status: 'pending', dueDate: '2024-07-01' },
  { id: 'pay_002', adminId: 'adm_002', adminName: 'Meena Desai', groupName: 'Textile Surat', amount: 12400, cycle: 'June 2024', method: 'bank', bankAccount: '****1234', status: 'pending', dueDate: '2024-07-01' },
  { id: 'pay_003', adminId: 'adm_003', adminName: 'Nikhil Patel', groupName: 'Pharma Vadodara', amount: 6800, cycle: 'June 2024', method: 'upi', upiId: 'nikhil@gpay', status: 'processing', dueDate: '2024-07-01' },
  { id: 'pay_004', adminId: 'adm_004', adminName: 'Kamlesh Joshi', groupName: 'Construction Ahmedabad', amount: 9200, cycle: 'June 2024', method: 'bank', bankAccount: '****1234', status: 'pending', dueDate: '2024-07-01' },
  { id: 'pay_005', adminId: 'adm_001', adminName: 'Rahul Shah', groupName: 'IT Ahmedabad', amount: 7800, cycle: 'May 2024', method: 'upi', upiId: 'rahul@okaxis', status: 'paid', dueDate: '2024-06-01', referenceNumber: 'TXN20240601001', paidDate: '2024-06-01' },
  { id: 'pay_006', adminId: 'adm_002', adminName: 'Meena Desai', groupName: 'Textile Surat', amount: 11200, cycle: 'May 2024', method: 'bank', bankAccount: '****1234', status: 'paid', dueDate: '2024-06-01', referenceNumber: 'TXN20240601002', paidDate: '2024-06-02' },
]

// ─── Mock Verification Queue ─────────────────────────────────────
export const mockVerificationQueue: VerificationItem[] = [
  { id: 'ver_001', vendorId: 'vnd_003', businessName: 'DataBridge Infra', gstin: '24AABCD3456N3Z4', gstApiStatus: 'mismatch', documents: ['GST Certificate', 'PAN Card'], groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad', submittedDate: '2024-06-10', status: 'pending' },
  { id: 'ver_002', vendorId: 'vnd_011', businessName: 'SkyNet Solutions', gstin: '24AABCS1234K1Z1', gstApiStatus: 'verified', documents: ['GST Certificate', 'PAN Card', 'Trade License'], groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad', submittedDate: '2024-06-20', status: 'pending' },
  { id: 'ver_003', vendorId: 'vnd_012', businessName: 'Gujarat Polymers', gstin: '24AABCG2345L2Z2', gstApiStatus: 'verified', documents: ['GST Certificate', 'PAN Card'], groupId: 'grp_const_ahm_004', groupName: 'Construction Ahmedabad', submittedDate: '2024-06-21', status: 'pending' },
  { id: 'ver_004', vendorId: 'vnd_013', businessName: 'FashionWeave', gstin: '24AABCF3456M3Z3', gstApiStatus: 'inactive', documents: ['GST Certificate'], groupId: 'grp_textile_surat_002', groupName: 'Textile Surat', submittedDate: '2024-06-22', status: 'pending' },
  { id: 'ver_005', vendorId: 'vnd_014', businessName: 'MediSupply Co', gstin: '24AABCM4567N4Z4', gstApiStatus: 'verified', documents: ['GST Certificate', 'PAN Card', 'Drug License'], groupId: 'grp_pharma_vad_003', groupName: 'Pharma Vadodara', submittedDate: '2024-06-23', status: 'pending' },
  { id: 'ver_006', vendorId: 'vnd_015', businessName: 'RapidBuild', gstin: '24AABCR5678P5Z5', gstApiStatus: 'not_found', documents: ['GST Certificate', 'PAN Card'], groupId: 'grp_const_ahm_004', groupName: 'Construction Ahmedabad', submittedDate: '2024-06-18', status: 'pending' },
  { id: 'ver_007', vendorId: 'vnd_016', businessName: 'GreenPharma', gstin: '24AABCG6789Q6Z6', gstApiStatus: 'verified', documents: ['GST Certificate', 'PAN Card', 'Drug License'], groupId: 'grp_pharma_vad_003', groupName: 'Pharma Vadodara', submittedDate: '2024-06-15', status: 'approved' },
  { id: 'ver_008', vendorId: 'vnd_017', businessName: 'OldTech Inc', gstin: '24AABCO7890R7Z7', gstApiStatus: 'inactive', documents: ['GST Certificate'], groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad', submittedDate: '2024-06-12', status: 'rejected', rejectionReason: 'GST certificate expired. Please renew and resubmit.' },
]

// ─── Mock Disputes ───────────────────────────────────────────────
export const mockDisputes: DisputeData[] = [
  {
    id: 'DSP-001', dateOpened: '2024-06-20', filedBy: 'buyer', filerName: 'Rajesh Industries',
    againstName: 'TechSolutions Ahmedabad', dealId: 'deal_045', reason: 'non_delivery',
    description: 'Ordered 50 units of networking switches. Delivery was promised within 5 business days but has been 12 days with no update.',
    status: 'open',
    timeline: [
      { date: '2024-06-08', event: 'Deal initiated by buyer' },
      { date: '2024-06-09', event: 'Vendor accepted order' },
      { date: '2024-06-13', event: 'Expected delivery date' },
      { date: '2024-06-20', event: 'Buyer filed dispute - Non-delivery' },
    ],
  },
  {
    id: 'DSP-002', dateOpened: '2024-06-18', filedBy: 'vendor', filerName: 'CloudFirst Gujarat',
    againstName: 'Gujarat Hospitals', dealId: 'deal_038', reason: 'payment_issue',
    description: 'Service delivered and invoice raised on June 5. Payment of ₹2,45,000 still pending after 13 days past due date.',
    status: 'open',
    timeline: [
      { date: '2024-05-25', event: 'Deal initiated' },
      { date: '2024-06-01', event: 'Service delivered' },
      { date: '2024-06-05', event: 'Invoice raised - ₹2,45,000' },
      { date: '2024-06-18', event: 'Vendor filed dispute - Payment issue' },
    ],
  },
  {
    id: 'DSP-003', dateOpened: '2024-06-10', filedBy: 'buyer', filerName: 'Surat Fashion House',
    againstName: 'SilkRoute Textiles', dealId: 'deal_029', reason: 'quality_dispute',
    description: 'Received 200 meters of silk fabric. Color does not match the approved samples. Quality is below expected standards.',
    status: 'resolved', resolvedInFavourOf: 'buyer',
    resolutionNote: 'Vendor agreed to replace the shipment within 7 days. 15% discount applied to next order as goodwill.',
    timeline: [
      { date: '2024-06-01', event: 'Order placed' },
      { date: '2024-06-07', event: 'Goods delivered' },
      { date: '2024-06-10', event: 'Buyer filed dispute - Quality issue' },
      { date: '2024-06-15', event: 'Dispute resolved - Replacement agreed' },
    ],
  },
]

// ─── Mock Feature Flags ──────────────────────────────────────────
export const mockFeatureFlags: FeatureFlagData[] = [
  { id: 'ff_001', name: 'AI RFQ Generator', key: 'ai_rfq_generator', description: 'AI-powered RFQ generation from natural language', enabled: true, groupOverrides: [], lastModified: '2024-06-20T10:30:00Z', modifiedBy: 'Slok (Superadmin)' },
  { id: 'ff_002', name: 'Voice Search', key: 'voice_search', description: 'Voice search in Gujarati/Hindi', enabled: true, groupOverrides: [{ groupId: 'grp_fmcg_rjk_005', groupName: 'FMCG Rajkot', enabled: false }], lastModified: '2024-06-18T14:15:00Z', modifiedBy: 'Slok (Superadmin)' },
  { id: 'ff_003', name: 'Invoice Generator', key: 'invoice_generator', description: 'GST invoice auto-generation', enabled: false, groupOverrides: [{ groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad', enabled: true }], lastModified: '2024-06-15T09:00:00Z', modifiedBy: 'Slok (Superadmin)' },
  { id: 'ff_004', name: 'Deal Timeline', key: 'deal_timeline', description: 'Visual deal progress tracker', enabled: true, groupOverrides: [], lastModified: '2024-06-10T11:45:00Z', modifiedBy: 'Slok (Superadmin)' },
  { id: 'ff_005', name: 'Vendor Trust Score', key: 'vendor_trust_score', description: 'Trust score card on vendor profiles', enabled: true, groupOverrides: [], lastModified: '2024-06-08T16:20:00Z', modifiedBy: 'Slok (Superadmin)' },
  { id: 'ff_006', name: 'WhatsApp Notifications', key: 'whatsapp_notifications', description: 'WhatsApp message notifications', enabled: true, groupOverrides: [], lastModified: '2024-05-30T08:00:00Z', modifiedBy: 'Slok (Superadmin)' },
  { id: 'ff_007', name: 'Commission Dashboard', key: 'commission_dashboard', description: 'Group Admin earnings dashboard (new feature)', enabled: false, groupOverrides: [{ groupId: 'grp_it_ahm_001', groupName: 'IT Ahmedabad', enabled: true }, { groupId: 'grp_textile_surat_002', groupName: 'Textile Surat', enabled: true }], lastModified: '2024-06-22T13:30:00Z', modifiedBy: 'Slok (Superadmin)' },
  { id: 'ff_008', name: 'Buyer Spend Analytics', key: 'buyer_spend_analytics', description: 'Buyer spend dashboard', enabled: false, groupOverrides: [], lastModified: '2024-06-01T10:00:00Z', modifiedBy: 'Slok (Superadmin)' },
]

// ─── Mock Announcements ──────────────────────────────────────────
export const mockAnnouncements: AnnouncementData[] = [
  { id: 'ann_001', message: 'Platform maintenance scheduled for Sunday 2AM-5AM. All services will be temporarily unavailable.', targetAudience: 'all', language: 'en', deliveryChannel: 'both', sentDate: '2024-06-22T10:00:00Z', deliveredCount: 185, openedCount: 142, status: 'sent' },
  { id: 'ann_002', message: 'New feature: AI-powered RFQ generator is now live! Create requirements in plain language.', targetAudience: 'buyers', language: 'en', deliveryChannel: 'in_app', sentDate: '2024-06-18T09:00:00Z', deliveredCount: 23, openedCount: 18, status: 'sent' },
  { id: 'ann_003', message: 'Vendor verification drive: Complete your GST verification before June 30 to maintain active status.', targetAudience: 'vendors', language: 'gu', deliveryChannel: 'whatsapp', sentDate: '2024-06-15T11:00:00Z', deliveredCount: 45, openedCount: 38, status: 'sent' },
]

// ─── Mock Activities ─────────────────────────────────────────────
export const mockActivities: ActivityItem[] = [
  { id: 'act_001', timestamp: '2024-06-25T14:30:00Z', type: 'vendor_joined', description: 'InfraTech Systems joined as a vendor', groupName: 'IT Ahmedabad' },
  { id: 'act_002', timestamp: '2024-06-25T12:15:00Z', type: 'deal_closed', description: 'Deal #045 closed between Rajesh Industries and CloudFirst Gujarat', groupName: 'IT Ahmedabad' },
  { id: 'act_003', timestamp: '2024-06-25T10:00:00Z', type: 'vendor_verified', description: 'GreenPharma verification approved', groupName: 'Pharma Vadodara' },
  { id: 'act_004', timestamp: '2024-06-24T16:45:00Z', type: 'payout_processed', description: 'May payout of ₹7,800 processed for Rahul Shah', groupName: 'IT Ahmedabad' },
  { id: 'act_005', timestamp: '2024-06-24T14:20:00Z', type: 'dispute_opened', description: 'Dispute #DSP-001 opened by Rajesh Industries', groupName: 'IT Ahmedabad' },
  { id: 'act_006', timestamp: '2024-06-24T11:00:00Z', type: 'vendor_suspended', description: 'BuildRight Materials suspended — GST not found', groupName: 'Construction Ahmedabad' },
  { id: 'act_007', timestamp: '2024-06-23T15:30:00Z', type: 'vendor_joined', description: 'MediSupply Co applied for verification', groupName: 'Pharma Vadodara' },
  { id: 'act_008', timestamp: '2024-06-23T09:00:00Z', type: 'group_created', description: 'Manufacturing Bhavnagar group created', groupName: 'Manufacturing Bhavnagar' },
  { id: 'act_009', timestamp: '2024-06-22T16:00:00Z', type: 'deal_closed', description: 'Deal #038 closed between Gujarat Hospitals and MedLife Pharma', groupName: 'Pharma Vadodara' },
  { id: 'act_010', timestamp: '2024-06-22T13:30:00Z', type: 'vendor_verified', description: 'NetSecure Solutions verification approved', groupName: 'IT Ahmedabad' },
  { id: 'act_011', timestamp: '2024-06-21T10:45:00Z', type: 'vendor_joined', description: 'Gujarat Polymers applied for verification', groupName: 'Construction Ahmedabad' },
  { id: 'act_012', timestamp: '2024-06-20T14:00:00Z', type: 'deal_closed', description: 'Deal #041 closed — ₹3,45,000', groupName: 'Textile Surat' },
]

// ─── Mock Revenue Transactions ───────────────────────────────────
export const mockTransactions = [
  { id: 'txn_001', vendorName: 'TechSolutions Ahmedabad', groupName: 'IT Ahmedabad', plan: 'Pro', amount: 2999, date: '2024-06-25', status: 'paid' as const, commission: 659.78 },
  { id: 'txn_002', vendorName: 'CloudFirst Gujarat', groupName: 'IT Ahmedabad', plan: 'Enterprise', amount: 5999, date: '2024-06-25', status: 'paid' as const, commission: 1319.78 },
  { id: 'txn_003', vendorName: 'SilkRoute Textiles', groupName: 'Textile Surat', plan: 'Pro', amount: 2999, date: '2024-06-24', status: 'paid' as const, commission: 539.82 },
  { id: 'txn_004', vendorName: 'Diamond Fabrics', groupName: 'Textile Surat', plan: 'Enterprise', amount: 5999, date: '2024-06-24', status: 'paid' as const, commission: 1079.82 },
  { id: 'txn_005', vendorName: 'DataBridge Infra', groupName: 'IT Ahmedabad', plan: 'Basic', amount: 999, date: '2024-06-23', status: 'failed' as const, commission: 0 },
  { id: 'txn_006', vendorName: 'MedLife Pharma', groupName: 'Pharma Vadodara', plan: 'Basic', amount: 999, date: '2024-06-22', status: 'paid' as const, commission: 249.75 },
  { id: 'txn_007', vendorName: 'NetSecure Solutions', groupName: 'IT Ahmedabad', plan: 'Pro', amount: 2999, date: '2024-06-22', status: 'paid' as const, commission: 659.78 },
  { id: 'txn_008', vendorName: 'BuildRight Materials', groupName: 'Construction Ahmedabad', plan: 'Basic', amount: 999, date: '2024-06-20', status: 'refunded' as const, commission: 0 },
]

// ─── Monthly revenue data for charts ─────────────────────────────
export const mockMonthlyRevenue = [
  { month: 'Jul 23', revenue: 45000, vendors: 18 },
  { month: 'Aug 23', revenue: 52000, vendors: 22 },
  { month: 'Sep 23', revenue: 58000, vendors: 25 },
  { month: 'Oct 23', revenue: 61000, vendors: 27 },
  { month: 'Nov 23', revenue: 68000, vendors: 30 },
  { month: 'Dec 23', revenue: 72000, vendors: 32 },
  { month: 'Jan 24', revenue: 78000, vendors: 35 },
  { month: 'Feb 24', revenue: 85000, vendors: 38 },
  { month: 'Mar 24', revenue: 92000, vendors: 40 },
  { month: 'Apr 24', revenue: 98000, vendors: 42 },
  { month: 'May 24', revenue: 108000, vendors: 44 },
  { month: 'Jun 24', revenue: 124500, vendors: 47 },
]

// ─── Monthly earnings data for Group Admin chart ─────────────────
export const mockMonthlyEarnings = [
  { month: 'Jul 23', earnings: 3200, vendors: 12 },
  { month: 'Aug 23', earnings: 4100, vendors: 15 },
  { month: 'Sep 23', earnings: 4800, vendors: 18 },
  { month: 'Oct 23', earnings: 5200, vendors: 20 },
  { month: 'Nov 23', earnings: 5800, vendors: 23 },
  { month: 'Dec 23', earnings: 6200, vendors: 25 },
  { month: 'Jan 24', earnings: 6800, vendors: 27 },
  { month: 'Feb 24', earnings: 7200, vendors: 29 },
  { month: 'Mar 24', earnings: 7600, vendors: 30 },
  { month: 'Apr 24', earnings: 7900, vendors: 31 },
  { month: 'May 24', earnings: 8100, vendors: 32 },
  { month: 'Jun 24', earnings: 8250, vendors: 33 },
]

// ─── Revenue by group for charts ─────────────────────────────────
export const mockRevenueByGroup = [
  { group: 'IT Ahmedabad', revenue: 94503 },
  { group: 'Textile Surat', revenue: 156200 },
  { group: 'Pharma Vadodara', revenue: 72800 },
  { group: 'Construction Ahmedabad', revenue: 112500 },
  { group: 'FMCG Rajkot', revenue: 18900 },
]

// ─── Revenue by plan for donut chart ─────────────────────────────
export const mockRevenueByPlan = [
  { plan: 'Free', value: 0, fill: '#94a3b8' },
  { plan: 'Basic', value: 32000, fill: '#60a5fa' },
  { plan: 'Pro', value: 245000, fill: '#34d399' },
  { plan: 'Enterprise', value: 178000, fill: '#a78bfa' },
]

// ─── Daily revenue for line chart ────────────────────────────────
export const mockDailyRevenue = Array.from({ length: 30 }, (_, i) => ({
  date: `${String(i + 1).padStart(2, '0')}/06`,
  revenue: Math.floor(3000 + Math.random() * 5000),
}))
