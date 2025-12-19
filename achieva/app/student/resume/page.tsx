'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import { 
  FileText,
  Download,
  Eye,
  Edit,
  Plus,
  X,
  Menu,
  CheckCircle,
  Briefcase,
  Award,
  GraduationCap,
  Code,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Globe,
  Sparkles
} from "lucide-react";

export default function ResumeBuilder() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([
    "React",
    "Next.js",
    "TypeScript",
    "SQL",
    "Machine Learning",
    "Git",
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const allSkills = [
    "React", "Next.js", "TypeScript", "SQL", "Machine Learning", 
    "Git", "Python", "Java", "Node.js", "MongoDB", "AWS", 
    "Docker", "TensorFlow", "Data Analysis", "UI/UX Design"
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const achievements = [
    { title: "AI Research Paper", year: "2024", type: "Academic" },
    { title: "Web Development Internship", year: "2023", type: "Internship" },
    { title: "Hackathon Winner", year: "2024", type: "Competition" },
  ];

  const templates = [
    { id: 1, name: "Modern Professional", popular: true },
    { id: 2, name: "Academic Classic", popular: false },
    { id: 3, name: "Creative Design", popular: false },
    { id: 4, name: "Minimalist", popular: true },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeRoute="/student/resume"
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
                <h1 className="text-2xl font-bold text-slate-900">Resume Builder</h1>
                <p className="text-sm text-slate-600">Create professional resumes from your achievements</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-slate-300">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 space-y-6">
          {/* Template Selection */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-slate-900">Choose Template</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">Select a professional design for your resume</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="relative border-2 border-slate-200 rounded-lg p-4 hover:border-slate-900 transition-all cursor-pointer group"
                  >
                    <div className="aspect-[3/4] bg-slate-100 rounded-md mb-3 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    </div>
                    <p className="font-medium text-slate-900 text-sm text-center">{template.name}</p>
                    {template.popular && (
                      <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-600 text-xs">
                        Popular
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Edit Section */}
            <div className="space-y-6">
              {/* Personal Information */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-lg text-slate-900">Personal Information</CardTitle>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  {isEditing ? (
                    <>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700">Full Name</label>
                        <Input defaultValue="Rahul Sharma" className="border-slate-300" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700">Title</label>
                        <Input defaultValue="Computer Science Undergraduate" className="border-slate-300" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-700">Email</label>
                          <Input type="email" placeholder="email@example.com" className="border-slate-300" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-700">Phone</label>
                          <Input type="tel" placeholder="+91 98765 43210" className="border-slate-300" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-slate-900 text-lg">Rahul Sharma</p>
                        <p className="text-slate-600 text-sm">Computer Science Undergraduate</p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>rahul@example.com</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>+91 98765 43210</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Code className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-slate-900">Skills</CardTitle>
                        <p className="text-xs text-slate-600 mt-1">Auto-extracted from your achievements</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      {selectedSkills.length} Selected
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map((skill, index) => (
                      <Badge 
                        key={index} 
                        className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 cursor-pointer"
                        onClick={() => toggleSkill(skill)}
                      >
                        {skill}
                        <X className="w-3 h-3 ml-2" />
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs font-semibold text-slate-700 mb-2">Available Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {allSkills
                        .filter(skill => !selectedSkills.includes(skill))
                        .map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className="border-slate-300 text-slate-600 hover:border-slate-900 hover:text-slate-900 cursor-pointer px-3 py-1.5"
                            onClick={() => toggleSkill(skill)}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            {skill}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Section */}
              <Card className="border-slate-200 shadow-sm">
                <CardHeader className="border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-amber-600" />
                      </div>
                      <CardTitle className="text-lg text-slate-900">Achievements</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                      {achievements.length} Items
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className="flex items-start justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{achievement.title}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {achievement.year}
                              </Badge>
                              <span className="text-xs text-slate-600">{achievement.type}</span>
                            </div>
                          </div>
                        </div>
                        <input 
                          type="checkbox" 
                          defaultChecked 
                          className="w-4 h-4 mt-1 accent-slate-900 cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-6">
              <Card className="border-slate-200 shadow-lg sticky top-24">
                <CardHeader className="border-b border-slate-100 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg text-slate-900">Resume Preview</CardTitle>
                    </div>
                    <Badge className="bg-green-600 hover:bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8 bg-white">
                  {/* Resume Content */}
                  <div className="space-y-6 text-sm">
                    {/* Header */}
                    <div className="text-center border-b-2 border-slate-900 pb-4">
                      <h2 className="text-2xl font-bold text-slate-900 mb-1">Rahul Sharma</h2>
                      <p className="text-slate-600 mb-2">Computer Science Undergraduate</p>
                      <div className="flex justify-center gap-4 text-xs text-slate-600">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          rahul@example.com
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          +91 98765 43210
                        </span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">Skills</h3>
                      <p className="text-slate-700 leading-relaxed">
                        {selectedSkills.join(' • ')}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Achievements</h3>
                      <div className="space-y-3">
                        {achievements.map((achievement, index) => (
                          <div key={index}>
                            <div className="flex justify-between items-start">
                              <p className="font-semibold text-slate-900">{achievement.title}</p>
                              <span className="text-slate-600 text-xs">{achievement.year}</span>
                            </div>
                            <p className="text-slate-600 text-xs">{achievement.type}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">Education</h3>
                      <div>
                        <p className="font-semibold text-slate-900">Bachelor of Technology in Computer Science</p>
                        <p className="text-slate-600 text-xs">University Name • 2021 - 2025</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <Card className="border-slate-200 shadow-sm bg-slate-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Resume Ready!</p>
                    <p className="text-sm text-slate-600">Your resume is ready to download</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="border-slate-300">
                    Save Draft
                  </Button>
                  <Button size="lg" className="bg-slate-900 hover:bg-slate-800">
                    <Download className="w-4 h-4 mr-2" />
                    Generate PDF
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