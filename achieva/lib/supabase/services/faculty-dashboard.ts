'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient, createServiceRoleSupabaseClient } from '@/lib/supabase/server'

export interface FacultyAchievementRecord {
  id: string
  title: string
  description: string | null
  category: string | null
  organizer: string | null
  achievement_date: string | null
  certificate_url: string | null
  proof_url: string | null
  status: string
  faculty_remark: string | null
  created_at: string
  student_id: string
  student_name: string
  student_department: string | null
  student_year: number | null
  student_email: string | null
}

export interface FacultyDashboardData {
  achievements: FacultyAchievementRecord[]
  departments: string[]
  totalPages: number
  currentPage: number
  totalCount: number
}

function normalizeRole(role: string | null | undefined) {
  const normalized = role?.toLowerCase()

  if (normalized === 'faculty') return 'faculty'
  if (normalized === 'admin') return 'admin'
  return 'student'
}

function getStatusLabel(status: string) {
  switch (status?.toLowerCase()) {
    case 'approved':
      return 'Approved'
    case 'rejected':
      return 'Rejected'
    default:
      return 'Pending'
  }
}

export async function getFacultyDashboardData(filters: {
  search?: string
  department?: string
  status?: string
  sort?: string
  page?: number
}) {
  const supabase = await createServerSupabaseClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role, department, full_name')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    redirect('/auth/login')
  }

  if (!['faculty', 'admin'].includes(normalizeRole(profile.role))) {
    redirect('/student')
  }

  let query = supabase.from('achievements').select('*').order('created_at', { ascending: false })

  const statusFilter = filters.status || 'Pending'
  if (statusFilter && statusFilter !== 'All') {
    query = query.eq('status', getStatusLabel(statusFilter))
  }

  const { data: achievementsData, error: achievementsError } = await query

  if (achievementsError) {
    throw new Error(achievementsError.message)
  }

  const studentIds = Array.from(
    new Set((achievementsData ?? []).map((item) => item.student_id).filter(Boolean))
  )

  const profilesById = new Map<string, { full_name: string; department: string | null; year: number | null; email: string | null }>()

  if (studentIds.length) {
    const { data: studentsData } = await supabase
      .from('profiles')
      .select('id, full_name, department, year, email')
      .in('id', studentIds)

    ;(studentsData ?? []).forEach((student) => {
      profilesById.set(student.id, {
        full_name: student.full_name,
        department: student.department,
        year: student.year,
        email: student.email,
      })
    })
  }

  const normalizedAchievements: FacultyAchievementRecord[] = (achievementsData ?? []).map((achievement) => {
    const profileData = profilesById.get(achievement.student_id)

    return {
      id: achievement.id,
      title: achievement.title,
      description: achievement.description,
      category: achievement.category,
      organizer: achievement.organizer,
      achievement_date: achievement.achievement_date,
      certificate_url: achievement.certificate_url,
      proof_url: achievement.proof_url,
      status: achievement.status,
      faculty_remark: achievement.faculty_remark,
      created_at: achievement.created_at,
      student_id: achievement.student_id,
      student_name: profileData?.full_name ?? 'Unknown Student',
      student_department: profileData?.department ?? null,
      student_year: profileData?.year ?? null,
      student_email: profileData?.email ?? null,
    }
  })

  const searchTerm = (filters.search ?? '').trim().toLowerCase()
  const departmentFilter = (filters.department ?? '').trim().toLowerCase()

  const filteredAchievements = normalizedAchievements.filter((achievement) => {
    const matchesSearch =
      !searchTerm ||
      achievement.student_name.toLowerCase().includes(searchTerm) ||
      achievement.title.toLowerCase().includes(searchTerm) ||
      (achievement.student_department?.toLowerCase() ?? '').includes(searchTerm)

    const matchesDepartment =
      !departmentFilter ||
      (achievement.student_department?.toLowerCase() ?? '').includes(departmentFilter)

    return matchesSearch && matchesDepartment
  })

  const sortMode = (filters.sort ?? 'newest').toLowerCase()
  const sortedAchievements = [...filteredAchievements].sort((left, right) => {
    if (sortMode === 'oldest') {
      return new Date(left.created_at).getTime() - new Date(right.created_at).getTime()
    }

    return new Date(right.created_at).getTime() - new Date(left.created_at).getTime()
  })

  const pageSize = 5
  const currentPage = Math.max(1, Number(filters.page ?? 1))
  const totalCount = sortedAchievements.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const startIndex = (currentPage - 1) * pageSize
  const paginatedAchievements = sortedAchievements.slice(startIndex, startIndex + pageSize)

  const departments = Array.from(
    new Set(
      normalizedAchievements
        .map((achievement) => achievement.student_department)
        .filter((value): value is string => Boolean(value))
    )
  ).sort()

  return {
    achievements: paginatedAchievements,
    departments,
    totalPages,
    currentPage,
    totalCount,
  }
}

export async function reviewAchievementAction(formData: FormData) {
  const achievementId = formData.get('achievementId')?.toString()
  const action = formData.get('action')?.toString()
  const remarks = formData.get('remarks')?.toString() ?? ''

  if (!achievementId || !action) {
    redirect('/faculty')
  }

  const supabase = await createServerSupabaseClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/auth/login')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    redirect('/auth/login')
  }

  if (!['faculty', 'admin'].includes(normalizeRole(profile.role))) {
    redirect('/student')
  }

  const status = action === 'approve' ? 'Approved' : 'Rejected'
  const trimmedRemarks = remarks.trim()

  const writeClient = createServiceRoleSupabaseClient()
  const { data: achievementRow, error: achievementLookupError } = await writeClient
    .from('achievements')
    .select('student_id')
    .eq('id', achievementId)
    .single()

  if (achievementLookupError || !achievementRow) {
    throw new Error('Achievement could not be found.')
  }

  const { error: updateError } = await writeClient
    .from('achievements')
    .update({
      status,
      faculty_remark: trimmedRemarks || null,
      verified_by: profile.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', achievementId)

  if (updateError) {
    throw new Error(updateError.message)
  }

  const { error: notificationError } = await writeClient.from('notifications').insert({
    user_id: achievementRow.student_id,
    title: `Achievement ${status}`,
    message:
      status === 'Approved'
        ? 'Your achievement has been approved by the faculty team.'
        : 'Your achievement was rejected. Please review the remarks and resubmit if needed.',
    is_read: false,
  })

  if (notificationError) {
    throw new Error(notificationError.message)
  }

  revalidatePath('/faculty')
  redirect('/faculty')
}
