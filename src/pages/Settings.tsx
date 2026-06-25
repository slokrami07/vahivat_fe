import * as React from "react"
import { useSearchParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Video, Users, Link as LinkIcon, Shield, Bell, Smartphone, DollarSign, Globe } from "lucide-react"

export function Settings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const defaultTab = searchParams.get("tab") || "profile"

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your public profile, team access, and notifications.</p>
      </div>

      <Tabs value={defaultTab} onValueChange={(v) => setSearchParams({ tab: v })} className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-8">
          <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6">
            
            {/* Public Showroom */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Public Showroom</CardTitle>
                <CardDescription>Customize how buyers see your company profile.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Company Bio</label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="We are a leading agency specializing in..."
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <label className="text-sm font-medium flex items-center gap-2"><Video className="h-4 w-4 text-muted-foreground"/> Pitch Video URL</label>
                      <Input placeholder="https://youtube.com/watch?v=..." />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground"/> Headcount</label>
                      <select className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <option>1-10 Employees</option>
                        <option>11-50 Employees</option>
                        <option>51-200 Employees</option>
                        <option>201+ Employees</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2"><LinkIcon className="h-4 w-4 text-muted-foreground"/> Client Logos</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-muted/5 transition-colors hover:bg-muted/10 cursor-pointer h-[120px]">
                      <span className="text-sm text-muted-foreground">Upload SVG or PNG logos</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">Acme Corp <button className="ml-1 text-muted-foreground hover:text-foreground">×</button></Badge>
                      <Badge variant="secondary">Stark Ind. <button className="ml-1 text-muted-foreground hover:text-foreground">×</button></Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/10 pt-4">
                <Button>Save Profile</Button>
              </CardFooter>
            </Card>

            {/* Security & Team */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2"><Shield className="h-5 w-5 text-primary"/> Security & Team</CardTitle>
                <CardDescription>Manage your team members and their access levels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-2 w-full max-w-sm">
                    <Input placeholder="Email address" />
                    <Button variant="secondary">Invite</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b bg-muted/5">
                    <div className="flex flex-col">
                      <span className="font-medium">Jane Doe (You)</span>
                      <span className="text-sm text-muted-foreground">jane@example.com</span>
                    </div>
                    <Badge>Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex flex-col">
                      <span className="font-medium">John Smith</span>
                      <span className="text-sm text-muted-foreground">john@example.com</span>
                    </div>
                    <select className="text-sm border-none bg-transparent focus:ring-0 text-muted-foreground cursor-pointer">
                      <option>Manager</option>
                      <option>Contributor</option>
                      <option>Admin</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Notification Rules</CardTitle>
              <CardDescription>Control how and when you receive alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium flex items-center gap-2"><Bell className="h-4 w-4"/> Email alerts for new RFPs</span>
                  <span className="text-sm text-muted-foreground">Get an email when a new RFP matches your tech stack.</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="flex flex-col space-y-1">
                  <span className="font-medium flex items-center gap-2"><Smartphone className="h-4 w-4"/> Immediate SMS for meetings</span>
                  <span className="text-sm text-muted-foreground">Receive a text message when a client schedules an interview.</span>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Localization</CardTitle>
              <CardDescription>Set your local currency and region formats.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><DollarSign className="h-4 w-4"/> Default Currency</label>
                <select className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                  <option>INR (₹)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Globe className="h-4 w-4"/> Timezone</label>
                <select className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Pacific Time (PT)</option>
                  <option>Eastern Time (ET)</option>
                  <option>Coordinated Universal Time (UTC)</option>
                  <option>Indian Standard Time (IST)</option>
                </select>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/10 pt-4">
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
