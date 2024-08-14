'use client'

import { getCategories } from '@/actions/get-categories'
import { Category } from '@prisma/client'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

type Props = {
  filterOptions: FilterOptions
  setFilterOptions: Dispatch<SetStateAction<FilterOptions>>
  filters: {
    able: boolean
    category: boolean
    difficulty: boolean
  }
}

export type FilterOptions = {
  searchTerm: String
  able: FilterOptionAble
  category: string
  difficulty: FilterOptionDifficulty
}

type FilterOptionAble = 'all' | 'able' | 'not-able'
type FilterOptionDifficulty =
  | 'all'
  | 'B'
  // | 'K1'
  // | 'K2'
  // | 'K3'
  | 'K4'
  | 'K5'
  | 'K6'
  | 'K7'

export const Filter: React.FC<Props> = ({
  filterOptions,
  setFilterOptions,
  filters,
}) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [difficulties, setDifficulties] = useState<FilterOptionDifficulty[]>([
    'B',
    // 'K1',
    // 'K2',
    // 'K3',
    'K4',
    'K5',
    'K6',
    'K7',
  ])

  useEffect(() => {
    getCategories().then((categories) => setCategories(categories))
  }, [])

  return (
    <div className="space-y-4">
      <div className="text-xl">Filter</div>
      <div className="space-y-4 pl-4">
        {filters.able ? (
          <RadioGroup
            defaultValue={filterOptions.able}
            onValueChange={(value) => {
              setFilterOptions((prev) => {
                return {
                  ...prev,
                  able: value as FilterOptionAble,
                }
              })
            }}
          >
            <div className="font-bold">Kann das Element</div>
            <div className="flex flex-col gap-2 pl-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="able-all" />
                <Label htmlFor="able-all">Alle</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="able" id="able-able" />
                <Label htmlFor="able-able">Ja</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="not-able" id="able-not-able" />
                <Label htmlFor="able-not-able">Nein</Label>
              </div>
            </div>
          </RadioGroup>
        ) : null}

        {filters.category ? (
          <RadioGroup
            defaultValue={filterOptions.category}
            onValueChange={(value) => {
              setFilterOptions((prev) => {
                return {
                  ...prev,
                  category: value,
                }
              })
            }}
          >
            <div className="font-bold">Gerät</div>
            <div className="flex flex-col gap-2 pl-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="category-all" />
                <Label htmlFor="category-all">Alle</Label>
              </div>
              {categories.map((category) => (
                <div className="flex items-center gap-2" key={category.id}>
                  <RadioGroupItem
                    value={category.name.toLowerCase()}
                    id={category.id}
                  />
                  <Label htmlFor={category.id}>{category.name}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        ) : null}

        {filters.difficulty ? (
          <RadioGroup
            defaultValue={filterOptions.difficulty}
            onValueChange={(value) => {
              setFilterOptions((prev) => {
                return {
                  ...prev,
                  difficulty: value as FilterOptionDifficulty,
                }
              })
            }}
          >
            <div className="font-bold">Kategorie</div>
            <div className="flex flex-col gap-2 pl-4">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="category-all" />
                <Label htmlFor="category-all">Alle</Label>
              </div>
              {difficulties.map((difficulty) => (
                <div className="flex items-center gap-2" key={difficulty}>
                  <RadioGroupItem
                    value={difficulty}
                    id={'difficulty-' + difficulty.toLocaleLowerCase()}
                  />
                  <Label
                    htmlFor={'difficulty-' + difficulty.toLocaleLowerCase()}
                  >
                    {difficulty}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        ) : null}
      </div>
    </div>
  )
}
