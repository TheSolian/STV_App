'use client'

import { getUsers } from '@/actions/dashboard/get-users'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, EyeIcon } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

type User = Awaited<ReturnType<typeof getUsers>>[number]

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
    accessorKey: 'exercises',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Anzahl Elemente
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { exercises } = row.original
      return <div>{exercises.length}</div>
    },
  },
  {
    id: 'actions',
    header: 'Elemente anzeigen',
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
          <TooltipContent>Elemente anzeigen</TooltipContent>
        </Tooltip>
      )
    },
  },
]
