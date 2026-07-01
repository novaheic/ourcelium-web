import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const cliPort = request.cookies.get('ourcelium_cli_port')?.value

  if (code) {
    const supabase = await createClient()
    const { data } = await supabase.auth.exchangeCodeForSession(code)

    // CLI/extension sign-in relay: hand the token straight to the local
    // callback server instead of round-tripping through /dashboard, since
    // that request depends on the browser having already picked up the
    // just-set auth cookies.
    if (cliPort && data.session) {
      const response = NextResponse.redirect(
        `http://localhost:${cliPort}/callback#access_token=${data.session.access_token}`,
      )
      response.cookies.delete('ourcelium_cli_port')
      return response
    }
  }

  return NextResponse.redirect(`${origin}/dashboard`)
}
