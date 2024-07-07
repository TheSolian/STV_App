'use client'

import { getExercises } from '@/actions/get-exercises'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDownIcon, MoreHorizontalIcon } from 'lucide-react'
import Image from 'next/image'
import { TBD } from '../to-be-done'
import { Button } from '../ui/button'

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
    accessorKey: 'number',
    header: 'Turnsprache #',
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Elementart
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const {
        type: { name },
      } = row.original

      return <div>{name}</div>
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Gerät
          <ArrowUpDownIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const {
        category: { name },
      } = row.original

      return <div>{name}</div>
    },
  },
  {
    accessorKey: 'image',
    header: 'Bild',
    cell: ({ row }) => {
      const { name, image } = row.original

      return (
        <Image
          src={image}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-[200px] object-contain"
          alt={name}
          priority
        />
      )
    },
  },
  {
    id: 'actions',
    header: () => <TBD />,
    cell: ({ row }) => {
      return (
        <Button variant="ghost">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      )
    },
  },
]
