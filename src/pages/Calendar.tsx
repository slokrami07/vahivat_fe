import * as React from "react"
import { usePerspective } from "@/context/PerspectiveContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"
import "react-day-picker/dist/style.css"

export function Calendar() {
  const { perspective } = usePerspective()
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-fraunces font-bold tracking-tight text-ink">Meeting Scheduler</h1>
        <p className="text-charcoal">
          {perspective === "buyer" 
            ? "Book introductory meetings and review sessions with vendors." 
            : "Manage your availability and upcoming buyer interviews."}
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="font-fraunces text-ink">Calendar</CardTitle>
            <CardDescription className="text-charcoal/80">Select a date to view or manage availability.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center border-t border-slate-100 pt-6">
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border border-slate-100 p-3 rounded-md bg-white"
              modifiersClassNames={{
                selected: "bg-terracotta text-white hover:bg-terracotta hover:text-white focus:bg-terracotta focus:text-white",
                today: "bg-marigold text-white font-bold"
              }}
            />
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="font-fraunces text-ink">Schedule for {date ? format(date, "MMMM do, yyyy") : "Selected Date"}</CardTitle>
            <CardDescription className="text-charcoal/80">
              {perspective === "buyer" ? "Available slots for your selected vendors." : "Your configured availability for today."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 border-t border-slate-100 pt-6">
            {perspective === "vendor" && (
              <div className="bg-terracotta/5 p-4 rounded-lg border border-terracotta/20 mb-4">
                <p className="text-sm font-medium text-ink mb-2">Configure Standard Availability</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full border-slate-200 text-charcoal hover:bg-cream hover:text-ink">09:00 AM</Button>
                  <Button variant="outline" size="sm" className="rounded-full border-slate-200 text-charcoal hover:bg-cream hover:text-ink">10:30 AM</Button>
                  <Button variant="outline" size="sm" className="rounded-full border-slate-200 text-charcoal hover:bg-cream hover:text-ink">02:00 PM</Button>
                  <Button variant="default" size="sm" className="ml-auto rounded-full bg-terracotta hover:bg-terracotta/90 text-white">+ Add Slot</Button>
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-charcoal">Upcoming Meetings</h3>
              <div className="p-3 border border-slate-100 rounded-md flex justify-between items-center bg-white">
                <div>
                  <div className="font-semibold text-sm text-ink">TechNova Interview</div>
                  <div className="text-xs text-charcoal/80">10:00 AM - 10:45 AM</div>
                </div>
                <Button size="sm" variant="secondary" className="rounded-full bg-cream text-charcoal hover:bg-terracotta/10 hover:text-terracotta">Join Call</Button>
              </div>
              <div className="p-3 border border-slate-100 rounded-md flex justify-between items-center bg-white">
                <div>
                  <div className="font-semibold text-sm text-ink">CloudScale Sync</div>
                  <div className="text-xs text-charcoal/80">01:30 PM - 02:00 PM</div>
                </div>
                <Button size="sm" variant="secondary" className="rounded-full bg-cream text-charcoal hover:bg-terracotta/10 hover:text-terracotta">Join Call</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
