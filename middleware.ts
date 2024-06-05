import NextAuth from 'next-auth'
import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'
import authConfig from './auth.config'
import { ROLES } from './config/roles'
import {
  ADMIN_ROUTES,
  API_AUTH_PREFIX,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTES,
  TRAINER_ROUTES,
} from './config/routes'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

  const isAdminRoute = ADMIN_ROUTES.includes(nextUrl.pathname)
  const isTrainerRoute = TRAINER_ROUTES.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (!isLoggedIn) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl))
  }

  if (isLoggedIn && !isPublicRoute) {
    const role = req.auth?.user.role.value

    if (isAdminRoute) {
      if (role === 'admin') {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/not-found', nextUrl))
      }
    } else if (isTrainerRoute) {
      if (role === 'trainer' || role === 'admin') {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/not-found', nextUrl))
      }
    } else {
      return NextResponse.next()
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
