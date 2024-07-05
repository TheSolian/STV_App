import { getExercises, getExercisesByUserId } from '@/actions/get-exercises'
import { auth } from '@/auth'
import { Exercise } from './exercise'

type Props = {}

export const ExerciseList: React.FC<Props> = async ({}) => {
  const session = await auth()
  const userExercises = await getExercisesByUserId(session?.user.id || '')
  const exercises = await getExercises()

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
      {exercises.map((exercise) => (
        <Exercise
          key={exercise.id}
          exercise={exercise}
          isInUsersList={
            userExercises?.filter((e) => e.id === exercise.id).length === 1
              ? true
              : false
          }
        />
      ))}
    </div>
  )
}
