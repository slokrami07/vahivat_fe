import { useParams, useNavigate } from 'react-router-dom'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { formatIndianCurrency, formatIndianDate } from '@/lib/commission'
import { mockVendors } from '@/lib/mockData'
import { ArrowLeft, Phone, Mail, MapPin, FileText, Calendar, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VendorDetail() {
  const { vendorId } = useParams()
  const navigate = useNavigate()

  const vendor = mockVendors.find(v => v.id === vendorId)
  if (!vendor) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">Vendor not found</p>
        <Button variant="outline" onClick={() => navigate('/admin/vendors')} className="mt-4">Back to Vendors</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/vendors')} className="p-2 rounded-lg hover:bg-slate-100 min-h-0">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-fraunces font-bold text-ink">{vendor.businessName}</h1>
            <StatusBadge status={vendor.status} />
          </div>
          <p className="text-sm text-slate-500">{vendor.ownerName}</p>
        </div>
      </div>

      {/* Info grid */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-slate-400" /><div><p className="text-xs text-slate-400">Mobile</p><p className="text-sm">+91 {vendor.mobile}</p></div></div>
          <div className="flex items-center gap-3"><FileText className="w-4 h-4 text-slate-400" /><div><p className="text-xs text-slate-400">GSTIN</p><p className="text-sm font-mono">{vendor.gstin}</p></div></div>
          <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-slate-400" /><div><p className="text-xs text-slate-400">Group</p><p className="text-sm">{vendor.groupName}</p></div></div>
          <div className="flex items-center gap-3"><Calendar className="w-4 h-4 text-slate-400" /><div><p className="text-xs text-slate-400">Joined</p><p className="text-sm">{formatIndianDate(vendor.joinedDate)}</p></div></div>
          <div className="flex items-center gap-3"><ShoppingBag className="w-4 h-4 text-slate-400" /><div><p className="text-xs text-slate-400">Deals Completed</p><p className="text-sm font-medium">{vendor.dealsCompleted}</p></div></div>
          <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-slate-400" /><div><p className="text-xs text-slate-400">Avg Response</p><p className="text-sm">{vendor.avgResponseTime}</p></div></div>
        </div>
      </div>

      {/* Subscription */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Subscription</h2>
        <div className="flex items-center gap-4">
          <span className="text-lg font-fraunces font-bold text-ink capitalize">{vendor.plan} Plan</span>
          <span className="text-sm text-slate-500">{formatIndianCurrency(vendor.plan === 'pro' ? 2999 : vendor.plan === 'enterprise' ? 5999 : vendor.plan === 'basic' ? 999 : 0)}/month</span>
          <StatusBadge status={vendor.status} />
        </div>
      </div>

      {/* Admin notes */}
      <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Admin Notes</h2>
        <textarea
          placeholder="Add internal notes about this vendor (only visible to admins)..."
          rows={3}
          className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 resize-none"
        />
        <Button size="sm" className="mt-2">Save Note</Button>
      </div>
    </div>
  )
}
