'use client'

import { createUser } from '@/actions/admin/create-user'
import { getRoles } from '@/actions/auth/get-roles'
import { ROLES } from '@/config/roles'
import { cn } from '@/lib/utils'
import { CreateUserSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '@prisma/client'
import { CheckIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
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
  triggerLabel: string
}

export const CreateUserDialog: React.FC<Props> = ({ triggerLabel }) => {
  const router = useRouter()

  const [roles, setRoles] = useState<Role[]>([])
  const [role, setRole] = useState<Role>()
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const run = async () => {
      const data = await getRoles()
      setRoles(data)
      setRole(data[0])
    }
    run()
  }, [])

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: '',
      email: '',
      role: role?.value,
    },
  })

  const onSubmit = (values: z.infer<typeof CreateUserSchema>) => {
    setError('')

    startTransition(() => {
      createUser(values).then((data) => {
        if (data?.error) {
          setError(data.error)
        }

        if (data?.sucess) {
          form.reset()
          setIsOpen(false)
          router.refresh()
        }
      })
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 size-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Benutzer erstellen</DialogTitle>
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
                              {role?.label}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {roles.map((r) => (
                              <DropdownMenuItem
                                key={r.value}
                                onClick={() => {
                                  setRole(r)
                                  form.setValue('role', r.value)
                                }}
                                className={cn(
                                  'flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100',
                                  {
                                    'bg-zinc-100': role?.value === r.value,
                                  },
                                )}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 size-4',
                                    role?.value === r.value
                                      ? 'opacity-100'
                                      : 'opacity-0',
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
            <div className="flex gap-2 self-end">
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
              <Button disabled={isPending}>Erstellen</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
