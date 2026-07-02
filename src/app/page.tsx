import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignIn from '@/components/SignIn'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) redirect('/dashboard')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">Ourcelium</span>
          <a href="#signin" className="text-sm text-white/60 hover:text-white transition-colors">Sign in</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight mb-4">AI coding at your pace</h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
          A VS Code extension and CLI powered by Qwen3-235B. 2M tokens free every month — no credit card needed.
        </p>
        <a
          href="#signin"
          className="inline-block bg-white text-black font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
        >
          Get started free
        </a>
      </section>

      {/* Install */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-white/10 rounded-xl p-6">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">VS Code / Cursor</div>
            <h3 className="text-lg font-semibold mb-3">Extension</h3>
            <p className="text-white/60 text-sm mb-4">
              Install from the VS Code Marketplace. Sign in once — the extension handles everything automatically.
            </p>
            <code className="block bg-white/5 rounded-lg px-4 py-3 text-sm font-mono text-white/80">
              ext install ourcelium.ourcelium
            </code>
          </div>
          <div className="border border-white/10 rounded-xl p-6">
            <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-3">Terminal</div>
            <h3 className="text-lg font-semibold mb-3">CLI</h3>
            <p className="text-white/60 text-sm mb-4">
              Interactive REPL in your terminal. <code className="text-white/80">@file</code> context, slash commands, permission prompts.
            </p>
            <code className="block bg-white/5 rounded-lg px-4 py-3 text-sm font-mono text-white/80">
              brew install novaheic/ourcelium/ourcelium
            </code>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-10">Simple pricing</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="border border-white/10 rounded-xl p-8">
            <div className="text-white/40 text-sm font-medium mb-2">Free</div>
            <div className="text-4xl font-bold mb-1">$0</div>
            <div className="text-white/40 text-sm mb-6">forever</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 2M tokens / month</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Resets on signup anniversary</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Full model access</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> VS Code + CLI</li>
            </ul>
          </div>
          <div className="border border-white/20 rounded-xl p-8 bg-white/[0.03]">
            <div className="text-white/40 text-sm font-medium mb-2">Pro</div>
            <div className="text-4xl font-bold mb-1">$10</div>
            <div className="text-white/40 text-sm mb-6">per month</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> 25M tokens / month</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Buy extra tokens anytime</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Credits never expire</li>
              <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Everything in Free</li>
            </ul>
          </div>
        </div>
        <p className="text-center text-white/30 text-xs mt-6">
          Extra token packs (Pro only): $5 / 10M · $10 / 20M · $20 / 40M
        </p>
      </section>

      {/* Sign in */}
      <section id="signin" className="max-w-md mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold text-center mb-8">Create your account</h2>
        <SignIn />
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center">
        <div className="flex justify-center gap-6 text-xs text-white/30">
          <a href="/terms" className="hover:text-white/60 transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="/impressum" className="hover:text-white/60 transition-colors">Impressum</a>
        </div>
      </footer>
    </div>
  )
}
