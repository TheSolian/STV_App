'use client'

import { getExercisesByUserId } from '@/actions/get-exercises'
import { removeExerciseFromUserList } from '@/actions/remove-exercise-from-user'
import { updateUserExercise } from '@/actions/update-user-exercise'
import { useMutation } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

type Exercise = NonNullable<
  Awaited<ReturnType<typeof getExercisesByUserId>>
>[number]

type Props = {
  exercise: Exercise
  userId?: string
}

export const UserExercise: React.FC<Props> = ({ exercise, userId }) => {
  const router = useRouter()
  const session = useSession()

  const [isChecked, setIsChecked] = useState(exercise.able)

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationKey: ['remove-exercise-from-user'],
    mutationFn: removeExerciseFromUserList,
    onSuccess: () => {
      router.refresh()
    },
  })

  const { mutate: update, isPending: isUpdating } = useMutation({
    mutationKey: ['update-exercise-able'],
    mutationFn: updateUserExercise,
    onSuccess: () => {
      router.refresh()
    },
  })

  return (
    <Card className="grid max-w-md grid-rows-[auto,1fr,10%]">
      <CardHeader className="flex justify-between">
        <CardTitle>{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-col justify-between gap-4">
          <div className="flex justify-evenly gap-4">
            <div>
              <span className="font-bold">#</span> - {exercise.number}
            </div>
            <div>
              <span className="font-bold">Kategorie</span> -{' '}
              {exercise.difficulty}
            </div>
          </div>
          <Image
            src={exercise.image}
            alt={exercise.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-40 w-full overflow-hidden rounded-md border object-contain"
            priority
          />
          <div className="flex flex-col gap-2">
            <div>
              <span className="font-bold">Gerät</span> -{' '}
              <span>{exercise.category.name}</span>
            </div>
            <div>
              <span className="font-bold">Elementart</span> -{' '}
              <span>{exercise.type.name}</span>
            </div>
          </div>
        </div>
      </CardContent>
      {!userId ? (
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="able"
              disabled={isRemoving || isUpdating}
              checked={isChecked}
              onCheckedChange={async (value) => {
                update({
                  userId: session.data?.user.id || '',
                  exerciseId: exercise.id,
                  able: value as boolean,
                })
                setIsChecked(value as boolean)
              }}
            />
            <Label htmlFor="able">Ich kann die Übung</Label>
          </div>
          <Button
            size="icon"
            disabled={isRemoving || isUpdating}
            onClick={() =>
              remove({
                exerciseId: exercise.id,
                userId: session?.data?.user.id || '',
              })
            }
          >
            <Trash2Icon className="size-4" />
          </Button>
        </CardFooter>
      ) : (
        <CardFooter>
          <div className="flex items-center gap-2">
            <Checkbox checked={exercise.able} className="cursor-default" />
            <div>Kann die Übung</div>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
