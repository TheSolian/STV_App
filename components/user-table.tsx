'use client'

import { getExerciseById } from '@/data/exercise'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowLeftIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { buttonVariants } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

type Exercise = Awaited<ReturnType<typeof getExerciseById>>

type Props<TData, TValue> = {
  exercise: Exercise
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function UserTable<TData, TValue>({
  columns,
  data,
  exercise,
}: Props<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="grid grid-cols-1 grid-rows-[50px,1fr] lg:grid-cols-[275px,1fr] lg:grid-rows-1">
      <div className="h-[calc(100vh-var(--navbar-height))] border-r p-4">
        <div className="flex flex-col">
          <Link
            href="/dashboard/exercises"
            className={buttonVariants({ className: 'flex items-center gap-2' })}
          >
            <ArrowLeftIcon className="size-4" />
            <span>Zurück</span>
          </Link>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            <div>
              <div className="font-bold">Name</div>
              <div>{exercise?.name}</div>
            </div>
            <div>
              <div className="font-bold">Turnsprache #</div>
              <div>{exercise?.number}</div>
            </div>
            <div>
              <div className="font-bold">Kategorie</div>
              <div>{exercise?.number}</div>
            </div>
            <div className="w-full space-y-2">
              <div className="font-bold">Bild</div>
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-auto rounded-md border object-cover"
                src={exercise?.image || ''}
                alt="Gerät Bild"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
          <Input
            placeholder="Suche Benutzer..."
            value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('name')?.setFilterValue(event.target.value)
            }
            className="w-full"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Keine Resultate
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
