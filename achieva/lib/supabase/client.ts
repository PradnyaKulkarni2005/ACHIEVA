import { createBrowserClient } from '@supabase/ssr'
import { getSupabaseEnv } from '@/lib/supabase/config'

export function createClient() {
  const { supabaseUrl, supabaseAnonKey, isConfigured } = getSupabaseEnv()

  if (!isConfigured) {
    throw new Error('Invalid Supabase anon key. Replace the placeholder value in .env.local with your actual anon key from the Supabase dashboard.')
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
