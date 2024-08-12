'use client'

import { getUsersByExerciseId } from '@/actions/dashboard/get-users'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type User = NonNullable<
  Awaited<ReturnType<typeof getUsersByExerciseId>>
>[number]

export const userTableColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: 'able',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Kann die Übung
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { able } = row.original
      return <div>{able ? 'Ja' : 'Nein'}</div>
    },
  },
  {
    id: 'actions',
    header: 'Übungen anzeigen',
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/user/${row.original.id}/exercises`}
              className={buttonVariants({
                variant: 'ghost',
                size: 'icon',
              })}
            >
              <EyeIcon className="size-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Übungen anzeigen</TooltipContent>
        </Tooltip>
      )
    },
  },
]
