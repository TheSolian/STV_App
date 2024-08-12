import { getExercises } from '@/actions/get-exercises'
import { ExerciseTable } from '@/components/admin/exercise-table'
import { exerciseTableColumns } from '@/components/admin/exercise-table-columns'

type Props = {}

const Page: React.FC<Props> = async ({}) => {
  const exercises = await getExercises()

  return (
    <div className="h-full px-4">
      <div>
        <ExerciseTable columns={exerciseTableColumns} data={exercises} />
      </div>
    </div>
  )
}

export default Page
