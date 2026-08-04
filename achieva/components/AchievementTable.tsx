'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { deleteStudentAchievement, getStudentAchievements, updateStudentAchievement, type StudentAchievementRecord } from '@/lib/supabase/services/achievements'
import { ExternalLink, Search, Trash2, Edit3, Eye, Filter, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 6
const statusStyles: Record<string, string> = {
  Approved: 'bg-green-100 text-green-700 hover:bg-green-100',
  Pending: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  Rejected: 'bg-red-100 text-red-700 hover:bg-red-100',
}

export default function AchievementTable() {
  const [achievements, setAchievements] = useState<StudentAchievementRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Pending' | 'Rejected'>('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [sortKey, setSortKey] = useState<'created_at' | 'achievement_date' | 'title'>('created_at')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Partial<StudentAchievementRecord>>({})
  const [busyId, setBusyId] = useState<string | null>(null)

  useEffect(() => {
    const loadAchievements = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user?.id) {
          setError('Please sign in to view your achievements.')
          setLoading(false)
          return
        }

        const data = await getStudentAchievements(user.id)
        setAchievements(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load achievements.')
      } finally {
        setLoading(false)
      }
    }

    loadAchievements()
  }, [])

  const filteredAchievements = useMemo(() => {
    const query = search.toLowerCase().trim()

    return achievements
      .filter((achievement) => {
        const matchesStatus = statusFilter === 'All' || achievement.status === statusFilter
        const matchesCategory = categoryFilter === 'All' || achievement.category === categoryFilter
        const matchesSearch = !query || [achievement.title, achievement.description, achievement.organizer, achievement.category, achievement.status]
          .join(' ')
          .toLowerCase()
          .includes(query)

        return matchesStatus && matchesCategory && matchesSearch
      })
      .sort((a, b) => {
        const direction = sortDirection === 'asc' ? 1 : -1
        if (sortKey === 'title') {
          return a.title.localeCompare(b.title) * direction
        }

        const left = sortKey === 'achievement_date' ? a.achievement_date : a.created_at
        const right = sortKey === 'achievement_date' ? b.achievement_date : b.created_at
        return (left ?? '').localeCompare(right ?? '') * direction
      })
  }, [achievements, categoryFilter, search, sortDirection, sortKey, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredAchievements.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const pagedAchievements = filteredAchievements.slice(startIndex, startIndex + PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [search, statusFilter, categoryFilter])

  const handleDelete = async (achievementId: string) => {
    if (!window.confirm('Delete this achievement?')) return

    try {
      setBusyId(achievementId)
      await deleteStudentAchievement(achievementId)
      setAchievements((current) => current.filter((item) => item.id !== achievementId))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete achievement.')
    } finally {
      setBusyId(null)
    }
  }

  const startEdit = (achievement: StudentAchievementRecord) => {
    setEditingId(achievement.id)
    setDraft({
      title: achievement.title,
      description: achievement.description,
      category: achievement.category,
      organizer: achievement.organizer,
      achievement_date: achievement.achievement_date,
      proof_url: achievement.proof_url,
    })
  }

  const saveEdit = async (achievementId: string) => {
    try {
      setBusyId(achievementId)
      const updated = await updateStudentAchievement(achievementId, {
        title: draft.title?.trim() ?? '',
        description: draft.description?.trim() ?? '',
        category: draft.category?.trim() ?? '',
        organizer: draft.organizer?.trim() ?? '',
        achievement_date: draft.achievement_date ?? null,
        proof_url: draft.proof_url?.trim() || null,
      })

      setAchievements((current) => current.map((item) => (item.id === achievementId ? { ...item, ...updated } : item)))
      setEditingId(null)
      setDraft({})
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update achievement.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="border-b border-slate-100">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-xl text-slate-900">Achievements</CardTitle>
            <p className="text-sm text-slate-600 mt-1">Manage your uploads, filter by status, and review certificates.</p>
          </div>
          <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">{filteredAchievements.length} records</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="border-b border-slate-100 bg-slate-50/70 p-4 space-y-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search title, organizer, category..." className="pl-9 border-slate-300" />
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                <Filter className="h-4 w-4" />
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="bg-transparent outline-none">
                  <option value="All">All Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                <Filter className="h-4 w-4" />
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="bg-transparent outline-none">
                  <option value="All">All Categories</option>
                  {[...new Set(achievements.map((item) => item.category).filter(Boolean))].map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5" onClick={() => { setSortKey('created_at'); setSortDirection((current) => (current === 'desc' ? 'asc' : 'desc')) }}>
              Sort by Date {sortKey === 'created_at' ? (sortDirection === 'desc' ? '↓' : '↑') : ''}
            </button>
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5" onClick={() => { setSortKey('title'); setSortDirection((current) => (current === 'desc' ? 'asc' : 'desc')) }}>
              Sort by Title {sortKey === 'title' ? (sortDirection === 'desc' ? '↓' : '↑') : ''}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-slate-600">Loading achievements…</div>
        ) : error ? (
          <div className="p-6 text-sm text-red-600">{error}</div>
        ) : pagedAchievements.length === 0 ? (
          <div className="p-6 text-sm text-slate-600">No achievements match the current filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-700">
                <tr>
                  <th className="px-4 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedAchievements.map((achievement) => (
                  <tr key={achievement.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-4">
                      {editingId === achievement.id ? (
                        <div className="space-y-2">
                          <Input value={draft.title ?? ''} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
                          <textarea value={draft.description ?? ''} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} className="min-h-20 w-full rounded-md border border-slate-300 px-3 py-2 text-sm" />
                        </div>
                      ) : (
                        <div>
                          <div className="font-medium text-slate-900">{achievement.title}</div>
                          <div className="text-xs text-slate-500">{achievement.organizer}</div>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === achievement.id ? (
                        <Input value={draft.category ?? ''} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} />
                      ) : (
                        <span className="text-slate-600">{achievement.category}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === achievement.id ? (
                        <select value={draft.category ?? ''} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                          <option value="">Select</option>
                          <option value="Approved">Approved</option>
                          <option value="Pending">Pending</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      ) : (
                        <Badge className={statusStyles[achievement.status] ?? 'bg-slate-100 text-slate-700 hover:bg-slate-100'}>{achievement.status}</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editingId === achievement.id ? (
                        <Input type="date" value={draft.achievement_date ?? ''} onChange={(event) => setDraft((current) => ({ ...current, achievement_date: event.target.value }))} />
                      ) : (
                        <span className="text-slate-600">{achievement.achievement_date ? new Date(achievement.achievement_date).toLocaleDateString() : '—'}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-2">
                        {achievement.certificate_url ? (
                          <Button variant="outline" size="sm" onClick={() => window.open(achievement.certificate_url!, '_blank', 'noopener,noreferrer')}>
                            <Eye className="mr-2 h-4 w-4" /> View
                          </Button>
                        ) : null}
                        {editingId === achievement.id ? (
                          <>
                            <Button size="sm" onClick={() => saveEdit(achievement.id)} disabled={busyId === achievement.id}>Save</Button>
                            <Button variant="outline" size="sm" onClick={() => { setEditingId(null); setDraft({}) }}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm" onClick={() => startEdit(achievement)}>
                              <Edit3 className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(achievement.id)} disabled={busyId === achievement.id}>
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-600">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={currentPage === 1}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage((current) => Math.min(totalPages, current + 1))} disabled={currentPage === totalPages}>
              Next <ChevronRight className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
