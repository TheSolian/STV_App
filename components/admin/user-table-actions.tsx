'use client'

import { User } from '@prisma/client'
import {
  KeyRoundIcon,
  MoreHorizontalIcon,
  PenIcon,
  Trash2Icon,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { DeleteUserDialog } from './delete-user-dialog'
import { EditUserDialog } from './edit-user-dialog'
import { ResetPasswordDialog } from './reset-password-dialog'

type Props = {
  user: User
}

export const UserTableActions: React.FC<Props> = ({ user }) => {
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false)
  const [isEditUserDialogOpen, setIsEditUserDialogOpen] = useState(false)
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Aktionen Öffnen</span>
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
        <DropdownMenuItem onSelect={() => setIsEditUserDialogOpen(true)}>
          <PenIcon className="mr-2 size-4" />
          Benutzer bearbeiten
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setIsResetPasswordDialogOpen(true)}>
          <KeyRoundIcon className="mr-2 size-4" />
          Passwort zurücksetzen
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setIsDeleteUserDialogOpen(true)}>
          <Trash2Icon className="mr-2 size-4" />
          Benutzer löschen
        </DropdownMenuItem>
      </DropdownMenuContent>
      {/* @ts-ignore */}
      {/* <EditUserDialog
        user={user}
        open={isEditUserDialogOpen}
        setIsOpen={setIsEditUserDialogOpen}
      /> */}
      <ResetPasswordDialog
        open={isResetPasswordDialogOpen}
        setIsOpen={setIsResetPasswordDialogOpen}
        userId={user.id}
      />
      <DeleteUserDialog
        open={isDeleteUserDialogOpen}
        setIsOpen={setIsDeleteUserDialogOpen}
        user={user}
      />
    </DropdownMenu>
  )
}
