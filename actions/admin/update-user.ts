'use server'

import { db } from '@/prisma'
import { CreateUserSchema } from '@/schemas'
import { z } from 'zod'

export const updateUser = async (values: z.infer<typeof CreateUserSchema>) => {
  await db.user.update({
    where: {
      email: values.email,
    },
    data: {
      email: values.email,
      name: values.name,
      role: {
        connect: {
          value: values.role,
        },
      },
    },
  })

  return { success: 'Benutzer erfolgreich aktualisiert!' }
}
