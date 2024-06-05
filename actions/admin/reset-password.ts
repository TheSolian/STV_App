'use server'

import { db } from '@/prisma'
import bcrypt from 'bcryptjs'

export const resetPassword = async (id: string) => {
  await db.user.update({
    where: { id },
    data: {
      isDefaultPassword: true,
      password: await bcrypt.hash('changeme', 10),
    },
  })
}
