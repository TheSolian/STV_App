'use client'

import { resetPassword } from '@/actions/admin/reset-password'
import { KeyRoundIcon } from 'lucide-react'
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
  userId: string
}

export const ResetPasswordDialog: React.FC<Props> = ({
  open,
  setIsOpen,
  userId,
}) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = async () => {
    startTransition(async () => {
      await resetPassword(userId)

      setIsOpen(false)
      toast('Passwort erfolgreich zurückgesetzt.')
    })
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader className="font-bold text-lg">
          Passwort zurücksetzen?
        </DialogHeader>
        <p>
          Soll das Passwort des Benutzers zum Standardpasswort{' '}
          <span className="font-bold">changeme</span> zurückgesetzt werden?
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
