'use client'

import { login } from '@/actions/auth/login'
// import { createUser } from '@/actions/dashboard/create-user'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormError } from '../form-error'
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

export const LoginForm: React.FC<Props> = ({}) => {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError('')

    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          form.reset()
          setError(data.error)
        }
      })
    })
  }

  return (
    <Card className="p-6 space-y-6 min-w-full sm:min-w-80">
      <h1 className="text-3xl font-semibold">Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
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
          <FormError message={error} />
          <Button disabled={isPending}>Login</Button>
        </form>
      </Form>
      {/* <Button onClick={async () => await createUser()}>Create User</Button> */}
    </Card>
  )
}
