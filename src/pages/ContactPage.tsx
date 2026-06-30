import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PillNav from '@/components/PillNav'
import { PUBLIC_NAV_ITEMS, DARK_NAV_COLORS } from '@/config/navItems'
import { LandingFooter } from '@/components/landing/LandingFooter'
import ClickSpark from './ClickSpark'
import BlurText from './BlurText'

export const ContactPage = () => {
  const location = useLocation()
  const [form, setForm] = useState({ name: '', mobile: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <ClickSpark
      sparkColor="#C75D3A"
      sparkSize={21}
      sparkRadius={25}
      sparkCount={8}
      duration={400}
    >
      <Helmet>
        <title>Contact Vahivat — We Reply in Gujarati, Hindi & English</title>
        <meta name="description" content="Get in touch with the Vahivat team. We're based in Ahmedabad and reply on WhatsApp in Gujarati, Hindi, or English. For vendor or buyer support, we're here." />
        <link rel="canonical" href="https://vahivat.in/contact" />
      </Helmet>

      {/* PillNav */}
      <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'fit-content', maxWidth: 'calc(100vw - 32px)' }}>
        <PillNav
          logoAlt="Vahivat"
          items={PUBLIC_NAV_ITEMS}
          activeHref={location.pathname}
          {...DARK_NAV_COLORS}
          initialLoadAnimation={false}
        />
      </div>

      <main className="bg-cream text-charcoal min-h-screen">

        {/* HERO */}
        <section style={{ paddingTop: '160px', paddingBottom: '80px' }} className="px-6 md:px-10 max-w-4xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-terracotta font-semibold mb-4">Get in touch</p>
          <BlurText
            text="We're real people. You can reach us."
            animateBy="words"
            direction="top"
            className="font-fraunces text-ink font-bold leading-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-0.03em' }}
            highlightWord="reach us."
            highlightStyle={{ color: '#C75D3A' }}
          />
          <p className="text-slate-600 text-lg mt-5 max-w-xl leading-relaxed">
            No ticket systems. No bots. If you have a question, send us a WhatsApp — we're in Ahmedabad and we reply in Gujarati, Hindi, or English.
          </p>
        </section>

        <div className="border-t border-slate-200/80" />

        {/* CONTACT OPTIONS + FORM */}
        <section className="px-6 md:px-10 max-w-4xl mx-auto py-16">
          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT — Direct contact options */}
            <div>
              <h2 className="text-ink font-semibold text-xl mb-8 font-fraunces">Reach us directly</h2>

              {[
                {
                  icon: '💬',
                  title: 'WhatsApp (fastest)',
                  detail: '+91 99999 99999',
                  sub: 'Replies in Gujarati, Hindi, or English. Usually within 2 hours.',
                  action: 'https://wa.me/919999999999?text=Hi%20Vahivat%2C%20I%20have%20a%20question',
                  actionLabel: 'Open WhatsApp →',
                },
                {
                  icon: '📧',
                  title: 'Email',
                  detail: 'hello@vahivat.in',
                  sub: 'For formal queries, partnership discussions, or press enquiries.',
                  action: 'mailto:hello@vahivat.in',
                  actionLabel: 'Send email →',
                },
                {
                  icon: '📍',
                  title: 'Based in',
                  detail: 'Ahmedabad, Gujarat',
                  sub: "We're a Gujarat-first company. All our decisions are made here.",
                  action: null,
                  actionLabel: null,
                },
              ].map((item) => (
                <div key={item.title} className="border-b border-slate-200/80 py-6 last:border-0">
                  <div className="flex gap-4 items-start">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <p className="text-slate-500 font-medium text-sm mb-1">{item.title}</p>
                      <p className="text-ink text-base font-semibold mb-1">{item.detail}</p>
                      <p className="text-slate-500 text-xs leading-relaxed mb-2">{item.sub}</p>
                      {item.action && (
                        <a href={item.action} target="_blank" rel="noopener noreferrer"
                          className="text-terracotta text-sm underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold">
                          {item.actionLabel}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — Contact form */}
            <div className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm">
              <h2 className="text-ink font-semibold text-xl mb-6 font-fraunces">Send us a message</h2>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
                  <div className="text-emerald-500 text-4xl mb-4">✓</div>
                  <p className="text-emerald-800 font-semibold text-lg mb-2">Message received!</p>
                  <p className="text-slate-600 text-sm">We'll WhatsApp you back within a few hours. If it's urgent, message us directly on WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-slate-500 text-xs uppercase tracking-wider block mb-2 font-semibold">Your name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jayesh Patel"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-300 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none transition-colors text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 text-xs uppercase tracking-wider block mb-2 font-semibold">Mobile number</label>
                    <input
                      type="tel"
                      required
                      value={form.mobile}
                      onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-300 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none transition-colors text-charcoal"
                    />
                  </div>
                  <div>
                    <label className="text-slate-500 text-xs uppercase tracking-wider block mb-2 font-semibold">Your message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you're looking for, or any questions you have..."
                      className="w-full bg-slate-50 border border-slate-200 focus:border-slate-300 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none transition-colors resize-none text-charcoal"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-terracotta text-white font-semibold rounded-xl py-4 text-sm hover:bg-terracotta/90 transition-colors shadow-md">
                    Send message →
                  </button>
                  <p className="text-slate-400 text-xs text-center">
                    Or just WhatsApp us — it's faster.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      <LandingFooter />
    </ClickSpark>
  )
}
