import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

const GATEWAY = process.env.NEXT_PUBLIC_GATEWAY_URL ?? 'http://localhost:3000'

interface Metrics {
  tokens_served: { day: number; week: number; month: number }
  users_by_tier: { free: number; paid: number }
  active_users_by_tier: { free: number; paid: number }
  tokens_per_user: { p95: number; p99: number }
  top_users: { email: string; tokens: number }[]
  ttft_ms: { p50: number; p95: number } | null
  error_rate_pct: number | null
  topups: { count: number; revenue_eur: number } | null
}

function fmtTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 rounded-lg p-4">
      <div className="text-white/40 text-xs font-medium mb-1">{label}</div>
      <div className="text-2xl font-bold tabular-nums">{value}</div>
    </div>
  )
}

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  // is_admin gate — read the gateway-owned users table with a service-role client.
  const admin = createAdminClient()
  const { data: row } = await admin
    .from('users')
    .select('is_admin')
    .eq('supabase_user_id', user.id)
    .single()

  if (!row?.is_admin) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">403</div>
          <p className="text-white/50 text-sm">You don&apos;t have access to this page.</p>
        </div>
      </div>
    )
  }

  const res = await fetch(`${GATEWAY}/admin/metrics`, {
    headers: { Authorization: `Bearer ${process.env.ADMIN_SECRET}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <p className="text-white/50 text-sm">Failed to load metrics ({res.status}).</p>
      </div>
    )
  }

  const m = (await res.json()) as Metrics

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h1 className="text-2xl font-bold">Admin</h1>
          <span className="text-white/40 text-sm">{user.email}</span>
        </div>

        <h2 className="text-white/50 text-xs uppercase tracking-wide mb-3">Tokens served</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <Stat label="Last 24h" value={fmtTokens(m.tokens_served.day)} />
          <Stat label="Last 7 days" value={fmtTokens(m.tokens_served.week)} />
          <Stat label="Last 30 days" value={fmtTokens(m.tokens_served.month)} />
        </div>

        <h2 className="text-white/50 text-xs uppercase tracking-wide mb-3">Users</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Stat label="Free (total)" value={String(m.users_by_tier.free)} />
          <Stat label="Paid (total)" value={String(m.users_by_tier.paid)} />
          <Stat label="Free active (30d)" value={String(m.active_users_by_tier.free)} />
          <Stat label="Paid active (30d)" value={String(m.active_users_by_tier.paid)} />
        </div>

        <h2 className="text-white/50 text-xs uppercase tracking-wide mb-3">Performance &amp; usage</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Stat label="Tokens/user p95 (30d)" value={fmtTokens(m.tokens_per_user.p95)} />
          <Stat label="Tokens/user p99 (30d)" value={fmtTokens(m.tokens_per_user.p99)} />
          <Stat label="TTFT p50 (24h)" value={m.ttft_ms ? `${Math.round(m.ttft_ms.p50)}ms` : '—'} />
          <Stat label="TTFT p95 (24h)" value={m.ttft_ms ? `${Math.round(m.ttft_ms.p95)}ms` : '—'} />
          <Stat label="5xx rate (24h)" value={m.error_rate_pct != null ? `${m.error_rate_pct.toFixed(2)}%` : '—'} />
          <Stat label="Top-ups (30d)" value={m.topups ? String(m.topups.count) : '—'} />
          <Stat label="Top-up revenue (30d)" value={m.topups ? `€${m.topups.revenue_eur.toFixed(2)}` : '—'} />
        </div>

        <h2 className="text-white/50 text-xs uppercase tracking-wide mb-3">Top 20 users by tokens (30d)</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 text-xs border-b border-white/10">
                <th className="text-left font-medium px-4 py-2">#</th>
                <th className="text-left font-medium px-4 py-2">Email</th>
                <th className="text-right font-medium px-4 py-2">Tokens</th>
              </tr>
            </thead>
            <tbody>
              {m.top_users.length === 0 ? (
                <tr><td colSpan={3} className="px-4 py-6 text-center text-white/30">No usage yet</td></tr>
              ) : (
                m.top_users.map((u, i) => (
                  <tr key={u.email} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-2 text-white/40">{i + 1}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{fmtTokens(u.tokens)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
