import { createClient } from '@/lib/supabase/client'

export interface StudentAchievementRecord {
  id: string
  title: string
  description: string
  category: string
  organizer: string
  achievement_date: string | null
  certificate_url: string | null
  proof_url: string | null
  status: string
  created_at?: string
}

export async function getStudentAchievements(userId: string): Promise<StudentAchievementRecord[]> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('achievements')
    .select('id,title,description,category,organizer,achievement_date,certificate_url,proof_url,status,created_at')
    .eq('student_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as StudentAchievementRecord[]
}

export async function updateStudentAchievement(
  achievementId: string,
  updates: Partial<Pick<StudentAchievementRecord, 'title' | 'description' | 'category' | 'organizer' | 'achievement_date' | 'proof_url'>>
): Promise<StudentAchievementRecord> {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('achievements')
    .update(updates)
    .eq('id', achievementId)
    .select('id,title,description,category,organizer,achievement_date,certificate_url,proof_url,status,created_at')
    .single()

  if (error || !data) {
    throw new Error(error?.message ?? 'Unable to update achievement.')
  }

  return data as StudentAchievementRecord
}

export async function deleteStudentAchievement(achievementId: string): Promise<void> {
  const supabase = createClient()

  const { error } = await supabase.from('achievements').delete().eq('id', achievementId)

  if (error) {
    throw new Error(error.message)
  }
}
