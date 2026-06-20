import * as React from "react"
import { usePerspective } from "@/context/PerspectiveContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Clock, Users, Activity, CheckCircle2 } from "lucide-react"

export function Dashboard() {
  const { perspective } = usePerspective()

  if (perspective === "buyer") {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-fraunces font-bold tracking-tight text-ink">Dashboard Overview</h1>
          <p className="text-charcoal">Monitor your active requests and incoming vendor proposals.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active RFPs</CardTitle>
              <Activity className="h-4 w-4 text-terracotta" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-terracotta">12</div>
              <p className="text-xs text-charcoal/80 flex items-center gap-1 mt-1">
                <ArrowUpRight className="h-3 w-3 text-emerald-500" /> <span className="text-emerald-500 font-medium">+2</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proposals Received</CardTitle>
              <FileTextIcon className="h-4 w-4 text-charcoal/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ink">48</div>
              <p className="text-xs text-charcoal/80 mt-1">14 awaiting review</p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Interviews</CardTitle>
              <Users className="h-4 w-4 text-charcoal/60" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-ink">5</div>
              <p className="text-xs text-charcoal/80 mt-1">Next: TechNova at 2:00 PM</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bids Waiting Approval</CardTitle>
            <CardDescription>Review the latest submissions from verified vendors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col divide-y divide-slate-100">
              {[
                { vendor: "TechNova Agency", project: "E-Commerce Replatforming", amount: "$45,000", time: "2 hours ago", status: "Pending" },
                { vendor: "SysOps Hardware Supply", project: "Q3 Employee Laptops", amount: "$120,500", time: "5 hours ago", status: "Pending" },
                { vendor: "CloudScale Partners", project: "AWS Migration", amount: "$85,000", time: "1 day ago", status: "Pending" },
              ].map((bid, i) => (
                <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-ink">{bid.project}</span>
                    <span className="text-sm text-charcoal/80">{bid.vendor} • {bid.time}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-ink">{bid.amount}</span>
                    <Badge variant="secondary" className="bg-marigold/20 text-marigold border-none">
                      <Clock className="mr-1 h-3 w-3" /> {bid.status}
                    </Badge>
                    <Button size="sm" className="bg-white border border-slate-200 text-charcoal hover:bg-cream hover:text-ink">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Vendor View
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-fraunces font-bold tracking-tight text-ink">Vendor Dashboard</h1>
        <p className="text-charcoal">Track your proposals and discover new opportunities.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tech Opportunities</CardTitle>
            <ZapIcon className="h-4 w-4 text-terracotta" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-terracotta">156</div>
            <p className="text-xs text-charcoal/80 flex items-center gap-1 mt-1">
              <span className="text-terracotta font-medium">12 new</span> matches today
            </p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Proposals Submitted</CardTitle>
            <FileTextIcon className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ink">24</div>
            <p className="text-xs text-charcoal/80 mt-1">3 currently shortlisted</p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pipeline Value</CardTitle>
            <DollarSignIcon className="h-4 w-4 text-charcoal/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ink">$1.2M</div>
            <p className="text-xs text-charcoal/80 mt-1">Active bids in negotiation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Proposal Statuses</CardTitle>
          <CardDescription>Updates on your recent bids and active negotiations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col divide-y divide-slate-100">
            {[
              { client: "Acme Corp", project: "E-Commerce Replatforming", status: "Shortlisted", date: "Oct 24", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
              { client: "Global Industries", project: "ERP Implementation", status: "Under Review", date: "Oct 22", icon: Clock, color: "text-marigold", bg: "bg-marigold/20" },
              { client: "Stark Logistics", project: "Mobile App Development", status: "In Negotiation", date: "Oct 15", icon: Activity, color: "text-terracotta", bg: "bg-terracotta/10" },
            ].map((prop, i) => (
              <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${prop.bg}`}>
                    <prop.icon className={`h-5 w-5 ${prop.color}`} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-ink">{prop.project}</span>
                    <span className="text-sm text-charcoal/80">{prop.client} • Submitted {prop.date}</span>
                  </div>
                </div>
                <Button size="sm" className="bg-white border border-slate-200 text-charcoal hover:bg-cream hover:text-ink">View Details</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>
    </svg>
  )
}

function ZapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  )
}

function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  )
}
