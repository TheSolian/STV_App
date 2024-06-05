import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email ist erforderlich' }),
  password: z.string().min(1, { message: 'Password ist erforderlich' }),
})

export const CreateUserSchema = z.object({
  email: z.string().email({ message: 'Email ist erforderlich' }),
  name: z.string().min(1, { message: 'Name ist erforderlich' }),
  role: z.string().min(1, { message: 'Rolle ist erforderlich' }),
})

export const ChangePasswordSchema = z
  .object({
    password: z.string().min(1, { message: 'Neues Password ist erforderlich' }),
    confirmNewPassword: z
      .string()
      .min(1, { message: 'Bestätigen Sie das neue Password' }),
  })
  .refine((data) => data.password === data.confirmNewPassword, {
    message: 'Passwörter stimmen nicht überein',
    path: ['confirmNewPassword'],
  })
