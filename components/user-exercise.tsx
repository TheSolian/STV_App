'use client'

import { getExercises } from '@/actions/get-exercises'
import {
  RemoveExerciseFromUserArgs,
  removeExerciseFromUserList,
} from '@/actions/remove-exercise-from-user'
import { useMutation } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

type Exercise = Awaited<ReturnType<typeof getExercises>>[number]

type Props = {
  exercise: Exercise
  userId?: string
}

export const UserExercise: React.FC<Props> = ({ exercise, userId }) => {
  const router = useRouter()
  const session = useSession()

  const { mutate: remove, isPending: isRemoving } = useMutation({
    mutationKey: ['remove-exercise-from-user'],
    mutationFn: async (args: RemoveExerciseFromUserArgs) => {
      await removeExerciseFromUserList(args)
    },
    onSuccess: () => {
      router.refresh()
    },
  })

  return (
    <Card className="grid max-w-md grid-cols-1">
      <CardHeader className="flex justify-between">
        <CardTitle>{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent>
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
        <CardFooter className="flex justify-end">
          <Button
            size="icon"
            disabled={isRemoving}
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
      ) : null}
    </Card>
  )
}
