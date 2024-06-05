export type Role = {
  label: string
  value: string
  permittedRoutes: string[]
}

export const ROLES = [
  {
    label: 'Admin',
    value: 'admin',
    permittedRoutes: ['/admin', '/admin/users', '/admin/exercises'],
  },
  {
    label: 'Mitglied',
    value: 'user',
    permittedRoutes: [],
  },
]
