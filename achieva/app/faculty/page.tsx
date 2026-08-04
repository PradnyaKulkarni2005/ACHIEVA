import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FacultyAchievementTable } from './components/FacultyAchievementTable'
import { getFacultyDashboardData } from '@/lib/supabase/services/faculty-dashboard'

export default async function FacultyDashboard() {
  const data = await getFacultyDashboardData({ page: 1 })

  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="mb-8 text-3xl font-bold">Faculty Verification Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pending Student Submissions</CardTitle>
        </CardHeader>

        <CardContent>
          <FacultyAchievementTable initialData={data} />
        </CardContent>
      </Card>
    </main>
  )
}
