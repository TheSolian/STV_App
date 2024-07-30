import { getExercisesByUserId } from '@/actions/get-exercises'
import { auth } from '@/auth'
import { UserExerciseList } from '@/components/user-exercise-list'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  const session = await auth()
  const exercises = await getExercisesByUserId(session?.user.id || '')

  return (
    <div>
      <UserExerciseList data={exercises} />
    </div>
  )
}

export default Page
