'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { signUpAction, type SignupFormData } from '@/lib/supabase/auth-actions'

const initialState: SignupFormData = {
  full_name: '',
  email: '',
  password: '',
  role: 'Student',
  department: '',
  branch: '',
  year: '',
}

export default function SignUpPage() {
  const [form, setForm] = useState(initialState)
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    startTransition(async () => {
      const result = await signUpAction(form)
      setMessage(result?.message ?? null)
    })
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">ACHIEVA</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-600">Set up your student, faculty, or admin profile.</p>
        </div>

        <Card className="mx-auto w-full max-w-2xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>We will create your profile and redirect you to the right dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input required placeholder="Full name" value={form.full_name} onChange={(event) => setForm({ ...form, full_name: event.target.value })} />
                <Input required type="email" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                <Input required type="password" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
                <Select value={form.role} onValueChange={(value) => setForm({ ...form, role: value as SignupFormData['role'] })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Faculty">Faculty</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Input required placeholder="Department" value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} />
                <Input required placeholder="Branch" value={form.branch} onChange={(event) => setForm({ ...form, branch: event.target.value })} />
                <Input required placeholder="Year" value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} />
              </div>

              {message ? <p className={`text-sm ${message.includes('success') || message.includes('sent') ? 'text-emerald-600' : 'text-red-600'}`}>{message}</p> : null}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Creating account...' : 'Create account'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-slate-900">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
