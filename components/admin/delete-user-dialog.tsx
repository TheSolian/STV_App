'use client'

import { deleteUser } from '@/actions/admin/delete-user'
import { resetPassword } from '@/actions/admin/reset-password'
import { User } from '@prisma/client'
import { KeyRoundIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog'
import { DropdownMenuTrigger } from '../ui/dropdown-menu'

type Props = {
  open: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  user: User
}

export const DeleteUserDialog: React.FC<Props> = ({
  open,
  setIsOpen,
  user,
}) => {
  const { name, id } = user
  const router = useRouter()

  const [isPending, startTransition] = useTransition()

  const handleClick = async () => {
    startTransition(async () => {
      await deleteUser(id)
      setIsOpen(false)
      toast('Benutzer erfolgreich gelöscht!')
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="font-bold text-lg">
          Benutzer löschen?
        </DialogHeader>
        <p>
          Soll der Benutzer <span className="font-bold">{name}</span> gelöscht
          werden?
        </p>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(false)}
            disabled={isPending}
          >
            Nein
          </Button>
          <Button onClick={handleClick} disabled={isPending}>
            Ja
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
