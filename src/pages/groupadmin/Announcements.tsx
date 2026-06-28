import * as React from 'react'
import { mockAnnouncements } from '@/lib/mockData'
import type { AnnouncementData } from '@/lib/roles'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { useToast } from '@/components/Toast'
import { Button } from '@/components/ui/button'
import { formatIndianDate } from '@/lib/commission'
import {
  Megaphone, Send, Calendar, Users, MessageSquare,
  Globe2, CheckCircle2, AlertCircle, Eye, Share2
} from 'lucide-react'

export function Announcements() {
  const { showToast } = useToast()
  const [announcements, setAnnouncements] = React.useState<AnnouncementData[]>(mockAnnouncements)

  // Form state
  const [message, setMessage] = React.useState('')
  const [targetAudience, setTargetAudience] = React.useState<'all' | 'vendors' | 'buyers'>('all')
  const [language, setLanguage] = React.useState<'en' | 'gu' | 'hi'>('en')
  const [deliveryChannel, setDeliveryChannel] = React.useState<'in_app' | 'whatsapp' | 'both'>('in_app')
  const [scheduleType, setScheduleType] = React.useState<'now' | 'later'>('now')
  const [scheduleDate, setScheduleDate] = React.useState('')

  const maxChars = 300
  const charCount = message.length
  const charsLeft = maxChars - charCount

  const handleCompose = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    if (charCount > maxChars) {
      showToast('Message exceeds maximum character limit', 'error')
      return
    }

    const newAnn: AnnouncementData = {
      id: `ann_0${announcements.length + 1}`,
      message,
      targetAudience,
      language,
      deliveryChannel,
      sentDate: scheduleType === 'now' ? new Date().toISOString() : scheduleDate || new Date().toISOString(),
      status: scheduleType === 'now' ? 'sent' : 'scheduled',
      deliveredCount: scheduleType === 'now' ? 120 : 0, // Mock delivered
      openedCount: 0,
    }

    setAnnouncements([newAnn, ...announcements])
    setMessage('')
    setScheduleDate('')
    setScheduleType('now')
    showToast(scheduleType === 'now' ? 'Announcement broadcasted successfully!' : 'Announcement scheduled successfully!')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">Announcements</h1>
        <p className="text-sm text-slate-500 mt-1">Compose broadcast messages and send announcements to vendors and buyers in your group</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Compose Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6">
            <h3 className="font-fraunces font-bold text-ink text-base mb-4 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-teal-600" />
              Compose Broadcast
            </h3>

            <form onSubmit={handleCompose} className="space-y-5">
              {/* Target Audience */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Target Audience</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'all', label: 'Everyone', icon: Users },
                    { id: 'vendors', label: 'Vendors Only', icon: Users },
                    { id: 'buyers', label: 'Buyers Only', icon: Users },
                  ].map((aud) => (
                    <button
                      key={aud.id}
                      type="button"
                      onClick={() => setTargetAudience(aud.id as any)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                        targetAudience === aud.id
                          ? 'bg-teal-50 border-teal-500 text-teal-700'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <aud.icon className="w-4 h-4 mb-1 shrink-0" />
                      {aud.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Message Content</label>
                  <span className={`text-[11px] font-medium ${charsLeft < 0 ? 'text-red-500 font-bold' : charsLeft < 30 ? 'text-amber-500 font-bold' : 'text-slate-400'}`}>
                    {charsLeft} chars left
                  </span>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 resize-none ${
                    charsLeft < 0
                      ? 'border-red-400 focus:ring-red-200 focus:border-red-500'
                      : 'border-slate-200 focus:ring-teal-500/20 focus:border-teal-500'
                  }`}
                />
              </div>

              {/* Language + Channel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    <option value="en">🇬🇧 English</option>
                    <option value="gu">🇮🇳 Gujarati (ગુજરાતી)</option>
                    <option value="hi">🇮🇳 Hindi (हिन्दी)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Delivery Channel</label>
                  <select
                    value={deliveryChannel}
                    onChange={(e) => setDeliveryChannel(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    <option value="in_app">📱 In-App Notification Only</option>
                    <option value="whatsapp">💬 WhatsApp Message Only</option>
                    <option value="both">🌟 Both (In-App & WhatsApp)</option>
                  </select>
                </div>
              </div>

              {/* Scheduling */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Delivery Schedule</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-ink font-medium cursor-pointer">
                      <input
                        type="radio"
                        checked={scheduleType === 'now'}
                        onChange={() => setScheduleType('now')}
                      />
                      Send Immediately
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-ink font-medium cursor-pointer">
                      <input
                        type="radio"
                        checked={scheduleType === 'later'}
                        onChange={() => setScheduleType('later')}
                      />
                      Schedule for later
                    </label>
                  </div>
                </div>

                {scheduleType === 'later' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1.5">Pick Date & Time</label>
                    <div className="flex gap-2">
                      <input
                        type="datetime-local"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 flex-1"
                        required
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={charCount === 0 || charsLeft < 0}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Send className="w-4 h-4 shrink-0" />
                {scheduleType === 'now' ? 'Broadcast Message Now' : 'Schedule Broadcast'}
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Broadcast History & Live Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Mobile Notification Preview */}
          <div className="bg-slate-900 text-white rounded-2xl shadow-xl p-5 border border-slate-800 flex flex-col gap-3 relative overflow-hidden h-[240px]">
            <div className="absolute top-1 right-2 text-[10px] text-slate-500 uppercase tracking-widest font-mono">live preview</div>
            <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1"><Share2 className="w-3.5 h-3.5" /> preview</span>
              <span>{deliveryChannel === 'whatsapp' ? 'WhatsApp Notification' : 'In-App Banner'}</span>
            </div>

            {deliveryChannel === 'whatsapp' ? (
              <div className="bg-[#e5ddd5] p-3 rounded-lg flex flex-col gap-1 shadow border border-slate-200 mt-2 text-ink max-w-[280px] self-start relative">
                <div className="text-[11px] font-bold text-terracotta">Vahiવટ Admin</div>
                <p className="text-xs leading-normal whitespace-pre-wrap">
                  {message || 'Type message in the editor to see preview...'}
                </p>
                <span className="text-[9px] text-slate-400 self-end mt-1">12:00 PM</span>
              </div>
            ) : (
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 flex gap-3 items-start mt-4 max-w-[340px]">
                <Megaphone className="w-5 h-5 text-terracotta shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-terracotta">Platform Broadcast</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-normal">
                    {message || 'Type message in the editor to see preview...'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Past Broadcast History */}
          <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 space-y-4">
            <h3 className="font-fraunces font-bold text-ink text-base">Broadcast Logs</h3>
            <div className="space-y-3.5 overflow-y-auto max-h-[300px] pr-1">
              {announcements.map((ann) => (
                <div key={ann.id} className="bg-slate-50/70 hover:bg-slate-50 border border-slate-100 rounded-xl p-4 transition-colors space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-400">#{ann.id.toUpperCase()}</span>
                    <StatusBadge status={ann.status} />
                  </div>
                  <p className="text-xs text-ink font-medium leading-relaxed line-clamp-2">
                    {ann.message}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 font-semibold border-t border-slate-100 pt-2">
                    <span className="flex items-center gap-1 capitalize"><Users className="w-3.5 h-3.5" /> {ann.targetAudience}</span>
                    <span className="flex items-center gap-1 uppercase"><Globe2 className="w-3.5 h-3.5" /> {ann.language}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatIndianDate(ann.sentDate.split('T')[0])}</span>
                  </div>
                  {ann.status === 'sent' && (
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 bg-white/70 px-2.5 py-1.5 rounded-lg border border-slate-100 mt-1">
                      <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> Delivered: {ann.deliveredCount}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3 text-teal-500" /> Opened: {ann.openedCount || 0}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
