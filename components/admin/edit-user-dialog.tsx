'use client'

import { createUser } from '@/actions/admin/create-user'
import { getUsers } from '@/actions/admin/get-users'
import { updateUser } from '@/actions/admin/update-user'
import { getRoles } from '@/actions/auth/get-roles'
import { cn } from '@/lib/utils'
import { CreateUserSchema } from '@/schemas'
import { User } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Role } from '@prisma/client'
import { CheckIcon, PenIcon, PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from 'react'
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

  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [roles, setRoles] = useState<Role[]>([])
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  useEffect(() => {
    getRoles().then((data) => {
      setRoles(data)
      const role = data.find((r) => r.value === user.role.value)
      if (role) {
        setSelectedRole(role)
      }
    })
  }, [])

  const form = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: selectedRole?.value,
    },
  })

  const onSubmit = (values: z.infer<typeof CreateUserSchema>) => {
    setError('')

    startTransition(() => {
      updateUser(values).then((data) => {
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
                              {selectedRole?.label}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {roles.map((r) => (
                              <DropdownMenuItem
                                key={r.value}
                                onClick={() => {
                                  setSelectedRole(r)
                                  form.setValue('role', r.value)
                                }}
                                className={cn(
                                  'flex cursor-default items-center gap-1 p-1.5 text-sm hover:bg-zinc-100',
                                  {
                                    'bg-zinc-100':
                                      selectedRole?.value === r.value,
                                  },
                                )}
                              >
                                <CheckIcon
                                  className={cn(
                                    'mr-2 size-4',
                                    selectedRole?.value === r.value
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
              <Button disabled={isPending}>Speichern</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
