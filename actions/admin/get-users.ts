'use server'

import { db } from '@/prisma'

export const getUsers = async () => {
  const users = await db.user.findMany({
    include: {
      role: true,
    },
  })
  return users
}
