export const PUBLIC_ROUTES: string[] = []

export const AUTH_ROUTES: string[] = ['/auth/login', '/auth/change-password']

export const ADMIN_ROUTES: string[] = [
  '/admin',
  '/admin/users',
  '/admin/exercises',
]

export const TRAINER_ROUTES: string[] = [
  '/dashboard',
  '/dashboard/users',
  '/dashboard/exercises',
]

export const API_AUTH_PREFIX = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT = '/exercises'
