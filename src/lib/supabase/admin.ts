import { createClient } from '@supabase/supabase-js'

// Service-role client for server-only reads of the gateway-owned `users` table
// (e.g. the is_admin flag), bypassing RLS. Never import this into client code.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  )
}
