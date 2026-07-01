import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = { title: 'Terms of Service — Ourcelium' }

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-white pt-4">{children}</h2>
)

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="1 July 2026">
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of Ourcelium (the
        &ldquo;Service&rdquo;), operated by the provider identified in the{' '}
        <a href="/impressum" className="text-white underline">Impressum</a>. By creating an account or
        using the Service, you agree to these Terms. If you do not agree, do not use the Service.
      </p>

      <H>1. The Service</H>
      <p>
        Ourcelium provides an AI coding assistant delivered as a VS Code extension, a command-line
        interface, and an API gateway that proxies requests to third-party large language model
        providers. Features, models, and limits may change over time.
      </p>

      <H>2. Accounts</H>
      <p>
        You must provide accurate account information and are responsible for activity under your
        account and for keeping your API key confidential. You must be at least 18 years old, or the
        age of majority in your jurisdiction, to use the Service. You are responsible for all use of
        the Service made with your credentials.
      </p>

      <H>3. Plans, usage limits &amp; billing</H>
      <p>
        The Service offers a free tier with a monthly token allowance and a paid &ldquo;Pro&rdquo;
        subscription with a higher allowance and optional token top-up packs. Paid plans are billed
        through Stripe. Subscriptions renew automatically until cancelled. Token top-up purchases are
        one-time payments. Except where required by law, payments are non-refundable. We may change
        pricing with reasonable notice; changes do not affect the current paid period.
      </p>
      <p>
        When you reach a usage limit, the Service may return an error and pause access until your
        period resets, you upgrade, or you purchase additional tokens. Rate limits apply to all
        accounts to protect the Service.
      </p>

      <H>4. Acceptable use</H>
      <p>You agree not to:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>use the Service to generate unlawful, harmful, or infringing content;</li>
        <li>attempt to circumvent usage limits, rate limits, or billing;</li>
        <li>resell, sublicense, or provide the Service to third parties without permission;</li>
        <li>reverse engineer, disrupt, or overload the Service or its infrastructure;</li>
        <li>use automated means to abuse the free tier or create multiple accounts to exceed limits.</li>
      </ul>

      <H>5. Your content</H>
      <p>
        You retain all rights to the code, prompts, and other inputs you submit (&ldquo;Input&rdquo;)
        and to the outputs generated for you (&ldquo;Output&rdquo;). To operate the Service, your
        Input is transmitted to third-party model providers for processing. We do not store the
        content of your Input or Output; we retain only metadata such as token counts (see the{' '}
        <a href="/privacy" className="text-white underline">Privacy Policy</a>). You are responsible
        for your Input and for how you use any Output. AI-generated Output may be inaccurate; review
        it before relying on it.
      </p>

      <H>6. Third-party services</H>
      <p>
        The Service relies on third parties including model providers, payment processors, and hosting
        and authentication providers. Your use may be subject to their terms, and we are not
        responsible for their acts or omissions.
      </p>

      <H>7. Availability &amp; changes</H>
      <p>
        The Service is provided on an &ldquo;as available&rdquo; basis. We may modify, suspend, or
        discontinue any part of the Service at any time. We aim to give reasonable notice of material
        changes where practicable.
      </p>

      <H>8. Disclaimer of warranties</H>
      <p>
        To the maximum extent permitted by law, the Service is provided &ldquo;as is&rdquo; and
        &ldquo;as available&rdquo; without warranties of any kind, whether express or implied,
        including fitness for a particular purpose, merchantability, non-infringement, and accuracy of
        Output.
      </p>

      <H>9. Limitation of liability</H>
      <p>
        To the maximum extent permitted by law, we are not liable for indirect, incidental, special,
        consequential, or punitive damages, or for lost profits or data. Our total aggregate liability
        for any claim relating to the Service is limited to the amount you paid to us in the twelve
        months preceding the event giving rise to the claim. Nothing in these Terms excludes liability
        that cannot be excluded under applicable law (including liability for intent or gross
        negligence, or for injury to life, body, or health).
      </p>

      <H>10. Termination</H>
      <p>
        You may stop using the Service and cancel your subscription at any time via the customer
        portal. We may suspend or terminate your access if you breach these Terms or to comply with
        law. Provisions that by their nature should survive termination will survive.
      </p>

      <H>11. Governing law</H>
      <p>
        These Terms are governed by the laws of the jurisdiction stated in the{' '}
        <a href="/impressum" className="text-white underline">Impressum</a>, without regard to conflict
        of law rules, and subject to any mandatory consumer protection rights in your country of
        residence.
      </p>

      <H>12. Changes to these Terms</H>
      <p>
        We may update these Terms from time to time. If we make material changes, we will update the
        &ldquo;Last updated&rdquo; date and, where appropriate, notify you. Continued use after changes
        take effect constitutes acceptance.
      </p>

      <H>13. Contact</H>
      <p>
        Questions about these Terms: <a href="mailto:hello@ourcelium.dev" className="text-white underline">hello@ourcelium.dev</a>.
      </p>
    </LegalLayout>
  )
}
