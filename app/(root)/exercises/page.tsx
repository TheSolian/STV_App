import { getExercises, getExercisesByUserId } from '@/actions/get-exercises'
import { auth } from '@/auth'
import { ExerciseList } from '@/components/exercise-list'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  const session = await auth()
  const exercises = await getExercises()
  const userExercises = await getExercisesByUserId(session?.user.id || '')

  if (!exercises || !userExercises) return null

  return (
    <div>
      <ExerciseList exercises={exercises} userExercises={userExercises} />
    </div>
  )
}

export default Page
