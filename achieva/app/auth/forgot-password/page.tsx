'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { resetPasswordAction } from '@/lib/supabase/auth-actions'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage(null)

    startTransition(async () => {
      const result = await resetPasswordAction({ email })
      setMessage(result?.message ?? null)
    })
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">ACHIEVA</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-600">Enter your email and we will send a recovery link.</p>
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle>Forgot password</CardTitle>
            <CardDescription>We will email you a secure reset link.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input required type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
              {message ? <p className={`text-sm ${message.includes('sent') ? 'text-emerald-600' : 'text-red-600'}`}>{message}</p> : null}
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Sending link...' : 'Send reset link'}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-slate-600">
              <Link href="/auth/login" className="font-medium text-slate-900">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
