import { getExercisesByUserId } from '@/actions/get-exercises'
import { UserExerciseList } from '@/components/user-exercise-list'
import { getUserById } from '@/data/user'

type Props = {
  params: {
    id: string
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const user = await getUserById(params.id)
  const exercises = await getExercisesByUserId(params.id)

  return (
    <div>
      <UserExerciseList
        userId={params.id}
        name={user?.name}
        data={exercises}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
      />
    </div>
  )
}

export default Page
