import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/Toast'
import { PLANS, formatIndianCurrency } from '@/lib/commission'
import { generateSecurePassword, generateCredentialMessage, generateWhatsAppUrl, ADMIN_NOTIFICATIONS } from '@/lib/notifications'
import { ArrowLeft, ArrowRight, Check, Copy, Send, Upload } from 'lucide-react'

const INDUSTRIES = ['IT', 'Textile', 'Pharma', 'Construction', 'FMCG', 'Manufacturing', 'Healthcare', 'Education', 'Other']
const CITIES = ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Gandhinagar', 'Jamnagar', 'Junagadh', 'Anand', 'Mehsana']

interface GroupForm {
  groupName: string
  industry: string
  city: string
  secondaryCities: string[]
  description: string
  logo: string | null
  adminName: string
  adminMobile: string
  adminEmail: string
  commissionRate: number
  payoutMethod: 'bank' | 'upi'
  bankAccount: string
  ifsc: string
  accountHolderName: string
  upiId: string
}

const defaultForm: GroupForm = {
  groupName: '', industry: 'IT', city: 'Ahmedabad', secondaryCities: [], description: '',
  logo: null, adminName: '', adminMobile: '', adminEmail: '', commissionRate: 20,
  payoutMethod: 'upi', bankAccount: '', ifsc: '', accountHolderName: '', upiId: '',
}

export function CreateGroup() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [step, setStep] = React.useState(1)
  const [form, setForm] = React.useState<GroupForm>(defaultForm)
  const [credentials, setCredentials] = React.useState<{ mobile: string; password: string } | null>(null)
  const [copied, setCopied] = React.useState(false)

  const update = (field: keyof GroupForm, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const livePreview = () => {
    const planPrice = PLANS.pro.price
    const monthly = (50 * planPrice * form.commissionRate) / 100
    return formatIndianCurrency(monthly)
  }

  const handleGenerate = () => {
    const code = form.groupName.replace(/\s/g, '').substring(0, 3)
    const password = generateSecurePassword(code)
    setCredentials({ mobile: form.adminMobile, password })
    showToast(ADMIN_NOTIFICATIONS.GROUP_CREATED(form.groupName))
  }

  const handleCopy = () => {
    if (!credentials) return
    const text = `Login URL: vahiવટ.in/admin/login\nMobile: +91 ${credentials.mobile}\nPassword: ${credentials.password}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleWhatsApp = () => {
    if (!credentials) return
    const msg = generateCredentialMessage(form.adminName, credentials.mobile, credentials.password)
    const url = generateWhatsAppUrl(credentials.mobile, msg)
    window.open(url, '_blank')
  }

  const canProceedStep1 = form.groupName && form.industry && form.city
  const canProceedStep2 = form.adminName && form.adminMobile && form.adminEmail && form.commissionRate &&
    (form.payoutMethod === 'upi' ? form.upiId : (form.bankAccount && form.ifsc && form.accountHolderName))

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/superadmin/groups')} className="p-2 rounded-lg hover:bg-slate-100 min-h-0">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <div>
          <h1 className="text-2xl font-fraunces font-bold text-ink">Create New Group</h1>
          <p className="text-sm text-slate-500">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex gap-2">
        {[1, 2, 3].map(s => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? 'bg-terracotta' : 'bg-slate-200'}`} />
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm">
        {/* Step 1 — Group Details */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-fraunces font-semibold text-ink">Group Details</h2>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Group Name *</label>
              <input
                value={form.groupName}
                onChange={e => update('groupName', e.target.value)}
                placeholder="e.g. IT Ahmedabad"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Industry Vertical *</label>
                <select
                  value={form.industry}
                  onChange={e => update('industry', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                >
                  {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Primary City *</label>
                <select
                  value={form.city}
                  onChange={e => update('city', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                >
                  {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Secondary Cities</label>
              <div className="flex flex-wrap gap-2">
                {CITIES.filter(c => c !== form.city).map(c => (
                  <button
                    key={c}
                    onClick={() => {
                      const s = form.secondaryCities.includes(c)
                        ? form.secondaryCities.filter(x => x !== c)
                        : [...form.secondaryCities, c]
                      update('secondaryCities', s)
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors min-h-0 ${
                      form.secondaryCities.includes(c)
                        ? 'bg-terracotta/10 border-terracotta/30 text-terracotta'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={e => update('description', e.target.value)}
                placeholder="Shown on the group's public page"
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Group Logo</label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-terracotta/30 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Click to upload or drag and drop</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setStep(2)} disabled={!canProceedStep1} className="gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2 — Admin Details */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-fraunces font-semibold text-ink">Group Admin Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Full Name *</label>
                <input
                  value={form.adminName}
                  onChange={e => update('adminName', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">Mobile Number *</label>
                <div className="flex">
                  <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg text-sm text-slate-500">+91</span>
                  <input
                    value={form.adminMobile}
                    onChange={e => update('adminMobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    className="w-full px-3 py-2.5 rounded-r-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Email *</label>
              <input
                type="email"
                value={form.adminEmail}
                onChange={e => update('adminEmail', e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">
                Commission Rate % *
              </label>
              <input
                type="number"
                min={5}
                max={40}
                value={form.commissionRate}
                onChange={e => update('commissionRate', Number(e.target.value))}
                className="w-32 px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
              />
              <div className="mt-3 p-3 bg-terracotta/10 rounded-lg border border-terracotta/20 text-terracotta">
                <p className="text-sm font-semibold">
                  💰 At {formatIndianCurrency(PLANS.pro.price)}/month per vendor, with 50 vendors, this admin earns <strong>{livePreview()}/month</strong>
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink mb-1.5">Payout Method *</label>
              <div className="flex gap-3">
                {(['upi', 'bank'] as const).map(method => (
                  <button
                    key={method}
                    onClick={() => update('payoutMethod', method)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors min-h-[40px] ${
                      form.payoutMethod === method
                        ? 'bg-terracotta/10 border-terracotta/30 text-terracotta'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {method === 'upi' ? 'UPI' : 'Bank Transfer'}
                  </button>
                ))}
              </div>
            </div>

            {form.payoutMethod === 'upi' ? (
              <div>
                <label className="block text-sm font-medium text-ink mb-1.5">UPI ID *</label>
                <input
                  value={form.upiId}
                  onChange={e => update('upiId', e.target.value)}
                  placeholder="name@upi"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-ink mb-1.5">Account Number *</label>
                  <input value={form.bankAccount} onChange={e => update('bankAccount', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">IFSC *</label>
                    <input value={form.ifsc} onChange={e => update('ifsc', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink mb-1.5">Account Holder *</label>
                    <input value={form.accountHolderName} onChange={e => update('accountHolderName', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <Button onClick={() => setStep(3)} disabled={!canProceedStep2} className="gap-2">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — Review & Generate */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-fraunces font-semibold text-ink">Review & Generate</h2>

            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200 overflow-hidden">
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/50">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Group Name</p>
                  <p className="text-sm text-ink font-medium mt-0.5">{form.groupName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Industry</p>
                  <p className="text-sm text-ink font-medium mt-0.5">{form.industry}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">City</p>
                  <p className="text-sm text-ink mt-0.5">{form.city}{form.secondaryCities.length > 0 && ` + ${form.secondaryCities.join(', ')}`}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Commission Rate</p>
                  <p className="text-sm text-ink font-medium mt-0.5">{form.commissionRate}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50/50">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Admin Name</p>
                  <p className="text-sm text-ink mt-0.5">{form.adminName}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Mobile</p>
                  <p className="text-sm text-ink mt-0.5">+91 {form.adminMobile}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Email</p>
                  <p className="text-sm text-ink mt-0.5">{form.adminEmail}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium">Payout</p>
                  <p className="text-sm text-ink mt-0.5">{form.payoutMethod === 'upi' ? `UPI: ${form.upiId}` : `Bank: ****${form.bankAccount.slice(-4)}`}</p>
                </div>
              </div>
            </div>

            {!credentials ? (
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} className="gap-2">
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button onClick={handleGenerate} className="gap-2">
                  <Check className="w-4 h-4" /> Generate Credentials
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Credential card */}
                <div className="bg-gradient-to-br from-ink to-slate-800 rounded-xl p-6 text-white">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-4">
                    Group Admin Login Credentials
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-white/50">Login URL</p>
                      <p className="text-sm font-mono">vahiવટ.in/admin/login</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Mobile</p>
                      <p className="text-sm font-mono">+91 {credentials.mobile}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Password</p>
                      <p className="text-sm font-mono">{credentials.password}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors min-h-[40px]"
                    >
                      <Copy className="w-4 h-4" />
                      {copied ? 'Copied!' : 'Copy All'}
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium transition-colors min-h-[40px]"
                    >
                      <Send className="w-4 h-4" />
                      Send via WhatsApp
                    </button>
                  </div>
                </div>

                <Button
                  onClick={() => navigate('/superadmin/groups')}
                  variant="outline"
                  className="w-full"
                >
                  Done — Back to Groups
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
