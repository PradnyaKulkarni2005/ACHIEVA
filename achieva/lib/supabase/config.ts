export function getSupabaseEnv() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  const hasValidConfig = Boolean(supabaseUrl && supabaseAnonKey && !/YOUR_SUPABASE/i.test(supabaseAnonKey))

  if (!hasValidConfig) {
    return {
      supabaseUrl: supabaseUrl ?? '',
      supabaseAnonKey: supabaseAnonKey ?? '',
      isConfigured: false,
      errorMessage: 'Invalid Supabase anon key. Replace the placeholder value in .env.local with your actual anon key from the Supabase dashboard.',
    }
  }

  return { supabaseUrl, supabaseAnonKey, isConfigured: true, errorMessage: null }
}
