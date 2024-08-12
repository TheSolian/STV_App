import { getUsersByExerciseId } from '@/actions/dashboard/get-users'
import { UserTable } from '@/components/user-table'
import { userTableColumns } from '@/components/user-table-columns'
import { getExerciseById } from '@/data/exercise'

type Props = {
  params: {
    id: string
  }
}

const Page: React.FC<Props> = async ({ params }) => {
  const exercise = await getExerciseById(params.id)
  const users = await getUsersByExerciseId(params.id)

  if (!users) return

  return (
    <div>
      <UserTable columns={userTableColumns} data={users} exercise={exercise} />
    </div>
  )
}

export default Page
