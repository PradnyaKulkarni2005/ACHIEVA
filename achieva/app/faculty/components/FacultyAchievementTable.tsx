'use client'

import { useMemo, useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { reviewAchievementAction, type FacultyAchievementRecord } from '@/lib/supabase/services/faculty-dashboard'
import { ExternalLink, Search, Filter, CheckCircle2, XCircle, MessageSquareText } from 'lucide-react'

interface FacultyAchievementTableProps {
  initialData: {
    achievements: FacultyAchievementRecord[]
    departments: string[]
    totalPages: number
    currentPage: number
    totalCount: number
  }
}

export function FacultyAchievementTable({ initialData }: FacultyAchievementTableProps) {
  const [search, setSearch] = useState('')
  const [department, setDepartment] = useState('')
  const [status, setStatus] = useState('Pending')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(initialData.currentPage)
  const [remarks, setRemarks] = useState<Record<string, string>>({})
  const [isPending, startTransition] = useTransition()
  const [data, setData] = useState(initialData)

  const filteredCount = data.totalCount

  const statusClass = (statusValue: string) => {
    switch (statusValue?.toLowerCase()) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-700'
      case 'rejected':
        return 'bg-rose-100 text-rose-700'
      default:
        return 'bg-amber-100 text-amber-700'
    }
  }

  const handleReview = (achievementId: string, action: 'approve' | 'reject') => {
    const formData = new FormData()
    formData.set('achievementId', achievementId)
    formData.set('action', action)
    formData.set('remarks', remarks[achievementId] ?? '')

    startTransition(async () => {
      await reviewAchievementAction(formData)
    })
  }

  const visibleAchievements = useMemo(() => data.achievements, [data.achievements])

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search student or achievement"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex min-w-[180px] items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select value={department} onChange={(event) => setDepartment(event.target.value)} className="w-full bg-transparent text-sm outline-none">
              <option value="">All departments</option>
              {data.departments.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="flex min-w-[140px] items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full bg-transparent text-sm outline-none">
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="All">All</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none">
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Achievement</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleAchievements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-slate-500">
                  No achievements found for the selected filters.
                </TableCell>
              </TableRow>
            ) : (
              visibleAchievements.map((achievement) => (
                <TableRow key={achievement.id}>
                  <TableCell>
                    <div className="font-medium text-slate-900">{achievement.student_name}</div>
                    <div className="text-xs text-slate-500">{achievement.student_email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-slate-900">{achievement.title}</div>
                    <div className="text-xs text-slate-500">{achievement.category} • {achievement.organizer}</div>
                    <div className="mt-2 flex gap-2">
                      {achievement.certificate_url ? (
                        <a href={achievement.certificate_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm text-slate-700 hover:text-slate-900">
                          <ExternalLink className="h-4 w-4" /> View certificate
                        </a>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>{achievement.student_department ?? '—'}</TableCell>
                  <TableCell>
                    <Badge className={statusClass(achievement.status)}>{achievement.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="min-w-[200px] rounded-md border border-slate-200 p-2">
                      <textarea
                        rows={3}
                        value={remarks[achievement.id] ?? achievement.faculty_remark ?? ''}
                        onChange={(event) => setRemarks((current) => ({ ...current, [achievement.id]: event.target.value }))}
                        placeholder="Add review remarks"
                        className="w-full resize-none border-none bg-transparent text-sm outline-none"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => handleReview(achievement.id, 'approve')} disabled={isPending}>
                        <CheckCircle2 className="mr-1 h-4 w-4" /> Approve
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReview(achievement.id, 'reject')} disabled={isPending}>
                        <XCircle className="mr-1 h-4 w-4" /> Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>{filteredCount} result{filteredCount === 1 ? '' : 's'}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((current) => Math.max(1, current - 1))}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={page >= data.totalPages} onClick={() => setPage((current) => Math.min(data.totalPages, current + 1))}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
