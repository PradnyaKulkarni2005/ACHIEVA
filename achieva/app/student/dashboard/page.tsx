'use client';
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/Sidebar';
import { createClient } from '@/lib/supabase/client';
import { getStudentDashboardData, type StudentDashboardData } from '@/lib/supabase/services/student-dashboard';
import AchievementTable from '@/components/AchievementTable';
import {
  Award,
  Upload,
  FileText,
  Lightbulb,
  TrendingUp,
  Clock,
  CheckCircle,
  ChevronRight,
  Menu,
} from 'lucide-react';

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [dashboardData, setDashboardData] = useState<StudentDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user?.id) {
        setError('Please sign in to view your dashboard.');
        setIsLoading(false);
        return;
      }

      try {
        const data = await getStudentDashboardData(user.id);
        setDashboardData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load dashboard data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = dashboardData
    ? [
        {
          title: 'Total Achievements',
          value: dashboardData.totalAchievements,
          icon: <Award className="w-5 h-5" />,
          trend: dashboardData.totalAchievements > 0 ? `${dashboardData.totalAchievements} records` : 'No achievements yet',
          color: 'bg-blue-50 text-blue-600',
        },
        {
          title: 'Approved',
          value: dashboardData.approvedAchievements,
          icon: <CheckCircle className="w-5 h-5" />,
          trend: dashboardData.totalAchievements > 0 ? `${Math.round((dashboardData.approvedAchievements / dashboardData.totalAchievements) * 100)}% approval rate` : 'Pending review',
          color: 'bg-green-50 text-green-600',
        },
        {
          title: 'Pending Verification',
          value: dashboardData.pendingAchievements,
          icon: <Clock className="w-5 h-5" />,
          trend: dashboardData.pendingAchievements > 0 ? `${dashboardData.pendingAchievements} awaiting review` : 'All caught up',
          color: 'bg-amber-50 text-amber-600',
        },
      ]
    : [];

  const recentUploads = dashboardData?.latestUploads ?? [];
  const latestNotifications = dashboardData?.latestNotifications ?? [];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeRoute="/student" />

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6 text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back! Here's your overview</p>
              </div>
            </div>
            <Button className="bg-slate-900 hover:bg-slate-800">
              <Upload className="w-4 h-4 mr-2" />
              Upload New
            </Button>
          </div>
        </header>

        <div className="p-6 lg:p-8 space-y-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((item) => (
                <Card key={item} className="border-slate-200">
                  <CardContent className="p-6">
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="mt-4 h-8 w-16 rounded bg-slate-200" />
                    <div className="mt-3 h-3 w-32 rounded bg-slate-100" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <Card className="border-slate-200">
              <CardContent className="p-6 text-sm text-red-600">{error}</CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className={`border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${hoveredStat === index ? 'scale-105 shadow-xl' : ''}`}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                        {stat.icon}
                      </div>
                      <TrendingUp className="w-4 h-4 text-slate-400" />
                    </div>
                    <h3 className="text-sm font-medium text-slate-600 mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</p>
                    <p className="text-xs text-slate-500">{stat.trend}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Upload className="w-5 h-5" />, label: 'Upload Achievement', color: 'bg-blue-50 text-blue-600' },
              { icon: <Award className="w-5 h-5" />, label: 'View Portfolio', color: 'bg-purple-50 text-purple-600' },
              { icon: <FileText className="w-5 h-5" />, label: 'Generate Resume', color: 'bg-green-50 text-green-600' },
              { icon: <Lightbulb className="w-5 h-5" />, label: 'Get Suggestions', color: 'bg-amber-50 text-amber-600' },
            ].map((action, index) => (
              <Card key={index} className="border-slate-200 hover:border-slate-400 transition-all cursor-pointer group">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <span className="font-medium text-slate-900 text-sm">{action.label}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-slate-900">Recent Uploads</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Track your latest submissions</p>
                </div>
                <Button variant="outline" className="text-slate-700">
                  View All
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="p-6 space-y-3">
                    {[0, 1, 2].map((item) => <div key={item} className="h-10 rounded bg-slate-100" />)}
                  </div>
                ) : recentUploads.length === 0 ? (
                  <div className="p-6 text-sm text-slate-600">No uploads yet.</div>
                ) : (
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Title</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUploads.map((item, index) => (
                        <tr key={item.id ?? index} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                          <td className="px-6 py-4 text-slate-600 text-sm">{item.achievement_date ? new Date(item.achievement_date).toLocaleDateString() : '—'}</td>
                          <td className="px-6 py-4">
                            <Badge variant={item.status === 'Approved' ? 'default' : 'secondary'} className={item.status === 'Approved' ? 'bg-green-100 text-green-700 hover:bg-green-100' : item.status === 'Pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' : 'bg-blue-100 text-blue-700 hover:bg-blue-100'}>
                              {item.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                              View
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>

          <AchievementTable />

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-xl text-slate-900">Latest Notifications</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Your most recent updates</p>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="space-y-3">
                  {[0, 1, 2].map((item) => <div key={item} className="h-12 rounded bg-slate-100" />)}
                </div>
              ) : latestNotifications.length === 0 ? (
                <div className="text-sm text-slate-600">No notifications yet.</div>
              ) : (
                <div className="space-y-4">
                  {latestNotifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4 rounded-lg bg-slate-50 p-4">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-900" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{notification.title}</h4>
                        <p className="text-sm text-slate-600">{notification.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
