'use server'

import { db } from '@/prisma'

export const deleteUser = async (id: string) => {
  await db.user.delete({
    where: { id },
  })
}
