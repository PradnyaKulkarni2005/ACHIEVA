'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/Sidebar";
import { 
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Info,
  Menu,
  X,
  Award,
  Calendar,
  FolderOpen
} from "lucide-react";

export default function UploadAchievement() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const categories = [
    "Academic Paper",
    "Research Project",
    "Internship",
    "Hackathon",
    "Competition",
    "Sports Achievement",
    "Certification",
    "Volunteer Work"
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Component */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        activeRoute="/student/upload"
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
                <h1 className="text-2xl font-bold text-slate-900">Upload Achievement</h1>
                <p className="text-sm text-slate-600">Add your achievements for verification</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
          {/* Info Banner */}
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Before you upload</h3>
                  <p className="text-sm text-blue-700">
                    Ensure your documents are authentic and in PDF format. All submissions will be verified by faculty members and checked for plagiarism.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Form */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-slate-700" />
                </div>
                <div>
                  <CardTitle className="text-xl text-slate-900">Achievement Details</CardTitle>
                  <p className="text-sm text-slate-600 mt-1">Fill in all required information</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Achievement Title
                  <span className="text-red-500">*</span>
                </label>
                <Input 
                  placeholder="e.g. AI Research Paper on Neural Networks" 
                  className="border-slate-300 focus:border-slate-500"
                />
                <p className="text-xs text-slate-500">Provide a clear and descriptive title</p>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4" />
                  Category
                  <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900">
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Academic Year
                  <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="number"
                  placeholder="2024" 
                  min="2000"
                  max="2030"
                  className="border-slate-300 focus:border-slate-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900">
                  Description
                  <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  placeholder="Provide a detailed description of your achievement, including objectives, methodology, outcomes, and impact..."
                  rows={6}
                  className="border-slate-300 focus:border-slate-500 resize-none"
                />
                <p className="text-xs text-slate-500">Minimum 100 characters</p>
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Document (PDF)
                  <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 hover:border-slate-400 transition-colors">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <Upload className="w-8 h-8 text-slate-600" />
                    </div>
                    <div className="text-center">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <span className="text-slate-900 font-semibold hover:text-slate-700">Click to upload</span>
                        <span className="text-slate-600"> or drag and drop</span>
                      </label>
                      <p className="text-sm text-slate-500 mt-1">PDF (max. 10MB)</p>
                    </div>
                    <Input 
                      id="file-upload"
                      type="file" 
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    {fileName && (
                      <div className="mt-2 px-4 py-2 bg-slate-100 rounded-lg flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-900 font-medium">{fileName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-3">Verification Status</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-3 py-1">
                    <FileText className="w-3 h-3 mr-1" />
                    Version v1.0
                  </Badge>
                  <Badge variant="outline" className="border-amber-300 text-amber-700 bg-amber-50 px-3 py-1">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Plagiarism Check: Pending
                  </Badge>
                  <Badge variant="outline" className="border-slate-300 text-slate-700 px-3 py-1">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Faculty Review: Not Started
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  Save as Draft
                </Button>
                <Button 
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submit for Verification
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Guidelines Card */}
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100">
              <CardTitle className="text-lg text-slate-900">Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Ensure all documents are original and belong to you</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>PDF files should be clear and readable (max 10MB)</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Provide accurate dates and detailed descriptions</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Faculty verification typically takes 2-3 business days</span>
                </li>
                <li className="flex gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>You'll receive email notifications on status updates</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}