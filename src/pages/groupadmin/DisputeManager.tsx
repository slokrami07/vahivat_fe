import * as React from 'react'
import { mockDisputes } from '@/lib/mockData'
import type { DisputeData } from '@/lib/roles'
import { StatusBadge } from '@/components/admin/StatusBadge'
import { ConfirmModal } from '@/components/admin/ConfirmModal'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/Toast'
import {
  AlertTriangle, Calendar, User, Scale, CheckCircle2,
  Clock, Plus, MessageSquare, ChevronRight, CornerDownRight
} from 'lucide-react'
import { formatIndianDate } from '@/lib/commission'

export function DisputeManager() {
  const { showToast } = useToast()
  const [disputes, setDisputes] = React.useState<DisputeData[]>(mockDisputes)
  const [selectedDisputeId, setSelectedDisputeId] = React.useState<string>(mockDisputes[0]?.id || '')
  const [activeTab, setActiveTab] = React.useState('all')
  const [newNote, setNewNote] = React.useState('')

  // Modals state
  const [resolveModalOpen, setResolveModalOpen] = React.useState(false)
  const [escalateModalOpen, setEscalateModalOpen] = React.useState(false)
  const [resolvedInFavourOf, setResolvedInFavourOf] = React.useState<'buyer' | 'vendor'>('buyer')

  // Find active dispute
  const selectedDispute = disputes.find(d => d.id === selectedDisputeId)

  // Filter disputes
  const filteredDisputes = disputes.filter(d => {
    if (activeTab === 'all') return true
    return d.status === activeTab
  })

  // Set default selection when tab changes
  React.useEffect(() => {
    if (filteredDisputes.length > 0) {
      const exists = filteredDisputes.some(d => d.id === selectedDisputeId)
      if (!exists) {
        setSelectedDisputeId(filteredDisputes[0].id)
      }
    }
  }, [activeTab])

  // Handle Add Note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim() || !selectedDispute) return

    const updated = disputes.map(d => {
      if (d.id === selectedDispute.id) {
        const adminNotes = d.adminNotes ? [...d.adminNotes] : []
        adminNotes.push(newNote)
        const timeline = d.timeline ? [...d.timeline] : []
        timeline.push({
          date: new Date().toISOString().split('T')[0],
          event: `Admin Note added: "${newNote}"`,
        })
        return { ...d, adminNotes, timeline }
      }
      return d
    })

    setDisputes(updated)
    setNewNote('')
    showToast('Admin note added successfully')
  }

  // Handle Dispute Resolution
  const handleResolveConfirm = (inputValue?: string) => {
    if (!selectedDispute) return
    const updated = disputes.map(d => {
      if (d.id === selectedDispute.id) {
        const timeline = d.timeline ? [...d.timeline] : []
        timeline.push({
          date: new Date().toISOString().split('T')[0],
          event: `Dispute resolved in favour of ${resolvedInFavourOf}`,
        })
        return {
          ...d,
          status: 'resolved' as const,
          resolvedInFavourOf,
          resolutionNote: inputValue || `Resolved in favour of ${resolvedInFavourOf}.`,
          timeline,
        }
      }
      return d
    })

    setDisputes(updated)
    setResolveModalOpen(false)
    showToast(`Dispute #${selectedDispute.id} marked as Resolved`)
  }

  // Handle Dispute Escalation
  const handleEscalateConfirm = (inputValue?: string) => {
    if (!selectedDispute) return
    const updated = disputes.map(d => {
      if (d.id === selectedDispute.id) {
        const timeline = d.timeline ? [...d.timeline] : []
        timeline.push({
          date: new Date().toISOString().split('T')[0],
          event: `Dispute escalated to Superadmin. Reason: ${inputValue || 'No reason provided'}`,
        })
        return {
          ...d,
          status: 'escalated' as const,
          timeline,
        }
      }
      return d
    })

    setDisputes(updated)
    setEscalateModalOpen(false)
    showToast(`Dispute #${selectedDispute.id} escalated to Superadmin`)
  }

  const openCount = disputes.filter(d => d.status === 'open').length
  const resolvedCount = disputes.filter(d => d.status === 'resolved').length
  const escalatedCount = disputes.filter(d => d.status === 'escalated').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-fraunces font-bold text-ink">Dispute Manager</h1>
        <p className="text-sm text-slate-500 mt-1">Mediate, resolve, or escalate buyer-vendor disputes in your group</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Open Disputes</p>
            <p className="text-xl font-fraunces font-bold text-ink mt-0.5">{openCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Resolved disputes</p>
            <p className="text-xl font-fraunces font-bold text-ink mt-0.5">{resolvedCount}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4 shadow-sm">
          <div className="p-3 rounded-xl bg-red-50 text-red-600">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Escalated to Super</p>
            <p className="text-xl font-fraunces font-bold text-ink mt-0.5">{escalatedCount}</p>
          </div>
        </div>
      </div>

      {/* Main split dashboard layout */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
          <TabsList className="bg-slate-100/80 p-0.5 rounded-lg border border-slate-200">
            <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-ink text-xs font-semibold px-4 py-1.5 rounded-md">All ({disputes.length})</TabsTrigger>
            <TabsTrigger value="open" className="data-[state=active]:bg-white data-[state=active]:text-ink text-xs font-semibold px-4 py-1.5 rounded-md">Open ({openCount})</TabsTrigger>
            <TabsTrigger value="resolved" className="data-[state=active]:bg-white data-[state=active]:text-ink text-xs font-semibold px-4 py-1.5 rounded-md">Resolved ({resolvedCount})</TabsTrigger>
            <TabsTrigger value="escalated" className="data-[state=active]:bg-white data-[state=active]:text-ink text-xs font-semibold px-4 py-1.5 rounded-md">Escalated ({escalatedCount})</TabsTrigger>
          </TabsList>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
          {/* Left panel: Disputes List */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-ink text-sm">Disputes Queue</h3>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 max-h-[600px]">
              {filteredDisputes.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-sm">No disputes found for this filter.</div>
              ) : (
                filteredDisputes.map(d => (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDisputeId(d.id)}
                    className={`p-4 cursor-pointer hover:bg-slate-50/50 transition-colors flex justify-between items-start gap-4 relative ${
                      selectedDisputeId === d.id ? 'bg-teal-50/40 border-l-4 border-teal-500 pl-3' : ''
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-500">#{d.id}</span>
                        <StatusBadge status={d.status} />
                      </div>
                      <p className="text-sm font-semibold text-ink leading-snug">
                        {d.filerName} vs {d.againstName}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                        <Calendar className="w-3 h-3" />
                        Opened: {formatIndianDate(d.dateOpened)}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right panel: Selected Dispute Details */}
          <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl shadow-sm p-6 space-y-6 flex flex-col justify-between">
            {selectedDispute ? (
              <div className="space-y-6">
                {/* Dispute Title / Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-slate-400 uppercase">Dispute #{selectedDispute.id}</span>
                      <StatusBadge status={selectedDispute.status} />
                    </div>
                    <h2 className="text-lg font-fraunces font-bold text-ink">
                      {selectedDispute.filerName} <span className="text-sm font-normal text-slate-400">vs</span> {selectedDispute.againstName}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Filer Role: <span className="font-semibold capitalize text-teal-700">{selectedDispute.filedBy}</span> · Deal Reference: <span className="font-medium font-mono bg-slate-50 px-1.5 py-0.5 rounded text-ink">{selectedDispute.dealId}</span>
                    </p>
                  </div>
                  {selectedDispute.status === 'open' && (
                    <div className="flex flex-col gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 w-full md:w-auto">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Resolve in favour of:</span>
                      <div className="flex gap-3">
                        <label className="flex items-center gap-1.5 text-xs text-ink cursor-pointer">
                          <input
                            type="radio"
                            name="favour"
                            checked={resolvedInFavourOf === 'buyer'}
                            onChange={() => setResolvedInFavourOf('buyer')}
                          />
                          Buyer
                        </label>
                        <label className="flex items-center gap-1.5 text-xs text-ink cursor-pointer">
                          <input
                            type="radio"
                            name="favour"
                            checked={resolvedInFavourOf === 'vendor'}
                            onChange={() => setResolvedInFavourOf('vendor')}
                          />
                          Vendor
                        </label>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Button
                          onClick={() => setResolveModalOpen(true)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 min-h-[32px] flex-1 md:flex-none"
                        >
                          Resolve
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEscalateModalOpen(true)}
                          className="border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold px-3 py-1.5 min-h-[32px] flex-1 md:flex-none"
                        >
                          Escalate
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Dispute Description</h4>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-ink leading-relaxed">
                    <p className="font-semibold text-xs text-slate-500 mb-1">Reason: {selectedDispute.reason.replace(/_/g, ' ').toUpperCase()}</p>
                    {selectedDispute.description}
                  </div>
                </div>

                {/* Resolution Details (if resolved) */}
                {selectedDispute.status === 'resolved' && (
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
                    <div className="flex gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold text-emerald-800">Resolution Details</h4>
                        <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                          Resolved in favour of: <strong className="capitalize">{selectedDispute.resolvedInFavourOf}</strong>.
                        </p>
                        {selectedDispute.resolutionNote && (
                          <p className="text-xs text-emerald-800 mt-2 bg-white/70 p-2.5 rounded border border-emerald-100 italic leading-relaxed">
                            "{selectedDispute.resolutionNote}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Event Timeline</h4>
                  <div className="space-y-4">
                    {selectedDispute.timeline?.map((evt, idx) => (
                      <div key={idx} className="flex gap-3 text-xs leading-relaxed">
                        <div className="flex flex-col items-center">
                          <div className="w-2.5 h-2.5 rounded-full bg-teal-500 mt-1 shrink-0" />
                          {idx !== (selectedDispute.timeline?.length || 0) - 1 && (
                            <div className="w-0.5 h-full bg-slate-100 min-h-[20px]" />
                          )}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-400">{formatIndianDate(evt.date)}</span>
                          <p className="text-ink mt-0.5">{evt.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Admin notes section */}
                <div className="border-t border-slate-100 pt-5 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Admin Mediation Notes</h4>
                  {selectedDispute.adminNotes && selectedDispute.adminNotes.length > 0 ? (
                    <div className="space-y-2">
                      {selectedDispute.adminNotes.map((note, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                          <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <p className="text-ink leading-relaxed">{note}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No admin notes have been added yet.</p>
                  )}

                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      value={newNote}
                      onChange={e => setNewNote(e.target.value)}
                      placeholder="Add confidential admin note..."
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                    <Button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 text-xs font-semibold flex items-center gap-1.5 min-h-[36px]"
                    >
                      <Plus className="w-3.5 h-3.5" /> Note
                    </Button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 h-full">
                <AlertTriangle className="w-12 h-12 text-slate-300 mb-3" />
                <h3 className="font-fraunces font-bold text-ink text-lg">No Dispute Selected</h3>
                <p className="text-slate-400 text-sm mt-1">Select a dispute from the list to manage and mediate.</p>
              </div>
            )}
          </div>
        </div>
      </Tabs>

      {/* Resolve Confirm Modal */}
      {selectedDispute && (
        <ConfirmModal
          open={resolveModalOpen}
          title={`Resolve Dispute #${selectedDispute.id}`}
          message={`Please specify the resolution outcome for the dispute between ${selectedDispute.filerName} and ${selectedDispute.againstName}. (Resolved in favour of: ${resolvedInFavourOf})`}
          confirmLabel="Mark Resolved"
          confirmVariant="primary"
          onCancel={() => setResolveModalOpen(false)}
          onConfirm={handleResolveConfirm}
          inputLabel="Resolution Note & Agreements"
          inputPlaceholder="Explain the agreement, replacements, discounts, or settlements reached..."
          inputRequired={true}
        />
      )}

      {/* Escalate Confirm Modal */}
      {selectedDispute && (
        <ConfirmModal
          open={escalateModalOpen}
          title={`Escalate Dispute #${selectedDispute.id}`}
          message="Are you sure you want to escalate this dispute to Superadmin? This will forward the dispute logs for final arbitration."
          confirmLabel="Escalate Dispute"
          confirmVariant="danger"
          inputLabel="Escalation Reason / Notes"
          inputPlaceholder="Provide context on why mediation failed at the Group level..."
          inputRequired={true}
          onCancel={() => setEscalateModalOpen(false)}
          onConfirm={handleEscalateConfirm}
        />
      )}
    </div>
  )
}
