'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import SignIn from '@/components/SignIn'

export default function CliAuth() {
  const searchParams = useSearchParams()
  const port = searchParams.get('port')
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    async function check() {
      if (!port) { setCheckingSession(false); return }

      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        window.location.href = `http://localhost:${port}/callback#access_token=${session.access_token}`
        return
      }

      // Readable server-side by /auth/callback so the OAuth redirect chain
      // can relay straight to the local server without depending on a
      // follow-up /dashboard request recognizing the new session.
      document.cookie = `ourcelium_cli_port=${port}; path=/; max-age=300; samesite=lax`
      setCheckingSession(false)
    }

    check()
  }, [port])

  if (checkingSession) {
    return <p className="text-white/60 text-sm text-center">Checking sign-in status...</p>
  }

  return (
    <div className="max-w-md w-full mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">Sign in to Ourcelium</h1>
      <SignIn />
    </div>
  )
}
