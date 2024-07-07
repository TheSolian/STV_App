'use client'

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
import { UploadIcon } from 'lucide-react'
import { useState } from 'react'
import { TBD } from '../to-be-done'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { CreateExerciseDialog } from './create-exercise-dialog'

type Props<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ExerciseTable<TData, TValue>({
  columns,
  data,
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
    <div className="w-full">
      <div className="flex flex-col items-center justify-between gap-4 py-4 md:flex-row">
        <div className="flex w-full items-center justify-between gap-2 md:hidden">
          {/* <ImportUserDialog /> */}
          <Button variant="link">
            <UploadIcon className="mr-2 size-4" />
            Übungen Importieren <TBD />
          </Button>
          <CreateExerciseDialog triggerLabel="Element hinzufügen" />
        </div>
        <Input
          placeholder="Suche Elemente..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        <div className="flex items-center gap-2 max-md:hidden">
          {/* <ImportUserDialog />
          <CreateUserDialog triggerLabel="Benutzer hinzufügen" /> */}
          <Button variant="link">
            <UploadIcon className="mr-2 size-4" />
            Übungen Importieren <TBD />
          </Button>
          <CreateExerciseDialog triggerLabel="Element hinzufügen" />
        </div>
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
  )
}
