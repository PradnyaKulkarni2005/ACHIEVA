import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { getSupabaseEnv } from '@/lib/supabase/config'

export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  const { supabaseUrl, supabaseAnonKey, isConfigured } = getSupabaseEnv()

  if (!isConfigured) {
    throw new Error('Invalid Supabase anon key. Replace the placeholder value in .env.local with your actual anon key from the Supabase dashboard.')
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions)
            )
          } catch {
            // The `setAll` method can throw if called from a Server Component.
          }
        },
      },
    }
  )
}

export function createServiceRoleSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not configured. Add it to your environment to enable certificate uploads.')
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}
