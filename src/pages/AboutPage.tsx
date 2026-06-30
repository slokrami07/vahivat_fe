import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PillNav from '@/components/PillNav'
import { PUBLIC_NAV_ITEMS, DARK_NAV_COLORS } from '@/config/navItems'
import { LandingFooter } from '@/components/landing/LandingFooter'
import ClickSpark from './ClickSpark'
import BlurText from './BlurText'

export const AboutPage = () => {
  const location = useLocation()

  return (
    <ClickSpark
      sparkColor="#C75D3A"
      sparkSize={21}
      sparkRadius={25}
      sparkCount={8}
      duration={400}
    >
      <Helmet>
        <title>About Vahivat — Built in Gujarat, for Gujarat's Businesses</title>
        <meta name="description" content="Vahivat was built in Ahmedabad because we saw how much time Gujarat's business owners wasted finding and verifying vendors. Meet the team and learn our story." />
        <link rel="canonical" href="https://vahivat.in/about" />
      </Helmet>

      {/* Floating PillNav */}
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
          <p className="text-xs tracking-widest uppercase text-terracotta font-semibold mb-4">Our story</p>
          <BlurText
            text="Built in Gujarat. For Gujarat."
            animateBy="words"
            direction="top"
            className="font-fraunces text-ink font-bold leading-tight"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-0.03em' }}
            highlightWord="Gujarat."
            highlightStyle={{ color: '#C75D3A' }}
          />
          <p className="text-slate-600 text-lg mt-6 max-w-2xl leading-relaxed">
            Vahivat started because one of us spent three days trying to find a GST-registered IT vendor in Ahmedabad — calling contacts, posting in WhatsApp groups, following up on dead leads. On day four, we stopped looking for vendors and started building Vahivat.
          </p>
        </section>

        {/* DIVIDER LINE */}
        <div className="border-t border-slate-200/80" />

        {/* THE PROBLEM WE SAW */}
        <section className="px-6 md:px-10 max-w-4xl mx-auto py-20">
          <p className="text-xs tracking-widest uppercase text-terracotta font-semibold mb-4">Why we built this</p>
          <h2 className="font-fraunces font-bold text-ink text-3xl md:text-4xl mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
            Gujarat's businesses are incredibly productive. Their vendor discovery process is not.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-slate-600 text-base leading-relaxed">
            <p>
              Gujarat accounts for nearly 20% of India's industrial output. The entrepreneurs here are sharp, hardworking, and deeply connected to their communities. But the way they find suppliers — WhatsApp groups, personal references, yellow pages — hasn't changed in 20 years.
            </p>
            <p>
              Meanwhile, the risks have grown. GST compliance matters more than ever. Fake vendors are a real problem. And the cost of a bad procurement decision — a delayed shipment, an input tax credit issue, an unregistered supplier — falls entirely on the buyer. We built Vahivat to fix this.
            </p>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="border-t border-slate-200/80" />

        {/* WHAT WE BELIEVE */}
        <section className="px-6 md:px-10 max-w-4xl mx-auto py-20">
          <p className="text-xs tracking-widest uppercase text-terracotta font-semibold mb-4">What we believe</p>
          <h2 className="font-fraunces font-bold text-ink text-3xl mb-10" style={{ letterSpacing: '-0.02em' }}>
            Three things we refuse to compromise on.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Verification first, always.',
                body: 'No vendor goes live on Vahivat without GSTIN verification. We check against the government database — not vendor self-declaration. This is non-negotiable and will never change.',
              },
              {
                num: '02',
                title: 'Gujarati is native.',
                body: 'Our AI, our UI, and our support team work in Gujarati. We built for the business owner who thinks in Gujarati — not for someone who has to translate their own requirements.',
              },
              {
                num: '03',
                title: 'Buyers deserve to be free.',
                body: 'Buyers on Vahivat will always use the platform for free. We charge vendors for visibility and tools — not buyers for access. That\'s how trust gets built on both sides.',
              },
            ].map((item) => (
              <div key={item.num} className="bg-white border border-slate-200/60 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-terracotta/20 font-fraunces font-bold text-4xl mb-4">{item.num}</div>
                <h3 className="text-ink font-semibold text-base mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DIVIDER */}
        <div className="border-t border-slate-200/80" />

        {/* TEAM / FOUNDER SECTION */}
        <section className="px-6 md:px-10 max-w-4xl mx-auto py-20">
          <p className="text-xs tracking-widest uppercase text-terracotta font-semibold mb-4">The team</p>
          <h2 className="font-fraunces font-bold text-ink text-3xl mb-3" style={{ letterSpacing: '-0.02em' }}>
            We're a small team from Ahmedabad.
          </h2>
          <p className="text-slate-600 text-base mb-10 leading-relaxed">
            No Silicon Valley funding round. No 200-person team. Just a focused group of people from Gujarat who care deeply about making B2B commerce work better for the businesses that built this state.
          </p>

          {/* Founder card */}
          <div className="bg-white border border-slate-200/60 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm">
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#C75D3A', flexShrink: 0 }}
              className="flex items-center justify-center font-bold text-white text-xl">
              SR
            </div>
            <div>
              <h3 className="text-ink font-semibold text-lg">Slok Rami</h3>
              <p className="text-slate-500 text-sm mb-3">Founder & CEO · Ahmedabad, Gujarat</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Built Vahivat after experiencing firsthand how broken vendor discovery was for Gujarat's IT businesses. Passionate about building technology that feels native to how Gujarat actually works — in Gujarati, with UPI, and with the kind of trust that only comes from verified credentials.
              </p>
            </div>
          </div>
        </section>

        {/* DIVIDER */}
        <div className="border-t border-slate-200/80" />

        {/* NUMBERS / TRACTION */}
        <section className="px-6 md:px-10 max-w-4xl mx-auto py-20">
          <p className="text-xs tracking-widest uppercase text-terracotta font-semibold mb-10">Where we are today</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '200+', label: 'Businesses' },
              { num: '1,400+', label: 'Deals closed' },
              { num: '4', label: 'Cities in Gujarat' },
              { num: '100%', label: 'GST verified' },
            ].map((stat) => (
              <div key={stat.num} className="bg-white border border-slate-200/60 rounded-2xl p-6 text-center shadow-sm">
                <div className="text-ink font-fraunces font-bold text-4xl mb-2" style={{ letterSpacing: '-0.03em' }}>{stat.num}</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-10 max-w-4xl mx-auto pb-24 text-center">
          <h2 className="font-fraunces text-ink font-bold text-3xl mb-4" style={{ letterSpacing: '-0.02em' }}>
            Want to be part of it?
          </h2>
          <p className="text-slate-600 mb-8">Join 200+ Gujarat businesses already on Vahivat.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/login?type=buyer"
              className="bg-terracotta text-white font-semibold rounded-xl px-8 py-4 text-sm hover:bg-terracotta/90 transition-colors shadow-md">
              Join as Buyer →
            </Link>
            <Link to="/login?type=vendor"
              className="bg-white border border-slate-200 hover:border-slate-300 text-ink font-semibold rounded-xl px-8 py-4 text-sm transition-colors shadow-sm">
              List as Vendor
            </Link>
          </div>
        </section>

      </main>

      <LandingFooter />
    </ClickSpark>
  )
}
