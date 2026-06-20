import * as React from "react"
import { usePerspective } from "@/context/PerspectiveContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

const MOCK_PROPOSALS = [
  { id: "PRP-001", project: "E-Commerce Replatforming", client: "Acme Corp", amount: "$45,000", date: "Oct 24, 2023", status: "Shortlisted" },
  { id: "PRP-002", project: "ERP Implementation", client: "Global Industries", amount: "$120,500", date: "Oct 22, 2023", status: "Pending Review" },
  { id: "PRP-003", project: "Mobile App Development", client: "Stark Logistics", amount: "$85,000", date: "Oct 15, 2023", status: "Meeting Scheduled" },
  { id: "PRP-004", project: "Cloud Migration", client: "Wayne Enterprises", amount: "$55,000", date: "Oct 01, 2023", status: "Declined" },
  { id: "PRP-005", project: "Security Audit", client: "CyberDyne Systems", amount: "$20,000", date: "Sep 28, 2023", status: "Shortlisted" },
  { id: "PRP-006", project: "UI/UX Redesign", client: "Acme Corp", amount: "$30,000", date: "Sep 15, 2023", status: "Pending Review" },
]

export function RFPs() {
  const { perspective } = usePerspective()
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredProposals = MOCK_PROPOSALS.filter(p => 
    p.project.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Pending Review": return <Badge variant="secondary" className="bg-marigold/20 text-marigold border-marigold/30">Pending Review</Badge>
      case "Shortlisted": return <Badge variant="secondary" className="bg-terracotta/20 text-terracotta border-terracotta/30">Shortlisted</Badge>
      case "Meeting Scheduled": return <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">Meeting Scheduled</Badge>
      case "Declined": return <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">Declined</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-fraunces font-bold tracking-tight text-ink">Active RFPs & Bids</h1>
        <p className="text-charcoal">
          {perspective === "buyer" 
            ? "Manage your active Requests for Proposals and evaluate incoming bids." 
            : "Track the status of your submitted proposals and active bids."}
        </p>
      </div>

      <Card className="flex flex-col bg-white">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="font-fraunces text-ink">Sent Proposals</CardTitle>
              <CardDescription className="text-charcoal/80">A comprehensive list of all your submitted bids.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/70" />
                <Input 
                  type="search" 
                  placeholder="Search projects or clients..." 
                  className="pl-9 bg-cream border-transparent focus-visible:ring-terracotta text-ink rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" title="Filter options" className="rounded-full text-charcoal border-slate-200 hover:bg-cream hover:text-ink">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-charcoal bg-slate-50 border-b border-slate-100 uppercase font-semibold">
              <tr>
                <th className="px-6 py-3">Project Name</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Bid Amount</th>
                <th className="px-6 py-3">Submitted Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.length > 0 ? (
                filteredProposals.map((prop) => (
                  <tr key={prop.id} className="border-b border-slate-100 last:border-0 hover:bg-cream/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-ink">{prop.project}</td>
                    <td className="px-6 py-4 text-charcoal/80">{prop.client}</td>
                    <td className="px-6 py-4 font-semibold text-ink">{prop.amount}</td>
                    <td className="px-6 py-4 text-charcoal/80">{prop.date}</td>
                    <td className="px-6 py-4">{getStatusBadge(prop.status)}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-charcoal hover:text-ink hover:bg-cream rounded-full">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-charcoal">
                    No proposals found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
