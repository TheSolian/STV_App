'use server'

import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/config/routes'
import { getUserByEmail } from '@/data/user'
import { LoginSchema } from '@/schemas'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedCredentials = LoginSchema.safeParse(values)

  if (!validatedCredentials.success) {
    return { error: 'Invalid fields!' }
  }

  const { email, password } = validatedCredentials.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'Ungültige Logindaten!' }
  }

  if (existingUser.isDefaultPassword) {
    if (await bcrypt.compare(password, existingUser.password)) {
      return redirect(`/auth/change-password?id=${existingUser.id}`)
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Ungültige Logindaten!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
