import { createClient } from '@/lib/supabase/client'

export interface StudentAchievementSummary {
  id: string
  title: string
  status: string
  achievement_date: string | null
  created_at: string | null
}

export interface StudentNotificationSummary {
  id: string
  title: string
  message: string
  is_read: boolean
  created_at: string | null
}

export interface StudentDashboardData {
  totalAchievements: number
  pendingAchievements: number
  approvedAchievements: number
  rejectedAchievements: number
  latestUploads: StudentAchievementSummary[]
  latestNotifications: StudentNotificationSummary[]
}

export async function getStudentDashboardData(userId: string): Promise<StudentDashboardData> {
  const supabase = createClient()

  const [achievementsResponse, notificationsResponse] = await Promise.all([
    supabase
      .from('achievements')
      .select('id, title, status, achievement_date, created_at')
      .eq('student_id', userId)
      .order('created_at', { ascending: false }),
    supabase
      .from('notifications')
      .select('id, title, message, is_read, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(3),
  ])

  if (achievementsResponse.error) {
    throw new Error(achievementsResponse.error.message)
  }

  if (notificationsResponse.error) {
    throw new Error(notificationsResponse.error.message)
  }

  const achievements = (achievementsResponse.data ?? []) as StudentAchievementSummary[]
  const notifications = (notificationsResponse.data ?? []) as StudentNotificationSummary[]

  return {
    totalAchievements: achievements.length,
    pendingAchievements: achievements.filter((achievement) => achievement.status === 'Pending').length,
    approvedAchievements: achievements.filter((achievement) => achievement.status === 'Approved').length,
    rejectedAchievements: achievements.filter((achievement) => achievement.status === 'Rejected').length,
    latestUploads: achievements.slice(0, 4),
    latestNotifications: notifications,
  }
}
