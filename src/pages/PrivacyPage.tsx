import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PillNav from '@/components/PillNav'
import { PUBLIC_NAV_ITEMS, DARK_NAV_COLORS } from '@/config/navItems'
import { LandingFooter } from '@/components/landing/LandingFooter'

export const PrivacyPage = () => {
  const location = useLocation()

  return (
    <>
      <Helmet>
        <title>Privacy Policy — Vahivat</title>
        <meta name="description" content="Vahivat's privacy policy. We collect only what we need to run the platform and never sell your data to third parties." />
        <link rel="canonical" href="https://vahivat.in/privacy" />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* PillNav */}
      <div style={{ position: 'fixed', top: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 100, width: 'fit-content', maxWidth: 'calc(100vw - 32px)' }}>
        <PillNav logoAlt="Vahivat" items={PUBLIC_NAV_ITEMS} activeHref={location.pathname} {...DARK_NAV_COLORS} initialLoadAnimation={false} />
      </div>

      <main style={{ background: '#0A0A0A', minHeight: '100vh', color: '#fff' }}>
        <section style={{ paddingTop: '140px', paddingBottom: '80px' }} className="px-6 md:px-10 max-w-3xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-4">Legal</p>
          <h1 className="font-bold text-white text-4xl mb-3" style={{ letterSpacing: '-0.02em' }}>Privacy Policy</h1>
          <p className="text-gray-500 text-sm mb-12">Last updated: June 2026 · Applies to vahivat.in</p>

          {/* Prose content */}
          <div className="prose-dark space-y-10 text-gray-300 text-sm leading-relaxed">

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">1. What we collect and why</h2>
              <p>When you sign up on Vahivat, we collect your mobile number for authentication, your GSTIN to verify your business, and your business name and contact details to create your profile. We collect this because the platform cannot function without knowing who you are and that your business is legitimate.</p>
              <p className="mt-3">We also collect usage data — which pages you visit, how you use the search, and which vendors you contact — to improve the platform. This data is anonymised and aggregated wherever possible.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">2. How we use your data</h2>
              <p>Your data is used to: operate your account, verify your GSTIN against government databases, connect you with buyers or vendors on the platform, send you notifications about RFQs, deals, and platform updates (via WhatsApp or SMS), and improve the platform based on usage patterns.</p>
              <p className="mt-3">We do not use your data for advertising. We do not sell your data to third parties. Ever.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">3. GSTIN verification</h2>
              <p>When you provide your GSTIN, we verify it against the Government of India's GST portal via an authorised API provider. Your GSTIN is checked for registration status, trade name, and filing history. This data is stored on our servers to display your verified badge and is re-checked periodically to ensure ongoing compliance.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">4. Data sharing</h2>
              <p>We share your business profile information (name, city, categories, verified status) with buyers who search for vendors on the platform. This is the core function of the service and you consent to it by creating a vendor profile. We share buyer contact details with vendors only when the buyer initiates an RFQ or inquiry.</p>
              <p className="mt-3">We use third-party service providers for: GSTIN verification (Deepvue, Surepass, or similar), payment processing (Razorpay), WhatsApp messaging (via authorised BSP), and cloud hosting (AWS or equivalent). Each of these providers is bound by data processing agreements.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">5. Data retention</h2>
              <p>We retain your account data for as long as your account is active. If you delete your account, we delete your personal data within 30 days, except where we are required to retain it for legal or tax compliance purposes (such as invoice records, which must be retained for 7 years under Indian accounting law).</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">6. Your rights</h2>
              <p>You have the right to: access the data we hold about you, correct inaccurate data, request deletion of your account and associated data, and opt out of marketing communications. To exercise any of these rights, contact us at hello@vahivat.in or WhatsApp us at +91 99999 99999.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">7. Cookies</h2>
              <p>We use only essential cookies required for authentication and session management. We do not use advertising cookies or third-party tracking cookies. You can disable cookies in your browser settings, but this will affect your ability to stay logged in.</p>
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg mb-3">8. Contact</h2>
              <p>For any privacy-related queries, contact us at <a href="mailto:hello@vahivat.in" className="text-terracotta underline">hello@vahivat.in</a>. We aim to respond within 48 hours.</p>
              <p className="mt-3">Vahivat Technologies Pvt. Ltd. · Ahmedabad, Gujarat, India</p>
            </div>

          </div>
        </section>
      </main>

      <LandingFooter />
    </>
  )
}
