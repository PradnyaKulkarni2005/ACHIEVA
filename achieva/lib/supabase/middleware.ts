import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type UserRole = 'Student' | 'Faculty' | 'Admin'

const PUBLIC_PATHS = ['/auth/login', '/auth/signup', '/auth/forgot-password']

function normalizeRole(role: string | null | undefined): UserRole | null {
  if (!role) {
    return null
  }

  const normalizedRole = role.toLowerCase()

  if (normalizedRole === 'faculty') {
    return 'Faculty'
  }

  if (normalizedRole === 'admin') {
    return 'Admin'
  }

  return 'Student'
}

function getDashboardPath(role: UserRole | null) {
  switch (role) {
    case 'Faculty':
      return '/faculty'
    case 'Admin':
      return '/admin/dashboard'
    default:
      return '/student'
  }
}

function hasRouteAccess(pathname: string, role: UserRole | null) {
  if (pathname.startsWith('/api/')) {
    return true
  }

  if (PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return true
  }

  if (!role) {
    return false
  }

  if (pathname.startsWith('/student')) {
    return role === 'Student'
  }

  if (pathname.startsWith('/faculty')) {
    return role === 'Faculty'
  }

  if (pathname.startsWith('/admin')) {
    return role === 'Admin'
  }

  return true
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const role = normalizeRole(user?.user_metadata?.role)

  if (pathname === '/') {
    if (!user) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirectedFrom', '/')
      return NextResponse.redirect(loginUrl)
    }

    return response
  }

  if (!hasRouteAccess(pathname, role)) {
    if (!user) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirectedFrom', pathname)
      return NextResponse.redirect(loginUrl)
    }

    const dashboardPath = getDashboardPath(role)
    return NextResponse.redirect(new URL(dashboardPath, request.url))
  }

  if (user && PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    const dashboardPath = getDashboardPath(role)
    return NextResponse.redirect(new URL(dashboardPath, request.url))
  }

  return response
}
