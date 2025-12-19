'use client';
import React from 'react';
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Upload, 
  FileText, 
  Lightbulb, 
  LayoutDashboard,
  X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeRoute?: string;
}

export default function Sidebar({ isOpen, onClose, activeRoute = "/" }: SidebarProps) {
  const navItems = [
    { 
      icon: <LayoutDashboard className="w-5 h-5" />, 
      label: "Dashboard", 
      href: "/student",
    },
    { 
      icon: <Upload className="w-5 h-5" />, 
      label: "Upload Achievement", 
      href: "/student/upload",
    },
    { 
      icon: <Award className="w-5 h-5" />, 
      label: "My Portfolio", 
      href: "/student/portfolio",
    },
    { 
      icon: <FileText className="w-5 h-5" />, 
      label: "Resume", 
      href: "/student/resume",
    },
    { 
      icon: <Lightbulb className="w-5 h-5" />, 
      label: "Suggestions", 
      href: "/student/suggestions",
    },
  ];

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    }`}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900">ACHIEVA</span>
            </Link>
            <button 
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item, index) => {
            const isActive = activeRoute === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                onClick={() => {
                  // Close sidebar on mobile when clicking a link
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <span className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Badge */}
        <div className="p-6 border-t border-slate-200">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-semibold">
                JS
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm">John Smith</p>
                <Badge variant="outline" className="text-xs mt-1">Student</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}