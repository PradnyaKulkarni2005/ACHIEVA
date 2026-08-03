'use client';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, FileCheck, GraduationCap, Shield, Sparkles, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { signOutAction } from '@/lib/supabase/auth-actions';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Year-wise Timeline",
      desc: "Track achievements chronologically across your academic journey"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Records",
      desc: "Faculty-approved credentials you can trust"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Smart Verification",
      desc: "AI-powered plagiarism detection and version control"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Auto Portfolio",
      desc: "Generate professional resumes instantly"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Career Insights",
      desc: "Personalized skill-based recommendations"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Smart Reminders",
      desc: "Never miss deadlines or approval updates"
    }
  ];

  const workflow = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Student Upload",
      desc: "Students upload academic achievements, certificates, projects, and assignments with ease.",
      color: "text-slate-600"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Faculty Verification",
      desc: "Faculty verifies submissions with plagiarism checks and comprehensive version control.",
      color: "text-slate-700"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Approved Portfolio",
      desc: "Verified achievements appear in a public, shareable student portfolio ready for employers.",
      color: "text-slate-800"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">ACHIEVA</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="text-slate-700">About</Button>
            <Button variant="ghost" className="text-slate-700">Features</Button>
            <Button variant="ghost" className="text-slate-700">Contact</Button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-slate-700" />
          <span className="text-sm font-medium text-slate-700">Trusted by Leading Institutions</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
          Your Academic Journey,<br />
          <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            Verified & Showcased
          </span>
        </h1>
        
        <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed mb-10">
          A centralized platform where students build verified academic portfolios, 
          faculty validate achievements, and institutions create career-ready professionals.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <Link href="/auth/signup">
            <Button 
              size="lg" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Create Account
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-slate-300 text-slate-900 hover:bg-slate-50 px-8 py-6 text-lg rounded-lg"
            >
              Sign In
            </Button>
          </Link>
          <form action={signOutAction}>
            <Button 
              type="submit"
              size="lg" 
              variant="ghost"
              className="px-8 py-6 text-lg rounded-lg"
            >
              Logout
            </Button>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-slate-200">
          {[
            { value: "10K+", label: "Active Students" },
            { value: "500+", label: "Faculty Members" },
            { value: "50K+", label: "Verified Achievements" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="max-w-6xl mx-auto px-6 py-20 bg-white">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Simple Process</Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How ACHIEVA Works
          </h2>
          <p className="text-slate-600 text-lg">Three simple steps to build your verified portfolio</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflow.map((item, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <Card className="h-full border-slate-200 hover:border-slate-400 transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-slate-900 transition-colors">
                    <div className={`${item.color} group-hover:text-white transition-colors`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 text-5xl font-bold text-slate-100">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl text-slate-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
              {index < workflow.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-slate-50">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Powerful Features</Badge>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-slate-600 text-lg">Built for students, faculty, and institutions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`border-slate-200 hover:border-slate-400 transition-all duration-300 cursor-pointer ${
                hoveredCard === index ? 'shadow-xl scale-105' : 'shadow-sm'
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                  hoveredCard === index ? 'bg-slate-900' : 'bg-slate-100'
                }`}>
                  <div className={hoveredCard === index ? 'text-white' : 'text-slate-700'}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 text-lg">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-0 overflow-hidden">
          <CardContent className="p-12 text-center relative">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build Your Academic Legacy?
              </h2>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students and faculty already using ACHIEVA to create verified, career-ready portfolios.
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg rounded-lg"
                >
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-900">ACHIEVA</span>
              </div>
              <p className="text-slate-600 text-sm">
                Building the future of academic portfolios, one achievement at a time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Features</li>
                <li>Pricing</li>
                <li>Security</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Help Center</li>
                <li>Contact</li>
                <li>Status</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-12 pt-8 text-center text-slate-600 text-sm">
            © 2025 ACHIEVA. All rights reserved.
          </div>
        </div>
      </footer>

    </main>
  );
}