import * as React from "react"
import { useTranslation } from "react-i18next"
import { usePerspective } from "@/context/PerspectiveContext"
import { DealTimeline } from "@/components/DealTimeline"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Send, Phone, CalendarDays, Search, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const mockConversations = [
  { id: 1, name: "TechNova Agency", lastMessage: "Looking forward to the Q3 planning session.", time: "2m ago", avatar: "🏢", unread: 2, dealStatus: "negotiating" },
  { id: 2, name: "CloudScale Partners", lastMessage: "We've sent over the updated pricing breakdown.", time: "1h ago", avatar: "☁️", unread: 0, dealStatus: "quoted" },
  { id: 3, name: "SysOps Hardware", lastMessage: "Confirmed. Shipping scheduled for next week.", time: "5h ago", avatar: "🖥️", unread: 0, dealStatus: "confirmed" },
  { id: 4, name: "DataFlow Inc.", lastMessage: "Could you share your API documentation?", time: "1d ago", avatar: "📊", unread: 0, dealStatus: "inquiry" },
]

const mockMessages = [
  { id: 1, sender: "them", text: "Hi! Thanks for the introduction. We've reviewed your requirements for the Q3 project.", time: "10:00 AM" },
  { id: 2, sender: "them", text: "We have extensive experience with the tech stack you need. Our React team has delivered 30+ enterprise projects.", time: "10:02 AM" },
  { id: 3, sender: "me", text: "Great to hear. Can you share some relevant case studies? Specifically anything in fintech.", time: "10:15 AM" },
  { id: 4, sender: "them", text: "Absolutely! I'll have those sent over by end of day. We also have a fintech starter template that could accelerate development.", time: "10:18 AM" },
  { id: 5, sender: "me", text: "Perfect. Let's also schedule a call to discuss the timeline in detail. Does Thursday at 2 PM work?", time: "10:30 AM" },
  { id: 6, sender: "them", text: "Looking forward to the Q3 planning session.", time: "10:35 AM" },
]

export function Chat() {
  const { perspective } = usePerspective()
  const { t } = useTranslation()
  const [selectedConvo, setSelectedConvo] = React.useState<number | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [messageInput, setMessageInput] = React.useState("")
  const chatEndRef = React.useRef<HTMLDivElement>(null)
  
  const activeConvo = mockConversations.find(c => c.id === selectedConvo)

  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedConvo])

  const filteredConvos = mockConversations.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-fraunces font-bold tracking-tight text-ink">{t('chat.title')}</h1>
        <p className="text-charcoal">{t('chat.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-0 border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm" style={{ height: 'calc(100vh - 230px)' }}>
        {/* Conversation List */}
        <div className="border-r border-slate-100 flex flex-col">
          <div className="p-3 border-b border-slate-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-charcoal/60" />
              <Input 
                placeholder={t('search.conversations_placeholder')} 
                className="pl-9 bg-cream border-transparent text-sm focus-visible:ring-terracotta text-ink rounded-full" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConvos.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setSelectedConvo(convo.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 text-left transition-colors border-b border-slate-50",
                  selectedConvo === convo.id ? "bg-terracotta/5 border-l-4 border-l-terracotta" : "hover:bg-cream"
                )}
              >
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                  {convo.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className={cn("text-sm font-semibold truncate text-ink", convo.unread > 0 && "text-terracotta")}>{convo.name}</span>
                    <span className="text-[11px] text-charcoal/60 flex-shrink-0">{convo.time}</span>
                  </div>
                  <p className="text-xs text-charcoal/70 truncate mt-0.5">{convo.lastMessage}</p>
                </div>
                {convo.unread > 0 && (
                  <span className="h-5 min-w-[20px] rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {convo.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        {selectedConvo ? (
          <div className="flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-lg">{activeConvo?.avatar}</div>
                <div>
                  <h3 className="font-semibold text-ink">{activeConvo?.name}</h3>
                  <span className="text-xs text-emerald-500 font-medium">● Online</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-charcoal hover:text-terracotta hover:bg-terracotta/10 rounded-full"><Phone className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="text-charcoal hover:text-terracotta hover:bg-terracotta/10 rounded-full"><CalendarDays className="h-4 w-4" /></Button>
              </div>
            </div>

            {/* Deal Timeline */}
            {activeConvo && (
              <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
                <DealTimeline currentStatus={activeConvo.dealStatus} />
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-cream/30">
              <div className="text-center">
                <span className="text-[10px] font-medium text-charcoal/50 bg-white px-3 py-1 rounded-full border border-slate-100">{t('chat.today')}</span>
              </div>
              {mockMessages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === "me" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-3 text-sm",
                    msg.sender === "me" 
                      ? "bg-terracotta text-white rounded-br-sm" 
                      : "bg-white text-ink border border-slate-100 rounded-bl-sm shadow-sm"
                  )}>
                    <p className="leading-relaxed">{msg.text}</p>
                    <p className={cn("text-[10px] mt-1.5", msg.sender === "me" ? "text-white/60" : "text-charcoal/50")}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-slate-100 bg-white">
              <form onSubmit={(e) => { e.preventDefault(); setMessageInput("") }} className="flex items-center gap-2">
                <Input 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder={t('chat.type_message')}
                  className="flex-1 bg-cream border-transparent focus-visible:ring-terracotta text-ink rounded-full"
                />
                <Button type="submit" size="icon" className="rounded-full bg-terracotta hover:bg-terracotta/90 text-white h-10 w-10">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center bg-cream/30">
            <div className="text-center space-y-4 max-w-sm px-6">
              <div className="p-4 rounded-full bg-slate-100 inline-flex">
                <MessageSquare className="h-8 w-8 text-charcoal/40" />
              </div>
              <h3 className="text-lg font-semibold text-ink font-fraunces">{t('chat.select_conversation')}</h3>
              <p className="text-sm text-charcoal">{t('chat.select_hint')}</p>
              <Card className="text-left bg-white/80">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Lock className="h-4 w-4 text-terracotta flex-shrink-0" />
                    <div>
                      <span className="font-medium text-ink">{t('chat.bridge_locked')}</span>
                      <p className="text-xs text-charcoal mt-1">{t('chat.bridge_locked_desc')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
