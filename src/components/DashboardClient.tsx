'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

interface UsageData {
  used_tokens: number
  cap: number
  credits_tokens: number
  reset_at: string
  tier: 'free' | 'paid'
  at_warning: boolean
}

interface Props {
  user: { id: string; email: string; apiKey: string | null }
}

const GATEWAY = process.env.NEXT_PUBLIC_GATEWAY_URL ?? 'http://localhost:3000'

export default function DashboardClient({ user }: Props) {
  const router = useRouter()
  const [apiKey, setApiKey] = useState<string | null>(user.apiKey)
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [loadingUsage, setLoadingUsage] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [topupLoading, setTopupLoading] = useState(false)
  const [cliRelayed, setCliRelayed] = useState(false)

  // Issue API key if not present, then fetch usage
  useEffect(() => {
    async function init() {
      const supabase = createClient()

      // Always call /v1/keys — it's idempotent and guarantees the key exists in the DB.
      // Skipping this based on user_metadata can break when the key was created against
      // a different database (e.g. local dev Docker vs production Supabase).
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/'); return }

      // If we got here as part of the extension/CLI email/password sign-in
      // relay (OAuth is relayed directly from /auth/callback instead), hand
      // the token to the local callback server instead of loading the dashboard.
      const cliPort = document.cookie.match(/(?:^|; )ourcelium_cli_port=([^;]+)/)?.[1]
      if (cliPort) {
        document.cookie = 'ourcelium_cli_port=; path=/; max-age=0'
        setCliRelayed(true)
        window.location.href = `http://localhost:${cliPort}/callback#access_token=${session.access_token}`
        return
      }

      const keysRes = await fetch(`${GATEWAY}/v1/keys`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
      })
      if (!keysRes.ok) { setError('Failed to initialize your account. Please refresh.'); setLoadingUsage(false); return }

      const { key: freshKey } = await keysRes.json()
      setApiKey(freshKey)
      const key = freshKey

      // Refresh session so user_metadata.api_key reflects any newly issued key
      await supabase.auth.refreshSession()

      // Fetch usage
      try {
        const res = await fetch(`${GATEWAY}/v1/usage`, {
          headers: { Authorization: `Bearer ${key}` },
        })
        if (res.ok) setUsage(await res.json())
        else setError('Failed to load usage data.')
      } catch {
        setError('Could not reach the gateway.')
      } finally {
        setLoadingUsage(false)
      }
    }

    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  async function handleUpgrade() {
    if (!apiKey) return
    const res = await fetch(`${GATEWAY}/v1/billing/upgrade`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (res.ok) {
      const { url } = await res.json()
      window.location.href = url
    }
  }

  async function handlePortal() {
    if (!apiKey) return
    const res = await fetch(`${GATEWAY}/v1/billing/portal`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (res.ok) {
      const { url } = await res.json()
      window.location.href = url
    }
  }

  async function handleTopup(pack: 'S' | 'M' | 'L') {
    if (!apiKey) return
    setTopupLoading(true)
    const res = await fetch(`${GATEWAY}/v1/billing/topup`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ pack }),
    })
    if (res.ok) {
      const { url } = await res.json()
      window.location.href = url
    }
    setTopupLoading(false)
  }

  const usedPct = usage ? Math.min((usage.used_tokens / usage.cap) * 100, 100) : 0
  const resetDate = usage ? new Date(usage.reset_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'

  if (cliRelayed) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p className="text-white/60 text-sm">Connected — you can return to your editor.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <span className="text-lg font-semibold tracking-tight">Ourcelium</span>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/40">{user.email}</span>
            <button onClick={signOut} className="text-sm text-white/40 hover:text-white transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm">{error}</div>
        )}

        {/* Tier badge */}
        {usage && (
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              usage.tier === 'paid'
                ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20'
                : 'bg-white/5 text-white/60 border border-white/10'
            }`}>
              {usage.tier === 'paid' ? 'Pro' : 'Free'}
            </span>
          </div>
        )}

        {/* Warning banner */}
        {usage?.at_warning && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-start justify-between gap-4">
            <p className="text-amber-400 text-sm">
              {usage.tier === 'free'
                ? "You've used 80% of your free monthly tokens."
                : "You've used 80% of your monthly token allowance."}
            </p>
            {usage.tier === 'free' ? (
              <button onClick={handleUpgrade} className="shrink-0 text-xs bg-amber-400 text-black font-semibold px-3 py-1.5 rounded-md hover:bg-amber-300 transition-colors">
                Upgrade to Pro
              </button>
            ) : (
              <button onClick={() => handleTopup('M')} disabled={topupLoading} className="shrink-0 text-xs bg-amber-400 text-black font-semibold px-3 py-1.5 rounded-md hover:bg-amber-300 transition-colors disabled:opacity-50">
                Buy tokens
              </button>
            )}
          </div>
        )}

        {/* Usage card */}
        <div className="border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Token usage</h2>
            <span className="text-sm text-white/40">Resets {resetDate}</span>
          </div>

          {loadingUsage ? (
            <div className="h-2 bg-white/5 rounded-full animate-pulse" />
          ) : usage ? (
            <>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    usedPct >= 90 ? 'bg-red-400' : usedPct >= 80 ? 'bg-amber-400' : 'bg-green-400'
                  }`}
                  style={{ width: `${usedPct}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>{(usage.used_tokens / 1_000_000).toFixed(2)}M used</span>
                <span>{(usage.cap / 1_000_000).toFixed(0)}M cap</span>
              </div>
            </>
          ) : null}

          {/* Credits */}
          {usage && usage.credits_tokens > 0 && (
            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <span className="text-sm text-white/50">Extra credits</span>
              <span className="text-sm font-medium">{(usage.credits_tokens / 1_000_000).toFixed(1)}M tokens</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {usage && (
          <div className="space-y-3">
            {usage.tier === 'free' ? (
              <button
                onClick={handleUpgrade}
                className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-white/90 transition-colors text-sm"
              >
                Upgrade to Pro — $10/month
              </button>
            ) : (
              <>
                {/* Top-up packs */}
                <div>
                  <p className="text-sm text-white/40 mb-3">Buy more tokens</p>
                  <div className="grid grid-cols-3 gap-3">
                    {(['S', 'M', 'L'] as const).map((pack, i) => {
                      const labels = ['10M — $5', '20M — $10', '40M — $20']
                      return (
                        <button
                          key={pack}
                          onClick={() => handleTopup(pack)}
                          disabled={topupLoading}
                          className="border border-white/10 rounded-lg p-3 text-sm hover:bg-white/5 transition-colors disabled:opacity-50 text-center"
                        >
                          {labels[i]}
                        </button>
                      )
                    })}
                  </div>
                </div>
                <button
                  onClick={handlePortal}
                  className="w-full border border-white/10 text-white/70 font-medium py-3 rounded-lg hover:bg-white/5 transition-colors text-sm"
                >
                  Manage subscription
                </button>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
