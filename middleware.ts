import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')

  const isProtectedPage =
    request.nextUrl.pathname.startsWith('/dashboard') ||
    request.nextUrl.pathname.startsWith('/profile') ||
    request.nextUrl.pathname.startsWith('/admin')

  // ❌ Not logged in → trying to access protected page
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ✅ Logged in → trying to access login/register
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}
