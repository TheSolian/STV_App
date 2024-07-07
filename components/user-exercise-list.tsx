import { getExercisesByUserId } from '@/actions/get-exercises'
import { auth } from '@/auth'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { TBD } from './to-be-done'
import { buttonVariants } from './ui/button'
import { Input } from './ui/input'
import { UserExercise } from './user-exercise'

type Props = {
  userId?: string
  className?: string
}

export const UserExerciseList: React.FC<Props> = async ({
  userId,
  className,
}) => {
  const session = await auth()
  const exercises = await getExercisesByUserId(userId || session?.user.id || '')

  return (
    <div className="space-y-4">
      <div>
        <Input placeholder={'Suche Übungen...'} disabled />
      </div>
      <div>
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
        <div
          className={cn(
            'grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4',
            className,
          )}
        >
          {exercises
            ?.sort((a, b) => {
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
            ))}
        </div>
      </div>
    </div>
  )
}
