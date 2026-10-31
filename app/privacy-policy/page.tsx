import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How AI Brand Track collects, uses and protects your personal data.',
  alternates: {
    canonical: 'https://www.aibrandtrack.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
                "name": "Privacy Policy",
                "item": "https://www.aibrandtrack.com/privacy-policy"
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
              <li className="text-abt-ink">Privacy Policy</li>
            </ol>
          </nav>

          <div className="mb-12">
            <h1 className="font-abt-serif text-[length:clamp(38px,6cqi,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-abt-ink mb-5">
              Privacy Policy
            </h1>
            <p className="text-[16px] text-abt-ink-2">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

        <div className="prose prose-lg max-w-none">
          <div className="space-y-10 text-[18px] leading-[1.65] text-abt-ink-2">
            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                AI Brand Track ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our <Link href="/brand-monitor" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">AI brand visibility monitoring platform</Link>.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">2. Information We Collect</h2>
              <p className="leading-relaxed mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email address, password)</li>
                <li>Company information (website URLs, brand names, competitor names)</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Usage data and analytics related to your use of our platform</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">4. Information Sharing and Disclosure</h2>
              <p className="leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>With service providers who assist us in operating our platform</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your consent or at your direction</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">6. Your Rights</h2>
              <p className="leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and receive a copy of your personal data</li>
                <li>Rectify inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">8. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">9. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-4">10. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our <Link href="/" className="text-abt-ink underline underline-offset-4 hover:text-abt-accent">platform</Link> or email us at privacy@aibrandtrack.com.
              </p>
            </section>
          </div>

          {/* Related Links */}
          <div className="mt-16 pt-8 border-t border-abt-divider">
            <h2 className="font-abt-serif text-[length:clamp(26px,3.4cqi,32px)] font-semibold leading-[1.2] tracking-[-0.015em] text-abt-ink mb-6">Related Pages</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/terms-of-service" className="block rounded-abt-tile border border-abt-line bg-abt-surface p-5 transition-colors hover:border-abt-accent">
                <h3 className="text-[19px] font-bold text-abt-ink mb-2">Terms of Service</h3>
                <p className="text-[16px] text-abt-ink-2">Read our terms and conditions</p>
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

