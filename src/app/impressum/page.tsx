import type { Metadata } from 'next'
import LegalLayout from '@/components/LegalLayout'

export const metadata: Metadata = { title: 'Impressum — Ourcelium' }

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-white pt-4">{children}</h2>
)

export default function ImpressumPage() {
  return (
    <LegalLayout title="Impressum" updated="1 July 2026">
      <p className="text-sm text-white/40">
        Information pursuant to § 5 DDG (Digitale-Dienste-Gesetz) and § 18 MStV.
      </p>

      <H>Provider</H>
      <p>
        Nova Heidt<br />
        Berolinastr. 9<br />
        10178 Berlin<br />
        Germany
      </p>

      <H>Contact</H>
      <p>
        Email: <a href="mailto:hello@ourcelium.dev" className="text-white underline">hello@ourcelium.dev</a>
        {/* A phone number is not strictly mandatory, but you must offer a second
            quick means of contact. Email plus a contact form generally suffices. */}
      </p>

      <H>Responsible for content pursuant to § 18 Abs. 2 MStV</H>
      <p>
        Nova Heidt, address as above.
      </p>

      <p className="text-sm text-white/40">
        As a small business under § 19 UStG (Kleinunternehmer), no VAT is shown and no VAT
        identification number is issued.
      </p>

      <H>EU dispute resolution</H>
      <p>
        The European Commission provides a platform for online dispute resolution (ODR):{' '}
        <a href="https://ec.europa.eu/consumers/odr" className="text-white underline" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>. We are neither obliged nor willing to participate in dispute resolution proceedings before
        a consumer arbitration board.
      </p>

      <H>Liability for content</H>
      <p>
        As a service provider we are responsible for our own content on these pages in accordance with
        general law. We are not obliged to monitor transmitted or stored third-party information or to
        investigate circumstances that indicate illegal activity. Obligations to remove or block the
        use of information under general law remain unaffected.
      </p>

      <H>Liability for links</H>
      <p>
        Our site may contain links to external websites over whose content we have no control. We
        accept no liability for such external content. The respective provider or operator of the
        linked pages is always responsible for their content.
      </p>

      <H>Copyright</H>
      <p>
        Content and works created by the provider on these pages are subject to copyright. Third-party
        contributions are marked as such.
      </p>
    </LegalLayout>
  )
}
