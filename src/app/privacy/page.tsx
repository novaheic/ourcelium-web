import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = { title: 'Privacy Policy — Ourcelium' }

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-white pt-4">{children}</h2>
)

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="1 July 2026">
      <p>
        This Privacy Policy explains how Ourcelium (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses,
        and shares personal data when you use our website, VS Code extension, CLI, and API gateway (the
        &ldquo;Service&rdquo;). The data controller is the provider identified in the{' '}
        <a href="/impressum" className="text-white underline">Impressum</a>. We process personal data in
        accordance with the EU General Data Protection Regulation (GDPR) and applicable law.
      </p>

      <H>1. Data we collect</H>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Account data</strong> — your email address and authentication identifiers, provided by you or by your chosen sign-in provider (email, GitHub, or Google).</li>
        <li><strong>API key</strong> — we generate an API key linked to your account; we store only a cryptographic hash of it.</li>
        <li><strong>Usage metadata</strong> — per request we record token counts, the model used, timestamps, and status. We do <strong>not</strong> store the content of your prompts, code, or the AI&rsquo;s responses.</li>
        <li><strong>Billing data</strong> — if you subscribe or buy tokens, our payment processor (Stripe) handles your payment details. We receive your customer and subscription identifiers and billing status, not your full card number.</li>
        <li><strong>Technical data</strong> — IP address and basic request metadata processed transiently for security, rate limiting, and operating the Service.</li>
      </ul>

      <H>2. How your prompts and code are handled</H>
      <p>
        To generate responses, the content you submit (&ldquo;Input&rdquo;) is transmitted through our
        gateway to a third-party model provider (currently Together.ai) for processing. We do not
        retain the content of your Input or the generated Output on our systems — only the usage
        metadata described above. The model provider processes your Input under its own terms and
        privacy policy.
      </p>

      <H>3. Why we process your data and legal bases</H>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>To provide the Service</strong> (account creation, authentication, inference, usage tracking) — performance of a contract (Art. 6(1)(b) GDPR).</li>
        <li><strong>To process payments and prevent fraud</strong> — contract and legal obligation (Art. 6(1)(b), (c) GDPR).</li>
        <li><strong>To secure and improve the Service</strong> (rate limiting, abuse detection, aggregate metrics) — our legitimate interests (Art. 6(1)(f) GDPR).</li>
        <li><strong>To comply with legal obligations</strong> such as tax and accounting record-keeping — legal obligation (Art. 6(1)(c) GDPR).</li>
      </ul>

      <H>4. Sub-processors and third parties</H>
      <p>We share personal data only with service providers that process it on our behalf:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Supabase</strong> — authentication and database hosting.</li>
        <li><strong>Together.ai</strong> — large language model inference (processes your Input).</li>
        <li><strong>Stripe</strong> — payment processing.</li>
        <li><strong>Railway</strong> — gateway/API hosting.</li>
        <li><strong>Netlify</strong> — website hosting.</li>
        <li><strong>GitHub / Google</strong> — optional sign-in providers, if you choose them.</li>
      </ul>
      <p>
        We do not sell your personal data. Some providers are located outside the European Economic
        Area; where that is the case, transfers are safeguarded by mechanisms such as the EU Standard
        Contractual Clauses or an adequacy decision.
      </p>

      <H>5. Retention</H>
      <p>
        We keep account and usage metadata for as long as your account is active and as needed to
        operate the Service. Billing records are retained as required by applicable tax and accounting
        law. When you delete your account, we delete or anonymise your personal data except where we
        must retain it to meet a legal obligation.
      </p>

      <H>6. Your rights</H>
      <p>Under the GDPR you have the right to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>access the personal data we hold about you;</li>
        <li>request correction of inaccurate data;</li>
        <li>request erasure (&ldquo;right to be forgotten&rdquo;);</li>
        <li>restrict or object to certain processing;</li>
        <li>data portability;</li>
        <li>withdraw consent where processing is based on consent;</li>
        <li>lodge a complaint with your local data protection authority.</li>
      </ul>
      <p>
        To exercise any of these rights, contact{' '}
        <a href="mailto:privacy@ourcelium.dev" className="text-white underline">privacy@ourcelium.dev</a>.
      </p>

      <H>7. Cookies</H>
      <p>
        We use only strictly necessary cookies to keep you signed in and to operate the Service. We do
        not use advertising or third-party tracking cookies.
      </p>

      <H>8. Security</H>
      <p>
        We use industry-standard measures to protect your data, including hashing of API keys and
        encrypted transport (HTTPS). No method of transmission or storage is completely secure, and we
        cannot guarantee absolute security.
      </p>

      <H>9. Children</H>
      <p>The Service is not directed to children and is intended for users 18 and older.</p>

      <H>10. Changes</H>
      <p>
        We may update this Policy from time to time. Material changes will be reflected by the
        &ldquo;Last updated&rdquo; date above and, where appropriate, communicated to you.
      </p>

      <H>11. Contact</H>
      <p>
        Data protection enquiries:{' '}
        <a href="mailto:privacy@ourcelium.dev" className="text-white underline">privacy@ourcelium.dev</a>.
        Full provider details are in the <a href="/impressum" className="text-white underline">Impressum</a>.
      </p>
    </LegalLayout>
  )
}
