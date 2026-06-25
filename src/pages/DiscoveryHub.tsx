import * as React from "react"
import { useTranslation } from "react-i18next"
import { usePerspective } from "@/context/PerspectiveContext"
import { VendorTrustCard } from "@/components/VendorTrustCard"
import { VendorStatus } from "@/components/VendorStatus"
import { EmptyState } from "@/components/EmptyState"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code2, Filter, Search, X, Send, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"

export function DiscoveryHub() {
  const { perspective } = usePerspective()
  const { t } = useTranslation()
  
  // Vendor State
  const [activeFilter, setActiveFilter] = React.useState("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedOpportunity, setSelectedOpportunity] = React.useState<any>(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const openProposalDrawer = (opp: any) => {
    setSelectedOpportunity(opp)
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setTimeout(() => setSelectedOpportunity(null), 300)
  }

  const submitProposal = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      closeDrawer()
    }, 1500)
  }

  if (perspective === "buyer") {
    const agencies = [
      { name: "TechNova Agency", size: "50-200", tech: ["React", "Node.js", "AWS"], rating: "4.9", projects: 124, trust: { gstVerified: true, yearsInBusiness: 8, avgResponseTime: "< 1 hr", completedDeals: 124 }, status: "active" as const },
      { name: "CodeCraft Studios", size: "10-50", tech: ["Vue", "Python", "GCP"], rating: "4.8", projects: 89, trust: { gstVerified: true, yearsInBusiness: 5, avgResponseTime: "< 2 hrs", completedDeals: 89 }, status: "busy" as const },
      { name: "DataFlow Partners", size: "200+", tech: ["Java", "Angular", "Azure"], rating: "4.7", projects: 412, trust: { gstVerified: true, yearsInBusiness: 12, avgResponseTime: "< 3 hrs", completedDeals: 412 }, status: "active" as const },
    ]

    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight font-fraunces text-ink">{t('discovery.title')}</h1>
          <p className="text-charcoal">{t('discovery.subtitle')}</p>
        </div>

        <Tabs value="talent" onValueChange={() => {}} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="talent">{t('discovery.it_talent')}</TabsTrigger>
            <TabsTrigger value="hardware">{t('discovery.hardware')}</TabsTrigger>
            <TabsTrigger value="saas">{t('discovery.saas')}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="talent" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-ink font-fraunces">{t('discovery.top_rated')}</h2>
              <Button variant="outline" size="sm" className="gap-2 text-charcoal hover:text-ink"><Filter className="h-4 w-4" /> {t('discovery.filter')}</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {agencies.map((agency, i) => (
                <Card key={i} className="flex flex-col overflow-hidden hover:border-terracotta/50 group cursor-pointer bg-white">
                  <div className="h-24 bg-gradient-to-r from-terracotta/10 to-marigold/10 group-hover:from-terracotta/20 group-hover:to-marigold/20 transition-colors" />
                  <CardHeader className="-mt-8 pb-4">
                    <div className="flex items-start justify-between">
                      <div className="h-16 w-16 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm mb-2">
                        <Code2 className="h-8 w-8 text-terracotta" />
                      </div>
                      <VendorStatus status={agency.status} />
                    </div>
                    <CardTitle className="text-ink font-fraunces">{agency.name}</CardTitle>
                    <CardDescription className="text-charcoal/80">{t('discovery.team_size')}: {agency.size}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {agency.tech.map(tech => <Badge key={tech} variant="secondary" className="bg-cream text-charcoal hover:bg-cream border-none">{tech}</Badge>)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-charcoal/80">
                      <span className="flex items-center gap-1">⭐ {agency.rating}</span>
                      <span>•</span>
                      <span>{agency.projects} {t('discovery.projects')}</span>
                    </div>
                    {/* Trust Score Card */}
                    <VendorTrustCard vendor={agency.trust} />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-terracotta hover:bg-terracotta/90 text-white transition-all rounded-full">{t('discovery.request_profile')}</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Vendor View: Scan Opportunities
  const opportunities = [
    { id: 1, title: "Enterprise E-Commerce Replatforming", category: "Software Dev", budget: "$40k - $60k", deadline: "14 days left", tags: ["React", "Next.js", "Stripe API"], match: 95, clientBadge: "Enterprise Buyer in E-Commerce Vertical", description: "Looking for an experienced agency to migrate our legacy e-commerce platform to a modern headless architecture using Next.js and React. Must have proven experience with Stripe API integrations and high-volume transaction handling." },
    { id: 2, title: "Q4 Bulk Developer Workstations", category: "Hardware Pool", budget: "$100k+", deadline: "5 days left", tags: ["MacBook Pro", "Dell XPS", "Monitors"], match: 60, clientBadge: "Corporate Procurement Lead", description: "Need a supplier for 50x high-performance developer laptops and 100x 4K monitors for our expanding engineering team. Warranty and support SLA required." },
    { id: 3, title: "CRM Migration & Training", category: "SaaS Platforms", budget: "$15k - $25k", deadline: "21 days left", tags: ["Salesforce", "Data Migration", "Training"], match: 82, clientBadge: "Mid-Market B2B Services", description: "Seeking a certified Salesforce partner to handle our data migration from Hubspot and provide training for a 30-person sales team." },
    { id: 4, title: "Mobile App MVP - Healthcare", category: "Software Dev", budget: "$25k - $35k", deadline: "7 days left", tags: ["React Native", "HIPAA", "Firebase"], match: 98, clientBadge: "Healthcare Startup Founder", description: "Need a full-stack team to build a HIPAA-compliant patient portal app. Must be experienced in React Native for iOS/Android and secure data handling." },
  ]

  const filterLabels: Record<string, string> = {
    "All": t('discovery.all'),
    "Software Dev": t('discovery.software_dev'),
    "Hardware Pool": t('discovery.hardware_pool'),
    "SaaS Platforms": t('discovery.saas_platforms'),
  }

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesFilter = activeFilter === "All" || opp.category === activeFilter
    const matchesSearch = opp.title.toLowerCase().includes(searchQuery.toLowerCase()) || opp.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  return (
    <div className="relative">
      <div className={cn("space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500", isDrawerOpen && "pr-[400px] lg:pr-[500px] transition-all duration-300 ease-in-out")}>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight font-fraunces text-ink">{t('discovery.vendor_title')}</h1>
          <p className="text-charcoal">{t('discovery.vendor_subtitle')}</p>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filterLabels).map(([filter, label]) => (
              <Badge 
                key={filter} 
                variant={activeFilter === filter ? "default" : "outline"} 
                className={cn("px-3 py-1.5 text-sm cursor-pointer transition-all", activeFilter !== filter && "hover:bg-cream text-charcoal border-slate-200")}
                onClick={() => setActiveFilter(filter)}
              >
                {label}
              </Badge>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/70" />
            <Input 
              type="search" 
              placeholder={t('search.skills_placeholder')} 
              className="pl-9 bg-cream border-transparent focus-visible:ring-terracotta text-ink rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredOpportunities.length > 0 ? filteredOpportunities.map((rfp) => (
            <Card key={rfp.id} className="hover:border-terracotta/50 group bg-white">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-terracotta/10 flex items-center justify-center">
                      <Code2 className="h-4 w-4 text-terracotta" />
                    </div>
                    <span className="font-medium text-sm text-charcoal/80">{rfp.clientBadge}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-charcoal/80 flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" /> {t('discovery.published')} {rfp.deadline}
                    </span>
                    <Badge variant="secondary" className="bg-terracotta/10 text-terracotta border border-terracotta/20 shadow-sm hover:bg-terracotta/20">
                      ✨ {rfp.match}% {t('discovery.stack_match')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl group-hover:text-terracotta transition-colors mb-2 font-fraunces text-ink">{rfp.title}</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-cream text-charcoal border-none hover:bg-cream">{rfp.category}</Badge>
                      {rfp.tags.map(tag => <Badge key={tag} variant="outline" className="bg-white text-charcoal border-slate-200">{tag}</Badge>)}
                    </div>
                  </div>
                  <div className="text-right whitespace-nowrap">
                    <div className="text-sm text-charcoal mb-1">{t('discovery.budget_range')}</div>
                    <div className="font-bold text-xl text-ink">{rfp.budget}</div>
                  </div>
                </div>
                <p className="text-charcoal/80 leading-relaxed pt-2">{rfp.description}</p>
              </CardContent>
              <CardFooter className="pt-4 border-t border-slate-100 flex justify-end">
                <Button onClick={() => openProposalDrawer(rfp)} className="gap-2 bg-terracotta hover:bg-terracotta/90 text-white rounded-full">
                  {t('discovery.submit_proposal')} <Send className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )) : (
            <EmptyState 
              emoji="🔍"
              titleKey="empty.no_vendors"
              descriptionKey="discovery.no_opportunities"
            />
          )}
        </div>
      </div>

      {/* Slide-out Drawer */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full md:w-[400px] lg:w-[500px] bg-white border-l border-slate-100 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col",
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {selectedOpportunity && (
          <>
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold font-fraunces text-ink">{t('discovery.submit_proposal')}</h2>
              <Button variant="ghost" size="icon" onClick={closeDrawer} className="rounded-full text-charcoal hover:bg-cream hover:text-ink">
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-6 border-b border-slate-100 bg-cream/50">
              <div className="text-sm text-charcoal mb-1">{t('discovery.bidding_on')}</div>
              <div className="font-semibold text-ink font-fraunces">{selectedOpportunity.title}</div>
              <div className="text-sm mt-1 text-charcoal">{selectedOpportunity.clientBadge}</div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="proposal-form" onSubmit={submitProposal} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink">{t('discovery.estimated_pricing')}</label>
                  <Input required type="text" placeholder="e.g. 45,000" className="border-slate-200 bg-white focus-visible:ring-terracotta text-ink rounded-xl h-12" />
                  <p className="text-xs text-charcoal/70">{t('discovery.pricing_hint')}</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink">{t('discovery.timeline_estimate')}</label>
                  <select required className="flex h-12 w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta">
                    <option>{t('discovery.timeline_1')}</option>
                    <option>{t('discovery.timeline_2')}</option>
                    <option>{t('discovery.timeline_3')}</option>
                    <option>{t('discovery.timeline_4')}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink">{t('discovery.pitch')}</label>
                  <textarea 
                    required
                    className="flex min-h-[150px] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink shadow-sm placeholder:text-charcoal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta resize-y"
                    placeholder={t('discovery.pitch_placeholder')}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink">{t('discovery.attachments')}</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-cream transition-colors">
                    <Paperclip className="h-6 w-6 text-charcoal/60 mb-2" />
                    <span className="text-sm font-medium text-ink">{t('discovery.attach_portfolio')}</span>
                    <span className="text-xs text-charcoal/70">{t('discovery.pdf_limit')}</span>
                  </div>
                </div>
              </form>
            </div>

            <div className="p-6 border-t border-slate-100 bg-white">
              <Button type="submit" form="proposal-form" className="w-full bg-terracotta hover:bg-terracotta/90 text-white rounded-full h-12" disabled={isSubmitting}>
                {isSubmitting ? t('discovery.sending') : t('discovery.submit_proposal')}
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Backdrop */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity"
          onClick={closeDrawer}
        />
      )}
    </div>
  )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  )
}
