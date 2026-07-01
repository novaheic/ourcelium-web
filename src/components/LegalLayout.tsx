import Link from 'next/link'

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold tracking-tight">Ourcelium</Link>
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-white/40 mb-12">Last updated: {updated}</p>
        <div className="legal-prose space-y-6 text-white/70 leading-relaxed">
          {children}
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <div className="flex justify-center gap-6 text-xs text-white/30">
          <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
          <Link href="/impressum" className="hover:text-white/60 transition-colors">Impressum</Link>
        </div>
      </footer>
    </div>
  )
}
