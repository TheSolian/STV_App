'use client'

import { createUser } from '@/actions/admin/create-user'
import { getUsers } from '@/actions/admin/get-users'
import { updateUser } from '@/actions/admin/update-user'
import { ROLES, Role } from '@/config/roles'
import { cn } from '@/lib/utils'
import { CreateUserSchema } from '@/schemas'
import { User } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, PenIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { FormError } from '../form-error'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'

type Props = {
  user: User
  open: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const EditUserDialog: React.FC<Props> = ({ user, open, setIsOpen }) => {
  const router = useRouter()

  const [role, setRole] = useState<Role>(
    ROLES.find((role) => role.value === user.role.value) as Role
  )
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: role.value,
    },
  })

  const onSubmit = (values: z.infer<typeof CreateUserSchema>) => {
    setError('')

    startTransition(() => {
      updateUser(values).then((data) => {
        // if (data?.error) {
        //   setError(data.error)
        // }
        if (data?.success) {
          form.reset()
          setIsOpen(false)
          router.refresh()
          toast(data.success)
        }
      })
    })
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Benutzer bearbeiten</DialogTitle>
        </DialogHeader>
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
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Max Mustermann"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Rolle</FormLabel>
                    <FormControl>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              disabled={isPending}
                              className="w-full"
                            >
                              {role.label}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {ROLES.map((r) => (
                              <DropdownMenuItem
                                key={r.value}
                                onClick={() => {
                                  setRole(r)
                                  form.setValue('role', r.value)
                                }}
                                className={cn(
                                  'flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100',
                                  {
                                    'bg-zinc-100': role.value === r.value,
                                  }
                                )}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 size-4',
                                    role.value === r.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {r.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormError message={error} />
            <div className="self-end flex gap-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isPending}
                  onClick={() => form.reset()}
                >
                  Abbrechen
                </Button>
              </DialogClose>
              <Button disabled={isPending}>Speichern</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
