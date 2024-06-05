'use server'

import { db } from '@/prisma'

export const getRoles = async () => {
  const roles = await db.role.findMany()
  return roles
}
