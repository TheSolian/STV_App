'use server'

import { db } from '@/prisma'
import bcrypt from 'bcryptjs'

export const importUsers = async (text: String) => {
  for (const user of text.split('\n')) {
    const [name, email] = user.split('\r')[0].split(',')

    if (!name || !email) continue

    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) continue

    const role = await db.role.findUnique({
      where: { value: 'user' },
    })

    if (!role) continue

    const password = await bcrypt.hash('changeme', 10)

    try {
      await db.user.create({
        data: {
          name,
          email,
          password,
          roleId: role.id,
        },
      })
    } catch {}
  }

  return { success: true }
}
