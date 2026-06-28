import * as React from 'react'
import { usePerspective } from '@/context/PerspectiveContext'
import { mockGroups } from '@/lib/mockData'
import type { GroupData } from '@/lib/roles'
import { formatIndianCurrency } from '@/lib/commission'
import { useToast } from '@/components/Toast'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Building, UserCircle2, Landmark, ShieldCheck,
  Plus, X, HelpCircle, Eye, Upload, Save, Globe
} from 'lucide-react'

export function GroupProfile() {
  const { user, updateUser } = usePerspective()
  const { showToast } = useToast()

  // Find this specific group's mock data (IT Ahmedabad, grp_it_ahm_001)
  const [group, setGroup] = React.useState<GroupData>(() => {
    const found = mockGroups.find(g => g.id === 'grp_it_ahm_001')
    return found || mockGroups[0]
  })

  const [activeTab, setActiveTab] = React.useState('general')

  // Form states
  const [groupName, setGroupName] = React.useState(group.name)
  const [description, setDescription] = React.useState(group.description || '')
  const [secondaryCities, setSecondaryCities] = React.useState(group.secondaryCities || [])
  const [newCity, setNewCity] = React.useState('')

  const [adminName, setAdminName] = React.useState(group.admin.name)
  const [adminMobile, setAdminMobile] = React.useState(group.admin.mobile)
  const [payoutMethod, setPayoutMethod] = React.useState<'bank' | 'upi'>(group.admin.payoutMethod)
  const [upiId, setUpiId] = React.useState(group.admin.upiId || '')
  const [bankAccount, setBankAccount] = React.useState(group.admin.bankAccount || '')
  const [ifsc, setIfsc] = React.useState(group.admin.ifsc || '')
  const [accName, setAccName] = React.useState(group.admin.accountHolderName || '')

  // Categories list
  const [categories, setCategories] = React.useState<string[]>([
    'Software Development', 'IT Infrastructure', 'Cloud & Hosting', 'Cybersecurity', 'IT Consulting'
  ])
  const [newCategory, setNewCategory] = React.useState('')

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault()
    setGroup(prev => ({
      ...prev,
      name: groupName,
      description,
      secondaryCities,
    }))
    showToast('Group settings updated successfully!')
  }

  const handleSavePayout = (e: React.FormEvent) => {
    e.preventDefault()
    setGroup(prev => ({
      ...prev,
      admin: {
        ...prev.admin,
        name: adminName,
        mobile: adminMobile,
        payoutMethod,
        upiId: payoutMethod === 'upi' ? upiId : undefined,
        bankAccount: payoutMethod === 'bank' ? bankAccount : undefined,
        ifsc: payoutMethod === 'bank' ? ifsc : undefined,
        accountHolderName: payoutMethod === 'bank' ? accName : undefined,
      }
    }))

    // Update Context user object if needed
    if (updateUser) {
      updateUser({
        name: adminName,
      })
    }

    showToast('Payout preferences saved successfully!')
  }

  const handleAddCity = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newCity.trim()) {
      e.preventDefault()
      if (!secondaryCities.includes(newCity.trim())) {
        setSecondaryCities([...secondaryCities, newCity.trim()])
      }
      setNewCity('')
    }
  }

  const handleRemoveCity = (cityToRemove: string) => {
    setSecondaryCities(secondaryCities.filter(c => c !== cityToRemove))
  }

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()])
      setNewCategory('')
      showToast('Category added to group scope')
    }
  }

  const handleRemoveCategory = (catToRemove: string) => {
    setCategories(categories.filter(c => c !== catToRemove))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">Group Profile</h1>
        <p className="text-sm text-slate-500 mt-1">Manage public group details, industry scope, and administrative payout preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Settings Panel (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-slate-100 bg-slate-50/50 px-6 pt-3">
              <TabsList className="bg-transparent flex gap-6 p-0 h-auto">
                <TabsTrigger
                  value="general"
                  className="data-[state=active]:border-terracotta data-[state=active]:text-terracotta border-b-2 border-transparent px-1 pb-3 text-xs font-semibold rounded-none bg-transparent shadow-none"
                >
                  <Building className="w-4 h-4 mr-1.5 shrink-0" />
                  General & Scope
                </TabsTrigger>
                <TabsTrigger
                  value="payout"
                  className="data-[state=active]:border-terracotta data-[state=active]:text-terracotta border-b-2 border-transparent px-1 pb-3 text-xs font-semibold rounded-none bg-transparent shadow-none"
                >
                  <Landmark className="w-4 h-4 mr-1.5 shrink-0" />
                  Payout Preferences
                </TabsTrigger>
              </TabsList>
            </div>

            {/* General Settings Content */}
            <TabsContent value="general" className="p-6 mt-0">
              <form onSubmit={handleSaveGeneral} className="space-y-6">
                {/* Logo and Name */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b border-slate-100">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-2xl bg-terracotta/10 border border-terracotta/20 flex items-center justify-center font-fraunces font-bold text-terracotta text-3xl shadow-sm relative overflow-hidden group">
                      {groupName.charAt(0)}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Upload className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">upload logo</span>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Group Display Name</label>
                      <input
                        type="text"
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Primary City</label>
                        <input
                          type="text"
                          value={group.city}
                          disabled
                          className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-lg text-sm text-slate-400 font-medium cursor-not-allowed"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Group Industry</label>
                        <input
                          type="text"
                          value={group.industry}
                          disabled
                          className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-lg text-sm text-slate-400 font-medium cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Group Description</label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta resize-none leading-relaxed"
                    placeholder="Describe the target vendors and categories in this group..."
                  />
                </div>

                {/* Cities Coverage */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Coverage Cities</label>
                  <p className="text-[11px] text-slate-400 mb-2">Secondary cities in Gujarat where your group has buyer/vendor footprint. Press Enter to add.</p>
                  <div className="flex flex-wrap gap-2 p-2 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-terracotta/20 focus-within:border-terracotta bg-white">
                    {secondaryCities.map(city => (
                      <span key={city} className="inline-flex items-center gap-1 bg-slate-100 text-ink text-xs font-medium px-2.5 py-1 rounded-md">
                        {city}
                        <button type="button" onClick={() => handleRemoveCity(city)} className="p-0.5 hover:bg-slate-200 rounded-full shrink-0 min-h-0">
                          <X className="w-3 h-3 text-slate-500" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={newCity}
                      onChange={e => setNewCity(e.target.value)}
                      onKeyDown={handleAddCity}
                      placeholder="Add city..."
                      className="border-0 p-1 text-xs focus:outline-none focus:ring-0 flex-1 min-w-[100px]"
                    />
                  </div>
                </div>

                {/* Categories Managed */}
                <div className="border-t border-slate-100 pt-5">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Product Categories</label>
                  <p className="text-[11px] text-slate-400 mb-3">Define the specific niche segments vendors in your group provide</p>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        placeholder="e.g. ERP Implementation, Managed IT"
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                      />
                      <Button
                        type="button"
                        onClick={handleAddCategory}
                        className="bg-terracotta hover:bg-terracotta/90 text-white px-4 py-2 text-xs font-semibold flex items-center gap-1.5 min-h-[36px]"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {categories.map(cat => (
                        <span key={cat} className="inline-flex items-center gap-1.5 bg-terracotta/10 border border-terracotta/20 text-terracotta text-xs font-medium px-3 py-1 rounded-full">
                          {cat}
                          <button type="button" onClick={() => handleRemoveCategory(cat)} className="p-0.5 hover:bg-terracotta/20 rounded-full shrink-0 min-h-0">
                            <X className="w-3 h-3 text-terracotta" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <div className="border-t border-slate-100 pt-5 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-terracotta hover:bg-terracotta/90 text-white font-semibold flex items-center gap-2 min-h-[40px] px-6"
                  >
                    <Save className="w-4 h-4 shrink-0" />
                    Save General Info
                  </Button>
                </div>
              </form>
            </TabsContent>

            {/* Payout Settings Content */}
            <TabsContent value="payout" className="p-6 mt-0">
              <form onSubmit={handleSavePayout} className="space-y-6">
                {/* Admin Contact Details */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Partner Contact Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Group Admin Name</label>
                      <input
                        type="text"
                        value={adminName}
                        onChange={e => setAdminName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Mobile Number</label>
                      <input
                        type="text"
                        value={adminMobile}
                        onChange={e => setAdminMobile(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Authorized Email</label>
                    <input
                      type="email"
                      value={group.admin.email}
                      disabled
                      className="w-full px-3 py-2 border border-slate-100 bg-slate-50 rounded-lg text-sm text-slate-400 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Payout Method selection */}
                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Payout Method</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 text-xs text-ink font-semibold cursor-pointer">
                        <input
                          type="radio"
                          checked={payoutMethod === 'bank'}
                          onChange={() => setPayoutMethod('bank')}
                        />
                        Direct Bank Transfer
                      </label>
                      <label className="flex items-center gap-1.5 text-xs text-ink font-semibold cursor-pointer">
                        <input
                          type="radio"
                          checked={payoutMethod === 'upi'}
                          onChange={() => setPayoutMethod('upi')}
                        />
                        UPI Transfer
                      </label>
                    </div>
                  </div>

                  {/* Dynamic inputs based on method */}
                  {payoutMethod === 'upi' ? (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1.5">UPI ID (VPA)</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={e => setUpiId(e.target.value)}
                          placeholder="e.g. rahulshah@okaxis"
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none bg-white focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                          required={payoutMethod === 'upi'}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-ink mb-1.5">Bank Account Number</label>
                        <input
                          type="text"
                          value={bankAccount}
                          onChange={e => setBankAccount(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none bg-white focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                          required={payoutMethod === 'bank'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1.5">Bank IFSC Code</label>
                        <input
                          type="text"
                          value={ifsc}
                          onChange={e => setIfsc(e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none bg-white focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                          required={payoutMethod === 'bank'}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-ink mb-1.5">Account Holder Name</label>
                        <input
                          type="text"
                          value={accName}
                          onChange={e => setAccName(e.target.value)}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none bg-white focus:ring-2 focus:ring-terracotta/20 focus:border-terracotta"
                          required={payoutMethod === 'bank'}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Save Payout */}
                <div className="border-t border-slate-100 pt-5 flex justify-end">
                  <Button
                    type="submit"
                    className="bg-terracotta hover:bg-terracotta/90 text-white font-semibold flex items-center gap-2 min-h-[40px] px-6"
                  >
                    <Save className="w-4 h-4 shrink-0" />
                    Save Payout Details
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Side: Public Preview Card & Stats (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Public Preview Card */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-2 right-2 flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
              <Eye className="w-3 h-3" /> public preview
            </div>

            <div className="space-y-4 mt-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-terracotta text-white flex items-center justify-center font-fraunces font-bold text-xl">
                  {groupName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-fraunces font-bold text-ink text-sm leading-snug">{groupName}</h4>
                  <span className="inline-flex items-center gap-1 text-[10px] text-terracotta font-bold bg-terracotta/10 border border-terracotta/20 px-1.5 py-0.5 rounded mt-0.5 uppercase tracking-wider">
                    <Globe className="w-2.5 h-2.5" /> {group.industry}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {description || 'This group has no public description added yet.'}
              </p>

              <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-500 font-semibold">
                <div className="flex justify-between">
                  <span>Coverage:</span>
                  <span className="text-ink">{group.city}{secondaryCities.length > 0 ? `, ${secondaryCities.join(', ')}` : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Vendors:</span>
                  <span className="text-ink">{group.vendorCount} Vendors</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Buyers:</span>
                  <span className="text-ink">{group.buyerCount} Buyers</span>
                </div>
              </div>
            </div>

            <div className="bg-terracotta/10 border border-terracotta/20 rounded-xl p-3.5 mt-4 text-[11px] text-terracotta leading-relaxed flex gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-terracotta shrink-0 mt-0.5" />
              <p>
                This group admin profile is managed and verified under partner ID <strong>{group.admin.id}</strong>.
              </p>
            </div>
          </div>

          {/* Partner Earnings Statement Card */}
          <div className="bg-gradient-to-br from-ink to-charcoal text-white rounded-2xl p-5 shadow-md flex flex-col justify-between min-h-[180px]">
            <div>
              <p className="text-[10px] uppercase font-bold text-cream tracking-wider">Partner commission rate</p>
              <h3 className="text-3xl font-fraunces font-bold mt-1">{group.commissionRate}%</h3>
              <p className="text-[11px] text-cream/80 mt-1">earned on all subscriptions from active group vendors</p>
            </div>
            <div className="border-t border-cream/20 pt-4 flex justify-between items-center text-xs">
              <div>
                <p className="text-cream/70 font-medium">Total Earned</p>
                <p className="text-sm font-bold font-fraunces mt-0.5">{formatIndianCurrency(group.admin.totalEarned)}</p>
              </div>
              <div className="text-right">
                <p className="text-cream/70 font-medium">Pending Payout</p>
                <p className="text-sm font-bold font-fraunces mt-0.5">{formatIndianCurrency(group.admin.pendingPayout)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
