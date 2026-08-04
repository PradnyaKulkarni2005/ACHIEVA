'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export type AuthRole = 'student' | 'faculty' | 'admin'

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
  switch (role.toLowerCase()) {
    case "faculty":
      return "faculty";
    case "admin":
      return "admin";
    default:
      return "student";
  }
}
function getRedirectPath(role: AuthRole | string) {
  const normalizedRole = normalizeRole(role)

  switch (normalizedRole) {
    case 'faculty':
      return '/faculty'
    case 'admin':
      return '/admin/dashboard'
    default:
      return '/student'
  }
}

function getFriendlyAuthMessage(error: { message?: string; status?: number } | null | undefined) {
  const message = error?.message?.toLowerCase() ?? ''

  if (message.includes('rate limit') || message.includes('too many requests') || message.includes('email rate limit')) {
    return 'Too many emails were sent recently. Please wait a few minutes and try again.'
  }

  if (message.includes('invalid login credentials') || message.includes('invalid_grant')) {
    return 'Invalid email or password.'
  }

  return error?.message ?? 'Something went wrong. Please try again.'
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
    return { success: false, message: getFriendlyAuthMessage(error) }
  }

  if (!data.user?.id) {
    return { success: false, message: 'Signup succeeded but no user was created.' }
  }

  


  revalidatePath('/')

  return {
    success: true,
    message: 'Account created successfully. Please verify your email before signing in.',
  }
}

export async function signInAction(formData: { email: string; password: string }) {
  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) {
    return { success: false, message: getFriendlyAuthMessage(error) }
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
    return { success: false, message: getFriendlyAuthMessage(error) }
  }

  return { success: true, message: 'Password reset link sent. Check your inbox.' }
}
