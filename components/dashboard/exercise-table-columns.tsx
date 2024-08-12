'use client'

import { getExercises } from '@/actions/dashboard/get-exercises'
import { getUsers } from '@/actions/dashboard/get-users'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type Exercise = Awaited<ReturnType<typeof getExercises>>[number]

export const exerciseTableColumns: ColumnDef<Exercise>[] = [
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
    accessorKey: 'users',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Anzahl Turnende
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { users } = row.original
      const filtered = users.filter((user) => user.able === true)
      return <div>{filtered.length}</div>
    },
  },
  {
    id: 'actions',
    header: 'Turnende anzeigen',
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`/exercise/${row.original.id}/users`}
              className={buttonVariants({
                variant: 'ghost',
                size: 'icon',
              })}
            >
              <EyeIcon className="size-4" />
            </Link>
          </TooltipTrigger>
          <TooltipContent>Turnende anzeigen</TooltipContent>
        </Tooltip>
      )
    },
  },
]
