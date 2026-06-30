import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PillNav from '@/components/PillNav'
import { PUBLIC_NAV_ITEMS, DARK_NAV_COLORS } from '@/config/navItems'
import { LandingFooter } from '@/components/landing/LandingFooter'

export const TermsPage = () => {
  const location = useLocation()

  return (
    <>
      <Helmet>
        <title>Terms of Service — Vahivat</title>
        <meta name="description" content="Vahivat's terms of service. Read the rules and guidelines governing the use of our verified B2B marketplace platform." />
        <link rel="canonical" href="https://vahivat.in/terms" />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* PillNav */}
      <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'fit-content', maxWidth: 'calc(100vw - 32px)' }}>
        <PillNav logoAlt="Vahivat" items={PUBLIC_NAV_ITEMS} activeHref={location.pathname} {...DARK_NAV_COLORS} initialLoadAnimation={false} />
      </div>

      <main style={{ background: '#0A0A0A', minHeight: '100vh', color: '#fff' }}>
        <section style={{ paddingTop: '140px', paddingBottom: '80px' }} className="px-6 md:px-10 max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Legal</p>
          <h1 className="font-bold text-white text-4xl mb-3" style={{ letterSpacing: '-0.02em' }}>Terms of Service</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: June 2026 · Applies to vahivat.in</p>

          {/* Prose content */}
          <div className="prose-dark space-y-10 text-gray-300 text-sm leading-relaxed">

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">1. Acceptance of terms</h2>
              <p>By creating an account or using Vahivat, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the platform.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">2. Who can use Vahivat</h2>
              <p>You must be a registered business entity in India with a valid GSTIN (for vendors) or a legitimate procurement professional (for buyers) to access and list on the platform. Individuals creating fake business profiles, misrepresenting credentials, or using invalid tax registration numbers will be immediately and permanently suspended without refunds.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">3. Vendor responsibilities</h2>
              <p>Vendors on the platform are responsible for: keeping their GSTIN active and valid, accurately representing their products and services, responding to buyer inquiries in good faith, honouring quotes they submit on the platform, and generating GST-compliant invoices for all transactions. Any failure to maintain active registration status or comply with tax filing regulations may result in profile deactivation.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">4. Buyer responsibilities</h2>
              <p>Buyers are responsible for: providing accurate and genuine RFQ (Request for Quote) information, engaging with vendors in good faith, completing payment as agreed in deals, and not using the platform to solicit vendors off-platform to avoid Vahivat's terms.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">5. Prohibited conduct</h2>
              <p>The following are strictly prohibited on the platform: creating fake vendor profiles, submitting fraudulent GSTINs, soliciting vendors outside the platform after connecting on Vahivat, using the platform to harass or defraud other users, and reverse-engineering, crawling, or scraping the platform's vendor databases.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">6. Dispute resolution</h2>
              <p>Disputes between buyers and vendors are handled through the platform's dispute resolution process managed by the Group Admin. Vahivat's decision in disputes is final at the platform level. Legal disputes are subject to the jurisdiction of courts in Ahmedabad, Gujarat, India.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">7. Subscription and billing</h2>
              <p>Vendor subscriptions are billed monthly or annually as selected. Subscriptions auto-renew unless cancelled before the renewal date. Refunds are available within 7 days of a new subscription period starting if the vendor has not used the platform during that period. No refunds for partial months.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">8. Limitation of liability</h2>
              <p>Vahivat is a B2B marketplace platform. We facilitate connections between buyers and vendors but are not a party to any transaction between them. We are not liable for: the quality of goods or services delivered by vendors, payment disputes between buyers and vendors, losses arising from incorrect GSTIN data provided by vendors, or any indirect or consequential damages.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">9. Changes to terms</h2>
              <p>We may update these terms and will notify you via WhatsApp or email at least 14 days before changes take effect. Continued use of the platform after that date constitutes acceptance of the updated terms.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">10. Contact</h2>
              <p>For terms-related queries, email <a href="mailto:hello@vahivat.in" className="text-terracotta underline">hello@vahivat.in</a> or WhatsApp us at +91 99999 99999.</p>
              <p className="mt-3">Vahivat Technologies Pvt. Ltd. · Ahmedabad, Gujarat, India</p>
            </div>

          </div>
        </section>
      </main>

      <LandingFooter />
    </>
  )
}
