'use client'

import { getExercises, getExercisesByUserId } from '@/actions/get-exercises'
import { FilterIcon, ListIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Exercise } from './exercise'
import { Filter, FilterOptions } from './filter'
import { Button, buttonVariants } from './ui/button'
import { Input } from './ui/input'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

type Props = {
  exercises: Exercise[]
  userExercises: UserExercise[]
}

type Exercise = Awaited<ReturnType<typeof getExercises>>[number]
type UserExercise = NonNullable<
  Awaited<ReturnType<typeof getExercisesByUserId>>
>[number]

export const ExerciseList: React.FC<Props> = ({ exercises, userExercises }) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchTerm: '',
    able: 'all',
    category: 'all',
    difficulty: 'all',
  })

  return (
    <div className="grid grid-cols-1 grid-rows-[0,1fr] lg:grid-cols-[275px,1fr] lg:grid-rows-1">
      <div className="h-[calc(100vh-var(--navbar-height))] border-r p-4">
        <div className="hidden lg:block">
          <Filter
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            filters={{
              able: false,
              category: true,
              difficulty: true,
            }}
          />
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex items-center justify-between lg:hidden">
            <Link
              href="/my-exercises"
              className={buttonVariants({
                className: 'flex items-center',
              })}
            >
              <ListIcon className="mr-2 size-4" />
              Meine Liste
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="link">
                  <FilterIcon className="mr-2 size-4" />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Filter
                  filterOptions={filterOptions}
                  setFilterOptions={setFilterOptions}
                  filters={{
                    able: false,
                    category: true,
                    difficulty: true,
                  }}
                />
              </SheetContent>
            </Sheet>
          </div>
          <Input
            placeholder={'Suche Elemente...'}
            onChange={(e) =>
              setFilterOptions((prev) => {
                return {
                  ...prev,
                  searchTerm: e.target.value,
                }
              })
            }
          />
          <div className="hidden lg:block">
            <Link
              href="/my-exercises"
              className={buttonVariants({
                className: 'flex items-center',
              })}
            >
              <ListIcon className="mr-2 size-4" />
              Meine Liste
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {exercises
            .filter((exercise) => {
              const matchesSearchTerm = exercise.name
                .toLowerCase()
                .includes(filterOptions.searchTerm.toLowerCase())
              const matchesCategory =
                filterOptions.category === 'all' ||
                exercise.category.name.toLowerCase() === filterOptions.category
              const matchesDifficulty =
                filterOptions.difficulty === 'all' ||
                exercise.difficulty === filterOptions.difficulty
              return matchesSearchTerm && matchesCategory && matchesDifficulty
            })
            .sort((a, b) => {
              return Number(a.name) - Number(b.name)
            })
            .map((exercise) => (
              <Exercise
                key={exercise.id}
                exercise={exercise}
                isInUsersList={
                  userExercises?.filter((e) => e.id === exercise.id).length ===
                  1
                    ? true
                    : false
                }
              />
            ))}
        </div>
      </div>
    </div>
  )
}
