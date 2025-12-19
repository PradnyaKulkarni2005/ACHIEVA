'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { 
  Briefcase,
  BookOpen,
  Menu,
  TrendingUp,
  Star,
  ExternalLink,
  Target,
  Lightbulb,
  ArrowRight,
  Clock,
  Users,
  Award,
  Sparkles,
  CheckCircle,
  BarChart
} from "lucide-react";

export default function Suggestions() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredCareer, setHoveredCareer] = useState<number | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<number | null>(null);

  const careers = [
    {
      role: "Frontend Developer",
      skills: ["React", "Next.js", "UI/UX"],
      match: 92,
      demand: "High",
      salary: "$70k - $120k",
      icon: "💻"
    },
    {
      role: "Data Analyst",
      skills: ["SQL", "Python", "Data Visualization"],
      match: 85,
      demand: "Very High",
      salary: "$65k - $110k",
      icon: "📊"
    },
    {
      role: "Machine Learning Engineer",
      skills: ["ML", "Python", "Statistics"],
      match: 78,
      demand: "High",
      salary: "$90k - $150k",
      icon: "🤖"
    },
  ];

  const courses = [
    {
      title: "React for Beginners",
      platform: "Coursera",
      duration: "6 weeks",
      level: "Beginner",
      rating: 4.8,
      enrolled: "45k+",
      relevance: 95,
      price: "Free"
    },
    {
      title: "SQL for Data Analysis",
      platform: "Udemy",
      duration: "8 weeks",
      level: "Intermediate",
      rating: 4.6,
      enrolled: "32k+",
      relevance: 88,
      price: "$49"
    },
    {
      title: "Machine Learning Foundations",
      platform: "edX",
      duration: "10 weeks",
      level: "Advanced",
      rating: 4.9,
      enrolled: "67k+",
      relevance: 82,
      price: "Free"
    },
  ];

  const skillGaps = [
    { skill: "TypeScript", priority: "High", courses: 5 },
    { skill: "Docker", priority: "Medium", courses: 8 },
    { skill: "AWS", priority: "High", courses: 12 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeRoute="/student/suggestions"
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
                <h1 className="text-2xl font-bold text-slate-900">Career & Learning Suggestions</h1>
                <p className="text-sm text-slate-600">Personalized recommendations based on your profile</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 space-y-8">
          {/* Insights Banner */}
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-purple-900 text-lg mb-2">AI-Powered Insights</h3>
                  <p className="text-purple-800 text-sm leading-relaxed mb-4">
                    Based on your 12 achievements and current skills, we've identified the best career paths and learning opportunities for you. 
                    Your profile shows strong alignment with frontend development and data analysis roles.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
                      <Target className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-900 font-medium">Career Match: 92%</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/60 rounded-lg px-3 py-2">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-900 font-medium">3 Growth Areas</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skill Gap Analysis */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <BarChart className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900">Skill Gap Analysis</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">Skills to develop for your target roles</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {skillGaps.map((gap, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-400 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-slate-900">{gap.skill}</h4>
                      <Badge 
                        className={
                          gap.priority === "High" 
                            ? "bg-red-100 text-red-700 hover:bg-red-100"
                            : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                        }
                      >
                        {gap.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{gap.courses} relevant courses available</p>
                    <Button size="sm" variant="outline" className="w-full border-slate-300">
                      View Courses
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Recommended Career Roles</h2>
                  <p className="text-sm text-slate-600">Top matches based on your skills and achievements</p>
                </div>
              </div>
              <Button variant="outline" className="border-slate-300">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {careers.map((career, index) => (
                <Card 
                  key={index}
                  className={`border-slate-200 hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    hoveredCareer === index ? 'scale-105 shadow-xl' : ''
                  }`}
                  onMouseEnter={() => setHoveredCareer(index)}
                  onMouseLeave={() => setHoveredCareer(null)}
                >
                  <CardHeader className="border-b border-slate-100 pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{career.icon}</div>
                      <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-lg">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-xs font-semibold text-green-700">{career.match}% Match</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-slate-900">{career.role}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-700">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Market Demand:</span>
                        <Badge className="bg-blue-600 hover:bg-blue-600">{career.demand}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Salary Range:</span>
                        <span className="font-semibold text-slate-900">{career.salary}</span>
                      </div>
                    </div>

                    <Button className="w-full bg-slate-900 hover:bg-slate-800 mt-4">
                      Explore Role
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* MOOC Suggestions */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Recommended Learning Paths</h2>
                  <p className="text-sm text-slate-600">Curated courses to boost your profile</p>
                </div>
              </div>
              <Button variant="outline" className="border-slate-300">
                Browse Catalog
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <Card 
                  key={index}
                  className={`border-slate-200 hover:shadow-xl transition-all duration-300 ${
                    hoveredCourse === index ? 'scale-105 shadow-xl' : ''
                  }`}
                  onMouseEnter={() => setHoveredCourse(index)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  <CardHeader className="border-b border-slate-100">
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="border-slate-300 text-slate-700">
                        {course.platform}
                      </Badge>
                      <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded-lg">
                        <Target className="w-3 h-3 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-700">{course.relevance}%</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-slate-900 leading-snug">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-4 h-4" />
                        <span>{course.enrolled}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Award className="w-4 h-4" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-semibold text-slate-900">{course.rating}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">{course.price}</span>
                      <Button size="sm" className="bg-slate-900 hover:bg-slate-800">
                        View Course
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Learning Path Suggestion */}
          <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-slate-50 to-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg mb-2">Suggested Learning Path</h3>
                  <p className="text-slate-700 text-sm leading-relaxed mb-4">
                    Start with "React for Beginners" to strengthen your frontend skills, then move to "SQL for Data Analysis" to complement your data capabilities. 
                    This combination will increase your Frontend Developer match to 98%.
                  </p>
                  <Button className="bg-slate-900 hover:bg-slate-800">
                    Start Learning Path
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}