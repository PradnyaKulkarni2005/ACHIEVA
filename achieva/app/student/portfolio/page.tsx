'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/Sidebar";
import { 
  Award,
  Menu,
  Download,
  Share2,
  ExternalLink,
  Calendar,
  CheckCircle,
  Code,
  Briefcase,
  Trophy,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  FileText,
  Star
} from "lucide-react";

export default function StudentPortfolio() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const profileStats = [
    { label: "Total Achievements", value: "12", icon: <Award className="w-5 h-5" /> },
    { label: "Verified Projects", value: "8", icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Certifications", value: "5", icon: <Star className="w-5 h-5" /> },
  ];

  const skills = [
    "React", "Next.js", "TypeScript", "Python", "Machine Learning",
    "SQL", "Node.js", "Git", "AWS", "Data Analysis"
  ];

  const timeline = [
    {
      year: "2024",
      items: [
        {
          title: "AI Research Paper",
          type: "Academic",
          description: "Published research on Neural Networks optimization achieving 15% performance improvement",
          date: "Dec 2024",
          icon: <BookOpen className="w-5 h-5" />,
          color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
          title: "National Hackathon Winner",
          type: "Competition",
          description: "First place in TechFest 2024 for developing an AI-powered healthcare solution",
          date: "Nov 2024",
          icon: <Trophy className="w-5 h-5" />,
          color: "bg-amber-50 text-amber-600 border-amber-200"
        },
      ],
    },
    {
      year: "2023",
      items: [
        {
          title: "Web Development Internship",
          type: "Internship",
          description: "6-month internship at TechCorp, developed full-stack applications using React and Node.js",
          date: "Jun - Dec 2023",
          icon: <Briefcase className="w-5 h-5" />,
          color: "bg-green-50 text-green-600 border-green-200"
        },
        {
          title: "Cloud Computing Certification",
          type: "Certification",
          description: "AWS Certified Solutions Architect - Associate",
          date: "Aug 2023",
          icon: <Award className="w-5 h-5" />,
          color: "bg-purple-50 text-purple-600 border-purple-200"
        },
      ],
    },
    {
      year: "2022",
      items: [
        {
          title: "Data Structures Project",
          type: "Academic",
          description: "Implemented advanced data structures library in C++ with comprehensive documentation",
          date: "Dec 2022",
          icon: <Code className="w-5 h-5" />,
          color: "bg-indigo-50 text-indigo-600 border-indigo-200"
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeRoute="/student/portfolio"
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
                <h1 className="text-2xl font-bold text-slate-900">My Portfolio</h1>
                <p className="text-sm text-slate-600">Your verified academic journey</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-slate-300">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
          {/* Profile Header Card */}
          <Card className="border-slate-200 shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
            <CardContent className="p-8 -mt-16">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                {/* Profile Picture */}
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl ring-4 ring-white">
                  RS
                </div>
                
                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-2">Rahul Sharma</h2>
                      <p className="text-slate-600 text-lg mb-3">B.Tech Computer Science • Class of 2025</p>
                      <Badge className="bg-green-600 hover:bg-green-600 text-white px-3 py-1">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified Portfolio
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>rahul.sharma@university.edu</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>Mumbai, India</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" className="border-slate-300">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-300">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-300">
                      <Globe className="w-4 h-4 mr-2" />
                      Website
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileStats.map((stat, index) => (
              <Card key={index} className="border-slate-200 hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700">
                      {stat.icon}
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills Section */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-900">Skills & Technologies</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge 
                    key={index}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-sm"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievement Timeline */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Achievement Timeline</h2>
                <p className="text-sm text-slate-600">Verified achievements throughout your academic journey</p>
              </div>
            </div>

            <div className="space-y-12">
              {timeline.map((group, groupIndex) => (
                <div key={groupIndex} className="relative">
                  {/* Year Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-slate-900 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{group.year}</span>
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-slate-200"></div>
                  </div>

                  {/* Timeline Items */}
                  <div className="ml-8 space-y-6">
                    {group.items.map((item, itemIndex) => (
                      <Card 
                        key={itemIndex}
                        className={`border-2 transition-all duration-300 ${
                          hoveredItem === `${groupIndex}-${itemIndex}`
                            ? 'shadow-xl scale-[1.02] border-slate-400'
                            : 'border-slate-200 shadow-sm'
                        }`}
                        onMouseEnter={() => setHoveredItem(`${groupIndex}-${itemIndex}`)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <CardHeader className="border-b border-slate-100 pb-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 ${item.color}`}>
                                {item.icon}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <CardTitle className="text-xl text-slate-900">{item.title}</CardTitle>
                                  <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                  <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                                    {item.type}
                                  </Badge>
                                  <span className="text-slate-500 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    {item.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-slate-600">
                              <FileText className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-slate-600 leading-relaxed">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Public Portfolio Link */}
          <Card className="border-slate-200 shadow-sm bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Public Portfolio Link</h3>
                    <p className="text-sm text-slate-600">Share your verified achievements with employers</p>
                  </div>
                </div>
                <Button className="bg-slate-900 hover:bg-slate-800">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Public Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}