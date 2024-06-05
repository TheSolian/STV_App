'use server'

import { db } from '@/prisma'
import { ChangePasswordSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { login } from './login'

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
  id: string
) => {
  const validatedCredentials = ChangePasswordSchema.safeParse(values)

  if (!validatedCredentials.success) {
    return { error: 'Invalid fields!' }
  }

  const { password } = validatedCredentials.data

  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      password: await bcrypt.hash(password, 10),
      isDefaultPassword: false,
    },
  })

  await login({
    email: user.email,
    password,
  })
}
