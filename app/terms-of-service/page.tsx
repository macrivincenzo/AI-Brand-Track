import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions for using AI Brand Track.',
  alternates: {
    canonical: 'https://www.aibrandtrack.com/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="abt-page min-h-screen">
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.aibrandtrack.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Terms of Service",
                "item": "https://www.aibrandtrack.com/terms-of-service"
              }
            ]
          })
        }}
      />
        <div className="mx-auto max-w-[760px] px-4 pb-24 pt-12 sm:px-6 sm:pt-20">
          {/* Breadcrumb Navigation */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-[16px] text-abt-ink-2">
              <li>
                <Link href="/" className="underline-offset-4 hover:text-abt-ink hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-abt-ink">Terms of Service</li>
            </ol>
          </nav>

          <div className="mb-12">
            <h1 className="font-abt-serif text-[length:clamp(38px,6cqi,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-abt-ink mb-5">
              Terms of Service
            </h1>
            <p className="text-[16px] text-abt-ink-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-10 text-[18px] leading-[1.65] text-abt-ink-2">
            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using <Link href="/" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">AI Brand Track</Link> ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">2. Description of Service</h2>
              <p className="leading-relaxed">
                AI Brand Track is a platform that monitors and analyzes how AI models like ChatGPT, Claude, Perplexity, and Google Gemini rank and mention your brand. The Service provides <Link href="/brand-monitor" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">brand visibility tracking</Link>, competitor analysis, and actionable insights.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">3. User Accounts</h2>
              <p className="leading-relaxed mb-4">To use our Service, you must:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Create an account with accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be at least 18 years old</li>
                <li>Be responsible for all activities that occur under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">4. Payment and Credits</h2>
              <p className="leading-relaxed mb-4">Our Service operates on a credit-based system:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Credits are required to perform brand analyses</li>
                <li>Credits are purchased in advance and do not expire</li>
                <li>All payments are processed securely through third-party payment processors</li>
                <li>Starter trial guarantee: if you are not satisfied during your 14-day Starter trial, email support@aibrandtrack.com before the trial ends and we will refund the $9 trial fee in full. One refund per customer; refunding the trial also cancels the subscription.</li>
                <li>Subscription fees and credit purchases are non-refundable, except where required by law.</li>
                <li>We reserve the right to change pricing with notice</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">5. Acceptable Use</h2>
              <p className="leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Service for any illegal or unauthorized purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Interfere with or disrupt the Service or servers</li>
                <li>Attempt to gain unauthorized access to any portion of the Service</li>
                <li>Use automated systems to access the Service without permission</li>
                <li>Reproduce, duplicate, copy, or exploit any portion of the Service</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">6. Intellectual Property</h2>
              <p className="leading-relaxed">
                The Service and its original content, features, and functionality are owned by AI Brand Track and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">7. Data and Analytics</h2>
              <p className="leading-relaxed">
                You retain ownership of any data you submit to the Service. By using the Service, you grant us a license to use, store, and process your data solely for the purpose of providing the Service. We may use aggregated and anonymized data for analytics and improvement purposes.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">8. Service Availability</h2>
              <p className="leading-relaxed">
                We strive to maintain high availability of our Service but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">9. Disclaimer of Warranties</h2>
              <p className="leading-relaxed">
                The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be uninterrupted, secure, or error-free.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">10. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the maximum extent permitted by law, AI Brand Track shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">11. Termination</h2>
              <p className="leading-relaxed">
                We may terminate or suspend your account and access to the Service immediately, without prior notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">12. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms of Service at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">13. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">14. Contact Information</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us through our <Link href="/" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">platform</Link> or email us at legal@aibrandtrack.com.
              </p>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-16 pt-8 border-t border-abt-divider">
            <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-6">Related Pages</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/privacy-policy" className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent">
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">Privacy Policy</h3>
                <p className="text-[16px] text-abt-ink-2">Read our privacy policy</p>
              </Link>
              <Link href="/about" className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent">
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">About Us</h3>
                <p className="text-[16px] text-abt-ink-2">Learn more about AI Brand Track</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

