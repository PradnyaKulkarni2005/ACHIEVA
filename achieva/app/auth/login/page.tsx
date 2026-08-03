'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { signInAction } from '@/lib/supabase/auth-actions'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    startTransition(async () => {
      const result = await signInAction({ email, password })
      setMessage(result?.message ?? null)
    })
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">ACHIEVA</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-600">Sign in to continue to your dashboard.</p>
        </div>

        <Card className="mx-auto w-full max-w-xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Use your email and password to sign in.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <Input required type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />

              {message ? <p className="text-sm text-red-600">{message}</p> : null}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              <Link href="/auth/forgot-password" className="font-medium text-slate-900">
                Forgot password?
              </Link>
              <Link href="/auth/signup" className="font-medium text-slate-900">
                Create account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
