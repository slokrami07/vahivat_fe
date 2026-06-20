import * as React from "react"
import { usePerspective } from "@/context/PerspectiveContext"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Send, Search, Calendar as CalendarIcon, Phone } from "lucide-react"

export function Chat() {
  const { perspective } = usePerspective()
  const [activeChat, setActiveChat] = React.useState<number | null>(null)

  const chats = perspective === "buyer" ? [
    { id: 1, name: "TechNova Agency", project: "E-Commerce Replatforming", lastMessage: "Yes, we can definitely accommodate that timeline.", time: "10:30 AM", unread: 2, locked: false },
    { id: 2, name: "CloudScale Partners", project: "AWS Migration", lastMessage: "I've attached the revised SOW for your review.", time: "Yesterday", unread: 0, locked: false },
    { id: 3, name: "DataFlow Partners", project: "Data Warehouse Setup", lastMessage: "Awaiting proposal approval to unlock chat.", time: "2 days ago", unread: 0, locked: true },
  ] : [
    { id: 1, name: "Acme Corp", project: "E-Commerce Replatforming", lastMessage: "Yes, we can definitely accommodate that timeline.", time: "10:30 AM", unread: 0, locked: false },
    { id: 4, name: "Global Industries", project: "ERP Implementation", lastMessage: "Awaiting proposal approval to unlock chat.", time: "1 week ago", unread: 0, locked: true },
  ]

  const selectedChat = chats.find(c => c.id === activeChat)

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-fraunces font-bold tracking-tight text-ink">Real-time Chat</h1>
        <p className="text-charcoal">Secure communication channel for active negotiations.</p>
      </div>

      <Card className="flex-1 flex overflow-hidden border-slate-100 bg-white">
        {/* Chat List - Left Column */}
        <div className="w-80 flex flex-col border-r border-slate-100 bg-cream/50">
          <div className="p-4 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/70" />
              <Input type="search" placeholder="Search conversations..." className="pl-9 bg-white border-slate-200 focus-visible:ring-terracotta text-ink rounded-full" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat.id)}
                className={`p-4 border-b border-slate-100 cursor-pointer transition-colors hover:bg-cream ${activeChat === chat.id ? 'bg-terracotta/5 border-l-4 border-l-terracotta' : 'border-l-4 border-l-transparent'}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-sm text-ink truncate pr-2">{chat.name}</h3>
                  <span className="text-xs text-charcoal/70 whitespace-nowrap">{chat.time}</span>
                </div>
                <div className="text-xs font-medium text-terracotta mb-1">{chat.project}</div>
                <div className="flex justify-between items-center gap-2">
                  <p className="text-sm text-charcoal/80 truncate flex-1">
                    {chat.locked && <Lock className="inline h-3 w-3 mr-1 mb-0.5" />}
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 && (
                    <span className="bg-terracotta text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window - Right Column */}
        <div className="flex-1 flex flex-col bg-white">
          {!selectedChat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="h-20 w-20 bg-cream rounded-full flex items-center justify-center mb-4">
                <MessageSquareIcon className="h-10 w-10 text-charcoal" />
              </div>
              <h2 className="text-xl font-fraunces font-semibold text-ink mb-2">Select a conversation</h2>
              <p className="text-charcoal max-w-md">Choose an active conversation from the sidebar to continue negotiating or discussing project details.</p>
            </div>
          ) : selectedChat.locked ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-cream/30">
              <div className="h-24 w-24 bg-white border-4 border-slate-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Lock className="h-10 w-10 text-charcoal" />
              </div>
              <h2 className="text-2xl font-fraunces font-bold tracking-tight text-ink mb-3">Bridge Locked</h2>
              <p className="text-charcoal max-w-md text-lg leading-relaxed">
                Chat locks open automatically once a Buyer approves a project bid and initiates an introduction.
              </p>
            </div>
          ) : (
            <>
              {/* Active Chat Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div>
                  <h2 className="font-semibold font-fraunces text-lg text-ink">{selectedChat.name}</h2>
                  <p className="text-sm text-charcoal/80">{selectedChat.project}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-2 rounded-full border-slate-200 text-charcoal hover:bg-cream hover:text-ink">
                    <Phone className="h-4 w-4" /> <span className="hidden sm:inline">Call</span>
                  </Button>
                  <Button size="sm" className="gap-2 rounded-full bg-terracotta hover:bg-terracotta/90 text-white">
                    <CalendarIcon className="h-4 w-4" /> <span className="hidden sm:inline">Schedule Meeting</span>
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
                <div className="flex justify-center">
                  <span className="text-xs text-charcoal bg-cream px-3 py-1 rounded-full">Today</span>
                </div>
                
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                    <span className="text-terracotta font-bold">{selectedChat.name.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-ink">{selectedChat.name}</span>
                      <span className="text-xs text-charcoal/70">10:25 AM</span>
                    </div>
                    <div className="bg-cream text-ink p-3 rounded-2xl rounded-tl-sm text-sm">
                      Hello! Thanks for reviewing our proposal. We're excited about the possibility of working together on the {selectedChat.project}. Let me know if you have any questions about the timeline or budget breakdown.
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 flex-row-reverse">
                  <div className="h-10 w-10 rounded-full bg-marigold/20 flex items-center justify-center shrink-0">
                    <span className="text-marigold font-bold">M</span>
                  </div>
                  <div className="flex flex-col gap-1 max-w-[80%] items-end">
                    <div className="flex items-center gap-2 flex-row-reverse">
                      <span className="font-semibold text-sm text-ink">You</span>
                      <span className="text-xs text-charcoal/70">10:28 AM</span>
                    </div>
                    <div className="bg-terracotta text-white p-3 rounded-2xl rounded-tr-sm text-sm">
                      Hi there. Yes, the proposal looks solid. I did have one question regarding the testing phase—can we extend that by one week without impacting the final launch date?
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                    <span className="text-terracotta font-bold">{selectedChat.name.charAt(0)}</span>
                  </div>
                  <div className="flex flex-col gap-1 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-ink">{selectedChat.name}</span>
                      <span className="text-xs text-charcoal/70">10:30 AM</span>
                    </div>
                    <div className="bg-cream text-ink p-3 rounded-2xl rounded-tl-sm text-sm">
                      Yes, we can definitely accommodate that timeline.
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-slate-100 bg-white">
                <div className="relative flex items-center">
                  <Input 
                    placeholder="Type your message..." 
                    className="pr-12 py-6 rounded-full bg-cream border-transparent focus-visible:ring-terracotta focus-visible:bg-white text-ink transition-colors" 
                  />
                  <Button size="icon" className="absolute right-1 h-10 w-10 rounded-full bg-terracotta hover:bg-terracotta/90 text-white">
                    <Send className="h-4 w-4 -ml-0.5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

function MessageSquareIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  )
}
