'use client'

import { changePassword } from '@/actions/auth/change-password'
import { ChangePasswordSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

type Props = {}

export const ChangePasswordForm: React.FC<Props> = ({}) => {
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: '',
      confirmNewPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(async () => {
      const id = searchParams.get('id')
      if (id) {
        await changePassword(values, id)
      }
    })
  }

  return (
    <Card className="p-6 space-y-6 min-w-full sm:min-w-80">
      <h1 className="text-3xl font-semibold">Passwort ändern</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="confirmNewPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort Bestätigen</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending}>Passwort ändern</Button>
        </form>
      </Form>
    </Card>
  )
}
