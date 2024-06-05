'use server'

import { db } from '@/prisma'
import { CreateUserSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

export const createUser = async (values: z.infer<typeof CreateUserSchema>) => {
  const validatedValues = CreateUserSchema.safeParse(values)

  if (!validatedValues.success) {
    return { error: '' }
  }

  const { email, name, role } = validatedValues.data

  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return { error: 'Benutzer existiert bereits!' }
  }

  const existingRole = await db.role.findUnique({
    where: { value: role },
  })

  if (!existingRole) {
    return { error: 'Rolle existiert nicht!' }
  }

  const user = await db.user.create({
    data: {
      email,
      name,
      roleId: existingRole.id,
      password: await bcrypt.hash('changeme', 10),
    },
  })

  return { sucess: 'Benutzer erstellt!' }
}
