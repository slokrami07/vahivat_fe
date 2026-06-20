import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Loader2, ArrowLeft, Send } from "lucide-react"

export function CreateRFP() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Auto-redirect after success
      setTimeout(() => {
        navigate("/rfps")
      }, 2000)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
          <svg className="h-10 w-10 text-emerald-600 animate-[bounce_1s_ease-in-out_infinite]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Opportunity Published!</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Your requirement has been securely broadcast to the marketplace. You will be redirected to your active RFPs shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold tracking-tight">Create Requirement</h1>
          <p className="text-muted-foreground">Post a new RFP to find the perfect vendor for your project.</p>
        </div>
      </div>

      <Card className="border-zinc-200/60 dark:border-zinc-800/60 shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Provide comprehensive information to get accurate bids from verified vendors.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Project Title</label>
              <Input 
                required 
                placeholder="e.g. Need Headless Next.js E-Commerce Site" 
                className="focus-visible:ring-primary focus-visible:border-primary transition-colors text-lg py-6"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category Focus</label>
                <select required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="" disabled selected>Select a category...</option>
                  <option>IT / Software Talent</option>
                  <option>Office Hardware Bulk</option>
                  <option>SaaS License Reselling</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget Tier / Range</label>
                <select required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="" disabled selected>Select budget range...</option>
                  <option>Under $5,000</option>
                  <option>$5,000 - $10,000</option>
                  <option>$10,000 - $50,000</option>
                  <option>$50,000+</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium flex justify-between">
                Description Scope
                <span className="text-muted-foreground font-normal text-xs">Rich formatting supported</span>
              </label>
              <textarea 
                required
                className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                placeholder="Describe your technical requirements, timelines, expected deliverables, and any specific tech stack preferences..."
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted/20 border rounded-lg gap-4">
              <div className="flex flex-col space-y-1">
                <span className="font-semibold flex items-center gap-2">
                  Publish Anonymously
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary hover:bg-primary/20">Recommended</Badge>
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  Hides your corporate brand name from the public marketplace feed until you choose to connect.
                </span>
              </div>
              <Switch defaultChecked className="data-[state=checked]:bg-primary" />
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-4 border-t bg-muted/5 p-6 rounded-b-xl">
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[200px] transition-all">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Publish Opportunity to Feed
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
