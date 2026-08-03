'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export type AuthRole = 'Student' | 'Faculty' | 'Admin'

export interface SignupFormData {
  full_name: string
  email: string
  password: string
  role: AuthRole
  department: string
  branch: string
  year: string
}

function normalizeRole(role: string): AuthRole {
  const normalizedRole = role?.toLowerCase()

  if (normalizedRole === 'faculty') {
    return 'Faculty'
  }

  if (normalizedRole === 'admin') {
    return 'Admin'
  }

  return 'Student'
}

function getRedirectPath(role: AuthRole | string) {
  const normalizedRole = normalizeRole(role)

  switch (normalizedRole) {
    case 'Faculty':
      return '/faculty'
    case 'Admin':
      return '/admin/dashboard'
    default:
      return '/student'
  }
}

export async function signUpAction(formData: SignupFormData) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        full_name: formData.full_name,
        role: normalizeRole(formData.role),
        department: formData.department,
        branch: formData.branch,
        year: formData.year,
      },
    },
  })

  if (error) {
    return { success: false, message: error.message }
  }

  if (!data.user?.id) {
    return { success: false, message: 'Signup succeeded but no user was created.' }
  }

  const profilePayload = {
    id: data.user.id,
    full_name: formData.full_name,
    email: formData.email,
    role: normalizeRole(formData.role),
    department: formData.department,
    branch: formData.branch,
    year: formData.year,
  }

  const { error: profileError } = await supabase.from('profiles').upsert(profilePayload, { onConflict: 'id' })

  if (profileError) {
    return { success: false, message: profileError.message }
  }

  revalidatePath('/')
  redirect(getRedirectPath(normalizeRole(formData.role)))
}

export async function signInAction(formData: { email: string; password: string }) {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    return { success: false, message: error.message }
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: 'Unable to resolve your account role.' }
  }

  const role = user.user_metadata?.role ?? 'Student'

  revalidatePath('/')
  redirect(getRedirectPath(role))
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
  redirect('/')
}

export async function resetPasswordAction(formData: { email: string }) {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/reset-password`,
  })

  if (error) {
    return { success: false, message: error.message }
  }

  return { success: true, message: 'Password reset link sent. Check your inbox.' }
}
