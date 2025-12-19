'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
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
} from "lucide-react";

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { 
      title: "Total Achievements", 
      value: 12, 
      icon: <Award className="w-5 h-5" />,
      trend: "+3 this month",
      color: "bg-blue-50 text-blue-600"
    },
    { 
      title: "Approved", 
      value: 8, 
      icon: <CheckCircle className="w-5 h-5" />,
      trend: "66% approval rate",
      color: "bg-green-50 text-green-600"
    },
    { 
      title: "Pending Verification", 
      value: 4, 
      icon: <Clock className="w-5 h-5" />,
      trend: "Avg 2 days wait",
      color: "bg-amber-50 text-amber-600"
    },
  ];

  const recentUploads = [
    { title: "AI Research Paper", year: "2024", status: "Approved", date: "Dec 15, 2024" },
    { title: "Web Dev Internship", year: "2023", status: "Pending", date: "Dec 10, 2024" },
    { title: "Hackathon Certificate", year: "2024", status: "Approved", date: "Nov 28, 2024" },
    { title: "Machine Learning Project", year: "2024", status: "Under Review", date: "Dec 18, 2024" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeRoute="/student"
      />

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
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
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index}
                className={`border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  hoveredStat === index ? 'scale-105 shadow-xl' : ''
                }`}
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

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Upload className="w-5 h-5" />, label: "Upload Achievement", color: "bg-blue-50 text-blue-600" },
              { icon: <Award className="w-5 h-5" />, label: "View Portfolio", color: "bg-purple-50 text-purple-600" },
              { icon: <FileText className="w-5 h-5" />, label: "Generate Resume", color: "bg-green-50 text-green-600" },
              { icon: <Lightbulb className="w-5 h-5" />, label: "Get Suggestions", color: "bg-amber-50 text-amber-600" },
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

          {/* Recent Uploads */}
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
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Title</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Year</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUploads.map((item, index) => (
                      <tr key={index} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-900">{item.title}</td>
                        <td className="px-6 py-4 text-slate-600">{item.year}</td>
                        <td className="px-6 py-4 text-slate-600 text-sm">{item.date}</td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={item.status === "Approved" ? "default" : "secondary"}
                            className={
                              item.status === "Approved"
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : item.status === "Pending"
                                ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                            }
                          >
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
              </div>
            </CardContent>
          </Card>

          {/* Achievement Timeline Preview */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-xl text-slate-900">Achievement Timeline</CardTitle>
              <p className="text-sm text-slate-600 mt-1">Your academic journey at a glance</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[2024, 2023, 2022].map((year, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                    <div className="w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">{year}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-900">Year {2025 - year}</h4>
                      <p className="text-sm text-slate-600">{index === 0 ? 5 : index === 1 ? 4 : 3} achievements recorded</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}