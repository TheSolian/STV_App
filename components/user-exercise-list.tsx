'use client'

import { getExercisesByUserId } from '@/actions/get-exercises'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, Divide, FilterIcon, PlusIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Filter, FilterOptions } from './filter'
import { Button, buttonVariants } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Separator } from './ui/separator'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { UserExercise } from './user-exercise'

type Exercise = NonNullable<
  Awaited<ReturnType<typeof getExercisesByUserId>>
>[number]

type Props = {
  userId?: string
  name?: string
  className?: string
  data?: Exercise[]
}

export const UserExerciseList: React.FC<Props> = ({
  userId,
  name,
  className,
  data,
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchTerm: '',
    able: 'all',
    category: 'all',
    difficulty: 'all',
  })

  return (
    <div className="grid grid-cols-1 grid-rows-[50px,1fr] lg:grid-cols-[275px,1fr] lg:grid-rows-1">
      <div className="h-[calc(100vh-var(--navbar-height))] border-r p-4">
        <div className="flex h-5 items-center gap-4 text-center">
          {userId ? (
            <>
              <Link
                href="/dashboard/users"
                className={buttonVariants({
                  className: 'flex items-center gap-2',
                  variant: 'link',
                })}
              >
                <ArrowLeftIcon className="size-4" />
                <span>Zurück</span>
              </Link>
              <Separator orientation="vertical" />
            </>
          ) : null}
          <h1 className="font-bold">{userId ? name : 'Meine Übungen'}</h1>
        </div>
        <Separator className="my-4" />
        <div className="hidden lg:block">
          <Filter
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            filters={{
              able: true,
              category: true,
              difficulty: true,
            }}
          />
        </div>
      </div>
      <div className="space-y-4 p-4">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div
            className={cn('flex items-center justify-between lg:hidden', {
              'justify-end': userId,
            })}
          >
            {!userId ? (
              <div className="flex justify-end">
                <Link
                  href="/exercises"
                  className={buttonVariants({
                    className: 'flex items-center',
                  })}
                >
                  <PlusIcon className="mr-2 size-4" />
                  Übungen hinzufügen
                </Link>
              </div>
            ) : null}
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
                    able: true,
                    category: true,
                    difficulty: true,
                  }}
                />
              </SheetContent>
            </Sheet>
          </div>
          <Input
            placeholder={'Suche Übungen...'}
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
            {!userId ? (
              <div className="flex justify-end">
                <Link
                  href="/exercises"
                  className={buttonVariants({
                    className: 'flex items-center',
                  })}
                >
                  <PlusIcon className="mr-2 size-4" />
                  Übungen hinzufügen
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        {data && data.length > 0 ? (
          <div
            className={cn(
              'grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3',
              className,
            )}
          >
            {data
              ? data
                  .filter((exercise) => {
                    const matchesSearchTerm = exercise.name
                      .toLowerCase()
                      .includes(filterOptions.searchTerm.toLowerCase())
                    const matchesAble =
                      filterOptions.able === 'all' ||
                      (filterOptions.able === 'able' && exercise.able) ||
                      (filterOptions.able === 'not-able' && !exercise.able)
                    const matchesCategory =
                      filterOptions.category === 'all' ||
                      exercise.category.name.toLowerCase() ===
                        filterOptions.category
                    const matchesDifficulty =
                      filterOptions.difficulty === 'all' ||
                      exercise.difficulty === filterOptions.difficulty
                    return (
                      matchesSearchTerm &&
                      matchesAble &&
                      matchesCategory &&
                      matchesDifficulty
                    )
                  })
                  .sort((a, b) => {
                    if (a.able === b.able) {
                      return a.name.localeCompare(b.name)
                    }

                    if (userId) {
                      return Number(b.able) - Number(a.able)
                    }

                    return Number(a.able) - Number(b.able)
                  })
                  .map((exercise) => (
                    <UserExercise
                      key={exercise.id}
                      exercise={exercise}
                      userId={userId}
                    />
                  ))
              : null}
          </div>
        ) : (
          <div className="flex h-[calc(100vh-var(--navbar-height)-100px)] items-center justify-center">
            <div>Keine Übungen gefunden</div>
          </div>
        )}
      </div>
    </div>
  )
}
